import { readFile } from "node:fs/promises";

import { beforeAll, describe, expect, it, vi } from "vitest";

interface OwnedImportRuntime {
  importBaseline(): Promise<void>;
  close(): Promise<void>;
}

interface CommandOptions {
  readonly argv: readonly string[];
  readonly initialize: () => Promise<OwnedImportRuntime>;
  readonly requestInvalidation: () => Promise<void>;
  readonly writeError: (diagnostic: string) => void;
  readonly writeWarning: (diagnostic: string) => void;
}

interface CharacterImportCliModule {
  runCharacterImportCommand(options: CommandOptions): Promise<number>;
  runCharacterImportProductionCommand(options: ProductionCommandOptions): Promise<number>;
}

interface ProductionCommandOptions
  extends Omit<CommandOptions, "requestInvalidation"> {
  readonly createInvalidationOwner: () => {
    readonly invalidate: () => Promise<void>;
    readonly close: () => Promise<void>;
  };
}

const commandInvalid = "CHARACTER_IMPORT_COMMAND_INVALID\n";
const initializationFailed = "CHARACTER_IMPORT_INITIALIZATION_FAILED\n";
const importFailed = "CHARACTER_IMPORT_FAILED\n";
const invalidationFailed = "CHARACTER_IMPORT_INVALIDATION_FAILED\n";
const closeFailed = "CHARACTER_IMPORT_CLOSE_FAILED\n";

let cli: CharacterImportCliModule;

function isMissingCli(error: unknown): boolean {
  return (
    error instanceof Error &&
    (("code" in error && error.code === "ERR_MODULE_NOT_FOUND") ||
      error.message.includes("character-import-cli"))
  );
}

