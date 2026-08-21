import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { CharacterCard } from "./character-card";
import {
  CharacterListControls,
  type CharacterListControlValues,
} from "./character-list-controls";
import { graphqlEndpoint } from "./config";
import { createCharactersQueryOptions } from "./data/characters-query";
import {
  CharactersDocument,
  type CharactersQueryVariables,
} from "./data/generated/graphql";
import {
  decodeCharactersData,
  executeGraphql,
} from "./data/graphql-executor";

const characterNameCollator = new Intl.Collator("en", {
  sensitivity: "base",
  usage: "sort",
});
const statuses = new Set(["alive", "dead", "unknown"]);
const genders = new Set(["female", "male", "genderless", "unknown"]);

interface NormalizedLocation {
  readonly values: CharacterListControlValues;
  readonly search: URLSearchParams;
  readonly changed: boolean;
}

function closedValue(value: string | null, accepted: ReadonlySet<string>) {
  const normalized = value?.trim().toLowerCase() ?? "";
  return accepted.has(normalized) ? normalized : null;
}

function normalizeLocation(searchParams: URLSearchParams): NormalizedLocation {
  const rawSort = searchParams.get("sort")?.trim().toLowerCase() ?? "";
  const sort = rawSort === "desc" ? "desc" : "asc";
  const status = closedValue(searchParams.get("status"), statuses);
  const species = searchParams.get("species")?.trim().toLowerCase() ?? "";
  const gender = closedValue(searchParams.get("gender"), genders);
  const search = new URLSearchParams();

  if (sort === "desc") {
    search.set("sort", sort);
  }
  if (status !== null) {
    search.set("status", status);
  }
  if (species !== "") {
    search.set("species", species);
  }
  if (gender !== null) {
    search.set("gender", gender);
  }

  return {
    values: { sort, status, species, gender },
    search,
    changed: search.toString() !== searchParams.toString(),
  };
}

function searchForAppliedValues(values: CharacterListControlValues) {
  const search = new URLSearchParams();
  if (values.sort === "desc") {
    search.set("sort", values.sort);
  }

  const status = closedValue(values.status, statuses);
  if (status !== null) {
    search.set("status", status);
  }

  const species = values.species.trim().toLowerCase();
  if (species !== "") {
    search.set("species", species);
  }

  const gender = closedValue(values.gender, genders);
  if (gender !== null) {
    search.set("gender", gender);
  }

  return search;
}

async function fetchCharacters(
  variables: CharactersQueryVariables,
  signal: AbortSignal,
) {
  return await executeGraphql({
    endpoint: graphqlEndpoint,
    document: CharactersDocument,
    variables,
    decode: decodeCharactersData,
    signal,
  });
}

export function CharacterListRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const normalizedLocation = normalizeLocation(searchParams);
  const { sort, status, species, gender } = normalizedLocation.values;

  useEffect(() => {
    if (normalizedLocation.changed) {
      setSearchParams(normalizedLocation.search, { replace: true });
    }
  }, [
    normalizedLocation.changed,
    normalizedLocation.search,
    setSearchParams,
  ]);

  const query = useQuery(
    createCharactersQueryOptions(
      {
        status,
        species: species === "" ? null : species,
        gender,
      },
      fetchCharacters,
    ),
  );

  const characters = [...(query.data ?? [])].sort((left, right) => {
    const nameComparison = characterNameCollator.compare(left.name, right.name);
    if (nameComparison !== 0) {
      return sort === "asc" ? nameComparison : -nameComparison;
    }

    return Number(left.id) - Number(right.id);
  });

  return (
    <section className="character-list-route" aria-labelledby="characters-heading">
      <h2 id="characters-heading">Characters</h2>
      <CharacterListControls
        values={normalizedLocation.values}
        onApply={(values) => setSearchParams(searchForAppliedValues(values))}
      />

      {query.isPending ? (
        <p className="query-state" role="status">
          Loading characters...
        </p>
      ) : query.isError ? (
        <div className="query-state query-state--error" role="alert">
          <p>Characters could not be loaded.</p>
          <button type="button" onClick={() => void query.refetch()}>
            Retry
          </button>
        </div>
      ) : characters.length === 0 ? (
        <p className="query-state" role="status">
          No characters match these filters.
        </p>
      ) : (
        <div className="character-grid">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </section>
  );
}
