import { describe, expect, it, vi } from "vitest";

interface RickAndMortyCharacterClient {
  fetchCharacters(ids: readonly number[]): Promise<readonly unknown[]>;
}

interface RickAndMortyCharacterClientOptions {
  readonly fetch: typeof fetch;
  readonly timeoutMs: number;
  readonly maxAttempts: number;
}

type CreateRickAndMortyCharacterClient = (
  options: RickAndMortyCharacterClientOptions,
) => RickAndMortyCharacterClient;

async function loadRickAndMortyCharacterClientFactory(): Promise<CreateRickAndMortyCharacterClient> {
  const module = (await import(
    "./rick-and-morty-character-client.js"
  )) as Record<string, unknown>;

  expect(
    module.createRickAndMortyCharacterClient,
    "TASK-005 Milestone 1 injected upstream client factory is missing",
  ).toBeTypeOf("function");

  return module.createRickAndMortyCharacterClient as CreateRickAndMortyCharacterClient;
}

function upstreamPayload(id: number): Readonly<Record<string, unknown>> {
  return {
    id,
    name: `Character ${id}`,
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Unknown",
    origin: { name: `Origin ${id}`, url: "" },
    image: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
    url: `https://rickandmortyapi.com/api/character/${id}`,
  };
}

describe("TASK-005 Milestone 1 injected Rick and Morty character client", () => {
  it("uses only the injected fetch to obtain each requested fixed character", async () => {
    const requestedIds = Array.from({ length: 15 }, (_, index) => index + 1);
    const injectedFetch = vi.fn(
      async (input: RequestInfo | URL, _init?: RequestInit) => {
        const id = Number(String(input).split("/").at(-1));
        return new Response(JSON.stringify(upstreamPayload(id)), {
          headers: { "content-type": "application/json" },
          status: 200,
        });
      },
    );
    const createRickAndMortyCharacterClient =
      await loadRickAndMortyCharacterClientFactory();
    const client = createRickAndMortyCharacterClient({
      fetch: injectedFetch as typeof fetch,
      timeoutMs: 100,
      maxAttempts: 2,
    });

    await expect(client.fetchCharacters(requestedIds)).resolves.toEqual(
      requestedIds.map(upstreamPayload),
    );
    expect(injectedFetch).toHaveBeenCalledTimes(15);
    expect(
      injectedFetch.mock.calls.map(([input]) => String(input)),
    ).toEqual(
      requestedIds.map(
        (id) => `https://rickandmortyapi.com/api/character/${id}`,
      ),
    );
    for (const [, init] of injectedFetch.mock.calls) {
      expect(init?.signal).toBeInstanceOf(AbortSignal);
    }
  });

  it("actually aborts a locally injected hanging fetch within the configured finite timeout", async () => {
    const listeners: Array<{
      readonly signal: AbortSignal;
      readonly onAbort: () => void;
    }> = [];
    let abortsObserved = 0;
    let watchdog: ReturnType<typeof setTimeout> | undefined;
    const injectedFetch = vi.fn(
      (_input: RequestInfo | URL, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          expect(init?.signal).toBeInstanceOf(AbortSignal);
          const signal = init?.signal as AbortSignal;
          const onAbort = () => {
            abortsObserved += 1;
            reject(new Error("INJECTED_FETCH_ABORT_OBSERVED"));
          };
          listeners.push({ signal, onAbort });
          signal.addEventListener("abort", onAbort, { once: true });
        }),
    );
    const createRickAndMortyCharacterClient =
      await loadRickAndMortyCharacterClientFactory();
    const client = createRickAndMortyCharacterClient({
      fetch: injectedFetch as typeof fetch,
      timeoutMs: 20,
      maxAttempts: 1,
    });
    const startedAt = performance.now();
    const request = client.fetchCharacters([1]);
    const watchdogFailure = new Promise<never>((_resolve, reject) => {
      watchdog = setTimeout(
        () => reject(new Error("INJECTED_FETCH_ABORT_NOT_OBSERVED")),
        500,
      );
    });

    try {
      expect(abortsObserved).toBe(0);
      await expect(
        Promise.race([request, watchdogFailure]),
      ).rejects.toBeInstanceOf(Error);
      expect(abortsObserved).toBe(1);
      expect(injectedFetch).toHaveBeenCalledOnce();
      expect(listeners[0]?.signal.aborted).toBe(true);
      expect(performance.now() - startedAt).toBeLessThan(500);
    } finally {
      if (watchdog !== undefined) {
        clearTimeout(watchdog);
      }
      for (const { signal, onAbort } of listeners) {
        signal.removeEventListener("abort", onAbort);
      }
    }
  });

  it("stops immediate transport failures at the configured two-attempt bound", async () => {
    const attempts: AbortSignal[] = [];
    const injectedFetch = vi.fn(
      async (_input: RequestInfo | URL, init?: RequestInit) => {
        expect(init?.signal).toBeInstanceOf(AbortSignal);
        attempts.push(init?.signal as AbortSignal);
        throw new TypeError("INJECTED_UPSTREAM_FAILURE");
      },
    );
    const createRickAndMortyCharacterClient =
      await loadRickAndMortyCharacterClientFactory();
    const client = createRickAndMortyCharacterClient({
      fetch: injectedFetch as typeof fetch,
      timeoutMs: 25,
      maxAttempts: 2,
    });

    await expect(client.fetchCharacters([1])).rejects.toBeInstanceOf(Error);
    expect(injectedFetch).toHaveBeenCalledTimes(2);
    expect(attempts).toHaveLength(2);
  });

  it("keeps non-2xx upstream responses within the configured retry bound", async () => {
    const injectedFetch = vi.fn(
      async (_input: RequestInfo | URL, _init?: RequestInit) =>
        new Response("upstream unavailable", { status: 503 }),
    );
    const createRickAndMortyCharacterClient =
      await loadRickAndMortyCharacterClientFactory();
    const client = createRickAndMortyCharacterClient({
      fetch: injectedFetch as typeof fetch,
      timeoutMs: 25,
      maxAttempts: 2,
    });

    await expect(client.fetchCharacters([1])).rejects.toBeInstanceOf(Error);
    expect(injectedFetch).toHaveBeenCalledTimes(2);
  });

  it.each([
    { maxAttempts: 0, timeoutMs: 25 },
    { maxAttempts: 4, timeoutMs: 25 },
    { maxAttempts: 2, timeoutMs: 0 },
    { maxAttempts: 2, timeoutMs: Number.POSITIVE_INFINITY },
  ])(
    "rejects unbounded transport configuration %#",
    async ({ maxAttempts, timeoutMs }) => {
      const createRickAndMortyCharacterClient =
        await loadRickAndMortyCharacterClientFactory();
      const injectedFetch = vi.fn<typeof fetch>();

      expect(() =>
        createRickAndMortyCharacterClient({
          fetch: injectedFetch,
          maxAttempts,
          timeoutMs,
        }),
      ).toThrow();
      expect(injectedFetch).not.toHaveBeenCalled();
    },
  );
});
