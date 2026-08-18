import { describe, expect, it, vi } from "vitest";

import { buildMigrationArtifact } from "./migration-artifact.js";
import {
  prepareMigratedNamespace,
  withPostgresNamespace,
} from "./postgres-lifecycle.js";

interface PostgresControl {
  readonly database: string;
  readonly user: string;
  readonly password: string;
  readonly port: number;
}

interface CharacterImportRecord {
  readonly id: number;
  readonly name: string;
  readonly status: string;
  readonly species: string;
  readonly characterType: string;
  readonly gender: string;
  readonly originName: string;
  readonly originUrl: string;
  readonly imageUrl: string;
}

interface QueryOptionsBoundary {
  readonly bind?: readonly unknown[] | Readonly<Record<string, unknown>>;
  readonly transaction?: object;
}

interface SequelizeBoundary {
  query(
    sql: string,
    options?: QueryOptionsBoundary,
  ): Promise<readonly [unknown, unknown]>;
  transaction<T>(body: (transaction: object) => Promise<T>): Promise<T>;
  close(): Promise<void>;
}

interface SequelizeConstructor {
  new (
    database: string,
    user: string,
    password: string,
    options: Readonly<Record<string, unknown>>,
  ): SequelizeBoundary;
}

interface CharacterImportRepository {
  publishCharacters(records: readonly CharacterImportRecord[]): Promise<void>;
}

type CreateCharacterImportRepository = (options: {
  readonly sequelize: Pick<SequelizeBoundary, "query" | "transaction">;
  readonly schema: string;
}) => CharacterImportRepository;

interface RecordedQuery {
  readonly sql: string;
  readonly options: QueryOptionsBoundary | undefined;
}

interface PublicationAudit {
  readonly sequelize: Pick<SequelizeBoundary, "query" | "transaction">;
  readonly queries: RecordedQuery[];
  readonly transactions: object[];
}

