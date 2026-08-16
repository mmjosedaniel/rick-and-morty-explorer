import { describe, expect, it } from "vitest";

import { prepareWithMigrationFactory } from "./migrations/files/factory.js";
import type { MigrationTargetState } from "./migrations/files/context.js";
import type { MigrationManifest } from "./migrations/files/manifest.js";

function capturePgEnvironment(): readonly (readonly [string, string | undefined])[] {
  return Object.entries(process.env)
    .filter(([name]) =>
      (process.platform === "win32" ? name.toUpperCase() : name).startsWith("PG"),
    )
    .sort(([left], [right]) => left.localeCompare(right));
}

function readCString(
  packet: Buffer,
  start: number,
): { readonly value: string; readonly next: number } {
  const end = packet.indexOf(0, start);
  if (end < 0) {
    throw new Error("MIGRATION_STARTUP_PACKET_TERMINATOR_MISSING");
  }
  return {
    value: packet.toString("utf8", start, end),
    next: end + 1,
  };
}

describe("migration startup contract", () => {
  it("enforces the exact local factory and StartupMessage contract", async () => {
    const expectedApplicationName = "rick-and-morty-explorer:migrations";
    const expectedOptions =
      "-c client_encoding=UTF8 -c search_path=pg_catalog";
    const credential = "test-only-startup-credential";
    const manifest: MigrationManifest = {
      schemaVersion: "migration-artifact/v1",
      buildId: "0".repeat(64),
      toolchain: {
        exactTypeScriptVersion: "6.0.3",
        exactNodeTarget: "node24",
      },
      inputs: [],
      files: [],
      mappings: [],
    };
    const target: MigrationTargetState = {
      host: "127.0.0.1",
      port: 5432,
      database: "database",
      schema: "schema",
      user: "user",
      credential,
    };
    const originalPgEnvironment = capturePgEnvironment();
    const sequelizeSpecifier: string = "sequelize";
    const sequelizeModule = (await import(sequelizeSpecifier)) as unknown as {
      Sequelize: {
        prototype: {
          transaction(this: unknown, ...args: unknown[]): Promise<unknown>;
        };
      };
    };
    const pgSpecifier: string = "pg";
    const pgModule = (await import(pgSpecifier)) as unknown as {
      Client: new (options: Readonly<Record<string, unknown>>) => {
        getStartupConf(): Record<string, string>;
      };
    };
    const protocolSpecifier: string = "pg-protocol";
    const protocolModule = (await import(protocolSpecifier)) as unknown as {
      serialize: {
        startup(options: Record<string, string>): Buffer;
      };
    };
    const sequelizePrototype = sequelizeModule.Sequelize.prototype;
    const originalTransaction = sequelizePrototype.transaction;
    const boundaryFailure = new Error(
      "MIGRATION_STARTUP_CONTRACT_PRE_CONNECTION_BOUNDARY",
    );
    let capturedInstance: unknown;
    let transactionCalls = 0;
    let rejection: unknown;

    try {
      for (const [name] of originalPgEnvironment) {
        process.env[name] = "";
      }
      sequelizePrototype.transaction = async function (
        this: unknown,
        ..._args: unknown[]
      ): Promise<unknown> {
        transactionCalls += 1;
        capturedInstance = this;
        throw boundaryFailure;
      };

      try {
        await prepareWithMigrationFactory({
          target,
          manifest,
          artifactRoot: new URL("file:///migration-artifact/"),
        });
      } catch (error) {
        rejection = error;
      }
    } finally {
      sequelizePrototype.transaction = originalTransaction;
      for (const [name] of capturePgEnvironment()) {
        delete process.env[name];
      }
      for (const [name, value] of originalPgEnvironment) {
        if (value === undefined) {
          delete process.env[name];
        } else {
          process.env[name] = value;
        }
      }
    }

    expect(rejection).toBe(boundaryFailure);
    expect(transactionCalls).toBe(1);
    expect(capturedInstance).toBeDefined();
    expect(sequelizePrototype.transaction).toBe(originalTransaction);
    expect(capturePgEnvironment()).toEqual(originalPgEnvironment);

    const instance = capturedInstance as {
      readonly config?: Readonly<Record<string, unknown>>;
      readonly options?: Readonly<Record<string, unknown>>;
    };
    const config = instance.config ?? {};
    const options = instance.options ?? {};
    const dialectOptions = (options.dialectOptions ?? config.dialectOptions) as
      | Readonly<Record<string, unknown>>
      | undefined;
    const pool = (options.pool ?? config.pool) as
      | Readonly<Record<string, unknown>>
      | undefined;
    const mismatches: string[] = [];
    const record = (caseName: string, accepted: boolean): void => {
      if (!accepted) {
        mismatches.push(caseName);
      }
    };

    record("database", config.database === target.database);
    record("user", config.username === target.user);
    record("host", options.host === target.host && config.host === target.host);
    record("port", options.port === target.port && config.port === target.port);
    record("protocol", options.protocol === "tcp" && config.protocol === "tcp");
    record("dialect", options.dialect === "postgres");
    record(
      "dialect-module",
      options.dialectModule === pgModule && config.dialectModule === pgModule,
    );
    record("native", options.native === false && config.native === false);
    record("database-version", options.databaseVersion === "18.6.0");
    record("logging", options.logging === false);
    record("pool", pool?.max === 1 && pool.min === 0);
    record(
      "replication",
      options.replication === false && config.replication === false,
    );
    record(
      "dialect-option-keys",
      JSON.stringify(Object.keys(dialectOptions ?? {}).sort()) ===
        JSON.stringify(
          [
            "application_name",
            "binary",
            "client_encoding",
            "connectionTimeoutMillis",
            "options",
            "ssl",
          ].sort(),
        ),
    );
    record("ssl", dialectOptions?.ssl === false);
    record("options", dialectOptions?.options === expectedOptions);
    record("client-encoding", dialectOptions?.client_encoding === "UTF8");
    record(
      "application-name",
      dialectOptions?.application_name === expectedApplicationName,
    );
    record(
      "connection-timeout",
      dialectOptions?.connectionTimeoutMillis === 10_000,
    );
    record("binary", dialectOptions?.binary === false);

    const passwordProvider = config.password;
    let providedPassword: unknown;
    const passwordEnvironment = ["PGPASSWORD", "PGPASSFILE"] as const;
    const originalPasswordEnvironment = passwordEnvironment.map(
      (name) => [name, process.env[name]] as const,
    );
    try {
      process.env.PGPASSWORD = "test-only-ambient-password";
      process.env.PGPASSFILE = "test-only-ambient-path";
      if (typeof passwordProvider === "function") {
        providedPassword = await passwordProvider();
      }
    } finally {
      for (const [name, value] of originalPasswordEnvironment) {
        if (value === undefined) {
          delete process.env[name];
        } else {
          process.env[name] = value;
        }
      }
    }
    record("password-provider", typeof passwordProvider === "function");
    record("validated-credential", providedPassword === credential);
    record(
      "password-environment-restored",
      originalPasswordEnvironment.every(
        ([name, value]) => process.env[name] === value,
      ),
    );

    const client = new pgModule.Client({
      user: config.username,
      database: config.database,
      password: passwordProvider,
      host: config.host,
      port: config.port,
      ssl: dialectOptions?.ssl,
      application_name: dialectOptions?.application_name,
      options: dialectOptions?.options,
      client_encoding: dialectOptions?.client_encoding,
      connectionTimeoutMillis: dialectOptions?.connectionTimeoutMillis,
      binary: dialectOptions?.binary,
      replication: config.replication,
    });
    const startup = client.getStartupConf();
    record(
      "startup-keys",
      JSON.stringify(Object.keys(startup)) ===
        JSON.stringify(["user", "database", "application_name", "options"]),
    );
    record("startup-user", startup.user === target.user);
    record("startup-database", startup.database === target.database);
    record(
      "startup-application-name",
      startup.application_name === expectedApplicationName,
    );
    record("startup-options", startup.options === expectedOptions);
    record("startup-omits-client-encoding", !("client_encoding" in startup));
    record("startup-omits-replication", !("replication" in startup));

    const packet = protocolModule.serialize.startup(startup);
    record("packet-length", packet.readInt32BE(0) === packet.length);
    record("packet-protocol", packet.readInt32BE(4) === 196_608);
    const decoded: string[] = [];
    let offset = 8;
    while (offset < packet.length) {
      const item = readCString(packet, offset);
      offset = item.next;
      if (item.value === "") {
        break;
      }
      decoded.push(item.value);
    }
    record(
      "packet-pairs",
      JSON.stringify(decoded) ===
        JSON.stringify([
          "user",
          target.user,
          "database",
          target.database,
          "application_name",
          expectedApplicationName,
          "options",
          expectedOptions,
          "client_encoding",
          "UTF8",
        ]),
    );
    record("packet-final-terminator", offset === packet.length);

    if (mismatches.length > 0) {
      throw new Error(
        `MIGRATION_STARTUP_PACKET_CONTRACT_INCOMPLETE cases=${mismatches.join(",")}`,
      );
    }
  });
});
