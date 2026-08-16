import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { describe, expect, it } from "vitest";

import {
  createMigrationArtifactSandbox,
  removeMigrationArtifactSandbox,
} from "./migration-artifact-sandbox.test.js";

interface ChildResult {
  readonly code: number | null;
  readonly stderr: string;
  readonly stdout: string;
  readonly timedOut: boolean;
}

const activeChildren = new Set<ReturnType<typeof spawn>>();

async function runNativeProbe(options: {
  readonly caseName: string;
  readonly cwd: string;
  readonly migrationUrl: string;
  readonly runnerUrl: string;
}): Promise<ChildResult> {
  const script = `
    console.log(${JSON.stringify("MIGRATION_ARTIFACT_CWD_CHILD_READY")} + " case=" + ${JSON.stringify(options.caseName)} + " cwd=" + process.cwd());
    const runner = await import(${JSON.stringify(options.runnerUrl)});
    const migrationModule = await import(${JSON.stringify(options.migrationUrl)});
    if (typeof runner.runMigrationUp !== "function") throw new Error("RUNNER_EXPORT_MISSING");
    if (runner.runMigrationUp.constructor.name !== "AsyncFunction") throw new Error("RUNNER_EXPORT_NOT_ASYNC");
    const migration = migrationModule.migration;
    if (migration === null || typeof migration !== "object") throw new Error("MIGRATION_EXPORT_MISSING");
    if (typeof migration.up !== "function" || typeof migration.down !== "function") throw new Error("MIGRATION_FUNCTION_MISSING");
    if (migration.up.constructor.name !== "AsyncFunction" || migration.down.constructor.name !== "AsyncFunction") throw new Error("MIGRATION_FUNCTION_NOT_ASYNC");
    let mappedStack = "";
    try {
      await migration.up({});
    } catch (error) {
      mappedStack = String(error?.stack ?? error);
    }
    if (!mappedStack.includes("20260814000000-create-relational-schema.ts")) {
      console.error(mappedStack);
      throw new Error("MIGRATION_SOURCE_MAP_MISSING");
    }
    console.log(${JSON.stringify("MIGRATION_ARTIFACT_CWD_OK")} + " case=" + ${JSON.stringify(options.caseName)});
  `;
  const child = spawn(
    process.execPath,
    ["--enable-source-maps", "--input-type=module", "--eval", script],
    { cwd: options.cwd, shell: false, windowsHide: true },
  );
  activeChildren.add(child);
  let stdout = "";
  let stderr = "";
  child.stdout?.setEncoding("utf8");
  child.stderr?.setEncoding("utf8");
  child.stdout?.on("data", (chunk: string) => {
    stdout += chunk;
  });
  child.stderr?.on("data", (chunk: string) => {
    stderr += chunk;
  });

  return await new Promise<ChildResult>((resolve, reject) => {
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, 10_000);
    child.once("error", (error) => {
      clearTimeout(timeout);
      activeChildren.delete(child);
      reject(error);
    });
    child.once("close", (code) => {
      clearTimeout(timeout);
      activeChildren.delete(child);
      resolve({ code, stderr, stdout, timedOut });
    });
  });
}

describe("native migration artifact loading across working directories", () => {
  it("loads one authenticated artifact with mapped diagnostics from every cwd", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const artifact = await sandbox.migrationArtifact.buildMigrationArtifact();
      const authentication =
        await sandbox.migrationArtifact.verifyMigrationArtifact(
          artifact.buildRoot,
        );
      const runner = authentication.manifest.files.find(
        ({ role }) => role === "runner",
      );
      const mapping = authentication.manifest.mappings[0];
      expect(runner).toBeDefined();
      expect(mapping).toBeDefined();
      if (runner === undefined || mapping === undefined) {
        throw new Error("MIGRATION_ARTIFACT_CWD_FIXTURE_MISSING");
      }

      const unrelatedCwd = join(sandbox.root, "unrelated-cwd");
      await mkdir(unrelatedCwd);
      const cases = [
        { caseName: "repository", cwd: sandbox.repositoryRoot },
        { caseName: "api-workspace", cwd: join(sandbox.root, "apps/api") },
        { caseName: "unrelated", cwd: unrelatedCwd },
      ] as const;
      const runnerUrl = pathToFileURL(
        join(artifact.buildRoot, runner.path),
      ).href;
      const migrationUrl = pathToFileURL(
        join(artifact.buildRoot, mapping.emittedPath),
      ).href;
      console.info(`MIGRATION_ARTIFACT_CWD_READY build=${artifact.buildId}`);

      for (const current of cases) {
        try {
          const result = await runNativeProbe({
            ...current,
            migrationUrl,
            runnerUrl,
          });
          expect(result.timedOut).toBe(false);
          expect(result.code).toBe(0);
          expect(result.stderr).toBe("");
          expect(result.stdout).toContain(
            `MIGRATION_ARTIFACT_CWD_CHILD_READY case=${current.caseName}`,
          );
          expect(result.stdout).toContain(
            `MIGRATION_ARTIFACT_CWD_OK case=${current.caseName}`,
          );
        } catch (error) {
          throw new Error(
            `MIGRATION_ARTIFACT_CWD_OR_SOURCE_MAP_MISSING case=${current.caseName}`,
            { cause: error },
          );
        }
      }
    } finally {
      for (const child of activeChildren) {
        child.kill();
      }
      await removeMigrationArtifactSandbox(sandbox);
    }
    expect(activeChildren.size).toBe(0);
  }, 15_000);
});
