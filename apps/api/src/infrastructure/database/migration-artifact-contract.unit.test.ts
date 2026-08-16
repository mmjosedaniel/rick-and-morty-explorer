import { describe, expect, it } from "vitest";

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

interface ArtifactIdentity {
  readonly schemaVersion: string;
  readonly toolchain: {
    readonly exactTypeScriptVersion: string;
    readonly exactNodeTarget: string;
  };
  readonly inputs: readonly ArtifactInput[];
  readonly files: readonly ArtifactFile[];
  readonly mappings: readonly ArtifactMapping[];
}

interface MigrationArtifactContractModule {
  readonly canonicalizeArtifactPath: (
    rawPath: string,
    platform: "windows" | "posix",
  ) => string;
  readonly normalizeArtifactSource: (rawBytes: Uint8Array) => Uint8Array;
  readonly sha256Hex: (bytes: Uint8Array) => string;
  readonly deriveMigrationMappings: (options: {
    readonly authoredMigrationRoot: string;
    readonly inputs: readonly ArtifactInput[];
    readonly files: readonly ArtifactFile[];
  }) => readonly ArtifactMapping[];
  readonly computeArtifactBuildId: (identity: ArtifactIdentity) => string;
}

function isMissingArtifactContract(error: unknown): boolean {
  return (
    error instanceof Error &&
    "code" in error &&
    error.code === "ERR_MODULE_NOT_FOUND" &&
    error.message.includes("migration-artifact-contract.js")
  );
}

async function loadArtifactContract(): Promise<MigrationArtifactContractModule> {
  const contractSpecifier = "./migration-artifact-contract.js";
  let module: Record<string, unknown>;
  try {
    module = (await import(
      /* @vite-ignore */ contractSpecifier
    )) as Record<string, unknown>;
  } catch (error) {
    if (!isMissingArtifactContract(error)) {
      throw error;
    }
    throw new Error("MIGRATION_ARTIFACT_CONFORMANCE_BOUNDARY_MISSING", {
      cause: error,
    });
  }

  expect(module.canonicalizeArtifactPath).toBeTypeOf("function");
  expect(module.normalizeArtifactSource).toBeTypeOf("function");
  expect(module.sha256Hex).toBeTypeOf("function");
  expect(module.deriveMigrationMappings).toBeTypeOf("function");
  expect(module.computeArtifactBuildId).toBeTypeOf("function");
  return module as unknown as MigrationArtifactContractModule;
}

