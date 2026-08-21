import { randomBytes } from "node:crypto";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { createClient as createRedisClient } from "@redis/client";
import { Client } from "pg";

const runIdPattern = /^[0-9a-f]{16}$/u;
const schemaPattern = /^t010_smoke_[0-9a-f]{16}$/u;
const redisNamespacePattern =
  /^character-app:test:t010-smoke-[0-9a-f]{16}$/u;

interface Task010RuntimeIdentity {
  readonly runId: string;
  readonly schema: string;
  readonly redisNamespace: string;
  readonly postgresPort: number;
  readonly redisPort: number;
}

interface RedisBoundary {
  connect(): Promise<void>;
  scan(
    cursor: string,
    options: Readonly<{ MATCH: string; COUNT: number }>,
  ): Promise<{ readonly cursor: string; readonly keys: readonly string[] }>;
  unlink(keys: readonly string[]): Promise<number>;
  close(): Promise<void>;
}

interface MigrationArtifactModule {
  buildMigrationArtifact(): Promise<{
    readonly buildId: string;
    readonly buildRoot: string;
  }>;
}

interface PostgresLifecycleModule {
  loadMigrationTargetFromEnvironment(environment: NodeJS.ProcessEnv): object;
  prepareMigratedNamespace(options: {
    readonly target: object;
    readonly buildRoot: string;
  }): Promise<unknown>;
}

interface CharacterImportModule {
  runCharacterImportComposition(options: {
    readonly argv: readonly string[];
    readonly environment: NodeJS.ProcessEnv;
    readonly fetch: typeof fetch;
    readonly requestInvalidation: () => Promise<void>;
    readonly writeError: (diagnostic: string) => void;
    readonly writeWarning: (diagnostic: string) => void;
  }): Promise<number>;
}

const migrationArtifactModuleUrl = pathToFileURL(
  resolve("apps/api/src/infrastructure/database/migration-artifact.ts"),
).href;
const postgresLifecycleModuleUrl = pathToFileURL(
  resolve("apps/api/src/infrastructure/database/postgres-lifecycle.ts"),
).href;
const characterImportModuleUrl = pathToFileURL(
  resolve("apps/api/src/infrastructure/characters/character-import-cli.ts"),
).href;

function requirePort(value: string | undefined, name: string): number {
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(`${name}_INVALID`);
  }
  return port;
}

export function createTask010RunId(): string {
  return randomBytes(8).toString("hex");
}

export function loadTask010RuntimeIdentity(
  environment: Readonly<Record<string, string | undefined>>,
): Task010RuntimeIdentity {
  const runId = environment["TASK010_SMOKE_RUN_ID"];
  if (runId === undefined || !runIdPattern.test(runId)) {
    throw new Error("TASK_010_SMOKE_RUN_ID_INVALID");
  }

  const schema = `t010_smoke_${runId}`;
  const redisNamespace = `character-app:test:t010-smoke-${runId}`;
  if (
    !schemaPattern.test(schema) ||
    !redisNamespacePattern.test(redisNamespace)
  ) {
    throw new Error("TASK_010_SMOKE_IDENTITY_INVALID");
  }

  return {
    runId,
    schema,
    redisNamespace,
    postgresPort: requirePort(environment["POSTGRES_PORT"], "POSTGRES_PORT"),
    redisPort: requirePort(environment["REDIS_PORT"], "REDIS_PORT"),
  };
}

function postgresClient(
  environment: Readonly<Record<string, string | undefined>>,
  identity: Task010RuntimeIdentity,
): Client {
  return new Client({
    host: "127.0.0.1",
    port: identity.postgresPort,
    database: environment["POSTGRES_DB"] ?? "rick_and_morty",
    user: environment["POSTGRES_USER"] ?? "rick_and_morty",
    password:
      environment["POSTGRES_PASSWORD"] ?? "local-development-only",
    ssl: false,
    connectionTimeoutMillis: 10_000,
  });
}

async function withPostgresClient<T>(
  environment: Readonly<Record<string, string | undefined>>,
  identity: Task010RuntimeIdentity,
  body: (client: Client) => Promise<T>,
): Promise<T> {
  const client = postgresClient(environment, identity);
  await client.connect();
  try {
    return await body(client);
  } finally {
    await client.end();
  }
}

async function createRedisBoundary(port: number): Promise<RedisBoundary> {
  const client = createRedisClient({
    socket: {
      host: "127.0.0.1",
      port,
      connectTimeout: 1_000,
      reconnectStrategy: false,
    },
    disableOfflineQueue: true,
  }) as unknown as RedisBoundary;
  await client.connect();
  return client;
}

async function scanRedisPrefix(
  client: RedisBoundary,
  identity: Task010RuntimeIdentity,
): Promise<readonly string[]> {
  const prefix = `${identity.redisNamespace}:`;
  const keys: string[] = [];
  let cursor = "0";

  do {
    const page = await client.scan(cursor, {
      MATCH: `${prefix}*`,
      COUNT: 100,
    });
    cursor = page.cursor;
    for (const key of page.keys) {
      if (!key.startsWith(prefix)) {
        throw new Error("TASK_010_REDIS_CLEANUP_SCOPE_INVALID");
      }
      keys.push(key);
    }
  } while (cursor !== "0");

  return keys;
}

