import { createHash } from "node:crypto";
import { lstat, readFile, readdir } from "node:fs/promises";
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

describe("migration artifact publication lifecycle", () => {
  it("converges concurrent first publication and immutably reuses it", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    const publicationRoot = join(
      sandbox.repositoryRoot,
      "apps/api/dist/infrastructure/database/migrations/builds",
    );

    try {
      expect(await pathExists(publicationRoot)).toBe(false);
      console.info(
        `MIGRATION_ARTIFACT_PUBLICATION_LIFECYCLE_READY sandbox=${sandbox.root}`,
      );

      try {
        const [first, second] = await Promise.all([
          sandbox.migrationArtifact.buildMigrationArtifact(),
          sandbox.migrationArtifact.buildMigrationArtifact(),
        ]);
        expect(second).toEqual(first);

        const [firstAuthentication, secondAuthentication] = await Promise.all([
          sandbox.migrationArtifact.verifyMigrationArtifact(first.buildRoot),
          sandbox.migrationArtifact.verifyMigrationArtifact(second.buildRoot),
        ]);
        expect(firstAuthentication.manifest.buildId).toBe(first.buildId);
        expect(secondAuthentication.manifest.buildId).toBe(second.buildId);
        expect(firstAuthentication.manifestSha256).toBe(first.manifestSha256);
        expect(secondAuthentication.manifestSha256).toBe(second.manifestSha256);

        const publicationEntries = await readdir(publicationRoot, {
          withFileTypes: true,
        });
        expect(
          publicationEntries.map(({ name }) => name).sort(),
        ).toEqual([first.buildId]);
        expect(publicationEntries[0]?.isDirectory()).toBe(true);
        expect(
          publicationEntries.some(({ name }) =>
            name.startsWith(".compile-") || name.startsWith(".staging-"),
          ),
        ).toBe(false);

        const beforeReuse = await snapshotFiles(first.buildRoot);
        expect(beforeReuse.length).toBeGreaterThan(0);
        const reused = await sandbox.migrationArtifact.buildMigrationArtifact();
        expect(reused).toEqual(first);
        expect(await snapshotFiles(reused.buildRoot)).toEqual(beforeReuse);
        expect(
          (await readdir(publicationRoot)).some(
            (name) =>
              name.startsWith(".compile-") || name.startsWith(".staging-"),
          ),
        ).toBe(false);
      } catch (error) {
        throw new Error("MIGRATION_ARTIFACT_PUBLICATION_LIFECYCLE_INCOMPLETE", {
          cause: error,
        });
      }
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  }, 15_000);
});
