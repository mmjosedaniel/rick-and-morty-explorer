import { createHash } from "node:crypto";

export interface ArtifactInput {
  readonly path: string;
  readonly sourceSha256: string;
}

export interface ArtifactFile {
  readonly path: string;
  readonly role: string;
  readonly sha256: string;
}

export interface ArtifactMapping {
  readonly migrationId: string;
  readonly sourcePath: string;
  readonly sourceSha256: string;
  readonly emittedPath: string;
  readonly emittedSha256: string;
}

export interface ArtifactIdentity {
  readonly schemaVersion: string;
  readonly toolchain: {
    readonly exactTypeScriptVersion: string;
    readonly exactNodeTarget: string;
  };
  readonly inputs: readonly ArtifactInput[];
  readonly files: readonly ArtifactFile[];
  readonly mappings: readonly ArtifactMapping[];
}

const migrationIdPattern = /^[0-9]{14}-[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const pathSegmentPattern = /^[A-Za-z0-9._-]+$/u;
const windowsDeviceBasenamePattern =
  /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/iu;

function compareUtf8(left: string, right: string): number {
  return Buffer.compare(Buffer.from(left), Buffer.from(right));
}

export function canonicalizeArtifactPath(
  rawPath: string,
  platform: "windows" | "posix",
): string {
  const projected = platform === "windows" ? rawPath.replaceAll("\\", "/") : rawPath;
  if (
    projected.length === 0 ||
    projected.startsWith("/") ||
    projected.endsWith("/") ||
    projected.includes("//")
  ) {
    throw new Error(`MIGRATION_ARTIFACT_PATH_INVALID path=${rawPath}`);
  }

  const segments = projected.split("/");
  for (const segment of segments) {
    if (
      segment === "." ||
      segment === ".." ||
      segment.endsWith(".") ||
      !pathSegmentPattern.test(segment) ||
      windowsDeviceBasenamePattern.test(segment)
    ) {
      throw new Error(`MIGRATION_ARTIFACT_PATH_INVALID path=${rawPath}`);
    }
  }
  return segments.join("/");
}

export function normalizeArtifactSource(rawBytes: Uint8Array): Uint8Array {
  if (
    rawBytes.length >= 3 &&
    rawBytes[0] === 0xef &&
    rawBytes[1] === 0xbb &&
    rawBytes[2] === 0xbf
  ) {
    throw new Error("MIGRATION_ARTIFACT_SOURCE_BOM");
  }
  const decoded = new TextDecoder("utf-8", { fatal: true }).decode(rawBytes);
  return new TextEncoder().encode(
    decoded.replaceAll("\r\n", "\n").replaceAll("\r", "\n"),
  );
}

export function sha256Hex(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

export function deriveMigrationMappings(options: {
  readonly authoredMigrationRoot: string;
  readonly inputs: readonly ArtifactInput[];
  readonly files: readonly ArtifactFile[];
}): readonly ArtifactMapping[] {
  const authoredMigrationRoot = canonicalizeArtifactPath(
    options.authoredMigrationRoot,
    "posix",
  );
  const sourcePattern = new RegExp(
    `^${authoredMigrationRoot.replaceAll("/", "\\/")}\\/([0-9]{14}-[a-z0-9]+(?:-[a-z0-9]+)*)\\.ts$`,
    "u",
  );
  const emittedPattern =
    /^files\/([0-9]{14}-[a-z0-9]+(?:-[a-z0-9]+)*)\.js$/u;

  const sources = new Map<string, ArtifactInput>();
  for (const input of options.inputs) {
    if (canonicalizeArtifactPath(input.path, "posix") !== input.path) {
      throw new Error(`MIGRATION_ARTIFACT_PATH_INVALID path=${input.path}`);
    }
    const match = sourcePattern.exec(input.path);
    if (match === null) {
      continue;
    }
    const migrationId = match[1]!;
    if (!migrationIdPattern.test(migrationId) || sources.has(migrationId)) {
      throw new Error("MIGRATION_ARTIFACT_MAPPING_INCOMPLETE");
    }
    sources.set(migrationId, input);
  }

  const outputs = new Map<string, ArtifactFile>();
  for (const file of options.files) {
    if (canonicalizeArtifactPath(file.path, "posix") !== file.path) {
      throw new Error(`MIGRATION_ARTIFACT_PATH_INVALID path=${file.path}`);
    }
    if (file.role !== "migration") {
      continue;
    }
    const match = emittedPattern.exec(file.path);
    if (match === null || outputs.has(match[1]!)) {
      throw new Error("MIGRATION_ARTIFACT_MAPPING_INCOMPLETE");
    }
    outputs.set(match[1]!, file);
  }

  const sourceIds = [...sources.keys()].sort(compareUtf8);
  const outputIds = [...outputs.keys()].sort(compareUtf8);
  if (
    sourceIds.length !== outputIds.length ||
    sourceIds.some((migrationId, index) => migrationId !== outputIds[index])
  ) {
    throw new Error("MIGRATION_ARTIFACT_MAPPING_INCOMPLETE");
  }

  return sourceIds.map((migrationId) => {
    const source = sources.get(migrationId)!;
    const emitted = outputs.get(migrationId)!;
    return {
      migrationId,
      sourcePath: source.path,
      sourceSha256: source.sourceSha256,
      emittedPath: emitted.path,
      emittedSha256: emitted.sha256,
    };
  });
}

function lengthPrefix(value: string): Buffer {
  const bytes = Buffer.from(value, "utf8");
  const framed = Buffer.allocUnsafe(4 + bytes.length);
  framed.writeUInt32BE(bytes.length, 0);
  bytes.copy(framed, 4);
  return framed;
}

export function computeArtifactBuildId(identity: ArtifactIdentity): string {
  const frames = [
    lengthPrefix(identity.schemaVersion),
    lengthPrefix(identity.toolchain.exactTypeScriptVersion),
    lengthPrefix(identity.toolchain.exactNodeTarget),
    lengthPrefix("inputs"),
    lengthPrefix(String(identity.inputs.length)),
  ];
  for (const input of identity.inputs) {
    frames.push(lengthPrefix(input.path), lengthPrefix(input.sourceSha256));
  }
  frames.push(lengthPrefix("outputs"), lengthPrefix(String(identity.files.length)));
  for (const file of identity.files) {
    frames.push(
      lengthPrefix(file.path),
      lengthPrefix(file.role),
      lengthPrefix(file.sha256),
    );
  }
  frames.push(
    lengthPrefix("mappings"),
    lengthPrefix(String(identity.mappings.length)),
  );
  for (const mapping of identity.mappings) {
    frames.push(
      lengthPrefix(mapping.migrationId),
      lengthPrefix(mapping.sourcePath),
      lengthPrefix(mapping.sourceSha256),
      lengthPrefix(mapping.emittedPath),
      lengthPrefix(mapping.emittedSha256),
    );
  }
  return sha256Hex(Buffer.concat(frames));
}
