import type { ArtifactMapping } from "./manifest.js";
import type { MigrationContext } from "./context.js";
import { MigrationLifecycleError } from "./errors.js";

function quoteIdentifier(identifier: string): string {
  return `"${identifier.replaceAll('"', '""')}"`;
}

export async function ensureHistoryTable(
  context: MigrationContext,
): Promise<void> {
  const schema = quoteIdentifier(context.schema);
  await context.queryInterface.sequelize.query(
    `CREATE TABLE IF NOT EXISTS ${schema}.sequelize_migration_history (
       migration_id text NOT NULL,
       source_sha256 text NOT NULL,
       applied_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
       CONSTRAINT sequelize_migration_history_pkey PRIMARY KEY (migration_id)
     )`,
    { transaction: context.transaction },
  );
}

async function readHistory(
  context: MigrationContext,
  allowMissing = false,
): Promise<readonly { readonly migration_id: string; readonly source_sha256: string }[]> {
  const schema = quoteIdentifier(context.schema);
  if (allowMissing) {
    const existence = await context.queryInterface.sequelize.query(
      `SELECT pg_catalog.to_regclass($1) IS NOT NULL AS history_exists`,
      {
        bind: [`${context.schema}.sequelize_migration_history`],
        type: "SELECT",
        transaction: context.transaction,
      },
    ) as readonly { readonly history_exists: boolean }[];
    if (existence.length !== 1 || existence[0]?.history_exists !== true) {
      if (existence.length === 1 && existence[0]?.history_exists === false) {
        return [];
      }
      throw new MigrationLifecycleError("MIGRATION_HISTORY_INVALID");
    }
  }
  const result = await context.queryInterface.sequelize.query(
    `SELECT migration_id, source_sha256
       FROM ${schema}.sequelize_migration_history
      ORDER BY applied_at, migration_id`,
    { type: "SELECT", transaction: context.transaction },
  );
  return result as readonly {
    readonly migration_id: string;
    readonly source_sha256: string;
  }[];
}

export async function validateHistoryPrefix(
  context: MigrationContext,
  mappings: readonly ArtifactMapping[],
  options: { readonly allowMissing?: boolean } = {},
): Promise<readonly ArtifactMapping[]> {
  const history = await readHistory(context, options.allowMissing);
  if (history.length > mappings.length) {
    throw new MigrationLifecycleError("MIGRATION_HISTORY_INVALID");
  }
  for (const [index, row] of history.entries()) {
    const mapping = mappings[index];
    if (
      mapping === undefined ||
      row.migration_id !== mapping.migrationId ||
      row.source_sha256 !== mapping.sourceSha256
    ) {
      throw new MigrationLifecycleError("MIGRATION_HISTORY_INVALID");
    }
  }
  return mappings.slice(0, history.length);
}

export function createMigrationStorage(
  mappings: readonly ArtifactMapping[],
): {
  readonly executed: (options: { readonly context: MigrationContext }) => Promise<string[]>;
  readonly logMigration: (options: {
    readonly context: MigrationContext;
    readonly name: string;
  }) => Promise<void>;
  readonly unlogMigration: (options: {
    readonly context: MigrationContext;
    readonly name: string;
  }) => Promise<void>;
} {
  const mappingById = new Map(mappings.map((mapping) => [mapping.migrationId, mapping]));
  return {
    async executed({ context }) {
      return (await readHistory(context)).map(({ migration_id }) => migration_id);
    },
    async logMigration({ context, name }) {
      const mapping = mappingById.get(name);
      if (mapping === undefined) {
        throw new MigrationLifecycleError("MIGRATION_HISTORY_INVALID");
      }
      const schema = quoteIdentifier(context.schema);
      await context.queryInterface.sequelize.query(
        `INSERT INTO ${schema}.sequelize_migration_history
           (migration_id, source_sha256)
         VALUES ($1, $2)`,
        {
          bind: [mapping.migrationId, mapping.sourceSha256],
          transaction: context.transaction,
        },
      );
    },
    async unlogMigration({ context, name }) {
      const schema = quoteIdentifier(context.schema);
      await context.queryInterface.sequelize.query(
        `DELETE FROM ${schema}.sequelize_migration_history
          WHERE migration_id = $1`,
        { bind: [name], transaction: context.transaction },
      );
    },
  };
}
