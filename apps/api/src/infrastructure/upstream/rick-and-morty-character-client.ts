interface RickAndMortyCharacterClientOptions {
  readonly fetch: typeof fetch;
  readonly timeoutMs: number;
  readonly maxAttempts: number;
}

interface RickAndMortyCharacterClient {
  fetchCharacters(ids: readonly number[]): Promise<readonly unknown[]>;
}

const minimumCharacterId = 1;
const maximumCharacterId = 15;
const maximumAttempts = 3;

function validateOptions(options: RickAndMortyCharacterClientOptions): void {
  if (
    !Number.isFinite(options.timeoutMs) ||
    options.timeoutMs <= 0 ||
    !Number.isInteger(options.maxAttempts) ||
    options.maxAttempts < 1 ||
    options.maxAttempts > maximumAttempts
  ) {
    throw new Error("Invalid Rick and Morty client bounds");
  }
}

function validateCharacterId(id: number): void {
  if (
    !Number.isInteger(id) ||
    id < minimumCharacterId ||
    id > maximumCharacterId
  ) {
    throw new Error(`Invalid Rick and Morty character ID: ${id}`);
  }
}

async function fetchAttempt(
  options: RickAndMortyCharacterClientOptions,
  id: number,
): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs);

  try {
    const response = await options.fetch(
      `https://rickandmortyapi.com/api/character/${id}`,
      { signal: controller.signal },
    );
    if (!response.ok) {
      throw new Error(`Rick and Morty upstream returned ${response.status}`);
    }

    return await response.json() as unknown;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithRetries(
  options: RickAndMortyCharacterClientOptions,
  id: number,
): Promise<unknown> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt += 1) {
    try {
      return await fetchAttempt(options, id);
    } catch (error: unknown) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Rick and Morty upstream request failed");
}

export function createRickAndMortyCharacterClient(
  options: RickAndMortyCharacterClientOptions,
): RickAndMortyCharacterClient {
  validateOptions(options);

  return {
    async fetchCharacters(ids: readonly number[]): Promise<readonly unknown[]> {
      ids.forEach(validateCharacterId);
      return Promise.all(ids.map((id) => fetchWithRetries(options, id)));
    },
  };
}
