import { once } from "node:events";

import { Client } from "pg";
import { describe, expect, it, vi } from "vitest";

import { createApp } from "../../app.js";
import { buildMigrationArtifact } from "../../infrastructure/database/migration-artifact.js";
import {
  prepareMigratedNamespace,
  withPostgresNamespace,
} from "../../infrastructure/database/postgres-lifecycle.js";

interface PostgresControl {
  readonly database: string;
  readonly user: string;
  readonly password: string;
  readonly port: number;
}

interface SequelizeBoundary {
  close(): Promise<void>;
  query(
    sql: string,
    options?: Readonly<Record<string, unknown>>,
  ): Promise<readonly [unknown, unknown]>;
}

interface SequelizeConstructor {
  new (
    database: string,
    user: string,
    password: string,
    options: Readonly<Record<string, unknown>>,
  ): SequelizeBoundary;
}

interface RuntimeApplicationOptions {
  readonly sequelize: SequelizeBoundary;
  readonly schema: string;
  readonly enableGraphiql?: boolean;
}

type CreateRuntimeApplication = (
  options: RuntimeApplicationOptions,
) => ReturnType<typeof createApp>;

interface CharacterOrigin {
  readonly name: string;
  readonly url: string;
}

interface CharacterDetail {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
  readonly species: string;
  readonly status: string;
  readonly gender: string;
  readonly type: string;
  readonly origin: CharacterOrigin;
  readonly isFavorite: boolean;
}

interface CharacterComment {
  readonly id: number;
  readonly body: string;
}

interface CommentPage {
  readonly limit: number;
  readonly offset: number;
}

interface CharacterDetailReadService {
  list(filter: unknown): Promise<readonly unknown[]>;
  detail(id: number): Promise<CharacterDetail | null>;
  comments(
    characterId: number,
    page: CommentPage,
  ): Promise<readonly CharacterComment[]>;
}

interface RequestLoggingDependencies {
  readonly write: (line: string) => void;
  readonly createRequestId: () => string;
  readonly now: () => number;
}

interface CharacterDetailAppOptions {
  readonly characterReadService: CharacterDetailReadService;
  readonly enableGraphiql?: boolean;
  readonly requestLogging?: RequestLoggingDependencies;
  readonly reportUnexpectedError?: (error: unknown) => void;
}

interface GraphqlError {
  readonly message: string;
  readonly extensions?: Readonly<Record<string, unknown>>;
}

interface CharacterDetailResponse {
  readonly id: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly species: string;
  readonly status: string;
  readonly gender: string;
  readonly type: string;
  readonly origin: {
    readonly name: string;
    readonly url: string;
  };
  readonly isFavorite: boolean;
  readonly comments: readonly {
    readonly id: string;
    readonly body: string;
  }[];
}

interface GraphqlResponse<TData> {
  readonly data?: TData;
  readonly errors?: readonly GraphqlError[];
}

interface CommentFixture {
  readonly id: number;
  readonly body: string;
  readonly createdAt: Date;
}

const createCharacterDetailApp = createApp as unknown as (
  options: CharacterDetailAppOptions,
) => ReturnType<typeof createApp>;

const storedImageUrl =
  "https://rickandmortyapi.com/api/character/avatar/1.jpeg?stored=byte-exact";

const characterFixture: CharacterDetail = {
  id: 1,
  name: "Rick Sanchez",
  imageUrl: storedImageUrl,
  species: "Human",
  status: "Alive",
  gender: "Male",
  type: "",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  isFavorite: true,
};

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

async function loadRuntimeApplicationFactory(): Promise<CreateRuntimeApplication> {
  const runtimeSpecifier = "../../runtime-composition.js";
  const module = (await import(
    /* @vite-ignore */ runtimeSpecifier
  )) as Record<string, unknown>;

  expect(module.createRuntimeApplication).toBeTypeOf("function");
  return module.createRuntimeApplication as CreateRuntimeApplication;
}

function combineFailures(
  primaryFailure: unknown,
  cleanupFailure: unknown,
): AggregateError {
  return new AggregateError(
    [primaryFailure, cleanupFailure],
    "TASK-006 character detail operation and cleanup both failed",
    { cause: primaryFailure },
  );
}

