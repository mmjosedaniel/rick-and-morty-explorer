import { describe, expect, it, vi } from "vitest";

import type {
  CharacterComment,
  CharacterDetail,
  CharacterReadRepository,
  CharacterReadService,
  CharacterSummary,
} from "./application/characters/character-read-service.js";
import type { CharacterSearchCache } from "./application/characters/character-search-cache.js";
import type { LazyCharacterReadServiceOwner } from "./runtime-composition.js";
import { createLazyCharacterReadServiceOwner } from "./runtime-composition.js";

interface OwnedCharacterReadService {
  readonly characterReadService: CharacterReadService;
  close(): Promise<void>;
}

interface Deferred<T> {
  readonly promise: Promise<T>;
  resolve(value: T): void;
}

interface RedisRuntimeConfig {
  readonly host: "127.0.0.1";
  readonly port: number;
  readonly namespace: string;
  readonly searchTtlSeconds: number;
  readonly operationTimeoutMs: number;
}

interface OwnedCharacterSearchCache {
  readonly cache: CharacterSearchCache;
  close(): Promise<void>;
}

interface OwnedCharacterReadRepository {
  readonly repository: CharacterReadRepository;
  close(): Promise<void>;
}

interface CharacterInteractionRepository {
  setFavorite(
    id: number,
    isFavorite: boolean,
  ): Promise<CharacterDetail | null>;
  addComment(
    characterId: number,
    body: string,
  ): Promise<CharacterComment | null>;
}

interface CharacterInteractionService {
  setFavorite(
    id: number,
    isFavorite: boolean,
  ): Promise<CharacterDetail | null>;
  addComment(
    characterId: number,
    body: string,
  ): Promise<CharacterComment | null>;
}

interface LazyCharacterRuntimeOwner extends LazyCharacterReadServiceOwner {
  readonly characterInteractionService: CharacterInteractionService;
}

type CreateProductionCharacterRuntimeOwner = (options: {
  readonly environment: Readonly<Record<string, string | undefined>>;
  readonly initializePostgres: () => Promise<
    OwnedCharacterReadRepository & {
      readonly interactionRepository: CharacterInteractionRepository;
    }
  >;
  readonly createCacheOwner: (
    config: RedisRuntimeConfig,
  ) => OwnedCharacterSearchCache;
  readonly writeWarning?: (diagnostic: string) => void;
}) => LazyCharacterRuntimeOwner;

type CreateProductionCharacterReadServiceOwner = (options: {
  readonly environment: Readonly<Record<string, string | undefined>>;
  readonly initializePostgres: () => Promise<OwnedCharacterReadRepository>;
  readonly createCacheOwner: (
    config: RedisRuntimeConfig,
  ) => OwnedCharacterSearchCache;
  readonly writeWarning?: (diagnostic: string) => void;
}) => LazyCharacterReadServiceOwner;

async function loadProductionOwnerFactory(): Promise<CreateProductionCharacterReadServiceOwner> {
  const module = (await import("./runtime-composition.js")) as Record<
    string,
    unknown
  >;

  expect(module.createProductionCharacterReadServiceOwner).toBeTypeOf(
    "function",
  );
  return module.createProductionCharacterReadServiceOwner as CreateProductionCharacterReadServiceOwner;
}

async function loadProductionRuntimeOwnerFactory(): Promise<CreateProductionCharacterRuntimeOwner> {
  const module = (await import("./runtime-composition.js")) as Record<
    string,
    unknown
  >;

  expect(module.createProductionCharacterReadServiceOwner).toBeTypeOf(
    "function",
  );
  return module.createProductionCharacterReadServiceOwner as CreateProductionCharacterRuntimeOwner;
}

function createDeferred<T>(): Deferred<T> {
  let resolveDeferred: ((value: T) => void) | undefined;
  const promise = new Promise<T>((resolve) => {
    resolveDeferred = resolve;
  });

  return {
    promise,
    resolve: (value) => {
      if (resolveDeferred === undefined) {
        throw new Error("Deferred initializer is unavailable");
      }
      resolveDeferred(value);
    },
  };
}

describe("TASK-006 Milestone 2 demand-lazy resource ownership", () => {
  it("waits for in-flight initialization and closes the owned resource exactly once", async () => {
    const initialization = createDeferred<OwnedCharacterReadService>();
    const initialize = vi.fn(() => initialization.promise);
    const closeResource = vi.fn(async () => {});
    const abandonedResult = new Promise<readonly CharacterSummary[]>(() => {});
    const list = vi.fn(() => abandonedResult);
    const owner = createLazyCharacterReadServiceOwner({ initialize });

    void owner.characterReadService.list(undefined);
    expect(initialize).toHaveBeenCalledOnce();

    let shutdownFinished = false;
    const firstClose = owner.close().then(() => {
      shutdownFinished = true;
    });

    await Promise.resolve();
    expect(shutdownFinished).toBe(false);
    expect(closeResource).not.toHaveBeenCalled();

    initialization.resolve({
      characterReadService: { list },
      close: closeResource,
    });

    await firstClose;
    expect(closeResource).toHaveBeenCalledOnce();

    await Promise.all([owner.close(), owner.close()]);
    expect(closeResource).toHaveBeenCalledOnce();
  });
});

