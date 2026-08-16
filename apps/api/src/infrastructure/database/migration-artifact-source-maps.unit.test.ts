import { lstat, readFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import {
  canonicalizeArtifactPath,
  normalizeArtifactSource,
  sha256Hex,
} from "./migration-artifact-contract.js";
import {
  buildMigrationArtifact,
  type MigrationManifest,
} from "./migration-artifact.js";

interface SourceMapDocument {
  readonly sourceRoot?: unknown;
  readonly sources: unknown;
}

const repositoryRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../..",
);

async function isOrdinaryFile(path: string): Promise<boolean> {
  try {
    return (await lstat(path)).isFile();
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return false;
    }
    throw error;
  }
}

describe("migration artifact source maps", () => {
  it("publishes source maps that resolve to authenticated authored inputs", async () => {
    const artifact = await buildMigrationArtifact();
    const manifest = JSON.parse(
      new TextDecoder("utf-8", { fatal: true }).decode(
        await readFile(artifact.manifestPath),
      ),
    ) as MigrationManifest;
    const sourceMapFiles = manifest.files.filter(
      (file) => file.role === "source-map",
    );
    expect(sourceMapFiles.length).toBeGreaterThan(0);

    const resolvedTargets: Array<{
      readonly mapPath: string;
      readonly targetPath: string;
    }> = [];
    const missingTargets: string[] = [];

    for (const sourceMapFile of sourceMapFiles) {
      const mapPath = resolve(artifact.buildRoot, sourceMapFile.path);
      const mapBytes = await readFile(mapPath);
      expect(sha256Hex(mapBytes)).toBe(sourceMapFile.sha256);

      const sourceMap = JSON.parse(
        new TextDecoder("utf-8", { fatal: true }).decode(mapBytes),
      ) as SourceMapDocument;
      expect(Array.isArray(sourceMap.sources)).toBe(true);
      if (!Array.isArray(sourceMap.sources)) {
        throw new Error("MIGRATION_ARTIFACT_SOURCE_MAP_SOURCES_INVALID");
      }
      expect(sourceMap.sources).toHaveLength(1);
      const [source] = sourceMap.sources;
      expect(typeof source).toBe("string");
      expect(source).not.toBe("");
      if (typeof source !== "string" || source.length === 0) {
        throw new Error("MIGRATION_ARTIFACT_SOURCE_MAP_SOURCE_INVALID");
      }

      const sourceRoot = sourceMap.sourceRoot ?? "";
      expect(typeof sourceRoot).toBe("string");
      if (typeof sourceRoot !== "string") {
        throw new Error("MIGRATION_ARTIFACT_SOURCE_MAP_ROOT_INVALID");
      }

      const targetPath = resolve(dirname(mapPath), sourceRoot, source);
      resolvedTargets.push({ mapPath, targetPath });
      if (!(await isOrdinaryFile(targetPath))) {
        missingTargets.push(sourceMapFile.path);
      }
    }

    if (missingTargets.length > 0) {
      console.info(
        `MIGRATION_ARTIFACT_SOURCE_MAP_TARGETS maps=${sourceMapFiles.length} missing=${missingTargets.length}`,
      );
      throw new Error("MIGRATION_ARTIFACT_SOURCE_MAP_TARGET_MISSING");
    }

    for (const { targetPath } of resolvedTargets) {
      const repositoryPath = relative(repositoryRoot, targetPath).replaceAll(
        "\\",
        "/",
      );
      expect(canonicalizeArtifactPath(repositoryPath, "posix")).toBe(
        repositoryPath,
      );
      const authenticatedInput = manifest.inputs.find(
        (input) => input.path === repositoryPath,
      );
      expect(authenticatedInput).toBeDefined();
      if (authenticatedInput === undefined) {
        throw new Error("MIGRATION_ARTIFACT_SOURCE_MAP_INPUT_MISSING");
      }
      expect(
        sha256Hex(normalizeArtifactSource(await readFile(targetPath))),
      ).toBe(authenticatedInput.sourceSha256);
    }
  });
});
