import { randomBytes } from "node:crypto";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { Client } from "pg";

import { verifyMigrationArtifact } from "./migration-artifact.js";
import { identifierPattern } from "./migrations/files/constants.js";
import type { MigrationRollbackSelector } from "./migrations/files/factory.js";

interface PostgresControl {
  readonly database: string;
  readonly user: string;
  readonly password: string;
  readonly port: number;
}

interface PostgresNamespace {
  readonly database: string;
  readonly schema: string;
  readonly target: object;
}

type PostgresSchemaPair = readonly [PostgresNamespace, PostgresNamespace];

interface TrustedMigrationTargetState {
  readonly host: "127.0.0.1";
  readonly port: number;
  readonly database: string;
  readonly schema: string;
  readonly user: string;
  readonly credential: string;
}

const namespacePattern = /^task_004_[0-9a-f]{16}$/u;
const trustedMigrationTargets = new WeakMap<
  object,
  Readonly<TrustedMigrationTargetState>
>();
const trustedMigrationLockTimeouts = new WeakMap<object, number>();

function assertAcceptedOptionKeys(
  options: object,
  acceptedKeys: readonly string[],
): void {
  if (
    Reflect.ownKeys(options).some(
      (key) => typeof key !== "string" || !acceptedKeys.includes(key),
    )
  ) {
    throw new Error("MIGRATION_STARTUP_CONFIG_INVALID");
  }
}

function createClient(
  control: PostgresControl,
  database = control.database,
): Client {
  return new Client({
    host: "127.0.0.1",
    port: control.port,
    database,
    user: control.user,
    password: control.password,
    ssl: false,
    connectionTimeoutMillis: 10_000,
  });
}

function combineFailures(
  primaryFailure: unknown,
  cleanupFailure: unknown,
): AggregateError {
  return new AggregateError(
    [primaryFailure, cleanupFailure],
    "PostgreSQL namespace operation and cleanup both failed",
    { cause: primaryFailure },
  );
}

async function withClient<T>(
  control: PostgresControl,
  body: (client: Client) => Promise<T>,
  database = control.database,
): Promise<T> {
  const client = createClient(control, database);
  let hasPrimaryFailure = false;
  let primaryFailure: unknown;
  let result: T | undefined;

  try {
    await client.connect();
    result = await body(client);
  } catch (error) {
    hasPrimaryFailure = true;
    primaryFailure = error;
  }

  try {
    await client.end();
  } catch (cleanupFailure) {
    if (hasPrimaryFailure) {
      throw combineFailures(primaryFailure, cleanupFailure);
    }
    throw cleanupFailure;
  }

  if (hasPrimaryFailure) {
    throw primaryFailure;
  }

  return result as T;
}

function createNamespaceName(): string {
  const namespace = `task_004_${randomBytes(8).toString("hex")}`;
  if (!namespacePattern.test(namespace)) {
    throw new Error("Generated PostgreSQL namespace is invalid");
  }
  return namespace;
}

function issueTrustedTarget(
  control: PostgresControl,
  database: string,
  schema: string,
  lockTimeoutMs = 5000,
): object {
  const target = Object.freeze(Object.create(null) as object);
  const state = Object.freeze({
    host: "127.0.0.1" as const,
    port: control.port,
    database,
    schema,
    user: control.user,
    credential: control.password,
  });
  trustedMigrationTargets.set(target, state);
  trustedMigrationLockTimeouts.set(target, lockTimeoutMs);
  return target;
}

export function loadMigrationTargetFromEnvironment(
  environment: NodeJS.ProcessEnv,
): object {
  const database = environment.POSTGRES_DB ?? "rick_and_morty";
  const schema = environment.POSTGRES_SCHEMA ?? "public";
  const user = environment.POSTGRES_USER ?? "rick_and_morty";
  const credential = environment.POSTGRES_PASSWORD;
  const port = Number(environment.POSTGRES_PORT ?? "5432");
  const lockTimeoutMs = Number(
    environment.POSTGRES_MIGRATION_LOCK_TIMEOUT_MS ?? "5000",
  );
  if (
    credential === undefined ||
    credential.length === 0 ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65_535 ||
    !Number.isInteger(lockTimeoutMs) ||
    lockTimeoutMs < 1 ||
    lockTimeoutMs > 60_000
  ) {
    throw new Error("MIGRATION_STARTUP_CONFIG_INVALID");
  }
  if (
    !identifierPattern.test(database) ||
    !identifierPattern.test(schema) ||
    !identifierPattern.test(user) ||
    database === "template0" ||
    database === "template1" ||
    schema.startsWith("pg_") ||
    schema === "information_schema"
  ) {
    throw new Error("MIGRATION_NAMESPACE_INVALID");
  }
  return issueTrustedTarget(
    { database, user, password: credential, port },
    database,
    schema,
    lockTimeoutMs,
  );
}

