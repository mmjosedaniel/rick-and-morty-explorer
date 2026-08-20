import { afterEach, describe, expect, it, vi } from "vitest";

import type { CharacterSearchCache } from "../../application/characters/character-search-cache.js";
import { createRedisCharacterSearchCacheOwner as redisOwnerFactory } from "./redis-character-search-cache.js";

interface RedisRuntimeConfig {
  readonly host: "127.0.0.1";
  readonly port: number;
  readonly namespace: string;
  readonly searchTtlSeconds: number;
  readonly operationTimeoutMs: number;
}

interface RedisClientOptions {
  readonly socket: {
    readonly host: string;
    readonly port: number;
    readonly connectTimeout: number;
    readonly reconnectStrategy: false;
  };
  readonly disableOfflineQueue: true;
}

interface RedisBaseClient {
  on(event: "error", listener: (error: unknown) => void): unknown;
  connect(): Promise<void>;
  get(key: string): Promise<string | null>;
  set(
    key: string,
    value: string,
    options: Readonly<{ EX: number }>,
  ): Promise<unknown>;
  unlink(key: string): Promise<number>;
  close(): Promise<void>;
}

interface RedisCharacterSearchCacheOwner {
  readonly cache: CharacterSearchCache;
  close(): Promise<void>;
}

type CreateRedisCharacterSearchCacheOwner = (options: {
  readonly config: RedisRuntimeConfig;
  readonly createClient?: (options: RedisClientOptions) => RedisBaseClient;
  readonly writeWarning?: (diagnostic: string) => void;
}) => RedisCharacterSearchCacheOwner;

const config: RedisRuntimeConfig = {
  host: "127.0.0.1",
  port: 56400,
  namespace: "character-app:test:t007-m2-unit",
  searchTtlSeconds: 300,
  operationTimeoutMs: 25,
};

const summary = {
  id: 2,
  name: "Morty Smith",
  imageUrl: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  species: "Human",
} as const;

const expectedKey =
  `${config.namespace}:characters:search:v1:` +
  "44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a";

async function loadOwnerFactory(): Promise<CreateRedisCharacterSearchCacheOwner> {
  expect(redisOwnerFactory).toBeTypeOf("function");
  return redisOwnerFactory as CreateRedisCharacterSearchCacheOwner;
}

function createClient(overrides: Partial<RedisBaseClient> = {}): {
  readonly client: RedisBaseClient;
  readonly errorListeners: Array<(error: unknown) => void>;
  readonly connect: ReturnType<typeof vi.fn>;
  readonly get: ReturnType<typeof vi.fn>;
  readonly set: ReturnType<typeof vi.fn>;
  readonly unlink: ReturnType<typeof vi.fn>;
  readonly close: ReturnType<typeof vi.fn>;
} {
  const errorListeners: Array<(error: unknown) => void> = [];
  const connect = vi.fn(async () => {});
  const get = vi.fn(async () => null as string | null);
  const set = vi.fn(async () => "OK");
  const unlink = vi.fn(async () => 1);
  const close = vi.fn(async () => {});
  const selectedConnect = overrides.connect ?? connect;
  const selectedGet = overrides.get ?? get;
  const selectedSet = overrides.set ?? set;
  const selectedUnlink = overrides.unlink ?? unlink;
  const selectedClose = overrides.close ?? close;

  return {
    client: {
      on:
        overrides.on ??
        ((_event, listener) => {
          errorListeners.push(listener);
        }),
      connect: selectedConnect,
      get: selectedGet,
      set: selectedSet,
      unlink: selectedUnlink,
      close: selectedClose,
    },
    errorListeners,
    connect: selectedConnect as ReturnType<typeof vi.fn>,
    get: selectedGet as ReturnType<typeof vi.fn>,
    set: selectedSet as ReturnType<typeof vi.fn>,
    unlink: selectedUnlink as ReturnType<typeof vi.fn>,
    close: selectedClose as ReturnType<typeof vi.fn>,
  };
}

afterEach(() => {
  vi.useRealTimers();
});

