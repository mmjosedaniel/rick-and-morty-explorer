import { Client } from "pg";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { buildMigrationArtifact } from "../database/migration-artifact.js";
import {
  prepareMigratedNamespace,
  withPostgresNamespace,
} from "../database/postgres-lifecycle.js";

interface PostgresControl {
  readonly database: string;
  readonly user: string;
  readonly password: string;
  readonly port: number;
}

interface CompositionOptions {
  readonly argv: readonly string[];
  readonly environment: NodeJS.ProcessEnv;
  readonly fetch: typeof fetch;
  readonly requestInvalidation: () => Promise<void>;
  readonly writeError: (diagnostic: string) => void;
  readonly writeWarning: (diagnostic: string) => void;
}

interface CharacterImportCliModule {
  runCharacterImportComposition(options: CompositionOptions): Promise<number>;
}

let cli: CharacterImportCliModule;

const invalidationFailed = "CHARACTER_IMPORT_INVALIDATION_FAILED\n";

function isMissingCli(error: unknown): boolean {
  return (
    error instanceof Error &&
    (("code" in error && error.code === "ERR_MODULE_NOT_FOUND") ||
      error.message.includes("character-import-cli"))
  );
}

async function loadCliBeforeAllocatingPostgres(): Promise<CharacterImportCliModule> {
  const cliSpecifier = "./character-import-cli.js";
  try {
    const module = (await import(
      /* @vite-ignore */ cliSpecifier
    )) as Record<string, unknown>;
    expect(module.runCharacterImportComposition).toBeTypeOf("function");
    return module as unknown as CharacterImportCliModule;
  } catch (error) {
    if (!isMissingCli(error)) {
      throw error;
    }
    throw new Error("TASK_005_CHARACTER_IMPORT_CLI_MISSING", { cause: error });
  }
}

function loadControl(): PostgresControl {
  return {
    database: process.env.POSTGRES_DB ?? "rick_and_morty",
    user: process.env.POSTGRES_USER ?? "rick_and_morty",
    password: process.env.POSTGRES_PASSWORD ?? "local-development-only",
    port: Number(process.env.POSTGRES_PORT ?? "5432"),
  };
}

function clientConfig(control: PostgresControl, database: string) {
  return {
    host: "127.0.0.1",
    port: control.port,
    database,
    user: control.user,
    password: control.password,
    ssl: false,
  } as const;
}

async function withClient<T>(
  control: PostgresControl,
  database: string,
  body: (client: Client) => Promise<T>,
): Promise<T> {
  const client = new Client(clientConfig(control, database));
  await client.connect();
  try {
    return await body(client);
  } finally {
    await client.end();
  }
}

async function listOwnedDatabases(
  control: PostgresControl,
): Promise<readonly string[]> {
  return withClient(control, control.database, async (client) => {
    const result = await client.query<{ readonly datname: string }>(
      "SELECT datname FROM pg_database WHERE datname ~ '^task_004_[0-9a-f]{16}$' ORDER BY datname",
    );
    return result.rows.map(({ datname }) => datname);
  });
}

async function readCharacterIds(
  control: PostgresControl,
  database: string,
  schema: string,
): Promise<readonly number[]> {
  if (!/^task_004_[0-9a-f]{16}$/u.test(schema)) {
    throw new Error("TEST_POSTGRES_NAMESPACE_INVALID");
  }
  return withClient(control, database, async (client) => {
    const result = await client.query<{ readonly id: number }>(
      `SELECT "id" FROM "${schema}"."characters" ORDER BY "id"`,
    );
    return result.rows.map(({ id }) => id);
  });
}

async function readCharacterName(
  control: PostgresControl,
  database: string,
  schema: string,
  id: number,
): Promise<string | undefined> {
  if (!/^task_004_[0-9a-f]{16}$/u.test(schema)) {
    throw new Error("TEST_POSTGRES_NAMESPACE_INVALID");
  }
  return withClient(control, database, async (client) => {
    const result = await client.query<{ readonly name: string }>(
      `SELECT "name" FROM "${schema}"."characters" WHERE "id" = $1`,
      [id],
    );
    return result.rows[0]?.name;
  });
}

async function countNamespaceBackends(
  control: PostgresControl,
  database: string,
): Promise<number> {
  return withClient(control, control.database, async (client) => {
    const result = await client.query<{ readonly count: string }>(
      "SELECT COUNT(*)::text AS count FROM pg_stat_activity WHERE datname = $1",
      [database],
    );
    return Number(result.rows[0]?.count ?? "-1");
  });
}

function upstreamCharacter(id: number, namePrefix = "Character") {
  return {
    id,
    name: `${namePrefix} ${id}`,
    status: "Alive",
    species: "Human",
    type: id === 1 ? "" : "Test type",
    gender: "Unknown",
    origin: {
      name: `Origin ${id}`,
      url: id === 1 ? "" : `https://rickandmortyapi.com/api/location/${id}`,
    },
    image: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
  };
}

beforeAll(async () => {
  cli = await loadCliBeforeAllocatingPostgres();
});

