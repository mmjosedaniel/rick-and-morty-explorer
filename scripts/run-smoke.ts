import { spawn, type ChildProcess } from "node:child_process";
import { randomBytes } from "node:crypto";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const host = "127.0.0.1";
const webUrl = `http://${host}:4173`;
const apiHealthUrl = `http://${host}:4174/healthz`;
const graphqlEndpoint = `http://${host}:4174/graphql`;
const readinessTimeoutMs = 10_000;
const shutdownTimeoutMs = 10_000;
const pollIntervalMs = 100;
const fixturePath = resolve("tests/smoke/fixtures/task-010-runtime.ts");
const neverReadyApiPath = resolve("tests/smoke/fixtures/never-ready-api.ts");
const playwrightCli = createRequire(import.meta.url).resolve("@playwright/test/cli");

type CommandResult = {
  readonly code: number | null;
  readonly signal: NodeJS.Signals | null;
};

type CommandOutcome =
  | { readonly kind: "completed"; readonly result: CommandResult }
  | { readonly kind: "spawn-error"; readonly error: unknown };

type StartedCommand = {
  readonly child: ChildProcess;
  readonly result: Promise<CommandResult>;
  readonly outcome: Promise<CommandOutcome>;
};

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

function waitForChild(child: ChildProcess): Promise<CommandResult> {
  return new Promise((resolveResult, rejectResult) => {
    child.once("error", rejectResult);
    child.once("close", (code, signal) => resolveResult({ code, signal }));
  });
}

function startNode(
  args: readonly string[],
  environment: NodeJS.ProcessEnv,
): StartedCommand {
  const child = spawn(process.execPath, args, {
    cwd: process.cwd(),
    env: environment,
    stdio: "inherit",
  });
  const result = waitForChild(child);
  const outcome = result.then<CommandOutcome, CommandOutcome>(
    (commandResult) => ({ kind: "completed", result: commandResult }),
    (error: unknown) => ({ kind: "spawn-error", error }),
  );
  return { child, result, outcome };
}

async function runNode(
  args: readonly string[],
  environment: NodeJS.ProcessEnv,
  diagnostic: string,
): Promise<CommandResult> {
  const command = startNode(args, environment);
  const result = await command.result;
  if (result.code !== 0) {
    throw new Error(
      `${diagnostic} (code=${String(result.code)}, signal=${String(result.signal)})`,
    );
  }
  return result;
}

async function buildWorkspace(
  workspace: "@rick-and-morty/web" | "@rick-and-morty/api",
  environment: NodeJS.ProcessEnv,
): Promise<void> {
  const npmCli = environment["npm_execpath"];
  if (npmCli === undefined) {
    throw new Error("TASK_010_NPM_EXEC_PATH_MISSING");
  }
  await runNode(
    [npmCli, "run", "build", "--workspace", workspace],
    environment,
    `TASK_010_SMOKE_BUILD_FAILED workspace=${workspace}`,
  );
}

async function runFixture(
  mode: "setup" | "cleanup",
  environment: NodeJS.ProcessEnv,
): Promise<void> {
  await runNode(
    ["--import", "tsx", fixturePath, mode],
    environment,
    `TASK_010_SMOKE_${mode.toUpperCase()}_FAILED`,
  );
}

async function isReady(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(500) });
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForReadiness(
  name: "web" | "API",
  url: string,
  childOutcome: Promise<CommandOutcome>,
): Promise<void> {
  const deadline = Date.now() + readinessTimeoutMs;
  let completion: CommandOutcome | undefined;
  void childOutcome.then((outcome) => {
    completion = outcome;
  });

  const throwIfExited = (): void => {
    if (completion?.kind === "spawn-error") {
      throw new Error(`${name} server failed before readiness.`, {
        cause: completion.error,
      });
    }
    if (completion?.kind === "completed") {
      throw new Error(
        `${name} server exited before readiness (code=${String(completion.result.code)}, signal=${String(completion.result.signal)}).`,
      );
    }
  };

  while (Date.now() < deadline) {
    const ready = await isReady(url);
    throwIfExited();

    if (ready) {
      const stabilityExit = await Promise.race([
        childOutcome,
        delay(pollIntervalMs).then(() => undefined),
      ]);
      if (stabilityExit !== undefined) {
        completion = stabilityExit;
      }
      throwIfExited();
      return;
    }

    await delay(pollIntervalMs);
  }

  throw new Error(`Timed out waiting for ${name} readiness at ${url}.`);
}

async function stopOwnedChild(
  name: string,
  child: ChildProcess,
  outcome: Promise<CommandOutcome>,
  shutdownContext: "planned shutdown" | "failure cleanup",
): Promise<void> {
  if (
    child.pid === undefined ||
    child.exitCode !== null ||
    child.signalCode !== null
  ) {
    await outcome;
    return;
  }

  child.kill("SIGTERM");
  let timeout: NodeJS.Timeout | undefined;
  try {
    await Promise.race([
      outcome,
      new Promise<never>((_resolve, reject) => {
        timeout = setTimeout(
          () =>
            reject(
              new Error(
                `Timed out terminating owned ${name} PID ${child.pid ?? "unknown"} during ${shutdownContext}.`,
              ),
            ),
          shutdownTimeoutMs,
        );
      }),
    ]);
  } finally {
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
  }
}

