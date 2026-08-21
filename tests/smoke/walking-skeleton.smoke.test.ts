import {
  expect,
  test,
  type Locator,
  type Page,
  type Request as BrowserRequest,
  type Response as BrowserResponse,
} from "@playwright/test";

const expectedHeading =
  process.env["TASK003_SMOKE_EXPECTED_HEADING"] ??
  "Rick and Morty Explorer";

const applicationUrl = "http://127.0.0.1:4173";
const graphqlUrl = "http://127.0.0.1:4174/graphql";
const applicationCorsHeaders = {
  "access-control-allow-origin": applicationUrl,
};

interface VisualVariables {
  readonly status: string | null;
  readonly species: string | null;
  readonly gender: string | null;
}

interface ControlValues {
  readonly sort: "asc" | "desc";
  readonly status: string;
  readonly species: string;
  readonly gender: string;
}

interface CapturedConsoleError {
  readonly text: string;
  readonly location: {
    readonly url: string;
    readonly line: number;
    readonly column: number;
  };
}

const deliberateGraphql503Pattern =
  /^Failed to load resource: the server responded with a status of 503(?: \([^\r\n]*\))?$/u;

function isDeliberateGraphql503ConsoleError(error: CapturedConsoleError) {
  return (
    error.location.url === graphqlUrl &&
    error.location.line === 0 &&
    error.location.column === 0 &&
    deliberateGraphql503Pattern.test(error.text)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function visualVariables(request: BrowserRequest): VisualVariables {
  const payload = request.postDataJSON() as unknown;
  if (!isRecord(payload) || !isRecord(payload["variables"])) {
    throw new Error("TASK_010_VISUAL_VARIABLES_MISSING");
  }

  const variables = payload["variables"];
  const status = variables["status"];
  const species = variables["species"];
  const gender = variables["gender"];
  if (
    !isNullableString(status) ||
    !isNullableString(species) ||
    !isNullableString(gender)
  ) {
    throw new Error("TASK_010_VISUAL_VARIABLES_INVALID");
  }

  return { status, species, gender };
}

function visualResultName(variables: VisualVariables) {
  const label = [variables.status, variables.species, variables.gender]
    .filter((value): value is string => value !== null)
    .join("-");
  return `Visual ${label === "" ? "default" : label}`;
}

function visualCharacters(variables: VisualVariables) {
  if (
    variables.status === null &&
    variables.species === null &&
    variables.gender === null
  ) {
    return Array.from({ length: 15 }, (_unused, index) => {
      const id = index + 1;
      return {
        id: String(id),
        name: `TASK-010 Character ${String(id).padStart(2, "0")}`,
        imageUrl: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
        species: id % 2 === 0 ? "Alien" : "Human",
      };
    });
  }

  return [
    {
      id: "1",
      name: visualResultName(variables),
      imageUrl: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      species: variables.species ?? "Human",
    },
  ];
}

async function expectNoHorizontalOverflow(page: Page) {
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
}

async function expectVisibleFocus(locator: Locator) {
  await expect(locator).toBeFocused();
  expect(
    await locator.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        color: style.outlineColor,
        offset: style.outlineOffset,
        style: style.outlineStyle,
        width: style.outlineWidth,
      };
    }),
  ).toEqual({
    color: "rgb(56, 232, 210)",
    offset: "3px",
    style: "solid",
    width: "2px",
  });
}

async function expectNextKeyboardFocus(page: Page, locator: Locator) {
  await page.keyboard.press("Tab");
  await expectVisibleFocus(locator);
}

async function expectControlFocusSequence(page: Page) {
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  });

  for (const locator of [
    page.getByLabel("Sort"),
    page.getByLabel("Status"),
    page.getByLabel("Species"),
    page.getByLabel("Gender"),
    page.getByRole("button", { name: "Apply filters" }),
  ]) {
    await expectNextKeyboardFocus(page, locator);
  }
}

