import type { CharacterInteractionRepository } from "../../application/characters/character-interaction-service.js";
import type {
  CharacterComment,
  CharacterDetail,
} from "../../application/characters/character-read-service.js";

interface SequelizeQueryBoundary {
  query(
    sql: string,
    options: Readonly<Record<string, unknown>>,
  ): Promise<readonly [unknown, unknown]>;
}

interface CharacterDetailRow {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
  readonly species: string;
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

function isCharacterDetailRow(value: unknown): value is CharacterDetailRow {
  if (typeof value !== "object" || value === null) return false;
  const row = value as Partial<CharacterDetailRow>;
  return (
    typeof row.id === "number" &&
    typeof row.name === "string" &&
    typeof row.imageUrl === "string" &&
    typeof row.species === "string" &&
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

function decodeDetailRows(rows: unknown): CharacterDetail | null {
  if (!Array.isArray(rows) || !rows.every(isCharacterDetailRow)) {
    throw new Error("CHARACTER_INTERACTION_DETAIL_RESULT_INVALID");
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
}

export function createSequelizeCharacterInteractionRepository(options: {
  readonly sequelize: SequelizeQueryBoundary;
  readonly schema: string;
}): CharacterInteractionRepository {
  const { sequelize, schema } = options;
  assertSchema(schema);

  return {
    setFavorite: async (
      id: number,
      isFavorite: boolean,
    ): Promise<CharacterDetail | null> => {
      const [rows] = await sequelize.query(
        `UPDATE "${schema}"."characters"
         SET "is_favorite" = $2, "updated_at" = CURRENT_TIMESTAMP
         WHERE "id" = $1
         RETURNING
           "id", "name", "image_url" AS "imageUrl", "species", "status",
           "gender", "character_type" AS "type",
           "origin_name" AS "originName", "origin_url" AS "originUrl",
           "is_favorite" AS "isFavorite"`,
        { bind: [id, isFavorite] },
      );

      return decodeDetailRows(rows);
    },
    addComment: async (
      characterId: number,
      body: string,
    ): Promise<CharacterComment | null> => {
      const [rows] = await sequelize.query(
        `INSERT INTO "${schema}"."comments" ("character_id", "body")
         SELECT $1, $2
         WHERE EXISTS (
           SELECT 1 FROM "${schema}"."characters" WHERE "id" = $1
         )
         RETURNING "id", "body"`,
        { bind: [characterId, body] },
      );

      if (!Array.isArray(rows) || !rows.every(isCharacterCommentRow)) {
        throw new Error("CHARACTER_INTERACTION_COMMENT_RESULT_INVALID");
      }
      return rows[0] ?? null;
    },
  };
}
