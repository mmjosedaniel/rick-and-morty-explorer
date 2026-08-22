import { print } from "graphql";
import { describe, expect, it, vi } from "vitest";

import { CharactersDocument } from "./generated/graphql";
import * as graphqlDecoders from "./graphql-executor";
import { decodeCharactersData, executeGraphql } from "./graphql-executor";

interface CharacterDetailDecoderOwner {
  decodeCharacterDetailData: (data: unknown) => unknown;
  decodeSetCharacterFavoriteData: (data: unknown) => unknown;
  decodeAddCharacterCommentData: (data: unknown) => unknown;
}

const endpoint = "http://127.0.0.1:3000/graphql";
const variables = {
  status: "Alive",
  species: "Human",
  gender: null,
} as const;
const charactersData = {
  characters: [
    {
      id: "1",
      name: "Rick Sanchez",
      imageUrl: "https://example.test/rick.jpeg",
      species: "Human",
    },
  ],
};

function jsonResponse(
  body: unknown,
  options: { readonly status?: number; readonly contentType?: string } = {},
) {
  return new Response(JSON.stringify(body), {
    status: options.status ?? 200,
    headers: {
      "content-type":
        options.contentType ?? "application/graphql-response+json; charset=utf-8",
    },
  });
}

function executeWith(fetchImpl: typeof fetch) {
  return executeGraphql({
    endpoint,
    document: CharactersDocument,
    variables,
    decode: decodeCharactersData,
    fetchImpl,
  });
}

async function capturedError(promise: Promise<unknown>) {
  try {
    await promise;
  } catch (error) {
    return error;
  }

  throw new Error("Expected the GraphQL request to fail.");
}

describe("executeGraphql", () => {
  it("posts the generated document and exact variables to the configured endpoint", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(jsonResponse({ data: charactersData }));

    await expect(executeWith(fetchImpl)).resolves.toEqual(charactersData);

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0] ?? [];
    expect(url).toBe(endpoint);
    expect(init).toMatchObject({ method: "POST" });
    expect(new Headers(init?.headers).get("content-type")).toBe(
      "application/json",
    );
    expect(new Headers(init?.headers).get("accept")).toContain(
      "application/graphql-response+json",
    );
    expect(new Headers(init?.headers).get("accept")).toContain(
      "application/json",
    );
    expect(JSON.parse(String(init?.body))).toEqual({
      query: print(CharactersDocument),
      variables,
    });
  });

  it("accepts a successful legacy JSON GraphQL response at the configured endpoint", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        jsonResponse(
          { data: charactersData },
          { contentType: "application/json; charset=utf-8" },
        ),
      );

    await expect(executeWith(fetchImpl)).resolves.toEqual(charactersData);
  });

  it("preserves an abort rejection without converting or exposing it", async () => {
    const abort = new DOMException("The request was aborted.", "AbortError");
    const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(abort);

    await expect(executeWith(fetchImpl)).rejects.toBe(abort);
  });

  it("preserves an abort that occurs while reading the response", async () => {
    const abort = new DOMException("The response was aborted.", "AbortError");
    const body = new ReadableStream({
      start(controller) {
        controller.error(abort);
      },
    });
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(body, {
        status: 200,
        headers: { "content-type": "application/graphql-response+json" },
      }),
    );

    await expect(executeWith(fetchImpl)).rejects.toBe(abort);
  });

  it("classifies a non-abort request rejection as a bounded network failure", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new Error("password=network-secret"));

    const error = await capturedError(executeWith(fetchImpl));

    expect(error).toMatchObject({
      name: "GraphqlRequestError",
      category: "network",
    });
    expect(String(error)).not.toContain("network-secret");
  });

  it("gives a credible GraphQL error precedence over status and partial data", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      jsonResponse(
        {
          data: charactersData,
          errors: [
            {
              message: "password=graphql-secret",
              extensions: {
                code: "BAD_USER_INPUT",
                internal: "do-not-expose",
              },
            },
          ],
        },
        { status: 400 },
      ),
    );

    const error = await capturedError(executeWith(fetchImpl));

    expect(error).toMatchObject({
      name: "GraphqlRequestError",
      category: "graphql",
      status: 400,
      codes: ["BAD_USER_INPUT"],
    });
    expect(String(error)).not.toContain("graphql-secret");
    expect(JSON.stringify(error)).not.toContain("do-not-expose");
  });

  it("rejects malformed non-empty errors in a successful GraphQL response", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      jsonResponse({
        data: charactersData,
        errors: [{ message: 42 }],
      }),
    );

    await expect(executeWith(fetchImpl)).rejects.toMatchObject({
      category: "decode",
      status: 200,
    });
  });

  it.each([
    ["malformed JSON", "{not-json"],
    ["invalid operation data", JSON.stringify({ data: { characters: null } })],
  ])("classifies %s on success as decode/protocol failure", async (_label, body) => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(body, {
        status: 200,
        headers: { "content-type": "application/graphql-response+json" },
      }),
    );

    const error = await capturedError(executeWith(fetchImpl));

    expect(error).toMatchObject({
      name: "GraphqlRequestError",
      category: "decode",
      status: 200,
    });
    expect(String(error)).not.toContain(body);
  });

  it("classifies an unreadable successful response as decode/protocol failure", async () => {
    const body = new ReadableStream({
      start(controller) {
        controller.error(new Error("password=response-secret"));
      },
    });
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(body, {
        status: 200,
        headers: { "content-type": "application/graphql-response+json" },
      }),
    );

    const error = await capturedError(executeWith(fetchImpl));

    expect(error).toMatchObject({ category: "decode", status: 200 });
    expect(String(error)).not.toContain("response-secret");
  });

  it("classifies a non-credible non-success response as a bounded HTTP failure", async () => {
    const rawBody = "password=http-secret SELECT * FROM private_table";
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(rawBody, {
        status: 503,
        headers: { "content-type": "text/plain" },
      }),
    );

    const error = await capturedError(executeWith(fetchImpl));

    expect(error).toMatchObject({
      name: "GraphqlRequestError",
      category: "http",
      status: 503,
    });
    expect(String(error)).not.toContain(rawBody);
    expect(JSON.stringify(error)).not.toContain("http-secret");
  });

  it("does not treat legacy JSON errors on a non-success status as credible GraphQL", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      jsonResponse(
        {
          errors: [
            { message: "legacy error", extensions: { code: "INTERNAL" } },
          ],
        },
        { status: 500, contentType: "application/json" },
      ),
    );

    await expect(executeWith(fetchImpl)).rejects.toMatchObject({
      category: "http",
      status: 500,
    });
  });
});

