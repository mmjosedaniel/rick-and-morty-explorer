import { describe, expect, it, vi } from "vitest";

import {
  charactersQueryKey,
  createCharactersQueryClient,
  createCharactersQueryOptions,
} from "./characters-query";

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