async function loadCliWithoutStartingWork(): Promise<CharacterImportCliModule> {
  const cliSpecifier = "./character-import-cli.js";
  const originalExitCode = process.exitCode;
  const fetchSpy = vi
    .spyOn(globalThis, "fetch")
    .mockRejectedValue(new Error("LIVE_UPSTREAM_ACCESS_FORBIDDEN"));
  const stdout: string[] = [];
  const stderr: string[] = [];
  const stdoutSpy = vi
    .spyOn(process.stdout, "write")
    .mockImplementation((chunk: string | Uint8Array) => {
      stdout.push(typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf8"));
      return true;
    });
  const stderrSpy = vi
    .spyOn(process.stderr, "write")
    .mockImplementation((chunk: string | Uint8Array) => {
      stderr.push(typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf8"));
      return true;
    });

  try {
    const module = (await import(
      /* @vite-ignore */ cliSpecifier
    )) as Record<string, unknown>;
    expect(module.runCharacterImportCommand).toBeTypeOf("function");
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(stdout).toEqual([]);
    expect(stderr).toEqual([]);
    expect(process.exitCode).toBe(originalExitCode);
    return module as unknown as CharacterImportCliModule;
  } catch (error) {
    if (!isMissingCli(error)) {
      throw error;
    }
    throw new Error("TASK_005_CHARACTER_IMPORT_CLI_MISSING", { cause: error });
  } finally {
    fetchSpy.mockRestore();
    stdoutSpy.mockRestore();
    stderrSpy.mockRestore();
    process.exitCode = originalExitCode;
  }
}

function createHarness(options: {
  readonly initializeFailure?: Error;
  readonly importFailure?: Error;
  readonly invalidationFailure?: Error;
  readonly closeFailure?: Error;
} = {}) {
  const events: string[] = [];
  const errors: string[] = [];
  const warnings: string[] = [];
  const importBaseline = vi.fn(async () => {
    if (options.importFailure !== undefined) {
      throw options.importFailure;
    }
    events.push("commit-completed");
  });
  const close = vi.fn(async () => {
    events.push("resource-closed");
    if (options.closeFailure !== undefined) {
      throw options.closeFailure;
    }
  });
  const initialize = vi.fn(async () => {
    events.push("resource-initialized");
    if (options.initializeFailure !== undefined) {
      throw options.initializeFailure;
    }
    return { importBaseline, close };
  });
  const requestInvalidation = vi.fn(async () => {
    events.push("invalidation-requested");
    if (options.invalidationFailure !== undefined) {
      throw options.invalidationFailure;
    }
  });

  return {
    close,
    errors,
    events,
    importBaseline,
    initialize,
    requestInvalidation,
    warnings,
    commandOptions: (argv: readonly string[]): CommandOptions => ({
      argv,
      initialize,
      requestInvalidation,
      writeError: (diagnostic) => errors.push(diagnostic),
      writeWarning: (diagnostic) => warnings.push(diagnostic),
    }),
  };
}

beforeAll(async () => {
  cli = await loadCliWithoutStartingWork();
});

describe("TASK-005 Milestone 3 explicit character import command", () => {
  it("runs only with zero arguments and completes commit, invalidation, and closure in order", async () => {
    const invalid = createHarness();
    await expect(
      cli.runCharacterImportCommand(invalid.commandOptions(["unexpected"])),
    ).resolves.toBe(1);
    expect(invalid.initialize).not.toHaveBeenCalled();
    expect(invalid.importBaseline).not.toHaveBeenCalled();
    expect(invalid.requestInvalidation).not.toHaveBeenCalled();
    expect(invalid.close).not.toHaveBeenCalled();
    expect(invalid.errors).toEqual([commandInvalid]);
    expect(invalid.warnings).toEqual([]);

    const success = createHarness();
    await expect(
      cli.runCharacterImportCommand(success.commandOptions([])),
    ).resolves.toBe(0);
    expect(success.initialize).toHaveBeenCalledOnce();
    expect(success.importBaseline).toHaveBeenCalledOnce();
    expect(success.requestInvalidation).toHaveBeenCalledOnce();
    expect(success.close).toHaveBeenCalledOnce();
    expect(success.events).toEqual([
      "resource-initialized",
      "commit-completed",
      "invalidation-requested",
      "resource-closed",
    ]);
    expect(success.errors).toEqual([]);
    expect(success.warnings).toEqual([]);
  });

  it("reports initialization and import failures safely without invalidating", async () => {
    const secret =
      "password=do-not-log SELECT * FROM secrets upstream-payload stack-line";
    const initialization = createHarness({
      initializeFailure: new Error(secret),
    });
    await expect(
      cli.runCharacterImportCommand(initialization.commandOptions([])),
    ).resolves.toBe(1);
    expect(initialization.close).not.toHaveBeenCalled();
    expect(initialization.requestInvalidation).not.toHaveBeenCalled();
    expect(initialization.errors).toEqual([initializationFailed]);

    for (const failureName of ["fetch", "validation", "persistence"] as const) {
      const failedImport = createHarness({
        importFailure: new Error(`${failureName} ${secret}`),
      });
      await expect(
        cli.runCharacterImportCommand(failedImport.commandOptions([])),
      ).resolves.toBe(1);
      expect(failedImport.requestInvalidation).not.toHaveBeenCalled();
      expect(failedImport.close).toHaveBeenCalledOnce();
      expect(failedImport.errors).toEqual([importFailed]);
      expect(failedImport.warnings).toEqual([]);
      expect(failedImport.errors.join("")).not.toContain(secret);
    }
  });

  it("keeps a committed import successful when invalidation fails but makes close failure non-zero", async () => {
    const invalidation = createHarness({
      invalidationFailure: new Error("redis://credential@host raw stack"),
    });
    await expect(
      cli.runCharacterImportCommand(invalidation.commandOptions([])),
    ).resolves.toBe(0);
    expect(invalidation.events).toEqual([
      "resource-initialized",
      "commit-completed",
      "invalidation-requested",
      "resource-closed",
    ]);
    expect(invalidation.errors).toEqual([]);
    expect(invalidation.warnings).toEqual([invalidationFailed]);

    const close = createHarness({
      closeFailure: new Error("postgres://credential@host raw stack"),
    });
    await expect(
      cli.runCharacterImportCommand(close.commandOptions([])),
    ).resolves.toBe(1);
    expect(close.importBaseline).toHaveBeenCalledOnce();
    expect(close.requestInvalidation).toHaveBeenCalledOnce();
    expect(close.close).toHaveBeenCalledOnce();
    expect(close.errors).toEqual([closeFailed]);
    expect(close.warnings).toEqual([]);
  });

  it("targets the emitted zero-argument CLI from the API and root scripts", async () => {
    const apiManifest = JSON.parse(
      await readFile(new URL("../../../package.json", import.meta.url), "utf8"),
    ) as { readonly scripts?: Readonly<Record<string, string>> };
    const rootManifest = JSON.parse(
      await readFile(new URL("../../../../../package.json", import.meta.url), "utf8"),
    ) as { readonly scripts?: Readonly<Record<string, string>> };

    expect(apiManifest.scripts?.["import:characters"]).toBe(
      "node dist/infrastructure/characters/character-import-cli.js",
    );
    expect(rootManifest.scripts?.["import:characters"]).toBe(
      "npm run build --workspace @rick-and-morty/api && npm run import:characters --workspace @rick-and-morty/api",
    );
  });

  it("runs the production invalidation owner after import and closes both owners", async () => {
    const events: string[] = [];
    const initialize = vi.fn(async () => ({
      importBaseline: async () => {
        events.push("commit-completed");
      },
      close: async () => {
        events.push("import-owner-closed");
      },
    }));
    const invalidate = vi.fn(async () => {
      events.push("invalidation-requested");
    });
    const closeInvalidation = vi.fn(async () => {
      events.push("invalidation-owner-closed");
    });
    const createInvalidationOwner = vi.fn(() => ({
      invalidate,
      close: closeInvalidation,
    }));
    const errors: string[] = [];
    const warnings: string[] = [];

    await expect(
      cli.runCharacterImportProductionCommand({
        argv: [],
        initialize,
        createInvalidationOwner,
        writeError: (diagnostic) => errors.push(diagnostic),
        writeWarning: (diagnostic) => warnings.push(diagnostic),
      }),
    ).resolves.toBe(0);

    expect(createInvalidationOwner).toHaveBeenCalledOnce();
    expect(invalidate).toHaveBeenCalledOnce();
    expect(closeInvalidation).toHaveBeenCalledOnce();
    expect(events).toEqual([
      "commit-completed",
      "invalidation-requested",
      "import-owner-closed",
      "invalidation-owner-closed",
    ]);
    expect(errors).toEqual([]);
    expect(warnings).toEqual([]);
  });
});
