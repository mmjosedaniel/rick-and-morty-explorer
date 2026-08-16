import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

import ts from "typescript";

import type { ArtifactIdentity } from "./migration-artifact-contract.js";
import type {
  ArtifactReport,
  MigrationManifest,
} from "./migration-artifact.js";

interface SandboxArtifactModule {
  readonly buildMigrationArtifact: () => Promise<ArtifactReport>;
  readonly verifyMigrationArtifact: (
    buildRoot: string,
  ) => Promise<{
    readonly manifest: MigrationManifest;
    readonly manifestSha256: string;
  }>;
}

interface SandboxContractModule {
  readonly computeArtifactBuildId: (identity: ArtifactIdentity) => string;
}

export interface MigrationArtifactSandbox {
  readonly contract: SandboxContractModule;
  readonly migrationArtifact: SandboxArtifactModule;
  readonly repositoryRoot: string;
  readonly root: string;
}

const realRepositoryRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../..",
);
const sandboxParent = join(
  realRepositoryRoot,
  "apps/api/dist/task-004-artifact-test-sandboxes",
);

const copiedFiles = [
  "tsconfig.base.json",
  "package-lock.json",
  "apps/api/package.json",
  "apps/api/tsconfig.json",
  "apps/api/tsconfig.migrations.json",
  "apps/api/src/infrastructure/database/migration-artifact.ts",
  "apps/api/src/infrastructure/database/migration-artifact-contract.ts",
  "apps/api/src/infrastructure/database/postgres-lifecycle.ts",
] as const;

async function copyRepositoryFixture(sandboxRoot: string): Promise<void> {
  for (const path of copiedFiles) {
    const destination = join(sandboxRoot, path);
    await mkdir(dirname(destination), { recursive: true });
    await cp(join(realRepositoryRoot, path), destination);
  }
  await cp(
    join(
      realRepositoryRoot,
      "apps/api/src/infrastructure/database/migrations",
    ),
    join(
      sandboxRoot,
      "apps/api/src/infrastructure/database/migrations",
    ),
    { recursive: true },
  );
}

async function transpileModule(sourcePath: string): Promise<void> {
  const result = ts.transpileModule(await readFile(sourcePath, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      target: ts.ScriptTarget.ES2023,
      verbatimModuleSyntax: true,
    },
    fileName: sourcePath,
    reportDiagnostics: true,
  });
  if ((result.diagnostics?.length ?? 0) > 0) {
    throw new Error("MIGRATION_ARTIFACT_SANDBOX_TRANSPILE_FAILED");
  }
  await writeFile(sourcePath.replace(/\.ts$/u, ".js"), result.outputText);
}

export async function createMigrationArtifactSandbox(): Promise<MigrationArtifactSandbox> {
  await mkdir(sandboxParent, { recursive: true });
  const root = await mkdtemp(join(sandboxParent, `${process.pid}-`));
  try {
    await copyRepositoryFixture(root);
    const databaseRoot = join(
      root,
      "apps/api/src/infrastructure/database",
    );
    const contractPath = join(databaseRoot, "migration-artifact-contract.ts");
    const artifactPath = join(databaseRoot, "migration-artifact.ts");
    await transpileModule(contractPath);
    await transpileModule(artifactPath);

    const cacheKey = `${process.pid}-${Date.now()}`;
    const contract = (await import(
      `${pathToFileURL(contractPath.replace(/\.ts$/u, ".js")).href}?${cacheKey}`
    )) as SandboxContractModule;
    const migrationArtifact = (await import(
      `${pathToFileURL(artifactPath.replace(/\.ts$/u, ".js")).href}?${cacheKey}`
    )) as SandboxArtifactModule;
    return { contract, migrationArtifact, repositoryRoot: root, root };
  } catch (error) {
    await rm(root, { recursive: true, force: true });
    throw error;
  }
}

export async function removeMigrationArtifactSandbox(
  sandbox: MigrationArtifactSandbox,
): Promise<void> {
  await rm(sandbox.root, { recursive: true, force: true });
}