function createEnvironment(): NodeJS.ProcessEnv {
  const environment = { ...process.env };
  environment["TASK010_SMOKE_RUN_ID"] ??= randomBytes(8).toString("hex");
  environment["POSTGRES_PORT"] ??= "55432";
  environment["REDIS_PORT"] ??= "6379";
  environment["API_HOST"] = host;
  environment["API_PORT"] = "4174";
  environment["POSTGRES_DB"] ??= "rick_and_morty";
  environment["POSTGRES_USER"] ??= "rick_and_morty";
  environment["POSTGRES_PASSWORD"] ??= "local-development-only";
  environment["POSTGRES_SCHEMA"] = `t010_smoke_${environment["TASK010_SMOKE_RUN_ID"]}`;
  environment["REDIS_NAMESPACE"] =
    `character-app:test:t010-smoke-${environment["TASK010_SMOKE_RUN_ID"]}`;
  environment["REDIS_SEARCH_TTL_SECONDS"] = "300";
  environment["REDIS_OPERATION_TIMEOUT_MS"] = "250";
  return environment;
}

async function runSmoke(): Promise<number> {
  const environment = createEnvironment();
  const webBuildEnvironment = {
    ...environment,
    VITE_GRAPHQL_ENDPOINT: graphqlEndpoint,
  };
  const servers: Array<{
    readonly name: string;
    readonly child: ChildProcess;
    readonly result: Promise<CommandResult>;
    readonly outcome: Promise<CommandOutcome>;
  }> = [];
  let primaryFailure: unknown;
  let playwrightResult: CommandResult | undefined;
  let playwrightWasPrimary = false;
  let playwright: StartedCommand | undefined;
  const runtimeState = { plannedShutdown: false };

  try {
    await buildWorkspace("@rick-and-morty/web", webBuildEnvironment);
    await buildWorkspace("@rick-and-morty/api", environment);
    await runFixture("setup", environment);

    const web = startNode([resolve("apps/web/dist-server/server.js")], environment);
    servers.push({ name: "web", ...web });

    const api =
      environment["TASK003_SMOKE_API_MODE"] === "never-ready"
        ? startNode(["--import", "tsx", neverReadyApiPath], environment)
        : startNode([resolve("apps/api/dist/server.js")], environment);
    servers.push({ name: "API", ...api });

    await Promise.all([
      waitForReadiness("web", webUrl, web.outcome),
      waitForReadiness("API", apiHealthUrl, api.outcome),
    ]);

    playwright = startNode(
      [playwrightCli, "test", "--config", "playwright.config.ts"],
      environment,
    );
    const firstRuntimeCompletion = await Promise.race([
      playwright.outcome.then((outcome) => ({
        kind: "playwright" as const,
        outcome,
      })),
      ...servers.map((server) =>
        server.outcome.then((outcome) => ({
          kind: "application" as const,
          server,
          outcome,
        })),
      ),
    ]);

    if (firstRuntimeCompletion.kind === "application") {
      const { outcome, server } = firstRuntimeCompletion;
      primaryFailure =
        outcome.kind === "spawn-error"
          ? new Error(`${server.name} server failed unexpectedly after readiness.`, {
              cause: outcome.error,
            })
          : new Error(
              `${server.name} server exited unexpectedly after readiness (code=${String(outcome.result.code)}, signal=${String(outcome.result.signal)}).`,
            );
    } else {
      playwrightWasPrimary = true;
      if (firstRuntimeCompletion.outcome.kind === "spawn-error") {
        primaryFailure = new Error("TASK_010_PLAYWRIGHT_FAILED_TO_START", {
          cause: firstRuntimeCompletion.outcome.error,
        });
      } else {
        playwrightResult = firstRuntimeCompletion.outcome.result;
        if (playwrightResult.code !== 0) {
          primaryFailure = new Error(
            `TASK_010_PLAYWRIGHT_FAILED (code=${String(playwrightResult.code)}, signal=${String(playwrightResult.signal)})`,
          );
        } else {
          runtimeState.plannedShutdown = true;
        }
      }
    }
  } catch (error) {
    primaryFailure = error;
  }

  const cleanupFailures: unknown[] = [];
  const shutdownContext = runtimeState.plannedShutdown
    ? "planned shutdown"
    : "failure cleanup";
  if (playwright !== undefined) {
    try {
      await stopOwnedChild(
        "Playwright",
        playwright.child,
        playwright.outcome,
        shutdownContext,
      );
    } catch (error) {
      cleanupFailures.push(error);
    }
  }
  for (const server of servers.reverse()) {
    try {
      await stopOwnedChild(
        server.name,
        server.child,
        server.outcome,
        shutdownContext,
      );
    } catch (error) {
      cleanupFailures.push(error);
    }
  }
  try {
    await runFixture("cleanup", environment);
  } catch (error) {
    cleanupFailures.push(error);
  }

  if (primaryFailure !== undefined) {
    console.error(primaryFailure);
    if (cleanupFailures.length > 0) {
      console.error(new AggregateError(cleanupFailures, "TASK_010_SMOKE_CLEANUP_FAILED"));
    }
    return playwrightWasPrimary ? (playwrightResult?.code ?? 1) : 1;
  }
  if (cleanupFailures.length > 0) {
    console.error(new AggregateError(cleanupFailures, "TASK_010_SMOKE_CLEANUP_FAILED"));
    return 1;
  }
  return 0;
}

process.exitCode = await runSmoke();
