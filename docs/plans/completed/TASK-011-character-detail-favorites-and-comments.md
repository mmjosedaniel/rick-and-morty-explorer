# Deliver TASK-011 Character Detail, Favorites, and Comments


- Status: Complete; integrated acceptance and task-closure documentation gate passed
- Task: [TASK-011](../../IMPLEMENTATION_PLAN.md#task-011---deliver-character-detail-favorites-and-comments)
- Plan ID and prospective workflow ID: `TASK-011-20260821-01`
- Created: 2026-08-21
- Last updated: 2026-08-21
- Governing convention: [PLANS.md](../../../PLANS.md)

This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.

The project owner authorized this ExecPlan on 2026-08-21. TASK-011 and workflow `TASK-011-20260821-01` are `Complete` after two accepted product milestones, cumulative relevance review, the authoritative closure packet, fresh integrated acceptance, and the task-closure documentation gate. Activation itself remains historical chronology rather than implementation or acceptance evidence.

## Progress


- [x] (2026-08-21) Read TASK-011, its mapped requirements, accepted ADRs, routed specifications, UI authorities, completed TASK-008/TASK-010 evidence boundaries, manifests, frontend source, test projects, and the current browser-smoke lifecycle.
- [x] (2026-08-21) Completed reuse audit `TASK-011-REUSE-20260821-01` against the application/test baseline at clean `main` HEAD `a6574e2` and the synchronized planned UI authority, with relevant-tree aggregate `D0B217AD16FF5FB8929DEF95290FB09D1B151CD6C6DAB5D10327C17E077D869A`.
- [x] (2026-08-21) Recorded the proportional TASK-011 execution choices in [DPL-DEC-051](../../execution/decision-and-progress-log.md#decision-log): one cohesive detail route, inline interaction controls, default bounded comment reads, no pagination control, exact target-detail refetching, and reuse of the existing frontend/data/test boundaries.
- [x] (2026-08-21) Registered this planning-only ExecPlan and kept TASK-011 `Pending`.
- [x] (2026-08-21) Passed documentation validation for 74 Markdown files and 123 scenarios, ADR validation for 18 ADRs and 38 mapped requirements with only the established NFR-006 warning, `git diff --check`, task-state readback, and a documentation-only scope audit.
- [x] (2026-08-21) Received project-owner execution authorization; confirmed TASK-008/TASK-010 `Complete`, DG-003/DG-006 `Resolved`, AUTH-001 `Authorized` without a reopen trigger, a clean branch baseline, the exact accepted reuse aggregate, healthy local PostgreSQL/Redis, and transitioned TASK-011 to `In progress` under workflow `TASK-011-20260821-01`.
- [x] (2026-08-21) Validated activation with documentation validation for 74 Markdown files and 123 scenarios, ADR validation for 18 ADRs and 38 requirements with only the established NFR-006 warning, all 26 lease-guard self-tests, `git diff --check`, task/gate/authorization readback, and inspection of the six-document activation diff.
- [x] (2026-08-21) Accepted Milestone 1 read-only preflight `TASK-011-M1-PREFLIGHT-01` as `MISSING`: the card link, detail route/operation/query key/decoder/application coverage, and detail smoke assertions are absent; the existing API schema and smoke lifecycle are sufficient without a new fixture or process owner.
- [x] (2026-08-21) Accepted Milestone 1 Red `TASK-011-M1-RED-01`: lease `TASK-011-M1-DETAIL-RED-04` closed compliant at receipt `038b23fe28aeb74f6013199a334e5b147358b64c8999408d4c7c3a4841c7fef1`, and the focused scope failed only for the missing route, card link, detail query owner, and detail decoder while 28 existing tests remained green.
- [x] (2026-08-21) Accepted Milestone 1 Green and both bounded corrections: the eight-path production lease closed compliant at `0798add61381b9d264dc3a75181a972c8e0228c63def41204888e4655c191142`; the test-harness type correction closed at `9fc312824c16e831f8ac8b3a2565bcbbb88b6eff6ee1bb5e847399efced0a700`; and the card semantic-spacing correction closed at `5b5a9a236780640a21eb8208080f824e04207d1b993abc483ea7e40c1a331141`.
- [x] (2026-08-21) Passed the Milestone 1 candidate boundary at 14-path aggregate `B67647FD02208CC204B650BBC46D6B4C3FEC802065F9FB8DA7EC227B64877EE3`: web unit 33/33, application 17/17, root typecheck, web build/GraphQL drift, Tailwind validation, targeted diff checking, and isolated Chromium smoke 1/1 at both required viewports passed; smoke run `7dad27de89543d45` logged matching READY and CLEANUP on PostgreSQL `55432` and Redis `56400`.
- [x] (2026-08-21) Reconciled the fresh Milestone 1 S2 verdict as `REVISE`: one Major proves that the new full-card link's outside focus outline can be clipped by the card boundary while the smoke checks computed outline properties only. Milestone 1 remains unaccepted, and automatic continuation stopped because both writer correction budgets are exhausted.
- [x] (2026-08-21) Received project-owner authorization for one additional bounded `TASK-011-M1-FOCUS` correction subcycle: the persistent test worker may change only the existing smoke to prove visible linked-card focus, the frontend worker may then change only `styles.css`, and fresh Chromium plus S2 confirmation remain mandatory.
- [x] (2026-08-21) Accepted `TASK-011-M1-FOCUS` Red at receipt `d83b9b9cb9a216f5fe41156dad8789fdf35685939f1f17b19fc79abbd9444995`: Chromium proved the focused outline's painted bounds extend four pixels beyond the overflow-hidden card on every side, and run `6c1b10b8c48866d1` logged exact cleanup.
- [x] (2026-08-21) Completed the bounded focus correction at corrected 14-path aggregate `D37E3D31128E367E0A6D440B2E566CF3459ACEBAB2AD2867F42683F951496F2D`: styles Green receipt `bb6393996cdf6348ce696ceacb6fe4131842da48b86c6b80270a40c5be09b3c5` preserves the 2-pixel/3-pixel-offset focus treatment without ancestor clipping; smoke correction receipt `01dc96e558f06abfd18a762bed445bafb97cf1034682c1b07e5faf0184db12d7` removes the detail-heading race; Chromium run `c883edbe25d84402` passed 1/1 with exact cleanup.
- [x] (2026-08-21) Completed Milestone 1 after finding-specific S2 confirmation reproduced aggregate `D37E3D31128E367E0A6D440B2E566CF3459ACEBAB2AD2867F42683F951496F2D`, closed the visible-focus Major, preserved every other accepted checklist item, and returned `PASS` with no Blocker, Major, or Minor.
- [x] (2026-08-21) Refreshed Milestone 2 reuse audit `TASK-011-REUSE-20260821-02` across the accepted 14-path M1 candidate, TASK-008 schema/resolver/integration evidence, API composition, and the unchanged smoke fixture/orchestrator at 21-path aggregate `EE05431D7F216F17FB12DA9FAFE385C97DAF80C9E064902915A77986CA26A6CD`; the planned EXTEND/REUSE_AS_IS dispositions remain unchanged.
- [x] (2026-08-21) Accepted fresh Milestone 2 preflight `TASK-011-M2-PREFLIGHT-01` as `MISSING`: the route has a disabled favorite display and no comment form, mutation operation/decoder/coordinator/pending/failure/convergence behavior is absent, while TASK-008 and the current single smoke provide the complete reusable backend and lifecycle boundary.
- [x] (2026-08-21) Accepted Milestone 2 Red `TASK-011-M2-RED-01`: lease `TASK-011-M2-INTERACTIONS-RED-01` closed compliant at receipt `3b292127474ea6419d9a131ce1f48fb0ccbb8260f0a97574916edfb6b6a50f63`; the focused scope ran 43 tests with 32 accepted M1 passes and 11 intended failures only for the missing coordinator, mutation decoders, and route interaction behavior.
- [x] (2026-08-21) Accepted Milestone 2 Green: lease `TASK-011-M2-INTERACTIONS-GREEN-01` closed compliant at receipt `fef80b354ef8a3a3f0de4216071b4670a1d4c56a4e1af7f830275c88a45fb978`, changing only the six approved existing production/generated owners; the final focused boundary passed 43/43 and root typecheck passed while all four Red paths remained frozen.
- [x] (2026-08-21) Accepted the one Milestone 2 test-role correction at receipt `0925961b637bdd11311f77a81e387df62180234fd61aa1e67ab45b24e3e64831`: the mobile focus step now uses real Tab navigation rather than programmatic focus, and isolated Chromium run `423c0d58e0d1c77f` passed the complete interaction/persistence flow with matching cleanup.
- [x] (2026-08-21) Passed the Milestone 2 candidate boundary at 14-path aggregate `AC6047D66FF07F60EAA8D4D15622095F7C64691EB8DD76334446CDDFE960304E`: web unit 38/38, application 23/23, root typecheck, web build/GraphQL drift, Tailwind validation, targeted diff checking, and the corrected Chromium smoke passed. Fresh S2 review remains open.
- [x] (2026-08-21) Reconciled the fresh Milestone 2 S2 verdict as `REVISE`: one Major proves that the favorite operation and its frozen decoder test request and require full detail even though this plan's binding interface requires the ID-only mutation payload. Milestone 2 remains unaccepted, and automatic continuation stopped because the test-role correction budget is exhausted.
- [x] (2026-08-21) Received project-owner authorization for one additional bounded Milestone 2 correction cycle: the persistent test worker may reconcile only the favorite operation/decoder application fixtures and decoder contract to ID-only; a standard implementation worker may then narrow only the nonvisual operation, generated output, and decoder; focused, affected, browser, fingerprint, and S2 evidence must be refreshed.
- [x] (2026-08-21) Accepted corrective Red `TASK-011-M2-OPERATION-RED-01`: lease closed compliant at receipt `8a3cb5c33494535513773b2c620954d7f8c1be1881289cc940cba4cf6aec61f6`; the focused scope ran 43 tests with 40 passes and three intended failures only for the current full-detail favorite document/decoder, freezing corrected application hash `40D0F913...` and executor-test hash `3EC7297D...`.
- [x] (2026-08-21) Accepted corrective Green `TASK-011-M2-OPERATION-GREEN-01`: lease closed compliant at receipt `82f8235b9dbaa2d0772f1d94bbc7e10c9dbe9eca3732c00e895781524e8b85c3`, changing only the operation source, regenerated output, and decoder; focused 43/43, root typecheck, and web build/GraphQL drift passed with the corrected tests unchanged.
- [x] (2026-08-21) Refreshed the corrected Milestone 2 boundary at 14-path aggregate `2108E6AFFFC599B3A4F486D02DDC0D7E6D30D241AFD3FFF0433B31DBD437D42D`: web unit 38/38, application 23/23, typecheck, web build/GraphQL drift, Tailwind, and isolated Chromium run `09d8bfce4d9e9b5b` passed with the ID-only favorite request, full interaction persistence, zero unexpected browser errors, and exact cleanup. Finding-specific S2 confirmation remains open.
- [x] (2026-08-21) Completed Milestone 2 after finding-specific S2 confirmation reproduced corrected candidate `2108E6AFFFC599B3A4F486D02DDC0D7E6D30D241AFD3FFF0433B31DBD437D42D`, closed the ID-only operation Major, preserved every previously passing interaction/reuse/scope item, and returned `PASS WITH FOLLOW-UPS`; the sole stale-current-status follow-up is synchronized before closure validation.
- [x] (2026-08-21) Completed Milestone 3: cumulative relevance returned `PASS`; candidate `2108E6AFFFC599B3A4F486D02DDC0D7E6D30D241AFD3FFF0433B31DBD437D42D` passed root typecheck/build/Tailwind, unit 181/181, integration 77/77, application 36/36, Chromium 1/1, lifecycle 7/7, documentation/ADR/diff checks, and exact external cleanup; fresh integrated review returned closure-permitting `PASS WITH FOLLOW-UPS`, and the sole revision-history Minor was resolved before status closure and archival.

## Surprises & Discoveries


- Observation: The generated frontend schema types already include `CharacterDetail`, `Mutation`, `setCharacterFavorite`, and `addCharacterComment`, but the checked-in client operation source contains only the list query. Generated schema awareness is not an implemented detail query or mutation path.
  Evidence: `apps/web/src/data/generated/graphql.ts`; `apps/web/src/data/characters.graphql`.

- Observation: `CharacterCard` deliberately has no link, and `App` registers only `/`. TASK-011 navigation is therefore missing rather than an extension of an already hidden detail route.
  Evidence: `apps/web/src/character-card.tsx`; `apps/web/src/app.tsx`; `apps/web/src/character-card.unit.test.tsx`.

- Observation: TASK-010 already supplies the reusable Query provider, generic typed GraphQL executor, stable error object, query-key owner, application shell, visual tokens, exact native-image attributes, route/application test projects, isolated PostgreSQL/Redis smoke fixture, one Chromium project, and repository-owned lifecycle orchestration. Replacing or duplicating any of these would be unnecessary.
  Evidence: `apps/web/src/data/`, `apps/web/src/shell.tsx`, `apps/web/src/styles.css`, `vitest.config.ts`, `tests/smoke/`, and `scripts/run-smoke.ts`.

- Observation: The UI authority left comment pagination as a presentation question even though TASK-006 already proves default-20, maximum-50, newest-first reads. TASK-011 can satisfy every mapped requirement with the default page because a newly added comment is newest and therefore appears in that page.
  Evidence: `docs/ui/README.md`, ADR-0005, ADR-0006, SPEC-005, and completed TASK-006/TASK-008 evidence.

- Observation: The activation worktree began as a clean `codex/execplan-011` branch at `cf30011c4b982b0422d2a336a2d2e2e720479355`, one planning commit beyond the plan's historical `main` baseline. The application/test projection stayed byte-identical, while the coordinator-owned UI-authority status update refreshed the 23-path aggregate.
  Evidence: `git status --short --branch`, `git rev-parse HEAD`, planning aggregate `D0B217AD16FF5FB8929DEF95290FB09D1B151CD6C6DAB5D10327C17E077D869A`, and activation aggregate `B35B6C42F06801AAE3C5FCD36CE0B19153785CFFDE36D66941CBBE1A08882A1E`.

- Observation: A no-lease Vitest preflight could mutate the existing repository-local Vitest cache, so the test worker correctly used static source/status evidence and withheld runtime evidence until the guarded Red assignment.
  Evidence: `TASK-011-M1-PREFLIGHT-01`; existing `node_modules/.vite/vitest` cache ownership; `vitest.config.ts`.

- Observation: The first complete Milestone 1 typecheck found a test-spy typing error even though the focused runtime tests were green. The bounded test-owner correction used the real `QueryClient` type without changing an assertion or product behavior.
  Evidence: `TS2769` at `apps/web/src/app.application.test.tsx:21`; correction receipt `9fc312824c16e831f8ac8b3a2565bcbbb88b6eff6ee1bb5e847399efced0a700`.

- Observation: The first infrastructure-backed smoke reached the existing list contract and found that moving the card content into a link had removed the explicit semantic separator between name and species. The bounded frontend correction restored only `{" "}`; the next owned smoke passed the list and new detail contracts and cleaned its run identity.
  Evidence: failed smoke run `1e926e185c82505e`; passing smoke run `7dad27de89543d45`; correction receipt `5b5a9a236780640a21eb8208080f824e04207d1b993abc483ea7e40c1a331141`.

- Observation: Computed `outline` values do not prove that a focus indicator is visibly painted when an ancestor clips overflow. The card keeps `overflow: hidden`, while the linked-card focus rule paints its outline outside the link with a positive offset.
  Evidence: fresh Milestone 1 S2 review; `apps/web/src/styles.css`; `tests/smoke/walking-skeleton.smoke.test.ts` focus helper.

- Observation: After the styles-only focus fix passed the new geometry assertion, the mobile detail helper could advance on the list card's same-name heading before route navigation committed, then fail strict `Human` lookup against eight list cards. The retained failure screenshot and accessibility snapshot show the intended detail route rendered, so this is a smoke-locator race rather than a CSS/navigation regression.
  Evidence: smoke run `e9354c2e1442ab11`; retained Playwright screenshot, trace, and error context; the helper's unscoped heading lookup before its species assertion.

- Observation: Programmatic Playwright focus does not establish the keyboard modality required for Chromium's `:focus-visible` matching. The initial Milestone 2 smoke passed persistence, failure, refetch, and reload checkpoints but failed only that mobile focus-style assertion; the bounded correction reset focus and used Tab traversal through the Back link to the favorite button before Enter activation.
  Evidence: failed smoke run `9c476238c7dd54d7`; passing smoke run `423c0d58e0d1c77f`; correction receipt `0925961b637bdd11311f77a81e387df62180234fd61aa1e67ab45b24e3e64831`.

- Observation: The Milestone 2 Red mistakenly required the favorite mutation decoder to accept a complete character detail, and Green therefore expanded the client selection beyond the plan's exact `{ id }` interface. The convergence coordinator still discards mutation data, so no false cache convergence occurred, but the unused selection couples mutation success to unrelated fields and violates the accepted KISS/YAGNI boundary.
  Evidence: fresh Milestone 2 S2 review; `apps/web/src/data/characters.graphql`; `apps/web/src/data/graphql-executor.ts`; `apps/web/src/data/graphql-executor.unit.test.tsx`; the exact operation interface in this plan.

## Decision Log


- Decision: Use two coherent frontend-visual production milestones followed by one standard closure milestone.
  Rationale: Addressable detail reading and persisted interactions are independently observable contracts with different failure surfaces. Combining them would create an oversized Red; splitting them into data, component, and style microcycles would add handoffs without independent user value.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Create exactly one new production component, `CharacterDetailRoute`, and keep its metadata, favorite control, comment form, comment list, and interaction states together.
  Rationale: No existing detail owner exists, so one route-level owner is justified. Separate `FavoriteButton`, `CommentForm`, `CommentList`, metadata-row, image, state, or layout components would have only one current consumer and no demonstrated reuse need.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Extend the existing operation file, generated output, executor, query owner, router, card, styles, and smoke rather than adding a second data layer, decoder module, route framework, test project, or fixture lifecycle.
  Rationale: These paths already own the required responsibilities. The only permitted new data helper is one narrow target-detail mutation/refetch coordinator if preflight confirms the ADR-0017 convergence contract is missing; it is not a generic mutation framework.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Use the GraphQL default first 20 comments and add no pagination or load-more control in TASK-011.
  Rationale: The public contract exposes no total count, TASK-006 already owns bounded newest-first read evidence, and SPEC-005 requires the newly added newest comment to be visible rather than complete comment-history navigation. A pagination UI would add state, copy, tests, and controls without a current requirement.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Treat 1280 by 800 and 375 by 812 Chromium evidence as TASK-011 operability and visual-review support only.
  Rationale: Visible TASK-011 work needs real-browser review, but TASK-012 owns full responsive/error/image-fallback evidence at 375, 768, and 1280 CSS pixels and AC-006 closure.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Keep TASK-011 `Pending` after plan registration.
  Rationale: An implementation-ready plan is intent, not separate owner authorization or implementation evidence.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Activate TASK-011 under workflow `TASK-011-20260821-01` after exact project-owner authorization and baseline continuity checks.
  Rationale: TASK-008 and TASK-010 remain `Complete`; DG-003 and DG-006 remain `Resolved`; AUTH-001 remains `Authorized` because the planned exact direct-URL portfolio boundary has no reopen trigger; the worktree and accepted reuse projection contain no conflicting drift.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Accept Milestone 1 classification `MISSING` and authorize one coherent Red across the existing card, app, query-owner, decoder, and smoke tests plus the single planned detail-route application test.
  Rationale: The source and existing tests prove that only list routing/data behavior exists, while the checked-in API schema already supplies the complete public detail contract and the existing smoke lifecycle needs no new owner. Query-key and decoder tests are part of the same addressable-detail contract rather than separate product outcomes.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Accept one same-contract correction for each Milestone 1 writer and freeze candidate `B67647FD02208CC204B650BBC46D6B4C3FEC802065F9FB8DA7EC227B64877EE3` for fresh S2 review.
  Rationale: The test correction repaired only the real-provider spy type, and the frontend correction restored only the pre-existing readable card summary separator. Neither changed the observable detail contract, reuse dispositions, mutation freeze, or architectural boundaries. All refreshed milestone commands and the isolated two-viewport browser contract pass.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Withhold Milestone 1 acceptance after the fresh S2 `REVISE` verdict and stop before another write.
  Rationale: The visible-focus Major is valid and requires both a stronger frozen browser assertion and a bounded style correction. The plan permits only one same-contract correction per role; both the persistent test worker and frontend worker already used that budget. Starting another cycle, resetting attempt count, or editing implementation directly would bypass the accepted stopping rule without project-owner authorization.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Accept the project owner's explicit budget extension for exactly one `TASK-011-M1-FOCUS` corrective Red/Green and confirmation loop.
  Rationale: The owner replied `go ahead` to the coordinator's exact proposal limiting the test write to `tests/smoke/walking-skeleton.smoke.test.ts`, the implementation write to `apps/web/src/styles.css`, and the evidence refresh to the M1 browser/validation boundary plus S2 confirmation. This does not reopen any other scope, correction budget, dependency, mutation behavior, or milestone.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Classify the post-Green 375-pixel failure as a same-contract smoke test defect and authorize attempt 2 on the already owner-approved smoke-only surface.
  Rationale: The new focus assertion passes, the captured page is the loaded detail, and the accessibility snapshot contains only the detail tree. The helper's first same-name heading lookup can pass against a list-card heading before navigation commits, causing the next broad species lookup to see the still-present list. Requiring the existing level-2 detail heading removes the race without changing CSS, product behavior, fields, viewports, fixtures, or the focus contract. This is the sole test correction inside the owner-approved subcycle; any further failure stops.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Freeze corrected Milestone 1 candidate `D37E3D31128E367E0A6D440B2E566CF3459ACEBAB2AD2867F42683F951496F2D` for finding-specific S2 confirmation.
  Rationale: The new geometry assertion now proves the focused outline is paintable; the CSS retains the global 2-pixel Plasma Cyan ring and 3-pixel offset while moving descendant clipping to the rounded link; the corrected helper waits for the level-2 detail heading. Chromium, unit, application, typecheck, build/GraphQL drift, Tailwind, relevance, and diff checks pass. No original M1 behavior or prohibited scope changed.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Accept Milestone 1 after closure-permitting S2 confirmation and advance to Milestone 2 preflight.
  Rationale: The same independent reviewer reproduced the corrected candidate, exact two-path corrective delta, focus paintability proof, card containment, locator-race correction, receipts, evidence, and prohibited-scope searches. It closed the sole Major and returned `PASS` with no finding. This accepts only addressable detail reading; mutation behavior, AC-003, task closure, and TASK-012 remain separate.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Accept refreshed Milestone 2 reuse audit `TASK-011-REUSE-20260821-02` without changing a disposition.
  Rationale: The accepted M1 route/data/test owners are the exact planned extension points; TASK-008's public schema, resolver, persistence evidence, and API composition already own both durable mutations; the single smoke fixture/orchestrator already owns real PostgreSQL/Redis lifecycle and cleanup. M2 therefore needs no backend, fixture, process, dependency, component, or data-module owner unless read-only preflight proves a binding contradiction.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Accept Milestone 2 classification `MISSING` and authorize one coherent Red across the existing detail application, query-owner, executor-decoder, and single smoke tests.
  Rationale: No frontend mutation operation, mutation result decoder, exact-key refetch coordinator, valid/invalid form behavior, pending/failure truthfulness, reload persistence, or inert-comment browser evidence exists. These assertions jointly prove one user-visible interaction/convergence contract. TASK-008 already proves backend mutation behavior, so no backend or fixture Red is valid.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Accept and freeze Milestone 2 Red aggregate `A21FD544DAC7A29C8A52474EDE4D28FE98A29E01B933FFE10CD664857E5FE1AB` for separate frontend Green.
  Rationale: The 11 failures are exclusively the missing public frontend owners; all 32 pre-existing M1 assertions pass. The four tests prove one coherent mutation/convergence outcome across semantic DOM, exact-key network refetch, operation-specific decoding, and the existing real-browser lifecycle. No fixture, backend, generated, infrastructure, or unrelated failure contaminated the Red.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Withhold Milestone 2 after fresh S2 `REVISE` and accept the project owner's bounded operation-correction extension.
  Rationale: The original favorite Red required full detail even though the binding client interface selects only `{ id }`. The expanded response was unused and never established convergence, but it violated KISS/YAGNI and coupled mutation success to unrelated fields. The owner authorized one test correction limited to the application/decoder contract and one standard nonvisual Green limited to the operation, generated output, and decoder.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Accept corrected Milestone 2 candidate `2108E6AFFFC599B3A4F486D02DDC0D7E6D30D241AFD3FFF0433B31DBD437D42D` after finding-specific S2 `PASS WITH FOLLOW-UPS` and advance to integrated closure.
  Rationale: The corrected Red proves the ID-only mismatch; the separate Green narrows only the exact three owners; focused, affected, type/build/GraphQL drift, Tailwind, and real two-viewport persistence evidence pass. The reviewer closed the sole product Major and retained only a documentation-currentness follow-up, which this reconciliation resolves without changing product bytes or claiming AC/task closure.
  Date/Author: 2026-08-21 / primary coordinator.

- Decision: Accept the complete closure packet and fresh integrated `PASS WITH FOLLOW-UPS`, mark TASK-011 and AC-003 through AC-005 complete, and archive this plan after active-location documentation validation.
  Rationale: Cumulative relevance found no obsolete or irrelevant coverage; every authoritative command passes on exact candidate `2108E6AF...37D42D`; Chromium proves the complete detail/interaction flow with exact GraphQL operation counts and cleanup; PostgreSQL/Redis residue and owned ports are empty; and the fresh reviewer found no Blocker or Major. Its one documentation-only Minor required this cumulative revision note, which is now resolved. TASK-012 remains the owner of image-failure and full responsive closure, and no commit, push, pull request, publication, or deployment is authorized.
  Date/Author: 2026-08-21 / primary coordinator.

## Outcomes & Retrospective


TASK-011 is complete. Milestone 1 is accepted at candidate `D37E3D31128E367E0A6D440B2E566CF3459ACEBAB2AD2867F42683F951496F2D`, and corrected Milestone 2 plus integrated closure are accepted at candidate `2108E6AFFFC599B3A4F486D02DDC0D7E6D30D241AFD3FFF0433B31DBD437D42D`. Addressable detail reading, governed imagery, visible keyboard focus, ID-only favorite mutation, validated plain-text comments, exact target-detail convergence, truthful failure states, reload persistence, cumulative relevance, authoritative closure, independent acceptance, and documentation reconciliation pass. AC-003 through AC-005 are complete and current readiness is 10/12. TASK-012 still owns image-failure fallback and full responsive/error closure; commit, push, pull request, publication, and deployment remain outside this workflow.

## Purpose / Big Picture


After separately authorized execution succeeds, selecting a character card will navigate to `/characters/:id`, and a direct visit to that URL will render the requested character through the project GraphQL API. The detail will show only the approved fields and the exact governed native image. A visitor will be able to change the global single-user favorite state and add a validated plain-text comment; both changes will survive reload because PostgreSQL remains authoritative.

The UI will not guess that a mutation result is durable client state. After an error-free mutation, it will await exactly one refetch of the complete target-detail query. A failed mutation will retain the previously loaded detail and show a clear interaction error. A persisted mutation followed by a failed detail refetch will be identified honestly as saved but not refreshed rather than rolled back, optimistically copied, or silently presented as converged.

A reviewer will observe success through focused semantic DOM tests, the existing single real Chromium smoke against isolated PostgreSQL/Redis state, reload persistence, exact GraphQL request counts, and the complete repository closure gates. AC-003, AC-004, and AC-005 may change only after that evidence and the task-closure documentation gate pass.

## Context and Orientation


TASK-011 owns [FR-FE-003 through FR-FE-005](../../REQUIREMENTS.md#fr-fe-003---character-details), [NFR-001](../../REQUIREMENTS.md#nfr-001---frontend-technologies), [NFR-005](../../REQUIREMENTS.md#nfr-005---usability), and [AC-003 through AC-005](../../REQUIREMENTS.md#8-minimum-acceptance-criteria). It contributes to adopted optional [OR-004](../../REQUIREMENTS.md#or-004---frontend-tests) without reclassifying that source-optional requirement.

The governing decisions are [ADR-0005](../../adrs/0005-use-single-user-persistence-for-character-interactions.md), [ADR-0006](../../adrs/0006-define-a-use-case-oriented-graphql-contract.md), [ADR-0009](../../adrs/0009-keep-frontend-state-close-to-its-owner.md), [ADR-0014](../../adrs/0014-persist-and-deliver-character-image-urls-directly.md), [ADR-0016](../../adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md), [ADR-0017](../../adrs/0017-use-tanstack-query-with-a-project-owned-typed-graphql-executor.md), and [ADR-0018](../../adrs/0018-define-the-typescript-test-harness-with-repository-owned-smoke-orchestration.md). DPL-DEC-051 owns the reversible TASK-011 choices that these authorities leave open.

The routed observable rules are [SPEC-003 through SPEC-005](../../specs/SPEC.feature) plus the TASK-011 portions of [HS-009, HS-015, HS-016, and HS-017](../../specs/HARD_SPEC.feature). TASK-006 already owns bounded newest-first detail/comment reads; TASK-008 already owns the exact mutations, validation, PostgreSQL persistence, and backend lifecycle. Do not duplicate their proof. TASK-011 owns only the frontend operations, presentation, explicit refetch, browser rendering, reload, and end-to-end AC evidence.

The UI authorities are the [field-visibility decision](../../ui/README.md#ui-field-visibility-decision), [data-driven constraints](../../ui/README.md#data-driven-design-constraints), and [Interdimensional Dark visual foundation](../../ui/visual-foundations.md). AUTH-001 is `Authorized` only for the recorded personal, educational, non-commercial portfolio and exact ADR-0014 direct-URL boundary. Its continuity must be rechecked at activation; no planning artifact can substitute for that owner-controlled state.

Prerequisite TASK-008 and TASK-010 are `Complete`. TASK-011 is `In progress` under workflow `TASK-011-20260821-01`. The root list, API, persistence, smoke infrastructure, addressable detail UI, and frontend favorite/comment operations are implemented and accepted at their milestone barriers; integrated task closure remains pending.

## Scope and Non-Goals


### Accepted reuse audit


Refreshed reuse audit `TASK-011-REUSE-20260821-01` covers the 23 ordered paths listed under `Artifacts and Notes` at activation aggregate `B35B6C42F06801AAE3C5FCD36CE0B19153785CFFDE36D66941CBBE1A08882A1E`.

| Element or responsibility | Disposition | Exact path and bounded change |
|---|---|---|
| Query provider and router | `EXTEND` | Add only `/characters/:id` to `apps/web/src/app.tsx`; keep the existing provider and `BrowserRouter`. |
| Application shell | `REUSE_AS_IS` | Keep `apps/web/src/shell.tsx`; no global navigation, new layout wrapper, or shell variant. |
| Character card | `EXTEND` | Make the existing card navigate to `/characters/<id>` while retaining exactly name, image, and species. Do not add favorite/comment metadata. |
| Character list route | `REUSE_AS_IS` | Continue composing `CharacterCard`; no detail state, mutation state, or duplicated route ownership enters `apps/web/src/character-list-route.tsx`. |
| Detail route/view | `CREATE` | Add one `apps/web/src/character-detail-route.tsx` owner for detail data, approved fields, favorite/comment controls, local draft, and interaction states. |
| Query/loading/error/not-found presentation | `EXTEND` inline | Follow the existing inline state pattern inside the new route. Do not create generic state, alert, retry, or error components. |
| Native character image | `REUSE_AS_IS` contract | Repeat the small native-image markup in the detail route with exact `imageUrl`, `alt=<name>`, `crossOrigin="anonymous"`, and `referrerPolicy="no-referrer"`. Do not extract an image component before TASK-012 demonstrates a shared fallback need. |
| Operation source and generation | `EXTEND` | Add only the detail and two mutation operations to `apps/web/src/data/characters.graphql`; reuse `apps/web/codegen.ts` and regenerate `apps/web/src/data/generated/graphql.ts`. |
| GraphQL transport/error taxonomy | `EXTEND` | Reuse `executeGraphql` and `GraphqlRequestError` in `apps/web/src/data/graphql-executor.ts`; add only operation-specific runtime decoders required by the new operations. |
| Query keys, options, and convergence | `EXTEND` | Add one exact target-detail key, detail query options, and the minimum shared mutation/refetch coordinator to `apps/web/src/data/characters-query.ts`. No second data module, hook framework, normalized cache, or generic command layer. |
| Visual styles and tokens | `EXTEND` | Add detail-specific selectors to `apps/web/src/styles.css`; preserve the existing tokens, fonts, focus rules, and task-local CSS owner. |
| Unit/application test projects | `REUSE_AS_IS` | Extend existing web-unit and web-application tests under `apps/web/src`; do not change `vitest.config.ts` or add a project. |
| Chromium and runtime fixture | `EXTEND` | Add bounded detail/interaction assertions to `tests/smoke/walking-skeleton.smoke.test.ts` and reuse `tests/smoke/fixtures/task-010-runtime.ts`, `scripts/run-smoke.ts`, and `scripts/verify-smoke-lifecycle.ts` unchanged unless preflight proves a task-scoped fixture gap. Do not rename historical TASK-010 lifecycle identities merely for cosmetic consistency. |

There is no accepted `EXTRACT_LOCAL` disposition. A writer must not create a new production component, function owner, hook module, shared primitive, data folder, test project, fixture process, or style system merely because it might be reusable later. If tree drift reveals an existing reusable owner or makes one planned `CREATE` unnecessary, refresh this audit before Red. If a second current consumer makes extraction materially simpler during Green, stop and obtain coordinator acceptance before changing the disposition.

### Required visible surface


The detail route is intentionally compact:

- a `Back to characters` link to `/`;
- the character name as the page heading;
- the exact native detail image;
- labeled values for species, status, gender, and origin;
- a Type row only when `type` is non-empty;
- one favorite button with `aria-pressed`, labeled `Add to favorites` or `Remove from favorites` from the last converged detail;
- a `Comments` heading, `No comments yet.` when empty, and newest-first plain-text comment bodies only;
- one labeled `Comment` textarea and one `Add comment` action; and
- local or interaction-specific status/error text only when its state exists.

Bounded state copy:

| State | Visible copy and behavior |
|---|---|
| Detail loading | `Loading character...` as a status. |
| Missing positive ID | `Character not found.` plus `Back to characters`; never substitute another character. |
| Detail request failure | `Character could not be loaded.` plus one `Retry` action. |
| Favorite pending | Disable both mutation controls for the target and expose `Saving favorite...`; do not flip `aria-pressed` before convergence. |
| Favorite mutation failure | `Favorite could not be updated.`; no detail refetch and no persisted-state claim. |
| Favorite persisted but refetch failed | `Favorite was saved, but details could not be refreshed.` plus `Retry details`; retain the last converged detail. The retry is a new explicit user action, not part of the exact-one mutation convergence request. |
| Comment validation failure | `Enter 1 to 1,000 characters.`; send no mutation. Count Unicode code points after trimming rather than relying only on HTML `maxLength`. |
| Comment pending | Disable both mutation controls and expose `Adding comment...`; retain the draft until mutation success is known. |
| Comment mutation failure | `Comment could not be added.`; retain the draft, perform no detail refetch, and add no comment to the rendered list. |
| Comment persisted but refetch failed | Clear the draft after the error-free mutation confirms persistence; show `Comment was saved, but details could not be refreshed.` plus `Retry details`; do not fabricate a rendered comment. The retry is a new explicit user action. |

Unknown status, gender, or origin values are valid text. Comment bodies render as React text, never as HTML. IDs, origin URL, comment timestamps/authors/counts, upstream resource links, and persistence-only fields remain non-visible.

### In scope


- Extend the existing card so a real link selects its corresponding addressable detail route.
- Add one client-neutral `CharacterDetail` query using the GraphQL field default for the first 20 comments.
- Add the exact `SetCharacterFavorite` and `AddCharacterComment` operation documents.
- Reuse the generic executor and extend its operation-specific runtime validation without exposing raw response bodies or infrastructure detail.
- Use the complete key `['character-detail', id]`, with no automatic query or mutation retry and no focus/reconnect refetch on the interaction convergence path.
- Keep server-returned detail, favorite, and comments in TanStack Query; keep the unsubmitted comment body and local validation feedback in `CharacterDetailRoute` state.
- After inspected error-free mutation success, perform exactly one awaited exact-key detail refetch. Mutation failure performs zero refetch. Do not use mutation data as a durable cache write.
- Distinguish converged success from persisted-but-not-refreshed without inventing rollback.
- Disable both same-target controls while either mutation is pending. Do not add a custom queue, lock, ordering protocol, or transaction architecture.
- Add focused semantic DOM coverage and extend the one Chromium smoke against the existing isolated real infrastructure and deterministic avatar interception.
- Complete the affected documentation and TASK-011 closure gate after accepted implementation evidence.

### Out of scope


- Backend schema, resolver, service, repository, Sequelize, migration, PostgreSQL model, Redis cache, import, or request-logging changes.
- Re-testing TASK-006 comment pagination or newest-first database ordering, or TASK-008 mutation persistence/validation in a second backend suite.
- A comment pagination/load-more control, total count, author, timestamp, edit/delete, moderation, rich text, Markdown, mention, attachment, draft persistence, or browser storage.
- Optimistic updates, manual `setQueryData`, normalized entity identity, broad invalidation, mutation caching, background retry, offline support, or same-target concurrency machinery.
- Authentication, users, sessions, authorization, public-deployment abuse controls, rate limiting, or a claim that the single-user mutation surface is publicly deployable.
- Image fallback, retry, alternate source, proxy, asset route, JavaScript image fetch, or AC-006/full responsive closure; TASK-012 owns those behaviors.
- A new dependency, Zustand, another GraphQL client, a form library, validation library, component library, icon package, animation library, Storybook, mockups, a second browser test, a new Vitest project, or a new process owner.
- A shared design system, generic mutation framework, command bus, event system, notification framework, route abstraction, reusable form primitives, or unrelated cleanup/refactor.

## Plan of Work


### Activation barrier


Do not run the worker-first implementation flow while TASK-011 is `Pending`. After separate project-owner authorization, the primary coordinator must:

1. Confirm TASK-008 and TASK-010 remain `Complete`, TASK-011 remains the exact authorized scope, DG-003/DG-006 remain `Resolved`, AUTH-001 remains `Authorized` without a reopen trigger, and the worktree contains no conflicting user or peer edits.
2. Record branch, HEAD, dirty-tree scope, Node/npm/Playwright versions, PostgreSQL/Redis availability, relevant-tree fingerprint, and the current 23-path reuse projection.
3. Change TASK-011 from `Pending` to `In progress` in `docs/IMPLEMENTATION_PLAN.md`, append activation chronology, update this plan and its index, run documentation validation, ADR validation, lease-guard self-tests, and `git diff --check`, and inspect the actual documentation diff.
4. Accept a refreshed reuse audit and both frontend-visual capsules before issuing the first read-only preflight packet.

Use workflow ID `TASK-011-20260821-01` unless a material authority or plan replacement requires a new identity. One persistent `test_worker` and one `frontend_code_worker` may remain live only within the current production milestone. Retire both at its accepted milestone barrier. Red and Green writes are sequential under separate terminal write leases; no two writers are active concurrently.

Every assignment receives a complete Milestone Assignment Packet v2. Default per-milestone budget: one read-only preflight; one coherent Red or passing characterization; one Green with optional same-turn behavior-preserving Refactor; at most one same-contract correction per role; one review correction loop; maximum three test-worker turns and two frontend-worker turns. Stop after the same decisive failure occurs twice, two no-diff write handoffs, a lease or frozen-test violation, stale/contaminated evidence, a changed binding field, or exhausted budget.

### Milestone 1: Addressable character detail experience


Observable acceptance contract: selecting a list card navigates to `/characters/<id>`. Directly loading that route queries only the project GraphQL API and renders the requested name, exact governed image, species, status, gender, origin name, conditional non-empty type, favorite state, and first 20 comment bodies. Loading, valid-but-missing, and unexpected request failures are distinct and recoverable. A successful detail image uses the exact GraphQL URL with anonymous CORS, no referrer, and meaningful alternative text. No favorite/comment mutation is sent in this milestone.

Authority anchors: FR-FE-003, NFR-001, NFR-005, AC-003, ADR-0006, ADR-0009, ADR-0014, ADR-0016 through ADR-0018, DPL-DEC-005, DPL-DEC-006, DPL-DEC-051, SPEC-003, and the applicable route/not-found/test portions of HS-016/HS-017.

Preflight target: the accepted reuse audit; `apps/web/src/app.tsx`, `character-card.tsx`, list route, data modules, generated operation, web tests, API schema; and the existing smoke/fixture. The persistent `test_worker` returns exactly one ADR-0016 classification for card navigation, direct route, detail decoding/query ownership, visible-field inclusion/exclusion, empty-type omission, loading, NOT_FOUND, retryable error, and governed detail image. Planning evidence suggests `MISSING`; only preflight is authoritative.

Test ownership for Red is limited to:

- `apps/web/src/app.application.test.tsx`;
- `apps/web/src/character-card.unit.test.tsx`;
- new `apps/web/src/character-detail-route.application.test.tsx`;
- existing data unit tests only if needed to prove detail-key/decoder behavior; and
- `tests/smoke/walking-skeleton.smoke.test.ts` for the minimum direct-route/navigation/browser contract.

Green ownership is limited to:

- `apps/web/src/data/characters.graphql` and generated `apps/web/src/data/generated/graphql.ts`;
- `apps/web/src/data/graphql-executor.ts` and `apps/web/src/data/characters-query.ts`;
- `apps/web/src/app.tsx`, `apps/web/src/character-card.tsx`, and new `apps/web/src/character-detail-route.tsx`; and
- `apps/web/src/styles.css`.

Freeze manifests, lockfile, Codegen configuration, API/backend paths, list-route behavior, shell, smoke fixture/orchestrator/lifecycle paths, and all interaction/mutation behavior. A valid Green may regenerate the checked-in output from the existing operation/config/schema workflow; it never hand-edits generated bytes.

Focused Red/Green command, finalized to actual accepted paths during preflight:

    npm exec -- vitest run --config vitest.config.ts --project web-unit --project web-application apps/web/src/character-card.unit.test.tsx apps/web/src/app.application.test.tsx apps/web/src/character-detail-route.application.test.tsx apps/web/src/data/characters-query.unit.test.tsx apps/web/src/data/graphql-executor.unit.test.tsx

Milestone validation:

    npm run test:unit --workspace @rick-and-morty/web
    npm run test:application --workspace @rick-and-morty/web
    npm run typecheck
    npm run build --workspace @rick-and-morty/web
    npm run validate:tailwind
    npm run test:smoke

Risk is `S2`: the slice joins routing, generated GraphQL data, browser behavior, real PostgreSQL detail reads, and the cross-origin image boundary. A fresh `independent_reviewer` reviews the exact milestone candidate, accepted reuse dispositions, named browser evidence, TDD chronology, affected-test relevance, and prohibited scope.

Frontend-visual capsule:

- Implementation profile: `frontend-visual`.
- UI/design authorities: DPL-DEC-005, DPL-DEC-006, DPL-DEC-051, `docs/ui/README.md`, and `docs/ui/visual-foundations.md`.
- Reuse-audit evidence: refreshed `TASK-011-REUSE-20260821-01`; dispositions remain exactly those in this plan unless coordinator-approved tree evidence changes one.
- Required states: loaded detail with empty/non-empty type, loading, NOT_FOUND, request error with Retry, no-comments, populated comments, and successful detail image. Mutation states are frozen.
- Viewport/interaction matrix: Chromium 1280 by 800 and 375 by 812; select a card, direct-load the same URL, reload, use `Back to characters`, keyboard-reach the link/Retry, and confirm no immediate horizontal overflow without claiming TASK-012 closure.
- Browser evidence: extend the existing single smoke with deterministic real GraphQL/PostgreSQL detail, locally intercepted exact avatar, request/console/page-error inspection, and run-owned cleanup.
- Prohibited visual scope: image failure/fallback, 768-pixel/full responsive closure, new fields, cards badges, extra navigation, icons, effects, animation, Storybook, component extraction, or a new dependency.

Advance only after the primary accepts the Red or characterization route, terminal Green lease, actual diff, focused and milestone commands, exact smoke cleanup, affected-test relevance, and fresh S2 `PASS` or fully dispositioned closure-permitting `PASS WITH FOLLOW-UPS`.

### Milestone 2: Durable favorite and comment interactions


Observable acceptance contract: on an already loaded detail, the user can add or remove favorite state and submit a 1-through-1,000-code-point trimmed comment. Successful mutation inspection triggers exactly one awaited network refetch for `['character-detail', id]`, and only that returned detail establishes UI convergence. Reload preserves favorite and comment state. Invalid local input sends no mutation. GraphQL mutation failure sends no refetch and leaves the last converged detail visible. Persisted mutation followed by refetch failure receives its distinct saved-but-not-refreshed message. Markup-like comment content is visible as inert text.

Authority anchors: FR-FE-004, FR-FE-005, NFR-005, AC-004, AC-005, ADR-0005, ADR-0006, ADR-0009, ADR-0016 through ADR-0018, DPL-DEC-051, SPEC-004, SPEC-005, and the TASK-011 portions of HS-009/HS-015/HS-017.

Preflight target: accepted Milestone 1 candidate/evidence; the new detail route, data modules, operations/generated output, tests, and single smoke; TASK-008's public mutation contract and accepted backend evidence. The persistent `test_worker` classifies local validation, mutation request/decoding, exact-one target refetch, zero-refetch failure, no manual cache write, persisted-but-not-refreshed result, disabled same-target controls, reload persistence, and plain-text rendering. Planning evidence suggests `MISSING`; do not manufacture backend Reds for TASK-008 behavior.

Test ownership for Red is limited to:

- `apps/web/src/data/characters-query.unit.test.tsx` for exact-key convergence request counts and no manual cache update;
- `apps/web/src/data/graphql-executor.unit.test.tsx` only for new operation decoder behavior not already covered by the generic taxonomy;
- `apps/web/src/character-detail-route.application.test.tsx` for validation and visible interaction states; and
- `tests/smoke/walking-skeleton.smoke.test.ts` for real favorite/comment persistence, reload, exact request sequence, and inert markup-like text.

Green ownership is limited to the existing Milestone 1 production paths: the one operation file/generated output, executor, query owner, one detail route, and styles. Do not create another component or data module. Freeze the card, router, list, shell, manifests, lockfile, Codegen configuration, API/backend, migration/model, Redis, smoke fixture/orchestrator, and TASK-012 paths unless preflight proves a binding task-owned gap; such a gap requires coordinator reconciliation before Red.

Focused Red/Green command:

    npm exec -- vitest run --config vitest.config.ts --project web-unit --project web-application apps/web/src/character-detail-route.application.test.tsx apps/web/src/data/characters-query.unit.test.tsx apps/web/src/data/graphql-executor.unit.test.tsx

Milestone validation:

    npm run test:unit --workspace @rick-and-morty/web
    npm run test:application --workspace @rick-and-morty/web
    npm run typecheck
    npm run build --workspace @rick-and-morty/web
    npm run validate:tailwind
    npm run test:smoke

Risk is `S2`: the UI drives real persistent mutation state and exact cache-convergence behavior. A fresh `independent_reviewer` reviews the current exact candidate, request counts, UI truthfulness, real reload persistence, plain-text safety, accepted reuse dispositions, scope exclusions, cleanup, and TDD/relevance evidence.

Frontend-visual capsule:

- Implementation profile: `frontend-visual`.
- UI/design authorities and reuse evidence: the same accepted authorities and refreshed audit as Milestone 1, plus accepted Milestone 1 evidence.
- Required states: favorite off/on/pending/mutation-error/persisted-but-not-refreshed; comments empty/populated/invalid/pending/mutation-error/persisted-but-not-refreshed; last converged detail during every failure.
- Viewport/interaction matrix: Chromium 1280 by 800 and 375 by 812; keyboard activate favorite, fill/submit comment, reload, inspect inert markup-like text and saved state, and exercise deterministic failure without claiming TASK-012 responsive closure.
- Browser evidence: extend only the existing single smoke and existing run-owned fixture. Record the mutation and detail-operation sequence, exact target ID, PostgreSQL schema, Redis namespace, image interception, browser errors, reload result, cleanup, and ports.
- Prohibited visual scope: pagination/load more, comment metadata/actions, toast/notification framework, optimistic animation, icons, separate interaction components, image fallback, Storybook, or dependency additions.

Advance only after the same primary acceptance and fresh S2 review barrier as Milestone 1.

### Milestone 3: Integrated validation, acceptance, and closure


This is a standard evidence/documentation milestone with no frontend-visual marker and no product edit. First run the cumulative relevance audit over every affected test, fixture, helper, generated artifact, and browser assertion. Remove or correct only items that lack a current TASK-011/accepted-boundary consumer; do not delete TASK-006/TASK-008 coverage merely because browser evidence now joins it. Confirm no focused, skipped, pending, placeholder, snapshot-only, public-network, duplicated backend pagination/order, obsolete helper, or production test branch remains.

Run the complete authoritative closure packet once on the frozen exact candidate:

    npm run typecheck
    npm run build
    npm run validate:tailwind
    npm run test:unit
    npm run test:integration
    npm run test:application
    npm run test:smoke
    npm run test:smoke:lifecycle
    python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    python .agents/skills/govern-adrs/scripts/validate_adrs.py
    git diff --check

Record the candidate fingerprint, generated-output identity, Node/npm/Playwright/Chromium versions, exact PostgreSQL and Redis container/image/port identities, every smoke/lifecycle run ID, schema and prefix, GraphQL request sequence/counts, avatar fixture digest, browser console/page errors, port release, final database/schema/prefix absence, and dirty-tree scope. Mutable external-state evidence is non-reusable unless the command, tree, environment, run identity, and final clean state all still match.

A fresh `independent_reviewer` performs integrated S2 acceptance against FR-FE-003 through FR-FE-005, NFR-001/NFR-005, adopted OR-004, AC-003 through AC-005, SPEC-003 through SPEC-005, and the TASK-011 portions of HS-009/HS-015/HS-016/HS-017. The reviewer must also inspect cross-milestone behavior, the reuse audit, exact-one refetch evidence, persisted-but-not-refreshed truthfulness, no new dependency/component/test project, TASK-012 exclusions, and complete external cleanup.

Only an integrated `PASS` or a fully dispositioned closure-permitting `PASS WITH FOLLOW-UPS` permits primary reconciliation. The primary alone updates canonical task and acceptance states, current status, specifications, UI/GraphQL usage guidance, execution chronology, review index and dated review, this living plan, and the plan index. Move the plan to `docs/plans/completed/` only after TASK-011 is `Complete` and the task-closure documentation gate passes; repair all inbound links and validate again after the move.

TASK-011 is complete only when:

- card selection and direct `/characters/:id` loading show the exact requested approved detail and image;
- valid/missing/error route behavior is reproducible and no other character is substituted;
- favorite and comment interactions converge only through one exact awaited target-detail refetch;
- failure and persisted-but-not-refreshed states make no false durable-state claim;
- valid comment text, invalid input, inert markup-like text, and reload persistence pass;
- the accepted reuse audit has only one created production component and no unresolved finding;
- no backend, dependency, migration, auth, concurrency, pagination, image-fallback, responsive-closure, or test-project expansion entered scope;
- exact external state and process cleanup passes; and
- the task-closure documentation gate passes with truthful AC-003/AC-004/AC-005 status.

## Concrete Steps


All commands run from the repository root.

1. Stop at the current planning barrier until the project owner separately authorizes TASK-011 execution.
2. Perform the activation transition and validation exactly as described above, including `python -B .codex\leases\lease_guard.py self-test`; do not start preflight while the canonical task is `Pending`.
3. Refresh and accept reuse audit `TASK-011-REUSE-20260821-01` and the Milestone 1 visual capsule, then issue one complete read-only preflight packet to a persistent `test_worker`.
4. Route the accepted classification under ADR-0016. Only `MISSING`, `REGRESSION`, or a coordinator-confirmed explicit `PARTIAL` gap may receive a Red lease. Freeze the accepted tests before the frontend Green lease.
5. Complete Milestone 1 Green with one `frontend_code_worker`, run the focused and affected boundaries, capture exact browser/cleanup evidence, and obtain fresh S2 review before retiring both workers.
6. Refresh the audit/capsule for the accepted Milestone 1 tree and repeat the sequential preflight/Red/Green/review path for Milestone 2 with fresh worker instances.
7. Freeze the integrated candidate, run the relevance audit and one authoritative closure packet, then obtain a fresh integrated S2 review.
8. Reconcile documentation/status only after a closure-permitting verdict, validate the active location, archive the plan, repair links, and validate the completed location.

Stop and request project-owner direction before any migration or relational-model change; backend public-contract change; dependency; public-deployment/auth/security choice; custom concurrency/transaction architecture; new test project/process owner; image-delivery departure; task/requirement/ADR/gate change; scope outside this plan; or exhausted/repeated-failure budget. A genuine S3/S4 issue may add proportionate critical research/review only after the primary records the trigger; ordinary implementation does not pre-allocate that overhead.

## Validation and Acceptance


The planning inspection suggests both product contracts are `MISSING`, but this is not the required preflight result. Each milestone's persistent `test_worker` must inspect the then-current implementation and existing coverage and return exactly one classification before any test write.

For an accepted Red, the focused command must fail because the shared user-visible contract is absent, not because generated output is stale, a fixture is malformed, infrastructure is unavailable, or the test violates an existing contract. The primary inspects and freezes the actual test diff and decisive output. Green must use the same focused boundary, preserve frozen tests, add the smallest complete production behavior, and rerun after any actual Refactor. Each milestone then runs its affected web suites, type/build/Tailwind joins, smoke, cleanup, relevance audit, and S2 review once.

jsdom may prove semantic rendering, accessible roles/names, local state, request counts, and interaction transitions. It cannot prove native browser navigation, cross-origin image requests, layout, complete browser APIs, or real PostgreSQL persistence. Those claims require the one Chromium smoke. A screenshot is supporting visual evidence only and cannot replace DOM, request, persistence, or cleanup assertions.

No evidence may treat a mutation payload as converged detail. Success means the mutation response had no GraphQL error and the one awaited exact target-detail network refetch succeeded. If that refetch fails after persistence, acceptance requires the saved-but-not-refreshed state and forbids rollback or manual cache data.

Full unit, integration, application, smoke, lifecycle, documentation, ADR, and diff gates run once at closure unless candidate drift, external-state mismatch, a failed prerequisite, or a reviewer finding explicitly invalidates them. Record any rerun trigger. TASK-006/TASK-008 evidence may be reused only when its command, relevant tree, environment, and mutable-state identities still match; otherwise run the authoritative existing suite rather than invent duplicate coverage.

## Idempotence and Recovery


- GraphQL generated output is reproducible from the checked-in API schema, the existing Codegen configuration, and the single operation source. Never hand-edit it.
- Detail query identity is the exact tuple `['character-detail', id]`; repeated direct loads target the same key without browser-storage or global-store copies.
- Invalid comment input is a pure local check and sends no request. The backend remains the durable validation authority for every submitted body.
- Mutation failure sends zero refetches. Error-free mutation success invokes one exact-key refetch. Repeating an interaction after a reported failure is a new user action, not automatic retry.
- The existing smoke allocates one verified `t010_smoke_<runId>` PostgreSQL schema and `character-app:test:t010-smoke-<runId>` Redis namespace, then removes only those identities. Preserve these historical harness names; do not add broad cleanup or rename lifecycle code solely for TASK numbering.
- Intercept only the exact governed avatar URLs. A public character-JSON request or an unmatched public request fails closed; do not use live provider availability as evidence.
- On a worker or guard failure, terminally close the lease, inspect the actual tree and receipt, preserve user/peer edits, and return to the primary. Never recover by rebaselining an active lease, reverting another writer, or running test and implementation writers concurrently.
- On an interrupted smoke, use the existing lifecycle verifier to terminate only the recorded process tree, run exact schema/prefix cleanup, and prove ports 4173/4174 reusable before another attempt.
- If a mutation persists but detail refetch fails, keep the saved-but-not-refreshed outcome. Do not attempt compensating writes or automatic rollback.

## Artifacts and Notes


Planning baseline:

- branch: `main`;
- HEAD: `a6574e2` (`Merge pull request #19 from mmjosedaniel/codex/execplan-008`);
- application/test worktree at audit: exact to clean HEAD; the registered documentation diff then synchronized DPL-DEC-051, the UI authority, canonical task link, plan index, and chronology without changing application/test bytes;
- accepted reuse-audit ID: `TASK-011-REUSE-20260821-01`;
- 23-path aggregate after that planning synchronization: `D0B217AD16FF5FB8929DEF95290FB09D1B151CD6C6DAB5D10327C17E077D869A`.

Activation baseline:

- branch and HEAD: `codex/execplan-011` at `cf30011c4b982b0422d2a336a2d2e2e720479355`, with clean worktree and index before activation;
- toolchain: Node.js `v24.18.0`, npm `11.16.0`, Playwright `1.61.1`;
- services: Docker client/server `29.7.2` on Linux; healthy `postgres:18.6-alpine` at loopback port `55432` and `redis:8.8.1-alpine` at loopback port `56400`;
- authorization/gates: TASK-008/TASK-010 `Complete`, DG-003/DG-006 `Resolved`, and AUTH-001 `Authorized` with no changed continuity dimension; and
- refreshed accepted reuse aggregate after the UI-authority activation status update: `B35B6C42F06801AAE3C5FCD36CE0B19153785CFFDE36D66941CBBE1A08882A1E`.

Milestone 1 assignment evidence:

- `TASK-011-M1-PREFLIGHT-01`: persistent `test_worker`, read-only, no lease or changed path, `MISSING`; static source/status inspection passed, the no-lease Vitest command was correctly withheld because it could mutate the repository-local cache, and no fixture/process-owner gap was found.

Ordered reuse projection:

1. `docs/ui/README.md`
2. `docs/ui/visual-foundations.md`
3. `apps/web/package.json`
4. `apps/web/codegen.ts`
5. `apps/web/src/app.tsx`
6. `apps/web/src/shell.tsx`
7. `apps/web/src/styles.css`
8. `apps/web/src/character-card.tsx`
9. `apps/web/src/character-list-route.tsx`
10. `apps/web/src/config.ts`
11. `apps/web/src/data/characters.graphql`
12. `apps/web/src/data/generated/graphql.ts`
13. `apps/web/src/data/graphql-executor.ts`
14. `apps/web/src/data/characters-query.ts`
15. `apps/web/src/app.application.test.tsx`
16. `apps/web/src/character-card.unit.test.tsx`
17. `apps/web/src/character-list-route.application.test.tsx`
18. `vitest.config.ts`
19. `playwright.config.ts`
20. `tests/smoke/walking-skeleton.smoke.test.ts`
21. `tests/smoke/fixtures/task-010-runtime.ts`
22. `scripts/run-smoke.ts`
23. `scripts/verify-smoke-lifecycle.ts`

The aggregate is uppercase SHA-256 over UTF-8 records of `path`, one tab, uppercase per-file SHA-256, joined by LF with no final LF. Refresh it at activation and before each frontend-visual preflight. Individual planning hashes are intentionally not duplicated here; the primary can reproduce them directly from the ordered paths.

Expected new paths are limited to:

- `apps/web/src/character-detail-route.tsx`; and
- `apps/web/src/character-detail-route.application.test.tsx`.

Every other expected implementation/test edit extends an existing path named in the reuse table. This orientation is not a write lease; each assignment packet must name its exact allowed, forbidden, and frozen paths.

## Interfaces and Dependencies


No new dependency, environment variable, server, route outside React Router, test project, or process owner is planned.

Client operation source extends the existing file with these exact public operations and no extra fields:

    query CharacterDetail($id: ID!) {
      character(id: $id) {
        id
        name
        imageUrl
        species
        status
        gender
        type
        origin { name }
        isFavorite
        comments { id body }
      }
    }

    mutation SetCharacterFavorite($id: ID!, $isFavorite: Boolean!) {
      setCharacterFavorite(id: $id, isFavorite: $isFavorite) { id }
    }

    mutation AddCharacterComment($characterId: ID!, $body: String!) {
      addCharacterComment(characterId: $characterId, body: $body) { id body }
    }

The detail query deliberately omits explicit comment arguments so ADR-0006's default limit 20 and offset 0 remain the single contract. It selects no `origin.url`, persistence-only field, comment author/timestamp/count, or upstream-only value.

`apps/web/src/data/characters-query.ts` remains the sole client query/convergence owner. Its completed TASK-011 boundary is:

- `characterDetailQueryKey(id)` returns `['character-detail', id]`;
- detail query options use that exact complete key and disable retry, focus, and reconnect refetch;
- one narrow mutation coordinator awaits the injected mutation first, performs zero refetch on mutation failure, and then awaits one exact active target-detail refetch with error propagation sufficient to return `converged` or `persisted-but-not-refreshed`;
- no mutation payload enters the Query cache through `setQueryData` or equivalent; and
- no presentation code constructs broad query filters or invalidates list/other-detail keys.

`apps/web/src/data/graphql-executor.ts` remains the sole browser GraphQL transport owner. Extend only its operation decoders, reusing `executeGraphql` and `GraphqlRequestError`. Stable GraphQL codes such as `NOT_FOUND` and `BAD_USER_INPUT` may select bounded UI states; raw error messages, bodies, SQL/Redis detail, paths, stacks, and comment text never become client diagnostics.

`CharacterDetailRoute` owns the route parameter, `useQuery`, local comment draft, local validation message, mutation pending/result state, and rendered composition. It may obtain the existing QueryClient only to pass it to the centralized data-boundary coordinator; it must not spread QueryClient operations, key construction, or cache writes through presentation code.

React Router continues to own `/` and adds only `/characters/:id`. The card's link uses the existing character `id` without parsing or constructing an upstream URL. A direct invalid/missing ID is handled through the project GraphQL error contract; no alternate character is selected.

The existing one-worker Chromium project and repository-owned smoke orchestrator remain authoritative. TASK-011 extends assertions and uses the already migrated/imported run-owned schema. It does not add browser projects, workers, web-server ownership, runtime dependencies, or live public data.

## Revision Note


2026-08-21: Created the implementation-ready TASK-011 ExecPlan, accepted reuse audit, DPL-DEC-051 execution choices, two coherent frontend-visual product milestones, proportional S2 review path, one standard closure milestone, exact no-new-component/dependency/test-project boundaries, and task-closure workflow. Synchronized the UI authority and refreshed the reuse projection after planning-only documentation edits. Documentation/ADR validation and diff checking pass. TASK-011 remains `Pending`; no implementation or acceptance evidence was created.

2026-08-21: Recorded explicit project-owner execution authorization, verified dependency/gate/authorization continuity and the clean activation baseline, transitioned TASK-011 and workflow `TASK-011-20260821-01` to `In progress`, refreshed the accepted reuse aggregate after the UI-authority status update, and passed the complete activation validation barrier. This activation revision changes documentation/status only and creates no implementation or acceptance evidence.

2026-08-21: Recorded the material implementation history omitted from the earlier revision note. Milestone 1 implemented addressable detail and governed imagery, then used the owner-authorized focus correction to close visible clipping and a smoke-locator race before accepting candidate `D37E3D31...`. Milestone 2 implemented durable favorite/comment interactions, then used the owner-authorized operation correction to restore the exact ID-only favorite boundary before accepting candidate `2108E6AF...`. The cumulative relevance audit, authoritative type/build/Tailwind/unit/integration/application/browser/lifecycle/documentation/ADR/diff packet, exact process/data cleanup, and fresh integrated `PASS WITH FOLLOW-UPS` all pass; the review's sole documentation-only revision-history Minor is resolved by this note. TASK-011 and AC-003 through AC-005 are now complete at 10/12 readiness, all affected current-status and evidence owners are reconciled, and this plan is ready for the required completed-archive move after active-location validation. No commit, push, pull request, publication, or deployment occurred.

2026-08-21: Passed the active-location documentation gate, moved this complete plan to `docs/plans/completed/`, repaired its relative links and every current/historical inbound plan link, and passed the final completed-archive documentation/ADR/diff readback. TASK-011 is closed with no remaining plan work. Product/test candidate `2108E6AF...` remains byte-identical; no commit, push, pull request, publication, or deployment occurred.