describe("decodeCharactersData", () => {
  it("accepts the exact character-list operation shape", () => {
    expect(decodeCharactersData(charactersData)).toEqual(charactersData);
  });

  it.each([
    undefined,
    null,
    {},
    { characters: null },
    { characters: {} },
    { characters: [{ ...charactersData.characters[0], id: 1 }] },
    { characters: [{ ...charactersData.characters[0], name: undefined }] },
    { characters: [{ ...charactersData.characters[0], imageUrl: null }] },
    { characters: [{ ...charactersData.characters[0], species: 42 }] },
  ])("rejects an invalid data.characters value", (value) => {
    expect(() => decodeCharactersData(value)).toThrow();
  });
});

describe("decodeCharacterDetailData", () => {
  const character = {
    id: "101",
    name: "Rick Sanchez",
    imageUrl: "https://example.test/rick.jpeg",
    species: "Human",
    status: "Alive",
    gender: "Male",
    type: "",
    origin: { name: "Earth" },
    isFavorite: false,
    comments: [
      { id: "comment-1", body: "First" },
      { id: "comment-2", body: "Second" },
    ],
  };

  it("accepts a nullable exact detail and rejects malformed nested data", () => {
    expect(graphqlDecoders).toHaveProperty("decodeCharacterDetailData");
    const { decodeCharacterDetailData } = graphqlDecoders as typeof graphqlDecoders &
      CharacterDetailDecoderOwner;

    expect(decodeCharacterDetailData({ character })).toEqual({ character });
    expect(decodeCharacterDetailData({ character: null })).toEqual({
      character: null,
    });

    for (const invalid of [
      undefined,
      {},
      { character: { ...character, isFavorite: "false" } },
      { character: { ...character, origin: { name: null } } },
      { character: { ...character, comments: [{ id: "comment-1" }] } },
    ]) {
      expect(() => decodeCharacterDetailData(invalid)).toThrow();
    }
  });

  it("accepts only the non-null string id selected by the favorite mutation", () => {
    expect(graphqlDecoders).toHaveProperty("decodeSetCharacterFavoriteData");
    const { decodeSetCharacterFavoriteData } = graphqlDecoders as typeof graphqlDecoders &
      CharacterDetailDecoderOwner;
    const favorite = { id: "101" };

    expect(decodeSetCharacterFavoriteData({ setCharacterFavorite: favorite })).toEqual({
      setCharacterFavorite: favorite,
    });
    for (const invalid of [
      undefined,
      {},
      { setCharacterFavorite: null },
      { setCharacterFavorite: {} },
      { setCharacterFavorite: { id: 101 } },
    ]) {
      expect(() => decodeSetCharacterFavoriteData(invalid)).toThrow();
    }
  });

  it("accepts only the exact added-comment mutation result", () => {
    expect(graphqlDecoders).toHaveProperty("decodeAddCharacterCommentData");
    const { decodeAddCharacterCommentData } = graphqlDecoders as typeof graphqlDecoders &
      CharacterDetailDecoderOwner;
    const comment = { id: "comment-3", body: "A new comment" };

    expect(decodeAddCharacterCommentData({ addCharacterComment: comment })).toEqual({
      addCharacterComment: comment,
    });
    for (const invalid of [
      undefined,
      {},
      { addCharacterComment: null },
      { addCharacterComment: { body: "missing id" } },
      { addCharacterComment: { id: "comment-3", body: 3 } },
    ]) {
      expect(() => decodeAddCharacterCommentData(invalid)).toThrow();
    }
  });
});
