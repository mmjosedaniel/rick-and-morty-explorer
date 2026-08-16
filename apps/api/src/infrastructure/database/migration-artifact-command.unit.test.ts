import { readFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { describe, expect, it } from "vitest";

import {
  canonicalizeArtifactPath,
  normalizeArtifactSource,
  sha256Hex,
} from "./migration-artifact-contract.js";
import {
  buildMigrationArtifact,
  verifyMigrationArtifact,
} from "./migration-artifact.js";

interface SourceMapDocument {
  readonly sourceRoot?: unknown;
  readonly sources?: unknown;
}

const repositoryRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../..",
);

describe("migration artifact command boundary", () => {
  it("publishes an authenticated asynchronous command boundary", async () => {
    const artifact = await buildMigrationArtifact();
    const authentication = await verifyMigrationArtifact(artifact.buildRoot);
    expect(authentication.manifest.buildId).toBe(artifact.buildId);
    expect(authentication.manifestSha256).toBe(artifact.manifestSha256);
    console.info(
      `MIGRATION_ARTIFACT_COMMAND_AUTHENTICATED build=${artifact.buildId} files=${authentication.manifest.files.length}`,
    );

    const commandInputPath =
      "apps/api/src/infrastructure/database/migrations/command.ts";
    const commandOutputPath = "command.js";
    const commandMapPath = "command.js.map";
    const commandInputs = authentication.manifest.inputs.filter(
      ({ path }) => path === commandInputPath,
    );
    const commandFiles = authentication.manifest.files.filter(
      ({ path, role }) => path === commandOutputPath && role === "command",
    );
    const commandMaps = authentication.manifest.files.filter(
      ({ path, role }) => path === commandMapPath && role === "source-map",
    );

    if (
      commandInputs.length !== 1 ||
      commandFiles.length !== 1 ||
      commandMaps.length !== 1
    ) {
      throw new Error(
        "MIGRATION_ARTIFACT_COMMAND_BOUNDARY_MISSING_AFTER_AUTHENTICATION",
      );
    }

    const [commandInput] = commandInputs;
    const [commandFile] = commandFiles;
    const [commandMap] = commandMaps;
    expect(commandInput).toBeDefined();
    expect(commandFile).toBeDefined();
    expect(commandMap).toBeDefined();
    if (
      commandInput === undefined ||
      commandFile === undefined ||
      commandMap === undefined
    ) {
      throw new Error(
        "MIGRATION_ARTIFACT_COMMAND_BOUNDARY_MISSING_AFTER_AUTHENTICATION",
      );
    }

    const commandBytes = await readFile(
      resolve(artifact.buildRoot, commandFile.path),
    );
    expect(sha256Hex(commandBytes)).toBe(commandFile.sha256);

    const mapPath = resolve(artifact.buildRoot, commandMap.path);
    const mapBytes = await readFile(mapPath);
    expect(sha256Hex(mapBytes)).toBe(commandMap.sha256);
    const sourceMap = JSON.parse(
      new TextDecoder("utf-8", { fatal: true }).decode(mapBytes),
    ) as SourceMapDocument;
    expect(sourceMap.sources).toEqual([expect.any(String)]);
    const source = Array.isArray(sourceMap.sources)
      ? sourceMap.sources[0]
      : undefined;
    const sourceRoot = sourceMap.sourceRoot ?? "";
    expect(typeof source).toBe("string");
    expect(typeof sourceRoot).toBe("string");
    if (typeof source !== "string" || typeof sourceRoot !== "string") {
      throw new Error("MIGRATION_ARTIFACT_COMMAND_SOURCE_MAP_INVALID");
    }
    const sourcePath = resolve(dirname(mapPath), sourceRoot, source);
    const repositoryPath = relative(repositoryRoot, sourcePath).replaceAll(
      "\\",
      "/",
    );
    expect(canonicalizeArtifactPath(repositoryPath, "posix")).toBe(
      commandInput.path,
    );
    expect(
      sha256Hex(normalizeArtifactSource(await readFile(sourcePath))),
    ).toBe(commandInput.sourceSha256);

    const commandModule = (await import(
      pathToFileURL(resolve(artifact.buildRoot, commandFile.path)).href
    )) as Record<string, unknown>;
    expect(Object.keys(commandModule)).toEqual(["runMigrationCommand"]);
    expect(
      Object.prototype.propertyIsEnumerable.call(
        commandModule,
        "runMigrationCommand",
      ),
    ).toBe(true);
    const runMigrationCommand = commandModule.runMigrationCommand;
    expect(runMigrationCommand).toBeTypeOf("function");
    expect(Object.getPrototypeOf(runMigrationCommand)).toBe(
      Object.getPrototypeOf(async () => undefined),
    );
  }, 15_000);
});
