import {
  act,
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
import {
  charactersQueryKey,
  createCharactersQueryClient,
} from "./data/characters-query";

interface RequestedVariables {
  readonly status: string | null;
  readonly species: string | null;
  readonly gender: string | null;
}

const requests: RequestedVariables[] = [];
let retryAttempts = 0;
let pendingResponse: Promise<Response> | undefined;
let testQueryClient: QueryClient;

const defaultCharacters = [
  {
    id: "10",
    name: "alpha",
    imageUrl: "https://example.test/alpha-10.jpeg",
    species: "Human",
  },
  {
    id: "2",
    name: "Alpha",
    imageUrl: "https://example.test/alpha-2.jpeg",
    species: "Alien",
  },
  {
    id: "3",
    name: "Zeta",
    imageUrl: "https://example.test/zeta.jpeg",
    species: "Mytholog",
  },
];

function responseWith(
  characters: readonly {
    readonly id: string;
    readonly name: string;
    readonly imageUrl: string;
    readonly species: string;
  }[],
): Response {
  return new Response(JSON.stringify({ data: { characters } }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function resultFor(variables: RequestedVariables) {
  const suffix = [variables.status, variables.species, variables.gender]
    .filter((value): value is string => value !== null)
    .join("-");
  return [
    {
      id: "1",
      name: suffix === "" ? "Default Result" : `${suffix} Result`,
      imageUrl: "https://example.test/result.jpeg",
      species: variables.species ?? "Human",
    },
  ];
}

function requestVariables(init: RequestInit | undefined): RequestedVariables {
  const payload = JSON.parse(String(init?.body)) as {
    readonly variables: RequestedVariables;
  };
  return payload.variables;
}

const fetchMock = vi.fn<typeof fetch>(async (_input, init) => {
  const variables = requestVariables(init);
  requests.push(variables);

  if (variables.species === "pending") {
    return await (pendingResponse ?? new Promise<Response>(() => {}));
  }

  if (variables.species === "empty") {
    return responseWith([]);
  }

  if (variables.species === "retry" && retryAttempts++ === 0) {
    return new Response("temporary failure", {
      status: 503,
      headers: { "content-type": "text/plain" },
    });
  }

  if (
    variables.status === null &&
    variables.species === null &&
    variables.gender === null
  ) {
    return responseWith(defaultCharacters);
  }

  return responseWith(resultFor(variables));
});

function normalizedSearch() {
  return new URLSearchParams(window.location.search);
}

function renderApp() {
  return render(<App queryClient={testQueryClient} />);
}

function visibleNames() {
  return screen
    .getAllByRole("article")
    .map((card) => within(card).getByRole("heading", { level: 3 }).textContent);
}

function apply(values: {
  readonly sort?: string;
  readonly status?: string;
  readonly species?: string;
  readonly gender?: string;
}) {
  if (values.sort !== undefined) {
    fireEvent.change(screen.getByLabelText("Sort"), {
      target: { value: values.sort },
    });
  }
  if (values.status !== undefined) {
    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: values.status },
    });
  }
  if (values.species !== undefined) {
    fireEvent.change(screen.getByLabelText("Species"), {
      target: { value: values.species },
    });
  }
  if (values.gender !== undefined) {
    fireEvent.change(screen.getByLabelText("Gender"), {
      target: { value: values.gender },
    });
  }
  fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));
}

