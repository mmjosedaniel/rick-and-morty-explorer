import { afterEach, describe, expect, it, vi } from "vitest";

import { createRedisCharacterSearchInvalidationOwner as redisInvalidationOwnerFactory } from "./redis-character-search-cache.js";

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

interface RedisInvalidationClient {
  on(event: "error", listener: (error: unknown) => void): unknown;
  connect(): Promise<void>;
  scan(
    cursor: string,
    options: Readonly<{ MATCH: string; COUNT: number }>,
  ): Promise<{ readonly cursor: string; readonly keys: readonly string[] }>;
  unlink(keys: readonly string[]): Promise<number>;
  close(): Promise<void>;
}

interface RedisCharacterSearchInvalidationOwner {
  invalidate(): Promise<void>;
  close(): Promise<void>;
}

type CreateRedisCharacterSearchInvalidationOwner = (options: {
  readonly config: RedisRuntimeConfig;
  readonly createClient?: (
    options: RedisClientOptions,
  ) => RedisInvalidationClient;
}) => RedisCharacterSearchInvalidationOwner;

const config: RedisRuntimeConfig = {
  host: "127.0.0.1",
  port: 56400,
  namespace: "character-app:test:t007-m3-unit",
  searchTtlSeconds: 300,
  operationTimeoutMs: 25,
};

const searchPrefix = `${config.namespace}:characters:search:v1:`;
const firstDigest = "1".repeat(64);
const secondDigest = "2".repeat(64);
const thirdDigest = "3".repeat(64);
const nestedDigest = "4".repeat(64);
const nestedSearchKey =
  `${config.namespace}:characters:search:v1:foreign` +
  `:characters:search:v1:${nestedDigest}`;

async function loadOwnerFactory(): Promise<CreateRedisCharacterSearchInvalidationOwner> {
  expect(redisInvalidationOwnerFactory).toBeTypeOf("function");
  return redisInvalidationOwnerFactory as CreateRedisCharacterSearchInvalidationOwner;
}

function createClient(options: {
  readonly scan?: RedisInvalidationClient["scan"];
  readonly unlink?: RedisInvalidationClient["unlink"];
} = {}) {
  const scan = vi.fn(
    options.scan ??
      (async () => ({ cursor: "0", keys: [] as readonly string[] })),
  );
  const unlink = vi.fn(
    options.unlink ?? (async (keys: readonly string[]) => keys.length),
  );
  const connect = vi.fn(async () => {});
  const close = vi.fn(async () => {});
  const client: RedisInvalidationClient = {
    on: vi.fn(),
    connect,
    scan,
    unlink,
    close,
  };

  return { client, close, connect, scan, unlink };
}

afterEach(() => {
  vi.useRealTimers();
});

describe("TASK-007 Milestone 3 bounded Redis search invalidation", () => {
  it("iterates the exact search prefix, skips empty pages, unlinks only owned keys, and closes once", async () => {
    const createOwner = await loadOwnerFactory();
    const pages: Array<{
      readonly cursor: string;
      readonly keys: readonly string[];
    }> = [
      {
        cursor: "17",
        keys: [
          `${searchPrefix}${firstDigest}`,
          `${searchPrefix}${secondDigest}`,
        ],
      },
      {
        cursor: "9",
        keys: [] as readonly string[],
      },
      {
        cursor: "0",
        keys: [
          `${searchPrefix}${thirdDigest}`,
          `${config.namespace}:characters:detail:1`,
          nestedSearchKey,
        ],
      },
    ];
    const fake = createClient({
      scan: vi.fn(async () => pages.shift() ?? { cursor: "0", keys: [] }),
    });
    const owner = createOwner({
      config,
      createClient: () => fake.client,
    });

    await expect(owner.invalidate()).resolves.toBeUndefined();

    expect(fake.scan).toHaveBeenCalledTimes(3);
    expect(fake.scan.mock.calls.map(([cursor]) => cursor)).toEqual([
      "0",
      "17",
      "9",
    ]);
    for (const [, scanOptions] of fake.scan.mock.calls) {
      expect(scanOptions.MATCH).toBe(`${searchPrefix}*`);
      expect(scanOptions.COUNT).toBeGreaterThan(0);
    }
    expect(fake.unlink).toHaveBeenCalledTimes(2);
    expect(fake.unlink).toHaveBeenNthCalledWith(1, [
      `${searchPrefix}${firstDigest}`,
      `${searchPrefix}${secondDigest}`,
    ]);
    expect(fake.unlink).toHaveBeenNthCalledWith(2, [
      `${searchPrefix}${thirdDigest}`,
    ]);

    await Promise.all([owner.close(), owner.close()]);
    expect(fake.close).toHaveBeenCalledOnce();
  });

  it("rejects a non-progressing SCAN cursor instead of looping", async () => {
    const createOwner = await loadOwnerFactory();
    const fake = createClient({
      scan: vi.fn(async () => ({ cursor: "17", keys: [] })),
    });
    const owner = createOwner({
      config,
      createClient: () => fake.client,
    });

    await expect(owner.invalidate()).rejects.toBeInstanceOf(Error);
    expect(fake.scan).toHaveBeenCalledTimes(2);
    expect(fake.unlink).not.toHaveBeenCalled();
    await owner.close();
  });

  it("rejects after 1,000 successful SCAN pages before issuing a 1,001st SCAN", async () => {
    const createOwner = await loadOwnerFactory();
    let pageNumber = 0;
    const fake = createClient({
      scan: vi.fn(async () => {
        pageNumber += 1;
        return {
          cursor: pageNumber <= 1_000 ? String(pageNumber) : "0",
          keys: [] as readonly string[],
        };
      }),
    });
    const owner = createOwner({
      config,
      createClient: () => fake.client,
    });

    await expect(owner.invalidate()).rejects.toBeInstanceOf(Error);
    expect(fake.scan).toHaveBeenCalledTimes(1_000);
    expect(fake.unlink).not.toHaveBeenCalled();
    await owner.close();
  });

  it.each(["scan", "unlink"] as const)(
    "bounds a stalled %s operation",
    async (operation) => {
      vi.useFakeTimers();
      const createOwner = await loadOwnerFactory();
      const stalled = vi.fn(() => new Promise<never>(() => {}));
      const fake = createClient(
        operation === "scan"
          ? { scan: stalled }
          : {
              scan: vi.fn(async () => ({
                cursor: "0",
                keys: [`${searchPrefix}${firstDigest}`],
              })),
              unlink: stalled,
            },
      );
      const owner = createOwner({
        config,
        createClient: () => fake.client,
      });

      const result = owner.invalidate();
      const rejected = expect(result).rejects.toBeInstanceOf(Error);
      await vi.advanceTimersByTimeAsync(config.operationTimeoutMs);
      await rejected;
      expect(stalled).toHaveBeenCalledOnce();
    },
  );
});
