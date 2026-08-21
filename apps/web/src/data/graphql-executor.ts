import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";

import type { CharactersQuery } from "./generated/graphql";

type GraphqlFailureCategory = "network" | "graphql" | "decode" | "http";

export class GraphqlRequestError extends Error {
  readonly category: GraphqlFailureCategory;
  readonly status: number | undefined;
  readonly codes: readonly string[] | undefined;

  constructor(
    category: GraphqlFailureCategory,
    status?: number,
    codes?: readonly string[],
  ) {
    super(`GraphQL request failed (${category}).`);
    this.name = "GraphqlRequestError";
    this.category = category;
    this.status = status;
    this.codes = codes;
  }
}

interface ExecuteGraphqlOptions<TResult, TVariables extends object> {
  readonly endpoint: string;
  readonly document: TypedDocumentNode<TResult, TVariables>;
  readonly variables: TVariables;
  readonly decode: (data: unknown) => TResult;
  readonly fetchImpl?: typeof fetch;
  readonly signal?: AbortSignal;
}

function isAbortError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === "AbortError"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isGraphqlError(value: unknown): value is Record<string, unknown> {
  return isRecord(value) && typeof value.message === "string";
}

type GraphqlErrors =
  | { readonly kind: "none" }
  | {
      readonly kind: "credible";
      readonly errors: readonly Record<string, unknown>[];
    }
  | { readonly kind: "malformed" };

function graphqlErrors(value: unknown): GraphqlErrors {
  if (!isRecord(value) || !("errors" in value)) {
    return { kind: "none" };
  }

  if (!Array.isArray(value.errors)) {
    return { kind: "malformed" };
  }

  if (value.errors.length === 0) {
    return { kind: "none" };
  }

  return value.errors.every(isGraphqlError)
    ? { kind: "credible", errors: value.errors }
    : { kind: "malformed" };
}

function stableErrorCodes(errors: readonly Record<string, unknown>[]) {
  return errors.flatMap((error) => {
    const extensions = error.extensions;
    if (!isRecord(extensions)) {
      return [];
    }

    const code = extensions.code;
    return typeof code === "string" && /^[A-Z][A-Z0-9_]{0,63}$/.test(code)
      ? [code]
      : [];
  });
}

function failure(
  category: GraphqlFailureCategory,
  response?: Response,
  codes?: readonly string[],
) {
  return new GraphqlRequestError(
    category,
    response?.status,
    codes && codes.length > 0 ? codes : undefined,
  );
}

export async function executeGraphql<TResult, TVariables extends object>({
  endpoint,
  document,
  variables,
  decode,
  fetchImpl = fetch,
  signal,
}: ExecuteGraphqlOptions<TResult, TVariables>): Promise<TResult> {
  let response: Response;

  try {
    response = await fetchImpl(endpoint, {
      method: "POST",
      headers: {
        accept: "application/graphql-response+json, application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ query: print(document), variables }),
      signal: signal ?? null,
    });
  } catch (error) {
    if (isAbortError(error)) {
      throw error;
    }

    throw failure("network");
  }

  let body: string;
  try {
    body = await response.text();
  } catch (error) {
    if (isAbortError(error)) {
      throw error;
    }

    throw failure(response.ok ? "decode" : "http", response);
  }

  const mediaType = response.headers
    .get("content-type")
    ?.split(";", 1)[0]
    ?.trim()
    .toLowerCase();
  const isGraphqlMedia = mediaType === "application/graphql-response+json";
  const isSuccessfulLegacyJson = response.ok && mediaType === "application/json";

  let payload: unknown;
  if (isGraphqlMedia || isSuccessfulLegacyJson) {
    try {
      payload = JSON.parse(body);
    } catch {
      throw failure(response.ok ? "decode" : "http", response);
    }

    const errors = graphqlErrors(payload);
    if (errors.kind === "credible") {
      throw failure("graphql", response, stableErrorCodes(errors.errors));
    }

    if (errors.kind === "malformed") {
      throw failure(response.ok ? "decode" : "http", response);
    }
  }

  if (!response.ok) {
    throw failure("http", response);
  }

  if (!isGraphqlMedia && !isSuccessfulLegacyJson) {
    throw failure("decode", response);
  }

  try {
    return decode(isRecord(payload) ? payload.data : undefined);
  } catch {
    throw failure("decode", response);
  }
}

export function decodeCharactersData(data: unknown): CharactersQuery {
  if (!isRecord(data) || !Array.isArray(data.characters)) {
    throw new TypeError("Invalid character-list operation data.");
  }

  const isCharacter = (value: unknown) =>
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.imageUrl === "string" &&
    typeof value.species === "string";

  if (!data.characters.every(isCharacter)) {
    throw new TypeError("Invalid character-list operation data.");
  }

  return data as CharactersQuery;
}
