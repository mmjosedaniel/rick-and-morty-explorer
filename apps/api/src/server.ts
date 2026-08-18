import { randomUUID } from "node:crypto";
import { performance } from "node:perf_hooks";

import { createApp } from "./app.js";
import { createCharacterReadService } from "./application/characters/character-read-service.js";
import { parseApiHost, parseApiPort } from "./config.js";
import { createSequelizeCharacterReadRepository } from "./infrastructure/database/sequelize-character-read-repository.js";
import { createLazyCharacterReadServiceOwner } from "./runtime-composition.js";

const identifierPattern = /^[a-z][a-z0-9_]{0,62}$/u;

function loadPostgresRuntimeConfig(environment: NodeJS.ProcessEnv) {
  const database = environment.POSTGRES_DB ?? "rick_and_morty";
  const schema = environment.POSTGRES_SCHEMA ?? "public";
  const user = environment.POSTGRES_USER ?? "rick_and_morty";
  const password = environment.POSTGRES_PASSWORD;
  const port = Number(environment.POSTGRES_PORT ?? "5432");

  if (
    password === undefined ||
    password.length === 0 ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65_535
  ) {
    throw new Error("POSTGRES_RUNTIME_CONFIG_INVALID");
  }

  if (
    !identifierPattern.test(database) ||
    !identifierPattern.test(schema) ||
    !identifierPattern.test(user) ||
    database === "template0" ||
    database === "template1" ||
    schema.startsWith("pg_") ||
    schema === "information_schema"
  ) {
    throw new Error("POSTGRES_RUNTIME_NAMESPACE_INVALID");
  }

  return { database, schema, user, password, port };
}

const host = parseApiHost(process.env.API_HOST);
const port = parseApiPort(process.env.API_PORT);

const characterReadServiceOwner = createLazyCharacterReadServiceOwner({
  initialize: async () => {
    const postgres = loadPostgresRuntimeConfig(process.env);
    const { Sequelize } = await import("sequelize");
    const sequelize = new Sequelize(
      postgres.database,
      postgres.user,
      postgres.password,
      {
        dialect: "postgres",
        host: "127.0.0.1",
        port: postgres.port,
        dialectOptions: { ssl: false },
        logging: false,
        pool: { min: 0 },
      },
    );
    const repository = createSequelizeCharacterReadRepository({
      sequelize,
      schema: postgres.schema,
    });

    return {
      characterReadService: createCharacterReadService({ repository }),
      close: async () => sequelize.close(),
    };
  },
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
        "Failed to close the PostgreSQL connection pool",
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
