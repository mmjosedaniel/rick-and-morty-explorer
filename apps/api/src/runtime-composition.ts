import { createApp } from "./app.js";
import {
  createCharacterInteractionService,
  type CharacterInteractionRepository,
  type CharacterInteractionService,
} from "./application/characters/character-interaction-service.js";
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
import { createSequelizeCharacterInteractionRepository } from "./infrastructure/database/sequelize-character-interaction-repository.js";

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
  readonly interactionRepository?: CharacterInteractionRepository;
  close(): Promise<void>;
}

export interface LazyCharacterRuntimeOwner
  extends LazyCharacterReadServiceOwner {
  readonly characterInteractionService: CharacterInteractionService;
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
}): LazyCharacterRuntimeOwner {
  const redisConfig = loadRedisRuntimeConfig(
    options.environment,
    options.writeWarning,
  );
  let postgresInitialization: Promise<OwnedCharacterReadRepository> | undefined;
  let cacheOwner: OwnedCharacterSearchCache | undefined;
  let cachedReadService: CharacterReadService | undefined;
  let closing = false;
  let closePromise: Promise<void> | undefined;
  let postgresClosePromise: Promise<void> | undefined;

  function initializePostgresOnce(): Promise<OwnedCharacterReadRepository> {
    if (closing) {
      return Promise.reject(new Error("CHARACTER_RUNTIME_CLOSED"));
    }
    if (postgresInitialization === undefined) {
      try {
        postgresInitialization = options.initializePostgres();
      } catch (error) {
        postgresInitialization = Promise.reject(error);
      }
    }
    return postgresInitialization;
  }

  function closePostgresOnce(
    postgres: OwnedCharacterReadRepository,
  ): Promise<void> {
    postgresClosePromise ??= postgres.close();
    return postgresClosePromise;
  }

  async function getReadService(useCache: boolean): Promise<CharacterReadService> {
    const postgres = await initializePostgresOnce();
    if (!useCache || redisConfig === null) {
      return createCharacterReadService({ repository: postgres.repository });
    }
    if (cachedReadService === undefined) {
      try {
        cacheOwner = options.createCacheOwner(redisConfig);
      } catch (error) {
        closing = true;
        await closePostgresOnce(postgres);
        throw error;
      }
      cachedReadService = createCharacterReadService({
        repository: postgres.repository,
        cache: cacheOwner.cache,
        ...(options.writeWarning === undefined
          ? {}
          : { writeWarning: options.writeWarning }),
      });
    }
    return cachedReadService;
  }

  async function getInteractionService(): Promise<CharacterInteractionService> {
    const postgres = await initializePostgresOnce();
    if (postgres.interactionRepository === undefined) {
      throw new Error("CHARACTER_INTERACTION_REPOSITORY_UNAVAILABLE");
    }
    return createCharacterInteractionService({
      repository: postgres.interactionRepository,
    });
  }

  return {
    characterReadService: {
      list: async (filter) => (await getReadService(true)).list(filter),
      detail: async (id) => {
        const detail = (await getReadService(false)).detail;
        if (detail === undefined) {
          throw new Error("CHARACTER_DETAIL_SERVICE_UNAVAILABLE");
        }
        return detail(id);
      },
      comments: async (characterId, page) => {
        const comments = (await getReadService(false)).comments;
        if (comments === undefined) {
          throw new Error("CHARACTER_COMMENT_SERVICE_UNAVAILABLE");
        }
        return comments(characterId, page);
      },
    },
    characterInteractionService: {
      setFavorite: async (id, isFavorite) =>
        (await getInteractionService()).setFavorite(id, isFavorite),
      addComment: async (characterId, body) =>
        (await getInteractionService()).addComment(characterId, body),
    },
    close: () => {
      closing = true;
      closePromise ??= (async () => {
        const resources: Promise<void>[] = [];
        if (cacheOwner !== undefined) resources.push(cacheOwner.close());
        if (postgresInitialization !== undefined) {
          try {
            resources.push(closePostgresOnce(await postgresInitialization));
          } catch {
            return;
          }
        }
        const results = await Promise.allSettled(resources);
        const failures = results.flatMap((result) =>
          result.status === "rejected" ? [result.reason] : [],
        );
        if (failures.length > 0) {
          throw new AggregateError(failures, "Failed to close API resources");
        }
      })();
      return closePromise;
    },
  };
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
  const interactionRepository = createSequelizeCharacterInteractionRepository({
    sequelize: options.sequelize,
    schema: options.schema,
  });
  const characterReadService = createCharacterReadService({ repository });
  const characterInteractionService = createCharacterInteractionService({
    repository: interactionRepository,
  });

  return createApp({
    characterReadService,
    characterInteractionService,
    ...(options.enableGraphiql === undefined
      ? {}
      : { enableGraphiql: options.enableGraphiql }),
  });
}
