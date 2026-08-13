import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const webRoot = fileURLToPath(new URL("./apps/web", import.meta.url));
const apiRoot = fileURLToPath(new URL("./apps/api", import.meta.url));

export default defineConfig({
  test: {
    passWithNoTests: false,
    projects: [
      {
        root: webRoot,
        test: {
          name: "web-unit",
          environment: "jsdom",
          setupFiles: ["./src/test/setup.ts"],
          include: ["src/**/*.unit.test.tsx"],
          allowOnly: false,
        },
      },
      {
        root: webRoot,
        test: {
          name: "web-application",
          environment: "jsdom",
          setupFiles: ["./src/test/setup.ts"],
          include: ["src/**/*.application.test.tsx"],
          allowOnly: false,
        },
      },
      {
        root: apiRoot,
        test: {
          name: "api-unit",
          environment: "node",
          include: ["src/**/*.unit.test.ts"],
          allowOnly: false,
        },
      },
      {
        root: apiRoot,
        test: {
          name: "api-application",
          environment: "node",
          include: ["src/**/*.application.test.ts"],
          allowOnly: false,
        },
      },
    ],
  },
});
