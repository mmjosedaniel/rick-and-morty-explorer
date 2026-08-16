# Architecture Decision Records

This directory contains the architectural decisions derived from the [requirements specification](../REQUIREMENTS.md) and the [technical assessment](../FULL_STACK_TECHNICAL_ASSESSMENT.md).

For documentation authority and Codex task routing, start from the repository [documentation map](../../README.md#documentation-map). The [target system module diagram](../SYSTEM_DIAGRAM.md) provides a derived overview of the accepted decisions and unresolved module boundaries. Pending architectural choices remain in the [implementation plan](../IMPLEMENTATION_PLAN.md#active-decision-gates) until they are evaluated as ADRs.

The records describe the architectural direction. They do not claim that the corresponding code has already been implemented, and an `Accepted` status is never implementation or acceptance evidence by itself.

## Convention

- ADR filenames use `NNNN-short-kebab-case-title.md`.
- ADR numbers are sequential and are never reused.
- New records start as `Proposed` and become `Accepted` only after project-owner approval.
- An accepted ADR is not rewritten to reverse its decision. A new ADR must supersede it, and both records must link to each other.
- Owner-directed archival grouping may move a `Superseded` record under [`superseded/`](./superseded/) without changing its stable filename, ID, status, score, decision semantics, or history. Every move must repair links, keep the central index authoritative, preserve validator discovery, and record the organizational rationale.
- `Related requirements` records requirements materially addressed by a decision, including optional requirements that the decision may adopt or defer. The metadata does not by itself claim adoption or implementation; optional disposition is recorded in the table below.
- Official technology names and external API field names remain unchanged where accuracy or compatibility requires them.

## Status definitions

- `Proposed`: evaluated and awaiting approval.
- `Accepted`: approved as the implementation direction, but not evidence that the direction has been implemented.
- `Rejected`: evaluated but not selected.
- `Deprecated`: no longer recommended and not directly replaced.
- `Superseded`: replaced by a newer ADR.

## Evaluation method

Each ADR is scored out of 100 using the following rubric:

| Criterion | Maximum |
|---|---:|
| Requirements traceability | 20 |
| Architectural fit and consistency | 20 |
| Options and trade-offs | 15 |
| Feasibility and proportionality | 15 |
| Quality attributes | 10 |
| Verifiability | 10 |
| Evolution and reversibility | 10 |
| **Total** | **100** |

Recommendations are assigned as follows:

- `85-100`: Accept.
- `75-84`: Accept with explicit follow-ups and residual risks.
- `60-74`: Revise while keeping the ADR proposed.
- Below `60`: Reject.

An ADR cannot be recommended for acceptance if it contradicts a mandatory requirement, lacks measurable validation, hides a high-impact assumption, or conflicts with an earlier decision.

## Decision index

| ADR | Decision | Status | Score | Recommendation | Primary requirements |
|---|---|---|---:|---|---|
| [ADR-0001](./0001-use-a-modular-monolith-workspace.md) | Use a modular monolith workspace | Superseded | 92 | Accept | NFR-001, NFR-003, NFR-004, OR-008, AC-012 |
| [ADR-0002](./0002-use-typescript-across-the-stack.md) | Use TypeScript across the stack | Accepted | 87 | Accept | OR-001, NFR-004 |
| [ADR-0003](./0003-use-postgresql-for-relational-persistence.md) | Use PostgreSQL for relational persistence | Accepted | 89 | Accept | FR-BE-002, FR-BE-003, AC-008, AC-009, AC-012 |
| [ADR-0004](./0004-use-the-database-as-the-runtime-source-of-truth.md) | Use the database as the runtime source of truth | Superseded | 91 | Accept | FR-BE-001, FR-BE-003, FR-BE-004 |
| [ADR-0005](./0005-use-single-user-persistence-for-character-interactions.md) | Use single-user persistence for character interactions | Accepted | 82 | Accept with follow-up | FR-FE-004, FR-FE-005, AC-004, AC-005 |
| [ADR-0006](./0006-define-a-use-case-oriented-graphql-contract.md) | Define a use-case-oriented GraphQL contract | Accepted | 92 | Accept | FR-BE-001, FR-BE-002, FR-BE-006, AC-007, AC-008, AC-011, AC-012 |
| [ADR-0007](./0007-use-cache-aside-for-character-searches.md) | Use cache-aside for character searches | Accepted | 95 | Accept | FR-BE-005, OR-008, AC-010 |
| [ADR-0008](./0008-use-deterministic-bootstrap-and-idempotent-sync.md) | Use deterministic bootstrap and idempotent synchronization | Accepted | 90 | Accept | FR-BE-004, AC-009 |
| [ADR-0009](./0009-keep-frontend-state-close-to-its-owner.md) | Keep frontend state close to its owner | Accepted | 90 | Accept | FR-FE-001, FR-FE-002, FR-FE-003, FR-FE-004, FR-FE-005, NFR-002, OR-003 |
| [ADR-0010](./0010-use-a-targeted-automated-testing-strategy.md) | Use a targeted automated testing strategy | Accepted | 89 | Accept | NFR-004, OR-004, OR-007 |
| [ADR-0011](./0011-define-the-typescript-test-harness.md) | Define the TypeScript test harness | Accepted | 92 | Accept | NFR-004, OR-001, OR-004, OR-007 |
| [ADR-0012](./0012-use-a-build-first-programmatic-migration-lifecycle.md) | Use a build-first programmatic migration lifecycle | Superseded | 91 | Accept | FR-BE-003, FR-BE-004, NFR-003, DEL-002, AC-009, AC-012, OR-001 |
| [ADR-0013](./superseded/0013-materialize-character-images-during-ingestion.md) | Materialize character images during ingestion | Superseded | 91 | Accept | FR-FE-001, FR-FE-003, NFR-001, NFR-005, AC-001, AC-003 |
| [ADR-0014](./0014-persist-and-deliver-character-image-urls-directly.md) | Persist and deliver character image URLs directly | Accepted | 86 | Accept | FR-FE-001, FR-FE-003, NFR-001, NFR-003, NFR-004, NFR-005, OR-008, AC-001, AC-003, AC-007, AC-012 |
| [ADR-0015](./0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md) | Use a build-first migration lifecycle with restricted ASCII catalog-bound lock identity | Accepted | 92 | Accept | FR-BE-003, FR-BE-004, NFR-003, DEL-002, AC-009, AC-012, OR-001 |

Consequential choices that have not yet reached ADR evaluation are tracked as pending gates in the [implementation plan](../IMPLEMENTATION_PLAN.md#active-decision-gates). They are not accepted decisions and do not reserve ADR numbers. Non-architectural owner authorization is tracked separately through stable `AUTH-*` records. ADR-0011 is accepted and resolves DG-001; acceptance defines implementation direction only. Now-Superseded ADR-0012 historically resolved DG-002 with a build-first programmatic Umzug lifecycle. TASK-016 review later exposed that its NFC-based PostgreSQL migration-lock identity aliases valid distinct namespace names. [ADR-0015](./0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md) is the accepted whole-record successor prepared by completed [TASK-018](../plans/completed/TASK-018-postgresql-migration-lock-identity-decision.md). Fresh independent review returned `PASS` with no Blocker, Major, or Minor across all twenty hard gates and LOCK-INV-01 through LOCK-INV-21 on exact proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1`; the project owner explicitly approved those bytes on 2026-08-14. ADR-0015 is current, ADR-0012 is reciprocally Superseded, DG-005 is Resolved, and TASK-018 is Complete. Separate execution authorization later moved TASK-004 to `In progress`. The 2026-08-16 fresh integrated review returned `REVISE` for two omitted inherited compiler configurations. One bounded correction now authenticates all three TypeScript configurations, and a second correction makes exact emitted bytes independent of LF/CRLF source materialization without normalizing published-output checksums. Current local unit 55/55, build, PostgreSQL 18.6 integration 67/67, and committed 35-check controller run `af1a90f61c5b8f9d` pass; the LF and CRLF trees produce the same exact artifact identity. Hosted-CI evidence, fresh re-review, and documentation closure remain. ADR-0013 historically resolved DG-004 and superseded ADR-0004; ADR-0014 now supersedes ADR-0001 and ADR-0013, carries forward their unaffected constraints, and resolves DG-006. Acceptance did not itself select the separate [content-rights authorization disposition](./0014-persist-and-deliver-character-image-urls-directly.md#content-rights-authorization-boundary) or prove image-delivery behavior. [AUTH-001](../IMPLEMENTATION_PLAN.md#auth-001---character-image-content-rights-authorization) is `Authorized` only within the recorded non-commercial portfolio/direct-URL scope; the implementation plan owns its scope-bound continuity and reopen policy, while ADR-0014 independently owns the current direct-URL technical boundary.

## Portfolio evaluation

The current accepted decisions form one consistent baseline. ADR-0001, ADR-0004, ADR-0012, and ADR-0013 are retained as Superseded history. ADR-0014 is the current successor for the carried-forward workspace and image-delivery constraints from ADR-0001 and ADR-0013, while ADR-0015 is the current successor for ADR-0012's migration lifecycle:

1. ADR-0014 carries forward ADR-0001's modular-monolith workspace, infrastructure, isolation, command, and no-microservice rules; ADR-0002 keeps the stack strictly typed.
2. ADR-0003 defines the relational engine and minimal data model.
3. ADR-0014 keeps PostgreSQL authoritative for the character-to-image-locator association, persists the exact validated upstream avatar URL, and permits only governed native browser avatar requests; it owns no image bytes, proxy, or asset route.
4. ADR-0008 owns the only path by which external character data enters or refreshes the database.
5. ADR-0006 exposes the application use cases without leaking upstream or persistence schemas.
6. ADR-0007 caches only stable search projections and falls back to the PostgreSQL authority carried forward by ADR-0014 when Redis is unavailable.
7. ADR-0009 gives URL, server, and transient UI state distinct owners and reserves Zustand for demonstrated cross-cutting client-only state.
8. ADR-0010 defines the TDD workflow, audits test relevance at plan completion, and validates the boundaries and failure modes introduced by the other decisions.
9. ADR-0011 maps that testing strategy to Vitest projects, jsdom, milestone-aware scope activation, external PostgreSQL and Redis isolation, and one Chromium-only Playwright process smoke.
10. ADR-0015 selects the current build-first programmatic Umzug lifecycle with authenticated immutable emitted ESM artifacts, transactional checksummed history, bounded rollback, and restricted-ASCII exact catalog-bound v2 PostgreSQL namespace advisory locking; ADR-0012 preserves the prior v1 lifecycle as Superseded history.

Accepted ADR-0015 replaces ADR-0012 as a whole record. It preserves item 10's unaffected lifecycle and replaces the non-injective NFC lock identity with a `migrations:v2` identity over exact verified catalog names. Its selected portfolio profile fixes one local/CI dependency set, restricts database/schema/user to lower-case ASCII application identifiers, permits only `127.0.0.1` with TLS disabled, uses an opaque private-`WeakMap` target handle, rejects every nonempty `PG*` environment variable before acquisition, verifies the exact eight-field startup identity, binds database/schema twice as `text`, and destroys the session when the lock deadline expires. Permissions remain downstream defense in depth rather than identity provenance. Acceptance is implementation direction, not runtime evidence.

ADR-0013 was accepted on 2026-08-11, historically resolves DG-004, and retains reciprocal whole-record supersession metadata with ADR-0004. It is now Superseded by ADR-0014 and remains intact with completed TASK-016 as historical evidence. DG-005 was an explicit follow-up to ADR-0012, not an image-decision supersession effect. ADR-0015's earlier correction hashes and `REVISE` verdicts remain historical and non-authorizing. Precision-corrected proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1` passed primary validation, fresh independent exact-artifact review, and explicit owner approval. DG-005 is Resolved under completed TASK-018.

ADR-0014 was accepted on 2026-08-11 after a source-first reassessment scored direct URL 86, runtime proxy 80, and materialized bytes 70. Complete fresh final IR-B returned `PASS` with no finding on proposal SHA-256 `23E9E36939B3B76CDAFAEFF6C49F622769733C8E187D00922AC310373A987CE1`, and the project owner then approved that exact record. ADR-0014 resolves DG-006, supersedes ADR-0001 and ADR-0013 as whole records, carries forward their unaffected workspace and product-data constraints, and leaves ADR-0004 as Superseded history. ADR-0013 was not discarded; it remains technically feasible and preserved as Superseded history. AUTH-001 subsequently recorded the direct-specific content-rights disposition A as `Authorized` for the personal, educational, non-commercial portfolio. A later broad no-reopen clarification is preserved as superseded authorization history. On 2026-08-14, the owner confirmed that the project will remain within the recorded portfolio scope, so AUTH-001 is currently valid only for the exact ADR-0014 direct URLs and ordinary caching; changes to the recorded scope or delivery boundary reopen it under the implementation plan's current trigger list. Authorization does not prove image-delivery behavior, and no image-delivery behavior exists.

No decision conflicts with a mandatory requirement. ADR-0005 is accepted with an explicit follow-up because the requirements omit identity and authentication. Its single-user assumption must be superseded before user accounts enter scope; before anonymous public writes are deployed, the deployment-control follow-up defined by ADR-0005 must be completed through a new or superseding decision as appropriate.

## Architecture coverage

This area-level table helps readers locate relevant ADRs. It is not end-to-end requirement-to-task-to-test traceability and does not establish implementation or acceptance status.

| Requirement area | Addressed by |
|---|---|
| Character list, sorting, detail, favorites, and comments | ADR-0005, ADR-0006, ADR-0009, ADR-0010 |
| GraphQL search and filtering | ADR-0003, ADR-0006, ADR-0007, ADR-0010, ADR-0014 |
| Relational persistence and migrations | ADR-0003, ADR-0008, ADR-0014, accepted ADR-0015; ADR-0012 is Superseded history |
| Initial set of 15 characters | ADR-0008, ADR-0010 |
| Character-image acquisition, persistence, and delivery | ADR-0014 (`Accepted` direct-URL direction); ADR-0013 (`Superseded` materialization history); [AUTH-001](../IMPLEMENTATION_PLAN.md#auth-001---character-image-content-rights-authorization) (`Authorized`, disposition A) |
| Redis search caching | ADR-0007, ADR-0010 |
| Responsive frontend and prescribed frontend stack | ADR-0002, ADR-0009, ADR-0014 |
| Code quality | ADR-0002, ADR-0006, ADR-0007, ADR-0010, ADR-0014 |
| Automated test harness and execution boundaries | ADR-0010, ADR-0011 |
| Request logging | ADR-0006, ADR-0010 |
| Public source repository (DEL-001) | ADR-0014 carries forward the ADR-0001 workspace boundary; verify public accessibility and Git evidence separately |
| Git usage (NFR-006) | Delivery and evaluation constraint; verify through repository history and review rather than an ADR |
| ERD and execution/API documentation (DEL-002, DEL-003) | ADR-0003, ADR-0006, ADR-0008, ADR-0014, accepted ADR-0015; ADR-0012 is Superseded history |

## Optional-scope decisions

The source assessment keeps every `OR-*` requirement outside its minimum acceptance criteria. An accepted ADR may nevertheless adopt an optional requirement as a binding repository delivery commitment. `Adopted` below means required for this repository; implementation and acceptance status remain evidence-owned and are reported separately. `Deferred` means outside the current repository delivery baseline.

| Optional requirement | Repository disposition | Governing decision | Delivery effect |
|---|---|---|---|
| OR-001 - TypeScript | Adopted | ADR-0002 | Application and test source must use strict TypeScript across the stack. |
| OR-002 - Soft deletion | Deferred | ADR-0003 | The initial model has no soft-deletion behavior. |
| OR-003 - Interface filters | Adopted | ADR-0009 | Status, species, and gender filters are repository commitments even though they remain outside the source minimum. |
| OR-004 - Frontend tests | Adopted | ADR-0010 | At least three frontend components or layouts require meaningful automated tests. |
| OR-005 - Scheduled updates | Deferred | ADR-0008 | The initial scope has no 12-hour scheduler. |
| OR-006 - Query timing decorator | Deferred | ADR-0002 | Experimental decorators are not enabled solely for query timing. |
| OR-007 - Backend tests | Adopted | ADR-0010 | The character-search query or service requires unit-level coverage. |
| OR-008 - Design patterns | Adopted | ADR-0006, ADR-0007, ADR-0014 | The implementation must preserve the selected modular, use-case-service, and cache-aside boundaries. |
| OR-009 - Swagger documentation | Deferred | ADR-0006 | GraphQL schema and operation documentation support required API usage documentation but do not count as Swagger or satisfy OR-009. |

PostgreSQL is the accepted choice within the mandatory relational-database requirement; it is not an optional-scope promotion. The adopted optional commitments must be reported separately from minimum-assessment readiness until both views are explicitly combined for a repository release decision.

Zustand is not an initial dependency or a portfolio checkbox. ADR-0009 preselects it only for a future concrete state slice that is cross-cutting, client-only, unsuitable for the URL, and costly to keep local. GraphQL data and URL navigation state remain outside any Zustand store.

The method decorator is deferred because ordinary middleware or a small timing wrapper satisfies observability with less language-level ceremony. Swagger is also deferred because OpenAPI does not naturally describe a GraphQL-only contract; the version-controlled GraphQL schema, a development explorer, and documented operations are the recommended API documentation instead.

## Review checklist

- The filename and content are in English.
- The ID in the filename matches the H1 title.
- The status and ISO date are present.
- Mandatory and optional requirements are distinguished.
- At least two credible alternatives are evaluated.
- The selected option is specific and falsifiable.
- Positive and negative consequences are recorded.
- Risks have explicit mitigations.
- Validation checks are measurable.
- Relative links resolve from this directory.
- No implementation is claimed without evidence.
