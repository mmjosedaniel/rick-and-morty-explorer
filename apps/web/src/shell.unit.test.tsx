import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Shell } from "./shell";

describe("Shell", () => {
  it("renders the TASK-003 semantic heading", () => {
    render(<Shell />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Rick and Morty Explorer",
      }),
    ).toBeInTheDocument();
  });
});
