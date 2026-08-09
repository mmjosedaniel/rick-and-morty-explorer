# ADR-0010: Use a Targeted Automated Testing Strategy

- Status: Accepted
- Date: 2026-08-09
- Decision owners: Project maintainers
- Related requirements: NFR-004, OR-004, OR-007, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009, AC-010, AC-011, AC-012
- Supersedes: None
- Superseded by: None

## Context

Frontend and backend unit tests are optional, while unit testing is part of the assessment objective and code quality is an evaluation criterion. A broad end-to-end suite would consume disproportionate time, but testing only isolated functions would miss GraphQL, PostgreSQL, Redis, and routing boundaries where the main architectural risks exist. The repository also needs an explicit rule for when tests are written so that tests drive behavior rather than merely confirm completed implementations. Long-running implementation plans can leave behind duplicated tests, implementation-specific assertions, unused fixtures, or other test scaffolding after the final design stabilizes, so suite relevance also needs an explicit plan-completion review.

## Decision drivers

- High confidence in mandatory behavior with a small suite.
- Fast local feedback for TypeScript applications.
- Incremental design feedback through observable Red-Green-Refactor cycles.
- A maintainable test suite whose contents remain traceable to current behavior.
- Direct validation of database, cache, API, and UI boundaries.
- Deterministic tests that do not depend on the public API.

## Considered options

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| TDD with focused unit and integration tests plus a post-plan relevance audit | Tests drive behavior and design, provide strong risk coverage, and remain intentional after the design stabilizes | Requires cycle discipline, isolated PostgreSQL and Redis infrastructure, and a semantic closure review | Selected |
| Write the same tests after implementing each feature | Allows uninterrupted initial implementation | Tests can mirror implementation mistakes and provide design feedback too late | Rejected |
| Audit the entire suite before every Red cycle | Detects obsolete tests at the earliest opportunity | Adds disproportionate friction and can encourage changing tests before the new behavior is understood | Rejected |
| Unit tests only with all infrastructure mocked | Very fast and simple | Cannot validate migrations, queries, GraphQL wiring, or cache behavior | Rejected |
| Full browser end-to-end coverage | Highest user-flow realism | Slow setup and maintenance for the assessment scope | Deferred |
| Manual verification only | No test code | Regressions are hard to detect and optional test goals are missed | Rejected |

## Decision

Every production behavior change will follow Red-Green-Refactor and the three laws of TDD:

1. Do not write production code unless it is required to make a failing test pass.
2. Do not write more test code than is sufficient to produce the next failure; a compilation or TypeScript type-check failure counts as a failure.
3. Do not write more production code than is sufficient to make the currently failing test pass.

During Red, the developer adds one smallest relevant test, runs it, and confirms that it fails for the intended behavioral reason. During Green, the developer implements only enough behavior to pass that test. During Refactor, the developer improves structure without changing behavior and keeps the relevant test scope green. A new cycle begins only after the previous cycle is green.

Every bug fix begins with a failing regression test. The smallest meaningful boundary owns the first test: use a unit or component test for isolated behavior, and begin with an integration test when the behavior belongs to GraphQL wiring, PostgreSQL, Redis, migrations, or another real boundary. Exploratory spikes cannot become production code directly; retained behavior must be reimplemented through TDD. Generated artifacts and declarative configuration do not need artificial unit tests, but their observable build, migration, or runtime outcomes require automated validation.

Each implementation handoff records the test command and intended failure observed during Red, the passing command observed during Green, and the validation repeated after Refactor. Tests must not be skipped, focused, weakened, or made conditional merely to reach Green.

At the completion of every implementation plan or major milestone, a test-relevance audit occurs before final repository verification and closure. When the repository adopts Codex ExecPlans, this audit becomes a mandatory ExecPlan completion gate whose operational format belongs in `PLANS.md`. The audit is complementary suite maintenance, not a fourth law of TDD and not a replacement for Red-Green-Refactor.

The audit reviews tests affected by the plan and searches the suite for residual fixtures, mocks, helpers, snapshots, skipped tests, and focused tests. Each affected test must remain traceable to a current requirement, ADR, public contract, or confirmed regression. The reviewer classifies findings as follows:

- Retain tests that protect distinct current behavior.
- Consolidate fully duplicated tests only when equivalent observable coverage remains.
- Rewrite implementation-detail assertions around observable behavior when the behavior is still required.
- Remove obsolete tests only after the governing requirement, ADR, contract, or regression expectation has been explicitly removed or superseded.
- Remove unused test scaffolding only after verifying that it has no consumers.

A test must never be removed, weakened, skipped, or made conditional merely to make an implementation pass. Any consolidation or removal records its rationale and traceability impact in the plan retrospective, then runs the affected test scope and the complete suite. A plan cannot be marked complete while confirmed residual test code, unexplained test removal, or failing verification remains.

The repository will use a targeted test portfolio:

- Frontend component tests cover at least card rendering, A-Z/Z-A sorting, and detail interactions with loading and error behavior.
- Backend unit tests exercise the character-search service/query with repository and cache test doubles, including filter normalization and returned results. Additional service tests cover comment validation, ingestion mapping, and cache-key construction.
- GraphQL integration tests cover each filter, a combined filter, missing characters, favorite persistence, comment creation, and stable error codes.
- Persistence integration tests run migrations against an isolated PostgreSQL database and verify the idempotent 15-character import without calling the live external API.
- Real Redis integration tests cover miss, hit, TTL, serialization, import invalidation, and connection wiring. Fast unit tests cover canonicalization and injected fail-open errors.

