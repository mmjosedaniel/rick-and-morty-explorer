import { describe, expect, it } from "vitest";

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

interface VerificationReport {
  readonly operation: "verify-task-004";
  readonly result: 0;
  readonly runId: string;
  readonly composeProject: string;
  readonly postgresPort: number;
  readonly redisPort: number;
  readonly database: string;
  readonly schema: string;
  readonly buildId: string;
  readonly buildRoot: string;
  readonly manifestSha256: string;
  readonly head: string;
  readonly treeStatus: string;
  readonly checks: readonly string[];
}

interface VerificationControllerModule {
  readonly runTask004Verification: (
    dependencies: VerificationDependencies,
  ) => Promise<VerificationReport>;
}

const dependentSteps = [
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
  "test-root",
  "build",
  "validate-tailwind",
  "test-smoke-lifecycle",
  "validate-docs",
  "validate-adrs",
] as const;

const diagnosticSteps = ["git-diff-check", "git-head", "git-status"] as const;
const expectedSteps = [
  ...dependentSteps,
  ...diagnosticSteps,
  "compose-down",
] as const;

const expectedEvents = [
  "install",
  "dependencies-direct",
  "dependencies-transitive",
  "browser-install",
  "compose-config",
  "compose-up",
  "compose-ps",
  "typecheck",
  "migration-build",
  "namespace-open",
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
  "namespace-close",
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
  "git-diff-check",
  "git-head",
  "git-status",
  "compose-down",
] as const;

function isExactMissingController(error: unknown, url: string): boolean {
  const importerPath = decodeURIComponent(new URL(import.meta.url).pathname).replace(
    /^\/(?=[A-Za-z]:)/u,
    "",
  );
  return (
    (typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ERR_MODULE_NOT_FOUND" &&
      "url" in error &&
      error.url === url) ||
    (error instanceof Error &&
      error.message ===
        `Cannot find module '${url}' imported from ${importerPath}`)
  );
}

