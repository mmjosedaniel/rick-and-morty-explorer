import { describe, expect, it, vi } from "vitest";

import type {
  CharacterFilterInput,
  CharacterReadService,
  CharacterSummary,
} from "./character-read-service.js";

interface CharacterReadRepository {
  search(
    filter: CharacterFilterInput | undefined,
  ): Promise<readonly CharacterSummary[]>;
}

type CreateCharacterReadService = (options: {
  readonly repository: CharacterReadRepository;
}) => CharacterReadService;

async function loadCharacterReadServiceFactory(): Promise<CreateCharacterReadService> {
  const module = (await import("./character-read-service.js")) as Record<
    string,
    unknown
  >;

  expect(
    module.createCharacterReadService,
    "TASK-006 character read service factory is missing",
  ).toBeTypeOf("function");

  return module.createCharacterReadService as CreateCharacterReadService;
}

describe("TASK-006 Milestone 2 character filter service", () => {
  it("trims every supplied filter and coordinates one repository search", async () => {
    const expectedResult = [
      {
        id: 2,
        name: "Morty Smith",
        imageUrl:
          "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        species: "Human",
      },
    ] as const;
    const search = vi.fn(async () => expectedResult);
    const createCharacterReadService = await loadCharacterReadServiceFactory();
    const service = createCharacterReadService({ repository: { search } });

    const result = await service.list({
      status: "  Alive  ",
      species: "  Human  ",
      gender: "  Male  ",
      name: "  Morty  ",
      origin: "  Earth  ",
    });

    expect(search).toHaveBeenCalledOnce();
    expect(search).toHaveBeenCalledWith({
      status: "Alive",
      species: "Human",
      gender: "Male",
      name: "Morty",
      origin: "Earth",
    });
    expect(result).toBe(expectedResult);
  });

  it("omits blank filters before coordinating one repository search", async () => {
    const expectedResult: readonly CharacterSummary[] = [];
    const search = vi.fn(async () => expectedResult);
    const createCharacterReadService = await loadCharacterReadServiceFactory();
    const service = createCharacterReadService({ repository: { search } });

    const result = await service.list({
      status: "",
      species: "   ",
      gender: "\t",
      name: "\r\n",
      origin: " \t ",
    });

    expect(search).toHaveBeenCalledOnce();
    expect(search).toHaveBeenCalledWith(undefined);
    expect(result).toBe(expectedResult);
  });
});