describe("TASK-007 Milestone 2 production cache ownership", () => {
  const summary: CharacterSummary = {
    id: 2,
    name: "Morty Smith",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    species: "Human",
  };
  const detail: CharacterDetail = {
    ...summary,
    status: "Alive",
    gender: "Male",
    type: "",
    origin: { name: "Earth", url: "https://example.test/earth" },
    isFavorite: false,
  };
  const comments: readonly CharacterComment[] = [{ id: 1, body: "Hi" }];

  it("lazily wires the cache to list searches only and closes both owned resources once", async () => {
    const createProductionCharacterReadServiceOwner =
      await loadProductionOwnerFactory();
    const search = vi.fn(async () => [summary]);
    const findDetail = vi.fn(async () => detail);
    const listComments = vi.fn(async () => comments);
    const closePostgres = vi.fn(async () => {});
    const initializePostgres = vi.fn(async () => ({
      repository: { search, findDetail, listComments },
      close: closePostgres,
    }));
    const read = vi.fn(async () => null as string | null);
    const write = vi.fn(async () => {});
    const unlink = vi.fn(async () => {});
    const closeCache = vi.fn(async () => {});
    const createCacheOwner = vi.fn((_config: RedisRuntimeConfig) => ({
      cache: { read, write, unlink },
      close: closeCache,
    }));
    const owner = createProductionCharacterReadServiceOwner({
      environment: {
        REDIS_PORT: "56400",
        REDIS_NAMESPACE: "character-app:test:t007-m2-runtime",
        REDIS_SEARCH_TTL_SECONDS: "300",
        REDIS_OPERATION_TIMEOUT_MS: "250",
      },
      initializePostgres,
      createCacheOwner,
    });

    expect(initializePostgres).not.toHaveBeenCalled();
    expect(createCacheOwner).not.toHaveBeenCalled();

    await expect(owner.characterReadService.list({ name: " Morty " })).resolves.toEqual([
      summary,
    ]);
    expect(initializePostgres).toHaveBeenCalledOnce();
    expect(createCacheOwner).toHaveBeenCalledOnce();
    expect(createCacheOwner).toHaveBeenCalledWith({
      host: "127.0.0.1",
      port: 56400,
      namespace: "character-app:test:t007-m2-runtime",
      searchTtlSeconds: 300,
      operationTimeoutMs: 250,
    });
    expect(read).toHaveBeenCalledWith({ name: "morty" });
    expect(search).toHaveBeenCalledWith({ name: "morty" });
    expect(write).toHaveBeenCalledWith({ name: "morty" }, [summary]);

    const cacheCallsBeforeDirectReads =
      read.mock.calls.length + write.mock.calls.length + unlink.mock.calls.length;
    await expect(owner.characterReadService.detail?.(2)).resolves.toBe(detail);
    await expect(
      owner.characterReadService.comments?.(2, { limit: 20, offset: 0 }),
    ).resolves.toBe(comments);
    expect(findDetail).toHaveBeenCalledWith(2);
    expect(listComments).toHaveBeenCalledWith(2, { limit: 20, offset: 0 });
    expect(
      read.mock.calls.length + write.mock.calls.length + unlink.mock.calls.length,
    ).toBe(cacheCallsBeforeDirectReads);

    await Promise.all([owner.close(), owner.close()]);
    expect(closeCache).toHaveBeenCalledOnce();
    expect(closePostgres).toHaveBeenCalledOnce();
  });

  it("closes initialized PostgreSQL immediately when cache-owner construction fails", async () => {
    const createProductionCharacterReadServiceOwner =
      await loadProductionOwnerFactory();
    const closePostgres = vi.fn(async () => {});
    const queryAfterClose = new Error("QUERY_AFTER_CLOSE");
    const findDetail = vi.fn(async () => {
      throw queryAfterClose;
    });
    const initializePostgres = vi.fn(async () => ({
      repository: { search: vi.fn(async () => [summary]), findDetail },
      close: closePostgres,
    }));
    const cacheOwnerFailure = new Error("CACHE_OWNER_CONSTRUCTION_FAILED");
    const createCacheOwner = vi.fn((_config: RedisRuntimeConfig) => {
      throw cacheOwnerFailure;
    });
    const owner = createProductionCharacterReadServiceOwner({
      environment: {
        REDIS_PORT: "56400",
        REDIS_NAMESPACE: "character-app:test:t008-m1-cache-cleanup",
        REDIS_SEARCH_TTL_SECONDS: "300",
        REDIS_OPERATION_TIMEOUT_MS: "250",
      },
      initializePostgres,
      createCacheOwner,
    });

    await expect(owner.characterReadService.list(undefined)).rejects.toBe(
      cacheOwnerFailure,
    );
    expect(initializePostgres).toHaveBeenCalledOnce();
    expect(createCacheOwner).toHaveBeenCalledOnce();
    expect.soft(closePostgres).toHaveBeenCalledOnce();

    await expect
      .soft(owner.characterReadService.detail?.(2))
      .rejects.toThrow("CHARACTER_RUNTIME_CLOSED");
    expect.soft(findDetail).not.toHaveBeenCalled();
    expect(createCacheOwner).toHaveBeenCalledOnce();

    await owner.close();
    expect(closePostgres).toHaveBeenCalledOnce();
  });

  it("emits one safe warning and disables only caching for invalid Redis configuration", async () => {
    const createProductionCharacterReadServiceOwner =
      await loadProductionOwnerFactory();
    const search = vi.fn(async () => [summary]);
    const closePostgres = vi.fn(async () => {});
    const initializePostgres = vi.fn(async () => ({
      repository: { search },
      close: closePostgres,
    }));
    const createCacheOwner = vi.fn((_config: RedisRuntimeConfig) => {
      throw new Error("CACHE_OWNER_MUST_NOT_BE_CREATED");
    });
    const warnings: string[] = [];
    const owner = createProductionCharacterReadServiceOwner({
      environment: { REDIS_NAMESPACE: "shared:*" },
      initializePostgres,
      createCacheOwner,
      writeWarning: (diagnostic) => warnings.push(diagnostic),
    });

    await expect(owner.characterReadService.list(undefined)).resolves.toEqual([
      summary,
    ]);
    expect(search).toHaveBeenCalledWith(undefined);
    expect(createCacheOwner).not.toHaveBeenCalled();
    expect(warnings).toEqual(["CHARACTER_SEARCH_CACHE_CONFIG_INVALID\n"]);

    await owner.close();
    expect(closePostgres).toHaveBeenCalledOnce();
  });
});

