import { execFile } from "node:child_process";
import { randomBytes } from "node:crypto";
import { createServer } from "node:net";
import { basename, isAbsolute, win32 } from "node:path";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { withPostgresNamespace } from "../apps/api/src/infrastructure/database/postgres-lifecycle.js";

interface CommandResult {
  readonly code: number;
  readonly stdout: string;
  readonly stderr: string;
}

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

interface VerificationCommand {
  readonly stepId: string;
  readonly composeProject?: string;
  readonly postgresPort?: number;
  readonly redisPort?: number;
  readonly control?: PostgresControl;
  readonly namespace?: AllocatedNamespace;
  readonly buildRoot?: string;
}

interface VerificationDependencies {
  createRunId(): string;
  reservePort(): Promise<number>;
  runCommand(command: VerificationCommand): Promise<CommandResult>;
  withPostgresNamespace<T>(options: {
    readonly control: PostgresControl;
    readonly body: (namespace: AllocatedNamespace) => Promise<T>;
  }): Promise<T>;
}

interface BuildReport {
  readonly buildId: string;
  readonly buildRoot: string;
  readonly manifestSha256: string;
}

interface VerificationReport extends BuildReport {
  readonly operation: "verify-task-004";
  readonly result: 0;
  readonly runId: string;
  readonly composeProject: string;
  readonly postgresPort: number;
  readonly redisPort: number;
  readonly database: string;
  readonly schema: string;
  readonly head: string;
  readonly treeStatus: string;
  readonly checks: readonly string[];
}

interface VerificationFailure {
  readonly stepId: string;
  readonly code: number;
}

interface VerificationFailureReport {
  readonly operation: "verify-task-004";
  readonly result: number;
  readonly runId: string;
  readonly primary: VerificationFailure | null;
  readonly cleanup: VerificationFailure | null;
  readonly head: string;
  readonly treeStatus: string;
}

const preNamespaceSteps = [
  "install",
  "dependencies-direct",
  "dependencies-transitive",
  "browser-install",
  "compose-config",
  "compose-up",
  "compose-ps",
  "typecheck",
  "migration-build",
] as const;

const namespaceSteps = [
  "api-status-empty",
  "api-up-first",
  "api-status-applied",
  "api-up-no-op",
  "api-down-default",
  "api-up-reapply",
  "root-status",
  "root-up-no-op",
  "root-down-default",
  "root-up-reapply",
  "root-down-step-one",
] as const;

const postNamespaceSteps = [
  "migrate-validate-emitted",
  "test-unit",
  "test-integration",
  "test-application",
  "test-smoke",
  "test-root",
  "build",
  "validate-tailwind",
  "test-smoke-lifecycle",
  "validate-docs",
  "validate-adrs",
] as const;

const dockerSteps: ReadonlySet<string> = new Set([
  "compose-config",
  "compose-up",
  "compose-ps",
]);

const controlOnlySteps: ReadonlySet<string> = new Set([
  "migrate-validate-emitted",
  "test-unit",
  "test-integration",
  "test-application",
  "test-smoke",
  "test-root",
]);

const lowerHex64 = /^[0-9a-f]{64}$/u;
const lowerHex40Line = /^([0-9a-f]{40})\n$/u;
const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function parseBuildReport(stdout: string): BuildReport {
  if (!stdout.endsWith("\n") || stdout.slice(0, -1).includes("\n")) {
    throw new Error("TASK_004_VERIFICATION_COMMAND_FAILED");
  }

  let value: unknown;
  try {
    value = JSON.parse(stdout.slice(0, -1));
  } catch {
    throw new Error("TASK_004_VERIFICATION_COMMAND_FAILED");
  }

  if (
    typeof value !== "object" ||
    value === null ||
    Object.keys(value).join(",") !== "buildId,buildRoot,manifestSha256"
  ) {
    throw new Error("TASK_004_VERIFICATION_COMMAND_FAILED");
  }

  const report = value as Record<string, unknown>;
  if (
    typeof report.buildId !== "string" ||
    !lowerHex64.test(report.buildId) ||
    typeof report.buildRoot !== "string" ||
    (!isAbsolute(report.buildRoot) && !win32.isAbsolute(report.buildRoot)) ||
    (basename(report.buildRoot) !== report.buildId &&
      win32.basename(report.buildRoot) !== report.buildId) ||
    typeof report.manifestSha256 !== "string" ||
    !lowerHex64.test(report.manifestSha256)
  ) {
    throw new Error("TASK_004_VERIFICATION_COMMAND_FAILED");
  }

  return {
    buildId: report.buildId,
    buildRoot: report.buildRoot,
    manifestSha256: report.manifestSha256,
  };
}

