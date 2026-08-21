import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CharacterListControls } from "./character-list-controls";

describe("CharacterListControls", () => {
  it("exposes the accepted labeled controls and applies one transient draft", () => {
    const onApply = vi.fn();

    render(
      <CharacterListControls
        values={{
          sort: "asc",
          status: null,
          species: "",
          gender: null,
        }}
        onApply={onApply}
      />,
    );

    const sort = screen.getByLabelText("Sort");
    const status = screen.getByLabelText("Status");
    const species = screen.getByLabelText("Species");
    const gender = screen.getByLabelText("Gender");

    expect(sort).toHaveValue("asc");
    expect(status).toHaveValue("");
    expect(species).toHaveValue("");
    expect(gender).toHaveValue("");
    expect(screen.getByRole("option", { name: "A-Z" })).toHaveValue("asc");
    expect(screen.getByRole("option", { name: "Z-A" })).toHaveValue("desc");
    expect(
      screen.getByRole("option", { name: "Any status" }),
    ).toHaveValue("");
    expect(
      screen.getByRole("option", { name: "Any gender" }),
    ).toHaveValue("");
    for (const option of [
      "Alive",
      "Dead",
      "Female",
      "Male",
      "Genderless",
    ]) {
      expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("option", { name: "Unknown" })).toHaveLength(2);

    fireEvent.change(sort, { target: { value: "desc" } });
    fireEvent.change(status, { target: { value: "dead" } });
    fireEvent.change(species, { target: { value: " Human " } });
    fireEvent.change(gender, { target: { value: "female" } });

    expect(onApply).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));

    expect(onApply).toHaveBeenCalledTimes(1);
    expect(onApply).toHaveBeenCalledWith({
      sort: "desc",
      status: "dead",
      species: " Human ",
      gender: "female",
    });
  });
});
