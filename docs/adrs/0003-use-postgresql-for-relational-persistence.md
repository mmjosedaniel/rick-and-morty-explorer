# ADR-0003: Use PostgreSQL for Relational Persistence

- Status: Accepted
- Date: 2026-08-09
- Decision owners: Project maintainers
- Related requirements: FR-BE-002, FR-BE-003, FR-BE-004, NFR-003, OR-002, AC-008, AC-009, AC-012
- Supersedes: None
- Superseded by: None

## Context

The backend must use Sequelize migrations with a relational database. The assessment permits MySQL or PostgreSQL but does not choose between them or define the schema. Search requires case-insensitive matching across several character attributes, while comments require a clear relationship to characters.

## Decision drivers

- Direct compliance with relational persistence and migration requirements.
- Predictable case-insensitive text filtering.
- A minimal schema that supports required behavior without modeling the entire external domain.
- Straightforward local and test environments.

## Considered options

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| PostgreSQL with explicit relational columns | Strong text-query capabilities, constraints, transactions, and mature Sequelize support | Requires a running database service | Selected |
| MySQL with the same minimal model | Fully compliant and widely available | Case-insensitive behavior depends more heavily on collation choices | Rejected but valid fallback |
| Store the external payload as one JSON document | Fast initial import | Weakens constraints, ERD value, filtering clarity, and migration intent | Rejected |
| Use Redis or browser storage as primary persistence | Minimal schema work | Violates the relational persistence requirement and loses durable relationships | Rejected |

## Decision

PostgreSQL will be the relational engine and will be accessed through Sequelize. Its application schema objects will be created and evolved exclusively through version-controlled migrations; service provisioning remains the responsibility of the local or deployment environment.

The initial model will contain:

- `characters`: the stable upstream integer ID as primary key; name, status, species, character type, gender, origin name, origin URL, image URL, favorite flag, and timestamps.
- `comments`: an internal ID, character foreign key, a body containing 1 to 1,000 Unicode characters after trimming, and timestamps.

Fields required for search will use explicit columns rather than an opaque JSON payload. The character primary key and comment primary key use their normal unique indexes, and `comments.character_id` receives a B-tree index for detail lookups. With a baseline of 15 characters, text filters use sequential scans; specialized substring-search indexes are deferred until measurements on a larger dataset justify them. Locations and episodes will not be normalized because no required use case queries those relationships. Soft deletion is deferred; adding it would affect default scopes, imports, and cache invalidation without supporting a required delete operation.

## Consequences

### Positive

- Filters map clearly to explicit relational columns.
- Database constraints protect character identity and comment relationships.
- The required ERD remains small and understandable.
- Migrations make an empty-database setup reproducible.

### Negative

- The model stores only the external fields needed by current use cases.
- Using an upstream ID as the primary key couples identity to the selected data source.
- Choosing PostgreSQL excludes a MySQL-only deployment unless a later decision changes the engine.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| External schema changes break imports | Map and validate the upstream payload in an ingestion adapter. |
| Search values containing `%` or `_` behave as SQL wildcards | Define literal substring semantics and escape wildcard characters while using Sequelize-bound values. |
| Text search becomes slow after substantial dataset growth | Measure query plans first, then evaluate PostgreSQL trigram indexes in a superseding ADR. |
| Invalid or unbounded comments consume storage | Require 1 to 1,000 Unicode characters after trimming. |
| Future user accounts need per-user favorites | Supersede ADR-0005 and migrate the flag to a user-character relationship. |

## Validation

- All tables, constraints, and required primary-key and foreign-key indexes can be created from an empty database using migrations.
- Each required filter is executed against an explicit column with safe bound values.
- A comment cannot reference a missing character.
- Favorite and comment changes persist across API restarts.
- The ERD matches the implemented migration state.

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 20 | 20 | Directly addresses mandatory persistence, migration, filter, and ERD needs. |
| Architectural fit and consistency | 18 | 20 | Fits Sequelize and the authoritative-store decision. |
| Options and trade-offs | 13 | 15 | Compares the other permitted engine and non-relational shortcuts. |
| Feasibility and proportionality | 14 | 15 | The two-table model is small and conventional. |
| Quality attributes | 9 | 10 | Strong integrity, query clarity, and repeatability. |
| Verifiability | 8 | 10 | Migration and persistence behavior are directly testable. |
| Evolution and reversibility | 7 | 10 | Engine and primary-key changes would require data migration. |
| **Total** | **89** | **100** | |

**Recommendation:** Accept.

## References

- [Requirements specification](../REQUIREMENTS.md)
- [Technical assessment](../FULL_STACK_TECHNICAL_ASSESSMENT.md)
- [ADR-0005](./0005-use-single-user-persistence-for-character-interactions.md)
- [ADR index](./README.md)
