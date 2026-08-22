# Close TASK-013 Code-Quality and Adopted Test Commitments


- Status: Complete under project-owner-authorized workflow `TASK-013-20260822-01`; archived and completed-location validation passed
- Task: [TASK-013](../../IMPLEMENTATION_PLAN.md#task-013---close-code-quality-and-adopted-test-commitments)
- Plan ID and prospective workflow ID: `TASK-013-20260822-01`
- Created: 2026-08-22
- Last updated: 2026-08-22
- Governing convention: [PLANS.md](../../../PLANS.md)

This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.

The project owner separately authorized execution of this exact registered plan under workflow `TASK-013-20260822-01` on 2026-08-22. That authorization permits the bounded worker-first implementation, validation, and documentation closure recorded here; it does not authorize a materially revised plan, additional dependencies, commit, push, pull request, publication, or deployment.

## Progress


- [x] (2026-08-22) Read TASK-013, NFR-004, adopted OR-001/OR-004/OR-007/OR-008, ADR-0002/0006/0007/0014/0016/0018, HS-006/HS-007/HS-017/HS-019, the current harness, manifests, CI workflow, source ownership, test projects, and task-closure rules.
- [x] (2026-08-22) Completed planning reuse audit `TASK-013-REUSE-20260822-01` on clean `main` HEAD `7a3cab06257931424968d818cff7506c9b819a44`, using the 137-path implementation/test/configuration aggregate `3EF957D74D8686081DADE51FAA3D406A0D376EF89432CFD41DE9E168C2200EC2`.
- [x] (2026-08-22) Verified that the accepted TASK-012 product/test/configuration projection is unchanged from commit `312d462318e5d1be5ddcab41a4d3f3788806908d`, while the current root manifest, lockfile, CI workflow, and installed top-level graph contain no ESLint boundary.
- [x] (2026-08-22) Recorded the proportional reuse and lint-boundary choice in [DPL-DEC-053](../../execution/decision-and-progress-log.md#decision-log).
- [x] (2026-08-22) Registered this implementation-ready plan while keeping TASK-013 `Pending`.
- [x] (2026-08-22) Passed planning documentation validation, task/index/link readback, and `git diff --check`; no ADR validation is required because this plan changes no architecture, optional disposition, or gate.
- [x] (2026-08-22 15:04Z) Received separate project-owner execution authorization; confirmed TASK-007/TASK-012 Complete, TASK-013 Pending, all DG gates Resolved, and AUTH-001 Authorized; reconciled a clean `codex/execplan-013` worktree at `e72310fd7a1a651ce1ecf1c8496f0d5a4e50e138`; reproduced the exact 137-path aggregate `3EF957D74D8686081DADE51FAA3D406A0D376EF89432CFD41DE9E168C2200EC2`; selected compatible stable `eslint` 10.9.0 and `typescript-eslint` 8.67.0 from authoritative npm metadata; and transitioned TASK-013 to `In progress` under `TASK-013-20260822-01`.
- [x] (2026-08-22 15:35Z) Completed Milestone 1 on candidate `024F1415C4ADA8AD56233C77500434D0218AE5CC188522FB2E70770027704B3D`: binding preflight, exact two-package lint setup, calculated-rule proof, relevance/ownership audit, two exact-path behavior-preserving corrections with compliant receipts, the affected join, and fresh S1 `PASS` with zero finding all passed.
- [x] (2026-08-22 15:48Z) Passed the Milestone 2 local quality/lifecycle packet on unchanged candidate `024F1415C4ADA8AD56233C77500434D0218AE5CC188522FB2E70770027704B3D`: exact infrastructure, lint/type/build/Tailwind, root test, permission-qualified lifecycle recovery, documentation/ADR/relevance/diff checks, identity reconciliation, generated-artifact cleanup, and exact Compose teardown all passed.
- [x] (2026-08-22) Accepted the fresh integrated `PASS WITH FOLLOW-UPS` with zero Blocker, zero Major, and one documentation-only Minor; the verdict permits coordinator-owned documentation closure without product, test, dependency, or lint-config correction.
- [x] (2026-08-22) Resolved the documentation-only current-status/verification-guidance follow-up, synchronized every materially affected owner, passed the active-location documentation/ADR/diff gates, and marked TASK-013 `Complete` while keeping TASK-014 `Pending`.
- [x] (2026-08-22) Moved this completed plan to `docs/plans/completed/` through exact-path validation, repaired every inbound/internal link, and passed completed-location documentation/ADR/diff validation.
- [x] (2026-08-22) Resolved the post-commit independent review's two documentation-only Minors: the current-candidate fingerprint command now includes `eslint.config.mjs`, and README reports the merged TASK-012 history plus local TASK-013 commit and completed-location gate accurately.

## Surprises & Discoveries


- Observation: The existing automated portfolio already exceeds the adopted frontend minimum without a new component or test project. `CharacterCard`, `CharacterListControls`, the list route, and the detail route have meaningful unit/application coverage, including A-Z/Z-A sorting and detail loading, failure, retry, favorite, and comment interactions.
  Evidence: `apps/web/src/character-card.unit.test.tsx`, `apps/web/src/character-list-controls.unit.test.tsx`, `apps/web/src/character-list-route.application.test.tsx`, and `apps/web/src/character-detail-route.application.test.tsx`.

- Observation: The existing backend character-read boundary already satisfies the adopted search-unit shape with repository and cache doubles. Normalization, returned repository results, cache hits, misses, empty results, malformed values, and fail-open behavior are observable without a new service or abstraction.
  Evidence: `apps/api/src/application/characters/character-filter.unit.test.ts`, `apps/api/src/application/characters/character-search-cache.unit.test.ts`, `apps/api/src/application/characters/character-read-service.ts`, and `apps/api/src/application/characters/character-search-cache.ts`.

- Observation: The current harness already owns five non-browser Vitest projects plus one one-worker Chromium project, and the real PostgreSQL, Redis, GraphQL, migration, import, and browser boundaries already have task-owned tests. A coverage framework, numeric threshold, second browser suite, executable Gherkin layer, or new fixture lifecycle would duplicate accepted ADR-0018 ownership.
  Evidence: `vitest.config.ts`, `playwright.config.ts`, `scripts/run-smoke.ts`, `scripts/verify-smoke-lifecycle.ts`, and the 52 tracked `*.unit.test.*`, `*.application.test.*`, `*.integration.test.*`, and `*.smoke.test.*` files.

- Observation: The only known missing expected automation is lint. The root has `typecheck`, build/GraphQL drift, Tailwind, unit, integration, application, smoke, and smoke-lifecycle commands, but no `lint` script, ESLint configuration, ESLint dependency, lockfile entry, or CI lint step. TypeScript alone does not enforce ADR-0002's explicit rejection of `var` and floating promises.
  Evidence: `package.json`, `package-lock.json`, `.github/workflows/ci.yml`, `npm ls eslint typescript-eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --depth=0`, and the repository-wide lint-reference search.

- Observation: The planning scan found no skipped, focused, or pending-test markers; `var`; TypeScript suppression directive; production `NODE_ENV === "test"` branch; or tracked snapshot. The four named support artifacts have explicit current consumers. These are planning observations only and must be repeated against the activated candidate before closure.
  Evidence: `vitest.config.ts` has `allowOnly: false`, `playwright.config.ts` has `forbidOnly: true`, and reference searches link `apps/api/src/infrastructure/database/migration-artifact-sandbox.test.ts`, `apps/web/src/test/setup.ts`, `tests/smoke/fixtures/never-ready-api.ts`, and `tests/smoke/fixtures/task-010-runtime.ts` to active tests/configuration/orchestrators.

- Observation: Handwritten production comments are already sparse and explain non-obvious cleanup or failure-precedence constraints; generated GraphQL comments are generator-owned. TASK-013 needs a relevance review, not a comment-count target or comment rewrite campaign.
  Evidence: comment inventory under `apps/web/src`, `apps/api/src`, and `scripts`.

- Observation: Typed project-service coverage required mapping the repository's existing explicit tools/test file set through `tsconfig.tools.json`; no new TypeScript project or ignored source subtree was needed. Once coverage was complete, lint found exactly two existing Promise-callback mismatches.
  Evidence: calculated configuration returned severity `2` for all three rules across API, web, tooling, and smoke representatives; the frozen lint findings were `apps/web/server.ts:51:29` and `apps/web/src/character-detail-route.tsx:310:59`.

- Observation: The guard rejects tracked directory names such as `apps` when the directory endpoint itself is treated as ignored, even though unleased file changes remain observable from the repository baseline. The first proposed setup lease therefore failed before creation and its ID was not reused; the replacement lease used the same four allowed files plus exact forbidden files and relied on unleased-path detection for every other path.
  Evidence: rejected start `TASK-013-M1-SETUP-01-LEASE-01` returned `Lease scope 'apps' is ignored by Git and cannot be verified`; replacement lease `TASK-013-M1-SETUP-01-LEASE-02` started and closed compliant.

- Observation: The default Compose host port `5432` was unavailable after Redis had started, so that first environment attempt did not establish the required PostgreSQL boundary. The exact `rick-and-morty-dev` project was immediately torn down with volumes, then the unchanged project passed on host ports `55432` and `56400` without a repository configuration change.
  Evidence: the first `infra:up` failed only at the PostgreSQL bind; both exact `infra:down` operations removed the named containers, volumes, and network; the replacement `infra:config`, `infra:up`, and `infra:ps` reported healthy PostgreSQL 18.6 and Redis 8.8.1 services at `127.0.0.1:55432` and `127.0.0.1:56400`.

- Observation: The first seven-case lifecycle command was invalidated only because the restricted shell could not terminate the two exact task-owned fixture PIDs during forced cancellation/interruption. Both PIDs and listeners were absent after that attempt, and the single permission-qualified replacement passed the complete unchanged lifecycle scope.
  Evidence: the restricted attempt passed five cases and reported `Access denied` only for PIDs `17540` and `49912`; the replacement `npm run test:smoke:lifecycle` passed 7/7 and emitted exact cleanup for every run identity.

- Observation: The successful Chromium run left one ignored Playwright trace directory created during this closure run. It was task-owned disposable test output, not candidate evidence, and was removed through its exact resolved path before review.
  Evidence: `.artifacts/playwright/.playwright-artifacts-0` contained only closure-time trace resources; exact-path removal succeeded and `git status --ignored --short .artifacts` is empty.

- Observation: The completed plan's first fingerprint reproduction command preserved the 137-path planning projection but did not identify itself as historical and omitted the new `eslint.config.mjs`, so it could not reproduce the documented 138-path implementation candidate from the committed tree.
  Evidence: the incomplete command returns 137 paths at `ED5628BCCF44B118E23A09BB2053163217931FCF6251D9EEB141E1678D45B5F9`; the corrected command below includes `eslint.config.mjs` and returns 138 paths at exact candidate `024F1415C4ADA8AD56233C77500434D0218AE5CC188522FB2E70770027704B3D`.

## Decision Log


- Decision: Use one standard implementation milestone and one standard closure milestone.
  Rationale: TASK-013 has one known setup gap and one portfolio audit/closure outcome. Splitting lint configuration, each lint finding, frontend evidence, backend evidence, and relevance inspection into separate milestones would create coordination overhead without independent user value.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Reuse every existing product module, Vitest project, Playwright project, fixture, lifecycle owner, and task-owned test unless activation preflight proves a concrete gap.
  Rationale: Current evidence already covers the adopted frontend minimum, backend search unit contract, real infrastructure, and browser behavior. No new production component, function, hook, service, repository, abstraction, test project, fixture process, snapshot system, coverage service, or Storybook activation has a present TASK-013 need.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Add one narrow root ESLint flat-config boundary using exact-pinned compatible `eslint` and `typescript-eslint` development dependencies, and no other lint/formatting package.
  Rationale: No repository-owned linter exists, while TASK-013 explicitly expects lint automation and ADR-0002 requires static rejection of `var` and floating promises. The `typescript-eslint` entrypoint already supplies the parser and plugin, so separate parser/plugin packages, `@eslint/js`, Prettier, React-specific plugins, import plugins, and a custom linter are unnecessary for this contract.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Configure only `no-var`, `@typescript-eslint/no-floating-promises`, and `@typescript-eslint/no-misused-promises` as error-level rules over tracked TypeScript/TSX source and tests, with typed project-service analysis and explicit generated/build/cache ignores.
  Rationale: These rules implement the accepted ADR-0002 static contract without importing a broad style preset that could force unrelated rewrites. NFR-004 structure, identifiers, comments, ownership, and residual scaffolding remain semantic review responsibilities.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Treat lint setup and behavior-preserving lint cleanup as repository-quality work, not an artificial production Red-Green cycle.
  Rationale: Adding a validator does not create product behavior. The persistent test owner still performs binding preflight. If any proposed lint correction changes observable behavior, dependent work stops and that behavior must be routed through a separate ADR-0016-compliant test-first slice.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Do not add tests merely to increase counts or restate already-covered behavior.
  Rationale: ADR-0016 requires `EXISTING_AND_COVERED` evidence to be reused and prohibits artificial Reds. `EXISTING_BUT_UNCOVERED` may add only passing characterization, while `CONFLICTING` or `UNKNOWN` stops dependent work.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Pin `eslint` 10.9.0 and `typescript-eslint` 8.67.0 for the authorized two-package lint boundary.
  Rationale: Authoritative npm registry metadata reports ESLint 10.9.0 supports Node `^20.19.0 || ^22.13.0 || >=24`, while typescript-eslint 8.67.0 supports Node `^18.18.0 || ^20.9.0 || >=21.1.0`, ESLint `^8.57.0 || ^9.0.0 || ^10.0.0`, and TypeScript `>=4.8.4 <6.1.0`. The repository's Node 24.18.0 and TypeScript 6.0.3 satisfy those ranges, so the exact two-package boundary is compatible without adapters or baseline relaxation.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Accept two exact-path behavior-preserving lint corrections without a Red.
  Rationale: Persistent test-worker follow-up `TASK-013-M1-CORRECTION-PREFLIGHT-01` classified both findings `EXISTING_AND_COVERED`. The Node server correction moves the unchanged async request body behind a synchronous callback that explicitly discards the same promise, while the React form wrapper immediately invokes the unchanged async submit handler and preserves synchronous `preventDefault()`. Existing smoke and detail-application tests own the observable contracts; no error handling or other behavior was added.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Use environment-only host ports `55432` and `56400` for the one replacement infrastructure attempt, and replace only the lifecycle scope invalidated by restricted process-control permissions.
  Rationale: The default-port failure did not exercise PostgreSQL, while the restricted lifecycle failure did not test the two termination cases. The same Compose project, images, internal ports, candidate bytes, commands, fixtures, and seven-case contract remained unchanged. Repeating `npm test` would duplicate already-valid evidence and violate the closure packet's reuse rule.
  Date/Author: 2026-08-22 / primary coordinator.

This task is not consequential architecture decision work, so a Decision Review Contract is not applicable. DPL-DEC-053 records only reversible execution choices inside accepted architecture.

## Outcomes & Retrospective


TASK-013 achieved the planned typed lint boundary and portfolio audit without a test change or new product behavior. Exact-pinned ESLint tooling, calculated typed-rule activation, CI ordering, affected and full joins, semantic relevance, lifecycle recovery, and exact cleanup pass on candidate `024F1415...4B3D`; the S1 reviewer returned `PASS` with no finding and the fresh integrated reviewer returned closure-permitting `PASS WITH FOLLOW-UPS`. Two pre-existing Promise-callback lint findings required exact-path behavior-preserving wrappers after persistent test-worker `EXISTING_AND_COVERED` classification. The original documentation Minor and both post-commit documentation Minors are resolved, both documentation gates pass, TASK-013 is `Complete`, TASK-014 remains `Pending`, and the plan is archived with no remaining TASK-013 work.

## Purpose / Big Picture


The completed evidence lets a reviewer verify that the application remains strict TypeScript, preserves the accepted web/API/application/persistence/cache boundaries, uses relevant comments, and has a risk-focused test portfolio with no skipped/focused shortcuts or abandoned scaffolding.

The task adds no product behavior. Its only automation addition is a narrowly scoped typed lint boundary for the explicit ADR-0002 rules that the TypeScript compiler does not enforce. Existing frontend, backend-search, real-infrastructure, application, and browser tests are reused as portfolio evidence. The only source edits are the two accepted behavior-preserving Promise wrappers.

TASK-013 completion advances the repository-baseline portfolio sequence but does not complete AC-012 or the minimum-assessment delivery view. TASK-014 still owns clean public-clone delivery, the ERD, and complete run/API documentation; TASK-015 still owns final acceptance.

## Context and Orientation


TASK-013 owns mandatory [NFR-004](../../REQUIREMENTS.md#nfr-004---code-quality) and portfolio closure for adopted optional [OR-001](../../REQUIREMENTS.md#or-001---typescript), [OR-004](../../REQUIREMENTS.md#or-004---frontend-tests), [OR-007](../../REQUIREMENTS.md#or-007---backend-tests), and [OR-008](../../REQUIREMENTS.md#or-008---design-patterns). Their source classifications do not change.

The governing decisions are [ADR-0002](../../adrs/0002-use-typescript-across-the-stack.md), [ADR-0006](../../adrs/0006-define-a-use-case-oriented-graphql-contract.md), [ADR-0007](../../adrs/0007-use-cache-aside-for-character-searches.md), [ADR-0014](../../adrs/0014-persist-and-deliver-character-image-urls-directly.md), and [ADR-0016](../../adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md). Accepted [ADR-0018](../../adrs/0018-define-the-typescript-test-harness-with-repository-owned-smoke-orchestration.md) owns the current executable harness and is therefore binding even though the TASK-013 entry does not repeat it.

The routed closure rules are [HS-006, HS-007, HS-017, and HS-019](../../specs/HARD_SPEC.feature). TASK-007, TASK-012, and TASK-013 are `Complete`, all current implementation decision gates in their dependency paths are resolved, AUTH-001 remains `Authorized`, and TASK-014 remains `Pending`.

The root `package.json` is the command owner. `vitest.config.ts` owns five named non-browser projects; `playwright.config.ts` owns one Chromium project; `scripts/run-smoke.ts` and `scripts/verify-smoke-lifecycle.ts` own browser orchestration and recovery; `.github/workflows/ci.yml` owns hosted command sequencing. Do not create parallel owners.

## Scope and Non-Goals


### Accepted reuse audit


Planning reuse audit `TASK-013-REUSE-20260822-01` covers the 137-path projection recorded under `Artifacts and Notes`.

| Element or responsibility | Disposition | Exact owner and bounded TASK-013 action |
|---|---|---|
| Root type/build/test commands | `EXTEND` | Keep `package.json` as sole root command owner; add only `lint` and leave existing commands/ordering intact. |
| Continuous integration | `EXTEND` | Add one `npm run lint` step to `.github/workflows/ci.yml`; do not add a workflow, provider, matrix, service, or coverage upload. |
| Lint configuration | `CREATE` | Add one root `eslint.config.mjs` because no current lint owner exists. Limit it to TS/TSX typed analysis and the three recorded error rules. |
| Lint dependencies | `CREATE_MINIMUM` | Add exact-pinned compatible `eslint` and `typescript-eslint` root dev dependencies and lockfile entries only. TypeScript is already present. |
| TypeScript/compiler configuration | `REUSE_AS_IS` | Reuse `tsconfig.base.json`, `tsconfig.tools.json`, and workspace configs. Do not add `tsconfig.eslint.json` unless execution proves project service cannot cover a tracked TS/TSX path; that result is a stop-and-reconcile condition, not pre-authorized scope. |
| Frontend product components/layouts | `REUSE_AS_IS` | Reuse current components and routes; no rendered UI or CSS change is planned. |
| Frontend tests | `REUSE_AS_IS` | Reuse card, controls, list-route, detail-route, shell, data, and app tests in the existing web-unit/web-application projects. Add characterization only for a binding `EXISTING_BUT_UNCOVERED` result. |
| Backend search/service | `REUSE_AS_IS` | Reuse `createCharacterReadService`, `character-filter.unit.test.ts`, and `character-search-cache.unit.test.ts`; do not extract a search-query abstraction. |
| GraphQL, PostgreSQL, Redis, migration, and import tests | `REUSE_AS_IS` | Reuse current API application/integration projects and exact run-scoped lifecycle; do not add containers, embedded services, fixtures, or a new integration project. |
| Chromium smoke and lifecycle verifier | `REUSE_AS_IS` | Reuse the single current smoke, fixture, orchestrator, and seven-case lifecycle boundary unchanged unless a concrete TASK-013 regression is proven. |
| Test support and generated artifacts | `AUDIT_IN_PLACE` | Confirm every fixture/mock/helper/sandbox/setup/generated file has a current consumer; remove or revise only a proven residual artifact, preserving generator ownership. |
| Module boundaries and comments | `AUDIT_IN_PLACE` | Inspect current imports, responsibilities, identifiers, and comments; do not introduce a generic module-boundary framework, dependency-cruiser, shared utility, or comment quota. |

There is no planned new component, production function, test project, fixture process, abstraction, product dependency, service, schema, migration, route, GraphQL operation, Redis key, CSS rule, screenshot baseline, coverage threshold, or runtime feature.

### In scope


- One root lint command and one CI step.
- One root flat configuration with the three explicit error-level rules.
- Two exact-pinned development dependencies after compatibility verification.
- Behavior-preserving correction of only concrete lint findings, using exact path leases chosen after the findings exist.
- A complete test-relevance audit covering tests, fixtures, mocks, helpers, sandboxes, setup files, snapshots, skipped/focused/pending-test markers, and production test branches.
- Semantic inspection of strict TypeScript, generated GraphQL drift, module direction, ownership, identifiers, comments, and residual scaffolding.
- Affected validation, full local authoritative validation, exact infrastructure cleanup, S1 milestone review, fresh integrated independent review, and documentation closure.

### Out of scope


- Product behavior, UI, style, API, database, cache, import, migration, image, authentication, deployment, or delivery-documentation changes.
- A broad style preset, autoformatter, automatic `--fix`, React/import/security lint plugin, custom ESLint rule, dependency-boundary framework, unused-dependency product, code-coverage product, numeric threshold, mutation testing, Storybook, executable Gherkin, or a second browser/test suite.
- Test rewrites or deletions whose only purpose is making lint/tests pass or lowering counts.
- Refactoring merely to create layers, shared helpers, or hypothetical reuse.
- TASK-014 clean-clone/public-delivery/ERD work and TASK-015 final acceptance.
- Commit, push, pull request, publication, or deployment without separate user authorization.

## Plan of Work


### Activation barrier


1. Obtain explicit project-owner execution authorization for this exact plan.
2. Confirm TASK-007 and TASK-012 remain `Complete`, TASK-013 remains `Pending`, and no applicable gate or AUTH-001 trigger reopened.
3. Require a clean or explicitly reconciled worktree. Preserve unrelated user changes; do not absorb them into the candidate.
4. Recompute the 137-path baseline and compare it with `3EF957D74D8686081DADE51FAA3D406A0D376EF89432CFD41DE9E168C2200EC2`. Any implementation/test/configuration drift requires a refreshed reuse audit before activation.
5. Query authoritative package metadata for stable `eslint` and `typescript-eslint` versions, verify their mutual peer ranges plus Node 24.18.0 and TypeScript 6.0.3 compatibility, then record the exact selected versions in this Decision Log before any install. A compatibility conflict stops activation; do not add an adapter or relax the repository runtime/compiler baseline.
6. The primary coordinator updates TASK-013 to `In progress`, records the authorized workflow in the execution log, validates documentation, and only then opens the first sequential write lease.

### Milestone 1: Typed lint boundary and portfolio-quality audit


Risk tier: `S1`, standard profile. The change is reversible development tooling plus semantic audit; it does not alter rendered UI or a critical data/concurrency/security boundary. Use `test_worker` for one binding read-only preflight, `code_worker` for configuration and any behavior-preserving correction, and `milestone_reviewer` for the join. Do not use the frontend-visual profile.

The preflight must refresh these planning classifications:

| Intended contract | Planning classification | Binding activation action |
|---|---|---|
| Strict no-emit TypeScript and production build/GraphQL drift | `EXISTING_AND_COVERED` | Reuse root `typecheck`, workspace builds, and current generated-output checks. |
| At least three meaningful frontend component/layout owners | `EXISTING_AND_COVERED` | Reuse card, controls, list-route, and detail-route tests; add no count-only test. |
| Backend character-search query/service unit coverage | `EXISTING_AND_COVERED` | Reuse filter and cache-aside service tests with repository/cache doubles. |
| Real PostgreSQL/Redis/GraphQL/import/migration/browser boundaries | `EXISTING_AND_COVERED` | Reuse existing integration/application/smoke projects and lifecycle. |
| Root lint automation enforcing ADR-0002 static rules | `MISSING` | This is a declarative/tooling gap, not a production-behavior Red. Add only the accepted lint boundary. |
| Current module/comment/scaffolding/test relevance | `UNKNOWN` | Stop dependent writes until the read-only audit supplies sufficient evidence; do not manufacture tests for review judgments. |

The worker must use ADR-0016's exact seven classifications for any observable behavior encountered. `CONFLICTING` or `UNKNOWN` stops dependent writes until reconciliation or bounded investigation resolves it.

Implementation sequence:

1. Open one setup lease limited to `package.json`, `package-lock.json`, `.github/workflows/ci.yml`, and new `eslint.config.mjs`.
2. Install only the recorded exact `eslint` and `typescript-eslint` versions as root dev dependencies.
3. Add `npm run lint` as `eslint . --max-warnings 0`.
4. Configure flat TS/TSX typed linting with `projectService: true`, repository-root resolution, deterministic ignores for dependency/build/cache/artifact output, and exactly `no-var`, `@typescript-eslint/no-floating-promises`, and `@typescript-eslint/no-misused-promises` at error level.
5. Add one CI `npm run lint` step immediately after strict typecheck and before build. Keep the one workflow and all existing service/test/lifecycle steps.
6. Prove through ESLint's calculated configuration API that the three rules are active for representative API TS, web TSX, tool TS, and test TS files, then run `npm run lint` without `--fix` or cache.
7. If lint passes, make no source/test correction. If it finds a concrete violation, the primary freezes the finding set and opens an exact-path behavior-preserving correction lease. Do not pre-authorize a repository-wide source lease. If a fix can change an observable outcome, stop and route that outcome through its own test-first slice before editing production code.
8. Complete the semantic relevance audit. Record a consumer and current requirement/ADR/contract/regression mapping for every affected test-support artifact; record why each handwritten comment is useful or remove only an obsolete comment; inspect web-to-server, resolver-to-infrastructure, application-to-adapter, and shared-package directions; inspect all skipped/focused/pending-test markers and production test branches.
9. Run the affected join once: `npm run lint`, `npm run typecheck`, `npm run build`, `npm run validate:tailwind`, and `npm run test:unit`. Repeat only if a later accepted correction invalidates it.
10. Freeze the candidate path aggregate and obtain one fresh S1 milestone review. One bounded correction loop is allowed; a repeated failure, broad rule-driven rewrite, new dependency need, or architectural conflict stops for owner/coordinator reconciliation.

### Milestone 2: Full validation, independent acceptance, and closure


Risk tier: `S1`, standard closure profile. The primary coordinator owns evidence reconciliation, authoritative status, documentation, and closure.

1. Confirm the Milestone 1 candidate and relevance matrix are unchanged. If any product/test/configuration path drifted, invalidate affected evidence and rerun only the relevant preflight/join.
2. Validate infrastructure configuration, start the existing local PostgreSQL/Redis stack, and record service identities/health.
3. Run the complete root test boundary once through `npm test`, then run the separate seven-case `npm run test:smoke:lifecycle` recovery boundary. Do not rerun constituent unit/integration/application/smoke scopes merely to duplicate the aggregate; extract their counts from the root log.
4. Run the remaining closure checks: lint, typecheck, build/GraphQL drift, Tailwind validation, documentation validation, ADR validation, test-relevance and dependency-direction scans, candidate fingerprint, and `git diff --check`.
5. Reconcile the smoke/lifecycle READY and CLEANUP identities; confirm no task-owned PostgreSQL schema, Redis namespace, web/API listener, Playwright artifact outside ignored output, or public Rick and Morty request remains.
6. Obtain one fresh integrated `independent_reviewer` verdict against NFR-004, OR-001/004/007/008, ADR-0002/0006/0007/0014/0016/0018, and HS-006/007/017/019. A Blocker or Major withholds closure. Resolve documentation-only Minors before the documentation gate; any product/tooling correction invalidates the affected evidence and returns to the bounded milestone loop.
7. Update verification guidance and current status only from accepted evidence. Synchronize this plan, `docs/IMPLEMENTATION_PLAN.md`, `docs/plans/README.md`, `docs/specs/README.md`, the ADR index's implementation annotations when materially affected, the execution log, README current status/quality commands, and review navigation.
8. Pass the task-closure documentation gate. Only then mark TASK-013 `Complete`, preserve TASK-014 as `Pending`, and move this plan to `docs/plans/completed/` with all inbound links repaired and revalidated.

## Concrete Steps


Commands below were executed from the repository root in PowerShell as recorded under `Artifacts and Notes`; environment-qualified replacements and invalidated evidence are preserved there rather than hidden.

Activation/readback:

    git status --short --branch
    git rev-parse HEAD
    rg -n "^\| TASK-(007|012|013|014)" docs/IMPLEMENTATION_PLAN.md
    npm view eslint version engines --json
    npm view typescript-eslint version engines peerDependencies --json

Dependency/configuration setup after the exact compatible versions are recorded:

    npm install --save-dev --save-exact eslint@<recorded-version> typescript-eslint@<recorded-version>
    npm run lint

Calculated-rule readback uses ESLint's API rather than a persistent probe file:

    node -e "const { ESLint } = await import('eslint'); const eslint = new ESLint(); for (const file of ['apps/api/src/server.ts','apps/web/src/app.tsx','scripts/run-smoke.ts','tests/smoke/walking-skeleton.smoke.test.ts']) { const config = await eslint.calculateConfigForFile(file); console.log(file, config.rules['no-var'], config.rules['@typescript-eslint/no-floating-promises'], config.rules['@typescript-eslint/no-misused-promises']); }"

Relevance and boundary scans:

    rg -n --glob '*.ts' --glob '*.tsx' "\b(var\s+|describe\.only|it\.only|test\.only|describe\.skip|it\.skip|test\.skip|@ts-ignore|@ts-nocheck)" apps packages scripts tests
    rg -n --glob '*.ts' --glob '*.tsx' "\.(to){1}(do)\(" apps packages scripts tests
    rg -n --glob '*.ts' --glob '*.tsx' "NODE_ENV\s*===?\s*['\"]test['\"]|process\.env\.NODE_ENV" apps packages scripts tests
    git ls-files | rg "(^|/)(__snapshots__|.*\.snap$)|(?i)(fixture|mock|helper|sandbox|setup|stub)"
    rg -n "^import .* from .*sequelize|^import .* from .*@redis/client|^import .* from .*['\"]pg['\"]|^import .* from .*apps/api|^import .* from .*infrastructure" apps/web/src packages/shared apps/api/src/transport
    rg -n "^\s*//|/\*|\*/" apps/web/src apps/api/src scripts --glob '!generated/*'

Milestone 1 affected join:

    npm run lint
    npm run typecheck
    npm run build
    npm run validate:tailwind
    npm run test:unit

Milestone 2 local closure packet:

    npm run infra:config
    npm run infra:up
    npm run infra:ps
    npm run lint
    npm run typecheck
    npm run build
    npm run validate:tailwind
    npm test
    npm run test:smoke:lifecycle
    python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
    git diff --check
    npm run infra:down

`npm run infra:down` is a cleanup action for the task-owned local Compose project and must run after success or failure. Do not use broad database deletion, Redis `FLUSHDB`, process-name killing, or unscoped port cleanup.

## Validation and Acceptance


TASK-013 may close only when all of the following are true:

| Contract | Required reproducible evidence |
|---|---|
| HS-006 / OR-001 | Every tracked application/test source remains TS/TSX; root strict no-emit typecheck passes; build and both GraphQL drift checks pass; calculated lint configuration activates `no-var` and the two Promise rules; root lint passes with zero warning allowance. |
| HS-007 / OR-008 | Static import/readback and semantic review confirm browser/server/shared separation, thin resolvers, application-service coordination, persistence/Redis adapter ownership, and one API deployable process; no new cross-process boundary or generic abstraction exists. |
| HS-017 / OR-004 | Existing web-unit/web-application evidence covers at least three distinct components/layouts and specifically card rendering, A-Z/Z-A sorting, detail loading/error/retry, and favorite/comment interactions. No count-only test is added. |
| HS-017 / OR-007 | Existing API unit evidence proves normalized search input, repository and cache doubles, cache hit/miss/empty behavior, and returned results. |
| HS-017 real boundaries | Root test evidence covers PostgreSQL filters, migrations/import, Redis hit/miss/empty/TTL/serialization/invalidation/wiring, application composition, Chromium behavior, isolation, and no live public API request. Lifecycle passes all seven registered cases. |
| HS-017 relevance | No skipped/focused/pending test, weakened assertion, test-only production branch, abandoned snapshot, or unconsumed fixture/mock/helper/sandbox/setup artifact remains. Every retained support artifact has an explicit current consumer and traceable purpose. |
| HS-019 / NFR-004 | Independent semantic review accepts coherent responsibilities, intention-revealing identifiers, clear ownership, relevant non-obvious comments, and absence of obsolete or residual generated/test scaffolding. |
| Automation | `npm run lint` is an explicit root command, is exact-lock reproducible, and runs in the existing CI workflow before build/test. No second workflow or test/lint owner exists. |
| Scope | No product interface, dependency, runtime behavior, schema, migration, route, GraphQL operation, Redis contract, UI, test project, or architecture decision changed without a separately proven need. |
| Closure | Affected and full commands pass on one frozen candidate; external state is clean; the S1 milestone review and final integrated independent review are closure-permitting; documentation validation, ADR validation, and `git diff --check` pass. |

The task does not require a numeric code-coverage threshold. Test count alone is not acceptance evidence. A repeated complete suite must record the exact risk, drift, failed prerequisite, or evidence invalidation that required repetition.

## Idempotence and Recovery


- Exact dependency installation and lockfile generation are repeatable. Never hand-edit `package-lock.json`; if package metadata or the lockfile conflicts with the recorded versions, stop and reconcile before another install.
- `npm run lint`, typecheck, build, Tailwind validation, and non-watch tests are deterministic single runs. Do not enable ESLint cache or automatic `--fix` in authoritative evidence.
- A lint configuration failure is not a product finding. Correct the configuration only inside its lease; do not suppress a rule, ignore a source subtree, or rewrite product code merely to make the command green.
- If lint reports existing code, freeze the exact findings before correction. Use one exact-path lease and preserve observable behavior. Any behavior uncertainty routes to test-worker classification and can stop the milestone.
- Existing integration/smoke data lifecycle remains authoritative and idempotent. Cleanup must target only the exact run schema and Redis namespace, preserve the primary failure, and report cleanup failure separately.
- If the local Docker daemon is unavailable, record the environmental failure and stop; do not substitute mocks for real-boundary closure evidence.
- If a test or generated artifact appears unused, find all references and its governing task/ADR before removal. Preserve historical evidence and generated ownership; do not delete by filename convention alone.
- If the candidate drifts after milestone review, recompute the aggregate and rerun only invalidated checks. Product/test drift after the integrated review requires a fresh integrated review.
- Do not move this plan while TASK-013 is `Pending` or `In progress`. On closure, resolve the exact active/completed paths, verify the destination is absent, move only this file, repair links, and validate again.
- Never use broad destructive commands, `git reset --hard`, `git checkout --`, Redis `FLUSHDB`, unscoped schema deletion, or process-name termination.

## Artifacts and Notes


Activated Milestone 1 evidence:

- Binding preflight `TASK-013-M1-PREFLIGHT-01`: strict TypeScript/build, frontend owners, backend character search, real boundaries, and semantic relevance are `EXISTING_AND_COVERED`; root lint is `MISSING` declarative setup; no `CONFLICTING` or unresolved `UNKNOWN` remains.
- Guard self-test: 26/26 checks passed before the first valid write lease.
- Setup assignment `TASK-013-M1-SETUP-01`, lease `TASK-013-M1-SETUP-01-LEASE-02`, contract digest `4085eab6...7b2e`, compliant receipt `d35741c...81c5`: changed only `package.json`, `package-lock.json`, `.github/workflows/ci.yml`, and new `eslint.config.mjs`.
- Calculated configuration: `no-var`, `@typescript-eslint/no-floating-promises`, and `@typescript-eslint/no-misused-promises` each resolved to severity `2` for representative API, web, tooling, and smoke-test files. The first lint with complete typed coverage froze exactly two source findings.
- Correction preflight `TASK-013-M1-CORRECTION-PREFLIGHT-01`: both exact findings are `EXISTING_AND_COVERED`; no Red or test write applies.
- Attempt-2 correction assignment `TASK-013-M1-SETUP-02`, lease `TASK-013-M1-SETUP-02-LEASE-01`, contract digest `0717db3d...ce2a`, compliant receipt `2e0b1f1d...5d40`: changed only `apps/web/server.ts` and `apps/web/src/character-detail-route.tsx`. Lint passed; web application passed 24/24; web build and GraphQL drift passed; no test changed.
- Affected join on the same candidate: `npm run lint`, `npm run typecheck`, `npm run build`, `npm run validate:tailwind`, and `npm run test:unit` all passed; unit evidence is 32 files and 182/182 tests. Both GraphQL drift checks passed inside the root build.
- Current 138-path implementation/test/configuration/lint candidate aggregate: `024F1415C4ADA8AD56233C77500434D0218AE5CC188522FB2E70770027704B3D`; Milestone 1 is accepted on these exact bytes.
- Fresh S1 review `TASK-013-M1-REVIEW-01`: `PASS`, zero Blocker, Major, or Minor; reviewer recomputed the exact aggregate, reran calculated-rule readback and lint, inspected both compliant receipts and the actual diff, and accepted the relevance matrix and reused affected-join evidence. Milestone 1 is accepted.

Milestone 2 closure evidence accepted for integrated review:

- Candidate and relevance readback: the implementation/test/configuration/lint projection remains 138 paths at `024F1415C4ADA8AD56233C77500434D0218AE5CC188522FB2E70770027704B3D`; the relevance and dependency-direction scans reproduce the Milestone 1 matrix with no new finding.
- Infrastructure: `npm run infra:config` passed for exact project `rick-and-morty-dev`. The default-port startup failed to bind PostgreSQL `5432` after Redis started and was fully torn down. The one environment-only replacement passed `infra:config`, `infra:up`, and `infra:ps` with healthy `postgres:18.6-alpine` at `127.0.0.1:55432` and `redis:8.8.1-alpine` at `127.0.0.1:56400`.
- Static closure: `npm run lint`, `npm run typecheck`, `npm run build`, and `npm run validate:tailwind` passed. Both GraphQL generated-output drift checks passed inside the root build.
- Root aggregate: one `npm test` passed unit 182/182, integration 77/77, application 37/37, Chromium 1/1, and smoke run `11c042954b7b2d93`. READY and CLEANUP match schema `t010_smoke_11c042954b7b2d93` and namespace `character-app:test:t010-smoke-11c042954b7b2d93` on ports 55432/56400; browser diagnostics are `pageErrors=0`, three deliberate allowed GraphQL failures/503 responses, and `unexpectedConsoleErrors=0`. The deterministic local fixture made no public Rick and Morty request.
- Lifecycle recovery: the restricted-shell attempt was invalidated only for denied termination of exact fixture PIDs in the final two cases. The single permission-qualified replacement passed 7/7 with exact CLEANUP identities `799fea47388b6700`, `82e7c6562058e43e`, `1d43735e66a69a66`, `36cc797534f955a6`, `ea86c266789fe515`, `84d7fb113f91e443`, and `af13945d3baa983c`; each used schema `t010_smoke_<run-id>` and namespace `character-app:test:t010-smoke-<run-id>` on ports 55432/56400.
- Repository validation: documentation validation passed for 81 Markdown files, 41 requirements, one authorization, 18 tasks, 17 specifications, 20 hard-specification IDs, and 123 scenarios. ADR validation passed for 18 ADRs and 38 requirements with only the established NFR-006 warning. Relevance, dependency-direction, calculated-config, candidate, and `git diff --check` evidence pass.
- State and cleanup: pre-teardown SQL and Redis scans returned no task-owned schema or matching namespace and Redis `DBSIZE` was `0`; ports 4173/4174 had no listeners. The exact task-owned Playwright trace directory was removed and the ignored artifact scan is empty. Final `npm run infra:down` removed only `rick-and-morty-dev` containers, named volumes, and network; post-down project, volume, network, and 4173/4174/55432/56400 listener readbacks are empty.
- Fresh integrated review: `PASS WITH FOLLOW-UPS`, zero Blocker, zero Major, one documentation-only Minor. The reviewer independently reproduced the aggregate, calculated-rule coverage for all representatives and generated TypeScript, lint, dependency/lock/config/CI scope, lease receipts, relevance consumers, validators, and exact teardown. The only follow-up is to add `npm run lint` to README verification guidance and replace the stale TASK-013 current-status summary before completion; no candidate evidence is invalidated.

Candidate relevance matrix:

| Artifact or boundary | Current consumer and evidence | Traceability and disposition |
|---|---|---|
| 52 suite-owned tests plus one imported sandbox helper | Five named Vitest projects and one Playwright project own every suite path; `migration-artifact-sandbox.test.ts` is imported by six migration-artifact unit tests rather than registered as a duplicate suite | NFR-004, OR-004, OR-007, ADR-0016, ADR-0018, HS-017; retain all current owners and add no count-only test |
| `apps/web/src/test/setup.ts` | Registered by both `web-unit` and `web-application` in `vitest.config.ts` | OR-004, ADR-0018, HS-017; retain shared jsdom setup |
| `tests/smoke/fixtures/never-ready-api.ts` | Resolved and launched only by `scripts/run-smoke.ts` for the readiness-timeout lifecycle case | ADR-0018, HS-017; retain exact failure fixture |
| `tests/smoke/fixtures/task-010-runtime.ts` | Used by `scripts/run-smoke.ts` for exact fixture setup/cleanup and by `scripts/verify-smoke-lifecycle.ts` for forced-recovery cleanup | ADR-0018, HS-017; retain exact isolated lifecycle owner |
| `apps/web/src/data/generated/graphql.ts` | Generated by `apps/web/codegen.ts`; consumed by list/detail routes, query/executor code, and executor tests; checked by web `graphql:check` | OR-001, ADR-0006, ADR-0018, HS-006/HS-017; retain and continue linting generated TypeScript |
| `apps/api/src/transport/graphql/generated/resolver-types.ts` | Generated by API GraphQL codegen and consumed by `resolvers.ts`; checked by API `graphql:check` | OR-001, ADR-0006, ADR-0018, HS-006/HS-017; retain and continue linting generated TypeScript |
| Snapshots and skip/focus/pending markers | No tracked `.snap` file, snapshot matcher, focused/skipped/pending-test API, or disabled-suite alias exists; Vitest `allowOnly: false` and Playwright `forbidOnly: true` remain | ADR-0016, ADR-0018, HS-017; no residual artifact or disabled required scope |
| Production test branches and suppressions | No `NODE_ENV`/Vitest test-mode production branch, TypeScript suppression, `var`, or obsolete placeholder marker from the audited forbidden set exists | ADR-0002, ADR-0018, HS-006/HS-017/HS-019; no correction required |
| Handwritten comments | Sparse comments explain browser-route fallback, Redis close-after-failure tolerance, migration failure precedence, deliberate dynamic-import handling, or tool directives; generated GraphQL comments remain generator-owned | NFR-004, HS-019; retain rationale-bearing comments and do not impose a quota |
| Module direction | No web/shared production import reaches API or infrastructure; transport-to-infrastructure matches only three real GraphQL integration tests importing `pg` plus the migration artifact; production resolvers remain typed transport delegates | NFR-004, OR-008, ADR-0006, ADR-0007, HS-007/HS-019; retain current boundaries |
| `packages/shared` | Intentionally empty TypeScript structural workspace remains an explicit root typecheck target and has no dummy export | OR-001, OR-008, HS-006/HS-007; retain without scaffolding |

Planning baseline:

- Branch and commit: clean `main` at `7a3cab06257931424968d818cff7506c9b819a44`.
- Accepted product commit: `312d462318e5d1be5ddcab41a4d3f3788806908d`.
- `git diff --quiet 312d462318e5d1be5ddcab41a4d3f3788806908d..HEAD -- <implementation/test/configuration projection>` exited `0` before plan creation.
- Projection: 137 tracked paths: 115 under `apps/`, 2 under `packages/`, 5 under `scripts/`, 3 under `tests/`, 1 CI workflow, and 11 root environment/tooling/configuration files.
- Aggregate: `3EF957D74D8686081DADE51FAA3D406A0D376EF89432CFD41DE9E168C2200EC2`.
- Hash contract: sort paths ordinally; calculate uppercase SHA-256 over each file's materialized bytes; create lines `<path><TAB><hash>` joined with LF and no final LF; SHA-256 that UTF-8 manifest.
- Root projection files: `.env.example`, `.gitattributes`, `.gitignore`, `.node-version`, `compose.yaml`, `package.json`, `package-lock.json`, `playwright.config.ts`, `tsconfig.base.json`, `tsconfig.tools.json`, and `vitest.config.ts`, plus `.github/workflows/`, `apps/`, `packages/`, `scripts/`, and `tests/`.

Current 138-path candidate reproduction command. The 137-path planning projection above predates `eslint.config.mjs` and remains historical baseline evidence.

    $paths = @(git ls-files -- '.env.example' '.gitattributes' '.gitignore' '.node-version' '.github/workflows' 'compose.yaml' 'eslint.config.mjs' 'package.json' 'package-lock.json' 'playwright.config.ts' 'tsconfig.base.json' 'tsconfig.tools.json' 'vitest.config.ts' 'apps' 'packages' 'scripts' 'tests') | Sort-Object -Unique
    $entries = foreach ($path in $paths) { "$path`t$((Get-FileHash -Algorithm SHA256 -LiteralPath $path).Hash)" }
    $payload = [string]::Join("`n", $entries)
    [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($payload)))

The accepted TASK-012 review records the latest complete product evidence: unit 182/182, integration 77/77, application 37/37, Chromium 1/1, lifecycle 7/7, strict typecheck, build/GraphQL drift, Tailwind, documentation/ADR validation, diff checking, and exact cleanup. TASK-013 may use this only as planning/reuse evidence. Activation and closure must generate fresh evidence for the TASK-013 candidate because lint dependencies/configuration and CI will change the relevant tree.

Planning did not run or mutate product tests, infrastructure, browser state, generated output, dependency files, or application code. The only planned writes in this turn are this ExecPlan and its required documentation navigation/chronology.

## Interfaces and Dependencies


Product interfaces remain unchanged. TASK-013 must not change React properties/routes, GraphQL schema/operations, service/repository interfaces, Sequelize models/migrations, Redis keys/payloads, environment variables, CSP, HTTP behavior, or smoke fixture identity.

The one new repository interface is:

    npm run lint

It must run a single non-watch `eslint . --max-warnings 0` pass from the repository root and return nonzero for any configured error or warning. It must not write files, use a cache, auto-fix, download tooling at runtime, or replace `npm run typecheck`.

The flat configuration must:

- select tracked `*.ts` and `*.tsx` application, test, tool, and configuration paths;
- use `typescript-eslint` typed project-service analysis rooted at the repository;
- ignore `node_modules`, `.artifacts`, `.vite`, coverage/cache directories, and generated build outputs while continuing to lint checked-in GraphQL-generated TypeScript;
- enable only `no-var`, `@typescript-eslint/no-floating-promises`, and `@typescript-eslint/no-misused-promises` as errors for this task; and
- keep `--max-warnings 0` at the command boundary.

Dependency contract:

| Dependency | Need | Constraint |
|---|---|---|
| Existing `typescript` | Reuse | Keep 6.0.3 and every strict compiler boundary unchanged. |
| New `eslint` | Required | Root dev-only, exact-pinned stable version compatible with Node 24.18.0 and the selected `typescript-eslint`; no runtime/workspace duplication. |
| New `typescript-eslint` | Required | Root dev-only, exact-pinned stable version whose peer range supports the selected ESLint and TypeScript 6.0.3; use its bundled parser/plugin entrypoint. |

Do not add `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `@eslint/js`, Prettier, React/import/security plugins, or another linter unless the accepted two-package contract is proven infeasible and the project owner authorizes a revised plan.

## Revision Note


2026-08-22: Created the implementation-ready TASK-013 plan after an authority and reuse audit. The plan reuses the complete current product/test harness, identifies lint automation as the sole known setup gap, limits new tooling to two exact-pinned development dependencies plus one root config/command/CI step, requires finding-driven rather than speculative cleanup, and keeps TASK-013 `Pending` until separate execution authorization. No implementation was performed.

2026-08-22: Activated owner-authorized workflow `TASK-013-20260822-01`, pinned compatible ESLint versions from authoritative npm metadata, accepted the binding read-only preflight, added the guarded four-file typed lint boundary, and accepted two guarded exact-path behavior-preserving Promise-callback corrections after persistent test-worker classification. The affected join and fresh S1 review remain before Milestone 1 acceptance; no commit or external publication was authorized.

2026-08-22: Accepted Milestone 1 after the affected join and fresh S1 review passed with no finding on exact candidate `024F1415C4ADA8AD56233C77500434D0218AE5CC188522FB2E70770027704B3D`. Milestone 2 full validation, cleanup, integrated review, and documentation closure remain; no commit or external publication was authorized.

2026-08-22: Passed the Milestone 2 local closure packet on unchanged candidate `024F1415C4ADA8AD56233C77500434D0218AE5CC188522FB2E70770027704B3D`. The environment-only alternate-port infrastructure attempt, root aggregate, permission-qualified lifecycle replacement, static/documentation/ADR/relevance checks, exact identity reconciliation, generated Playwright artifact cleanup, and exact Compose teardown all pass. Fresh integrated review and coordinator-owned documentation closure remain; no commit or external publication was authorized.

2026-08-22: Accepted the fresh integrated `PASS WITH FOLLOW-UPS` with no Blocker or Major and one documentation-only currentness Minor. The candidate and all runtime evidence remain accepted; the primary added the missing root lint guidance, synchronized the authoritative task summary, and advanced only to the active-location documentation gate. No product, test, dependency, lint-config, commit, or external-publication change was authorized.

2026-08-22: Passed the coordinator-owned task-closure documentation gate in the active plan location, marked TASK-013 `Complete`, kept TASK-014 `Pending`, and synchronized root verification/current status, task and traceability owners, SPEC/HS routing, ADR implementation annotation, review/index navigation, plan/index state, and execution chronology. Documentation, ADR, and diff validation pass; archival and completed-location validation remain the final lifecycle operation. No requirement meaning, ADR, authorization, product/test candidate, commit, or external publication changed.

2026-08-22: Moved this completed ExecPlan through exact source/destination validation, repaired every internal and inbound link, and advanced to completed-location validation. The active path is absent and completed path is present. No task state, requirement, ADR, authorization, candidate byte, commit, or external publication changed.

2026-08-22: Passed completed-location documentation validation for 82 Markdown files and 123 scenarios, ADR validation for 18 ADRs and 38 requirements with only the established NFR-006 warning, and `git diff --check`. The active plan path is absent, completed path is present, all links resolve, and TASK-013 has no remaining work. No commit, push, pull request, publication, or deployment was authorized or performed.

2026-08-22: After local TASK-013 commit `a7819f85c3eb0318b1488ab47beababf31f5b09e`, a supplied independent review returned `PASS WITH FOLLOW-UPS` with zero Blocker, zero Major, and two documentation-only Minors. The primary corrected the incomplete 137-path fingerprint command to include `eslint.config.mjs` and reproduce exact 138-path candidate `024F1415...4B3D`, updated README to record TASK-012's merged PR #21 history plus TASK-013's local commit and completed-location validation, linked the resulting [documentation re-review](../../reviews/2026-08-22-task-013-documentation-re-review.md), and repeated documentation/ADR/diff validation. Product/test/configuration candidate bytes, TASK-013, TASK-014, and 11/12 readiness remain unchanged; the documentation correction is uncommitted and no push, pull request, publication, or deployment is claimed.
