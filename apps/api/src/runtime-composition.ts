import { createApp } from "./app.js";
import {
  createCharacterReadService,
  type CharacterReadRepository,
  type CharacterReadService,
} from "./application/characters/character-read-service.js";
import type { CharacterSearchCache } from "./application/characters/character-search-cache.js";
import {
  loadRedisRuntimeConfig,
  type RedisRuntimeConfig,
} from "./config.js";
import { createSequelizeCharacterReadRepository } from "./infrastructure/database/sequelize-character-read-repository.js";

interface SequelizeBoundary {
  query(
    sql: string,
    options: Readonly<Record<string, unknown>>,
  ): Promise<readonly [unknown, unknown]>;
}

interface OwnedCharacterReadService {
  readonly characterReadService: CharacterReadService;
  close(): Promise<void>;
}

export interface LazyCharacterReadServiceOwner {
  readonly characterReadService: CharacterReadService;
  close(): Promise<void>;
}

interface OwnedCharacterSearchCache {
  readonly cache: CharacterSearchCache;
  close(): Promise<void>;
}

interface OwnedCharacterReadRepository {
  readonly repository: CharacterReadRepository;
  close(): Promise<void>;
}

export function createLazyCharacterReadServiceOwner(options: {
  readonly initialize: () => Promise<OwnedCharacterReadService>;
}): LazyCharacterReadServiceOwner {
  let initialization: Promise<OwnedCharacterReadService> | undefined;
  let closing = false;
  let closePromise: Promise<void> | undefined;

  function initializeOnce(): Promise<OwnedCharacterReadService> {
    if (closing) {
      return Promise.reject(new Error("CHARACTER_READ_RUNTIME_CLOSED"));
    }

    if (initialization === undefined) {
      try {
        initialization = options.initialize();
      } catch (error) {
        initialization = Promise.reject(error);
      }
    }

    return initialization;
  }

  const characterReadService: CharacterReadService = {
    list: async (filter) => {
      const ownedService = await initializeOnce();
      return ownedService.characterReadService.list(filter);
    },
    detail: async (id) => {
      const ownedService = await initializeOnce();
      const detail = ownedService.characterReadService.detail;
      if (detail === undefined) {
        throw new Error("CHARACTER_DETAIL_SERVICE_UNAVAILABLE");
      }
      return detail(id);
    },
    comments: async (characterId, page) => {
      const ownedService = await initializeOnce();
      const comments = ownedService.characterReadService.comments;
      if (comments === undefined) {
        throw new Error("CHARACTER_COMMENT_SERVICE_UNAVAILABLE");
      }
      return comments(characterId, page);
    },
  };

  return {
    characterReadService,
    close: () => {
      closing = true;
      closePromise ??= (async () => {
        if (initialization === undefined) {
          return;
        }

        let ownedService: OwnedCharacterReadService;
        try {
          ownedService = await initialization;
        } catch {
          return;
        }

        await ownedService.close();
      })();

      return closePromise;
    },
  };
}

export function createProductionCharacterReadServiceOwner(options: {
  readonly environment: Readonly<Record<string, string | undefined>>;
  readonly initializePostgres: () => Promise<OwnedCharacterReadRepository>;
  readonly createCacheOwner: (
    config: RedisRuntimeConfig,
  ) => OwnedCharacterSearchCache;
  readonly writeWarning?: (diagnostic: string) => void;
}): LazyCharacterReadServiceOwner {
  const redisConfig = loadRedisRuntimeConfig(
    options.environment,
    options.writeWarning,
  );

  return createLazyCharacterReadServiceOwner({
    initialize: async () => {
      const postgres = await options.initializePostgres();
      if (redisConfig === null) {
        return {
          characterReadService: createCharacterReadService({
            repository: postgres.repository,
          }),
          close: postgres.close,
        };
      }

      let cacheOwner: OwnedCharacterSearchCache;
      try {
        cacheOwner = options.createCacheOwner(redisConfig);
      } catch (error) {
        await postgres.close();
        throw error;
      }

      return {
        characterReadService: createCharacterReadService({
          repository: postgres.repository,
          cache: cacheOwner.cache,
          ...(options.writeWarning === undefined
            ? {}
            : { writeWarning: options.writeWarning }),
        }),
        close: async () => {
          const results = await Promise.allSettled([
            cacheOwner.close(),
            postgres.close(),
          ]);
          const failures = results.flatMap((result) =>
            result.status === "rejected" ? [result.reason] : [],
          );
          if (failures.length > 0) {
            throw new AggregateError(failures, "Failed to close API resources");
          }
        },
      };
    },
  });
}

export function createRuntimeApplication(options: {
  readonly sequelize: SequelizeBoundary;
  readonly schema: string;
  readonly enableGraphiql?: boolean;
}) {
  const repository = createSequelizeCharacterReadRepository({
    sequelize: options.sequelize,
    schema: options.schema,
  });
  const characterReadService = createCharacterReadService({ repository });

  return createApp({
    characterReadService,
    ...(options.enableGraphiql === undefined
      ? {}
      : { enableGraphiql: options.enableGraphiql }),
  });
}
