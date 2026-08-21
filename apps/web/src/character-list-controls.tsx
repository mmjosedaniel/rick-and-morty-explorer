import { type FormEvent, useEffect, useState } from "react";

export interface CharacterListControlValues {
  readonly sort: "asc" | "desc";
  readonly status: string | null;
  readonly species: string;
  readonly gender: string | null;
}

interface CharacterListControlsProps {
  readonly values: CharacterListControlValues;
  readonly onApply: (values: CharacterListControlValues) => void;
}

export function CharacterListControls({
  values,
  onApply,
}: CharacterListControlsProps) {
  const [sort, setSort] = useState(values.sort);
  const [status, setStatus] = useState(values.status ?? "");
  const [species, setSpecies] = useState(values.species);
  const [gender, setGender] = useState(values.gender ?? "");

  useEffect(() => {
    setSort(values.sort);
    setStatus(values.status ?? "");
    setSpecies(values.species);
    setGender(values.gender ?? "");
  }, [values.gender, values.sort, values.species, values.status]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onApply({
      sort,
      status: status === "" ? null : status,
      species,
      gender: gender === "" ? null : gender,
    });
  }

  return (
    <form className="character-list-controls" onSubmit={handleSubmit}>
      <div className="character-list-field">
        <label htmlFor="character-sort">Sort</label>
        <select
          id="character-sort"
          value={sort}
          onChange={(event) =>
            setSort(event.target.value === "desc" ? "desc" : "asc")
          }
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      <div className="character-list-field">
        <label htmlFor="character-status">Status</label>
        <select
          id="character-status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="">Any status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className="character-list-field">
        <label htmlFor="character-species">Species</label>
        <input
          id="character-species"
          type="text"
          value={species}
          onChange={(event) => setSpecies(event.target.value)}
        />
      </div>

      <div className="character-list-field">
        <label htmlFor="character-gender">Gender</label>
        <select
          id="character-gender"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="">Any gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <button type="submit">Apply filters</button>
    </form>
  );
}
