# ADR-0008: Use Deterministic Bootstrap and Idempotent Synchronization

- Status: Accepted
- Date: 2026-08-09
- Decision owners: Project maintainers
- Related requirements: FR-BE-003, FR-BE-004, AC-009, OR-005
- Supersedes: None
- Superseded by: None

## Context

The database must start with 15 characters from the public API. The requirements do not identify those characters, define repeated initialization behavior, or state whether network access belongs in migrations or API startup. A 12-hour refresh is optional and can create duplicate jobs when embedded in every API process.

## Decision drivers

- Reproducible initial data for reviewers and tests.
- Network-free schema migrations.
- No duplicate rows or overwritten application-owned state on repeated imports.
- A safe extension point for an optional scheduler.

## Considered options

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| Explicit idempotent import command using deterministic upstream IDs | Reproducible, retryable, testable, and separate from schema changes | Requires one documented setup step | Selected |
| Fetch data from a migration | Appears automatic | Makes schema migration network-dependent and non-deterministic | Rejected |
| Import on every API startup | No separate command | Slows startup, surprises operators, and creates race conditions across instances | Rejected |
| Seed lazily on the first request | Defers setup | Makes request latency and failure behavior unpredictable | Rejected |

## Decision

Schema migrations will never make network requests. After migrations, an explicit import command will fetch the deterministic upstream character IDs 1 through 15, validate and map their payloads, and transactionally upsert their source-owned fields.

The import is idempotent: running it repeatedly results in exactly 15 distinct characters for the selected baseline. It does not reset `is_favorite`, alter comments, or create duplicate related records. If fetching, validation, or persistence fails, the transaction rolls back and the command exits with a clear non-zero result instead of leaving a partially refreshed dataset.

The optional 12-hour scheduler is deferred from the initial scope. If later accepted, it will reuse the same importer in a dedicated single-instance worker or use a distributed lock to prevent overlapping runs. After a successful database commit, the importer requests the best-effort Redis namespace eviction defined in ADR-0007. That eviction is not part of the PostgreSQL transaction; failure is logged and accepted because stale entries retain a finite TTL. A recurring or high-frequency refresh must introduce a superseding cache-invalidation decision.

## Consequences

### Positive

- Every reviewer receives the same initial dataset.
- Migrations remain deterministic and safe in offline schema workflows.
- Imports can be retried without duplicating data or erasing interactions.
- Scheduled refresh can be added without rewriting ingestion logic.

### Negative

- Initial setup needs a reachable external API and an explicit command.
- The fixed ID set does not automatically discover new characters.
- Without the optional scheduler, source data remains unchanged after initialization.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| The external API is unavailable during first setup | Use bounded timeouts, limited retries, a clear error, and a fully retryable command. |
| A partial payload corrupts the baseline | Validate all mapped records before committing the transaction. |
| A refresh resets favorite state | Keep source-owned and application-owned update fields in separate mappings. |
| Multiple schedulers import concurrently | Run one worker or acquire a distributed lock before enabling scheduled refresh. |
| Cache invalidation occurs before commit | Invoke cache eviction only after the database transaction succeeds. |
| Post-commit cache eviction fails | Keep the committed database authoritative, log the failure, and rely on the finite cache TTL. |

## Validation

- Migrations complete with external network access disabled.
- The first import creates exactly the character IDs 1 through 15.
- Running the import twice still leaves 15 distinct characters.
- A repeated import preserves existing favorites and comments.
- A simulated failure leaves the previously committed dataset unchanged and returns a non-zero exit status.
- A successful import attempts cache eviction only after commit.
- A simulated post-commit eviction failure does not roll back the database and cannot extend staleness beyond the cache TTL.

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 20 | 20 | Fully resolves the mandatory 15-character initialization. |
| Architectural fit and consistency | 18 | 20 | Respects database authority, ownership, and cache invalidation. |
| Options and trade-offs | 14 | 15 | Evaluates migration, startup, lazy, and explicit lifecycles. |
| Feasibility and proportionality | 14 | 15 | The explicit command design provides deterministic behavior without a scheduler. |
| Quality attributes | 9 | 10 | Improves consistency, recoverability, and repeatability. |
| Verifiability | 9 | 10 | Idempotency, rollback, and exact IDs have direct checks. |
| Evolution and reversibility | 6 | 10 | The importer is reusable, but changing source identity requires migration. |
| **Total** | **90** | **100** | |

**Recommendation:** Accept and defer the optional scheduler until mandatory behavior is complete.

## References

- [Requirements specification](../REQUIREMENTS.md)
- [ADR-0003](./0003-use-postgresql-for-relational-persistence.md)
- [ADR-0004](./superseded/0004-use-the-database-as-the-runtime-source-of-truth.md)
- [ADR-0007](./0007-use-cache-aside-for-character-searches.md)
- [ADR index](./README.md)
