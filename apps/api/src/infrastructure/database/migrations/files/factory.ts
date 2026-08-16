import * as pg from "pg";

import {
  identifierPattern,
  migrationApplicationName,
  migrationLockVersion,
} from "./constants.js";
import type {
  MigrationContext,
  MigrationQueryInterface,
  MigrationTargetState,
  RawPgClient,
} from "./context.js";
import { MigrationLifecycleError } from "./errors.js";
import { acquireMigrationLock, deriveMigrationLockKey } from "./lock.js";
import type { MigrationManifest } from "./manifest.js";
import { bindNamespace, runDatabasePreflight } from "./preflight.js";
import { resolveMigrations } from "./resolver.js";
import {
  createMigrationStorage,
  ensureHistoryTable,
  validateHistoryPrefix,
} from "./storage.js";

interface TransactionWithConnection {
  readonly connection: RawPgClient;
}

interface TimedOutTransaction extends TransactionWithConnection {
  finished?: "rollback";
  readonly forceCleanup: () => Promise<void>;
  readonly connection: RawPgClient & {
    readonly connection?: {
      readonly stream?: { readonly destroy: () => unknown };
    };
  };
}

interface SequelizeBoundary {
  readonly transaction: <T>(
    options: Readonly<Record<string, unknown>>,
    body: (transaction: object) => Promise<T>,
  ) => Promise<T>;
  readonly getQueryInterface: () => MigrationQueryInterface;
  readonly close: () => Promise<void>;
}

interface SequelizeConstructor {
  new (
    database: string,
    user: string,
    password: unknown,
    options: Readonly<Record<string, unknown>>,
  ): SequelizeBoundary;
}

interface UmzugBoundary {
  readonly up: () => Promise<readonly { readonly name: string }[]>;
  readonly down: (options?: {
    readonly step: number;
  }) => Promise<readonly { readonly name: string }[]>;
}

interface UmzugConstructor {
  new (options: Readonly<Record<string, unknown>>): UmzugBoundary;
}

async function loadSequelizeRuntime(): Promise<{
  readonly Sequelize: SequelizeConstructor;
  readonly readCommitted: string;
}> {
  const sequelizeSpecifier: string = "sequelize";
  const sequelizeModule = await import(sequelizeSpecifier) as Record<string, unknown>;
  const Sequelize = sequelizeModule.Sequelize;
  const Transaction = sequelizeModule.Transaction as
    | { readonly ISOLATION_LEVELS?: { readonly READ_COMMITTED?: unknown } }
    | undefined;
  if (
    typeof Sequelize !== "function" ||
    Transaction?.ISOLATION_LEVELS?.READ_COMMITTED !== "READ COMMITTED"
  ) {
    throw new MigrationLifecycleError("MIGRATION_STARTUP_FAILED");
  }
  return {
    Sequelize: Sequelize as unknown as SequelizeConstructor,
    readCommitted: "READ COMMITTED",
  };
}

async function loadUmzugRuntime(): Promise<UmzugConstructor> {
  const umzugSpecifier: string = "umzug";
  const module = await import(umzugSpecifier) as Record<string, unknown>;
  if (typeof module.Umzug !== "function") {
    throw new MigrationLifecycleError("MIGRATION_STARTUP_FAILED");
  }
  return module.Umzug as unknown as UmzugConstructor;
}

export interface MigrationPreparationReport {
  readonly operation: "up";
  readonly result: 0;
  readonly buildId: string;
  readonly noOp: boolean;
  readonly applied: readonly {
    readonly migrationId: string;
    readonly sourceSha256: string;
  }[];
  readonly pending: readonly string[];
  readonly namespace: {
    readonly database: string;
    readonly schema: string;
    readonly lockVersion: typeof migrationLockVersion;
    readonly lockKey: string;
  };
  readonly startup: Awaited<ReturnType<typeof runDatabasePreflight>>;
}

export interface MigrationStatusReport {
  readonly operation: "status";
  readonly result: 0;
  readonly buildId: string;
  readonly checksumAgreement: true;
  readonly applied: readonly {
    readonly migrationId: string;
    readonly sourceSha256: string;
  }[];
  readonly pending: readonly {
    readonly migrationId: string;
    readonly sourceSha256: string;
  }[];
  readonly namespace: MigrationPreparationReport["namespace"];
  readonly startup: MigrationPreparationReport["startup"];
}

export interface MigrationDownReport {
  readonly operation: "down";
  readonly result: 0;
  readonly buildId: string;
  readonly noOp: boolean;
  readonly reverted: readonly {
    readonly migrationId: string;
    readonly sourceSha256: string;
  }[];
  readonly remaining: readonly {
    readonly migrationId: string;
    readonly sourceSha256: string;
  }[];
  readonly namespace: MigrationPreparationReport["namespace"];
  readonly startup: MigrationPreparationReport["startup"];
}

