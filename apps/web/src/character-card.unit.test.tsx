import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CharacterCard } from "./character-card";

describe("CharacterCard", () => {
  it("shows only the approved summary fields with the governed native image", () => {
    const character = {
      id: "101",
      name: "Rick Sanchez",
      imageUrl:
        "https://rickandmortyapi.com/api/character/avatar/101.jpeg",
      species: "Human",
      status: "STATUS_MUST_NOT_RENDER",
      gender: "GENDER_MUST_NOT_RENDER",
      type: "TYPE_MUST_NOT_RENDER",
      origin: "ORIGIN_MUST_NOT_RENDER",
    };

    render(<CharacterCard character={character} />);

    const card = screen.getByRole("article");
    expect(
      within(card).getByRole("heading", {
        level: 3,
        name: "Rick Sanchez",
      }),
    ).toBeInTheDocument();
    expect(within(card).getByText("Human")).toBeInTheDocument();

    const image = within(card).getByRole("img", { name: "Rick Sanchez" });
    expect(image).toHaveAttribute("src", character.imageUrl);
    expect(image).toHaveAttribute("crossorigin", "anonymous");
    expect(image).toHaveAttribute("referrerpolicy", "no-referrer");

    expect(card).not.toHaveTextContent("101");
    expect(card).not.toHaveTextContent("STATUS_MUST_NOT_RENDER");
    expect(card).not.toHaveTextContent("GENDER_MUST_NOT_RENDER");
    expect(card).not.toHaveTextContent("TYPE_MUST_NOT_RENDER");
    expect(card).not.toHaveTextContent("ORIGIN_MUST_NOT_RENDER");
    expect(within(card).queryByRole("link")).not.toBeInTheDocument();
  });
});
