import { once } from "node:events";

import { describe, expect, it } from "vitest";

import { createApp } from "./app.js";

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
