import { spawn, type ChildProcess } from "node:child_process";
import { createServer, type Server } from "node:net";

const host = "127.0.0.1";
const ports = [4173, 4174] as const;
const smokeTimeoutMs = 45_000;
const readinessTimeoutMs = 20_000;
const cleanupTimeoutMs = 10_000;
const pollIntervalMs = 100;
const wrongHeading = "Intentionally Wrong TASK-003 Heading";

type SmokeResult = {
  code: number | null;
  signal: NodeJS.Signals | null;
  output: string;
};

type SmokeRun = {
  child: ChildProcess;
  output: () => string;
  result: Promise<SmokeResult>;
};

type CleanupResult = {
  terminationError?: string;
  closeError?: string;
};

type LifecycleCase = {
  name: string;
  run: () => Promise<void>;
};

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

function startSmoke(overrides: Readonly<Record<string, string>> = {}): SmokeRun {
  const npmCli = process.env["npm_execpath"];

  if (npmCli === undefined) {
    throw new Error("Expected npm_execpath while running the smoke lifecycle command.");
  }

  const environment = { ...process.env };

  delete environment["TASK003_SMOKE_EXPECTED_HEADING"];
  delete environment["TASK003_SMOKE_API_MODE"];
  Object.assign(environment, overrides);

  const child = spawn(process.execPath, [npmCli, "run", "test:smoke"], {
    cwd: process.cwd(),
    detached: process.platform !== "win32",
    env: environment,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let capturedOutput = "";

  for (const stream of [child.stdout, child.stderr]) {
    stream?.on("data", (chunk: Buffer) => {
      capturedOutput += chunk.toString();
    });
    stream?.on("error", (error: NodeJS.ErrnoException) => {
      capturedOutput += `\nSmoke output stream closed with ${error.code ?? error.message}.\n`;
    });
  }

  const result = new Promise<SmokeResult>((resolveResult, rejectResult) => {
    child.once("error", rejectResult);
    child.once("close", (code, signal) => {
      resolveResult({ code, signal, output: capturedOutput });
    });
  });

  return { child, output: () => capturedOutput, result };
}

async function withTimeout<T>(
  operation: Promise<T>,
  timeoutMs: number,
  message: string,
): Promise<T> {
  let timeout: NodeJS.Timeout | undefined;

  try {
    return await Promise.race([
      operation,
      new Promise<T>((_resolve, reject) => {
        timeout = setTimeout(() => reject(new Error(message)), timeoutMs);
      }),
    ]);
  } finally {
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
  }
}

function signalOwnedProcessGroup(processGroupId: number, signal: NodeJS.Signals): boolean {
  try {
    process.kill(-processGroupId, signal);
    return true;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ESRCH"
    ) {
      return false;
    }

    throw error;
  }
}

async function terminateOwnedTree(child: ChildProcess): Promise<void> {
  if (child.pid === undefined) {
    return;
  }

  if (process.platform === "win32") {
    if (child.exitCode !== null || child.signalCode !== null) {
      return;
    }

    const killer = spawn(
      "taskkill",
      ["/PID", String(child.pid), "/T", "/F"],
      { stdio: ["ignore", "pipe", "pipe"] },
    );
    let output = "";

    for (const stream of [killer.stdout, killer.stderr]) {
      stream?.on("data", (chunk: Buffer) => {
        output += chunk.toString();
      });
      stream?.on("error", (error: NodeJS.ErrnoException) => {
        output += `\ntaskkill output stream closed with ${error.code ?? error.message}.\n`;
      });
    }

    const code = await withTimeout(
      new Promise<number | null>((resolveCode, rejectCode) => {
        killer.once("error", rejectCode);
        killer.once("close", resolveCode);
      }),
      cleanupTimeoutMs,
      `Timed out terminating owned smoke PID ${child.pid}.`,
    );

    if (code !== 0) {
      throw new Error(`Failed to terminate owned smoke PID ${child.pid}: ${output.trim()}`);
    }

    return;
  }

  signalOwnedProcessGroup(child.pid, "SIGINT");
}

async function cleanupSmokeRun(run: SmokeRun): Promise<CleanupResult> {
  const cleanup: CleanupResult = {};

  try {
    await terminateOwnedTree(run.child);
  } catch (error) {
    cleanup.terminationError = error instanceof Error ? error.message : String(error);
  }

  try {
    await withTimeout(
      run.result,
      cleanupTimeoutMs,
      `Timed out waiting for owned smoke PID ${run.child.pid ?? "unknown"} to close.`,
    );
  } catch (error) {
    cleanup.closeError = error instanceof Error ? error.message : String(error);
  }

  return cleanup;
}

function formatCleanup(cleanup: CleanupResult): string | undefined {
  const failures = [
    cleanup.terminationError === undefined
      ? undefined
      : `termination=${cleanup.terminationError}`,
    cleanup.closeError === undefined ? undefined : `close=${cleanup.closeError}`,
  ].filter((failure): failure is string => failure !== undefined);

  return failures.length === 0 ? undefined : failures.join("; ");
}

async function waitForResult(run: SmokeRun, timeoutMs = smokeTimeoutMs): Promise<SmokeResult> {
  try {
    return await withTimeout(
      run.result,
      timeoutMs,
      `Smoke child PID ${run.child.pid ?? "unknown"} exceeded ${timeoutMs}ms.\nCaptured smoke output:\n${run.output()}`,
    );
  } catch (error) {
    const primaryMessage = error instanceof Error ? error.message : String(error);
    const cleanupMessage = formatCleanup(await cleanupSmokeRun(run));

    throw new Error(
      cleanupMessage === undefined
        ? primaryMessage
        : `${primaryMessage}\nCleanup failure: ${cleanupMessage}`,
    );
  }
}

async function useSmokeRun<T>(
  overrides: Readonly<Record<string, string>>,
  operation: (run: SmokeRun) => Promise<T>,
): Promise<T> {
  const run = startSmoke(overrides);
  let primaryFailure: unknown;

  try {
    return await operation(run);
  } catch (error) {
    primaryFailure = error;
    throw error;
  } finally {
    const cleanupMessage = formatCleanup(await cleanupSmokeRun(run));

    if (cleanupMessage !== undefined) {
      const primaryMessage =
        primaryFailure instanceof Error
          ? primaryFailure.message
          : String(primaryFailure ?? "none");
      throw new Error(`Primary failure: ${primaryMessage}\nCleanup failure: ${cleanupMessage}`);
    }
  }
}

async function canBind(port: number): Promise<boolean> {
  return await new Promise((resolveBind) => {
    const server = createServer();

    server.once("error", () => resolveBind(false));
    server.listen(port, host, () => server.close(() => resolveBind(true)));
  });
}

async function requireReusablePorts(): Promise<void> {
  const deadline = Date.now() + cleanupTimeoutMs;

  while (Date.now() < deadline) {
    const availability = await Promise.all(ports.map(canBind));

    if (availability.every(Boolean)) {
      return;
    }

    await delay(pollIntervalMs);
  }

  throw new Error("Ports 4173 and 4174 were not reusable after bounded cleanup.");
}

async function isReady(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(500) });
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForCondition(
  description: string,
  condition: () => Promise<boolean>,
): Promise<void> {
  const deadline = Date.now() + readinessTimeoutMs;

  while (Date.now() < deadline) {
    if (await condition()) {
      return;
    }

    await delay(pollIntervalMs);
  }

  throw new Error(`Timed out waiting for ${description}.`);
}

