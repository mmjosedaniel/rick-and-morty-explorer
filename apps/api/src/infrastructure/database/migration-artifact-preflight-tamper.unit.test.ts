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

describe("migration artifact preflight tamper categories", () => {
  it.each([
    "runner",
    "resolver",
    "storage",
    "lock",
    "migration",
    "source-map",
    "manifest",
    "mapping-only",
    "missing-file",
    "extra-file",
  ] as const)("rejects isolated $caseName tampering", async (caseName) => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const artifact = await sandbox.migrationArtifact.buildMigrationArtifact();
      const authentication =
        await sandbox.migrationArtifact.verifyMigrationArtifact(
          artifact.buildRoot,
        );
      const manifest = authentication.manifest;

      const directPath =
        caseName === "runner"
          ? manifest.files.find(({ role }) => role === "runner")?.path
          : caseName === "resolver"
            ? "files/resolver.js"
            : caseName === "storage"
              ? "files/storage.js"
              : caseName === "lock"
                ? "files/lock.js"
                : caseName === "migration"
                  ? manifest.files.find(({ role }) => role === "migration")?.path
                  : caseName === "source-map"
                    ? manifest.files
                        .filter(({ role }) => role === "source-map")
                        .map(({ path }) => path)
                        .sort()[0]
                    : undefined;

      if (directPath !== undefined) {
        const selected = manifest.files.filter(
          ({ path }) => path === directPath,
        );
        expect(selected).toHaveLength(1);
        const selectedPath = join(artifact.buildRoot, directPath);
        expect((await lstat(selectedPath)).isFile()).toBe(true);
        await writeFile(
          selectedPath,
          Buffer.concat([
            await readFile(selectedPath),
            Buffer.from("\ntampered artifact bytes\n"),
          ]),
        );
      } else if (caseName === "manifest" || caseName === "mapping-only") {
        const document = JSON.parse(
          await readFile(artifact.manifestPath, "utf8"),
        ) as Record<string, unknown>;
        if (caseName === "manifest") {
          document.schemaVersion =
            "rick-and-morty-explorer:migration-artifact:tampered";
        } else {
          const mappings = document.mappings;
          expect(Array.isArray(mappings)).toBe(true);
          if (!Array.isArray(mappings) || mappings.length !== 1) {
            throw new Error("MIGRATION_ARTIFACT_MAPPING_FIXTURE_INVALID");
          }
          const mapping = mappings[0];
          expect(mapping).toBeTypeOf("object");
          if (mapping === null || typeof mapping !== "object") {
            throw new Error("MIGRATION_ARTIFACT_MAPPING_FIXTURE_INVALID");
          }
          const record = mapping as Record<string, unknown>;
          record.sourceSha256 = "0".repeat(64);
        }
        await writeFile(
          artifact.manifestPath,
          `${JSON.stringify(document, undefined, 2)}\n`,
        );
      } else if (caseName === "missing-file") {
        const missingPath = join(artifact.buildRoot, "files/constants.js");
        expect((await lstat(missingPath)).isFile()).toBe(true);
        await rm(missingPath);
      } else {
        const extraPath = join(
          artifact.buildRoot,
          "files/unexpected-runtime.js",
        );
        await writeFile(extraPath, "export const unexpected = true;\n");
      }

      const tamperedSnapshot = await snapshotFiles(artifact.buildRoot);
      console.info(
        `MIGRATION_ARTIFACT_PREFLIGHT_TAMPER_READY case=${caseName} build=${artifact.buildId}`,
      );

      let rejection: unknown;
      try {
        await sandbox.migrationArtifact.verifyMigrationArtifact(
          artifact.buildRoot,
        );
      } catch (error) {
        rejection = error;
      }
      if (rejection === undefined) {
        throw new Error(
          `MIGRATION_ARTIFACT_PREFLIGHT_TAMPER_ACCEPTED case=${caseName}`,
        );
      }
      expect(rejection).toBeInstanceOf(Error);
      expect(await snapshotFiles(artifact.buildRoot)).toEqual(tamperedSnapshot);

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
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  });
});
