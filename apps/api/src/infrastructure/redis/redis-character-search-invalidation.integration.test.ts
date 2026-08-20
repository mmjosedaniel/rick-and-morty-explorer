import { describe, expect, it } from "vitest";

interface RedisRuntimeConfig {
  readonly host: "127.0.0.1";
  readonly port: number;
  readonly namespace: string;
  readonly searchTtlSeconds: number;
  readonly operationTimeoutMs: number;
}

interface RedisCharacterSearchInvalidationOwner {
  invalidate(): Promise<void>;
  close(): Promise<void>;
}

type CreateRedisCharacterSearchInvalidationOwner = (options: {
  readonly config: RedisRuntimeConfig;
}) => RedisCharacterSearchInvalidationOwner;

interface RawRedisClient {
  connect(): Promise<void>;
  get(key: string): Promise<string | null>;
  set(
    key: string,
    value: string,
    options: Readonly<{ EX: number }>,
  ): Promise<unknown>;
  scan(
    cursor: string,
    options: Readonly<{ MATCH: string; COUNT: number }>,
  ): Promise<{ readonly cursor: string; readonly keys: readonly string[] }>;
  unlink(keys: readonly string[]): Promise<number>;
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

async function loadOwnerFactory(): Promise<CreateRedisCharacterSearchInvalidationOwner> {
  const module = (await import("./redis-character-search-cache.js")) as Record<
    string,
    unknown
  >;
  expect(module.createRedisCharacterSearchInvalidationOwner).toBeTypeOf(
    "function",
  );
  return module.createRedisCharacterSearchInvalidationOwner as CreateRedisCharacterSearchInvalidationOwner;
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
    await client.unlink([key]);
  }
  expect(await scanOwnedKeys(client, namespace)).toEqual([]);
}

describe("TASK-007 Milestone 3 real Redis search invalidation", () => {
  it("removes only the configured search prefix and leaves other keys isolated", async () => {
    const port = Number(process.env.REDIS_PORT);
    const namespace = process.env.REDIS_NAMESPACE;
    if (!Number.isInteger(port) || namespace === undefined) {
      throw new Error("TASK_007_REDIS_TEST_CONFIG_INVALID");
    }

    const createOwner = await loadOwnerFactory();
    const rawClient = await createRawClient(port);
    const owner = createOwner({
      config: {
        host: "127.0.0.1",
        port,
        namespace,
        searchTtlSeconds: 300,
        operationTimeoutMs: 250,
      },
    });
    const ownedSearchOne =
      `${namespace}:characters:search:v1:${"1".repeat(64)}`;
    const ownedSearchTwo =
      `${namespace}:characters:search:v1:${"2".repeat(64)}`;
    const ownedNonSearch = `${namespace}:characters:detail:1`;
    const nestedNamespace = `${namespace}:characters:search:v1:foreign`;
    const nestedSearch =
      `${nestedNamespace}:characters:search:v1:${"3".repeat(64)}`;
    let operationFailure: unknown;

    try {
      expect(await scanOwnedKeys(rawClient, namespace)).toEqual([]);
      for (const key of [
        ownedSearchOne,
        ownedSearchTwo,
        ownedNonSearch,
        nestedSearch,
      ]) {
        await rawClient.set(key, "[]", { EX: 300 });
      }

      await owner.invalidate();

      expect(await rawClient.get(ownedSearchOne)).toBeNull();
      expect(await rawClient.get(ownedSearchTwo)).toBeNull();
      expect(await rawClient.get(ownedNonSearch)).toBe("[]");
      expect(await rawClient.get(nestedSearch)).toBe("[]");
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
        "Redis invalidation and exact-prefix cleanup both failed",
      );
    }
    if (operationFailure !== undefined) throw operationFailure;
    if (cleanupFailures.length > 0) {
      throw new AggregateError(cleanupFailures, "Exact-prefix cleanup failed");
    }
  });
});
