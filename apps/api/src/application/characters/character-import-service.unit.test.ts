import { describe, expect, it, vi } from "vitest";

const baselineIds = Array.from({ length: 15 }, (_, index) => index + 1);

interface UpstreamOrigin {
  readonly name: string;
  readonly url: string;
}

interface UpstreamCharacter {
  readonly id: number;
  readonly name: string;
  readonly status: string;
  readonly species: string;
  readonly type: string;
  readonly gender: string;
  readonly origin: UpstreamOrigin;
  readonly image?: string;
  readonly url: string;
  readonly location: UpstreamOrigin;
  readonly episode: readonly string[];
  readonly created: string;
}

interface CharacterImportRecord {
  readonly id: number;
  readonly name: string;
  readonly status: string;
  readonly species: string;
  readonly characterType: string;
  readonly gender: string;
  readonly originName: string;
  readonly originUrl: string;
  readonly imageUrl: string;
}

interface CharacterImportService {
  importBaseline(): Promise<void>;
}

interface CharacterImportServiceOptions {
  readonly client: {
    fetchCharacters(ids: readonly number[]): Promise<readonly unknown[]>;
  };
  readonly repository: {
    publishCharacters(records: readonly CharacterImportRecord[]): Promise<void>;
  };
}

type CreateCharacterImportService = (
  options: CharacterImportServiceOptions,
) => CharacterImportService;

async function loadCharacterImportServiceFactory(): Promise<CreateCharacterImportService> {
  const module = (await import("./character-import-service.js")) as Record<
    string,
    unknown
  >;

  expect(
    module.createCharacterImportService,
    "TASK-005 Milestone 1 character import service factory is missing",
  ).toBeTypeOf("function");

  return module.createCharacterImportService as CreateCharacterImportService;
}

function avatarUrl(id: number): string {
  return `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`;
}

function upstreamCharacter(
  id: number,
  overrides: Partial<UpstreamCharacter> = {},
): UpstreamCharacter {
  return {
    id,
    name: `Character ${id}`,
    status: "Alive",
    species: "Human",
    type: id === 1 ? "" : "Test type",
    gender: "Unknown",
    origin: {
      name: `Origin ${id}`,
      url: id === 1 ? "" : `https://rickandmortyapi.com/api/location/${id}`,
    },
    image: avatarUrl(id),
    url: `https://rickandmortyapi.com/api/character/${id}`,
    location: {
      name: `Location ${id}`,
      url: `https://rickandmortyapi.com/api/location/${id + 100}`,
    },
    episode: [`https://rickandmortyapi.com/api/episode/${id}`],
    created: "2017-11-04T18:48:46.250Z",
    ...overrides,
  };
}

function validBatch(): readonly UpstreamCharacter[] {
  return baselineIds.map((id) => upstreamCharacter(id));
}

function batchWithFirst(
  overrides: Readonly<Record<string, unknown>>,
): readonly unknown[] {
  return [
    { ...upstreamCharacter(1), ...overrides },
    ...validBatch().slice(1),
  ];
}

function batchWithFirstOrigin(
  origin: unknown,
): readonly unknown[] {
  return batchWithFirst({ origin });
}

async function createHarness(batch: readonly unknown[]) {
  const fetchCharacters = vi.fn(async () => batch);
  const publishCharacters = vi.fn(async () => {});
  const createCharacterImportService = await loadCharacterImportServiceFactory();
  const service = createCharacterImportService({
    client: { fetchCharacters },
    repository: { publishCharacters },
  });

  return { fetchCharacters, publishCharacters, service };
}

