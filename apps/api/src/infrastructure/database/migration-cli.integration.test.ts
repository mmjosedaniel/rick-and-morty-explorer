import { execFile } from "node:child_process";
import { lstat } from "node:fs/promises";
import { basename, isAbsolute, join, resolve } from "node:path";
import { promisify } from "node:util";

import { Client } from "pg";
import { describe, expect, it } from "vitest";

import {
  buildMigrationArtifact,
  verifyMigrationArtifact,
} from "./migration-artifact.js";
import { deriveMigrationLockKey } from "./migrations/files/lock.js";
import { withPostgresNamespace } from "./postgres-lifecycle.js";

interface PostgresControl {
  readonly database: string;
  readonly user: string;
  readonly password: string;
  readonly port: number;
}

interface AllocatedNamespace {
  readonly database: string;
  readonly schema: string;
}

interface ChildResult {
  readonly code: number;
  readonly stdout: string;
  readonly stderr: string;
}

const execFileAsync = promisify(execFile);

function loadControl(): PostgresControl {
  return {
    database: process.env.POSTGRES_DB ?? "rick_and_morty",
    user: process.env.POSTGRES_USER ?? "rick_and_morty",
    password: process.env.POSTGRES_PASSWORD ?? "local-development-only",
    port: Number(process.env.POSTGRES_PORT ?? "5432"),
  };
}

async function withClient<T>(
  control: PostgresControl,
  database: string,
  body: (client: Client) => Promise<T>,
): Promise<T> {
  const client = new Client({
    host: "127.0.0.1",
    port: control.port,
    database,
    user: control.user,
    password: control.password,
    ssl: false,
    connectionTimeoutMillis: 10_000,
  });
  try {
    await client.connect();
    return await body(client);
  } finally {
    await client.end();
  }
}

async function expectEmptyNamespace(
  control: PostgresControl,
  namespace: AllocatedNamespace,
): Promise<void> {
  const tables = await withClient(control, namespace.database, (client) =>
    client.query<{ table_name: string }>(
      `SELECT table_name
         FROM information_schema.tables
        WHERE table_schema = $1
          AND table_type = 'BASE TABLE'
        ORDER BY table_name`,
      [namespace.schema],
    ),
  );
  expect(tables.rows).toEqual([]);
}

async function listOwnedDatabases(control: PostgresControl): Promise<string[]> {
  const result = await withClient(control, control.database, (client) =>
    client.query<{ datname: string }>(
      `SELECT datname
         FROM pg_catalog.pg_database
        WHERE datname LIKE 'task_004_%'
        ORDER BY datname`,
    ),
  );
  return result.rows.map(({ datname }) => datname);
}

function createChildEnvironment(
  control: PostgresControl,
  namespace: AllocatedNamespace,
): NodeJS.ProcessEnv {
  const environment = Object.fromEntries(
    Object.entries(process.env).filter(
      ([name, value]) =>
        value !== undefined &&
        !name.toUpperCase().startsWith("PG") &&
        !name.toUpperCase().startsWith("POSTGRES_"),
    ),
  );
  return {
    ...environment,
    POSTGRES_DB: namespace.database,
    POSTGRES_SCHEMA: namespace.schema,
    POSTGRES_USER: control.user,
    POSTGRES_PASSWORD: control.password,
    POSTGRES_PORT: String(control.port),
    POSTGRES_MIGRATION_LOCK_TIMEOUT_MS: "5000",
  };
}

async function runStatusCommand(options: {
  readonly artifactRoot: string;
  readonly control: PostgresControl;
  readonly namespace: AllocatedNamespace;
  readonly environment?: NodeJS.ProcessEnv;
}): Promise<ChildResult> {
  const npmExecPath = process.env.npm_execpath;
  if (npmExecPath === undefined || npmExecPath.length === 0) {
    throw new Error("MIGRATION_API_STATUS_CLI_NPM_EXEC_PATH_MISSING");
  }
  try {
    const result = await execFileAsync(
      process.execPath,
      [
        npmExecPath,
        "--silent",
        "run",
        "migration:status",
        "--workspace",
        "@rick-and-morty/api",
        "--",
        "--artifact",
        options.artifactRoot,
      ],
      {
        cwd: process.cwd(),
        env:
          options.environment ??
          createChildEnvironment(options.control, options.namespace),
        encoding: "utf8",
        timeout: 10_000,
        windowsHide: true,
      },
    );
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "number" &&
      "stdout" in error &&
      typeof error.stdout === "string" &&
      "stderr" in error &&
      typeof error.stderr === "string"
    ) {
      return {
        code: error.code,
        stdout: error.stdout,
        stderr: error.stderr,
      };
    }
    throw error;
  }
}

async function runUpCommand(options: {
  readonly artifactRoot: string;
  readonly control: PostgresControl;
  readonly namespace: AllocatedNamespace;
}): Promise<ChildResult> {
  const npmExecPath = process.env.npm_execpath;
  if (npmExecPath === undefined || npmExecPath.length === 0) {
    throw new Error("MIGRATION_API_UP_CLI_NPM_EXEC_PATH_MISSING");
  }
  try {
    const result = await execFileAsync(
      process.execPath,
      [
        npmExecPath,
        "--silent",
        "run",
        "migration:up",
        "--workspace",
        "@rick-and-morty/api",
        "--",
        "--artifact",
        options.artifactRoot,
      ],
      {
        cwd: process.cwd(),
        env: createChildEnvironment(options.control, options.namespace),
        encoding: "utf8",
        timeout: 10_000,
        windowsHide: true,
      },
    );
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "number" &&
      "stdout" in error &&
      typeof error.stdout === "string" &&
      "stderr" in error &&
      typeof error.stderr === "string"
    ) {
      return {
        code: error.code,
        stdout: error.stdout,
        stderr: error.stderr,
      };
    }
    throw error;
  }
}

async function runDownCommand(options: {
  readonly artifactRoot: string;
  readonly control: PostgresControl;
  readonly namespace: AllocatedNamespace;
}): Promise<ChildResult> {
  const npmExecPath = process.env.npm_execpath;
  if (npmExecPath === undefined || npmExecPath.length === 0) {
    throw new Error("MIGRATION_API_DOWN_CLI_NPM_EXEC_PATH_MISSING");
  }
  try {
    const result = await execFileAsync(
      process.execPath,
      [
        npmExecPath,
        "--silent",
        "run",
        "migration:down",
        "--workspace",
        "@rick-and-morty/api",
        "--",
        "--artifact",
        options.artifactRoot,
      ],
      {
        cwd: process.cwd(),
        env: createChildEnvironment(options.control, options.namespace),
        encoding: "utf8",
        timeout: 10_000,
        windowsHide: true,
      },
    );
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "number" &&
      "stdout" in error &&
      typeof error.stdout === "string" &&
      "stderr" in error &&
      typeof error.stderr === "string"
    ) {
      return {
        code: error.code,
        stdout: error.stdout,
        stderr: error.stderr,
      };
    }
    throw error;
  }
}