async function withHttpApplication<T>(
  app: ReturnType<typeof createApp>,
  run: (baseUrl: string) => Promise<T>,
): Promise<T> {
  const server = app.listen(0, "127.0.0.1");
  let primaryFailure: unknown;
  let result: T | undefined;

  try {
    await once(server, "listening");
    const address = server.address();

    if (address === null || typeof address === "string") {
      throw new Error("Expected the character-detail server to use TCP");
    }

    result = await run(`http://127.0.0.1:${address.port}`);
  } catch (error) {
    primaryFailure = error;
  }

  let cleanupFailure: unknown;
  if (server.listening) {
    try {
      const closed = once(server, "close");
      server.close();
      await closed;
    } catch (error) {
      cleanupFailure = error;
    }
  }

  if (primaryFailure !== undefined && cleanupFailure !== undefined) {
    throw combineFailures(primaryFailure, cleanupFailure);
  }
  if (primaryFailure !== undefined) {
    throw primaryFailure;
  }
  if (cleanupFailure !== undefined) {
    throw cleanupFailure;
  }

  return result as T;
}

function createCommentFixtures(): readonly CommentFixture[] {
  const latestTimestamp = Date.parse("2026-08-17T12:00:00.000Z");

  return Array.from({ length: 55 }, (_, index) => {
    const id = index + 1;
    const minutesBeforeLatest = id >= 54 ? 0 : 54 - id;

    return {
      id,
      body: `Comment ${id}`,
      createdAt: new Date(latestTimestamp - minutesBeforeLatest * 60_000),
    };
  });
}

function newestFirst(
  comments: readonly CommentFixture[],
): readonly CommentFixture[] {
  return [...comments].sort(
    (left, right) =>
      right.createdAt.getTime() - left.createdAt.getTime() ||
      right.id - left.id,
  );
}

async function insertFixtures(
  sequelize: SequelizeBoundary,
  schema: string,
  comments: readonly CommentFixture[],
): Promise<void> {
  if (!/^task_004_[0-9a-f]{16}$/u.test(schema)) {
    throw new Error("Unexpected PostgreSQL test schema identity");
  }

  await sequelize.query(
    `INSERT INTO "${schema}"."characters" (
       "id", "name", "status", "species", "character_type", "gender",
       "origin_name", "origin_url", "image_url", "is_favorite",
       "created_at", "updated_at"
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $11)`,
    {
      bind: [
        characterFixture.id,
        characterFixture.name,
        characterFixture.status,
        characterFixture.species,
        characterFixture.type,
        characterFixture.gender,
        characterFixture.origin.name,
        characterFixture.origin.url,
        characterFixture.imageUrl,
        characterFixture.isFavorite,
        new Date("2026-08-17T10:00:00.000Z"),
      ],
    },
  );

  for (const comment of comments) {
    await sequelize.query(
      `INSERT INTO "${schema}"."comments" (
         "id", "character_id", "body", "created_at", "updated_at"
       ) VALUES ($1, $2, $3, $4, $4)`,
      {
        bind: [
          comment.id,
          characterFixture.id,
          comment.body,
          comment.createdAt,
        ],
      },
    );
  }
}

