import { describe, expect, it } from "vitest";

import type { RawPgClient, RawPgResult } from "./migrations/files/context.js";
import {
  bindNamespace,
  runDatabasePreflight,
} from "./migrations/files/preflight.js";

const acceptedPreflightSql = `SELECT
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

const acceptedFields = [
  { name: "startup_client_encoding", dataTypeID: 25 },
  { name: "startup_search_path", dataTypeID: 25 },
  { name: "server_encoding", dataTypeID: 25 },
  { name: "server_version_num", dataTypeID: 23 },
  { name: "current_user_name", dataTypeID: 25 },
  { name: "max_identifier_length", dataTypeID: 23 },
  { name: "database_is_template", dataTypeID: 16 },
  { name: "database_allows_connections", dataTypeID: 16 },
] as const;

const acceptedRow: unknown[] = [
  "UTF8",
  "pg_catalog",
  "UTF8",
  180006,
  "rick_and_morty",
  63,
  false,
  true,
];

describe("migration database preflight", () => {
  it("enforces the exact eight-field database preflight contract", async () => {
    type QueryConfig = Parameters<RawPgClient["query"]>[0];
    const expectedQuery = { text: acceptedPreflightSql, rowMode: "array" } as const;
    const acceptedResult = (overrides: Partial<RawPgResult> = {}): RawPgResult => ({
      command: "SELECT",
      fields: acceptedFields,
      rows: [[...acceptedRow]],
      ...overrides,
    });
    const invoke = async (result: RawPgResult) => {
      const calls: QueryConfig[] = [];
      const client: RawPgClient = {
        query: async (config) => {
          calls.push(config);
          return result;
        },
      };
      let report: Awaited<ReturnType<typeof runDatabasePreflight>> | undefined;
      let rejection: unknown;
      try {
        report = await runDatabasePreflight(client, "rick_and_morty");
      } catch (error) {
        rejection = error;
      }
      return { calls, rejection, report };
    };

    const positive = await invoke(acceptedResult());
    expect(positive.calls).toEqual([expectedQuery]);
    expect(positive.rejection).toBeUndefined();
    expect(positive.report).toEqual({
      startupClientEncoding: "UTF8",
      startupSearchPath: "pg_catalog",
      serverEncoding: "UTF8",
      serverVersionNum: 180006,
      currentUserName: "rick_and_morty",
      maxIdentifierLength: 63,
      databaseIsTemplate: false,
      databaseAllowsConnections: true,
    });

    const malformedCases: readonly {
      readonly caseName: string;
      readonly result: RawPgResult;
    }[] = [
      { caseName: "wrong-command", result: acceptedResult({ command: "UPDATE" }) },
      {
        caseName: "field-count",
        result: acceptedResult({ fields: acceptedFields.slice(0, 7) }),
      },
      {
        caseName: "field-name",
        result: acceptedResult({
          fields: acceptedFields.map((field, index) =>
            index === 0 ? { ...field, name: "wrong_name" } : field,
          ),
        }),
      },
      {
        caseName: "field-order",
        result: acceptedResult({
          fields: [acceptedFields[1], acceptedFields[0], ...acceptedFields.slice(2)],
        }),
      },
      {
        caseName: "field-oid",
        result: acceptedResult({
          fields: acceptedFields.map((field, index) =>
            index === 0 ? { ...field, dataTypeID: 23 } : field,
          ),
        }),
      },
      { caseName: "zero-rows", result: acceptedResult({ rows: [] }) },
      {
        caseName: "two-rows",
        result: acceptedResult({ rows: [[...acceptedRow], [...acceptedRow]] }),
      },
      {
        caseName: "seven-values",
        result: acceptedResult({ rows: [acceptedRow.slice(0, 7)] }),
      },
      {
        caseName: "nine-values",
        result: acceptedResult({ rows: [[...acceptedRow, "extra"]] }),
      },
      ...[1, 1, 1, "180006", 1, "63", "false", "true"].map(
        (wrongValue, index) => {
          const row = [...acceptedRow];
          row[index] = wrongValue;
          return {
            caseName: `primitive-type-${index + 1}`,
            result: acceptedResult({ rows: [row] }),
          };
        },
      ),
    ];
    const precedenceCases: readonly {
      readonly caseName: string;
      readonly message: string;
      readonly row: unknown[];
    }[] = [
      {
        caseName: "startup-state-first",
        message: "MIGRATION_STARTUP_STATE_INVALID",
        row: ["LATIN1", "public", "LATIN1", 1, "other", 1, true, false],
      },
      {
        caseName: "encoding-before-version",
        message: "MIGRATION_DATABASE_ENCODING_UNSUPPORTED",
        row: ["UTF8", "pg_catalog", "LATIN1", 1, "other", 1, true, false],
      },
      {
        caseName: "version-before-user",
        message: "MIGRATION_DATABASE_VERSION_UNSUPPORTED",
        row: ["UTF8", "pg_catalog", "UTF8", 1, "other", 1, true, false],
      },
      {
        caseName: "user-before-identifier-limit",
        message: "MIGRATION_DATABASE_USER_MISMATCH",
        row: ["UTF8", "pg_catalog", "UTF8", 180006, "other", 1, true, false],
      },
      {
        caseName: "identifier-limit-before-database-class",
        message: "MIGRATION_IDENTIFIER_LIMIT_UNSUPPORTED",
        row: ["UTF8", "pg_catalog", "UTF8", 180006, "rick_and_morty", 1, true, false],
      },
      {
        caseName: "database-class",
        message: "MIGRATION_DATABASE_CLASS_INVALID",
        row: ["UTF8", "pg_catalog", "UTF8", 180006, "rick_and_morty", 63, true, false],
      },
    ];
    const mismatches: string[] = [];

    for (const { caseName, result } of malformedCases) {
      const observed = await invoke(result);
      if (
        observed.calls.length !== 1 ||
        JSON.stringify(observed.calls[0]) !== JSON.stringify(expectedQuery) ||
        !(observed.rejection instanceof Error) ||
        observed.rejection.message !== "MIGRATION_DATABASE_PREFLIGHT_FAILED" ||
        (observed.rejection as Error & { readonly result?: unknown }).result !== 1
      ) {
        mismatches.push(caseName);
      }
    }

    for (const { caseName, message, row } of precedenceCases) {
      const observed = await invoke(acceptedResult({ rows: [row] }));
      if (
        observed.calls.length !== 1 ||
        JSON.stringify(observed.calls[0]) !== JSON.stringify(expectedQuery) ||
        !(observed.rejection instanceof Error) ||
        observed.rejection.message !== message ||
        (observed.rejection as Error & { readonly result?: unknown }).result !== 1
      ) {
        mismatches.push(caseName);
      }
    }

    if (mismatches.length > 0) {
      throw new Error(
        `MIGRATION_PREFLIGHT_CONTRACT_INCOMPLETE cases=${mismatches.join(",")}`,
      );
    }
  });

  it("enforces exact pre-lock and post-lock namespace binding", async () => {
    type QueryConfig = Parameters<RawPgClient["query"]>[0];
    const acceptedBindSql = `SELECT
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
    const expectedQuery = {
      text: acceptedBindSql,
      values: ["database", "schema"],
      rowMode: "array",
    } as const;
    const acceptedBindFields = [
      { name: "database_name", dataTypeID: 25 },
      { name: "schema_name", dataTypeID: 25 },
    ] as const;
    const acceptedBindResult = (
      overrides: Partial<RawPgResult> = {},
    ): RawPgResult => ({
      command: "SELECT",
      fields: acceptedBindFields,
      rows: [["database", "schema"]],
      ...overrides,
    });
    const invoke = async (result: RawPgResult, postLock: boolean) => {
      const calls: QueryConfig[] = [];
      const client: RawPgClient = {
        query: async (config) => {
          calls.push(config);
          return result;
        },
      };
      let binding: Awaited<ReturnType<typeof bindNamespace>> | undefined;
      let rejection: unknown;
      try {
        binding = await bindNamespace(
          client,
          "database",
          "schema",
          postLock,
        );
      } catch (error) {
        rejection = error;
      }
      return { binding, calls, rejection };
    };

    for (const postLock of [false, true]) {
      const positive = await invoke(acceptedBindResult(), postLock);
      expect(positive.calls).toEqual([expectedQuery]);
      expect(positive.rejection).toBeUndefined();
      expect(positive.binding).toEqual(["database", "schema"]);
    }

    const malformedCases: readonly {
      readonly caseName: string;
      readonly result: RawPgResult;
    }[] = [
      {
        caseName: "wrong-command",
        result: acceptedBindResult({ command: "UPDATE" }),
      },
      {
        caseName: "field-count",
        result: acceptedBindResult({ fields: acceptedBindFields.slice(0, 1) }),
      },
      {
        caseName: "field-name",
        result: acceptedBindResult({
          fields: [{ name: "wrong_name", dataTypeID: 25 }, acceptedBindFields[1]],
        }),
      },
      {
        caseName: "field-order",
        result: acceptedBindResult({
          fields: [acceptedBindFields[1], acceptedBindFields[0]],
        }),
      },
      {
        caseName: "field-oid",
        result: acceptedBindResult({
          fields: [{ name: "database_name", dataTypeID: 23 }, acceptedBindFields[1]],
        }),
      },
      { caseName: "zero-rows", result: acceptedBindResult({ rows: [] }) },
      {
        caseName: "two-rows",
        result: acceptedBindResult({
          rows: [["database", "schema"], ["database", "schema"]],
        }),
      },
      {
        caseName: "one-value",
        result: acceptedBindResult({ rows: [["database"]] }),
      },
      {
        caseName: "three-values",
        result: acceptedBindResult({ rows: [["database", "schema", "extra"]] }),
      },
      {
        caseName: "wrong-database",
        result: acceptedBindResult({ rows: [["other", "schema"]] }),
      },
      {
        caseName: "non-string-database",
        result: acceptedBindResult({ rows: [[1, "schema"]] }),
      },
      {
        caseName: "wrong-schema",
        result: acceptedBindResult({ rows: [["database", "other"]] }),
      },
      {
        caseName: "non-string-schema",
        result: acceptedBindResult({ rows: [["database", 1]] }),
      },
    ];
    const mismatches: string[] = [];

    for (const postLock of [false, true]) {
      const phase = postLock ? "post-lock" : "pre-lock";
      const expectedMessage = postLock
        ? "MIGRATION_NAMESPACE_CHANGED"
        : "MIGRATION_NAMESPACE_BIND_FAILED";
      for (const { caseName, result } of malformedCases) {
        const observed = await invoke(result, postLock);
        if (
          observed.calls.length !== 1 ||
          JSON.stringify(observed.calls[0]) !== JSON.stringify(expectedQuery) ||
          !(observed.rejection instanceof Error) ||
          observed.rejection.message !== expectedMessage ||
          (observed.rejection as Error & { readonly result?: unknown }).result !== 1
        ) {
          mismatches.push(`${phase}-${caseName}`);
        }
      }
    }

    if (mismatches.length > 0) {
      throw new Error(
        `MIGRATION_NAMESPACE_BIND_CONTRACT_INCOMPLETE cases=${mismatches.join(",")}`,
      );
    }
  });
});
