import type { RawPgClient, RawPgResult } from "./context.js";
import { MigrationLifecycleError } from "./errors.js";

export interface StartupReport {
  readonly startupClientEncoding: "UTF8";
  readonly startupSearchPath: "pg_catalog";
  readonly serverEncoding: "UTF8";
  readonly serverVersionNum: 180006;
  readonly currentUserName: string;
  readonly maxIdentifierLength: 63;
  readonly databaseIsTemplate: false;
  readonly databaseAllowsConnections: true;
}

const preflightSql = `SELECT
  CAST(
    pg_catalog.current_setting(
      CAST('client_encoding' AS pg_catalog.text)
    )
    AS pg_catalog.text
  ) AS startup_client_encoding,
  CAST(
    pg_catalog.current_setting(
      CAST('search_path' AS pg_catalog.text)
    )
    AS pg_catalog.text
  ) AS startup_search_path,
  CAST(
    pg_catalog.pg_encoding_to_char(d.encoding)
    AS pg_catalog.text
  ) AS server_encoding,
  CAST(
    pg_catalog.current_setting(
      CAST('server_version_num' AS pg_catalog.text)
    )
    AS pg_catalog.int4
  ) AS server_version_num,
  CAST(CURRENT_USER AS pg_catalog.text) AS current_user_name,
  CAST(
    pg_catalog.current_setting(
      CAST('max_identifier_length' AS pg_catalog.text)
    )
    AS pg_catalog.int4
  ) AS max_identifier_length,
  d.datistemplate AS database_is_template,
  d.datallowconn AS database_allows_connections
FROM pg_catalog.pg_database AS d
WHERE d.datname
  OPERATOR(pg_catalog.=)
  pg_catalog.current_database()`;

const bindSql = `SELECT
  CAST(d.datname AS pg_catalog.text) AS database_name,
  CAST(n.nspname AS pg_catalog.text) AS schema_name
FROM pg_catalog.pg_database AS d
CROSS JOIN pg_catalog.pg_namespace AS n
WHERE (
  CAST(d.datname AS pg_catalog.text)
    OPERATOR(pg_catalog.=)
  CAST(pg_catalog.current_database() AS pg_catalog.text)
)
AND (
  CAST(d.datname AS pg_catalog.text)
    OPERATOR(pg_catalog.=)
  CAST($1 AS pg_catalog.text)
)
AND (
  CAST(n.nspname AS pg_catalog.text)
    OPERATOR(pg_catalog.=)
  CAST($2 AS pg_catalog.text)
)`;

function hasFields(
  result: RawPgResult,
  expected: readonly (readonly [string, number])[],
): boolean {
  return (
    result.command === "SELECT" &&
    result.fields.length === expected.length &&
    result.fields.every(
      (field, index) =>
        field.name === expected[index]?.[0] &&
        field.dataTypeID === expected[index]?.[1],
    )
  );
}

export async function runDatabasePreflight(
  client: RawPgClient,
  configuredUser: string,
): Promise<StartupReport> {
  const result = await client.query({
    text: preflightSql,
    rowMode: "array",
  });
  const fields = [
    ["startup_client_encoding", 25],
    ["startup_search_path", 25],
    ["server_encoding", 25],
    ["server_version_num", 23],
    ["current_user_name", 25],
    ["max_identifier_length", 23],
    ["database_is_template", 16],
    ["database_allows_connections", 16],
  ] as const;
  const row = result.rows[0];
  if (!hasFields(result, fields) || result.rows.length !== 1 || row?.length !== 8) {
    throw new MigrationLifecycleError("MIGRATION_DATABASE_PREFLIGHT_FAILED");
  }
  const [clientEncoding, searchPath, serverEncoding, serverVersion, currentUser,
    identifierLimit, isTemplate, allowsConnections] = row;
  if (
    typeof clientEncoding !== "string" ||
    typeof searchPath !== "string" ||
    typeof serverEncoding !== "string" ||
    typeof serverVersion !== "number" ||
    typeof currentUser !== "string" ||
    typeof identifierLimit !== "number" ||
    typeof isTemplate !== "boolean" ||
    typeof allowsConnections !== "boolean"
  ) {
    throw new MigrationLifecycleError("MIGRATION_DATABASE_PREFLIGHT_FAILED");
  }
  if (clientEncoding !== "UTF8" || searchPath !== "pg_catalog") {
    throw new MigrationLifecycleError("MIGRATION_STARTUP_STATE_INVALID");
  }
  if (serverEncoding !== "UTF8") {
    throw new MigrationLifecycleError("MIGRATION_DATABASE_ENCODING_UNSUPPORTED");
  }
  if (serverVersion !== 180006) {
    throw new MigrationLifecycleError("MIGRATION_DATABASE_VERSION_UNSUPPORTED");
  }
  if (currentUser !== configuredUser) {
    throw new MigrationLifecycleError("MIGRATION_DATABASE_USER_MISMATCH");
  }
  if (identifierLimit !== 63) {
    throw new MigrationLifecycleError("MIGRATION_IDENTIFIER_LIMIT_UNSUPPORTED");
  }
  if (isTemplate !== false || allowsConnections !== true) {
    throw new MigrationLifecycleError("MIGRATION_DATABASE_CLASS_INVALID");
  }
  return {
    startupClientEncoding: "UTF8",
    startupSearchPath: "pg_catalog",
    serverEncoding: "UTF8",
    serverVersionNum: 180006,
    currentUserName: configuredUser,
    maxIdentifierLength: 63,
    databaseIsTemplate: false,
    databaseAllowsConnections: true,
  };
}

export async function bindNamespace(
  client: RawPgClient,
  database: string,
  schema: string,
  postLock = false,
): Promise<readonly [string, string]> {
  const result = await client.query({
    text: bindSql,
    values: [database, schema],
    rowMode: "array",
  });
  const row = result.rows[0];
  const valid =
    hasFields(result, [["database_name", 25], ["schema_name", 25]]) &&
    result.rows.length === 1 &&
    row?.length === 2 &&
    row[0] === database &&
    row[1] === schema;
  if (!valid) {
    throw new MigrationLifecycleError(
      postLock ? "MIGRATION_NAMESPACE_CHANGED" : "MIGRATION_NAMESPACE_BIND_FAILED",
    );
  }
  return [database, schema];
}
