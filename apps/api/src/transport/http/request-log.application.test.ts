import { once } from "node:events";

import { describe, expect, it, vi } from "vitest";

import { createApp } from "../../app.js";

interface CharacterSummary {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
  readonly species: string;
}

interface CharacterReadService {
  list(filter: undefined): Promise<readonly CharacterSummary[]>;
}

interface RequestLoggingDependencies {
  readonly write: (line: string) => void;
  readonly createRequestId: () => string;
  readonly now: () => number;
}

interface RequestLoggingAppOptions {
  readonly characterReadService: CharacterReadService;
  readonly requestLogging: RequestLoggingDependencies;
}

interface GraphqlResponse<TData> {
  readonly data?: TData;
  readonly errors?: readonly { readonly message: string }[];
}

const createRequestLoggingApp = createApp as (
  options: RequestLoggingAppOptions,
) => ReturnType<typeof createApp>;

function takeNext<T>(values: T[], label: string): T {
  const value = values.shift();

  if (value === undefined) {
    throw new Error(`Expected another injected ${label}.`);
  }

  return value;
}

async function postGraphql(
  baseUrl: string,
  body: {
    readonly query: string;
    readonly operationName: string;
    readonly variables: Readonly<Record<string, unknown>>;
  },
): Promise<Response> {
  return fetch(`${baseUrl}/graphql`, {
    method: "POST",
    headers: {
      authorization: "Bearer AUTHORIZATION_SENTINEL",
      "content-type": "application/json",
      cookie: "session=COOKIE_SENTINEL",
    },
    body: JSON.stringify(body),
  });
}

describe("TASK-006 Milestone 3 bounded request logging", () => {
  it("emits one safe JSON line for health, GraphQL success, and GraphQL failure", async () => {
    const emittedLines: string[] = [];
    const requestIds = [
      "req-health-001",
      "req-graphql-ok-002",
      "req-graphql-fail-003",
    ];
    const times = [100, 107, 200, 211, 300, 313];
    const list = vi.fn(async (_filter: undefined) => []);
    const app = createRequestLoggingApp({
      characterReadService: { list },
      requestLogging: {
        write: (line) => emittedLines.push(line),
        createRequestId: () => takeNext(requestIds, "request ID"),
        now: () => takeNext(times, "monotonic time"),
      },
    });
    const server = app.listen(0, "127.0.0.1");

    try {
      await once(server, "listening");

      const address = server.address();

      if (address === null || typeof address === "string") {
        throw new Error("Expected the request-log test server to listen on an IP address.");
      }

      const baseUrl = `http://127.0.0.1:${address.port}`;
      const healthResponse = await fetch(
        `${baseUrl}/healthz?querySecret=QUERY_STRING_SENTINEL`,
      );

      expect(healthResponse.status).toBe(200);
      expect(healthResponse.headers.get("content-type")).toContain(
        "application/json",
      );
      expect(await healthResponse.text()).toBe('{"status":"ok"}');

      const sensitiveVariable = [
        "VARIABLE_SENTINEL",
        "SECRET_SENTINEL",
        "STACK_SENTINEL",
        "SELECT * FROM characters",
        "redis://internal",
        "C:\\private\\internal.ts",
      ].join("|");
      const longOperationName = "A".repeat(160);
      const successResponse = await postGraphql(baseUrl, {
        operationName: longOperationName,
        query: `query ${longOperationName} {
          # GRAPHQL_COMMENT_SENTINEL
          characters {
            id
          }
        }`,
        variables: { unsafe: sensitiveVariable },
      });

      expect(successResponse.status).toBe(200);
      expect(
        (await successResponse.json()) as GraphqlResponse<{
          readonly characters: readonly { readonly id: string }[];
        }>,
      ).toEqual({ data: { characters: [] } });

      const failureResponse = await postGraphql(baseUrl, {
        operationName: "LoggedFailure",
        query: `query LoggedFailure {
          # FAILURE_COMMENT_SENTINEL
          unsupportedField
        }`,
        variables: { unsafe: sensitiveVariable },
      });
      const failureBody = (await failureResponse.json()) as GraphqlResponse<never>;

      expect(failureBody.data).toBeUndefined();
      expect(failureBody.errors).toHaveLength(1);

      if (emittedLines.length === 0) {
        throw new Error("TASK_006_REQUEST_LOG_RECORD_MISSING");
      }

      expect(emittedLines).toHaveLength(3);

      const expectedLines = [
        `${JSON.stringify({
          requestId: "req-health-001",
          method: "GET",
          path: "/healthz",
          status: 200,
          durationMs: 7,
          errorCount: 0,
          operationName: null,
        })}\n`,
        `${JSON.stringify({
          requestId: "req-graphql-ok-002",
          method: "POST",
          path: "/graphql",
          status: 200,
          durationMs: 11,
          errorCount: 0,
          operationName: longOperationName.slice(0, 96),
        })}\n`,
        `${JSON.stringify({
          requestId: "req-graphql-fail-003",
          method: "POST",
          path: "/graphql",
          status: failureResponse.status,
          durationMs: 13,
          errorCount: 1,
          operationName: "LoggedFailure",
        })}\n`,
      ];

      expect(emittedLines).toEqual(expectedLines);

      for (const line of emittedLines) {
        expect(line.endsWith("\n")).toBe(true);
        expect(line.slice(0, -1)).not.toMatch(/[\r\n]/u);
        expect(() => JSON.parse(line.slice(0, -1))).not.toThrow();
        expect(Buffer.byteLength(line, "utf8")).toBeLessThanOrEqual(1024);
      }

      const combinedOutput = emittedLines.join("");
      for (const excludedValue of [
        "QUERY_STRING_SENTINEL",
        "AUTHORIZATION_SENTINEL",
        "COOKIE_SENTINEL",
        "VARIABLE_SENTINEL",
        "SECRET_SENTINEL",
        "GRAPHQL_COMMENT_SENTINEL",
        "FAILURE_COMMENT_SENTINEL",
        "STACK_SENTINEL",
        "SELECT * FROM characters",
        "redis://internal",
        "C:\\private\\internal.ts",
      ]) {
        expect(combinedOutput).not.toContain(excludedValue);
      }

      expect(list).toHaveBeenCalledOnce();
      expect(list).toHaveBeenCalledWith(undefined);
    } finally {
      if (server.listening) {
        const closed = once(server, "close");
        server.close();
        await closed;
      }
    }
  });
});
