import type {
  CharacterComment,
  CharacterDetail,
} from "./character-read-service.js";

export interface CharacterInteractionRepository {
  setFavorite(
    id: number,
    isFavorite: boolean,
  ): Promise<CharacterDetail | null>;
  addComment(
    characterId: number,
    body: string,
  ): Promise<CharacterComment | null>;
}

export interface CharacterInteractionService {
  setFavorite(
    id: number,
    isFavorite: boolean,
  ): Promise<CharacterDetail | null>;
  addComment(
    characterId: number,
    body: string,
  ): Promise<CharacterComment | null>;
}

export class InvalidCharacterCommentError extends Error {
  constructor() {
    super("CHARACTER_COMMENT_INVALID");
    this.name = "InvalidCharacterCommentError";
  }
}

export function createCharacterInteractionService(options: {
  readonly repository: CharacterInteractionRepository;
}): CharacterInteractionService {
  return {
    setFavorite: (id, isFavorite) =>
      options.repository.setFavorite(id, isFavorite),
    addComment: async (characterId, body) => {
      const normalizedBody = body.trim();
      const codePointLength = Array.from(normalizedBody).length;
      if (codePointLength < 1 || codePointLength > 1_000) {
        throw new InvalidCharacterCommentError();
      }

      return options.repository.addComment(characterId, normalizedBody);
    },
  };
}
