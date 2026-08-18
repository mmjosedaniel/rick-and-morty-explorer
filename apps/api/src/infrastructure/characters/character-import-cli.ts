import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import type { Transaction } from "sequelize";

import { createCharacterImportService } from "../../application/characters/character-import-service.js";
import { createPostgresSequelize } from "../database/postgres-runtime.js";
import { createSequelizeCharacterImportRepository } from "../database/sequelize-character-import-repository.js";
import { createRickAndMortyCharacterClient } from "../upstream/rick-and-morty-character-client.js";

interface CharacterImportRuntime {
  readonly importBaseline: () => Promise<void>;
  readonly close: () => Promise<void>;
}

interface CharacterImportCommandOptions {
  readonly argv: readonly string[];
  readonly initialize: () => Promise<CharacterImportRuntime>;
  readonly requestInvalidation: () => Promise<void>;
  readonly writeError: (diagnostic: string) => void;
  readonly writeWarning: (diagnostic: string) => void;
}

interface CharacterImportCompositionOptions {
  readonly argv: readonly string[];
  readonly environment: NodeJS.ProcessEnv;
  readonly fetch: typeof fetch;
  readonly requestInvalidation: () => Promise<void>;
  readonly writeError: (diagnostic: string) => void;
  readonly writeWarning: (diagnostic: string) => void;
}

const commandInvalid = "CHARACTER_IMPORT_COMMAND_INVALID\n";
const initializationFailed = "CHARACTER_IMPORT_INITIALIZATION_FAILED\n";
const importFailed = "CHARACTER_IMPORT_FAILED\n";
const invalidationFailed = "CHARACTER_IMPORT_INVALIDATION_FAILED\n";
const closeFailed = "CHARACTER_IMPORT_CLOSE_FAILED\n";

export async function runCharacterImportCommand(
  options: CharacterImportCommandOptions,
): Promise<number> {
  if (options.argv.length !== 0) {
    options.writeError(commandInvalid);
    return 1;
  }

  let runtime: CharacterImportRuntime;
  try {
    runtime = await options.initialize();
  } catch {
    options.writeError(initializationFailed);
    return 1;
  }

  let result = 0;
  try {
    try {
      await runtime.importBaseline();
    } catch {
      options.writeError(importFailed);
      result = 1;
    }

    if (result === 0) {
      try {
        await options.requestInvalidation();
      } catch {
        options.writeWarning(invalidationFailed);
      }
    }
  } finally {
    try {
      await runtime.close();
    } catch {
      options.writeError(closeFailed);
      result = 1;
    }
  }

  return result;
}

export function runCharacterImportComposition(
  options: CharacterImportCompositionOptions,
): Promise<number> {
  return runCharacterImportCommand({
    argv: options.argv,
    initialize: async () => {
      const { sequelize, schema } = await createPostgresSequelize(
        options.environment,
      );
      const repository = createSequelizeCharacterImportRepository({
        sequelize: {
          query: (sql, queryOptions) =>
            sequelize.query(sql, {
              bind: [...queryOptions.bind],
              transaction: queryOptions.transaction as Transaction,
            }),
          transaction: (body) =>
            sequelize.transaction((transaction) => body(transaction)),
        },
        schema,
      });
      const client = createRickAndMortyCharacterClient({
        fetch: options.fetch,
        timeoutMs: 5_000,
        maxAttempts: 3,
      });
      const service = createCharacterImportService({ client, repository });

      return {
        importBaseline: () => service.importBaseline(),
        close: () => sequelize.close(),
      };
    },
    requestInvalidation: options.requestInvalidation,
    writeError: options.writeError,
    writeWarning: options.writeWarning,
  });
}

async function requestDeferredInvalidation(): Promise<void> {
  // TASK-007 owns cache invalidation; this adapter preserves the post-commit seam.
}

async function main(): Promise<void> {
  process.exitCode = await runCharacterImportComposition({
    argv: process.argv.slice(2),
    environment: process.env,
    fetch: globalThis.fetch,
    requestInvalidation: requestDeferredInvalidation,
    writeError: (diagnostic) => process.stderr.write(diagnostic),
    writeWarning: (diagnostic) => process.stderr.write(diagnostic),
  });
}

const entryPath = process.argv[1];
if (
  entryPath !== undefined &&
  pathToFileURL(resolve(entryPath)).href === import.meta.url
) {
  await main();
}
