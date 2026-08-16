import { createRequire } from "node:module";

interface DataTypeBoundary {
  readonly INTEGER: unknown;
  readonly TEXT: unknown;
  readonly BOOLEAN: unknown;
  readonly DATE: unknown;
}

interface SequelizeRuntimeBoundary {
  readonly DataTypes: DataTypeBoundary;
}

interface ModelBoundary {
  readonly hasMany: (
    target: ModelBoundary,
    options: Readonly<Record<string, unknown>>,
  ) => unknown;
  readonly belongsTo: (
    target: ModelBoundary,
    options: Readonly<Record<string, unknown>>,
  ) => unknown;
}

interface SequelizeDefinitionBoundary {
  readonly define: (
    modelName: string,
    attributes: Readonly<Record<string, Readonly<Record<string, unknown>>>>,
    options: Readonly<Record<string, unknown>>,
  ) => ModelBoundary;
}

const require = createRequire(import.meta.url);
const sequelizeRuntime = require("sequelize") as unknown;

function loadDataTypes(): DataTypeBoundary {
  if (
    (typeof sequelizeRuntime !== "object" &&
      typeof sequelizeRuntime !== "function") ||
    sequelizeRuntime === null
  ) {
    throw new Error("SEQUELIZE_RUNTIME_INVALID");
  }
  const dataTypes = (sequelizeRuntime as Partial<SequelizeRuntimeBoundary>)
    .DataTypes;
  if (
    typeof dataTypes !== "object" ||
    dataTypes === null ||
    dataTypes.INTEGER === undefined ||
    dataTypes.TEXT === undefined ||
    dataTypes.BOOLEAN === undefined ||
    dataTypes.DATE === undefined
  ) {
    throw new Error("SEQUELIZE_RUNTIME_INVALID");
  }
  return dataTypes;
}

export function createSequelizePersistenceAdapter(options: {
  readonly sequelize: SequelizeDefinitionBoundary;
  readonly schema: string;
}): { readonly models: { readonly Character: ModelBoundary; readonly Comment: ModelBoundary } } {
  const { sequelize, schema } = options;
  const DataTypes = loadDataTypes();
  const Character = sequelize.define(
    "Character",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        field: "id",
      },
      name: { type: DataTypes.TEXT, allowNull: false, field: "name" },
      status: { type: DataTypes.TEXT, allowNull: false, field: "status" },
      species: { type: DataTypes.TEXT, allowNull: false, field: "species" },
      characterType: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "character_type",
      },
      gender: { type: DataTypes.TEXT, allowNull: false, field: "gender" },
      originName: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "origin_name",
      },
      originUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "origin_url",
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "image_url",
      },
      isFavorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_favorite",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
      },
    },
    {
      tableName: "characters",
      schema,
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  );

  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      characterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "character_id",
      },
      body: { type: DataTypes.TEXT, allowNull: false, field: "body" },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
      },
    },
    {
      tableName: "comments",
      schema,
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  );

  Character.hasMany(Comment, {
    as: "comments",
    foreignKey: "characterId",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  });
  Comment.belongsTo(Character, {
    as: "character",
    foreignKey: "characterId",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  });

  return { models: { Character, Comment } };
}
