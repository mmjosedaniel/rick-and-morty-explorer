import { isAbsolute, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { buildMigrationArtifact } from "./migration-artifact.js";
import {
  inspectMigrationStatus,
  loadMigrationTargetFromEnvironment,
  prepareMigratedNamespace,
  revertMigratedNamespace,
} from "./postgres-lifecycle.js";

async function runMigrationCli(argv: readonly string[]): Promise<unknown> {
  if (argv.length === 1 && argv[0] === "build") {
    const { buildId, buildRoot, manifestSha256 } = await buildMigrationArtifact();
    return { buildId, buildRoot, manifestSha256 };
  }
  const operation = argv[0];
  const buildRoot = argv[2];
  const isDefaultOperation =
    argv.length === 3 &&
    (operation === "status" || operation === "up" || operation === "down");
  const isStepOneDown =
    argv.length === 5 &&
    operation === "down" &&
    argv[3] === "--step" &&
    argv[4] === "1";
  const isKeepThroughDown =
    argv.length === 5 &&
    operation === "down" &&
    argv[3] === "--keep-through" &&
    argv[4] !== undefined &&
    argv[4].length > 0;
  const confirmedStepCount =
    argv.length === 6 &&
    operation === "down" &&
    argv[3] === "--step" &&
    argv[4] !== undefined &&
    /^[1-9][0-9]*$/u.test(argv[4]) &&
    argv[5] === "--confirm-multiple"
      ? Number(argv[4])
      : undefined;
  const isConfirmedMultiStepDown =
    confirmedStepCount !== undefined &&
    Number.isSafeInteger(confirmedStepCount) &&
    confirmedStepCount > 1;
  if (
    (!isDefaultOperation &&
      !isStepOneDown &&
      !isKeepThroughDown &&
      !isConfirmedMultiStepDown) ||
    argv[1] !== "--artifact" ||
    buildRoot === undefined ||
    !isAbsolute(buildRoot)
  ) {
    throw new Error("MIGRATION_COMMAND_INVALID");
  }
  const target = loadMigrationTargetFromEnvironment(process.env);
  if (operation === "status") {
    return inspectMigrationStatus({ target, buildRoot });
  }
  if (operation === "up") {
    return prepareMigratedNamespace({ target, buildRoot });
  }
  if (isStepOneDown) {
    return revertMigratedNamespace({
      target,
      buildRoot,
      selector: { kind: "step", count: 1, confirmMultiple: false },
    });
  }
  if (isKeepThroughDown) {
    return revertMigratedNamespace({
      target,
      buildRoot,
      selector: { kind: "keep-through", migrationId: argv[4]! },
    });
  }
  if (isConfirmedMultiStepDown) {
    return revertMigratedNamespace({
      target,
      buildRoot,
      selector: {
        kind: "step",
        count: confirmedStepCount,
        confirmMultiple: true,
      },
    });
  }
  return revertMigratedNamespace({ target, buildRoot });
}

async function main(): Promise<void> {
  try {
    const report = await runMigrationCli(process.argv.slice(2));
    process.stdout.write(`${JSON.stringify(report)}\n`);
  } catch (error) {
    const result =
      error instanceof Error &&
      "result" in error &&
      (error as Error & { readonly result?: unknown }).result === 2
        ? 2
        : 1;
    const message = error instanceof Error ? error.message : "MIGRATION_COMMAND_FAILED";
    process.stderr.write(`${JSON.stringify({ error: message, result })}\n`);
    process.exitCode = result;
  }
}

const entryPath = process.argv[1];
if (
  entryPath !== undefined &&
  pathToFileURL(resolve(entryPath)).href === import.meta.url
) {
  await main();
}