interface StoredCharacter extends CharacterImportRecord {
  readonly isFavorite: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

interface StoredComment {
  readonly id: number;
  readonly characterId: number;
  readonly body: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

const hostileSentinel = "Bound value '; DROP TABLE characters; --";
const ownedDatabasePattern = "^task_004_[0-9a-f]{16}$";
const pinnedUpdatedAt = new Date("2000-01-01T00:00:00.000Z");

function loadControl(): PostgresControl {
  return {
    database: process.env.POSTGRES_DB ?? "rick_and_morty",
    user: process.env.POSTGRES_USER ?? "rick_and_morty",
    password: process.env.POSTGRES_PASSWORD ?? "local-development-only",
    port: Number(process.env.POSTGRES_PORT ?? "5432"),
  };
}

async function createSequelize(
  control: PostgresControl,
  database: string,
): Promise<SequelizeBoundary> {
  const sequelizeSpecifier = "sequelize";
  const sequelizeModule = (await import(
    /* @vite-ignore */ sequelizeSpecifier
  )) as Record<string, unknown>;
  expect(sequelizeModule.Sequelize).toBeTypeOf("function");
  const Sequelize = sequelizeModule.Sequelize as SequelizeConstructor;
  return new Sequelize(database, control.user, control.password, {
    dialect: "postgres",
    host: "127.0.0.1",
    port: control.port,
    dialectOptions: { ssl: false },
    logging: false,
    pool: { max: 1, min: 0 },
  });
}

function quoteIdentifier(identifier: string): string {
  if (!/^task_004_[0-9a-f]{16}$/u.test(identifier)) {
    throw new Error("TEST_POSTGRES_NAMESPACE_INVALID");
  }
  return `"${identifier}"`;
}

function isMissingImportRepository(error: unknown): boolean {
  return (
    error instanceof Error &&
    (("code" in error && error.code === "ERR_MODULE_NOT_FOUND") ||
      error.message.includes("sequelize-character-import-repository"))
  );
}

async function loadImportRepository(): Promise<CreateCharacterImportRepository> {
  const repositorySpecifier = "./sequelize-character-import-repository.js";
  try {
    const module = (await import(
      /* @vite-ignore */ repositorySpecifier
    )) as Record<string, unknown>;
    expect(module.createSequelizeCharacterImportRepository).toBeTypeOf(
      "function",
    );
    return module.createSequelizeCharacterImportRepository as CreateCharacterImportRepository;
  } catch (error) {
    if (!isMissingImportRepository(error)) {
      throw error;
    }
    throw new Error("SEQUELIZE_CHARACTER_IMPORT_REPOSITORY_MISSING", {
      cause: error,
    });
  }
}

function batch(marker: "initial" | "refresh" | "failed"): CharacterImportRecord[] {
  return Array.from({ length: 15 }, (_, index) => {
    const id = index + 1;
    return {
      id,
      name: id === 1 ? `${marker} ${hostileSentinel}` : `${marker} name ${id}`,
      status: `${marker} status ${id}`,
      species: `${marker} species ${id}`,
      characterType: `${marker} type ${id}`,
      gender: `${marker} gender ${id}`,
      originName: `${marker} origin ${id}`,
      originUrl: `https://example.invalid/${marker}/origin/${id}`,
      imageUrl: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
    };
  });
}

function createPublicationAudit(sequelize: SequelizeBoundary): PublicationAudit {
  const queries: RecordedQuery[] = [];
  const transactions: object[] = [];
  return {
    queries,
    transactions,
    sequelize: {
      query: async (sql, options) => {
        queries.push({ sql, options });
        return sequelize.query(sql, options);
      },
      transaction: async (body) =>
        sequelize.transaction(async (transaction) => {
          transactions.push(transaction);
          return body(transaction);
        }),
    },
  };
}

function expectBoundTransactionalPublication(
  audit: PublicationAudit,
  transactionCount = 1,
): void {
  expect(audit.transactions).toHaveLength(transactionCount);
  expect(audit.queries.length).toBeGreaterThan(0);
  const transaction = audit.transactions[0];
  for (const query of audit.queries) {
    expect(query.options?.bind).toBeDefined();
    expect(query.options?.transaction).toBe(transaction);
    expect(query.sql).not.toContain(hostileSentinel);
  }
  expect(JSON.stringify(audit.queries.map(({ options }) => options?.bind))).toContain(
    hostileSentinel,
  );
}

async function publish(
  createRepository: CreateCharacterImportRepository,
  sequelize: SequelizeBoundary,
  schema: string,
  records: readonly CharacterImportRecord[],
): Promise<PublicationAudit> {
  const audit = createPublicationAudit(sequelize);
  const repository = createRepository({
    sequelize: audit.sequelize,
    schema,
  });
  await repository.publishCharacters(records);
  expectBoundTransactionalPublication(audit);
  return audit;
}

async function readCharacters(
  sequelize: SequelizeBoundary,
  schema: string,
): Promise<StoredCharacter[]> {
  const [rows] = await sequelize.query(
    `SELECT
       "id", "name", "status", "species",
       "character_type" AS "characterType", "gender",
       "origin_name" AS "originName", "origin_url" AS "originUrl",
       "image_url" AS "imageUrl", "is_favorite" AS "isFavorite",
       "created_at" AS "createdAt", "updated_at" AS "updatedAt"
     FROM ${quoteIdentifier(schema)}."characters"
     ORDER BY "id"`,
  );
  return rows as StoredCharacter[];
}

async function readComments(
  sequelize: SequelizeBoundary,
  schema: string,
): Promise<StoredComment[]> {
  const [rows] = await sequelize.query(
    `SELECT
       "id", "character_id" AS "characterId", "body",
       "created_at" AS "createdAt", "updated_at" AS "updatedAt"
     FROM ${quoteIdentifier(schema)}."comments"
     ORDER BY "id"`,
  );
  return rows as StoredComment[];
}

function projectSourceFields(
  rows: readonly StoredCharacter[],
): CharacterImportRecord[] {
  return rows.map(
    ({
      id,
      name,
      status,
      species,
      characterType,
      gender,
      originName,
      originUrl,
      imageUrl,
    }) => ({
      id,
      name,
      status,
      species,
      characterType,
      gender,
      originName,
      originUrl,
      imageUrl,
    }),
  );
}

async function listOwnedDatabases(control: PostgresControl): Promise<string[]> {
  const sequelize = await createSequelize(control, control.database);
  try {
    const [rows] = await sequelize.query(
      `SELECT "datname"
       FROM "pg_catalog"."pg_database"
       WHERE "datname" OPERATOR("pg_catalog".~) $1
       ORDER BY "datname"`,
      { bind: [ownedDatabasePattern] },
    );
    return (rows as { readonly datname: string }[]).map(({ datname }) => datname);
  } finally {
    await sequelize.close();
  }
}

async function seedApplicationOwnedState(
  sequelize: SequelizeBoundary,
  schema: string,
): Promise<void> {
  await sequelize.query(
    `UPDATE ${quoteIdentifier(schema)}."characters"
     SET "is_favorite" = true
     WHERE "id" = $1`,
    { bind: [1] },
  );
  await sequelize.query(
    `INSERT INTO ${quoteIdentifier(schema)}."comments" ("character_id", "body")
     VALUES ($1, $2), ($3, $4)`,
    { bind: [1, "First preserved comment", 2, "Second preserved comment"] },
  );
  await sequelize.query(
    `UPDATE ${quoteIdentifier(schema)}."characters"
     SET "updated_at" = $1`,
    { bind: [pinnedUpdatedAt] },
  );
}

async function installPersistenceFailure(
  sequelize: SequelizeBoundary,
  schema: string,
): Promise<void> {
  const quotedSchema = quoteIdentifier(schema);
  await sequelize.query(
    `CREATE FUNCTION ${quotedSchema}."fail_character_eight_import"()
     RETURNS trigger
     LANGUAGE plpgsql
     AS $function$
     BEGIN
       IF NEW."id" = 8 THEN
         RAISE EXCEPTION 'TEST_PERSISTENCE_FAILURE_ID_8';
       END IF;
       RETURN NEW;
     END;
     $function$`,
  );
  await sequelize.query(
    `CREATE TRIGGER "fail_character_eight_import"
     BEFORE INSERT OR UPDATE ON ${quotedSchema}."characters"
     FOR EACH ROW EXECUTE FUNCTION ${quotedSchema}."fail_character_eight_import"()`,
  );
}

async function exercisePublicationContract(
  createRepository: CreateCharacterImportRepository,
  sequelize: SequelizeBoundary,
  schema: string,
): Promise<void> {
  const initial = batch("initial");
  await publish(createRepository, sequelize, schema, initial);
  expect(projectSourceFields(await readCharacters(sequelize, schema))).toEqual(initial);

  await publish(createRepository, sequelize, schema, initial);
  const repeatedRows = await readCharacters(sequelize, schema);
  expect(repeatedRows).toHaveLength(15);
  expect(repeatedRows.map(({ id }) => id)).toEqual(
    Array.from({ length: 15 }, (_, index) => index + 1),
  );
  expect(new Set(repeatedRows.map(({ id }) => id)).size).toBe(15);

  await seedApplicationOwnedState(sequelize, schema);
  const commentsBeforeRefresh = await readComments(sequelize, schema);
  const charactersBeforeRefresh = await readCharacters(sequelize, schema);
  expect(
    charactersBeforeRefresh.every(
      ({ updatedAt }) => updatedAt.getTime() === pinnedUpdatedAt.getTime(),
    ),
  ).toBe(true);
  const refreshed = batch("refresh");
  await publish(createRepository, sequelize, schema, refreshed);
  const refreshedRows = await readCharacters(sequelize, schema);
  expect(projectSourceFields(refreshedRows)).toEqual(refreshed);
  expect(refreshedRows.find(({ id }) => id === 1)?.isFavorite).toBe(true);
  expect(await readComments(sequelize, schema)).toEqual(commentsBeforeRefresh);
  expect(
    refreshedRows.map(({ id, createdAt }) => ({ id, createdAt })),
  ).toEqual(
    charactersBeforeRefresh.map(({ id, createdAt }) => ({ id, createdAt })),
  );

  const charactersBeforeFailure = await readCharacters(sequelize, schema);
  const commentsBeforeFailure = await readComments(sequelize, schema);
  await installPersistenceFailure(sequelize, schema);

  const failed = batch("failed");
  const audit = createPublicationAudit(sequelize);
  const repository = createRepository({ sequelize: audit.sequelize, schema });
  await expect(repository.publishCharacters(failed)).rejects.toThrow(
    /TEST_PERSISTENCE_FAILURE_ID_8/u,
  );
  expectBoundTransactionalPublication(audit);
  expect(await readCharacters(sequelize, schema)).toEqual(charactersBeforeFailure);
  expect(await readComments(sequelize, schema)).toEqual(commentsBeforeFailure);
  expect(
    refreshedRows.every(
      ({ updatedAt }) => updatedAt.getTime() > pinnedUpdatedAt.getTime(),
    ),
  ).toBe(true);
}

describe("Sequelize character import repository", () => {
  it(
    "publishes the exact idempotent baseline, preserves application state on refresh, and rolls back a persistence failure",
    async () => {
      const control = loadControl();
      const before = await listOwnedDatabases(control);
      const fetchSpy = vi
        .spyOn(globalThis, "fetch")
        .mockRejectedValue(new Error("LIVE_UPSTREAM_ACCESS_FORBIDDEN"));
      let primaryFailure: unknown;

      try {
        const artifact = await buildMigrationArtifact();
        await withPostgresNamespace({
          control,
          body: async (namespace) => {
            console.info(
              `POSTGRES_IMPORT_NAMESPACE_READY database=${namespace.database} schema=${namespace.schema}`,
            );
            await prepareMigratedNamespace({
              target: namespace.target,
              buildRoot: artifact.buildRoot,
            });

            const sequelize = await createSequelize(control, namespace.database);
            try {
              const createRepository = await loadImportRepository();
              await exercisePublicationContract(
                createRepository,
                sequelize,
                namespace.schema,
              );
            } finally {
              await sequelize.close();
            }
          },
        });
      } catch (error) {
        primaryFailure = error;
      }

      let cleanupFailure: unknown;
      try {
        const after = await listOwnedDatabases(control);
        console.info(
          `POSTGRES_IMPORT_RESIDUE before=${JSON.stringify(before)} after=${JSON.stringify(after)}`,
        );
        expect(after).toEqual(before);
        expect(fetchSpy).not.toHaveBeenCalled();
      } catch (error) {
        cleanupFailure = error;
      } finally {
        fetchSpy.mockRestore();
      }

      if (primaryFailure !== undefined && cleanupFailure !== undefined) {
        throw new AggregateError(
          [primaryFailure, cleanupFailure],
          "Character import test and cleanup verification both failed",
          { cause: primaryFailure },
        );
      }
      if (cleanupFailure !== undefined) {
        throw cleanupFailure;
      }
      if (primaryFailure !== undefined) {
        throw primaryFailure;
      }
    },
    60_000,
  );
});
