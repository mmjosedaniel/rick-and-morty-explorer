import { describe, expect, it, vi } from "vitest";

import type {
  CharacterFilterInput,
  CharacterReadRepository,
  CharacterReadService,
  CharacterSummary,
  NormalizedCharacterFilter,
} from "./character-read-service.js";

interface CharacterSearchCache {
  read(filter: NormalizedCharacterFilter): Promise<string | null>;
  write(
    filter: NormalizedCharacterFilter,
    summaries: readonly CharacterSummary[],
  ): Promise<void>;
  unlink(filter: NormalizedCharacterFilter): Promise<void>;
}

type CreateCharacterReadService = (options: {
  readonly repository: CharacterReadRepository;
  readonly cache: CharacterSearchCache;
  readonly writeWarning?: (diagnostic: string) => void;
}) => CharacterReadService;

interface CharacterSearchCacheModule {
  buildCharacterSearchCacheKey(
    namespace: string,
    normalizedFilter: NormalizedCharacterFilter,
  ): string;
  encodeCharacterSummaries(value: readonly CharacterSummary[]): string;
  decodeCharacterSummaries(raw: string): readonly CharacterSummary[] | null;
}

const summaryFixture = {
  id: 2,
  name: "Morty Smith",
  imageUrl: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  species: "Human",
} as const;

const encodedSummaryFixture = JSON.stringify([summaryFixture]);

const invalidSummaryValues: readonly unknown[] = [
  {
    name: summaryFixture.name,
    imageUrl: summaryFixture.imageUrl,
    species: summaryFixture.species,
  },
  {
    id: summaryFixture.id,
    displayName: summaryFixture.name,
    imageUrl: summaryFixture.imageUrl,
    species: summaryFixture.species,
  },
  { ...summaryFixture, isFavorite: true },
  { ...summaryFixture, id: 0 },
  { ...summaryFixture, id: -2 },
  { ...summaryFixture, id: 2.5 },
  { ...summaryFixture, id: "2" },
  { ...summaryFixture, name: 2 },
  { ...summaryFixture, imageUrl: false },
  { ...summaryFixture, species: null },
  { ...summaryFixture, imageUrl: "relative/avatar/2.jpeg" },
  {
    ...summaryFixture,
    imageUrl: "https://example.com/api/character/avatar/2.jpeg",
  },
  {
    ...summaryFixture,
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  },
  {
    ...summaryFixture,
    imageUrl:
      "https://rickandmortyapi.com/api/character/avatar/2.jpeg?alias=1",
  },
  {
    ...summaryFixture,
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/2.jpeg#alias",
  },
];

async function loadCacheModule(): Promise<CharacterSearchCacheModule> {
  return import("./character-search-cache.js");
}

async function loadCharacterReadServiceFactory(): Promise<CreateCharacterReadService> {
  const module = (await import("./character-read-service.js")) as Record<
    string,
    unknown
  >;

  expect(module.createCharacterReadService).toBeTypeOf("function");
  return module.createCharacterReadService as CreateCharacterReadService;
}

function createCache(overrides: Partial<CharacterSearchCache> = {}): {
  readonly cache: CharacterSearchCache;
  readonly read: ReturnType<typeof vi.fn>;
  readonly write: ReturnType<typeof vi.fn>;
  readonly unlink: ReturnType<typeof vi.fn>;
} {
  const read = vi.fn(async () => null as string | null);
  const write = vi.fn(async () => {});
  const unlink = vi.fn(async () => {});

  return {
    cache: {
      read: overrides.read ?? read,
      write: overrides.write ?? write,
      unlink: overrides.unlink ?? unlink,
    },
    read,
    write,
    unlink,
  };
}

