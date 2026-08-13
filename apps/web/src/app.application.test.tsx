import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { App } from "./app";

describe("App", () => {
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
});
