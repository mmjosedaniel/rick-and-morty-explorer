import { once } from "node:events";

import { Client } from "pg";
import { describe, expect, it, vi } from "vitest";

import { createApp } from "../../app.js";
import { buildMigrationArtifact } from "../../infrastructure/database/migration-artifact.js";
import {
  prepareMigratedNamespace,
  withPostgresNamespace,
} from "../../infrastructure/database/postgres-lifecycle.js";

interface CharacterDetail {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
  readonly species: string;
  readonly status: string;
  readonly gender: string;
  readonly type: string;
  readonly origin: { readonly name: string; readonly url: string };
  readonly isFavorite: boolean;
}

interface CharacterComment {
  readonly id: number;
  readonly body: string;
}

interface CharacterInteractionService {
  setFavorite(
    id: number,
    isFavorite: boolean,
  ): Promise<CharacterDetail | null>;
  addComment(
    characterId: number,
    body: string,
  ): Promise<CharacterComment | null>;
}

interface CharacterReadService {
  list(filter: unknown): Promise<readonly unknown[]>;
  detail?(id: number): Promise<CharacterDetail | null>;
  comments?(
    characterId: number,
    page: { readonly limit: number; readonly offset: number },
  ): Promise<readonly CharacterComment[]>;
}

interface MutationAppOptions {
  readonly characterReadService: CharacterReadService;
  readonly characterInteractionService: CharacterInteractionService;
  readonly reportUnexpectedError?: (error: unknown) => void;
}

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

interface GraphqlError {
  readonly message: string;
  readonly extensions?: Readonly<Record<string, unknown>>;
}

interface GraphqlResponse<TData> {
  readonly data?: TData | null;
  readonly errors?: readonly GraphqlError[];
}

interface CharacterDetailResponse {
  readonly id: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly species: string;
  readonly status: string;
  readonly gender: string;
  readonly type: string;
  readonly origin: { readonly name: string; readonly url: string };
  readonly isFavorite: boolean;
  readonly comments: readonly { readonly id: string; readonly body: string }[];
}

type CreateRuntimeApplication = (
  options: RuntimeApplicationOptions,
) => ReturnType<typeof createApp>;

const createMutationApp = createApp as unknown as (
  options: MutationAppOptions,
) => ReturnType<typeof createApp>;

const imageUrl =
  "https://rickandmortyapi.com/api/character/avatar/1.jpeg?task=008";
const detailFixture: CharacterDetail = {
  id: 1,
  name: "Rick Sanchez",
  imageUrl,
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
  const specifier = "sequelize";
  const module = (await import(
    /* @vite-ignore */ specifier
  )) as Record<string, unknown>;
  expect(module.Sequelize).toBeTypeOf("function");
  const Sequelize = module.Sequelize as SequelizeConstructor;

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
  const specifier = "../../runtime-composition.js";
  const module = (await import(
    /* @vite-ignore */ specifier
  )) as Record<string, unknown>;
  expect(module.createRuntimeApplication).toBeTypeOf("function");
  return module.createRuntimeApplication as CreateRuntimeApplication;
}

async function withHttpApplication<T>(
  app: ReturnType<typeof createApp>,
  run: (baseUrl: string) => Promise<T>,
): Promise<T> {
  const server = app.listen(0, "127.0.0.1");

  try {
    await once(server, "listening");
    const address = server.address();
    if (address === null || typeof address === "string") {
      throw new Error("Expected the TASK-008 test server to use TCP");
    }
    return await run(`http://127.0.0.1:${address.port}`);
  } finally {
    if (server.listening) {
      const closed = once(server, "close");
      server.close();
      await closed;
    }
  }
}

