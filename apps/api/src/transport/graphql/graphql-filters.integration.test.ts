import { once } from "node:events";

import { Client } from "pg";
import { describe, expect, it } from "vitest";

import type { createApp } from "../../app.js";
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

interface CharacterFixture {
  readonly id: number;
  readonly name: string;
  readonly status: string;
  readonly species: string;
  readonly gender: string;
  readonly origin: string;
  readonly imageUrl: string;
}

interface CharacterSummaryResponse {
  readonly id: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly species: string;
}

interface GraphqlResponse {
  readonly data?: {
    readonly characters: readonly CharacterSummaryResponse[];
  };
  readonly errors?: readonly { readonly message: string }[];
}

const fixtures: readonly CharacterFixture[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    origin: "Earth (C-137)",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    gender: "Male",
    origin: "unknown",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  },
  {
    id: 3,
    name: "Summer Smith",
    status: "Alive",
    species: "Human",
    gender: "Female",
    origin: "Earth (Replacement Dimension)",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
  },
  {
    id: 4,
    name: "Krombopulos Michael",
    status: "Dead",
    species: "Gromflomite",
    gender: "Male",
    origin: "Gromflom Prime",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
  },
  {
    id: 5,
    name: "Literal % Hero",
    status: "Dead",
    species: "Test Species",
    gender: "Unknown",
    origin: "Test Origin",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
  },
  {
    id: 6,
    name: "Literal _ Hero",
    status: "Dead",
    species: "Test Species",
    gender: "Unknown",
    origin: "Test Origin",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
  },
  {
    id: 7,
    name: "Literal ' Hero",
    status: "Dead",
    species: "Test Species",
    gender: "Unknown",
    origin: "Test Origin",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
  },
  {
    id: 8,
    name: "Literal %_ Hero",
    status: "Dead",
    species: "Test Species",
    gender: "Unknown",
    origin: "Test Origin",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
  },
  {
    id: 9,
    name: "Exactness Guard",
    status: "Not Alive",
    species: "Guard Species",
    gender: "Not Female",
    origin: "Guard Origin",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/9.jpeg",
  },
];

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

  try {
    const module = (await import(
      /* @vite-ignore */ runtimeSpecifier
    )) as Record<string, unknown>;

    expect(
      module.createRuntimeApplication,
      "TASK-006 runtime PostgreSQL GraphQL composition is missing",
    ).toBeTypeOf("function");

    return module.createRuntimeApplication as CreateRuntimeApplication;
  } catch (error) {
    throw new Error("TASK_006_RUNTIME_COMPOSITION_MISSING", { cause: error });
  }
}

