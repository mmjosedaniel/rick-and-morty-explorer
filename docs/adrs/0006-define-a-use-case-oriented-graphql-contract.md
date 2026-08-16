# ADR-0006: Define a Use-Case-Oriented GraphQL Contract

- Status: Accepted
- Date: 2026-08-09
- Decision owners: Project maintainers
- Related requirements: FR-FE-001, FR-FE-002, FR-FE-003, FR-FE-004, FR-FE-005, FR-BE-001, FR-BE-002, FR-BE-006, OR-008, OR-009, AC-001, AC-002, AC-003, AC-004, AC-005, AC-007, AC-008, AC-011, AC-012
- Supersedes: None
- Superseded by: None

## Context

GraphQL and Express are mandatory, but the requirements do not define operations, filter semantics, errors, sorting ownership, or the separation between resolvers and persistence. Passing through the external API schema would also expose a contract the project does not own.

## Decision drivers

- A small contract aligned with required user actions.
- Deterministic and safe filter behavior.
- Thin transport code with testable application logic.
- Inspectable API documentation without inventing a parallel REST API.

## Considered options

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| Project-owned GraphQL schema with thin resolvers and application services | Explicit use cases, stable contract, testable boundaries | Requires schema and mapping code | Selected |
| Resolvers query Sequelize directly | Fewer files initially | Mixes transport, validation, caching, and persistence concerns | Rejected |
| Pass through the external API schema | Minimal schema design | Leaks upstream ownership and cannot represent local favorites and comments cleanly | Rejected |
| Add REST endpoints and Swagger beside GraphQL | Familiar OpenAPI tooling | Duplicates the API solely for an optional deliverable | Rejected for initial scope |

## Decision

The API will expose one version-controlled GraphQL schema through Express with these use cases:

```graphql
type Query {
  characters(filter: CharacterFilter): [CharacterSummary!]!
  character(id: ID!): CharacterDetail
}

type Mutation {
  setCharacterFavorite(id: ID!, isFavorite: Boolean!): CharacterDetail!
  addCharacterComment(characterId: ID!, body: String!): Comment!
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
```

`CharacterSummary` contains only ID, name, image URL, and species. `CharacterDetail` also exposes status, gender, character type, origin, favorite state, and a newest-first `comments(limit: Int = 20, offset: Int = 0)` field whose limit cannot exceed 50. Persistence-only fields are not exposed merely because they exist in Sequelize. Using distinct summary and detail types makes the Redis search projection enforceable at the schema boundary.

Character IDs accept only positive base-10 integers, even though GraphQL transports them through the `ID` scalar. A malformed, zero, or negative ID returns `BAD_USER_INPUT`. Comment pagination requires a limit from 1 through 50 and a non-negative offset; out-of-range values also return `BAD_USER_INPUT`. Comment bodies use the trimming and length rules from ADR-0005.

Status and gender filters use case-insensitive exact matching. Name, species, and origin use case-insensitive literal substring matching. Blank filter values normalize to absent, and multiple supplied filters combine with `AND`.

The required A-Z and Z-A sorting occurs in the frontend for the fixed 15-character baseline. If pagination or a larger dataset enters scope, sorting moves to the API so each page belongs to one stable global order.

Resolvers validate and map GraphQL input, then call application services. Services coordinate repositories and caching. A valid ID that does not identify a character returns `NOT_FOUND` from the detail query, favorite mutation, or comment mutation. Expected failures use stable values in GraphQL `extensions.code`, including `BAD_USER_INPUT` and `NOT_FOUND`. Unexpected failures are logged internally and returned as `INTERNAL_SERVER_ERROR` without stack traces, SQL details, Redis details, or other infrastructure information.

The request middleware writes one structured record to the console standard-output stream containing a request ID, method, path, safely available GraphQL operation name, status, duration, and error count. It never logs full request bodies, comment text, secrets, or authorization data.

The GraphQL schema, a development-only explorer, and README operation examples will provide API documentation. Swagger remains deferred because it does not naturally describe a GraphQL-only contract.

## Consequences

### Positive

- The schema expresses application behavior rather than persistence or upstream transport details.
- Filter behavior is deterministic and testable.
- Services can be tested without an HTTP server.
- API documentation stays aligned with the executable schema.

### Negative

- Schema changes require deliberate compatibility review and type regeneration.
- Client-side sorting is appropriate only while the result set remains small and unpaginated.
- Resolver, service, and repository boundaries add a small amount of code.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| SQL wildcard characters change filter meaning | Escape them and use bound Sequelize values with documented literal-substring semantics. |
| GraphQL `ID` accepts values outside the database identity domain | Validate positive base-10 integer IDs before invoking application services. |
| Invalid pagination creates unbounded or inconsistent comment reads | Enforce a limit from 1 through 50 and an offset greater than or equal to zero. |
| GraphQL errors leak internal details | Map expected failures to stable codes and log the original error only on the server. |
| Logs capture comments or secrets | Log metadata only and test redaction boundaries. |
| Client and schema types drift | Generate client types from the checked-in schema as part of validation. |
| Anonymous comment reads or writes become unbounded | Keep reads bounded and treat public deployment controls as a mandatory follow-up to ADR-0005. |

## Validation

- Every filter works independently and in at least one combined `AND` query.
- Equivalent case and surrounding whitespace produce equivalent filter behavior.
- `%`, `_`, quotes, and other special input do not alter query structure.
- The checked-in schema defines `CharacterFilter`, `CharacterSummary`, `CharacterDetail`, `Origin`, and `Comment` with the selected nullability and fields.
- Malformed, zero, and negative character IDs return `BAD_USER_INPUT`.
- A valid but missing character ID returns `NOT_FOUND` from the detail query and both character-targeting mutations.
- Invalid comment input, limits below 1 or above 50, and negative offsets return `BAD_USER_INPUT`.
- The list schema exposes no favorite or comment field, and comments are returned newest-first within the requested bounds.
- An unexpected resolver or service failure returns `INTERNAL_SERVER_ERROR` without exposing stack traces or infrastructure details.
- Captured console standard output contains the required request metadata and excludes bodies, comments, secrets, and stack traces.
- The schema and README examples document all four use cases.

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 20 | 20 | Covers every required API and interaction flow. |
| Architectural fit and consistency | 19 | 20 | Aligns the frontend, services, persistence, and cache boundaries. |
| Options and trade-offs | 14 | 15 | Evaluates direct resolvers, pass-through, and duplicate REST APIs. |
| Feasibility and proportionality | 14 | 15 | Keeps the schema deliberately small. |
| Quality attributes | 9 | 10 | Improves safety, testability, documentation, and observability. |
| Verifiability | 10 | 10 | The complete schema shape, input bounds, operations, filters, error codes, and logs have measurable checks. |
| Evolution and reversibility | 6 | 10 | Public schema changes require compatibility management. |
| **Total** | **92** | **100** | |

**Recommendation:** Accept.

## References

- [Requirements specification](../REQUIREMENTS.md)
- [ADR-0004](./superseded/0004-use-the-database-as-the-runtime-source-of-truth.md)
- [ADR-0005](./0005-use-single-user-persistence-for-character-interactions.md)
- [ADR-0007](./0007-use-cache-aside-for-character-searches.md)
- [ADR index](./README.md)
