import { createHash, randomUUID } from "node:crypto";
import { cp, lstat, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { Session } from "node:inspector/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { Client } from "pg";
import { describe, expect, it } from "vitest";

import {
  withPostgresNamespace,
  withPostgresSchemaPair,
} from "./postgres-lifecycle.js";

interface PostgresControl {
  readonly database: string;
  readonly user: string;
  readonly password: string;
  readonly port: number;
}

interface AllocatedNamespace {
  readonly database: string;
  readonly schema: string;
  readonly target: object;
}

interface ArtifactInput {
  readonly path: string;
  readonly sourceSha256: string;
}

interface ArtifactFile {
  readonly path: string;
  readonly role: string;
  readonly sha256: string;
}

interface ArtifactMapping {
  readonly migrationId: string;
  readonly sourcePath: string;
  readonly sourceSha256: string;
  readonly emittedPath: string;
  readonly emittedSha256: string;
}

interface MigrationManifest {
  readonly schemaVersion: string;
  readonly buildId: string;
  readonly toolchain: {
    readonly exactTypeScriptVersion: string;
    readonly exactNodeTarget: string;
  };
  readonly inputs: readonly ArtifactInput[];
  readonly files: readonly ArtifactFile[];
  readonly mappings: readonly ArtifactMapping[];
}

interface ArtifactReport {
  readonly buildId: string;
  readonly buildRoot: string;
  readonly manifestPath: string;
  readonly manifestSha256: string;
}

interface PreparationReport {
  readonly operation: "up";
  readonly result: 0;
  readonly buildId: string;
  readonly noOp: boolean;
  readonly applied: readonly {
    readonly migrationId: string;
    readonly sourceSha256: string;
  }[];
  readonly pending: readonly string[];
  readonly namespace: {
    readonly database: string;
    readonly schema: string;
    readonly lockVersion: "v2";
    readonly lockKey: string;
  };
  readonly startup: {
    readonly startupClientEncoding: "UTF8";
    readonly startupSearchPath: "pg_catalog";
    readonly serverEncoding: "UTF8";
    readonly serverVersionNum: 180006;
    readonly currentUserName: string;
    readonly maxIdentifierLength: 63;
    readonly databaseIsTemplate: false;
    readonly databaseAllowsConnections: true;
  };
}

interface MigrationStatusReport {
  readonly operation: "status";
  readonly result: 0;
  readonly buildId: string;
  readonly checksumAgreement: true;
  readonly applied: readonly {
    readonly migrationId: string;
    readonly sourceSha256: string;
  }[];
  readonly pending: readonly {
    readonly migrationId: string;
    readonly sourceSha256: string;
  }[];
  readonly namespace: PreparationReport["namespace"];
  readonly startup: PreparationReport["startup"];
}

interface MigrationDownReport {
  readonly operation: "down";
  readonly result: 0;
  readonly buildId: string;
  readonly noOp: true;
  readonly reverted: readonly {
    readonly migrationId: string;
    readonly sourceSha256: string;
  }[];
  readonly remaining: readonly {
    readonly migrationId: string;
    readonly sourceSha256: string;
  }[];
  readonly namespace: PreparationReport["namespace"];
  readonly startup: PreparationReport["startup"];
}

type BuildMigrationArtifact = () => Promise<ArtifactReport>;
type PrepareMigratedNamespace = (options: {
  readonly target: object;
  readonly buildRoot: string;
}) => Promise<PreparationReport>;
type InspectMigrationStatus = (options: {
  readonly target: object;
  readonly buildRoot: string;
}) => Promise<MigrationStatusReport>;
type RevertMigratedNamespace = (options: {
  readonly target: object;
  readonly buildRoot: string;
  readonly selector?:
    | { readonly kind: "last" }
    | {
        readonly kind: "step";
        readonly count: number;
        readonly confirmMultiple: boolean;
      }
    | { readonly kind: "keep-through"; readonly migrationId: string };
}) => Promise<MigrationDownReport>;

const artifactSchemaVersion =
  "rick-and-morty-explorer:migration-artifact:v1";
const migrationId = "20260814000000-create-relational-schema";
const sha256Pattern = /^[0-9a-f]{64}$/u;
const namespacePattern = /^task_004_[0-9a-f]{16}$/u;
const canonicalPathPattern =
  /^(?!.*(?:^|\/)\.\.?(?:\/|$))(?!.*\/\/)[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)*$/u;
const repositoryRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../..",
);

function loadControl(): PostgresControl {
  return {
    database: process.env.POSTGRES_DB ?? "rick_and_morty",
    user: process.env.POSTGRES_USER ?? "rick_and_morty",
    password: process.env.POSTGRES_PASSWORD ?? "local-development-only",
    port: Number(process.env.POSTGRES_PORT ?? "5432"),
  };
}

function createClient(
  control: PostgresControl,
  database = control.database,
): Client {
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

function quoteIdentifier(identifier: string): string {
  if (!namespacePattern.test(identifier)) {
    throw new Error(`Unsafe run-owned identifier: ${identifier}`);
  }
  return `"${identifier}"`;
}

function sha256(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function normalizeSource(bytes: Uint8Array): Uint8Array {
  if (
    bytes.length >= 3 &&
    bytes[0] === 0xef &&
    bytes[1] === 0xbb &&
    bytes[2] === 0xbf
  ) {
    throw new Error("Artifact source contains a UTF-8 BOM");
  }
  const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  return new TextEncoder().encode(decoded.replaceAll("\r\n", "\n").replaceAll("\r", "\n"));
}

function lp(value: string): Uint8Array {
  const valueBytes = new TextEncoder().encode(value);
  const framed = new Uint8Array(4 + valueBytes.length);
  new DataView(framed.buffer).setUint32(0, valueBytes.length, false);
  framed.set(valueBytes, 4);
  return framed;
}

function recomputeBuildId(manifest: MigrationManifest): string {
  const frames: Uint8Array[] = [
    lp(manifest.schemaVersion),
    lp(manifest.toolchain.exactTypeScriptVersion),
    lp(manifest.toolchain.exactNodeTarget),
    lp("inputs"),
    lp(String(manifest.inputs.length)),
  ];
  for (const input of manifest.inputs) {
    frames.push(lp(input.path), lp(input.sourceSha256));
  }
  frames.push(lp("outputs"), lp(String(manifest.files.length)));
  for (const file of manifest.files) {
    frames.push(lp(file.path), lp(file.role), lp(file.sha256));
  }
  frames.push(lp("mappings"), lp(String(manifest.mappings.length)));
  for (const mapping of manifest.mappings) {
    frames.push(
      lp(mapping.migrationId),
      lp(mapping.sourcePath),
      lp(mapping.sourceSha256),
      lp(mapping.emittedPath),
      lp(mapping.emittedSha256),
    );
  }
  return sha256(Buffer.concat(frames.map((frame) => Buffer.from(frame))));
}

function expectCanonicalSortedPaths(paths: readonly string[]): void {
  for (const path of paths) {
    expect(path).toMatch(canonicalPathPattern);
    expect(path.includes("\\")).toBe(false);
  }
  const sorted = [...paths].sort((left, right) =>
    Buffer.compare(Buffer.from(left), Buffer.from(right)),
  );
  expect(paths).toEqual(sorted);
  expect(new Set(paths).size).toBe(paths.length);
}

async function enumerateArtifactFiles(root: string): Promise<string[]> {
  const files: string[] = [];
  async function visit(directory: string): Promise<void> {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const absolutePath = join(directory, entry.name);
      const metadata = await lstat(absolutePath);
      expect(metadata.isSymbolicLink()).toBe(false);
      if (entry.isDirectory()) {
        await visit(absolutePath);
      } else {
        expect(entry.isFile()).toBe(true);
        files.push(relative(root, absolutePath).replaceAll("\\", "/"));
      }
    }
  }
  await visit(root);
  return files.sort((left, right) =>
    Buffer.compare(Buffer.from(left), Buffer.from(right)),
  );
}

function isMissingArtifactModule(error: unknown): boolean {
  return (
    error instanceof Error &&
    "code" in error &&
    error.code === "ERR_MODULE_NOT_FOUND" &&
    error.message.includes("migration-artifact.js")
  );
}

async function loadFutureBoundary(): Promise<{
  readonly buildMigrationArtifact: BuildMigrationArtifact;
  readonly prepareMigratedNamespace: PrepareMigratedNamespace;
}> {
  const artifactSpecifier = "./migration-artifact.js";
  let artifactModule: Record<string, unknown>;
  try {
    artifactModule = (await import(
      /* @vite-ignore */ artifactSpecifier
    )) as Record<string, unknown>;
  } catch (error) {
    if (!isMissingArtifactModule(error)) {
      throw error;
    }
    throw new Error(
      "MIGRATION_ARTIFACT_LIFECYCLE_MISSING_AFTER_NAMESPACE_ALLOCATION",
      { cause: error },
    );
  }

  const lifecycleModule = (await import(
    "./postgres-lifecycle.js"
  )) as unknown as Record<string, unknown>;
  expect(artifactModule.buildMigrationArtifact).toBeTypeOf("function");
  expect(lifecycleModule.prepareMigratedNamespace).toBeTypeOf("function");
  return {
    buildMigrationArtifact:
      artifactModule.buildMigrationArtifact as BuildMigrationArtifact,
    prepareMigratedNamespace:
      lifecycleModule.prepareMigratedNamespace as PrepareMigratedNamespace,
  };
}

async function loadMigrationStatusBoundary(): Promise<InspectMigrationStatus> {
  const lifecycleSpecifier = "./postgres-lifecycle.js";
  const lifecycleModule = (await import(
    /* @vite-ignore */ lifecycleSpecifier
  )) as Record<string, unknown>;
  const inspectMigrationStatus = lifecycleModule.inspectMigrationStatus;
  if (typeof inspectMigrationStatus !== "function") {
    throw new Error(
      "MIGRATION_STATUS_BOUNDARY_MISSING_AFTER_ARTIFACT_AUTHENTICATION",
      { cause: new TypeError("inspectMigrationStatus is not a function") },
    );
  }
  return inspectMigrationStatus as InspectMigrationStatus;
}

async function loadMigrationDownBoundary(): Promise<RevertMigratedNamespace> {
  const lifecycleSpecifier = "./postgres-lifecycle.js";
  const lifecycleModule = (await import(
    /* @vite-ignore */ lifecycleSpecifier
  )) as Record<string, unknown>;
  const revertMigratedNamespace = lifecycleModule.revertMigratedNamespace;
  if (typeof revertMigratedNamespace !== "function") {
    throw new Error(
      "MIGRATION_DOWN_BOUNDARY_MISSING_AFTER_ARTIFACT_AUTHENTICATION",
      { cause: new TypeError("revertMigratedNamespace is not a function") },
    );
  }
  return revertMigratedNamespace as RevertMigratedNamespace;
}

async function authenticateArtifact(
  artifact: ArtifactReport,
): Promise<MigrationManifest> {
  expect(artifact.buildId).toMatch(sha256Pattern);
  expect(artifact.buildRoot).toBe(resolve(artifact.buildRoot));
  expect(artifact.buildRoot).toBe(
    join(
      repositoryRoot,
      "apps/api/dist/infrastructure/database/migrations/builds",
      artifact.buildId,
    ),
  );
  expect(artifact.manifestPath).toBe(
    join(artifact.buildRoot, "migration-manifest.json"),
  );

  const manifestBytes = await readFile(artifact.manifestPath);
  expect(artifact.manifestSha256).toBe(sha256(manifestBytes));
  const manifest = JSON.parse(
    new TextDecoder("utf-8", { fatal: true }).decode(manifestBytes),
  ) as MigrationManifest;
  expect(manifest).toMatchObject({
    schemaVersion: artifactSchemaVersion,
    buildId: artifact.buildId,
    toolchain: {
      exactTypeScriptVersion: "6.0.3",
      exactNodeTarget: "node24",
    },
  });
  expect(Object.keys(manifest).sort()).toEqual(
    ["buildId", "files", "inputs", "mappings", "schemaVersion", "toolchain"],
  );
  expectCanonicalSortedPaths(manifest.inputs.map(({ path }) => path));
  expectCanonicalSortedPaths(manifest.files.map(({ path }) => path));
  expect(manifest.mappings).toHaveLength(1);
  expect(manifest.mappings[0]?.migrationId).toBe(migrationId);
  expect(manifest.mappings).toEqual(
    [...manifest.mappings].sort((left, right) =>
      Buffer.compare(
        Buffer.from(left.migrationId),
        Buffer.from(right.migrationId),
      ),
    ),
  );

  const requiredInputs = [
    "apps/api/package.json",
    "apps/api/src/infrastructure/database/migration-artifact.ts",
    "apps/api/src/infrastructure/database/migrations/20260814000000-create-relational-schema.ts",
    "apps/api/src/infrastructure/database/postgres-lifecycle.ts",
    "apps/api/tsconfig.migrations.json",
    "package-lock.json",
  ];
  const inputPaths = manifest.inputs.map(({ path }) => path);
  for (const requiredInput of requiredInputs) {
    expect(inputPaths).toContain(requiredInput);
  }
  for (const input of manifest.inputs) {
    expect(input.sourceSha256).toMatch(sha256Pattern);
    const sourceBytes = await readFile(join(repositoryRoot, input.path));
    expect(input.sourceSha256).toBe(sha256(normalizeSource(sourceBytes)));
  }

  const expectedFiles = [
    ...manifest.files.map(({ path }) => path),
    "migration-manifest.json",
  ].sort((left, right) =>
    Buffer.compare(Buffer.from(left), Buffer.from(right)),
  );
  expect(await enumerateArtifactFiles(artifact.buildRoot)).toEqual(expectedFiles);
  for (const file of manifest.files) {
    expect(file.role).toMatch(/^[a-z][a-z0-9-]*$/u);
    expect(file.sha256).toMatch(sha256Pattern);
    expect(file.path.endsWith(".ts")).toBe(false);
    expect(file.sha256).toBe(sha256(await readFile(join(artifact.buildRoot, file.path))));
  }
  for (const javascriptFile of manifest.files.filter(({ path }) =>
    path.endsWith(".js"),
  )) {
    expect(manifest.files.some(({ path }) => path === `${javascriptFile.path}.map`)).toBe(
      true,
    );
  }

  const mapping = manifest.mappings[0];
  expect(mapping).toBeDefined();
  expect(mapping?.sourcePath.endsWith(`/${migrationId}.ts`)).toBe(true);
  expect(mapping?.emittedPath.endsWith(`/${migrationId}.js`)).toBe(true);
  expect(mapping?.sourceSha256).toBe(
    manifest.inputs.find(({ path }) => path === mapping?.sourcePath)?.sourceSha256,
  );
  const emittedFile = manifest.files.find(
    ({ path }) => path === mapping?.emittedPath,
  );
  expect(emittedFile).toMatchObject({ role: "migration", sha256: mapping?.emittedSha256 });
  expect(manifest.buildId).toBe(recomputeBuildId(manifest));

  const runner = manifest.files.find(
    ({ path, role }) => role === "runner" && path.endsWith(".js"),
  );
  expect(runner).toBeDefined();
  await import(pathToFileURL(join(artifact.buildRoot, runner?.path ?? "")).href);
  return manifest;
}

async function expectPgCode(operation: Promise<unknown>, code: string): Promise<void> {
  try {
    await operation;
    expect.unreachable(`Expected PostgreSQL error ${code}`);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error).toHaveProperty("code", code);
  }
}

async function inspectMigratedSchema(
  control: PostgresControl,
  namespace: AllocatedNamespace,
  manifest: MigrationManifest,
): Promise<void> {
  const schema = quoteIdentifier(namespace.schema);
  await withClient(
    control,
    async (client) => {
      const tables = await client.query<{ table_name: string }>(
        `SELECT table_name
           FROM information_schema.tables
          WHERE table_schema = $1 AND table_type = 'BASE TABLE'
          ORDER BY table_name`,
        [namespace.schema],
      );
      expect(tables.rows.map(({ table_name }) => table_name)).toEqual([
        "characters",
        "comments",
        "sequelize_migration_history",
      ]);

      const columns = await client.query<{
        table_name: string;
        column_name: string;
        data_type: string;
        not_null: boolean;
        is_identity: string;
        identity_generation: string | null;
        column_default: string | null;
      }>(
        `SELECT table_name,
                column_name,
                data_type,
                is_nullable = 'NO' AS not_null,
                is_identity,
                identity_generation,
                column_default
           FROM information_schema.columns
          WHERE table_schema = $1
          ORDER BY table_name, ordinal_position`,
        [namespace.schema],
      );
      expect(columns.rows).toEqual([
        { table_name: "characters", column_name: "id", data_type: "integer", not_null: true, is_identity: "NO", identity_generation: null, column_default: null },
        ...["name", "status", "species", "character_type", "gender", "origin_name", "origin_url", "image_url"].map((column_name) => ({ table_name: "characters", column_name, data_type: "text", not_null: true, is_identity: "NO", identity_generation: null, column_default: null })),
        { table_name: "characters", column_name: "is_favorite", data_type: "boolean", not_null: true, is_identity: "NO", identity_generation: null, column_default: "false" },
        { table_name: "characters", column_name: "created_at", data_type: "timestamp with time zone", not_null: true, is_identity: "NO", identity_generation: null, column_default: "CURRENT_TIMESTAMP" },
        { table_name: "characters", column_name: "updated_at", data_type: "timestamp with time zone", not_null: true, is_identity: "NO", identity_generation: null, column_default: "CURRENT_TIMESTAMP" },
        { table_name: "comments", column_name: "id", data_type: "integer", not_null: true, is_identity: "YES", identity_generation: "BY DEFAULT", column_default: null },
        { table_name: "comments", column_name: "character_id", data_type: "integer", not_null: true, is_identity: "NO", identity_generation: null, column_default: null },
        { table_name: "comments", column_name: "body", data_type: "text", not_null: true, is_identity: "NO", identity_generation: null, column_default: null },
        { table_name: "comments", column_name: "created_at", data_type: "timestamp with time zone", not_null: true, is_identity: "NO", identity_generation: null, column_default: "CURRENT_TIMESTAMP" },
        { table_name: "comments", column_name: "updated_at", data_type: "timestamp with time zone", not_null: true, is_identity: "NO", identity_generation: null, column_default: "CURRENT_TIMESTAMP" },
        { table_name: "sequelize_migration_history", column_name: "migration_id", data_type: "text", not_null: true, is_identity: "NO", identity_generation: null, column_default: null },
        { table_name: "sequelize_migration_history", column_name: "source_sha256", data_type: "text", not_null: true, is_identity: "NO", identity_generation: null, column_default: null },
        { table_name: "sequelize_migration_history", column_name: "applied_at", data_type: "timestamp with time zone", not_null: true, is_identity: "NO", identity_generation: null, column_default: "CURRENT_TIMESTAMP" },
      ]);

      const constraints = await client.query<{
        constraint_name: string;
        constraint_type: string;
      }>(
        `SELECT table_constraint.constraint_name,
                table_constraint.constraint_type
           FROM information_schema.table_constraints AS table_constraint
           JOIN pg_catalog.pg_namespace AS table_namespace
             ON table_namespace.nspname = table_constraint.table_schema
           JOIN pg_catalog.pg_class AS constrained_relation
             ON constrained_relation.relnamespace = table_namespace.oid
            AND constrained_relation.relname = table_constraint.table_name
           JOIN pg_catalog.pg_constraint AS catalog_constraint
             ON catalog_constraint.connamespace = table_namespace.oid
            AND catalog_constraint.conrelid = constrained_relation.oid
            AND catalog_constraint.conname = table_constraint.constraint_name
          WHERE table_constraint.table_schema = $1
            AND catalog_constraint.contype <> 'n'
          ORDER BY table_constraint.constraint_name`,
        [namespace.schema],
      );
      expect(constraints.rows).toEqual([
        { constraint_name: "characters_pkey", constraint_type: "PRIMARY KEY" },
        { constraint_name: "comments_body_length_check", constraint_type: "CHECK" },
        { constraint_name: "comments_character_id_fkey", constraint_type: "FOREIGN KEY" },
        { constraint_name: "comments_pkey", constraint_type: "PRIMARY KEY" },
        { constraint_name: "sequelize_migration_history_pkey", constraint_type: "PRIMARY KEY" },
      ]);

      const foreignKey = await client.query<{
        update_rule: string;
        delete_rule: string;
      }>(
        `SELECT update_rule, delete_rule
           FROM information_schema.referential_constraints
          WHERE constraint_schema = $1
            AND constraint_name = 'comments_character_id_fkey'`,
        [namespace.schema],
      );
      expect(foreignKey.rows).toEqual([{ update_rule: "RESTRICT", delete_rule: "RESTRICT" }]);

      const indexes = await client.query<{ indexname: string; indexdef: string }>(
        `SELECT indexname, indexdef
           FROM pg_catalog.pg_indexes
          WHERE schemaname = $1
          ORDER BY indexname`,
        [namespace.schema],
      );
      expect(indexes.rows.map(({ indexname }) => indexname)).toEqual([
        "characters_pkey",
        "comments_character_id_idx",
        "comments_pkey",
        "sequelize_migration_history_pkey",
      ]);
      expect(
        indexes.rows.find(({ indexname }) => indexname === "comments_character_id_idx")
          ?.indexdef,
      ).toContain("USING btree (character_id)");

      const history = await client.query<{
        migration_id: string;
        source_sha256: string;
      }>(`SELECT migration_id, source_sha256 FROM ${schema}.sequelize_migration_history`);
      expect(history.rows).toEqual([
        {
          migration_id: migrationId,
          source_sha256: manifest.mappings[0]?.sourceSha256,
        },
      ]);

      const character = await client.query<{
        id: number;
        is_favorite: boolean;
        created_at: Date;
        updated_at: Date;
      }>(
        `INSERT INTO ${schema}.characters
           (id, name, status, species, character_type, gender, origin_name, origin_url, image_url)
         VALUES (1, 'Rick Sanchez', 'Alive', 'Human', '', 'Male', 'Earth', 'https://example.invalid/origin', 'https://example.invalid/avatar.jpeg')
         RETURNING id, is_favorite, created_at, updated_at`,
      );
      expect(character.rows[0]).toMatchObject({ id: 1, is_favorite: false });
      expect(character.rows[0]?.created_at).toBeInstanceOf(Date);
      expect(character.rows[0]?.updated_at).toBeInstanceOf(Date);
      await client.query(
        `INSERT INTO ${schema}.comments (character_id, body) VALUES (1, 'Wubba lubba dub dub')`,
      );
      const favorite = await client.query<{ is_favorite: boolean }>(
        `UPDATE ${schema}.characters SET is_favorite = true WHERE id = 1 RETURNING is_favorite`,
      );
      expect(favorite.rows).toEqual([{ is_favorite: true }]);

      await expectPgCode(
        client.query(`INSERT INTO ${schema}.comments (character_id, body) VALUES (999, 'orphan')`),
        "23503",
      );
      await expectPgCode(
        client.query(`INSERT INTO ${schema}.comments (character_id, body) VALUES (1, '')`),
        "23514",
      );
      await expectPgCode(
        client.query(`INSERT INTO ${schema}.comments (character_id, body) VALUES (1, $1)`, ["x".repeat(1001)]),
        "23514",
      );
      await expectPgCode(
        client.query(
          `INSERT INTO ${schema}.characters
             (id, name, status, species, character_type, gender, origin_name, origin_url, image_url)
           VALUES (2, 'Morty Smith', 'Alive', 'Human', '', 'Male', 'Earth', 'https://example.invalid/origin', NULL)`,
        ),
        "23502",
      );
    },
    namespace.database,
  );
}

function expectPreparationReport(
  report: PreparationReport,
  namespace: AllocatedNamespace,
  artifact: ArtifactReport,
  expected: { readonly noOp: boolean; readonly applied: readonly ArtifactMapping[] },
  user: string,
): void {
  expect(report).toEqual({
    operation: "up",
    result: 0,
    buildId: artifact.buildId,
    noOp: expected.noOp,
    applied: expected.applied.map(({ migrationId, sourceSha256 }) => ({
      migrationId,
      sourceSha256,
    })),
    pending: [],
    namespace: {
      database: namespace.database,
      schema: namespace.schema,
      lockVersion: "v2",
      lockKey: expect.stringMatching(/^-?[0-9]+$/u),
    },
    startup: {
      startupClientEncoding: "UTF8",
      startupSearchPath: "pg_catalog",
      serverEncoding: "UTF8",
      serverVersionNum: 180006,
      currentUserName: user,
      maxIdentifierLength: 63,
      databaseIsTemplate: false,
      databaseAllowsConnections: true,
    },
  });
}

async function listOwnedDatabases(control: PostgresControl): Promise<string[]> {
  return withClient(control, async (client) => {
    const result = await client.query<{ datname: string }>(
      `SELECT datname
         FROM pg_catalog.pg_database
        WHERE datname OPERATOR(pg_catalog.~) '^task_004_[0-9a-f]{16}$'
        ORDER BY datname`,
    );
    return result.rows.map(({ datname }) => datname);
  });
}

async function expectEmptyMigrationNamespace(
  control: PostgresControl,
  namespace: AllocatedNamespace,
): Promise<void> {
  await withClient(
    control,
    async (client) => {
      const catalog = await client.query<{
        table_count: number;
        history_exists: boolean;
      }>(
        `SELECT pg_catalog.count(*)::integer AS table_count,
                pg_catalog.to_regclass($2) IS NOT NULL AS history_exists
           FROM information_schema.tables
          WHERE table_schema = $1
            AND table_type = 'BASE TABLE'`,
        [
          namespace.schema,
          `${namespace.schema}.sequelize_migration_history`,
        ],
      );
      expect(catalog.rows).toEqual([
        { table_count: 0, history_exists: false },
      ]);
    },
    namespace.database,
  );
}

