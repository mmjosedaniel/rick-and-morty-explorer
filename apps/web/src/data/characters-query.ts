import { QueryClient, queryOptions } from "@tanstack/react-query";

import type { CharactersQuery, CharactersQueryVariables } from "./generated/graphql";

export interface CharacterFilters {
  readonly status?: string | null;
  readonly species?: string | null;
  readonly gender?: string | null;
}

type NormalizedCharacterFilters = Required<CharacterFilters>;
type CharactersExecutor = (
  variables: CharactersQueryVariables,
  signal: AbortSignal,
) => Promise<CharactersQuery>;

function normalizeFilters(filters: CharacterFilters): NormalizedCharacterFilters {
  return {
    status: filters.status ?? null,
    species: filters.species ?? null,
    gender: filters.gender ?? null,
  };
}

export function charactersQueryKey(filters: CharacterFilters) {
  const { status, species, gender } = normalizeFilters(filters);
  return ["characters", status, species, gender] as const;
}

export function createCharactersQueryOptions(
  filters: CharacterFilters,
  executor: CharactersExecutor,
) {
  const variables = normalizeFilters(filters);

  return queryOptions({
    queryKey: charactersQueryKey(variables),
    queryFn: async ({ signal }) => (await executor(variables, signal)).characters,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function createCharactersQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });
}