async function postGraphql<TData>(
  baseUrl: string,
  body: Readonly<Record<string, unknown>>,
): Promise<GraphqlResponse<TData>> {
  const response = await fetch(`${baseUrl}/graphql`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  expect.soft(response.status).toBe(200);
  return (await response.json()) as GraphqlResponse<TData>;
}

function setFavorite(
  baseUrl: string,
  id: unknown,
  isFavorite: boolean,
): Promise<
  GraphqlResponse<{ readonly setCharacterFavorite: CharacterDetailResponse }>
> {
  return postGraphql(baseUrl, {
    operationName: "SetCharacterFavorite",
    query: `mutation SetCharacterFavorite($id: ID!, $isFavorite: Boolean!) {
      setCharacterFavorite(id: $id, isFavorite: $isFavorite) {
        id name imageUrl species status gender type
        origin { name url }
        isFavorite
        comments { id body }
      }
    }`,
    variables: { id, isFavorite },
  });
}

function addComment(
  baseUrl: string,
  characterId: unknown,
  body: string,
): Promise<GraphqlResponse<{ readonly addCharacterComment: CharacterComment }>> {
  return postGraphql(baseUrl, {
    operationName: "AddCharacterComment",
    query: `mutation AddCharacterComment($characterId: ID!, $body: String!) {
      addCharacterComment(characterId: $characterId, body: $body) { id body }
    }`,
    variables: { characterId, body },
  });
}

function queryCharacter(
  baseUrl: string,
): Promise<GraphqlResponse<{ readonly character: CharacterDetailResponse | null }>> {
  return postGraphql(baseUrl, {
    operationName: "ReadDurableInteractions",
    query: `query ReadDurableInteractions {
      character(id: "1") {
        id name imageUrl species status gender type
        origin { name url }
        isFavorite
        comments { id body }
      }
    }`,
  });
}

function expectCode(
  response: GraphqlResponse<unknown>,
  expectedCode: string,
): void {
  expect.soft(response.errors).toHaveLength(1);
  expect.soft(response.errors?.[0]?.extensions?.code).toBe(expectedCode);
}

function expectSourceOwnedFields(
  character: CharacterDetailResponse | undefined,
): void {
  expect.soft(character).toMatchObject({
    id: "1",
    name: detailFixture.name,
    imageUrl: detailFixture.imageUrl,
    species: detailFixture.species,
    status: detailFixture.status,
    gender: detailFixture.gender,
    type: detailFixture.type,
    origin: detailFixture.origin,
  });
}

async function seedCharacter(
  sequelize: SequelizeBoundary,
  schema: string,
): Promise<void> {
  if (!/^task_004_[0-9a-f]{16}$/u.test(schema)) {
    throw new Error("Unexpected PostgreSQL test schema identity");
  }
  await sequelize.query(
    `INSERT INTO "${schema}"."characters" (
       "id", "name", "status", "species", "character_type", "gender",
       "origin_name", "origin_url", "image_url", "is_favorite"
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, false)`,
    {
      bind: [
        1,
        detailFixture.name,
        detailFixture.status,
        detailFixture.species,
        detailFixture.type,
        detailFixture.gender,
        detailFixture.origin.name,
        detailFixture.origin.url,
        detailFixture.imageUrl,
      ],
    },
  );
}

async function readFavorite(
  sequelize: SequelizeBoundary,
  schema: string,
): Promise<boolean> {
  const [rows] = await sequelize.query(
    `SELECT "is_favorite" AS "isFavorite"
       FROM "${schema}"."characters" WHERE "id" = $1`,
    { bind: [1] },
  );
  return (rows as readonly { readonly isFavorite: boolean }[])[0]?.isFavorite ?? false;
}

async function countComments(
  sequelize: SequelizeBoundary,
  schema: string,
): Promise<number> {
  const [rows] = await sequelize.query(
    `SELECT COUNT(*)::integer AS "count" FROM "${schema}"."comments"`,
  );
  return (rows as readonly { readonly count: number }[])[0]?.count ?? -1;
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

describe("TASK-008 Milestone 1 GraphQL character mutations", () => {
  it("validates IDs, maps missing and unexpected failures, and calls only positive-ID interactions", async () => {
    const setFavoriteService = vi.fn<CharacterInteractionService["setFavorite"]>(
      async () => detailFixture,
    );
    const addCommentService = vi.fn<CharacterInteractionService["addComment"]>(
      async (_id: number, body: string) => ({ id: 71, body: body.trim() }),
    );
    const reportUnexpectedError = vi.fn();
    const app = createMutationApp({
      characterReadService: {
        list: vi.fn(async () => []),
        comments: vi.fn(async () => []),
      },
      characterInteractionService: {
        setFavorite: setFavoriteService,
        addComment: addCommentService,
      },
      reportUnexpectedError,
    });

    await withHttpApplication(app, async (baseUrl) => {
      const favorite = await setFavorite(baseUrl, "1", true);
      expect.soft(favorite.errors).toBeUndefined();
      expect.soft(favorite.data?.setCharacterFavorite.isFavorite).toBe(true);
      const comment = await addComment(baseUrl, "1", "  safe text  ");
      expect.soft(comment.errors).toBeUndefined();
      expect.soft(comment.data?.addCharacterComment).toEqual({
        id: "71",
        body: "safe text",
      });

      for (const invalidId of [
        "abc",
        "0",
        "-1",
        "1.5",
        "9007199254740992",
      ]) {
        expectCode(await setFavorite(baseUrl, invalidId, true), "BAD_USER_INPUT");
        expectCode(await addComment(baseUrl, invalidId, "Valid"), "BAD_USER_INPUT");
      }
      expect.soft(setFavoriteService).toHaveBeenCalledTimes(1);
      expect.soft(setFavoriteService).toHaveBeenCalledWith(1, true);
      expect.soft(addCommentService).toHaveBeenCalledTimes(1);
      expect.soft(addCommentService).toHaveBeenCalledWith(1, "  safe text  ");

      setFavoriteService.mockResolvedValueOnce(null);
      addCommentService.mockResolvedValueOnce(null);
      expectCode(await setFavorite(baseUrl, "999", true), "NOT_FOUND");
      expectCode(await addComment(baseUrl, "999", "Valid"), "NOT_FOUND");

      const failure = new Error(
        "COMMENT_SECRET SELECT * FROM comments redis://internal C:\\private\\mutation.ts",
      );
      setFavoriteService.mockRejectedValueOnce(failure);
      addCommentService.mockRejectedValueOnce(failure);
      const failedFavorite = await setFavorite(baseUrl, "1", false);
      const failedComment = await addComment(baseUrl, "1", "COMMENT_SECRET");
      expectCode(failedFavorite, "INTERNAL_SERVER_ERROR");
      expectCode(failedComment, "INTERNAL_SERVER_ERROR");
      expect.soft(reportUnexpectedError.mock.calls).toEqual([
        [failure],
        [failure],
      ]);
      const clientOutput = JSON.stringify([failedFavorite, failedComment]);
      for (const excluded of [
        "COMMENT_SECRET",
        "SELECT * FROM comments",
        "redis://internal",
        "C:\\private\\mutation.ts",
      ]) {
        expect.soft(clientOutput).not.toContain(excluded);
      }
    });
  });

  it("reports an unavailable favorite-response comment service instead of returning an empty success", async () => {
    const setFavoriteService = vi.fn<CharacterInteractionService["setFavorite"]>(
      async () => detailFixture,
    );
    const reportUnexpectedError = vi.fn();
    const app = createMutationApp({
      characterReadService: { list: vi.fn(async () => []) },
      characterInteractionService: {
        setFavorite: setFavoriteService,
        addComment: vi.fn(async () => ({ id: 71, body: "unused" })),
      },
      reportUnexpectedError,
    });

    await withHttpApplication(app, async (baseUrl) => {
      const response = await setFavorite(baseUrl, "1", true);

      expect.soft(response.data).toBeNull();
      expectCode(response, "INTERNAL_SERVER_ERROR");
      expect
        .soft(response.data?.setCharacterFavorite.comments)
        .not.toEqual([]);
      expect.soft(setFavoriteService).toHaveBeenCalledOnce();
      expect.soft(reportUnexpectedError).toHaveBeenCalledOnce();
      expect.soft(reportUnexpectedError.mock.calls[0]?.[0]).toMatchObject({
        message: "CHARACTER_COMMENT_SERVICE_UNAVAILABLE",
      });
      expect(JSON.stringify(response)).not.toContain(
        "CHARACTER_COMMENT_SERVICE_UNAVAILABLE",
      );
    });
  });

  it(
    "persists bounded interactions and reads them through a fresh PostgreSQL composition",
    async () => {
      const control = loadControl();
      const artifact = await buildMigrationArtifact();
      const markup = "<script>alert('unsafe')</script>";
      const thousandCodePoints = "🧪".repeat(1_000);
      let runDatabase: string | undefined;

      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          runDatabase = namespace.database;
          console.info(
            `TASK_008_POSTGRES_NAMESPACE database=${namespace.database} schema=${namespace.schema}`,
          );
          await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });

          const createRuntimeApplication =
            await loadRuntimeApplicationFactory();
          const writer = await createSequelize(control, namespace.database);
          try {
            await seedCharacter(writer, namespace.schema);
            const app = createRuntimeApplication({
              sequelize: writer,
              schema: namespace.schema,
              enableGraphiql: false,
            });
            await withHttpApplication(app, async (baseUrl) => {
              for (const invalidBody of [
                "",
                " \t\r\n ",
                "🧪".repeat(1_001),
              ]) {
                expectCode(
                  await addComment(baseUrl, "1", invalidBody),
                  "BAD_USER_INPUT",
                );
              }
              expect.soft(await countComments(writer, namespace.schema)).toBe(0);

              const favoriteTrue = await setFavorite(baseUrl, "1", true);
              expect.soft(favoriteTrue.errors).toBeUndefined();
              expect.soft(
                favoriteTrue.data?.setCharacterFavorite.isFavorite,
              ).toBe(true);
              expectSourceOwnedFields(
                favoriteTrue.data?.setCharacterFavorite,
              );
              expect.soft(await readFavorite(writer, namespace.schema)).toBe(true);

              const favoriteFalse = await setFavorite(baseUrl, "1", false);
              expect.soft(favoriteFalse.errors).toBeUndefined();
              expect.soft(
                favoriteFalse.data?.setCharacterFavorite.isFavorite,
              ).toBe(false);
              expectSourceOwnedFields(
                favoriteFalse.data?.setCharacterFavorite,
              );
              expect.soft(await readFavorite(writer, namespace.schema)).toBe(false);

              for (const body of ["x", thousandCodePoints, `  ${markup}  `]) {
                const created = await addComment(baseUrl, "1", body);
                expect.soft(created.errors).toBeUndefined();
                expect.soft(created.data?.addCharacterComment.body).toBe(
                  body.trim(),
                );
              }
              expect.soft(await countComments(writer, namespace.schema)).toBe(3);
              const favoriteBeforeMissing = await readFavorite(
                writer,
                namespace.schema,
              );
              const commentsBeforeMissing = await countComments(
                writer,
                namespace.schema,
              );
              expectCode(await setFavorite(baseUrl, "999", true), "NOT_FOUND");
              expectCode(
                await addComment(baseUrl, "999", "Valid comment"),
                "NOT_FOUND",
              );
              expect
                .soft(await readFavorite(writer, namespace.schema))
                .toBe(favoriteBeforeMissing);
              expect
                .soft(await countComments(writer, namespace.schema))
                .toBe(commentsBeforeMissing);
            });
          } finally {
            await writer.close();
          }

          const reader = await createSequelize(control, namespace.database);
          try {
            const freshApp = createRuntimeApplication({
              sequelize: reader,
              schema: namespace.schema,
              enableGraphiql: false,
            });
            await withHttpApplication(freshApp, async (baseUrl) => {
              const readback = await queryCharacter(baseUrl);
              expect.soft(readback.errors).toBeUndefined();
              expectSourceOwnedFields(readback.data?.character ?? undefined);
              expect.soft(readback.data?.character?.isFavorite).toBe(false);
              expect
                .soft(readback.data?.character?.comments.map(({ body }) => body))
                .toEqual(expect.arrayContaining(["x", thousandCodePoints, markup]));
            });
          } finally {
            await reader.close();
          }
        },
      });

      if (runDatabase === undefined) {
        throw new Error("TASK_008_POSTGRES_NAMESPACE_MISSING");
      }
      expect(await databaseExists(control, runDatabase)).toBe(false);
      console.info(`TASK_008_POSTGRES_CLEAN database=${runDatabase}`);
    },
    90_000,
  );
});
