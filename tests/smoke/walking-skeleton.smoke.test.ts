import { expect, test } from "@playwright/test";

const expectedHeading =
  process.env["TASK003_SMOKE_EXPECTED_HEADING"] ??
  "Rick and Morty Explorer";

test("shows the walking skeleton and reports API health", async ({
  page,
  request,
}) => {
  await page.goto("http://127.0.0.1:4173");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: expectedHeading,
    }),
  ).toBeVisible();

  const response = await request.get("http://127.0.0.1:4174/healthz");

  expect(response.status()).toBe(200);
  expect(await response.text()).toBe('{"status":"ok"}');
});
