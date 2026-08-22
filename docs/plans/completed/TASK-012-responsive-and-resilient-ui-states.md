# Complete TASK-012 Responsive and Resilient UI States


This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.

- Task: [TASK-012](../../IMPLEMENTATION_PLAN.md#task-012---complete-responsive-and-resilient-ui-states)
- Plan ID and prospective workflow ID: `TASK-012-20260821-01`
- Current task state: `Complete`
- Execution status: Complete and archived after Milestone 1, authoritative closure, fresh integrated review, resolved documentation follow-up, AC-006 reconciliation, and active/completed-location documentation gates passed on corrected candidate `D4E87CB...FE3983`
- Governing execution decision: [DPL-DEC-052](../../execution/decision-and-progress-log.md#decision-log)

The project owner authorized workflow `TASK-012-20260821-01`. Product implementation, the bounded LF prerequisite, correction cycles, complete three-width browser matrix, finding-specific S2 confirmation, authoritative closure validation, fresh integrated review, documentation correction, and task-closure documentation gate pass on candidate `D4E87CB...FE3983`. TASK-012 is `Complete`; AC-006, SPEC-007, and applicable HS-016/HS-017 behavior pass.

## Progress


- [x] (2026-08-21) Read TASK-012, NFR-001, NFR-002, NFR-005, AC-006, adopted OR-004, ADR-0009, ADR-0014, ADR-0016, AUTH-001, SPEC-007, applicable HS-016/HS-017, the UI authorities, and the worker-first execution controls.
- [x] (2026-08-21) Completed reuse audit `TASK-012-REUSE-20260821-01` against clean `main` HEAD `dda1ee9eae54f3a27a826d7f30e8e25ce4bb8d44` at 21-path aggregate `AB6F078B5CB071DACD1523B55F4E530FF5B8D8CC2BD4ACFF296939376B2F0F47`.
- [x] (2026-08-21) Recorded the proportional TASK-012 execution choices in DPL-DEC-052 and registered this active ExecPlan while keeping TASK-012 `Pending`.
- [x] (2026-08-21) Passed documentation validation for 77 Markdown files, 41 requirement IDs, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 123 scenarios; ADR validation for 18 ADRs and 38 mapped requirements with only the established NFR-006 warning; `git diff --check`; and a documentation-only scope audit.
- [x] (2026-08-22 03:28Z) Accepted project-owner execution authorization, confirmed TASK-011 `Complete` and AUTH-001 continuity, reconciled clean branch `codex/execplan-012` at `39302e9ced72fd76431196449404abc6dc0db217`, passed the exact activation gates, refreshed reuse audit `TASK-012-REUSE-20260821-01` at unchanged aggregate `AB6F078B5CB071DACD1523B55F4E530FF5B8D8CC2BD4ACFF296939376B2F0F47`, and transitioned TASK-012 to `In progress`.
- [x] (2026-08-22 04:10Z) Accepted the project owner's explicit continuation as authorization for one separately scoped prerequisite correction: add the exact frontend generated-file LF policy and canonically regenerate only that generated file under a fresh setup lease. This exception changes no TASK-012 product contract, frozen test, dependency, task edge, acceptance result, or correction budget.
- [x] (2026-08-22 04:14Z) Accepted standard setup `TASK-012-PR1-SETUP-01` after closed-compliant lease receipt `5157d42ffc0dc7ac9e63a97dd5fd5f86df5ffa46f138ec6489722183a692aeb6`: the exact frontend generated-file `text eol=lf` rule is present, the existing generator rematerialized LF bytes, logical blob identity remains `3d4caf9e4558fe36dd7165b54a99153690a11330`, GraphQL drift and targeted diff checks pass, and all TASK-012 product/test hashes remain frozen.
- [x] (2026-08-22 04:19Z) Repeated corrected-environment web tests 63/63, root typecheck, web build with GraphQL drift, Tailwind validation, relevance, targeted diff, documentation, and ADR checks. Chromium run `9bdd0bf6aacd4bf0` reached all three widths and rendered the card/detail fallbacks, then failed only a request-count assertion that required a second network request after SPA navigation; exact run-owned cleanup completed.
- [x] (2026-08-22 04:22Z) Accepted persistent-test-owner triage `SAME-CONTRACT TEST ASSERTION DEFECT`: browser reuse of a failed native image decode may produce zero additional detail request, while the accessible detail fallback proves the second component's failure transition. Routed one smoke-only correction through the existing same-contract budget.
- [x] (2026-08-22 04:28Z) Accepted test correction `TASK-012-M1-RED-CORRECTION-02` after closed-compliant receipt `6893c8758d0bf088d954db5c862264fb62735ca0bab586f5acb4eb78dde5c895`: only the smoke assertion changed, card request exactness remains, detail navigation now permits at most one same-URL native request, and targeted diff checking passes.
- [x] (2026-08-22 04:31Z) Rejected corrected Chromium run `888867d5ae65c193` as acceptance evidence after it passed the request correction but an unscoped detail image locator returned a detached list-card match during the mobile SPA transition. The screenshot and page snapshot visibly prove the current detail fallback's accessible name, exact text, square geometry, and layout; exact run-owned cleanup completed.
- [x] (2026-08-22 04:33Z) Accepted read-only triage `SAME-CONTRACT TEST TIMING/LOCATOR DEFECT` and stopped automatic continuation because the persistent test writer's sole same-contract correction is consumed. The smallest repair scopes the detail image to the detail article containing the level-2 character heading; a fresh smoke-only lease requires explicit project-owner budget extension.
- [x] (2026-08-22 04:42Z) Accepted the project owner's explicit continuation as a one-edit correction-budget extension for the persistent test worker. Attempt 3 may change only the current detail fallback locator to scope it through the semantic detail article; all assertions, helpers, product/configuration/generated paths, and other tests remain frozen. Any further failure or correction need stops.
- [x] (2026-08-22 04:47Z) Accepted final locator correction `TASK-012-M1-LOCATOR-RED-01` after closed-compliant receipt `18ec3622e60fba2c5102a128fabd53eb1d2e1907e8849eddf5db27ececf4ef10`: only the semantic detail-article locator construction changed, every assertion and other path remained frozen, and targeted diff checking passes.
- [x] (2026-08-22 04:50Z) Accepted corrected Chromium run `c0a9c55f982aa0f1` for its executed scope: 1/1 passed in 6.4 seconds with list states at 375 by 812, 768 by 1024, and 1280 by 800; populated detail at 1280/375; failed-image card/detail at all three widths; exact asserted request/overflow constraints; zero page errors; three expected GraphQL 503 diagnostics; zero unexpected console errors; and matching READY/CLEANUP on the exact isolated schema/namespace.
- [x] (2026-08-22 05:02Z) Accepted fresh S2 verdict `REVISE` on candidate `78AEC4BA8A58D6EDA0EE84DC7A6AABFCAC28169F46C6BBB9EF4D71081625F237`: no Blocker; one Major because detail loading/not-found/error-retry are absent at all widths, populated detail at 768 is absent, and successful native-image rendered square geometry is not asserted; one stale-introduction Minor corrected during reconciliation. Milestone 1 remains withheld.
- [x] (2026-08-22 12:34Z) Accepted the project owner's explicit continuation as authorization for one S2 review-correction evidence cycle: the persistent test worker may change only the existing smoke to add the missing deterministic detail states, 768 populated detail, recovery/overflow checks, and successful native-image square geometry; then the primary runs one fresh isolated smoke, refreshes the aggregate, and returns to the same reviewer for finding-specific confirmation. No product or further correction is authorized.
- [x] (2026-08-22 12:42Z) Accepted `TASK-012-M1-DETAIL-MATRIX-EVIDENCE-01` after closed-compliant receipt `2d7ba3857e8716f682590169014fa2864656758d4870d671a57862372f1e076c`: only the existing smoke changed, its hash is `CC2FB736A546B473255C3C65948965C08FFA0E684B27B2A3C94D75BEE6FB0527`, root typecheck and targeted diff checking pass, and every frozen product/component-test hash remains unchanged. Browser acceptance is not yet claimed.
- [x] (2026-08-22 12:45Z) Stopped the sole authorized corrected smoke before Chromium: web/API builds passed, but fixture setup and cleanup both received connection refusals from PostgreSQL 55432 and Redis 56400; Docker was unavailable and no service/process listener remained on 4173, 4174, 55432, or 56400. No rerun, aggregate refresh, or review confirmation is authorized without project-owner direction.
- [x] (2026-08-22 13:18Z) Accepted the project owner's explicit continuation as authorization to start Docker Desktop and run exactly one replacement isolated smoke against the unchanged corrected test. A pass advances to aggregate refresh and finding-specific confirmation; any test or cleanup failure stops. No product/test correction or additional runtime attempt is authorized.
- [x] (2026-08-22 13:23Z) Accepted replacement run `3d93ab11065f7744`: Chromium 1/1 passed in 6.6 seconds with the complete corrected three-width matrix, zero page errors, three allowed GraphQL failure diagnostics, zero unexpected console errors, matching READY/CLEANUP, independently empty schema/namespace/web ports, and refreshed aggregate `D4E87CBED378F8C60A97714F46194D68E1515BB999968D00C49CE903A3FE3983`.
- [x] (2026-08-22 13:29Z) Accepted finding-specific `PASS WITH FOLLOW-UPS` with no Blocker or Major, closed the prior browser-coverage Major, resolved the sole stale-header Minor, and completed Milestone 1 on candidate `D4E87CB...FE3983`.
- [x] Complete Milestone 1: preflight, coherent Red, frontend-visual Green, LF prerequisite, corrected-environment gates, smoke corrections, first S2 review, owner-authorized evidence correction, replacement browser run/aggregate, finding-specific confirmation, and localized documentation follow-up are accepted.
- [x] (2026-08-22 13:39Z) Triaged the first closure `npm test` stop: unit aggregate passed 31/32 files and 181/182 tests, while unchanged TASK-004 default-entry coverage failed with a hidden direct-import exception before downstream suites. Persistent test-owner triage returned unrelated-baseline `UNKNOWN`; one exact focus then passed 1/1 unchanged in 197 ms. The full closure gate must be rerun with an explicit fresh Redis namespace already required by the integration contract.
- [x] (2026-08-22 13:46Z) Passed the authoritative closure packet on unchanged candidate `D4E87CB...FE3983`: typecheck, build/GraphQL drift, Tailwind, unit 182/182, PostgreSQL/Redis integration 77/77, application 37/37, Chromium 1/1, lifecycle 7/7, documentation/ADR/diff/relevance, exact fingerprint, and empty database/schema/namespace/web-port/fixture residue.
- [x] (2026-08-22) Accepted fresh integrated `PASS WITH FOLLOW-UPS` on unchanged candidate `D4E87CB...FE3983`: zero Blocker, zero Major, one documentation-only Minor covering two stale current-state statements, and explicit closure permission after correction and the documentation gate.
- [x] (2026-08-22) Corrected both integrated-review documentation findings and stopped the task-started PostgreSQL/Redis containers without deleting their volumes; both report exit code 0 and ports 4173, 4174, 55432, and 56400 have no listeners.
- [x] (2026-08-22) Passed the active-location task-closure documentation gate, reconciled TASK-012 to `Complete`, marked AC-006 and its SPEC-007/HS-016 evidence complete, and advanced minimum-assessment readiness to 11/12 without changing the candidate.
- [x] (2026-08-22) Archived this plan under `docs/plans/completed/`, repaired all inbound and relative links, confirmed the active path is absent and completed path present, and passed completed-location documentation validation for 79 Markdown files/123 scenarios, ADR validation for 18 ADRs/38 requirements with only the established NFR-006 warning, and diff checking.

## Surprises & Discoveries


- Observation: The existing stylesheet already uses Grid for the list route, controls, cards, detail layout, metadata, comments, and form, and Flexbox for query and interaction feedback. The current smoke already proves no horizontal overflow at 375 and 1280 pixels for substantial list/detail behavior; 768-pixel and complete resilient-state coverage are absent.
  Evidence: `apps/web/src/styles.css`; `tests/smoke/walking-skeleton.smoke.test.ts`.

- Observation: List loading, empty, error, and retry semantics and detail loading, not-found, error, and retry semantics already have application coverage. The missing product contract is the one-way image-failure fallback; browser coverage also does not yet join every required state with all three TASK-012 widths.
  Evidence: `apps/web/src/character-list-route.application.test.tsx`; `apps/web/src/character-detail-route.application.test.tsx`; absence of `onError` or fallback rendering in `apps/web/src/character-card.tsx` and `apps/web/src/character-detail-route.tsx`.

- Observation: No shared character-image component currently exists, but both existing rendering owners can satisfy their local fallback responsibility with a bounded component-local state change. Creating a component or hook would add an owner without eliminating a present cross-boundary problem.
  Evidence: `apps/web/src/character-card.tsx`; `apps/web/src/character-detail-route.tsx`; complete `apps/web/src` file inventory.

- Observation: The repository already owns one Chromium test, deterministic avatar interception, PostgreSQL/Redis isolation, process orchestration, lifecycle recovery, console/page-error capture, focus geometry, and horizontal-overflow helpers. TASK-012 needs no new fixture, browser project, server owner, or test command.
  Evidence: `playwright.config.ts`; `tests/smoke/walking-skeleton.smoke.test.ts`; `tests/smoke/fixtures/task-010-runtime.ts`; `scripts/run-smoke.ts`; `scripts/verify-smoke-lifecycle.ts`.

- Observation: Preflight found the fluid Grid/Flex owners already implement the tablet layout, but the existing smoke does not execute 768 by 1024. Card/detail image success is implemented and covered; the component-local fallback, current-URL reset, one-way no-retry transition, and deterministic failed-avatar browser join are absent.
  Evidence: `TASK-012-M1-PREFLIGHT-01`; focused Vitest pass 11/11; `apps/web/src/character-card.tsx`; `apps/web/src/character-detail-route.tsx`; `apps/web/src/styles.css`; `tests/smoke/walking-skeleton.smoke.test.ts`.

- Observation: The first milestone build exposed an existing Windows checkout reproducibility conflict outside TASK-012. `apps/web/src/data/generated/graphql.ts` is logically identical to HEAD, but `core.autocrlf=true` materializes 134 CRLF pairs: the LF blob is 9,542 bytes and the working file is 9,676 bytes. The path has no `text eol=lf` attribute, so `graphql-codegen --check` reports it stale before Vite runs.
  Evidence: `npm run build --workspace @rick-and-morty/web` exit 1; matching `git hash-object` and HEAD blob ID `3d4caf9e4558fe36dd7165b54a99153690a11330`; blob/working sizes and CRLF count; `git check-attr text eol`; `git config core.autocrlf` returning `true`.

- Observation: A native browser may reuse a failed image decode across SPA navigation without issuing a second request for the identical URL. The card and detail components still transition independently to their accessible square fallbacks; therefore requiring exactly two network requests over-specifies browser caching and is not evidence of application retry behavior.
  Evidence: Chromium run `9bdd0bf6aacd4bf0`; visible failure screenshot; both fallback/geometry assertions passed before line 1091; persistent test-owner read-only triage.

- Observation: The lease guard accepts only attempt numbers 1 or 2, so the cumulative third persistent-test write cannot be represented as attempt 3 in the original milestone cycle.
  Evidence: rejected pre-lease start for proposed `TASK-012-M1-RED-CORRECTION-03-LEASE-01` with exact message `attempt must be 1 or 2`; no lease, digest, pointer, or write authority was created.

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

- Decision: Activate owner-authorized workflow `TASK-012-20260821-01` after the complete prerequisite check.
  Rationale: TASK-011 remains `Complete`; AUTH-001's portfolio, provider, exact URL mapping, and direct-delivery boundary are unchanged; the current clean branch differs from the planning baseline only by its registered documentation commit; all toolchain, Docker, guard, documentation, ADR, and diff checks pass; and the accepted 21-path reuse aggregate and dispositions are unchanged.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Accept preflight outcome `PARTIAL` and route only the explicit image-fallback/browser gap through one coherent guarded Red.
  Rationale: Fresh focused evidence passes 11/11 for existing card/detail behavior; source and tests prove the existing data states, navigation, interactions, success images, and 375/1280 endpoints, while exact source inspection proves the fallback transition is absent and the single smoke lacks 768 and failed-avatar coverage. The accepted test-side scope can prove the gap without changing an owner or widening the milestone.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Accept and freeze the coherent Red from `TASK-012-M1-RED-01`.
  Rationale: The terminal lease receipt is freshly compliant on exactly the three accepted test owners; actual diff inspection shows only the bounded fallback/current-URL and existing-smoke viewport/request assertions; the focused command fails only the two new card/detail fallback tests while all 11 prior tests pass; and no production, configuration, fixture, dependency, lifecycle, or documentation owner changed under the lease.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Accept frontend-visual Green `TASK-012-M1-GREEN-01` without a Refactor.
  Rationale: The frontend worker reproduced the exact Red, changed only the three accepted production owners, preserved the frozen test hashes, and passed the same focused boundary 13/13. Actual diff inspection confirms only component-local failed-URL state and existing-owner fallback presentation; the new-URL comparison resets naturally without an effect, alternate request, retry, helper, or shared owner.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Stop TASK-012 milestone advancement at the first failed build prerequisite and request project-owner reconciliation.
  Rationale: Build, Tailwind, and smoke are mandatory milestone evidence. The failure is not in the accepted TASK-012 product/test diff and cannot be corrected through the current frontend Green or review-correction budget: the smallest apparent repair changes `.gitattributes` or the generated-file materialization boundary, both excluded configuration scope and a new owner for this task. Repeating build or smoke would only reproduce the same decisive GraphQL drift failure.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Accept the owner's `go ahead` as exact authorization for prerequisite assignment `TASK-012-PR1-SETUP-01` under the existing workflow.
  Rationale: The diagnosed failure has one bounded reproducibility repair: declare `apps/web/src/data/generated/graphql.ts` as LF in `.gitattributes`, then run the repository-owned GraphQL generator so the current materialization matches the tracked logical content. A fresh standard-profile setup worker may touch only those two paths. The generated file must remain logically identical to HEAD; no hand-authored generated content, product/test behavior, dependency, task graph, ADR, acceptance claim, or extra correction authority is permitted. Declarative policy and deterministic regeneration do not require an artificial TDD Red; the exact attribute, logical-identity, drift-check, and diff checks are the observable contract. All prior milestone command evidence is treated as interrupted and repeated after the correction.
  Date/Author: 2026-08-21 / project owner and primary coordinator.

- Decision: Use the persistent test owner's one same-contract correction for the smoke request-count assertion only.
  Rationale: The failed assertion requires the browser to issue a second native request for the same failed URL after SPA navigation, but the contract controls application behavior, not browser cache reuse. The corrected assertion must preserve the exact one-card-request join, then allow zero or one detail request while rejecting multiple attempts or any alternate avatar URL. No product, CSS, semantic test, fixture, operation, configuration, dependency, lifecycle, or documentation behavior changes.
  Date/Author: 2026-08-21 / primary coordinator after persistent test-owner triage.

- Decision: Stop after the corrected smoke exposed a second test-only locator defect.
  Rationale: The request-count correction passed, and the failure screenshot/page snapshot visibly show the correct accessible square detail fallback. The remaining issue is the unscoped page-level image locator resolving the list-card fallback during SPA replacement; scoping it to the detail article is a one-path, one-locator test repair. However, the persistent test writer's sole same-contract correction is consumed. The ExecPlan does not authorize a second test correction, so no writer may change the smoke again without explicit project-owner budget extension.
  Date/Author: 2026-08-21 / primary coordinator after persistent test-owner read-only triage.

- Decision: Extend the persistent test writer's budget by exactly one additional smoke-only locator correction.
  Rationale: The project owner explicitly authorized continuation after receiving the exact requested scope. Attempt 3 may replace only the unscoped detail image locator with a locator rooted at the semantic detail article containing the level-2 character heading. This resolves the confirmed SPA detachment race without weakening fallback, geometry, request, diagnostics, or cleanup evidence and without changing production behavior. No further correction, product edit, or acceptance authority follows; any new failure stops.
  Date/Author: 2026-08-21 / project owner and primary coordinator.

- Decision: Represent the final owner-authorized edit as guard-local attempt 1 in distinct correction cycle `TASK-012-M1-LOCATOR-CORRECTION`.
  Rationale: The authorization and cumulative worker budget remain the same, but the guard schema cannot encode attempt 3. Assignment `TASK-012-M1-LOCATOR-RED-01` is therefore the first and only write in a new correction subcycle while remaining cumulatively the persistent test writer's third write. The rejected proposed lease never started and will not be reused.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Accept the fresh S2 `REVISE`, correct the evidence overstatement, and withhold Milestone 1.
  Rationale: The reviewer reproduced the candidate, hashes, five terminal receipts, scope, reuse, TDD, fallback semantics, accessibility, request behavior, executed browser assertions, diagnostics, and cleanup. It then inspected the smoke and found that `exerciseRequiredStates` covers only list loading/empty/error-retry; detail loading/not-found/error-retry are absent at every width, populated detail is absent at 768, and native success geometry lacks a rendered square assertion. These are mandatory evidence gaps, not product-fallback defects. The reviewer also identified one stale introductory sentence, which the primary corrected without changing candidate bytes. No correction budget remains.
  Date/Author: 2026-08-21 / primary coordinator after fresh independent S2 review.

- Decision: Extend only the existing smoke owner for one S2 evidence correction and finding-specific confirmation.
  Rationale: The project owner explicitly authorized the exact remediation after receiving the non-closure-permitting Major. The missing contracts are already implemented and covered semantically, so this is `EXISTING_BUT_UNCOVERED` browser characterization rather than a manufactured Red or product Green. The persistent test worker may change only `walking-skeleton.smoke.test.ts`; all product/configuration/generated/other-test bytes remain frozen. One fresh isolated smoke and the same reviewer's finding-specific confirmation are required. Any product need, unexpected path, smoke/cleanup failure, or further correction need stops.
  Date/Author: 2026-08-22 / project owner and primary coordinator.

- Decision: Accept the S2 evidence correction for fresh browser validation.
  Rationale: The lease closed compliant with only the authorized smoke path changed; inspection confirms additive three-width detail loading/not-found/error-retry, recovery/overflow, populated-detail, and rendered native/fallback square-geometry evidence while preserving the existing assertions. Static diff and strict type checks pass, and frozen product/component-test hashes are unchanged. This acceptance authorizes only the already-planned fresh smoke, aggregate refresh, and finding-specific confirmation.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Stop after the corrected smoke could not reach its isolated services.
  Rationale: The one authorized run passed both builds but fixture setup and cleanup received connection refusals on PostgreSQL 55432 and Redis 56400 before Chromium. The subsequent audit found the Docker daemon unavailable and no listeners on the isolated or web ports. The packet explicitly stops after any smoke or cleanup failure and grants no rerun budget, so the primary records invalid environment evidence and returns control to the project owner without changing the smoke or product.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Authorize one Docker-backed replacement smoke without changing candidate bytes.
  Rationale: The project owner explicitly resumed the stopped workflow after the complete environment diagnosis. The primary may start Docker, wait for isolated service readiness, and execute the unchanged corrected smoke once. This replaces only the invalid pre-Chromium attempt; it does not authorize any product/test edit, failure correction, or second replacement run.
  Date/Author: 2026-08-22 / project owner and primary coordinator.

- Decision: Accept corrected browser candidate `D4E87CB...FE3983` for finding-specific S2 confirmation.
  Rationale: Docker and both isolated services were healthy before the unchanged replacement run. Chromium executes the complete missing detail/native-image matrix at all three widths and passes with clean diagnostics and exact cleanup; independent database, cache, and web-port audits are empty. The candidate changes only the authorized smoke relative to the review's prior fingerprint and preserves all frozen product/component-test hashes.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Accept finding-specific S2 confirmation and complete Milestone 1.
  Rationale: The same reviewer reproduced the corrected aggregate, prior-candidate reconstruction, receipt, frozen hashes, exact code locations for every prior sub-gap, passing replacement browser identity, and cleanup. It reports zero Blockers and zero Majors; the only Minor is a stale current header, which the primary resolves without changing candidate bytes or acceptance scope. The verdict is closure-permitting for Milestone 1.
  Date/Author: 2026-08-22 / primary coordinator after independent review.

- Decision: Treat the first closure unit failure as a transient unrelated baseline anomaly and rerun the complete gate once.
  Rationale: No TASK-004 test, controller, Vitest configuration, or manifest byte changed. The aggregate failure hid its original direct-import error and matches a documented prior cold-aggregate anomaly; the exact unchanged focus immediately passes 1/1. The full rerun uses a fresh explicit `REDIS_NAMESPACE`, which the strict real-Redis tests already require and the closure command block previously left implicit. A repeated failure stops without a TASK-012 product change.
  Date/Author: 2026-08-22 / primary coordinator after persistent test-owner triage.

- Decision: Accept the authoritative closure packet for fresh integrated review.
  Rationale: Every closure command and cleanup audit exits zero on the unchanged candidate. The exact focused pass plus complete rerun resolves the initial aggregate anomaly without a code change; the fresh Redis namespace is empty afterward, as are every TASK-004 test database, smoke schema/namespace, web port, and temporary migration-fixture owner. Integrated review remains a separate fresh checkpoint.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Accept the fresh integrated review for documentation closure.
  Rationale: A fresh read-only reviewer authenticated the exact candidate and closure evidence, found no scope, implementation, TDD, accessibility, architecture, authorization, security, relevance, or cleanup defect, and returned closure-permitting `PASS WITH FOLLOW-UPS` with zero Blocker, zero Major, and one documentation-only Minor. The two stale current-state statements are corrected without changing candidate bytes; the documentation gate and authoritative status reconciliation remain coordinator-owned.
  Date/Author: 2026-08-22 / primary coordinator after independent review.

- Decision: Stop task-started infrastructure after validation while preserving reusable volumes.
  Rationale: All runtime gates and residue audits already passed. `docker compose stop postgres redis` stopped the exact PostgreSQL 18.6 and Redis 8.8.1 project containers with exit code 0, preserving volumes; a subsequent audit found no listener on 4173, 4174, 55432, or 56400.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Pass the task-closure documentation gate and complete TASK-012.
  Rationale: The integrated follow-up is corrected; every materially affected requirement, task, readiness, UI, system, specification-routing, ADR-annotation, review, plan-index, and execution owner is synchronized; active-location documentation, ADR, and diff checks pass. The candidate remains unchanged. AC-006 now has implementation, browser, closure, and independent-review evidence, so the primary may mark it and TASK-012 complete before the required plan lifecycle move.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Archive the completed ExecPlan and accept completed-location validation.
  Rationale: TASK-012 is `Complete` and its task-closure documentation gate already passed, satisfying the lifecycle precondition. The source and destination were resolved inside the repository, the destination did not exist, the stable filename/history were preserved, all inbound and moved-file-relative links were repaired, and documentation/ADR/diff checks pass with the active path absent and completed path present.
  Date/Author: 2026-08-22 / primary coordinator.

## Outcomes & Retrospective


TASK-012 is `Complete` and this plan is archived on corrected candidate `D4E87CB...FE3983`. Planning, activation, preflight, coherent Red, minimum frontend-visual Green, the LF prerequisite, all bounded corrections, complete browser matrix, finding-specific review, full static/test/lifecycle gates, independent integrated review, documentation correction, cleanup, task closure, and active/completed-location documentation gates pass. The prior Major and both review cycles' documentation Minors are resolved. AC-006, SPEC-007, and applicable HS-016/HS-017 behavior pass; minimum-assessment readiness is 11/12. No TASK-012 implementation or documentation work remains.

## Purpose / Big Picture


After separately authorized execution, visitors will be able to use the existing character list and detail flows at mobile, tablet, and desktop widths without required content leaving the viewport or recovery controls becoming unusable. Existing loading, empty, not-found, request-error, favorite/comment, navigation, and data behavior will remain intact.

When a governed avatar cannot load, the relevant card or detail view will preserve its square image region and character identity, show the exact visible text `Image unavailable`, and make no alternate image request or application retry. A reviewer will observe the result through focused semantic tests and the existing real Chromium smoke against deterministic local data and intercepted avatar responses.

## Context and Orientation


TASK-012 owns [NFR-001](../../REQUIREMENTS.md#nfr-001---frontend-technologies), [NFR-002](../../REQUIREMENTS.md#nfr-002---responsive-design), [NFR-005](../../REQUIREMENTS.md#nfr-005---usability), and [AC-006](../../REQUIREMENTS.md#8-minimum-acceptance-criteria). It also contributes to source-optional but repository-adopted OR-004 without changing that classification.

The governing architecture is [ADR-0009](../../adrs/0009-keep-frontend-state-close-to-its-owner.md), [ADR-0014](../../adrs/0014-persist-and-deliver-character-image-urls-directly.md), and [ADR-0016](../../adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md). AUTH-001 is `Authorized` only for the recorded personal, educational, non-commercial portfolio and exact direct-URL boundary. Any changed source, host, mapping, scope, provider condition, authorization status, proxy/byte ownership, or delivery mechanism stops image-specific work for owner reconciliation.

The observable rules are [SPEC-007](../../specs/SPEC.feature) and the TASK-012 error-layout portion of [HS-016](../../specs/HARD_SPEC.feature), with HS-017 controlling test relevance and milestone evidence. The visual authorities are the [data-driven constraints](../../ui/README.md#data-driven-design-constraints), [planned mockup coverage](../../ui/README.md#planned-mockup-coverage), and [responsive visual foundations](../../ui/visual-foundations.md#responsive-type-scale).

TASK-011 is `Complete`, so TASK-012's dependency is satisfied. Current source renders list and detail routes, exact native images, explicit data states, interaction states, responsive Grid/Flex layouts, accessible recovery controls, and the component-local layout-safe image fallback. The corrected Chromium smoke proves the complete three-width list/detail state matrix, Retry convergence, overflow safety, and successful native and fallback square geometry.

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

The separately owner-authorized prerequisite assignment `TASK-012-PR1-SETUP-01` uses the standard implementation profile because it changes only line-ending policy and a deterministic generated artifact, not visible UI. Under one fresh setup lease it may change only `.gitattributes` and the worktree materialization of `apps/web/src/data/generated/graphql.ts`. It must add only the path-specific `text eol=lf` rule, run the existing web GraphQL generator rather than hand-edit generated TypeScript, prove the generated file remains logically identical to HEAD, and pass the exact web GraphQL drift check. All product and test paths remain frozen. The primary must accept the closed-compliant receipt and actual diff before restarting Milestone 1 validation from its first command.

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

Budget: one preflight, one coherent Red or characterization route, one frontend Green with optional Refactor, and one review-correction loop. Earlier same-contract corrections are consumed. On 2026-08-22 the project owner explicitly authorized the previously unused S2 review-correction loop as one evidence-phase write to the existing smoke, one fresh isolated smoke, and finding-specific confirmation. No product or further correction budget exists. Stop after any smoke/cleanup failure, unexpected diff or path, required product/dependency/test-project owner, reuse or authority drift, AUTH-001 reopen trigger, unexpected public request, or further correction need.

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
$env:POSTGRES_PORT='55432'
$env:REDIS_PORT='56400'
$env:REDIS_NAMESPACE='character-app:test:<unique-run-id>'
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
- The prerequisite correction must use the existing GraphQL generator after the LF attribute is present. Never normalize the repository broadly, stage files to force renormalization, or edit generated TypeScript by hand. The only permitted policy path is `.gitattributes`, and the only permitted materialized artifact is `apps/web/src/data/generated/graphql.ts`.

## Artifacts and Notes


Planning baseline:

- branch: `main`, tracking `origin/main`;
- HEAD: `dda1ee9eae54f3a27a826d7f30e8e25ce4bb8d44`;
- worktree and index: clean;
- toolchain: Node.js `v24.18.0`, npm `11.16.0`, Playwright `1.61.1`;
- accepted reuse-audit ID: `TASK-012-REUSE-20260821-01`;
- ordered 21-path aggregate: `AB6F078B5CB071DACD1523B55F4E530FF5B8D8CC2BD4ACFF296939376B2F0F47`.

Activation evidence:

- workflow authorization: project-owner directive for `TASK-012-20260821-01` received in the coordinating task;
- branch and HEAD: clean `codex/execplan-012` at `39302e9ced72fd76431196449404abc6dc0db217`; planning baseline `dda1ee9eae54f3a27a826d7f30e8e25ce4bb8d44` is its direct ancestor, and the intervening commit changes only registered TASK-012 documentation;
- toolchain and runtime: Node.js `v24.18.0`, npm `11.16.0`, Playwright `1.61.1`, Docker Desktop `4.86.0` with Linux engine;
- guard and repository checks: all 26 lease-guard checks pass; documentation validation passes for 77 Markdown files and 123 scenarios; ADR validation passes for 18 ADRs and 38 mapped requirements with only the established NFR-006 warning; and `git diff --check` passes; and
- refreshed reuse audit: every `REUSE_AS_IS` and `EXTEND` owner remains present and sufficient, with the unchanged aggregate `AB6F078B5CB071DACD1523B55F4E530FF5B8D8CC2BD4ACFF296939376B2F0F47`.

Accepted handoff `TASK-012-M1-PREFLIGHT-01`:

- identity: workflow `TASK-012-20260821-01`, milestone `TASK-012-M1-RESILIENT-UI`, role `test_worker`, phase `preflight`, attempt 1, no lease or digest;
- paths: read-only inspection of the assigned 21-path projection; touched paths none; coordinator-owned documentation changes were preserved;
- command: `npm exec -- vitest run --config vitest.config.ts --project web-unit --project web-application apps/web/src/character-card.unit.test.tsx apps/web/src/character-detail-route.application.test.tsx` exited 0 with 2 files and 11 tests passing;
- classification: existing list/detail states, navigation, favorite/comment behavior, success images, 375/1280 layouts, the one-test browser boundary, deterministic success interception, diagnostics, and cleanup are `EXISTING_AND_COVERED`; 768 list/detail layout is `EXISTING_BUT_UNCOVERED`; card/detail fallback, current-image reset, and one-way no-retry behavior are `MISSING`; failed-avatar browser proof is `PARTIAL`; and no item is `CONFLICTING` or `UNKNOWN`;
- accepted outcome: coordinator-confirmed `PARTIAL` gap routed to one coherent guarded Red in `character-card.unit.test.tsx`, `character-detail-route.application.test.tsx`, and `walking-skeleton.smoke.test.ts`; and
- residual risk and documentation impact: browser geometry/request behavior remains non-reusable until fresh smoke; `Documentation impact: None - read-only preflight created no repository change.`

Accepted handoff `TASK-012-M1-RED-01`:

- identity: workflow `TASK-012-20260821-01`, milestone `TASK-012-M1-RESILIENT-UI`, role `test_worker`, phase `red`, attempt 1, lease `TASK-012-M1-RED-01-LEASE-03`, contract digest `24c648284423f09c8976fda03ede06da9696ef172d5f97e4ef0a84dd30a6f360`;
- lease: fresh `closed-compliant` receipt `9e454e23c4528815b5a788c6a82ebc387c65b333b96f6b57a46a309dd6d91169`, no forbidden/unleased/index/HEAD/control change, and no post-close drift at coordinator acceptance;
- paths: allowed and touched only `apps/web/src/character-card.unit.test.tsx`, `apps/web/src/character-detail-route.application.test.tsx`, and `tests/smoke/walking-skeleton.smoke.test.ts`; actual diff is 172 insertions and 5 deletions; unexpected paths none;
- command: the exact focused two-file Vitest command exited 1 with only the two new fallback tests failing because the native images remained and `Image unavailable` was absent; all 11 prior tests passed;
- frozen boundary: the three touched test paths and their observable contract are frozen for the rest of Milestone 1; post-Red hashes are `33F9C4BE...4C5316`, `ACAA4BE8...DD7A3`, and `523665C6...13079` respectively;
- evidence: the pre-write aggregate `AB6F078B...B2F0F47` is intentionally invalidated; refreshed 21-path post-Red aggregate `9938E07A24991BA99DE9BF0D0264C8EC70952727D5C2B831C59B6F315CA63F27` preserves every reuse disposition and unchanged production-owner hash; and
- outcome, residual risk, and documentation impact: `RED CONFIRMED`; the additive smoke contract remains unexecuted until post-Green Chromium validation; `Documentation impact: None - test-only Red changes do not change authoritative documentation; the primary recorded accepted evidence here.`

Guard-start note: proposed lease IDs `TASK-012-M1-RED-01-LEASE-01` and `TASK-012-M1-RED-01-LEASE-02` were rejected before assignment because directory-form forbidden scopes were treated as ignored by the guard. Neither returned a started object or digest, neither authorized work, and neither will be reused. The exact-file-only `LEASE-03` projection is the accepted guard contract.

Accepted handoff `TASK-012-M1-GREEN-01`:

- identity: workflow `TASK-012-20260821-01`, milestone `TASK-012-M1-RESILIENT-UI`, role `frontend_code_worker`, profile `frontend-visual`, phase `green`, attempt 1, lease `TASK-012-M1-GREEN-01-LEASE-01`, contract digest `c09284ddcf6c801c3bb1c78891829993f721c6967eca5280de7a00f1be2b8efd`;
- lease: fresh `closed-compliant` receipt `b27c62cc9bc9bf9053ff0f6be94f010f00ea095ef076b83d73ed4d9e4c6b609c`, no forbidden/unleased/index/HEAD/control change, and no post-close drift at coordinator acceptance;
- paths: allowed and touched only `apps/web/src/character-card.tsx`, `apps/web/src/character-detail-route.tsx`, and `apps/web/src/styles.css`; frozen tests remained at exact hashes `33F9C4BE4FE6C4D2FD16109B6A35FDDC8422EAF1EECC65AA2F884BF8044C5316`, `ACAA4BE8B73C69EB59101C8688FC6F99E2A5BB586E1F472DFB3952535F8DD7A3`, and `523665C6E1514D70E9A1A910199F0BE1A087CB58513A4BD88E344E33A9613079`;
- commands: the exact focused command first reproduced exit 1 with only the two accepted fallback failures and all prior 11 passing, then exited 0 after Green with 2 files and 13 tests passing; scoped `git diff --check` exited 0; no Refactor or post-Refactor rerun occurred;
- implementation: card/detail local state records only the failed current `imageUrl`; equality with the current URL controls one-way fallback and naturally reveals a different URL; existing native image attributes remain unchanged; existing CSS owners preserve a centered square region;
- candidate: refreshed 21-path Green aggregate `1C3EC8D038F5F86F76C2893F02F95570E3C02984460691ECC7E4EDD5FC94CE5D`; production hashes are `79BE8B60418A32478972A2DBAB1C2349DB19BA954EC4A55C6346FDA5817D950E`, `38B7C7F6D9A74F3CB8F37B8AD380572C9D78E6F968BE21FE51F4195443558887`, and `4E8CEE6FF5365CC6FDC92A74EA6610D614A6B4210E05022B532490AD74BDE3D9`;
- outcome, residual risk, and documentation impact: `GREEN CONFIRMED`; fresh Chromium milestone evidence remains required; `Documentation impact: None - the bounded worker edit adds no new owner or command, while the primary records evidence and later status changes.`

Milestone validation stopping record:

- candidate identity: 21-path aggregate `1C3EC8D038F5F86F76C2893F02F95570E3C02984460691ECC7E4EDD5FC94CE5D`; product/test bytes remain unchanged after Green;
- passed: all web unit/application projects, 9 files and 63 tests; root strict typecheck; targeted six-path `git diff --check`; affected relevance audit with one smoke test, no focused/skipped marker, and a current consumer for every new assertion/helper; documentation validation for 77 Markdown files and 123 scenarios; ADR validation for 18 ADRs and 38 mapped requirements with only the established NFR-006 warning;
- failed: `npm run build --workspace @rick-and-morty/web` exited 1 at `npm run graphql:check`; Codegen reported `src/data/generated/graphql.ts` stale before Vite or server TypeScript ran;
- diagnosis: tracked blob `3d4caf9e4558fe36dd7165b54a99153690a11330` is unchanged, LF blob size is 9,542 bytes, the CRLF working file is 9,676 bytes with 134 CRLF pairs, `core.autocrlf=true`, and the path has no explicit text/EOL attribute;
- skipped as dependent: Tailwind validation and `npm run test:smoke`, because the current built asset does not represent Green and smoke invokes the same failing web build; S2 review did not start because milestone validation is not closure-permitting;
- side effects and cleanup: no smoke process, PostgreSQL schema, Redis namespace, or browser run was started; existing healthy development PostgreSQL/Redis containers on ports 55432/56400 were observed but not mutated by the failed build; and
- stop and documentation impact: an excluded configuration/generated-path correction is required, so automatic continuation stops for project-owner direction. `Documentation impact: Updated the current status, active plan, plan index, and execution chronology to preserve the failed prerequisite and withheld evidence.`

Owner-authorized prerequisite packet `TASK-012-PR1-SETUP-01`:

- identity: workflow `TASK-012-20260821-01`, prerequisite cycle `TASK-012-PR1-GRAPHQL-LF`, role `code_worker`, profile `standard`, phase `setup`, attempt 1;
- allowed paths: `.gitattributes` and `apps/web/src/data/generated/graphql.ts`; every TASK-012 product/test path, GraphQL operation/configuration owner, manifest, lockfile, backend, fixture, lifecycle, and documentation path is forbidden;
- observable contract: `.gitattributes` assigns `text eol=lf` to the exact frontend generated path; `npm run graphql:generate --workspace @rick-and-morty/web` performs the materialization; the generated path remains logically identical to HEAD; `npm run graphql:check --workspace @rick-and-morty/web` and targeted `git diff --check` pass;
- frozen identity: the 21-path TASK-012 candidate remains `1C3EC8D038F5F86F76C2893F02F95570E3C02984460691ECC7E4EDD5FC94CE5D`; all three test hashes and three production hashes recorded above remain exact; and
- stopping conditions: any logical generated-content diff, unexpected path, generator/configuration change, product/test byte change, dependency change, failed guard, or second correction need returns control to the primary without further writes.

Accepted prerequisite handoff `TASK-012-PR1-SETUP-01`:

- lease: `TASK-012-PR1-SETUP-01-LEASE-01`, contract digest `38d5404ff01b8ba6b279e4382402f9e8e80beba59dfef27f4f1cdfa90fdb9138`, closed-compliant receipt `5157d42ffc0dc7ac9e63a97dd5fd5f86df5ffa46f138ec6489722183a692aeb6`, and no forbidden, unleased, HEAD, index, control, or post-close drift;
- paths: `.gitattributes` has one added exact rule; `apps/web/src/data/generated/graphql.ts` changed only in raw worktree materialization from CRLF to LF through the existing generator, with no logical diff;
- identity: generated raw SHA-256 `76BCFA425FB0672376A210C25F37D0E84E429AE39C47188D8C69F5A6BB4BA3A1`; working and HEAD Git blob ID `3d4caf9e4558fe36dd7165b54a99153690a11330`; `git check-attr` reports `text: set` and `eol: lf`;
- commands: GraphQL generation, GraphQL drift check, generated logical-diff check, targeted diff check, and guard verification all exited 0; and
- preserved boundary: refreshed TASK-012 21-path aggregate remains `1C3EC8D038F5F86F76C2893F02F95570E3C02984460691ECC7E4EDD5FC94CE5D`, and all six frozen test/production hashes remain exact. `Documentation impact: The primary records the separately authorized prerequisite correction and its accepted evidence; no product scope or acceptance state changes.`

First corrected-environment milestone validation attempt:

- passed: documentation/ADR/diff validation, all web unit/application projects at 9 files and 63 tests, root strict typecheck, web build including GraphQL drift and Vite output, Tailwind validation, and the affected relevance audit;
- browser run: isolated Chromium identity `9bdd0bf6aacd4bf0` on PostgreSQL `55432`, Redis `56400`, schema `t010_smoke_9bdd0bf6aacd4bf0`, and namespace `character-app:test:t010-smoke-9bdd0bf6aacd4bf0` reached the three-width state/fallback flow;
- failure: at `walking-skeleton.smoke.test.ts:1091`, the test expected two failed-avatar requests across list and SPA detail presentation but Chromium emitted one while both accessible square fallbacks were visible; no product, console, page, public-source, build, infrastructure, or unrelated assertion failed first;
- cleanup: matching `TASK010_SMOKE_CLEANUP` completed for the exact run identity; and
- disposition: invalid browser acceptance evidence; persistent test-owner triage returned `SAME-CONTRACT TEST ASSERTION DEFECT`, authorizing only correction assignment `TASK-012-M1-RED-CORRECTION-02` on the existing smoke path.

Correction packet `TASK-012-M1-RED-CORRECTION-02`:

- role/phase/attempt: persistent `test_worker`, `red` correction, attempt 2, using the existing one same-contract correction budget;
- allowed path: `tests/smoke/walking-skeleton.smoke.test.ts` only; all other test, product, configuration, generated, fixture, lifecycle, dependency, and documentation paths remain frozen;
- exact correction: preserve the card's exact `failedRequestsBefore + 1` assertion; immediately before SPA detail navigation record the total request index; after detail fallback/geometry/overflow assertions, require the new request slice to contain at most one item and require every item to equal `failedAvatarUrl`;
- validation: focused smoke must pass 1/1 with all three widths, fallbacks, geometry, overflow, diagnostics, public-request, and exact cleanup assertions; then refresh the smoke hash and 21-path candidate aggregate; and
- stopping conditions: more than one detail request, any alternate URL, missing/unsafe fallback, overflow, diagnostics/cleanup failure, another path need, or another correction need.

Accepted correction handoff `TASK-012-M1-RED-CORRECTION-02`:

- lease: `TASK-012-M1-RED-CORRECTION-02-LEASE-01`, contract digest `1f15c8e97c95698738da8e23f5671abd068058062590275e559d7db61a866657`, closed-compliant receipt `6893c8758d0bf088d954db5c862264fb62735ca0bab586f5acb4eb78dde5c895`, and no forbidden, unleased, HEAD, index, control, or post-close drift;
- paths: touched only `tests/smoke/walking-skeleton.smoke.test.ts`; every product, other test, configuration, generated, fixture, lifecycle, dependency, and documentation path remained frozen;
- exact diff: preserves the card's `failedRequestsBefore + 1` assertion, records the request index before detail navigation, permits at most one subsequent request, and requires every subsequent request to use the exact failed URL;
- evidence: targeted diff check exited 0; corrected smoke SHA-256 is `F3DE6D08E8DC4F387A8D310A4123054DBF039DCD55A9363307B64DFC2B2A2C76`; external smoke remains coordinator-owned and pending; and
- budget and documentation impact: the persistent test writer's sole same-contract correction is consumed. `Documentation impact: The primary records correction evidence; no product contract, accepted architecture, command, or acceptance state changed.`

Second corrected smoke stopping record:

- invalid run: Chromium identity `888867d5ae65c193`, schema `t010_smoke_888867d5ae65c193`, Redis namespace `character-app:test:t010-smoke-888867d5ae65c193`, PostgreSQL `55432`, and Redis `56400`;
- passed before failure: both builds and GraphQL drift, three-width state/request flow through the corrected request-count assertion, the visible accessible detail fallback, and all preceding behavior;
- failure: the page-level `getByRole("img", { name: "TASK-010 Character 15" })` resolved the list-card fallback during SPA replacement and its one-shot `boundingBox()` returned null after that node detached; the failure screenshot and page snapshot show the completed mobile detail route with the correct accessible square fallback;
- cleanup: matching `TASK010_SMOKE_CLEANUP` completed for the exact run identity;
- read-only classification: `SAME-CONTRACT TEST TIMING/LOCATOR DEFECT`, not a product defect, environment failure, or unknown; and
- current identity: the smoke-only correction changes the 21-path aggregate to `8F9C90C3563053D94A6AF66D1C6D050D964ADEA0D44AF4B829F8A15AB0B6744A`; this is a test-corrected but browser-unaccepted candidate, not milestone or acceptance evidence; and
- authorized next action: the persistent test owner may change only the current detail locator so it first selects the detail article containing level-2 heading `TASK-010 Character 15`, then selects the identically named image within that article. No other assertion/helper/production path may change; one fresh smoke must pass, and any further failure stops.

Owner-authorized correction-extension packet `TASK-012-M1-RED-CORRECTION-03`:

- guard assignment: cycle `TASK-012-M1-LOCATOR-CORRECTION`, assignment `TASK-012-M1-LOCATOR-RED-01`, persistent `test_worker`, phase `red`, guard-local attempt 1; cumulatively this is the third test write and final authorized test correction;
- allowed path: `tests/smoke/walking-skeleton.smoke.test.ts` only; every other test, product, configuration, generated, fixture, lifecycle, dependency, and documentation path remains frozen;
- exact edit: replace only the page-level detail fallback locator with a locator rooted at the current detail `article` containing the level-2 heading named `TASK-010 Character 15`, then select the identically named image within that article;
- preserved contract: every existing state, viewport, request-count, same-URL/no-retry, accessible-name/text, square-geometry, overflow, diagnostics, public-request, and cleanup assertion remains byte-for-byte unchanged;
- validation: targeted diff check, exact scoped diff/hash, then one coordinator-owned fresh `npm run test:smoke`; and
- stopping conditions: unexpected path or assertion change, lease failure, any fresh smoke failure, cleanup failure, or any further correction need.

Guard-start note: proposed lease `TASK-012-M1-RED-CORRECTION-03-LEASE-01` was rejected before creation because the guard permits only attempt 1 or 2. It returned no started object or contract digest, authorized no work, and will not be reused. The owner-authorized edit is unchanged and proceeds only through the distinct correction-cycle assignment above.

Accepted locator-correction handoff `TASK-012-M1-LOCATOR-RED-01`:

- lease: `TASK-012-M1-LOCATOR-RED-01-LEASE-01`, contract digest `d5263fe0c7a7e5170f9eb5c20c38486946b81bd4ebfe8e6b03fafd242bed5038`, closed-compliant receipt `18ec3622e60fba2c5102a128fabd53eb1d2e1907e8849eddf5db27ececf4ef10`, and no forbidden, unleased, HEAD, index, control, or post-close drift at acceptance;
- path: touched only `tests/smoke/walking-skeleton.smoke.test.ts`; all product, other test, configuration, generated, fixture, lifecycle, dependency, and documentation paths remained frozen;
- exact diff: introduced a detail-article locator filtered by the level-2 heading `TASK-010 Character 15` and selected the identically named image within that article; no assertion or helper changed;
- evidence: targeted diff check exited 0; corrected smoke SHA-256 is `83725373659936C2366E3BEF4D0567D047CB95A34A7D98B8996AB863125CF183`; and
- budget and documentation impact: no correction budget remains. `Documentation impact: The primary records the final correction evidence; no product contract, architecture, command, or acceptance state changed.`

S2-reviewed browser candidate, not accepted for Milestone 1:

- candidate: refreshed 21-path aggregate `78AEC4BA8A58D6EDA0EE84DC7A6AABFCAC28169F46C6BBB9EF4D71081625F237`; production hashes remain `79BE8B60...D950E`, `38B7C7F6...58887`, and `4E8CEE6F...DE3D9`; component-test hashes remain `33F9C4BE...4C5316` and `ACAA4BE8...DD7A3`; corrected smoke hash is `83725373...CF183`;
- executed before the smoke-only locator correction and reused because their exact commands, consumed production/configuration trees, toolchain, and environment remain unchanged: all web unit/application projects at 9 files and 63 tests, root strict typecheck, web build with GraphQL drift and Vite, Tailwind validation, documentation/ADR validation, and targeted diff checking;
- executed after the final correction: targeted diff/relevance audit found one active smoke, no focused/skipped marker, and a current consumer for every new helper/assertion; fresh host-permitted `npm run test:smoke` passed Chromium 1/1 in 6.4 seconds;
- browser identity: run `c0a9c55f982aa0f1`, schema `t010_smoke_c0a9c55f982aa0f1`, namespace `character-app:test:t010-smoke-c0a9c55f982aa0f1`, PostgreSQL `55432`, Redis `56400`, and migration build `66b43bbbad10d1f37e7cded0bcfabc9a017ddd94cf38c89286ade2741611abce`;
- browser result: list loading/empty/error-retry and populated list execute at 375 by 812, 768 by 1024, and 1280 by 800; populated detail executes at 1280/375; failed-image card/detail executes at all three widths; the asserted request, fallback geometry, overflow, diagnostics, and cleanup boundaries pass; `pageErrors=0`, `deliberateGraphqlFailures=3`, `allowedGraphql503=3`, and `unexpectedConsoleErrors=0`; and
- S2 disposition: initial detail loading/not-found/error-retry at all widths, populated detail at 768, recovery/overflow checks for those missing states, and successful native-image rendered square geometry remain absent. Matching READY/CLEANUP proves exact run cleanup but cannot cure missing scenarios. Milestone 1, AC-006, closure, commit, push, pull request, publication, and deployment remain withheld.

Fresh S2 review record:

- verdict: `REVISE`, not closure-permitting; no Blocker, one Major, one Minor;
- accepted: authority, scope, candidate/hashes, reuse/KISS/YAGNI, TDD ownership/frozen tests, five receipts, LF prerequisite separation, fallback state/semantics/accessibility, executed request/diagnostic/cleanup behavior, relevance, and withheld closure boundaries;
- Major: missing required detail loading/not-found/error-retry browser coverage at all widths, missing populated detail at 768, and missing rendered native-image square geometry;
- Minor: stale ExecPlan introduction, corrected by the primary in this reconciliation without changing candidate bytes; and
- authorized next action: the persistent test worker may extend only the existing smoke with deterministic missing detail scenarios, their recovery/overflow checks, populated 768 detail, and successful native-image square geometry; run one fresh isolated smoke, refresh the aggregate, and obtain finding-specific independent confirmation. No product change is authorized.

Owner-authorized S2 evidence-correction packet `TASK-012-M1-DETAIL-MATRIX-EVIDENCE-01`:

- identity: cycle `TASK-012-M1-DETAIL-MATRIX-CORRECTION`, persistent `test_worker`, phase `evidence`, guard-local attempt 1; this is the sole S2 review-correction write;
- classification: `EXISTING_BUT_UNCOVERED`; existing application tests and route behavior already own detail loading, not-found, error/retry, and populated states, so the worker adds passing browser characterization without changing product code or manufacturing Red;
- allowed path: `tests/smoke/walking-skeleton.smoke.test.ts` only; every product, configuration, generated, fixture, lifecycle, dependency, documentation, and other test path remains frozen;
- required additions: deterministic initial detail loading, not-found, and request-error/retry scenarios at 375 by 812, 768 by 1024, and 1280 by 800; populated detail at 768; recovery-control operability and no-horizontal-overflow assertions for the missing states; and rendered square-box geometry for successful native list/detail images;
- preservation: retain every existing list/detail interaction, failure fallback, request-count/same-URL/no-retry, accessibility, focus, diagnostics, public-request, and cleanup assertion; reuse existing interception, fixture, helper, route, and process owners; and
- validation/stops: worker runs only static/scoped checks and reports the new smoke hash; primary runs one fresh host-permitted smoke. Any product need, unexpected path/assertion weakening, failed run or cleanup, or further correction need stops. A pass requires refreshed aggregate and finding-specific confirmation from the same S2 reviewer.

Accepted S2 evidence-correction handoff `TASK-012-M1-DETAIL-MATRIX-EVIDENCE-01`:

- lease: `TASK-012-M1-DETAIL-MATRIX-EVIDENCE-01-LEASE-01`, contract digest `21059fe58f5ffbdddae23200380215cbe88e6d9d3000f17daf82222e35d7fd60`, closed-compliant receipt `2d7ba3857e8716f682590169014fa2864656758d4870d671a57862372f1e076c`, and no forbidden, unleased, HEAD, index, control, or post-close drift;
- path and classification: only `tests/smoke/walking-skeleton.smoke.test.ts` changed under `EXISTING_BUT_UNCOVERED`; every product, configuration, generated, fixture, lifecycle, dependency, documentation, and other test path remained frozen;
- evidence added: deterministic detail loading, not-found, request-error/Retry convergence, populated detail, and overflow checks at 1280 by 800, 768 by 1024, and 375 by 812, plus rendered square geometry for native list/detail images and the existing card/detail fallback matrix;
- static validation: targeted diff checking and root strict typecheck exit 0; smoke SHA-256 is `CC2FB736A546B473255C3C65948965C08FFA0E684B27B2A3C94D75BEE6FB0527`; all frozen product and component-test hashes remain unchanged; and
- boundary: no runtime pass is claimed by the worker handoff. The primary owns exactly one fresh isolated smoke, refreshed aggregate, and the same S2 reviewer's finding-specific confirmation; any failure or further correction need stops.

Corrected runtime stopping record:

- command: `POSTGRES_PORT=55432`, `REDIS_PORT=56400`, and `npm run test:smoke`; exit 1 after successful web/API builds and before Playwright/Chromium;
- failure: fixture setup could not connect to Redis `127.0.0.1:56400` or PostgreSQL `127.0.0.1:55432`; cleanup reported the same connection refusals, so no READY/CLEANUP pair or browser identity exists;
- audit: `docker compose ps --all` could not connect to the absent Docker engine, and `Get-NetTCPConnection` found no listeners on 4173, 4174, 55432, or 56400; no run-owned process or reachable isolated service remains;
- evidence disposition: invalid environment evidence, not a product/test failure or acceptance pass; no aggregate refresh or finding-specific review is permitted; and
- next boundary: project-owner direction is required before starting Docker and authorizing a replacement isolated smoke attempt. No smoke/product correction is indicated or authorized.

Owner-authorized replacement runtime packet:

- authority: the project owner's 2026-08-22 explicit continuation authorizes Docker Desktop startup and exactly one replacement `npm run test:smoke` with PostgreSQL 55432 and Redis 56400;
- frozen bytes: smoke hash remains `CC2FB736A546B473255C3C65948965C08FFA0E684B27B2A3C94D75BEE6FB0527`; every product, test, configuration, generated, dependency, fixture, and lifecycle path remains unchanged;
- readiness: the primary waits for Docker and the isolated service endpoints before consuming the replacement attempt;
- pass route: record READY/CLEANUP and browser evidence, refresh the 21-path aggregate, then request finding-specific confirmation from the same S2 reviewer; and
- stop route: any setup, browser assertion, diagnostic, process, or cleanup failure stops without a correction or second replacement run.

Accepted replacement browser candidate:

- candidate: refreshed ordered 21-path aggregate `D4E87CBED378F8C60A97714F46194D68E1515BB999968D00C49CE903A3FE3983`; corrected smoke hash `CC2FB736...B0527`; frozen product hashes `79BE8B60...D950E`, `38B7C7F6...58887`, and `4E8CEE6F...DE3D9`; frozen component-test hashes `33F9C4BE...4C5316` and `ACAA4BE...DD7A3`;
- environment: Docker server 29.7.2; healthy PostgreSQL 18.6-alpine on 55432 and Redis 8.8.1-alpine on 56400 before execution;
- browser: run `3d93ab11065f7744`, schema `t010_smoke_3d93ab11065f7744`, namespace `character-app:test:t010-smoke-3d93ab11065f7744`, migration build `66b43bbbad10d1f37e7cded0bcfabc9a017ddd94cf38c89286ade2741611abce`, Chromium 1/1 in 6.6 seconds;
- coverage: complete list and detail loading/empty-or-not-found/error/Retry/populated behavior, recovery controls, native and failed-image square geometry, request constraints, focus/interaction behavior, and horizontal overflow at 1280 by 800, 768 by 1024, and 375 by 812;
- diagnostics: `pageErrors=0`, `deliberateGraphqlFailures=3`, `allowedGraphql503=3`, and `unexpectedConsoleErrors=0`; no focused or skipped marker; and
- cleanup: matching READY/CLEANUP plus independently absent run schema, Redis namespace, and listeners on 4173/4174. Finding-specific S2 confirmation is the only remaining Milestone 1 barrier.

Accepted finding-specific S2 confirmation:

- verdict and candidate: `PASS WITH FOLLOW-UPS`, closure-permitting for Milestone 1, on reproduced aggregate `D4E87CBED378F8C60A97714F46194D68E1515BB999968D00C49CE903A3FE3983`;
- counts: zero Blocker, zero Major, one documentation-only Minor;
- Major closure: detail loading, not-found/navigation recovery, request error/Retry convergence, populated detail, and overflow execute at all three widths; native list/detail square geometry is asserted; every earlier fallback/request/diagnostic/focus/cleanup assertion remains;
- identity: correction receipt, smoke/product/component-test hashes, prior-candidate reconstruction, replacement run, and cleanup all reproduce; and
- follow-up: the primary synchronizes the stale ExecPlan header in this update. Milestone 1 is complete; closure evidence and AC-006 remain separate.

Authoritative closure packet:

- static/build: root typecheck, root build with both GraphQL drift checks, Tailwind validation, documentation validation for 78 Markdown files and 123 scenarios, ADR validation for 18 ADRs/38 requirements with only the established NFR-006 warning, `git diff --check`, relevance/no-focused-or-skipped audit, and candidate recomputation all pass;
- initial unit stop: the first `npm test` passed 31/32 files and 181/182 tests, then unchanged TASK-004 default-entry coverage reported a hidden direct-import observation failure. No TASK-004/test-configuration/manifest byte changed; persistent test-owner triage classified unrelated-baseline `UNKNOWN`, and the exact unchanged focus passed 1/1 in 197 ms;
- decisive full rerun: with `REDIS_NAMESPACE=character-app:test:t012-closure-20260822-0839`, unit passes 32 files/182 tests, real PostgreSQL/Redis integration 12 files/77 tests, application 7 files/37 tests, and Chromium smoke 1/1;
- closure smoke: run `151bf97dd8f1f4b9`, schema `t010_smoke_151bf97dd8f1f4b9`, namespace `character-app:test:t010-smoke-151bf97dd8f1f4b9`, migration build `66b43bb...61abce`, 6.4 seconds, zero page errors, three deliberate/allowed GraphQL diagnostics, zero unexpected console errors, and matching READY/CLEANUP;
- lifecycle: 7/7 pass for normal completion, startup conflict, assertion failure, readiness timeout, post-readiness owned API exit, forced cancellation, and forced interruption; each case reports exact cleanup;
- residue: no `task_004_*` database, `t010_smoke_*` schema, closure or smoke Redis key, 4173/4174 listener, focused/skipped marker, or temporary migration-fixture child remains; and
- identity: the 21-path aggregate remains `D4E87CBED378F8C60A97714F46194D68E1515BB999968D00C49CE903A3FE3983`. This packet joins with the closure-permitting integrated review and passing documentation gate to complete AC-006 and TASK-012.

Fresh integrated review and post-validation infrastructure cleanup:

- verdict: closure-permitting `PASS WITH FOLLOW-UPS` on authenticated aggregate `D4E87CBED378F8C60A97714F46194D68E1515BB999968D00C49CE903A3FE3983`, with zero Blocker, zero Major, and one documentation-only Minor;
- coverage: NFR-001, NFR-002, NFR-005, AC-006, adopted OR-004, SPEC-007, HS-016, applicable HS-017, ADR-0009, ADR-0014, ADR-0016, AUTH-001 continuity, scope control, TDD/lease chronology, reuse, accessibility, image/request behavior, relevance, security, runtime identity, diagnostics, and cleanup all pass;
- follow-up: the stale task-status row and stale ExecPlan context statement are corrected in the documentation-closure cycle without changing candidate bytes; and
- final service state: the exact task-started PostgreSQL and Redis containers stopped with exit code 0 without volume deletion, and ports 4173, 4174, 55432, and 56400 have no listeners.

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

2026-08-21: Activated project-owner-authorized workflow `TASK-012-20260821-01` after TASK-011/AUTH-001 continuity, clean-tree reconciliation, exact toolchain and Docker checks, the 26-check lease-guard self-test, documentation/ADR/diff validation, and a refreshed unchanged 21-path reuse aggregate. TASK-012 is `In progress`; Milestone 1 preflight is next, and no product/test behavior or AC-006 evidence has yet changed.

2026-08-21: Accepted read-only preflight `TASK-012-M1-PREFLIGHT-01`. The exact focused scope passed 11/11, existing responsive/state/interaction/success-image behavior was preserved, and the explicit missing/partial gap was narrowed to component-local fallback semantics, the 768 join, and deterministic failed-avatar browser evidence. One guarded coherent Red is next.

2026-08-21: Accepted and froze coherent Red `TASK-012-M1-RED-01` after compliant receipt `9e454e23...d91169`, actual three-file diff inspection, and exact focused failure of only the two new fallback tests with all prior 11 tests passing. The refreshed post-Red reuse projection is `9938E07A...CA63F27`; a separate guarded frontend-visual Green is next.

2026-08-21: Accepted frontend-visual Green `TASK-012-M1-GREEN-01` after compliant receipt `b27c62cc...6b609c`, reproduced Red, focused 13/13 pass, exact frozen-test hashes, actual three-file production diff inspection, and no Refactor. Candidate aggregate `1C3EC8D0...FC94CE5D` advances to milestone validation and fresh Chromium evidence.

2026-08-21: Milestone validation stopped after web tests 63/63 and root typecheck passed but the authoritative web build failed its existing GraphQL drift prerequisite on CRLF materialization of `apps/web/src/data/generated/graphql.ts`. Diff, relevance, documentation, and ADR checks pass; Tailwind, smoke, S2 review, closure, and AC-006 remain unclaimed. Owner reconciliation is required before any excluded configuration or generated-path change.

2026-08-21: The project owner explicitly authorized continuation with the separately scoped LF-materialization prerequisite correction. Assignment `TASK-012-PR1-SETUP-01` may add only the exact `.gitattributes` LF policy and canonically regenerate the one frontend generated file under a fresh standard setup lease. Product/test bytes and the candidate aggregate remain frozen; all milestone commands will be repeated before S2 review, and AC-006 remains unclaimed.

2026-08-21: Accepted prerequisite setup `TASK-012-PR1-SETUP-01` after compliant receipt `5157d42f...2aeb6`. The exact LF attribute, generator-owned raw rematerialization, unchanged logical generated blob, passing drift/diff checks, and frozen TASK-012 aggregate are verified. Repeated milestone validation is next; S2 review, closure, and AC-006 remain unclaimed.

2026-08-21: Repeated corrected-environment web tests 63/63, root typecheck, web build/GraphQL drift, Tailwind, relevance, diff, documentation, and ADR checks passed. Chromium run `9bdd0bf6aacd4bf0` rendered the exact accessible square fallbacks at the required widths and cleaned up, but failed one assertion that required a second native request after SPA navigation. Persistent test-owner triage classified the browser-cache assumption as a same-contract test defect. One smoke-only attempt-2 correction is next; no milestone, S2, closure, or AC-006 claim is made.

2026-08-21: Accepted the sole same-contract smoke assertion correction after compliant receipt `6893c875...5c895`. The corrected smoke preserves exact card request proof and rejects multiple or alternate detail requests while allowing browser reuse of the same failed decode. Fresh corrected Chromium evidence and the refreshed candidate aggregate are next; no milestone, S2, closure, or AC-006 claim is made.

2026-08-21: Corrected Chromium run `888867d5ae65c193` passed the request correction and visibly rendered the correct accessible square mobile detail fallback, then failed because the unscoped page-level image locator resolved the detaching list card during SPA replacement; exact cleanup passed. Persistent test-owner triage classified a second same-contract timing/locator defect and proposed one exact article-scoped locator repair. Automatic continuation stopped because that writer's sole correction is consumed. Owner budget extension is required before any further smoke edit; S2, closure, and AC-006 remain unclaimed.

2026-08-21: The project owner explicitly extended the persistent test writer's correction budget by one exact smoke-only locator edit. Attempt 3 may scope only the detail fallback locator through the semantic detail article; every assertion and all other paths remain frozen. One fresh smoke follows, and any subsequent failure stops. S2, closure, and AC-006 remain unclaimed.

2026-08-21: The guard rejected the proposed cumulative-attempt-3 lease before creation because its attempt field permits only 1 or 2. No lease, digest, pointer, or write authority existed. The same final owner-authorized edit is routed through distinct correction cycle `TASK-012-M1-LOCATOR-CORRECTION`, guard-local attempt 1, assignment `TASK-012-M1-LOCATOR-RED-01`; cumulative budget and scope do not change.

2026-08-21: Accepted final locator correction `TASK-012-M1-LOCATOR-RED-01` after compliant receipt `18ec3622...4ef10`. Only the detail-article-scoped locator changed, every assertion and all product/other-test bytes remained frozen, and targeted diff checking passes. One fresh smoke is next; any failure stops. S2, closure, and AC-006 remain unclaimed.

2026-08-21: Accepted corrected browser run `c0a9c55f982aa0f1` for its asserted scope and froze candidate `78AEC4BA...25F237` for fresh S2 review. The run passed list states at all widths, populated detail at 1280/375, failed-image card/detail at all widths, asserted request/overflow behavior, zero page errors, only three expected GraphQL 503 diagnostics, zero unexpected console errors, and exact cleanup. Milestone 1, AC-006, closure, commit, push, pull request, publication, and deployment remain unclaimed.

2026-08-21: Fresh S2 review reproduced candidate `78AEC4BA...25F237` and returned non-closure-permitting `REVISE`. Product fallback, accessibility, scope, TDD, leases, request behavior, executed browser assertions, diagnostics, and cleanup pass. The sole Major is missing required detail loading/not-found/error-retry coverage at all widths, populated detail at 768, and successful native-image square geometry. The stale-introduction Minor is corrected; complete-matrix overclaims are reconciled. At that stopping point no correction budget remained, so Milestone 1, AC-006, and closure stayed withheld pending owner direction.

2026-08-22: The project owner explicitly authorized one S2 review-correction evidence cycle limited to the existing smoke. The persistent test worker may characterize the missing detail-state/768/native-image geometry matrix; the primary then runs one fresh isolated smoke, refreshes the candidate, and returns to the same reviewer for finding-specific confirmation. No product or further correction budget is authorized; Milestone 1, AC-006, and closure remain withheld.

2026-08-22: Accepted S2 evidence correction `TASK-012-M1-DETAIL-MATRIX-EVIDENCE-01` after closed-compliant receipt `2d7ba385...e076c`. Only the existing smoke changed, the additive three-width detail/native-image evidence is present, targeted diff checking and root typecheck pass, and frozen product/component-test hashes remain unchanged. Fresh isolated browser execution, aggregate refresh, and finding-specific confirmation are next; Milestone 1, AC-006, and closure remain withheld.

2026-08-22: The sole authorized corrected smoke stopped before Chromium because Docker was unavailable and fixture setup/cleanup could not connect to isolated PostgreSQL 55432 or Redis 56400. Both builds passed; a subsequent port audit found no listeners or run-owned processes. This is invalid environment evidence and creates no corrected aggregate. The explicit stop condition withholds rerun and finding-specific confirmation pending project-owner direction; Milestone 1, AC-006, and closure remain withheld.

2026-08-22: The project owner explicitly authorized Docker Desktop startup and exactly one replacement isolated smoke against unchanged corrected bytes. A pass permits aggregate refresh and finding-specific S2 confirmation; any replacement failure stops without correction or another runtime attempt. Milestone 1, AC-006, and closure remain withheld.

2026-08-22: Accepted corrected candidate `D4E87CB...FE3983` after replacement Chromium run `3d93ab11065f7744` passed 1/1 in 6.6 seconds with the complete three-width matrix, clean diagnostics, matching READY/CLEANUP, and independent empty schema/namespace/web-port audits. The same S2 reviewer must now confirm closure of its Major; Milestone 1, AC-006, and closure remain withheld.

2026-08-22: Accepted finding-specific closure-permitting `PASS WITH FOLLOW-UPS` on corrected candidate `D4E87CB...FE3983`. The same reviewer closed the prior Major with reproduced coverage, identity, receipt, frozen hashes, and cleanup evidence. The primary resolved the sole stale-header Minor and completed Milestone 1. Closure validation, integrated review, documentation closure, and AC-006 remain pending.

2026-08-22: Passed the authoritative closure packet on unchanged candidate `D4E87CB...FE3983`. The first unit aggregate's unchanged TASK-004 anomaly was rejected after exact focus 1/1 and a complete decisive rerun: unit 182/182, integration 77/77, application 37/37, Chromium 1/1, lifecycle 7/7, static/documentation/relevance gates, and all residue audits pass. Fresh integrated review and documentation closure remain before AC-006 or TASK-012 changes state.

2026-08-22: Fresh integrated review returned closure-permitting `PASS WITH FOLLOW-UPS` on unchanged candidate `D4E87CB...FE3983`, with zero Blocker, zero Major, and one documentation-only Minor covering two stale current-state statements. The primary corrected both statements and stopped the task-started PostgreSQL/Redis containers cleanly without deleting their volumes; the task documentation gate, authoritative status reconciliation, and plan archival remain.

2026-08-22: The active-location task-closure documentation gate passed after synchronizing every affected current-state owner. TASK-012 and AC-006 are now complete, SPEC-007 and applicable HS-016/HS-017 behavior pass, and minimum-assessment readiness advances to 11/12. Candidate `D4E87CB...FE3983` is unchanged. Required completed-plan archival and completed-location link validation are the final lifecycle steps; no commit, push, pull request, publication, or deployment is authorized.

2026-08-22: Archived the completed ExecPlan under `docs/plans/completed/` with its stable filename and full history, repaired every inbound and moved-file-relative link, and passed completed-location documentation/ADR/diff validation. The active path is absent and completed path present. TASK-012 has no remaining work; no commit, push, pull request, publication, or deployment was authorized or performed.
