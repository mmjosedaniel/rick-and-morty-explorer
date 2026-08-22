import { cleanup, render, screen } from "@testing-library/react";
import type { QueryClient } from "@tanstack/react-query";
import { createElement, type ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const queryProviderClients = vi.hoisted(() => [] as QueryClient[]);

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("@tanstack/react-query")>();

  return {
    ...original,
    QueryClientProvider: ({
      children,
      client,
    }: {
      readonly children: ReactNode;
      readonly client: QueryClient;
    }) => {
      queryProviderClients.push(client);
      return createElement(original.QueryClientProvider, { client, children });
    },
  };
});

vi.mock("./character-list-route", () => ({
  CharacterListRoute: () => null,
}));

import { App } from "./app";
import { createCharactersQueryClient } from "./data/characters-query";

describe("App", () => {
  beforeEach(() => {
    queryProviderClients.length = 0;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the TASK-003 shell at the root route", () => {
    window.history.replaceState({}, "", "/");

    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Rick and Morty Explorer",
      }),
    ).toBeInTheDocument();
  });

  it("accepts a test-owned client while keeping one stable production client", () => {
    window.history.replaceState({}, "", "/");
    const testClient = createCharactersQueryClient();

    render(<App queryClient={testClient} />);

    expect(queryProviderClients).toHaveLength(1);
    expect(queryProviderClients[0]).toBe(testClient);

    cleanup();
    render(<App />);
    const applicationClient = queryProviderClients[1];

    cleanup();
    render(<App />);

    expect(queryProviderClients).toHaveLength(3);
    expect(queryProviderClients[2]).toBe(applicationClient);
    expect(applicationClient).not.toBe(testClient);
  });

  it("registers the addressable character detail route inside the shared shell", () => {
    window.history.replaceState({}, "", "/characters/101");
    vi.stubGlobal("fetch", vi.fn(() => new Promise<Response>(() => {})));

    render(<App queryClient={createCharactersQueryClient()} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Rick and Morty Explorer",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Loading character...",
    );
  });
});
