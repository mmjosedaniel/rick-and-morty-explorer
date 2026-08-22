import { describe, expect, it } from "vitest";

import { parseApiHost, parseApiPort } from "./config.js";

interface RedisRuntimeConfig {
  readonly host: "127.0.0.1";
  readonly port: number;
  readonly namespace: string;
  readonly searchTtlSeconds: number;
  readonly operationTimeoutMs: number;
}

type LoadRedisRuntimeConfig = (
  environment: Readonly<Record<string, string | undefined>>,
  writeWarning?: (diagnostic: string) => void,
) => RedisRuntimeConfig | null;

type ShouldEnableGraphiql = (
  environment: Readonly<Record<string, string | undefined>>,
) => boolean;

async function loadRedisRuntimeConfigFactory(): Promise<LoadRedisRuntimeConfig> {
  const module = (await import("./config.js")) as Record<string, unknown>;

  expect(module.loadRedisRuntimeConfig).toBeTypeOf("function");
  return module.loadRedisRuntimeConfig as LoadRedisRuntimeConfig;
}

async function shouldEnableGraphiqlFactory(): Promise<ShouldEnableGraphiql> {
  const module = (await import("./config.js")) as Record<string, unknown>;

  expect(module.shouldEnableGraphiql).toBeTypeOf("function");
  return module.shouldEnableGraphiql as ShouldEnableGraphiql;
}

describe("parseApiPort", () => {
  it("uses the DPL-DEC-021 default API port", () => {
    expect(parseApiPort(undefined)).toBe(3000);
  });

  it("uses the supplied valid API port", () => {
    expect(parseApiPort("4174")).toBe(4174);
  });

  it("rejects a non-integer decimal API port", () => {
    expect(() => parseApiPort("3000.5")).toThrowError(
      new Error("API_PORT must be a decimal integer between 1 and 65535."),
    );
  });

  it("rejects API ports outside the inclusive range", () => {
    const values = ["0", "65536"];

    for (const value of values) {
      expect(() => parseApiPort(value)).toThrowError(
        new Error("API_PORT must be a decimal integer between 1 and 65535."),
      );
    }
  });
});

describe("parseApiHost", () => {
  it("uses the DPL-DEC-021 default API host", () => {
    expect(parseApiHost(undefined)).toBe("127.0.0.1");
  });

  it("accepts only the defined loopback API host", () => {
    expect(parseApiHost("127.0.0.1")).toBe("127.0.0.1");
    expect(() => parseApiHost("0.0.0.0")).toThrowError(
      new Error("API_HOST must be 127.0.0.1."),
    );
  });
});

describe("TASK-014 development-only GraphiQL selection", () => {
  it("enables only the supported development lifecycle and fails closed otherwise", async () => {
    const shouldEnableGraphiql = await shouldEnableGraphiqlFactory();
    const scenarios = [
      { name: "workspace development", environment: { npm_lifecycle_event: "dev" }, expected: true },
      { name: "direct built startup", environment: {}, expected: false },
      { name: "workspace start", environment: { npm_lifecycle_event: "start" }, expected: false },
      { name: "unit test", environment: { npm_lifecycle_event: "test:unit" }, expected: false },
      { name: "smoke", environment: { npm_lifecycle_event: "test:smoke" }, expected: false },
      { name: "other lifecycle", environment: { npm_lifecycle_event: "graphql:check" }, expected: false },
      {
        name: "production-marked development",
        environment: { npm_lifecycle_event: "dev", NODE_ENV: "production" },
        expected: false,
      },
    ] as const;

    for (const { name, environment, expected } of scenarios) {
      expect(shouldEnableGraphiql(environment), name).toBe(expected);
    }
  });
});

describe("TASK-007 Milestone 2 Redis runtime configuration", () => {
  it("loads the fixed loopback defaults and accepted overrides", async () => {
    const loadRedisRuntimeConfig = await loadRedisRuntimeConfigFactory();

    expect(loadRedisRuntimeConfig({})).toEqual({
      host: "127.0.0.1",
      port: 6379,
      namespace: "character-app:local",
      searchTtlSeconds: 300,
      operationTimeoutMs: 250,
    });
    expect(
      loadRedisRuntimeConfig({
        REDIS_PORT: "56400",
        REDIS_NAMESPACE: "character-app:test:t007-m2_1",
        REDIS_SEARCH_TTL_SECONDS: "86400",
        REDIS_OPERATION_TIMEOUT_MS: "5000",
      }),
    ).toEqual({
      host: "127.0.0.1",
      port: 56400,
      namespace: "character-app:test:t007-m2_1",
      searchTtlSeconds: 86400,
      operationTimeoutMs: 5000,
    });
  });

  it.each([
    ["port", { REDIS_PORT: "0" }],
    ["port", { REDIS_PORT: "65536" }],
    ["port", { REDIS_PORT: "6379.5" }],
    ["namespace", { REDIS_NAMESPACE: "Character-App:local" }],
    ["namespace", { REDIS_NAMESPACE: "character-app::local" }],
    ["namespace", { REDIS_NAMESPACE: "character-app:test:*" }],
    ["namespace", { REDIS_NAMESPACE: `a${"b".repeat(128)}` }],
    ["TTL", { REDIS_SEARCH_TTL_SECONDS: "0" }],
    ["TTL", { REDIS_SEARCH_TTL_SECONDS: "86401" }],
    ["TTL", { REDIS_SEARCH_TTL_SECONDS: "300.5" }],
    ["operation timeout", { REDIS_OPERATION_TIMEOUT_MS: "0" }],
    ["operation timeout", { REDIS_OPERATION_TIMEOUT_MS: "5001" }],
    ["operation timeout", { REDIS_OPERATION_TIMEOUT_MS: "250.5" }],
  ] as const)("rejects an invalid Redis %s override safely", async (_name, environment) => {
    const loadRedisRuntimeConfig = await loadRedisRuntimeConfigFactory();
    const warnings: string[] = [];

    expect(
      loadRedisRuntimeConfig(environment, (diagnostic) => {
        warnings.push(diagnostic);
      }),
    ).toBeNull();
    expect(warnings).toEqual(["CHARACTER_SEARCH_CACHE_CONFIG_INVALID\n"]);
  });
});
