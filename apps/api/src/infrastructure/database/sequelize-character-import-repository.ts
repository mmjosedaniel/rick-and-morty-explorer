interface CharacterImportRecord {
  readonly id: number;
  readonly name: string;
  readonly status: string;
  readonly species: string;
  readonly characterType: string;
  readonly gender: string;
  readonly originName: string;
  readonly originUrl: string;
  readonly imageUrl: string;
}

interface SequelizeImportBoundary {
  query(
    sql: string,
    options: {
      readonly bind: readonly unknown[];
      readonly transaction: object;
    },
  ): Promise<readonly [unknown, unknown]>;
  transaction<T>(body: (transaction: object) => Promise<T>): Promise<T>;
}

interface CharacterImportRepository {
  publishCharacters(records: readonly CharacterImportRecord[]): Promise<void>;
}

const schemaPattern = /^[a-z][a-z0-9_]{0,62}$/u;

function assertSchema(schema: string): void {
  if (
    !schemaPattern.test(schema) ||
    schema.startsWith("pg_") ||
    schema === "information_schema"
  ) {
    throw new Error("POSTGRES_SCHEMA_INVALID");
  }
}

function buildValuesClause(recordCount: number): string {
  return Array.from({ length: recordCount }, (_, recordIndex) => {
    const firstParameter = recordIndex * 9 + 1;
    const parameters = Array.from(
      { length: 9 },
      (_, fieldIndex) => `$${firstParameter + fieldIndex}`,
    );
    return `(${parameters.join(", ")})`;
  }).join(", ");
}

function buildBindings(
  records: readonly CharacterImportRecord[],
): readonly unknown[] {
  return records.flatMap((record) => [
    record.id,
    record.name,
    record.status,
    record.species,
    record.characterType,
    record.gender,
    record.originName,
    record.originUrl,
    record.imageUrl,
  ]);
}

export function createSequelizeCharacterImportRepository(options: {
  readonly sequelize: SequelizeImportBoundary;
  readonly schema: string;
}): CharacterImportRepository {
  const { sequelize, schema } = options;
  assertSchema(schema);

  return {
    async publishCharacters(
      records: readonly CharacterImportRecord[],
    ): Promise<void> {
      await sequelize.transaction(async (transaction) => {
        await sequelize.query(
          `INSERT INTO "${schema}"."characters" (
             "id", "name", "status", "species", "character_type", "gender",
             "origin_name", "origin_url", "image_url"
           ) VALUES ${buildValuesClause(records.length)}
           ON CONFLICT ("id") DO UPDATE SET
             "name" = EXCLUDED."name",
             "status" = EXCLUDED."status",
             "species" = EXCLUDED."species",
             "character_type" = EXCLUDED."character_type",
             "gender" = EXCLUDED."gender",
             "origin_name" = EXCLUDED."origin_name",
             "origin_url" = EXCLUDED."origin_url",
             "image_url" = EXCLUDED."image_url",
             "updated_at" = CURRENT_TIMESTAMP`,
          {
            bind: buildBindings(records),
            transaction,
          },
        );
      });
    },
  };
}
