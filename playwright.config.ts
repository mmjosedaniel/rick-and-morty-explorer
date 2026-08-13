import { defineConfig, devices } from "@playwright/test";

const apiCommand =
  process.env["TASK003_SMOKE_API_MODE"] === "never-ready"
    ? "tsx tests/smoke/fixtures/never-ready-api.ts"
    : "npm --workspace @rick-and-morty/api run start:smoke";

export default defineConfig({
  testDir: "./tests/smoke",
  outputDir: ".artifacts/playwright",
  workers: 1,
  forbidOnly: true,
  reporter: "line",
  timeout: 15_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  webServer: [
    {
      name: "web",
      command: "npm --workspace @rick-and-morty/web run start:smoke",
      url: "http://127.0.0.1:4173",
      reuseExistingServer: false,
      timeout: 10_000,
      stdout: "pipe",
      stderr: "pipe",
    },
    {
      name: "api",
      command: apiCommand,
      url: "http://127.0.0.1:4174/healthz",
      reuseExistingServer: false,
      timeout: 10_000,
      stdout: "pipe",
      stderr: "pipe",
      env: {
        API_HOST: "127.0.0.1",
        API_PORT: "4174",
      },
    },
  ],
});
