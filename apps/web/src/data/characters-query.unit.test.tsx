import type { FetchQueryOptions } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";

import * as characterQueries from "./characters-query";
import {
  charactersQueryKey,
  createCharactersQueryClient,
  createCharactersQueryOptions,
} from "./characters-query";

interface CharacterDetailQueryOwner {
  characterDetailQueryKey: (id: string) => readonly ["character-detail", string];
  createCharacterDetailQueryOptions: (
    id: string,
    executor: (
      variables: { readonly id: string },
      signal: AbortSignal,
    ) => Promise<{ readonly character: unknown }>,
  ) => FetchQueryOptions<
    unknown,
    Error,
    unknown,
    readonly ["character-detail", string]
  > & {
    readonly queryKey: readonly ["character-detail", string];
    readonly retry: false;
    readonly refetchOnWindowFocus: false;
    readonly refetchOnReconnect: false;
  };
  executeCharacterDetailMutation: (options: {
    readonly queryClient: ReturnType<typeof createCharactersQueryClient>;
    readonly detailQueryOptions: FetchQueryOptions<
      unknown,
      Error,
      unknown,
      readonly ["character-detail", string]
    >;
    readonly mutation: () => Promise<unknown>;
  }) => Promise<"converged" | "persisted-but-not-refreshed">;
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((next, fail) => {
    resolve = next;
    reject = fail;
  });
  return { promise, reject, resolve };
}

const filters = {
  status: "Alive",
  species: null,
  gender: "Female",
} as const;
const characters = [
  {
    id: "1",
    name: "Rick Sanchez",
    imageUrl: "https://example.test/rick.jpeg",
    species: "Human",
  },
];

