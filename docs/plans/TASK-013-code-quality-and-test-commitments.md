# Close TASK-013 Code-Quality and Adopted Test Commitments


- Status: Implementation-ready; awaiting separate project-owner execution authorization
- Task: [TASK-013](../IMPLEMENTATION_PLAN.md#task-013---close-code-quality-and-adopted-test-commitments)
- Plan ID and prospective workflow ID: `TASK-013-20260822-01`
- Created: 2026-08-22
- Last updated: 2026-08-22
- Governing convention: [PLANS.md](../../PLANS.md)

This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.

This planning artifact does not authorize implementation. TASK-013 remains `Pending`; no worker lease, dependency installation, source change, test change, infrastructure start, commit, push, pull request, publication, or deployment may begin until the project owner separately authorizes execution and the primary coordinator records the transition to `In progress`.

## Progress


- [x] (2026-08-22) Read TASK-013, NFR-004, adopted OR-001/OR-004/OR-007/OR-008, ADR-0002/0006/0007/0014/0016/0018, HS-006/HS-007/HS-017/HS-019, the current harness, manifests, CI workflow, source ownership, test projects, and task-closure rules.
- [x] (2026-08-22) Completed planning reuse audit `TASK-013-REUSE-20260822-01` on clean `main` HEAD `7a3cab06257931424968d818cff7506c9b819a44`, using the 137-path implementation/test/configuration aggregate `3EF957D74D8686081DADE51FAA3D406A0D376EF89432CFD41DE9E168C2200EC2`.
- [x] (2026-08-22) Verified that the accepted TASK-012 product/test/configuration projection is unchanged from commit `312d462318e5d1be5ddcab41a4d3f3788806908d`, while the current root manifest, lockfile, CI workflow, and installed top-level graph contain no ESLint boundary.
- [x] (2026-08-22) Recorded the proportional reuse and lint-boundary choice in [DPL-DEC-053](../execution/decision-and-progress-log.md#decision-log).
- [x] (2026-08-22) Registered this implementation-ready plan while keeping TASK-013 `Pending`.
- [x] (2026-08-22) Passed planning documentation validation, task/index/link readback, and `git diff --check`; no ADR validation is required because this plan changes no architecture, optional disposition, or gate.
- [ ] Receive separate project-owner execution authorization, refresh the baseline and dependency compatibility evidence, and transition TASK-013 to `In progress` under `TASK-013-20260822-01`.
- [ ] Complete Milestone 1: establish the smallest lint boundary, resolve only proven lint findings, complete the portfolio relevance/ownership audit, pass the affected join, and accept one S1 milestone review.
- [ ] Complete Milestone 2: pass the full local authoritative quality/lifecycle packet, exact cleanup, fresh integrated review, and the task-closure documentation gate.
- [ ] Mark TASK-013 `Complete`, update dependent current-state owners, and move this plan to `docs/plans/completed/` only after the closure documentation gate passes.

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

This task is not consequential architecture decision work, so a Decision Review Contract is not applicable. DPL-DEC-053 records only reversible execution choices inside accepted architecture.

## Outcomes & Retrospective


No execution outcome exists yet. The implementation-ready target is a passing root `lint` command enforced in CI, a portfolio relevance/ownership audit with no unjustified residue, unchanged product contracts, passing affected and full quality boundaries, exact external cleanup, fresh independent acceptance, and synchronized task documentation. Replace this paragraph with measured outcomes, deviations, evidence identities, and remaining follow-ups at closure.

## Purpose / Big Picture


After separately authorized execution, a reviewer will be able to verify that the completed application remains strict TypeScript, preserves the accepted web/API/application/persistence/cache boundaries, uses relevant comments, and has a risk-focused test portfolio with no skipped/focused shortcuts or abandoned scaffolding.

The task does not add product behavior. Its only known automation addition is a narrowly scoped typed lint boundary for the explicit ADR-0002 rules that the TypeScript compiler does not enforce. Existing frontend, backend-search, real-infrastructure, application, and browser tests are reused as portfolio evidence. Any source or test edit must be justified by a concrete audit finding and stay inside its existing owner.

TASK-013 completion advances the repository-baseline portfolio sequence but does not complete AC-012 or the minimum-assessment delivery view. TASK-014 still owns clean public-clone delivery, the ERD, and complete run/API documentation; TASK-015 still owns final acceptance.

## Context and Orientation


TASK-013 owns mandatory [NFR-004](../REQUIREMENTS.md#nfr-004---code-quality) and portfolio closure for adopted optional [OR-001](../REQUIREMENTS.md#or-001---typescript), [OR-004](../REQUIREMENTS.md#or-004---frontend-tests), [OR-007](../REQUIREMENTS.md#or-007---backend-tests), and [OR-008](../REQUIREMENTS.md#or-008---design-patterns). Their source classifications do not change.

The governing decisions are [ADR-0002](../adrs/0002-use-typescript-across-the-stack.md), [ADR-0006](../adrs/0006-define-a-use-case-oriented-graphql-contract.md), [ADR-0007](../adrs/0007-use-cache-aside-for-character-searches.md), [ADR-0014](../adrs/0014-persist-and-deliver-character-image-urls-directly.md), and [ADR-0016](../adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md). Accepted [ADR-0018](../adrs/0018-define-the-typescript-test-harness-with-repository-owned-smoke-orchestration.md) owns the current executable harness and is therefore binding even though the TASK-013 entry does not repeat it.

The routed closure rules are [HS-006, HS-007, HS-017, and HS-019](../specs/HARD_SPEC.feature). TASK-007 and TASK-012 are `Complete`, all current implementation decision gates in their dependency paths are resolved, and TASK-013 is `Pending` only because execution has not been authorized or performed.

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


Run from the repository root in PowerShell. Commands below are planned, not executed by this planning turn.

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


Planning baseline:

- Branch and commit: clean `main` at `7a3cab06257931424968d818cff7506c9b819a44`.
- Accepted product commit: `312d462318e5d1be5ddcab41a4d3f3788806908d`.
- `git diff --quiet 312d462318e5d1be5ddcab41a4d3f3788806908d..HEAD -- <implementation/test/configuration projection>` exited `0` before plan creation.
- Projection: 137 tracked paths: 115 under `apps/`, 2 under `packages/`, 5 under `scripts/`, 3 under `tests/`, 1 CI workflow, and 11 root environment/tooling/configuration files.
- Aggregate: `3EF957D74D8686081DADE51FAA3D406A0D376EF89432CFD41DE9E168C2200EC2`.
- Hash contract: sort paths ordinally; calculate uppercase SHA-256 over each file's materialized bytes; create lines `<path><TAB><hash>` joined with LF and no final LF; SHA-256 that UTF-8 manifest.
- Root projection files: `.env.example`, `.gitattributes`, `.gitignore`, `.node-version`, `compose.yaml`, `package.json`, `package-lock.json`, `playwright.config.ts`, `tsconfig.base.json`, `tsconfig.tools.json`, and `vitest.config.ts`, plus `.github/workflows/`, `apps/`, `packages/`, `scripts/`, and `tests/`.

Reproduction command:

    $paths = @(git ls-files -- '.env.example' '.gitattributes' '.gitignore' '.node-version' '.github/workflows' 'compose.yaml' 'package.json' 'package-lock.json' 'playwright.config.ts' 'tsconfig.base.json' 'tsconfig.tools.json' 'vitest.config.ts' 'apps' 'packages' 'scripts' 'tests') | Sort-Object -Unique
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