describe("TASK-007 Milestone 1 canonical search key and summary codec", () => {
  it("uses fixed canonical JSON bytes and a versioned SHA-256 namespace key", async () => {
    const { buildCharacterSearchCacheKey } = await loadCacheModule();

    expect(buildCharacterSearchCacheKey("character-app:test", {})).toBe(
      "character-app:test:characters:search:v1:" +
        "44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a",
    );

    const canonicalFilter = {
      status: "alive",
      species: "human",
      gender: "male",
      name: "morty",
      origin: "earth",
    } as const;
    const differentlyInsertedFilter: NormalizedCharacterFilter = {
      origin: "earth",
      name: "morty",
      gender: "male",
      species: "human",
      status: "alive",
    };
    const expectedKey =
      "character-app:test:characters:search:v1:" +
      "8aec91f40da2eaef0405b990a3695ff7c32356d4be40a2be592d2236ab58116d";

    expect(
      buildCharacterSearchCacheKey("character-app:test", canonicalFilter),
    ).toBe(expectedKey);
    expect(
      buildCharacterSearchCacheKey(
        "character-app:test",
        differentlyInsertedFilter,
      ),
    ).toBe(expectedKey);
    expect(
      buildCharacterSearchCacheKey("character-app:test", { name: "rick" }),
    ).toBe(
      "character-app:test:characters:search:v1:" +
        "9b0311f60790c3faa7a2d8281b1424a2e5679558261a43b521e50a187ac22bdb",
    );
  });

  it("round-trips only exact CharacterSummary arrays", async () => {
    const { decodeCharacterSummaries, encodeCharacterSummaries } =
      await loadCacheModule();

    expect(encodeCharacterSummaries([summaryFixture])).toBe(
      encodedSummaryFixture,
    );
    expect(decodeCharacterSummaries(encodedSummaryFixture)).toEqual([
      summaryFixture,
    ]);
    expect(decodeCharacterSummaries("[]")).toEqual([]);

    expect(decodeCharacterSummaries("not-json")).toBeNull();

    for (const invalidTopLevel of [
      null,
      {},
      summaryFixture,
      "not-an-array",
      2,
    ]) {
      expect(
        decodeCharacterSummaries(JSON.stringify(invalidTopLevel)),
      ).toBeNull();
      expect(() =>
        encodeCharacterSummaries(
          invalidTopLevel as unknown as readonly CharacterSummary[],
        ),
      ).toThrow();
    }

    for (const invalidSummary of invalidSummaryValues) {
      expect(
        decodeCharacterSummaries(JSON.stringify([invalidSummary])),
      ).toBeNull();
      expect(() =>
        encodeCharacterSummaries([
          invalidSummary as unknown as CharacterSummary,
        ]),
      ).toThrow();
    }
  });

  it("rejects sparse arrays and contains caller-owned toJSON hooks", async () => {
    const { decodeCharacterSummaries, encodeCharacterSummaries } =
      await loadCacheModule();
    const sparseSummaries = new Array<CharacterSummary>(1);

    expect(() => encodeCharacterSummaries(sparseSummaries)).toThrow(
      "INVALID_CHARACTER_SUMMARY_CACHE_VALUE",
    );

    const summaryWithToJSON = Object.defineProperty(
      { ...summaryFixture },
      "toJSON",
      {
        value: () => ({ ...summaryFixture, isFavorite: true }),
      },
    );
    const arrayWithToJSON = Object.defineProperty(
      [summaryFixture] as CharacterSummary[],
      "toJSON",
      {
        value: () => [{ ...summaryFixture, isFavorite: true }],
      },
    );

    for (const summaries of [[summaryWithToJSON], arrayWithToJSON]) {
      const encoded = encodeCharacterSummaries(summaries);

      expect(encoded).toBe(encodedSummaryFixture);
      expect(encoded).not.toContain("isFavorite");
      expect(decodeCharacterSummaries(encoded)).toEqual([summaryFixture]);
    }
  });
});

