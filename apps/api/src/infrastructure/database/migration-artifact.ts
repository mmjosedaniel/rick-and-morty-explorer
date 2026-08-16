import { randomUUID } from "node:crypto";
import {
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import * as ts from "typescript";

import {
  canonicalizeArtifactPath,
  computeArtifactBuildId,
  deriveMigrationMappings,
  normalizeArtifactSource,
  sha256Hex,
  type ArtifactFile,
  type ArtifactInput,
  type ArtifactMapping,
} from "./migration-artifact-contract.js";

export interface MigrationManifest {
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

export interface ArtifactReport {
  readonly buildId: string;
  readonly buildRoot: string;
  readonly manifestPath: string;
  readonly manifestSha256: string;
}

const schemaVersion = "rick-and-morty-explorer:migration-artifact:v1";
const exactTypeScriptVersion = "6.0.3";
const exactNodeTarget = "node24";
const artifactRolePattern = /^[a-z][a-z0-9-]*$/u;
const asyncFunctionPrototype = Object.getPrototypeOf(async () => {});
const repositoryRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../..",
);
const authoredRoot = join(
  repositoryRoot,
  "apps/api/src/infrastructure/database/migrations",
);
const publicationRoot = join(
  repositoryRoot,
  "apps/api/dist/infrastructure/database/migrations/builds",
);
const manifestFilename = "migration-manifest.json";
const requiredManifestKeys = [
  "schemaVersion",
  "buildId",
  "toolchain",
  "inputs",
  "files",
  "mappings",
] as const;

interface SourceMapDocument {
  readonly sourceRoot?: unknown;
  readonly sources?: unknown;
  readonly [key: string]: unknown;
}

function hasCanonicalArtifactRole(value: unknown): boolean {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const role = (value as { readonly role?: unknown }).role;
  return typeof role === "string" && artifactRolePattern.test(role);
}

function isNativeAsyncFunction(value: unknown): boolean {
  return (
    typeof value === "function" &&
    Object.getPrototypeOf(value) === asyncFunctionPrototype
  );
}

function compareUtf8(left: string, right: string): number {
  return Buffer.compare(Buffer.from(left), Buffer.from(right));
}

function assertCanonicalPaths(paths: readonly string[]): void {
  const lowercase = new Set<string>();
  for (const path of paths) {
    if (canonicalizeArtifactPath(path, "posix") !== path) {
      throw new Error(`MIGRATION_ARTIFACT_PATH_INVALID path=${path}`);
    }
    const folded = path.toLowerCase();
    if (lowercase.has(folded)) {
      throw new Error(`MIGRATION_ARTIFACT_PATH_COLLISION path=${path}`);
    }
    lowercase.add(folded);
  }
  if ([...paths].sort(compareUtf8).some((path, index) => path !== paths[index])) {
    throw new Error("MIGRATION_ARTIFACT_PATH_ORDER_INVALID");
  }
}

async function listFiles(root: string): Promise<string[]> {
  const files: string[] = [];
  async function visit(directory: string): Promise<void> {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const absolute = join(directory, entry.name);
      const metadata = await lstat(absolute);
      if (metadata.isSymbolicLink()) {
        throw new Error("MIGRATION_ARTIFACT_SYMLINK_FORBIDDEN");
      }
      if (entry.isDirectory()) {
        await visit(absolute);
      } else if (entry.isFile()) {
        files.push(relative(root, absolute).replaceAll("\\", "/"));
      } else {
        throw new Error("MIGRATION_ARTIFACT_FILE_TYPE_INVALID");
      }
    }
  }
  await visit(root);
  return files.sort(compareUtf8);
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await lstat(path);
    return true;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

async function assertOrdinaryFixedComponents(targetRoot: string): Promise<void> {
  const components = relative(repositoryRoot, targetRoot).split(/[\\/]/u);
  let current = repositoryRoot;
  for (const component of components) {
    current = join(current, component);
    try {
      if ((await lstat(current)).isSymbolicLink()) {
        throw new Error("MIGRATION_ARTIFACT_SYMLINK_FORBIDDEN");
      }
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") {
        return;
      }
      throw error;
    }
  }
}

async function listMigrationSources(): Promise<string[]> {
  await assertOrdinaryFixedComponents(authoredRoot);
  if ((await lstat(authoredRoot)).isSymbolicLink()) {
    throw new Error("MIGRATION_ARTIFACT_SYMLINK_FORBIDDEN");
  }
  return (await listFiles(authoredRoot))
    .filter((path) => path.endsWith(".ts"))
    .map((path) => `apps/api/src/infrastructure/database/migrations/${path}`);
}

