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

interface CharacterImportServiceOptions {
  readonly client: {
    fetchCharacters(ids: readonly number[]): Promise<readonly unknown[]>;
  };
  readonly repository: {
    publishCharacters(records: readonly CharacterImportRecord[]): Promise<void>;
  };
}

interface CharacterImportService {
  importBaseline(): Promise<void>;
}

const baselineIds = Object.freeze(
  Array.from({ length: 15 }, (_, index) => index + 1),
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(
  record: Readonly<Record<string, unknown>>,
  field: string,
): string {
  const value = record[field];
  if (typeof value !== "string") {
    throw new Error(`Invalid upstream character field: ${field}`);
  }

  return value;
}

function validateCharacter(
  payload: unknown,
  requestedId: number,
): CharacterImportRecord {
  if (!isRecord(payload) || payload.id !== requestedId) {
    throw new Error(`Invalid upstream character for requested ID ${requestedId}`);
  }

  const origin = payload.origin;
  if (!isRecord(origin)) {
    throw new Error(`Invalid upstream origin for requested ID ${requestedId}`);
  }

  const imageUrl = requireString(payload, "image");
  const expectedImageUrl =
    `https://rickandmortyapi.com/api/character/avatar/${requestedId}.jpeg`;
  if (imageUrl !== expectedImageUrl) {
    throw new Error(`Invalid upstream image for requested ID ${requestedId}`);
  }

  return {
    id: requestedId,
    name: requireString(payload, "name"),
    status: requireString(payload, "status"),
    species: requireString(payload, "species"),
    characterType: requireString(payload, "type"),
    gender: requireString(payload, "gender"),
    originName: requireString(origin, "name"),
    originUrl: requireString(origin, "url"),
    imageUrl,
  };
}

export function createCharacterImportService(
  options: CharacterImportServiceOptions,
): CharacterImportService {
  return {
    async importBaseline(): Promise<void> {
      const payloads = await options.client.fetchCharacters(baselineIds);
      if (payloads.length !== baselineIds.length) {
        throw new Error("Upstream character baseline is incomplete");
      }

      const records = payloads.map((payload, index) =>
        validateCharacter(payload, baselineIds[index] as number),
      );
      await options.repository.publishCharacters(records);
    },
  };
}