beforeEach(() => {
  requests.length = 0;
  retryAttempts = 0;
  pendingResponse = undefined;
  testQueryClient = createCharactersQueryClient();
  window.history.replaceState({}, "", "/");
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockClear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("the TASK-010 root character list", () => {
  it("renders the bounded semantic surface and stable two-direction ordering", async () => {
    renderApp();

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Rick and Morty Explorer",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Characters" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Loading characters...")).toBeInTheDocument();

    await screen.findAllByRole("article");
    expect(testQueryClient.getQueryData(charactersQueryKey({}))).toEqual(
      defaultCharacters,
    );
    expect(visibleNames()).toEqual(["Alpha", "alpha", "Zeta"]);
    expect(screen.getByLabelText("Sort")).toHaveValue("asc");

    const requestsBeforeDefaultApply = requests.length;
    fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));
    expect(window.location.search).toBe("");
    expect(requests).toHaveLength(requestsBeforeDefaultApply);

    apply({ sort: "desc" });

    await waitFor(() => {
      expect(visibleNames()).toEqual(["Zeta", "Alpha", "alpha"]);
    });
    expect(normalizedSearch().get("sort")).toBe("desc");
    expect(requests).toEqual([
      { status: null, species: null, gender: null },
    ]);
  });

  it.each([
    ["status", "alive", "alive Result"],
    ["species", " Human ", "human Result"],
    ["gender", "female", "female Result"],
  ] as const)(
    "maps the %s filter from Apply to the normalized URL, query, and result",
    async (field, draft, resultName) => {
      renderApp();
      await screen.findAllByRole("article");

      apply({
        status: field === "status" ? draft : "",
        species: field === "species" ? draft : "",
        gender: field === "gender" ? draft : "",
      });

      expect(await screen.findByText(resultName)).toBeInTheDocument();
      expect(normalizedSearch().get(field)).toBe(draft.trim().toLowerCase());
      expect(normalizedSearch().has("sort")).toBe(false);
      expect(requests.at(-1)).toEqual({
        status: field === "status" ? "alive" : null,
        species: field === "species" ? "human" : null,
        gender: field === "gender" ? "female" : null,
      });
    },
  );

  it("keeps drafts transient and applies one combined URL-owned query", async () => {
    renderApp();
    await screen.findAllByRole("article");

    fireEvent.change(screen.getByLabelText("Sort"), {
      target: { value: "desc" },
    });
    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "dead" },
    });
    fireEvent.change(screen.getByLabelText("Species"), {
      target: { value: " Alien " },
    });
    fireEvent.change(screen.getByLabelText("Gender"), {
      target: { value: "female" },
    });

    expect(window.location.search).toBe("");
    expect(requests).toHaveLength(1);

    fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));

    expect(await screen.findByText("dead-alien-female Result")).toBeInTheDocument();
    const search = normalizedSearch();
    expect(search.get("sort")).toBe("desc");
    expect(search.get("status")).toBe("dead");
    expect(search.get("species")).toBe("alien");
    expect(search.get("gender")).toBe("female");
    expect(requests.at(-1)).toEqual({
      status: "dead",
      species: "alien",
      gender: "female",
    });
    expect(JSON.stringify(requests.at(-1))).not.toContain("sort");
  });

  it("replaces an explicit default sort without changing query variables", async () => {
    window.history.replaceState({}, "", "/?sort=asc");
    const originalLength = window.history.length;

    renderApp();

    await screen.findAllByRole("article");
    await waitFor(() => expect(window.location.search).toBe(""));
    expect(window.history.length).toBe(originalLength);
    expect(screen.getByLabelText("Sort")).toHaveValue("asc");
    expect(requests).toEqual([
      { status: null, species: null, gender: null },
    ]);
  });

  it("replaces unsupported URL values before querying", async () => {
    window.history.replaceState(
      {},
      "",
      "/?sort=sideways&status=maybe&species=%20%20&gender=robot",
    );
    const originalLength = window.history.length;
    const replaceState = vi.spyOn(window.history, "replaceState");

    renderApp();

    await screen.findAllByRole("article");
    expect(window.history.length).toBe(originalLength);
    expect(replaceState).toHaveBeenCalled();
    expect(normalizedSearch().has("sort")).toBe(false);
    expect(normalizedSearch().has("status")).toBe(false);
    expect(normalizedSearch().has("species")).toBe(false);
    expect(normalizedSearch().has("gender")).toBe(false);
    expect(screen.getByLabelText("Sort")).toHaveValue("asc");
    expect(requests.at(-1)).toEqual({
      status: null,
      species: null,
      gender: null,
    });
  });

  it("restores URL-derived controls, queries, and results after reload and navigation", async () => {
    window.history.replaceState({}, "", "/?status=alive");
    renderApp();
    expect(await screen.findByText("alive Result")).toBeInTheDocument();

    apply({
      sort: "desc",
      status: "dead",
      species: "Alien",
      gender: "female",
    });
    expect(await screen.findByText("dead-alien-female Result")).toBeInTheDocument();

    cleanup();
    renderApp();
    expect(await screen.findByText("dead-alien-female Result")).toBeInTheDocument();
    expect(screen.getByLabelText("Sort")).toHaveValue("desc");
    expect(screen.getByLabelText("Status")).toHaveValue("dead");
    expect(screen.getByLabelText("Species")).toHaveValue("alien");
    expect(screen.getByLabelText("Gender")).toHaveValue("female");

    act(() => window.history.back());
    await waitFor(() => expect(normalizedSearch().get("status")).toBe("alive"));
    expect(await screen.findByText("alive Result")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toHaveValue("alive");

    act(() => window.history.forward());
    await waitFor(() => expect(normalizedSearch().get("status")).toBe("dead"));
    expect(await screen.findByText("dead-alien-female Result")).toBeInTheDocument();
    expect(screen.getByLabelText("Sort")).toHaveValue("desc");
  });

  it("distinguishes loading and empty results", async () => {
    window.history.replaceState({}, "", "/?species=pending");
    renderApp();
    expect(screen.getByText("Loading characters...")).toBeInTheDocument();

    cleanup();
    window.history.replaceState({}, "", "/?species=empty");
    renderApp();
    expect(
      await screen.findByText("No characters match these filters."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("retries one failed query with the same normalized key", async () => {
    window.history.replaceState({}, "", "/?species=retry");
    renderApp();

    expect(
      await screen.findByText("Characters could not be loaded."),
    ).toBeInTheDocument();
    const retry = screen.getByRole("button", { name: "Retry" });
    expect(screen.getAllByRole("button", { name: "Retry" })).toHaveLength(1);

    fireEvent.click(retry);

    expect(await screen.findByText("retry Result")).toBeInTheDocument();
    expect(requests).toEqual([
      { status: null, species: "retry", gender: null },
      { status: null, species: "retry", gender: null },
    ]);
  });
});
