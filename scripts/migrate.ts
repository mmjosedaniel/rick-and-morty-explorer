import { execFile } from "node:child_process";
import { basename, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import {
  inspectMigrationStatus,
  prepareMigratedNamespace,
  revertMigratedNamespace,
  withPostgresNamespace,
} from "../apps/api/src/infrastructure/database/postgres-lifecycle.js";

const execFileAsync = promisify(execFile);
const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const sha256Pattern = /^[0-9a-f]{64}$/u;

interface MigrationBuildReport {
  readonly buildId: string;
  readonly buildRoot: string;
  readonly manifestSha256: string;
}

interface PostgresControl {
  readonly database: string;
  readonly user: string;
  readonly password: string;
  readonly port: number;
}

interface MappingIdentity {
  readonly migrationId: string;
  readonly sourceSha256: string;
}

interface ValidatedStatusReport {
  readonly applied: readonly MappingIdentity[];
  readonly pending: readonly MappingIdentity[];
  readonly namespace: Record<PropertyKey, unknown>;
  readonly startup: Record<PropertyKey, unknown>;
}

interface ValidatedUpReport {
  readonly noOp: boolean;
  readonly applied: readonly MappingIdentity[];
  readonly namespace: Record<PropertyKey, unknown>;
  readonly startup: Record<PropertyKey, unknown>;
}

interface ValidatedDownReport {
  readonly noOp: boolean;
  readonly reverted: readonly MappingIdentity[];
  readonly remaining: readonly MappingIdentity[];
  readonly namespace: Record<PropertyKey, unknown>;
  readonly startup: Record<PropertyKey, unknown>;
}

async function runNpm(arguments_: readonly string[]): Promise<string> {
  const npmExecPath = process.env["npm_execpath"];

  if (npmExecPath === undefined || npmExecPath.length === 0) {
    throw new Error("MIGRATION_ROOT_NPM_EXEC_PATH_MISSING");
  }

  const result = await execFileAsync(
    process.execPath,
    [npmExecPath, "--silent", ...arguments_],
    {
      cwd: repositoryRoot,
      encoding: "utf8",
      windowsHide: true,
    },
  );
  return result.stdout;
}

function parseBuildReport(output: string): MigrationBuildReport {
  if (!output.endsWith("\n") || output.slice(0, -1).includes("\n")) {
    throw new Error("MIGRATION_BUILD_REPORT_INVALID");
  }

  const value: unknown = JSON.parse(output.slice(0, -1));
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    Reflect.ownKeys(value).sort().join(",") !==
      "buildId,buildRoot,manifestSha256"
  ) {
    throw new Error("MIGRATION_BUILD_REPORT_INVALID");
  }

  const { buildId, buildRoot, manifestSha256 } = value as Record<
    "buildId" | "buildRoot" | "manifestSha256",
    unknown
  >;
  if (
    typeof buildId !== "string" ||
    !sha256Pattern.test(buildId) ||
    typeof buildRoot !== "string" ||
    !isAbsolute(buildRoot) ||
    basename(buildRoot) !== buildId ||
    typeof manifestSha256 !== "string" ||
    !sha256Pattern.test(manifestSha256)
  ) {
    throw new Error("MIGRATION_BUILD_REPORT_INVALID");
  }

  return { buildId, buildRoot, manifestSha256 };
}

function loadPostgresControl(): PostgresControl {
  const database = process.env["POSTGRES_DB"] ?? "rick_and_morty";
  const user = process.env["POSTGRES_USER"] ?? "rick_and_morty";
  const password = process.env["POSTGRES_PASSWORD"];
  const port = Number(process.env["POSTGRES_PORT"] ?? "5432");
  const identifierPattern = /^[a-z][a-z0-9_]{0,62}$/u;
  if (
    !identifierPattern.test(database) ||
    !identifierPattern.test(user) ||
    password === undefined ||
    password.length === 0 ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65_535
  ) {
    throw new Error("MIGRATION_STARTUP_CONFIG_INVALID");
  }
  return { database, user, password, port };
}

function requireRecord(value: unknown): Record<PropertyKey, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("MIGRATION_VALIDATE_EMITTED_REPORT_INVALID");
  }
  return value as Record<PropertyKey, unknown>;
}

function requireExactKeys(
  value: Record<PropertyKey, unknown>,
  keys: readonly string[],
): void {
  const actualKeys = Reflect.ownKeys(value);
  if (
    actualKeys.some((key) => typeof key !== "string") ||
    actualKeys.toSorted().join(",") !== keys.toSorted().join(",")
  ) {
    throw new Error("MIGRATION_VALIDATE_EMITTED_REPORT_INVALID");
  }
}