export type MigrationRollbackSelector =
  | { readonly kind: "last" }
  | {
      readonly kind: "step";
      readonly count: number;
      readonly confirmMultiple: boolean;
    }
  | { readonly kind: "keep-through"; readonly migrationId: string };

type MigrationOperation = "up" | "status" | "down";

type ImplementedRollbackAction =
  | { readonly kind: "down"; readonly count: number }
  | { readonly kind: "keep" };

function resolveImplementedRollbackAction(
  selector: MigrationRollbackSelector | undefined,
  applied: MigrationManifest["mappings"],
): ImplementedRollbackAction {
  const keys = selector === undefined
    ? ""
    : Object.keys(selector).sort().join(",");
  if (
    selector === undefined ||
    (selector.kind === "last" && keys === "kind")
  ) {
    return { kind: "down", count: 1 };
  }
  if (
    selector.kind === "step" &&
    keys === "confirmMultiple,count,kind" &&
    Number.isInteger(selector.count) &&
    selector.count >= 1 &&
    (applied.length === 1
      ? selector.count === 1
      : selector.count < applied.length) &&
    selector.confirmMultiple === (selector.count > 1)
  ) {
    return { kind: "down", count: selector.count };
  }
  if (
    selector.kind === "keep-through" &&
    keys === "kind,migrationId"
  ) {
    const retainedIndex = applied.findIndex(
      ({ migrationId }) => migrationId === selector.migrationId,
    );
    if (retainedIndex >= 0) {
      const laterCount = applied.length - retainedIndex - 1;
      return laterCount === 0
        ? { kind: "keep" }
        : { kind: "down", count: laterCount };
    }
  }
  throw new MigrationLifecycleError("MIGRATION_ROLLBACK_BOUNDS");
}

function rejectAmbientPgEnvironment(): void {
  for (const [name, value] of Object.entries(process.env)) {
    const effectiveName = process.platform === "win32" ? name.toUpperCase() : name;
    if (effectiveName.startsWith("PG") && value !== undefined && value !== "") {
      throw new MigrationLifecycleError(
        `MIGRATION_STARTUP_CONFIG_INVALID ambient=${name}`,
      );
    }
  }
}

function findNestedPostgresDiagnosticCode(
  error: unknown,
): "57014" | "57P01" | undefined {
  const pending: unknown[] = [error];
  const visited = new Set<object>();

  while (pending.length > 0) {
    const current = pending.shift();
    if (
      current === null ||
      typeof current !== "object" ||
      visited.has(current)
    ) {
      continue;
    }

    visited.add(current);
    const diagnostic = current as {
      readonly code?: unknown;
      readonly cause?: unknown;
      readonly original?: unknown;
      readonly parent?: unknown;
    };
    if (diagnostic.code === "57014" || diagnostic.code === "57P01") {
      return diagnostic.code;
    }

    pending.push(
      diagnostic.cause,
      diagnostic.original,
      diagnostic.parent,
    );
  }

  return undefined;
}

function validateTarget(target: MigrationTargetState): void {
  if (
    target.host !== "127.0.0.1" ||
    !Number.isInteger(target.port) ||
    target.port < 1 ||
    target.port > 65_535 ||
    target.credential.length === 0
  ) {
    throw new MigrationLifecycleError("MIGRATION_STARTUP_CONFIG_INVALID");
  }
  if (
    !identifierPattern.test(target.database) ||
    !identifierPattern.test(target.schema) ||
    !identifierPattern.test(target.user) ||
    target.database === "template0" ||
    target.database === "template1" ||
    target.schema.startsWith("pg_") ||
    target.schema === "information_schema"
  ) {
    throw new MigrationLifecycleError("MIGRATION_NAMESPACE_INVALID");
  }
}

async function destroyTimedOutTransaction(transaction: object): Promise<void> {
  const timedOutTransaction = transaction as TimedOutTransaction;
  timedOutTransaction.finished = "rollback";
  try {
    timedOutTransaction.connection.connection?.stream?.destroy();
  } catch {
    // The original lock-timeout diagnostic has precedence over forced cleanup.
  }
  try {
    await timedOutTransaction.forceCleanup();
  } catch {
    // The original lock-timeout diagnostic has precedence over forced cleanup.
  }
}

