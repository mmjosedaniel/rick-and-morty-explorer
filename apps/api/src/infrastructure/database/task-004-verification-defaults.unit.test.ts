import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { describe, expect, it, vi } from "vitest";

interface ChildInvocation {
  readonly file: string;
  readonly args: readonly string[];
  readonly options: {
    readonly cwd?: string;
    readonly encoding?: string;
    readonly env?: NodeJS.ProcessEnv;
    readonly windowsHide?: boolean;
  };
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

const defaultMocks = vi.hoisted(() => ({
  childInvocations: [] as ChildInvocation[],
  closeCalls: 0,
  createServer: vi.fn(),
  execFile: vi.fn(),
  namespaceCalls: [] as PostgresControl[],
  randomBytes: vi.fn(),
  serverPorts: [] as number[],
  withPostgresNamespace: vi.fn(),
}));

vi.mock("node:crypto", async (importOriginal) => ({
  ...(await importOriginal<typeof import("node:crypto")>()),
  randomBytes: defaultMocks.randomBytes,
}));

vi.mock("node:child_process", async (importOriginal) => ({
  ...(await importOriginal<typeof import("node:child_process")>()),
  execFile: defaultMocks.execFile,
  execFileSync: () => {
    throw new Error("TASK_004_VERIFICATION_UNEXPECTED_SYNC_CHILD");
  },
  spawn: () => {
    throw new Error("TASK_004_VERIFICATION_UNEXPECTED_SPAWN");
  },
  spawnSync: () => {
    throw new Error("TASK_004_VERIFICATION_UNEXPECTED_SYNC_SPAWN");
  },
}));

vi.mock("node:net", async (importOriginal) => ({
  ...(await importOriginal<typeof import("node:net")>()),
  createServer: defaultMocks.createServer,
}));

vi.mock("./postgres-lifecycle.js", () => ({
  withPostgresNamespace: defaultMocks.withPostgresNamespace,
}));

const repositoryRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../..",
);
const controllerPath = resolve(repositoryRoot, "scripts/verify-task-004.ts");
const controllerUrl = pathToFileURL(controllerPath).href;
const buildId = "a".repeat(64);
const manifestSha256 = "b".repeat(64);
const buildRoot = resolve(
  repositoryRoot,
  "apps/api/dist/infrastructure/database/migrations/builds",
  buildId,
);
const head = "c".repeat(40);
const runId = "0123456789abcdef";
const namespace: AllocatedNamespace = {
  database: `task_004_${runId}`,
  schema: `task_004_${runId}`,
};
const checks = [
  "install",
  "dependencies-direct",
  "dependencies-transitive",
  "browser-install",
  "compose-config",
  "compose-up",
  "compose-ps",
  "typecheck",
  "migration-build",
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
  "migrate-validate-emitted",
  "test-unit",
  "test-integration",
  "test-application",
  "test-smoke",
  "build",
  "validate-tailwind",
  "test-smoke-lifecycle",
  "validate-docs",
  "validate-adrs",
  "git-diff-check",
  "git-head",
  "git-status",
  "compose-down",
] as const;

function npmArgs(npmExecPath: string, ...args: readonly string[]): readonly string[] {
  return [npmExecPath, "--silent", ...args];
}

