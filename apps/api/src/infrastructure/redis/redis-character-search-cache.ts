import { createClient as createRedisClient } from "@redis/client";

import {
  buildCharacterSearchCacheKey,
  encodeCharacterSummaries,
  type CharacterSearchCache,
} from "../../application/characters/character-search-cache.js";
import type {
  CharacterSummary,
  NormalizedCharacterFilter,
} from "../../application/characters/character-read-service.js";
import type { RedisRuntimeConfig } from "../../config.js";

const CLIENT_ERROR = "CHARACTER_SEARCH_CACHE_CLIENT_ERROR\n";
const SEARCH_KEY_DIGEST_PATTERN = /^[0-9a-f]{64}$/;
const MAX_SCAN_PAGES = 1_000;

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
  destroy?(): void;
  withAbortSignal?(signal: AbortSignal): RedisBaseClient;
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
  destroy?(): void;
  withAbortSignal?(signal: AbortSignal): RedisInvalidationClient;
}

export interface RedisCharacterSearchCacheOwner {
  readonly cache: CharacterSearchCache;
  close(): Promise<void>;
}

export interface RedisCharacterSearchInvalidationOwner {
  invalidate(): Promise<void>;
  close(): Promise<void>;
}

class RedisOperationTimeoutError extends Error {
  constructor() {
    super("REDIS_OPERATION_TIMEOUT");
  }
}

async function withTimeout<T>(
  operation: () => Promise<T>,
  timeoutMs: number,
  onTimeout: () => void,
): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const timeoutResult = new Promise<never>((_resolve, reject) => {
    timeout = setTimeout(() => {
      onTimeout();
      reject(new RedisOperationTimeoutError());
    }, timeoutMs);
  });

  try {
    return await Promise.race([operation(), timeoutResult]);
  } finally {
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
  }
}

function createDefaultClient(options: RedisClientOptions): RedisBaseClient {
  return createRedisClient(options) as unknown as RedisBaseClient;
}

function createDefaultInvalidationClient(
  options: RedisClientOptions,
): RedisInvalidationClient {
  return createRedisClient(options) as unknown as RedisInvalidationClient;
}

export function createRedisCharacterSearchCacheOwner(options: {
  readonly config: RedisRuntimeConfig;
  readonly createClient?: (options: RedisClientOptions) => RedisBaseClient;
  readonly writeWarning?: (diagnostic: string) => void;
}): RedisCharacterSearchCacheOwner {
  const createClient = options.createClient ?? createDefaultClient;
  const writeWarning =
    options.writeWarning ??
    ((diagnostic: string) => process.stderr.write(diagnostic));
  let client: RedisBaseClient | undefined;
  let connection: Promise<void> | undefined;
  let connected = false;
  let unusable = false;
  let closePromise: Promise<void> | undefined;

  function destroyClient(): void {
    unusable = true;
    connected = false;
    try {
      client?.destroy?.();
    } catch {
      // The client may already have closed after a connection failure.
    }
  }

  function getClient(): RedisBaseClient {
    if (client === undefined) {
      client = createClient({
        socket: {
          host: options.config.host,
          port: options.config.port,
          connectTimeout: options.config.operationTimeoutMs,
          reconnectStrategy: false,
        },
        disableOfflineQueue: true,
      });
      client.on("error", () => {
        writeWarning(CLIENT_ERROR);
      });
    }

    return client;
  }

  function connectOnce(): Promise<void> {
    if (connection === undefined) {
      const baseClient = getClient();
      connection = withTimeout(
        () => baseClient.connect(),
        options.config.operationTimeoutMs,
        destroyClient,
      ).then(() => {
        connected = true;
      });
      void connection.catch(() => {
        unusable = true;
        connected = false;
      });
    }

    return connection;
  }

  async function runCommand<T>(
    command: (commandClient: RedisBaseClient) => Promise<T>,
  ): Promise<T> {
    await connectOnce();
    if (unusable) {
      throw new Error("REDIS_CLIENT_UNUSABLE");
    }

    const baseClient = getClient();
    const abortController = new AbortController();
    const commandClient =
      baseClient.withAbortSignal?.(abortController.signal) ?? baseClient;
    return withTimeout(
      () => command(commandClient),
      options.config.operationTimeoutMs,
      () => {
        abortController.abort();
        destroyClient();
      },
    );
  }

  function buildKey(filter: NormalizedCharacterFilter): string {
    return buildCharacterSearchCacheKey(options.config.namespace, filter);
  }

  const cache: CharacterSearchCache = {
    read: (filter) => runCommand((active) => active.get(buildKey(filter))),
    write: (filter, summaries: readonly CharacterSummary[]) =>
      runCommand((active) =>
        active.set(buildKey(filter), encodeCharacterSummaries(summaries), {
          EX: options.config.searchTtlSeconds,
        }),
      ).then(() => undefined),
    unlink: (filter) =>
      runCommand((active) => active.unlink(buildKey(filter))).then(
        () => undefined,
      ),
  };

  return {
    cache,
    close: () => {
      closePromise ??= (async () => {
        if (client === undefined) {
          return;
        }

        if (connection !== undefined) {
          try {
            await connection;
          } catch {
            return;
          }
        }

        if (!connected) {
          return;
        }

        await withTimeout(
          () => client!.close(),
          options.config.operationTimeoutMs,
          destroyClient,
        );
        connected = false;
      })();

      return closePromise;
    },
  };
}

