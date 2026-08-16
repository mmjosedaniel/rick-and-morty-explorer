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
