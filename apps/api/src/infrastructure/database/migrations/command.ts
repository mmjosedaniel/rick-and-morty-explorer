import type { MigrationTargetState } from "./files/context.js";
import type { MigrationRollbackSelector } from "./files/factory.js";
import type { MigrationManifest } from "./files/manifest.js";
import {
  runMigrationDown,
  runMigrationStatus,
  runMigrationUp,
} from "./runner.js";

interface MigrationCommandBase {
  readonly target: MigrationTargetState;
  readonly manifest: MigrationManifest;
  readonly lockTimeoutMs: number;
}

export type MigrationCommandOptions = MigrationCommandBase &
  (
    | { readonly operation: "up" }
    | { readonly operation: "status" }
    | {
        readonly operation: "down";
        readonly selector?: MigrationRollbackSelector;
      }
  );

export async function runMigrationCommand(options: MigrationCommandOptions) {
  if (options.operation === "up") {
    return runMigrationUp(options);
  }
  if (options.operation === "status") {
    return runMigrationStatus(options);
  }
  return options.selector === undefined
    ? runMigrationDown({
        target: options.target,
        manifest: options.manifest,
        lockTimeoutMs: options.lockTimeoutMs,
      })
    : runMigrationDown({
        target: options.target,
        manifest: options.manifest,
        lockTimeoutMs: options.lockTimeoutMs,
        selector: options.selector,
      });
}
