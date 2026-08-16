import { createHash } from "node:crypto";
import { lstat, readFile, readdir, writeFile } from "node:fs/promises";
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

describe("migration artifact authored input identity", () => {
  it("publishes a distinct immutable build after an authored migration changes", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const first = await sandbox.migrationArtifact.buildMigrationArtifact();
      const firstAuthentication =
        await sandbox.migrationArtifact.verifyMigrationArtifact(first.buildRoot);
      expect(firstAuthentication.manifest.buildId).toBe(first.buildId);
      expect(firstAuthentication.manifestSha256).toBe(first.manifestSha256);
      const firstSnapshot = await snapshotFiles(first.buildRoot);

      const authoredMigration = join(
        sandbox.repositoryRoot,
        "apps/api/src/infrastructure/database/migrations/20260814000000-create-relational-schema.ts",
      );
      const originalSource = await readFile(authoredMigration, "utf8");
      await writeFile(
        authoredMigration,
        `${originalSource}\nexport const migrationArtifactIdentityFixture = true;\n`,
      );
      console.info(
        `MIGRATION_ARTIFACT_AUTHORED_INPUT_CHANGE_READY first=${first.buildId}`,
      );

      try {
        const second = await sandbox.migrationArtifact.buildMigrationArtifact();
        expect(second.buildId).not.toBe(first.buildId);
        expect(second.buildRoot).not.toBe(first.buildRoot);
        expect(second.manifestPath).not.toBe(first.manifestPath);
        expect(second.manifestSha256).not.toBe(first.manifestSha256);

        const secondAuthentication =
          await sandbox.migrationArtifact.verifyMigrationArtifact(
            second.buildRoot,
          );
        expect(secondAuthentication.manifest.buildId).toBe(second.buildId);
        expect(secondAuthentication.manifestSha256).toBe(second.manifestSha256);
        expect(await snapshotFiles(first.buildRoot)).toEqual(firstSnapshot);

        const publicationRoot = join(
          sandbox.repositoryRoot,
          "apps/api/dist/infrastructure/database/migrations/builds",
        );
        const publicationEntries = await readdir(publicationRoot, {
          withFileTypes: true,
        });
        expect(publicationEntries.map(({ name }) => name).sort()).toEqual(
          [first.buildId, second.buildId].sort(),
        );
        for (const entry of publicationEntries) {
          expect(entry.isDirectory()).toBe(true);
          const stats = await lstat(join(publicationRoot, entry.name));
          expect(stats.isDirectory()).toBe(true);
          expect(stats.isSymbolicLink()).toBe(false);
        }
        expect(
          publicationEntries.some(
            ({ name }) =>
              name.startsWith(".compile-") || name.startsWith(".staging-"),
          ),
        ).toBe(false);
      } catch (error) {
        throw new Error("MIGRATION_ARTIFACT_AUTHORED_INPUT_IDENTITY_MISSING", {
          cause: error,
        });
      }
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  }, 15_000);
});