describe("immutable PostgreSQL migration lifecycle", () => {
  it.each([
    { caseName: "equal-applied", count: 2, confirmMultiple: true },
    { caseName: "above-applied", count: 3, confirmMultiple: true },
    { caseName: "negative", count: -1, confirmMultiple: false },
    { caseName: "fractional", count: 1.5, confirmMultiple: false },
    { caseName: "unacknowledged-multiple", count: 2, confirmMultiple: false },
    { caseName: "over-acknowledged-single-step", count: 1, confirmMultiple: true },
  ])("rejects invalid explicit step selectors without mutating a two-entry history: $caseName", async ({ caseName, count, confirmMultiple }) => {
    const control = loadControl();
    const fixtureRoot = join(
      repositoryRoot,
      "apps/api/dist/task-004-migration-fixtures",
      `${process.pid}-${randomUUID()}`,
    );
    let primaryFailure: unknown;
    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact } = await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          expect(manifest.mappings).toHaveLength(1);
          const fixtureSource = new TextEncoder().encode(
            `export const migration = {\n  async up({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`CREATE TABLE \${schema}.step_two_probe (id integer NOT NULL PRIMARY KEY)\`, { transaction: context.transaction });\n  },\n  async down({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`DROP TABLE \${schema}.step_two_probe\`, { transaction: context.transaction });\n  },\n};\n`,
          );
          const fixtureSourceSha256 = sha256(fixtureSource);
          const fixtureId = "20260814000001-create-step-two-probe";
          const fixtureEmittedPath = `files/${fixtureId}.js`;
          const fixtureInputPath =
            `apps/api/src/infrastructure/database/migrations/${fixtureId}.ts`;
          const identity = {
            ...manifest,
            inputs: [
              ...manifest.inputs,
              { path: fixtureInputPath, sourceSha256: fixtureSourceSha256 },
            ].sort((left, right) => Buffer.compare(Buffer.from(left.path), Buffer.from(right.path))),
            files: [
              ...manifest.files,
              { path: fixtureEmittedPath, role: "migration", sha256: fixtureSourceSha256 },
            ].sort((left, right) => Buffer.compare(Buffer.from(left.path), Buffer.from(right.path))),
            mappings: [
              ...manifest.mappings,
              {
                migrationId: fixtureId,
                sourcePath: fixtureInputPath,
                sourceSha256: fixtureSourceSha256,
                emittedPath: fixtureEmittedPath,
                emittedSha256: fixtureSourceSha256,
              },
            ],
          } satisfies MigrationManifest;
          const fixtureBuildId = recomputeBuildId(identity);
          const fixtureManifest: MigrationManifest = {
            ...identity,
            buildId: fixtureBuildId,
          };
          const fixtureBuildRoot = join(fixtureRoot, fixtureBuildId);
          await mkdir(fixtureRoot, { recursive: true });
          await cp(artifact.buildRoot, fixtureBuildRoot, { recursive: true });
          await writeFile(join(fixtureBuildRoot, fixtureEmittedPath), fixtureSource);
          const factory = (await import(
            pathToFileURL(join(fixtureBuildRoot, "files/factory.js")).href
          )) as {
            prepareWithMigrationFactory(options: Record<string, unknown>): Promise<PreparationReport>;
            revertWithMigrationFactory(options: Record<string, unknown>): Promise<MigrationDownReport>;
          };
          const target = {
            host: "127.0.0.1",
            port: control.port,
            database: namespace.database,
            schema: namespace.schema,
            user: control.user,
            credential: control.password,
          };
          const options = {
            target,
            manifest: fixtureManifest,
            artifactRoot: pathToFileURL(`${fixtureBuildRoot}/`),
          };
          await factory.prepareWithMigrationFactory(options);
          const captureState = () => withClient(control, async (client) => {
            const state = await client.query<{ table_name: string }>(
              `SELECT table_name FROM information_schema.tables WHERE table_schema = $1 AND table_type = 'BASE TABLE' ORDER BY table_name`,
              [namespace.schema],
            );
            const history = await client.query<{ migration_id: string; source_sha256: string }>(
              `SELECT migration_id, source_sha256 FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history ORDER BY migration_id`,
            );
            return {
              tables: state.rows.map(({ table_name }) => table_name),
              history: history.rows,
            };
          }, namespace.database);
          const beforeRollback = await captureState();
          expect(beforeRollback).toEqual({
            tables: ["characters", "comments", "sequelize_migration_history", "step_two_probe"],
            history: fixtureManifest.mappings.map(({ migrationId, sourceSha256 }) => ({ migration_id: migrationId, source_sha256: sourceSha256 })),
          });
          console.info(`MIGRATION_ROLLBACK_INVALID_STEP_SELECTOR_READY case=${caseName} database=${namespace.database} schema=${namespace.schema} build=${fixtureBuildId} applied=2 count=${count} confirmMultiple=${confirmMultiple}`);
          let rejection: unknown;
          try {
            await factory.revertWithMigrationFactory({
              ...options,
              selector: { kind: "step", count, confirmMultiple },
            });
          } catch (error) {
            rejection = error;
          }
          if (rejection === undefined) {
            throw new Error(`MIGRATION_ROLLBACK_INVALID_STEP_SELECTOR_ACCEPTED_AFTER_MIGRATION case=${caseName}`);
          }
          expect(rejection).toBeInstanceOf(Error);
          expect(rejection).toMatchObject({ message: "MIGRATION_ROLLBACK_BOUNDS", result: 1 });
          expect(await captureState()).toEqual(beforeRollback);
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      await rm(fixtureRoot, { recursive: true, force: true });
    }
    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) throw primaryFailure;
  });

  it("reverts two acknowledged steps while retaining the first of three applied migrations", async () => {
    const control = loadControl();
    const fixtureRoot = join(
      repositoryRoot,
      "apps/api/dist/task-004-migration-fixtures",
      `${process.pid}-${randomUUID()}`,
    );
    let primaryFailure: unknown;
    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact } = await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          expect(manifest.mappings).toHaveLength(1);
          const fixtureMigrations = [
            {
              migrationId: "20260814000001-create-step-two-probe",
              tableName: "step_two_probe",
            },
            {
              migrationId: "20260814000002-create-step-three-probe",
              tableName: "step_three_probe",
            },
          ].map(({ migrationId: fixtureMigrationId, tableName }) => {
            const source = new TextEncoder().encode(
              `export const migration = {\n  async up({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`CREATE TABLE \${schema}.${tableName} (id integer NOT NULL PRIMARY KEY)\`, { transaction: context.transaction });\n  },\n  async down({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`DROP TABLE \${schema}.${tableName}\`, { transaction: context.transaction });\n  },\n};\n`,
            );
            const sourceSha256 = sha256(source);
            const emittedPath = `files/${fixtureMigrationId}.js`;
            const sourcePath =
              `apps/api/src/infrastructure/database/migrations/${fixtureMigrationId}.ts`;
            return {
              source,
              input: { path: sourcePath, sourceSha256 },
              file: { path: emittedPath, role: "migration", sha256: sourceSha256 },
              mapping: {
                migrationId: fixtureMigrationId,
                sourcePath,
                sourceSha256,
                emittedPath,
                emittedSha256: sourceSha256,
              },
            };
          });
          const identity = {
            ...manifest,
            inputs: [
              ...manifest.inputs,
              ...fixtureMigrations.map(({ input }) => input),
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            files: [
              ...manifest.files,
              ...fixtureMigrations.map(({ file }) => file),
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            mappings: [
              ...manifest.mappings,
              ...fixtureMigrations.map(({ mapping }) => mapping),
            ],
          } satisfies MigrationManifest;
          const fixtureBuildId = recomputeBuildId(identity);
          const fixtureManifest: MigrationManifest = {
            ...identity,
            buildId: fixtureBuildId,
          };
          const fixtureBuildRoot = join(fixtureRoot, fixtureBuildId);
          await mkdir(fixtureRoot, { recursive: true });
          await cp(artifact.buildRoot, fixtureBuildRoot, { recursive: true });
          await Promise.all(
            fixtureMigrations.map(({ file, source }) =>
              writeFile(join(fixtureBuildRoot, file.path), source),
            ),
          );
          const factory = (await import(
            pathToFileURL(join(fixtureBuildRoot, "files/factory.js")).href
          )) as {
            prepareWithMigrationFactory(options: Record<string, unknown>): Promise<PreparationReport>;
            revertWithMigrationFactory(options: Record<string, unknown>): Promise<MigrationDownReport>;
          };
          const target = {
            host: "127.0.0.1",
            port: control.port,
            database: namespace.database,
            schema: namespace.schema,
            user: control.user,
            credential: control.password,
          };
          const options = {
            target,
            manifest: fixtureManifest,
            artifactRoot: pathToFileURL(`${fixtureBuildRoot}/`),
          };
          const prepared = await factory.prepareWithMigrationFactory(options);
          const fixtureArtifact = { ...artifact, buildId: fixtureBuildId };
          expectPreparationReport(
            prepared,
            namespace,
            fixtureArtifact,
            { noOp: false, applied: fixtureManifest.mappings },
            control.user,
          );
          const captureState = () => withClient(control, async (client) => {
            const state = await client.query<{ table_name: string }>(
              `SELECT table_name FROM information_schema.tables WHERE table_schema = $1 AND table_type = 'BASE TABLE' ORDER BY table_name`,
              [namespace.schema],
            );
            const history = await client.query<{ migration_id: string; source_sha256: string }>(
              `SELECT migration_id, source_sha256 FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history ORDER BY migration_id`,
            );
            return {
              tables: state.rows.map(({ table_name }) => table_name),
              history: history.rows,
            };
          }, namespace.database);
          const expectedHistory = fixtureManifest.mappings.map(
            ({ migrationId: appliedMigrationId, sourceSha256 }) => ({
              migration_id: appliedMigrationId,
              source_sha256: sourceSha256,
            }),
          );
          expect(await captureState()).toEqual({
            tables: [
              "characters",
              "comments",
              "sequelize_migration_history",
              "step_three_probe",
              "step_two_probe",
            ],
            history: expectedHistory,
          });
          console.info(
            `MIGRATION_ROLLBACK_VALID_STEP_TWO_READY database=${namespace.database} schema=${namespace.schema} build=${fixtureBuildId} applied=3 count=2`,
          );

          let reverted: MigrationDownReport;
          try {
            reverted = await factory.revertWithMigrationFactory({
              ...options,
              selector: { kind: "step", count: 2, confirmMultiple: true },
            });
          } catch (error) {
            throw new Error(
              "MIGRATION_ROLLBACK_VALID_STEP_TWO_UNSUPPORTED_AFTER_THREE_MIGRATIONS",
              { cause: error },
            );
          }
          expect(reverted).toEqual({
            operation: "down",
            result: 0,
            buildId: fixtureBuildId,
            noOp: false,
            reverted: fixtureManifest.mappings
              .slice(1)
              .reverse()
              .map(({ migrationId: revertedMigrationId, sourceSha256 }) => ({
                migrationId: revertedMigrationId,
                sourceSha256,
              })),
            remaining: fixtureManifest.mappings
              .slice(0, 1)
              .map(({ migrationId: remainingMigrationId, sourceSha256 }) => ({
                migrationId: remainingMigrationId,
                sourceSha256,
              })),
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });
          expect(await captureState()).toEqual({
            tables: ["characters", "comments", "sequelize_migration_history"],
            history: expectedHistory.slice(0, 1),
          });

          const reapplied = await factory.prepareWithMigrationFactory(options);
          expectPreparationReport(
            reapplied,
            namespace,
            fixtureArtifact,
            { noOp: false, applied: fixtureManifest.mappings.slice(1) },
            control.user,
          );
          expect(await captureState()).toEqual({
            tables: [
              "characters",
              "comments",
              "sequelize_migration_history",
              "step_three_probe",
              "step_two_probe",
            ],
            history: expectedHistory,
          });
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      await rm(fixtureRoot, { recursive: true, force: true });
    }
    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) throw primaryFailure;
  });

  it.each([
    {
      caseName: "first",
      retainIndex: 0,
      retainedTables: ["characters", "comments", "sequelize_migration_history"],
    },
    {
      caseName: "intermediate",
      retainIndex: 1,
      retainedTables: [
        "characters",
        "comments",
        "sequelize_migration_history",
        "step_two_probe",
      ],
    },
  ])("retains an applied migration and reverts only its later suffix: $caseName", async ({ caseName, retainIndex, retainedTables }) => {
    const control = loadControl();
    const fixtureRoot = join(
      repositoryRoot,
      "apps/api/dist/task-004-migration-fixtures",
      `${process.pid}-${randomUUID()}`,
    );
    let primaryFailure: unknown;
    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact } = await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          expect(manifest.mappings).toHaveLength(1);
          const fixtureMigrations = [
            {
              migrationId: "20260814000001-create-step-two-probe",
              tableName: "step_two_probe",
            },
            {
              migrationId: "20260814000002-create-step-three-probe",
              tableName: "step_three_probe",
            },
          ].map(({ migrationId: fixtureMigrationId, tableName }) => {
            const source = new TextEncoder().encode(
              `export const migration = {\n  async up({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`CREATE TABLE \${schema}.${tableName} (id integer NOT NULL PRIMARY KEY)\`, { transaction: context.transaction });\n  },\n  async down({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`DROP TABLE \${schema}.${tableName}\`, { transaction: context.transaction });\n  },\n};\n`,
            );
            const sourceSha256 = sha256(source);
            const emittedPath = `files/${fixtureMigrationId}.js`;
            const sourcePath =
              `apps/api/src/infrastructure/database/migrations/${fixtureMigrationId}.ts`;
            return {
              source,
              input: { path: sourcePath, sourceSha256 },
              file: { path: emittedPath, role: "migration", sha256: sourceSha256 },
              mapping: {
                migrationId: fixtureMigrationId,
                sourcePath,
                sourceSha256,
                emittedPath,
                emittedSha256: sourceSha256,
              },
            };
          });
          const identity = {
            ...manifest,
            inputs: [
              ...manifest.inputs,
              ...fixtureMigrations.map(({ input }) => input),
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            files: [
              ...manifest.files,
              ...fixtureMigrations.map(({ file }) => file),
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            mappings: [
              ...manifest.mappings,
              ...fixtureMigrations.map(({ mapping }) => mapping),
            ],
          } satisfies MigrationManifest;
          const fixtureBuildId = recomputeBuildId(identity);
          const fixtureManifest: MigrationManifest = {
            ...identity,
            buildId: fixtureBuildId,
          };
          const fixtureBuildRoot = join(fixtureRoot, fixtureBuildId);
          await mkdir(fixtureRoot, { recursive: true });
          await cp(artifact.buildRoot, fixtureBuildRoot, { recursive: true });
          await Promise.all(
            fixtureMigrations.map(({ file, source }) =>
              writeFile(join(fixtureBuildRoot, file.path), source),
            ),
          );
          const factory = (await import(
            pathToFileURL(join(fixtureBuildRoot, "files/factory.js")).href
          )) as {
            prepareWithMigrationFactory(options: Record<string, unknown>): Promise<PreparationReport>;
            revertWithMigrationFactory(options: Record<string, unknown>): Promise<MigrationDownReport>;
          };
          const target = {
            host: "127.0.0.1",
            port: control.port,
            database: namespace.database,
            schema: namespace.schema,
            user: control.user,
            credential: control.password,
          };
          const options = {
            target,
            manifest: fixtureManifest,
            artifactRoot: pathToFileURL(`${fixtureBuildRoot}/`),
          };
          await factory.prepareWithMigrationFactory(options);
          const captureState = () => withClient(control, async (client) => {
            const state = await client.query<{ table_name: string }>(
              `SELECT table_name FROM information_schema.tables WHERE table_schema = $1 AND table_type = 'BASE TABLE' ORDER BY table_name`,
              [namespace.schema],
            );
            const history = await client.query<{ migration_id: string; source_sha256: string }>(
              `SELECT migration_id, source_sha256 FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history ORDER BY migration_id`,
            );
            return {
              tables: state.rows.map(({ table_name }) => table_name),
              history: history.rows,
            };
          }, namespace.database);
          const expectedHistory = fixtureManifest.mappings.map(
            ({ migrationId: appliedMigrationId, sourceSha256 }) => ({
              migration_id: appliedMigrationId,
              source_sha256: sourceSha256,
            }),
          );
          expect(await captureState()).toEqual({
            tables: [
              "characters",
              "comments",
              "sequelize_migration_history",
              "step_three_probe",
              "step_two_probe",
            ],
            history: expectedHistory,
          });
          const retainedMapping = fixtureManifest.mappings[retainIndex];
          expect(retainedMapping).toBeDefined();
          console.info(
            `MIGRATION_ROLLBACK_KEEP_THROUGH_PREFIX_READY case=${caseName} database=${namespace.database} schema=${namespace.schema} build=${fixtureBuildId} applied=3 retain=${retainedMapping?.migrationId}`,
          );

          let reverted: MigrationDownReport;
          try {
            reverted = await factory.revertWithMigrationFactory({
              ...options,
              selector: {
                kind: "keep-through",
                migrationId: retainedMapping?.migrationId,
              },
            });
          } catch (error) {
            if (
              error instanceof Error &&
              error.message === "MIGRATION_ROLLBACK_BOUNDS" &&
              (error as Error & { readonly result?: unknown }).result === 1
            ) {
              throw new Error(
                `MIGRATION_ROLLBACK_KEEP_THROUGH_PREFIX_UNSUPPORTED_AFTER_MIGRATION case=${caseName}`,
                { cause: error },
              );
            }
            throw error;
          }
          const retainedCount = retainIndex + 1;
          expect(reverted).toEqual({
            operation: "down",
            result: 0,
            buildId: fixtureBuildId,
            noOp: false,
            reverted: fixtureManifest.mappings
              .slice(retainedCount)
              .reverse()
              .map(({ migrationId: revertedMigrationId, sourceSha256 }) => ({
                migrationId: revertedMigrationId,
                sourceSha256,
              })),
            remaining: fixtureManifest.mappings
              .slice(0, retainedCount)
              .map(({ migrationId: remainingMigrationId, sourceSha256 }) => ({
                migrationId: remainingMigrationId,
                sourceSha256,
              })),
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });
          expect(await captureState()).toEqual({
            tables: retainedTables,
            history: expectedHistory.slice(0, retainedCount),
          });

          const reapplied = await factory.prepareWithMigrationFactory(options);
          expectPreparationReport(
            reapplied,
            namespace,
            { ...artifact, buildId: fixtureBuildId },
            { noOp: false, applied: fixtureManifest.mappings.slice(retainedCount) },
            control.user,
          );
          expect(await captureState()).toEqual({
            tables: [
              "characters",
              "comments",
              "sequelize_migration_history",
              "step_three_probe",
              "step_two_probe",
            ],
            history: expectedHistory,
          });
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      await rm(fixtureRoot, { recursive: true, force: true });
    }
    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) throw primaryFailure;
  });

  it.each([
    { caseName: "non-decimal-step" },
    { caseName: "combined-step-and-target" },
    { caseName: "malformed-target" },
    { caseName: "unknown-target" },
    { caseName: "non-applied-target" },
  ])("rejects invalid rollback target and selector shapes without mutation: $caseName", async ({ caseName }) => {
    const control = loadControl();
    const fixtureRoot = join(
      repositoryRoot,
      "apps/api/dist/task-004-migration-fixtures",
      `${process.pid}-${randomUUID()}`,
    );
    let primaryFailure: unknown;
    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact } = await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          expect(manifest.mappings).toHaveLength(1);
          const fixtureMigrations = [
            {
              migrationId: "20260814000001-create-step-two-probe",
              tableName: "step_two_probe",
            },
            {
              migrationId: "20260814000002-create-step-three-probe",
              tableName: "step_three_probe",
            },
          ].map(({ migrationId: fixtureMigrationId, tableName }) => {
            const source = new TextEncoder().encode(
              `export const migration = {\n  async up({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`CREATE TABLE \${schema}.${tableName} (id integer NOT NULL PRIMARY KEY)\`, { transaction: context.transaction });\n  },\n  async down({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`DROP TABLE \${schema}.${tableName}\`, { transaction: context.transaction });\n  },\n};\n`,
            );
            const sourceSha256 = sha256(source);
            const emittedPath = `files/${fixtureMigrationId}.js`;
            const sourcePath =
              `apps/api/src/infrastructure/database/migrations/${fixtureMigrationId}.ts`;
            return {
              source,
              input: { path: sourcePath, sourceSha256 },
              file: { path: emittedPath, role: "migration", sha256: sourceSha256 },
              mapping: {
                migrationId: fixtureMigrationId,
                sourcePath,
                sourceSha256,
                emittedPath,
                emittedSha256: sourceSha256,
              },
            };
          });
          const identity = {
            ...manifest,
            inputs: [
              ...manifest.inputs,
              ...fixtureMigrations.map(({ input }) => input),
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            files: [
              ...manifest.files,
              ...fixtureMigrations.map(({ file }) => file),
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            mappings: [
              ...manifest.mappings,
              ...fixtureMigrations.map(({ mapping }) => mapping),
            ],
          } satisfies MigrationManifest;
          const fixtureBuildId = recomputeBuildId(identity);
          const fixtureManifest: MigrationManifest = {
            ...identity,
            buildId: fixtureBuildId,
          };
          const fixtureBuildRoot = join(fixtureRoot, fixtureBuildId);
          await mkdir(fixtureRoot, { recursive: true });
          await cp(artifact.buildRoot, fixtureBuildRoot, { recursive: true });
          await Promise.all(
            fixtureMigrations.map(({ file, source }) =>
              writeFile(join(fixtureBuildRoot, file.path), source),
            ),
          );
          const factory = (await import(
            pathToFileURL(join(fixtureBuildRoot, "files/factory.js")).href
          )) as {
            prepareWithMigrationFactory(options: Record<string, unknown>): Promise<PreparationReport>;
            revertWithMigrationFactory(options: Record<string, unknown>): Promise<MigrationDownReport>;
          };
          const target = {
            host: "127.0.0.1",
            port: control.port,
            database: namespace.database,
            schema: namespace.schema,
            user: control.user,
            credential: control.password,
          };
          const options = {
            target,
            manifest: fixtureManifest,
            artifactRoot: pathToFileURL(`${fixtureBuildRoot}/`),
          };
          await factory.prepareWithMigrationFactory(options);
          const captureState = () => withClient(control, async (client) => {
            const state = await client.query<{ table_name: string }>(
              `SELECT table_name FROM information_schema.tables WHERE table_schema = $1 AND table_type = 'BASE TABLE' ORDER BY table_name`,
              [namespace.schema],
            );
            const history = await client.query<{ migration_id: string; source_sha256: string }>(
              `SELECT migration_id, source_sha256 FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history ORDER BY migration_id`,
            );
            return {
              tables: state.rows.map(({ table_name }) => table_name),
              history: history.rows,
            };
          }, namespace.database);
          const expectedHistory = fixtureManifest.mappings.map(
            ({ migrationId: appliedMigrationId, sourceSha256 }) => ({
              migration_id: appliedMigrationId,
              source_sha256: sourceSha256,
            }),
          );
          if (caseName === "non-applied-target") {
            const removedLatest = await factory.revertWithMigrationFactory(options);
            expect(removedLatest.reverted).toEqual([
              {
                migrationId: fixtureManifest.mappings[2]?.migrationId,
                sourceSha256: fixtureManifest.mappings[2]?.sourceSha256,
              },
            ]);
            expect(removedLatest.remaining).toEqual(
              fixtureManifest.mappings
                .slice(0, 2)
                .map(({ migrationId: remainingMigrationId, sourceSha256 }) => ({
                  migrationId: remainingMigrationId,
                  sourceSha256,
                })),
            );
          }
          const beforeInvalid = await captureState();
          const appliedCount = caseName === "non-applied-target" ? 2 : 3;
          expect(beforeInvalid).toEqual({
            tables: caseName === "non-applied-target"
              ? ["characters", "comments", "sequelize_migration_history", "step_two_probe"]
              : [
                  "characters",
                  "comments",
                  "sequelize_migration_history",
                  "step_three_probe",
                  "step_two_probe",
                ],
            history: expectedHistory.slice(0, appliedCount),
          });
          console.info(
            `MIGRATION_ROLLBACK_INVALID_TARGET_SELECTOR_READY case=${caseName} database=${namespace.database} schema=${namespace.schema} build=${fixtureBuildId} applied=${appliedCount}`,
          );
          const selector: Record<string, unknown> = (() => {
            switch (caseName) {
              case "non-decimal-step":
                return { kind: "step", count: "2", confirmMultiple: true };
              case "combined-step-and-target":
                return {
                  kind: "step",
                  count: 1,
                  confirmMultiple: false,
                  migrationId: fixtureManifest.mappings[0]?.migrationId,
                };
              case "malformed-target":
                return { kind: "keep-through", migrationId: "" };
              case "unknown-target":
                return {
                  kind: "keep-through",
                  migrationId: "20260814009999-unknown-target",
                };
              case "non-applied-target":
                return {
                  kind: "keep-through",
                  migrationId: fixtureManifest.mappings[2]?.migrationId,
                };
              default:
                throw new Error(`UNEXPECTED_INVALID_TARGET_SELECTOR_CASE ${caseName}`);
            }
          })();
          let rejection: unknown;
          try {
            await factory.revertWithMigrationFactory({ ...options, selector });
          } catch (error) {
            rejection = error;
          }
          if (rejection === undefined) {
            throw new Error(
              `MIGRATION_ROLLBACK_INVALID_TARGET_SELECTOR_ACCEPTED_AFTER_MIGRATION case=${caseName}`,
            );
          }
          if (
            !(rejection instanceof Error) ||
            rejection.message !== "MIGRATION_ROLLBACK_BOUNDS" ||
            (rejection as Error & { readonly result?: unknown }).result !== 1
          ) {
            throw rejection;
          }
          expect(await captureState()).toEqual(beforeInvalid);
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      await rm(fixtureRoot, { recursive: true, force: true });
    }
    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) throw primaryFailure;
  });

  it(
    "serializes concurrent callers for the same namespace before the waiter reads fresh history",
    async () => {
      const control = loadControl();
      let primaryFailure: unknown;

      try {
        await withPostgresNamespace({
          control,
          body: async (namespace) => {
            const { buildMigrationArtifact, prepareMigratedNamespace } =
              await loadFutureBoundary();
            const artifact = await buildMigrationArtifact();
            const manifest = await authenticateArtifact(artifact);
            const [mapping] = manifest.mappings;
            expect(mapping).toBeDefined();
            if (mapping === undefined) {
              throw new Error("MIGRATION_SAME_NAMESPACE_MAPPING_MISSING");
            }
            await expectEmptyMigrationNamespace(control, namespace);

            type RuntimeConnection = {
              query: (...args: unknown[]) => unknown;
            };
            const sequelizeSpecifier: string = "sequelize";
            const sequelizeModule = (await import(
              sequelizeSpecifier
            )) as unknown as {
              Sequelize: {
                prototype: {
                  transaction(
                    this: unknown,
                    ...args: unknown[]
                  ): Promise<unknown>;
                };
              };
            };
            const sequelizePrototype = sequelizeModule.Sequelize.prototype;
            const originalTransaction = sequelizePrototype.transaction;
            const lockSql = `SELECT pg_catalog.pg_try_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
) AS acquired`;
            const transactionInstances = new Set<unknown>();
            const migrationClients = new Set<RuntimeConnection>();
            const restoredClients = new Set<RuntimeConnection>();
            const lockKeys = new Set<string>();
            const lockQueries = new Map<RuntimeConnection, number>();
            const waiterFalseClients = new Set<RuntimeConnection>();
            const waiterTrueClients = new Set<RuntimeConnection>();
            let winnerClient: RuntimeConnection | undefined;
            let releaseWinner: (() => void) | undefined;
            let winnerObserved: (() => void) | undefined;
            let winnerReleased = false;
            const winnerRelease = new Promise<void>((resolve) => {
              releaseWinner = () => {
                winnerReleased = true;
                resolve();
              };
            });
            const winnerReady = new Promise<void>((resolve) => {
              winnerObserved = resolve;
            });
            const within = <T>(
              operation: Promise<T>,
              timeoutMs: number,
              marker: string,
            ): Promise<T> =>
              new Promise<T>((resolve, reject) => {
                const timer = setTimeout(() => {
                  reject(new Error(marker));
                }, timeoutMs);
                operation.then(
                  (value) => {
                    clearTimeout(timer);
                    resolve(value);
                  },
                  (error: unknown) => {
                    clearTimeout(timer);
                    reject(error);
                  },
                );
              });

            const patchedTransaction = async function (
              this: unknown,
              ...args: unknown[]
            ): Promise<unknown> {
              transactionInstances.add(this);
              const callbackIndex = args.length - 1;
              const callback = args[callbackIndex];
              if (typeof callback !== "function") {
                throw new Error("MIGRATION_SAME_NAMESPACE_CALLBACK_MISSING");
              }
              const wrappedCallback = async (...callbackArgs: unknown[]) => {
                const transaction = callbackArgs[0] as {
                  readonly connection?: RuntimeConnection;
                };
                const client = transaction.connection;
                if (client === undefined) {
                  throw new Error("MIGRATION_SAME_NAMESPACE_CLIENT_MISSING");
                }
                migrationClients.add(client);
                const originalQuery = client.query;
                client.query = async function (
                  ...queryArgs: unknown[]
                ): Promise<unknown> {
                  const request = queryArgs[0];
                  const sql =
                    typeof request === "object" &&
                    request !== null &&
                    "text" in request &&
                    typeof request.text === "string"
                      ? request.text
                      : typeof request === "string"
                        ? request
                        : "";
                  if (sql !== lockSql) {
                    return originalQuery.apply(this, queryArgs);
                  }

                  const values =
                    typeof request === "object" &&
                    request !== null &&
                    "values" in request &&
                    Array.isArray(request.values)
                      ? request.values
                      : undefined;
                  if (
                    values?.length !== 1 ||
                    typeof values[0] !== "string"
                  ) {
                    throw new Error(
                      "MIGRATION_SAME_NAMESPACE_LOCK_REQUEST_INVALID",
                    );
                  }
                  lockKeys.add(values[0]);
                  lockQueries.set(client, (lockQueries.get(client) ?? 0) + 1);
                  const result = (await originalQuery.apply(
                    this,
                    queryArgs,
                  )) as {
                    readonly command?: unknown;
                    readonly fields?: readonly { readonly name?: unknown }[];
                    readonly rows?: readonly (readonly unknown[])[];
                  };
                  const acquired = result.rows?.[0]?.[0];
                  if (
                    result.command !== "SELECT" ||
                    result.fields?.length !== 1 ||
                    result.fields[0]?.name !== "acquired" ||
                    result.rows?.length !== 1 ||
                    result.rows[0]?.length !== 1 ||
                    typeof acquired !== "boolean"
                  ) {
                    throw new Error(
                      "MIGRATION_SAME_NAMESPACE_LOCK_RESULT_INVALID",
                    );
                  }

                  if (acquired) {
                    if (winnerClient === undefined) {
                      winnerClient = client;
                      winnerObserved?.();
                      await within(
                        winnerRelease,
                        5_000,
                        "MIGRATION_SAME_NAMESPACE_WINNER_RELEASE_TIMEOUT",
                      );
                    } else if (client !== winnerClient) {
                      waiterTrueClients.add(client);
                    }
                  } else {
                    await within(
                      winnerReady,
                      5_000,
                      "MIGRATION_SAME_NAMESPACE_WINNER_OBSERVATION_TIMEOUT",
                    );
                    if (client === winnerClient) {
                      throw new Error(
                        "MIGRATION_SAME_NAMESPACE_WINNER_REPORTED_FALSE",
                      );
                    }
                    waiterFalseClients.add(client);
                    releaseWinner?.();
                  }
                  return result;
                };
                try {
                  return await (callback as (...values: unknown[]) => unknown)(
                    ...callbackArgs,
                  );
                } finally {
                  client.query = originalQuery;
                  restoredClients.add(client);
                }
              };
              const wrappedArgs = [...args];
              wrappedArgs[callbackIndex] = wrappedCallback;
              return originalTransaction.apply(this, wrappedArgs);
            };

            console.info(
              `MIGRATION_SAME_NAMESPACE_SERIALIZATION_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId}`,
            );
            let settlements: PromiseSettledResult<PreparationReport>[] = [];
            try {
              sequelizePrototype.transaction = patchedTransaction;
              settlements = await Promise.allSettled([
                prepareMigratedNamespace({
                  target: namespace.target,
                  buildRoot: artifact.buildRoot,
                }),
                prepareMigratedNamespace({
                  target: namespace.target,
                  buildRoot: artifact.buildRoot,
                }),
              ]);
            } finally {
              releaseWinner?.();
              sequelizePrototype.transaction = originalTransaction;
            }

            expect(sequelizePrototype.transaction).toBe(originalTransaction);
            expect(transactionInstances.size).toBe(2);
            expect(migrationClients.size).toBe(2);
            expect(restoredClients).toEqual(migrationClients);
            expect(winnerClient).toBeDefined();
            expect(winnerReleased).toBe(true);
            expect(waiterFalseClients.size).toBe(1);
            expect(waiterFalseClients.has(winnerClient as RuntimeConnection)).toBe(
              false,
            );
            expect(waiterTrueClients).toEqual(waiterFalseClients);
            expect(lockKeys.size).toBe(1);
            expect([...lockQueries.values()].sort()).toEqual(
              expect.arrayContaining([1, expect.any(Number)]),
            );

            const queryMigrationBackends = () =>
              withClient(
                control,
                (client) =>
                  client.query<{ pid: number }>(
                    `SELECT pid::integer AS pid
                       FROM pg_catalog.pg_stat_activity
                      WHERE datname = $1
                        AND application_name = 'rick-and-morty-explorer:migrations'`,
                    [namespace.database],
                  ),
                namespace.database,
              );
            const backendAbsenceDeadline = performance.now() + 2_000;
            let backendPolls = 1;
            let activeAfter = await queryMigrationBackends();
            while (
              activeAfter.rows.length > 0 &&
              performance.now() < backendAbsenceDeadline
            ) {
              await new Promise<void>((resolve) => setTimeout(resolve, 25));
              backendPolls += 1;
              activeAfter = await queryMigrationBackends();
            }
            expect(activeAfter.rows).toEqual([]);

            console.info(
              `MIGRATION_SAME_NAMESPACE_SERIALIZATION_OBSERVED transactions=${transactionInstances.size} clients=${migrationClients.size} lockKeys=${lockKeys.size} falseClients=${waiterFalseClients.size} laterTrueClients=${waiterTrueClients.size} winnerReleased=${String(winnerReleased)} fulfilled=${settlements.filter(({ status }) => status === "fulfilled").length} backendRows=${activeAfter.rows.length} backendPolls=${backendPolls}`,
            );
            try {
              expect(settlements).toHaveLength(2);
              expect(
                settlements.every(({ status }) => status === "fulfilled"),
              ).toBe(true);
              const reports = settlements
                .filter(
                  (
                    settlement,
                  ): settlement is PromiseFulfilledResult<PreparationReport> =>
                    settlement.status === "fulfilled",
                )
                .map(({ value }) => value);
              const applied = reports.find(({ noOp }) => !noOp);
              const noOp = reports.find(({ noOp: reportNoOp }) => reportNoOp);
              expect(applied).toBeDefined();
              expect(noOp).toBeDefined();
              if (applied === undefined || noOp === undefined) {
                throw new Error("MIGRATION_SAME_NAMESPACE_REPORT_MISSING");
              }
              expectPreparationReport(
                applied,
                namespace,
                artifact,
                { noOp: false, applied: [mapping] },
                control.user,
              );
              expectPreparationReport(
                noOp,
                namespace,
                artifact,
                { noOp: true, applied: [] },
                control.user,
              );
              expect(applied.namespace).toEqual(noOp.namespace);
              expect(lockKeys.has(applied.namespace.lockKey)).toBe(true);
              expect(applied.startup).toEqual(noOp.startup);
              await inspectMigratedSchema(control, namespace, manifest);
            } catch {
              throw new Error(
                "MIGRATION_SAME_NAMESPACE_SERIALIZATION_MISSING_AFTER_ARTIFACT_AUTHENTICATION",
              );
            }
          },
        });
      } catch (error) {
        primaryFailure = error;
      }

      expect(await listOwnedDatabases(control)).toEqual([]);
      if (primaryFailure !== undefined) {
        throw primaryFailure;
      }
    },
    20_000,
  );

  it(
    "overlaps ordinary migration callers in disjoint databases using one immutable artifact",
    async () => {
      const control = loadControl();
      let primaryFailure: unknown;

      try {
        const { buildMigrationArtifact, prepareMigratedNamespace } =
          await loadFutureBoundary();
        const artifact = await buildMigrationArtifact();
        const manifest = await authenticateArtifact(artifact);
        const [mapping] = manifest.mappings;
        expect(mapping).toBeDefined();
        if (mapping === undefined) {
          throw new Error("MIGRATION_DISJOINT_DATABASE_MAPPING_MISSING");
        }

        await withPostgresNamespace({
          control,
          body: async (firstNamespace) => {
            await withPostgresNamespace({
              control,
              body: async (secondNamespace) => {
                expect(firstNamespace.database).not.toBe(secondNamespace.database);
                expect(firstNamespace.target).not.toBe(secondNamespace.target);
                await Promise.all([
                  expectEmptyMigrationNamespace(control, firstNamespace),
                  expectEmptyMigrationNamespace(control, secondNamespace),
                ]);

                type RuntimeConnection = {
                  query: (...args: unknown[]) => unknown;
                };
                const sequelizeSpecifier: string = "sequelize";
                const sequelizeModule = (await import(
                  sequelizeSpecifier
                )) as unknown as {
                  Sequelize: {
                    prototype: {
                      transaction(
                        this: unknown,
                        ...args: unknown[]
                      ): Promise<unknown>;
                    };
                  };
                };
                const sequelizePrototype = sequelizeModule.Sequelize.prototype;
                const originalTransaction = sequelizePrototype.transaction;
                const lockSql = `SELECT pg_catalog.pg_try_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
) AS acquired`;
                const transactionInstances = new Set<unknown>();
                const migrationClients = new Set<RuntimeConnection>();
                const restoredClients = new Set<RuntimeConnection>();
                const trueClients = new Set<RuntimeConnection>();
                const observedLockKeys: string[] = [];
                const releasedAtTrueCounts: number[] = [];
                let falseResults = 0;
                let releaseBarrier: (() => void) | undefined;
                let barrierReleased = false;
                const bothLocksAcquired = new Promise<void>((resolve) => {
                  releaseBarrier = () => {
                    barrierReleased = true;
                    resolve();
                  };
                });
                const within = <T>(
                  operation: Promise<T>,
                  timeoutMs: number,
                  marker: string,
                ): Promise<T> =>
                  new Promise<T>((resolve, reject) => {
                    const timer = setTimeout(() => {
                      reject(new Error(marker));
                    }, timeoutMs);
                    operation.then(
                      (value) => {
                        clearTimeout(timer);
                        resolve(value);
                      },
                      (error: unknown) => {
                        clearTimeout(timer);
                        reject(error);
                      },
                    );
                  });

                const patchedTransaction = async function (
                  this: unknown,
                  ...args: unknown[]
                ): Promise<unknown> {
                  transactionInstances.add(this);
                  const callbackIndex = args.length - 1;
                  const callback = args[callbackIndex];
                  if (typeof callback !== "function") {
                    throw new Error(
                      "MIGRATION_DISJOINT_DATABASE_CALLBACK_MISSING",
                    );
                  }
                  const wrappedCallback = async (
                    ...callbackArgs: unknown[]
                  ) => {
                    const transaction = callbackArgs[0] as {
                      readonly connection?: RuntimeConnection;
                    };
                    const client = transaction.connection;
                    if (client === undefined) {
                      throw new Error(
                        "MIGRATION_DISJOINT_DATABASE_CLIENT_MISSING",
                      );
                    }
                    migrationClients.add(client);
                    const originalQuery = client.query;
                    client.query = async function (
                      ...queryArgs: unknown[]
                    ): Promise<unknown> {
                      const request = queryArgs[0];
                      const sql =
                        typeof request === "object" &&
                        request !== null &&
                        "text" in request &&
                        typeof request.text === "string"
                          ? request.text
                          : typeof request === "string"
                            ? request
                            : "";
                      if (sql !== lockSql) {
                        return originalQuery.apply(this, queryArgs);
                      }

                      const values =
                        typeof request === "object" &&
                        request !== null &&
                        "values" in request &&
                        Array.isArray(request.values)
                          ? request.values
                          : undefined;
                      if (
                        values?.length !== 1 ||
                        typeof values[0] !== "string"
                      ) {
                        throw new Error(
                          "MIGRATION_DISJOINT_DATABASE_LOCK_REQUEST_INVALID",
                        );
                      }
                      observedLockKeys.push(values[0]);
                      const result = (await originalQuery.apply(
                        this,
                        queryArgs,
                      )) as {
                        readonly command?: unknown;
                        readonly fields?: readonly {
                          readonly name?: unknown;
                        }[];
                        readonly rows?: readonly (readonly unknown[])[];
                      };
                      const acquired = result.rows?.[0]?.[0];
                      if (
                        result.command !== "SELECT" ||
                        result.fields?.length !== 1 ||
                        result.fields[0]?.name !== "acquired" ||
                        result.rows?.length !== 1 ||
                        result.rows[0]?.length !== 1 ||
                        typeof acquired !== "boolean"
                      ) {
                        throw new Error(
                          "MIGRATION_DISJOINT_DATABASE_LOCK_RESULT_INVALID",
                        );
                      }
                      if (!acquired) {
                        falseResults += 1;
                        releaseBarrier?.();
                        throw new Error(
                          "MIGRATION_DISJOINT_DATABASE_FALSE_LOCK_RESULT",
                        );
                      }

                      trueClients.add(client);
                      if (trueClients.size === 2) {
                        releaseBarrier?.();
                      }
                      await within(
                        bothLocksAcquired,
                        5_000,
                        "MIGRATION_DISJOINT_DATABASE_BARRIER_TIMEOUT",
                      );
                      releasedAtTrueCounts.push(trueClients.size);
                      return result;
                    };
                    try {
                      return await (
                        callback as (...values: unknown[]) => unknown
                      )(...callbackArgs);
                    } finally {
                      client.query = originalQuery;
                      restoredClients.add(client);
                    }
                  };
                  const wrappedArgs = [...args];
                  wrappedArgs[callbackIndex] = wrappedCallback;
                  return originalTransaction.apply(this, wrappedArgs);
                };

                console.info(
                  `MIGRATION_DISJOINT_DATABASE_OVERLAP_READY build=${artifact.buildId}`,
                );
                let settlements: PromiseSettledResult<PreparationReport>[] = [];
                try {
                  sequelizePrototype.transaction = patchedTransaction;
                  settlements = await Promise.allSettled([
                    prepareMigratedNamespace({
                      target: firstNamespace.target,
                      buildRoot: artifact.buildRoot,
                    }),
                    prepareMigratedNamespace({
                      target: secondNamespace.target,
                      buildRoot: artifact.buildRoot,
                    }),
                  ]);
                } finally {
                  releaseBarrier?.();
                  sequelizePrototype.transaction = originalTransaction;
                }

                expect(sequelizePrototype.transaction).toBe(
                  originalTransaction,
                );
                expect(transactionInstances.size).toBe(2);
                expect(migrationClients.size).toBe(2);
                expect(restoredClients).toEqual(migrationClients);
                expect(trueClients).toEqual(migrationClients);
                expect(falseResults).toBe(0);
                expect(barrierReleased).toBe(true);
                expect(observedLockKeys).toHaveLength(2);
                expect(releasedAtTrueCounts).toEqual([2, 2]);

                const databases = [
                  firstNamespace.database,
                  secondNamespace.database,
                ];
                const queryMigrationBackends = () =>
                  withClient(control, (client) =>
                    client.query<{ datname: string; pid: number }>(
                      `SELECT datname, pid::integer AS pid
                         FROM pg_catalog.pg_stat_activity
                        WHERE datname = ANY($1::text[])
                          AND application_name = 'rick-and-morty-explorer:migrations'
                        ORDER BY datname, pid`,
                      [databases],
                    ),
                  );
                const backendAbsenceDeadline = performance.now() + 2_000;
                let backendPolls = 1;
                let activeAfter = await queryMigrationBackends();
                while (
                  activeAfter.rows.length > 0 &&
                  performance.now() < backendAbsenceDeadline
                ) {
                  await new Promise<void>((resolve) =>
                    setTimeout(resolve, 25),
                  );
                  backendPolls += 1;
                  activeAfter = await queryMigrationBackends();
                }
                expect(activeAfter.rows).toEqual([]);

                console.info(
                  `MIGRATION_DISJOINT_DATABASE_OVERLAP_OBSERVED transactions=${transactionInstances.size} clients=${migrationClients.size} trueClients=${trueClients.size} falseResults=${falseResults} heldBeforeRelease=${releasedAtTrueCounts.filter((count) => count === 2).length} fulfilled=${settlements.filter(({ status }) => status === "fulfilled").length} backendRows=${activeAfter.rows.length} backendPolls=${backendPolls}`,
                );
                try {
                  expect(
                    settlements.every(({ status }) => status === "fulfilled"),
                  ).toBe(true);
                  const reports = settlements
                    .filter(
                      (
                        settlement,
                      ): settlement is PromiseFulfilledResult<PreparationReport> =>
                        settlement.status === "fulfilled",
                    )
                    .map(({ value }) => value);
                  expect(reports).toHaveLength(2);
                  const firstReport = reports[0];
                  const secondReport = reports[1];
                  expect(firstReport).toBeDefined();
                  expect(secondReport).toBeDefined();
                  if (firstReport === undefined || secondReport === undefined) {
                    throw new Error(
                      "MIGRATION_DISJOINT_DATABASE_REPORT_MISSING",
                    );
                  }
                  expectPreparationReport(
                    firstReport,
                    firstNamespace,
                    artifact,
                    { noOp: false, applied: [mapping] },
                    control.user,
                  );
                  expectPreparationReport(
                    secondReport,
                    secondNamespace,
                    artifact,
                    { noOp: false, applied: [mapping] },
                    control.user,
                  );
                  expect(
                    [...observedLockKeys].sort(),
                  ).toEqual(
                    [
                      firstReport.namespace.lockKey,
                      secondReport.namespace.lockKey,
                    ].sort(),
                  );
                  await Promise.all([
                    inspectMigratedSchema(control, firstNamespace, manifest),
                    inspectMigratedSchema(control, secondNamespace, manifest),
                  ]);
                } catch {
                  throw new Error(
                    "MIGRATION_DISJOINT_DATABASE_OVERLAP_MISSING_AFTER_ARTIFACT_AUTHENTICATION",
                  );
                }
              },
            });
          },
        });
      } catch (error) {
        primaryFailure = error;
      }

      expect(await listOwnedDatabases(control)).toEqual([]);
      if (primaryFailure !== undefined) {
        throw primaryFailure;
      }
    },
    20_000,
  );

  it(
    "overlaps ordinary migration callers in disjoint schemas of one database",
    async () => {
      const control = loadControl();
      let primaryFailure: unknown;

      try {
        const { buildMigrationArtifact, prepareMigratedNamespace } =
          await loadFutureBoundary();
        const artifact = await buildMigrationArtifact();
        const manifest = await authenticateArtifact(artifact);
        const [mapping] = manifest.mappings;
        expect(mapping).toBeDefined();
        if (mapping === undefined) {
          throw new Error("MIGRATION_DISJOINT_SCHEMA_MAPPING_MISSING");
        }

        await withPostgresSchemaPair({
          control,
          body: async ([firstNamespace, secondNamespace]) => {
            expect(firstNamespace.database).toBe(secondNamespace.database);
            expect(firstNamespace.schema).not.toBe(secondNamespace.schema);
            expect(firstNamespace.target).not.toBe(secondNamespace.target);
            await Promise.all([
              expectEmptyMigrationNamespace(control, firstNamespace),
              expectEmptyMigrationNamespace(control, secondNamespace),
            ]);

            type RuntimeConnection = {
              query: (...args: unknown[]) => unknown;
            };
            const sequelizeSpecifier: string = "sequelize";
            const sequelizeModule = (await import(
              sequelizeSpecifier
            )) as unknown as {
              Sequelize: {
                prototype: {
                  transaction(
                    this: unknown,
                    ...args: unknown[]
                  ): Promise<unknown>;
                };
              };
            };
            const sequelizePrototype = sequelizeModule.Sequelize.prototype;
            const originalTransaction = sequelizePrototype.transaction;
            const lockSql = `SELECT pg_catalog.pg_try_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
) AS acquired`;
            const transactionInstances = new Set<unknown>();
            const migrationClients = new Set<RuntimeConnection>();
            const restoredClients = new Set<RuntimeConnection>();
            const trueClients = new Set<RuntimeConnection>();
            const observedLockKeys: string[] = [];
            const releasedAtTrueCounts: number[] = [];
            let falseResults = 0;
            let releaseBarrier: (() => void) | undefined;
            let barrierReleased = false;
            const bothLocksAcquired = new Promise<void>((resolve) => {
              releaseBarrier = () => {
                barrierReleased = true;
                resolve();
              };
            });
            const within = <T>(
              operation: Promise<T>,
              timeoutMs: number,
              marker: string,
            ): Promise<T> =>
              new Promise<T>((resolve, reject) => {
                const timer = setTimeout(() => {
                  reject(new Error(marker));
                }, timeoutMs);
                operation.then(
                  (value) => {
                    clearTimeout(timer);
                    resolve(value);
                  },
                  (error: unknown) => {
                    clearTimeout(timer);
                    reject(error);
                  },
                );
              });

            const patchedTransaction = async function (
              this: unknown,
              ...args: unknown[]
            ): Promise<unknown> {
              transactionInstances.add(this);
              const callbackIndex = args.length - 1;
              const callback = args[callbackIndex];
              if (typeof callback !== "function") {
                throw new Error("MIGRATION_DISJOINT_SCHEMA_CALLBACK_MISSING");
              }
              const wrappedCallback = async (...callbackArgs: unknown[]) => {
                const transaction = callbackArgs[0] as {
                  readonly connection?: RuntimeConnection;
                };
                const client = transaction.connection;
                if (client === undefined) {
                  throw new Error("MIGRATION_DISJOINT_SCHEMA_CLIENT_MISSING");
                }
                migrationClients.add(client);
                const originalQuery = client.query;
                client.query = async function (
                  ...queryArgs: unknown[]
                ): Promise<unknown> {
                  const request = queryArgs[0];
                  const sql =
                    typeof request === "object" &&
                    request !== null &&
                    "text" in request &&
                    typeof request.text === "string"
                      ? request.text
                      : typeof request === "string"
                        ? request
                        : "";
                  if (sql !== lockSql) {
                    return originalQuery.apply(this, queryArgs);
                  }

                  const values =
                    typeof request === "object" &&
                    request !== null &&
                    "values" in request &&
                    Array.isArray(request.values)
                      ? request.values
                      : undefined;
                  if (
                    values?.length !== 1 ||
                    typeof values[0] !== "string"
                  ) {
                    throw new Error(
                      "MIGRATION_DISJOINT_SCHEMA_LOCK_REQUEST_INVALID",
                    );
                  }
                  observedLockKeys.push(values[0]);
                  const result = (await originalQuery.apply(
                    this,
                    queryArgs,
                  )) as {
                    readonly command?: unknown;
                    readonly fields?: readonly {
                      readonly name?: unknown;
                    }[];
                    readonly rows?: readonly (readonly unknown[])[];
                  };
                  const acquired = result.rows?.[0]?.[0];
                  if (
                    result.command !== "SELECT" ||
                    result.fields?.length !== 1 ||
                    result.fields[0]?.name !== "acquired" ||
                    result.rows?.length !== 1 ||
                    result.rows[0]?.length !== 1 ||
                    typeof acquired !== "boolean"
                  ) {
                    throw new Error(
                      "MIGRATION_DISJOINT_SCHEMA_LOCK_RESULT_INVALID",
                    );
                  }
                  if (!acquired) {
                    falseResults += 1;
                    releaseBarrier?.();
                    throw new Error(
                      "MIGRATION_DISJOINT_SCHEMA_FALSE_LOCK_RESULT",
                    );
                  }

                  trueClients.add(client);
                  if (trueClients.size === 2) {
                    releaseBarrier?.();
                  }
                  await within(
                    bothLocksAcquired,
                    5_000,
                    "MIGRATION_DISJOINT_SCHEMA_BARRIER_TIMEOUT",
                  );
                  releasedAtTrueCounts.push(trueClients.size);
                  return result;
                };
                try {
                  return await (
                    callback as (...values: unknown[]) => unknown
                  )(...callbackArgs);
                } finally {
                  client.query = originalQuery;
                  restoredClients.add(client);
                }
              };
              const wrappedArgs = [...args];
              wrappedArgs[callbackIndex] = wrappedCallback;
              return originalTransaction.apply(this, wrappedArgs);
            };

            console.info(
              `MIGRATION_DISJOINT_SCHEMA_OVERLAP_READY build=${artifact.buildId}`,
            );
            let settlements: PromiseSettledResult<PreparationReport>[] = [];
            try {
              sequelizePrototype.transaction = patchedTransaction;
              settlements = await Promise.allSettled([
                prepareMigratedNamespace({
                  target: firstNamespace.target,
                  buildRoot: artifact.buildRoot,
                }),
                prepareMigratedNamespace({
                  target: secondNamespace.target,
                  buildRoot: artifact.buildRoot,
                }),
              ]);
            } finally {
              releaseBarrier?.();
              sequelizePrototype.transaction = originalTransaction;
            }

            expect(sequelizePrototype.transaction).toBe(originalTransaction);
            expect(transactionInstances.size).toBe(2);
            expect(migrationClients.size).toBe(2);
            expect(restoredClients).toEqual(migrationClients);
            expect(trueClients).toEqual(migrationClients);
            expect(falseResults).toBe(0);
            expect(barrierReleased).toBe(true);
            expect(observedLockKeys).toHaveLength(2);
            expect(new Set(observedLockKeys).size).toBe(2);
            expect(releasedAtTrueCounts).toEqual([2, 2]);

            const queryMigrationBackends = () =>
              withClient(control, (client) =>
                client.query<{ pid: number }>(
                  `SELECT pid::integer AS pid
                     FROM pg_catalog.pg_stat_activity
                    WHERE datname = $1
                      AND application_name = 'rick-and-morty-explorer:migrations'
                    ORDER BY pid`,
                  [firstNamespace.database],
                ),
              );
            const backendAbsenceDeadline = performance.now() + 2_000;
            let backendPolls = 1;
            let activeAfter = await queryMigrationBackends();
            while (
              activeAfter.rows.length > 0 &&
              performance.now() < backendAbsenceDeadline
            ) {
              await new Promise<void>((resolve) => setTimeout(resolve, 25));
              backendPolls += 1;
              activeAfter = await queryMigrationBackends();
            }
            expect(activeAfter.rows).toEqual([]);

            console.info(
              `MIGRATION_DISJOINT_SCHEMA_OVERLAP_OBSERVED transactions=${transactionInstances.size} clients=${migrationClients.size} trueClients=${trueClients.size} lockKeys=${new Set(observedLockKeys).size} falseResults=${falseResults} heldBeforeRelease=${releasedAtTrueCounts.filter((count) => count === 2).length} fulfilled=${settlements.filter(({ status }) => status === "fulfilled").length} backendRows=${activeAfter.rows.length} backendPolls=${backendPolls}`,
            );
            try {
              expect(
                settlements.every(({ status }) => status === "fulfilled"),
              ).toBe(true);
              const reports = settlements
                .filter(
                  (
                    settlement,
                  ): settlement is PromiseFulfilledResult<PreparationReport> =>
                    settlement.status === "fulfilled",
                )
                .map(({ value }) => value);
              expect(reports).toHaveLength(2);
              const firstReport = reports[0];
              const secondReport = reports[1];
              expect(firstReport).toBeDefined();
              expect(secondReport).toBeDefined();
              if (firstReport === undefined || secondReport === undefined) {
                throw new Error("MIGRATION_DISJOINT_SCHEMA_REPORT_MISSING");
              }
              expectPreparationReport(
                firstReport,
                firstNamespace,
                artifact,
                { noOp: false, applied: [mapping] },
                control.user,
              );
              expectPreparationReport(
                secondReport,
                secondNamespace,
                artifact,
                { noOp: false, applied: [mapping] },
                control.user,
              );
              expect(firstReport.namespace.database).toBe(
                secondReport.namespace.database,
              );
              expect(firstReport.namespace.schema).not.toBe(
                secondReport.namespace.schema,
              );
              expect(firstReport.namespace.lockKey).not.toBe(
                secondReport.namespace.lockKey,
              );
              expect([...observedLockKeys].sort()).toEqual(
                [
                  firstReport.namespace.lockKey,
                  secondReport.namespace.lockKey,
                ].sort(),
              );
              await Promise.all([
                inspectMigratedSchema(control, firstNamespace, manifest),
                inspectMigratedSchema(control, secondNamespace, manifest),
              ]);
            } catch {
              throw new Error(
                "MIGRATION_DISJOINT_SCHEMA_OVERLAP_MISSING_AFTER_ARTIFACT_AUTHENTICATION",
              );
            }
          },
        });
      } catch (error) {
        primaryFailure = error;
      }

      expect(await listOwnedDatabases(control)).toEqual([]);
      if (primaryFailure !== undefined) {
        throw primaryFailure;
      }
    },
    20_000,
  );

  it(
    "serializes disjoint schemas in one database under a forced advisory-lock collision",
    async () => {
      const control = loadControl();
      let primaryFailure: unknown;

      try {
        const { buildMigrationArtifact, prepareMigratedNamespace } =
          await loadFutureBoundary();
        const artifact = await buildMigrationArtifact();
        const manifest = await authenticateArtifact(artifact);
        const [mapping] = manifest.mappings;
        expect(mapping).toBeDefined();
        if (mapping === undefined) {
          throw new Error("MIGRATION_FORCED_COLLISION_MAPPING_MISSING");
        }

        await withPostgresSchemaPair({
          control,
          body: async ([firstNamespace, secondNamespace]) => {
            expect(firstNamespace.database).toBe(secondNamespace.database);
            expect(firstNamespace.schema).not.toBe(secondNamespace.schema);
            expect(firstNamespace.target).not.toBe(secondNamespace.target);
            await Promise.all([
              expectEmptyMigrationNamespace(control, firstNamespace),
              expectEmptyMigrationNamespace(control, secondNamespace),
            ]);

            type RuntimeConnection = {
              query: (...args: unknown[]) => unknown;
            };
            const sequelizeSpecifier: string = "sequelize";
            const sequelizeModule = (await import(
              sequelizeSpecifier
            )) as unknown as {
              Sequelize: {
                prototype: {
                  transaction(
                    this: unknown,
                    ...args: unknown[]
                  ): Promise<unknown>;
                };
              };
            };
            const sequelizePrototype = sequelizeModule.Sequelize.prototype;
            const originalTransaction = sequelizePrototype.transaction;
            const lockSql = `SELECT pg_catalog.pg_try_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
) AS acquired`;
            const collisionKey = "4242424242424242";
            const transactionInstances = new Set<unknown>();
            const migrationClients = new Set<RuntimeConnection>();
            const restoredClients = new Set<RuntimeConnection>();
            const requestedLockKeys = new Set<string>();
            const effectiveLockKeys = new Set<string>();
            const lockQueries = new Map<RuntimeConnection, number>();
            const falseClients = new Set<RuntimeConnection>();
            const trueClients = new Set<RuntimeConnection>();
            let winnerClient: RuntimeConnection | undefined;
            let releaseWinner: (() => void) | undefined;
            let observeWinner: (() => void) | undefined;
            let winnerReleased = false;
            const winnerRelease = new Promise<void>((resolve) => {
              releaseWinner = () => {
                winnerReleased = true;
                resolve();
              };
            });
            const winnerReady = new Promise<void>((resolve) => {
              observeWinner = resolve;
            });
            const within = <T>(
              operation: Promise<T>,
              timeoutMs: number,
              marker: string,
            ): Promise<T> =>
              new Promise<T>((resolve, reject) => {
                const timer = setTimeout(() => {
                  reject(new Error(marker));
                }, timeoutMs);
                operation.then(
                  (value) => {
                    clearTimeout(timer);
                    resolve(value);
                  },
                  (error: unknown) => {
                    clearTimeout(timer);
                    reject(error);
                  },
                );
              });

            const patchedTransaction = async function (
              this: unknown,
              ...args: unknown[]
            ): Promise<unknown> {
              transactionInstances.add(this);
              const callbackIndex = args.length - 1;
              const callback = args[callbackIndex];
              if (typeof callback !== "function") {
                throw new Error("MIGRATION_FORCED_COLLISION_CALLBACK_MISSING");
              }
              const wrappedCallback = async (...callbackArgs: unknown[]) => {
                const transaction = callbackArgs[0] as {
                  readonly connection?: RuntimeConnection;
                };
                const client = transaction.connection;
                if (client === undefined) {
                  throw new Error("MIGRATION_FORCED_COLLISION_CLIENT_MISSING");
                }
                migrationClients.add(client);
                const originalQuery = client.query;
                client.query = async function (
                  ...queryArgs: unknown[]
                ): Promise<unknown> {
                  const request = queryArgs[0];
                  const sql =
                    typeof request === "object" &&
                    request !== null &&
                    "text" in request &&
                    typeof request.text === "string"
                      ? request.text
                      : typeof request === "string"
                        ? request
                        : "";
                  if (sql !== lockSql) {
                    return originalQuery.apply(this, queryArgs);
                  }
                  if (typeof request !== "object" || request === null) {
                    throw new Error(
                      "MIGRATION_FORCED_COLLISION_LOCK_REQUEST_INVALID",
                    );
                  }
                  const values =
                    "values" in request && Array.isArray(request.values)
                      ? request.values
                      : undefined;
                  if (
                    values?.length !== 1 ||
                    typeof values[0] !== "string"
                  ) {
                    throw new Error(
                      "MIGRATION_FORCED_COLLISION_LOCK_REQUEST_INVALID",
                    );
                  }

                  requestedLockKeys.add(values[0]);
                  effectiveLockKeys.add(collisionKey);
                  lockQueries.set(client, (lockQueries.get(client) ?? 0) + 1);
                  const collisionRequest = {
                    ...request,
                    values: [collisionKey],
                  };
                  const result = (await originalQuery.apply(this, [
                    collisionRequest,
                    ...queryArgs.slice(1),
                  ])) as {
                    readonly command?: unknown;
                    readonly fields?: readonly { readonly name?: unknown }[];
                    readonly rows?: readonly (readonly unknown[])[];
                  };
                  const acquired = result.rows?.[0]?.[0];
                  if (
                    result.command !== "SELECT" ||
                    result.fields?.length !== 1 ||
                    result.fields[0]?.name !== "acquired" ||
                    result.rows?.length !== 1 ||
                    result.rows[0]?.length !== 1 ||
                    typeof acquired !== "boolean"
                  ) {
                    throw new Error(
                      "MIGRATION_FORCED_COLLISION_LOCK_RESULT_INVALID",
                    );
                  }

                  if (acquired) {
                    trueClients.add(client);
                    if (winnerClient === undefined) {
                      winnerClient = client;
                      observeWinner?.();
                      await within(
                        winnerRelease,
                        5_000,
                        "MIGRATION_FORCED_COLLISION_WINNER_RELEASE_TIMEOUT",
                      );
                    }
                  } else {
                    await within(
                      winnerReady,
                      5_000,
                      "MIGRATION_FORCED_COLLISION_WINNER_OBSERVATION_TIMEOUT",
                    );
                    if (client === winnerClient) {
                      throw new Error(
                        "MIGRATION_FORCED_COLLISION_WINNER_REPORTED_FALSE",
                      );
                    }
                    falseClients.add(client);
                    releaseWinner?.();
                  }
                  return result;
                };
                try {
                  return await (
                    callback as (...values: unknown[]) => unknown
                  )(...callbackArgs);
                } finally {
                  client.query = originalQuery;
                  restoredClients.add(client);
                }
              };
              const wrappedArgs = [...args];
              wrappedArgs[callbackIndex] = wrappedCallback;
              return originalTransaction.apply(this, wrappedArgs);
            };

            console.info(
              "MIGRATION_FORCED_COLLISION_SERIALIZATION_READY artifactAuthenticated=true namespaces=2",
            );
            let settlements: PromiseSettledResult<PreparationReport>[] = [];
            try {
              sequelizePrototype.transaction = patchedTransaction;
              settlements = await Promise.allSettled([
                prepareMigratedNamespace({
                  target: firstNamespace.target,
                  buildRoot: artifact.buildRoot,
                }),
                prepareMigratedNamespace({
                  target: secondNamespace.target,
                  buildRoot: artifact.buildRoot,
                }),
              ]);
            } finally {
              releaseWinner?.();
              sequelizePrototype.transaction = originalTransaction;
            }

            expect(sequelizePrototype.transaction).toBe(originalTransaction);
            const rejected = settlements.find(
              (settlement): settlement is PromiseRejectedResult =>
                settlement.status === "rejected",
            );
            if (rejected !== undefined) {
              throw rejected.reason;
            }
            expect(restoredClients).toEqual(migrationClients);

            const queryMigrationBackends = () =>
              withClient(control, (client) =>
                client.query<{ pid: number }>(
                  `SELECT pid::integer AS pid
                     FROM pg_catalog.pg_stat_activity
                    WHERE datname = $1
                      AND application_name = 'rick-and-morty-explorer:migrations'
                    ORDER BY pid`,
                  [firstNamespace.database],
                ),
              );
            const backendAbsenceDeadline = performance.now() + 2_000;
            let backendPolls = 1;
            let activeAfter = await queryMigrationBackends();
            while (
              activeAfter.rows.length > 0 &&
              performance.now() < backendAbsenceDeadline
            ) {
              await new Promise<void>((resolve) => setTimeout(resolve, 25));
              backendPolls += 1;
              activeAfter = await queryMigrationBackends();
            }
            expect(activeAfter.rows).toEqual([]);

            console.info(
              `MIGRATION_FORCED_COLLISION_SERIALIZATION_OBSERVED transactions=${transactionInstances.size} clients=${migrationClients.size} requestedKeys=${requestedLockKeys.size} effectiveKeys=${effectiveLockKeys.size} falseClients=${falseClients.size} trueClients=${trueClients.size} winnerReleased=${String(winnerReleased)} fulfilled=${settlements.filter(({ status }) => status === "fulfilled").length} backendRows=${activeAfter.rows.length} backendPolls=${backendPolls}`,
            );
            try {
              expect(transactionInstances.size).toBe(2);
              expect(migrationClients.size).toBe(2);
              expect(winnerClient).toBeDefined();
              expect(winnerReleased).toBe(true);
              expect(requestedLockKeys.size).toBe(2);
              expect(effectiveLockKeys).toEqual(new Set([collisionKey]));
              expect(falseClients.size).toBe(1);
              expect(falseClients.has(winnerClient as RuntimeConnection)).toBe(
                false,
              );
              expect(trueClients).toEqual(migrationClients);
              expect(lockQueries.get(winnerClient as RuntimeConnection)).toBe(1);
              expect(lockQueries.get([...falseClients][0] as RuntimeConnection)).toBeGreaterThanOrEqual(
                2,
              );

              const reports = settlements
                .filter(
                  (
                    settlement,
                  ): settlement is PromiseFulfilledResult<PreparationReport> =>
                    settlement.status === "fulfilled",
                )
                .map(({ value }) => value);
              expect(reports).toHaveLength(2);
              const firstReport = reports[0];
              const secondReport = reports[1];
              expect(firstReport).toBeDefined();
              expect(secondReport).toBeDefined();
              if (firstReport === undefined || secondReport === undefined) {
                throw new Error("MIGRATION_FORCED_COLLISION_REPORT_MISSING");
              }
              expectPreparationReport(
                firstReport,
                firstNamespace,
                artifact,
                { noOp: false, applied: [mapping] },
                control.user,
              );
              expectPreparationReport(
                secondReport,
                secondNamespace,
                artifact,
                { noOp: false, applied: [mapping] },
                control.user,
              );
              expect(firstReport.namespace.database).toBe(
                secondReport.namespace.database,
              );
              expect(firstReport.namespace.schema).not.toBe(
                secondReport.namespace.schema,
              );
              expect(firstReport.namespace.lockKey).not.toBe(
                secondReport.namespace.lockKey,
              );
              expect(requestedLockKeys).toEqual(
                new Set([
                  firstReport.namespace.lockKey,
                  secondReport.namespace.lockKey,
                ]),
              );
              await Promise.all([
                inspectMigratedSchema(control, firstNamespace, manifest),
                inspectMigratedSchema(control, secondNamespace, manifest),
              ]);
            } catch {
              throw new Error(
                "MIGRATION_FORCED_COLLISION_SERIALIZATION_MISSING_AFTER_ARTIFACT_AUTHENTICATION",
              );
            }
          },
        });
      } catch (error) {
        primaryFailure = error;
      }

      expect(await listOwnedDatabases(control)).toEqual([]);
      if (primaryFailure !== undefined) {
        throw primaryFailure;
      }
    },
    20_000,
  );

  it(
    "does not contend for an equal advisory-lock key in disjoint databases",
    async () => {
      const control = loadControl();
      let primaryFailure: unknown;

      try {
        const { buildMigrationArtifact, prepareMigratedNamespace } =
          await loadFutureBoundary();
        const artifact = await buildMigrationArtifact();
        const manifest = await authenticateArtifact(artifact);
        const [mapping] = manifest.mappings;
        expect(mapping).toBeDefined();
        if (mapping === undefined) {
          throw new Error("MIGRATION_EQUAL_KEY_DISJOINT_DATABASE_MAPPING_MISSING");
        }

        await withPostgresNamespace({
          control,
          body: async (firstNamespace) => {
            await withPostgresNamespace({
              control,
              body: async (secondNamespace) => {
                expect(firstNamespace.database).not.toBe(
                  secondNamespace.database,
                );
                expect(firstNamespace.target).not.toBe(secondNamespace.target);
                await Promise.all([
                  expectEmptyMigrationNamespace(control, firstNamespace),
                  expectEmptyMigrationNamespace(control, secondNamespace),
                ]);

                type RuntimeConnection = {
                  query: (...args: unknown[]) => unknown;
                };
                const sequelizeSpecifier: string = "sequelize";
                const sequelizeModule = (await import(
                  sequelizeSpecifier
                )) as unknown as {
                  Sequelize: {
                    prototype: {
                      transaction(
                        this: unknown,
                        ...args: unknown[]
                      ): Promise<unknown>;
                    };
                  };
                };
                const sequelizePrototype = sequelizeModule.Sequelize.prototype;
                const originalTransaction = sequelizePrototype.transaction;
                const lockSql = `SELECT pg_catalog.pg_try_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
) AS acquired`;
                const equalKey = "4242424242424242";
                const transactionInstances = new Set<unknown>();
                const migrationClients = new Set<RuntimeConnection>();
                const restoredClients = new Set<RuntimeConnection>();
                const trueClients = new Set<RuntimeConnection>();
                const requestedLockKeys = new Set<string>();
                const effectiveLockKeys = new Set<string>();
                const lockQueries = new Map<RuntimeConnection, number>();
                const releasedAtTrueCounts: number[] = [];
                let falseResults = 0;
                let releaseBarrier: (() => void) | undefined;
                let barrierReleased = false;
                const bothLocksAcquired = new Promise<void>((resolve) => {
                  releaseBarrier = () => {
                    barrierReleased = true;
                    resolve();
                  };
                });
                const within = <T>(
                  operation: Promise<T>,
                  timeoutMs: number,
                  marker: string,
                ): Promise<T> =>
                  new Promise<T>((resolve, reject) => {
                    const timer = setTimeout(() => reject(new Error(marker)), timeoutMs);
                    operation.then(
                      (value) => {
                        clearTimeout(timer);
                        resolve(value);
                      },
                      (error: unknown) => {
                        clearTimeout(timer);
                        reject(error);
                      },
                    );
                  });

                const patchedTransaction = async function (
                  this: unknown,
                  ...args: unknown[]
                ): Promise<unknown> {
                  transactionInstances.add(this);
                  const callbackIndex = args.length - 1;
                  const callback = args[callbackIndex];
                  if (typeof callback !== "function") {
                    throw new Error(
                      "MIGRATION_EQUAL_KEY_DISJOINT_DATABASE_CALLBACK_MISSING",
                    );
                  }
                  const wrappedCallback = async (
                    ...callbackArgs: unknown[]
                  ) => {
                    const transaction = callbackArgs[0] as {
                      readonly connection?: RuntimeConnection;
                    };
                    const client = transaction.connection;
                    if (client === undefined) {
                      throw new Error(
                        "MIGRATION_EQUAL_KEY_DISJOINT_DATABASE_CLIENT_MISSING",
                      );
                    }
                    migrationClients.add(client);
                    const originalQuery = client.query;
                    client.query = async function (
                      ...queryArgs: unknown[]
                    ): Promise<unknown> {
                      const request = queryArgs[0];
                      const sql =
                        typeof request === "object" &&
                        request !== null &&
                        "text" in request &&
                        typeof request.text === "string"
                          ? request.text
                          : typeof request === "string"
                            ? request
                            : "";
                      if (sql !== lockSql) {
                        return originalQuery.apply(this, queryArgs);
                      }
                      if (typeof request !== "object" || request === null) {
                        throw new Error(
                          "MIGRATION_EQUAL_KEY_DISJOINT_DATABASE_LOCK_REQUEST_INVALID",
                        );
                      }
                      const values =
                        "values" in request && Array.isArray(request.values)
                          ? request.values
                          : undefined;
                      if (
                        values?.length !== 1 ||
                        typeof values[0] !== "string"
                      ) {
                        throw new Error(
                          "MIGRATION_EQUAL_KEY_DISJOINT_DATABASE_LOCK_REQUEST_INVALID",
                        );
                      }
                      requestedLockKeys.add(values[0]);
                      effectiveLockKeys.add(equalKey);
                      lockQueries.set(
                        client,
                        (lockQueries.get(client) ?? 0) + 1,
                      );
                      const equalKeyRequest = {
                        ...request,
                        values: [equalKey],
                      };
                      const result = (await originalQuery.apply(this, [
                        equalKeyRequest,
                        ...queryArgs.slice(1),
                      ])) as {
                        readonly command?: unknown;
                        readonly fields?: readonly {
                          readonly name?: unknown;
                        }[];
                        readonly rows?: readonly (readonly unknown[])[];
                      };
                      const acquired = result.rows?.[0]?.[0];
                      if (
                        result.command !== "SELECT" ||
                        result.fields?.length !== 1 ||
                        result.fields[0]?.name !== "acquired" ||
                        result.rows?.length !== 1 ||
                        result.rows[0]?.length !== 1 ||
                        typeof acquired !== "boolean"
                      ) {
                        throw new Error(
                          "MIGRATION_EQUAL_KEY_DISJOINT_DATABASE_LOCK_RESULT_INVALID",
                        );
                      }
                      if (!acquired) {
                        falseResults += 1;
                        releaseBarrier?.();
                        throw new Error(
                          "MIGRATION_EQUAL_KEY_DISJOINT_DATABASE_FALSE_LOCK_RESULT",
                        );
                      }

                      trueClients.add(client);
                      if (trueClients.size === 2) {
                        releaseBarrier?.();
                      }
                      await within(
                        bothLocksAcquired,
                        5_000,
                        "MIGRATION_EQUAL_KEY_DISJOINT_DATABASE_BARRIER_TIMEOUT",
                      );
                      releasedAtTrueCounts.push(trueClients.size);
                      return result;
                    };
                    try {
                      return await (
                        callback as (...values: unknown[]) => unknown
                      )(...callbackArgs);
                    } finally {
                      client.query = originalQuery;
                      restoredClients.add(client);
                    }
                  };
                  const wrappedArgs = [...args];
                  wrappedArgs[callbackIndex] = wrappedCallback;
                  return originalTransaction.apply(this, wrappedArgs);
                };

                console.info(
                  "MIGRATION_EQUAL_KEY_DISJOINT_DATABASE_READY artifactAuthenticated=true databases=2",
                );
                let settlements: PromiseSettledResult<PreparationReport>[] = [];
                try {
                  sequelizePrototype.transaction = patchedTransaction;
                  settlements = await Promise.allSettled([
                    prepareMigratedNamespace({
                      target: firstNamespace.target,
                      buildRoot: artifact.buildRoot,
                    }),
                    prepareMigratedNamespace({
                      target: secondNamespace.target,
                      buildRoot: artifact.buildRoot,
                    }),
                  ]);
                } finally {
                  releaseBarrier?.();
                  sequelizePrototype.transaction = originalTransaction;
                }

                expect(sequelizePrototype.transaction).toBe(
                  originalTransaction,
                );
                const rejected = settlements.find(
                  (settlement): settlement is PromiseRejectedResult =>
                    settlement.status === "rejected",
                );
                if (rejected !== undefined) {
                  throw rejected.reason;
                }
                expect(restoredClients).toEqual(migrationClients);

                const databases = [
                  firstNamespace.database,
                  secondNamespace.database,
                ];
                const queryMigrationBackends = () =>
                  withClient(control, (client) =>
                    client.query<{ datname: string; pid: number }>(
                      `SELECT datname, pid::integer AS pid
                         FROM pg_catalog.pg_stat_activity
                        WHERE datname = ANY($1::text[])
                          AND application_name = 'rick-and-morty-explorer:migrations'
                        ORDER BY datname, pid`,
                      [databases],
                    ),
                  );
                const backendAbsenceDeadline = performance.now() + 2_000;
                let backendPolls = 1;
                let activeAfter = await queryMigrationBackends();
                while (
                  activeAfter.rows.length > 0 &&
                  performance.now() < backendAbsenceDeadline
                ) {
                  await new Promise<void>((resolve) =>
                    setTimeout(resolve, 25),
                  );
                  backendPolls += 1;
                  activeAfter = await queryMigrationBackends();
                }
                expect(activeAfter.rows).toEqual([]);

                console.info(
                  `MIGRATION_EQUAL_KEY_DISJOINT_DATABASE_OBSERVED transactions=${transactionInstances.size} clients=${migrationClients.size} requestedKeys=${requestedLockKeys.size} effectiveKeys=${effectiveLockKeys.size} trueClients=${trueClients.size} falseResults=${falseResults} heldBeforeRelease=${releasedAtTrueCounts.filter((count) => count === 2).length} fulfilled=${settlements.filter(({ status }) => status === "fulfilled").length} backendRows=${activeAfter.rows.length} backendPolls=${backendPolls}`,
                );
                try {
                  expect(transactionInstances.size).toBe(2);
                  expect(migrationClients.size).toBe(2);
                  expect(requestedLockKeys.size).toBe(2);
                  expect(effectiveLockKeys).toEqual(new Set([equalKey]));
                  expect(trueClients).toEqual(migrationClients);
                  expect(falseResults).toBe(0);
                  expect(barrierReleased).toBe(true);
                  expect(releasedAtTrueCounts).toEqual([2, 2]);
                  expect([...lockQueries.values()].sort()).toEqual([1, 1]);

                  const reports = settlements
                    .filter(
                      (
                        settlement,
                      ): settlement is PromiseFulfilledResult<PreparationReport> =>
                        settlement.status === "fulfilled",
                    )
                    .map(({ value }) => value);
                  expect(reports).toHaveLength(2);
                  const firstReport = reports[0];
                  const secondReport = reports[1];
                  expect(firstReport).toBeDefined();
                  expect(secondReport).toBeDefined();
                  if (firstReport === undefined || secondReport === undefined) {
                    throw new Error(
                      "MIGRATION_EQUAL_KEY_DISJOINT_DATABASE_REPORT_MISSING",
                    );
                  }
                  expectPreparationReport(
                    firstReport,
                    firstNamespace,
                    artifact,
                    { noOp: false, applied: [mapping] },
                    control.user,
                  );
                  expectPreparationReport(
                    secondReport,
                    secondNamespace,
                    artifact,
                    { noOp: false, applied: [mapping] },
                    control.user,
                  );
                  expect(firstReport.namespace.database).not.toBe(
                    secondReport.namespace.database,
                  );
                  expect(firstReport.namespace.lockKey).not.toBe(
                    secondReport.namespace.lockKey,
                  );
                  expect(requestedLockKeys).toEqual(
                    new Set([
                      firstReport.namespace.lockKey,
                      secondReport.namespace.lockKey,
                    ]),
                  );
                  await Promise.all([
                    inspectMigratedSchema(control, firstNamespace, manifest),
                    inspectMigratedSchema(control, secondNamespace, manifest),
                  ]);
                } catch {
                  throw new Error(
                    "MIGRATION_EQUAL_KEY_DISJOINT_DATABASE_NONCONTENTION_MISSING_AFTER_ARTIFACT_AUTHENTICATION",
                  );
                }
              },
            });
          },
        });
      } catch (error) {
        primaryFailure = error;
      }

      expect(await listOwnedDatabases(control)).toEqual([]);
      if (primaryFailure !== undefined) {
        throw primaryFailure;
      }
    },
    20_000,
  );

  it("migrates an empty namespace to the accepted relational contract", async () => {
    const control = loadControl();
    const originalFetch = globalThis.fetch;
    let primaryFailure: unknown;

    globalThis.fetch = (() =>
      Promise.reject(
        new Error("PUBLIC_API_ACCESS_FORBIDDEN_DURING_MIGRATION"),
      )) as typeof fetch;
    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          await withClient(
            control,
            async (client) => {
              const ready = await client.query<{
                current_database: string;
                schema_exists: boolean;
              }>(
                `SELECT pg_catalog.current_database() AS current_database,
                        pg_catalog.to_regnamespace($1) IS NOT NULL AS schema_exists`,
                [namespace.schema],
              );
              expect(ready.rows).toEqual([
                { current_database: namespace.database, schema_exists: true },
              ]);
            },
            namespace.database,
          );
          console.info(
            `POSTGRES_NAMESPACE_READY database=${namespace.database} schema=${namespace.schema}`,
          );

          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          const first = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            first,
            namespace,
            artifact,
            { noOp: false, applied: manifest.mappings },
            control.user,
          );
          await inspectMigratedSchema(control, namespace, manifest);

          const second = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            second,
            namespace,
            artifact,
            { noOp: true, applied: [] },
            control.user,
          );
          await withClient(
            control,
            async (client) => {
              const preserved = await client.query<{
                character_count: number;
                comment_count: number;
                history_count: number;
                favorite: boolean;
              }>(
                `SELECT
                   (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.characters) AS character_count,
                   (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.comments) AS comment_count,
                   (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history) AS history_count,
                   (SELECT is_favorite FROM ${quoteIdentifier(namespace.schema)}.characters WHERE id = 1) AS favorite`,
              );
              expect(preserved.rows).toEqual([
                {
                  character_count: 1,
                  comment_count: 1,
                  history_count: 1,
                  favorite: true,
                },
              ]);
            },
            namespace.database,
          );
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("rejects forged migration target handles before connection work", async () => {
    const control = loadControl();
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          await authenticateArtifact(artifact);
          await expectEmptyMigrationNamespace(control, namespace);
          console.info(
            `MIGRATION_TARGET_PROVENANCE_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId}`,
          );

          class ConstructedTarget {
            readonly host = "127.0.0.1";
            readonly port = control.port;
            readonly database = namespace.database;
            readonly schema = namespace.schema;
            readonly user = control.user;
            readonly credential = control.password;
          }

          const targetState = {
            host: "127.0.0.1",
            port: control.port,
            database: namespace.database,
            schema: namespace.schema,
            user: control.user,
            credential: control.password,
          };
          const candidates: ReadonlyArray<{
            readonly caseName: string;
            readonly target: object;
          }> = [
            {
              caseName: "raw-tuple",
              target: [
                targetState.host,
                targetState.port,
                targetState.database,
                targetState.schema,
                targetState.user,
                targetState.credential,
              ],
            },
            { caseName: "constructor-instance", target: new ConstructedTarget() },
            {
              caseName: "clone",
              target: Object.assign(Object.create(null) as object, namespace.target),
            },
            { caseName: "spread", target: { ...namespace.target } },
            { caseName: "structural-lookalike", target: { ...targetState } },
            {
              caseName: "authorized-field",
              target: { ...targetState, authorized: true },
            },
            { caseName: "proxy", target: new Proxy(namespace.target, {}) },
            {
              caseName: "json-deserialized",
              target: JSON.parse(JSON.stringify(namespace.target)) as object,
            },
          ];

          for (const { caseName, target } of candidates) {
            let rejection: unknown;
            try {
              await prepareMigratedNamespace({
                target,
                buildRoot: artifact.buildRoot,
              });
            } catch (error) {
              rejection = error;
            }
            if (rejection === undefined) {
              throw new Error(
                `MIGRATION_FORGED_TARGET_ACCEPTED_AFTER_ARTIFACT_AUTHENTICATION case=${caseName}`,
              );
            }
            expect(rejection).toBeInstanceOf(Error);
            expect((rejection as Error).message).toBe(
              "MIGRATION_STARTUP_CONFIG_INVALID",
            );
            await expectEmptyMigrationNamespace(control, namespace);
            const active = await withClient(
              control,
              (client) =>
                client.query<{ pid: number }>(
                  `SELECT pid::integer AS pid
                     FROM pg_catalog.pg_stat_activity
                    WHERE datname = $1
                      AND application_name = 'rick-and-morty-explorer:migrations'`,
                  [namespace.database],
                ),
              namespace.database,
            );
            expect(active.rows).toEqual([]);
            console.info(
              `MIGRATION_TARGET_PROVENANCE_REJECTED case=${caseName} backend=0 tables=0 history=false`,
            );
          }
        },
      });
    } catch (error) {
      primaryFailure = error;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("rejects caller-injected connection ownership inputs before connection work", async () => {
    const control = loadControl();
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact } = await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          await authenticateArtifact(artifact);
          const inspectMigrationStatus =
            (await loadMigrationStatusBoundary()) as unknown as (
              options: Record<string, unknown>,
            ) => Promise<unknown>;
          await expectEmptyMigrationNamespace(control, namespace);
          console.info(
            `MIGRATION_CALLER_CONNECTION_INPUT_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId}`,
          );

          const candidateValues: ReadonlyArray<{
            readonly caseName:
              | "authorized"
              | "ownsConnection"
              | "sequelize"
              | "pool"
              | "client"
              | "connection"
              | "session"
              | "borrowedSession";
            readonly value: unknown;
          }> = [
            { caseName: "authorized", value: true },
            { caseName: "ownsConnection", value: true },
            { caseName: "sequelize", value: Object.create(null) },
            { caseName: "pool", value: Object.create(null) },
            { caseName: "client", value: Object.create(null) },
            { caseName: "connection", value: Object.create(null) },
            { caseName: "session", value: Object.create(null) },
            { caseName: "borrowedSession", value: Object.create(null) },
          ];

          for (const { caseName, value } of candidateValues) {
            const options: Record<string, unknown> = {
              target: namespace.target,
              buildRoot: artifact.buildRoot,
              [caseName]: value,
            };
            expect(Object.keys(options).sort()).toEqual(
              ["buildRoot", caseName, "target"].sort(),
            );
            let rejection: unknown;
            let report: unknown;
            try {
              report = await inspectMigrationStatus(options);
            } catch (error) {
              rejection = error;
            }

            await expectEmptyMigrationNamespace(control, namespace);
            const active = await withClient(
              control,
              (client) =>
                client.query<{ pid: number }>(
                  `SELECT pid::integer AS pid
                     FROM pg_catalog.pg_stat_activity
                    WHERE datname = $1
                      AND application_name = 'rick-and-morty-explorer:migrations'`,
                  [namespace.database],
                ),
              namespace.database,
            );
            expect(active.rows).toEqual([]);

            if (rejection === undefined) {
              expect(report).toMatchObject({
                operation: "status",
                result: 0,
                applied: [],
              });
              throw new Error(
                `MIGRATION_CALLER_CONNECTION_INPUT_ACCEPTED_AFTER_ARTIFACT_AUTHENTICATION case=${caseName}`,
              );
            }
            expect(rejection).toBeInstanceOf(Error);
            expect((rejection as Error).message).toBe(
              "MIGRATION_STARTUP_CONFIG_INVALID",
            );
            console.info(
              `MIGRATION_CALLER_CONNECTION_INPUT_REJECTED case=${caseName} backend=0 tables=0 history=false`,
            );
          }
        },
      });
    } catch (error) {
      primaryFailure = error;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("owns one private Sequelize instance and physical session for status", async () => {
    const control = loadControl();
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact } = await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          const inspectMigrationStatus = await loadMigrationStatusBoundary();
          await expectEmptyMigrationNamespace(control, namespace);

          const sequelizeSpecifier: string = "sequelize";
          const sequelizeModule = (await import(
            sequelizeSpecifier
          )) as unknown as {
            Sequelize: {
              prototype: {
                transaction(
                  this: unknown,
                  ...args: unknown[]
                ): Promise<unknown>;
                close(this: unknown): Promise<void>;
              };
            };
          };
          const sequelizePrototype = sequelizeModule.Sequelize.prototype;
          const originalTransaction = sequelizePrototype.transaction;
          const originalClose = sequelizePrototype.close;
          const transactionInstances: unknown[] = [];
          const closeInstances: unknown[] = [];
          const observedPids = new Set<number>();
          let observedBackends: Array<{
            readonly pid: number;
            readonly backend_type: string;
            readonly state: string;
          }> = [];
          let transactionCallbacks = 0;
          let closeCalls = 0;
          let observedPool: { readonly max?: unknown; readonly min?: unknown } | undefined;

          const patchedTransaction = async function (
            this: unknown,
            ...args: unknown[]
          ): Promise<unknown> {
            transactionInstances.push(this);
            observedPool = (
              this as {
                readonly options?: {
                  readonly pool?: {
                    readonly max?: unknown;
                    readonly min?: unknown;
                  };
                };
              }
            ).options?.pool;
            const callbackIndex = args.length - 1;
            const callback = args[callbackIndex];
            if (typeof callback !== "function") {
              throw new Error("MIGRATION_PRIVATE_SESSION_CALLBACK_MISSING");
            }
            const wrappedCallback = async (...callbackArgs: unknown[]) => {
              transactionCallbacks += 1;
              const active = await withClient(
                control,
                (client) =>
                  client.query<{
                    pid: number;
                    backend_type: string;
                    state: string;
                  }>(
                    `SELECT pid::integer AS pid, backend_type, state
                       FROM pg_catalog.pg_stat_activity
                      WHERE datname = $1
                        AND application_name = 'rick-and-morty-explorer:migrations'
                      ORDER BY pid`,
                    [namespace.database],
                  ),
                namespace.database,
              );
              observedBackends = active.rows;
              for (const { pid } of active.rows) {
                observedPids.add(pid);
              }
              return (callback as (...values: unknown[]) => unknown)(
                ...callbackArgs,
              );
            };
            const wrappedArgs = [...args];
            wrappedArgs[callbackIndex] = wrappedCallback;
            return originalTransaction.apply(this, wrappedArgs);
          };
          const patchedClose = async function (this: unknown): Promise<void> {
            closeCalls += 1;
            closeInstances.push(this);
            await originalClose.call(this);
          };

          console.info(
            `MIGRATION_PRIVATE_SESSION_OWNERSHIP_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId}`,
          );
          let report: Awaited<ReturnType<typeof inspectMigrationStatus>> | undefined;
          let operationFailure: unknown;
          try {
            sequelizePrototype.transaction = patchedTransaction;
            sequelizePrototype.close = patchedClose;
            try {
              report = await inspectMigrationStatus({
                target: namespace.target,
                buildRoot: artifact.buildRoot,
              });
            } catch (error) {
              operationFailure = error;
            }
          } finally {
            sequelizePrototype.transaction = originalTransaction;
            sequelizePrototype.close = originalClose;
          }
          if (operationFailure !== undefined) {
            throw operationFailure;
          }

          expect(report).toEqual({
            operation: "status",
            result: 0,
            buildId: artifact.buildId,
            checksumAgreement: true,
            applied: [],
            pending: manifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migrationId,
                sourceSha256,
              }),
            ),
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });
          console.info(
            `MIGRATION_PRIVATE_SESSION_OWNERSHIP_OBSERVED transactionInstances=${transactionInstances.length} closeInstances=${closeInstances.length} sameInstance=${String(transactionInstances[0] === closeInstances[0])} callbacks=${transactionCallbacks} closes=${closeCalls} backendRows=${observedBackends.length} backendTypes=${observedBackends.map(({ backend_type }) => backend_type).join(",")} backendStates=${observedBackends.map(({ state }) => state).join(",")} uniquePids=${observedPids.size} poolMax=${String(observedPool?.max)} poolMin=${String(observedPool?.min)}`,
          );

          try {
            expect(sequelizePrototype.transaction).toBe(originalTransaction);
            expect(sequelizePrototype.close).toBe(originalClose);
            expect(transactionInstances).toHaveLength(1);
            expect(closeInstances).toHaveLength(1);
            expect(transactionInstances[0]).toBe(closeInstances[0]);
            expect(transactionCallbacks).toBe(1);
            expect(closeCalls).toBe(1);
            expect(observedBackends).toEqual([
              {
                pid: expect.any(Number),
                backend_type: "client backend",
                state: "idle in transaction",
              },
            ]);
            expect([...observedPids]).toHaveLength(1);
            if (observedPool !== undefined) {
              expect(observedPool).toMatchObject({ max: 1, min: 0 });
            }
            await expectEmptyMigrationNamespace(control, namespace);
            const activeAfter = await withClient(
              control,
              (client) =>
                client.query<{ pid: number }>(
                  `SELECT pid::integer AS pid
                     FROM pg_catalog.pg_stat_activity
                    WHERE datname = $1
                      AND application_name = 'rick-and-morty-explorer:migrations'`,
                  [namespace.database],
                ),
              namespace.database,
            );
            expect(activeAfter.rows).toEqual([]);
          } catch {
            throw new Error(
              "MIGRATION_PRIVATE_SESSION_OWNERSHIP_MISSING_AFTER_ARTIFACT_AUTHENTICATION",
            );
          }
        },
      });
    } catch (error) {
      primaryFailure = error;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it(
    "destroys the owned physical session without SQL rollback when the lock deadline expires",
    async () => {
      const control = loadControl();
      let primaryFailure: unknown;

      try {
        await withPostgresNamespace({
          control,
          body: async (namespace) => {
            const { buildMigrationArtifact } = await loadFutureBoundary();
            const artifact = await buildMigrationArtifact();
            await authenticateArtifact(artifact);
            const inspectMigrationStatus = await loadMigrationStatusBoundary();
            const lockSpecifier = "./migrations/files/lock.js";
            const { deriveMigrationLockKey } = (await import(
              /* @vite-ignore */ lockSpecifier
            )) as {
              readonly deriveMigrationLockKey: (
                database: string,
                schema: string,
              ) => string;
            };
            const lockKey = deriveMigrationLockKey(
              namespace.database,
              namespace.schema,
            );
            await expectEmptyMigrationNamespace(control, namespace);

            const blocker = createClient(control, namespace.database);
            let blockerConnected = false;
            let blockerTransaction = false;
            try {
              await blocker.connect();
              blockerConnected = true;
              await blocker.query("BEGIN");
              blockerTransaction = true;
              await blocker.query(
                `SELECT pg_catalog.pg_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
)`,
                [lockKey],
              );
              const blockerHeld = await withClient(
                control,
                async (probe) => {
                  await probe.query("BEGIN");
                  try {
                    const result = await probe.query<{ acquired: boolean }>(
                      `SELECT pg_catalog.pg_try_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
) AS acquired`,
                      [lockKey],
                    );
                    return result.rows[0]?.acquired;
                  } finally {
                    await probe.query("ROLLBACK");
                  }
                },
                namespace.database,
              );
              expect(blockerHeld).toBe(false);

              type RuntimeConnection = {
                query: (...args: unknown[]) => unknown;
                readonly connection?: {
                  readonly stream?: {
                    destroy: (...args: unknown[]) => unknown;
                  };
                };
              };
              type RuntimeConnectionManager = {
                releaseConnection: (
                  this: RuntimeConnectionManager,
                  connection: unknown,
                ) => unknown;
                destroyConnection: (
                  this: RuntimeConnectionManager,
                  connection: unknown,
                ) => Promise<unknown>;
              };
              const sequelizeSpecifier: string = "sequelize";
              const sequelizeModule = (await import(
                sequelizeSpecifier
              )) as unknown as {
                Sequelize: {
                  prototype: {
                    transaction(
                      this: unknown,
                      ...args: unknown[]
                    ): Promise<unknown>;
                  };
                };
              };
              const sequelizePrototype = sequelizeModule.Sequelize.prototype;
              const originalTransaction = sequelizePrototype.transaction;
              const transactionInstances: unknown[] = [];
              const migrationClients = new Set<RuntimeConnection>();
              const eventOrder: string[] = [];
              let transactionCallbacks = 0;
              let releaseCalls = 0;
              let releaseExactClient = false;
              let destroyCalls = 0;
              let destroyExactClient = false;
              let streamDestroyCalls = 0;
              let streamDestroyExactClient = false;
              let rollbackQueries = 0;
              let migrationClient: RuntimeConnection | undefined;
              let capturedManager: RuntimeConnectionManager | undefined;
              let originalRelease:
                | RuntimeConnectionManager["releaseConnection"]
                | undefined;
              let originalDestroy:
                | RuntimeConnectionManager["destroyConnection"]
                | undefined;
              let originalClientQuery:
                | RuntimeConnection["query"]
                | undefined;
              let capturedStream:
                | NonNullable<RuntimeConnection["connection"]>["stream"]
                | undefined;
              let originalStreamDestroy:
                | NonNullable<
                    NonNullable<RuntimeConnection["connection"]>["stream"]
                  >["destroy"]
                | undefined;

              const patchedTransaction = async function (
                this: unknown,
                ...args: unknown[]
              ): Promise<unknown> {
                transactionInstances.push(this);
                const manager = (
                  this as {
                    readonly connectionManager: RuntimeConnectionManager;
                  }
                ).connectionManager;
                capturedManager = manager;
                originalRelease = manager.releaseConnection;
                originalDestroy = manager.destroyConnection;
                manager.releaseConnection = function (connection) {
                  releaseCalls += 1;
                  releaseExactClient ||= connection === migrationClient;
                  return originalRelease?.call(this, connection);
                };
                manager.destroyConnection = async function (connection) {
                  destroyCalls += 1;
                  destroyExactClient ||= connection === migrationClient;
                  return originalDestroy?.call(this, connection);
                };
                const callbackIndex = args.length - 1;
                const callback = args[callbackIndex];
                if (typeof callback !== "function") {
                  throw new Error("MIGRATION_LOCK_TIMEOUT_CALLBACK_MISSING");
                }
                const wrappedCallback = async (...callbackArgs: unknown[]) => {
                  transactionCallbacks += 1;
                  const transaction = callbackArgs[0] as {
                    readonly connection?: RuntimeConnection;
                  };
                  const client = transaction.connection;
                  if (client === undefined) {
                    throw new Error("MIGRATION_LOCK_TIMEOUT_CLIENT_MISSING");
                  }
                  migrationClient = client;
                  migrationClients.add(client);
                  originalClientQuery = client.query;
                  client.query = function (...queryArgs: unknown[]): unknown {
                    const request = queryArgs[0];
                    const sql =
                      typeof request === "string"
                        ? request
                        : typeof request === "object" &&
                            request !== null &&
                            "text" in request &&
                            typeof request.text === "string"
                          ? request.text
                          : "";
                    if (/\bROLLBACK\b/u.test(sql)) {
                      rollbackQueries += 1;
                    }
                    return originalClientQuery?.apply(this, queryArgs);
                  };
                  const stream = client.connection?.stream;
                  if (stream === undefined) {
                    throw new Error("MIGRATION_LOCK_TIMEOUT_STREAM_MISSING");
                  }
                  capturedStream = stream;
                  originalStreamDestroy = stream.destroy;
                  stream.destroy = function (...destroyArgs: unknown[]): unknown {
                    streamDestroyCalls += 1;
                    streamDestroyExactClient ||= client === migrationClient;
                    eventOrder.push("stream-destroy");
                    return originalStreamDestroy?.apply(this, destroyArgs);
                  };
                  return (callback as (...values: unknown[]) => unknown)(
                    ...callbackArgs,
                  );
                };
                const wrappedArgs = [...args];
                wrappedArgs[callbackIndex] = wrappedCallback;
                try {
                  return await originalTransaction.apply(this, wrappedArgs);
                } finally {
                  eventOrder.push("transaction-settled");
                  manager.releaseConnection = originalRelease;
                  manager.destroyConnection = originalDestroy;
                  if (migrationClient !== undefined && originalClientQuery !== undefined) {
                    migrationClient.query = originalClientQuery;
                  }
                  if (capturedStream !== undefined && originalStreamDestroy !== undefined) {
                    capturedStream.destroy = originalStreamDestroy;
                  }
                }
              };

              console.info(
                `MIGRATION_LOCK_TIMEOUT_DESTRUCTION_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId}`,
              );
              let operationFailure: unknown;
              const startedAt = performance.now();
              try {
                sequelizePrototype.transaction = patchedTransaction;
                try {
                  await inspectMigrationStatus({
                    target: namespace.target,
                    buildRoot: artifact.buildRoot,
                  });
                } catch (error) {
                  operationFailure = error;
                }
              } finally {
                sequelizePrototype.transaction = originalTransaction;
              }
              const elapsedMs = performance.now() - startedAt;

              expect(operationFailure).toBeInstanceOf(Error);
              expect(operationFailure).toMatchObject({
                name: "MigrationLifecycleError",
                message: "MIGRATION_LOCK_TIMEOUT",
                result: 2,
              });
              expect(
                (operationFailure as Error & { readonly cause?: unknown }).cause,
              ).toBeUndefined();
              expect(elapsedMs).toBeGreaterThanOrEqual(4_900);
              expect(elapsedMs).toBeLessThan(10_000);
              expect(sequelizePrototype.transaction).toBe(originalTransaction);
              expect(transactionInstances).toHaveLength(1);
              expect(transactionCallbacks).toBe(1);
              expect(migrationClients.size).toBe(1);
              expect(migrationClient).toBeDefined();
              expect(capturedManager?.releaseConnection).toBe(originalRelease);
              expect(capturedManager?.destroyConnection).toBe(originalDestroy);
              expect(migrationClient?.query).toBe(originalClientQuery);
              expect(capturedStream?.destroy).toBe(originalStreamDestroy);
              await expectEmptyMigrationNamespace(control, namespace);
              const activeAfter = await withClient(
                control,
                (client) =>
                  client.query<{ pid: number }>(
                    `SELECT pid::integer AS pid
                       FROM pg_catalog.pg_stat_activity
                      WHERE datname = $1
                        AND application_name = 'rick-and-morty-explorer:migrations'`,
                    [namespace.database],
                  ),
                namespace.database,
              );
              expect(activeAfter.rows).toEqual([]);

              console.info(
                `MIGRATION_LOCK_TIMEOUT_DESTRUCTION_OBSERVED transactions=${transactionInstances.length} callbacks=${transactionCallbacks} clients=${migrationClients.size} rollbacks=${rollbackQueries} releases=${releaseCalls} releaseExact=${String(releaseExactClient)} destroys=${destroyCalls} destroyExact=${String(destroyExactClient)} streamDestroys=${streamDestroyCalls} streamDestroyExact=${String(streamDestroyExactClient)} backendRows=${activeAfter.rows.length}`,
              );
              try {
                expect(rollbackQueries).toBe(0);
                expect(releaseCalls).toBe(0);
                expect(releaseExactClient).toBe(false);
                expect(destroyCalls).toBe(1);
                expect(destroyExactClient).toBe(true);
                expect(streamDestroyCalls).toBeGreaterThanOrEqual(1);
                expect(streamDestroyExactClient).toBe(true);
                expect(eventOrder.indexOf("stream-destroy")).toBeGreaterThanOrEqual(0);
                expect(eventOrder.indexOf("stream-destroy")).toBeLessThan(
                  eventOrder.indexOf("transaction-settled"),
                );
              } catch {
                throw new Error(
                  "MIGRATION_LOCK_TIMEOUT_DESTRUCTION_MISSING_AFTER_CONTENTION",
                );
              }
            } finally {
              if (blockerTransaction) {
                await blocker.query("ROLLBACK");
              }
              if (blockerConnected) {
                await blocker.end();
              }
            }
          },
        });
      } catch (error) {
        primaryFailure = error;
      }

      expect(await listOwnedDatabases(control)).toEqual([]);
      if (primaryFailure !== undefined) {
        throw primaryFailure;
      }
    },
    15_000,
  );

  it(
    "destroys the owned physical session when the lock query remains suspended past its deadline",
    async () => {
      const control = loadControl();
      let primaryFailure: unknown;

      try {
        await withPostgresNamespace({
          control,
          body: async (namespace) => {
            const { buildMigrationArtifact } = await loadFutureBoundary();
            const artifact = await buildMigrationArtifact();
            await authenticateArtifact(artifact);
            const inspectMigrationStatus = await loadMigrationStatusBoundary();
            await expectEmptyMigrationNamespace(control, namespace);

            type RuntimeConnection = {
              query: (...args: unknown[]) => unknown;
              readonly connection?: {
                readonly stream?: {
                  destroy: (...args: unknown[]) => unknown;
                };
              };
            };
            type RuntimeConnectionManager = {
              releaseConnection: (
                this: RuntimeConnectionManager,
                connection: unknown,
              ) => unknown;
              destroyConnection: (
                this: RuntimeConnectionManager,
                connection: unknown,
              ) => Promise<unknown>;
            };
            const sequelizeSpecifier: string = "sequelize";
            const sequelizeModule = (await import(
              sequelizeSpecifier
            )) as unknown as {
              Sequelize: {
                prototype: {
                  transaction(
                    this: unknown,
                    ...args: unknown[]
                  ): Promise<unknown>;
                };
              };
            };
            const sequelizePrototype = sequelizeModule.Sequelize.prototype;
            const originalTransaction = sequelizePrototype.transaction;
            const lockSql = `SELECT pg_catalog.pg_try_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
) AS acquired`;
            const migrationClients = new Set<RuntimeConnection>();
            const eventOrder: string[] = [];
            let transactionCallbacks = 0;
            let interceptedLockQueries = 0;
            let interceptedQueryTimeout: unknown;
            let releaseCalls = 0;
            let releaseExactClient = false;
            let destroyCalls = 0;
            let destroyExactClient = false;
            let streamDestroyCalls = 0;
            let streamDestroyExactClient = false;
            let rollbackQueries = 0;
            let migrationClient: RuntimeConnection | undefined;
            let capturedManager: RuntimeConnectionManager | undefined;
            let originalRelease:
              | RuntimeConnectionManager["releaseConnection"]
              | undefined;
            let originalDestroy:
              | RuntimeConnectionManager["destroyConnection"]
              | undefined;
            let originalClientQuery: RuntimeConnection["query"] | undefined;
            let capturedStream:
              | NonNullable<RuntimeConnection["connection"]>["stream"]
              | undefined;
            let originalStreamDestroy:
              | NonNullable<
                  NonNullable<RuntimeConnection["connection"]>["stream"]
                >["destroy"]
              | undefined;

            const patchedTransaction = async function (
              this: unknown,
              ...args: unknown[]
            ): Promise<unknown> {
              const manager = (
                this as {
                  readonly connectionManager: RuntimeConnectionManager;
                }
              ).connectionManager;
              capturedManager = manager;
              originalRelease = manager.releaseConnection;
              originalDestroy = manager.destroyConnection;
              manager.releaseConnection = function (connection) {
                releaseCalls += 1;
                releaseExactClient ||= connection === migrationClient;
                return originalRelease?.call(this, connection);
              };
              manager.destroyConnection = async function (connection) {
                destroyCalls += 1;
                destroyExactClient ||= connection === migrationClient;
                return originalDestroy?.call(this, connection);
              };
              const callbackIndex = args.length - 1;
              const callback = args[callbackIndex];
              if (typeof callback !== "function") {
                throw new Error("MIGRATION_LOCK_SUSPENDED_CALLBACK_MISSING");
              }
              const wrappedCallback = async (...callbackArgs: unknown[]) => {
                transactionCallbacks += 1;
                const transaction = callbackArgs[0] as {
                  readonly connection?: RuntimeConnection;
                };
                const client = transaction.connection;
                if (client === undefined) {
                  throw new Error("MIGRATION_LOCK_SUSPENDED_CLIENT_MISSING");
                }
                migrationClient = client;
                migrationClients.add(client);
                originalClientQuery = client.query;
                client.query = function (...queryArgs: unknown[]): unknown {
                  const request = queryArgs[0];
                  const sql =
                    typeof request === "string"
                      ? request
                      : typeof request === "object" &&
                          request !== null &&
                          "text" in request &&
                          typeof request.text === "string"
                        ? request.text
                        : "";
                  if (sql === lockSql) {
                    interceptedLockQueries += 1;
                    interceptedQueryTimeout =
                      typeof request === "object" &&
                      request !== null &&
                      "query_timeout" in request
                        ? request.query_timeout
                        : undefined;
                    return originalClientQuery?.call(this, {
                      text: "SELECT pg_catalog.pg_sleep(6)",
                      rowMode: "array",
                      query_timeout: interceptedQueryTimeout,
                    });
                  }
                  if (/\bROLLBACK\b/u.test(sql)) {
                    rollbackQueries += 1;
                  }
                  return originalClientQuery?.apply(this, queryArgs);
                };
                const stream = client.connection?.stream;
                if (stream === undefined) {
                  throw new Error("MIGRATION_LOCK_SUSPENDED_STREAM_MISSING");
                }
                capturedStream = stream;
                originalStreamDestroy = stream.destroy;
                stream.destroy = function (...destroyArgs: unknown[]): unknown {
                  streamDestroyCalls += 1;
                  streamDestroyExactClient ||= client === migrationClient;
                  eventOrder.push("stream-destroy");
                  return originalStreamDestroy?.apply(this, destroyArgs);
                };
                return (callback as (...values: unknown[]) => unknown)(
                  ...callbackArgs,
                );
              };
              const wrappedArgs = [...args];
              wrappedArgs[callbackIndex] = wrappedCallback;
              try {
                return await originalTransaction.apply(this, wrappedArgs);
              } finally {
                eventOrder.push("transaction-settled");
                manager.releaseConnection = originalRelease;
                manager.destroyConnection = originalDestroy;
                if (
                  migrationClient !== undefined &&
                  originalClientQuery !== undefined
                ) {
                  migrationClient.query = originalClientQuery;
                }
                if (
                  capturedStream !== undefined &&
                  originalStreamDestroy !== undefined
                ) {
                  capturedStream.destroy = originalStreamDestroy;
                }
              }
            };

            console.info(
              `MIGRATION_LOCK_SUSPENDED_QUERY_TIMEOUT_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId}`,
            );
            let operationFailure: unknown;
            const startedAt = performance.now();
            try {
              sequelizePrototype.transaction = patchedTransaction;
              try {
                await inspectMigrationStatus({
                  target: namespace.target,
                  buildRoot: artifact.buildRoot,
                });
              } catch (error) {
                operationFailure = error;
              }
            } finally {
              sequelizePrototype.transaction = originalTransaction;
            }
            const elapsedMs = performance.now() - startedAt;

            expect(sequelizePrototype.transaction).toBe(originalTransaction);
            expect(transactionCallbacks).toBe(1);
            expect(migrationClients.size).toBe(1);
            expect(migrationClient).toBeDefined();
            expect(interceptedLockQueries).toBe(1);
            expect(interceptedQueryTimeout).toEqual(expect.any(Number));
            expect(interceptedQueryTimeout as number).toBeGreaterThanOrEqual(
              4_900,
            );
            expect(interceptedQueryTimeout as number).toBeLessThanOrEqual(5_000);
            expect(elapsedMs).toBeGreaterThanOrEqual(4_900);
            expect(elapsedMs).toBeLessThan(10_000);
            expect(capturedManager?.releaseConnection).toBe(originalRelease);
            expect(capturedManager?.destroyConnection).toBe(originalDestroy);
            expect(migrationClient?.query).toBe(originalClientQuery);
            expect(capturedStream?.destroy).toBe(originalStreamDestroy);
            await expectEmptyMigrationNamespace(control, namespace);
            const queryMigrationBackends = () =>
              withClient(
                control,
                (client) =>
                  client.query<{ pid: number }>(
                    `SELECT pid::integer AS pid
                       FROM pg_catalog.pg_stat_activity
                      WHERE datname = $1
                        AND application_name = 'rick-and-morty-explorer:migrations'`,
                    [namespace.database],
                  ),
                namespace.database,
              );
            const backendAbsenceDeadline = performance.now() + 2_000;
            let backendPollAttempts = 1;
            let activeAfter = await queryMigrationBackends();
            while (
              activeAfter.rows.length > 0 &&
              performance.now() < backendAbsenceDeadline
            ) {
              const remainingMs = backendAbsenceDeadline - performance.now();
              await new Promise<void>((resolve) =>
                setTimeout(resolve, Math.min(25, Math.max(0, remainingMs))),
              );
              backendPollAttempts += 1;
              activeAfter = await queryMigrationBackends();
            }
            expect(activeAfter.rows).toEqual([]);

            console.info(
              `MIGRATION_LOCK_SUSPENDED_QUERY_TIMEOUT_OBSERVED callbacks=${transactionCallbacks} clients=${migrationClients.size} intercepted=${interceptedLockQueries} timeoutNumeric=${String(typeof interceptedQueryTimeout === "number")} rollbacks=${rollbackQueries} releases=${releaseCalls} releaseExact=${String(releaseExactClient)} destroys=${destroyCalls} destroyExact=${String(destroyExactClient)} streamDestroys=${streamDestroyCalls} streamDestroyExact=${String(streamDestroyExactClient)} backendRows=${activeAfter.rows.length} backendPolls=${backendPollAttempts}`,
            );
            try {
              expect(operationFailure).toBeInstanceOf(Error);
              expect(operationFailure).toMatchObject({
                name: "MigrationLifecycleError",
                message: "MIGRATION_LOCK_TIMEOUT",
                result: 2,
              });
              expect(
                (operationFailure as Error & { readonly cause?: unknown }).cause,
              ).toBeUndefined();
              expect(rollbackQueries).toBe(0);
              expect(releaseCalls).toBe(0);
              expect(releaseExactClient).toBe(false);
              expect(destroyCalls).toBe(1);
              expect(destroyExactClient).toBe(true);
              expect(streamDestroyCalls).toBeGreaterThanOrEqual(1);
              expect(streamDestroyExactClient).toBe(true);
              expect(eventOrder.indexOf("stream-destroy")).toBeGreaterThanOrEqual(
                0,
              );
              expect(eventOrder.indexOf("stream-destroy")).toBeLessThan(
                eventOrder.indexOf("transaction-settled"),
              );
            } catch {
              throw new Error(
                "MIGRATION_LOCK_SUSPENDED_QUERY_TIMEOUT_MISSING_AFTER_DEADLINE",
              );
            }
          },
        });
      } catch (error) {
        primaryFailure = error;
      }

      expect(await listOwnedDatabases(control)).toEqual([]);
      if (primaryFailure !== undefined) {
        throw primaryFailure;
      }
    },
    15_000,
  );

  it("rolls back forward DDL and history when a later migration fails", async () => {
    const control = loadControl();
    const fixtureRoot = join(
      repositoryRoot,
      "apps/api/dist/task-004-migration-fixtures",
      `${process.pid}-${randomUUID()}`,
    );
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          const canonicalMapping = manifest.mappings[0];
          expect(canonicalMapping).toBeDefined();
          if (canonicalMapping === undefined) {
            throw new Error("MIGRATION_FORWARD_ATOMICITY_MAPPING_MISSING");
          }

          const canonicalReport = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            canonicalReport,
            namespace,
            artifact,
            { noOp: false, applied: [canonicalMapping] },
            control.user,
          );

          const fixtureId = "20260814000001-forward-atomicity-failure";
          const fixtureInputPath =
            `apps/api/src/infrastructure/database/migrations/${fixtureId}.ts`;
          const fixtureEmittedPath = `files/${fixtureId}.js`;
          const fixtureSource = new TextEncoder().encode(
            `export const migration = {\n  async up({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`CREATE TABLE \${schema}.forward_atomicity_probe (id integer NOT NULL PRIMARY KEY)\`, { transaction: context.transaction });\n    throw new Error("TASK_004_FORWARD_ATOMICITY_FIXTURE_FAILURE");\n  },\n  async down({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`DROP TABLE \${schema}.forward_atomicity_probe\`, { transaction: context.transaction });\n  },\n};\n`,
          );
          const fixtureSha256 = sha256(fixtureSource);
          const identity = {
            ...manifest,
            inputs: [
              ...manifest.inputs,
              { path: fixtureInputPath, sourceSha256: fixtureSha256 },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            files: [
              ...manifest.files,
              {
                path: fixtureEmittedPath,
                role: "migration",
                sha256: fixtureSha256,
              },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            mappings: [
              ...manifest.mappings,
              {
                migrationId: fixtureId,
                sourcePath: fixtureInputPath,
                sourceSha256: fixtureSha256,
                emittedPath: fixtureEmittedPath,
                emittedSha256: fixtureSha256,
              },
            ],
          } satisfies MigrationManifest;
          const fixtureBuildId = recomputeBuildId(identity);
          const fixtureManifest: MigrationManifest = {
            ...identity,
            buildId: fixtureBuildId,
          };
          const fixtureBuildRoot = join(fixtureRoot, fixtureBuildId);
          await mkdir(fixtureRoot, { recursive: true });
          await cp(artifact.buildRoot, fixtureBuildRoot, { recursive: true });
          await writeFile(
            join(fixtureBuildRoot, fixtureEmittedPath),
            fixtureSource,
          );

          const captureState = () =>
            withClient(
              control,
              async (client) => {
                const tables = await client.query<{ table_name: string }>(
                  `SELECT table_name
                     FROM information_schema.tables
                    WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                    ORDER BY table_name`,
                  [namespace.schema],
                );
                const columns = await client.query<{
                  table_name: string;
                  column_name: string;
                  data_type: string;
                  not_null: boolean;
                  is_identity: string;
                  identity_generation: string | null;
                  column_default: string | null;
                }>(
                  `SELECT table_name,
                          column_name,
                          data_type,
                          is_nullable = 'NO' AS not_null,
                          is_identity,
                          identity_generation,
                          column_default
                     FROM information_schema.columns
                    WHERE table_schema = $1
                    ORDER BY table_name, ordinal_position`,
                  [namespace.schema],
                );
                const constraints = await client.query<{
                  constraint_name: string;
                  constraint_type: string;
                }>(
                  `SELECT table_constraint.constraint_name,
                          table_constraint.constraint_type
                     FROM information_schema.table_constraints AS table_constraint
                     JOIN pg_catalog.pg_namespace AS table_namespace
                       ON table_namespace.nspname = table_constraint.table_schema
                     JOIN pg_catalog.pg_class AS constrained_relation
                       ON constrained_relation.relnamespace = table_namespace.oid
                      AND constrained_relation.relname = table_constraint.table_name
                     JOIN pg_catalog.pg_constraint AS catalog_constraint
                       ON catalog_constraint.connamespace = table_namespace.oid
                      AND catalog_constraint.conrelid = constrained_relation.oid
                      AND catalog_constraint.conname = table_constraint.constraint_name
                    WHERE table_constraint.table_schema = $1
                      AND catalog_constraint.contype <> 'n'
                    ORDER BY table_constraint.constraint_name`,
                  [namespace.schema],
                );
                const indexes = await client.query<{
                  indexname: string;
                  indexdef: string;
                }>(
                  `SELECT indexname, indexdef
                     FROM pg_catalog.pg_indexes
                    WHERE schemaname = $1
                    ORDER BY indexname`,
                  [namespace.schema],
                );
                const history = await client.query<{
                  migration_id: string;
                  source_sha256: string;
                  applied_at: string;
                }>(
                  `SELECT migration_id,
                          source_sha256,
                          pg_catalog.to_char(
                            applied_at AT TIME ZONE 'UTC',
                            'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'
                          ) AS applied_at
                     FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                    ORDER BY migration_id`,
                );
                const counts = await client.query<{
                  character_count: number;
                  comment_count: number;
                }>(
                  `SELECT
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.characters) AS character_count,
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.comments) AS comment_count`,
                );
                return {
                  tables: tables.rows.map(({ table_name }) => table_name),
                  columns: columns.rows,
                  constraints: constraints.rows,
                  indexes: indexes.rows,
                  history: history.rows,
                  counts: counts.rows,
                };
              },
              namespace.database,
            );

          const beforeFailure = await captureState();
          expect(beforeFailure.tables).toEqual([
            "characters",
            "comments",
            "sequelize_migration_history",
          ]);
          expect(beforeFailure.history).toEqual([
            {
              migration_id: canonicalMapping.migrationId,
              source_sha256: canonicalMapping.sourceSha256,
              applied_at: expect.stringMatching(
                /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}Z$/u,
              ),
            },
          ]);
          expect(beforeFailure.counts).toEqual([
            { character_count: 0, comment_count: 0 },
          ]);
          console.info(
            `MIGRATION_FORWARD_ATOMICITY_READY database=${namespace.database} schema=${namespace.schema} build=${fixtureBuildId} applied=1`,
          );

          const factory = (await import(
            pathToFileURL(join(fixtureBuildRoot, "files/factory.js")).href
          )) as {
            prepareWithMigrationFactory(
              options: Record<string, unknown>,
            ): Promise<PreparationReport>;
          };
          const target = {
            host: "127.0.0.1",
            port: control.port,
            database: namespace.database,
            schema: namespace.schema,
            user: control.user,
            credential: control.password,
          };
          let rejection: unknown;
          try {
            await factory.prepareWithMigrationFactory({
              target,
              manifest: fixtureManifest,
              artifactRoot: pathToFileURL(`${fixtureBuildRoot}/`),
            });
          } catch (error) {
            rejection = error;
          }
          expect(rejection).toBeInstanceOf(Error);
          const rejectionMessages: string[] = [];
          let current: unknown = rejection;
          for (let depth = 0; depth < 10 && current instanceof Error; depth += 1) {
            rejectionMessages.push(current.message);
            current = (current as Error & { readonly cause?: unknown }).cause;
          }
          expect(
            rejectionMessages.some((message) =>
              message.includes("TASK_004_FORWARD_ATOMICITY_FIXTURE_FAILURE"),
            ),
          ).toBe(true);

          const afterFailure = await captureState();
          try {
            expect(afterFailure).toEqual(beforeFailure);
            expect(afterFailure.tables).not.toContain("forward_atomicity_probe");
            expect(
              afterFailure.history.some(
                ({ migration_id }) => migration_id === fixtureId,
              ),
            ).toBe(false);
          } catch {
            throw new Error(
              "MIGRATION_FORWARD_ATOMICITY_NOT_PRESERVED_AFTER_FAILURE",
              { cause: rejection },
            );
          }
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      await rm(fixtureRoot, { recursive: true, force: true });
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("preserves applied DDL and history when a rollback migration fails", async () => {
    const control = loadControl();
    const fixtureRoot = join(
      repositoryRoot,
      "apps/api/dist/task-004-migration-fixtures",
      `${process.pid}-${randomUUID()}`,
    );
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact } = await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          const canonicalMapping = manifest.mappings[0];
          expect(canonicalMapping).toBeDefined();
          if (canonicalMapping === undefined) {
            throw new Error("MIGRATION_ROLLBACK_ATOMICITY_MAPPING_MISSING");
          }

          const fixtureId = "20260814000001-rollback-atomicity-failure";
          const fixtureInputPath =
            `apps/api/src/infrastructure/database/migrations/${fixtureId}.ts`;
          const fixtureEmittedPath = `files/${fixtureId}.js`;
          const fixtureSource = new TextEncoder().encode(
            `export const migration = {\n  async up({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`CREATE TABLE \${schema}.rollback_atomicity_probe (id integer NOT NULL PRIMARY KEY)\`, { transaction: context.transaction });\n  },\n  async down({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`DROP TABLE \${schema}.rollback_atomicity_probe\`, { transaction: context.transaction });\n    throw new Error("TASK_004_ROLLBACK_ATOMICITY_FIXTURE_FAILURE");\n  },\n};\n`,
          );
          const fixtureSha256 = sha256(fixtureSource);
          const identity = {
            ...manifest,
            inputs: [
              ...manifest.inputs,
              { path: fixtureInputPath, sourceSha256: fixtureSha256 },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            files: [
              ...manifest.files,
              {
                path: fixtureEmittedPath,
                role: "migration",
                sha256: fixtureSha256,
              },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            mappings: [
              ...manifest.mappings,
              {
                migrationId: fixtureId,
                sourcePath: fixtureInputPath,
                sourceSha256: fixtureSha256,
                emittedPath: fixtureEmittedPath,
                emittedSha256: fixtureSha256,
              },
            ],
          } satisfies MigrationManifest;
          const fixtureBuildId = recomputeBuildId(identity);
          const fixtureManifest: MigrationManifest = {
            ...identity,
            buildId: fixtureBuildId,
          };
          const fixtureBuildRoot = join(fixtureRoot, fixtureBuildId);
          await mkdir(fixtureRoot, { recursive: true });
          await cp(artifact.buildRoot, fixtureBuildRoot, { recursive: true });
          await writeFile(
            join(fixtureBuildRoot, fixtureEmittedPath),
            fixtureSource,
          );

          const factory = (await import(
            pathToFileURL(join(fixtureBuildRoot, "files/factory.js")).href
          )) as {
            prepareWithMigrationFactory(
              options: Record<string, unknown>,
            ): Promise<PreparationReport>;
            revertWithMigrationFactory(
              options: Record<string, unknown>,
            ): Promise<MigrationDownReport>;
          };
          const options = {
            target: {
              host: "127.0.0.1",
              port: control.port,
              database: namespace.database,
              schema: namespace.schema,
              user: control.user,
              credential: control.password,
            },
            manifest: fixtureManifest,
            artifactRoot: pathToFileURL(`${fixtureBuildRoot}/`),
          };
          const prepared = await factory.prepareWithMigrationFactory(options);
          expect(prepared.applied).toEqual(
            fixtureManifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migrationId,
                sourceSha256,
              }),
            ),
          );

          const captureState = () =>
            withClient(
              control,
              async (client) => {
                const tables = await client.query<{ table_name: string }>(
                  `SELECT table_name
                     FROM information_schema.tables
                    WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                    ORDER BY table_name`,
                  [namespace.schema],
                );
                const columns = await client.query<{
                  table_name: string;
                  column_name: string;
                  data_type: string;
                  not_null: boolean;
                  is_identity: string;
                  identity_generation: string | null;
                  column_default: string | null;
                }>(
                  `SELECT table_name,
                          column_name,
                          data_type,
                          is_nullable = 'NO' AS not_null,
                          is_identity,
                          identity_generation,
                          column_default
                     FROM information_schema.columns
                    WHERE table_schema = $1
                    ORDER BY table_name, ordinal_position`,
                  [namespace.schema],
                );
                const constraints = await client.query<{
                  constraint_name: string;
                  constraint_type: string;
                }>(
                  `SELECT table_constraint.constraint_name,
                          table_constraint.constraint_type
                     FROM information_schema.table_constraints AS table_constraint
                     JOIN pg_catalog.pg_namespace AS table_namespace
                       ON table_namespace.nspname = table_constraint.table_schema
                     JOIN pg_catalog.pg_class AS constrained_relation
                       ON constrained_relation.relnamespace = table_namespace.oid
                      AND constrained_relation.relname = table_constraint.table_name
                     JOIN pg_catalog.pg_constraint AS catalog_constraint
                       ON catalog_constraint.connamespace = table_namespace.oid
                      AND catalog_constraint.conrelid = constrained_relation.oid
                      AND catalog_constraint.conname = table_constraint.constraint_name
                    WHERE table_constraint.table_schema = $1
                      AND catalog_constraint.contype <> 'n'
                    ORDER BY table_constraint.constraint_name`,
                  [namespace.schema],
                );
                const indexes = await client.query<{
                  indexname: string;
                  indexdef: string;
                }>(
                  `SELECT indexname, indexdef
                     FROM pg_catalog.pg_indexes
                    WHERE schemaname = $1
                    ORDER BY indexname`,
                  [namespace.schema],
                );
                const history = await client.query<{
                  migration_id: string;
                  source_sha256: string;
                  applied_at: string;
                }>(
                  `SELECT migration_id,
                          source_sha256,
                          pg_catalog.to_char(
                            applied_at AT TIME ZONE 'UTC',
                            'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'
                          ) AS applied_at
                     FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                    ORDER BY migration_id`,
                );
                const counts = await client.query<{
                  character_count: number;
                  comment_count: number;
                }>(
                  `SELECT
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.characters) AS character_count,
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.comments) AS comment_count`,
                );
                return {
                  tables: tables.rows.map(({ table_name }) => table_name),
                  columns: columns.rows,
                  constraints: constraints.rows,
                  indexes: indexes.rows,
                  history: history.rows,
                  counts: counts.rows,
                };
              },
              namespace.database,
            );

          const beforeFailure = await captureState();
          expect(beforeFailure.tables).toEqual([
            "characters",
            "comments",
            "rollback_atomicity_probe",
            "sequelize_migration_history",
          ]);
          expect(beforeFailure.history).toEqual([
            {
              migration_id: canonicalMapping.migrationId,
              source_sha256: canonicalMapping.sourceSha256,
              applied_at: expect.stringMatching(
                /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}Z$/u,
              ),
            },
            {
              migration_id: fixtureId,
              source_sha256: fixtureSha256,
              applied_at: expect.stringMatching(
                /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}Z$/u,
              ),
            },
          ]);
          expect(beforeFailure.counts).toEqual([
            { character_count: 0, comment_count: 0 },
          ]);
          console.info(
            `MIGRATION_ROLLBACK_ATOMICITY_READY database=${namespace.database} schema=${namespace.schema} build=${fixtureBuildId} applied=2`,
          );

          let rejection: unknown;
          try {
            await factory.revertWithMigrationFactory(options);
          } catch (error) {
            rejection = error;
          }
          expect(rejection).toBeInstanceOf(Error);
          const rejectionMessages: string[] = [];
          let current: unknown = rejection;
          for (let depth = 0; depth < 10 && current instanceof Error; depth += 1) {
            rejectionMessages.push(current.message);
            current = (current as Error & { readonly cause?: unknown }).cause;
          }
          expect(
            rejectionMessages.some((message) =>
              message.includes("TASK_004_ROLLBACK_ATOMICITY_FIXTURE_FAILURE"),
            ),
          ).toBe(true);

          const afterFailure = await captureState();
          try {
            expect(afterFailure).toEqual(beforeFailure);
            expect(afterFailure.tables).toContain("rollback_atomicity_probe");
            expect(
              afterFailure.history.some(
                ({ migration_id }) => migration_id === fixtureId,
              ),
            ).toBe(true);
          } catch {
            throw new Error(
              "MIGRATION_ROLLBACK_ATOMICITY_NOT_PRESERVED_AFTER_FAILURE",
              { cause: rejection },
            );
          }
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      await rm(fixtureRoot, { recursive: true, force: true });
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("rolls back migration DDL when history metadata insertion fails", async () => {
    const control = loadControl();
    const fixtureRoot = join(
      repositoryRoot,
      "apps/api/dist/task-004-migration-fixtures",
      `${process.pid}-${randomUUID()}`,
    );
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          const canonicalMapping = manifest.mappings[0];
          expect(canonicalMapping).toBeDefined();
          if (canonicalMapping === undefined) {
            throw new Error("MIGRATION_METADATA_WRITE_ATOMICITY_MAPPING_MISSING");
          }

          const canonicalReport = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            canonicalReport,
            namespace,
            artifact,
            { noOp: false, applied: [canonicalMapping] },
            control.user,
          );

          const fixtureId = "20260814000001-metadata-write-atomicity";
          const fixtureInputPath =
            `apps/api/src/infrastructure/database/migrations/${fixtureId}.ts`;
          const fixtureEmittedPath = `files/${fixtureId}.js`;
          const fixtureSource = new TextEncoder().encode(
            `export const migration = {\n  async up({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`CREATE TABLE \${schema}.metadata_write_atomicity_probe (id integer NOT NULL PRIMARY KEY)\`, { transaction: context.transaction });\n  },\n  async down({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`DROP TABLE \${schema}.metadata_write_atomicity_probe\`, { transaction: context.transaction });\n  },\n};\n`,
          );
          const fixtureSha256 = sha256(fixtureSource);
          const identity = {
            ...manifest,
            inputs: [
              ...manifest.inputs,
              { path: fixtureInputPath, sourceSha256: fixtureSha256 },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            files: [
              ...manifest.files,
              {
                path: fixtureEmittedPath,
                role: "migration",
                sha256: fixtureSha256,
              },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            mappings: [
              ...manifest.mappings,
              {
                migrationId: fixtureId,
                sourcePath: fixtureInputPath,
                sourceSha256: fixtureSha256,
                emittedPath: fixtureEmittedPath,
                emittedSha256: fixtureSha256,
              },
            ],
          } satisfies MigrationManifest;
          const fixtureBuildId = recomputeBuildId(identity);
          const fixtureManifest: MigrationManifest = {
            ...identity,
            buildId: fixtureBuildId,
          };
          const fixtureBuildRoot = join(fixtureRoot, fixtureBuildId);
          await mkdir(fixtureRoot, { recursive: true });
          await cp(artifact.buildRoot, fixtureBuildRoot, { recursive: true });
          await writeFile(
            join(fixtureBuildRoot, fixtureEmittedPath),
            fixtureSource,
          );

          const rejectingConstraint =
            "sequelize_migration_history_metadata_write_fixture_id_check";
          await withClient(
            control,
            (client) =>
              client.query(
                `ALTER TABLE ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                   ADD CONSTRAINT "sequelize_migration_history_metadata_write_fixture_id_check"
                   CHECK (migration_id <> '${fixtureId}')`,
              ),
            namespace.database,
          );

          const captureState = () =>
            withClient(
              control,
              async (client) => {
                const tables = await client.query<{ table_name: string }>(
                  `SELECT table_name
                     FROM information_schema.tables
                    WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                    ORDER BY table_name`,
                  [namespace.schema],
                );
                const columns = await client.query<{
                  table_name: string;
                  column_name: string;
                  data_type: string;
                  not_null: boolean;
                  is_identity: string;
                  identity_generation: string | null;
                  column_default: string | null;
                }>(
                  `SELECT table_name,
                          column_name,
                          data_type,
                          is_nullable = 'NO' AS not_null,
                          is_identity,
                          identity_generation,
                          column_default
                     FROM information_schema.columns
                    WHERE table_schema = $1
                    ORDER BY table_name, ordinal_position`,
                  [namespace.schema],
                );
                const constraints = await client.query<{
                  constraint_name: string;
                  constraint_type: string;
                }>(
                  `SELECT table_constraint.constraint_name,
                          table_constraint.constraint_type
                     FROM information_schema.table_constraints AS table_constraint
                     JOIN pg_catalog.pg_namespace AS table_namespace
                       ON table_namespace.nspname = table_constraint.table_schema
                     JOIN pg_catalog.pg_class AS constrained_relation
                       ON constrained_relation.relnamespace = table_namespace.oid
                      AND constrained_relation.relname = table_constraint.table_name
                     JOIN pg_catalog.pg_constraint AS catalog_constraint
                       ON catalog_constraint.connamespace = table_namespace.oid
                      AND catalog_constraint.conrelid = constrained_relation.oid
                      AND catalog_constraint.conname = table_constraint.constraint_name
                    WHERE table_constraint.table_schema = $1
                      AND catalog_constraint.contype <> 'n'
                    ORDER BY table_constraint.constraint_name`,
                  [namespace.schema],
                );
                const indexes = await client.query<{
                  indexname: string;
                  indexdef: string;
                }>(
                  `SELECT indexname, indexdef
                     FROM pg_catalog.pg_indexes
                    WHERE schemaname = $1
                    ORDER BY indexname`,
                  [namespace.schema],
                );
                const history = await client.query<{
                  migration_id: string;
                  source_sha256: string;
                  applied_at: string;
                }>(
                  `SELECT migration_id,
                          source_sha256,
                          pg_catalog.to_char(
                            applied_at AT TIME ZONE 'UTC',
                            'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'
                          ) AS applied_at
                     FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                    ORDER BY migration_id`,
                );
                const counts = await client.query<{
                  character_count: number;
                  comment_count: number;
                }>(
                  `SELECT
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.characters) AS character_count,
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.comments) AS comment_count`,
                );
                return {
                  tables: tables.rows.map(({ table_name }) => table_name),
                  columns: columns.rows,
                  constraints: constraints.rows,
                  indexes: indexes.rows,
                  history: history.rows,
                  counts: counts.rows,
                };
              },
              namespace.database,
            );

          const beforeFailure = await captureState();
          expect(beforeFailure.tables).toEqual([
            "characters",
            "comments",
            "sequelize_migration_history",
          ]);
          expect(beforeFailure.constraints).toContainEqual({
            constraint_name: rejectingConstraint,
            constraint_type: "CHECK",
          });
          expect(beforeFailure.history).toEqual([
            {
              migration_id: canonicalMapping.migrationId,
              source_sha256: canonicalMapping.sourceSha256,
              applied_at: expect.stringMatching(
                /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}Z$/u,
              ),
            },
          ]);
          expect(beforeFailure.counts).toEqual([
            { character_count: 0, comment_count: 0 },
          ]);
          console.info(
            `MIGRATION_METADATA_WRITE_ATOMICITY_READY database=${namespace.database} schema=${namespace.schema} build=${fixtureBuildId} applied=1 fixture=${fixtureId} constraint=${rejectingConstraint}`,
          );

          const factory = (await import(
            pathToFileURL(join(fixtureBuildRoot, "files/factory.js")).href
          )) as {
            prepareWithMigrationFactory(
              options: Record<string, unknown>,
            ): Promise<PreparationReport>;
          };
          let rejection: unknown;
          try {
            await factory.prepareWithMigrationFactory({
              target: {
                host: "127.0.0.1",
                port: control.port,
                database: namespace.database,
                schema: namespace.schema,
                user: control.user,
                credential: control.password,
              },
              manifest: fixtureManifest,
              artifactRoot: pathToFileURL(`${fixtureBuildRoot}/`),
            });
          } catch (error) {
            rejection = error;
          }
          expect(rejection).toBeInstanceOf(Error);
          const observedErrors: unknown[] = [rejection];
          const visited = new Set<unknown>();
          let retainedMetadataFailure = false;
          while (observedErrors.length > 0) {
            const current = observedErrors.shift();
            if (
              current === null ||
              typeof current !== "object" ||
              visited.has(current)
            ) {
              continue;
            }
            visited.add(current);
            const diagnostic = current as {
              readonly message?: unknown;
              readonly code?: unknown;
              readonly constraint?: unknown;
              readonly cause?: unknown;
              readonly original?: unknown;
              readonly parent?: unknown;
            };
            retainedMetadataFailure ||=
              diagnostic.code === "23514" &&
              (diagnostic.constraint === rejectingConstraint ||
                (typeof diagnostic.message === "string" &&
                  diagnostic.message.includes(rejectingConstraint)));
            observedErrors.push(
              diagnostic.cause,
              diagnostic.original,
              diagnostic.parent,
            );
          }
          expect(retainedMetadataFailure).toBe(true);

          const afterFailure = await captureState();
          try {
            expect(afterFailure).toEqual(beforeFailure);
            expect(afterFailure.tables).not.toContain(
              "metadata_write_atomicity_probe",
            );
            expect(
              afterFailure.history.some(
                ({ migration_id }) => migration_id === fixtureId,
              ),
            ).toBe(false);
          } catch {
            throw new Error(
              "MIGRATION_METADATA_WRITE_ATOMICITY_NOT_PRESERVED_AFTER_FAILURE",
              { cause: rejection },
            );
          }
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      await rm(fixtureRoot, { recursive: true, force: true });
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("restores rollback DDL when history metadata deletion fails", async () => {
    const control = loadControl();
    const fixtureRoot = join(
      repositoryRoot,
      "apps/api/dist/task-004-migration-fixtures",
      `${process.pid}-${randomUUID()}`,
    );
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact } = await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          const canonicalMapping = manifest.mappings[0];
          expect(canonicalMapping).toBeDefined();
          if (canonicalMapping === undefined) {
            throw new Error("MIGRATION_METADATA_DELETE_ATOMICITY_MAPPING_MISSING");
          }

          const fixtureId = "20260814000001-metadata-delete-atomicity";
          const fixtureInputPath =
            `apps/api/src/infrastructure/database/migrations/${fixtureId}.ts`;
          const fixtureEmittedPath = `files/${fixtureId}.js`;
          const fixtureSource = new TextEncoder().encode(
            `export const migration = {\n  async up({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`CREATE TABLE \${schema}.metadata_delete_atomicity_probe (id integer NOT NULL PRIMARY KEY)\`, { transaction: context.transaction });\n  },\n  async down({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`DROP TABLE \${schema}.metadata_delete_atomicity_probe\`, { transaction: context.transaction });\n  },\n};\n`,
          );
          const fixtureSha256 = sha256(fixtureSource);
          const identity = {
            ...manifest,
            inputs: [
              ...manifest.inputs,
              { path: fixtureInputPath, sourceSha256: fixtureSha256 },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            files: [
              ...manifest.files,
              {
                path: fixtureEmittedPath,
                role: "migration",
                sha256: fixtureSha256,
              },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            mappings: [
              ...manifest.mappings,
              {
                migrationId: fixtureId,
                sourcePath: fixtureInputPath,
                sourceSha256: fixtureSha256,
                emittedPath: fixtureEmittedPath,
                emittedSha256: fixtureSha256,
              },
            ],
          } satisfies MigrationManifest;
          const fixtureBuildId = recomputeBuildId(identity);
          const fixtureManifest: MigrationManifest = {
            ...identity,
            buildId: fixtureBuildId,
          };
          const fixtureBuildRoot = join(fixtureRoot, fixtureBuildId);
          await mkdir(fixtureRoot, { recursive: true });
          await cp(artifact.buildRoot, fixtureBuildRoot, { recursive: true });
          await writeFile(
            join(fixtureBuildRoot, fixtureEmittedPath),
            fixtureSource,
          );

          const factory = (await import(
            pathToFileURL(join(fixtureBuildRoot, "files/factory.js")).href
          )) as {
            prepareWithMigrationFactory(
              options: Record<string, unknown>,
            ): Promise<PreparationReport>;
            revertWithMigrationFactory(
              options: Record<string, unknown>,
            ): Promise<MigrationDownReport>;
          };
          const options = {
            target: {
              host: "127.0.0.1",
              port: control.port,
              database: namespace.database,
              schema: namespace.schema,
              user: control.user,
              credential: control.password,
            },
            manifest: fixtureManifest,
            artifactRoot: pathToFileURL(`${fixtureBuildRoot}/`),
          };
          const prepared = await factory.prepareWithMigrationFactory(options);
          expect(prepared.applied).toEqual(
            fixtureManifest.mappings.map(
              ({ migrationId, sourceSha256 }) => ({
                migrationId,
                sourceSha256,
              }),
            ),
          );

          await withClient(
            control,
            async (client) => {
              await client.query(
                `CREATE FUNCTION ${quoteIdentifier(namespace.schema)}."metadata_delete_atomicity_guard_function"()
                   RETURNS trigger
                   LANGUAGE plpgsql
                   AS $function$
                   BEGIN
                     IF OLD.migration_id = '${fixtureId}' THEN
                       RAISE EXCEPTION 'TASK_004_METADATA_DELETE_FIXTURE_FAILURE'
                         USING ERRCODE = 'P0001';
                     END IF;
                     RETURN OLD;
                   END;
                   $function$`,
              );
              await client.query(
                `CREATE TRIGGER "metadata_delete_atomicity_guard_trigger"
                   BEFORE DELETE ON ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                   FOR EACH ROW
                   EXECUTE FUNCTION ${quoteIdentifier(namespace.schema)}."metadata_delete_atomicity_guard_function"()`,
              );
            },
            namespace.database,
          );

          const captureState = () =>
            withClient(
              control,
              async (client) => {
                const tables = await client.query<{ table_name: string }>(
                  `SELECT table_name
                     FROM information_schema.tables
                    WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                    ORDER BY table_name`,
                  [namespace.schema],
                );
                const columns = await client.query<{
                  table_name: string;
                  column_name: string;
                  data_type: string;
                  not_null: boolean;
                  is_identity: string;
                  identity_generation: string | null;
                  column_default: string | null;
                }>(
                  `SELECT table_name, column_name, data_type,
                          is_nullable = 'NO' AS not_null, is_identity,
                          identity_generation, column_default
                     FROM information_schema.columns
                    WHERE table_schema = $1
                    ORDER BY table_name, ordinal_position`,
                  [namespace.schema],
                );
                const constraints = await client.query<{
                  constraint_name: string;
                  constraint_type: string;
                }>(
                  `SELECT table_constraint.constraint_name,
                          table_constraint.constraint_type
                     FROM information_schema.table_constraints AS table_constraint
                     JOIN pg_catalog.pg_namespace AS table_namespace
                       ON table_namespace.nspname = table_constraint.table_schema
                     JOIN pg_catalog.pg_class AS constrained_relation
                       ON constrained_relation.relnamespace = table_namespace.oid
                      AND constrained_relation.relname = table_constraint.table_name
                     JOIN pg_catalog.pg_constraint AS catalog_constraint
                       ON catalog_constraint.connamespace = table_namespace.oid
                      AND catalog_constraint.conrelid = constrained_relation.oid
                      AND catalog_constraint.conname = table_constraint.constraint_name
                    WHERE table_constraint.table_schema = $1
                      AND catalog_constraint.contype <> 'n'
                    ORDER BY table_constraint.constraint_name`,
                  [namespace.schema],
                );
                const indexes = await client.query<{
                  indexname: string;
                  indexdef: string;
                }>(
                  `SELECT indexname, indexdef FROM pg_catalog.pg_indexes
                    WHERE schemaname = $1 ORDER BY indexname`,
                  [namespace.schema],
                );
                const trigger = await client.query<{
                  trigger_name: string;
                  trigger_definition: string;
                  function_name: string;
                  function_definition: string;
                }>(
                  `SELECT database_trigger.tgname AS trigger_name,
                          pg_catalog.pg_get_triggerdef(database_trigger.oid, true) AS trigger_definition,
                          trigger_function.proname AS function_name,
                          pg_catalog.pg_get_functiondef(trigger_function.oid) AS function_definition
                     FROM pg_catalog.pg_trigger AS database_trigger
                     JOIN pg_catalog.pg_class AS trigger_relation
                       ON trigger_relation.oid = database_trigger.tgrelid
                     JOIN pg_catalog.pg_namespace AS trigger_namespace
                       ON trigger_namespace.oid = trigger_relation.relnamespace
                     JOIN pg_catalog.pg_proc AS trigger_function
                       ON trigger_function.oid = database_trigger.tgfoid
                    WHERE trigger_namespace.nspname = $1
                      AND trigger_relation.relname = 'sequelize_migration_history'
                      AND NOT database_trigger.tgisinternal
                    ORDER BY database_trigger.tgname`,
                  [namespace.schema],
                );
                const history = await client.query<{
                  migration_id: string;
                  source_sha256: string;
                  applied_at: string;
                }>(
                  `SELECT migration_id, source_sha256,
                          pg_catalog.to_char(applied_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS applied_at
                     FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                    ORDER BY migration_id`,
                );
                const counts = await client.query<{
                  character_count: number;
                  comment_count: number;
                }>(
                  `SELECT
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.characters) AS character_count,
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.comments) AS comment_count`,
                );
                return {
                  tables: tables.rows.map(({ table_name }) => table_name),
                  columns: columns.rows,
                  constraints: constraints.rows,
                  indexes: indexes.rows,
                  trigger: trigger.rows,
                  history: history.rows,
                  counts: counts.rows,
                };
              },
              namespace.database,
            );

          const beforeFailure = await captureState();
          expect(beforeFailure.tables).toEqual([
            "characters",
            "comments",
            "metadata_delete_atomicity_probe",
            "sequelize_migration_history",
          ]);
          expect(beforeFailure.trigger).toHaveLength(1);
          expect(beforeFailure.trigger[0]).toMatchObject({
            trigger_name: "metadata_delete_atomicity_guard_trigger",
            function_name: "metadata_delete_atomicity_guard_function",
          });
          expect(beforeFailure.trigger[0]?.function_definition).toContain(
            "TASK_004_METADATA_DELETE_FIXTURE_FAILURE",
          );
          expect(beforeFailure.history.map(({ migration_id }) => migration_id)).toEqual([
            canonicalMapping.migrationId,
            fixtureId,
          ]);
          expect(beforeFailure.counts).toEqual([
            { character_count: 0, comment_count: 0 },
          ]);
          console.info(
            `MIGRATION_METADATA_DELETE_ATOMICITY_READY database=${namespace.database} schema=${namespace.schema} build=${fixtureBuildId} applied=2 fixture=${fixtureId} trigger=metadata_delete_atomicity_guard_trigger`,
          );

          let rejection: unknown;
          try {
            await factory.revertWithMigrationFactory(options);
          } catch (error) {
            rejection = error;
          }
          expect(rejection).toBeInstanceOf(Error);
          const observedErrors: unknown[] = [rejection];
          const visited = new Set<unknown>();
          let retainedMetadataFailure = false;
          while (observedErrors.length > 0) {
            const current = observedErrors.shift();
            if (
              current === null ||
              typeof current !== "object" ||
              visited.has(current)
            ) {
              continue;
            }
            visited.add(current);
            const diagnostic = current as {
              readonly message?: unknown;
              readonly code?: unknown;
              readonly cause?: unknown;
              readonly original?: unknown;
              readonly parent?: unknown;
            };
            retainedMetadataFailure ||=
              diagnostic.code === "P0001" &&
              typeof diagnostic.message === "string" &&
              diagnostic.message.includes(
                "TASK_004_METADATA_DELETE_FIXTURE_FAILURE",
              );
            observedErrors.push(
              diagnostic.cause,
              diagnostic.original,
              diagnostic.parent,
            );
          }
          expect(retainedMetadataFailure).toBe(true);

          const afterFailure = await captureState();
          try {
            expect(afterFailure).toEqual(beforeFailure);
            expect(afterFailure.tables).toContain(
              "metadata_delete_atomicity_probe",
            );
            expect(afterFailure.history).toHaveLength(2);
          } catch {
            throw new Error(
              "MIGRATION_METADATA_DELETE_ATOMICITY_NOT_PRESERVED_AFTER_FAILURE",
              { cause: rejection },
            );
          }
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      await rm(fixtureRoot, { recursive: true, force: true });
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("rolls back interrupted migration state and classifies cancellation", async () => {
    const control = loadControl();
    const fixtureRoot = join(
      repositoryRoot,
      "apps/api/dist/task-004-migration-fixtures",
      `${process.pid}-${randomUUID()}`,
    );
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          const canonicalMapping = manifest.mappings[0];
          expect(canonicalMapping).toBeDefined();
          if (canonicalMapping === undefined) {
            throw new Error("MIGRATION_INTERRUPTION_MAPPING_MISSING");
          }

          const canonicalReport = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            canonicalReport,
            namespace,
            artifact,
            { noOp: false, applied: [canonicalMapping] },
            control.user,
          );

          const fixtureId = "20260814000001-interruption-atomicity";
          const fixtureInputPath =
            `apps/api/src/infrastructure/database/migrations/${fixtureId}.ts`;
          const fixtureEmittedPath = `files/${fixtureId}.js`;
          const fixtureSource = new TextEncoder().encode(
            `export const migration = {\n  async up({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`CREATE TABLE \${schema}.interruption_atomicity_probe (id integer NOT NULL PRIMARY KEY)\`, { transaction: context.transaction });\n    await context.queryInterface.sequelize.query("SELECT pg_catalog.pg_sleep(30)", { transaction: context.transaction });\n  },\n  async down({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`DROP TABLE \${schema}.interruption_atomicity_probe\`, { transaction: context.transaction });\n  },\n};\n`,
          );
          const fixtureSha256 = sha256(fixtureSource);
          const identity = {
            ...manifest,
            inputs: [
              ...manifest.inputs,
              { path: fixtureInputPath, sourceSha256: fixtureSha256 },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            files: [
              ...manifest.files,
              {
                path: fixtureEmittedPath,
                role: "migration",
                sha256: fixtureSha256,
              },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            mappings: [
              ...manifest.mappings,
              {
                migrationId: fixtureId,
                sourcePath: fixtureInputPath,
                sourceSha256: fixtureSha256,
                emittedPath: fixtureEmittedPath,
                emittedSha256: fixtureSha256,
              },
            ],
          } satisfies MigrationManifest;
          const fixtureBuildId = recomputeBuildId(identity);
          const fixtureManifest: MigrationManifest = {
            ...identity,
            buildId: fixtureBuildId,
          };
          const fixtureBuildRoot = join(fixtureRoot, fixtureBuildId);
          await mkdir(fixtureRoot, { recursive: true });
          await cp(artifact.buildRoot, fixtureBuildRoot, { recursive: true });
          await writeFile(
            join(fixtureBuildRoot, fixtureEmittedPath),
            fixtureSource,
          );

          const captureState = () =>
            withClient(
              control,
              async (client) => {
                const tables = await client.query<{ table_name: string }>(
                  `SELECT table_name
                     FROM information_schema.tables
                    WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                    ORDER BY table_name`,
                  [namespace.schema],
                );
                const columns = await client.query<{
                  table_name: string;
                  column_name: string;
                  data_type: string;
                  not_null: boolean;
                  is_identity: string;
                  identity_generation: string | null;
                  column_default: string | null;
                }>(
                  `SELECT table_name, column_name, data_type,
                          is_nullable = 'NO' AS not_null, is_identity,
                          identity_generation, column_default
                     FROM information_schema.columns
                    WHERE table_schema = $1
                    ORDER BY table_name, ordinal_position`,
                  [namespace.schema],
                );
                const constraints = await client.query<{
                  constraint_name: string;
                  constraint_type: string;
                }>(
                  `SELECT table_constraint.constraint_name,
                          table_constraint.constraint_type
                     FROM information_schema.table_constraints AS table_constraint
                     JOIN pg_catalog.pg_namespace AS table_namespace
                       ON table_namespace.nspname = table_constraint.table_schema
                     JOIN pg_catalog.pg_class AS constrained_relation
                       ON constrained_relation.relnamespace = table_namespace.oid
                      AND constrained_relation.relname = table_constraint.table_name
                     JOIN pg_catalog.pg_constraint AS catalog_constraint
                       ON catalog_constraint.connamespace = table_namespace.oid
                      AND catalog_constraint.conrelid = constrained_relation.oid
                      AND catalog_constraint.conname = table_constraint.constraint_name
                    WHERE table_constraint.table_schema = $1
                      AND catalog_constraint.contype <> 'n'
                    ORDER BY table_constraint.constraint_name`,
                  [namespace.schema],
                );
                const indexes = await client.query<{
                  indexname: string;
                  indexdef: string;
                }>(
                  `SELECT indexname, indexdef FROM pg_catalog.pg_indexes
                    WHERE schemaname = $1 ORDER BY indexname`,
                  [namespace.schema],
                );
                const history = await client.query<{
                  migration_id: string;
                  source_sha256: string;
                  applied_at: string;
                }>(
                  `SELECT migration_id, source_sha256,
                          pg_catalog.to_char(applied_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS applied_at
                     FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                    ORDER BY migration_id`,
                );
                const counts = await client.query<{
                  character_count: number;
                  comment_count: number;
                }>(
                  `SELECT
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.characters) AS character_count,
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.comments) AS comment_count`,
                );
                return {
                  tables: tables.rows.map(({ table_name }) => table_name),
                  columns: columns.rows,
                  constraints: constraints.rows,
                  indexes: indexes.rows,
                  history: history.rows,
                  counts: counts.rows,
                };
              },
              namespace.database,
            );

          const beforeFailure = await captureState();
          expect(beforeFailure.tables).toEqual([
            "characters",
            "comments",
            "sequelize_migration_history",
          ]);
          expect(beforeFailure.history).toEqual([
            {
              migration_id: canonicalMapping.migrationId,
              source_sha256: canonicalMapping.sourceSha256,
              applied_at: expect.stringMatching(
                /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}Z$/u,
              ),
            },
          ]);
          expect(beforeFailure.counts).toEqual([
            { character_count: 0, comment_count: 0 },
          ]);
          console.info(
            `MIGRATION_INTERRUPTION_ATOMICITY_READY database=${namespace.database} schema=${namespace.schema} build=${fixtureBuildId} applied=1 fixture=${fixtureId}`,
          );

          const factory = (await import(
            pathToFileURL(join(fixtureBuildRoot, "files/factory.js")).href
          )) as {
            prepareWithMigrationFactory(
              options: Record<string, unknown>,
            ): Promise<PreparationReport>;
          };
          const operationResult = factory
            .prepareWithMigrationFactory({
              target: {
                host: "127.0.0.1",
                port: control.port,
                database: namespace.database,
                schema: namespace.schema,
                user: control.user,
                credential: control.password,
              },
              manifest: fixtureManifest,
              artifactRoot: pathToFileURL(`${fixtureBuildRoot}/`),
            })
            .then(
              (value) => ({ value, error: undefined }),
              (error: unknown) => ({ value: undefined, error }),
            );

          const canceledPid = await withClient(
            control,
            async (client) => {
              const deadline = Date.now() + 2_000;
              let pids: readonly number[] = [];
              while (Date.now() < deadline) {
                const active = await client.query<{ pid: number }>(
                  `SELECT pid::integer AS pid
                     FROM pg_catalog.pg_stat_activity
                    WHERE datname = $1
                      AND application_name = 'rick-and-morty-explorer:migrations'
                      AND state = 'active'
                      AND query LIKE '%pg_catalog.pg_sleep(30)%'
                    ORDER BY pid`,
                  [namespace.database],
                );
                pids = active.rows.map(({ pid }) => pid);
                if (pids.length > 0) {
                  break;
                }
                await new Promise<void>((resolveDelay) => {
                  setTimeout(resolveDelay, 25);
                });
              }
              expect(pids).toHaveLength(1);
              const pid = pids[0];
              expect(pid).toBeDefined();
              if (pid === undefined) {
                throw new Error("MIGRATION_INTERRUPTION_BACKEND_MISSING");
              }
              const canceled = await client.query<{ canceled: boolean }>(
                "SELECT pg_catalog.pg_cancel_backend($1) AS canceled",
                [pid],
              );
              expect(canceled.rows).toEqual([{ canceled: true }]);
              return pid;
            },
            namespace.database,
          );
          console.info(
            `MIGRATION_INTERRUPTION_BACKEND_CANCELED database=${namespace.database} pid=${canceledPid}`,
          );

          const { value, error: rejection } = await operationResult;
          expect(value).toBeUndefined();
          expect(rejection).toBeInstanceOf(Error);
          const observedErrors: unknown[] = [rejection];
          const visited = new Set<unknown>();
          let retainedCancellation = false;
          while (observedErrors.length > 0) {
            const current = observedErrors.shift();
            if (
              current === null ||
              typeof current !== "object" ||
              visited.has(current)
            ) {
              continue;
            }
            visited.add(current);
            const diagnostic = current as {
              readonly code?: unknown;
              readonly cause?: unknown;
              readonly original?: unknown;
              readonly parent?: unknown;
            };
            retainedCancellation ||= diagnostic.code === "57014";
            observedErrors.push(
              diagnostic.cause,
              diagnostic.original,
              diagnostic.parent,
            );
          }
          expect(retainedCancellation).toBe(true);

          const afterFailure = await captureState();
          try {
            expect(afterFailure).toEqual(beforeFailure);
            expect(afterFailure.tables).not.toContain(
              "interruption_atomicity_probe",
            );
            expect(
              afterFailure.history.some(
                ({ migration_id }) => migration_id === fixtureId,
              ),
            ).toBe(false);
          } catch {
            throw new Error("MIGRATION_INTERRUPTION_ATOMICITY_NOT_PRESERVED", {
              cause: rejection,
            });
          }

          const activeAfter = await withClient(
            control,
            (client) =>
              client.query<{ pid: number }>(
                `SELECT pid::integer AS pid
                   FROM pg_catalog.pg_stat_activity
                  WHERE datname = $1
                    AND application_name = 'rick-and-morty-explorer:migrations'
                    AND state = 'active'
                    AND query LIKE '%pg_catalog.pg_sleep(30)%'`,
                [namespace.database],
              ),
            namespace.database,
          );
          expect(activeAfter.rows).toEqual([]);

          const lifecycleError = rejection as Error & {
            readonly result?: unknown;
          };
          if (
            lifecycleError.name !== "MigrationLifecycleError" ||
            lifecycleError.message !== "MIGRATION_LOCK_INTERRUPTED" ||
            lifecycleError.result !== 1
          ) {
            throw new Error(
              "MIGRATION_INTERRUPTION_DIAGNOSTIC_MISSING_AFTER_ATOMIC_ROLLBACK",
              { cause: rejection },
            );
          }
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      await rm(fixtureRoot, { recursive: true, force: true });
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("rolls back lost-connection migration state and classifies connection loss", async () => {
    const control = loadControl();
    const fixtureRoot = join(
      repositoryRoot,
      "apps/api/dist/task-004-migration-fixtures",
      `${process.pid}-${randomUUID()}`,
    );
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          const canonicalMapping = manifest.mappings[0];
          expect(canonicalMapping).toBeDefined();
          if (canonicalMapping === undefined) {
            throw new Error("MIGRATION_CONNECTION_LOSS_MAPPING_MISSING");
          }

          const canonicalReport = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            canonicalReport,
            namespace,
            artifact,
            { noOp: false, applied: [canonicalMapping] },
            control.user,
          );

          const fixtureId = "20260814000001-connection-loss-atomicity";
          const fixtureInputPath =
            `apps/api/src/infrastructure/database/migrations/${fixtureId}.ts`;
          const fixtureEmittedPath = `files/${fixtureId}.js`;
          const fixtureSource = new TextEncoder().encode(
            `export const migration = {\n  async up({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`CREATE TABLE \${schema}.connection_loss_atomicity_probe (id integer NOT NULL PRIMARY KEY)\`, { transaction: context.transaction });\n    await context.queryInterface.sequelize.query("SELECT pg_catalog.pg_sleep(30)", { transaction: context.transaction });\n  },\n  async down({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`DROP TABLE \${schema}.connection_loss_atomicity_probe\`, { transaction: context.transaction });\n  },\n};\n`,
          );
          const fixtureSha256 = sha256(fixtureSource);
          const identity = {
            ...manifest,
            inputs: [
              ...manifest.inputs,
              { path: fixtureInputPath, sourceSha256: fixtureSha256 },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            files: [
              ...manifest.files,
              {
                path: fixtureEmittedPath,
                role: "migration",
                sha256: fixtureSha256,
              },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            mappings: [
              ...manifest.mappings,
              {
                migrationId: fixtureId,
                sourcePath: fixtureInputPath,
                sourceSha256: fixtureSha256,
                emittedPath: fixtureEmittedPath,
                emittedSha256: fixtureSha256,
              },
            ],
          } satisfies MigrationManifest;
          const fixtureBuildId = recomputeBuildId(identity);
          const fixtureManifest: MigrationManifest = {
            ...identity,
            buildId: fixtureBuildId,
          };
          const fixtureBuildRoot = join(fixtureRoot, fixtureBuildId);
          await mkdir(fixtureRoot, { recursive: true });
          await cp(artifact.buildRoot, fixtureBuildRoot, { recursive: true });
          await writeFile(
            join(fixtureBuildRoot, fixtureEmittedPath),
            fixtureSource,
          );

          const captureState = () =>
            withClient(
              control,
              async (client) => {
                const tables = await client.query<{ table_name: string }>(
                  `SELECT table_name
                     FROM information_schema.tables
                    WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                    ORDER BY table_name`,
                  [namespace.schema],
                );
                const columns = await client.query<{
                  table_name: string;
                  column_name: string;
                  data_type: string;
                  not_null: boolean;
                  is_identity: string;
                  identity_generation: string | null;
                  column_default: string | null;
                }>(
                  `SELECT table_name, column_name, data_type,
                          is_nullable = 'NO' AS not_null, is_identity,
                          identity_generation, column_default
                     FROM information_schema.columns
                    WHERE table_schema = $1
                    ORDER BY table_name, ordinal_position`,
                  [namespace.schema],
                );
                const constraints = await client.query<{
                  constraint_name: string;
                  constraint_type: string;
                }>(
                  `SELECT table_constraint.constraint_name,
                          table_constraint.constraint_type
                     FROM information_schema.table_constraints AS table_constraint
                     JOIN pg_catalog.pg_namespace AS table_namespace
                       ON table_namespace.nspname = table_constraint.table_schema
                     JOIN pg_catalog.pg_class AS constrained_relation
                       ON constrained_relation.relnamespace = table_namespace.oid
                      AND constrained_relation.relname = table_constraint.table_name
                     JOIN pg_catalog.pg_constraint AS catalog_constraint
                       ON catalog_constraint.connamespace = table_namespace.oid
                      AND catalog_constraint.conrelid = constrained_relation.oid
                      AND catalog_constraint.conname = table_constraint.constraint_name
                    WHERE table_constraint.table_schema = $1
                      AND catalog_constraint.contype <> 'n'
                    ORDER BY table_constraint.constraint_name`,
                  [namespace.schema],
                );
                const indexes = await client.query<{
                  indexname: string;
                  indexdef: string;
                }>(
                  `SELECT indexname, indexdef FROM pg_catalog.pg_indexes
                    WHERE schemaname = $1 ORDER BY indexname`,
                  [namespace.schema],
                );
                const history = await client.query<{
                  migration_id: string;
                  source_sha256: string;
                  applied_at: string;
                }>(
                  `SELECT migration_id, source_sha256,
                          pg_catalog.to_char(applied_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS applied_at
                     FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                    ORDER BY migration_id`,
                );
                const counts = await client.query<{
                  character_count: number;
                  comment_count: number;
                }>(
                  `SELECT
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.characters) AS character_count,
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.comments) AS comment_count`,
                );
                return {
                  tables: tables.rows.map(({ table_name }) => table_name),
                  columns: columns.rows,
                  constraints: constraints.rows,
                  indexes: indexes.rows,
                  history: history.rows,
                  counts: counts.rows,
                };
              },
              namespace.database,
            );

          const beforeFailure = await captureState();
          expect(beforeFailure.tables).toEqual([
            "characters",
            "comments",
            "sequelize_migration_history",
          ]);
          expect(beforeFailure.history).toEqual([
            {
              migration_id: canonicalMapping.migrationId,
              source_sha256: canonicalMapping.sourceSha256,
              applied_at: expect.stringMatching(
                /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}Z$/u,
              ),
            },
          ]);
          expect(beforeFailure.counts).toEqual([
            { character_count: 0, comment_count: 0 },
          ]);
          console.info(
            `MIGRATION_CONNECTION_LOSS_ATOMICITY_READY database=${namespace.database} schema=${namespace.schema} build=${fixtureBuildId} applied=1 fixture=${fixtureId}`,
          );

          const factory = (await import(
            pathToFileURL(join(fixtureBuildRoot, "files/factory.js")).href
          )) as {
            prepareWithMigrationFactory(
              options: Record<string, unknown>,
            ): Promise<PreparationReport>;
          };
          const operationResult = factory
            .prepareWithMigrationFactory({
              target: {
                host: "127.0.0.1",
                port: control.port,
                database: namespace.database,
                schema: namespace.schema,
                user: control.user,
                credential: control.password,
              },
              manifest: fixtureManifest,
              artifactRoot: pathToFileURL(`${fixtureBuildRoot}/`),
            })
            .then(
              (value) => ({ value, error: undefined }),
              (error: unknown) => ({ value: undefined, error }),
            );

          const terminatedPid = await withClient(
            control,
            async (client) => {
              const deadline = Date.now() + 2_000;
              let pids: readonly number[] = [];
              while (Date.now() < deadline) {
                const active = await client.query<{ pid: number }>(
                  `SELECT pid::integer AS pid
                     FROM pg_catalog.pg_stat_activity
                    WHERE datname = $1
                      AND application_name = 'rick-and-morty-explorer:migrations'
                      AND state = 'active'
                      AND query LIKE '%pg_catalog.pg_sleep(30)%'
                    ORDER BY pid`,
                  [namespace.database],
                );
                pids = active.rows.map(({ pid }) => pid);
                if (pids.length > 0) {
                  break;
                }
                await new Promise<void>((resolveDelay) => {
                  setTimeout(resolveDelay, 25);
                });
              }
              expect(pids).toHaveLength(1);
              const pid = pids[0];
              expect(pid).toBeDefined();
              if (pid === undefined) {
                throw new Error("MIGRATION_CONNECTION_LOSS_BACKEND_MISSING");
              }
              const terminated = await client.query<{ terminated: boolean }>(
                "SELECT pg_catalog.pg_terminate_backend($1) AS terminated",
                [pid],
              );
              expect(terminated.rows).toEqual([{ terminated: true }]);
              return pid;
            },
            namespace.database,
          );
          console.info(
            `MIGRATION_CONNECTION_LOSS_BACKEND_TERMINATED database=${namespace.database} pid=${terminatedPid}`,
          );

          const { value, error: rejection } = await operationResult;
          expect(value).toBeUndefined();
          expect(rejection).toBeInstanceOf(Error);
          const observedErrors: unknown[] = [rejection];
          const visited = new Set<unknown>();
          let retainedConnectionLoss = false;
          while (observedErrors.length > 0) {
            const current = observedErrors.shift();
            if (
              current === null ||
              typeof current !== "object" ||
              visited.has(current)
            ) {
              continue;
            }
            visited.add(current);
            const diagnostic = current as {
              readonly code?: unknown;
              readonly cause?: unknown;
              readonly original?: unknown;
              readonly parent?: unknown;
            };
            retainedConnectionLoss ||= diagnostic.code === "57P01";
            observedErrors.push(
              diagnostic.cause,
              diagnostic.original,
              diagnostic.parent,
            );
          }
          expect(retainedConnectionLoss).toBe(true);

          const afterFailure = await captureState();
          try {
            expect(afterFailure).toEqual(beforeFailure);
            expect(afterFailure.tables).not.toContain(
              "connection_loss_atomicity_probe",
            );
            expect(
              afterFailure.history.some(
                ({ migration_id }) => migration_id === fixtureId,
              ),
            ).toBe(false);
          } catch {
            throw new Error("MIGRATION_CONNECTION_LOSS_ATOMICITY_NOT_PRESERVED");
          }

          const activeAfter = await withClient(
            control,
            (client) =>
              client.query<{ pid: number }>(
                `SELECT pid::integer AS pid
                   FROM pg_catalog.pg_stat_activity
                  WHERE datname = $1
                    AND application_name = 'rick-and-morty-explorer:migrations'
                    AND state = 'active'
                    AND query LIKE '%pg_catalog.pg_sleep(30)%'`,
                [namespace.database],
              ),
            namespace.database,
          );
          expect(activeAfter.rows).toEqual([]);

          const lifecycleError = rejection as Error & {
            readonly result?: unknown;
            readonly cause?: unknown;
          };
          const redactedCause = lifecycleError.cause;
          const exactCodeOnlyCause =
            redactedCause !== null &&
            typeof redactedCause === "object" &&
            Object.isFrozen(redactedCause) &&
            Object.keys(redactedCause).length === 1 &&
            Object.keys(redactedCause)[0] === "code" &&
            (redactedCause as { readonly code?: unknown }).code === "57P01";
          if (
            lifecycleError.name !== "MigrationLifecycleError" ||
            lifecycleError.message !== "MIGRATION_CONNECTION_LOST" ||
            lifecycleError.result !== 1 ||
            !exactCodeOnlyCause
          ) {
            throw new Error(
              "MIGRATION_CONNECTION_LOSS_DIAGNOSTIC_MISSING_AFTER_ATOMIC_ROLLBACK",
            );
          }
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      await rm(fixtureRoot, { recursive: true, force: true });
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("rejects transaction-incompatible DDL without changing migration state", async () => {
    const control = loadControl();
    const fixtureRoot = join(
      repositoryRoot,
      "apps/api/dist/task-004-migration-fixtures",
      `${process.pid}-${randomUUID()}`,
    );
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          const canonicalMapping = manifest.mappings[0];
          expect(canonicalMapping).toBeDefined();
          if (canonicalMapping === undefined) {
            throw new Error("MIGRATION_TRANSACTION_INCOMPATIBLE_DDL_MAPPING_MISSING");
          }

          const canonicalReport = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            canonicalReport,
            namespace,
            artifact,
            { noOp: false, applied: [canonicalMapping] },
            control.user,
          );

          const fixtureId = "20260814000001-transaction-incompatible-ddl";
          const fixtureInputPath =
            `apps/api/src/infrastructure/database/migrations/${fixtureId}.ts`;
          const fixtureEmittedPath = `files/${fixtureId}.js`;
          const fixtureSource = new TextEncoder().encode(
            `export const migration = {\n  async up({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`CREATE TABLE \${schema}.transaction_incompatible_ddl_probe (id integer NOT NULL PRIMARY KEY)\`, { transaction: context.transaction });\n    await context.queryInterface.sequelize.query(\`CREATE INDEX CONCURRENTLY transaction_incompatible_ddl_fixture_idx ON \${schema}.characters (name)\`, { transaction: context.transaction });\n  },\n  async down({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`DROP TABLE \${schema}.transaction_incompatible_ddl_probe\`, { transaction: context.transaction });\n  },\n};\n`,
          );
          const fixtureSha256 = sha256(fixtureSource);
          const identity = {
            ...manifest,
            inputs: [
              ...manifest.inputs,
              { path: fixtureInputPath, sourceSha256: fixtureSha256 },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            files: [
              ...manifest.files,
              {
                path: fixtureEmittedPath,
                role: "migration",
                sha256: fixtureSha256,
              },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            mappings: [
              ...manifest.mappings,
              {
                migrationId: fixtureId,
                sourcePath: fixtureInputPath,
                sourceSha256: fixtureSha256,
                emittedPath: fixtureEmittedPath,
                emittedSha256: fixtureSha256,
              },
            ],
          } satisfies MigrationManifest;
          const fixtureBuildId = recomputeBuildId(identity);
          const fixtureManifest: MigrationManifest = {
            ...identity,
            buildId: fixtureBuildId,
          };
          const fixtureBuildRoot = join(fixtureRoot, fixtureBuildId);
          await mkdir(fixtureRoot, { recursive: true });
          await cp(artifact.buildRoot, fixtureBuildRoot, { recursive: true });
          await writeFile(
            join(fixtureBuildRoot, fixtureEmittedPath),
            fixtureSource,
          );

          const captureState = () =>
            withClient(
              control,
              async (client) => {
                const tables = await client.query<{ table_name: string }>(
                  `SELECT table_name
                     FROM information_schema.tables
                    WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                    ORDER BY table_name`,
                  [namespace.schema],
                );
                const columns = await client.query<{
                  table_name: string;
                  column_name: string;
                  data_type: string;
                  not_null: boolean;
                  is_identity: string;
                  identity_generation: string | null;
                  column_default: string | null;
                }>(
                  `SELECT table_name, column_name, data_type,
                          is_nullable = 'NO' AS not_null, is_identity,
                          identity_generation, column_default
                     FROM information_schema.columns
                    WHERE table_schema = $1
                    ORDER BY table_name, ordinal_position`,
                  [namespace.schema],
                );
                const constraints = await client.query<{
                  constraint_name: string;
                  constraint_type: string;
                }>(
                  `SELECT table_constraint.constraint_name,
                          table_constraint.constraint_type
                     FROM information_schema.table_constraints AS table_constraint
                     JOIN pg_catalog.pg_namespace AS table_namespace
                       ON table_namespace.nspname = table_constraint.table_schema
                     JOIN pg_catalog.pg_class AS constrained_relation
                       ON constrained_relation.relnamespace = table_namespace.oid
                      AND constrained_relation.relname = table_constraint.table_name
                     JOIN pg_catalog.pg_constraint AS catalog_constraint
                       ON catalog_constraint.connamespace = table_namespace.oid
                      AND catalog_constraint.conrelid = constrained_relation.oid
                      AND catalog_constraint.conname = table_constraint.constraint_name
                    WHERE table_constraint.table_schema = $1
                      AND catalog_constraint.contype <> 'n'
                    ORDER BY table_constraint.constraint_name`,
                  [namespace.schema],
                );
                const indexes = await client.query<{
                  indexname: string;
                  indexdef: string;
                }>(
                  `SELECT indexname, indexdef FROM pg_catalog.pg_indexes
                    WHERE schemaname = $1 ORDER BY indexname`,
                  [namespace.schema],
                );
                const history = await client.query<{
                  migration_id: string;
                  source_sha256: string;
                  applied_at: string;
                }>(
                  `SELECT migration_id, source_sha256,
                          pg_catalog.to_char(applied_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS applied_at
                     FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                    ORDER BY migration_id`,
                );
                const counts = await client.query<{
                  character_count: number;
                  comment_count: number;
                }>(
                  `SELECT
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.characters) AS character_count,
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.comments) AS comment_count`,
                );
                return {
                  tables: tables.rows.map(({ table_name }) => table_name),
                  columns: columns.rows,
                  constraints: constraints.rows,
                  indexes: indexes.rows,
                  history: history.rows,
                  counts: counts.rows,
                };
              },
              namespace.database,
            );

          const beforeFailure = await captureState();
          expect(beforeFailure.tables).toEqual([
            "characters",
            "comments",
            "sequelize_migration_history",
          ]);
          expect(beforeFailure.history).toEqual([
            {
              migration_id: canonicalMapping.migrationId,
              source_sha256: canonicalMapping.sourceSha256,
              applied_at: expect.stringMatching(
                /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}Z$/u,
              ),
            },
          ]);
          expect(beforeFailure.counts).toEqual([
            { character_count: 0, comment_count: 0 },
          ]);
          console.info(
            `MIGRATION_TRANSACTION_INCOMPATIBLE_DDL_READY database=${namespace.database} schema=${namespace.schema} build=${fixtureBuildId} applied=1 fixture=${fixtureId}`,
          );

          const factory = (await import(
            pathToFileURL(join(fixtureBuildRoot, "files/factory.js")).href
          )) as {
            prepareWithMigrationFactory(
              options: Record<string, unknown>,
            ): Promise<PreparationReport>;
          };
          let rejection: unknown;
          try {
            await factory.prepareWithMigrationFactory({
              target: {
                host: "127.0.0.1",
                port: control.port,
                database: namespace.database,
                schema: namespace.schema,
                user: control.user,
                credential: control.password,
              },
              manifest: fixtureManifest,
              artifactRoot: pathToFileURL(`${fixtureBuildRoot}/`),
            });
          } catch (error) {
            rejection = error;
          }
          if (rejection === undefined) {
            throw new Error(
              "MIGRATION_TRANSACTION_INCOMPATIBLE_DDL_ACCEPTED_AFTER_MIGRATION",
            );
          }
          expect(rejection).toBeInstanceOf(Error);
          const observedErrors: unknown[] = [rejection];
          const visited = new Set<unknown>();
          let retainedTransactionBlock = false;
          while (observedErrors.length > 0) {
            const current = observedErrors.shift();
            if (
              current === null ||
              typeof current !== "object" ||
              visited.has(current)
            ) {
              continue;
            }
            visited.add(current);
            const diagnostic = current as {
              readonly code?: unknown;
              readonly cause?: unknown;
              readonly original?: unknown;
              readonly parent?: unknown;
            };
            retainedTransactionBlock ||= diagnostic.code === "25001";
            observedErrors.push(
              diagnostic.cause,
              diagnostic.original,
              diagnostic.parent,
            );
          }
          expect(retainedTransactionBlock).toBe(true);

          const afterFailure = await captureState();
          expect(afterFailure).toEqual(beforeFailure);
          expect(afterFailure.tables).not.toContain(
            "transaction_incompatible_ddl_probe",
          );
          expect(
            afterFailure.history.some(
              ({ migration_id }) => migration_id === fixtureId,
            ),
          ).toBe(false);
          expect(
            afterFailure.indexes.some(
              ({ indexname }) =>
                indexname === "transaction_incompatible_ddl_fixture_idx",
            ),
          ).toBe(false);

          const activeAfter = await withClient(
            control,
            (client) =>
              client.query<{ pid: number }>(
                `SELECT pid::integer AS pid
                   FROM pg_catalog.pg_stat_activity
                  WHERE datname = $1
                    AND application_name = 'rick-and-morty-explorer:migrations'`,
                [namespace.database],
              ),
            namespace.database,
          );
          expect(activeAfter.rows).toEqual([]);
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      await rm(fixtureRoot, { recursive: true, force: true });
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("preserves migration primary failure when factory cleanup also fails", async () => {
    const control = loadControl();
    const fixtureRoot = join(
      repositoryRoot,
      "apps/api/dist/task-004-migration-fixtures",
      `${process.pid}-${randomUUID()}`,
    );
    const primaryObservationKey = Symbol.for(
      "task-004.cleanup-primary-fixture-observed",
    );
    const fixtureGlobal = globalThis as typeof globalThis & {
      [key: symbol]: unknown;
    };
    delete fixtureGlobal[primaryObservationKey];
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          const canonicalMapping = manifest.mappings[0];
          expect(canonicalMapping).toBeDefined();
          if (canonicalMapping === undefined) {
            throw new Error("MIGRATION_CLEANUP_PRIMARY_MAPPING_MISSING");
          }

          const canonicalReport = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            canonicalReport,
            namespace,
            artifact,
            { noOp: false, applied: [canonicalMapping] },
            control.user,
          );

          const fixtureId = "20260814000001-cleanup-primary-failure";
          const fixtureInputPath =
            `apps/api/src/infrastructure/database/migrations/${fixtureId}.ts`;
          const fixtureEmittedPath = `files/${fixtureId}.js`;
          const fixtureSource = new TextEncoder().encode(
            `export const migration = {\n  async up({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`CREATE TABLE \${schema}.cleanup_primary_failure_probe (id integer NOT NULL PRIMARY KEY)\`, { transaction: context.transaction });\n    globalThis[Symbol.for("task-004.cleanup-primary-fixture-observed")] = "TASK_004_CLEANUP_PRIMARY_FIXTURE_FAILURE";\n    throw new Error("TASK_004_CLEANUP_PRIMARY_FIXTURE_FAILURE");\n  },\n  async down({ context }) {\n    const schema = '"' + context.schema.replaceAll('"', '""') + '"';\n    await context.queryInterface.sequelize.query(\`DROP TABLE \${schema}.cleanup_primary_failure_probe\`, { transaction: context.transaction });\n  },\n};\n`,
          );
          const fixtureSha256 = sha256(fixtureSource);
          const identity = {
            ...manifest,
            inputs: [
              ...manifest.inputs,
              { path: fixtureInputPath, sourceSha256: fixtureSha256 },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            files: [
              ...manifest.files,
              {
                path: fixtureEmittedPath,
                role: "migration",
                sha256: fixtureSha256,
              },
            ].sort((left, right) =>
              Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
            ),
            mappings: [
              ...manifest.mappings,
              {
                migrationId: fixtureId,
                sourcePath: fixtureInputPath,
                sourceSha256: fixtureSha256,
                emittedPath: fixtureEmittedPath,
                emittedSha256: fixtureSha256,
              },
            ],
          } satisfies MigrationManifest;
          const fixtureBuildId = recomputeBuildId(identity);
          const fixtureManifest: MigrationManifest = {
            ...identity,
            buildId: fixtureBuildId,
          };
          const fixtureBuildRoot = join(fixtureRoot, fixtureBuildId);
          await mkdir(fixtureRoot, { recursive: true });
          await cp(artifact.buildRoot, fixtureBuildRoot, { recursive: true });
          await writeFile(
            join(fixtureBuildRoot, fixtureEmittedPath),
            fixtureSource,
          );

          const captureState = () =>
            withClient(
              control,
              async (client) => {
                const tables = await client.query<{ table_name: string }>(
                  `SELECT table_name
                     FROM information_schema.tables
                    WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                    ORDER BY table_name`,
                  [namespace.schema],
                );
                const columns = await client.query<{
                  table_name: string;
                  column_name: string;
                  data_type: string;
                  not_null: boolean;
                  is_identity: string;
                  identity_generation: string | null;
                  column_default: string | null;
                }>(
                  `SELECT table_name, column_name, data_type,
                          is_nullable = 'NO' AS not_null, is_identity,
                          identity_generation, column_default
                     FROM information_schema.columns
                    WHERE table_schema = $1
                    ORDER BY table_name, ordinal_position`,
                  [namespace.schema],
                );
                const constraints = await client.query<{
                  constraint_name: string;
                  constraint_type: string;
                }>(
                  `SELECT table_constraint.constraint_name,
                          table_constraint.constraint_type
                     FROM information_schema.table_constraints AS table_constraint
                     JOIN pg_catalog.pg_namespace AS table_namespace
                       ON table_namespace.nspname = table_constraint.table_schema
                     JOIN pg_catalog.pg_class AS constrained_relation
                       ON constrained_relation.relnamespace = table_namespace.oid
                      AND constrained_relation.relname = table_constraint.table_name
                     JOIN pg_catalog.pg_constraint AS catalog_constraint
                       ON catalog_constraint.connamespace = table_namespace.oid
                      AND catalog_constraint.conrelid = constrained_relation.oid
                      AND catalog_constraint.conname = table_constraint.constraint_name
                    WHERE table_constraint.table_schema = $1
                      AND catalog_constraint.contype <> 'n'
                    ORDER BY table_constraint.constraint_name`,
                  [namespace.schema],
                );
                const indexes = await client.query<{
                  indexname: string;
                  indexdef: string;
                }>(
                  `SELECT indexname, indexdef FROM pg_catalog.pg_indexes
                    WHERE schemaname = $1 ORDER BY indexname`,
                  [namespace.schema],
                );
                const history = await client.query<{
                  migration_id: string;
                  source_sha256: string;
                  applied_at: string;
                }>(
                  `SELECT migration_id, source_sha256,
                          pg_catalog.to_char(applied_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS applied_at
                     FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                    ORDER BY migration_id`,
                );
                const counts = await client.query<{
                  character_count: number;
                  comment_count: number;
                }>(
                  `SELECT
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.characters) AS character_count,
                     (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.comments) AS comment_count`,
                );
                return {
                  tables: tables.rows.map(({ table_name }) => table_name),
                  columns: columns.rows,
                  constraints: constraints.rows,
                  indexes: indexes.rows,
                  history: history.rows,
                  counts: counts.rows,
                };
              },
              namespace.database,
            );

          const beforeFailure = await captureState();
          expect(beforeFailure.tables).toEqual([
            "characters",
            "comments",
            "sequelize_migration_history",
          ]);
          expect(beforeFailure.history).toEqual([
            {
              migration_id: canonicalMapping.migrationId,
              source_sha256: canonicalMapping.sourceSha256,
              applied_at: expect.stringMatching(
                /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}Z$/u,
              ),
            },
          ]);
          expect(beforeFailure.counts).toEqual([
            { character_count: 0, comment_count: 0 },
          ]);
          console.info(
            `MIGRATION_CLEANUP_PRIMARY_READY database=${namespace.database} schema=${namespace.schema} build=${fixtureBuildId} applied=1 fixture=${fixtureId}`,
          );

          const factory = (await import(
            pathToFileURL(join(fixtureBuildRoot, "files/factory.js")).href
          )) as {
            prepareWithMigrationFactory(
              options: Record<string, unknown>,
            ): Promise<PreparationReport>;
          };
          const sequelizeSpecifier: string = "sequelize";
          const sequelizeModule = (await import(
            sequelizeSpecifier
          )) as unknown as {
            Sequelize: {
              prototype: {
                close(this: unknown): Promise<void>;
              };
            };
          };
          const sequelizePrototype = sequelizeModule.Sequelize.prototype;
          const originalClose = sequelizePrototype.close;
          let closeCalls = 0;
          const patchedClose = async function (this: unknown): Promise<void> {
            closeCalls += 1;
            await originalClose.call(this);
            throw new Error("TASK_004_FACTORY_CLOSE_FIXTURE_FAILURE");
          };
          let rejection: unknown;
          try {
            sequelizePrototype.close = patchedClose;
            try {
              await factory.prepareWithMigrationFactory({
                target: {
                  host: "127.0.0.1",
                  port: control.port,
                  database: namespace.database,
                  schema: namespace.schema,
                  user: control.user,
                  credential: control.password,
                },
                manifest: fixtureManifest,
                artifactRoot: pathToFileURL(`${fixtureBuildRoot}/`),
              });
            } catch (error) {
              rejection = error;
            }
          } finally {
            sequelizePrototype.close = originalClose;
          }

          expect(sequelizePrototype.close).toBe(originalClose);
          expect(closeCalls).toBe(1);
          expect(fixtureGlobal[primaryObservationKey]).toBe(
            "TASK_004_CLEANUP_PRIMARY_FIXTURE_FAILURE",
          );
          expect(rejection).toBeInstanceOf(Error);

          const afterFailure = await captureState();
          expect(afterFailure).toEqual(beforeFailure);
          expect(afterFailure.tables).not.toContain(
            "cleanup_primary_failure_probe",
          );
          expect(
            afterFailure.history.some(
              ({ migration_id }) => migration_id === fixtureId,
            ),
          ).toBe(false);
          const activeAfter = await withClient(
            control,
            (client) =>
              client.query<{ pid: number }>(
                `SELECT pid::integer AS pid
                   FROM pg_catalog.pg_stat_activity
                  WHERE datname = $1
                    AND application_name = 'rick-and-morty-explorer:migrations'`,
                [namespace.database],
              ),
            namespace.database,
          );
          expect(activeAfter.rows).toEqual([]);

          if (!(rejection instanceof AggregateError)) {
            expect((rejection as Error).message).toBe(
              "TASK_004_FACTORY_CLOSE_FIXTURE_FAILURE",
            );
            throw new Error(
              "MIGRATION_PRIMARY_FAILURE_REPLACED_BY_CLEANUP_FAILURE",
            );
          }

          expect(rejection.errors).toHaveLength(2);
          const [preservedPrimary, cleanupFailure] = rejection.errors;
          expect((rejection as AggregateError & { cause?: unknown }).cause).toBe(
            preservedPrimary,
          );
          const primaryErrors: unknown[] = [preservedPrimary];
          const visited = new Set<unknown>();
          let retainedPrimary = false;
          while (primaryErrors.length > 0) {
            const current = primaryErrors.shift();
            if (
              current === null ||
              typeof current !== "object" ||
              visited.has(current)
            ) {
              continue;
            }
            visited.add(current);
            const diagnostic = current as {
              readonly message?: unknown;
              readonly cause?: unknown;
              readonly original?: unknown;
              readonly parent?: unknown;
            };
            retainedPrimary ||=
              typeof diagnostic.message === "string" &&
              diagnostic.message.includes(
                "TASK_004_CLEANUP_PRIMARY_FIXTURE_FAILURE",
              );
            primaryErrors.push(
              diagnostic.cause,
              diagnostic.original,
              diagnostic.parent,
            );
          }
          expect(retainedPrimary).toBe(true);
          expect(cleanupFailure).toMatchObject({
            name: "MigrationLifecycleError",
            message: "MIGRATION_CLEANUP_FAILED",
            result: 1,
          });
          expect(
            (cleanupFailure as { readonly cause?: unknown }).cause,
          ).toBeUndefined();
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      delete fixtureGlobal[primaryObservationKey];
      await rm(fixtureRoot, { recursive: true, force: true });
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("classifies cleanup-only failure after successful migration commit", async () => {
    const control = loadControl();
    let primaryFailure: unknown;

    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          const canonicalMapping = manifest.mappings[0];
          expect(canonicalMapping).toBeDefined();
          if (canonicalMapping === undefined) {
            throw new Error("MIGRATION_CLEANUP_ONLY_MAPPING_MISSING");
          }

          const sequelizeSpecifier: string = "sequelize";
          const sequelizeModule = (await import(
            sequelizeSpecifier
          )) as unknown as {
            Sequelize: {
              prototype: {
                close(this: unknown): Promise<void>;
              };
            };
          };
          const sequelizePrototype = sequelizeModule.Sequelize.prototype;
          const originalClose = sequelizePrototype.close;
          let closeCalls = 0;
          const patchedClose = async function (this: unknown): Promise<void> {
            closeCalls += 1;
            await originalClose.call(this);
            throw new Error("TASK_004_FACTORY_CLOSE_ONLY_FIXTURE_FAILURE");
          };
          let rejection: unknown;
          try {
            sequelizePrototype.close = patchedClose;
            try {
              await prepareMigratedNamespace({
                target: namespace.target,
                buildRoot: artifact.buildRoot,
              });
            } catch (error) {
              rejection = error;
            }
          } finally {
            sequelizePrototype.close = originalClose;
          }

          expect(sequelizePrototype.close).toBe(originalClose);
          expect(closeCalls).toBe(1);
          expect(rejection).toBeInstanceOf(Error);

          const committedState = await withClient(
            control,
            async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              const history = await client.query<{
                migration_id: string;
                source_sha256: string;
              }>(
                `SELECT migration_id, source_sha256
                   FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                  ORDER BY migration_id`,
              );
              const counts = await client.query<{
                character_count: number;
                comment_count: number;
              }>(
                `SELECT
                   (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.characters) AS character_count,
                   (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.comments) AS comment_count`,
              );
              return {
                tables: tables.rows.map(({ table_name }) => table_name),
                history: history.rows,
                counts: counts.rows,
              };
            },
            namespace.database,
          );
          expect(committedState).toEqual({
            tables: [
              "characters",
              "comments",
              "sequelize_migration_history",
            ],
            history: [
              {
                migration_id: canonicalMapping.migrationId,
                source_sha256: canonicalMapping.sourceSha256,
              },
            ],
            counts: [{ character_count: 0, comment_count: 0 }],
          });
          const activeAfter = await withClient(
            control,
            (client) =>
              client.query<{ pid: number }>(
                `SELECT pid::integer AS pid
                   FROM pg_catalog.pg_stat_activity
                  WHERE datname = $1
                    AND application_name = 'rick-and-morty-explorer:migrations'`,
                [namespace.database],
              ),
            namespace.database,
          );
          expect(activeAfter.rows).toEqual([]);
          console.info(
            `MIGRATION_CLEANUP_ONLY_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId} applied=1 close=1`,
          );

          if (
            rejection instanceof Error &&
            rejection.message === "TASK_004_FACTORY_CLOSE_ONLY_FIXTURE_FAILURE"
          ) {
            throw new Error(
              "MIGRATION_CLEANUP_ONLY_DIAGNOSTIC_MISSING_AFTER_COMMIT",
            );
          }

          expect(rejection).toMatchObject({
            name: "MigrationLifecycleError",
            message: "MIGRATION_CLEANUP_FAILED",
            result: 1,
          });
          const diagnostic = rejection as {
            readonly name?: unknown;
            readonly message?: unknown;
            readonly result?: unknown;
            readonly cause?: unknown;
          };
          expect(diagnostic.cause).toBeUndefined();
          expect([
            diagnostic.name,
            diagnostic.message,
            diagnostic.result,
            diagnostic.cause,
          ]).not.toContain("TASK_004_FACTORY_CLOSE_ONLY_FIXTURE_FAILURE");
        },
      });
    } catch (error) {
      primaryFailure = error;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("reports every migration pending without creating history for an empty namespace", async () => {
    const control = loadControl();
    const originalFetch = globalThis.fetch;
    let primaryFailure: unknown;

    globalThis.fetch = (() =>
      Promise.reject(
        new Error("PUBLIC_API_ACCESS_FORBIDDEN_DURING_MIGRATION_STATUS"),
      )) as typeof fetch;
    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact } = await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          await expectEmptyMigrationNamespace(control, namespace);
          console.info(
            `MIGRATION_STATUS_ARTIFACT_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId} tables=0`,
          );

          const inspectMigrationStatus = await loadMigrationStatusBoundary();
          const report = await inspectMigrationStatus({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expect(report).toEqual({
            operation: "status",
            result: 0,
            buildId: artifact.buildId,
            checksumAgreement: true,
            applied: [],
            pending: manifest.mappings.map(
              ({ migrationId: pendingMigrationId, sourceSha256 }) => ({
                migrationId: pendingMigrationId,
                sourceSha256,
              }),
            ),
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });
          await expectEmptyMigrationNamespace(control, namespace);
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("routes read-only status through the authenticated command artifact", async () => {
    const control = loadControl();
    const originalFetch = globalThis.fetch;
    let primaryFailure: unknown;

    globalThis.fetch = (() =>
      Promise.reject(
        new Error("PUBLIC_API_ACCESS_FORBIDDEN_DURING_MIGRATION_STATUS"),
      )) as typeof fetch;
    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact } = await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const session = new Session();
          let profilerEnabled = false;
          let preciseCoverageStarted = false;

          session.connect();
          try {
            await session.post("Profiler.enable");
            profilerEnabled = true;
            await session.post("Profiler.startPreciseCoverage", {
              callCount: true,
              detailed: true,
            });
            preciseCoverageStarted = true;

            const manifest = await authenticateArtifact(artifact);
            const command = manifest.files.find(
              ({ path, role }) => path === "command.js" && role === "command",
            );
            const runner = manifest.files.find(
              ({ path, role }) => role === "runner" && path.endsWith(".js"),
            );
            expect(command).toBeDefined();
            expect(runner).toBeDefined();
            if (command === undefined || runner === undefined) {
              throw new Error("MIGRATION_AUTHENTICATED_COMMAND_FILES_MISSING");
            }
            const commandUrl = pathToFileURL(
              join(artifact.buildRoot, command.path),
            ).href;
            const runnerUrl = pathToFileURL(
              join(artifact.buildRoot, runner.path),
            ).href;

            await expectEmptyMigrationNamespace(control, namespace);
            const inspectMigrationStatus = await loadMigrationStatusBoundary();
            const report = await inspectMigrationStatus({
              target: namespace.target,
              buildRoot: artifact.buildRoot,
            });
            expect(report).toEqual({
              operation: "status",
              result: 0,
              buildId: artifact.buildId,
              checksumAgreement: true,
              applied: [],
              pending: manifest.mappings.map(
                ({ migrationId: pendingMigrationId, sourceSha256 }) => ({
                  migrationId: pendingMigrationId,
                  sourceSha256,
                }),
              ),
              namespace: {
                database: namespace.database,
                schema: namespace.schema,
                lockVersion: "v2",
                lockKey: expect.stringMatching(/^-?[0-9]+$/u),
              },
              startup: {
                startupClientEncoding: "UTF8",
                startupSearchPath: "pg_catalog",
                serverEncoding: "UTF8",
                serverVersionNum: 180006,
                currentUserName: control.user,
                maxIdentifierLength: 63,
                databaseIsTemplate: false,
                databaseAllowsConnections: true,
              },
            });
            await expectEmptyMigrationNamespace(control, namespace);

            const coverage = await session.post(
              "Profiler.takePreciseCoverage",
            );
            const commandCoverage = coverage.result.filter(
              ({ url }) => url === commandUrl,
            );
            const runnerCoverage = coverage.result.filter(
              ({ url }) => url === runnerUrl,
            );
            expect(commandCoverage).toHaveLength(1);
            expect(runnerCoverage).toHaveLength(1);
            const commandFunctions = commandCoverage[0]?.functions.filter(
              ({ functionName }) => functionName === "runMigrationCommand",
            );
            const runnerFunctions = runnerCoverage[0]?.functions.filter(
              ({ functionName }) => functionName === "runMigrationStatus",
            );
            expect(commandFunctions?.length).toBeLessThanOrEqual(1);
            expect(runnerFunctions).toHaveLength(1);
            const commandCalls = commandFunctions?.[0]?.ranges[0]?.count ?? 0;
            const runnerStatusCalls = runnerFunctions?.[0]?.ranges[0]?.count;
            expect(commandCalls).toBeTypeOf("number");
            expect(runnerStatusCalls).toBe(1);
            console.info(
              `MIGRATION_AUTHENTICATED_COMMAND_DISPATCH_READY build=${artifact.buildId} commandCalls=${commandCalls} runnerStatusCalls=${runnerStatusCalls}`,
            );

            if (commandCalls === 0 && runnerStatusCalls === 1) {
              throw new Error(
                "MIGRATION_AUTHENTICATED_COMMAND_DISPATCH_MISSING_AFTER_ARTIFACT_AUTHENTICATION",
              );
            }
            expect(commandFunctions).toHaveLength(1);
            expect(commandCalls).toBe(1);
          } finally {
            if (preciseCoverageStarted) {
              await session.post("Profiler.stopPreciseCoverage");
            }
            if (profilerEnabled) {
              await session.post("Profiler.disable");
            }
            session.disconnect();
          }
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("reports applied history without mutating the migrated namespace", async () => {
    const control = loadControl();
    const originalFetch = globalThis.fetch;
    let primaryFailure: unknown;

    globalThis.fetch = (() =>
      Promise.reject(
        new Error("PUBLIC_API_ACCESS_FORBIDDEN_DURING_MIGRATION_STATUS"),
      )) as typeof fetch;
    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          expect(manifest.mappings).toHaveLength(1);
          const mapping = manifest.mappings[0];
          expect(mapping).toBeDefined();
          if (mapping === undefined) {
            throw new Error("MIGRATION_STATUS_APPLIED_HISTORY_MAPPING_MISSING");
          }

          const applied = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            applied,
            namespace,
            artifact,
            { noOp: false, applied: [mapping] },
            control.user,
          );

          const captureState = async (): Promise<{
            readonly tables: readonly string[];
            readonly history: readonly {
              readonly migration_id: string;
              readonly source_sha256: string;
              readonly applied_at: string;
            }[];
          }> =>
            withClient(
              control,
              async (client) => {
                const tables = await client.query<{ table_name: string }>(
                  `SELECT table_name
                     FROM information_schema.tables
                    WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                    ORDER BY table_name`,
                  [namespace.schema],
                );
                const history = await client.query<{
                  migration_id: string;
                  source_sha256: string;
                  applied_at: string;
                }>(
                  `SELECT migration_id,
                          source_sha256,
                          pg_catalog.to_char(
                            applied_at AT TIME ZONE 'UTC',
                            'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'
                          ) AS applied_at
                     FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                    ORDER BY migration_id`,
                );
                return {
                  tables: tables.rows.map(({ table_name }) => table_name),
                  history: history.rows,
                };
              },
              namespace.database,
            );

          const beforeStatus = await captureState();
          expect(beforeStatus.tables).toEqual([
            "characters",
            "comments",
            "sequelize_migration_history",
          ]);
          expect(beforeStatus.history).toEqual([
            {
              migration_id: mapping.migrationId,
              source_sha256: mapping.sourceSha256,
              applied_at: expect.stringMatching(
                /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}Z$/u,
              ),
            },
          ]);
          console.info(
            `MIGRATION_STATUS_APPLIED_HISTORY_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId} applied=1`,
          );

          const inspectMigrationStatus = await loadMigrationStatusBoundary();
          let report: MigrationStatusReport;
          try {
            report = await inspectMigrationStatus({
              target: namespace.target,
              buildRoot: artifact.buildRoot,
            });
          } catch (error) {
            throw new Error(
              "MIGRATION_STATUS_APPLIED_HISTORY_UNSUPPORTED_AFTER_MIGRATION",
              { cause: error },
            );
          }
          expect(report).toEqual({
            operation: "status",
            result: 0,
            buildId: artifact.buildId,
            checksumAgreement: true,
            applied: [
              {
                migrationId: mapping.migrationId,
                sourceSha256: mapping.sourceSha256,
              },
            ],
            pending: [],
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });
          expect(await captureState()).toEqual(beforeStatus);
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("rejects applied source checksum drift without mutating the namespace", async () => {
    const control = loadControl();
    const originalFetch = globalThis.fetch;
    let primaryFailure: unknown;

    globalThis.fetch = (() =>
      Promise.reject(
        new Error("PUBLIC_API_ACCESS_FORBIDDEN_DURING_MIGRATION_STATUS"),
      )) as typeof fetch;
    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          expect(manifest.mappings).toHaveLength(1);
          const mapping = manifest.mappings[0];
          expect(mapping).toBeDefined();
          if (mapping === undefined) {
            throw new Error("MIGRATION_STATUS_CHECKSUM_DRIFT_MAPPING_MISSING");
          }

          const applied = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            applied,
            namespace,
            artifact,
            { noOp: false, applied: [mapping] },
            control.user,
          );

          const driftedSha256 = `${mapping.sourceSha256.startsWith("0") ? "1" : "0"}${mapping.sourceSha256.slice(1)}`;
          expect(driftedSha256).toMatch(sha256Pattern);
          expect(driftedSha256).not.toBe(mapping.sourceSha256);
          await withClient(
            control,
            async (client) => {
              const changed = await client.query<{ migration_id: string }>(
                `UPDATE ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                    SET source_sha256 = $1
                  WHERE migration_id = $2
              RETURNING migration_id`,
                [driftedSha256, mapping.migrationId],
              );
              expect(changed.rowCount).toBe(1);
              expect(changed.rows).toEqual([
                { migration_id: mapping.migrationId },
              ]);
            },
            namespace.database,
          );

          const captureState = async (): Promise<{
            readonly tables: readonly string[];
            readonly history: readonly {
              readonly migration_id: string;
              readonly source_sha256: string;
              readonly applied_at: string;
            }[];
          }> =>
            withClient(
              control,
              async (client) => {
                const tables = await client.query<{ table_name: string }>(
                  `SELECT table_name
                     FROM information_schema.tables
                    WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                    ORDER BY table_name`,
                  [namespace.schema],
                );
                const history = await client.query<{
                  migration_id: string;
                  source_sha256: string;
                  applied_at: string;
                }>(
                  `SELECT migration_id,
                          source_sha256,
                          pg_catalog.to_char(
                            applied_at AT TIME ZONE 'UTC',
                            'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'
                          ) AS applied_at
                     FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                    ORDER BY migration_id`,
                );
                return {
                  tables: tables.rows.map(({ table_name }) => table_name),
                  history: history.rows,
                };
              },
              namespace.database,
            );

          const beforeStatus = await captureState();
          expect(beforeStatus.tables).toEqual([
            "characters",
            "comments",
            "sequelize_migration_history",
          ]);
          expect(beforeStatus.history).toEqual([
            {
              migration_id: mapping.migrationId,
              source_sha256: driftedSha256,
              applied_at: expect.stringMatching(
                /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}Z$/u,
              ),
            },
          ]);
          console.info(
            `MIGRATION_STATUS_CHECKSUM_DRIFT_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId} applied=1`,
          );

          const inspectMigrationStatus = await loadMigrationStatusBoundary();
          let rejection: unknown;
          try {
            await inspectMigrationStatus({
              target: namespace.target,
              buildRoot: artifact.buildRoot,
            });
          } catch (error) {
            rejection = error;
          }
          if (rejection === undefined) {
            throw new Error(
              "MIGRATION_STATUS_CHECKSUM_DRIFT_ACCEPTED_AFTER_MIGRATION",
            );
          }
          expect(rejection).toBeInstanceOf(Error);
          expect((rejection as Error).message).toBe("MIGRATION_HISTORY_INVALID");
          expect(await captureState()).toEqual(beforeStatus);
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("rejects unknown applied history without mutating the namespace", async () => {
    const control = loadControl();
    const originalFetch = globalThis.fetch;
    let primaryFailure: unknown;

    globalThis.fetch = (() =>
      Promise.reject(
        new Error("PUBLIC_API_ACCESS_FORBIDDEN_DURING_MIGRATION_STATUS"),
      )) as typeof fetch;
    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          expect(manifest.mappings).toHaveLength(1);
          const mapping = manifest.mappings[0];
          expect(mapping).toBeDefined();
          if (mapping === undefined) {
            throw new Error("MIGRATION_STATUS_UNKNOWN_HISTORY_MAPPING_MISSING");
          }

          const applied = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            applied,
            namespace,
            artifact,
            { noOp: false, applied: [mapping] },
            control.user,
          );

          const unknownMigrationId =
            "20260814000001-unknown-relational-schema";
          const unknownSourceSha256 = "a".repeat(64);
          await withClient(
            control,
            async (client) => {
              const inserted = await client.query<{ migration_id: string }>(
                `INSERT INTO ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                   (migration_id, source_sha256, applied_at)
                 VALUES ($1, $2, '2026-08-14T12:00:00.000000Z'::pg_catalog.timestamptz)
              RETURNING migration_id`,
                [unknownMigrationId, unknownSourceSha256],
              );
              expect(inserted.rowCount).toBe(1);
              expect(inserted.rows).toEqual([
                { migration_id: unknownMigrationId },
              ]);
            },
            namespace.database,
          );

          const captureState = async (): Promise<{
            readonly tables: readonly string[];
            readonly history: readonly {
              readonly migration_id: string;
              readonly source_sha256: string;
              readonly applied_at: string;
            }[];
          }> =>
            withClient(
              control,
              async (client) => {
                const tables = await client.query<{ table_name: string }>(
                  `SELECT table_name
                     FROM information_schema.tables
                    WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                    ORDER BY table_name`,
                  [namespace.schema],
                );
                const history = await client.query<{
                  migration_id: string;
                  source_sha256: string;
                  applied_at: string;
                }>(
                  `SELECT migration_id,
                          source_sha256,
                          pg_catalog.to_char(
                            applied_at AT TIME ZONE 'UTC',
                            'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'
                          ) AS applied_at
                     FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                    ORDER BY migration_id`,
                );
                return {
                  tables: tables.rows.map(({ table_name }) => table_name),
                  history: history.rows,
                };
              },
              namespace.database,
            );

          const beforeStatus = await captureState();
          expect(beforeStatus.tables).toEqual([
            "characters",
            "comments",
            "sequelize_migration_history",
          ]);
          expect(beforeStatus.history).toEqual([
            {
              migration_id: mapping.migrationId,
              source_sha256: mapping.sourceSha256,
              applied_at: expect.stringMatching(
                /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}Z$/u,
              ),
            },
            {
              migration_id: unknownMigrationId,
              source_sha256: unknownSourceSha256,
              applied_at: "2026-08-14T12:00:00.000000Z",
            },
          ]);
          console.info(
            `MIGRATION_STATUS_UNKNOWN_HISTORY_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId} applied=2`,
          );

          const inspectMigrationStatus = await loadMigrationStatusBoundary();
          let rejection: unknown;
          try {
            await inspectMigrationStatus({
              target: namespace.target,
              buildRoot: artifact.buildRoot,
            });
          } catch (error) {
            rejection = error;
          }
          if (rejection === undefined) {
            throw new Error(
              "MIGRATION_STATUS_UNKNOWN_HISTORY_ACCEPTED_AFTER_MIGRATION",
            );
          }
          expect(rejection).toBeInstanceOf(Error);
          expect((rejection as Error).message).toBe("MIGRATION_HISTORY_INVALID");
          expect(await captureState()).toEqual(beforeStatus);
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it.each([
    { caseName: "malformed-id" },
    { caseName: "duplicate-id" },
    { caseName: "non-prefix" },
    { caseName: "inserted-before" },
    { caseName: "missing-applied-manifest" },
  ] as const)(
    "rejects invalid applied-history topology without mutating status state: $caseName",
    async ({ caseName }) => {
      const control = loadControl();
      const originalFetch = globalThis.fetch;
      let primaryFailure: unknown;

      globalThis.fetch = (() =>
        Promise.reject(
          new Error("PUBLIC_API_ACCESS_FORBIDDEN_DURING_MIGRATION_STATUS"),
        )) as typeof fetch;
      try {
        await withPostgresNamespace({
          control,
          body: async (namespace) => {
            const { buildMigrationArtifact, prepareMigratedNamespace } =
              await loadFutureBoundary();
            const artifact = await buildMigrationArtifact();
            const manifest = await authenticateArtifact(artifact);
            const canonicalMapping = manifest.mappings[0];
            expect(canonicalMapping).toBeDefined();
            if (canonicalMapping === undefined) {
              throw new Error(
                "MIGRATION_STATUS_INVALID_HISTORY_TOPOLOGY_MAPPING_MISSING",
              );
            }

            const applied = await prepareMigratedNamespace({
              target: namespace.target,
              buildRoot: artifact.buildRoot,
            });
            expectPreparationReport(
              applied,
              namespace,
              artifact,
              { noOp: false, applied: [canonicalMapping] },
              control.user,
            );

            const laterMapping: ArtifactMapping = {
              migrationId: "20260814000001-later-history-fixture",
              sourcePath:
                "apps/api/src/infrastructure/database/migrations/20260814000001-later-history-fixture.ts",
              sourceSha256: "1".repeat(64),
              emittedPath: "files/20260814000001-later-history-fixture.js",
              emittedSha256: "2".repeat(64),
            };
            const earlierMapping: ArtifactMapping = {
              migrationId: "20260813000000-earlier-history-fixture",
              sourcePath:
                "apps/api/src/infrastructure/database/migrations/20260813000000-earlier-history-fixture.ts",
              sourceSha256: "3".repeat(64),
              emittedPath: "files/20260813000000-earlier-history-fixture.js",
              emittedSha256: "4".repeat(64),
            };
            let manifestView = manifest;
            if (caseName === "non-prefix" || caseName === "inserted-before") {
              const added = caseName === "non-prefix" ? laterMapping : earlierMapping;
              const identity = {
                ...manifest,
                buildId: "",
                inputs: [
                  ...manifest.inputs,
                  { path: added.sourcePath, sourceSha256: added.sourceSha256 },
                ].sort((left, right) =>
                  Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
                ),
                files: [
                  ...manifest.files,
                  {
                    path: added.emittedPath,
                    role: "migration",
                    sha256: added.emittedSha256,
                  },
                ].sort((left, right) =>
                  Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)),
                ),
                mappings:
                  caseName === "non-prefix"
                    ? [canonicalMapping, laterMapping]
                    : [earlierMapping, canonicalMapping],
              } satisfies MigrationManifest;
              manifestView = {
                ...identity,
                buildId: recomputeBuildId(identity),
              };
            } else if (caseName === "missing-applied-manifest") {
              const identity = {
                ...manifest,
                buildId: "",
                mappings: [],
              } satisfies MigrationManifest;
              manifestView = {
                ...identity,
                buildId: recomputeBuildId(identity),
              };
            }

            await withClient(
              control,
              async (client) => {
                if (caseName === "malformed-id") {
                  const changed = await client.query(
                    `UPDATE ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                        SET migration_id = 'not-a-canonical-migration-id!'
                      WHERE migration_id = $1`,
                    [canonicalMapping.migrationId],
                  );
                  expect(changed.rowCount).toBe(1);
                } else if (caseName === "duplicate-id") {
                  await client.query(
                    `ALTER TABLE ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                       DROP CONSTRAINT sequelize_migration_history_pkey`,
                  );
                  const inserted = await client.query(
                    `INSERT INTO ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                       (migration_id, source_sha256, applied_at)
                     VALUES ($1, $2, '2999-08-14T12:00:00.000000Z'::pg_catalog.timestamptz)`,
                    [canonicalMapping.migrationId, canonicalMapping.sourceSha256],
                  );
                  expect(inserted.rowCount).toBe(1);
                } else if (caseName === "non-prefix") {
                  const changed = await client.query(
                    `UPDATE ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                        SET migration_id = $1, source_sha256 = $2
                      WHERE migration_id = $3`,
                    [
                      laterMapping.migrationId,
                      laterMapping.sourceSha256,
                      canonicalMapping.migrationId,
                    ],
                  );
                  expect(changed.rowCount).toBe(1);
                }
              },
              namespace.database,
            );

            const captureState = async (): Promise<{
              readonly tables: readonly string[];
              readonly history: readonly {
                readonly migration_id: string;
                readonly source_sha256: string;
                readonly applied_at: string;
              }[];
              readonly constraints: readonly {
                readonly constraint_name: string;
                readonly constraint_type: string;
              }[];
            }> =>
              withClient(
                control,
                async (client) => {
                  const tables = await client.query<{ table_name: string }>(
                    `SELECT table_name
                       FROM information_schema.tables
                      WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                      ORDER BY table_name`,
                    [namespace.schema],
                  );
                  const history = await client.query<{
                    migration_id: string;
                    source_sha256: string;
                    applied_at: string;
                  }>(
                    `SELECT migration_id,
                            source_sha256,
                            pg_catalog.to_char(
                              applied_at AT TIME ZONE 'UTC',
                              'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'
                            ) AS applied_at
                       FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                      ORDER BY applied_at, migration_id`,
                  );
                  const constraints = await client.query<{
                    constraint_name: string;
                    constraint_type: string;
                  }>(
                    `SELECT constraint_name, constraint_type
                       FROM information_schema.table_constraints
                      WHERE table_schema = $1
                        AND table_name = 'sequelize_migration_history'
                      ORDER BY constraint_name`,
                    [namespace.schema],
                  );
                  return {
                    tables: tables.rows.map(({ table_name }) => table_name),
                    history: history.rows,
                    constraints: constraints.rows,
                  };
                },
                namespace.database,
              );

            const beforeStatus = await captureState();
            expect(beforeStatus.tables).toEqual([
              "characters",
              "comments",
              "sequelize_migration_history",
            ]);
            expect(beforeStatus.constraints).toEqual(
              caseName === "duplicate-id"
                ? [
                    {
                      constraint_name:
                        "sequelize_migration_history_applied_at_not_null",
                      constraint_type: "CHECK",
                    },
                    {
                      constraint_name:
                        "sequelize_migration_history_migration_id_not_null",
                      constraint_type: "CHECK",
                    },
                    {
                      constraint_name:
                        "sequelize_migration_history_source_sha256_not_null",
                      constraint_type: "CHECK",
                    },
                  ]
                : [
                    {
                      constraint_name:
                        "sequelize_migration_history_applied_at_not_null",
                      constraint_type: "CHECK",
                    },
                    {
                      constraint_name:
                        "sequelize_migration_history_migration_id_not_null",
                      constraint_type: "CHECK",
                    },
                    {
                      constraint_name: "sequelize_migration_history_pkey",
                      constraint_type: "PRIMARY KEY",
                    },
                    {
                      constraint_name:
                        "sequelize_migration_history_source_sha256_not_null",
                      constraint_type: "CHECK",
                    },
                  ],
            );
            const timestampPattern =
              /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}Z$/u;
            if (caseName === "malformed-id") {
              expect(beforeStatus.history).toEqual([
                {
                  migration_id: "not-a-canonical-migration-id!",
                  source_sha256: canonicalMapping.sourceSha256,
                  applied_at: expect.stringMatching(timestampPattern),
                },
              ]);
            } else if (caseName === "duplicate-id") {
              expect(beforeStatus.history).toEqual([
                {
                  migration_id: canonicalMapping.migrationId,
                  source_sha256: canonicalMapping.sourceSha256,
                  applied_at: expect.stringMatching(timestampPattern),
                },
                {
                  migration_id: canonicalMapping.migrationId,
                  source_sha256: canonicalMapping.sourceSha256,
                  applied_at: "2999-08-14T12:00:00.000000Z",
                },
              ]);
            } else if (caseName === "non-prefix") {
              expect(beforeStatus.history).toEqual([
                {
                  migration_id: laterMapping.migrationId,
                  source_sha256: laterMapping.sourceSha256,
                  applied_at: expect.stringMatching(timestampPattern),
                },
              ]);
            } else {
              expect(beforeStatus.history).toEqual([
                {
                  migration_id: canonicalMapping.migrationId,
                  source_sha256: canonicalMapping.sourceSha256,
                  applied_at: expect.stringMatching(timestampPattern),
                },
              ]);
            }
            console.info(
              `MIGRATION_STATUS_INVALID_HISTORY_TOPOLOGY_READY case=${caseName} database=${namespace.database} schema=${namespace.schema} build=${manifestView.buildId} history=${beforeStatus.history.length} mappings=${manifestView.mappings.length}`,
            );

            const factory = (await import(
              pathToFileURL(join(artifact.buildRoot, "files/factory.js")).href
            )) as {
              inspectWithMigrationFactory(
                options: Record<string, unknown>,
              ): Promise<MigrationStatusReport>;
            };
            const target = {
              host: "127.0.0.1",
              port: control.port,
              database: namespace.database,
              schema: namespace.schema,
              user: control.user,
              credential: control.password,
            };
            let rejection: unknown;
            try {
              await factory.inspectWithMigrationFactory({
                target,
                manifest: manifestView,
                artifactRoot: pathToFileURL(`${artifact.buildRoot}/`),
              });
            } catch (error) {
              rejection = error;
            }
            if (rejection === undefined) {
              throw new Error(
                `MIGRATION_STATUS_INVALID_HISTORY_TOPOLOGY_ACCEPTED_AFTER_MIGRATION case=${caseName}`,
              );
            }
            expect(rejection).toBeInstanceOf(Error);
            expect((rejection as Error).message).toBe("MIGRATION_HISTORY_INVALID");
            expect(await captureState()).toEqual(beforeStatus);
          },
        });
      } catch (error) {
        primaryFailure = error;
      } finally {
        globalThis.fetch = originalFetch;
      }

      expect(await listOwnedDatabases(control)).toEqual([]);
      if (primaryFailure !== undefined) {
        throw primaryFailure;
      }
    },
  );

  it("treats default down as a non-mutating no-op when history is absent", async () => {
    const control = loadControl();
    const originalFetch = globalThis.fetch;
    let primaryFailure: unknown;

    globalThis.fetch = (() =>
      Promise.reject(
        new Error("PUBLIC_API_ACCESS_FORBIDDEN_DURING_MIGRATION_DOWN"),
      )) as typeof fetch;
    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact } = await loadFutureBoundary();
          const artifact = await buildMigrationArtifact();
          await authenticateArtifact(artifact);
          await expectEmptyMigrationNamespace(control, namespace);
          console.info(
            `MIGRATION_DOWN_ARTIFACT_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId} tables=0`,
          );

          const revertMigratedNamespace = await loadMigrationDownBoundary();
          const report = await revertMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expect(report).toEqual({
            operation: "down",
            result: 0,
            buildId: artifact.buildId,
            noOp: true,
            reverted: [],
            remaining: [],
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });
          await expectEmptyMigrationNamespace(control, namespace);
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("reverts exactly the last applied migration by default and permits reapply", async () => {
    const control = loadControl();
    const originalFetch = globalThis.fetch;
    let primaryFailure: unknown;

    globalThis.fetch = (() =>
      Promise.reject(
        new Error("PUBLIC_API_ACCESS_FORBIDDEN_DURING_MIGRATION_REAPPLY"),
      )) as typeof fetch;
    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const revertMigratedNamespace = await loadMigrationDownBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          const [mapping] = manifest.mappings;
          expect(mapping).toBeDefined();
          if (mapping === undefined) {
            throw new Error("MIGRATION_DEFAULT_DOWN_MAPPING_MISSING");
          }

          const applied = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            applied,
            namespace,
            artifact,
            { noOp: false, applied: [mapping] },
            control.user,
          );
          await withClient(
            control,
            async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              expect(tables.rows.map(({ table_name }) => table_name)).toEqual([
                "characters",
                "comments",
                "sequelize_migration_history",
              ]);
              const history = await client.query<{
                migration_id: string;
                source_sha256: string;
              }>(
                `SELECT migration_id, source_sha256
                   FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                  ORDER BY migration_id`,
              );
              expect(history.rows).toEqual([
                {
                  migration_id: mapping.migrationId,
                  source_sha256: mapping.sourceSha256,
                },
              ]);
            },
            namespace.database,
          );
          console.info(
            `MIGRATION_DEFAULT_DOWN_LAST_APPLIED_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId} applied=1`,
          );

          let reverted: MigrationDownReport;
          try {
            reverted = await revertMigratedNamespace({
              target: namespace.target,
              buildRoot: artifact.buildRoot,
            });
          } catch (error) {
            if (
              error instanceof Error &&
              error.message === "MIGRATION_ROLLBACK_BOUNDS"
            ) {
              throw new Error(
                "MIGRATION_DEFAULT_DOWN_LAST_APPLIED_UNSUPPORTED_AFTER_MIGRATION",
                { cause: error },
              );
            }
            throw error;
          }
          expect(reverted).toEqual({
            operation: "down",
            result: 0,
            buildId: artifact.buildId,
            noOp: false,
            reverted: [
              {
                migrationId: mapping.migrationId,
                sourceSha256: mapping.sourceSha256,
              },
            ],
            remaining: [],
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });

          await withClient(
            control,
            async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              expect(tables.rows.map(({ table_name }) => table_name)).toEqual([
                "sequelize_migration_history",
              ]);
              const history = await client.query<{ migration_id: string }>(
                `SELECT migration_id
                   FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history`,
              );
              expect(history.rows).toEqual([]);
            },
            namespace.database,
          );

          const reapplied = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            reapplied,
            namespace,
            artifact,
            { noOp: false, applied: [mapping] },
            control.user,
          );
          await withClient(
            control,
            async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              expect(tables.rows.map(({ table_name }) => table_name)).toEqual([
                "characters",
                "comments",
                "sequelize_migration_history",
              ]);
              const history = await client.query<{
                migration_id: string;
                source_sha256: string;
              }>(
                `SELECT migration_id, source_sha256
                   FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history`,
              );
              expect(history.rows).toEqual([
                {
                  migration_id: mapping.migrationId,
                  source_sha256: mapping.sourceSha256,
                },
              ]);
            },
            namespace.database,
          );
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("rejects a zero rollback step before executing migration code", async () => {
    const control = loadControl();
    const originalFetch = globalThis.fetch;
    let primaryFailure: unknown;

    globalThis.fetch = (() =>
      Promise.reject(
        new Error("PUBLIC_API_ACCESS_FORBIDDEN_DURING_ROLLBACK_VALIDATION"),
      )) as typeof fetch;
    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const revertMigratedNamespace = await loadMigrationDownBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          const [mapping] = manifest.mappings;
          expect(mapping).toBeDefined();
          if (mapping === undefined) {
            throw new Error("MIGRATION_ROLLBACK_ZERO_STEP_MAPPING_MISSING");
          }

          const applied = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            applied,
            namespace,
            artifact,
            { noOp: false, applied: [mapping] },
            control.user,
          );
          await withClient(
            control,
            async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              expect(tables.rows.map(({ table_name }) => table_name)).toEqual([
                "characters",
                "comments",
                "sequelize_migration_history",
              ]);
              const history = await client.query<{
                migration_id: string;
                source_sha256: string;
              }>(
                `SELECT migration_id, source_sha256
                   FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history`,
              );
              expect(history.rows).toEqual([
                {
                  migration_id: mapping.migrationId,
                  source_sha256: mapping.sourceSha256,
                },
              ]);
            },
            namespace.database,
          );
          console.info(
            `MIGRATION_ROLLBACK_ZERO_STEP_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId} applied=1`,
          );

          try {
            await revertMigratedNamespace({
              target: namespace.target,
              buildRoot: artifact.buildRoot,
              selector: {
                kind: "step",
                count: 0,
                confirmMultiple: false,
              },
            });
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect((error as Error).message).toBe("MIGRATION_ROLLBACK_BOUNDS");
            expect(error).toHaveProperty("result", 1);
            await withClient(
              control,
              async (client) => {
                const tables = await client.query<{ table_name: string }>(
                  `SELECT table_name
                     FROM information_schema.tables
                    WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                    ORDER BY table_name`,
                  [namespace.schema],
                );
                expect(tables.rows.map(({ table_name }) => table_name)).toEqual([
                  "characters",
                  "comments",
                  "sequelize_migration_history",
                ]);
                const history = await client.query<{
                  migration_id: string;
                  source_sha256: string;
                }>(
                  `SELECT migration_id, source_sha256
                     FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history`,
                );
                expect(history.rows).toEqual([
                  {
                    migration_id: mapping.migrationId,
                    source_sha256: mapping.sourceSha256,
                  },
                ]);
              },
              namespace.database,
            );
            return;
          }
          throw new Error(
            "MIGRATION_ROLLBACK_ZERO_STEP_ACCEPTED_AFTER_MIGRATION",
          );
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("reverts one applied migration with an explicit step selector", async () => {
    const control = loadControl();
    const originalFetch = globalThis.fetch;
    let primaryFailure: unknown;

    globalThis.fetch = (() =>
      Promise.reject(
        new Error("PUBLIC_API_ACCESS_FORBIDDEN_DURING_STEP_ROLLBACK"),
      )) as typeof fetch;
    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const revertMigratedNamespace = await loadMigrationDownBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          const [mapping] = manifest.mappings;
          expect(mapping).toBeDefined();
          if (mapping === undefined) {
            throw new Error("MIGRATION_ROLLBACK_STEP_ONE_MAPPING_MISSING");
          }

          const applied = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            applied,
            namespace,
            artifact,
            { noOp: false, applied: [mapping] },
            control.user,
          );
          await withClient(
            control,
            async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              expect(tables.rows.map(({ table_name }) => table_name)).toEqual([
                "characters",
                "comments",
                "sequelize_migration_history",
              ]);
              const history = await client.query<{
                migration_id: string;
                source_sha256: string;
              }>(
                `SELECT migration_id, source_sha256
                   FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history`,
              );
              expect(history.rows).toEqual([
                {
                  migration_id: mapping.migrationId,
                  source_sha256: mapping.sourceSha256,
                },
              ]);
            },
            namespace.database,
          );
          console.info(
            `MIGRATION_ROLLBACK_STEP_ONE_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId} applied=1`,
          );

          let reverted: MigrationDownReport;
          try {
            reverted = await revertMigratedNamespace({
              target: namespace.target,
              buildRoot: artifact.buildRoot,
              selector: {
                kind: "step",
                count: 1,
                confirmMultiple: false,
              },
            });
          } catch (error) {
            if (
              error instanceof Error &&
              error.message === "MIGRATION_ROLLBACK_BOUNDS"
            ) {
              expect(error).toHaveProperty("result", 1);
              throw new Error(
                "MIGRATION_ROLLBACK_STEP_ONE_UNSUPPORTED_AFTER_MIGRATION",
                { cause: error },
              );
            }
            throw error;
          }
          expect(reverted).toEqual({
            operation: "down",
            result: 0,
            buildId: artifact.buildId,
            noOp: false,
            reverted: [
              {
                migrationId: mapping.migrationId,
                sourceSha256: mapping.sourceSha256,
              },
            ],
            remaining: [],
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });
          await withClient(
            control,
            async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              expect(tables.rows.map(({ table_name }) => table_name)).toEqual([
                "sequelize_migration_history",
              ]);
              const history = await client.query<{ migration_id: string }>(
                `SELECT migration_id
                   FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history`,
              );
              expect(history.rows).toEqual([]);
            },
            namespace.database,
          );
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it("keeps the latest applied migration without mutation", async () => {
    const control = loadControl();
    const originalFetch = globalThis.fetch;
    let primaryFailure: unknown;

    globalThis.fetch = (() =>
      Promise.reject(
        new Error("PUBLIC_API_ACCESS_FORBIDDEN_DURING_KEEP_THROUGH"),
      )) as typeof fetch;
    try {
      await withPostgresNamespace({
        control,
        body: async (namespace) => {
          const { buildMigrationArtifact, prepareMigratedNamespace } =
            await loadFutureBoundary();
          const revertMigratedNamespace = await loadMigrationDownBoundary();
          const artifact = await buildMigrationArtifact();
          const manifest = await authenticateArtifact(artifact);
          const [mapping] = manifest.mappings;
          expect(mapping).toBeDefined();
          if (mapping === undefined) {
            throw new Error("MIGRATION_KEEP_THROUGH_MAPPING_MISSING");
          }

          const applied = await prepareMigratedNamespace({
            target: namespace.target,
            buildRoot: artifact.buildRoot,
          });
          expectPreparationReport(
            applied,
            namespace,
            artifact,
            { noOp: false, applied: [mapping] },
            control.user,
          );
          await withClient(
            control,
            async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              expect(tables.rows.map(({ table_name }) => table_name)).toEqual([
                "characters",
                "comments",
                "sequelize_migration_history",
              ]);
              const history = await client.query<{
                migration_id: string;
                source_sha256: string;
              }>(
                `SELECT migration_id, source_sha256
                   FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history`,
              );
              expect(history.rows).toEqual([
                {
                  migration_id: mapping.migrationId,
                  source_sha256: mapping.sourceSha256,
                },
              ]);
            },
            namespace.database,
          );
          console.info(
            `MIGRATION_ROLLBACK_KEEP_THROUGH_LATEST_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId} applied=1`,
          );

          let kept: MigrationDownReport;
          try {
            kept = await revertMigratedNamespace({
              target: namespace.target,
              buildRoot: artifact.buildRoot,
              selector: {
                kind: "keep-through",
                migrationId: mapping.migrationId,
              },
            });
          } catch (error) {
            if (
              error instanceof Error &&
              error.message === "MIGRATION_ROLLBACK_BOUNDS"
            ) {
              expect(error).toHaveProperty("result", 1);
              throw new Error(
                "MIGRATION_ROLLBACK_KEEP_THROUGH_LATEST_UNSUPPORTED_AFTER_MIGRATION",
                { cause: error },
              );
            }
            throw error;
          }
          expect(kept).toEqual({
            operation: "down",
            result: 0,
            buildId: artifact.buildId,
            noOp: true,
            reverted: [],
            remaining: [
              {
                migrationId: mapping.migrationId,
                sourceSha256: mapping.sourceSha256,
              },
            ],
            namespace: {
              database: namespace.database,
              schema: namespace.schema,
              lockVersion: "v2",
              lockKey: expect.stringMatching(/^-?[0-9]+$/u),
            },
            startup: {
              startupClientEncoding: "UTF8",
              startupSearchPath: "pg_catalog",
              serverEncoding: "UTF8",
              serverVersionNum: 180006,
              currentUserName: control.user,
              maxIdentifierLength: 63,
              databaseIsTemplate: false,
              databaseAllowsConnections: true,
            },
          });
          await withClient(
            control,
            async (client) => {
              const tables = await client.query<{ table_name: string }>(
                `SELECT table_name
                   FROM information_schema.tables
                  WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                  ORDER BY table_name`,
                [namespace.schema],
              );
              expect(tables.rows.map(({ table_name }) => table_name)).toEqual([
                "characters",
                "comments",
                "sequelize_migration_history",
              ]);
              const history = await client.query<{
                migration_id: string;
                source_sha256: string;
              }>(
                `SELECT migration_id, source_sha256
                   FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history`,
              );
              expect(history.rows).toEqual([
                {
                  migration_id: mapping.migrationId,
                  source_sha256: mapping.sourceSha256,
                },
              ]);
            },
            namespace.database,
          );
        },
      });
    } catch (error) {
      primaryFailure = error;
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(await listOwnedDatabases(control)).toEqual([]);
    if (primaryFailure !== undefined) {
      throw primaryFailure;
    }
  });

  it(
    "does not retry an ambiguous successful commit and requires locked status recovery",
    async () => {
      const control = loadControl();
      const originalFetch = globalThis.fetch;
      let primaryFailure: unknown;

      globalThis.fetch = (() =>
        Promise.reject(
          new Error("PUBLIC_API_ACCESS_FORBIDDEN_DURING_AMBIGUOUS_COMMIT_RECOVERY"),
        )) as typeof fetch;
      try {
        await withPostgresNamespace({
          control,
          body: async (namespace) => {
            const { buildMigrationArtifact, prepareMigratedNamespace } =
              await loadFutureBoundary();
            const artifact = await buildMigrationArtifact();
            const manifest = await authenticateArtifact(artifact);
            const mapping = manifest.mappings[0];
            expect(mapping).toBeDefined();
            if (mapping === undefined) {
              throw new Error("MIGRATION_AMBIGUOUS_COMMIT_MAPPING_MISSING");
            }
            const inspectMigrationStatus = await loadMigrationStatusBoundary();
            await expectEmptyMigrationNamespace(control, namespace);

            const sequelizeSpecifier: string = "sequelize";
            const sequelizeModule = (await import(
              sequelizeSpecifier
            )) as unknown as {
              Sequelize: {
                prototype: {
                  transaction(
                    this: unknown,
                    ...args: unknown[]
                  ): Promise<unknown>;
                  close(this: unknown): Promise<void>;
                };
              };
              Transaction: {
                prototype: {
                  commit(this: unknown, ...args: unknown[]): Promise<void>;
                };
              };
            };
            const sequelizePrototype = sequelizeModule.Sequelize.prototype;
            const transactionPrototype = sequelizeModule.Transaction.prototype;
            const originalTransaction = sequelizePrototype.transaction;
            const originalClose = sequelizePrototype.close;
            const originalCommit = transactionPrototype.commit;
            const transactionInstances: unknown[] = [];
            const closeInstances: unknown[] = [];
            const transactionObjects: unknown[] = [];
            const sessionPids: number[] = [];
            const lockQueryCounts: number[] = [];
            let closeCalls = 0;
            let commitCalls = 0;
            let successfulCommits = 0;
            let injectedFailures = 0;

            const patchedTransaction = async function (
              this: unknown,
              ...args: unknown[]
            ): Promise<unknown> {
              const operationIndex = transactionInstances.length;
              transactionInstances.push(this);
              lockQueryCounts[operationIndex] = 0;
              const callbackIndex = args.length - 1;
              const callback = args[callbackIndex];
              if (typeof callback !== "function") {
                throw new Error("MIGRATION_AMBIGUOUS_COMMIT_CALLBACK_MISSING");
              }
              const wrappedCallback = async (...callbackArgs: unknown[]) => {
                const transaction = callbackArgs[0] as {
                  readonly connection?: {
                    readonly processID?: unknown;
                    query(this: unknown, ...queryArgs: unknown[]): Promise<unknown>;
                  };
                };
                const connection = transaction.connection;
                if (
                  connection === undefined ||
                  typeof connection.query !== "function" ||
                  typeof connection.processID !== "number"
                ) {
                  throw new Error("MIGRATION_AMBIGUOUS_COMMIT_SESSION_MISSING");
                }
                transactionObjects.push(transaction);
                sessionPids.push(connection.processID);
                const originalQuery = connection.query;
                connection.query = async function (
                  this: unknown,
                  ...queryArgs: unknown[]
                ): Promise<unknown> {
                  const request = queryArgs[0];
                  const text =
                    request !== null &&
                      typeof request === "object" &&
                      "text" in request &&
                      typeof request.text === "string"
                      ? request.text
                      : typeof request === "string"
                        ? request
                        : "";
                  if (text.includes("pg_try_advisory_xact_lock")) {
                    lockQueryCounts[operationIndex] =
                      (lockQueryCounts[operationIndex] ?? 0) + 1;
                  }
                  return originalQuery.apply(this, queryArgs);
                };
                try {
                  return await (callback as (...values: unknown[]) => unknown)(
                    ...callbackArgs,
                  );
                } finally {
                  connection.query = originalQuery;
                }
              };
              const wrappedArgs = [...args];
              wrappedArgs[callbackIndex] = wrappedCallback;
              return originalTransaction.apply(this, wrappedArgs);
            };
            const patchedClose = async function (this: unknown): Promise<void> {
              closeCalls += 1;
              closeInstances.push(this);
              await originalClose.call(this);
            };
            const patchedCommit = async function (
              this: unknown,
              ...args: unknown[]
            ): Promise<void> {
              commitCalls += 1;
              await originalCommit.apply(this, args);
              successfulCommits += 1;
              console.info(
                `MIGRATION_AMBIGUOUS_COMMIT_READY database=${namespace.database} schema=${namespace.schema} build=${artifact.buildId} committed=1`,
              );
              injectedFailures += 1;
              const postgresFailure = Object.assign(
                new Error("TASK_004_AMBIGUOUS_COMMIT_POSTGRES_FAILURE"),
                { code: "57P01" },
              );
              throw new Error("TASK_004_AMBIGUOUS_COMMIT_FIXTURE_FAILURE", {
                cause: postgresFailure,
              });
            };

            const captureCommittedState = () =>
              withClient(
                control,
                async (client) => {
                  const tables = await client.query<{ table_name: string }>(
                    `SELECT table_name
                       FROM information_schema.tables
                      WHERE table_schema = $1 AND table_type = 'BASE TABLE'
                      ORDER BY table_name`,
                    [namespace.schema],
                  );
                  const history = await client.query<{
                    migration_id: string;
                    source_sha256: string;
                    applied_at: string;
                  }>(
                    `SELECT migration_id,
                            source_sha256,
                            pg_catalog.to_char(
                              applied_at AT TIME ZONE 'UTC',
                              'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'
                            ) AS applied_at
                       FROM ${quoteIdentifier(namespace.schema)}.sequelize_migration_history
                      ORDER BY migration_id`,
                  );
                  const counts = await client.query<{
                    characters: number;
                    comments: number;
                  }>(
                    `SELECT
                       (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.characters) AS characters,
                       (SELECT pg_catalog.count(*)::integer FROM ${quoteIdentifier(namespace.schema)}.comments) AS comments`,
                  );
                  return {
                    tables: tables.rows.map(({ table_name }) => table_name),
                    history: history.rows,
                    counts: counts.rows,
                  };
                },
                namespace.database,
              );

            let operationFailure: unknown;
            try {
              sequelizePrototype.transaction = patchedTransaction;
              sequelizePrototype.close = patchedClose;
              transactionPrototype.commit = patchedCommit;

              let rejection: unknown;
              try {
                await prepareMigratedNamespace({
                  target: namespace.target,
                  buildRoot: artifact.buildRoot,
                });
              } catch (error) {
                rejection = error;
              } finally {
                transactionPrototype.commit = originalCommit;
              }

              expect(successfulCommits).toBe(1);
              expect(commitCalls).toBe(1);
              expect(injectedFailures).toBe(1);
              expect(transactionInstances).toHaveLength(1);
              expect(closeInstances).toHaveLength(1);
              expect(closeCalls).toBe(1);
              expect(rejection).toBeInstanceOf(Error);
              const diagnostic = rejection as Error & {
                readonly result?: unknown;
                readonly cause?: unknown;
              };
              const redactedCause = diagnostic.cause;
              expect(diagnostic.name).toBe("MigrationLifecycleError");
              expect(diagnostic.result).toBe(1);
              expect([
                "MIGRATION_CONNECTION_LOST",
                "MIGRATION_COMMIT_AMBIGUOUS",
              ]).toContain(diagnostic.message);
              expect(
                redactedCause !== null &&
                  typeof redactedCause === "object" &&
                  Object.isFrozen(redactedCause) &&
                  Object.keys(redactedCause).length === 1 &&
                  (redactedCause as { readonly code?: unknown }).code === "57P01",
              ).toBe(true);

              await inspectMigratedSchema(control, namespace, manifest);
              const beforeStatus = await captureCommittedState();
              expect(beforeStatus.history).toEqual([
                {
                  migration_id: mapping.migrationId,
                  source_sha256: mapping.sourceSha256,
                  applied_at: expect.stringMatching(
                    /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}Z$/u,
                  ),
                },
              ]);

              const status = await inspectMigrationStatus({
                target: namespace.target,
                buildRoot: artifact.buildRoot,
              });
              expect(status).toEqual({
                operation: "status",
                result: 0,
                buildId: artifact.buildId,
                checksumAgreement: true,
                applied: [
                  {
                    migrationId: mapping.migrationId,
                    sourceSha256: mapping.sourceSha256,
                  },
                ],
                pending: [],
                namespace: {
                  database: namespace.database,
                  schema: namespace.schema,
                  lockVersion: "v2",
                  lockKey: expect.stringMatching(/^-?[0-9]+$/u),
                },
                startup: {
                  startupClientEncoding: "UTF8",
                  startupSearchPath: "pg_catalog",
                  serverEncoding: "UTF8",
                  serverVersionNum: 180006,
                  currentUserName: control.user,
                  maxIdentifierLength: 63,
                  databaseIsTemplate: false,
                  databaseAllowsConnections: true,
                },
              });
              expect(await captureCommittedState()).toEqual(beforeStatus);

              expect(transactionPrototype.commit).toBe(originalCommit);
              expect(transactionInstances).toHaveLength(2);
              expect(closeInstances).toHaveLength(2);
              expect(transactionInstances[0]).toBe(closeInstances[0]);
              expect(transactionInstances[1]).toBe(closeInstances[1]);
              expect(transactionInstances[0]).not.toBe(transactionInstances[1]);
              expect(transactionObjects).toHaveLength(2);
              expect(new Set(sessionPids).size).toBe(2);
              expect(lockQueryCounts).toEqual([1, 1]);
              expect(closeCalls).toBe(2);

              const backendDeadline = Date.now() + 2_000;
              let activeBackends: readonly { readonly pid: number }[] = [];
              do {
                activeBackends = await withClient(
                  control,
                  async (client) =>
                    (
                      await client.query<{ pid: number }>(
                        `SELECT pid::integer AS pid
                           FROM pg_catalog.pg_stat_activity
                          WHERE datname = $1
                            AND application_name = 'rick-and-morty-explorer:migrations'
                          ORDER BY pid`,
                        [namespace.database],
                      )
                    ).rows,
                  namespace.database,
                );
                if (activeBackends.length > 0 && Date.now() < backendDeadline) {
                  await new Promise((resolveDelay) => setTimeout(resolveDelay, 25));
                }
              } while (activeBackends.length > 0 && Date.now() < backendDeadline);
              expect(activeBackends).toEqual([]);

              if (diagnostic.message !== "MIGRATION_COMMIT_AMBIGUOUS") {
                throw new Error(
                  "MIGRATION_COMMIT_AMBIGUOUS_DIAGNOSTIC_MISSING_AFTER_COMMIT",
                );
              }
            } catch (error) {
              operationFailure = error;
            } finally {
              transactionPrototype.commit = originalCommit;
              sequelizePrototype.transaction = originalTransaction;
              sequelizePrototype.close = originalClose;
            }

            expect(transactionPrototype.commit).toBe(originalCommit);
            expect(sequelizePrototype.transaction).toBe(originalTransaction);
            expect(sequelizePrototype.close).toBe(originalClose);
            if (operationFailure !== undefined) {
              throw operationFailure;
            }
          },
        });
      } catch (error) {
        primaryFailure = error;
      } finally {
        globalThis.fetch = originalFetch;
      }

      expect(await listOwnedDatabases(control)).toEqual([]);
      if (primaryFailure !== undefined) {
        throw primaryFailure;
      }
    },
  );
});