async function postGraphql<TData>(
  baseUrl: string,
  body: Readonly<Record<string, unknown>>,
): Promise<{
  readonly response: Response;
  readonly body: GraphqlResponse<TData>;
}> {
  const response = await fetch(`${baseUrl}/graphql`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  return {
    response,
    body: (await response.json()) as GraphqlResponse<TData>,
  };
}

async function queryCharacter(
  baseUrl: string,
  id: string,
  page?: Partial<CommentPage>,
): Promise<{
  readonly response: Response;
  readonly body: GraphqlResponse<{
    readonly character: CharacterDetailResponse | null;
  }>;
}> {
  const variables: Record<string, unknown> = { id };
  if (page?.limit !== undefined) variables.limit = page.limit;
  if (page?.offset !== undefined) variables.offset = page.offset;

  return postGraphql(baseUrl, {
    operationName: "CharacterDetailRead",
    query: `query CharacterDetailRead($id: ID!, $limit: Int, $offset: Int) {
      character(id: $id) {
        id
        name
        imageUrl
        species
        status
        gender
        type
        origin { name url }
        isFavorite
        comments(limit: $limit, offset: $offset) { id body }
      }
    }`,
    variables,
  });
}

function expectErrorCode(
  body: GraphqlResponse<unknown>,
  expectedCode: string,
): void {
  expect(body.data).toEqual({ character: null });
  expect(body.errors).toHaveLength(1);
  expect(body.errors?.[0]?.extensions?.code).toBe(expectedCode);
}

function projectComments(
  comments: readonly CommentFixture[],
): readonly { readonly id: string; readonly body: string }[] {
  return comments.map(({ id, body }) => ({ id: id.toString(), body }));
}

async function databaseExists(
  control: PostgresControl,
  database: string,
): Promise<boolean> {
  const client = new Client({
    host: "127.0.0.1",
    port: control.port,
    database: control.database,
    user: control.user,
    password: control.password,
    ssl: false,
    connectionTimeoutMillis: 10_000,
  });

  try {
    await client.connect();
    const result = await client.query(
      "SELECT 1 FROM pg_catalog.pg_database WHERE datname = $1",
      [database],
    );
    return result.rowCount !== 0;
  } finally {
    await client.end();
  }
}

function createMockDetailService(overrides: {
  readonly list?: CharacterDetailReadService["list"];
  readonly detail?: CharacterDetailReadService["detail"];
  readonly comments?: CharacterDetailReadService["comments"];
} = {}): CharacterDetailReadService {
  return {
    list: overrides.list ?? vi.fn(async () => []),
    detail: overrides.detail ?? vi.fn(async () => characterFixture),
    comments: overrides.comments ?? vi.fn(async () => []),
  };
}

async function proveInputValidation(): Promise<void> {
  const detail = vi.fn(async () => characterFixture);
  const comments = vi.fn(async () => []);
  const service = createMockDetailService({ detail, comments });
  const app = createCharacterDetailApp({ characterReadService: service });

  await withHttpApplication(app, async (baseUrl) => {
    for (const id of ["abc", "0", "-1", "1.5"]) {
      const { body } = await queryCharacter(baseUrl, id);
      expectErrorCode(body, "BAD_USER_INPUT");
    }
    expect(detail).not.toHaveBeenCalled();

    for (const page of [
      { limit: 0, offset: 0 },
      { limit: 51, offset: 0 },
      { limit: 20, offset: -1 },
    ]) {
      const { body } = await queryCharacter(baseUrl, "1", page);
      expectErrorCode(body, "BAD_USER_INPUT");
    }
    expect(comments).not.toHaveBeenCalled();
  });
}

async function proveDiagnosticSeparation(): Promise<void> {
  const originalFailure = new Error(
    "SECRET_SENTINEL SELECT * FROM comments redis://internal C:\\private\\detail.ts",
  );
  originalFailure.stack =
    "STACK_SENTINEL at internalResolver (C:\\private\\detail.ts:1:1)";
  const reportUnexpectedError = vi.fn();
  const emittedLines: string[] = [];
  const times = [500, 509];
  const service = createMockDetailService({
    detail: vi.fn(async () => {
      throw originalFailure;
    }),
  });
  const app = createCharacterDetailApp({
    characterReadService: service,
    reportUnexpectedError,
    requestLogging: {
      write: (line) => emittedLines.push(line),
      createRequestId: () => "req-detail-error-001",
      now: () => {
        const value = times.shift();
        if (value === undefined) throw new Error("Injected time exhausted");
        return value;
      },
    },
  });

  await withHttpApplication(app, async (baseUrl) => {
    const { body } = await queryCharacter(baseUrl, "1");
    expectErrorCode(body, "INTERNAL_SERVER_ERROR");

    expect(reportUnexpectedError).toHaveBeenCalledOnce();
    const reportedFailure = reportUnexpectedError.mock.calls[0]?.[0];
    expect(reportedFailure).toBe(originalFailure);
    expect(emittedLines).toHaveLength(1);

    const record = JSON.parse(emittedLines[0] ?? "") as Record<
      string,
      unknown
    >;
    expect(record).toMatchObject({
      requestId: "req-detail-error-001",
      method: "POST",
      path: "/graphql",
      errorCount: 1,
      operationName: "CharacterDetailRead",
    });

    const clientAndRequestOutput = `${JSON.stringify(body)}${emittedLines.join("")}`;
    for (const excluded of [
      "SECRET_SENTINEL",
      "SELECT * FROM comments",
      "redis://internal",
      "C:\\private\\detail.ts",
      "STACK_SENTINEL",
      "internalResolver",
    ]) {
      expect(clientAndRequestOutput).not.toContain(excluded);
    }
  });
}

async function proveListDiagnosticSeparation(): Promise<void> {
  const originalListFailure = new Error(
    "LIST_SECRET_SENTINEL SELECT * FROM characters redis://internal C:\\private\\list.ts",
  );
  originalListFailure.stack =
    "LIST_STACK_SENTINEL at listResolver (C:\\private\\list.ts:1:1)";
  const reportUnexpectedError = vi.fn();
  const emittedLines: string[] = [];
  const times = [700, 704];
  const service = createMockDetailService({
    list: vi.fn(async () => {
      throw originalListFailure;
    }),
  });
  const app = createCharacterDetailApp({
    characterReadService: service,
    reportUnexpectedError,
    requestLogging: {
      write: (line) => emittedLines.push(line),
      createRequestId: () => "req-list-error-001",
      now: () => {
        const value = times.shift();
        if (value === undefined) throw new Error("Injected time exhausted");
        return value;
      },
    },
  });

  await withHttpApplication(app, async (baseUrl) => {
    const { body } = await postGraphql<{
      readonly characters: readonly { readonly id: string }[];
    }>(baseUrl, {
      operationName: "CharacterListFailure",
      query: `query CharacterListFailure {
        characters { id }
      }`,
    });

    expect(body.data).toBeNull();
    expect(body.errors).toHaveLength(1);
    expect(body.errors?.[0]?.extensions?.code).toBe("INTERNAL_SERVER_ERROR");
    expect(emittedLines).toHaveLength(1);

    const record = JSON.parse(emittedLines[0] ?? "") as Record<
      string,
      unknown
    >;
    expect(record).toMatchObject({
      requestId: "req-list-error-001",
      method: "POST",
      path: "/graphql",
      errorCount: 1,
      operationName: "CharacterListFailure",
    });

    const clientAndRequestOutput = `${JSON.stringify(body)}${emittedLines.join("")}`;
    for (const excluded of [
      "LIST_SECRET_SENTINEL",
      "SELECT * FROM characters",
      "redis://internal",
      "C:\\private\\list.ts",
      "LIST_STACK_SENTINEL",
      "listResolver",
    ]) {
      expect(clientAndRequestOutput).not.toContain(excluded);
    }

    if (reportUnexpectedError.mock.calls.length === 0) {
      throw new Error("TASK_006_LIST_DIAGNOSTIC_MISSING");
    }

    expect(reportUnexpectedError).toHaveBeenCalledOnce();
    const reportedFailure = reportUnexpectedError.mock.calls[0]?.[0];
    expect(reportedFailure).toBe(originalListFailure);
  });
}

describe("TASK-006 Milestone 4 PostgreSQL GraphQL character detail", () => {
  it(
    "serves exact detail, bounded comments, stable errors, and separate diagnostics",
    async () => {
      const control = loadControl();
      const originalFetch = globalThis.fetch;
      const comments = createCommentFixtures();
      const orderedComments = newestFirst(comments);
      let runDatabase: string | undefined;
      let primaryFailure: unknown;

      globalThis.fetch = (async (input, init) => {
        const url = new URL(
          typeof input === "string"
            ? input
            : input instanceof URL
              ? input.href
              : input.url,
        );

        if (url.hostname !== "127.0.0.1") {
          throw new Error(`LIVE_EXTERNAL_REQUEST_FORBIDDEN: ${url.origin}`);
        }

        return originalFetch(input, init);
      }) as typeof fetch;

      try {
        const artifact = await buildMigrationArtifact();
        await withPostgresNamespace({
          control,
          body: async (namespace) => {
            runDatabase = namespace.database;
            console.info(
              `TASK_006_POSTGRES_NAMESPACE database=${namespace.database} schema=${namespace.schema}`,
            );
            await prepareMigratedNamespace({
              target: namespace.target,
              buildRoot: artifact.buildRoot,
            });

            const sequelize = await createSequelize(control, namespace.database);
            let operationFailure: unknown;

            try {
              await insertFixtures(sequelize, namespace.schema, comments);
              const createRuntimeApplication =
                await loadRuntimeApplicationFactory();
              const app = createRuntimeApplication({
                sequelize,
                schema: namespace.schema,
                enableGraphiql: false,
              });

              await withHttpApplication(app, async (baseUrl) => {
                const initial = await queryCharacter(baseUrl, "1");
                if (
                  initial.body.errors?.some(({ message }) =>
                    message.includes('Cannot query field "character"'),
                  )
                ) {
                  throw new Error("TASK_006_CHARACTER_DETAIL_QUERY_MISSING");
                }

                expect(initial.response.status).toBe(200);
                expect(initial.body.errors).toBeUndefined();
                expect(initial.body.data?.character).toEqual({
                  id: "1",
                  name: characterFixture.name,
                  imageUrl: storedImageUrl,
                  species: characterFixture.species,
                  status: characterFixture.status,
                  gender: characterFixture.gender,
                  type: characterFixture.type,
                  origin: characterFixture.origin,
                  isFavorite: true,
                  comments: projectComments(orderedComments.slice(0, 20)),
                });
                expect(initial.body.data?.character?.imageUrl).toBe(
                  storedImageUrl,
                );

                const maximumPage = await queryCharacter(baseUrl, "1", {
                  limit: 50,
                  offset: 3,
                });
                expect(maximumPage.body.errors).toBeUndefined();
                expect(maximumPage.body.data?.character?.comments).toEqual(
                  projectComments(orderedComments.slice(3, 53)),
                );
                expect(
                  maximumPage.body.data?.character?.comments.length,
                ).toBeLessThanOrEqual(50);

                const equalTimestampPage = await queryCharacter(baseUrl, "1", {
                  limit: 2,
                  offset: 0,
                });
                expect(
                  equalTimestampPage.body.data?.character?.comments.map(
                    ({ id }) => id,
                  ),
                ).toEqual(["55", "54"]);

                const missing = await queryCharacter(baseUrl, "999");
                expectErrorCode(missing.body, "NOT_FOUND");

                const introspection = await postGraphql<{
                  readonly detail: {
                    readonly fields: readonly { readonly name: string }[];
                  } | null;
                  readonly origin: {
                    readonly fields: readonly { readonly name: string }[];
                  } | null;
                  readonly comment: {
                    readonly fields: readonly { readonly name: string }[];
                  } | null;
                }>(baseUrl, {
                  query: `query DetailSchema {
                    detail: __type(name: "CharacterDetail") { fields { name } }
                    origin: __type(name: "Origin") { fields { name } }
                    comment: __type(name: "Comment") { fields { name } }
                  }`,
                });
                expect(introspection.body.errors).toBeUndefined();
                expect(
                  introspection.body.data?.detail?.fields
                    .map(({ name }) => name)
                    .sort(),
                ).toEqual([
                  "comments",
                  "gender",
                  "id",
                  "imageUrl",
                  "isFavorite",
                  "name",
                  "origin",
                  "species",
                  "status",
                  "type",
                ]);
                expect(
                  introspection.body.data?.origin?.fields
                    .map(({ name }) => name)
                    .sort(),
                ).toEqual(["name", "url"]);
                expect(
                  introspection.body.data?.comment?.fields
                    .map(({ name }) => name)
                    .sort(),
                ).toEqual(["body", "id"]);
              });

              await proveInputValidation();
              await proveDiagnosticSeparation();
              await proveListDiagnosticSeparation();
            } catch (error) {
              operationFailure = error;
            }

            let cleanupFailure: unknown;
            try {
              await sequelize.close();
            } catch (error) {
              cleanupFailure = error;
            }

            if (
              operationFailure !== undefined &&
              cleanupFailure !== undefined
            ) {
              throw combineFailures(operationFailure, cleanupFailure);
            }
            if (operationFailure !== undefined) throw operationFailure;
            if (cleanupFailure !== undefined) throw cleanupFailure;
          },
        });
      } catch (error) {
        primaryFailure = error;
      } finally {
        globalThis.fetch = originalFetch;
      }

      let residueFailure: unknown;
      if (runDatabase !== undefined) {
        try {
          expect(await databaseExists(control, runDatabase)).toBe(false);
          console.info(`TASK_006_POSTGRES_CLEAN database=${runDatabase}`);
        } catch (error) {
          residueFailure = error;
        }
      }

      if (primaryFailure !== undefined && residueFailure !== undefined) {
        throw combineFailures(primaryFailure, residueFailure);
      }
      if (primaryFailure !== undefined) throw primaryFailure;
      if (residueFailure !== undefined) throw residueFailure;
    },
    90_000,
  );
});
