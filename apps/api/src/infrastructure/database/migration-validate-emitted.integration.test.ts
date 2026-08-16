import { execFile } from "node:child_process";
import { lstat } from "node:fs/promises";
import { promisify } from "node:util";

import { Client } from "pg";
import { describe, expect, it } from "vitest";

import {
  buildMigrationArtifact,
  verifyMigrationArtifact,
} from "./migration-artifact.js";

interface PostgresControl {
  readonly database: string;
  readonly user: string;
  readonly password: string;
  readonly port: number;
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

async function withControlClient<T>(
  control: PostgresControl,
  body: (client: Client) => Promise<T>,
): Promise<T> {
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
    return await body(client);
  } finally {
    await client.end();
  }
}

async function observeOwnedState(control: PostgresControl): Promise<{
  readonly databases: readonly string[];
  readonly backends: readonly number[];
}> {
  return withControlClient(control, async (client) => {
    const databases = await client.query<{ datname: string }>(
      `SELECT datname
         FROM pg_catalog.pg_database
        WHERE datname LIKE 'task_004_%'
        ORDER BY datname`,
    );
    const backends = await client.query<{ pid: number }>(
      `SELECT pid::integer AS pid
         FROM pg_catalog.pg_stat_activity
        WHERE datname LIKE 'task_004_%'
           OR application_name = 'rick-and-morty-explorer:migrations'
        ORDER BY pid`,
    );
    return {
      databases: databases.rows.map(({ datname }) => datname),
      backends: backends.rows.map(({ pid }) => pid),
    };
  });
}

function createChildEnvironment(control: PostgresControl): NodeJS.ProcessEnv {
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
    POSTGRES_DB: control.database,
    POSTGRES_SCHEMA: "public",
    POSTGRES_USER: control.user,
    POSTGRES_PASSWORD: control.password,
    POSTGRES_PORT: String(control.port),
    POSTGRES_MIGRATION_LOCK_TIMEOUT_MS: "5000",
  };
}

async function runValidateEmittedCommand(
  control: PostgresControl,
): Promise<ChildResult> {
  const npmExecPath = process.env.npm_execpath;
  if (npmExecPath === undefined || npmExecPath.length === 0) {
    throw new Error("MIGRATION_VALIDATE_EMITTED_NPM_EXEC_PATH_MISSING");
  }
  try {
    const result = await execFileAsync(
      process.execPath,
      [npmExecPath, "--silent", "run", "migrate:validate-emitted"],
      {
        cwd: process.cwd(),
        env: createChildEnvironment(control),
        encoding: "utf8",
        timeout: 25_000,
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

describe("root emitted migration validation", () => {
  it("validates one emitted migration lifecycle through the root command", async () => {
    const control = loadControl();
    const artifact = await buildMigrationArtifact();
    const authentication = await verifyMigrationArtifact(artifact.buildRoot);
    expect(authentication.manifest.buildId).toBe(artifact.buildId);
    expect(authentication.manifestSha256).toBe(artifact.manifestSha256);
    expect(await observeOwnedState(control)).toEqual({
      databases: [],
      backends: [],
    });
    console.info(`MIGRATION_VALIDATE_EMITTED_READY build=${artifact.buildId}`);
    let primaryFailure: unknown;

    try {
      const child = await runValidateEmittedCommand(control);
      if (child.code === 1 && child.stdout === "" && child.stderr === "") {
        throw new Error(
          "MIGRATION_ROOT_VALIDATE_EMITTED_MISSING_AFTER_ARTIFACT_AUTHENTICATION",
          { cause: new Error("Root emitted-validation command is unavailable") },
        );
      }

      expect(child).toMatchObject({ code: 0, stderr: "" });
      expect(child.stdout.endsWith("\n")).toBe(true);
      const serializedReport = child.stdout.slice(0, -1);
      expect(serializedReport).not.toContain("\n");
      const report = JSON.parse(serializedReport) as Record<string, unknown>;
      expect(child.stdout).toBe(`${JSON.stringify(report)}\n`);
      expect(Object.keys(report)).toEqual([
        "operation",
        "result",
        "buildId",
        "buildRoot",
        "manifestSha256",
        "checks",
      ]);
      expect(report).toEqual({
        operation: "validate-emitted",
        result: 0,
        buildId: artifact.buildId,
        buildRoot: artifact.buildRoot,
        manifestSha256: artifact.manifestSha256,
        checks: [
          "empty-status",
          "first-up",
          "applied-status",
          "no-op-up",
          "default-down",
          "reapply",
        ],
      });

      const buildRootState = await lstat(artifact.buildRoot);
      const manifestState = await lstat(artifact.manifestPath);
      expect(buildRootState.isDirectory()).toBe(true);
      expect(buildRootState.isSymbolicLink()).toBe(false);
      expect(manifestState.isFile()).toBe(true);
      expect(manifestState.isSymbolicLink()).toBe(false);
      const retained = await verifyMigrationArtifact(artifact.buildRoot);
      expect(retained.manifest.buildId).toBe(artifact.buildId);
      expect(retained.manifestSha256).toBe(artifact.manifestSha256);
    } catch (error) {
      primaryFailure = error;
    }

    expect(await observeOwnedState(control)).toEqual({
      databases: [],
      backends: [],
    });
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  }, 30_000);
});
