import { once } from "node:events";

import { describe, expect, it } from "vitest";

import { createApp } from "./app.js";

const graphqlQuery = JSON.stringify({
  query: "query CharacterIds { characters { id } }",
});

async function withApiServer<T>(
  body: (baseUrl: string) => Promise<T>,
): Promise<T> {
  const server = createApp({
    characterReadService: {
      list: async () => [],
    },
  }).listen(0, "127.0.0.1");

  try {
    await once(server, "listening");
    const address = server.address();

    if (address === null || typeof address === "string") {
      throw new Error("Expected the API test server to listen on an IP address.");
    }

    return await body(`http://127.0.0.1:${address.port}`);
  } finally {
    if (server.listening) {
      const closed = once(server, "close");
      server.close();
      await closed;
    }
  }
}

describe("GET /healthz", () => {
  it("returns the TASK-003 operational liveness response", async () => {
    const server = createApp().listen(0, "127.0.0.1");

    try {
      await once(server, "listening");

      const address = server.address();

      if (address === null || typeof address === "string") {
        throw new Error("Expected the API test server to listen on an IP address.");
      }

      const response = await fetch(
        `http://127.0.0.1:${address.port}/healthz`,
      );

      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("application/json");
      expect(await response.text()).toBe('{"status":"ok"}');
    } finally {
      if (server.listening) {
        const closed = once(server, "close");
        server.close();
        await closed;
      }
    }
  });
});

describe("TASK-010 anonymous GraphQL browser access", () => {
  it("permits only the two repository-owned loopback web origins without credentials", async () => {
    await withApiServer(async (baseUrl) => {
      for (const origin of [
        "http://127.0.0.1:5173",
        "http://127.0.0.1:4173",
      ]) {
        const response = await fetch(`${baseUrl}/graphql`, {
          method: "POST",
          headers: {
            origin,
            "content-type": "application/json",
          },
          body: graphqlQuery,
        });

        expect(response.status).toBe(200);
        expect(response.headers.get("access-control-allow-origin")).toBe(origin);
        expect(response.headers.get("access-control-allow-credentials")).toBeNull();
      }

      const hostileOrigin = "https://evil.invalid";
      const hostileResponse = await fetch(`${baseUrl}/graphql`, {
        method: "POST",
        headers: {
          origin: hostileOrigin,
          "content-type": "application/json",
        },
        body: graphqlQuery,
      });

      expect(hostileResponse.status).toBe(200);
      expect(hostileResponse.headers.get("access-control-allow-origin")).toBeNull();
      expect(
        hostileResponse.headers.get("access-control-allow-credentials"),
      ).toBeNull();

      const hostilePreflight = await fetch(`${baseUrl}/graphql`, {
        method: "OPTIONS",
        headers: {
          origin: hostileOrigin,
          "access-control-request-method": "POST",
          "access-control-request-headers": "content-type",
        },
      });

      expect(hostilePreflight.headers.get("access-control-allow-origin")).toBeNull();
      expect(
        hostilePreflight.headers.get("access-control-allow-credentials"),
      ).toBeNull();
    });
  });
});
