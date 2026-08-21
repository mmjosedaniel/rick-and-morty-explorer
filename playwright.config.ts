import { defineConfig, devices } from "@playwright/test";

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
});