async function expectPopulatedLayout(page: Page) {
  const title = page.getByRole("heading", { level: 1, name: expectedHeading });
  const listHeading = page.getByRole("heading", {
    level: 2,
    name: "Characters",
  });
  const controls = page.locator(".character-list-controls");
  const grid = page.locator(".character-grid");

  await expect(title).toBeVisible();
  await expect(listHeading).toBeVisible();
  await expect(controls).toBeVisible();
  await expect(grid).toBeVisible();
  for (const locator of [
    page.getByLabel("Sort"),
    page.getByLabel("Status"),
    page.getByLabel("Species"),
    page.getByLabel("Gender"),
    page.getByRole("button", { name: "Apply filters" }),
  ]) {
    await expect(locator).toBeVisible();
  }

  const [titleBox, headingBox, controlsBox, gridBox] = await Promise.all([
    title.boundingBox(),
    listHeading.boundingBox(),
    controls.boundingBox(),
    grid.boundingBox(),
  ]);
  expect(titleBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(controlsBox).not.toBeNull();
  expect(gridBox).not.toBeNull();
  if (
    titleBox === null ||
    headingBox === null ||
    controlsBox === null ||
    gridBox === null
  ) {
    throw new Error("TASK_010_VISUAL_HIERARCHY_MISSING");
  }
  expect(titleBox.y + titleBox.height).toBeLessThan(headingBox.y);
  expect(headingBox.y + headingBox.height).toBeLessThan(controlsBox.y);
  expect(controlsBox.y + controlsBox.height).toBeLessThan(gridBox.y);
  await expectNoHorizontalOverflow(page);
}

async function applyControls(page: Page, values: ControlValues) {
  await page.getByLabel("Sort").selectOption(values.sort);
  await page.getByLabel("Status").selectOption(values.status);
  await page.getByLabel("Species").fill(values.species);
  await page.getByLabel("Gender").selectOption(values.gender);
  await page.getByRole("button", { name: "Apply filters" }).click();
}

function expectSearch(page: Page, expected: Readonly<Record<string, string>>) {
  expect(Object.fromEntries(new URL(page.url()).searchParams)).toEqual(expected);
}

async function expectVisualResult(page: Page, variables: VisualVariables) {
  await expect(
    page.getByRole("heading", {
      level: 3,
      name: visualResultName(variables),
    }),
  ).toBeVisible();
}

test("shows the walking skeleton and reports API health", async ({
  page,
  request,
}, testInfo) => {
  const unexpectedPublicRequests: string[] = [];
  const avatarRequests: Array<{
    readonly url: string;
    readonly headers: Readonly<Record<string, string>>;
  }> = [];
  const graphqlRequests: Array<{
    readonly url: string;
    readonly headers: Readonly<Record<string, string>>;
  }> = [];
  const graphqlResponses: BrowserResponse[] = [];
  const pageErrors: Array<{
    readonly name: string;
    readonly message: string;
  }> = [];
  const consoleErrors: CapturedConsoleError[] = [];

  page.on("pageerror", (error) => {
    pageErrors.push({ name: error.name, message: error.message });
  });
  page.on("console", (message) => {
    if (message.type() !== "error") {
      return;
    }

    const { url, line, column } = message.location();
    consoleErrors.push({
      text: message.text(),
      location: { url, line, column },
    });
  });

  await page.setViewportSize({ width: 1280, height: 800 });

  await page.route("https://rickandmortyapi.com/**", async (route) => {
    unexpectedPublicRequests.push(route.request().url());
    await route.abort("blockedbyclient");
  });
  await page.route(
    /^https:\/\/rickandmortyapi\.com\/api\/character\/avatar\/(?:[1-9]|1[0-5])\.jpeg$/u,
    async (route) => {
      const avatarRequest = route.request();
      avatarRequests.push({
        url: avatarRequest.url(),
        headers: await avatarRequest.allHeaders(),
      });
      await route.fulfill({
        status: 200,
        contentType: "image/svg+xml",
        headers: {
          "access-control-allow-origin": "http://127.0.0.1:4173",
        },
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="#0E1625"/></svg>',
      });
    },
  );
  page.on("request", (browserRequest) => {
    if (browserRequest.url() === "http://127.0.0.1:4174/graphql") {
      graphqlRequests.push({
        url: browserRequest.url(),
        headers: browserRequest.headers(),
      });
    }
  });
  page.on("response", (browserResponse) => {
    if (browserResponse.url() === "http://127.0.0.1:4174/graphql") {
      graphqlResponses.push(browserResponse);
    }
  });

  const documentResponse = await page.goto("http://127.0.0.1:4173");
  expect(documentResponse).not.toBeNull();
  const contentSecurityPolicy =
    documentResponse?.headers()["content-security-policy"];
  expect(contentSecurityPolicy).toBeDefined();

  const directives = new Map(
    contentSecurityPolicy
      ?.split(";")
      .map((directive) => directive.trim().split(/\s+/u))
      .filter((tokens) => tokens[0] !== "")
      .map(([name, ...values]) => [name, values]),
  );
  expect(directives.get("img-src")).toEqual([
    "'self'",
    "https://rickandmortyapi.com/api/character/avatar/",
  ]);
  expect(directives.get("connect-src")).toContain(
    "http://127.0.0.1:4174",
  );
  expect(directives.get("connect-src")).not.toContain("*");
  expect(directives.get("connect-src")).not.toContain(
    "https://rickandmortyapi.com",
  );

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: expectedHeading,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Characters" }),
  ).toBeVisible();

  const cards = page.getByRole("article");
  await expect(cards).toHaveCount(15);
  await expect
    .poll(async () =>
      cards.evaluateAll((elements) =>
        elements.map((element) =>
          element.textContent?.replace(/\s+/gu, " ").trim(),
        ),
      ),
    )
    .toEqual(
      Array.from({ length: 15 }, (_unused, index) => {
        const id = index + 1;
        return `TASK-010 Character ${String(id).padStart(2, "0")} ${
          id % 2 === 0 ? "Alien" : "Human"
        }`;
      }),
    );

  const images = page.getByRole("img");
  await expect(images).toHaveCount(15);
  expect(
    await images.evaluateAll((elements) =>
      elements.map((element) => {
        const image = element as HTMLImageElement;
        return {
          src: image.src,
          alt: image.alt,
          crossOrigin: image.crossOrigin,
          referrerPolicy: image.referrerPolicy,
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
        };
      }),
    ),
  ).toEqual(
    Array.from({ length: 15 }, (_unused, index) => {
      const id = index + 1;
      return {
        src: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
        alt: `TASK-010 Character ${String(id).padStart(2, "0")}`,
        crossOrigin: "anonymous",
        referrerPolicy: "no-referrer",
        naturalWidth: 300,
        naturalHeight: 300,
      };
    }),
  );
  await expectPopulatedLayout(page);
  await page.screenshot({
    path: testInfo.outputPath("task-010-populated-1280x800.png"),
    fullPage: true,
  });
  await expectControlFocusSequence(page);

  const response = await request.get("http://127.0.0.1:4174/healthz");

  expect(response.status()).toBe(200);
  expect(await response.text()).toBe('{"status":"ok"}');

  expect(graphqlResponses).toHaveLength(1);
  expect(graphqlResponses[0]?.status()).toBe(200);
  expect(await graphqlResponses[0]?.json()).toMatchObject({
    data: {
      characters: expect.arrayContaining([
        {
          id: "1",
          name: "TASK-010 Character 01",
          imageUrl:
            "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          species: "Human",
        },
      ]),
    },
  });
  expect(graphqlRequests).toHaveLength(1);
  expect(graphqlRequests[0]?.headers["origin"]).toBe(
    "http://127.0.0.1:4173",
  );
  expect(graphqlRequests[0]?.headers["authorization"]).toBeUndefined();
  expect(graphqlRequests[0]?.headers["cookie"]).toBeUndefined();
  expect(avatarRequests.map(({ url }) => url).sort()).toEqual(
    Array.from(
      { length: 15 },
      (_unused, index) =>
        `https://rickandmortyapi.com/api/character/avatar/${index + 1}.jpeg`,
    ).sort(),
  );
  for (const avatarRequest of avatarRequests) {
    expect(avatarRequest.headers["origin"]).toBe(
      "http://127.0.0.1:4173",
    );
    expect(avatarRequest.headers["referer"]).toBeUndefined();
    expect(avatarRequest.headers["authorization"]).toBeUndefined();
    expect(avatarRequest.headers["cookie"]).toBeUndefined();
  }

  const visualRequests: VisualVariables[] = [];
  const pendingResolvers = new Map<string, () => void>();
  const errorAttempts = new Map<string, number>();
  let deliberateGraphqlFailureCount = 0;

  await page.route(graphqlUrl, async (route) => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({
        status: 204,
        headers: {
          ...applicationCorsHeaders,
          "access-control-allow-headers": "content-type",
          "access-control-allow-methods": "POST",
        },
      });
      return;
    }

    const variables = visualVariables(route.request());
    visualRequests.push(variables);
    const species = variables.species;

    if (species?.startsWith("loading-") === true) {
      await new Promise<void>((resolve) => {
        pendingResolvers.set(species, resolve);
      });
      pendingResolvers.delete(species);
    }

    if (species?.startsWith("error-") === true) {
      const attempt = (errorAttempts.get(species) ?? 0) + 1;
      errorAttempts.set(species, attempt);
      if (attempt === 1) {
        deliberateGraphqlFailureCount += 1;
        await route.fulfill({
          status: 503,
          contentType: "application/graphql-response+json",
          headers: applicationCorsHeaders,
          body: JSON.stringify({
            errors: [{ message: "Deterministic visual evidence failure." }],
          }),
        });
        return;
      }
    }

    await route.fulfill({
      status: 200,
      contentType: "application/graphql-response+json",
      headers: applicationCorsHeaders,
      body: JSON.stringify({
        data: {
          characters:
            species?.startsWith("empty-") === true
              ? []
              : visualCharacters(variables),
        },
      }),
    });
  });

  async function applyVisualCase(
    values: ControlValues,
    expectedSearch: Readonly<Record<string, string>>,
    expectedVariables: VisualVariables,
  ) {
    const requestCount = visualRequests.length;
    await applyControls(page, values);
    await expectVisualResult(page, expectedVariables);
    expectSearch(page, expectedSearch);
    expect(visualRequests).toHaveLength(requestCount + 1);
    expect(visualRequests.at(-1)).toEqual(expectedVariables);
  }

  await applyControls(page, {
    sort: "desc",
    status: "",
    species: "",
    gender: "",
  });
  expectSearch(page, { sort: "desc" });
  await expect
    .poll(async () =>
      cards.evaluateAll((elements) =>
        elements.map((element) =>
          element.textContent?.replace(/\s+/gu, " ").trim(),
        ),
      ),
    )
    .toEqual(
      Array.from({ length: 15 }, (_unused, index) => {
        const id = 15 - index;
        return `TASK-010 Character ${String(id).padStart(2, "0")} ${
          id % 2 === 0 ? "Alien" : "Human"
        }`;
      }),
    );
  expect(visualRequests).toEqual([]);

  await applyVisualCase(
    { sort: "asc", status: "alive", species: "", gender: "" },
    { status: "alive" },
    { status: "alive", species: null, gender: null },
  );
  await applyVisualCase(
    { sort: "asc", status: "", species: " Human ", gender: "" },
    { species: "human" },
    { status: null, species: "human", gender: null },
  );
  await applyVisualCase(
    { sort: "asc", status: "", species: "", gender: "female" },
    { gender: "female" },
    { status: null, species: null, gender: "female" },
  );

  const combinedVariables: VisualVariables = {
    status: "dead",
    species: "alien",
    gender: "female",
  };
  const combinedSearch = {
    sort: "desc",
    status: "dead",
    species: "alien",
    gender: "female",
  };
  await applyVisualCase(
    {
      sort: "desc",
      status: "dead",
      species: " Alien ",
      gender: "female",
    },
    combinedSearch,
    combinedVariables,
  );

  const requestsBeforeReload = visualRequests.length;
  await page.reload();
  await expectVisualResult(page, combinedVariables);
  expectSearch(page, combinedSearch);
  await expect(page.getByLabel("Sort")).toHaveValue("desc");
  await expect(page.getByLabel("Status")).toHaveValue("dead");
  await expect(page.getByLabel("Species")).toHaveValue("alien");
  await expect(page.getByLabel("Gender")).toHaveValue("female");
  expect(visualRequests).toHaveLength(requestsBeforeReload + 1);
  expect(visualRequests.at(-1)).toEqual(combinedVariables);

  await page.goBack();
  const genderVariables: VisualVariables = {
    status: null,
    species: null,
    gender: "female",
  };
  await expectVisualResult(page, genderVariables);
  expectSearch(page, { gender: "female" });
  await expect(page.getByLabel("Sort")).toHaveValue("asc");
  await expect(page.getByLabel("Status")).toHaveValue("");
  await expect(page.getByLabel("Species")).toHaveValue("");
  await expect(page.getByLabel("Gender")).toHaveValue("female");
  expect(visualRequests.at(-1)).toEqual(genderVariables);

  await page.goForward();
  await expectVisualResult(page, combinedVariables);
  expectSearch(page, combinedSearch);
  await expect(page.getByLabel("Sort")).toHaveValue("desc");
  await expect(page.getByLabel("Status")).toHaveValue("dead");
  await expect(page.getByLabel("Species")).toHaveValue("alien");
  await expect(page.getByLabel("Gender")).toHaveValue("female");

  async function exerciseRequiredStates(viewport: "1280x800" | "375x812") {
    const loadingSpecies = `loading-${viewport}`;
    const loadingVariables: VisualVariables = {
      status: null,
      species: loadingSpecies,
      gender: null,
    };
    await applyControls(page, {
      sort: "asc",
      status: "",
      species: loadingSpecies,
      gender: "",
    });
    await expect(page.getByText("Loading characters...")).toBeVisible();
    await expect
      .poll(() => pendingResolvers.has(loadingSpecies))
      .toBe(true);
    await expectNoHorizontalOverflow(page);
    const releaseLoading = pendingResolvers.get(loadingSpecies);
    if (releaseLoading === undefined) {
      throw new Error("TASK_010_LOADING_BARRIER_MISSING");
    }
    releaseLoading();
    await expectVisualResult(page, loadingVariables);
    expect(visualRequests.at(-1)).toEqual(loadingVariables);

    const emptySpecies = `empty-${viewport}`;
    const emptyVariables: VisualVariables = {
      status: null,
      species: emptySpecies,
      gender: null,
    };
    await applyControls(page, {
      sort: "asc",
      status: "",
      species: emptySpecies,
      gender: "",
    });
    await expect(
      page.getByText("No characters match these filters."),
    ).toBeVisible();
    await expect(page.getByRole("article")).toHaveCount(0);
    expect(visualRequests.at(-1)).toEqual(emptyVariables);
    await expectNoHorizontalOverflow(page);

    const errorSpecies = `error-${viewport}`;
    const errorVariables: VisualVariables = {
      status: null,
      species: errorSpecies,
      gender: null,
    };
    await applyControls(page, {
      sort: "asc",
      status: "",
      species: errorSpecies,
      gender: "",
    });
    const errorMessage = page.getByText("Characters could not be loaded.");
    const retry = page.getByRole("button", { name: "Retry" });
    await expect(errorMessage).toBeVisible();
    await expect(retry).toHaveCount(1);
    await expect(page.getByRole("article")).toHaveCount(0);
    expect(visualRequests.at(-1)).toEqual(errorVariables);
    await expectNoHorizontalOverflow(page);
    await expect(page.getByRole("button", { name: "Apply filters" })).toBeFocused();
    await expectNextKeyboardFocus(page, retry);

    if (viewport === "375x812") {
      await page.screenshot({
        path: testInfo.outputPath("task-010-error-retry-375x812.png"),
        fullPage: true,
      });
    }

    await page.keyboard.press("Enter");
    await expectVisualResult(page, errorVariables);
    expect(visualRequests.slice(-2)).toEqual([
      errorVariables,
      errorVariables,
    ]);
    await expectNoHorizontalOverflow(page);
  }

  await exerciseRequiredStates("1280x800");

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(applicationUrl);
  await expect(page.getByRole("article")).toHaveCount(15);
  await expectPopulatedLayout(page);
  await page.screenshot({
    path: testInfo.outputPath("task-010-populated-375x812.png"),
    fullPage: true,
  });
  await expectControlFocusSequence(page);
  await exerciseRequiredStates("375x812");

  const allowedGraphql503ConsoleErrors = consoleErrors.filter(
    isDeliberateGraphql503ConsoleError,
  );
  const unexpectedConsoleErrors = consoleErrors.filter(
    (error) => !isDeliberateGraphql503ConsoleError(error),
  );

  expect(deliberateGraphqlFailureCount).toBe(2);
  expect(pageErrors).toEqual([]);
  expect(allowedGraphql503ConsoleErrors.length).toBeLessThanOrEqual(
    deliberateGraphqlFailureCount,
  );
  expect(unexpectedConsoleErrors).toEqual([]);
  console.log(
    `TASK010_BROWSER_DIAGNOSTICS pageErrors=${pageErrors.length} deliberateGraphqlFailures=${deliberateGraphqlFailureCount} allowedGraphql503=${allowedGraphql503ConsoleErrors.length} unexpectedConsoleErrors=${unexpectedConsoleErrors.length}`,
  );

  expect(unexpectedPublicRequests).toEqual([]);
});
