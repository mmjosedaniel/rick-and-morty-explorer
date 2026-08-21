import type { GraphQLError } from "graphql";
import { createGraphQLError } from "graphql-yoga";

import { InvalidCharacterCommentError } from "../../application/characters/character-interaction-service.js";
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

function notFound(): GraphQLError {
  return createGraphQLError("Character not found", {
    extensions: { code: "NOT_FOUND" },
  });
}

function mapCharacterDetail(character: {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
  readonly species: string;
  readonly status: string;
  readonly gender: string;
  readonly type: string;
  readonly origin: { readonly name: string; readonly url: string };
  readonly isFavorite: boolean;
}) {
  return { ...character, id: character.id.toString(), comments: [] };
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
        throw notFound();
      }

      return mapCharacterDetail(character);
    },
  },
  Mutation: {
    setCharacterFavorite: async (
      _parent,
      { id: rawId, isFavorite },
      { characterInteractionService, reportUnexpectedError },
    ) => {
      const id = parseCharacterId(rawId);
      let character;
      try {
        character = await characterInteractionService.setFavorite(
          id,
          isFavorite,
        );
      } catch (error) {
        throw internalError(error, reportUnexpectedError);
      }

      if (character === null) throw notFound();
      return mapCharacterDetail(character);
    },
    addCharacterComment: async (
      _parent,
      { characterId: rawCharacterId, body },
      { characterInteractionService, reportUnexpectedError },
    ) => {
      const characterId = parseCharacterId(rawCharacterId);
      let comment;
      try {
        comment = await characterInteractionService.addComment(
          characterId,
          body,
        );
      } catch (error) {
        if (error instanceof InvalidCharacterCommentError) {
          throw badUserInput();
        }
        throw internalError(error, reportUnexpectedError);
      }

      if (comment === null) throw notFound();
      return { id: comment.id.toString(), body: comment.body };
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
