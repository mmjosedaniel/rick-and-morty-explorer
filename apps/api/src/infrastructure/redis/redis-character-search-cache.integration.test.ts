import { performance } from "node:perf_hooks";

import { describe, expect, it, vi } from "vitest";

import {
  buildCharacterSearchCacheKey,
  type CharacterSearchCache,
} from "../../application/characters/character-search-cache.js";
import {
  createCharacterReadService,
  type CharacterSummary,
  type NormalizedCharacterFilter,
} from "../../application/characters/character-read-service.js";

interface RedisRuntimeConfig {
  readonly host: "127.0.0.1";
  readonly port: number;
  readonly namespace: string;
  readonly searchTtlSeconds: number;
  readonly operationTimeoutMs: number;
}

interface RedisCharacterSearchCacheOwner {
  readonly cache: CharacterSearchCache;
  close(): Promise<void>;
}

type CreateRedisCharacterSearchCacheOwner = (options: {
  readonly config: RedisRuntimeConfig;
  readonly writeWarning?: (diagnostic: string) => void;
}) => RedisCharacterSearchCacheOwner;

interface RawRedisClient {
  connect(): Promise<void>;
  get(key: string): Promise<string | null>;
  set(
    key: string,
    value: string,
    options: Readonly<{ EX: number }>,
  ): Promise<unknown>;
  ttl(key: string): Promise<number>;
  scan(
    cursor: string,
    options: Readonly<{ MATCH: string; COUNT: number }>,
  ): Promise<{ readonly cursor: string; readonly keys: readonly string[] }>;
  unlink(key: string): Promise<number>;
  close(): Promise<void>;
}

interface RedisClientModule {
  createClient(options: {
    readonly socket: {
      readonly host: string;
      readonly port: number;
      readonly connectTimeout: number;
      readonly reconnectStrategy: false;
    };
    readonly disableOfflineQueue: true;
  }): RawRedisClient;
}

const summary: CharacterSummary = {
  id: 2,
  name: "Morty Smith",
  imageUrl: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  species: "Human",
};

async function loadOwnerFactory(): Promise<CreateRedisCharacterSearchCacheOwner> {
  const module = (await import("./redis-character-search-cache.js")) as Record<
    string,
    unknown
  >;

  expect(module.createRedisCharacterSearchCacheOwner).toBeTypeOf("function");
  return module.createRedisCharacterSearchCacheOwner as CreateRedisCharacterSearchCacheOwner;
}

async function createRawClient(port: number): Promise<RawRedisClient> {
  const module = (await import("@redis/client")) as unknown as RedisClientModule;
  const client = module.createClient({
    socket: {
      host: "127.0.0.1",
      port,
      connectTimeout: 250,
      reconnectStrategy: false,
    },
    disableOfflineQueue: true,
  });
  await client.connect();
  return client;
}

async function scanOwnedKeys(
  client: RawRedisClient,
  namespace: string,
): Promise<readonly string[]> {
  const keys: string[] = [];
  let cursor = "0";

  do {
    const page = await client.scan(cursor, {
      MATCH: `${namespace}:*`,
      COUNT: 100,
    });
    cursor = page.cursor;
    keys.push(...page.keys);
  } while (cursor !== "0");

  return keys;
}

async function cleanupOwnedKeys(
  client: RawRedisClient,
  namespace: string,
): Promise<void> {
  for (const key of await scanOwnedKeys(client, namespace)) {
    if (!key.startsWith(`${namespace}:`)) {
      throw new Error("REDIS_TEST_CLEANUP_SCOPE_INVALID");
    }
    await client.unlink(key);
  }

  expect(await scanOwnedKeys(client, namespace)).toEqual([]);
}

