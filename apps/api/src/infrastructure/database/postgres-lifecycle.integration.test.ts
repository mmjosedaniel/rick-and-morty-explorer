import { Client } from "pg";
import { describe, expect, it } from "vitest";

interface PostgresControl {
  readonly database: string;
  readonly user: string;
  readonly password: string;
  readonly port: number;
}

interface PostgresNamespace {
  readonly database: string;
  readonly schema: string;
  readonly target: object;
}

type WithPostgresNamespace = <T>(options: {
  readonly control: PostgresControl;
  readonly body: (namespace: PostgresNamespace) => Promise<T>;
}) => Promise<T>;

type PostgresSchemaPair = readonly [PostgresNamespace, PostgresNamespace];

type WithPostgresSchemaPair = <T>(options: {
  readonly control: PostgresControl;
  readonly body: (pair: PostgresSchemaPair) => Promise<T>;
}) => Promise<T>;

const namespacePattern = /^task_004_[0-9a-f]{16}$/u;

function loadControl(): PostgresControl {
  return {
    database: process.env.POSTGRES_DB ?? "rick_and_morty",
    user: process.env.POSTGRES_USER ?? "rick_and_morty",
    password: process.env.POSTGRES_PASSWORD ?? "local-development-only",
    port: Number(process.env.POSTGRES_PORT ?? "5432"),
  };
}

function createClient(control: PostgresControl, database = control.database): Client {
  return new Client({
    host: "127.0.0.1",
    port: control.port,
    database,
    user: control.user,
    password: control.password,
    ssl: false,
  });
}

async function withClient<T>(
  control: PostgresControl,
  body: (client: Client) => Promise<T>,
  database = control.database,
): Promise<T> {
  const client = createClient(control, database);
  await client.connect();
  try {
    return await body(client);
  } finally {
    await client.end();
  }
}

async function listDatabases(control: PostgresControl): Promise<string[]> {
  return withClient(control, async (client) => {
    const result = await client.query<{ datname: string }>(
      "SELECT datname FROM pg_catalog.pg_database ORDER BY datname",
    );
    return result.rows.map(({ datname }) => datname);
  });
}

function isMissingLifecycleModule(error: unknown): boolean {
  return (
    error instanceof Error &&
    "code" in error &&
    error.code === "ERR_MODULE_NOT_FOUND" &&
    error.message.includes("postgres-lifecycle.js")
  );
}

async function loadLifecycle(): Promise<WithPostgresNamespace> {
  const lifecycleSpecifier = "./postgres-lifecycle.js";
  try {
    const lifecycleModule = (await import(
      /* @vite-ignore */ lifecycleSpecifier
    )) as Record<string, unknown>;
    expect(lifecycleModule.withPostgresNamespace).toBeTypeOf("function");
    return lifecycleModule.withPostgresNamespace as WithPostgresNamespace;
  } catch (error) {
    if (!isMissingLifecycleModule(error)) {
      throw error;
    }
    throw new Error("POSTGRES_LIFECYCLE_MISSING_AFTER_POSTGRES_PROBE", {
      cause: error,
    });
  }
}

async function loadSchemaPairLifecycle(): Promise<WithPostgresSchemaPair> {
  const lifecycleSpecifier = "./postgres-lifecycle.js";
  const lifecycleModule = (await import(
    /* @vite-ignore */ lifecycleSpecifier
  )) as Record<string, unknown>;
  if (typeof lifecycleModule.withPostgresSchemaPair !== "function") {
    throw new Error("POSTGRES_SCHEMA_PAIR_BOUNDARY_MISSING_AFTER_POSTGRES_PROBE");
  }
  return lifecycleModule.withPostgresSchemaPair as WithPostgresSchemaPair;
}

