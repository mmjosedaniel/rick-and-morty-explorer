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
