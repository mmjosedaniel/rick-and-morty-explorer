export interface CharacterSummary {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
  readonly species: string;
}

export interface CharacterOrigin {
  readonly name: string;
  readonly url: string;
}

export interface CharacterDetail extends CharacterSummary {
  readonly status: string;
  readonly gender: string;
  readonly type: string;
  readonly origin: CharacterOrigin;
  readonly isFavorite: boolean;
}

export interface CharacterComment {
  readonly id: number;
  readonly body: string;
}

export interface CommentPage {
  readonly limit: number;
  readonly offset: number;
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
  detail?(id: number): Promise<CharacterDetail | null>;
  comments?(
    characterId: number,
    page: CommentPage,
  ): Promise<readonly CharacterComment[]>;
}

export interface CharacterReadRepository {
  search(
    filter: NormalizedCharacterFilter | undefined,
  ): Promise<readonly CharacterSummary[]>;
  findDetail?(id: number): Promise<CharacterDetail | null>;
  listComments?(
    characterId: number,
    page: CommentPage,
  ): Promise<readonly CharacterComment[]>;
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
  const findDetail = options.repository.findDetail;
  const listComments = options.repository.listComments;

  return {
    list: async (filter) => options.repository.search(normalizeFilter(filter)),
    detail: async (id) => {
      if (findDetail === undefined) {
        throw new Error("CHARACTER_DETAIL_REPOSITORY_UNAVAILABLE");
      }
      return findDetail(id);
    },
    comments: async (characterId, page) => {
      if (listComments === undefined) {
        throw new Error("CHARACTER_COMMENT_REPOSITORY_UNAVAILABLE");
      }
      return listComments(characterId, page);
    },
  };
}
