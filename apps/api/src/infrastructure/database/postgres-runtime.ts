import type { Sequelize } from "sequelize";

const identifierPattern = /^[a-z][a-z0-9_]{0,62}$/u;

export interface PostgresRuntimeConfig {
  readonly database: string;
  readonly schema: string;
  readonly user: string;
  readonly password: string;
  readonly port: number;
}

export function loadPostgresRuntimeConfig(
  environment: NodeJS.ProcessEnv,
): PostgresRuntimeConfig {
  const database = environment.POSTGRES_DB ?? "rick_and_morty";
  const schema = environment.POSTGRES_SCHEMA ?? "public";
  const user = environment.POSTGRES_USER ?? "rick_and_morty";
  const password = environment.POSTGRES_PASSWORD;
  const port = Number(environment.POSTGRES_PORT ?? "5432");

  if (
    password === undefined ||
    password.length === 0 ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65_535
  ) {
    throw new Error("POSTGRES_RUNTIME_CONFIG_INVALID");
  }

  if (
    !identifierPattern.test(database) ||
    !identifierPattern.test(schema) ||
    !identifierPattern.test(user) ||
    database === "template0" ||
    database === "template1" ||
    schema.startsWith("pg_") ||
    schema === "information_schema"
  ) {
    throw new Error("POSTGRES_RUNTIME_NAMESPACE_INVALID");
  }

  return { database, schema, user, password, port };
}

export async function createPostgresSequelize(
  environment: NodeJS.ProcessEnv,
): Promise<{ readonly sequelize: Sequelize; readonly schema: string }> {
  const postgres = loadPostgresRuntimeConfig(environment);
  const { Sequelize } = await import("sequelize");
  const sequelize = new Sequelize(
    postgres.database,
    postgres.user,
    postgres.password,
    {
      dialect: "postgres",
      host: "127.0.0.1",
      port: postgres.port,
      dialectOptions: { ssl: false },
      logging: false,
      pool: { min: 0 },
    },
  );

  return { sequelize, schema: postgres.schema };
}