describe("migration artifact contract", () => {
  it("reproduces the accepted artifact conformance vector", async () => {
    const contract = await loadArtifactContract();
    const schemaVersion = "rick-and-morty-explorer:migration-artifact:v1";
    const authoredMigrationRoot =
      "apps/api/src/infrastructure/database/migrations";
    const migrationId = "20260810120000-create-character";
    const canonicalSourcePath =
      `${authoredMigrationRoot}/${migrationId}.ts`;
    const canonicalEmittedPath = `files/${migrationId}.js`;
    const canonicalSource =
      'export const migrationName: string = "create-character";\n';
    const exactOutput = 'export const migrationName = "create-character";\n';

    expect(
      contract.canonicalizeArtifactPath(
        "apps\\api\\src\\infrastructure\\database\\migrations\\20260810120000-create-character.ts",
        "windows",
      ),
    ).toBe(canonicalSourcePath);
    expect(
      contract.canonicalizeArtifactPath(
        "files\\20260810120000-create-character.js",
        "windows",
      ),
    ).toBe(canonicalEmittedPath);

    const normalizedCrlf = contract.normalizeArtifactSource(
      new TextEncoder().encode(
        'export const migrationName: string = "create-character";\r\n',
      ),
    );
    const normalizedLoneCr = contract.normalizeArtifactSource(
      new TextEncoder().encode(
        'export const migrationName: string = "create-character";\r',
      ),
    );
    const canonicalSourceBytes = new TextEncoder().encode(canonicalSource);
    expect(normalizedCrlf).toEqual(canonicalSourceBytes);
    expect(normalizedLoneCr).toEqual(canonicalSourceBytes);

    const sourceSha256 = contract.sha256Hex(normalizedCrlf);
    const emittedSha256 = contract.sha256Hex(
      new TextEncoder().encode(exactOutput),
    );
    expect(sourceSha256).toBe(
      "50b2fc1f722c6a548997474cf1fe6bcd096211351835ed0e443c273e47ac0477",
    );
    expect(emittedSha256).toBe(
      "c4dcdd6d42e18ec45edf64d7ca74ad6706b5d8db8767a71b62c17036a9447bdf",
    );

    const inputs: readonly ArtifactInput[] = [
      { path: canonicalSourcePath, sourceSha256 },
    ];
    const files: readonly ArtifactFile[] = [
      {
        path: canonicalEmittedPath,
        role: "migration",
        sha256: emittedSha256,
      },
    ];
    const mappings = contract.deriveMigrationMappings({
      authoredMigrationRoot,
      inputs,
      files,
    });
    expect(mappings).toEqual([
      {
        migrationId,
        sourcePath: canonicalSourcePath,
        sourceSha256,
        emittedPath: canonicalEmittedPath,
        emittedSha256,
      },
    ]);

    const identity: ArtifactIdentity = {
      schemaVersion,
      toolchain: {
        exactTypeScriptVersion: "5.9.3",
        exactNodeTarget: "node24",
      },
      inputs,
      files,
      mappings,
    };
    expect(contract.computeArtifactBuildId(identity)).toBe(
      "e825ac106c1bb8f5af041646699c4e2398b832a55dca90c54155db4195bf37a5",
    );

    expect(
      contract.computeArtifactBuildId({
        ...identity,
        mappings: [
          {
            ...mappings[0]!,
            migrationId: "20260810120000-create-comment",
          },
        ],
      }),
    ).toBe("1b9470376a7b0878b9679efd3707f9d2696415b5e50ebefbe76a21262d34aaf5");
  });

  it("rejects noncanonical paths and invalid source bytes before artifact identity", async () => {
    const contract = await loadArtifactContract();

    expect(() =>
      contract.normalizeArtifactSource(
        Uint8Array.of(0xef, 0xbb, 0xbf, ...new TextEncoder().encode("valid")),
      ),
    ).toThrowError("MIGRATION_ARTIFACT_SOURCE_BOM");
    expect(() =>
      contract.normalizeArtifactSource(Uint8Array.of(0xc3, 0x28)),
    ).toThrow();

    const fixtures: readonly {
      readonly label: string;
      readonly rawPath: string;
      readonly platform: "windows" | "posix";
    }[] = [
      { label: "empty", rawPath: "", platform: "posix" },
      { label: "absolute", rawPath: "/files/example.js", platform: "posix" },
      { label: "final-separator", rawPath: "files/", platform: "posix" },
      { label: "repeated-separator", rawPath: "files//example.js", platform: "posix" },
      { label: "windows-drive", rawPath: "C:\\files\\example.js", platform: "windows" },
      { label: "windows-unc", rawPath: "\\\\server\\share\\example.js", platform: "windows" },
      { label: "windows-device-path", rawPath: "\\\\?\\C:\\files\\example.js", platform: "windows" },
      { label: "dot-segment", rawPath: "files/./example.js", platform: "posix" },
      { label: "dot-dot-segment", rawPath: "files/../example.js", platform: "posix" },
      { label: "terminal-period", rawPath: "files/example.", platform: "posix" },
      { label: "non-ascii", rawPath: "files/café.js", platform: "posix" },
      { label: "nul", rawPath: "files/example\u0000.js", platform: "posix" },
      { label: "posix-reverse-solidus", rawPath: "files\\example.js", platform: "posix" },
      { label: "stored-windows-device", rawPath: "files/CON.js", platform: "posix" },
    ];
    const accepted: string[] = [];

    for (const fixture of fixtures) {
      try {
        contract.canonicalizeArtifactPath(fixture.rawPath, fixture.platform);
        accepted.push(fixture.label);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe(
          `MIGRATION_ARTIFACT_PATH_INVALID path=${fixture.rawPath}`,
        );
      }
    }

    if (accepted.length > 0) {
      throw new Error(
        `MIGRATION_ARTIFACT_PATH_REJECTION_INCOMPLETE accepted=${accepted.join(",")}`,
      );
    }
  });
});