async function collectInputs(): Promise<ArtifactInput[]> {
  const paths = [
    "apps/api/package.json",
    "apps/api/src/infrastructure/database/migration-artifact-contract.ts",
    "apps/api/src/infrastructure/database/migration-artifact.ts",
    "apps/api/src/infrastructure/database/postgres-lifecycle.ts",
    "apps/api/tsconfig.json",
    "apps/api/tsconfig.migrations.json",
    "package-lock.json",
    "tsconfig.base.json",
    ...(await listMigrationSources()),
  ].sort(compareUtf8);
  assertCanonicalPaths(paths);
  return Promise.all(
    paths.map(async (path) => ({
      path,
      sourceSha256: sha256Hex(
        normalizeArtifactSource(await readFile(join(repositoryRoot, path))),
      ),
    })),
  );
}

async function runMigrationCompiler(outputRoot: string): Promise<void> {
  const configuration = join(repositoryRoot, "apps/api/tsconfig.migrations.json");
  const read = ts.readConfigFile(configuration, ts.sys.readFile);
  if (read.error !== undefined) {
    throw new Error(
      `MIGRATION_ARTIFACT_COMPILE_FAILED ${ts.flattenDiagnosticMessageText(read.error.messageText, "\n")}`,
    );
  }
  const parsed = ts.parseJsonConfigFileContent(
    read.config,
    ts.sys,
    dirname(configuration),
    { outDir: outputRoot },
    configuration,
  );
  const program = ts.createProgram(parsed.fileNames, parsed.options);
  const emit = program.emit();
  const diagnostics = [...ts.getPreEmitDiagnostics(program), ...emit.diagnostics];
  if (emit.emitSkipped || diagnostics.length > 0) {
    throw new Error(
      `MIGRATION_ARTIFACT_COMPILE_FAILED ${ts.formatDiagnosticsWithColorAndContext(
        diagnostics,
        {
          getCanonicalFileName: (path) => path,
          getCurrentDirectory: () => repositoryRoot,
          getNewLine: () => "\n",
        },
      )}`,
    );
  }
}

function publishedPathForCompilerPath(path: string): string {
  const migrationMatch = /^([0-9]{14}-[a-z0-9]+(?:-[a-z0-9]+)*)\.js(\.map)?$/u.exec(path);
  if (migrationMatch !== null) {
    return `files/${path}`;
  }
  return path;
}

function deriveRequiredPublishedPaths(
  inputs: readonly ArtifactInput[],
): string[] {
  const authoredPrefix = `${relative(repositoryRoot, authoredRoot).replaceAll("\\", "/")}/`;
  return inputs
    .flatMap(({ path }) => {
      if (!path.startsWith(authoredPrefix) || !path.endsWith(".ts")) {
        return [];
      }
      const compilerStem = path.slice(authoredPrefix.length, -3);
      return [
        publishedPathForCompilerPath(`${compilerStem}.js`),
        publishedPathForCompilerPath(`${compilerStem}.js.map`),
      ];
    })
    .sort(compareUtf8);
}

function roleFor(path: string): string {
  if (path.endsWith(".js.map")) {
    return "source-map";
  }
  if (path === "runner.js") {
    return "runner";
  }
  if (path === "command.js") {
    return "command";
  }
  if (/^files\/[0-9]{14}-[a-z0-9]+(?:-[a-z0-9]+)*\.js$/u.test(path)) {
    return "migration";
  }
  return "runtime";
}

