import { createHash } from "node:crypto";

import { migrationLockLiteral } from "./constants.js";
import type { RawPgClient } from "./context.js";
import { MigrationLifecycleError } from "./errors.js";

function lp(value: string): Buffer {
  const bytes = Buffer.from(value, "utf8");
  const framed = Buffer.allocUnsafe(4 + bytes.length);
  framed.writeUInt32BE(bytes.length, 0);
  bytes.copy(framed, 4);
  return framed;
}

export function deriveMigrationLockKey(database: string, schema: string): string {
  const digest = createHash("sha256")
    .update(Buffer.concat([lp(migrationLockLiteral), lp(database), lp(schema)]))
    .digest();
  const unsigned = digest.readBigUInt64BE(0);
  const signed = unsigned < (1n << 63n) ? unsigned : unsigned - (1n << 64n);
  return signed.toString(10);
}

export async function acquireMigrationLock(
  client: RawPgClient,
  lockKey: string,
  timeoutMs = 5000,
): Promise<void> {
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 60_000) {
    throw new MigrationLifecycleError("MIGRATION_STARTUP_CONFIG_INVALID");
  }
  const deadline = performance.now() + timeoutMs;
  for (;;) {
    const remainingMs = deadline - performance.now();
    if (remainingMs <= 0) {
      throw new MigrationLifecycleError("MIGRATION_LOCK_TIMEOUT", 2);
    }
    let result: Awaited<ReturnType<RawPgClient["query"]>>;
    try {
      result = await client.query({
        text: `SELECT pg_catalog.pg_try_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
) AS acquired`,
        values: [lockKey],
        rowMode: "array",
        query_timeout: Math.ceil(remainingMs),
      });
    } catch (error) {
      if (
        performance.now() >= deadline ||
        (error instanceof Error && error.message === "Query read timeout")
      ) {
        throw new MigrationLifecycleError("MIGRATION_LOCK_TIMEOUT", 2);
      }
      throw error;
    }
    if (performance.now() >= deadline) {
      throw new MigrationLifecycleError("MIGRATION_LOCK_TIMEOUT", 2);
    }
    const row = result.rows[0];
    if (
      result.command !== "SELECT" ||
      result.fields.length !== 1 ||
      result.fields[0]?.name !== "acquired" ||
      result.rows.length !== 1 ||
      row?.length !== 1 ||
      typeof row[0] !== "boolean"
    ) {
      throw new MigrationLifecycleError("MIGRATION_LOCK_RESULT_INVALID");
    }
    if (row[0]) {
      return;
    }
    await new Promise<void>((resolve) => setTimeout(resolve, 100));
  }
}
