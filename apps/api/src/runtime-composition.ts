import { createApp } from "./app.js";
import {
  createCharacterReadService,
  type CharacterReadService,
} from "./application/characters/character-read-service.js";
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

interface LazyCharacterReadServiceOwner {
  readonly characterReadService: CharacterReadService;
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
