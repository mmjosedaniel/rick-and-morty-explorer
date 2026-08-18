import { createHash } from "node:crypto";

import { describe, expect, it, vi } from "vitest";

import type { RawPgClient } from "./migrations/files/context.js";
import {
  acquireMigrationLock,
  deriveMigrationLockKey,
} from "./migrations/files/lock.js";

const lockLiteral = "rick-and-morty-explorer:migrations:v2";

function lengthPrefix(value: string): Buffer {
  const bytes = Buffer.from(value, "utf8");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(bytes.length);
  return Buffer.concat([length, bytes]);
}

function framedPayload(database: string, schema: string): Buffer {
  return Buffer.concat([
    lengthPrefix(lockLiteral),
    lengthPrefix(database),
    lengthPrefix(schema),
  ]);
}

describe("migration advisory lock identity", () => {
  it("derives the accepted v2 advisory lock vectors without numeric narrowing", () => {
    const vectors = [
      {
        database: "rick_and_morty",
        schema: "public",
        digest: "5e6b487e7bee9566d532743c03ce9f32620feae465b2c7e04fad2d88dc058e49",
        key: "6803611370155578726",
      },
      {
        database: "rick_and_morty",
        schema: "task_004_a",
        digest: "6a644eaea472bf65b14be9d0a5fed984db47bd3620633b446476e75c5d6f6d94",
        key: "7666338977681686373",
      },
      {
        database: "rickmorty",
        schema: "case_sensitive",
        digest: "63d100ca735ad0f0f795c2018299aa60b0f3b5b4835cbe317887c4c1b5af08f3",
        key: "7192530949406118128",
      },
      {
        database: "ab",
        schema: "c",
        digest: "b8e06f7ec921e2e0d23fc57ad0662d1b5b5d2b214c2450e58dab457d76cee9e9",
        key: "-5124973785616620832",
      },
      {
        database: "a",
        schema: "bc",
        digest: "38254f49a1e3e20be904178358adde1e4aa6393e76df357cd93632207170d268",
        key: "4045727017929531915",
      },
    ] as const;

    expect(Buffer.byteLength(lockLiteral, "utf8")).toBe(37);
    expect(
      framedPayload("ab", "c")
        .subarray(lengthPrefix(lockLiteral).length)
        .toString("hex"),
    ).toBe("0000000261620000000163");
    expect(
      framedPayload("a", "bc")
        .subarray(lengthPrefix(lockLiteral).length)
        .toString("hex"),
    ).toBe("0000000161000000026263");

    for (const { database, schema, digest: expectedDigest, key } of vectors) {
      const digest = createHash("sha256")
        .update(framedPayload(database, schema))
        .digest("hex");
      const actualKey = deriveMigrationLockKey(database, schema);

      if (digest !== expectedDigest || actualKey !== key) {
        throw new Error(
          `MIGRATION_LOCK_V2_VECTOR_MISMATCH database=${database} schema=${schema}`,
        );
      }
      expect(typeof actualKey).toBe("string");
      expect(actualKey).toMatch(/^-?[0-9]+$/u);
      expect(BigInt(actualKey).toString()).toBe(actualKey);
      expect(
        BigInt(actualKey) < 0n ? -BigInt(actualKey) : BigInt(actualKey),
      ).toBeGreaterThan(9_007_199_254_740_991n);
    }
  });

  it("polls one dedicated connection sequentially on the monotonic deadline", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "performance"] });
    try {
      const startedAt = performance.now();
      const outcomes = [false, false, true];
      const requests: Parameters<RawPgClient["query"]>[0][] = [];
      const elapsed: number[] = [];
      const callOrder: string[] = [];
      let activeQueries = 0;
      let maxActiveQueries = 0;

      const client: RawPgClient = {
        query: async (request) => {
          const call = requests.length + 1;
          activeQueries += 1;
          maxActiveQueries = Math.max(maxActiveQueries, activeQueries);
          callOrder.push(`query:${call}:start`);
          requests.push(request);
          elapsed.push(performance.now() - startedAt);
          try {
            return {
              command: "SELECT",
              fields: [{ name: "acquired", dataTypeID: 16 }],
              rows: [[outcomes[call - 1]]],
            };
          } finally {
            activeQueries -= 1;
            callOrder.push(`query:${call}:end`);
          }
        },
      };

      let operationFailure: unknown;
      const acquisition = acquireMigrationLock(client, "6803611370155578726", 250).catch(
        (error: unknown) => {
          operationFailure = error;
        },
      );
      await vi.advanceTimersByTimeAsync(100);
      await vi.advanceTimersByTimeAsync(100);
      await acquisition;
      const completedAt = performance.now() - startedAt;
      const timeouts = requests.map(({ query_timeout }) => query_timeout);

      console.info(
        `MIGRATION_LOCK_POLLING_OBSERVED calls=${requests.length} elapsed=${elapsed.join(",")} timeouts=${timeouts.join(",")} maxActive=${maxActiveQueries} completed=${completedAt}`,
      );
      try {
        expect(operationFailure).toBeUndefined();
        expect(maxActiveQueries).toBe(1);
        expect(activeQueries).toBe(0);
        expect(elapsed).toEqual([0, 100, 200]);
        expect(completedAt).toBe(200);
        expect(completedAt).toBeLessThan(250);
        expect(callOrder).toEqual([
          "query:1:start",
          "query:1:end",
          "query:2:start",
          "query:2:end",
          "query:3:start",
          "query:3:end",
        ]);
        expect(requests).toEqual(
          [250, 150, 50].map((queryTimeout) => ({
            text: `SELECT pg_catalog.pg_try_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
) AS acquired`,
            values: ["6803611370155578726"],
            rowMode: "array",
            query_timeout: queryTimeout,
          })),
        );
      } catch {
        throw new Error("MIGRATION_LOCK_POLLING_CONTRACT_MISSING");
      }
    } finally {
      vi.useRealTimers();
    }
  });

  it("enforces the exact default and timeout range before lock SQL", async () => {
    vi.useFakeTimers({ toFake: ["performance"] });
    try {
      const lockKey = "6803611370155578726";
      const admittedTimeouts: number[] = [];
      const admittedClient: RawPgClient = {
        query: async ({ query_timeout }) => {
          if (query_timeout !== undefined) {
            admittedTimeouts.push(query_timeout);
          }
          return {
            command: "SELECT",
            fields: [{ name: "acquired", dataTypeID: 16 }],
            rows: [[true]],
          };
        },
      };
      const admittedCases = [
        { caseName: "default", expected: 5000, timeout: undefined },
        { caseName: "lower-bound", expected: 1, timeout: 1 },
        { caseName: "upper-bound", expected: 60_000, timeout: 60_000 },
      ] as const;

      for (const { caseName, expected, timeout } of admittedCases) {
        let operationFailure: unknown;
        try {
          if (timeout === undefined) {
            await acquireMigrationLock(admittedClient, lockKey);
          } else {
            await acquireMigrationLock(admittedClient, lockKey, timeout);
          }
        } catch (error) {
          operationFailure = error;
        }
        if (
          operationFailure !== undefined ||
          admittedTimeouts.at(-1) !== expected
        ) {
          throw new Error(
            `MIGRATION_LOCK_TIMEOUT_RANGE_CONTRACT_MISSING case=${caseName}`,
          );
        }
      }

      let invalidQueryCalls = 0;
      const invalidClient: RawPgClient = {
        query: async () => {
          invalidQueryCalls += 1;
          return {
            command: "SELECT",
            fields: [{ name: "acquired", dataTypeID: 16 }],
            rows: [[true]],
          };
        },
      };
      const invalidCases = [
        { caseName: "zero", timeout: 0 },
        { caseName: "negative", timeout: -1 },
        { caseName: "above-upper-bound", timeout: 60_001 },
        { caseName: "fractional", timeout: 1.5 },
        { caseName: "nan", timeout: Number.NaN },
        { caseName: "positive-infinity", timeout: Number.POSITIVE_INFINITY },
      ] as const;

      for (const { caseName, timeout } of invalidCases) {
        let rejection: unknown;
        try {
          await acquireMigrationLock(invalidClient, lockKey, timeout);
        } catch (error) {
          rejection = error;
        }
        if (
          !(rejection instanceof Error) ||
          rejection.message !== "MIGRATION_STARTUP_CONFIG_INVALID" ||
          (rejection as Error & { readonly result?: unknown }).result !== 1 ||
          invalidQueryCalls !== 0
        ) {
          throw new Error(
            `MIGRATION_LOCK_TIMEOUT_RANGE_CONTRACT_MISSING case=${caseName}`,
          );
        }
      }

      expect(admittedTimeouts).toEqual([5000, 1, 60_000]);
      expect(invalidQueryCalls).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it("classifies the pg query-timeout callback at the lock deadline", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "performance"] });
    try {
      const lockKey = "6803611370155578726";
      const startedAt = performance.now();
      const requests: Parameters<RawPgClient["query"]>[0][] = [];
      let settledAt: number | undefined;
      const client: RawPgClient = {
        query: (request) => {
          requests.push(request);
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              settledAt = performance.now() - startedAt;
              reject(new Error("Query read timeout"));
            }, 249);
          });
        },
      };

      let rejection: unknown;
      const acquisition = acquireMigrationLock(client, lockKey, 250).catch(
        (error: unknown) => {
          rejection = error;
        },
      );
      await vi.advanceTimersByTimeAsync(249);
      await acquisition;

      const unrelatedError = new Error("connection failed before deadline");
      const unrelatedClient: RawPgClient = {
        query: async () => {
          throw unrelatedError;
        },
      };
      await expect(
        acquireMigrationLock(unrelatedClient, lockKey, 250),
      ).rejects.toBe(unrelatedError);

      expect(settledAt).toBe(249);
      expect(performance.now() - startedAt).toBe(249);
      expect(requests).toEqual([
        {
          text: `SELECT pg_catalog.pg_try_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
) AS acquired`,
          values: [lockKey],
          rowMode: "array",
          query_timeout: 250,
        },
      ]);
      expect(rejection).toBeInstanceOf(Error);
      expect(rejection).toMatchObject({
        name: "MigrationLifecycleError",
        message: "MIGRATION_LOCK_TIMEOUT",
        result: 2,
      });
      expect((rejection as Error & { readonly cause?: unknown }).cause).toBe(
        undefined,
      );
    } finally {
      vi.useRealTimers();
    }
  });

  it("rejects a true lock result delivered at the monotonic deadline", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "performance"] });
    try {
      const lockKey = "6803611370155578726";
      const startedAt = performance.now();
      const requests: Parameters<RawPgClient["query"]>[0][] = [];
      let settledAt: number | undefined;
      const client: RawPgClient = {
        query: (request) => {
          requests.push(request);
          return new Promise((resolve) => {
            setTimeout(() => {
              settledAt = performance.now() - startedAt;
              resolve({
                command: "SELECT",
                fields: [{ name: "acquired", dataTypeID: 16 }],
                rows: [[true]],
              });
            }, 250);
          });
        },
      };

      let rejection: unknown;
      const acquisition = acquireMigrationLock(client, lockKey, 250).catch(
        (error: unknown) => {
          rejection = error;
        },
      );
      await vi.advanceTimersByTimeAsync(250);
      await acquisition;

      expect(settledAt).toBe(250);
      try {
        expect(requests).toEqual([
          {
            text: `SELECT pg_catalog.pg_try_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
) AS acquired`,
            values: [lockKey],
            rowMode: "array",
            query_timeout: 250,
          },
        ]);
        expect(rejection).toBeInstanceOf(Error);
        expect(rejection).toMatchObject({
          name: "MigrationLifecycleError",
          message: "MIGRATION_LOCK_TIMEOUT",
          result: 2,
        });
        expect((rejection as Error & { readonly cause?: unknown }).cause).toBe(
          undefined,
        );
      } catch {
        throw new Error("MIGRATION_LOCK_LATE_TRUE_ACCEPTED_AT_DEADLINE");
      }
    } finally {
      vi.useRealTimers();
    }
  });
});
