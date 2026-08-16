import { createHash } from "node:crypto";
import { lstat, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

import { describe, expect, it } from "vitest";

import {
  createMigrationArtifactSandbox,
  removeMigrationArtifactSandbox,
} from "./migration-artifact-sandbox.test.js";

interface FileSnapshot {
  readonly path: string;
  readonly sha256: string;
}

async function snapshotFiles(root: string): Promise<readonly FileSnapshot[]> {
  const snapshot: FileSnapshot[] = [];

  const visit = async (directory: string): Promise<void> => {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(path);
      } else {
        expect(entry.isFile()).toBe(true);
        snapshot.push({
          path: relative(root, path).replaceAll("\\", "/"),
          sha256: createHash("sha256").update(await readFile(path)).digest("hex"),
        });
      }
    }
  };

  await visit(root);
  return snapshot.sort((left, right) => left.path.localeCompare(right.path));
}

describe("invalid migration artifact publication reuse", () => {
  it.each(["incomplete", "conflicting"] as const)(
    "rejects an existing $caseName content-addressed publication without changing it",
    async (caseName) => {
      const sandbox = await createMigrationArtifactSandbox();
      try {
        const artifact = await sandbox.migrationArtifact.buildMigrationArtifact();
        const authentication =
          await sandbox.migrationArtifact.verifyMigrationArtifact(
            artifact.buildRoot,
          );
        const selectedFile = authentication.manifest.files.find(
          ({ path }) => path === "files/constants.js",
        );
        expect(selectedFile).toBeDefined();
        if (selectedFile === undefined) {
          throw new Error("MIGRATION_ARTIFACT_PUBLICATION_FIXTURE_MISSING");
        }
        const selectedPath = join(artifact.buildRoot, selectedFile.path);
        expect((await lstat(selectedPath)).isFile()).toBe(true);

        if (caseName === "incomplete") {
          await rm(selectedPath);
        } else {
          await writeFile(
            selectedPath,
            new TextEncoder().encode("conflicting publication bytes\n"),
          );
        }
        const corruptedSnapshot = await snapshotFiles(artifact.buildRoot);
        console.info(
          `MIGRATION_ARTIFACT_INVALID_PUBLICATION_READY case=${caseName} build=${artifact.buildId}`,
        );

        let rejection: unknown;
        try {
          await sandbox.migrationArtifact.buildMigrationArtifact();
        } catch (error) {
          rejection = error;
        }

        try {
          expect(rejection).toBeInstanceOf(Error);
          expect((await lstat(artifact.buildRoot)).isDirectory()).toBe(true);
          expect((await lstat(artifact.buildRoot)).isSymbolicLink()).toBe(false);
          expect(await snapshotFiles(artifact.buildRoot)).toEqual(
            corruptedSnapshot,
          );

          const publicationRoot = join(
            sandbox.repositoryRoot,
            "apps/api/dist/infrastructure/database/migrations/builds",
          );
          const publicationEntries = await readdir(publicationRoot);
          expect(publicationEntries).toEqual([artifact.buildId]);
          expect(
            publicationEntries.some(
              (name) =>
                name.startsWith(".compile-") || name.startsWith(".staging-"),
            ),
          ).toBe(false);
        } catch (error) {
          throw new Error(
            `MIGRATION_ARTIFACT_INVALID_PUBLICATION_REUSED case=${caseName}`,
            { cause: error },
          );
        }
      } finally {
        await removeMigrationArtifactSandbox(sandbox);
      }
    },
    15_000,
  );
});
