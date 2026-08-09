# ADR-0005: Use Single-User Persistence for Character Interactions

- Status: Accepted
- Date: 2026-08-09
- Decision owners: Project maintainers
- Related requirements: FR-FE-004, FR-FE-005, FR-BE-003, AC-004, AC-005
- Supersedes: None
- Superseded by: None

## Context

The interface must support favorites and comments, but the requirements define no user accounts, authentication, sessions, or ownership rules. Those interactions still need coherent behavior across reloads. Inventing identity infrastructure would materially expand the assessment scope, while browser-only state would make persistence dependent on a device.

## Decision drivers

- Satisfy favorite and comment flows without inventing authentication requirements.
- Persist application state across page and API restarts.
- Keep the ERD small and explain the scope limitation explicitly.
- Preserve a migration path if user identity is introduced later.

## Considered options

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| Global single-user semantics in PostgreSQL | Durable, simple, and consistent with the defined scope | Favorites and comments are shared by every visitor | Selected with follow-up |
| Browser-local favorites and comments | No backend schema changes | Not durable across devices, bypasses backend management, and cannot support shared review data | Rejected |
| Add users, authentication, and per-user relationships | Correct multi-user ownership | Introduces security, sessions, authorization, and UI flows absent from the requirements | Rejected for initial scope |

## Decision

The initial application will use explicit single-user demo semantics and is intended for a local, single-reviewer assessment environment rather than an anonymous public deployment:

- `characters.is_favorite` stores one global favorite flag per character.
- `comments.character_id` stores a one-to-many relationship from a character to comments.
- Comments contain no user owner because identity is out of scope.
- Favorite and comment changes are performed through GraphQL mutations and persisted in PostgreSQL.
- Browser storage may support transient form recovery but is never the source of truth.

Comment input will contain 1 to 1,000 Unicode characters after trimming and will be returned as plain text. The UI will render it using the framework's normal escaped text behavior.

Comment reads will use deterministic newest-first ordering and bounded arguments with a default limit of 20 and a maximum limit of 50. Before any public deployment, a new or superseding ADR must define authentication or abuse controls, a request-body limit, restricted CORS, mutation rate limiting, and a durable comment-retention policy.

## Consequences

### Positive

- Mandatory interaction flows are durable with very little schema overhead.
- The architecture does not invent an authentication system.
- The scope assumption is visible rather than hidden in implementation details.

### Negative

- All visitors observe and modify the same favorite state and comments.
- Comment attribution and moderation are unavailable.
- Introducing users requires a data migration and a superseding ADR.
- This write surface is unsuitable for anonymous public traffic without additional controls.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Stakeholders assume favorites are per-user | State single-user semantics in the README, API description, and UI copy where needed. |
| Malicious or oversized comment content is stored | Enforce a conservative length limit and plain-text validation at the GraphQL boundary. |
| A future authentication feature is bolted onto the flag | Supersede this ADR and migrate to a user-character favorite table plus comment ownership. |
| Anonymous traffic grows comments or mutation load without bound | Limit this ADR to local assessment use and require deployment controls before public exposure. |

## Validation

- Toggling a favorite persists after browser and API restarts.
- Adding a valid comment persists and appears in the associated character detail.
- Empty, whitespace-only, and over-limit comments are rejected with a typed validation error.
- Comment reads are newest-first and enforce a maximum page size of 50.
- No user, credential, session, or authorization table is introduced under this ADR.
- Deployment documentation does not describe the anonymous mutation surface as production-ready.

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 18 | 20 | Addresses required interactions while the source assessment leaves user scope unstated. |
| Architectural fit and consistency | 16 | 20 | Fits the database model while remaining intentionally limited. |
| Options and trade-offs | 13 | 15 | Makes the persistence-versus-identity trade-off explicit. |
| Feasibility and proportionality | 15 | 15 | Minimal design for the required behavior. |
| Quality attributes | 7 | 10 | Durable and safe, but not isolated between users. |
| Verifiability | 7 | 10 | Persistence and validation are testable; stakeholder semantics require review. |
| Evolution and reversibility | 6 | 10 | Multi-user migration is possible but not transparent. |
| **Total** | **82** | **100** | |

**Recommendation:** Accept with follow-up: any identity requirement or public deployment must add the ownership and abuse controls defined above before implementing that expanded scope.

## References

- [Requirements specification](../REQUIREMENTS.md)
- [ADR-0003](./0003-use-postgresql-for-relational-persistence.md)
- [ADR-0004](./0004-use-the-database-as-the-runtime-source-of-truth.md)
- [ADR index](./README.md)
