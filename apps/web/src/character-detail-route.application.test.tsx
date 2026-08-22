import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import type { QueryClient } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { App } from "./app";
import { createCharactersQueryClient } from "./data/characters-query";

interface GraphqlRequest {
  readonly url: string;
  readonly query: string;
  readonly variables: Readonly<Record<string, unknown>>;
}

const requests: GraphqlRequest[] = [];
let testQueryClient: QueryClient;
let fetchResponse: (request: GraphqlRequest) => Promise<Response>;

const comments = Array.from({ length: 20 }, (_unused, index) => ({
  id: `COMMENT_ID_MUST_NOT_RENDER_${index + 1}`,
  body:
    index === 0
      ? '<img src="x" onerror="alert(1)">'
      : `Visible comment ${index + 1}`,
}));

function detail(
  id: string,
  options: {
    readonly empty?: boolean;
    readonly imageUrl?: string;
    readonly isFavorite?: boolean;
    readonly comments?: readonly { readonly id: string; readonly body: string }[];
  } = {},
) {
  return {
    id,
    name: `Requested Character ${id}`,
    imageUrl:
      options.imageUrl ??
      `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
    species: "Human",
    status: "Alive",
    gender: "Unknown",
    type: options.empty === true ? "" : "Clone",
    origin: {
      name: "Earth (Replacement Dimension)",
      url: "ORIGIN_URL_MUST_NOT_RENDER",
    },
    isFavorite: options.isFavorite ?? true,
    comments: options.comments ?? (options.empty === true ? [] : comments),
  };
}

function deferredResponse() {
  let resolve!: (response: Response) => void;
  const promise = new Promise<Response>((next) => {
    resolve = next;
  });
  return { promise, resolve };
}

function operationNames() {
  return requests.map(({ query }) =>
    /(?:query|mutation)\s+(\w+)/u.exec(query)?.[1],
  );
}

function graphqlResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/graphql-response+json" },
  });
}

const fetchMock = vi.fn<typeof fetch>(async (input, init) => {
  const payload = JSON.parse(String(init?.body)) as Omit<GraphqlRequest, "url">;
  const request = { url: String(input), ...payload };
  requests.push(request);
  return await fetchResponse(request);
});

function renderDetail(id: string) {
  window.history.replaceState({}, "", `/characters/${id}`);
  testQueryClient = createCharactersQueryClient();
  return render(<App queryClient={testQueryClient} />);
}

beforeEach(() => {
  requests.length = 0;
  fetchResponse = async ({ variables }) =>
    graphqlResponse({ data: { character: detail(String(variables["id"])) } });
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockClear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("the TASK-011 addressable character detail", () => {
  it("loads and reloads only the requested approved detail through GraphQL", async () => {
    renderDetail("7");

    expect(screen.getByRole("status")).toHaveTextContent("Loading character...");
    expect(
      await screen.findByRole("heading", { name: "Requested Character 7" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Alive")).toBeInTheDocument();
    expect(screen.getByText("Unknown")).toBeInTheDocument();
    expect(screen.getByText("Earth (Replacement Dimension)")).toBeInTheDocument();
    expect(screen.getByText("Clone")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove from favorites" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    const image = screen.getByRole("img", { name: "Requested Character 7" });
    expect(image).toHaveAttribute(
      "src",
      "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
    );
    expect(image).toHaveAttribute("crossorigin", "anonymous");
    expect(image).toHaveAttribute("referrerpolicy", "no-referrer");

    expect(screen.getByRole("heading", { name: "Comments" })).toBeInTheDocument();
    expect(screen.getByText(comments[0]?.body ?? "")).toBeInTheDocument();
    expect(screen.getByText("Visible comment 20")).toBeInTheDocument();
    expect(document.querySelector('img[src="x"]')).toBeNull();
    expect(document.body).not.toHaveTextContent("ORIGIN_URL_MUST_NOT_RENDER");
    expect(document.body).not.toHaveTextContent("COMMENT_ID_MUST_NOT_RENDER");

    expect(requests).toHaveLength(1);
    expect(requests[0]).toMatchObject({
      url: "http://127.0.0.1:3000/graphql",
      variables: { id: "7" },
    });
    expect(requests[0]?.query).toMatch(/query\s+CharacterDetail/u);
    expect(requests[0]?.query).toMatch(/comments\s*\{/u);
    expect(requests[0]?.query).not.toMatch(/comments\s*\(/u);
    expect(requests[0]?.query).not.toMatch(/origin\s*\{[^}]*\burl\b/su);
    expect(requests[0]?.query).not.toMatch(/\bmutation\b/u);

    cleanup();
    renderDetail("7");
    expect(
      await screen.findByRole("heading", { name: "Requested Character 7" }),
    ).toBeInTheDocument();
    expect(requests).toHaveLength(2);
    expect(requests.map(({ variables }) => variables)).toEqual([
      { id: "7" },
      { id: "7" },
    ]);
  });

  it("keeps one accessible fallback until a detail refetch changes the image URL", async () => {
    const initialImageUrl =
      "https://rickandmortyapi.com/api/character/avatar/7.jpeg";
    const nextImageUrl =
      "https://rickandmortyapi.com/api/character/avatar/107.jpeg";
    let detailRequests = 0;
    fetchResponse = async (request) => {
      if (/mutation\s+SetCharacterFavorite/u.test(request.query)) {
        return graphqlResponse({ data: { setCharacterFavorite: { id: "7" } } });
      }

      detailRequests += 1;
      return graphqlResponse({
        data: {
          character: detail("7", {
            comments: [],
            imageUrl: detailRequests === 1 ? initialImageUrl : nextImageUrl,
            isFavorite: detailRequests === 1,
          }),
        },
      });
    };

    renderDetail("7");
    const characterName = "Requested Character 7";
    fireEvent.error(await screen.findByRole("img", { name: characterName }));

    const fallback = screen.getByRole("img", { name: characterName });
    expect(within(fallback).getByText("Image unavailable")).toBeVisible();
    expect(fallback).not.toHaveAttribute("src");
    expect(requests).toHaveLength(1);

    fireEvent.click(
      screen.getByRole("button", { name: "Remove from favorites" }),
    );

    await waitFor(() => expect(requests).toHaveLength(3));
    expect(
      await screen.findByRole("img", { name: characterName }),
    ).toHaveAttribute("src", nextImageUrl);
    expect(screen.queryByText("Image unavailable")).not.toBeInTheDocument();
  });

  it("awaits one exact detail refetch before favorite state converges", async () => {
    const mutation = deferredResponse();
    const refetch = deferredResponse();
    let detailRequests = 0;
    fetchResponse = async (request) => {
      if (/mutation\s+SetCharacterFavorite/u.test(request.query)) {
        return await mutation.promise;
      }
      detailRequests += 1;
      if (detailRequests === 1) {
        return graphqlResponse({
          data: { character: detail("7", { isFavorite: false, comments: [] }) },
        });
      }
      return await refetch.promise;
    };

    renderDetail("7");
    const favorite = await screen.findByRole("button", {
      name: "Add to favorites",
    });
    const comment = screen.getByRole("textbox", { name: "Comment" });
    const addComment = screen.getByRole("button", { name: "Add comment" });

    fireEvent.click(favorite);
    expect(screen.getByRole("button", { name: "Saving favorite..." })).toBeDisabled();
    expect(comment).toBeDisabled();
    expect(addComment).toBeDisabled();
    await waitFor(() => expect(requests).toHaveLength(2));
    expect(requests[1]?.variables).toEqual({ id: "7", isFavorite: true });
    expect(operationNames()).toEqual(["CharacterDetail", "SetCharacterFavorite"]);
    expect(requests[1]?.query.replace(/\s+/gu, " ").trim()).toBe(
      "mutation SetCharacterFavorite($id: ID!, $isFavorite: Boolean!) { setCharacterFavorite(id: $id, isFavorite: $isFavorite) { id } }",
    );

    mutation.resolve(
      graphqlResponse({ data: { setCharacterFavorite: { id: "7" } } }),
    );
    await waitFor(() => expect(requests).toHaveLength(3));
    expect(operationNames()).toEqual([
      "CharacterDetail",
      "SetCharacterFavorite",
      "CharacterDetail",
    ]);
    expect(screen.getByRole("button", { name: "Saving favorite..." })).toHaveAttribute(
      "aria-pressed",
      "false",
    );

    refetch.resolve(
      graphqlResponse({ data: { character: detail("7", { comments: [] }) } }),
    );
    expect(
      await screen.findByRole("button", { name: "Remove from favorites" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(requests).toHaveLength(3);
  });

  it("validates and trims comments, then renders only the refetched inert text", async () => {
    const mutation = deferredResponse();
    const refetch = deferredResponse();
    const markup = '<script data-test="unsafe">alert(1)</script>';
    let detailRequests = 0;
    fetchResponse = async (request) => {
      if (/mutation\s+AddCharacterComment/u.test(request.query)) {
        return await mutation.promise;
      }
      detailRequests += 1;
      return detailRequests === 1
        ? graphqlResponse({
            data: {
              character: detail("8", { isFavorite: false, comments: [] }),
            },
          })
        : await refetch.promise;
    };

    renderDetail("8");
    const comment = await screen.findByRole("textbox", { name: "Comment" });
    const submit = screen.getByRole("button", { name: "Add comment" });

    fireEvent.change(comment, { target: { value: "   " } });
    fireEvent.click(submit);
    expect(screen.getByText("Enter 1 to 1,000 characters.")).toBeInTheDocument();
    expect(requests).toHaveLength(1);

    fireEvent.change(comment, { target: { value: "😀".repeat(1_001) } });
    fireEvent.click(submit);
    expect(requests).toHaveLength(1);

    fireEvent.change(comment, { target: { value: `  ${markup}  ` } });
    fireEvent.click(submit);
    expect(screen.getByRole("button", { name: "Adding comment..." })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Add to favorites" })).toBeDisabled();
    await waitFor(() => expect(requests).toHaveLength(2));
    expect(requests[1]?.variables).toEqual({ characterId: "8", body: markup });

    mutation.resolve(
      graphqlResponse({ data: { addCharacterComment: { id: "new-comment", body: markup } } }),
    );
    await waitFor(() => expect(requests).toHaveLength(3));
    expect(screen.queryByText(markup)).not.toBeInTheDocument();
    expect(comment).toHaveValue(`  ${markup}  `);

    refetch.resolve(
      graphqlResponse({
        data: {
          character: detail("8", {
            comments: [{ id: "new-comment", body: markup }],
          }),
        },
      }),
    );
    expect(await screen.findByText(markup)).toBeInTheDocument();
    expect(document.querySelector('script[data-test="unsafe"]')).toBeNull();
    expect(comment).toHaveValue("");
    expect(operationNames()).toEqual([
      "CharacterDetail",
      "AddCharacterComment",
      "CharacterDetail",
    ]);
  });

  it.each([
    {
      label: "favorite",
      start: () =>
        fireEvent.click(screen.getByRole("button", { name: "Add to favorites" })),
      error: "Favorite could not be updated.",
    },
    {
      label: "comment",
      start: () => {
        fireEvent.change(screen.getByRole("textbox", { name: "Comment" }), {
          target: { value: "Keep this draft" },
        });
        fireEvent.click(screen.getByRole("button", { name: "Add comment" }));
      },
      error: "Comment could not be added.",
    },
  ])("keeps the converged detail and sends no refetch when the $label mutation fails", async ({ start, error }) => {
    fetchResponse = async (request) =>
      /\bmutation\b/u.test(request.query)
        ? graphqlResponse({ errors: [{ message: "failed" }] })
        : graphqlResponse({
            data: { character: detail("9", { isFavorite: false, comments: [] }) },
          });

    renderDetail("9");
    await screen.findByRole("heading", { name: "Requested Character 9" });
    start();

    expect(await screen.findByText(error)).toBeInTheDocument();
    expect(requests).toHaveLength(2);
    expect(operationNames()[0]).toBe("CharacterDetail");
    expect(operationNames()[1]).toMatch(/^(?:SetCharacterFavorite|AddCharacterComment)$/u);
    expect(screen.getByRole("button", { name: "Add to favorites" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByText("No comments yet.")).toBeInTheDocument();
    if (error.startsWith("Comment")) {
      expect(screen.getByRole("textbox", { name: "Comment" })).toHaveValue(
        "Keep this draft",
      );
    }
  });

  it.each([
    {
      label: "favorite",
      start: () =>
        fireEvent.click(screen.getByRole("button", { name: "Add to favorites" })),
      mutationData: { setCharacterFavorite: { id: "10" } },
      message: "Favorite was saved, but details could not be refreshed.",
    },
    {
      label: "comment",
      start: () => {
        fireEvent.change(screen.getByRole("textbox", { name: "Comment" }), {
          target: { value: "Persisted comment" },
        });
        fireEvent.click(screen.getByRole("button", { name: "Add comment" }));
      },
      mutationData: {
        addCharacterComment: { id: "persisted-comment", body: "Persisted comment" },
      },
      message: "Comment was saved, but details could not be refreshed.",
    },
  ])("reports saved-but-not-refreshed for a persisted $label and retries only details", async ({ start, mutationData, message }) => {
    let detailRequests = 0;
    fetchResponse = async (request) => {
      if (/\bmutation\b/u.test(request.query)) {
        return graphqlResponse({ data: mutationData });
      }
      detailRequests += 1;
      return detailRequests === 2
        ? graphqlResponse({ errors: [{ message: "refetch failed" }] })
        : graphqlResponse({
            data: { character: detail("10", { isFavorite: false, comments: [] }) },
          });
    };

    renderDetail("10");
    await screen.findByRole("heading", { name: "Requested Character 10" });
    start();

    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(requests).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Add to favorites" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByText("No comments yet.")).toBeInTheDocument();
    if (message.startsWith("Comment")) {
      expect(screen.getByRole("textbox", { name: "Comment" })).toHaveValue("");
    }

    fireEvent.click(screen.getByRole("button", { name: "Retry details" }));
    await waitFor(() => expect(requests).toHaveLength(4));
    expect(operationNames().filter((name) => name === "SetCharacterFavorite" || name === "AddCharacterComment")).toHaveLength(1);
    expect(operationNames().at(-1)).toBe("CharacterDetail");
  });

  it("omits an empty type and distinguishes an empty comment list", async () => {
    fetchResponse = async ({ variables }) =>
      graphqlResponse({
        data: { character: detail(String(variables["id"]), { empty: true }) },
      });

    renderDetail("8");

    await screen.findByRole("heading", { name: "Requested Character 8" });
    expect(screen.queryByText("Type", { exact: true })).not.toBeInTheDocument();
    expect(screen.getByText("No comments yet.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to characters" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders the bounded NOT_FOUND state without substituting a character", async () => {
    fetchResponse = async () =>
      graphqlResponse({
        data: { character: null },
        errors: [
          {
            message: "Character 404 was not found.",
            extensions: { code: "NOT_FOUND" },
          },
        ],
      });

    renderDetail("404");

    expect(await screen.findByText("Character not found.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to characters" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(document.body).not.toHaveTextContent("Character 404 was not found.");
  });

  it("retries one unexpected request failure for the same requested ID", async () => {
    let attempt = 0;
    fetchResponse = async ({ variables }) => {
      attempt += 1;
      return attempt === 1
        ? graphqlResponse({ errors: [{ message: "temporary" }] }, 503)
        : graphqlResponse({
            data: { character: detail(String(variables["id"]), { empty: true }) },
          });
    };

    renderDetail("9");

    expect(
      await screen.findByText("Character could not be loaded."),
    ).toBeInTheDocument();
    const retry = screen.getByRole("button", { name: "Retry" });
    expect(screen.getAllByRole("button", { name: "Retry" })).toHaveLength(1);
    fireEvent.click(retry);

    expect(
      await screen.findByRole("heading", { name: "Requested Character 9" }),
    ).toBeInTheDocument();
    await waitFor(() => expect(requests).toHaveLength(2));
    expect(requests.map(({ variables }) => variables)).toEqual([
      { id: "9" },
      { id: "9" },
    ]);
  });
});