async function rewriteSourceMap(options: {
  readonly compilerPath: string;
  readonly publishedPath: string;
  readonly inputs: readonly ArtifactInput[];
}): Promise<Uint8Array> {
  const value = JSON.parse(
    new TextDecoder("utf-8", { fatal: true }).decode(
      await readFile(options.compilerPath),
    ),
  ) as unknown;
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("MIGRATION_ARTIFACT_COMPILE_FAILED source map invalid");
  }
  const sourceMap = value as SourceMapDocument;
  const sourceRoot = sourceMap.sourceRoot ?? "";
  if (
    typeof sourceRoot !== "string" ||
    !Array.isArray(sourceMap.sources) ||
    sourceMap.sources.some(
      (source) => typeof source !== "string" || source.length === 0,
    )
  ) {
    throw new Error("MIGRATION_ARTIFACT_COMPILE_FAILED source map invalid");
  }

  const syntheticMapPath = join(
    publicationRoot,
    "source-map-build",
    options.publishedPath,
  );
  const sources = await Promise.all(
    sourceMap.sources.map(async (source) => {
      const sourcePath = resolve(
        dirname(options.compilerPath),
        sourceRoot,
        source as string,
      );
      const repositoryPath = relative(repositoryRoot, sourcePath).replaceAll(
        "\\",
        "/",
      );
      if (canonicalizeArtifactPath(repositoryPath, "posix") !== repositoryPath) {
        throw new Error(`MIGRATION_ARTIFACT_PATH_INVALID path=${repositoryPath}`);
      }
      const input = options.inputs.find(({ path }) => path === repositoryPath);
      if (
        input === undefined ||
        input.sourceSha256 !==
          sha256Hex(normalizeArtifactSource(await readFile(sourcePath)))
      ) {
        throw new Error("MIGRATION_ARTIFACT_INPUT_MISMATCH");
      }
      return relative(dirname(syntheticMapPath), sourcePath).replaceAll(
        "\\",
        "/",
      );
    }),
  );
  return new TextEncoder().encode(
    JSON.stringify({ ...sourceMap, sourceRoot: "", sources }),
  );
}

async function stageCompilerOutputs(
  compilerRoot: string,
  stagingRoot: string,
  inputs: readonly ArtifactInput[],
): Promise<ArtifactFile[]> {
  const compiledRoot = join(
    compilerRoot,
    "infrastructure/database/migrations",
  );
  const compiledPaths = await listFiles(compiledRoot);
  const publishedPaths = compiledPaths.map(publishedPathForCompilerPath).sort(compareUtf8);
  assertCanonicalPaths(publishedPaths);
  for (const compiledPath of compiledPaths) {
    const publishedPath = publishedPathForCompilerPath(compiledPath);
    const destination = join(stagingRoot, publishedPath);
    await mkdir(dirname(destination), { recursive: true });
    const compilerPath = join(compiledRoot, compiledPath);
    if (compiledPath.endsWith(".js.map")) {
      await writeFile(
        destination,
        await rewriteSourceMap({ compilerPath, publishedPath, inputs }),
      );
    } else {
      await copyFile(compilerPath, destination);
    }
  }
  return Promise.all(
    publishedPaths.map(async (path) => ({
      path,
      role: roleFor(path),
      sha256: sha256Hex(await readFile(join(stagingRoot, path))),
    })),
  );
}

function parseManifest(bytes: Uint8Array): MigrationManifest {
  const value = JSON.parse(
    new TextDecoder("utf-8", { fatal: true }).decode(bytes),
  ) as unknown;
  if (typeof value !== "object" || value === null) {
    throw new Error("MIGRATION_ARTIFACT_MANIFEST_INVALID");
  }
  const parsedKeys = new Set(Object.keys(value));
  if (
    parsedKeys.size !== requiredManifestKeys.length ||
    requiredManifestKeys.some((key) => !parsedKeys.has(key))
  ) {
    throw new Error("MIGRATION_ARTIFACT_MANIFEST_INVALID");
  }
  const toolchain = (value as { readonly toolchain?: unknown }).toolchain;
  if (
    typeof toolchain !== "object" ||
    toolchain === null ||
    Array.isArray(toolchain) ||
    Object.keys(toolchain).sort().join(",") !==
      "exactNodeTarget,exactTypeScriptVersion"
  ) {
    throw new Error("MIGRATION_ARTIFACT_MANIFEST_INVALID");
  }
  const inputs = (value as { readonly inputs?: unknown }).inputs;
  if (
    !Array.isArray(inputs) ||
    inputs.some(
      (input) =>
        typeof input !== "object" ||
        input === null ||
        Array.isArray(input) ||
        Object.keys(input).sort().join(",") !== "path,sourceSha256",
    )
  ) {
    throw new Error("MIGRATION_ARTIFACT_MANIFEST_INVALID");
  }
  const files = (value as { readonly files?: unknown }).files;
  if (
    !Array.isArray(files) ||
    files.some(
      (file) =>
        typeof file !== "object" ||
        file === null ||
        Array.isArray(file) ||
        Object.keys(file).sort().join(",") !== "path,role,sha256",
    )
  ) {
    throw new Error("MIGRATION_ARTIFACT_MANIFEST_INVALID");
  }
  const manifest = value as MigrationManifest;
  if (
    manifest.schemaVersion !== schemaVersion ||
    !/^[0-9a-f]{64}$/u.test(manifest.buildId) ||
    manifest.toolchain?.exactTypeScriptVersion !== exactTypeScriptVersion ||
    manifest.toolchain.exactNodeTarget !== exactNodeTarget ||
    !Array.isArray(manifest.mappings) ||
    manifest.files.some((file) => !hasCanonicalArtifactRole(file))
  ) {
    throw new Error("MIGRATION_ARTIFACT_MANIFEST_INVALID");
  }
  return manifest;
}

