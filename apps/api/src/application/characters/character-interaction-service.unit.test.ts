import { describe, expect, it, vi } from "vitest";

interface CharacterDetail {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
  readonly species: string;
  readonly status: string;
  readonly gender: string;
  readonly type: string;
  readonly origin: { readonly name: string; readonly url: string };
  readonly isFavorite: boolean;
}

interface CharacterComment {
  readonly id: number;
  readonly body: string;
}

interface CharacterInteractionRepository {
  setFavorite(
    id: number,
    isFavorite: boolean,
  ): Promise<CharacterDetail | null>;
  addComment(
    characterId: number,
    body: string,
  ): Promise<CharacterComment | null>;
}

interface CharacterInteractionService {
  setFavorite(
    id: number,
    isFavorite: boolean,
  ): Promise<CharacterDetail | null>;
  addComment(
    characterId: number,
    body: string,
  ): Promise<CharacterComment | null>;
}

type CreateCharacterInteractionService = (options: {
  readonly repository: CharacterInteractionRepository;
}) => CharacterInteractionService;

const detailFixture: CharacterDetail = {
  id: 1,
  name: "Rick Sanchez",
  imageUrl: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  species: "Human",
  status: "Alive",
  gender: "Male",
  type: "",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  isFavorite: true,
};

async function loadFactory(): Promise<CreateCharacterInteractionService> {
  const specifier = "./character-interaction-service.js";
  const module = (await import(
    /* @vite-ignore */ specifier
  )) as Record<string, unknown>;

  expect(module.createCharacterInteractionService).toBeTypeOf("function");
  return module.createCharacterInteractionService as CreateCharacterInteractionService;
}

function createRepository(): {
  readonly repository: CharacterInteractionRepository;
  readonly setFavorite: ReturnType<typeof vi.fn>;
  readonly addComment: ReturnType<typeof vi.fn>;
} {
  const setFavorite = vi.fn(async () => detailFixture);
  const addComment = vi.fn(async (_characterId: number, body: string) => ({
    id: 41,
    body,
  }));

  return {
    repository: { setFavorite, addComment },
    setFavorite,
    addComment,
  };
}

describe("TASK-008 Milestone 1 character interaction service", () => {
  it("coordinates both favorite states and preserves repository results and failures", async () => {
    const createCharacterInteractionService = await loadFactory();
    const first = createRepository();
    const service = createCharacterInteractionService({
      repository: first.repository,
    });

    await expect(service.setFavorite(1, true)).resolves.toBe(detailFixture);
    await expect(service.setFavorite(1, false)).resolves.toBe(detailFixture);
    expect(first.setFavorite.mock.calls).toEqual([
      [1, true],
      [1, false],
    ]);

    const missing = createRepository();
    missing.setFavorite.mockResolvedValueOnce(null);
    await expect(
      createCharacterInteractionService({
        repository: missing.repository,
      }).setFavorite(999, true),
    ).resolves.toBeNull();

    const failure = new Error("FAVORITE_WRITE_FAILED");
    const failing = createRepository();
    failing.setFavorite.mockRejectedValueOnce(failure);
    await expect(
      createCharacterInteractionService({
        repository: failing.repository,
      }).setFavorite(1, true),
    ).rejects.toBe(failure);
  });

  it("trims once, counts Unicode code points, and writes only valid comment bodies", async () => {
    const createCharacterInteractionService = await loadFactory();
    const value = createRepository();
    const service = createCharacterInteractionService({
      repository: value.repository,
    });
    const markup = "<script>alert('unsafe')</script>";
    const thousandCodePoints = "🧪".repeat(1_000);

    await expect(service.addComment(1, "  a  b  ")).resolves.toEqual({
      id: 41,
      body: "a  b",
    });
    await expect(service.addComment(1, `  ${markup}  `)).resolves.toEqual({
      id: 41,
      body: markup,
    });
    await expect(service.addComment(1, thousandCodePoints)).resolves.toEqual({
      id: 41,
      body: thousandCodePoints,
    });
    expect(value.addComment.mock.calls).toEqual([
      [1, "a  b"],
      [1, markup],
      [1, thousandCodePoints],
    ]);

    for (const invalidBody of ["", " \t\r\n ", "🧪".repeat(1_001)]) {
      const invalid = createRepository();
      await expect(
        createCharacterInteractionService({
          repository: invalid.repository,
        }).addComment(1, invalidBody),
      ).rejects.toBeInstanceOf(Error);
      expect(invalid.addComment).not.toHaveBeenCalled();
    }

    const missing = createRepository();
    missing.addComment.mockResolvedValueOnce(null);
    await expect(
      createCharacterInteractionService({
        repository: missing.repository,
      }).addComment(999, "Valid comment"),
    ).resolves.toBeNull();

    const failure = new Error("COMMENT_WRITE_FAILED");
    const failing = createRepository();
    failing.addComment.mockRejectedValueOnce(failure);
    await expect(
      createCharacterInteractionService({
        repository: failing.repository,
      }).addComment(1, "Valid comment"),
    ).rejects.toBe(failure);
  });
});