async function runDownStepOneCommand(options: {
  readonly artifactRoot: string;
  readonly control: PostgresControl;
  readonly namespace: AllocatedNamespace;
}): Promise<ChildResult> {
  const npmExecPath = process.env.npm_execpath;
  if (npmExecPath === undefined || npmExecPath.length === 0) {
    throw new Error("MIGRATION_API_DOWN_STEP_ONE_CLI_NPM_EXEC_PATH_MISSING");
  }
  try {
    const result = await execFileAsync(
      process.execPath,
      [
        npmExecPath,
        "--silent",
        "run",
        "migration:down",
        "--workspace",
        "@rick-and-morty/api",
        "--",
        "--artifact",
        options.artifactRoot,
        "--step",
        "1",
      ],
      {
        cwd: process.cwd(),
        env: createChildEnvironment(options.control, options.namespace),
        encoding: "utf8",
        timeout: 10_000,
        windowsHide: true,
      },
    );
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "number" &&
      "stdout" in error &&
      typeof error.stdout === "string" &&
      "stderr" in error &&
      typeof error.stderr === "string"
    ) {
      return {
        code: error.code,
        stdout: error.stdout,
        stderr: error.stderr,
      };
    }
    throw error;
  }
}

async function runDownSelectorCommand(options: {
  readonly artifactRoot: string;
  readonly control: PostgresControl;
  readonly namespace: AllocatedNamespace;
  readonly selectorArguments: readonly string[];
}): Promise<ChildResult> {
  const npmExecPath = process.env.npm_execpath;
  if (npmExecPath === undefined || npmExecPath.length === 0) {
    throw new Error("MIGRATION_API_DOWN_SELECTOR_CLI_NPM_EXEC_PATH_MISSING");
  }
  try {
    const result = await execFileAsync(
      process.execPath,
      [
        npmExecPath,
        "--silent",
        "run",
        "migration:down",
        "--workspace",
        "@rick-and-morty/api",
        "--",
        "--artifact",
        options.artifactRoot,
        ...options.selectorArguments,
      ],
      {
        cwd: process.cwd(),
        env: createChildEnvironment(options.control, options.namespace),
        encoding: "utf8",
        timeout: 10_000,
        windowsHide: true,
      },
    );
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "number" &&
      "stdout" in error &&
      typeof error.stdout === "string" &&
      "stderr" in error &&
      typeof error.stderr === "string"
    ) {
      return {
        code: error.code,
        stdout: error.stdout,
        stderr: error.stderr,
      };
    }
    throw error;
  }
}

async function runBuildCommand(): Promise<ChildResult> {
  const npmExecPath = process.env.npm_execpath;
  if (npmExecPath === undefined || npmExecPath.length === 0) {
    throw new Error("MIGRATION_API_BUILD_CLI_NPM_EXEC_PATH_MISSING");
  }
  try {
    const result = await execFileAsync(
      process.execPath,
      [
        npmExecPath,
        "--silent",
        "run",
        "migration:build",
        "--workspace",
        "@rick-and-morty/api",
      ],
      {
        cwd: process.cwd(),
        encoding: "utf8",
        timeout: 10_000,
        windowsHide: true,
      },
    );
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "number" &&
      "stdout" in error &&
      typeof error.stdout === "string" &&
      "stderr" in error &&
      typeof error.stderr === "string"
    ) {
      return {
        code: error.code,
        stdout: error.stdout,
        stderr: error.stderr,
      };
    }
    throw error;
  }
}

async function runRootBuildCommand(): Promise<ChildResult> {
  const npmExecPath = process.env.npm_execpath;
  if (npmExecPath === undefined || npmExecPath.length === 0) {
    throw new Error("MIGRATION_ROOT_BUILD_CLI_NPM_EXEC_PATH_MISSING");
  }
  try {
    const result = await execFileAsync(
      process.execPath,
      [npmExecPath, "--silent", "run", "migrate:build"],
      {
        cwd: process.cwd(),
        encoding: "utf8",
        timeout: 10_000,
        windowsHide: true,
      },
    );
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "number" &&
      "stdout" in error &&
      typeof error.stdout === "string" &&
      "stderr" in error &&
      typeof error.stderr === "string"
    ) {
      return {
        code: error.code,
        stdout: error.stdout,
        stderr: error.stderr,
      };
    }
    throw error;
  }
}

async function runRootStatusCommand(options: {
  readonly control: PostgresControl;
  readonly namespace: AllocatedNamespace;
  readonly environment?: NodeJS.ProcessEnv;
}): Promise<ChildResult> {
  const npmExecPath = process.env.npm_execpath;
  if (npmExecPath === undefined || npmExecPath.length === 0) {
    throw new Error("MIGRATION_ROOT_STATUS_CLI_NPM_EXEC_PATH_MISSING");
  }
  try {
    const result = await execFileAsync(
      process.execPath,
      [npmExecPath, "--silent", "run", "migrate:status"],
      {
        cwd: process.cwd(),
        env:
          options.environment ??
          createChildEnvironment(options.control, options.namespace),
        encoding: "utf8",
        timeout: 10_000,
        windowsHide: true,
      },
    );
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "number" &&
      "stdout" in error &&
      typeof error.stdout === "string" &&
      "stderr" in error &&
      typeof error.stderr === "string"
    ) {
      return {
        code: error.code,
        stdout: error.stdout,
        stderr: error.stderr,
      };
    }
    throw error;
  }
}

async function runRootUpCommand(options: {
  readonly control: PostgresControl;
  readonly namespace: AllocatedNamespace;
}): Promise<ChildResult> {
  const npmExecPath = process.env.npm_execpath;
  if (npmExecPath === undefined || npmExecPath.length === 0) {
    throw new Error("MIGRATION_ROOT_UP_CLI_NPM_EXEC_PATH_MISSING");
  }
  try {
    const result = await execFileAsync(
      process.execPath,
      [npmExecPath, "--silent", "run", "migrate:up"],
      {
        cwd: process.cwd(),
        env: createChildEnvironment(options.control, options.namespace),
        encoding: "utf8",
        timeout: 10_000,
        windowsHide: true,
      },
    );
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "number" &&
      "stdout" in error &&
      typeof error.stdout === "string" &&
      "stderr" in error &&
      typeof error.stderr === "string"
    ) {
      return {
        code: error.code,
        stdout: error.stdout,
        stderr: error.stderr,
      };
    }
    throw error;
  }
}

async function runRootDownCommand(options: {
  readonly control: PostgresControl;
  readonly namespace: AllocatedNamespace;
}): Promise<ChildResult> {
  const npmExecPath = process.env.npm_execpath;
  if (npmExecPath === undefined || npmExecPath.length === 0) {
    throw new Error("MIGRATION_ROOT_DOWN_CLI_NPM_EXEC_PATH_MISSING");
  }
  try {
    const result = await execFileAsync(
      process.execPath,
      [npmExecPath, "--silent", "run", "migrate:down"],
      {
        cwd: process.cwd(),
        env: createChildEnvironment(options.control, options.namespace),
        encoding: "utf8",
        timeout: 10_000,
        windowsHide: true,
      },
    );
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "number" &&
      "stdout" in error &&
      typeof error.stdout === "string" &&
      "stderr" in error &&
      typeof error.stderr === "string"
    ) {
      return {
        code: error.code,
        stdout: error.stdout,
        stderr: error.stderr,
      };
    }
    throw error;
  }
}