describe("TASK-007 Milestone 2 real Redis cache-aside boundary", () => {
  it("proves miss, hit, empty hit, TTL, malformed recovery, exact URL, and namespace isolation", async () => {
    const port = Number(process.env.REDIS_PORT);
    const namespace = process.env.REDIS_NAMESPACE;
    if (!Number.isInteger(port) || namespace === undefined) {
      throw new Error("TASK_007_REDIS_TEST_CONFIG_INVALID");
    }

    const createRedisCharacterSearchCacheOwner = await loadOwnerFactory();
    const rawClient = await createRawClient(port);
    const config: RedisRuntimeConfig = {
      host: "127.0.0.1",
      port,
      namespace,
      searchTtlSeconds: 2,
      operationTimeoutMs: 250,
    };
    const owner = createRedisCharacterSearchCacheOwner({ config });
    let operationFailure: unknown;

    try {
      expect(await scanOwnedKeys(rawClient, namespace)).toEqual([]);

      const search = vi.fn(async () => [summary]);
      const service = createCharacterReadService({
        repository: { search },
        cache: owner.cache,
      });
      await expect(service.list(undefined)).resolves.toEqual([summary]);
      await expect(service.list(undefined)).resolves.toEqual([summary]);
      expect(search).toHaveBeenCalledOnce();

      const key = buildCharacterSearchCacheKey(namespace, {});
      expect(await rawClient.get(key)).toBe(JSON.stringify([summary]));
      expect(await rawClient.ttl(key)).toBeGreaterThan(0);
      expect(await rawClient.ttl(key)).toBeLessThanOrEqual(2);

      const emptySearch = vi.fn(async () => [] as const);
      const emptyService = createCharacterReadService({
        repository: { search: emptySearch },
        cache: owner.cache,
      });
      await expect(emptyService.list({ name: " Nobody " })).resolves.toEqual([]);
      await expect(emptyService.list({ name: " Nobody " })).resolves.toEqual([]);
      expect(emptySearch).toHaveBeenCalledOnce();

      const malformedFilter: NormalizedCharacterFilter = { name: "morty" };
      const malformedKey = buildCharacterSearchCacheKey(
        namespace,
        malformedFilter,
      );
      await rawClient.set(
        malformedKey,
        JSON.stringify([{ ...summary, comment: "must not be cached" }]),
        { EX: 2 },
      );
      const malformedWarnings: string[] = [];
      const malformedSearch = vi.fn(async () => [summary]);
      const malformedService = createCharacterReadService({
        repository: { search: malformedSearch },
        cache: owner.cache,
        writeWarning: (diagnostic) => malformedWarnings.push(diagnostic),
      });
      await expect(malformedService.list({ name: " Morty " })).resolves.toEqual([
        summary,
      ]);
      expect(malformedSearch).toHaveBeenCalledOnce();
      expect(malformedWarnings).toEqual([
        "CHARACTER_SEARCH_CACHE_VALUE_INVALID\n",
      ]);
      expect(await rawClient.get(malformedKey)).toBe(JSON.stringify([summary]));

      const isolatedNamespace = `${namespace}:isolated`;
      const isolatedKey = buildCharacterSearchCacheKey(isolatedNamespace, {});
      await rawClient.set(isolatedKey, "[]", { EX: 2 });
      expect(await owner.cache.read({})).toBe(JSON.stringify([summary]));
      expect(await rawClient.get(isolatedKey)).toBe("[]");
      expect((await rawClient.get(key)) ?? "").toContain(
        "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      );
    } catch (error) {
      operationFailure = error;
    }

    const cleanupFailures: unknown[] = [];
    try {
      await owner.close();
    } catch (error) {
      cleanupFailures.push(error);
    }
    try {
      await cleanupOwnedKeys(rawClient, namespace);
    } catch (error) {
      cleanupFailures.push(error);
    }
    try {
      await rawClient.close();
    } catch (error) {
      cleanupFailures.push(error);
    }

    if (operationFailure !== undefined && cleanupFailures.length > 0) {
      throw new AggregateError(
        [operationFailure, ...cleanupFailures],
        "Redis operation and exact-prefix cleanup both failed",
      );
    }
    if (operationFailure !== undefined) throw operationFailure;
    if (cleanupFailures.length > 0) {
      throw new AggregateError(cleanupFailures, "Exact-prefix cleanup failed");
    }
  });

  it("fails open through PostgreSQL within a bounded loopback connection outage", async () => {
    const createRedisCharacterSearchCacheOwner = await loadOwnerFactory();
    const owner = createRedisCharacterSearchCacheOwner({
      config: {
        host: "127.0.0.1",
        port: 1,
        namespace: "character-app:test:t007-m2-outage",
        searchTtlSeconds: 300,
        operationTimeoutMs: 50,
      },
    });
    const search = vi.fn(async () => [summary]);
    const warnings: string[] = [];
    const service = createCharacterReadService({
      repository: { search },
      cache: owner.cache,
      writeWarning: (diagnostic) => warnings.push(diagnostic),
    });
    const startedAt = performance.now();

    await expect(service.list({ name: "Morty" })).resolves.toEqual([summary]);
    expect(performance.now() - startedAt).toBeLessThan(500);
    expect(search).toHaveBeenCalledOnce();
    expect(warnings).toEqual([
      "CHARACTER_SEARCH_CACHE_READ_FAILED\n",
      "CHARACTER_SEARCH_CACHE_WRITE_FAILED\n",
    ]);

    await owner.close();
  });
});
