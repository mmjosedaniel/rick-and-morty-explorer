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
