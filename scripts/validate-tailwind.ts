import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const webRoot = resolve("apps/web");
const manifestPath = resolve(webRoot, "dist/.vite/manifest.json");
const htmlPath = resolve(webRoot, "dist/index.html");
const shellPath = resolve(webRoot, "src/shell.tsx");

function readManifestEntry(value: unknown): { css: [string] } {
  if (typeof value !== "object" || value === null || !("css" in value)) {
    throw new Error("The built web entry must declare a CSS asset in its manifest.");
  }

  const { css } = value;

  if (!Array.isArray(css) || css.length !== 1 || typeof css[0] !== "string") {
    throw new Error("The built web entry must declare exactly one CSS asset.");
  }

  return { css: [css[0]] };
}

const manifest: unknown = JSON.parse(await readFile(manifestPath, "utf8"));

if (typeof manifest !== "object" || manifest === null || !("index.html" in manifest)) {
  throw new Error("The Vite manifest must contain the index.html entry.");
}

const [stylesheetPath] = readManifestEntry(manifest["index.html"]).css;
const [html, stylesheet, shellSource] = await Promise.all([
  readFile(htmlPath, "utf8"),
  readFile(resolve(webRoot, "dist", stylesheetPath), "utf8"),
  readFile(shellPath, "utf8"),
]);

if (!html.includes(`/${stylesheetPath}`)) {
  throw new Error("The built HTML must reference the manifest stylesheet.");
}

if (stylesheet.trim().length === 0) {
  throw new Error("The emitted Tailwind stylesheet must not be empty.");
}

if (!stylesheet.includes(".text-3xl")) {
  throw new Error("The emitted Tailwind stylesheet must contain .text-3xl.");
}

if (!shellSource.includes('className="text-3xl"')) {
  throw new Error("The current shell must consume the exact text-3xl token.");
}

console.log(
  `Tailwind output verified: ${stylesheetPath} is referenced, non-empty, and contains .text-3xl consumed by the shell.`,
);
