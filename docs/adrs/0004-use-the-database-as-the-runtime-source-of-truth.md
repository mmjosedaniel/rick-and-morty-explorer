# ADR-0004: Use the Database as the Runtime Source of Truth

- Status: Superseded
- Date: 2026-08-09
- Decision owners: Project maintainers
- Related requirements: FR-BE-001, FR-BE-003, FR-BE-004, FR-BE-005, AC-007, AC-009, AC-010
- Supersedes: None
- Superseded by: ADR-0013

ADR-0013 superseded this record on 2026-08-11. This file remains unchanged below as historical decision and rationale. [ADR-0013](./superseded/0013-materialize-character-images-during-ingestion.md) preserves the direct supersession link, while accepted [ADR-0014](./0014-persist-and-deliver-character-image-urls-directly.md) is the current authority carrying forward PostgreSQL product-data authority and replacing the character-image delivery boundary.

## Context

The requirements mandate both an external character API and a local relational database, but they do not state which source answers runtime searches and detail queries. Calling the external API on every request would make local persistence ambiguous, weaken offline behavior, and complicate consistent favorites, comments, and Redis caching.

## Decision drivers

- One consistent source for search, detail, favorite, and comment behavior.
- Runtime availability that does not depend on the external API after initialization.
- Meaningful use of relational persistence and cache-aside behavior.
- A clear ownership boundary between imported source data and application state.

## Considered options

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| PostgreSQL is authoritative at runtime; the external API is an ingestion source | Consistent local behavior, durable interactions, predictable caching | Imported character data can become stale | Selected |
| Proxy the external API for searches and use PostgreSQL only for interactions | Character data stays fresh | Requires merging two sources, couples runtime to the network, and complicates cache invalidation | Rejected |
| Browser calls the external API directly | Minimal backend query work | Bypasses the required application API, persistence, and centralized caching | Rejected |

## Decision

All mutation writes, character-detail reads, and character-search cache misses will operate on PostgreSQL through application services. A character search may return a finite-lived Redis projection under ADR-0007 without checking PostgreSQL on that cache hit; PostgreSQL remains authoritative. The browser will communicate only with the project GraphQL API. The public character API will be accessed only by the explicit ingestion flow defined in ADR-0008.

Imported character attributes are source-owned. Favorite state and comments are application-owned. A refresh may update source-owned attributes but must never reset favorite state or delete comments.

Redis is an optimization in front of PostgreSQL, not an authority. A Redis miss or outage therefore falls back to the same database behavior.

## Consequences

### Positive

- Required flows remain available after a successful initialization even if the external API is unavailable.
- Search results, detail views, favorites, and comments share one coherent model.
- Redis behavior has an unambiguous database fallback.
- Tests can use controlled local data.

### Negative

- Character metadata is only as current as the last successful import.
- Refresh behavior must distinguish source-owned fields from application-owned fields.
- Supporting real-time upstream data later would require a deliberate consistency model.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Imported data becomes stale | Document that freshness depends on explicit imports, log successful import completion, and keep the importer reusable for a future scheduled worker. |
| A refresh overwrites user interactions | Restrict upserts to source-owned character columns. |
| The browser accidentally bypasses the backend | Keep the external API URL in the API ingestion configuration only. |
| PostgreSQL is unavailable | Fail requests clearly; do not serve Redis as an unbounded stale authority. |

## Validation

- After initialization, character list and detail queries work with external network access disabled.
- Favorite and comment mutations persist in PostgreSQL and survive API restarts.
- Re-running the import changes only source-owned character fields.
- Disabling Redis still returns database-backed search results.

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 20 | 20 | Resolves the central ambiguity between the required API, database, and cache. |
| Architectural fit and consistency | 19 | 20 | Establishes the authority assumed by ingestion, GraphQL, and Redis decisions. |
| Options and trade-offs | 14 | 15 | Evaluates local authority, hybrid proxying, and direct browser access. |
| Feasibility and proportionality | 14 | 15 | Uses the required database without adding a distributed consistency model. |
| Quality attributes | 9 | 10 | Improves availability, consistency, and testability. |
| Verifiability | 8 | 10 | Offline and persistence checks make the decision observable. |
| Evolution and reversibility | 7 | 10 | A future real-time upstream model would require contract and cache changes. |
| **Total** | **91** | **100** | |

**Recommendation:** Accept.

## References

- [Requirements specification](../REQUIREMENTS.md)
- [ADR-0003](./0003-use-postgresql-for-relational-persistence.md)
- [ADR-0007](./0007-use-cache-aside-for-character-searches.md)
- [ADR-0008](./0008-use-deterministic-bootstrap-and-idempotent-sync.md)
- [ADR index](./README.md)
