export function parseApiPort(value: string | undefined): number {
  if (value === undefined) {
    return 3000;
  }

  if (!/^[0-9]+$/.test(value)) {
    throw new Error("API_PORT must be a decimal integer between 1 and 65535.");
  }

  const port = Number(value);

  if (port < 1 || port > 65535) {
    throw new Error("API_PORT must be a decimal integer between 1 and 65535.");
  }

  return port;
}

export function parseApiHost(value: string | undefined): string {
  if (value !== undefined && value !== "127.0.0.1") {
    throw new Error("API_HOST must be 127.0.0.1.");
  }

  return "127.0.0.1";
}

const REDIS_CONFIG_INVALID = "CHARACTER_SEARCH_CACHE_CONFIG_INVALID\n";
const REDIS_NAMESPACE_PATTERN =
  /^[a-z0-9][a-z0-9_-]*(?::[a-z0-9][a-z0-9_-]*)*$/;

export interface RedisRuntimeConfig {
  readonly host: "127.0.0.1";
  readonly port: number;
  readonly namespace: string;
  readonly searchTtlSeconds: number;
  readonly operationTimeoutMs: number;
}

function parseRedisInteger(
  value: string | undefined,
  defaultValue: number,
  maximum: number,
): number | null {
  const candidate = value ?? String(defaultValue);
  if (!/^[0-9]+$/.test(candidate)) {
    return null;
  }

  const parsed = Number(candidate);
  return parsed >= 1 && parsed <= maximum ? parsed : null;
}

export function loadRedisRuntimeConfig(
  environment: Readonly<Record<string, string | undefined>>,
  writeWarning: (diagnostic: string) => void = (diagnostic) =>
    process.stderr.write(diagnostic),
): RedisRuntimeConfig | null {
  const port = parseRedisInteger(environment.REDIS_PORT, 6379, 65535);
  const namespace = environment.REDIS_NAMESPACE ?? "character-app:local";
  const searchTtlSeconds = parseRedisInteger(
    environment.REDIS_SEARCH_TTL_SECONDS,
    300,
    86400,
  );
  const operationTimeoutMs = parseRedisInteger(
    environment.REDIS_OPERATION_TIMEOUT_MS,
    250,
    5000,
  );

  if (
    port === null ||
    Buffer.byteLength(namespace, "utf8") > 128 ||
    !REDIS_NAMESPACE_PATTERN.test(namespace) ||
    searchTtlSeconds === null ||
    operationTimeoutMs === null
  ) {
    writeWarning(REDIS_CONFIG_INVALID);
    return null;
  }

  return {
    host: "127.0.0.1",
    port,
    namespace,
    searchTtlSeconds,
    operationTimeoutMs,
  };
}