describe("TASK-005 Milestone 1 deterministic character import validation", () => {
  it("requests only IDs 1 through 15 and publishes the exact validated source projection once", async () => {
    const batch = validBatch();
    const { fetchCharacters, publishCharacters, service } =
      await createHarness(batch);

    await expect(service.importBaseline()).resolves.toBeUndefined();

    expect(fetchCharacters).toHaveBeenCalledOnce();
    expect(fetchCharacters).toHaveBeenCalledWith(baselineIds);
    expect(publishCharacters).toHaveBeenCalledOnce();
    expect(publishCharacters).toHaveBeenCalledWith(
      batch.map((character) => ({
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        characterType: character.type,
        gender: character.gender,
        originName: character.origin.name,
        originUrl: character.origin.url,
        imageUrl: character.image,
      })),
    );
  });

  it.each([
    {
      caseName: "non-numeric id",
      batch: () => batchWithFirst({ id: "1" }),
    },
    {
      caseName: "non-string name",
      batch: () => batchWithFirst({ name: null }),
    },
    {
      caseName: "non-string status",
      batch: () => batchWithFirst({ status: 1 }),
    },
    {
      caseName: "non-string species",
      batch: () => batchWithFirst({ species: false }),
    },
    {
      caseName: "missing character type",
      batch: () => {
        const { type: _type, ...withoutType } = upstreamCharacter(1);
        return [withoutType, ...validBatch().slice(1)];
      },
    },
    {
      caseName: "non-string gender",
      batch: () => batchWithFirst({ gender: {} }),
    },
    {
      caseName: "missing origin object",
      batch: () => batchWithFirstOrigin(undefined),
    },
    {
      caseName: "non-object origin",
      batch: () => batchWithFirstOrigin(null),
    },
    {
      caseName: "non-string origin name",
      batch: () => batchWithFirstOrigin({ name: 1, url: "" }),
    },
    {
      caseName: "missing origin URL",
      batch: () => batchWithFirstOrigin({ name: "Origin 1" }),
    },
    {
      caseName: "non-string origin URL",
      batch: () => batchWithFirstOrigin({ name: "Origin 1", url: 1 }),
    },
    {
      caseName: "non-string image",
      batch: () => batchWithFirst({ image: 1 }),
    },
    {
      caseName: "missing record",
      batch: () => validBatch().slice(0, -1),
    },
    {
      caseName: "duplicate record",
      batch: () => {
        const records = [...validBatch()];
        records[14] = upstreamCharacter(14);
        return records;
      },
    },
    {
      caseName: "payload ID mismatched with its requested position",
      batch: () => {
        const records = [...validBatch()];
        return [...records.slice(1), records[0]];
      },
    },
    {
      caseName: "missing Character.image with a valid-looking Character.url",
      batch: () => {
        const records = [...validBatch()];
        const { image: _image, ...withoutImage } = upstreamCharacter(1);
        records[0] = { ...withoutImage, url: avatarUrl(1) };
        return records;
      },
    },
    ...[
      "http://rickandmortyapi.com/api/character/avatar/1.jpeg",
      "https://example.com/api/character/avatar/1.jpeg",
      "https://RICKANDMORTYAPI.com/api/character/avatar/1.jpeg",
      "https://user@rickandmortyapi.com/api/character/avatar/1.jpeg",
      "https://rickandmortyapi.com:443/api/character/avatar/1.jpeg",
      "https://rickandmortyapi.com/api/characters/avatar/1.jpeg",
      "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      "https://rickandmortyapi.com/api/character/avatar/01.jpeg",
      "https://rickandmortyapi.com/api/character/avatar/%31.jpeg",
      "https://rickandmortyapi.com/api/character/avatar/1.jpeg?size=small",
      "https://rickandmortyapi.com/api/character/avatar/1.jpeg#avatar",
      "https://rickandmortyapi.com/api/character\\avatar\\1.jpeg",
      "https://rickandmortyаpi.com/api/character/avatar/1.jpeg",
    ].map((image) => ({
      caseName: `hostile avatar value ${image}`,
      batch: () => {
        const records = [...validBatch()];
        records[0] = upstreamCharacter(1, { image });
        return records;
      },
    })),
  ])("rejects $caseName before publication", async ({ batch }) => {
    const { publishCharacters, service } = await createHarness(batch());

    await expect(service.importBaseline()).rejects.toBeInstanceOf(Error);
    expect(publishCharacters).not.toHaveBeenCalled();
  });
});
