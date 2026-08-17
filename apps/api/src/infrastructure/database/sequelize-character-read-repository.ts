import type {
  CharacterReadRepository,
  CharacterSummary,
  NormalizedCharacterFilter,
} from "../../application/characters/character-read-service.js";

interface SequelizeQueryBoundary {
  query(
    sql: string,
    options: Readonly<Record<string, unknown>>,
  ): Promise<readonly [unknown, unknown]>;
}

interface CharacterRow {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
  readonly species: string;
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

function isCharacterRow(value: unknown): value is CharacterRow {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const row = value as Partial<CharacterRow>;
  return (
    typeof row.id === "number" &&
    typeof row.name === "string" &&
    typeof row.imageUrl === "string" &&
    typeof row.species === "string"
  );
}

export function createSequelizeCharacterReadRepository(options: {
  readonly sequelize: SequelizeQueryBoundary;
  readonly schema: string;
}): CharacterReadRepository {
  const { sequelize, schema } = options;
  assertSchema(schema);

  return {
    search: async (
      filter: NormalizedCharacterFilter | undefined,
    ): Promise<readonly CharacterSummary[]> => {
      const [rows] = await sequelize.query(
        `SELECT
           "id",
           "name",
           "image_url" AS "imageUrl",
           "species"
         FROM "${schema}"."characters"
         WHERE ($1::text IS NULL OR LOWER("status") = LOWER($1))
           AND ($2::text IS NULL OR POSITION(LOWER($2) IN LOWER("species")) > 0)
           AND ($3::text IS NULL OR LOWER("gender") = LOWER($3))
           AND ($4::text IS NULL OR POSITION(LOWER($4) IN LOWER("name")) > 0)
           AND ($5::text IS NULL OR POSITION(LOWER($5) IN LOWER("origin_name")) > 0)`,
        {
          bind: [
            filter?.status ?? null,
            filter?.species ?? null,
            filter?.gender ?? null,
            filter?.name ?? null,
            filter?.origin ?? null,
          ],
        },
      );

      if (!Array.isArray(rows) || !rows.every(isCharacterRow)) {
        throw new Error("CHARACTER_READ_RESULT_INVALID");
      }

      return rows;
    },
  };
}
