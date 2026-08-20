import { randomUUID } from "node:crypto";
import { performance } from "node:perf_hooks";

import { createApp } from "./app.js";
import { parseApiHost, parseApiPort } from "./config.js";
import { createPostgresSequelize } from "./infrastructure/database/postgres-runtime.js";
import { createSequelizeCharacterReadRepository } from "./infrastructure/database/sequelize-character-read-repository.js";
import { createRedisCharacterSearchCacheOwner } from "./infrastructure/redis/redis-character-search-cache.js";
import { createProductionCharacterReadServiceOwner } from "./runtime-composition.js";

const host = parseApiHost(process.env.API_HOST);
const port = parseApiPort(process.env.API_PORT);

const characterReadServiceOwner = createProductionCharacterReadServiceOwner({
  environment: process.env,
  initializePostgres: async () => {
    const { sequelize, schema } = await createPostgresSequelize(process.env);
    const repository = createSequelizeCharacterReadRepository({
      sequelize,
      schema,
    });

    return {
      repository,
      close: async () => sequelize.close(),
    };
  },
  createCacheOwner: (config) =>
    createRedisCharacterSearchCacheOwner({ config }),
});
const app = createApp({
  characterReadService: characterReadServiceOwner.characterReadService,
  enableGraphiql: false,
  requestLogging: {
    write: (line) => {
      process.stdout.write(line);
    },
    createRequestId: randomUUID,
    now: () => performance.now(),
  },
  reportUnexpectedError: (error) => {
    console.error(error);
  },
});

const server = app.listen(port, host, () => {
  console.log(`API server listening at http://${host}:${port}`);
});

let shutdownPromise: Promise<void> | undefined;

function shutdown(): Promise<void> {
  shutdownPromise ??= (async () => {
    let serverCloseError: unknown;
    try {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error === undefined) {
            resolve();
          } else {
            reject(error);
          }
        });
      });
    } catch (error) {
      serverCloseError = error;
    }

    let resourceCloseError: unknown;
    try {
      await characterReadServiceOwner.close();
    } catch (error) {
      resourceCloseError = error;
    }

    if (serverCloseError !== undefined) {
      console.error("Failed to close the API server", serverCloseError);
    }
    if (resourceCloseError !== undefined) {
      console.error(
        "Failed to close API resources",
        resourceCloseError,
      );
    }
    if (serverCloseError !== undefined || resourceCloseError !== undefined) {
      process.exitCode = 1;
    }
  })();

  return shutdownPromise;
}

process.once("SIGINT", () => {
  void shutdown();
});
process.once("SIGTERM", () => {
  void shutdown();
});
