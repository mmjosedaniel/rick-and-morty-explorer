export const typeDefs = /* GraphQL */ `
  type Query {
    characters(filter: CharacterFilter): [CharacterSummary!]!
    character(id: ID!): CharacterDetail
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

  type CharacterDetail {
    id: ID!
    name: String!
    imageUrl: String!
    species: String!
    status: String!
    gender: String!
    type: String!
    origin: Origin!
    isFavorite: Boolean!
    comments(limit: Int = 20, offset: Int = 0): [Comment!]!
  }

  type Origin {
    name: String!
    url: String!
  }

  type Comment {
    id: ID!
    body: String!
  }
`;
