# Complete TASK-012 Responsive and Resilient UI States


This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.

- Task: [TASK-012](../IMPLEMENTATION_PLAN.md#task-012---complete-responsive-and-resilient-ui-states)
- Plan ID and prospective workflow ID: `TASK-012-20260821-01`
- Current task state: `Pending`
- Planning status: Implementation-ready; execution requires separate project-owner authorization
- Governing execution decision: [DPL-DEC-052](../execution/decision-and-progress-log.md#decision-log)

This plan records planning and a read-only reuse audit only. It does not authorize implementation, change TASK-012 from `Pending`, or claim that AC-006, SPEC-007, or the remaining HS-016 behavior passes.

## Progress


- [x] (2026-08-21) Read TASK-012, NFR-001, NFR-002, NFR-005, AC-006, adopted OR-004, ADR-0009, ADR-0014, ADR-0016, AUTH-001, SPEC-007, applicable HS-016/HS-017, the UI authorities, and the worker-first execution controls.
- [x] (2026-08-21) Completed reuse audit `TASK-012-REUSE-20260821-01` against clean `main` HEAD `dda1ee9eae54f3a27a826d7f30e8e25ce4bb8d44` at 21-path aggregate `AB6F078B5CB071DACD1523B55F4E530FF5B8D8CC2BD4ACFF296939376B2F0F47`.
- [x] (2026-08-21) Recorded the proportional TASK-012 execution choices in DPL-DEC-052 and registered this active ExecPlan while keeping TASK-012 `Pending`.
- [x] (2026-08-21) Passed documentation validation for 77 Markdown files, 41 requirement IDs, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 123 scenarios; ADR validation for 18 ADRs and 38 mapped requirements with only the established NFR-006 warning; `git diff --check`; and a documentation-only scope audit.
- [ ] Obtain separate project-owner execution authorization, recheck TASK-011/AUTH-001 continuity and the clean baseline, then transition TASK-012 to `In progress` before any worker-first assignment.
- [ ] Complete Milestone 1 through read-only preflight, one coherent accepted Red or characterization route, separate frontend-visual Green, affected validation, deterministic Chromium evidence, and fresh S2 review.
- [ ] Complete the relevance audit, closure packet, integrated review, documentation gate, AC-006/status reconciliation, and completed-plan archival.

## Surprises & Discoveries


- Observation: The existing stylesheet already uses Grid for the list route, controls, cards, detail layout, metadata, comments, and form, and Flexbox for query and interaction feedback. The current smoke already proves no horizontal overflow at 375 and 1280 pixels for substantial list/detail behavior; 768-pixel and complete resilient-state coverage are absent.
  Evidence: `apps/web/src/styles.css`; `tests/smoke/walking-skeleton.smoke.test.ts`.

- Observation: List loading, empty, error, and retry semantics and detail loading, not-found, error, and retry semantics already have application coverage. The missing product contract is the one-way image-failure fallback; browser coverage also does not yet join every required state with all three TASK-012 widths.
  Evidence: `apps/web/src/character-list-route.application.test.tsx`; `apps/web/src/character-detail-route.application.test.tsx`; absence of `onError` or fallback rendering in `apps/web/src/character-card.tsx` and `apps/web/src/character-detail-route.tsx`.

- Observation: No shared character-image component currently exists, but both existing rendering owners can satisfy their local fallback responsibility with a bounded component-local state change. Creating a component or hook would add an owner without eliminating a present cross-boundary problem.
  Evidence: `apps/web/src/character-card.tsx`; `apps/web/src/character-detail-route.tsx`; complete `apps/web/src` file inventory.

- Observation: The repository already owns one Chromium test, deterministic avatar interception, PostgreSQL/Redis isolation, process orchestration, lifecycle recovery, console/page-error capture, focus geometry, and horizontal-overflow helpers. TASK-012 needs no new fixture, browser project, server owner, or test command.
  Evidence: `playwright.config.ts`; `tests/smoke/walking-skeleton.smoke.test.ts`; `tests/smoke/fixtures/task-010-runtime.ts`; `scripts/run-smoke.ts`; `scripts/verify-smoke-lifecycle.ts`.

## Decision Log


- Decision: Accept `TASK-012-REUSE-20260821-01` with `CREATE: none` and `EXTRACT_LOCAL: none`.
  Rationale: Every required behavior has a current component, style, test, or browser-lifecycle owner. Local extension is smaller and clearer than a shared image component, hook, design primitive, dependency, fixture, or project.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Use one frontend-visual product milestone followed by one closure stage.
  Rationale: TASK-012 defines one indivisible outcome: existing list and detail views must remain readable and operable across the required state/viewport matrix, including the same layout-safe image failure. Splitting by width or state would create artificial microcycles over the same three production owners and one browser boundary.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Use 375 by 812, 768 by 1024, and 1280 by 800 as the deterministic Chromium viewport matrix, with DOM/geometry assertions as acceptance evidence and screenshots as supporting review artifacts only.
  Rationale: The governing width values are fixed by SPEC-007 and HS-016. The selected heights preserve the established mobile/desktop endpoints and add one conventional tablet portrait canvas without creating a new product breakpoint or screenshot baseline.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Keep TASK-012 `Pending` after plan registration.
  Rationale: An implementation-ready ExecPlan is intent and sequencing, not separate execution authorization or product evidence.
  Date/Author: 2026-08-21 / primary coordinator.

## Outcomes & Retrospective


Planning is complete; execution has not started. The plan reuses all current owners, proposes no new application or test artifact, and limits production eligibility to `character-card.tsx`, `character-detail-route.tsx`, and `styles.css`. AC-006 remains incomplete until the complete executable and documentation gates pass.

## Purpose / Big Picture


After separately authorized execution, visitors will be able to use the existing character list and detail flows at mobile, tablet, and desktop widths without required content leaving the viewport or recovery controls becoming unusable. Existing loading, empty, not-found, request-error, favorite/comment, navigation, and data behavior will remain intact.

When a governed avatar cannot load, the relevant card or detail view will preserve its square image region and character identity, show the exact visible text `Image unavailable`, and make no alternate image request or application retry. A reviewer will observe the result through focused semantic tests and the existing real Chromium smoke against deterministic local data and intercepted avatar responses.

## Context and Orientation


TASK-012 owns [NFR-001](../REQUIREMENTS.md#nfr-001---frontend-technologies), [NFR-002](../REQUIREMENTS.md#nfr-002---responsive-design), [NFR-005](../REQUIREMENTS.md#nfr-005---usability), and [AC-006](../REQUIREMENTS.md#8-minimum-acceptance-criteria). It also contributes to source-optional but repository-adopted OR-004 without changing that classification.

The governing architecture is [ADR-0009](../adrs/0009-keep-frontend-state-close-to-its-owner.md), [ADR-0014](../adrs/0014-persist-and-deliver-character-image-urls-directly.md), and [ADR-0016](../adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md). AUTH-001 is `Authorized` only for the recorded personal, educational, non-commercial portfolio and exact direct-URL boundary. Any changed source, host, mapping, scope, provider condition, authorization status, proxy/byte ownership, or delivery mechanism stops image-specific work for owner reconciliation.

The observable rules are [SPEC-007](../specs/SPEC.feature) and the TASK-012 error-layout portion of [HS-016](../specs/HARD_SPEC.feature), with HS-017 controlling test relevance and milestone evidence. The visual authorities are the [data-driven constraints](../ui/README.md#data-driven-design-constraints), [planned mockup coverage](../ui/README.md#planned-mockup-coverage), and [responsive visual foundations](../ui/visual-foundations.md#responsive-type-scale).

TASK-011 is `Complete`, so TASK-012's dependency is satisfied. Current source already renders list and detail routes, exact native images, explicit data states, interaction states, responsive Grid/Flex layouts, and accessible recovery controls. Current evidence does not prove the complete three-width matrix or any application-owned image-failure fallback.

## Scope and Non-Goals


TASK-012 includes only:

- one-way, component-local image-failure state in the current card and detail owners;
- the exact visible fallback text `Image unavailable`, the same accessible character identity, fixed square geometry, and no alternate source or application retry;
- the minimum CSS changes needed for fallback presentation and any responsive/error-layout gap actually proved by preflight or Red;
- deterministic semantic coverage and the existing single Chromium smoke at widths 375, 768, and 1280; and
- task-level relevance, review, closure, and documentation evidence for AC-006.

The following remain outside scope:

- backend, GraphQL, query-cache, router, persistence, Redis, migration, import, CSP, or image-URL contract changes;
- new product fields, controls, routes, copy beyond the required fallback, pagination, animation, effects, themes, or interaction behavior;
- image bytes, an image component library, proxy, asset route, alternate host, JavaScript fetch, retry loop, service worker, or telemetry;
- a shared `CharacterImage` component, image hook, responsive utility layer, design system, generic state component, or new abstraction;
- dependencies, manifest/lockfile edits, test projects, Playwright projects, fixtures, process owners, lifecycle scripts, Storybook activation, or checked-in mockups/screenshots; and
- TASK-013 quality-portfolio closure, TASK-014 delivery artifacts, TASK-015 final acceptance, commit, push, pull request, publication, or deployment.

If implementation evidence proves that an excluded artifact is required, stop rather than silently widening this plan.

### Accepted reuse audit


Reuse audit `TASK-012-REUSE-20260821-01` covers the exact 21-path projection in `Artifacts and Notes`.

| Element or responsibility | Disposition | Exact owner and bounded treatment |
|---|---|---|
| Application composition and shell | `REUSE_AS_IS` | `apps/web/src/app.tsx` and `apps/web/src/shell.tsx`; routes and page framing already exist. |
| List controls and list data states | `REUSE_AS_IS` | `apps/web/src/character-list-controls.tsx` and `apps/web/src/character-list-route.tsx`; keep current controls, loading, empty, error, and retry behavior. |
| List avatar | `EXTEND` | `apps/web/src/character-card.tsx`; add only current-image-keyed local failure state and fallback rendering. |
| Detail avatar | `EXTEND` | `apps/web/src/character-detail-route.tsx`; add only current-image-keyed local failure state and fallback rendering. Preserve detail/interactions. |
| Presentation | `EXTEND` | `apps/web/src/styles.css`; add fallback styling and only browser-proven responsive/error-layout fixes using the current palette, type, Grid, and Flex owners. |
| Card semantic coverage | `EXTEND` | `apps/web/src/character-card.unit.test.tsx`; prove one-way accessible fallback and unchanged successful image/card contract. |
| Detail semantic coverage | `EXTEND` | `apps/web/src/character-detail-route.application.test.tsx`; prove one-way accessible fallback and unchanged detail/interaction contract. |
| Existing list/control application coverage | `REUSE_AS_IS` | `apps/web/src/character-list-controls.unit.test.tsx` and `apps/web/src/character-list-route.application.test.tsx`; current loading/empty/error/retry semantics already belong here. |
| Real-browser evidence | `EXTEND` | `tests/smoke/walking-skeleton.smoke.test.ts`; retain exactly one test and extend its deterministic state/viewport/image interception. |
| Browser fixture, orchestration, and recovery | `REUSE_AS_IS` | `tests/smoke/fixtures/task-010-runtime.ts`, `scripts/run-smoke.ts`, and `scripts/verify-smoke-lifecycle.ts`. |
| Tailwind and test configuration | `REUSE_AS_IS` | `scripts/validate-tailwind.ts`, `vitest.config.ts`, and `playwright.config.ts`; no new command, project, worker, or server owner. |
| Dependencies and lockfile | `REUSE_AS_IS` | `package.json`, `apps/web/package.json`, and `package-lock.json`; React local state, existing CSS, Vitest, and Playwright are sufficient. |

`CREATE` and `EXTRACT_LOCAL` have no accepted use. Search absence alone cannot revise that result; a contradiction stops the milestone for coordinator reconciliation.

### Frontend-visual capsule


- Implementation profile: `frontend-visual`.
- Frontend-quality skill: `.agents/skills/frontend-quality/SKILL.md`.
- Exact design anchors: DPL-DEC-005, DPL-DEC-006, DPL-DEC-052, SPEC-007, applicable HS-016, UI data-driven constraints, and responsive visual foundations.
- Reuse evidence: `TASK-012-REUSE-20260821-01` at planning aggregate `AB6F078B5CB071DACD1523B55F4E530FF5B8D8CC2BD4ACFF296939376B2F0F47`; refresh at activation and before Green.
- Required states: populated list; list loading, empty, and request error with retry; populated detail; detail loading, not-found, and request error with retry; list-card and detail-image failure; existing favorite/comment and navigation behavior remains frozen.
- Required viewports: 375 by 812, 768 by 1024, and 1280 by 800. Every width covers list/detail operability, recovery controls, image fallback, and horizontal-overflow absence.
- Browser evidence: existing Chromium project and smoke identity with a unique run-owned PostgreSQL schema, Redis namespace, web/API processes, deterministic GraphQL fixture data, successful and failing avatar interception, request counts, console/page errors, and exact cleanup.
- Supporting images: generated smoke screenshots for populated and fallback presentations at the three viewports only when useful to the S2 review; no checked-in baseline or mockup.
- Prohibited visual scope: new theme, gradient expansion, decorative card nesting, badge, icon dependency, animation, alternate fallback art, extra copy, field, control, breakpoint framework, component library, or redesign.

## Plan of Work


Execution begins only after the project owner separately authorizes TASK-012 and the primary coordinator changes the canonical task to `In progress`. Activation must recheck clean Git state, TASK-011 completion, AUTH-001 continuity, toolchain, Docker-backed PostgreSQL/Redis availability, lease-guard health, and the reuse aggregate. Planning evidence is otherwise refreshed rather than treated as runtime proof.

### Milestone 1 — Responsive and resilient list/detail presentation


Milestone ID `TASK-012-M1-RESILIENT-UI` owns one observable contract: across the required viewport/state matrix, the existing list and detail flows remain readable and operable, recovery controls remain available, and either native avatar presentation or the exact one-way accessible square fallback preserves layout and character identity without another image source or application retry.

The persistent `test_worker` first performs read-only preflight assignment `TASK-012-M1-PREFLIGHT-01`. It classifies the responsive layout, each existing list/detail state, and card/detail fallback separately using the ADR-0016 vocabulary. Current static evidence suggests a mixture of covered, uncovered, and missing behavior; that suggestion is not the accepted preflight result. `CONFLICTING` or `UNKNOWN` stops the milestone.

For an accepted `MISSING`, `REGRESSION`, or coordinator-confirmed `PARTIAL` gap, test assignment `TASK-012-M1-RED-01` may change only:

- `apps/web/src/character-card.unit.test.tsx`;
- `apps/web/src/character-detail-route.application.test.tsx`; and
- `tests/smoke/walking-skeleton.smoke.test.ts`.

The minimum coherent test set must preserve current success behavior while proving fallback identity/text, a single failure transition, no alternate source/retry, fixed square geometry, all three widths, list/detail states, recovery control operability, and no horizontal overflow. Existing covered assertions remain evidence and must not be rewritten merely to create Red. Accepted test paths then freeze.

Frontend Green assignment `TASK-012-M1-GREEN-01` may change only:

- `apps/web/src/character-card.tsx`;
- `apps/web/src/character-detail-route.tsx`; and
- `apps/web/src/styles.css`.

The frontend worker follows the accepted reuse dispositions, makes the minimum Green, and may perform a small behavior-preserving Refactor in the same turn. It may not create a file, component, hook, shared helper abstraction, dependency, configuration, fixture, test project, data owner, or route.

The focused Vitest boundary is the card unit plus detail application tests. The milestone join is all web unit/application tests, root typecheck, web build with GraphQL drift check, Tailwind validation, the single isolated Chromium smoke, targeted diff checking, and an affected-test relevance audit. Browser/external evidence is fresh per run identity and is not reusable across mutable runs.

Risk is `S2`: the change is user-visible and combines responsive geometry, accessibility, deterministic browser image failure, and ADR-0014's external-request boundary, but it introduces no security, data-integrity, migration, concurrency, or irreversible-state trigger. A fresh `independent_reviewer` reviews the accepted reuse dispositions, visual capsule, frozen tests, implementation diff, semantic results, browser evidence, screenshots when produced, request/console diagnostics, and cleanup.

Budget: one preflight, one coherent Red or characterization route, one frontend Green with optional Refactor, at most one same-contract correction per writer, and one review-correction loop. Stop after the same decisive failure twice, two no-diff write handoffs, exhausted correction budget, a required new owner/dependency/test project, reuse or authority drift, AUTH-001 reopen trigger, unexpected public request, failed smoke cleanup, or any scope/contract/risk change.

### Milestone 2 — Integrated closure and documentation


After Milestone 1 receives a closure-permitting S2 verdict, freeze the integrated candidate. Run the semantic test-relevance audit, complete authoritative closure checks once, confirm exact external cleanup, and obtain a fresh integrated `independent_reviewer` verdict.

Only a closure-permitting verdict allows the primary coordinator to update AC-006, TASK-012, readiness, specifications/UI status, ADR-index implementation annotation, execution chronology, review/index navigation, and this plan's living sections. Validate the active plan location, move it to `docs/plans/completed/` only after TASK-012 and the documentation gate pass, repair inbound links, and validate the completed location again.

TASK-013 remains blocked until TASK-012 is actually complete. No commit, push, pull request, publication, or deployment is implicit in closure.

## Concrete Steps


Run all commands from the repository root.

At separately authorized activation:

```powershell
git status --short --branch
git rev-parse HEAD
node --version
npm --version
node -e "const p=require('./node_modules/@playwright/test/package.json'); console.log(p.version)"
docker version
docker info --format '{{.OSType}}'
python -B .codex\leases\lease_guard.py self-test
python -B .agents\skills\verify-repository\scripts\validate_docs.py --repo .
python -B .agents\skills\govern-adrs\scripts\validate_adrs.py --repo .
git diff --check
```

Expected activation result: TASK-011 remains `Complete`; AUTH-001 has no reopen trigger; the branch and tree are understood; Node/npm/Playwright match repository constraints; Docker reports a Linux server; all 26 lease-guard checks pass; documentation/ADR/diff validation passes; and the refreshed reuse audit preserves every disposition. Only then may the coordinator record owner authorization and set TASK-012 to `In progress`.

For the accepted Red and matching Green focused boundary:

```powershell
npm exec -- vitest run --config vitest.config.ts --project web-unit --project web-application apps/web/src/character-card.unit.test.tsx apps/web/src/character-detail-route.application.test.tsx
```

Red must fail only for the accepted missing or regressed TASK-012 contract. Green must pass the same scope. If preflight returns only `EXISTING_AND_COVERED` or `EXISTING_BUT_UNCOVERED`, follow those routes and do not manufacture this failure.

At the Milestone 1 join:

```powershell
npm exec -- vitest run --config vitest.config.ts --project web-unit --project web-application
npm run typecheck
npm run build --workspace @rick-and-morty/web
npm run validate:tailwind
$env:POSTGRES_PORT='55432'
$env:REDIS_PORT='56400'
npm run test:smoke
git diff --check -- apps/web/src/character-card.tsx apps/web/src/character-detail-route.tsx apps/web/src/styles.css apps/web/src/character-card.unit.test.tsx apps/web/src/character-detail-route.application.test.tsx tests/smoke/walking-skeleton.smoke.test.ts
```

Expected result: web tests, typecheck, web build/GraphQL drift, Tailwind, smoke, and diff checking pass. The smoke reports its unique schema/namespace/process identity and terminal cleanup.

At closure, with the same PostgreSQL/Redis profile active:

```powershell
npm run typecheck
npm run build
npm run validate:tailwind
npm test
npm run test:smoke:lifecycle
python -B .agents\skills\verify-repository\scripts\validate_docs.py --repo .
python -B .agents\skills\govern-adrs\scripts\validate_adrs.py --repo .
git diff --check
git status --short
```

Expected result: every command exits zero; the known NFR-006 ADR warning may remain; no focused/skipped test, unexpected changed path, owned process, PostgreSQL schema, Redis namespace, or port residue remains.

## Validation and Acceptance


Acceptance requires all of the following:

- preflight records one allowed classification for every intended scenario and cites current implementation/test evidence;
- Red or characterization follows the classification exactly, with a compliant terminal lease and inspected diff;
- Green changes only the three accepted production owners, preserves frozen tests, and records the exact focused pass;
- list and detail views are readable and operable at 375, 768, and 1280 CSS pixels with no required horizontal overflow or clipped navigation/recovery control;
- list loading, empty, and error/retry plus detail loading, not-found, and error/retry presentations remain semantically correct and layout-safe;
- successful list/detail images keep the exact stored URL, character alternative text, anonymous CORS, no-referrer, fixed square geometry, and current CSP/public-request boundary;
- each card/detail image failure replaces only that failed rendering with visible `Image unavailable`, preserves the same accessible character identity and square region, and issues no alternate image source or application retry;
- the smoke retains one Chromium project and one test, uses deterministic local fixtures/interception, reports zero page errors and zero unexpected console/public-request errors, and cleans its exact processes/data;
- affected tests remain relevant, with no duplicate fallback suite, snapshot baseline, skipped/focused test, abandoned helper, or test-only production branch;
- manifests, lockfile, test configuration, fixture/orchestrator/lifecycle, backend, data/query/generated owners, routes, and non-TASK-012 UI behavior remain unchanged;
- S2 milestone and integrated reviews return closure-permitting verdicts with every follow-up dispositioned; and
- the task-closure documentation gate passes before AC-006 or TASK-012 changes state.

Screenshots support visual review but cannot replace DOM, accessibility, request-count, geometry, network, or cleanup assertions.

## Idempotence and Recovery


- Planning commands and hash calculations are read-only and safe to repeat. Refresh the reuse aggregate whenever any projected path changes.
- Every worker write uses a fresh complete Milestone Assignment Packet v2 and guard lease. Close and inspect the exact lease before another writer starts; never redefine or reuse a lease.
- The test and frontend writers are sequential. An unexpected path, guard violation, stale baseline, wrong Red, or frozen-test change stops writes without reverting user or peer work.
- Current-image-keyed component-local failure state must naturally stop applying when a different `imageUrl` is rendered. Do not use global state, browser storage, a cache write, or an effect-driven request retry.
- A failed avatar interception is deterministic and scoped to the existing smoke. Restore route interception within the test and rely on the existing orchestrator/lifecycle owners for process and data cleanup.
- On interrupted smoke, use `npm run test:smoke:lifecycle` and its exact run-owned cleanup boundaries. Do not kill broad processes, delete broad schemas/namespaces, or remove Docker volumes.
- If browser evidence reveals a genuine CSS gap, change only `styles.css` under the accepted Green contract. If it requires markup outside the two accepted render owners, stop for coordinator reconciliation.
- Preserve all historical reviews, completed plans, and execution chronology. Never reset or rewrite them to recover this task.

## Artifacts and Notes


Planning baseline:

- branch: `main`, tracking `origin/main`;
- HEAD: `dda1ee9eae54f3a27a826d7f30e8e25ce4bb8d44`;
- worktree and index: clean;
- toolchain: Node.js `v24.18.0`, npm `11.16.0`, Playwright `1.61.1`;
- accepted reuse-audit ID: `TASK-012-REUSE-20260821-01`;
- ordered 21-path aggregate: `AB6F078B5CB071DACD1523B55F4E530FF5B8D8CC2BD4ACFF296939376B2F0F47`.

Ordered reuse projection:

1. `apps/web/src/app.tsx`
2. `apps/web/src/shell.tsx`
3. `apps/web/src/character-list-controls.tsx`
4. `apps/web/src/character-list-route.tsx`
5. `apps/web/src/character-card.tsx`
6. `apps/web/src/character-detail-route.tsx`
7. `apps/web/src/styles.css`
8. `apps/web/src/character-card.unit.test.tsx`
9. `apps/web/src/character-list-controls.unit.test.tsx`
10. `apps/web/src/character-list-route.application.test.tsx`
11. `apps/web/src/character-detail-route.application.test.tsx`
12. `tests/smoke/walking-skeleton.smoke.test.ts`
13. `tests/smoke/fixtures/task-010-runtime.ts`
14. `scripts/run-smoke.ts`
15. `scripts/verify-smoke-lifecycle.ts`
16. `scripts/validate-tailwind.ts`
17. `vitest.config.ts`
18. `playwright.config.ts`
19. `package.json`
20. `apps/web/package.json`
21. `package-lock.json`

The aggregate is uppercase SHA-256 over UTF-8 records of repository-relative path, one tab, and uppercase per-file SHA-256, joined with LF and no final LF. No product or test evidence is reusable after a projected-path change without a refreshed aggregate. Mutable browser, PostgreSQL, Redis, network, and process evidence is non-reusable unless the exact isolated run identity is preserved and still valid.

Expected created paths: none. Any proposed new component, shared helper abstraction, dependency, configuration, fixture, test project, or application/test path is outside the accepted reuse audit and stops automatic continuation.

## Interfaces and Dependencies


- React 18 component-local state owns only whether the current rendered image URL has failed. No shared/global state qualifies under ADR-0009.
- Native `<img>` remains the success boundary with exact `imageUrl`, character accessible name, `crossOrigin="anonymous"`, `referrerPolicy="no-referrer"`, and fixed dimensions.
- Existing DOM/CSS in `CharacterCard`, `CharacterDetailRoute`, and `styles.css` owns fallback and layout. There is no new image service or data interface.
- Existing CSS Grid and Flexbox remain the layout mechanisms; Tailwind remains present and validated through the current build/validator boundary.
- Existing Vitest `web-unit` and `web-application` projects own semantic tests. Existing Playwright Chromium plus the repository smoke orchestrator owns browser geometry, native image failure, requests, and cleanup.
- Existing PostgreSQL/Redis fixture data remains the only runtime product-data source for smoke. No live public character JSON or image availability is acceptance evidence.

## Revision Note


2026-08-21: Created the implementation-ready TASK-012 ExecPlan, accepted the 21-path reuse audit, recorded DPL-DEC-052, selected one frontend-visual product milestone plus closure, and prohibited all new components, shared abstractions, dependencies, fixtures, test projects, and process owners. Documentation validation passes for 77 Markdown files and 123 scenarios, ADR validation passes for 18 ADRs and 38 mapped requirements with only the established NFR-006 warning, and diff checking passes. TASK-012 remains `Pending`; no implementation or acceptance evidence was created.