async function insertFixtures(
  sequelize: SequelizeBoundary,
  schema: string,
): Promise<void> {
  if (!/^task_004_[0-9a-f]{16}$/u.test(schema)) {
    throw new Error("Unexpected PostgreSQL test schema identity");
  }

  for (const fixture of fixtures) {
    await sequelize.query(
      `INSERT INTO "${schema}"."characters" (
         "id", "name", "status", "species", "character_type", "gender",
         "origin_name", "origin_url", "image_url", "is_favorite",
         "created_at", "updated_at"
       ) VALUES (
         $1, $2, $3, $4, '', $5, $6, $7, $8, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
       )`,
      {
        bind: [
          fixture.id,
          fixture.name,
          fixture.status,
          fixture.species,
          fixture.gender,
          fixture.origin,
          `https://example.invalid/origin/${fixture.id}`,
          fixture.imageUrl,
        ],
      },
    );
  }
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

async function withHttpApplication<T>(
  app: ReturnType<typeof createApp>,
  run: (baseUrl: string) => Promise<T>,
): Promise<T> {
  const server = app.listen(0, "127.0.0.1");

  try {
    await once(server, "listening");
    const address = server.address();

    if (address === null || typeof address === "string") {
      throw new Error("Expected the GraphQL integration server to use TCP");
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

async function searchCharacters(
  baseUrl: string,
  filter?: Readonly<Record<string, string>>,
): Promise<GraphqlResponse> {
  const response = await fetch(`${baseUrl}/graphql`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `query CharacterSearch($filter: CharacterFilter) {
        characters(filter: $filter) {
          id
          name
          imageUrl
          species
        }
      }`,
      variables: { filter },
    }),
  });

  expect(response.status).toBe(200);
  return (await response.json()) as GraphqlResponse;
}

function sortedCharacters(
  body: GraphqlResponse,
): readonly CharacterSummaryResponse[] {
  expect(body.errors).toBeUndefined();
  expect(body.data).toBeDefined();

  return [...(body.data?.characters ?? [])].sort(
    (left, right) => Number(left.id) - Number(right.id),
  );
}

async function expectCharacterIds(
  baseUrl: string,
  filter: Readonly<Record<string, string>>,
  expectedIds: readonly string[],
): Promise<void> {
  const characters = sortedCharacters(await searchCharacters(baseUrl, filter));
  expect(characters.map(({ id }) => id)).toEqual(expectedIds);
}

function combineFailures(
  primaryFailure: unknown,
  cleanupFailure: unknown,
): AggregateError {
  return new AggregateError(
    [primaryFailure, cleanupFailure],
    "TASK-006 PostgreSQL filter operation and cleanup both failed",
    { cause: primaryFailure },
  );
}

describe("TASK-006 Milestone 2 PostgreSQL GraphQL filters", () => {
  it(
    "serves deterministic literal filter semantics through production composition",
    async () => {
      const control = loadControl();
      const originalFetch = globalThis.fetch;
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
              await insertFixtures(sequelize, namespace.schema);
              const createRuntimeApplication =
                await loadRuntimeApplicationFactory();
              const app = createRuntimeApplication({
                sequelize,
                schema: namespace.schema,
                enableGraphiql: false,
              });

              await withHttpApplication(app, async (baseUrl) => {
                const healthResponse = await fetch(`${baseUrl}/healthz`);
                expect(healthResponse.status).toBe(200);
                expect(await healthResponse.text()).toBe('{"status":"ok"}');

                const unfiltered = sortedCharacters(
                  await searchCharacters(baseUrl),
                );
                expect(unfiltered).toEqual(
                  fixtures.map(({ id, name, imageUrl, species }) => ({
                    id: id.toString(),
                    name,
                    imageUrl,
                    species,
                  })),
                );
                expect(unfiltered[0]?.imageUrl).toBe(fixtures[0]?.imageUrl);

                await expectCharacterIds(baseUrl, { status: "  aLiVe  " }, [
                  "1",
                  "2",
                  "3",
                ]);
                await expectCharacterIds(baseUrl, { gender: "  fEmAlE  " }, [
                  "3",
                ]);
                await expectCharacterIds(baseUrl, { name: "  mOrTy  " }, [
                  "2",
                ]);
                await expectCharacterIds(baseUrl, { species: "  uMaN  " }, [
                  "1",
                  "2",
                  "3",
                ]);
                await expectCharacterIds(baseUrl, { origin: "  eArTh  " }, [
                  "1",
                  "3",
                ]);
                await expectCharacterIds(
                  baseUrl,
                  {
                    status: "Alive",
                    species: "Human",
                    gender: "Female",
                  },
                  ["3"],
                );
                await expectCharacterIds(
                  baseUrl,
                  { status: "   ", name: " Morty ", origin: "\t" },
                  ["2"],
                );
                await expectCharacterIds(baseUrl, { origin: "Saturn" }, []);
                await expectCharacterIds(baseUrl, { name: "%" }, ["5", "8"]);
                await expectCharacterIds(baseUrl, { name: "_" }, ["6", "8"]);
                await expectCharacterIds(baseUrl, { name: "'" }, ["7"]);
                await expectCharacterIds(baseUrl, { name: "%_" }, ["8"]);
              });
            } catch (error) {
              operationFailure = error;
            }

            try {
              await sequelize.close();
            } catch (cleanupFailure) {
              if (operationFailure !== undefined) {
                throw combineFailures(operationFailure, cleanupFailure);
              }
              throw cleanupFailure;
            }

            if (operationFailure !== undefined) {
              throw operationFailure;
            }
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
      if (primaryFailure !== undefined) {
        throw primaryFailure;
      }
      if (residueFailure !== undefined) {
        throw residueFailure;
      }
    },
    90_000,
  );
});
