export const typeDefs = /* GraphQL */ `
  type Query {
    characters(filter: CharacterFilter): [CharacterSummary!]!
  }

  input CharacterFilter {
    status: String
    species: String
    gender: String
    name: String
    origin: String
  }

  type CharacterSummary {
    id: ID!
    name: String!
    imageUrl: String!
    species: String!
  }
`;