function requireDiagnostic(output: string, patterns: readonly RegExp[], message: string): void {
  if (!patterns.some((pattern) => pattern.test(output))) {
    throw new Error(`${message}\nCaptured smoke output:\n${output}`);
  }
}

async function closeOwnedListener(server: Server): Promise<void> {
  await new Promise<void>((resolveClose, rejectClose) => {
    server.close((error) => (error === undefined ? resolveClose() : rejectClose(error)));
  });
}

const cases: LifecycleCase[] = [
  {
    name: "normal completion",
    run: async () => {
      const result = await useSmokeRun({}, waitForResult);

      if (result.code !== 0) {
        throw new Error(`Normal smoke exited ${result.code}.\n${result.output}`);
      }

      requireDiagnostic(result.output, [/1 passed/, /1\/1/], "Normal smoke did not report one passing Chromium test.");
    },
  },
  {
    name: "startup conflict",
    run: async () => {
      const listener = createServer((socket) => {
        socket.on("error", () => {});
        socket.destroy();
      });
      await new Promise<void>((resolveListen, rejectListen) => {
        listener.once("error", rejectListen);
        listener.listen(4173, host, resolveListen);
      });

      try {
        const result = await useSmokeRun({}, waitForResult);

        if (result.code === 0) {
          throw new Error("Startup-conflict smoke unexpectedly exited 0.");
        }

        requireDiagnostic(
          result.output,
          [/EADDRINUSE/i, /already used/i, /already in use/i],
          "Startup-conflict smoke lacked the expected occupied-port diagnostic.",
        );
      } finally {
        await closeOwnedListener(listener);
      }
    },
  },
  {
    name: "assertion failure",
    run: async () => {
      const result = await useSmokeRun(
        { TASK003_SMOKE_EXPECTED_HEADING: wrongHeading },
        waitForResult,
      );

      if (result.code === 0) {
        throw new Error("Assertion-failure smoke unexpectedly exited 0.");
      }

      requireDiagnostic(
        result.output,
        [new RegExp(wrongHeading), /toBeVisible/i, /element\(s\) not found/i],
        "Assertion-failure smoke lacked the expected heading visibility diagnostic.",
      );
    },
  },
  {
    name: "readiness timeout",
    run: async () => {
      const result = await useSmokeRun(
        { TASK003_SMOKE_API_MODE: "never-ready" },
        waitForResult,
      );

      if (result.code === 0) {
        throw new Error("Readiness-timeout smoke unexpectedly exited 0.");
      }

      requireDiagnostic(
        result.output,
        [/Timed out waiting/i, /webServer.*timeout/i, /Process from config\.webServer/i],
        "Readiness-timeout smoke lacked the Playwright web-server timeout diagnostic.",
      );
    },
  },
  {
    name: "forced cancellation",
    run: async () => {
      await useSmokeRun({}, async (run) => {
        await waitForCondition("both smoke URLs to become ready", async () =>
          (await isReady(`http://${host}:4173`)) &&
          (await isReady(`http://${host}:4174/healthz`)),
        );
        await terminateOwnedTree(run.child);
        const result = await waitForResult(run, cleanupTimeoutMs);

        if (result.code === 0 && result.signal === null) {
          throw new Error("Forced-cancellation smoke unexpectedly completed normally.");
        }
      });
    },
  },
  {
    name: "forced interruption",
    run: async () => {
      await useSmokeRun(
        { TASK003_SMOKE_API_MODE: "never-ready" },
        async (run) => {
          await waitForCondition("web readiness while the API remains unready", async () =>
            (await isReady(`http://${host}:4173`)) &&
            !(await isReady(`http://${host}:4174/healthz`)),
          );
          await terminateOwnedTree(run.child);
          const result = await waitForResult(run, cleanupTimeoutMs);

          if (result.code === 0 && result.signal === null) {
            throw new Error("Forced-interruption smoke unexpectedly completed normally.");
          }
        },
      );
    },
  },
];

await requireReusablePorts();

const failures: string[] = [];
let passed = 0;

for (const lifecycleCase of cases) {
  let primaryFailure: unknown;

  try {
    await lifecycleCase.run();
  } catch (error) {
    primaryFailure = error;
  }

  try {
    await requireReusablePorts();
  } catch (cleanupError) {
    const primaryMessage =
      primaryFailure instanceof Error ? primaryFailure.message : String(primaryFailure ?? "none");
    const cleanupMessage =
      cleanupError instanceof Error ? cleanupError.message : String(cleanupError);
    failures.push(`${lifecycleCase.name}: primary=${primaryMessage}; cleanup=${cleanupMessage}`);
    continue;
  }

  if (primaryFailure !== undefined) {
    failures.push(
      `${lifecycleCase.name}: ${primaryFailure instanceof Error ? primaryFailure.message : String(primaryFailure)}`,
    );
    continue;
  }

  passed += 1;
  console.log(`[PASS] ${lifecycleCase.name}`);
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`[FAIL] ${failure}`);
  }

  throw new Error(`Smoke lifecycle verification failed: ${passed}/6 cases passed.`);
}

console.log("Smoke lifecycle verification passed: 6/6 cases.");