async function runWithMigrationFactory(options: {
  readonly target: MigrationTargetState;
  readonly manifest: MigrationManifest;
  readonly artifactRoot: URL;
  readonly operation: MigrationOperation;
  readonly selector?: MigrationRollbackSelector;
  readonly lockTimeoutMs?: number;
}): Promise<MigrationPreparationReport | MigrationStatusReport | MigrationDownReport> {
  const {
    target,
    manifest,
    artifactRoot,
    operation,
    selector,
    lockTimeoutMs = 5000,
  } = options;
  validateTarget(target);
  rejectAmbientPgEnvironment();
  const { Sequelize, readCommitted } = await loadSequelizeRuntime();
  const passwordProvider = async (): Promise<string> => target.credential;
  const sequelize = new Sequelize(
    target.database,
    target.user,
    passwordProvider as unknown as string,
    {
      dialect: "postgres",
      dialectModule: pg,
      host: target.host,
      port: target.port,
      native: false,
      databaseVersion: "18.6.0",
      logging: false,
      pool: { max: 1, min: 0 },
      dialectOptions: {
        ssl: false,
        options: "-c client_encoding=UTF8 -c search_path=pg_catalog",
        client_encoding: "UTF8",
        application_name: migrationApplicationName,
        connectionTimeoutMillis: 10_000,
        binary: false,
      },
    },
  );

  let result:
    | MigrationPreparationReport
    | MigrationStatusReport
    | MigrationDownReport
    | undefined;
  let primaryFailure: unknown;
  let hasPrimaryFailure = false;
  let operationCallbackCompleted = false;

  try {
    rejectAmbientPgEnvironment();
    result = await sequelize.transaction(
      { isolationLevel: readCommitted },
      async (transaction) => {
        const operationResult = await (async (): Promise<
          MigrationPreparationReport | MigrationStatusReport | MigrationDownReport
        > => {
        const connection = (transaction as TransactionWithConnection).connection;
        const startup = await runDatabasePreflight(connection, target.user);
        const retained = await bindNamespace(
          connection,
          target.database,
          target.schema,
        );
        const lockKey = deriveMigrationLockKey(retained[0], retained[1]);
        try {
          await acquireMigrationLock(connection, lockKey, lockTimeoutMs);
        } catch (error) {
          if (
            error instanceof MigrationLifecycleError &&
            error.message === "MIGRATION_LOCK_TIMEOUT" &&
            error.result === 2
          ) {
            await destroyTimedOutTransaction(transaction);
          }
          throw error;
        }
        const rebound = await bindNamespace(
          connection,
          target.database,
          target.schema,
          true,
        );
        if (rebound[0] !== retained[0] || rebound[1] !== retained[1]) {
          throw new MigrationLifecycleError("MIGRATION_NAMESPACE_CHANGED");
        }

        const context: MigrationContext = {
          queryInterface: sequelize.getQueryInterface(),
          schema: target.schema,
          transaction,
        };
        if (operation !== "up") {
          const applied = await validateHistoryPrefix(context, manifest.mappings, {
            allowMissing: true,
          });
          const project = ({ migrationId, sourceSha256 }: typeof manifest.mappings[number]) => ({
            migrationId,
            sourceSha256,
          });
          if (operation === "down") {
            const rollbackAction = resolveImplementedRollbackAction(
              selector,
              applied,
            );
            if (rollbackAction.kind === "keep") {
              return {
                operation: "down",
                result: 0,
                buildId: manifest.buildId,
                noOp: true,
                reverted: [],
                remaining: applied.map(project),
                namespace: {
                  database: target.database,
                  schema: target.schema,
                  lockVersion: migrationLockVersion,
                  lockKey,
                },
                startup,
              };
            }
            if (applied.length === 0) {
              return {
                operation: "down",
                result: 0,
                buildId: manifest.buildId,
                noOp: true,
                reverted: [],
                remaining: [],
                namespace: {
                  database: target.database,
                  schema: target.schema,
                  lockVersion: migrationLockVersion,
                  lockKey,
                },
                startup,
              };
            }

            const migrations = await resolveMigrations(manifest, artifactRoot);
            const Umzug = await loadUmzugRuntime();
            const migrator = new Umzug({
              context,
              logger: undefined,
              migrations,
              storage: createMigrationStorage(manifest.mappings),
            });
            const reverted = rollbackAction.count === 1
              ? await migrator.down()
              : await migrator.down({ step: rollbackAction.count });
            const selectedMappings = applied
              .slice(-rollbackAction.count)
              .reverse();
            if (
              reverted.length !== selectedMappings.length ||
              reverted.some(
                ({ name }, index) =>
                  name !== selectedMappings[index]?.migrationId,
              )
            ) {
              throw new MigrationLifecycleError("MIGRATION_HISTORY_INVALID");
            }
            return {
              operation: "down",
              result: 0,
              buildId: manifest.buildId,
              noOp: false,
              reverted: selectedMappings.map(project),
              remaining: applied.slice(0, -rollbackAction.count).map(project),
              namespace: {
                database: target.database,
                schema: target.schema,
                lockVersion: migrationLockVersion,
                lockKey,
              },
              startup,
            };
          }
          return {
            operation: "status",
            result: 0,
            buildId: manifest.buildId,
            checksumAgreement: true,
            applied: applied.map(project),
            pending: manifest.mappings.slice(applied.length).map(project),
            namespace: {
              database: target.database,
              schema: target.schema,
              lockVersion: migrationLockVersion,
              lockKey,
            },
            startup,
          };
        }

        await ensureHistoryTable(context);
        await validateHistoryPrefix(context, manifest.mappings);
        const migrations = await resolveMigrations(manifest, artifactRoot);
        const Umzug = await loadUmzugRuntime();
        const migrator = new Umzug({
          context,
          logger: undefined,
          migrations,
          storage: createMigrationStorage(manifest.mappings),
        });
        const applied = await migrator.up();
        const mappingById = new Map(
          manifest.mappings.map((mapping) => [mapping.migrationId, mapping]),
        );
        return {
          operation: "up",
          result: 0,
          buildId: manifest.buildId,
          noOp: applied.length === 0,
          applied: applied.map(({ name }) => {
            const mapping = mappingById.get(name);
            if (mapping === undefined) {
              throw new MigrationLifecycleError("MIGRATION_HISTORY_INVALID");
            }
            return {
              migrationId: mapping.migrationId,
              sourceSha256: mapping.sourceSha256,
            };
          }),
          pending: [],
          namespace: {
            database: target.database,
            schema: target.schema,
            lockVersion: migrationLockVersion,
            lockKey,
          },
          startup,
        };
        })();
        operationCallbackCompleted = true;
        return operationResult;
      },
    );
  } catch (error) {
    hasPrimaryFailure = true;
    const diagnosticCode = findNestedPostgresDiagnosticCode(error);
    if (operationCallbackCompleted) {
      primaryFailure =
        diagnosticCode === "57014" || diagnosticCode === "57P01"
          ? new MigrationLifecycleError("MIGRATION_COMMIT_AMBIGUOUS", 1, {
              cause: Object.freeze({ code: diagnosticCode }),
            })
          : new MigrationLifecycleError("MIGRATION_COMMIT_AMBIGUOUS");
    } else if (diagnosticCode === "57014") {
      primaryFailure = new MigrationLifecycleError("MIGRATION_LOCK_INTERRUPTED", 1, {
        cause: Object.freeze({ code: "57014" }),
      });
    } else if (diagnosticCode === "57P01") {
      primaryFailure = new MigrationLifecycleError("MIGRATION_CONNECTION_LOST", 1, {
        cause: Object.freeze({ code: "57P01" }),
      });
    } else {
      primaryFailure = error;
    }
  }

  try {
    await sequelize.close();
  } catch {
    if (!hasPrimaryFailure) {
      throw new MigrationLifecycleError("MIGRATION_CLEANUP_FAILED");
    }
    throw new AggregateError(
      [primaryFailure, new MigrationLifecycleError("MIGRATION_CLEANUP_FAILED")],
      "Migration failed and cleanup also failed",
      { cause: primaryFailure },
    );
  }

  if (hasPrimaryFailure) {
    throw primaryFailure;
  }
  return result as
    | MigrationPreparationReport
    | MigrationStatusReport
    | MigrationDownReport;
}