Tests will use deterministic fixtures at the external ingestion boundary. Production code will not detect a test environment to change business behavior. A browser end-to-end smoke test may be added later, but broad end-to-end coverage is not required for the initial assessment.

## Consequences

### Positive

- Tests concentrate on required behavior and the highest-risk boundaries.
- Small failing tests provide early design feedback and limit speculative production code.
- The optional frontend and backend testing requirements become explicit repository delivery commitments with measurable completion evidence.
- External network availability does not affect test reliability.
- Migrations, SQL filtering, and Redis fallback receive real integration coverage.
- Post-plan audits keep tests and support code aligned with current requirements instead of preserving generated residue indefinitely.

### Negative

- Integration tests need lifecycle management for PostgreSQL and Redis.
- Strict TDD cycles add execution overhead, especially at infrastructure boundaries.
- Semantic test-relevance audits add a closure cost and require reviewer judgment.
- The suite does not prove every visual detail in a real browser.
- Fixtures must evolve with the external-data adapter and GraphQL schema.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Integration tests are slow or flaky | Use isolated services, deterministic cleanup, bounded timeouts, and parallel-safe data. |
| Slow integration tests make developers bypass Red | Keep unit feedback fast and use the smallest real boundary that can prove the behavior. |
| Mocks diverge from the public API | Keep fixtures at the adapter boundary and validate them with the same runtime schema. |
| Tests assert implementation details | Prefer observable GraphQL, persistence, cache, and rendered behavior. |
| A plan leaves duplicate tests or unused fixtures and mocks | Run the relevance audit before final verification and inspect both affected tests and suite-wide residual scaffolding. |
| Test cleanup silently removes required coverage | Require traceability and equivalent observable coverage before consolidation or removal. |
| A failing test is deleted to unblock completion | Prohibit convenience deletion and keep the plan incomplete until behavior and expectations are reconciled explicitly. |
| A test fails for an unrelated reason | Confirm the intended Red failure before writing production code. |
| Multiple failing tests accumulate into a large batch | Complete one Red-Green-Refactor cycle before starting the next behavior. |
| Coverage percentage becomes the goal | Treat coverage as a signal and prioritize requirement and risk traceability. |

## Validation

- Every production behavior change has recorded Red evidence showing the smallest relevant test failing for the intended reason before the implementation change.
- The same relevant test scope passes during Green and remains green after Refactor.
- Every bug fix includes a regression test that fails without the fix.
- Repository checks reject skipped or focused tests and test-only production branches.
- Every completed implementation plan or major milestone contains a test-relevance audit recorded before final repository verification.
- Every consolidated, rewritten, or removed test records the current requirement, ADR, contract, or regression rationale and its coverage impact.
- Residual fixtures, mocks, helpers, snapshots, skipped tests, and focused tests are either removed or retain an explicit current consumer and justification.
- After test maintenance, both the affected test scope and the complete suite pass; unexplained removals or confirmed residue keep the plan incomplete.
- At least three frontend components or layouts have meaningful automated tests.
- A unit-level character-search query/service test verifies filtering and result behavior without real infrastructure.
- The character search query has automated coverage for every filter and a combined filter.
- Migrations and the idempotent character import pass from an empty isolated database.
- At least one real Redis integration suite covers hit, miss, TTL, serialization, invalidation, and connection wiring; injected failures cover outage behavior.
- The full test suite runs from a documented root command without reaching the live external API.
- Every mandatory acceptance criterion maps to at least one automated or explicitly documented manual check.

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 17 | 20 | Adopts optional tests and validates all mandatory criteria. |
| Architectural fit and consistency | 18 | 20 | Exercises the boundaries established by the other ADRs. |
| Options and trade-offs | 14 | 15 | Compares TDD, test-after, unit-only, browser, and manual strategies. |
| Feasibility and proportionality | 13 | 15 | TDD adds cycle discipline while the focused portfolio limits its cost. |
| Quality attributes | 10 | 10 | Improves correctness, maintainability, regression safety, and long-term suite relevance. |
| Verifiability | 10 | 10 | Defines observable TDD evidence, boundary checks, and a measurable plan-completion audit. |
| Evolution and reversibility | 7 | 10 | The suite can expand and be safely consolidated through traceable audits, though fixtures and infrastructure still require maintenance. |
| **Total** | **89** | **100** | |

**Recommendation:** Accept.

## References

- [Requirements specification](../REQUIREMENTS.md)
- [Repository guidelines](../../AGENTS.md)
- [Codex ExecPlan guidance](https://developers.openai.com/cookbook/articles/codex_exec_plans)
- [ADR-0001](./0001-use-a-modular-monolith-workspace.md)
- [ADR-0006](./0006-define-a-use-case-oriented-graphql-contract.md)
- [ADR-0007](./0007-use-cache-aside-for-character-searches.md)
- [ADR-0008](./0008-use-deterministic-bootstrap-and-idempotent-sync.md)
- [ADR-0009](./0009-keep-frontend-state-close-to-its-owner.md)
- [ADR index](./README.md)
