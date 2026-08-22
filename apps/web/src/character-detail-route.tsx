import { useRef, useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { graphqlEndpoint } from "./config";
import {
  createCharacterDetailQueryOptions,
  executeCharacterDetailMutation,
} from "./data/characters-query";
import {
  AddCharacterCommentDocument,
  type AddCharacterCommentMutationVariables,
  CharacterDetailDocument,
  type CharacterDetailQueryVariables,
  SetCharacterFavoriteDocument,
  type SetCharacterFavoriteMutationVariables,
} from "./data/generated/graphql";
import {
  decodeAddCharacterCommentData,
  decodeCharacterDetailData,
  decodeSetCharacterFavoriteData,
  executeGraphql,
  GraphqlRequestError,
} from "./data/graphql-executor";

async function fetchCharacterDetail(
  variables: CharacterDetailQueryVariables,
  signal: AbortSignal,
) {
  return await executeGraphql({
    endpoint: graphqlEndpoint,
    document: CharacterDetailDocument,
    variables,
    decode: decodeCharacterDetailData,
    signal,
  });
}

async function setCharacterFavorite(
  variables: SetCharacterFavoriteMutationVariables,
) {
  return await executeGraphql({
    endpoint: graphqlEndpoint,
    document: SetCharacterFavoriteDocument,
    variables,
    decode: decodeSetCharacterFavoriteData,
  });
}

async function addCharacterComment(
  variables: AddCharacterCommentMutationVariables,
) {
  return await executeGraphql({
    endpoint: graphqlEndpoint,
    document: AddCharacterCommentDocument,
    variables,
    decode: decodeAddCharacterCommentData,
  });
}

type InteractionFeedback =
  | "favorite-error"
  | "favorite-persisted-but-not-refreshed"
  | "comment-error"
  | "comment-persisted-but-not-refreshed"
  | null;

export function CharacterDetailRoute() {
  const { id = "" } = useParams();
  const queryClient = useQueryClient();
  const detailQueryOptions = createCharacterDetailQueryOptions(
    id,
    fetchCharacterDetail,
  );
  const query = useQuery(detailQueryOptions);
  const commentInput = useRef<HTMLTextAreaElement>(null);
  const [commentValidation, setCommentValidation] = useState<string | null>(
    null,
  );
  const [pendingInteraction, setPendingInteraction] = useState<
    "favorite" | "comment" | null
  >(null);
  const [feedback, setFeedback] = useState<InteractionFeedback>(null);
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);

  if (query.isPending) {
    return (
      <p className="query-state" role="status">
        Loading character...
      </p>
    );
  }

  if (query.isError && query.data === undefined) {
    const isNotFound =
      query.error instanceof GraphqlRequestError &&
      query.error.codes?.includes("NOT_FOUND") === true;

    if (isNotFound) {
      return (
        <section className="character-detail-route">
          <p className="query-state" role="status">
            Character not found.
          </p>
          <Link className="text-link" to="/">
            Back to characters
          </Link>
        </section>
      );
    }

    return (
      <div className="query-state query-state--error" role="alert">
        <p>Character could not be loaded.</p>
        <button type="button" onClick={() => void query.refetch()}>
          Retry
        </button>
      </div>
    );
  }

  const character = query.data;
  if (character === null) {
    return (
      <section className="character-detail-route">
        <p className="query-state" role="status">
          Character not found.
        </p>
        <Link className="text-link" to="/">
          Back to characters
        </Link>
      </section>
    );
  }


  const interactionsArePending = pendingInteraction !== null;
  const nextFavoriteState = !character.isFavorite;

  async function updateFavorite() {
    setFeedback(null);
    setPendingInteraction("favorite");

    try {
      const outcome = await executeCharacterDetailMutation({
        queryClient,
        detailQueryOptions,
        mutation: async () =>
          await setCharacterFavorite({
            id,
            isFavorite: nextFavoriteState,
          }),
      });
      setFeedback(
        outcome === "persisted-but-not-refreshed"
          ? "favorite-persisted-but-not-refreshed"
          : null,
      );
    } catch {
      setFeedback("favorite-error");
    } finally {
      setPendingInteraction(null);
    }
  }

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedBody = commentInput.current?.value.trim() ?? "";
    const codePointLength = Array.from(trimmedBody).length;

    if (codePointLength < 1 || codePointLength > 1_000) {
      setCommentValidation("Enter 1 to 1,000 characters.");
      return;
    }

    setCommentValidation(null);
    setFeedback(null);
    setPendingInteraction("comment");

    try {
      const outcome = await executeCharacterDetailMutation({
        queryClient,
        detailQueryOptions,
        mutation: async () =>
          await addCharacterComment({ characterId: id, body: trimmedBody }),
      });
      if (commentInput.current !== null) {
        commentInput.current.value = "";
      }
      setFeedback(
        outcome === "persisted-but-not-refreshed"
          ? "comment-persisted-but-not-refreshed"
          : null,
      );
    } catch {
      setFeedback("comment-error");
    } finally {
      setPendingInteraction(null);
    }
  }

  async function retryDetails() {
    const result = await query.refetch();
    if (result.isSuccess) {
      setFeedback(null);
    }
  }

  const feedbackMessage =
    feedback === "favorite-error"
      ? "Favorite could not be updated."
      : feedback === "favorite-persisted-but-not-refreshed"
        ? "Favorite was saved, but details could not be refreshed."
        : feedback === "comment-error"
          ? "Comment could not be added."
          : feedback === "comment-persisted-but-not-refreshed"
            ? "Comment was saved, but details could not be refreshed."
            : null;
  const canRetryDetails =
    feedback === "favorite-persisted-but-not-refreshed" ||
    feedback === "comment-persisted-but-not-refreshed";
  const imageHasFailed = failedImageUrl === character.imageUrl;

  return (
    <article className="character-detail-route">
      <Link className="text-link" to="/">
        Back to characters
      </Link>
      <div className="character-detail">
        {imageHasFailed ? (
          <div
            className="character-detail__image character-detail__image--fallback"
            role="img"
            aria-label={character.name}
          >
            Image unavailable
          </div>
        ) : (
          <img
            className="character-detail__image"
            src={character.imageUrl}
            alt={character.name}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            width="300"
            height="300"
            onError={() => {
              setFailedImageUrl(character.imageUrl);
            }}
          />
        )}
        <div className="character-detail__content">
          <h2>{character.name}</h2>
          <dl className="character-detail__metadata">
            <div>
              <dt>Species</dt>
              <dd>{character.species}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{character.status}</dd>
            </div>
            <div>
              <dt>Gender</dt>
              <dd>{character.gender}</dd>
            </div>
            <div>
              <dt>Origin</dt>
              <dd>{character.origin.name}</dd>
            </div>
            {character.type !== "" ? (
              <div>
                <dt>Type</dt>
                <dd>{character.type}</dd>
              </div>
            ) : null}
          </dl>
          <button
            className="favorite-state"
            type="button"
            aria-pressed={character.isFavorite}
            disabled={interactionsArePending}
            onClick={() => void updateFavorite()}
          >
            {pendingInteraction === "favorite"
              ? "Saving favorite..."
              : character.isFavorite
                ? "Remove from favorites"
                : "Add to favorites"}
          </button>
          {feedbackMessage !== null ? (
            <div
              className={`interaction-feedback${
                canRetryDetails ? "" : " interaction-feedback--error"
              }`}
              role={canRetryDetails ? "status" : "alert"}
            >
              <p>{feedbackMessage}</p>
              {canRetryDetails ? (
                <button type="button" onClick={() => void retryDetails()}>
                  Retry details
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <section className="character-comments" aria-labelledby="comments-heading">
        <h3 id="comments-heading">Comments</h3>
        <form
          className="character-comment-form"
          onSubmit={(event) => void submitComment(event)}
        >
          <label htmlFor="character-comment">Comment</label>
          <textarea
            id="character-comment"
            ref={commentInput}
            disabled={interactionsArePending}
            aria-describedby={
              commentValidation === null ? undefined : "comment-validation"
            }
            onChange={() => {
              setCommentValidation(null);
            }}
          />
          {commentValidation !== null ? (
            <p
              className="character-comment-form__validation"
              id="comment-validation"
              role="alert"
            >
              {commentValidation}
            </p>
          ) : null}
          <button type="submit" disabled={interactionsArePending}>
            {pendingInteraction === "comment"
              ? "Adding comment..."
              : "Add comment"}
          </button>
        </form>
        {character.comments.length === 0 ? (
          <p className="query-state">No comments yet.</p>
        ) : (
          <ul>
            {character.comments.map((comment) => (
              <li key={comment.id}>{comment.body}</li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