export async function verifyMigrationArtifact(
  buildRoot: string,
): Promise<{ readonly manifest: MigrationManifest; readonly manifestSha256: string }> {
  const absoluteRoot = resolve(buildRoot);
  const declaredPublicationRoot = dirname(absoluteRoot);
  if (declaredPublicationRoot !== publicationRoot) {
    throw new Error("MIGRATION_ARTIFACT_ROOT_INVALID");
  }
  await assertOrdinaryFixedComponents(declaredPublicationRoot);
  if ((await lstat(declaredPublicationRoot)).isSymbolicLink()) {
    throw new Error("MIGRATION_ARTIFACT_SYMLINK_FORBIDDEN");
  }
  if ((await lstat(absoluteRoot)).isSymbolicLink()) {
    throw new Error("MIGRATION_ARTIFACT_SYMLINK_FORBIDDEN");
  }
  const manifestPath = join(absoluteRoot, manifestFilename);
  const manifestBytes = await readFile(manifestPath);
  const manifest = parseManifest(manifestBytes);
  if (manifest.buildId !== absoluteRoot.slice(absoluteRoot.lastIndexOf("\\") + 1)) {
    const directoryName = absoluteRoot.split(/[\\/]/u).at(-1);
    if (manifest.buildId !== directoryName) {
      throw new Error("MIGRATION_ARTIFACT_BUILD_ID_MISMATCH");
    }
  }
  assertCanonicalPaths(manifest.inputs.map(({ path }) => path));
  assertCanonicalPaths(manifest.files.map(({ path }) => path));
  const requiredInputs = await collectInputs();
  if (
    requiredInputs.length !== manifest.inputs.length ||
    requiredInputs.some((requiredInput, index) => {
      const manifestInput = manifest.inputs[index];
      return (
        manifestInput?.path !== requiredInput.path ||
        manifestInput.sourceSha256 !== requiredInput.sourceSha256
      );
    })
  ) {
    throw new Error("MIGRATION_ARTIFACT_INPUT_MISMATCH");
  }
  const requiredPublishedPaths = deriveRequiredPublishedPaths(requiredInputs);
  const manifestPublishedPaths = manifest.files.map(({ path }) => path);
  if (
    requiredPublishedPaths.length !== manifestPublishedPaths.length ||
    requiredPublishedPaths.some(
      (path, index) => path !== manifestPublishedPaths[index],
    )
  ) {
    throw new Error("MIGRATION_ARTIFACT_FILE_SET_MISMATCH");
  }
  if (manifest.files.some(({ path, role }) => role !== roleFor(path))) {
    throw new Error("MIGRATION_ARTIFACT_MANIFEST_INVALID");
  }
  for (const file of manifest.files) {
    if (file.sha256 !== sha256Hex(await readFile(join(absoluteRoot, file.path)))) {
      throw new Error("MIGRATION_ARTIFACT_OUTPUT_MISMATCH");
    }
  }
  const actualFiles = await listFiles(absoluteRoot);
  const expectedFiles = [...manifest.files.map(({ path }) => path), manifestFilename].sort(
    compareUtf8,
  );
  if (actualFiles.join("\n") !== expectedFiles.join("\n")) {
    throw new Error("MIGRATION_ARTIFACT_FILE_SET_MISMATCH");
  }
  const reconstructedMappings = deriveMigrationMappings({
    authoredMigrationRoot: "apps/api/src/infrastructure/database/migrations",
    inputs: manifest.inputs,
    files: manifest.files,
  });
  if (JSON.stringify(reconstructedMappings) !== JSON.stringify(manifest.mappings)) {
    throw new Error("MIGRATION_ARTIFACT_MAPPING_MISMATCH");
  }
  const { buildId: ignoredBuildId, ...withoutBuildId } = manifest;
  void ignoredBuildId;
  if (computeArtifactBuildId(withoutBuildId) !== manifest.buildId) {
    throw new Error("MIGRATION_ARTIFACT_BUILD_ID_MISMATCH");
  }
  const runner = manifest.files.find(
    ({ path, role }) => role === "runner" && path.endsWith(".js"),
  );
  if (runner === undefined) {
    throw new Error("MIGRATION_ARTIFACT_RUNNER_MISSING");
  }
  const runnerModule = (await import(
    pathToFileURL(join(absoluteRoot, runner.path)).href
  )) as Record<string, unknown>;
  if (typeof runnerModule.runMigrationUp !== "function") {
    throw new Error("MIGRATION_ARTIFACT_RUNNER_INVALID");
  }
  const command = manifest.files.find(
    ({ path, role }) => path === "command.js" && role === "command",
  );
  if (command === undefined) {
    throw new Error("MIGRATION_ARTIFACT_COMMAND_MISSING");
  }
  const commandModule = (await import(
    pathToFileURL(join(absoluteRoot, command.path)).href
  )) as Record<string, unknown>;
  if (!isNativeAsyncFunction(commandModule.runMigrationCommand)) {
    throw new Error("MIGRATION_ARTIFACT_COMMAND_INVALID");
  }
  for (const mapping of manifest.mappings) {
    const migrationModule = (await import(
      pathToFileURL(join(absoluteRoot, mapping.emittedPath)).href
    )) as Record<string, unknown>;
    const migration = migrationModule.migration as Record<string, unknown> | undefined;
    if (
      typeof migration !== "object" ||
      migration === null ||
      !isNativeAsyncFunction(migration.up) ||
      !isNativeAsyncFunction(migration.down)
    ) {
      throw new Error("MIGRATION_ARTIFACT_MIGRATION_INVALID");
    }
  }
  return { manifest, manifestSha256: sha256Hex(manifestBytes) };
}

