import type {
  CharacterComment,
  CharacterDetail,
  CharacterReadRepository,
  CharacterSummary,
  CommentPage,
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

interface CharacterDetailRow extends CharacterRow {
  readonly status: string;
  readonly gender: string;
  readonly type: string;
  readonly originName: string;
  readonly originUrl: string;
  readonly isFavorite: boolean;
}

interface CharacterCommentRow {
  readonly id: number;
  readonly body: string;
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

function isCharacterDetailRow(value: unknown): value is CharacterDetailRow {
  if (!isCharacterRow(value)) return false;
  const row = value as Partial<CharacterDetailRow>;
  return (
    typeof row.status === "string" &&
    typeof row.gender === "string" &&
    typeof row.type === "string" &&
    typeof row.originName === "string" &&
    typeof row.originUrl === "string" &&
    typeof row.isFavorite === "boolean"
  );
}

function isCharacterCommentRow(value: unknown): value is CharacterCommentRow {
  if (typeof value !== "object" || value === null) return false;
  const row = value as Partial<CharacterCommentRow>;
  return typeof row.id === "number" && typeof row.body === "string";
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
    findDetail: async (id: number): Promise<CharacterDetail | null> => {
      const [rows] = await sequelize.query(
        `SELECT
           "id", "name", "image_url" AS "imageUrl", "species", "status",
           "gender", "character_type" AS "type",
           "origin_name" AS "originName", "origin_url" AS "originUrl",
           "is_favorite" AS "isFavorite"
         FROM "${schema}"."characters"
         WHERE "id" = $1`,
        { bind: [id] },
      );

      if (!Array.isArray(rows) || !rows.every(isCharacterDetailRow)) {
        throw new Error("CHARACTER_DETAIL_RESULT_INVALID");
      }
      const row = rows[0];
      return row === undefined
        ? null
        : {
            id: row.id,
            name: row.name,
            imageUrl: row.imageUrl,
            species: row.species,
            status: row.status,
            gender: row.gender,
            type: row.type,
            origin: { name: row.originName, url: row.originUrl },
            isFavorite: row.isFavorite,
          };
    },
    listComments: async (
      characterId: number,
      page: CommentPage,
    ): Promise<readonly CharacterComment[]> => {
      const [rows] = await sequelize.query(
        `SELECT "id", "body"
         FROM "${schema}"."comments"
         WHERE "character_id" = $1
         ORDER BY "created_at" DESC, "id" DESC
         LIMIT $2 OFFSET $3`,
        { bind: [characterId, page.limit, page.offset] },
      );
      if (!Array.isArray(rows) || !rows.every(isCharacterCommentRow)) {
        throw new Error("CHARACTER_COMMENT_RESULT_INVALID");
      }
      return rows;
    },
  };
}