async function runRootDownStepOneCommand(options: {
  readonly control: PostgresControl;
  readonly namespace: AllocatedNamespace;
}): Promise<ChildResult> {
  const npmExecPath = process.env.npm_execpath;
  if (npmExecPath === undefined || npmExecPath.length === 0) {
    throw new Error("MIGRATION_ROOT_DOWN_STEP_ONE_CLI_NPM_EXEC_PATH_MISSING");
  }
  try {
    const result = await execFileAsync(
      process.execPath,
      [npmExecPath, "--silent", "run", "migrate:down", "--", "--step", "1"],
      {
        cwd: process.cwd(),
        env: createChildEnvironment(options.control, options.namespace),
        encoding: "utf8",
        timeout: 10_000,
        windowsHide: true,
      },
    );
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "number" &&
      "stdout" in error &&
      typeof error.stdout === "string" &&
      "stderr" in error &&
      typeof error.stderr === "string"
    ) {
      return {
        code: error.code,
        stdout: error.stdout,
        stderr: error.stderr,
      };
    }
    throw error;
  }
}

async function runRootDownSelectorCommand(options: {
  readonly control: PostgresControl;
  readonly namespace: AllocatedNamespace;
  readonly selectorArguments: readonly string[];
}): Promise<ChildResult> {
  const npmExecPath = process.env.npm_execpath;
  if (npmExecPath === undefined || npmExecPath.length === 0) {
    throw new Error("MIGRATION_ROOT_DOWN_SELECTOR_CLI_NPM_EXEC_PATH_MISSING");
  }
  try {
    const result = await execFileAsync(
      process.execPath,
      [
        npmExecPath,
        "--silent",
        "run",
        "migrate:down",
        "--",
        ...options.selectorArguments,
      ],
      {
        cwd: process.cwd(),
        env: createChildEnvironment(options.control, options.namespace),
        encoding: "utf8",
        timeout: 10_000,
        windowsHide: true,
      },
    );
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "number" &&
      "stdout" in error &&
      typeof error.stdout === "string" &&
      "stderr" in error &&
      typeof error.stderr === "string"
    ) {
      return {
        code: error.code,
        stdout: error.stdout,
        stderr: error.stderr,
      };
    }
    throw error;
  }
}

