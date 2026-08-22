import { useState } from "react";
import { Link } from "react-router-dom";

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
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const imageHasFailed = failedImageUrl === character.imageUrl;

  return (
    <article className="character-card">
      <Link to={`/characters/${character.id}`}>
        {imageHasFailed ? (
          <div
            className="character-card__image-fallback"
            role="img"
            aria-label={character.name}
          >
            Image unavailable
          </div>
        ) : (
          <img
            src={character.imageUrl}
            alt={character.name}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            width="300"
            height="300"
            onError={() => {
              setFailedImageUrl(character.imageUrl);
            }}
          />
        )}
        <div className="character-card__content">
          <h3>{character.name}</h3>{" "}
          <p>{character.species}</p>
        </div>
      </Link>
    </article>
  );
}
