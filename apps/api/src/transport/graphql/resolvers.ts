import type { CharacterFilterInput } from "../../application/characters/character-read-service.js";
import type { Resolvers } from "./generated/resolver-types.js";
import type { GraphqlContext } from "./graphql-handler.js";

function mapFilter(
  filter:
    | {
        readonly status?: string | null;
        readonly species?: string | null;
        readonly gender?: string | null;
        readonly name?: string | null;
        readonly origin?: string | null;
      }
    | null
    | undefined,
): CharacterFilterInput | undefined {
  if (filter == null) {
    return undefined;
  }

  const mapped: {
    status?: string;
    species?: string;
    gender?: string;
    name?: string;
    origin?: string;
  } = {};

  if (filter.status != null) mapped.status = filter.status;
  if (filter.species != null) mapped.species = filter.species;
  if (filter.gender != null) mapped.gender = filter.gender;
  if (filter.name != null) mapped.name = filter.name;
  if (filter.origin != null) mapped.origin = filter.origin;

  return mapped;
}

export const resolvers: Resolvers<GraphqlContext> = {
  Query: {
    characters: async (_parent, { filter }, { characterReadService }) => {
      const characters = await characterReadService.list(mapFilter(filter));

      return characters.map(({ id, name, imageUrl, species }) => ({
        id: id.toString(),
        name,
        imageUrl,
        species,
      }));
    },
  },
};