describe("TASK-005 Milestone 3 isolated character import composition", () => {
  it(
    "imports into an owned namespace, keeps a committed refresh after invalidation rejection, and closes PostgreSQL",
    async () => {
      const control = loadControl();
      const before = await listOwnedDatabases(control);
      const globalFetch = vi
        .spyOn(globalThis, "fetch")
        .mockRejectedValue(new Error("LIVE_UPSTREAM_ACCESS_FORBIDDEN"));
      let primaryFailure: unknown;

      try {
        const artifact = await buildMigrationArtifact();
        await withPostgresNamespace({
          control,
          body: async (namespace) => {
            console.info(
              `POSTGRES_IMPORT_CLI_NAMESPACE_READY database=${namespace.database} schema=${namespace.schema}`,
            );
            await prepareMigratedNamespace({
              target: namespace.target,
              buildRoot: artifact.buildRoot,
            });

            const events: string[] = [];
            const errors: string[] = [];
            const warnings: string[] = [];
            const injectedFetch = vi.fn<typeof fetch>(async (input) => {
              const url = String(input);
              const match = /\/api\/character\/(\d+)$/u.exec(url);
              if (match === null) {
                throw new Error("TEST_UPSTREAM_URL_INVALID");
              }
              const id = Number(match[1]);
              return new Response(JSON.stringify(upstreamCharacter(id)), {
                status: 200,
                headers: { "content-type": "application/json" },
              });
            });
            const requestInvalidation = vi.fn(async () => {
              expect(
                await readCharacterIds(
                  control,
                  namespace.database,
                  namespace.schema,
                ),
              ).toEqual(Array.from({ length: 15 }, (_, index) => index + 1));
              events.push("invalidation-after-visible-commit");
            });

            const result = await cli.runCharacterImportComposition({
              argv: [],
              environment: {
                POSTGRES_DB: namespace.database,
                POSTGRES_SCHEMA: namespace.schema,
                POSTGRES_USER: control.user,
                POSTGRES_PASSWORD: control.password,
                POSTGRES_PORT: String(control.port),
              },
              fetch: injectedFetch,
              requestInvalidation,
              writeError: (diagnostic) => errors.push(diagnostic),
              writeWarning: (diagnostic) => warnings.push(diagnostic),
            });

            expect(result).toBe(0);
            expect(injectedFetch).toHaveBeenCalledTimes(15);
            expect(requestInvalidation).toHaveBeenCalledOnce();
            expect(events).toEqual(["invalidation-after-visible-commit"]);
            expect(errors).toEqual([]);
            expect(warnings).toEqual([]);
            expect(globalFetch).not.toHaveBeenCalled();
            expect(
              await readCharacterIds(
                control,
                namespace.database,
                namespace.schema,
              ),
            ).toEqual(Array.from({ length: 15 }, (_, index) => index + 1));

            const refreshErrors: string[] = [];
            const refreshWarnings: string[] = [];
            const refreshFetch = vi.fn<typeof fetch>(async (input) => {
              const url = String(input);
              const match = /\/api\/character\/(\d+)$/u.exec(url);
              if (match === null) {
                throw new Error("TEST_UPSTREAM_URL_INVALID");
              }
              const id = Number(match[1]);
              return new Response(
                JSON.stringify(upstreamCharacter(id, "Refreshed Character")),
                {
                  status: 200,
                  headers: { "content-type": "application/json" },
                },
              );
            });
            const rejectInvalidation = vi.fn(async () => {
              expect(
                await readCharacterName(
                  control,
                  namespace.database,
                  namespace.schema,
                  1,
                ),
              ).toBe("Refreshed Character 1");
              events.push("rejected-invalidation-after-visible-refresh");
              throw new Error("redis://credential@host raw stack");
            });
            const refreshResult = await cli.runCharacterImportComposition({
              argv: [],
              environment: {
                POSTGRES_DB: namespace.database,
                POSTGRES_SCHEMA: namespace.schema,
                POSTGRES_USER: control.user,
                POSTGRES_PASSWORD: control.password,
                POSTGRES_PORT: String(control.port),
              },
              fetch: refreshFetch,
              requestInvalidation: rejectInvalidation,
              writeError: (diagnostic) => refreshErrors.push(diagnostic),
              writeWarning: (diagnostic) => refreshWarnings.push(diagnostic),
            });

            expect(refreshResult).toBe(0);
            expect(refreshFetch).toHaveBeenCalledTimes(15);
            expect(rejectInvalidation).toHaveBeenCalledOnce();
            expect(events).toEqual([
              "invalidation-after-visible-commit",
              "rejected-invalidation-after-visible-refresh",
            ]);
            expect(refreshErrors).toEqual([]);
            expect(refreshWarnings).toEqual([invalidationFailed]);
            expect(refreshWarnings.join("")).not.toContain("credential");
            expect(
              await readCharacterName(
                control,
                namespace.database,
                namespace.schema,
                1,
              ),
            ).toBe("Refreshed Character 1");
            expect(
              await countNamespaceBackends(control, namespace.database),
            ).toBe(0);
          },
        });
      } catch (error) {
        primaryFailure = error;
      }

      let cleanupFailure: unknown;
      try {
        const after = await listOwnedDatabases(control);
        console.info(
          `POSTGRES_IMPORT_CLI_RESIDUE before=${JSON.stringify(before)} after=${JSON.stringify(after)}`,
        );
        expect(after).toEqual(before);
        expect(globalFetch).not.toHaveBeenCalled();
      } catch (error) {
        cleanupFailure = error;
      } finally {
        globalFetch.mockRestore();
      }

      if (primaryFailure !== undefined && cleanupFailure !== undefined) {
        throw new AggregateError(
          [primaryFailure, cleanupFailure],
          "Character import CLI test and cleanup verification both failed",
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
    120_000,
  );
});
