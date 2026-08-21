interface CharacterCardSummary {
  readonly id: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly species: string;
}

interface CharacterCardProps {
  readonly character: CharacterCardSummary;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="character-card">
      <img
        src={character.imageUrl}
        alt={character.name}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        width="300"
        height="300"
      />
      <div className="character-card__content">
        <h3>{character.name}</h3>{" "}
        <p>{character.species}</p>
      </div>
    </article>
  );
}
