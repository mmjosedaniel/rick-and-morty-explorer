import type { MigrationContext, MigrationDefinition } from "./context.js";
import type { MigrationManifest } from "./manifest.js";
import { MigrationLifecycleError } from "./errors.js";

function isMigrationDefinition(value: unknown): value is MigrationDefinition {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return typeof candidate.up === "function" && typeof candidate.down === "function";
}

export async function resolveMigrations(
  manifest: MigrationManifest,
  artifactRoot: URL,
): Promise<{
  readonly name: string;
  readonly path: string;
  readonly up: (options: { readonly context: MigrationContext }) => Promise<void>;
  readonly down: (options: { readonly context: MigrationContext }) => Promise<void>;
}[]> {
  const migrations: {
    readonly name: string;
    readonly path: string;
    readonly up: (options: { readonly context: MigrationContext }) => Promise<void>;
    readonly down: (options: { readonly context: MigrationContext }) => Promise<void>;
  }[] = [];
  for (const mapping of manifest.mappings) {
    const module = (await import(new URL(mapping.emittedPath, artifactRoot).href)) as Record<
      string,
      unknown
    >;
    const definition = module.migration;
    if (!isMigrationDefinition(definition)) {
      throw new MigrationLifecycleError("MIGRATION_MODULE_INVALID");
    }
    migrations.push({
      name: mapping.migrationId,
      path: mapping.emittedPath,
      up: async ({ context }) => definition.up({ context }),
      down: async ({ context }) => definition.down({ context }),
    });
  }
  return migrations;
}
