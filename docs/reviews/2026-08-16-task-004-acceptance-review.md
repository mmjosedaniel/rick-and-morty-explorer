# TASK-004 Acceptance Review — 2026-08-16

- Review status: Complete — `REVISE`
- Review scope: Exact integrated TASK-004 candidate, worker-first evidence, PostgreSQL/Windows/clean-checkout/hosted-CI packets, task closure, and AC-001 through AC-012
- Reviewed candidate: branch `agent/task-004-relational-persistence`, `HEAD` `7b6d020aa9a26274bb1140c6098e803f6045618f`, plus five uncommitted pre-review documentation files
- Hosted evidence: GitHub Actions run `31928215615`, job `95118964710`, exact head `7b6d020aa9a26274bb1140c6098e803f6045618f`
- Prior review: [2026-08-14 documentation consistency and readiness review](./2026-08-14-documentation-consistency-and-readiness-review.md)

## Verdict

`REVISE`. No Blocker was found. One Major prevents TASK-004 closure: the immutable artifact does not authenticate two inherited TypeScript configuration files that the compiler resolves. One Minor identified stale current-state documentation. The primary coordinator must keep TASK-004 `In progress`, remediate through the ordinary worker-first Red/Green path, regenerate complete evidence, and obtain a fresh final review before changing status or moving the ExecPlan.

## Task-scoped review matrix

| Area | Result | Evidence or remaining action |
|---|---|---|
| Scope, prerequisites, DG-001/DG-002/DG-005, AUTH-001 | Pass | Canonical dependencies remain TASK-002 and TASK-003; ADR-0015 and authorization boundaries are intact. |
| Relational schema and Sequelize mapping | Pass | Exact characters/comments schema, foreign key, indexes, `image_url`, mappings, and negative scope have accepted PostgreSQL evidence. |
| Lifecycle, atomicity, cleanup, locks, concurrency, commands | Pass | Status/up/bounded-down, history, error, recovery, timeout, collision, overlap, CLI, and emitted-validation packets pass. |
| Real runtime and delivery parity | Pass | PostgreSQL 18.6, owned Windows controller, committed clean checkout, and exact-head hosted CI pass with complete cleanup. |
| Worker-first and TDD evidence | Pass | 203 terminal TASK-004 leases across 107 cycles preserve Red/Green/Setup identity, compliant receipts, primary readback, and Refactor disposition. |
| Authenticated artifact input identity | **Fail — Major** | Add both inherited compiler configurations to the authenticated input set through a focused Red/Green cycle. |
| Documentation truth and closure | **Fail — Minor plus dependent closure** | Correct stale current context, then reconcile regenerated evidence and a fresh review. |

## Major finding: inherited compiler configurations are not authenticated

[ADR-0015](../adrs/0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md) requires the artifact input allowlist to authenticate every authored input capable of changing the published runtime, including migration TypeScript configuration. `apps/api/tsconfig.migrations.json` extends `apps/api/tsconfig.json`, which extends root `tsconfig.base.json`. The compiler uses `ts.parseJsonConfigFileContent`, so it resolves inherited target, strictness, module, and module-resolution settings before emit. The sandbox also copies all three configurations. However, `collectInputs()` authenticates only the leaf configuration, and the reviewed manifest contains 18 inputs without either inherited file.

Changing an omitted inherited configuration can therefore change compiler acceptance or emitted ESM without changing the authenticated source input set. The smallest remediation is one data-driven sandbox Red for both inherited files, followed by adding both exact repository-relative paths to the existing sorted input allowlist. Regenerate artifact identity and repeat proportional, Windows, clean-checkout, and hosted-CI evidence afterward.

## Minor finding: stale current-state documentation

The active ExecPlan still described PostgreSQL 18.4, absent Sequelize/Umzug/pg/integration behavior, and unimplemented lifecycle slices in its current context. The ADR index also still called committed clean-checkout and hosted CI open. These claims must be historicalized or replaced with current evidence. Artifact identities must be qualified by exact run/candidate rather than presented as one platform-independent current identity until the remediation regenerates them.

## Product acceptance

Overall product acceptance remains **0/12**. AC-001 through AC-006 still require product UI/detail/favorite/comment/responsive work; AC-007, AC-008, and AC-011 require TASK-006 GraphQL and request behavior; AC-009 still requires TASK-005's deterministic 15-character import as well as this artifact correction; AC-010 requires TASK-007 Redis behavior; and AC-012 requires TASK-014/TASK-015 ERD and delivery closure. TASK-004 task-scoped evidence cannot convert any of these criteria into `Pass`.

## Verification evidence

- GitHub Actions run `31928215615`, job `95118964710`: success on exact reviewed head.
- Hosted suite: unit 53/53, PostgreSQL integration 67/67, application 2/2, Chromium smoke 1/1, smoke lifecycle 6/6, build, and unconditional teardown passed.
- Local strict typecheck passed.
- Documentation validation passed for 49 Markdown files, 41 requirement IDs, 18 tasks, 17 SPEC rules, 20 HS rules, and 119 scenarios.
- ADR validation passed for 15 ADRs and 38 mapped requirements with only the established NFR-006 warning.
- `git diff --check` passed with only line-ending conversion notices; no skipped/focused tests or active write lease remained.

## Documentation impact

This dated review is preserved as the non-authorizing final-review attempt. Current status, plan, ADR-index, review-index, and chronology owners must record the `REVISE` result while TASK-004 remains `In progress`. A later passing review must be a new record rather than an overwrite. No requirement, ADR semantics, task edge, authorization, product behavior, or acceptance result changed in this review.