function upstreamCharacter(id: number): Record<string, unknown> {
  return {
    id,
    name: `TASK-010 Character ${String(id).padStart(2, "0")}`,
    status: id % 3 === 0 ? "Dead" : "Alive",
    species: id % 2 === 0 ? "Alien" : "Human",
    type: "",
    gender: id % 2 === 0 ? "Female" : "Male",
    origin: {
      name: "TASK-010 Test Origin",
      url: `https://example.invalid/origin/${id}`,
    },
    image: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
  };
}

export async function cleanupTask010Runtime(
  environment: Readonly<Record<string, string | undefined>>,
): Promise<void> {
  const identity = loadTask010RuntimeIdentity(environment);
  const failures: unknown[] = [];

  try {
    const redis = await createRedisBoundary(identity.redisPort);
    try {
      const keys = await scanRedisPrefix(redis, identity);
      if (keys.length > 0) {
        await redis.unlink(keys);
      }
      const remaining = await scanRedisPrefix(redis, identity);
      if (remaining.length !== 0) {
        throw new Error("TASK_010_REDIS_CLEANUP_INCOMPLETE");
      }
    } finally {
      await redis.close();
    }
  } catch (error) {
    failures.push(error);
  }

  try {
    await withPostgresClient(environment, identity, async (client) => {
      await client.query(`DROP SCHEMA IF EXISTS "${identity.schema}" CASCADE`);
      const readback = await client.query<{ readonly exists: boolean }>(
        `SELECT EXISTS (
           SELECT 1
           FROM pg_catalog.pg_namespace
           WHERE nspname = $1
         ) AS "exists"`,
        [identity.schema],
      );
      if (readback.rows[0]?.exists !== false) {
        throw new Error("TASK_010_POSTGRES_CLEANUP_INCOMPLETE");
      }
    });
  } catch (error) {
    failures.push(error);
  }

  if (failures.length > 0) {
    throw new AggregateError(
      failures,
      "TASK-010 runtime cleanup failed",
    );
  }

  console.log(
    `TASK010_SMOKE_CLEANUP runId=${identity.runId} schema=${identity.schema} redisNamespace=${identity.redisNamespace} postgresPort=${identity.postgresPort} redisPort=${identity.redisPort}`,
  );
}

async function setupTask010RuntimeData(): Promise<void> {
  const environment = process.env;
  const identity = loadTask010RuntimeIdentity(environment);
  await cleanupTask010Runtime(environment);

  try {
    const migrationArtifactModule = (await import(
      migrationArtifactModuleUrl
    )) as MigrationArtifactModule;
    const postgresLifecycleModule = (await import(
      postgresLifecycleModuleUrl
    )) as PostgresLifecycleModule;
    const characterImportModule = (await import(
      characterImportModuleUrl
    )) as CharacterImportModule;

    await withPostgresClient(environment, identity, async (client) => {
      await client.query(`CREATE SCHEMA "${identity.schema}"`);
    });

    const migrationEnvironment = {
      ...environment,
      POSTGRES_DB: environment["POSTGRES_DB"] ?? "rick_and_morty",
      POSTGRES_SCHEMA: identity.schema,
      POSTGRES_USER: environment["POSTGRES_USER"] ?? "rick_and_morty",
      POSTGRES_PASSWORD:
        environment["POSTGRES_PASSWORD"] ?? "local-development-only",
      POSTGRES_PORT: String(identity.postgresPort),
    };
    const artifact = await migrationArtifactModule.buildMigrationArtifact();
    const target =
      postgresLifecycleModule.loadMigrationTargetFromEnvironment(
        migrationEnvironment,
      );
    await postgresLifecycleModule.prepareMigratedNamespace({
      target,
      buildRoot: artifact.buildRoot,
    });

    let injectedRequests = 0;
    const result = await characterImportModule.runCharacterImportComposition({
      argv: [],
      environment: migrationEnvironment,
      fetch: async (input) => {
        const match =
          /^https:\/\/rickandmortyapi\.com\/api\/character\/(\d+)$/u.exec(
            String(input),
          );
        if (match === null) {
          throw new Error("TASK_010_LOCAL_UPSTREAM_URL_INVALID");
        }
        const id = Number(match[1]);
        injectedRequests += 1;
        return new Response(JSON.stringify(upstreamCharacter(id)), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      },
      requestInvalidation: async () => {},
      writeError: (diagnostic) => {
        throw new Error(`TASK_010_IMPORT_ERROR:${diagnostic.trim()}`);
      },
      writeWarning: (diagnostic) => {
        throw new Error(`TASK_010_IMPORT_WARNING:${diagnostic.trim()}`);
      },
    });
    if (result !== 0 || injectedRequests !== 15) {
      throw new Error("TASK_010_DETERMINISTIC_IMPORT_FAILED");
    }

    console.log(
      `TASK010_SMOKE_READY runId=${identity.runId} schema=${identity.schema} redisNamespace=${identity.redisNamespace} postgresPort=${identity.postgresPort} redisPort=${identity.redisPort} migrationBuild=${artifact.buildId}`,
    );
  } catch (error) {
    await cleanupTask010Runtime(environment);
    throw error;
  }
}

const entryPath = process.argv[1];
if (
  entryPath !== undefined &&
  pathToFileURL(resolve(entryPath)).href === import.meta.url
) {
  const mode = process.argv[2];
  if (mode === "setup") {
    await setupTask010RuntimeData();
  } else if (mode === "cleanup") {
    await cleanupTask010Runtime(process.env);
  } else {
    throw new Error("TASK_010_FIXTURE_COMMAND_INVALID");
  }
}