function reserveLoopbackPort(): Promise<number> {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (address === null || typeof address === "string") {
        server.close(() => reject(new Error("TASK_004_VERIFICATION_PORT_INVALID")));
        return;
      }
      server.close((error) => {
        if (error !== undefined) {
          reject(error);
          return;
        }
        resolvePort(address.port);
      });
    });
    server.unref();
  });
}

function childEnvironment(command: VerificationCommand): NodeJS.ProcessEnv {
  const environment = Object.fromEntries(
    Object.entries(process.env).filter(
      ([name]) => !/^PG/iu.test(name) && !name.startsWith("POSTGRES_"),
    ),
  );
  if (
    command.composeProject !== undefined &&
    command.postgresPort !== undefined &&
    command.redisPort !== undefined
  ) {
    return {
      ...environment,
      POSTGRES_DB: "rick_and_morty",
      POSTGRES_USER: "rick_and_morty",
      POSTGRES_PASSWORD: "local-development-only",
      POSTGRES_PORT: String(command.postgresPort),
      REDIS_PORT: String(command.redisPort),
    };
  }
  if (command.control !== undefined && command.namespace !== undefined) {
    return {
      ...environment,
      POSTGRES_DB: command.namespace.database,
      POSTGRES_SCHEMA: command.namespace.schema,
      POSTGRES_USER: command.control.user,
      POSTGRES_PASSWORD: command.control.password,
      POSTGRES_PORT: String(command.control.port),
    };
  }
  if (command.control !== undefined) {
    return {
      ...environment,
      POSTGRES_DB: command.control.database,
      POSTGRES_USER: command.control.user,
      POSTGRES_PASSWORD: command.control.password,
      POSTGRES_PORT: String(command.control.port),
    };
  }
  return environment;
}

function npmArguments(
  npmExecPath: string,
  ...arguments_: readonly string[]
): readonly string[] {
  return [npmExecPath, "--silent", ...arguments_];
}

