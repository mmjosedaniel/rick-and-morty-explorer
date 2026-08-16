import type { MigrationTargetState } from "./files/context.js";
import {
  inspectWithMigrationFactory,
  prepareWithMigrationFactory,
  revertWithMigrationFactory,
} from "./files/factory.js";
import type { MigrationRollbackSelector } from "./files/factory.js";
import type { MigrationManifest } from "./files/manifest.js";

export async function runMigrationUp(options: {
  readonly target: MigrationTargetState;
  readonly manifest: MigrationManifest;
  readonly lockTimeoutMs: number;
}): Promise<Awaited<ReturnType<typeof prepareWithMigrationFactory>>> {
  return prepareWithMigrationFactory({
    target: options.target,
    manifest: options.manifest,
    artifactRoot: new URL("./", import.meta.url),
    lockTimeoutMs: options.lockTimeoutMs,
  });
}

export async function runMigrationStatus(options: {
  readonly target: MigrationTargetState;
  readonly manifest: MigrationManifest;
  readonly lockTimeoutMs: number;
}): Promise<Awaited<ReturnType<typeof inspectWithMigrationFactory>>> {
  return inspectWithMigrationFactory({
    target: options.target,
    manifest: options.manifest,
    artifactRoot: new URL("./", import.meta.url),
    lockTimeoutMs: options.lockTimeoutMs,
  });
}

export async function runMigrationDown(options: {
  readonly target: MigrationTargetState;
  readonly manifest: MigrationManifest;
  readonly lockTimeoutMs: number;
  readonly selector?: MigrationRollbackSelector;
}): Promise<Awaited<ReturnType<typeof revertWithMigrationFactory>>> {
  const input = {
    target: options.target,
    manifest: options.manifest,
    artifactRoot: new URL("./", import.meta.url),
    lockTimeoutMs: options.lockTimeoutMs,
  };
  return options.selector === undefined
    ? revertWithMigrationFactory(input)
    : revertWithMigrationFactory({ ...input, selector: options.selector });
}