function requireMappings(value: unknown): readonly MappingIdentity[] {
  if (!Array.isArray(value)) {
    throw new Error("MIGRATION_VALIDATE_EMITTED_REPORT_INVALID");
  }
  return value.map((item) => {
    const mapping = requireRecord(item);
    requireExactKeys(mapping, ["migrationId", "sourceSha256"]);
    if (
      typeof mapping["migrationId"] !== "string" ||
      typeof mapping["sourceSha256"] !== "string" ||
      !sha256Pattern.test(mapping["sourceSha256"])
    ) {
      throw new Error("MIGRATION_VALIDATE_EMITTED_REPORT_INVALID");
    }
    return {
      migrationId: mapping["migrationId"],
      sourceSha256: mapping["sourceSha256"],
    };
  });
}

function requireLifecycleReport(
  value: unknown,
  operation: "status" | "up" | "down",
  buildId: string,
  keys: readonly string[],
): Record<PropertyKey, unknown> {
  const report = requireRecord(value);
  requireExactKeys(report, keys);
  if (
    report["operation"] !== operation ||
    report["result"] !== 0 ||
    report["buildId"] !== buildId
  ) {
    throw new Error("MIGRATION_VALIDATE_EMITTED_REPORT_INVALID");
  }
  return report;
}

function validateStatusReport(value: unknown, buildId: string): ValidatedStatusReport {
  const report = requireLifecycleReport(value, "status", buildId, [
    "operation",
    "result",
    "buildId",
    "checksumAgreement",
    "applied",
    "pending",
    "namespace",
    "startup",
  ]);
  if (report["checksumAgreement"] !== true) {
    throw new Error("MIGRATION_VALIDATE_EMITTED_REPORT_INVALID");
  }
  return {
    applied: requireMappings(report["applied"]),
    pending: requireMappings(report["pending"]),
    namespace: requireRecord(report["namespace"]),
    startup: requireRecord(report["startup"]),
  };
}

function validateUpReport(value: unknown, buildId: string): ValidatedUpReport {
  const report = requireLifecycleReport(value, "up", buildId, [
    "operation",
    "result",
    "buildId",
    "noOp",
    "applied",
    "pending",
    "namespace",
    "startup",
  ]);
  if (typeof report["noOp"] !== "boolean" || !Array.isArray(report["pending"])) {
    throw new Error("MIGRATION_VALIDATE_EMITTED_REPORT_INVALID");
  }
  return {
    noOp: report["noOp"],
    applied: requireMappings(report["applied"]),
    namespace: requireRecord(report["namespace"]),
    startup: requireRecord(report["startup"]),
  };
}

function validateDownReport(value: unknown, buildId: string): ValidatedDownReport {
  const report = requireLifecycleReport(value, "down", buildId, [
    "operation",
    "result",
    "buildId",
    "noOp",
    "reverted",
    "remaining",
    "namespace",
    "startup",
  ]);
  if (typeof report["noOp"] !== "boolean") {
    throw new Error("MIGRATION_VALIDATE_EMITTED_REPORT_INVALID");
  }
  return {
    noOp: report["noOp"],
    reverted: requireMappings(report["reverted"]),
    remaining: requireMappings(report["remaining"]),
    namespace: requireRecord(report["namespace"]),
    startup: requireRecord(report["startup"]),
  };
}

function requireEqual(actual: unknown, expected: unknown): void {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error("MIGRATION_VALIDATE_EMITTED_REPORT_INVALID");
  }
}

const operation = process.argv[2];
const isDefaultOperation =
  process.argv.length === 3 &&
  (operation === "build" ||
    operation === "down" ||
    operation === "status" ||
    operation === "up" ||
    operation === "validate-emitted");
const isStepOneDown =
  process.argv.length === 5 &&
  operation === "down" &&
  process.argv[3] === "--step" &&
  process.argv[4] === "1";
const isKeepThroughDown =
  process.argv.length === 5 &&
  operation === "down" &&
  process.argv[3] === "--keep-through" &&
  process.argv[4] !== undefined &&
  process.argv[4].length > 0;
const confirmedStepCount =
  process.argv.length === 6 &&
  operation === "down" &&
  process.argv[3] === "--step" &&
  process.argv[4] !== undefined &&
  /^[1-9][0-9]*$/u.test(process.argv[4]) &&
  process.argv[5] === "--confirm-multiple"
    ? Number(process.argv[4])
    : undefined;
