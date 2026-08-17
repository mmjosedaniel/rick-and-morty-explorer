import { describe, expect, it, vi } from "vitest";

import type {
  CharacterReadService,
  CharacterSummary,
} from "./application/characters/character-read-service.js";

interface OwnedCharacterReadService {
  readonly characterReadService: CharacterReadService;
  close(): Promise<void>;
}

interface LazyCharacterReadServiceOwner {
  readonly characterReadService: CharacterReadService;
  close(): Promise<void>;
}

type CreateLazyCharacterReadServiceOwner = (options: {
  readonly initialize: () => Promise<OwnedCharacterReadService>;
}) => LazyCharacterReadServiceOwner;

interface Deferred<T> {
  readonly promise: Promise<T>;
  resolve(value: T): void;
}

function createDeferred<T>(): Deferred<T> {
  let resolveDeferred: ((value: T) => void) | undefined;
  const promise = new Promise<T>((resolve) => {
    resolveDeferred = resolve;
  });

  return {
    promise,
    resolve: (value) => {
      if (resolveDeferred === undefined) {
        throw new Error("Deferred initializer is unavailable");
      }
      resolveDeferred(value);
    },
  };
}

async function loadOwnerFactory(): Promise<CreateLazyCharacterReadServiceOwner> {
  const module = (await import("./runtime-composition.js")) as Record<
    string,
    unknown
  >;

  expect(
    module.createLazyCharacterReadServiceOwner,
    "TASK-006 demand-lazy character-read resource owner is missing",
  ).toBeTypeOf("function");

  return module.createLazyCharacterReadServiceOwner as CreateLazyCharacterReadServiceOwner;
}

describe("TASK-006 Milestone 2 demand-lazy resource ownership", () => {
  it("waits for in-flight initialization and closes the owned resource exactly once", async () => {
    const initialization = createDeferred<OwnedCharacterReadService>();
    const initialize = vi.fn(() => initialization.promise);
    const closeResource = vi.fn(async () => {});
    const abandonedResult = new Promise<readonly CharacterSummary[]>(() => {});
    const list = vi.fn(() => abandonedResult);
    const createLazyCharacterReadServiceOwner = await loadOwnerFactory();
    const owner = createLazyCharacterReadServiceOwner({ initialize });

    void owner.characterReadService.list(undefined);
    expect(initialize).toHaveBeenCalledOnce();

    let shutdownFinished = false;
    const firstClose = owner.close().then(() => {
      shutdownFinished = true;
    });

    await Promise.resolve();
    expect(shutdownFinished).toBe(false);
    expect(closeResource).not.toHaveBeenCalled();

    initialization.resolve({
      characterReadService: { list },
      close: closeResource,
    });

    await firstClose;
    expect(closeResource).toHaveBeenCalledOnce();

    await Promise.all([owner.close(), owner.close()]);
    expect(closeResource).toHaveBeenCalledOnce();
  });
});