describe("TASK-007 Milestone 2 bounded Redis character-search adapter", () => {
  it("uses one lazy loopback client with no offline queue or automatic reconnect", async () => {
    const createRedisCharacterSearchCacheOwner = await loadOwnerFactory();
    const fake = createClient({
      get: vi.fn(async () => JSON.stringify([summary])),
    });
    const createBaseClient = vi.fn((_options: RedisClientOptions) => fake.client);
    const warnings: string[] = [];
    const owner = createRedisCharacterSearchCacheOwner({
      config,
      createClient: createBaseClient,
      writeWarning: (diagnostic) => warnings.push(diagnostic),
    });

    expect(fake.connect).not.toHaveBeenCalled();
    await expect(owner.cache.read({})).resolves.toBe(JSON.stringify([summary]));
    await expect(owner.cache.read({})).resolves.toBe(JSON.stringify([summary]));

    expect(createBaseClient).toHaveBeenCalledOnce();
    expect(createBaseClient).toHaveBeenCalledWith({
      socket: {
        host: "127.0.0.1",
        port: 56400,
        connectTimeout: 25,
        reconnectStrategy: false,
      },
      disableOfflineQueue: true,
    });
    expect(fake.connect).toHaveBeenCalledOnce();
    expect(fake.errorListeners).toHaveLength(1);
    expect(fake.get).toHaveBeenCalledTimes(2);
    expect(fake.get).toHaveBeenNthCalledWith(1, expectedKey);

    fake.errorListeners[0]?.(new Error("redis://secret@internal stack"));
    expect(warnings).toEqual(["CHARACTER_SEARCH_CACHE_CLIENT_ERROR\n"]);
    expect(warnings.join("")).not.toContain("secret");
    expect(warnings.join("")).not.toContain("stack");

    await Promise.all([owner.close(), owner.close()]);
    expect(fake.close).toHaveBeenCalledOnce();
  });

  it("writes an exact summary with finite expiry and unlinks only the exact key", async () => {
    const createRedisCharacterSearchCacheOwner = await loadOwnerFactory();
    const fake = createClient();
    const owner = createRedisCharacterSearchCacheOwner({
      config,
      createClient: () => fake.client,
    });

    await owner.cache.write({}, [summary]);
    await owner.cache.unlink({});

    expect(fake.set).toHaveBeenCalledWith(
      expectedKey,
      JSON.stringify([summary]),
      { EX: 300 },
    );
    expect(fake.unlink).toHaveBeenCalledWith(expectedKey);
    await owner.close();
  });

  it("surfaces a connection outage without retrying", async () => {
    const createRedisCharacterSearchCacheOwner = await loadOwnerFactory();
    const connectionFailure = new Error("ECONNREFUSED");
    const connect = vi.fn(async () => {
      throw connectionFailure;
    });
    const fake = createClient({ connect });
    const owner = createRedisCharacterSearchCacheOwner({
      config,
      createClient: () => fake.client,
    });

    await expect(owner.cache.read({})).rejects.toBe(connectionFailure);
    expect(connect).toHaveBeenCalledOnce();
    expect(fake.get).not.toHaveBeenCalled();
  });

  it.each(["connect", "get", "set", "unlink"] as const)(
    "bounds a stalled %s operation",
    async (operation) => {
      vi.useFakeTimers();
      const createRedisCharacterSearchCacheOwner = await loadOwnerFactory();
      const stalled = vi.fn(() => new Promise<never>(() => {}));
      const overrides: Partial<RedisBaseClient> =
        operation === "connect"
          ? { connect: stalled }
          : operation === "get"
            ? { get: stalled }
            : operation === "set"
              ? { set: stalled }
              : { unlink: stalled };
      const fake = createClient(overrides);
      const owner = createRedisCharacterSearchCacheOwner({
        config,
        createClient: () => fake.client,
      });

      const result =
        operation === "set"
          ? owner.cache.write({}, [summary])
          : operation === "unlink"
            ? owner.cache.unlink({})
            : owner.cache.read({});
      const rejected = expect(result).rejects.toBeInstanceOf(Error);

      await vi.advanceTimersByTimeAsync(config.operationTimeoutMs);
      await rejected;
      expect(stalled).toHaveBeenCalledOnce();
    },
  );
});
