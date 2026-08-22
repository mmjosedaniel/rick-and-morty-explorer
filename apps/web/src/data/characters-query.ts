import { QueryClient, queryOptions } from "@tanstack/react-query";

import type {
  CharacterDetailQuery,
  CharacterDetailQueryVariables,
  CharactersQuery,
  CharactersQueryVariables,
} from "./generated/graphql";

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
type CharacterDetailExecutor = (
  variables: CharacterDetailQueryVariables,
  signal: AbortSignal,
) => Promise<CharacterDetailQuery>;

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

export function characterDetailQueryKey(id: string) {
  return ["character-detail", id] as const;
}

export function createCharacterDetailQueryOptions(
  id: string,
  executor: CharacterDetailExecutor,
) {
  return queryOptions({
    queryKey: characterDetailQueryKey(id),
    queryFn: async ({ signal }) => (await executor({ id }, signal)).character,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

interface ExecuteCharacterDetailMutationOptions {
  readonly queryClient: QueryClient;
  readonly detailQueryOptions: ReturnType<
    typeof createCharacterDetailQueryOptions
  >;
  readonly mutation: () => Promise<unknown>;
}

export async function executeCharacterDetailMutation({
  queryClient,
  detailQueryOptions,
  mutation,
}: ExecuteCharacterDetailMutationOptions): Promise<
  "converged" | "persisted-but-not-refreshed"
> {
  await mutation();

  try {
    await queryClient.fetchQuery(detailQueryOptions);
    return "converged";
  } catch {
    return "persisted-but-not-refreshed";
  }
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
