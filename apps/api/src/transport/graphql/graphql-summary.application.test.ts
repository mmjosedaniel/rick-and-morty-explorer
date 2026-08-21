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

interface GraphqlAppOptions {
  readonly characterReadService: CharacterReadService;
  readonly enableGraphiql?: boolean;
}

interface GraphqlResponse<TData> {
  readonly data?: TData;
  readonly errors?: readonly { readonly message: string }[];
}

const createGraphqlApp = createApp as (
  options: GraphqlAppOptions,
) => ReturnType<typeof createApp>;

async function withGraphqlApp<T>(
  options: GraphqlAppOptions,
  run: (baseUrl: string) => Promise<T>,
): Promise<T> {
  const server = createGraphqlApp(options).listen(0, "127.0.0.1");

  try {
    await once(server, "listening");

    const address = server.address();

    if (address === null || typeof address === "string") {
      throw new Error("Expected the GraphQL test server to listen on an IP address.");
    }

    return await run(`http://127.0.0.1:${address.port}`);
  } finally {
    if (server.listening) {
      const closed = once(server, "close");
      server.close();
      await closed;
    }
  }
}

function postGraphql(baseUrl: string, query: string): Promise<Response> {
  return fetch(`${baseUrl}/graphql`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
}

describe("TASK-006 Milestone 1 GraphQL summary boundary", () => {
  it("serves only deterministic CharacterSummary fields through Express", async () => {
    const imageUrl =
      "https://rickandmortyapi.com/api/character/avatar/1.jpeg?source=stored";
    const list = vi.fn(async (_filter: undefined) => [
      {
        id: 1,
        name: "Rick Sanchez",
        imageUrl,
        species: "Human",
      },
    ]);

    await withGraphqlApp({ characterReadService: { list } }, async (baseUrl) => {
      const response = await postGraphql(
        baseUrl,
        `query CharacterSummaries {
          characters {
            id
            name
            imageUrl
            species
          }
        }`,
      );

      expect(response.status).toBe(200);

      const body = (await response.json()) as GraphqlResponse<{
        readonly characters: readonly {
          readonly id: string;
          readonly name: string;
          readonly imageUrl: string;
          readonly species: string;
        }[];
      }>;

      expect(body).toEqual({
        data: {
          characters: [
            {
              id: "1",
              name: "Rick Sanchez",
              imageUrl,
              species: "Human",
            },
          ],
        },
      });
      expect(list).toHaveBeenCalledOnce();
      expect(list).toHaveBeenCalledWith(undefined);
    });
  });

  it("preserves an empty character summary list", async () => {
    const list = vi.fn(async (_filter: undefined) => []);

    await withGraphqlApp({ characterReadService: { list } }, async (baseUrl) => {
      const response = await postGraphql(
        baseUrl,
        `query EmptyCharacterSummaries {
          characters {
            id
            name
            imageUrl
            species
          }
        }`,
      );

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({
        data: {
          characters: [],
        },
      });
      expect(list).toHaveBeenCalledOnce();
      expect(list).toHaveBeenCalledWith(undefined);
    });
  });

  it("publishes the exact summary and interaction mutation schema", async () => {
    const list = vi.fn(async (_filter: undefined) => []);

    await withGraphqlApp({ characterReadService: { list } }, async (baseUrl) => {
      const response = await postGraphql(
        baseUrl,
        `query SummarySchema {
          __schema {
            mutationType {
              name
            }
          }
          __type(name: "Mutation") {
            fields {
              name
              args {
                name
                type {
                  kind
                  name
                  ofType {
                    kind
                    name
                  }
                }
              }
              type {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
          summaryType: __type(name: "CharacterSummary") {
            fields {
              name
            }
          }
        }`,
      );

      expect(response.status).toBe(200);

      const body = (await response.json()) as GraphqlResponse<{
        readonly __schema: {
          readonly mutationType: { readonly name: string } | null;
        };
        readonly __type: {
          readonly fields: readonly {
            readonly name: string;
            readonly args: readonly {
              readonly name: string;
              readonly type: {
                readonly kind: string;
                readonly name: string | null;
                readonly ofType: {
                  readonly kind: string;
                  readonly name: string;
                } | null;
              };
            }[];
            readonly type: {
              readonly kind: string;
              readonly name: string | null;
              readonly ofType: {
                readonly kind: string;
                readonly name: string;
              } | null;
            };
          }[];
        } | null;
        readonly summaryType: {
          readonly fields: readonly { readonly name: string }[];
        } | null;
      }>;

      expect(body.errors).toBeUndefined();
      expect(body.data?.__schema.mutationType).toEqual({ name: "Mutation" });
      expect(body.data?.__type?.fields).toEqual([
        {
          name: "setCharacterFavorite",
          args: [
            {
              name: "id",
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: { kind: "SCALAR", name: "ID" },
              },
            },
            {
              name: "isFavorite",
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: { kind: "SCALAR", name: "Boolean" },
              },
            },
          ],
          type: {
            kind: "NON_NULL",
            name: null,
            ofType: { kind: "OBJECT", name: "CharacterDetail" },
          },
        },
        {
          name: "addCharacterComment",
          args: [
            {
              name: "characterId",
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: { kind: "SCALAR", name: "ID" },
              },
            },
            {
              name: "body",
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: { kind: "SCALAR", name: "String" },
              },
            },
          ],
          type: {
            kind: "NON_NULL",
            name: null,
            ofType: { kind: "OBJECT", name: "Comment" },
          },
        },
      ]);
      expect(body.data?.summaryType?.fields.map(({ name }) => name).sort()).toEqual([
        "id",
        "imageUrl",
        "name",
        "species",
      ]);
    });
  });

  it("disables GraphiQL by default", async () => {
    const list = vi.fn(async (_filter: undefined) => []);

    await withGraphqlApp({ characterReadService: { list } }, async (baseUrl) => {
      const response = await fetch(`${baseUrl}/graphql`, {
        headers: {
          accept: "text/html",
        },
      });

      expect(response.headers.get("content-type")).not.toContain("text/html");
      expect(await response.text()).not.toContain("GraphiQL");
    });
  });

  it("enables GraphiQL only through the explicit development option", async () => {
    const list = vi.fn(async (_filter: undefined) => []);

    await withGraphqlApp(
      { characterReadService: { list }, enableGraphiql: true },
      async (baseUrl) => {
        const response = await fetch(`${baseUrl}/graphql`, {
          headers: {
            accept: "text/html",
          },
        });

        expect(response.status).toBe(200);
        expect(response.headers.get("content-type")).toContain("text/html");
        expect(await response.text()).toContain("GraphiQL");
      },
    );
  });
});