function commandInvocation(
  command: VerificationCommand,
  npmExecPath: string,
): { readonly file: string; readonly arguments: readonly string[] } {
  const npm = (...arguments_: readonly string[]) => ({
    file: process.execPath,
    arguments: npmArguments(npmExecPath, ...arguments_),
  });
  switch (command.stepId) {
    case "install":
      return npm("ci");
    case "dependencies-direct":
      return npm("ls", "--depth=0", "--workspaces", "--include-workspace-root");
    case "dependencies-transitive":
      return npm("ls", "pg-protocol@1.15.0", "pgpass@1.0.5", "--all");
    case "browser-install":
      return npm("run", "browser:install");
    case "compose-config":
      return { file: "docker", arguments: ["compose", "-p", command.composeProject!, "config"] };
    case "compose-up":
      return {
        file: "docker",
        arguments: ["compose", "-p", command.composeProject!, "up", "-d", "--wait"],
      };
    case "compose-ps":
      return { file: "docker", arguments: ["compose", "-p", command.composeProject!, "ps"] };
    case "typecheck":
      return npm("run", "typecheck");
    case "migration-build":
      return npm("run", "migrate:build");
    case "api-status-empty":
    case "api-status-applied":
      return npm(
        "run",
        "migration:status",
        "--workspace",
        "@rick-and-morty/api",
        "--",
        "--artifact",
        command.buildRoot!,
      );
    case "api-up-first":
    case "api-up-no-op":
    case "api-up-reapply":
      return npm(
        "run",
        "migration:up",
        "--workspace",
        "@rick-and-morty/api",
        "--",
        "--artifact",
        command.buildRoot!,
      );
    case "api-down-default":
      return npm(
        "run",
        "migration:down",
        "--workspace",
        "@rick-and-morty/api",
        "--",
        "--artifact",
        command.buildRoot!,
      );
    case "root-status":
      return npm("run", "migrate:status");
    case "root-up-no-op":
    case "root-up-reapply":
      return npm("run", "migrate:up");
    case "root-down-default":
      return npm("run", "migrate:down");
    case "root-down-step-one":
      return npm("run", "migrate:down", "--", "--step", "1");
    case "migrate-validate-emitted":
      return npm("run", "migrate:validate-emitted");
    case "test-unit":
      return npm("run", "test:unit");
    case "test-integration":
      return npm("run", "test:integration");
    case "test-application":
      return npm("run", "test:application");
    case "test-smoke":
      return npm("run", "test:smoke");
    case "test-root":
      return npm("test");
    case "build":
      return npm("run", "build");
    case "validate-tailwind":
      return npm("run", "validate:tailwind");
    case "test-smoke-lifecycle":
      return npm("run", "test:smoke:lifecycle");
    case "validate-docs":
      return {
        file: "python",
        arguments: ["-B", ".agents/skills/verify-repository/scripts/validate_docs.py", "--repo", "."],
      };
    case "validate-adrs":
      return {
        file: "python",
        arguments: ["-B", ".agents/skills/govern-adrs/scripts/validate_adrs.py", "--repo", "."],
      };
    case "git-diff-check":
      return { file: "git", arguments: ["diff", "--check"] };
    case "git-head":
      return { file: "git", arguments: ["rev-parse", "HEAD"] };
    case "git-status":
      return { file: "git", arguments: ["status", "--short"] };
    case "compose-down":
      return {
        file: "docker",
        arguments: ["compose", "-p", command.composeProject!, "down", "--volumes"],
      };
    default:
      throw new Error("TASK_004_VERIFICATION_COMMAND_INVALID");
  }
}

function executeCommand(
  command: VerificationCommand,
  npmExecPath: string,
): Promise<CommandResult> {
  const invocation = commandInvocation(command, npmExecPath);
  return new Promise((resolveResult) => {
    execFile(
      invocation.file,
      [...invocation.arguments],
      {
        cwd: repositoryRoot,
        encoding: "utf8",
        env: childEnvironment(command),
        windowsHide: true,
      },
      (error, stdout, stderr) => {
        const errorCode =
          error === null
            ? 0
            : typeof error.code === "number"
              ? error.code
              : 1;
        resolveResult({ code: errorCode, stdout, stderr });
      },
    );
  });
}

function createDefaultDependencies(): VerificationDependencies {
  const npmExecPath = process.env.npm_execpath;
  if (typeof npmExecPath !== "string" || npmExecPath.length === 0) {
    throw new Error("TASK_004_VERIFICATION_NPM_ENTRY_UNAVAILABLE");
  }
  return {
    createRunId: () => randomBytes(8).toString("hex"),
    reservePort: reserveLoopbackPort,
    runCommand: async (command) => await executeCommand(command, npmExecPath),
    withPostgresNamespace: async ({ control, body }) =>
      await withPostgresNamespace({
        control,
        body: async ({ database, schema }) => await body({ database, schema }),
      }),
  };
}

