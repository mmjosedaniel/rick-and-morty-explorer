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

import {
  decodeCharacterSummaries,
  encodeCharacterSummaries,
  type CharacterSearchCache,
} from "./character-search-cache.js";

const CACHE_READ_FAILED = "CHARACTER_SEARCH_CACHE_READ_FAILED\n";
const CACHE_VALUE_INVALID = "CHARACTER_SEARCH_CACHE_VALUE_INVALID\n";
const CACHE_WRITE_FAILED = "CHARACTER_SEARCH_CACHE_WRITE_FAILED\n";

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
      normalized[key] = value.toLowerCase();
    }
  }

  return Object.keys(normalized).length === 0 ? undefined : normalized;
}

export function createCharacterReadService(options: {
  readonly repository: CharacterReadRepository;
  readonly cache?: CharacterSearchCache;
  readonly writeWarning?: (diagnostic: string) => void;
}): CharacterReadService {
  const findDetail = options.repository.findDetail;
  const listComments = options.repository.listComments;

  const list = async (
    filter: CharacterFilterInput | undefined,
  ): Promise<readonly CharacterSummary[]> => {
    const normalizedFilter = normalizeFilter(filter);
    if (options.cache === undefined) {
      return options.repository.search(normalizedFilter);
    }

    const cacheFilter = normalizedFilter ?? {};
    const writeWarning =
      options.writeWarning ??
      ((diagnostic: string) => process.stderr.write(diagnostic));
    let raw: string | null = null;

    try {
      raw = await options.cache.read(cacheFilter);
    } catch {
      writeWarning(CACHE_READ_FAILED);
    }

    if (raw !== null) {
      const cachedSummaries = decodeCharacterSummaries(raw);
      if (cachedSummaries !== null) {
        return cachedSummaries;
      }

      writeWarning(CACHE_VALUE_INVALID);
      try {
        await options.cache.unlink(cacheFilter);
      } catch {
        writeWarning(CACHE_WRITE_FAILED);
      }
    }

    const summaries = await options.repository.search(cacheFilter);
    try {
      encodeCharacterSummaries(summaries);
      await options.cache.write(cacheFilter, summaries);
    } catch {
      writeWarning(CACHE_WRITE_FAILED);
    }
    return summaries;
  };

  return {
    list,
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
