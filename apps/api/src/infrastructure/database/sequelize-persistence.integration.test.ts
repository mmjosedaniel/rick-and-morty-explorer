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

interface CharacterAttributes {
  readonly id: number;
  readonly name: string;
  readonly status: string;
  readonly species: string;
  readonly characterType: string;
  readonly gender: string;
  readonly originName: string;
  readonly originUrl: string;
  readonly imageUrl: string;
  readonly isFavorite: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

type CharacterCreationAttributes = Omit<
  CharacterAttributes,
  "isFavorite" | "createdAt" | "updatedAt"
> &
  Partial<
    Pick<CharacterAttributes, "isFavorite" | "createdAt" | "updatedAt">
  >;

interface CommentAttributes {
  readonly id: number;
  readonly characterId: number;
  readonly body: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

type CommentCreationAttributes = Omit<
  CommentAttributes,
  "id" | "createdAt" | "updatedAt"
> &
  Partial<Pick<CommentAttributes, "id" | "createdAt" | "updatedAt">>;

interface ModelRecord<Attributes> {
  get(options: { readonly plain: true }): Attributes;
  get(name: string): unknown;
  getDataValue<Key extends keyof Attributes>(key: Key): Attributes[Key];
  update(values: Partial<Attributes>): Promise<this>;
  reload(options?: unknown): Promise<this>;
}

interface ModelAttribute {
  readonly field?: string;
  readonly type: { toString(): string };
  readonly allowNull?: boolean;
  readonly primaryKey?: boolean;
  readonly autoIncrement?: boolean;
  readonly defaultValue?: unknown;
}

interface ModelAssociation {
  readonly associationType: string;
  readonly as: string;
  readonly foreignKey: string;
  readonly target: unknown;
}

interface ModelBoundary<Attributes, CreationAttributes> {
  readonly rawAttributes: Readonly<Record<string, ModelAttribute>>;
  readonly associations: Readonly<Record<string, ModelAssociation>>;
  getTableName(): string | { readonly tableName: string; readonly schema?: string };
  create(values: CreationAttributes): Promise<ModelRecord<Attributes>>;
  findByPk(
    identifier: number,
    options?: unknown,
  ): Promise<ModelRecord<Attributes> | null>;
}

type CharacterRecord = ModelRecord<CharacterAttributes>;
type CommentRecord = ModelRecord<CommentAttributes>;

interface SequelizeBoundary {
  sync(...args: readonly unknown[]): Promise<unknown>;
  close(): Promise<void>;
  query(sql: string): Promise<readonly [unknown, unknown]>;
}

interface SequelizeConstructor {
  new (
    database: string,
    user: string,
    password: string,
    options: Readonly<Record<string, unknown>>,
  ): SequelizeBoundary;
}

interface PersistenceAdapter {
  readonly models: {
    readonly Character: ModelBoundary<
      CharacterAttributes,
      CharacterCreationAttributes
    >;
    readonly Comment: ModelBoundary<CommentAttributes, CommentCreationAttributes>;
  };
}

type CreateSequelizePersistenceAdapter = (options: {
  readonly sequelize: SequelizeBoundary;
  readonly schema: string;
}) => PersistenceAdapter;

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

function isMissingPersistenceAdapter(error: unknown): boolean {
  return (
    error instanceof Error &&
    "code" in error &&
    error.code === "ERR_MODULE_NOT_FOUND" &&
    error.message.includes("sequelize-persistence.js")
  );
}

async function loadPersistenceAdapter(): Promise<CreateSequelizePersistenceAdapter> {
  const adapterSpecifier = "./sequelize-persistence.js";
  try {
    const module = (await import(
      /* @vite-ignore */ adapterSpecifier
    )) as Record<string, unknown>;
    expect(module.createSequelizePersistenceAdapter).toBeTypeOf("function");
    return module.createSequelizePersistenceAdapter as CreateSequelizePersistenceAdapter;
  } catch (error) {
    if (!isMissingPersistenceAdapter(error)) {
      throw error;
    }
    throw new Error("SEQUELIZE_PERSISTENCE_ADAPTER_MISSING_AFTER_MIGRATION", {
      cause: error,
    });
  }
}

function projectAttributes(
  model: ModelBoundary<unknown, unknown>,
): Record<
  string,
  {
    readonly field: string;
    readonly type: string;
    readonly notNull: boolean;
    readonly primaryKey: boolean;
    readonly autoIncrement: boolean;
  }
> {
  return Object.fromEntries(
    Object.entries(model.rawAttributes).map(([name, attribute]) => [
      name,
      {
        field: attribute.field ?? name,
        type: attribute.type.toString(),
        notNull: attribute.allowNull === false,
        primaryKey: attribute.primaryKey === true,
        autoIncrement: attribute.autoIncrement === true,
      },
    ]),
  );
}

function expectModelMetadata(
  adapter: PersistenceAdapter,
  schema: string,
): void {
  expect(Object.keys(adapter)).toEqual(["models"]);
  expect(Object.keys(adapter.models)).toEqual(["Character", "Comment"]);
  const { Character, Comment } = adapter.models;

  expect(Character.getTableName()).toMatchObject({
    tableName: "characters",
    schema,
  });
  expect(Comment.getTableName()).toMatchObject({
    tableName: "comments",
    schema,
  });
  expect(projectAttributes(Character)).toEqual({
    id: { field: "id", type: "INTEGER", notNull: true, primaryKey: true, autoIncrement: false },
    name: { field: "name", type: "TEXT", notNull: true, primaryKey: false, autoIncrement: false },
    status: { field: "status", type: "TEXT", notNull: true, primaryKey: false, autoIncrement: false },
    species: { field: "species", type: "TEXT", notNull: true, primaryKey: false, autoIncrement: false },
    characterType: { field: "character_type", type: "TEXT", notNull: true, primaryKey: false, autoIncrement: false },
    gender: { field: "gender", type: "TEXT", notNull: true, primaryKey: false, autoIncrement: false },
    originName: { field: "origin_name", type: "TEXT", notNull: true, primaryKey: false, autoIncrement: false },
    originUrl: { field: "origin_url", type: "TEXT", notNull: true, primaryKey: false, autoIncrement: false },
    imageUrl: { field: "image_url", type: "TEXT", notNull: true, primaryKey: false, autoIncrement: false },
    isFavorite: { field: "is_favorite", type: "BOOLEAN", notNull: true, primaryKey: false, autoIncrement: false },
    createdAt: { field: "created_at", type: "TIMESTAMP WITH TIME ZONE", notNull: true, primaryKey: false, autoIncrement: false },
    updatedAt: { field: "updated_at", type: "TIMESTAMP WITH TIME ZONE", notNull: true, primaryKey: false, autoIncrement: false },
  });
  expect(projectAttributes(Comment)).toEqual({
    id: { field: "id", type: "INTEGER", notNull: true, primaryKey: true, autoIncrement: true },
    characterId: { field: "character_id", type: "INTEGER", notNull: true, primaryKey: false, autoIncrement: false },
    body: { field: "body", type: "TEXT", notNull: true, primaryKey: false, autoIncrement: false },
    createdAt: { field: "created_at", type: "TIMESTAMP WITH TIME ZONE", notNull: true, primaryKey: false, autoIncrement: false },
    updatedAt: { field: "updated_at", type: "TIMESTAMP WITH TIME ZONE", notNull: true, primaryKey: false, autoIncrement: false },
  });
  expect(Character.rawAttributes.isFavorite?.defaultValue).toBe(false);
  expect(Character.associations.comments).toMatchObject({
    associationType: "HasMany",
    as: "comments",
    foreignKey: "characterId",
  });
  expect(Comment.associations.character).toMatchObject({
    associationType: "BelongsTo",
    as: "character",
    foreignKey: "characterId",
  });
  expect(Character.associations.comments?.target).toBe(Comment);
  expect(Comment.associations.character?.target).toBe(Character);
}

async function exerciseModels(adapter: PersistenceAdapter): Promise<void> {
  const { Character, Comment } = adapter.models;
  const character = await Character.create({
    id: 101,
    name: "Model Rick",
    status: "Alive",
    species: "Human",
    characterType: "",
    gender: "Male",
    originName: "Earth",
    originUrl: "https://example.invalid/origin/101",
    imageUrl: "https://example.invalid/avatar/101.jpeg",
  });
  const initial = character.get({ plain: true });
  expect(initial).toMatchObject({ id: 101, isFavorite: false });
  expect(initial.createdAt).toBeInstanceOf(Date);
  expect(initial.updatedAt).toBeInstanceOf(Date);

  const comment = await Comment.create({
    characterId: character.getDataValue("id"),
    body: "Persistence adapter comment",
  });
  expect(comment.getDataValue("id")).toBeTypeOf("number");
  expect(comment.getDataValue("createdAt")).toBeInstanceOf(Date);
  expect(comment.getDataValue("updatedAt")).toBeInstanceOf(Date);

  await character.update({ isFavorite: true });
  await character.reload({ include: [{ association: "comments" }] });
  expect(character.getDataValue("isFavorite")).toBe(true);
  expect(character.getDataValue("updatedAt").getTime()).toBeGreaterThanOrEqual(
    initial.updatedAt.getTime(),
  );
  const loadedComments = character.get("comments") as readonly CommentRecord[];
  expect(loadedComments).toHaveLength(1);
  expect(loadedComments[0]?.getDataValue("body")).toBe(
    "Persistence adapter comment",
  );

  const loadedComment = await Comment.findByPk(comment.getDataValue("id"), {
    include: [{ association: "character" }],
  });
  expect(loadedComment).not.toBeNull();
  const associatedCharacter = loadedComment?.get("character") as
    | CharacterRecord
    | undefined;
  expect(associatedCharacter?.getDataValue("id")).toBe(101);
}

async function listOwnedDatabases(control: PostgresControl): Promise<string[]> {
  const sequelize = await createSequelize(control, control.database);
  try {
    const [rows] = await sequelize.query(
      `SELECT datname
         FROM pg_catalog.pg_database
        WHERE datname OPERATOR(pg_catalog.~) '^task_004_[0-9a-f]{16}$'
        ORDER BY datname`,
    );
    return (rows as { readonly datname: string }[]).map(({ datname }) => datname);
  } finally {
    await sequelize.close();
  }
}

describe("Sequelize persistence adapter", () => {
  it("uses Sequelize models against the migrated schema without synchronization", async () => {
    const control = loadControl();
    const originalFetch = globalThis.fetch;
    let primaryFailure: unknown;

    globalThis.fetch = (() =>
      Promise.reject(
        new Error("PUBLIC_API_ACCESS_FORBIDDEN_DURING_MODEL_TEST"),
      )) as typeof fetch;
    try {
      const artifact = await buildMigrationArtifact();
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const migration = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expect(migration).toMatchObject({
            operation: "up",
            result: 0,
            noOp: false,
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
            },
          });
          console.info(
            `POSTGRES_MIGRATION_READY database=${namespace.database} schema=${namespace.schema}`,
          );

          const sequelize = await createSequelize(control, namespace.database);
          const sync = vi.spyOn(sequelize, "sync");
          let adapterFailure: unknown;
          try {
            const createAdapter = await loadPersistenceAdapter();
            const adapter = createAdapter({ sequelize, schema: namespace.schema });
            expectModelMetadata(adapter, namespace.schema);
            await exerciseModels(adapter);
          } catch (error) {
            adapterFailure = error;
          }

          let closeFailure: unknown;
          try {
            expect(sync).not.toHaveBeenCalled();
            await sequelize.close();
          } catch (error) {
            closeFailure = error;
          }
          if (adapterFailure !== undefined && closeFailure !== undefined) {
            throw new AggregateError(
              [adapterFailure, closeFailure],
              "Sequelize adapter operation and close both failed",
              { cause: adapterFailure },
            );
          }
          if (adapterFailure !== undefined) {
            throw adapterFailure;
          }
          if (closeFailure !== undefined) {
            throw closeFailure;
          }
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });
});
