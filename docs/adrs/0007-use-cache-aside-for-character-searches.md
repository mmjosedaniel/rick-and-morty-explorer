# ADR-0007: Use Cache-Aside for Character Searches

- Status: Accepted
- Date: 2026-08-09
- Decision owners: Project maintainers
- Related requirements: FR-BE-002, FR-BE-005, NFR-003, OR-008, AC-008, AC-010
- Supersedes: None
- Superseded by: None

## Context

Redis caching is mandatory, but the requirements do not define the cache boundary, key format, time to live, invalidation, or failure behavior. Caching complete GraphQL responses would couple keys to selection sets and could expose stale mutable favorite or comment data.

## Decision drivers

- Observable reuse of repeated character searches.
- Correct results for every filter combination.
- No loss of functionality when Redis is unavailable.
- A bounded staleness window and explicit best-effort refresh invalidation.

## Considered options

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| Cache-aside at the character-search service boundary | Simple, query-aware, database fallback, independent of GraphQL selection sets | Requires canonical keys and explicit invalidation | Selected |
| Cache complete GraphQL responses | Can avoid resolver execution | Keys depend on query text, variables, and selection sets; mutable detail data becomes stale | Rejected |
| Write-through cache | Cache stays warm during writes | Adds coordination complexity for data primarily changed by imports | Rejected |
| No operational cache | Simplest behavior | Violates a mandatory requirement | Rejected |

## Decision

The character-search application service will use cache-aside behavior:

1. Normalize filter values by trimming them, applying the documented case rules, removing absent values, and ordering fields canonically.
2. Serialize the canonical filter object as stable UTF-8 JSON and calculate its SHA-256 digest.
3. Build a key in the form `<namespace>:characters:search:v1:<sha256>`. The namespace is configurable, defaults to `character-app:local`, and includes a unique test-run identifier during integration tests.
4. On a hit, validate the deserialized value and return the cached stable search projection. A malformed value is best-effort unlinked and treated as a miss.
5. On a miss, query PostgreSQL, serialize the projection, and store it with a configurable finite TTL whose default is 300 seconds. An empty list is a valid result and is cached rather than confused with a miss.
6. On a Redis read, write, or serialization error, log a safe warning and return the PostgreSQL result without failing the request. A failed cache write never discards a successful database result.

Request-path Redis operations have a configurable maximum duration whose default is 250 milliseconds and do not wait for an unbounded offline queue or reconnect loop. Reaching that limit is treated as a Redis error and falls back to PostgreSQL. Iterative invalidation commands also use bounded operation timeouts.

Only the `CharacterSummary` list/search projection is cached. Character detail, comments, and mutations are not cached. After a successful database commit, a manual character import performs a best-effort iterative `SCAN` and `UNLINK` of the `<namespace>:characters:search:v1:*` namespace; it never uses the blocking `KEYS` command or crosses the configured namespace. PostgreSQL and Redis are not updated atomically. If invalidation fails, the import remains committed, a warning is logged, and any stale entry remains bounded by the 300-second default TTL.

A valid cache hit may be served without checking PostgreSQL because it is a finite-lived copy of authoritative data. If no valid cached value exists and PostgreSQL is unavailable, the request fails clearly; Redis never becomes an unbounded source of truth.

Favorite and comment mutations do not invalidate search keys because the GraphQL summary type cannot expose those fields. A more sophisticated revision authority is deferred with the optional recurring scheduler and must be revisited before high-frequency or multi-instance synchronization is enabled.

## Consequences

### Positive

- Repeated equivalent searches avoid redundant database work.
- Redis outages degrade performance rather than correctness.
- Cache entries cannot return stale comments or favorite state.
- A schema-version prefix and post-import eviction make projection changes explicit.
- Namespaced keys isolate development and concurrent integration-test runs.

### Negative

- The first request for each canonical search still reaches PostgreSQL.
- Best-effort invalidation permits up to one TTL of stale search data after an invalidation failure or race.
- Canonicalization bugs can create collisions or unnecessary misses.
- A slow Redis instance can cause temporary database fallback and additional database load.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Equivalent filters produce different keys | Centralize canonicalization and cover order, case, whitespace, and absent values with tests. |
| Different filters collide | Hash the stable UTF-8 JSON representation with SHA-256 and retain a schema version prefix. |
| Development or test runs collide | Require a configurable namespace, generate a unique test-run prefix, and scope eviction to that namespace. |
| Redis stores malformed or obsolete data | Validate deserialized values, unlink malformed entries, use a finite TTL, and bump the schema version after projection changes. |
| Redis failure delays every request | Bound request-path operations to the configured timeout and disable unbounded queuing or retry behavior. |
| Imports serve stale searches | Attempt non-blocking namespace eviction after commit and bound residual staleness with the TTL. |
| PostgreSQL commits but Redis invalidation fails | Keep the database commit authoritative, log the failure, and explicitly accept at most one TTL of stale cache data. |
| Redis outage floods logs | Rate-limit or deduplicate repeated infrastructure warnings. |

## Validation

- A miss queries PostgreSQL and stores a value with a TTL.
- A subsequent equivalent search hits Redis and avoids the database search.
- An empty result is cached and reused as a hit.
- Filter order, case, whitespace, and absent values canonicalize as documented.
- Distinct filter sets do not share a cache entry.
- Development and concurrent test namespaces cannot read or evict one another's keys.
- A malformed cached value is ignored, best-effort unlinked, and replaced from PostgreSQL.
- Redis unavailability or a simulated operation timeout returns the correct PostgreSQL result within the configured bound.
- A failed Redis write still returns the successful PostgreSQL result.
- A successful character import evicts the search namespace when Redis is available.
- A simulated post-commit invalidation failure preserves the database update and leaves stale data for no longer than the configured TTL.
- Cached payloads conform to `CharacterSummary` and contain no comments or favorite state.
- Hit, miss, TTL, serialization, connection wiring, and scoped invalidation are exercised against a real Redis instance. Controlled injected delays and errors exercise bounded timeout and fail-open behavior, as required by ADR-0010.

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 20 | 20 | Fully defines the mandatory search cache behavior. |
| Architectural fit and consistency | 20 | 20 | Preserves PostgreSQL authority and the GraphQL service boundary. |
| Options and trade-offs | 14 | 15 | Compares service, response, write-through, and absent caching. |
| Feasibility and proportionality | 14 | 15 | Uses a conventional pattern with limited custom logic. |
| Quality attributes | 10 | 10 | Addresses performance, availability, correctness, and bounded staleness. |
| Verifiability | 10 | 10 | Real Redis checks cover hit, miss, empty values, TTL, malformed data, namespace, connection wiring, and invalidation; controlled failures cover timeout and fail-open behavior. |
| Evolution and reversibility | 7 | 10 | Namespaces and schema versions isolate deployments and allow key-policy evolution, while deployed compatibility still requires deliberate versioning. |
| **Total** | **95** | **100** | |

**Recommendation:** Accept.

## References

- [Requirements specification](../REQUIREMENTS.md)
- [ADR-0001](./superseded/0001-use-a-modular-monolith-workspace.md)
- [ADR-0004](./superseded/0004-use-the-database-as-the-runtime-source-of-truth.md)
- [ADR-0006](./0006-define-a-use-case-oriented-graphql-contract.md)
- [ADR-0008](./0008-use-deterministic-bootstrap-and-idempotent-sync.md)
- [ADR-0010](./superseded/0010-use-a-targeted-automated-testing-strategy.md)
- [ADR index](./README.md)
