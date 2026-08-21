import { afterEach, describe, expect, it, vi } from "vitest";

const defaultGraphqlEndpoint = "http://127.0.0.1:3000/graphql";
const smokeGraphqlEndpoint = "http://127.0.0.1:4174/graphql";

async function loadGraphqlEndpoint(): Promise<string> {
  try {
    const module = await import("./config");
    return module.graphqlEndpoint;
  } catch (error) {
    throw new Error("TASK_010_BROWSER_GRAPHQL_ENDPOINT_CONFIG_MISSING", {
      cause: error,
    });
  }
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("TASK-010 browser GraphQL endpoint configuration", () => {
  it("defaults to the documented local API endpoint", async () => {
    vi.stubEnv("VITE_GRAPHQL_ENDPOINT", "");
    vi.resetModules();

    await expect(loadGraphqlEndpoint()).resolves.toBe(defaultGraphqlEndpoint);
  });

  it("uses the smoke build endpoint override", async () => {
    vi.stubEnv("VITE_GRAPHQL_ENDPOINT", smokeGraphqlEndpoint);
    vi.resetModules();

    await expect(loadGraphqlEndpoint()).resolves.toBe(smokeGraphqlEndpoint);
  });
});
