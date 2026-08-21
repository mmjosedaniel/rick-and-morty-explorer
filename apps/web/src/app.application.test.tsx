import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const queryProviderClients = vi.hoisted(() => [] as object[]);

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
      readonly client: object;
    }) => {
      queryProviderClients.push(client);
      return children;
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
});
