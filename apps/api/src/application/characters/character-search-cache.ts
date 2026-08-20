import { createHash } from "node:crypto";

import type {
  CharacterSummary,
  NormalizedCharacterFilter,
} from "./character-read-service.js";

const FILTER_KEYS = [
  "status",
  "species",
  "gender",
  "name",
  "origin",
] as const;

const SUMMARY_KEYS = ["id", "name", "imageUrl", "species"] as const;

export interface CharacterSearchCache {
  read(filter: NormalizedCharacterFilter): Promise<string | null>;
  write(
    filter: NormalizedCharacterFilter,
    summaries: readonly CharacterSummary[],
  ): Promise<void>;
  unlink(filter: NormalizedCharacterFilter): Promise<void>;
}

function canonicalizeFilter(
  normalizedFilter: NormalizedCharacterFilter,
): NormalizedCharacterFilter {
  const canonicalFilter: {
    status?: string;
    species?: string;
    gender?: string;
    name?: string;
    origin?: string;
  } = {};

  for (const key of FILTER_KEYS) {
    const value = normalizedFilter[key];
    if (value !== undefined) {
      canonicalFilter[key] = value;
    }
  }

  return canonicalFilter;
}

function canonicalizeCharacterSummary(
  value: unknown,
): CharacterSummary | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  const summary = value as Record<string, unknown>;
  const keys = Object.keys(summary);
  if (
    keys.length !== SUMMARY_KEYS.length ||
    !SUMMARY_KEYS.every((key) => Object.hasOwn(summary, key))
  ) {
    return null;
  }

  const { id, name, imageUrl, species } = summary;
  if (
    typeof id !== "number" ||
    !Number.isSafeInteger(id) ||
    id <= 0 ||
    typeof name !== "string" ||
    typeof imageUrl !== "string" ||
    imageUrl !==
      `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg` ||
    typeof species !== "string"
  ) {
    return null;
  }

  return { id, name, imageUrl, species };
}

function canonicalizeCharacterSummaries(
  value: unknown,
): readonly CharacterSummary[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const summaries: CharacterSummary[] = [];
  for (let index = 0; index < value.length; index += 1) {
    if (!Object.hasOwn(value, index)) {
      return null;
    }

    const summary = canonicalizeCharacterSummary(value[index]);
    if (summary === null) {
      return null;
    }
    summaries.push(summary);
  }

  return summaries;
}

export function buildCharacterSearchCacheKey(
  namespace: string,
  normalizedFilter: NormalizedCharacterFilter,
): string {
  const canonicalBytes = JSON.stringify(canonicalizeFilter(normalizedFilter));
  const digest = createHash("sha256").update(canonicalBytes, "utf8").digest("hex");
  return `${namespace}:characters:search:v1:${digest}`;
}

export function encodeCharacterSummaries(
  value: readonly CharacterSummary[],
): string {
  const summaries = canonicalizeCharacterSummaries(value);
  if (summaries === null) {
    throw new TypeError("INVALID_CHARACTER_SUMMARY_CACHE_VALUE");
  }

  return JSON.stringify(summaries);
}

export function decodeCharacterSummaries(
  raw: string,
): readonly CharacterSummary[] | null {
  try {
    const value: unknown = JSON.parse(raw);
    return canonicalizeCharacterSummaries(value);
  } catch {
    return null;
  }
}
