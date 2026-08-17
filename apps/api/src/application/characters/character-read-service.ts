export interface CharacterSummary {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
  readonly species: string;
}

export interface CharacterFilterInput {
  readonly status?: string;
  readonly species?: string;
  readonly gender?: string;
  readonly name?: string;
  readonly origin?: string;
}

export interface NormalizedCharacterFilter {
  readonly status?: string;
  readonly species?: string;
  readonly gender?: string;
  readonly name?: string;
  readonly origin?: string;
}

export interface CharacterReadService {
  list(
    filter: CharacterFilterInput | undefined,
  ): Promise<readonly CharacterSummary[]>;
}

export interface CharacterReadRepository {
  search(
    filter: NormalizedCharacterFilter | undefined,
  ): Promise<readonly CharacterSummary[]>;
}

function normalizeFilter(
  filter: CharacterFilterInput | undefined,
): NormalizedCharacterFilter | undefined {
  if (filter === undefined) {
    return undefined;
  }

  const normalized: {
    status?: string;
    species?: string;
    gender?: string;
    name?: string;
    origin?: string;
  } = {};

  for (const key of [
    "status",
    "species",
    "gender",
    "name",
    "origin",
  ] as const) {
    const value = filter[key]?.trim();
    if (value !== undefined && value.length > 0) {
      normalized[key] = value;
    }
  }

  return Object.keys(normalized).length === 0 ? undefined : normalized;
}

export function createCharacterReadService(options: {
  readonly repository: CharacterReadRepository;
}): CharacterReadService {
  return {
    list: async (filter) => options.repository.search(normalizeFilter(filter)),
  };
}