export async function runTask004Verification(
  dependencies: VerificationDependencies = createDefaultDependencies(),
): Promise<VerificationReport | VerificationFailureReport> {
  const runId = dependencies.createRunId();
  if (!/^[0-9a-f]{16}$/u.test(runId)) {
    throw new Error("TASK_004_VERIFICATION_COMMAND_FAILED");
  }

  const postgresPort = await dependencies.reservePort();
  const redisPort = await dependencies.reservePort();
  if (
    !Number.isInteger(postgresPort) ||
    postgresPort < 1 ||
    postgresPort > 65_535 ||
    !Number.isInteger(redisPort) ||
    redisPort < 1 ||
    redisPort > 65_535 ||
    postgresPort === redisPort
  ) {
    throw new Error("TASK_004_VERIFICATION_COMMAND_FAILED");
  }

  const composeProject = `rick-and-morty-task004-verify-${runId}`;
  const control: PostgresControl = {
    database: "rick_and_morty",
    user: "rick_and_morty",
    password: "local-development-only",
    port: postgresPort,
  };
  const checks: string[] = [];
  let primary: VerificationFailure | null = null;

  let buildReport: BuildReport | undefined;
  for (const stepId of preNamespaceSteps) {
    const command = dockerSteps.has(stepId)
      ? {
          stepId,
          composeProject,
          postgresPort,
          redisPort,
        }
      : { stepId };
    const result = await dependencies.runCommand(command);
    if (result.code !== 0) {
      primary = { stepId, code: result.code };
      break;
    }
    checks.push(stepId);
    if (stepId === "migration-build") {
      buildReport = parseBuildReport(result.stdout);
    }
  }

  let namespace: AllocatedNamespace | undefined;
  if (primary === null) {
    if (buildReport === undefined) {
      throw new Error("TASK_004_VERIFICATION_COMMAND_FAILED");
    }
    namespace = await dependencies.withPostgresNamespace({
      control,
      body: async (allocatedNamespace) => {
        for (const stepId of namespaceSteps) {
          const command = stepId.startsWith("api-")
            ? {
                stepId,
                control,
                namespace: allocatedNamespace,
                buildRoot: buildReport.buildRoot,
              }
            : { stepId, control, namespace: allocatedNamespace };
          const result = await dependencies.runCommand(command);
          if (result.code !== 0) {
            primary = { stepId, code: result.code };
            break;
          }
          checks.push(stepId);
        }
        return allocatedNamespace;
      },
    });
  }

  if (primary === null) {
    for (const stepId of postNamespaceSteps) {
      const command = controlOnlySteps.has(stepId)
        ? { stepId, control }
        : { stepId };
      const result = await dependencies.runCommand(command);
      if (result.code !== 0) {
        primary = { stepId, code: result.code };
        break;
      }
      checks.push(stepId);
    }
  }

  const diffResult = await dependencies.runCommand({ stepId: "git-diff-check" });
  if (diffResult.code === 0) {
    checks.push("git-diff-check");
  }
  const headResult = await dependencies.runCommand({
    stepId: "git-head",
  });
  if (headResult.code === 0) {
    checks.push("git-head");
  }
  const treeStatusResult = await dependencies.runCommand({
    stepId: "git-status",
  });
  if (treeStatusResult.code === 0) {
    checks.push("git-status");
  }
  const cleanupResult = await dependencies.runCommand({
    stepId: "compose-down",
    composeProject,
    postgresPort,
    redisPort,
  });
  const cleanup =
    cleanupResult.code === 0
      ? null
      : { stepId: "compose-down", code: cleanupResult.code };
  if (cleanup === null) {
    checks.push("compose-down");
  }

  const headMatch = lowerHex40Line.exec(headResult.stdout);
  if (headMatch?.[1] === undefined) {
    throw new Error("TASK_004_VERIFICATION_COMMAND_FAILED");
  }

  if (primary !== null || cleanup !== null) {
    return {
      operation: "verify-task-004",
      result: primary?.code ?? cleanup?.code ?? 1,
      runId,
      primary,
      cleanup,
      head: headMatch[1],
      treeStatus: treeStatusResult.stdout,
    };
  }

  if (namespace === undefined || buildReport === undefined) {
    throw new Error("TASK_004_VERIFICATION_COMMAND_FAILED");
  }

  return {
    operation: "verify-task-004",
    result: 0,
    runId,
    composeProject,
    postgresPort,
    redisPort,
    database: namespace.database,
    schema: namespace.schema,
    buildId: buildReport.buildId,
    buildRoot: buildReport.buildRoot,
    manifestSha256: buildReport.manifestSha256,
    head: headMatch[1],
    treeStatus: treeStatusResult.stdout,
    checks,
  };
}

const directEntry =
  process.argv.length === 2 &&
  process.argv[1] !== undefined &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (directEntry) {
  const report = await runTask004Verification();
  process.stdout.write(`${JSON.stringify(report)}\n`);
  process.exitCode = report.result;
}