describe("TASK-004 verification default entry", () => {
  it("runs the closed TASK-004 verification entry with real default adapters", async () => {
    const packageDocument = JSON.parse(
      await readFile(resolve(repositoryRoot, "package.json"), "utf8"),
    ) as { readonly scripts?: Readonly<Record<string, string>> };
    const toolsDocument = JSON.parse(
      await readFile(resolve(repositoryRoot, "tsconfig.tools.json"), "utf8"),
    ) as { readonly files?: readonly string[] };
    const npmExecPath = process.env.npm_execpath;
    if (typeof npmExecPath !== "string" || npmExecPath.length === 0) {
      throw new Error("TASK_004_VERIFICATION_NPM_ENTRY_UNAVAILABLE");
    }

    const originalArgv = [...process.argv];
    const originalEnvironment = { ...process.env };
    const originalExitCode = process.exitCode;
    const originalStdoutWrite = process.stdout.write;
    const originalStderrWrite = process.stderr.write;
    const stdout: string[] = [];
    const stderr: string[] = [];
    const observationFailures: Error[] = [];
    const recordObservation = async (
      name: string,
      observation: () => void | Promise<void>,
    ): Promise<void> => {
      try {
        await observation();
      } catch {
        observationFailures.push(new Error(name));
      }
    };

    const portBase = 49_152 + ((process.pid % 4_000) * 2);
    defaultMocks.serverPorts.splice(0, defaultMocks.serverPorts.length, portBase, portBase + 1);
    defaultMocks.childInvocations.splice(0);
    defaultMocks.namespaceCalls.splice(0);
    defaultMocks.closeCalls = 0;
    defaultMocks.randomBytes.mockReset();
    defaultMocks.randomBytes.mockReturnValue(Buffer.from(runId, "hex"));
    defaultMocks.createServer.mockReset();
    defaultMocks.createServer.mockImplementation(() => {
      const port = defaultMocks.serverPorts[defaultMocks.createServer.mock.calls.length - 1];
      const listeners = new Map<string, () => void>();
      return {
        address: () => ({ address: "127.0.0.1", family: "IPv4", port }),
        close: (callback?: () => void) => {
          defaultMocks.closeCalls += 1;
          callback?.();
        },
        listen: (...args: unknown[]) => {
          const callback = args.find((value) => typeof value === "function") as
            | (() => void)
            | undefined;
          queueMicrotask(() => {
            callback?.();
            listeners.get("listening")?.();
          });
        },
        once: (event: string, listener: () => void) => {
          listeners.set(event, listener);
        },
        unref: () => undefined,
      };
    });
    defaultMocks.withPostgresNamespace.mockReset();
    defaultMocks.withPostgresNamespace.mockImplementation(
      async (options: {
        readonly control: PostgresControl;
        readonly body: (value: AllocatedNamespace) => Promise<unknown>;
      }) => {
        defaultMocks.namespaceCalls.push(options.control);
        return await options.body(namespace);
      },
    );
    defaultMocks.execFile.mockReset();
    defaultMocks.execFile.mockImplementation((...rawArguments: unknown[]) => {
      const [file, args, options, callback] = rawArguments as [
        string,
        readonly string[],
        ChildInvocation["options"],
        (error: Error | null, stdout: string, stderr: string) => void,
      ];
      defaultMocks.childInvocations.push({ file, args, options });
      const joined = args.join(" ");
      const commandStdout = joined.includes("migrate:build")
        ? `${JSON.stringify({ buildId, buildRoot, manifestSha256 })}\n`
        : file === "git" && joined === "rev-parse HEAD"
          ? `${head}\n`
          : "";
      queueMicrotask(() => callback(null, commandStdout, ""));
      return { pid: process.pid };
    });

    try {
      process.argv = [process.execPath, controllerPath];
      process.exitCode = undefined;
      process.env.PGHOST = "must-not-reach-a-child";
      process.env.POSTGRES_TASK004_STALE = "must-not-reach-a-child";
      process.stdout.write = ((chunk: string | Uint8Array) => {
        stdout.push(typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf8"));
        return true;
      }) as typeof process.stdout.write;
      process.stderr.write = ((chunk: string | Uint8Array) => {
        stderr.push(typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf8"));
        return true;
      }) as typeof process.stderr.write;

      await recordObservation("package-entry", () => {
        expect(packageDocument.scripts?.["verify:task-004"]).toBe(
          "tsx scripts/verify-task-004.ts",
        );
        expect(
          Object.values(packageDocument.scripts ?? {}).filter((value) =>
            value.includes("scripts/verify-task-004.ts"),
          ),
        ).toEqual(["tsx scripts/verify-task-004.ts"]);
      });
      await recordObservation("tools-registration", () => {
        expect(
          (toolsDocument.files ?? []).filter(
            (value) => value === "scripts/verify-task-004.ts",
          ),
        ).toEqual(["scripts/verify-task-004.ts"]);
      });
      await recordObservation("direct-entry", async () => {
        await import(controllerUrl);
      });

      const postgresPort = defaultMocks.serverPorts[0];
      const redisPort = defaultMocks.serverPorts[1];
      const composeProject = `rick-and-morty-task004-verify-${runId}`;
      const expectedArgs = [
        npmArgs(npmExecPath, "ci"),
        npmArgs(npmExecPath, "ls", "--depth=0", "--workspaces", "--include-workspace-root"),
        npmArgs(npmExecPath, "ls", "pg-protocol@1.15.0", "pgpass@1.0.5", "--all"),
        npmArgs(npmExecPath, "run", "browser:install"),
        ["compose", "-p", composeProject, "config"],
        ["compose", "-p", composeProject, "up", "-d", "--wait"],
        ["compose", "-p", composeProject, "ps"],
        npmArgs(npmExecPath, "run", "typecheck"),
        npmArgs(npmExecPath, "run", "migrate:build"),
        ...["status", "up", "status", "up", "down", "up"].map((operation) =>
          npmArgs(
            npmExecPath,
            "run",
            `migration:${operation}`,
            "--workspace",
            "@rick-and-morty/api",
            "--",
            "--artifact",
            buildRoot,
          ),
        ),
        npmArgs(npmExecPath, "run", "migrate:status"),
        npmArgs(npmExecPath, "run", "migrate:up"),
        npmArgs(npmExecPath, "run", "migrate:down"),
        npmArgs(npmExecPath, "run", "migrate:up"),
        npmArgs(npmExecPath, "run", "migrate:down", "--", "--step", "1"),
        npmArgs(npmExecPath, "run", "migrate:validate-emitted"),
        npmArgs(npmExecPath, "run", "test:unit"),
        npmArgs(npmExecPath, "run", "test:integration"),
        npmArgs(npmExecPath, "run", "test:application"),
        npmArgs(npmExecPath, "run", "test:smoke"),
        npmArgs(npmExecPath, "run", "build"),
        npmArgs(npmExecPath, "run", "validate:tailwind"),
        npmArgs(npmExecPath, "run", "test:smoke:lifecycle"),
        ["-B", ".agents/skills/verify-repository/scripts/validate_docs.py", "--repo", "."],
        ["-B", ".agents/skills/govern-adrs/scripts/validate_adrs.py", "--repo", "."],
        ["diff", "--check"],
        ["rev-parse", "HEAD"],
        ["status", "--short"],
        ["compose", "-p", composeProject, "down", "--volumes"],
      ];

      await recordObservation("default-identity-and-ownership", () => {
        expect(defaultMocks.randomBytes).toHaveBeenCalledTimes(1);
        expect(defaultMocks.randomBytes).toHaveBeenCalledWith(8);
        expect(defaultMocks.createServer).toHaveBeenCalledTimes(2);
        expect(postgresPort).not.toBe(redisPort);
        expect(defaultMocks.closeCalls).toBe(2);
        expect(defaultMocks.namespaceCalls).toEqual([
          {
            database: "rick_and_morty",
            user: "rick_and_morty",
            password: "local-development-only",
            port: postgresPort,
          },
        ]);
      });
      await recordObservation("closed-command-projection", () => {
        expect(defaultMocks.childInvocations.map(({ args }) => args)).toEqual(
          expectedArgs,
        );
        expect(defaultMocks.childInvocations.map(({ file }) => file)).toEqual([
          ...Array(4).fill(process.execPath),
          ...Array(3).fill("docker"),
          ...Array(21).fill(process.execPath),
          "python",
          "python",
          "git",
          "git",
          "git",
          "docker",
        ]);
        const composeIndices = new Set([4, 5, 6, 33]);
        const namespaceIndices = new Set([
          9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        ]);
        const controlOnlyIndices = new Set([20, 21, 22, 23, 24]);
        for (const [index, { options }] of defaultMocks.childInvocations.entries()) {
          expect(options).toMatchObject({
            cwd: repositoryRoot,
            encoding: "utf8",
            windowsHide: true,
          });
          const childEnvironment = options.env ?? {};
          expect(
            Object.keys(childEnvironment).filter((name) => /^PG/iu.test(name)),
          ).toEqual([]);
          expect(childEnvironment.POSTGRES_TASK004_STALE).toBeUndefined();
          const commandEnvironment = Object.fromEntries(
            Object.entries(childEnvironment).filter(
              ([name]) => name.startsWith("POSTGRES_") || name === "REDIS_PORT",
            ),
          );
          if (composeIndices.has(index)) {
            expect(commandEnvironment).toEqual({
              POSTGRES_DB: "rick_and_morty",
              POSTGRES_USER: "rick_and_morty",
              POSTGRES_PASSWORD: "local-development-only",
              POSTGRES_PORT: String(postgresPort),
              REDIS_PORT: String(redisPort),
            });
          } else if (namespaceIndices.has(index)) {
            expect(commandEnvironment).toEqual({
              POSTGRES_DB: namespace.database,
              POSTGRES_SCHEMA: namespace.schema,
              POSTGRES_USER: "rick_and_morty",
              POSTGRES_PASSWORD: "local-development-only",
              POSTGRES_PORT: String(postgresPort),
            });
          } else if (controlOnlyIndices.has(index)) {
            expect(commandEnvironment).toEqual({
              POSTGRES_DB: "rick_and_morty",
              POSTGRES_USER: "rick_and_morty",
              POSTGRES_PASSWORD: "local-development-only",
              POSTGRES_PORT: String(postgresPort),
            });
          } else {
            expect(commandEnvironment).toEqual({});
          }
        }
      });
      await recordObservation("canonical-success-output", () => {
        const report = {
          operation: "verify-task-004",
          result: 0,
          runId,
          composeProject,
          postgresPort,
          redisPort,
          database: namespace.database,
          schema: namespace.schema,
          buildId,
          buildRoot,
          manifestSha256,
          head,
          treeStatus: "",
          checks,
        };
        expect(stdout.join("")).toBe(`${JSON.stringify(report)}\n`);
        expect(stderr.join("")).toBe("");
        expect(process.exitCode ?? 0).toBe(0);
      });
    } finally {
      process.argv = originalArgv;
      process.stdout.write = originalStdoutWrite;
      process.stderr.write = originalStderrWrite;
      process.exitCode = originalExitCode;
      for (const name of Object.keys(process.env)) {
        delete process.env[name];
      }
      Object.assign(process.env, originalEnvironment);
      vi.resetModules();
    }

    if (observationFailures.length > 0) {
      throw new Error(
        "TASK_004_VERIFICATION_DEFAULT_ENTRY_MISSING_AFTER_CONTROLLER_ACCEPTANCE",
        { cause: new AggregateError(observationFailures) },
      );
    }
  });
});
