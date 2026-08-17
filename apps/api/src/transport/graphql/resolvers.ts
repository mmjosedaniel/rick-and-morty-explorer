import type { GraphQLError } from "graphql";
import { createGraphQLError } from "graphql-yoga";

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

function badUserInput(): GraphQLError {
  return createGraphQLError("Invalid character request", {
    extensions: { code: "BAD_USER_INPUT" },
  });
}

function parseCharacterId(value: string): number {
  if (!/^[0-9]+$/u.test(value)) throw badUserInput();
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id <= 0) throw badUserInput();
  return id;
}

function validatePage(limit: number, offset: number): void {
  if (
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > 50 ||
    !Number.isInteger(offset) ||
    offset < 0
  ) {
    throw badUserInput();
  }
}

function internalError(
  error: unknown,
  reportUnexpectedError: (error: unknown) => void,
): GraphQLError {
  reportUnexpectedError(error);
  return createGraphQLError("Internal server error", {
    extensions: { code: "INTERNAL_SERVER_ERROR" },
  });
}

export const resolvers: Resolvers<GraphqlContext> = {
  Query: {
    characters: async (
      _parent,
      { filter },
      { characterReadService, reportUnexpectedError },
    ) => {
      try {
        const characters = await characterReadService.list(mapFilter(filter));

        return characters.map(({ id, name, imageUrl, species }) => ({
          id: id.toString(),
          name,
          imageUrl,
          species,
        }));
      } catch (error) {
        throw internalError(error, reportUnexpectedError);
      }
    },
    character: async (
      _parent,
      { id: rawId },
      { characterReadService, reportUnexpectedError },
    ) => {
      const id = parseCharacterId(rawId);
      const detail = characterReadService.detail;
      if (detail === undefined) {
        throw internalError(
          new Error("CHARACTER_DETAIL_SERVICE_UNAVAILABLE"),
          reportUnexpectedError,
        );
      }

      let character;
      try {
        character = await detail(id);
      } catch (error) {
        throw internalError(error, reportUnexpectedError);
      }

      if (character === null) {
        throw createGraphQLError("Character not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      return { ...character, id: character.id.toString(), comments: [] };
    },
  },
  CharacterDetail: {
    comments: async (
      { id: rawId },
      { limit, offset },
      { characterReadService, reportUnexpectedError },
    ) => {
      validatePage(limit, offset);
      const characterId = parseCharacterId(rawId);
      const comments = characterReadService.comments;
      if (comments === undefined) {
        throw internalError(
          new Error("CHARACTER_COMMENT_SERVICE_UNAVAILABLE"),
          reportUnexpectedError,
        );
      }

      try {
        return (await comments(characterId, { limit, offset })).map(
          ({ id, body }) => ({ id: id.toString(), body }),
        );
      } catch (error) {
        throw internalError(error, reportUnexpectedError);
      }
    },
  },
};