export async function buildMigrationArtifact(): Promise<ArtifactReport> {
  await assertOrdinaryFixedComponents(publicationRoot);
  await mkdir(publicationRoot, { recursive: true });
  const token = `${process.pid}-${randomUUID()}`;
  const compilerRoot = join(publicationRoot, `.compile-${token}`);
  const stagingRoot = join(publicationRoot, `.staging-${token}`);
  await mkdir(compilerRoot, { recursive: true });
  await mkdir(stagingRoot, { recursive: true });
  try {
    const inputs = await collectInputs();
    await runMigrationCompiler(compilerRoot);
    const files = await stageCompilerOutputs(compilerRoot, stagingRoot, inputs);
    const mappings = deriveMigrationMappings({
      authoredMigrationRoot: "apps/api/src/infrastructure/database/migrations",
      inputs,
      files,
    });
    const withoutBuildId: Omit<MigrationManifest, "buildId"> = {
      schemaVersion,
      toolchain: { exactTypeScriptVersion, exactNodeTarget },
      inputs,
      files,
      mappings,
    };
    const buildId = computeArtifactBuildId(withoutBuildId);
    const manifest: MigrationManifest = { ...withoutBuildId, buildId };
    const manifestBytes = new TextEncoder().encode(
      `${JSON.stringify(manifest, null, 2)}\n`,
    );
    await writeFile(join(stagingRoot, manifestFilename), manifestBytes);
    const buildRoot = join(publicationRoot, buildId);
    if (await pathExists(buildRoot)) {
      await verifyMigrationArtifact(buildRoot);
      await rm(stagingRoot, { recursive: true, force: true });
    } else {
      try {
        await rename(stagingRoot, buildRoot);
      } catch (error) {
        const code =
          error instanceof Error && "code" in error ? error.code : undefined;
        if (code !== "EEXIST" && code !== "ENOTEMPTY" && code !== "EPERM") {
          throw error;
        }
        await verifyMigrationArtifact(buildRoot);
        await rm(stagingRoot, { recursive: true, force: true });
      }
    }
    const verified = await verifyMigrationArtifact(buildRoot);
    return {
      buildId,
      buildRoot,
      manifestPath: join(buildRoot, manifestFilename),
      manifestSha256: verified.manifestSha256,
    };
  } finally {
    await Promise.all([
      rm(compilerRoot, { recursive: true, force: true }),
      rm(stagingRoot, { recursive: true, force: true }),
    ]);
  }
}