describe("character-list query ownership", () => {
  it("uses the complete normalized variable key and excludes client-only sort", () => {
    expect(charactersQueryKey(filters)).toEqual([
      "characters",
      "Alive",
      null,
      "Female",
    ]);

    expect(
      charactersQueryKey({ ...filters, sort: "desc" } as typeof filters),
    ).toEqual(["characters", "Alive", null, "Female"]);
  });

  it("disables automatic retry, focus, and reconnect requests", () => {
    const options = createCharactersQueryOptions(filters, vi.fn());

    expect(options).toMatchObject({
      queryKey: ["characters", "Alive", null, "Female"],
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
  });

  it("executes the controlled boundary with exactly the normalized variables", async () => {
    const executor = vi.fn().mockResolvedValue({ characters });
    const client = createCharactersQueryClient();

    await expect(
      client.fetchQuery(createCharactersQueryOptions(filters, executor)),
    ).resolves.toEqual(characters);

    expect(executor).toHaveBeenCalledTimes(1);
    expect(executor).toHaveBeenCalledWith(
      {
        status: "Alive",
        species: null,
        gender: "Female",
      },
      expect.any(AbortSignal),
    );
  });

  it("creates fresh clients whose caches do not cross test/application owners", async () => {
    const firstClient = createCharactersQueryClient();
    const secondClient = createCharactersQueryClient();
    const executor = vi.fn().mockResolvedValue({ characters });
    const options = createCharactersQueryOptions(filters, executor);

    expect(firstClient).not.toBe(secondClient);

    await firstClient.fetchQuery(options);
    await secondClient.fetchQuery(options);

    expect(executor).toHaveBeenCalledTimes(2);
    expect(firstClient.getQueryData(options.queryKey)).toEqual(characters);
    expect(secondClient.getQueryData(options.queryKey)).toEqual(characters);
  });
});

describe("character-detail query ownership", () => {
  it("uses the exact target key and performs one controlled detail request", async () => {
    expect(characterQueries).toHaveProperty("characterDetailQueryKey");
    expect(characterQueries).toHaveProperty("createCharacterDetailQueryOptions");

    const detailQueries = characterQueries as typeof characterQueries &
      CharacterDetailQueryOwner;
    const detail = { id: "101", name: "Rick Sanchez" };
    const executor = vi.fn().mockResolvedValue({ character: detail });
    const options = detailQueries.createCharacterDetailQueryOptions(
      "101",
      executor,
    );

    expect(detailQueries.characterDetailQueryKey("101")).toEqual([
      "character-detail",
      "101",
    ]);
    expect(options).toMatchObject({
      queryKey: ["character-detail", "101"],
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });

    const client = createCharactersQueryClient();
    await expect(client.fetchQuery(options)).resolves.toEqual(detail);
    expect(executor).toHaveBeenCalledTimes(1);
    expect(executor).toHaveBeenCalledWith(
      { id: "101" },
      expect.any(AbortSignal),
    );
    expect(client.getQueryData(["characters", null, null, null])).toBeUndefined();
  });

  it("awaits exactly one target-detail network result and ignores mutation data", async () => {
    expect(characterQueries).toHaveProperty("executeCharacterDetailMutation");
    const detailQueries = characterQueries as typeof characterQueries &
      CharacterDetailQueryOwner;
    const client = createCharactersQueryClient();
    const targetKey = detailQueries.characterDetailQueryKey("101");
    const otherKey = detailQueries.characterDetailQueryKey("202");
    const initial = { id: "101", isFavorite: false };
    const mutationResult = { id: "101", isFavorite: true, source: "mutation" };
    const converged = { id: "101", isFavorite: true, source: "network-detail" };
    client.setQueryData(targetKey, initial);
    client.setQueryData(otherKey, { id: "202" });
    client.setQueryData(["characters", null, null, null], characters);

    const mutation = deferred<unknown>();
    const detailRequest = deferred<{ readonly character: unknown }>();
    const detailExecutor = vi.fn(() => detailRequest.promise);
    const result = detailQueries.executeCharacterDetailMutation({
      queryClient: client,
      detailQueryOptions: detailQueries.createCharacterDetailQueryOptions(
        "101",
        detailExecutor,
      ),
      mutation: vi.fn(() => mutation.promise),
    });
    let settled = false;
    void result.finally(() => {
      settled = true;
    });

    expect(detailExecutor).not.toHaveBeenCalled();
    mutation.resolve(mutationResult);
    await vi.waitFor(() => expect(detailExecutor).toHaveBeenCalledTimes(1));
    expect(settled).toBe(false);
    expect(client.getQueryData(targetKey)).toEqual(initial);
    expect(client.getQueryData(otherKey)).toEqual({ id: "202" });
    expect(client.getQueryData(["characters", null, null, null])).toEqual(characters);

    detailRequest.resolve({ character: converged });
    await expect(result).resolves.toBe("converged");
    expect(detailExecutor).toHaveBeenCalledTimes(1);
    expect(client.getQueryData(targetKey)).toEqual(converged);
  });

  it("performs no detail request or cache change when the mutation fails", async () => {
    expect(characterQueries).toHaveProperty("executeCharacterDetailMutation");
    const detailQueries = characterQueries as typeof characterQueries &
      CharacterDetailQueryOwner;
    const client = createCharactersQueryClient();
    const targetKey = detailQueries.characterDetailQueryKey("101");
    const initial = { id: "101", isFavorite: false };
    client.setQueryData(targetKey, initial);
    const detailExecutor = vi.fn();
    const mutationError = new Error("mutation failed");

    await expect(
      detailQueries.executeCharacterDetailMutation({
        queryClient: client,
        detailQueryOptions: detailQueries.createCharacterDetailQueryOptions(
          "101",
          detailExecutor,
        ),
        mutation: vi.fn().mockRejectedValue(mutationError),
      }),
    ).rejects.toBe(mutationError);
    expect(detailExecutor).not.toHaveBeenCalled();
    expect(client.getQueryData(targetKey)).toEqual(initial);
  });

  it("reports persisted-but-not-refreshed without replacing the last detail", async () => {
    expect(characterQueries).toHaveProperty("executeCharacterDetailMutation");
    const detailQueries = characterQueries as typeof characterQueries &
      CharacterDetailQueryOwner;
    const client = createCharactersQueryClient();
    const targetKey = detailQueries.characterDetailQueryKey("101");
    const initial = { id: "101", isFavorite: false };
    client.setQueryData(targetKey, initial);
    const detailExecutor = vi.fn().mockRejectedValue(new Error("refetch failed"));

    await expect(
      detailQueries.executeCharacterDetailMutation({
        queryClient: client,
        detailQueryOptions: detailQueries.createCharacterDetailQueryOptions(
          "101",
          detailExecutor,
        ),
        mutation: vi.fn().mockResolvedValue({ isFavorite: true }),
      }),
    ).resolves.toBe("persisted-but-not-refreshed");
    expect(detailExecutor).toHaveBeenCalledTimes(1);
    expect(client.getQueryData(targetKey)).toEqual(initial);
  });
});