describe("TASK-007 Milestone 1 injected cache-aside search service", () => {
  it.each([
    ["a valid summary hit", encodedSummaryFixture, [summaryFixture]],
    ["an empty hit", "[]", []],
  ] as const)("treats %s as authoritative for the bounded search", async (_name, raw, expected) => {
    const search = vi.fn(async () => {
      throw new Error("POSTGRESQL_MUST_NOT_BE_CALLED");
    });
    const read = vi.fn(async () => raw);
    const { cache, write, unlink } = createCache({ read });
    const warnings: string[] = [];
    const createCharacterReadService = await loadCharacterReadServiceFactory();
    const service = createCharacterReadService({
      repository: { search },
      cache,
      writeWarning: (diagnostic) => warnings.push(diagnostic),
    });

    await expect(
      service.list({
        origin: "  EARTH  ",
        name: " Morty ",
        gender: " MALE ",
        species: " HUMAN ",
        status: " ALIVE ",
      }),
    ).resolves.toEqual(expected);
    expect(read).toHaveBeenCalledOnce();
    expect(read).toHaveBeenCalledWith({
      status: "alive",
      species: "human",
      gender: "male",
      name: "morty",
      origin: "earth",
    });
    expect(search).not.toHaveBeenCalled();
    expect(write).not.toHaveBeenCalled();
    expect(unlink).not.toHaveBeenCalled();
    expect(warnings).toEqual([]);
  });

  it("loads and stores a PostgreSQL result on a cache miss", async () => {
    const search = vi.fn(async () => [summaryFixture]);
    const { cache, read, write, unlink } = createCache();
    const warnings: string[] = [];
    const createCharacterReadService = await loadCharacterReadServiceFactory();
    const service = createCharacterReadService({
      repository: { search },
      cache,
      writeWarning: (diagnostic) => warnings.push(diagnostic),
    });

    await expect(service.list(undefined)).resolves.toEqual([summaryFixture]);
    expect(read).toHaveBeenCalledWith({});
    expect(search).toHaveBeenCalledWith({});
    expect(write).toHaveBeenCalledWith({}, [summaryFixture]);
    expect(unlink).not.toHaveBeenCalled();
    expect(warnings).toEqual([]);
  });

  it("stores an empty PostgreSQL result on a cache miss for later reuse", async () => {
    const search = vi.fn(async () => [] as const);
    const { cache, read, write, unlink } = createCache();
    const warnings: string[] = [];
    const createCharacterReadService = await loadCharacterReadServiceFactory();
    const service = createCharacterReadService({
      repository: { search },
      cache,
      writeWarning: (diagnostic) => warnings.push(diagnostic),
    });

    await expect(service.list({ name: " Nobody " })).resolves.toEqual([]);
    expect(read).toHaveBeenCalledWith({ name: "nobody" });
    expect(search).toHaveBeenCalledWith({ name: "nobody" });
    expect(write).toHaveBeenCalledWith({ name: "nobody" }, []);
    expect(unlink).not.toHaveBeenCalled();
    expect(warnings).toEqual([]);
  });

  it("warns, unlinks, and replaces one malformed cached value", async () => {
    const malformed = JSON.stringify([{ ...summaryFixture, comment: "no" }]);
    const search = vi.fn(async () => [summaryFixture]);
    const read = vi.fn(async () => malformed);
    const { cache, write, unlink } = createCache({ read });
    const warnings: string[] = [];
    const createCharacterReadService = await loadCharacterReadServiceFactory();
    const service = createCharacterReadService({
      repository: { search },
      cache,
      writeWarning: (diagnostic) => warnings.push(diagnostic),
    });

    await expect(service.list({ name: " Morty " })).resolves.toEqual([
      summaryFixture,
    ]);
    expect(unlink).toHaveBeenCalledOnce();
    expect(unlink).toHaveBeenCalledWith({ name: "morty" });
    expect(search).toHaveBeenCalledWith({ name: "morty" });
    expect(write).toHaveBeenCalledWith({ name: "morty" }, [summaryFixture]);
    expect(warnings).toEqual(["CHARACTER_SEARCH_CACHE_VALUE_INVALID\n"]);
  });

  it("fails open with only the applicable safe read or write warning", async () => {
    const readFailure = new Error("redis://secret@internal read stack");
    const writeFailure = new Error("redis://secret@internal write stack");
    const search = vi.fn(async () => [summaryFixture]);
    const read = vi.fn(async () => {
      throw readFailure;
    });
    const write = vi.fn(async () => {
      throw writeFailure;
    });
    const { cache } = createCache({ read, write });
    const warnings: string[] = [];
    const createCharacterReadService = await loadCharacterReadServiceFactory();
    const service = createCharacterReadService({
      repository: { search },
      cache,
      writeWarning: (diagnostic) => warnings.push(diagnostic),
    });

    await expect(service.list({ name: " Morty " })).resolves.toEqual([
      summaryFixture,
    ]);
    expect(search).toHaveBeenCalledWith({ name: "morty" });
    expect(warnings).toEqual([
      "CHARACTER_SEARCH_CACHE_READ_FAILED\n",
      "CHARACTER_SEARCH_CACHE_WRITE_FAILED\n",
    ]);
    expect(warnings.join("")).not.toContain("secret");
    expect(warnings.join("")).not.toContain("stack");
  });

  it("writes exactly one newline-terminated default warning to stderr", async () => {
    const read = vi.fn(async () => {
      throw new Error("redis://secret@internal read stack");
    });
    const search = vi.fn(async () => [summaryFixture]);
    const { cache } = createCache({ read });
    const createCharacterReadService = await loadCharacterReadServiceFactory();
    let stderrOutput = "";
    const stderrWrite = vi
      .spyOn(process.stderr, "write")
      .mockImplementation(
        ((chunk: string | Uint8Array) => {
          stderrOutput += chunk.toString();
          return true;
        }) as typeof process.stderr.write,
      );
    const consoleWarn = vi.spyOn(console, "warn").mockImplementation((...values) => {
      process.stderr.write(`${values.map(String).join(" ")}\n`);
    });

    try {
      const service = createCharacterReadService({
        repository: { search },
        cache,
      });

      await expect(service.list({ name: "Morty" })).resolves.toEqual([
        summaryFixture,
      ]);
      expect(stderrOutput).toBe("CHARACTER_SEARCH_CACHE_READ_FAILED\n");
    } finally {
      consoleWarn.mockRestore();
      stderrWrite.mockRestore();
    }
  });

  it("reports encode rejection as a write failure without discarding PostgreSQL data", async () => {
    const invalidSummary = {
      ...summaryFixture,
      detail: "must not enter Redis",
    } as unknown as CharacterSummary;
    const search = vi.fn(async () => [invalidSummary]);
    const { cache, write } = createCache();
    const warnings: string[] = [];
    const createCharacterReadService = await loadCharacterReadServiceFactory();
    const service = createCharacterReadService({
      repository: { search },
      cache,
      writeWarning: (diagnostic) => warnings.push(diagnostic),
    });

    await expect(service.list({ name: "Morty" })).resolves.toEqual([
      invalidSummary,
    ]);
    expect(write).not.toHaveBeenCalled();
    expect(warnings).toEqual(["CHARACTER_SEARCH_CACHE_WRITE_FAILED\n"]);
  });

  it("propagates the PostgreSQL failure when no valid cache hit exists", async () => {
    const databaseFailure = new Error("POSTGRESQL_SEARCH_FAILED");
    const search = vi.fn(async () => {
      throw databaseFailure;
    });
    const { cache, write } = createCache();
    const warnings: string[] = [];
    const createCharacterReadService = await loadCharacterReadServiceFactory();
    const service = createCharacterReadService({
      repository: { search },
      cache,
      writeWarning: (diagnostic) => warnings.push(diagnostic),
    });

    await expect(service.list({ name: "Morty" })).rejects.toBe(databaseFailure);
    expect(write).not.toHaveBeenCalled();
    expect(warnings).toEqual([]);
  });
});