export function createRedisCharacterSearchInvalidationOwner(options: {
  readonly config: RedisRuntimeConfig;
  readonly createClient?: (
    options: RedisClientOptions,
  ) => RedisInvalidationClient;
  readonly writeWarning?: (diagnostic: string) => void;
}): RedisCharacterSearchInvalidationOwner {
  const createClient = options.createClient ?? createDefaultInvalidationClient;
  const writeWarning =
    options.writeWarning ??
    ((diagnostic: string) => process.stderr.write(diagnostic));
  const searchPrefix = `${options.config.namespace}:characters:search:v1:`;
  let client: RedisInvalidationClient | undefined;
  let connection: Promise<void> | undefined;
  let connected = false;
  let unusable = false;
  let closePromise: Promise<void> | undefined;

  function destroyClient(): void {
    unusable = true;
    connected = false;
    try {
      client?.destroy?.();
    } catch {
      // The client may already have closed after a connection failure.
    }
  }

  function getClient(): RedisInvalidationClient {
    if (client === undefined) {
      client = createClient({
        socket: {
          host: options.config.host,
          port: options.config.port,
          connectTimeout: options.config.operationTimeoutMs,
          reconnectStrategy: false,
        },
        disableOfflineQueue: true,
      });
      client.on("error", () => {
        writeWarning(CLIENT_ERROR);
      });
    }

    return client;
  }

  function connectOnce(): Promise<void> {
    if (connection === undefined) {
      const baseClient = getClient();
      connection = withTimeout(
        () => baseClient.connect(),
        options.config.operationTimeoutMs,
        destroyClient,
      ).then(() => {
        connected = true;
      });
      void connection.catch(() => {
        unusable = true;
        connected = false;
      });
    }

    return connection;
  }

  async function runCommand<T>(
    command: (commandClient: RedisInvalidationClient) => Promise<T>,
  ): Promise<T> {
    await connectOnce();
    if (unusable) {
      throw new Error("REDIS_CLIENT_UNUSABLE");
    }

    const baseClient = getClient();
    const abortController = new AbortController();
    const commandClient =
      baseClient.withAbortSignal?.(abortController.signal) ?? baseClient;
    return withTimeout(
      () => command(commandClient),
      options.config.operationTimeoutMs,
      () => {
        abortController.abort();
        destroyClient();
      },
    );
  }

  return {
    invalidate: async () => {
      let cursor = "0";
      let scannedPages = 0;
      const visitedCursors = new Set<string>();

      do {
        visitedCursors.add(cursor);
        const page = await runCommand((active) =>
          active.scan(cursor, {
            MATCH: `${searchPrefix}*`,
            COUNT: 100,
          }),
        );
        scannedPages += 1;
        const ownedKeys = page.keys.filter((key) => {
          if (!key.startsWith(searchPrefix)) {
            return false;
          }

          return SEARCH_KEY_DIGEST_PATTERN.test(key.slice(searchPrefix.length));
        });
        if (ownedKeys.length > 0) {
          await runCommand((active) => active.unlink(ownedKeys));
        }

        if (page.cursor !== "0" && visitedCursors.has(page.cursor)) {
          throw new Error("REDIS_SCAN_CURSOR_NOT_PROGRESSING");
        }
        if (page.cursor !== "0" && scannedPages >= MAX_SCAN_PAGES) {
          throw new Error("REDIS_SCAN_PAGE_LIMIT_EXCEEDED");
        }
        cursor = page.cursor;
      } while (cursor !== "0");
    },
    close: () => {
      closePromise ??= (async () => {
        if (client === undefined) {
          return;
        }

        if (connection !== undefined) {
          try {
            await connection;
          } catch {
            return;
          }
        }

        if (!connected) {
          return;
        }

        await withTimeout(
          () => client!.close(),
          options.config.operationTimeoutMs,
          destroyClient,
        );
        connected = false;
      })();

      return closePromise;
    },
  };
}