export async function prepareWithMigrationFactory(options: {
  readonly target: MigrationTargetState;
  readonly manifest: MigrationManifest;
  readonly artifactRoot: URL;
  readonly lockTimeoutMs?: number;
}): Promise<MigrationPreparationReport> {
  return runWithMigrationFactory({ ...options, operation: "up" }) as Promise<MigrationPreparationReport>;
}

export async function inspectWithMigrationFactory(options: {
  readonly target: MigrationTargetState;
  readonly manifest: MigrationManifest;
  readonly artifactRoot: URL;
  readonly lockTimeoutMs?: number;
}): Promise<MigrationStatusReport> {
  return runWithMigrationFactory({ ...options, operation: "status" }) as Promise<MigrationStatusReport>;
}

export async function revertWithMigrationFactory(options: {
  readonly target: MigrationTargetState;
  readonly manifest: MigrationManifest;
  readonly artifactRoot: URL;
  readonly selector?: MigrationRollbackSelector;
  readonly lockTimeoutMs?: number;
}): Promise<MigrationDownReport> {
  const input = {
    target: options.target,
    manifest: options.manifest,
    artifactRoot: options.artifactRoot,
    operation: "down" as const,
  };
  return (options.selector === undefined
    ? runWithMigrationFactory(input)
    : runWithMigrationFactory({ ...input, selector: options.selector })) as Promise<MigrationDownReport>;
}
