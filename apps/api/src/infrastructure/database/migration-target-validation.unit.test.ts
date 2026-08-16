import { describe, expect, it } from "vitest";

import { prepareWithMigrationFactory } from "./migrations/files/factory.js";
import type { MigrationTargetState } from "./migrations/files/context.js";
import type { MigrationManifest } from "./migrations/files/manifest.js";

const probeEnvironmentName = "PGTASK004IDENTIFIERDOMAINPROBE";

function capturePgEnvironment(): readonly (readonly [string, string | undefined])[] {
  return Object.entries(process.env)
    .filter(([name]) =>
      (process.platform === "win32" ? name.toUpperCase() : name).startsWith("PG"),
    )
    .sort(([left], [right]) => left.localeCompare(right));
}

describe("migration target validation", () => {
  it("enforces the accepted migration identifier domain before connection work", async () => {
    const originalPgEnvironment = capturePgEnvironment();
    const originalProbeValue = process.env[probeEnvironmentName];
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
    const artifactRoot = new URL("file:///migration-artifact/");
    const baseTarget: MigrationTargetState = {
      host: "127.0.0.1",
      port: 1,
      database: "database",
      schema: "schema",
      user: "user",
      credential: "test-only-credential",
    };
    const positiveCases = (["database", "schema", "user"] as const).flatMap(
      (field) => [
        { caseName: `${field}-minimum`, field, value: "a" },
        { caseName: `${field}-maximum`, field, value: `a${"0".repeat(62)}` },
      ],
    );
    const invalidValues = [
      { name: "empty", value: "" },
      { name: "sixty-four-bytes", value: `a${"0".repeat(63)}` },
      { name: "upper-case", value: "A" },
      { name: "unicode", value: "café" },
      { name: "hyphen", value: "a-b" },
      { name: "whitespace", value: "a b" },
      { name: "quoted", value: '"a"' },
      { name: "leading-digit", value: "1abc" },
    ] as const;
    const negativeCases = (["database", "schema", "user"] as const).flatMap(
      (field) =>
        invalidValues.map(({ name, value }) => ({
          caseName: `${field}-${name}`,
          field,
          value,
        })),
    );
    let primaryFailure: unknown;

    try {
      for (const [name] of originalPgEnvironment) {
        process.env[name] = "";
      }
      process.env[probeEnvironmentName] = "present";

      for (const { caseName, field, value } of positiveCases) {
        let rejection: unknown;
        try {
          await prepareWithMigrationFactory({
            target: { ...baseTarget, [field]: value },
            manifest,
            artifactRoot,
          });
        } catch (error) {
          rejection = error;
        }
        if (
          !(rejection instanceof Error) ||
          rejection.message !==
            `MIGRATION_STARTUP_CONFIG_INVALID ambient=${probeEnvironmentName}` ||
          (rejection as Error & { readonly result?: unknown }).result !== 1
        ) {
          throw new Error(
            `MIGRATION_IDENTIFIER_DOMAIN_POSITIVE_BOUNDARY_INVALID case=${caseName}`,
          );
        }
      }

      const mismatches: string[] = [];
      for (const { caseName, field, value } of negativeCases) {
        let rejection: unknown;
        try {
          await prepareWithMigrationFactory({
            target: { ...baseTarget, [field]: value },
            manifest,
            artifactRoot,
          });
        } catch (error) {
          rejection = error;
        }
        if (
          !(rejection instanceof Error) ||
          rejection.message !== "MIGRATION_NAMESPACE_INVALID" ||
          (rejection as Error & { readonly result?: unknown }).result !== 1
        ) {
          mismatches.push(caseName);
        }
      }

      if (mismatches.length > 0) {
        throw new Error(
          `MIGRATION_IDENTIFIER_DOMAIN_REJECTION_INCOMPLETE cases=${mismatches.join(",")}`,
        );
      }
    } catch (error) {
      primaryFailure = error;
    } finally {
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
      if (originalProbeValue === undefined) {
        delete process.env[probeEnvironmentName];
      } else {
        process.env[probeEnvironmentName] = originalProbeValue;
      }
    }

    expect(capturePgEnvironment()).toEqual(originalPgEnvironment);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("enforces the accepted local target profile before connection work", async () => {
    const scopedProbeEnvironmentName = `PGTASK004LOCALTARGETPROFILE${process.pid}`;
    const originalPgEnvironment = capturePgEnvironment();
    const originalProbeValue = process.env[scopedProbeEnvironmentName];
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
    const artifactRoot = new URL("file:///migration-artifact/");
    const baseTarget: MigrationTargetState = {
      host: "127.0.0.1",
      port: 1,
      database: "database",
      schema: "schema",
      user: "user",
      credential: "test-only-credential",
    };
    const admittedCases = [
      { caseName: "ordinary", target: baseTarget },
      { caseName: "public-schema", target: { ...baseTarget, schema: "public" } },
    ] as const;
    const rejectedCases = [
      {
        caseName: "host-localhost",
        target: { ...baseTarget, host: "localhost" },
        message: "MIGRATION_STARTUP_CONFIG_INVALID",
      },
      {
        caseName: "host-ipv6-loopback",
        target: { ...baseTarget, host: "::1" },
        message: "MIGRATION_STARTUP_CONFIG_INVALID",
      },
      {
        caseName: "host-alternate-loopback",
        target: { ...baseTarget, host: "127.0.0.2" },
        message: "MIGRATION_STARTUP_CONFIG_INVALID",
      },
      ...[
        { caseName: "port-zero", port: 0 },
        { caseName: "port-above-maximum", port: 65_536 },
        { caseName: "port-negative", port: -1 },
        { caseName: "port-fractional", port: 1.5 },
        { caseName: "port-not-a-number", port: Number.NaN },
        { caseName: "port-positive-infinity", port: Number.POSITIVE_INFINITY },
      ].map(({ caseName, port }) => ({
        caseName,
        target: { ...baseTarget, port },
        message: "MIGRATION_STARTUP_CONFIG_INVALID",
      })),
      {
        caseName: "credential-empty",
        target: { ...baseTarget, credential: "" },
        message: "MIGRATION_STARTUP_CONFIG_INVALID",
      },
      ...["template0", "template1"].map((database) => ({
        caseName: `database-${database}`,
        target: { ...baseTarget, database },
        message: "MIGRATION_NAMESPACE_INVALID",
      })),
      ...["pg_", "pg_catalog", "pg_toast", "pg_temp_1", "information_schema"].map(
        (schema) => ({
          caseName: `schema-${schema}`,
          target: { ...baseTarget, schema },
          message: "MIGRATION_NAMESPACE_INVALID",
        }),
      ),
    ] as const;
    const mismatches: string[] = [];

    try {
      for (const [name] of originalPgEnvironment) {
        process.env[name] = "";
      }
      process.env[scopedProbeEnvironmentName] = "present";

      for (const { caseName, target } of admittedCases) {
        let rejection: unknown;
        try {
          await prepareWithMigrationFactory({ target, manifest, artifactRoot });
        } catch (error) {
          rejection = error;
        }
        if (
          !(rejection instanceof Error) ||
          rejection.message !==
            `MIGRATION_STARTUP_CONFIG_INVALID ambient=${scopedProbeEnvironmentName}` ||
          (rejection as Error & { readonly result?: unknown }).result !== 1
        ) {
          mismatches.push(`admitted-${caseName}`);
        }
      }

      for (const { caseName, target, message } of rejectedCases) {
        let rejection: unknown;
        try {
          await prepareWithMigrationFactory({
            target: target as unknown as MigrationTargetState,
            manifest,
            artifactRoot,
          });
        } catch (error) {
          rejection = error;
        }
        if (
          !(rejection instanceof Error) ||
          rejection.message !== message ||
          (rejection as Error & { readonly result?: unknown }).result !== 1
        ) {
          mismatches.push(caseName);
        }
      }
    } finally {
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
      if (originalProbeValue === undefined) {
        delete process.env[scopedProbeEnvironmentName];
      } else {
        process.env[scopedProbeEnvironmentName] = originalProbeValue;
      }
    }

    expect(capturePgEnvironment()).toEqual(originalPgEnvironment);
    if (mismatches.length > 0) {
      throw new Error(
        `MIGRATION_LOCAL_TARGET_PROFILE_REJECTION_INCOMPLETE cases=${mismatches.join(",")}`,
      );
    }
  });

  it("rejects ambient PG environment at both factory-controlled checks", async () => {
    const arbitraryPgName = `PGTASK004ARBITRARY${process.pid}`;
    const barrierPgName = `PGTASK004BARRIER${process.pid}`;
    const latePgName = `PGTASK004LATE${process.pid}`;
    const lowerCasePgName = `pgtask004lower${process.pid}`;
    const postgresExemptName = `POSTGRES_TASK004_AMBIENT_${process.pid}`;
    const originalPgEnvironment = capturePgEnvironment();
    const originalPostgresValue = process.env[postgresExemptName];
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
    const artifactRoot = new URL("file:///migration-artifact/");
    const target: MigrationTargetState = {
      host: "127.0.0.1",
      port: 1,
      database: "database",
      schema: "schema",
      user: "user",
      credential: "test-only-credential",
    };
    const sequelizeSpecifier: string = "sequelize";
    const sequelizeModule = (await import(sequelizeSpecifier)) as unknown as {
      Sequelize: {
        prototype: {
          transaction(this: unknown, ...args: unknown[]): Promise<unknown>;
        };
      };
    };
    const sequelizePrototype = sequelizeModule.Sequelize.prototype;
    const originalTransaction = sequelizePrototype.transaction;
    const originalObjectEntries = Object.entries;
    const firstCheckNames = [
      "PGHOST",
      "PGPORT",
      "PGDATABASE",
      "PGUSER",
      "PGPASSWORD",
      "PGPASSFILE",
      "PGSERVICE",
      "PGOPTIONS",
      "PGAPPNAME",
      "PGCLIENT_ENCODING",
      "PGREPLICATION",
      "PGSSLNEGOTIATION",
      arbitraryPgName,
      ...(process.platform === "win32" ? [lowerCasePgName] : []),
    ];
    const mismatches: string[] = [];
    let transactionCalls = 0;
    let processEnvironmentEnumerations = 0;

    const observeRejection = async (): Promise<unknown> => {
      try {
        await prepareWithMigrationFactory({ target, manifest, artifactRoot });
      } catch (error) {
        return error;
      }
      return undefined;
    };
    const enumeratedNameFor = (name: string): string =>
      Object.keys(process.env).find((candidate) =>
        process.platform === "win32"
          ? candidate.toUpperCase() === name.toUpperCase()
          : candidate === name,
      ) ?? name;

    try {
      for (const [name] of originalPgEnvironment) {
        process.env[name] = "";
      }

      for (const [index, name] of firstCheckNames.entries()) {
        process.env[name] = `test-only-value-${index}`;
        const enumeratedName = enumeratedNameFor(name);
        const rejection = await observeRejection();
        if (
          !(rejection instanceof Error) ||
          rejection.message !==
            `MIGRATION_STARTUP_CONFIG_INVALID ambient=${enumeratedName}` ||
          (rejection as Error & { readonly result?: unknown }).result !== 1
        ) {
          mismatches.push(`first-check-${index + 1}`);
        }
        process.env[name] = "";
      }

      process.env.PGTASK004EMPTYEXEMPT = "";
      process.env[barrierPgName] = "barrier-value";
      let rejection = await observeRejection();
      const enumeratedBarrierName = enumeratedNameFor(barrierPgName);
      if (
        !(rejection instanceof Error) ||
        rejection.message !==
          `MIGRATION_STARTUP_CONFIG_INVALID ambient=${enumeratedBarrierName}` ||
        (rejection as Error & { readonly result?: unknown }).result !== 1
      ) {
        mismatches.push("empty-pg-exemption");
      }
      process.env[barrierPgName] = "";

      process.env[postgresExemptName] = "postgres-exempt-value";
      process.env[barrierPgName] = "barrier-value";
      rejection = await observeRejection();
      if (
        !(rejection instanceof Error) ||
        rejection.message !==
          `MIGRATION_STARTUP_CONFIG_INVALID ambient=${enumeratedBarrierName}` ||
        (rejection as Error & { readonly result?: unknown }).result !== 1
      ) {
        mismatches.push("postgres-exemption");
      }
      process.env[barrierPgName] = "";
      delete process.env.PGTASK004EMPTYEXEMPT;

      const patchedTransaction = async function (
        this: unknown,
        ..._args: unknown[]
      ): Promise<unknown> {
        transactionCalls += 1;
        throw new Error("MIGRATION_AMBIENT_PG_GUARD_TRANSACTION_REACHED");
      };
      const patchedObjectEntries = ((object: object) => {
        const entries = originalObjectEntries(object);
        if (object === process.env) {
          processEnvironmentEnumerations += 1;
          if (processEnvironmentEnumerations === 1) {
            process.env[latePgName] = "late-test-only-value";
          }
        }
        return entries;
      }) as typeof Object.entries;

      try {
        sequelizePrototype.transaction = patchedTransaction;
        Object.entries = patchedObjectEntries;
        rejection = await observeRejection();
      } finally {
        Object.entries = originalObjectEntries;
        sequelizePrototype.transaction = originalTransaction;
      }

      const enumeratedLateName = enumeratedNameFor(latePgName);
      if (
        !(rejection instanceof Error) ||
        rejection.message !==
          `MIGRATION_STARTUP_CONFIG_INVALID ambient=${enumeratedLateName}` ||
        (rejection as Error & { readonly result?: unknown }).result !== 1 ||
        processEnvironmentEnumerations < 2 ||
        transactionCalls !== 0
      ) {
        mismatches.push("second-check-late-mutation");
      }
    } finally {
      Object.entries = originalObjectEntries;
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
      if (originalPostgresValue === undefined) {
        delete process.env[postgresExemptName];
      } else {
        process.env[postgresExemptName] = originalPostgresValue;
      }
    }

    expect(Object.entries).toBe(originalObjectEntries);
    expect(sequelizePrototype.transaction).toBe(originalTransaction);
    expect(capturePgEnvironment()).toEqual(originalPgEnvironment);
    expect(process.env[postgresExemptName]).toBe(originalPostgresValue);
    if (mismatches.length > 0) {
      throw new Error(
        `MIGRATION_AMBIENT_PG_GUARD_INCOMPLETE cases=${mismatches.join(",")}`,
      );
    }
  });
});
