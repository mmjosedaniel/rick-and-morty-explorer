# Gherkin Specifications

Start from the repository [documentation map](../../README.md#documentation-map), then use the exact `TASK-*` work item in the [implementation plan](../IMPLEMENTATION_PLAN.md) to select only the rules relevant to the current change.

## Status and Authority

These files are derived, specification-only artifacts for future implementation and acceptance work:

- [SPEC.feature](./SPEC.feature) describes externally observable success paths and required delivery outcomes.
- [HARD_SPEC.feature](./HARD_SPEC.feature) describes non-negotiable invariants, invalid inputs, failure behavior, architectural boundaries, and human decision gates.

The [technical assessment](../FULL_STACK_TECHNICAL_ASSESSMENT.md) owns the source scope and mandatory-versus-optional classification. The [requirements specification](../REQUIREMENTS.md) owns requirement, deliverable, and acceptance-criterion wording and IDs. The [ADR index](../adrs/README.md) and individual ADRs own accepted architecture and optional-scope disposition. The [implementation plan](../IMPLEMENTATION_PLAN.md) owns unresolved decision gates.

These Gherkin files do not change those authorities and are not evidence that any scenario is implemented, automated, passing, or accepted.

## Repository Interpretation

For this repository:

- `SPEC` means examples of expected product behavior and required reviewer-facing outcomes.
- `HARD_SPEC` means precise constraints that an implementation must not weaken, including negative paths, failure modes, isolation rules, scope guards, and decisions that an agent must not invent.

This distinction is a repository convention rather than a new product-scope classification. Mandatory requirements remain mandatory. Adopted optional requirements remain source-optional repository commitments. Deferred optional requirements appear only as scope guards in `HARD_SPEC`.

## Execution State

The feature files intentionally have no runner configuration, step definitions, or authoritative execution command. They are documentation rather than application tests. [ADR-0011](../adrs/0011-define-the-typescript-test-harness.md) has resolved [DG-001](../IMPLEMENTATION_PLAN.md#dg-001---typescript-test-harness) by selecting Vitest projects, jsdom, ordinary-test traceability, milestone-aware scope activation, and one Chromium-only Playwright process smoke. No selected dependency, configuration, command, test, or browser binary exists until TASK-003 or a later owning task implements its registered scope.

[DG-002](../IMPLEMENTATION_PLAN.md#dg-002---sequelize-migration-lifecycle) must be resolved before migration artifacts or their integration harness are added. [DG-003](../IMPLEMENTATION_PLAN.md#dg-003---frontend-graphql-client-and-query-cache) must be resolved before frontend GraphQL client, cache, generated operation, or dependent test code is added. [DG-004](../IMPLEMENTATION_PLAN.md#dg-004---character-image-delivery-boundary) must be resolved before import, GraphQL mapping, or browser code selects how character images are delivered.

Every scenario remains `Specified, not executed` until its owning task implements an ordinary automated check through the ADR-0011 boundary, every other applicable gate is resolved, and the authoritative validation command passes. The feature files themselves remain non-executable. DG-002 does not block unrelated API or frontend work, DG-003 does not block backend or static-layout work, and DG-004 does not block the operational walking skeleton.

## Tag Convention

| Tag | Meaning |
|---|---|
| `@SPEC`, `@HARD_SPEC` | Classifies the containing feature file; it does not establish scope or execution state. |
| `@planned` | Inherited by every scenario; specified but not bound to an executable check. |
| `@minimum_assessment` | Scenario-level readiness selector for an outcome required by the source assessment baseline. Never place it on a mixed rule whose scenarios include ADR-only refinements. |
| `@repository_baseline` | Readiness selector inherited by every active rule and scenario in the full accepted repository baseline, including minimum scope, accepted architecture, and adopted optional commitments. |
| `@mandatory` | Traceability marker showing that a rule protects a mandatory source area or required deliverable. It is not by itself a readiness-view selector because accepted ADR details may be stricter than the source wording. |
| `@adopted_optional` | Source-optional, but adopted as a repository delivery commitment. |
| `@deferred_optional` | Outside the current delivery baseline and present only as a scope guard. |
| `@human_decision` | Controlled by a pending gate or required project-owner decision. |
| `@SPEC-*`, `@HS-*` | Stable rule IDs for the functional and hard specifications. |
| `@FR-*`, `@NFR-*`, `@OR-*`, `@DEL-*`, `@AC-*` | Traceability to stable requirement, deliverable, and acceptance IDs. |
| `@ADR-*`, `@DG-*` | Traceability to accepted architecture or a decision gate, regardless of whether that gate is pending or resolved. |

## Coverage Boundary

`SPEC.feature` covers the mandatory frontend and backend behavior, prescribed technology outcomes, required deliverables, AC-001 through AC-012, and the adopted OR-003 interface filters. `HARD_SPEC.feature` hardens those paths and covers adopted OR-001, OR-004, OR-007, and OR-008 commitments, plus guards for deferred OR-002, OR-005, OR-006, and OR-009.

The scenarios deliberately avoid introducing:

- a test runner, DOM environment, command boundary, or executable Gherkin layer that conflicts with ADR-0011;
- the migration runner and TypeScript artifact lifecycle controlled by DG-002;
- the frontend GraphQL client, query-cache library, generation tool, or error-handling integration controlled by DG-003;
- the character-image copy, application-delivery, or external-browser-request strategy controlled by DG-004;
- URL parameter names or a default sort direction. These are reversible TASK-010 execution choices that must be recorded in the [decision and progress log](../execution/decision-and-progress-log.md) before dependent code is written; they do not require a new ADR unless their scope becomes consequential.

## Codex Rule Routing

Read the authoritative requirement and ADR first, then locate only the stable rules mapped by the active implementation task. A rule restates an observable check so that it can become executable later; the linked authority remains normative.

| Work area | Derived rules | Planned owner |
|---|---|---|
| Decision guards and accepted test-harness boundary | HS-001 through HS-003 and HS-020 | TASK-001 for the accepted HS-001 boundary; TASK-002, TASK-009, and TASK-016 for the remaining pending gates |
| Character-image delivery | HS-020 and the DG-004-tagged image paths in SPEC-001, SPEC-003, SPEC-007, SPEC-008, and SPEC-010 | TASK-016 for the decision; TASK-005, TASK-006, TASK-010, and TASK-012 for affected behavior |
| Deferred-scope and deployment guards | HS-004, HS-005 | Applicable future scope decision; TASK-008 for current single-user semantics |
| Repository language and module boundaries | HS-006, HS-007, HS-019 | TASK-003 and TASK-013 |
| Character list, sorting, and interface filters | SPEC-001, SPEC-002, SPEC-006, HS-015, HS-016 | TASK-010 and TASK-012 |
| Detail, favorites, and comments | SPEC-003 through SPEC-005, HS-009, HS-015, HS-016 | TASK-008 and TASK-011 |
| Express/GraphQL queries, filters, mutations, and logs | SPEC-008, SPEC-009, SPEC-013, HS-008, HS-010, HS-014 | TASK-006 for the Express/query/logging boundary; TASK-008 for mutation behavior |
| Migrations and relational model | SPEC-010, HS-011 | TASK-004 |
| Deterministic import and database authority | SPEC-010, SPEC-011, HS-012 | TASK-005 for import behavior; TASK-006 and TASK-008 for PostgreSQL-backed runtime reads and writes |
| Redis cache-aside | SPEC-012, HS-013 | TASK-007 |
| Responsive and resilient UI | SPEC-007, HS-016 | TASK-012 |
| Test portfolio | HS-017 | TASK-004 through TASK-008 and TASK-010 through TASK-012 contribute applicable scenario evidence; TASK-013 owns portfolio closure |
| Technology and delivery evidence | SPEC-014 through SPEC-017, HS-018 | TASK-003, TASK-014, TASK-015 |

The `TASK-003` web shell, `GET /healthz` response, and application smoke are task-local operational evidence. They intentionally have no product `SPEC-*` rule, do not make the browser call the liveness route, and do not satisfy AC-007, SPEC-008, SPEC-014, SPEC-017, or any product acceptance criterion.

## Maintenance

- Change the authoritative owner first when product scope, optional disposition, architecture, or a decision gate changes.
- Update affected scenarios and tags in the same task after the authority change is accepted.
- Map scenarios to ordinary automated checks only through the accepted ADR-0011 boundary and the task that owns each executable scope; do not add feature-file bindings without a later accepted decision.
- Preserve scenario-level `@minimum_assessment` and inherited `@repository_baseline` axes so acceptance reviews can report the two required readiness views without treating an ADR-only constraint as source-mandatory.
- Keep scenario outcomes observable and keep implementation details in future step definitions or focused lower-level tests.
- Never mark a scenario passing without reproducible repository or runtime evidence.
- Run `python .agents/skills/verify-repository/scripts/validate_docs.py --repo .` after changing rule IDs, tags, references, examples, paths, or anchors.