describe("TASK-004 verification controller", () => {
  it("orchestrates one owned TASK-004 verification run", async () => {
    const runId = "0123456789abcdef";
    const postgresPort = 55490;
    const redisPort = 56390;
    const composeProject = `rick-and-morty-task004-verify-${runId}`;
    const control: PostgresControl = {
      database: "rick_and_morty",
      user: "rick_and_morty",
      password: "local-development-only",
      port: postgresPort,
    };
    const namespace: AllocatedNamespace = {
      database: `task_004_${runId}`,
      schema: `task_004_${runId}`,
    };
    const buildId = "a".repeat(64);
    const buildRoot = `C:\\repo\\apps\\api\\dist\\infrastructure\\database\\migrations\\builds\\${buildId}`;
    const manifestSha256 = "b".repeat(64);
    const head = "ee2785ff4fb3c6c5600b5de2499afee29a65194b";
    const reservedPorts = [postgresPort, redisPort];
    const observedCommands: VerificationCommand[] = [];
    const observedEvents: string[] = [];
    const namespaceControls: PostgresControl[] = [];
    let reservePortCalls = 0;
    let namespaceBodyCalls = 0;

    const dependencies: VerificationDependencies = {
      createRunId: () => runId,
      reservePort: async () => {
        const port = reservedPorts[reservePortCalls];
        reservePortCalls += 1;
        if (port === undefined) {
          throw new Error("TASK_004_VERIFICATION_UNEXPECTED_PORT_REQUEST");
        }
        return port;
      },
      runCommand: async (command) => {
        observedEvents.push(command.stepId);
        observedCommands.push(command);
        if (command.stepId === "migration-build") {
          return {
            code: 0,
            stdout: `${JSON.stringify({ buildId, buildRoot, manifestSha256 })}\n`,
            stderr: "",
          };
        }
        if (command.stepId === "git-head") {
          return { code: 0, stdout: `${head}\n`, stderr: "" };
        }
        return { code: 0, stdout: "", stderr: "" };
      },
      withPostgresNamespace: async ({ control: receivedControl, body }) => {
        namespaceControls.push(receivedControl);
        namespaceBodyCalls += 1;
        observedEvents.push("namespace-open");
        try {
          return await body(namespace);
        } finally {
          observedEvents.push("namespace-close");
        }
      },
    };

    const controllerUrl = new URL(
      "../../../../../scripts/verify-task-004.js",
      import.meta.url,
    ).href;
    let controller: VerificationControllerModule;
    try {
      controller = (await import(controllerUrl)) as VerificationControllerModule;
    } catch (error) {
      if (isExactMissingController(error, controllerUrl)) {
        throw new Error("TASK_004_VERIFICATION_CONTROLLER_MISSING", {
          cause: error,
        });
      }
      throw error;
    }

    expect(Object.keys(controller)).toEqual(["runTask004Verification"]);
    expect(controller.runTask004Verification).toBeTypeOf("function");
    expect(Object.getPrototypeOf(controller.runTask004Verification)).toBe(
      Object.getPrototypeOf(async (): Promise<void> => undefined),
    );

    const report = await controller.runTask004Verification(dependencies);

    try {
      expect(observedEvents).toEqual(expectedEvents);
    } catch (error) {
      if (error instanceof Error && error.name === "AssertionError") {
        throw new Error("TASK_004_VERIFICATION_NAMESPACE_ORDER_INVALID", {
          cause: error,
        });
      }
      throw error;
    }

    expect(reservePortCalls).toBe(2);
    expect(new Set(reservedPorts).size).toBe(2);
    expect(namespaceControls).toEqual([control]);
    expect(namespaceBodyCalls).toBe(1);
    expect(observedCommands.map(({ stepId }) => stepId)).toEqual(expectedSteps);

    const dockerSteps = new Set([
      "compose-config",
      "compose-up",
      "compose-ps",
      "compose-down",
    ]);
    const scopedSteps = new Set([
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
    ]);
    const controlOnlySteps = new Set([
      "migrate-validate-emitted",
      "test-unit",
      "test-integration",
      "test-application",
      "test-smoke",
      "test-root",
    ]);
    const apiSteps: ReadonlySet<string> = new Set(dependentSteps.filter((step) => step.startsWith("api-")));

    for (const command of observedCommands) {
      if (dockerSteps.has(command.stepId)) {
        expect(command).toMatchObject({
          composeProject,
          postgresPort,
          redisPort,
        });
      }
      if (scopedSteps.has(command.stepId)) {
        expect(command).toMatchObject({ control, namespace });
      }
      if (controlOnlySteps.has(command.stepId)) {
        expect(command.control).toEqual(control);
        expect(Object.hasOwn(command, "namespace")).toBe(false);
      }
      if (apiSteps.has(command.stepId)) {
        expect(command.buildRoot).toBe(buildRoot);
      }
      expect(JSON.stringify(command)).not.toContain("infra:");
      expect(JSON.stringify(command)).not.toContain("rick-and-morty-dev");
    }

    expect(Object.keys(report)).toEqual([
      "operation",
      "result",
      "runId",
      "composeProject",
      "postgresPort",
      "redisPort",
      "database",
      "schema",
      "buildId",
      "buildRoot",
      "manifestSha256",
      "head",
      "treeStatus",
      "checks",
    ]);
    expect(report).toEqual({
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
      checks: expectedSteps,
    });
  });

  it("preserves primary and cleanup verification failures", async () => {
    const runId = "0123456789abcdef";
    const postgresPort = 55490;
    const redisPort = 56390;
    const control: PostgresControl = {
      database: "rick_and_morty",
      user: "rick_and_morty",
      password: "local-development-only",
      port: postgresPort,
    };
    const namespace: AllocatedNamespace = {
      database: `task_004_${runId}`,
      schema: `task_004_${runId}`,
    };
    const buildId = "a".repeat(64);
    const buildRoot = `C:\\repo\\apps\\api\\dist\\infrastructure\\database\\migrations\\builds\\${buildId}`;
    const manifestSha256 = "b".repeat(64);
    const head = "ee2785ff4fb3c6c5600b5de2499afee29a65194b";
    const controllerUrl = new URL(
      "../../../../../scripts/verify-task-004.js",
      import.meta.url,
    ).href;
    const controller = (await import(
      controllerUrl
    )) as VerificationControllerModule;
    const stoppedPrimaryEvents = [
      ...dependentSteps.slice(0, dependentSteps.indexOf("typecheck") + 1),
      ...diagnosticSteps,
      "compose-down",
    ];
    const cases = [
      {
        name: "primary",
        primaryCode: 7,
        cleanupCode: 0,
        namespaceCalls: 0,
        expectedEvents: stoppedPrimaryEvents,
        expectedResult: 7,
        expectedPrimary: { stepId: "typecheck", code: 7 },
        expectedCleanup: null,
      },
      {
        name: "primary-and-cleanup",
        primaryCode: 7,
        cleanupCode: 9,
        namespaceCalls: 0,
        expectedEvents: stoppedPrimaryEvents,
        expectedResult: 7,
        expectedPrimary: { stepId: "typecheck", code: 7 },
        expectedCleanup: { stepId: "compose-down", code: 9 },
      },
      {
        name: "cleanup-only",
        primaryCode: 0,
        cleanupCode: 9,
        namespaceCalls: 1,
        expectedEvents,
        expectedResult: 9,
        expectedPrimary: null,
        expectedCleanup: { stepId: "compose-down", code: 9 },
      },
    ] as const;
    const failedCases: string[] = [];
    const caseEvidence: Error[] = [];

    for (const failureCase of cases) {
      const observedEvents: string[] = [];
      let reservePortCalls = 0;
      let namespaceCalls = 0;
      const reservedPorts = [postgresPort, redisPort];
      const dependencies: VerificationDependencies = {
        createRunId: () => runId,
        reservePort: async () => {
          const port = reservedPorts[reservePortCalls];
          reservePortCalls += 1;
          if (port === undefined) {
            throw new Error("TASK_004_VERIFICATION_UNEXPECTED_PORT_REQUEST");
          }
          return port;
        },
        runCommand: async (command) => {
          observedEvents.push(command.stepId);
          const code =
            command.stepId === "typecheck"
              ? failureCase.primaryCode
              : command.stepId === "compose-down"
                ? failureCase.cleanupCode
                : 0;
          if (command.stepId === "migration-build") {
            return {
              code,
              stdout: `${JSON.stringify({ buildId, buildRoot, manifestSha256 })}\n`,
              stderr: "",
            };
          }
          if (command.stepId === "git-head") {
            return { code, stdout: `${head}\n`, stderr: "" };
          }
          return { code, stdout: "", stderr: "" };
        },
        withPostgresNamespace: async ({ control: receivedControl, body }) => {
          expect(receivedControl).toEqual(control);
          namespaceCalls += 1;
          observedEvents.push("namespace-open");
          try {
            return await body(namespace);
          } finally {
            observedEvents.push("namespace-close");
          }
        },
      };

      try {
        const report = await controller.runTask004Verification(dependencies);
        expect(reservePortCalls).toBe(2);
        expect(namespaceCalls).toBe(failureCase.namespaceCalls);
        expect(observedEvents).toEqual(failureCase.expectedEvents);
        expect(Object.keys(report)).toEqual([
          "operation",
          "result",
          "runId",
          "primary",
          "cleanup",
          "head",
          "treeStatus",
        ]);
        expect(report).toEqual({
          operation: "verify-task-004",
          result: failureCase.expectedResult,
          runId,
          primary: failureCase.expectedPrimary,
          cleanup: failureCase.expectedCleanup,
          head,
          treeStatus: "",
        });
      } catch (error) {
        failedCases.push(failureCase.name);
        caseEvidence.push(
          new Error(`TASK_004_VERIFICATION_FAILURE_CASE_${failureCase.name}`, {
            cause: error,
          }),
        );
      }
    }

    if (failedCases.length > 0) {
      throw new Error(
        `TASK_004_VERIFICATION_FAILURE_PRECEDENCE_MISSING cases=${failedCases.join(",")}`,
        { cause: new AggregateError(caseEvidence) },
      );
    }
  });
});