const isConfirmedMultiStepDown =
  confirmedStepCount !== undefined &&
  Number.isSafeInteger(confirmedStepCount) &&
  confirmedStepCount > 1;
if (
  !isDefaultOperation &&
  !isStepOneDown &&
  !isKeepThroughDown &&
  !isConfirmedMultiStepDown
) {
  throw new Error("MIGRATION_COMMAND_INVALID");
}

await runNpm(["run", "build", "--workspace", "@rick-and-morty/api"]);
const report = parseBuildReport(
  await runNpm(["run", "migration:build", "--workspace", "@rick-and-morty/api"]),
);
if (operation === "build") {
  process.stdout.write(`${JSON.stringify(report)}\n`);
} else if (operation === "validate-emitted") {
  const checks = await withPostgresNamespace({
    control: loadPostgresControl(),
    body: async ({ target }) => {
      const options = { target, buildRoot: report.buildRoot };
      const emptyStatus = validateStatusReport(
        await inspectMigrationStatus(options),
        report.buildId,
      );
      if (emptyStatus.applied.length !== 0 || emptyStatus.pending.length !== 1) {
        throw new Error("MIGRATION_VALIDATE_EMITTED_REPORT_INVALID");
      }

      const firstUp = validateUpReport(
        await prepareMigratedNamespace(options),
        report.buildId,
      );
      if (firstUp.noOp || firstUp.applied.length !== 1) {
        throw new Error("MIGRATION_VALIDATE_EMITTED_REPORT_INVALID");
      }
      requireEqual(firstUp.applied, emptyStatus.pending);

      const appliedStatus = validateStatusReport(
        await inspectMigrationStatus(options),
        report.buildId,
      );
      requireEqual(appliedStatus.applied, firstUp.applied);
      requireEqual(appliedStatus.pending, []);

      const noOpUp = validateUpReport(
        await prepareMigratedNamespace(options),
        report.buildId,
      );
      if (!noOpUp.noOp) {
        throw new Error("MIGRATION_VALIDATE_EMITTED_REPORT_INVALID");
      }
      requireEqual(noOpUp.applied, []);

      const defaultDown = validateDownReport(
        await revertMigratedNamespace(options),
        report.buildId,
      );
      if (defaultDown.noOp) {
        throw new Error("MIGRATION_VALIDATE_EMITTED_REPORT_INVALID");
      }
      requireEqual(defaultDown.reverted, firstUp.applied);
      requireEqual(defaultDown.remaining, []);

      const reapply = validateUpReport(
        await prepareMigratedNamespace(options),
        report.buildId,
      );
      if (reapply.noOp) {
        throw new Error("MIGRATION_VALIDATE_EMITTED_REPORT_INVALID");
      }
      requireEqual(reapply.applied, firstUp.applied);

      for (const lifecycleReport of [
        firstUp,
        appliedStatus,
        noOpUp,
        defaultDown,
        reapply,
      ]) {
        requireEqual(lifecycleReport.namespace, emptyStatus.namespace);
        requireEqual(lifecycleReport.startup, emptyStatus.startup);
      }

      return [
        "empty-status",
        "first-up",
        "applied-status",
        "no-op-up",
        "default-down",
        "reapply",
      ] as const;
    },
  });
  process.stdout.write(
    `${JSON.stringify({
      operation: "validate-emitted",
      result: 0,
      buildId: report.buildId,
      buildRoot: report.buildRoot,
      manifestSha256: report.manifestSha256,
      checks,
    })}\n`,
  );
} else {
  try {
    process.stdout.write(
      await runNpm([
        "run",
        operation === "status"
          ? "migration:status"
          : operation === "up"
            ? "migration:up"
            : "migration:down",
        "--workspace",
        "@rick-and-morty/api",
        "--",
        "--artifact",
        report.buildRoot,
        ...(isStepOneDown
          ? ["--step", "1"]
          : isKeepThroughDown
            ? ["--keep-through", process.argv[4]!]
            : isConfirmedMultiStepDown
              ? ["--step", String(confirmedStepCount), "--confirm-multiple"]
              : []),
      ]),
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error.code === 1 || error.code === 2) &&
      "stdout" in error &&
      typeof error.stdout === "string" &&
      "stderr" in error &&
      typeof error.stderr === "string"
    ) {
      process.stdout.write(error.stdout);
      process.stderr.write(error.stderr);
      process.exitCode = error.code;
    } else {
      throw error;
    }
  }
}
