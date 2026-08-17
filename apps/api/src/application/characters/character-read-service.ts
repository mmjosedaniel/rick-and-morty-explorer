export interface CharacterSummary {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
  readonly species: string;
}

export interface CharacterFilterInput {
  readonly status?: string;
  readonly species?: string;
  readonly gender?: string;
  readonly name?: string;
  readonly origin?: string;
}

export interface CharacterReadService {
  list(
    filter: CharacterFilterInput | undefined,
  ): Promise<readonly CharacterSummary[]>;
}