describe("API workspace migration CLI", () => {
  it("runs read-only status through the API workspace CLI", async () => {
    const control = loadControl();
    const artifact = await buildMigrationArtifact();
    const authentication = await verifyMigrationArtifact(artifact.buildRoot);
    expect(authentication.manifest.buildId).toBe(artifact.buildId);
    expect(authentication.manifestSha256).toBe(artifact.manifestSha256);
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          await expectEmptyNamespace(control, namespace);
          console.info(
            `MIGRATION_API_STATUS_CLI_READY build=${artifact.buildId} database=${namespace.database} schema=${namespace.schema}`,
          );

          const child = await runStatusCommand({
            artifactRoot: artifact.buildRoot,
            control,
            namespace,
          });
          const missingBoundary =
            child.code === 1 && child.stdout === "" && child.stderr === "";
          if (missingBoundary) {
            throw new Error(
              "MIGRATION_API_STATUS_CLI_MISSING_AFTER_ARTIFACT_AUTHENTICATION",
              { cause: new Error("API workspace status command is unavailable") },
            );
          }

          expect(child).toMatchObject({ code: 0, stderr: "" });
          expect(child.stdout.endsWith("\n")).toBe(true);
          const serializedReport = child.stdout.slice(0, -1);
          expect(serializedReport).not.toContain("\n");
          const report = JSON.parse(serializedReport) as unknown;
          expect(child.stdout).toBe(`${JSON.stringify(report)}\n`);
          expect(report).toEqual({
            operation: "status",
            result: 0,
            buildId: artifact.buildId,
            checksumAgreement: true,
            applied: [],
            pending: authentication.manifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migrationId,
                sourceSha256,
              }),
            ),
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });
          await expectEmptyNamespace(control, namespace);
          const activeBackends = await withClient(
            control,
            namespace.database,
            (client) =>
              client.query<{ pid: number }>(
                `SELECT pid::integer AS pid
                   FROM pg_catalog.pg_stat_activity
                  WHERE datname = $1
                    AND application_name = 'rick-and-morty-explorer:migrations'`,
                [namespace.database],
              ),
          );
          expect(activeBackends.rows).toEqual([]);
        },
      });
    } catch (error) {
      primaryFailure = error;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("applies the accepted migration through the API workspace CLI", async () => {
    const control = loadControl();
    const artifact = await buildMigrationArtifact();
    const authentication = await verifyMigrationArtifact(artifact.buildRoot);
    expect(authentication.manifest.buildId).toBe(artifact.buildId);
    expect(authentication.manifestSha256).toBe(artifact.manifestSha256);
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          await expectEmptyNamespace(control, namespace);
          console.info(
            `MIGRATION_API_UP_CLI_READY build=${artifact.buildId} database=${namespace.database} schema=${namespace.schema}`,
          );

          const child = await runUpCommand({
            artifactRoot: artifact.buildRoot,
            control,
            namespace,
          });
          if (child.code === 1 && child.stdout === "" && child.stderr === "") {
            throw new Error(
              "MIGRATION_API_UP_CLI_MISSING_AFTER_ARTIFACT_AUTHENTICATION",
              { cause: new Error("API workspace up command is unavailable") },
            );
          }

          expect(child).toMatchObject({ code: 0, stderr: "" });
          expect(child.stdout.endsWith("\n")).toBe(true);
          const serializedReport = child.stdout.slice(0, -1);
          expect(serializedReport).not.toContain("\n");
          const report = JSON.parse(serializedReport) as unknown;
          expect(child.stdout).toBe(`${JSON.stringify(report)}\n`);
          expect(report).toEqual({
            operation: "up",
            result: 0,
            buildId: artifact.buildId,
            noOp: false,
            applied: authentication.manifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migrationId,
                sourceSha256,
              }),
            ),
            pending: [],
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });

          const state = await withClient(
            control,
            namespace.database,
            async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1
                    AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              const history = await client.query<{
                migration_id: string;
                source_sha256: string;
              }>(
                `SELECT migration_id, source_sha256
                   FROM ${namespace.schema}.sequelize_migration_history
                  ORDER BY migration_id`,
              );
              const activeBackends = await client.query<{ pid: number }>(
                `SELECT pid::integer AS pid
                   FROM pg_catalog.pg_stat_activity
                  WHERE datname = $1
                    AND application_name = 'rick-and-morty-explorer:migrations'`,
                [namespace.database],
              );
              return { tables: tables.rows, history: history.rows, activeBackends };
            },
          );
          expect(state.tables.map(({ table_name }) => table_name)).toEqual([
            "characters",
            "comments",
            "sequelize_migration_history",
          ]);
          expect(state.history).toEqual(
            authentication.manifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migration_id: migrationId,
                source_sha256: sourceSha256,
              }),
            ),
          );
          expect(state.activeBackends.rows).toEqual([]);
        },
      });
    } catch (error) {
      primaryFailure = error;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("reverts the accepted migration through the API workspace CLI", async () => {
    const control = loadControl();
    const artifact = await buildMigrationArtifact();
    const authentication = await verifyMigrationArtifact(artifact.buildRoot);
    expect(authentication.manifest.buildId).toBe(artifact.buildId);
    expect(authentication.manifestSha256).toBe(artifact.manifestSha256);
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          await expectEmptyNamespace(control, namespace);
          const applied = await runUpCommand({
            artifactRoot: artifact.buildRoot,
            control,
            namespace,
          });
          expect(applied).toMatchObject({ code: 0, stderr: "" });

          const captureState = () =>
            withClient(control, namespace.database, async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1
                    AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              const history = await client.query<{
                migration_id: string;
                source_sha256: string;
              }>(
                `SELECT migration_id, source_sha256
                   FROM ${namespace.schema}.sequelize_migration_history
                  ORDER BY migration_id`,
              );
              return { tables: tables.rows, history: history.rows };
            });
          expect(await captureState()).toEqual({
            tables: [
              { table_name: "characters" },
              { table_name: "comments" },
              { table_name: "sequelize_migration_history" },
            ],
            history: authentication.manifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migration_id: migrationId,
                source_sha256: sourceSha256,
              }),
            ),
          });
          console.info(
            `MIGRATION_API_DOWN_CLI_READY build=${artifact.buildId} database=${namespace.database} schema=${namespace.schema}`,
          );

          const child = await runDownCommand({
            artifactRoot: artifact.buildRoot,
            control,
            namespace,
          });
          if (child.code === 1 && child.stdout === "" && child.stderr === "") {
            throw new Error(
              "MIGRATION_API_DOWN_CLI_MISSING_AFTER_APPLIED_STATE",
              { cause: new Error("API workspace down command is unavailable") },
            );
          }

          expect(child).toMatchObject({ code: 0, stderr: "" });
          expect(child.stdout.endsWith("\n")).toBe(true);
          const serializedReport = child.stdout.slice(0, -1);
          expect(serializedReport).not.toContain("\n");
          const report = JSON.parse(serializedReport) as unknown;
          expect(child.stdout).toBe(`${JSON.stringify(report)}\n`);
          expect(report).toEqual({
            operation: "down",
            result: 0,
            buildId: artifact.buildId,
            noOp: false,
            reverted: authentication.manifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migrationId,
                sourceSha256,
              }),
            ),
            remaining: [],
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });
          expect(await captureState()).toEqual({
            tables: [{ table_name: "sequelize_migration_history" }],
            history: [],
          });
          const activeBackends = await withClient(
            control,
            namespace.database,
            (client) =>
              client.query<{ pid: number }>(
                `SELECT pid::integer AS pid
                   FROM pg_catalog.pg_stat_activity
                  WHERE datname = $1
                    AND application_name = 'rick-and-morty-explorer:migrations'`,
                [namespace.database],
              ),
          );
          expect(activeBackends.rows).toEqual([]);
        },
      });
    } catch (error) {
      primaryFailure = error;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("reverts one applied migration through the API workspace CLI with step one", async () => {
    const control = loadControl();
    const artifact = await buildMigrationArtifact();
    const authentication = await verifyMigrationArtifact(artifact.buildRoot);
    expect(authentication.manifest.buildId).toBe(artifact.buildId);
    expect(authentication.manifestSha256).toBe(artifact.manifestSha256);
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          await expectEmptyNamespace(control, namespace);
          const applied = await runUpCommand({
            artifactRoot: artifact.buildRoot,
            control,
            namespace,
          });
          expect(applied).toMatchObject({ code: 0, stderr: "" });

          const captureState = () =>
            withClient(control, namespace.database, async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1
                    AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              const history = await client.query<{
                migration_id: string;
                source_sha256: string;
              }>(
                `SELECT migration_id, source_sha256
                   FROM ${namespace.schema}.sequelize_migration_history
                  ORDER BY migration_id`,
              );
              return { tables: tables.rows, history: history.rows };
            });
          expect(await captureState()).toEqual({
            tables: [
              { table_name: "characters" },
              { table_name: "comments" },
              { table_name: "sequelize_migration_history" },
            ],
            history: authentication.manifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migration_id: migrationId,
                source_sha256: sourceSha256,
              }),
            ),
          });
          console.info(
            `MIGRATION_API_DOWN_STEP_ONE_CLI_READY build=${artifact.buildId} database=${namespace.database} schema=${namespace.schema}`,
          );

          const child = await runDownStepOneCommand({
            artifactRoot: artifact.buildRoot,
            control,
            namespace,
          });
          if (
            child.code === 1 &&
            child.stdout === "" &&
            child.stderr ===
              `${JSON.stringify({ error: "MIGRATION_COMMAND_INVALID", result: 1 })}\n`
          ) {
            throw new Error(
              "MIGRATION_API_DOWN_STEP_ONE_CLI_MISSING_AFTER_APPLIED_STATE",
              { cause: new Error("API workspace step-one down command is unavailable") },
            );
          }

          expect(child).toMatchObject({ code: 0, stderr: "" });
          expect(child.stdout.endsWith("\n")).toBe(true);
          const serializedReport = child.stdout.slice(0, -1);
          expect(serializedReport).not.toContain("\n");
          const report = JSON.parse(serializedReport) as unknown;
          expect(child.stdout).toBe(`${JSON.stringify(report)}\n`);
          expect(report).toEqual({
            operation: "down",
            result: 0,
            buildId: artifact.buildId,
            noOp: false,
            reverted: authentication.manifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migrationId,
                sourceSha256,
              }),
            ),
            remaining: [],
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });
          expect(await captureState()).toEqual({
            tables: [{ table_name: "sequelize_migration_history" }],
            history: [],
          });
          const activeBackends = await withClient(
            control,
            namespace.database,
            (client) =>
              client.query<{ pid: number }>(
                `SELECT pid::integer AS pid
                   FROM pg_catalog.pg_stat_activity
                  WHERE datname = $1
                    AND application_name = 'rick-and-morty-explorer:migrations'`,
                [namespace.database],
              ),
          );
          expect(activeBackends.rows).toEqual([]);
        },
      });
    } catch (error) {
      primaryFailure = error;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("rejects invalid CLI arguments before environment and artifact work", async () => {
    const compiledCli = resolve(
      "apps/api/dist/infrastructure/database/migration-cli.js",
    );
    const absoluteArtifact = resolve("apps/api/dist/invalid-artifact");
    const environment = {
      ...Object.fromEntries(
        Object.entries(process.env).filter(
          ([name, value]) =>
            value !== undefined &&
            !name.toUpperCase().startsWith("PG") &&
            !name.toUpperCase().startsWith("POSTGRES_"),
        ),
      ),
      PGHOST: "poison.invalid",
      POSTGRES_DB: "",
      POSTGRES_SCHEMA: "",
      POSTGRES_USER: "",
      POSTGRES_PASSWORD: "",
      POSTGRES_PORT: "invalid",
      POSTGRES_MIGRATION_LOCK_TIMEOUT_MS: "invalid",
    };
    const cases = [
      { caseName: "empty", argv: [] },
      { caseName: "status-only", argv: ["status"] },
      {
        caseName: "artifact-value-missing",
        argv: ["status", "--artifact"],
      },
      {
        caseName: "relative-artifact",
        argv: ["status", "--artifact", "relative-artifact"],
      },
      {
        caseName: "unknown-operation",
        argv: ["unknown", "--artifact", absoluteArtifact],
      },
      {
        caseName: "wrong-flag",
        argv: ["status", "--build", absoluteArtifact],
      },
      {
        caseName: "extra-argument",
        argv: ["status", "--artifact", absoluteArtifact, "extra"],
      },
    ] as const;
    const mismatches: string[] = [];

    for (const { caseName, argv } of cases) {
      let child: ChildResult;
      try {
        const result = await execFileAsync(process.execPath, [compiledCli, ...argv], {
          cwd: process.cwd(),
          env: environment,
          encoding: "utf8",
          timeout: 10_000,
          windowsHide: true,
        });
        child = { code: 0, stdout: result.stdout, stderr: result.stderr };
      } catch (error) {
        if (
          typeof error !== "object" ||
          error === null ||
          !("code" in error) ||
          typeof error.code !== "number" ||
          !("stdout" in error) ||
          typeof error.stdout !== "string" ||
          !("stderr" in error) ||
          typeof error.stderr !== "string"
        ) {
          throw error;
        }
        child = {
          code: error.code,
          stdout: error.stdout,
          stderr: error.stderr,
        };
      }

      if (
        child.code !== 1 ||
        child.stdout !== "" ||
        child.stderr !==
          `${JSON.stringify({ error: "MIGRATION_COMMAND_INVALID", result: 1 })}\n`
      ) {
        mismatches.push(caseName);
      }
    }

    if (mismatches.length > 0) {
      throw new Error(
        `MIGRATION_API_CLI_ARGUMENT_REJECTION_INCOMPLETE cases=${mismatches.join(",")}`,
      );
    }
  });

  it("builds and authenticates one migration artifact through the API workspace CLI", async () => {
    const child = await runBuildCommand();
    if (child.code === 1 && child.stdout === "" && child.stderr === "") {
      throw new Error("MIGRATION_API_BUILD_CLI_MISSING", {
        cause: new Error("API workspace build command is unavailable"),
      });
    }

    expect(child).toMatchObject({ code: 0, stderr: "" });
    expect(child.stdout.endsWith("\n")).toBe(true);
    const serializedReport = child.stdout.slice(0, -1);
    expect(serializedReport).not.toContain("\n");
    const report = JSON.parse(serializedReport) as {
      readonly buildId: string;
      readonly buildRoot: string;
      readonly manifestSha256: string;
    };
    expect(child.stdout).toBe(`${JSON.stringify(report)}\n`);
    expect(report).toEqual({
      buildId: expect.stringMatching(/^[0-9a-f]{64}$/u),
      buildRoot: expect.any(String),
      manifestSha256: expect.stringMatching(/^[0-9a-f]{64}$/u),
    });
    expect(isAbsolute(report.buildRoot)).toBe(true);
    expect(basename(report.buildRoot)).toBe(report.buildId);

    const [buildRootMetadata, manifestMetadata] = await Promise.all([
      lstat(report.buildRoot),
      lstat(join(report.buildRoot, "migration-manifest.json")),
    ]);
    expect(buildRootMetadata.isDirectory()).toBe(true);
    expect(buildRootMetadata.isSymbolicLink()).toBe(false);
    expect(manifestMetadata.isFile()).toBe(true);
    expect(manifestMetadata.isSymbolicLink()).toBe(false);

    const authentication = await verifyMigrationArtifact(report.buildRoot);
    expect(authentication.manifest.buildId).toBe(report.buildId);
    expect(authentication.manifestSha256).toBe(report.manifestSha256);
  });

  it("builds and authenticates one migration artifact through the root CLI", async () => {
    const child = await runRootBuildCommand();
    if (child.code === 1 && child.stdout === "" && child.stderr === "") {
      throw new Error("MIGRATION_ROOT_BUILD_CLI_MISSING", {
        cause: new Error("Root migration build command is unavailable"),
      });
    }

    expect(child).toMatchObject({ code: 0, stderr: "" });
    expect(child.stdout.endsWith("\n")).toBe(true);
    const serializedReport = child.stdout.slice(0, -1);
    expect(serializedReport).not.toContain("\n");
    const report = JSON.parse(serializedReport) as {
      readonly buildId: string;
      readonly buildRoot: string;
      readonly manifestSha256: string;
    };
    expect(child.stdout).toBe(`${JSON.stringify(report)}\n`);
    expect(report).toEqual({
      buildId: expect.stringMatching(/^[0-9a-f]{64}$/u),
      buildRoot: expect.any(String),
      manifestSha256: expect.stringMatching(/^[0-9a-f]{64}$/u),
    });
    expect(isAbsolute(report.buildRoot)).toBe(true);
    expect(basename(report.buildRoot)).toBe(report.buildId);

    const [buildRootMetadata, manifestMetadata] = await Promise.all([
      lstat(report.buildRoot),
      lstat(join(report.buildRoot, "migration-manifest.json")),
    ]);
    expect(buildRootMetadata.isDirectory()).toBe(true);
    expect(buildRootMetadata.isSymbolicLink()).toBe(false);
    expect(manifestMetadata.isFile()).toBe(true);
    expect(manifestMetadata.isSymbolicLink()).toBe(false);

    const authentication = await verifyMigrationArtifact(report.buildRoot);
    expect(authentication.manifest.buildId).toBe(report.buildId);
    expect(authentication.manifestSha256).toBe(report.manifestSha256);
  });

  it("runs read-only status through the root CLI", async () => {
    const control = loadControl();
    const artifact = await buildMigrationArtifact();
    const authentication = await verifyMigrationArtifact(artifact.buildRoot);
    expect(authentication.manifest.buildId).toBe(artifact.buildId);
    expect(authentication.manifestSha256).toBe(artifact.manifestSha256);
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          await expectEmptyNamespace(control, namespace);
          console.info(
            `MIGRATION_ROOT_STATUS_CLI_READY build=${artifact.buildId} database=${namespace.database} schema=${namespace.schema}`,
          );

          const child = await runRootStatusCommand({ control, namespace });
          if (child.code === 1 && child.stdout === "" && child.stderr === "") {
            throw new Error(
              "MIGRATION_ROOT_STATUS_CLI_MISSING_AFTER_ARTIFACT_AUTHENTICATION",
              { cause: new Error("Root migration status command is unavailable") },
            );
          }

          expect(child).toMatchObject({ code: 0, stderr: "" });
          expect(child.stdout.endsWith("\n")).toBe(true);
          const serializedReport = child.stdout.slice(0, -1);
          expect(serializedReport).not.toContain("\n");
          const report = JSON.parse(serializedReport) as unknown;
          expect(child.stdout).toBe(`${JSON.stringify(report)}\n`);
          expect(report).toEqual({
            operation: "status",
            result: 0,
            buildId: artifact.buildId,
            checksumAgreement: true,
            applied: [],
            pending: authentication.manifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migrationId,
                sourceSha256,
              }),
            ),
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });
          await expectEmptyNamespace(control, namespace);
          const activeBackends = await withClient(
            control,
            namespace.database,
            (client) =>
              client.query<{ pid: number }>(
                `SELECT pid::integer AS pid
                   FROM pg_catalog.pg_stat_activity
                  WHERE datname = $1
                    AND application_name = 'rick-and-morty-explorer:migrations'`,
                [namespace.database],
              ),
          );
          expect(activeBackends.rows).toEqual([]);
        },
      });
    } catch (error) {
      primaryFailure = error;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  }, 15_000);

  it("applies the accepted migration through the root CLI", async () => {
    const control = loadControl();
    const artifact = await buildMigrationArtifact();
    const authentication = await verifyMigrationArtifact(artifact.buildRoot);
    expect(authentication.manifest.buildId).toBe(artifact.buildId);
    expect(authentication.manifestSha256).toBe(artifact.manifestSha256);
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          await expectEmptyNamespace(control, namespace);
          console.info(
            `MIGRATION_ROOT_UP_CLI_READY build=${artifact.buildId} database=${namespace.database} schema=${namespace.schema}`,
          );

          const child = await runRootUpCommand({ control, namespace });
          if (child.code === 1 && child.stdout === "" && child.stderr === "") {
            throw new Error(
              "MIGRATION_ROOT_UP_CLI_MISSING_AFTER_ARTIFACT_AUTHENTICATION",
              { cause: new Error("Root migration up command is unavailable") },
            );
          }

          expect(child).toMatchObject({ code: 0, stderr: "" });
          expect(child.stdout.endsWith("\n")).toBe(true);
          const serializedReport = child.stdout.slice(0, -1);
          expect(serializedReport).not.toContain("\n");
          const report = JSON.parse(serializedReport) as unknown;
          expect(child.stdout).toBe(`${JSON.stringify(report)}\n`);
          expect(report).toEqual({
            operation: "up",
            result: 0,
            buildId: artifact.buildId,
            noOp: false,
            applied: authentication.manifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migrationId,
                sourceSha256,
              }),
            ),
            pending: [],
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });

          const state = await withClient(
            control,
            namespace.database,
            async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1
                    AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              const history = await client.query<{
                migration_id: string;
                source_sha256: string;
              }>(
                `SELECT migration_id, source_sha256
                   FROM ${namespace.schema}.sequelize_migration_history
                  ORDER BY migration_id`,
              );
              const activeBackends = await client.query<{ pid: number }>(
                `SELECT pid::integer AS pid
                   FROM pg_catalog.pg_stat_activity
                  WHERE datname = $1
                    AND application_name = 'rick-and-morty-explorer:migrations'`,
                [namespace.database],
              );
              return { tables: tables.rows, history: history.rows, activeBackends };
            },
          );
          expect(state.tables.map(({ table_name }) => table_name)).toEqual([
            "characters",
            "comments",
            "sequelize_migration_history",
          ]);
          expect(state.history).toEqual(
            authentication.manifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migration_id: migrationId,
                source_sha256: sourceSha256,
              }),
            ),
          );
          expect(state.activeBackends.rows).toEqual([]);
        },
      });
    } catch (error) {
      primaryFailure = error;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  }, 15_000);

  it("reverts the accepted migration through the root CLI", async () => {
    const control = loadControl();
    const artifact = await buildMigrationArtifact();
    const authentication = await verifyMigrationArtifact(artifact.buildRoot);
    expect(authentication.manifest.buildId).toBe(artifact.buildId);
    expect(authentication.manifestSha256).toBe(artifact.manifestSha256);
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          await expectEmptyNamespace(control, namespace);
          const applied = await runUpCommand({
            artifactRoot: artifact.buildRoot,
            control,
            namespace,
          });
          expect(applied).toMatchObject({ code: 0, stderr: "" });

          const captureState = () =>
            withClient(control, namespace.database, async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1
                    AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              const history = await client.query<{
                migration_id: string;
                source_sha256: string;
              }>(
                `SELECT migration_id, source_sha256
                   FROM ${namespace.schema}.sequelize_migration_history
                  ORDER BY migration_id`,
              );
              return { tables: tables.rows, history: history.rows };
            });
          expect(await captureState()).toEqual({
            tables: [
              { table_name: "characters" },
              { table_name: "comments" },
              { table_name: "sequelize_migration_history" },
            ],
            history: authentication.manifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migration_id: migrationId,
                source_sha256: sourceSha256,
              }),
            ),
          });
          console.info(
            `MIGRATION_ROOT_DOWN_CLI_READY build=${artifact.buildId} database=${namespace.database} schema=${namespace.schema}`,
          );

          const child = await runRootDownCommand({ control, namespace });
          if (child.code === 1 && child.stdout === "" && child.stderr === "") {
            throw new Error(
              "MIGRATION_ROOT_DOWN_CLI_MISSING_AFTER_APPLIED_STATE",
              { cause: new Error("Root migration down command is unavailable") },
            );
          }

          expect(child).toMatchObject({ code: 0, stderr: "" });
          expect(child.stdout.endsWith("\n")).toBe(true);
          const serializedReport = child.stdout.slice(0, -1);
          expect(serializedReport).not.toContain("\n");
          const report = JSON.parse(serializedReport) as unknown;
          expect(child.stdout).toBe(`${JSON.stringify(report)}\n`);
          expect(report).toEqual({
            operation: "down",
            result: 0,
            buildId: artifact.buildId,
            noOp: false,
            reverted: authentication.manifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migrationId,
                sourceSha256,
              }),
            ),
            remaining: [],
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });
          expect(await captureState()).toEqual({
            tables: [{ table_name: "sequelize_migration_history" }],
            history: [],
          });
          const activeBackends = await withClient(
            control,
            namespace.database,
            (client) =>
              client.query<{ pid: number }>(
                `SELECT pid::integer AS pid
                   FROM pg_catalog.pg_stat_activity
                  WHERE datname = $1
                    AND application_name = 'rick-and-morty-explorer:migrations'`,
                [namespace.database],
              ),
          );
          expect(activeBackends.rows).toEqual([]);
        },
      });
    } catch (error) {
      primaryFailure = error;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  }, 15_000);

  it("reverts one applied migration through the root CLI with step one", async () => {
    const control = loadControl();
    const artifact = await buildMigrationArtifact();
    const authentication = await verifyMigrationArtifact(artifact.buildRoot);
    expect(authentication.manifest.buildId).toBe(artifact.buildId);
    expect(authentication.manifestSha256).toBe(artifact.manifestSha256);
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          await expectEmptyNamespace(control, namespace);
          const applied = await runUpCommand({
            artifactRoot: artifact.buildRoot,
            control,
            namespace,
          });
          expect(applied).toMatchObject({ code: 0, stderr: "" });

          const captureState = () =>
            withClient(control, namespace.database, async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1
                    AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              const history = await client.query<{
                migration_id: string;
                source_sha256: string;
              }>(
                `SELECT migration_id, source_sha256
                   FROM ${namespace.schema}.sequelize_migration_history
                  ORDER BY migration_id`,
              );
              return { tables: tables.rows, history: history.rows };
            });
          expect(await captureState()).toEqual({
            tables: [
              { table_name: "characters" },
              { table_name: "comments" },
              { table_name: "sequelize_migration_history" },
            ],
            history: authentication.manifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migration_id: migrationId,
                source_sha256: sourceSha256,
              }),
            ),
          });
          console.info(
            `MIGRATION_ROOT_DOWN_STEP_ONE_CLI_READY build=${artifact.buildId} database=${namespace.database} schema=${namespace.schema}`,
          );

          const child = await runRootDownStepOneCommand({ control, namespace });
          if (
            child.code === 1 &&
            child.stdout === "" &&
            child.stderr.includes("Error: MIGRATION_COMMAND_INVALID")
          ) {
            throw new Error(
              "MIGRATION_ROOT_DOWN_STEP_ONE_CLI_MISSING_AFTER_APPLIED_STATE",
              { cause: new Error("Root step-one down selector is unavailable") },
            );
          }

          expect(child).toMatchObject({ code: 0, stderr: "" });
          expect(child.stdout.endsWith("\n")).toBe(true);
          const serializedReport = child.stdout.slice(0, -1);
          expect(serializedReport).not.toContain("\n");
          const report = JSON.parse(serializedReport) as unknown;
          expect(child.stdout).toBe(`${JSON.stringify(report)}\n`);
          expect(report).toEqual({
            operation: "down",
            result: 0,
            buildId: artifact.buildId,
            noOp: false,
            reverted: authentication.manifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migrationId,
                sourceSha256,
              }),
            ),
            remaining: [],
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });
          expect(await captureState()).toEqual({
            tables: [{ table_name: "sequelize_migration_history" }],
            history: [],
          });
          const activeBackends = await withClient(
            control,
            namespace.database,
            (client) =>
              client.query<{ pid: number }>(
                `SELECT pid::integer AS pid
                   FROM pg_catalog.pg_stat_activity
                  WHERE datname = $1
                    AND application_name = 'rick-and-morty-explorer:migrations'`,
                [namespace.database],
              ),
          );
          expect(activeBackends.rows).toEqual([]);
        },
      });
    } catch (error) {
      primaryFailure = error;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  }, 15_000);

  it("forwards the complete bounded rollback selector grammar through API and root CLIs", async () => {
    const control = loadControl();
    const artifact = await buildMigrationArtifact();
    const authentication = await verifyMigrationArtifact(artifact.buildRoot);
    expect(authentication.manifest.buildId).toBe(artifact.buildId);
    expect(authentication.manifestSha256).toBe(artifact.manifestSha256);
    expect(authentication.manifest.mappings).toHaveLength(1);
    const mapping = authentication.manifest.mappings[0];
    if (mapping === undefined) {
      throw new Error("MIGRATION_CLI_BOUNDED_SELECTOR_MAPPING_MISSING");
    }
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          await expectEmptyNamespace(control, namespace);
          const applied = await runUpCommand({
            artifactRoot: artifact.buildRoot,
            control,
            namespace,
          });
          expect(applied).toMatchObject({ code: 0, stderr: "" });

          const captureState = () =>
            withClient(control, namespace.database, async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1
                    AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              const history = await client.query<{
                migration_id: string;
                source_sha256: string;
              }>(
                `SELECT migration_id, source_sha256
                   FROM ${namespace.schema}.sequelize_migration_history
                  ORDER BY migration_id`,
              );
              return { tables: tables.rows, history: history.rows };
            });
          const expectedState = {
            tables: [
              { table_name: "characters" },
              { table_name: "comments" },
              { table_name: "sequelize_migration_history" },
            ],
            history: [
              {
                migration_id: mapping.migrationId,
                source_sha256: mapping.sourceSha256,
              },
            ],
          };
          expect(await captureState()).toEqual(expectedState);
          console.info(
            `MIGRATION_CLI_BOUNDED_SELECTORS_READY build=${artifact.buildId} database=${namespace.database} schema=${namespace.schema} applied=1`,
          );

          const mismatches: string[] = [];
          const expectedNoOpReport = {
            operation: "down",
            result: 0,
            buildId: artifact.buildId,
            noOp: true,
            reverted: [],
            remaining: [
              {
                migrationId: mapping.migrationId,
                sourceSha256: mapping.sourceSha256,
              },
            ],
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          };
          const parseSuccess = (child: ChildResult): unknown => {
            expect(child).toMatchObject({ code: 0, stderr: "" });
            expect(child.stdout.endsWith("\n")).toBe(true);
            const serializedReport = child.stdout.slice(0, -1);
            expect(serializedReport).not.toContain("\n");
            const report = JSON.parse(serializedReport) as unknown;
            expect(child.stdout).toBe(`${JSON.stringify(report)}\n`);
            return report;
          };
          const invalidCommandOutput =
            '{"error":"MIGRATION_COMMAND_INVALID","result":1}\n';
          const rollbackBoundsOutput =
            '{"error":"MIGRATION_ROLLBACK_BOUNDS","result":1}\n';

          const apiKeepThrough = await runDownSelectorCommand({
            artifactRoot: artifact.buildRoot,
            control,
            namespace,
            selectorArguments: ["--keep-through", mapping.migrationId],
          });
          if (
            apiKeepThrough.code === 1 &&
            apiKeepThrough.stdout === "" &&
            apiKeepThrough.stderr === invalidCommandOutput
          ) {
            mismatches.push("api-keep-through");
          } else {
            expect(parseSuccess(apiKeepThrough)).toEqual(expectedNoOpReport);
          }
          expect(await captureState()).toEqual(expectedState);

          const apiStepTwo = await runDownSelectorCommand({
            artifactRoot: artifact.buildRoot,
            control,
            namespace,
            selectorArguments: ["--step", "2", "--confirm-multiple"],
          });
          if (
            apiStepTwo.code === 1 &&
            apiStepTwo.stdout === "" &&
            apiStepTwo.stderr === invalidCommandOutput
          ) {
            mismatches.push("api-step-two-confirmed");
          } else {
            expect(apiStepTwo).toEqual({
              code: 1,
              stdout: "",
              stderr: rollbackBoundsOutput,
            });
          }
          expect(await captureState()).toEqual(expectedState);

          const rootKeepThrough = await runRootDownSelectorCommand({
            control,
            namespace,
            selectorArguments: ["--keep-through", mapping.migrationId],
          });
          if (
            rootKeepThrough.code === 1 &&
            rootKeepThrough.stdout === "" &&
            rootKeepThrough.stderr.includes("Error: MIGRATION_COMMAND_INVALID")
          ) {
            mismatches.push("root-keep-through");
          } else {
            expect(parseSuccess(rootKeepThrough)).toEqual(expectedNoOpReport);
          }
          expect(await captureState()).toEqual(expectedState);

          const rootStepTwo = await runRootDownSelectorCommand({
            control,
            namespace,
            selectorArguments: ["--step", "2", "--confirm-multiple"],
          });
          if (
            rootStepTwo.code === 1 &&
            rootStepTwo.stdout === "" &&
            rootStepTwo.stderr.includes("Error: MIGRATION_COMMAND_INVALID")
          ) {
            mismatches.push("root-step-two-confirmed");
          } else {
            expect(rootStepTwo.code).toBe(1);
            expect(rootStepTwo.stdout).toBe("");
            expect(rootStepTwo.stderr).toContain("MIGRATION_ROLLBACK_BOUNDS");
            expect(rootStepTwo.stderr).not.toContain("MIGRATION_COMMAND_INVALID");
          }
          expect(await captureState()).toEqual(expectedState);

          const activeBackends = await withClient(
            control,
            namespace.database,
            (client) =>
              client.query<{ pid: number }>(
                `SELECT pid::integer AS pid
                   FROM pg_catalog.pg_stat_activity
                  WHERE datname = $1
                    AND application_name = 'rick-and-morty-explorer:migrations'`,
                [namespace.database],
              ),
          );
          expect(activeBackends.rows).toEqual([]);

          if (mismatches.length > 0) {
            throw new Error(
              `MIGRATION_CLI_BOUNDED_SELECTOR_GRAMMAR_INCOMPLETE cases=${mismatches.join(",")}`,
            );
          }
        },
      });
    } catch (error) {
      primaryFailure = error;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  }, 45_000);

  it("propagates canonical result-one and result-two failures through the root CLI", async () => {
    const control = loadControl();
    const artifact = await buildMigrationArtifact();
    const authentication = await verifyMigrationArtifact(artifact.buildRoot);
    expect(authentication.manifest.buildId).toBe(artifact.buildId);
    expect(authentication.manifestSha256).toBe(artifact.manifestSha256);
    expect(authentication.manifest.mappings).toHaveLength(1);
    const mapping = authentication.manifest.mappings[0];
    if (mapping === undefined) {
      throw new Error("MIGRATION_ROOT_CLI_NONZERO_MAPPING_MISSING");
    }
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const mismatches: string[] = [];
          const exactFailure = (
            child: ChildResult,
            error: string,
            result: 1 | 2,
          ): boolean =>
            child.code === result &&
            child.stdout === "" &&
            child.stderr === `${JSON.stringify({ error, result })}\n`;
          const captureState = () =>
            withClient(control, namespace.database, async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1
                    AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              const history =
                tables.rows.length === 0
                  ? []
                  : (
                      await client.query<{
                        migration_id: string;
                        source_sha256: string;
                      }>(
                        `SELECT migration_id, source_sha256
                           FROM ${namespace.schema}.sequelize_migration_history
                          ORDER BY migration_id`,
                      )
                    ).rows;
              return { tables: tables.rows, history };
            });

          const emptyState = { tables: [], history: [] };
          expect(await captureState()).toEqual(emptyState);
          const invalidEnvironment = {
            ...createChildEnvironment(control, namespace),
            POSTGRES_PORT: "0",
          };
          const apiLoaderFailure = await runStatusCommand({
            artifactRoot: artifact.buildRoot,
            control,
            namespace,
            environment: invalidEnvironment,
          });
          expect(
            exactFailure(
              apiLoaderFailure,
              "MIGRATION_STARTUP_CONFIG_INVALID",
              1,
            ),
          ).toBe(true);
          expect(await captureState()).toEqual(emptyState);
          const rootLoaderFailure = await runRootStatusCommand({
            control,
            namespace,
            environment: invalidEnvironment,
          });
          if (
            !exactFailure(
              rootLoaderFailure,
              "MIGRATION_STARTUP_CONFIG_INVALID",
              1,
            )
          ) {
            mismatches.push("loader-result-one");
          }
          expect(await captureState()).toEqual(emptyState);

          const applied = await runUpCommand({
            artifactRoot: artifact.buildRoot,
            control,
            namespace,
          });
          expect(applied).toMatchObject({ code: 0, stderr: "" });
          const appliedState = {
            tables: [
              { table_name: "characters" },
              { table_name: "comments" },
              { table_name: "sequelize_migration_history" },
            ],
            history: [
              {
                migration_id: mapping.migrationId,
                source_sha256: mapping.sourceSha256,
              },
            ],
          };
          expect(await captureState()).toEqual(appliedState);

          const apiBoundsFailure = await runDownSelectorCommand({
            artifactRoot: artifact.buildRoot,
            control,
            namespace,
            selectorArguments: ["--step", "2", "--confirm-multiple"],
          });
          expect(
            exactFailure(apiBoundsFailure, "MIGRATION_ROLLBACK_BOUNDS", 1),
          ).toBe(true);
          expect(await captureState()).toEqual(appliedState);
          const rootBoundsFailure = await runRootDownSelectorCommand({
            control,
            namespace,
            selectorArguments: ["--step", "2", "--confirm-multiple"],
          });
          if (
            !exactFailure(
              rootBoundsFailure,
              "MIGRATION_ROLLBACK_BOUNDS",
              1,
            )
          ) {
            mismatches.push("rollback-bounds-result-one");
          }
          expect(await captureState()).toEqual(appliedState);

          const blocker = new Client({
            host: "127.0.0.1",
            port: control.port,
            database: namespace.database,
            user: control.user,
            password: control.password,
            ssl: false,
            connectionTimeoutMillis: 10_000,
          });
          await blocker.connect();
          try {
            await blocker.query("BEGIN");
            await blocker.query(
              "SELECT pg_catalog.pg_advisory_xact_lock(CAST($1 AS pg_catalog.int8))",
              [deriveMigrationLockKey(namespace.database, namespace.schema)],
            );
            const timeoutEnvironment = {
              ...createChildEnvironment(control, namespace),
              POSTGRES_MIGRATION_LOCK_TIMEOUT_MS: "200",
            };
            const apiTimeoutFailure = await runStatusCommand({
              artifactRoot: artifact.buildRoot,
              control,
              namespace,
              environment: timeoutEnvironment,
            });
            expect(
              exactFailure(apiTimeoutFailure, "MIGRATION_LOCK_TIMEOUT", 2),
            ).toBe(true);
            expect(await captureState()).toEqual(appliedState);
            const rootTimeoutFailure = await runRootStatusCommand({
              control,
              namespace,
              environment: timeoutEnvironment,
            });
            if (
              !exactFailure(
                rootTimeoutFailure,
                "MIGRATION_LOCK_TIMEOUT",
                2,
              )
            ) {
              mismatches.push("lock-timeout-result-two");
            }
            expect(await captureState()).toEqual(appliedState);
          } finally {
            await blocker.query("ROLLBACK");
            await blocker.end();
          }

          const activeBackends = await withClient(
            control,
            namespace.database,
            (client) =>
              client.query<{ pid: number }>(
                `SELECT pid::integer AS pid
                   FROM pg_catalog.pg_stat_activity
                  WHERE datname = $1
                    AND application_name = 'rick-and-morty-explorer:migrations'`,
                [namespace.database],
              ),
          );
          expect(activeBackends.rows).toEqual([]);
          console.info(
            `MIGRATION_ROOT_CLI_NONZERO_PROPAGATION_READY build=${artifact.buildId} loader=1 rollback=1 timeout=2`,
          );

          if (mismatches.length > 0) {
            throw new Error(
              `MIGRATION_ROOT_CLI_NONZERO_PROPAGATION_INCOMPLETE cases=${mismatches.join(",")}`,
            );
          }
        },
      });
    } catch (error) {
      primaryFailure = error;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  }, 90_000);
});
