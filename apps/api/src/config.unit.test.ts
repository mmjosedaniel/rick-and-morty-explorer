import { describe, expect, it } from "vitest";

import { parseApiHost, parseApiPort } from "./config.js";

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