describe("PostgreSQL namespace lifecycle", () => {
  it(
    "allocates two opaque schema targets inside one run-owned database",
    async () => {
      const control = loadControl();
      await withClient(control, async (client) => {
        const probe = await client.query<{
          server_version_num: string;
          server_version: string;
          server_encoding: string;
          current_database: string;
        }>(
          `SELECT
             pg_catalog.current_setting('server_version_num') AS server_version_num,
             pg_catalog.current_setting('server_version') AS server_version,
             pg_catalog.current_setting('server_encoding') AS server_encoding,
             pg_catalog.current_database() AS current_database`,
        );
        expect(probe.rows).toEqual([
          {
            server_version_num: "180006",
            server_version: "18.6",
            server_encoding: "UTF8",
            current_database: control.database,
          },
        ]);
        console.info(
          `POSTGRES_SCHEMA_PAIR_PROBE_OK server_version_num=${probe.rows[0]?.server_version_num} server_version=${probe.rows[0]?.server_version} server_encoding=${probe.rows[0]?.server_encoding}`,
        );
      });

      const beforeDatabases = await listDatabases(control);
      const withPostgresSchemaPair = await loadSchemaPairLifecycle();
      const allocatedDatabases: string[] = [];
      const allocatedSchemas: string[] = [];
      const allocatedTargets: object[] = [];

      const assertPair = async (pair: PostgresSchemaPair): Promise<void> => {
        expect(pair).toHaveLength(2);
        const [first, second] = pair;
        expect(first.database).toBe(second.database);
        expect(first.database).toMatch(namespacePattern);
        expect(first.schema).toMatch(namespacePattern);
        expect(second.schema).toMatch(namespacePattern);
        expect(first.schema).not.toBe(second.schema);
        expect(first.target).not.toBe(second.target);
        for (const namespace of pair) {
          expect(Object.isFrozen(namespace.target)).toBe(true);
          expect(Reflect.ownKeys(namespace.target)).toEqual([]);
        }
        expect(await listDatabases(control)).toEqual(
          [...beforeDatabases, first.database].sort(),
        );
        await withClient(
          control,
          async (client) => {
            const schemas = await client.query<{ schema_exists: boolean }>(
              `SELECT pg_catalog.to_regnamespace(name) IS NOT NULL AS schema_exists
               FROM unnest($1::text[]) AS names(name)
               ORDER BY name`,
              [[first.schema, second.schema]],
            );
            expect(schemas.rows).toEqual([
              { schema_exists: true },
              { schema_exists: true },
            ]);
          },
          first.database,
        );
        allocatedDatabases.push(first.database);
        allocatedSchemas.push(first.schema, second.schema);
        allocatedTargets.push(first.target, second.target);
      };

      const bodyResult = await withPostgresSchemaPair({
        control,
        body: async (pair) => {
          await assertPair(pair);
          return "schema-pair-body-result";
        },
      });
      expect(bodyResult).toBe("schema-pair-body-result");
      expect(await listDatabases(control)).toEqual(beforeDatabases);

      const bodyFailure = new Error("POSTGRES_SCHEMA_PAIR_BODY_FAILURE");
      await expect(
        withPostgresSchemaPair({
          control,
          body: async (pair) => {
            await assertPair(pair);
            throw bodyFailure;
          },
        }),
      ).rejects.toBe(bodyFailure);

      expect(allocatedDatabases).toHaveLength(2);
      expect(new Set(allocatedDatabases).size).toBe(2);
      expect(allocatedSchemas).toHaveLength(4);
      expect(new Set(allocatedSchemas).size).toBe(4);
      expect(allocatedTargets).toHaveLength(4);
      expect(new Set(allocatedTargets).size).toBe(4);
      expect(await listDatabases(control)).toEqual(beforeDatabases);
      await withClient(control, async (client) => {
        const survival = await client.query<{ current_database: string }>(
          "SELECT pg_catalog.current_database() AS current_database",
        );
        expect(survival.rows).toEqual([{ current_database: control.database }]);
      });
    },
    15_000,
  );

  it("isolates and cleans an owned PostgreSQL namespace", async () => {
    const control = loadControl();
    await withClient(control, async (client) => {
      const probe = await client.query<{
        server_version_num: string;
        server_encoding: string;
        current_database: string;
      }>(
        `SELECT
           pg_catalog.current_setting('server_version_num') AS server_version_num,
           pg_catalog.current_setting('server_encoding') AS server_encoding,
           pg_catalog.current_database() AS current_database`,
      );
      expect(probe.rows).toEqual([
        {
          server_version_num: "180006",
          server_encoding: "UTF8",
          current_database: control.database,
        },
      ]);
      console.info(
        `POSTGRES_PROBE_OK server_version_num=${probe.rows[0]?.server_version_num} server_encoding=${probe.rows[0]?.server_encoding} current_database=${probe.rows[0]?.current_database}`,
      );
    });

    const beforeDatabases = await listDatabases(control);
    const withPostgresNamespace = await loadLifecycle();
    const allocatedNames: string[] = [];

    const bodyResult = await withPostgresNamespace({
      control,
      body: async (namespace) => {
        allocatedNames.push(namespace.database);
        expect(namespace.database).toBe(namespace.schema);
        expect(namespace.database).toMatch(namespacePattern);
        expect(Object.isFrozen(namespace.target)).toBe(true);
        expect(Reflect.ownKeys(namespace.target)).toEqual([]);
        expect(await listDatabases(control)).toEqual(
          [...beforeDatabases, namespace.database].sort(),
        );

        await withClient(
          control,
          async (client) => {
            const identity = await client.query<{
              current_database: string;
              schema_exists: boolean;
            }>(
              `SELECT
                 pg_catalog.current_database() AS current_database,
                 pg_catalog.to_regnamespace($1) IS NOT NULL AS schema_exists`,
              [namespace.schema],
            );
            expect(identity.rows).toEqual([
              {
                current_database: namespace.database,
                schema_exists: true,
              },
            ]);
          },
          namespace.database,
        );

        return "namespace-body-result";
      },
    });
    expect(bodyResult).toBe("namespace-body-result");
    expect(await listDatabases(control)).toEqual(beforeDatabases);

    const bodyFailure = new Error("POSTGRES_NAMESPACE_BODY_FAILURE");
    await expect(
      withPostgresNamespace({
        control,
        body: async (namespace) => {
          allocatedNames.push(namespace.database);
          expect(namespace.database).toBe(namespace.schema);
          expect(namespace.database).toMatch(namespacePattern);
          expect(Object.isFrozen(namespace.target)).toBe(true);
          expect(Reflect.ownKeys(namespace.target)).toEqual([]);
          throw bodyFailure;
        },
      }),
    ).rejects.toBe(bodyFailure);

    expect(allocatedNames).toHaveLength(2);
    expect(new Set(allocatedNames).size).toBe(2);
    expect(await listDatabases(control)).toEqual(beforeDatabases);
    await withClient(control, async (client) => {
      const survival = await client.query<{ current_database: string }>(
        "SELECT pg_catalog.current_database() AS current_database",
      );
      expect(survival.rows).toEqual([{ current_database: control.database }]);
    });
  });
});