export async function withPostgresNamespace<T>(options: {
  readonly control: PostgresControl;
  readonly body: (namespace: PostgresNamespace) => Promise<T>;
}): Promise<T> {
  const { control, body } = options;
  const namespace = createNamespaceName();
  let databaseCreated = false;
  let hasPrimaryFailure = false;
  let primaryFailure: unknown;
  let result: T | undefined;

  try {
    await withClient(control, async (client) => {
      await client.query(
        `CREATE DATABASE ${namespace} WITH ENCODING 'UTF8' TEMPLATE template0`,
      );
      databaseCreated = true;
    });
    await withClient(
      control,
      async (client) => {
        await client.query(`CREATE SCHEMA ${namespace}`);
      },
      namespace,
    );

    const target = issueTrustedTarget(control, namespace, namespace);
    result = await body({ database: namespace, schema: namespace, target });
  } catch (error) {
    hasPrimaryFailure = true;
    primaryFailure = error;
  }

  if (databaseCreated) {
    try {
      await withClient(control, async (client) => {
        await client.query(`DROP DATABASE ${namespace} WITH (FORCE)`);
      });
    } catch (cleanupFailure) {
      if (hasPrimaryFailure) {
        throw combineFailures(primaryFailure, cleanupFailure);
      }
      throw cleanupFailure;
    }
  }

  if (hasPrimaryFailure) {
    throw primaryFailure;
  }

  return result as T;
}

export async function withPostgresSchemaPair<T>(options: {
  readonly control: PostgresControl;
  readonly body: (pair: PostgresSchemaPair) => Promise<T>;
}): Promise<T> {
  const { control, body } = options;
  const database = createNamespaceName();
  const firstSchema = createNamespaceName();
  let secondSchema = createNamespaceName();
  while (secondSchema === firstSchema) {
    secondSchema = createNamespaceName();
  }
  let databaseCreated = false;
  let hasPrimaryFailure = false;
  let primaryFailure: unknown;
  let result: T | undefined;

  try {
    await withClient(control, async (client) => {
      await client.query(
        `CREATE DATABASE ${database} WITH ENCODING 'UTF8' TEMPLATE template0`,
      );
      databaseCreated = true;
    });
    await withClient(
      control,
      async (client) => {
        await client.query(`CREATE SCHEMA ${firstSchema}`);
        await client.query(`CREATE SCHEMA ${secondSchema}`);
      },
      database,
    );

    const pair = Object.freeze([
      {
        database,
        schema: firstSchema,
        target: issueTrustedTarget(control, database, firstSchema),
      },
      {
        database,
        schema: secondSchema,
        target: issueTrustedTarget(control, database, secondSchema),
      },
    ]) as PostgresSchemaPair;
    result = await body(pair);
  } catch (error) {
    hasPrimaryFailure = true;
    primaryFailure = error;
  }

  if (databaseCreated) {
    try {
      await withClient(control, async (client) => {
        await client.query(`DROP DATABASE ${database} WITH (FORCE)`);
      });
    } catch (cleanupFailure) {
      if (hasPrimaryFailure) {
        throw combineFailures(primaryFailure, cleanupFailure);
      }
      throw cleanupFailure;
    }
  }

  if (hasPrimaryFailure) {
    throw primaryFailure;
  }

  return result as T;
}

export async function prepareMigratedNamespace(options: {
  readonly target: object;
  readonly buildRoot: string;
}): Promise<unknown> {
  assertAcceptedOptionKeys(options, ["target", "buildRoot"]);
  return invokeMigrationCommand(options, "up");
}

export async function inspectMigrationStatus(options: {
  readonly target: object;
  readonly buildRoot: string;
}): Promise<unknown> {
  assertAcceptedOptionKeys(options, ["target", "buildRoot"]);
  return invokeMigrationCommand(options, "status");
}

export async function revertMigratedNamespace(options: {
  readonly target: object;
  readonly buildRoot: string;
  readonly selector?: MigrationRollbackSelector;
}): Promise<unknown> {
  assertAcceptedOptionKeys(options, ["target", "buildRoot", "selector"]);
  return invokeMigrationCommand(options, "down");
}

async function invokeMigrationCommand(
  options: {
    readonly target: object;
    readonly buildRoot: string;
    readonly selector?: MigrationRollbackSelector;
  },
  operation: "up" | "status" | "down",
): Promise<unknown> {
  const { manifest } = await verifyMigrationArtifact(options.buildRoot);
  const target = trustedMigrationTargets.get(options.target);
  const lockTimeoutMs = trustedMigrationLockTimeouts.get(options.target);
  if (target === undefined || lockTimeoutMs === undefined) {
    throw new Error("MIGRATION_STARTUP_CONFIG_INVALID");
  }
  const command = manifest.files.find(
    ({ path, role }) => path === "command.js" && role === "command",
  );
  if (command === undefined) {
    throw new Error("MIGRATION_ARTIFACT_COMMAND_MISSING");
  }
  const module = (await import(
    pathToFileURL(join(options.buildRoot, command.path)).href
  )) as Record<string, unknown>;
  if (typeof module.runMigrationCommand !== "function") {
    throw new Error("MIGRATION_ARTIFACT_COMMAND_INVALID");
  }
  const runMigrationCommand = module.runMigrationCommand as (input: {
    readonly target: TrustedMigrationTargetState;
    readonly manifest: typeof manifest;
    readonly operation: "up" | "status" | "down";
    readonly lockTimeoutMs: number;
    readonly selector?: MigrationRollbackSelector;
  }) => Promise<unknown>;
  return options.selector === undefined
    ? runMigrationCommand({ target, manifest, operation, lockTimeoutMs })
    : runMigrationCommand({
        target,
        manifest,
        operation,
        lockTimeoutMs,
        selector: options.selector,
      });
}