describe("TASK-008 Milestone 1 interaction runtime ownership", () => {
  it("initializes and closes PostgreSQL once for mutations without creating a Redis owner", async () => {
    const createProductionCharacterRuntimeOwner =
      await loadProductionRuntimeOwnerFactory();
    const summary: CharacterSummary = {
      id: 1,
      name: "Rick Sanchez",
      imageUrl: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      species: "Human",
    };
    const detail: CharacterDetail = {
      ...summary,
      status: "Alive",
      gender: "Male",
      type: "",
      origin: { name: "Earth", url: "https://example.test/earth" },
      isFavorite: true,
    };
    const comment: CharacterComment = { id: 9, body: "Runtime comment" };
    const setFavorite = vi.fn(async () => detail);
    const addComment = vi.fn(async () => comment);
    const closePostgres = vi.fn(async () => {});
    const initializePostgres = vi.fn(async () => ({
      repository: { search: vi.fn(async () => []) },
      interactionRepository: { setFavorite, addComment },
      close: closePostgres,
    }));
    const createCacheOwner = vi.fn((_config: RedisRuntimeConfig) => ({
      cache: {
        read: vi.fn(async () => null),
        write: vi.fn(async () => {}),
        unlink: vi.fn(async () => {}),
      },
      close: vi.fn(async () => {}),
    }));
    const owner = createProductionCharacterRuntimeOwner({
      environment: {
        REDIS_PORT: "56400",
        REDIS_NAMESPACE: "character-app:test:t008-m1-runtime",
        REDIS_SEARCH_TTL_SECONDS: "300",
        REDIS_OPERATION_TIMEOUT_MS: "250",
      },
      initializePostgres,
      createCacheOwner,
    });

    expect(initializePostgres).not.toHaveBeenCalled();
    expect(createCacheOwner).not.toHaveBeenCalled();

    await expect(
      owner.characterInteractionService.setFavorite(1, true),
    ).resolves.toBe(detail);
    await expect(
      owner.characterInteractionService.addComment(1, "Runtime comment"),
    ).resolves.toBe(comment);
    expect(setFavorite).toHaveBeenCalledWith(1, true);
    expect(addComment).toHaveBeenCalledWith(1, "Runtime comment");
    expect(initializePostgres).toHaveBeenCalledOnce();
    expect(createCacheOwner).not.toHaveBeenCalled();

    await Promise.all([owner.close(), owner.close()]);
    expect(closePostgres).toHaveBeenCalledOnce();
    expect(createCacheOwner).not.toHaveBeenCalled();
  });
});
