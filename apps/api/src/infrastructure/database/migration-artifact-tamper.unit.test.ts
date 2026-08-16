import {
  cp,
  lstat,
  readFile,
  rename,
  symlink,
  unlink,
  writeFile,
} from "node:fs/promises";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import type { ArtifactIdentity } from "./migration-artifact-contract.js";
import type { MigrationManifest } from "./migration-artifact.js";
import {
  createMigrationArtifactSandbox,
  removeMigrationArtifactSandbox,
} from "./migration-artifact-sandbox.test.js";

describe("migration artifact tamper resistance", () => {
  it("rejects a self-consistent artifact with a noncanonical file role", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const validArtifact =
        await sandbox.migrationArtifact.buildMigrationArtifact();
      await sandbox.migrationArtifact.verifyMigrationArtifact(
        validArtifact.buildRoot,
      );
      const validManifest = JSON.parse(
        new TextDecoder("utf-8", { fatal: true }).decode(
          await readFile(validArtifact.manifestPath),
        ),
      ) as MigrationManifest;
      const runtimeFile = validManifest.files.find(
        (file) =>
          file.role === "runtime" &&
          file.path !== "runner.js" &&
          !/^files\/[0-9]{14}-/u.test(file.path),
      );
      expect(runtimeFile).toBeDefined();
      if (runtimeFile === undefined) {
        throw new Error("MIGRATION_ARTIFACT_RUNTIME_FIXTURE_MISSING");
      }

      const files = validManifest.files.map((file) =>
        file.path === runtimeFile.path ? { ...file, role: "Runtime" } : file,
      );
      const identity: ArtifactIdentity = {
        schemaVersion: validManifest.schemaVersion,
        toolchain: validManifest.toolchain,
        inputs: validManifest.inputs,
        files,
        mappings: validManifest.mappings,
      };
      const buildId = sandbox.contract.computeArtifactBuildId(identity);
      const tamperedRoot = join(
        sandbox.repositoryRoot,
        "apps/api/dist/infrastructure/database/migrations/builds",
        buildId,
      );
      await cp(validArtifact.buildRoot, tamperedRoot, { recursive: true });
      const tamperedManifest: MigrationManifest = { ...identity, buildId };
      await writeFile(
        join(tamperedRoot, "migration-manifest.json"),
        `${JSON.stringify(tamperedManifest, null, 2)}\n`,
      );

      try {
        await sandbox.migrationArtifact.verifyMigrationArtifact(tamperedRoot);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "MIGRATION_ARTIFACT_MANIFEST_INVALID"
        ) {
          return;
        }
        throw error;
      }
      throw new Error("MIGRATION_ARTIFACT_NONCANONICAL_ROLE_ACCEPTED");
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  }, 15_000);

  it("rejects a self-consistent artifact missing a required authored input", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const validArtifact =
        await sandbox.migrationArtifact.buildMigrationArtifact();
      await sandbox.migrationArtifact.verifyMigrationArtifact(
        validArtifact.buildRoot,
      );
      const validManifest = JSON.parse(
        new TextDecoder("utf-8", { fatal: true }).decode(
          await readFile(validArtifact.manifestPath),
        ),
      ) as MigrationManifest;
      const omittedPath = "apps/api/package.json";
      const omittedInputs = validManifest.inputs.filter(
        (input) => input.path === omittedPath,
      );
      expect(omittedInputs).toHaveLength(1);

      const inputs = validManifest.inputs.filter(
        (input) => input.path !== omittedPath,
      );
      const identity: ArtifactIdentity = {
        schemaVersion: validManifest.schemaVersion,
        toolchain: validManifest.toolchain,
        inputs,
        files: validManifest.files,
        mappings: validManifest.mappings,
      };
      const buildId = sandbox.contract.computeArtifactBuildId(identity);
      const tamperedRoot = join(
        sandbox.repositoryRoot,
        "apps/api/dist/infrastructure/database/migrations/builds",
        buildId,
      );
      await cp(validArtifact.buildRoot, tamperedRoot, { recursive: true });
      const tamperedManifest: MigrationManifest = { ...identity, buildId };
      await writeFile(
        join(tamperedRoot, "migration-manifest.json"),
        `${JSON.stringify(tamperedManifest, null, 2)}\n`,
      );

      try {
        await sandbox.migrationArtifact.verifyMigrationArtifact(tamperedRoot);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "MIGRATION_ARTIFACT_INPUT_MISMATCH"
        ) {
          return;
        }
        throw error;
      }
      throw new Error("MIGRATION_ARTIFACT_REQUIRED_INPUT_OMISSION_ACCEPTED");
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  });

  it("rejects a self-consistent artifact missing a required published output", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const validArtifact =
        await sandbox.migrationArtifact.buildMigrationArtifact();
      await sandbox.migrationArtifact.verifyMigrationArtifact(
        validArtifact.buildRoot,
      );
      const validManifest = JSON.parse(
        new TextDecoder("utf-8", { fatal: true }).decode(
          await readFile(validArtifact.manifestPath),
        ),
      ) as MigrationManifest;
      const omittedPath = "files/constants.js.map";
      const omittedFiles = validManifest.files.filter(
        (file) => file.path === omittedPath && file.role === "source-map",
      );
      expect(omittedFiles).toHaveLength(1);
      expect(
        validManifest.mappings.some(
          (mapping) => mapping.emittedPath === omittedPath,
        ),
      ).toBe(false);

      const files = validManifest.files.filter(
        (file) => file.path !== omittedPath,
      );
      const identity: ArtifactIdentity = {
        schemaVersion: validManifest.schemaVersion,
        toolchain: validManifest.toolchain,
        inputs: validManifest.inputs,
        files,
        mappings: validManifest.mappings,
      };
      const buildId = sandbox.contract.computeArtifactBuildId(identity);
      const tamperedRoot = join(
        sandbox.repositoryRoot,
        "apps/api/dist/infrastructure/database/migrations/builds",
        buildId,
      );
      await cp(validArtifact.buildRoot, tamperedRoot, { recursive: true });
      const omittedOutput = join(tamperedRoot, omittedPath);
      expect((await lstat(omittedOutput)).isFile()).toBe(true);
      await unlink(omittedOutput);
      const tamperedManifest: MigrationManifest = { ...identity, buildId };
      await writeFile(
        join(tamperedRoot, "migration-manifest.json"),
        `${JSON.stringify(tamperedManifest, null, 2)}\n`,
      );

      try {
        await sandbox.migrationArtifact.verifyMigrationArtifact(tamperedRoot);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "MIGRATION_ARTIFACT_FILE_SET_MISMATCH"
        ) {
          return;
        }
        throw error;
      }
      throw new Error("MIGRATION_ARTIFACT_REQUIRED_OUTPUT_OMISSION_ACCEPTED");
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  });

  it("rejects a self-consistent artifact with a role that does not match its published path", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const validArtifact =
        await sandbox.migrationArtifact.buildMigrationArtifact();
      await sandbox.migrationArtifact.verifyMigrationArtifact(
        validArtifact.buildRoot,
      );
      const validManifest = JSON.parse(
        new TextDecoder("utf-8", { fatal: true }).decode(
          await readFile(validArtifact.manifestPath),
        ),
      ) as MigrationManifest;
      const mismatchedPath = "files/constants.js";
      const runtimeFiles = validManifest.files.filter(
        (file) => file.path === mismatchedPath && file.role === "runtime",
      );
      expect(runtimeFiles).toHaveLength(1);
      expect(
        validManifest.mappings.some(
          (mapping) => mapping.emittedPath === mismatchedPath,
        ),
      ).toBe(false);

      const files = validManifest.files.map((file) =>
        file.path === mismatchedPath ? { ...file, role: "source-map" } : file,
      );
      const identity: ArtifactIdentity = {
        schemaVersion: validManifest.schemaVersion,
        toolchain: validManifest.toolchain,
        inputs: validManifest.inputs,
        files,
        mappings: validManifest.mappings,
      };
      const buildId = sandbox.contract.computeArtifactBuildId(identity);
      const tamperedRoot = join(
        sandbox.repositoryRoot,
        "apps/api/dist/infrastructure/database/migrations/builds",
        buildId,
      );
      await cp(validArtifact.buildRoot, tamperedRoot, { recursive: true });
      const tamperedManifest: MigrationManifest = { ...identity, buildId };
      await writeFile(
        join(tamperedRoot, "migration-manifest.json"),
        `${JSON.stringify(tamperedManifest, null, 2)}\n`,
      );

      try {
        await sandbox.migrationArtifact.verifyMigrationArtifact(tamperedRoot);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "MIGRATION_ARTIFACT_MANIFEST_INVALID"
        ) {
          return;
        }
        throw error;
      }
      throw new Error("MIGRATION_ARTIFACT_ROLE_PATH_MISMATCH_ACCEPTED");
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  });

  it("rejects a selected build root that links outside the publication root", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const validArtifact =
        await sandbox.migrationArtifact.buildMigrationArtifact();
      await sandbox.migrationArtifact.verifyMigrationArtifact(
        validArtifact.buildRoot,
      );

      const movedRoot = join(
        sandbox.repositoryRoot,
        `outside-publication-${validArtifact.buildId}`,
      );
      await rename(validArtifact.buildRoot, movedRoot);
      let rootLinkCreated = false;
      try {
        await symlink(
          movedRoot,
          validArtifact.buildRoot,
          process.platform === "win32" ? "junction" : "dir",
        );
        rootLinkCreated = true;
        expect((await lstat(validArtifact.buildRoot)).isSymbolicLink()).toBe(
          true,
        );
        const targetMetadata = await lstat(movedRoot);
        expect(targetMetadata.isDirectory()).toBe(true);
        expect(targetMetadata.isSymbolicLink()).toBe(false);

        try {
          await sandbox.migrationArtifact.verifyMigrationArtifact(
            validArtifact.buildRoot,
          );
        } catch (error) {
          if (
            error instanceof Error &&
            error.message === "MIGRATION_ARTIFACT_SYMLINK_FORBIDDEN"
          ) {
            return;
          }
          throw error;
        }
        throw new Error("MIGRATION_ARTIFACT_ROOT_LINK_ACCEPTED");
      } finally {
        if (rootLinkCreated) {
          await unlink(validArtifact.buildRoot);
          await expect(lstat(validArtifact.buildRoot)).rejects.toMatchObject({
            code: "ENOENT",
          });
          const remainingTarget = await lstat(movedRoot);
          expect(remainingTarget.isDirectory()).toBe(true);
          expect(remainingTarget.isSymbolicLink()).toBe(false);
        }
      }
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  });

  it("rejects an authenticated manifest with an unknown top-level field", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const validArtifact =
        await sandbox.migrationArtifact.buildMigrationArtifact();
      await sandbox.migrationArtifact.verifyMigrationArtifact(
        validArtifact.buildRoot,
      );
      const validManifest = JSON.parse(
        new TextDecoder("utf-8", { fatal: true }).decode(
          await readFile(validArtifact.manifestPath),
        ),
      ) as MigrationManifest;
      const manifestWithUnknownField = {
        ...validManifest,
        unexpectedField: "not-part-of-the-artifact-schema",
      };
      await writeFile(
        validArtifact.manifestPath,
        `${JSON.stringify(manifestWithUnknownField, null, 2)}\n`,
      );

      try {
        await sandbox.migrationArtifact.verifyMigrationArtifact(
          validArtifact.buildRoot,
        );
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "MIGRATION_ARTIFACT_MANIFEST_INVALID"
        ) {
          return;
        }
        throw error;
      }
      throw new Error("MIGRATION_ARTIFACT_UNKNOWN_MANIFEST_FIELD_ACCEPTED");
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  });

  it("rejects a self-consistent artifact with an unknown toolchain field", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const validArtifact =
        await sandbox.migrationArtifact.buildMigrationArtifact();
      await sandbox.migrationArtifact.verifyMigrationArtifact(
        validArtifact.buildRoot,
      );
      const validManifest = JSON.parse(
        new TextDecoder("utf-8", { fatal: true }).decode(
          await readFile(validArtifact.manifestPath),
        ),
      ) as MigrationManifest;
      const manifestWithUnknownToolchainField = {
        ...validManifest,
        toolchain: {
          ...validManifest.toolchain,
          unexpectedField: "not-part-of-the-toolchain-schema",
        },
      };
      await writeFile(
        validArtifact.manifestPath,
        `${JSON.stringify(manifestWithUnknownToolchainField, null, 2)}\n`,
      );

      try {
        await sandbox.migrationArtifact.verifyMigrationArtifact(
          validArtifact.buildRoot,
        );
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "MIGRATION_ARTIFACT_MANIFEST_INVALID"
        ) {
          return;
        }
        throw error;
      }
      throw new Error("MIGRATION_ARTIFACT_UNKNOWN_TOOLCHAIN_FIELD_ACCEPTED");
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  });

  it("rejects a self-consistent artifact with an unknown input field", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const validArtifact =
        await sandbox.migrationArtifact.buildMigrationArtifact();
      await sandbox.migrationArtifact.verifyMigrationArtifact(
        validArtifact.buildRoot,
      );
      const validManifest = JSON.parse(
        new TextDecoder("utf-8", { fatal: true }).decode(
          await readFile(validArtifact.manifestPath),
        ),
      ) as MigrationManifest;
      const inputPath = "apps/api/package.json";
      expect(
        validManifest.inputs.filter((input) => input.path === inputPath),
      ).toHaveLength(1);
      const inputs = validManifest.inputs.map((input) =>
        input.path === inputPath
          ? {
              ...input,
              unexpectedField: "not-part-of-the-input-schema",
            }
          : input,
      );
      const manifestWithUnknownInputField = { ...validManifest, inputs };
      await writeFile(
        validArtifact.manifestPath,
        `${JSON.stringify(manifestWithUnknownInputField, null, 2)}\n`,
      );

      try {
        await sandbox.migrationArtifact.verifyMigrationArtifact(
          validArtifact.buildRoot,
        );
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "MIGRATION_ARTIFACT_MANIFEST_INVALID"
        ) {
          return;
        }
        throw error;
      }
      throw new Error("MIGRATION_ARTIFACT_UNKNOWN_INPUT_FIELD_ACCEPTED");
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  });

  it("rejects a self-consistent artifact with an unknown file field", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const validArtifact =
        await sandbox.migrationArtifact.buildMigrationArtifact();
      await sandbox.migrationArtifact.verifyMigrationArtifact(
        validArtifact.buildRoot,
      );
      const validManifest = JSON.parse(
        new TextDecoder("utf-8", { fatal: true }).decode(
          await readFile(validArtifact.manifestPath),
        ),
      ) as MigrationManifest;
      const filePath = "files/constants.js";
      expect(
        validManifest.files.filter(
          (file) => file.path === filePath && file.role === "runtime",
        ),
      ).toHaveLength(1);
      const files = validManifest.files.map((file) =>
        file.path === filePath
          ? {
              ...file,
              unexpectedField: "not-part-of-the-file-schema",
            }
          : file,
      );
      const manifestWithUnknownFileField = { ...validManifest, files };
      await writeFile(
        validArtifact.manifestPath,
        `${JSON.stringify(manifestWithUnknownFileField, null, 2)}\n`,
      );

      try {
        await sandbox.migrationArtifact.verifyMigrationArtifact(
          validArtifact.buildRoot,
        );
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "MIGRATION_ARTIFACT_MANIFEST_INVALID"
        ) {
          return;
        }
        throw error;
      }
      throw new Error("MIGRATION_ARTIFACT_UNKNOWN_FILE_FIELD_ACCEPTED");
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  });

  it("rejects a selected build beneath a linked publication root", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const validArtifact =
        await sandbox.migrationArtifact.buildMigrationArtifact();
      await sandbox.migrationArtifact.verifyMigrationArtifact(
        validArtifact.buildRoot,
      );

      const publicationRoot = join(
        sandbox.repositoryRoot,
        "apps/api/dist/infrastructure/database/migrations/builds",
      );
      const movedPublicationRoot = join(
        sandbox.repositoryRoot,
        `outside-publication-root-${validArtifact.buildId}`,
      );
      await rename(publicationRoot, movedPublicationRoot);
      let publicationRootLinkCreated = false;
      try {
        await symlink(
          movedPublicationRoot,
          publicationRoot,
          process.platform === "win32" ? "junction" : "dir",
        );
        publicationRootLinkCreated = true;
        expect((await lstat(publicationRoot)).isSymbolicLink()).toBe(true);
        const movedRootMetadata = await lstat(movedPublicationRoot);
        expect(movedRootMetadata.isDirectory()).toBe(true);
        expect(movedRootMetadata.isSymbolicLink()).toBe(false);
        const movedBuildMetadata = await lstat(
          join(movedPublicationRoot, validArtifact.buildId),
        );
        expect(movedBuildMetadata.isDirectory()).toBe(true);
        expect(movedBuildMetadata.isSymbolicLink()).toBe(false);

        try {
          await sandbox.migrationArtifact.verifyMigrationArtifact(
            validArtifact.buildRoot,
          );
        } catch (error) {
          if (
            error instanceof Error &&
            error.message === "MIGRATION_ARTIFACT_SYMLINK_FORBIDDEN"
          ) {
            return;
          }
          throw error;
        }
        throw new Error("MIGRATION_ARTIFACT_PUBLICATION_ROOT_LINK_ACCEPTED");
      } finally {
        if (publicationRootLinkCreated) {
          await unlink(publicationRoot);
          await expect(lstat(publicationRoot)).rejects.toMatchObject({
            code: "ENOENT",
          });
          const remainingRoot = await lstat(movedPublicationRoot);
          expect(remainingRoot.isDirectory()).toBe(true);
          expect(remainingRoot.isSymbolicLink()).toBe(false);
          const remainingBuild = await lstat(
            join(movedPublicationRoot, validArtifact.buildId),
          );
          expect(remainingBuild.isDirectory()).toBe(true);
          expect(remainingBuild.isSymbolicLink()).toBe(false);
        }
      }
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  });

  it("rejects a self-consistent artifact with synchronous migration exports", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const validArtifact =
        await sandbox.migrationArtifact.buildMigrationArtifact();
      await sandbox.migrationArtifact.verifyMigrationArtifact(
        validArtifact.buildRoot,
      );
      const validManifest = JSON.parse(
        new TextDecoder("utf-8", { fatal: true }).decode(
          await readFile(validArtifact.manifestPath),
        ),
      ) as MigrationManifest;
      expect(validManifest.mappings).toHaveLength(1);
      const mapping = validManifest.mappings[0];
      expect(mapping).toBeDefined();
      if (mapping === undefined) {
        throw new Error("MIGRATION_ARTIFACT_MAPPING_FIXTURE_MISSING");
      }
      expect(
        validManifest.files.filter(
          (file) =>
            file.path === mapping.emittedPath && file.role === "migration",
        ),
      ).toHaveLength(1);

      const contract = sandbox.contract as typeof sandbox.contract & {
        readonly sha256Hex: (bytes: Uint8Array) => string;
      };
      const synchronousMigration = new TextEncoder().encode(
        "export const migration = {\n  up() {},\n  down() {},\n};\n",
      );
      const emittedSha256 = contract.sha256Hex(synchronousMigration);
      const files = validManifest.files.map((file) =>
        file.path === mapping.emittedPath
          ? { ...file, sha256: emittedSha256 }
          : file,
      );
      const mappings = validManifest.mappings.map((entry) =>
        entry.migrationId === mapping.migrationId
          ? { ...entry, emittedSha256 }
          : entry,
      );
      const identity: ArtifactIdentity = {
        schemaVersion: validManifest.schemaVersion,
        toolchain: validManifest.toolchain,
        inputs: validManifest.inputs,
        files,
        mappings,
      };
      const buildId = contract.computeArtifactBuildId(identity);
      expect(buildId).not.toBe(validArtifact.buildId);
      const tamperedRoot = join(
        sandbox.repositoryRoot,
        "apps/api/dist/infrastructure/database/migrations/builds",
        buildId,
      );
      await cp(validArtifact.buildRoot, tamperedRoot, { recursive: true });
      await writeFile(
        join(tamperedRoot, mapping.emittedPath),
        synchronousMigration,
      );
      const tamperedManifest: MigrationManifest = { ...identity, buildId };
      await writeFile(
        join(tamperedRoot, "migration-manifest.json"),
        `${JSON.stringify(tamperedManifest, null, 2)}\n`,
      );

      try {
        await sandbox.migrationArtifact.verifyMigrationArtifact(tamperedRoot);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "MIGRATION_ARTIFACT_MIGRATION_INVALID"
        ) {
          return;
        }
        throw error;
      }
      throw new Error("MIGRATION_ARTIFACT_SYNCHRONOUS_MIGRATION_ACCEPTED");
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  });

  it("rejects an authenticated artifact while the authored migration root is linked", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const validArtifact =
        await sandbox.migrationArtifact.buildMigrationArtifact();
      await sandbox.migrationArtifact.verifyMigrationArtifact(
        validArtifact.buildRoot,
      );

      const authoredRoot = join(
        sandbox.repositoryRoot,
        "apps/api/src/infrastructure/database/migrations",
      );
      const movedAuthoredRoot = join(
        sandbox.repositoryRoot,
        `outside-authored-root-${validArtifact.buildId}`,
      );
      const migrationFileName =
        "20260814000000-create-relational-schema.ts";
      await rename(authoredRoot, movedAuthoredRoot);
      let authoredRootLinkCreated = false;
      try {
        await symlink(
          movedAuthoredRoot,
          authoredRoot,
          process.platform === "win32" ? "junction" : "dir",
        );
        authoredRootLinkCreated = true;
        expect((await lstat(authoredRoot)).isSymbolicLink()).toBe(true);
        const movedRootMetadata = await lstat(movedAuthoredRoot);
        expect(movedRootMetadata.isDirectory()).toBe(true);
        expect(movedRootMetadata.isSymbolicLink()).toBe(false);
        const movedMigrationMetadata = await lstat(
          join(movedAuthoredRoot, migrationFileName),
        );
        expect(movedMigrationMetadata.isFile()).toBe(true);
        expect(movedMigrationMetadata.isSymbolicLink()).toBe(false);

        try {
          await sandbox.migrationArtifact.verifyMigrationArtifact(
            validArtifact.buildRoot,
          );
        } catch (error) {
          if (
            error instanceof Error &&
            error.message === "MIGRATION_ARTIFACT_SYMLINK_FORBIDDEN"
          ) {
            return;
          }
          throw error;
        }
        throw new Error("MIGRATION_ARTIFACT_AUTHORED_ROOT_LINK_ACCEPTED");
      } finally {
        if (authoredRootLinkCreated) {
          await unlink(authoredRoot);
          await expect(lstat(authoredRoot)).rejects.toMatchObject({
            code: "ENOENT",
          });
          const remainingRoot = await lstat(movedAuthoredRoot);
          expect(remainingRoot.isDirectory()).toBe(true);
          expect(remainingRoot.isSymbolicLink()).toBe(false);
          const remainingMigration = await lstat(
            join(movedAuthoredRoot, migrationFileName),
          );
          expect(remainingMigration.isFile()).toBe(true);
          expect(remainingMigration.isSymbolicLink()).toBe(false);
        }
      }
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  });

  it("rejects build and verification through a linked repository component", async () => {
    const sandbox = await createMigrationArtifactSandbox();
    try {
      const validArtifact =
        await sandbox.migrationArtifact.buildMigrationArtifact();
      await sandbox.migrationArtifact.verifyMigrationArtifact(
        validArtifact.buildRoot,
      );

      const apiRoot = join(sandbox.repositoryRoot, "apps/api");
      const movedApiRoot = join(
        sandbox.repositoryRoot,
        `outside-api-root-${validArtifact.buildId}`,
      );
      const migrationRelativePath =
        "src/infrastructure/database/migrations/20260814000000-create-relational-schema.ts";
      const buildRelativePath = join(
        "dist/infrastructure/database/migrations/builds",
        validArtifact.buildId,
      );
      await rename(apiRoot, movedApiRoot);
      let apiRootLinkCreated = false;
      try {
        await symlink(
          movedApiRoot,
          apiRoot,
          process.platform === "win32" ? "junction" : "dir",
        );
        apiRootLinkCreated = true;
        expect((await lstat(apiRoot)).isSymbolicLink()).toBe(true);
        const movedRootMetadata = await lstat(movedApiRoot);
        expect(movedRootMetadata.isDirectory()).toBe(true);
        expect(movedRootMetadata.isSymbolicLink()).toBe(false);
        const packageMetadata = await lstat(join(movedApiRoot, "package.json"));
        expect(packageMetadata.isFile()).toBe(true);
        expect(packageMetadata.isSymbolicLink()).toBe(false);
        const migrationMetadata = await lstat(
          join(movedApiRoot, migrationRelativePath),
        );
        expect(migrationMetadata.isFile()).toBe(true);
        expect(migrationMetadata.isSymbolicLink()).toBe(false);
        const buildMetadata = await lstat(
          join(movedApiRoot, buildRelativePath),
        );
        expect(buildMetadata.isDirectory()).toBe(true);
        expect(buildMetadata.isSymbolicLink()).toBe(false);

        const accepted: string[] = [];
        try {
          await sandbox.migrationArtifact.verifyMigrationArtifact(
            validArtifact.buildRoot,
          );
          accepted.push("verify");
        } catch (error) {
          if (
            !(error instanceof Error) ||
            error.message !== "MIGRATION_ARTIFACT_SYMLINK_FORBIDDEN"
          ) {
            throw error;
          }
        }

        try {
          const reusedArtifact =
            await sandbox.migrationArtifact.buildMigrationArtifact();
          expect(reusedArtifact.buildId).toBe(validArtifact.buildId);
          expect(reusedArtifact.buildRoot).toBe(validArtifact.buildRoot);
          accepted.push("build");
        } catch (error) {
          if (
            !(error instanceof Error) ||
            error.message !== "MIGRATION_ARTIFACT_SYMLINK_FORBIDDEN"
          ) {
            throw error;
          }
        }

        if (accepted.length > 0) {
          throw new Error(
            `MIGRATION_ARTIFACT_INTERMEDIATE_ROOT_LINK_ACCEPTED accepted=${accepted.join(",")}`,
          );
        }
      } finally {
        if (apiRootLinkCreated) {
          await unlink(apiRoot);
          await expect(lstat(apiRoot)).rejects.toMatchObject({
            code: "ENOENT",
          });
          const remainingRoot = await lstat(movedApiRoot);
          expect(remainingRoot.isDirectory()).toBe(true);
          expect(remainingRoot.isSymbolicLink()).toBe(false);
          const remainingPackage = await lstat(
            join(movedApiRoot, "package.json"),
          );
          expect(remainingPackage.isFile()).toBe(true);
          expect(remainingPackage.isSymbolicLink()).toBe(false);
          const remainingMigration = await lstat(
            join(movedApiRoot, migrationRelativePath),
          );
          expect(remainingMigration.isFile()).toBe(true);
          expect(remainingMigration.isSymbolicLink()).toBe(false);
          const remainingBuild = await lstat(
            join(movedApiRoot, buildRelativePath),
          );
          expect(remainingBuild.isDirectory()).toBe(true);
          expect(remainingBuild.isSymbolicLink()).toBe(false);
        }
      }
    } finally {
      await removeMigrationArtifactSandbox(sandbox);
    }
  });
});
