# Deliver the TASK-010 Character List, Sorting, and Interface Filters

- Status: Planning; repository execution is not authorized
- Task: [TASK-010](../IMPLEMENTATION_PLAN.md#task-010---deliver-the-character-list-sorting-and-adopted-interface-filters)
- Plan ID: `TASK-010-20260820-01`
- Created: 2026-08-20
- Last updated: 2026-08-20
- Governing convention: [PLANS.md](../../PLANS.md)

This is a living ExecPlan. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` whenever work stops. The canonical task state remains in `docs/IMPLEMENTATION_PLAN.md`; this plan does not authorize execution, change dependencies, resolve a gate, or prove implementation.

## Progress

- [x] (2026-08-20) Read the TASK-010 requirements, accepted ADRs, routed specifications, UI authorities, manifests, test configuration, and current frontend source.
- [x] (2026-08-20) Completed reuse audit `TASK-010-REUSE-20260820-01` at baseline `40590b5d9ecf9fff5c78f67a0b511a4ba632e6b0` and bounded the visual component surface.
- [x] (2026-08-20) Recorded the reversible URL, control, default-sort, and visual-scope choices in [DPL-DEC-049](../execution/decision-and-progress-log.md#decision-log).
- [x] (2026-08-20) Registered and linked this planning-only ExecPlan while preserving TASK-010 as `Pending`.
- [x] (2026-08-20) Passed documentation validation, ADR validation with only the established NFR-006 mapping warning, whitespace checks, task-state readback, and a final KISS/YAGNI scope audit.
- [ ] Obtain separate project-owner authorization to execute TASK-010, then change its canonical state to `In progress` before any implementation write.
- [ ] Complete Milestone 1: typed list-query transport and cache ownership.
- [ ] Complete Milestone 2: isolated browser runtime and security-header boundary.
- [ ] Complete Milestone 3: the bounded visible character-list experience.
- [ ] Complete Milestone 4: integrated validation, acceptance review, documentation reconciliation, and task closure.

## Surprises & Discoveries

- Observation: `apps/web` remains the TASK-003 walking skeleton: `App` routes `/` directly to `Shell`, `Shell` renders only the product heading, and the stylesheet contains only the Tailwind import.
  Evidence: `apps/web/src/app.tsx` blob `75066b2ccaac0d0cc101174d776c9c0772afb4a4`, `apps/web/src/shell.tsx` blob `f3a57b4840374ff9258731ad11bb618ef7cb7d14`, and `apps/web/src/styles.css` blob `f1d8c73cdcf9eaacb01fec99963ad78d591305ae` at the reuse-audit baseline.

- Observation: there is no existing character card, list route, filter control, frontend GraphQL operation, query cache, or design-system primitive to reuse. The existing `Shell` is the only presentational owner worth extending.
  Evidence: bounded inspection of `apps/web/src`, `apps/web/package.json`, `vitest.config.ts`, `playwright.config.ts`, and `tests/smoke` under reuse audit `TASK-010-REUSE-20260820-01`.

- Observation: the API already supplies the required PostgreSQL-backed `characters(filter)` GraphQL contract and exact `CharacterSummary` projection, but the browser client, explicit cross-origin browser boundary, built-web CSP, and product smoke fixture do not exist.
  Consequence: keep generated operations and transport work on the standard implementation route, and do not make the visual worker own API or test-infrastructure setup.

- Observation: the accepted image decision divides proof across tasks. TASK-010 owns a successful native list-avatar request with anonymous CORS and no referrer; TASK-012 owns the one-way failure fallback and full responsive/resilient closure.
  Consequence: this plan requires the successful image state and reserves square space, but explicitly forbids adding fallback sources, retry logic, or claiming AC-006.

- Observation: the existing narrow Playwright smoke proves only the TASK-003 heading and API liveness. The final TASK-010 smoke needs isolated PostgreSQL data and exact avatar interception without contacting upstream character JSON.
  Consequence: extend the one existing smoke path and add only task-owned fixture support; do not create a second browser suite or a generic environment orchestrator.

## Decision Log

- Decision: creating this ExecPlan is planning authorization only. TASK-010 remains `Pending` until the project owner separately authorizes implementation.
  Rationale: accepted ADR-0017 and satisfied prerequisites provide direction and readiness, not execution authority.
  Date: 2026-08-20.

- Decision: use URL parameters `sort`, `status`, `species`, and `gender`. `sort=asc` is the A-Z default and is omitted from the canonical default URL; `sort=desc` selects Z-A. Status values are `alive`, `dead`, and `unknown`; gender values are `female`, `male`, `genderless`, and `unknown`. Unsupported sort, status, or gender values are removed. Species remains open text but is trimmed and lower-cased; a blank value is removed. Normalization replaces the current history entry before querying so malformed URLs do not create a Back/Forward loop. Sort uses one English `Intl.Collator` with case-insensitive base sensitivity and the positive numeric character ID as the tie-breaker.
  Rationale: this is the smallest reversible projection of SPEC-002, SPEC-006, HS-015, and HS-016 and avoids a second state store or fabricated species enumeration.
  Date: 2026-08-20.

- Decision: render one labeled form containing sort, status, species, and gender plus one `Apply filters` action. Status and gender are closed selects with an `Any` choice; species is a text input. Draft form values may remain component-local until submission, while the normalized URL is the sole owner of applied values and GraphQL variables.
  Rationale: one explicit submission boundary avoids debounce timers, request races, and a filter-state library while preserving reload and browser-navigation restoration.
  Date: 2026-08-20.

- Decision: the complete visible surface is the existing product title, one list heading, one filter/sort form, one query-state region, one result grid, and cards containing only name, image, and species. Loading is concise status text, empty is concise explanatory text, and request failure is concise text plus one `Retry` action.
  Rationale: these elements satisfy the task without inventing product complexity. They are recorded durably in DPL-DEC-049.
  Date: 2026-08-20.

- Decision: use one local GraphQL Code Generator configuration with checked-in client-neutral operation output and a project-owned typed fetch executor. Pin `@tanstack/react-query` 5.101.4 and reuse GraphQL 16.14.2 plus the repository's existing Codegen major line. Generate no hooks and add no GraphQL-client runtime.
  Rationale: this implements accepted ADR-0017 with the fewest runtime concepts and keeps operation generation reproducible. Registry metadata was read without installing packages on 2026-08-20.
  Date: 2026-08-20.

- Decision: the TASK-010 list query disables automatic retry, focus refetch, and reconnect refetch. The visible `Retry` action initiates the only failure recovery request. Its complete query key is `['characters', statusOrNull, speciesOrNull, genderOrNull]`; sort is excluded because it is a client-only transformation of the same server data.
  Rationale: this keeps request counts and the error state deterministic without adding custom timing, persistence, or invalidation policy.
  Date: 2026-08-20.

- Decision: self-host only Bangers 400 and Space Grotesk 400/500 through exact `@fontsource/bangers` 5.3.0 and `@fontsource/space-grotesk` 5.3.0 packages. Add no icon, animation, component, form, schema-validation, or CSS-in-JS dependency.
  Rationale: the two packages implement the existing visual authority without runtime font requests or a new design framework.
  Date: 2026-08-20.

- Decision: use three implementation milestones before closure. Only Milestone 3 materially changes rendered UI and therefore uses the conditional `frontend-visual` profile. Milestones 1 and 2 remain on the unchanged standard route.
  Rationale: generated operations, data access, caching, CORS, CSP, and test-fixture setup are nonvisual responsibilities and must not be routed to the specialized visual worker merely because they affect `apps/web`.
  Date: 2026-08-20.

## Outcomes & Retrospective

Planning outcome as of 2026-08-20: TASK-010 has a dependency-ordered, bounded plan and an accepted reuse/visual capsule. No product source, test, manifest, lockfile, dependency, runtime, task status, or acceptance status has been changed by creating the plan. Update this section only with evidence produced after separately authorized execution.

## Purpose / Big Picture

After TASK-010 is separately authorized and completed, visiting `/` in a real browser will show the 15 imported characters through the project GraphQL API. A user can read cards containing exactly name, image, and species; choose deterministic A-Z or Z-A ordering; apply status, species, and gender filters; reload or use Back/Forward without losing applied state; and distinguish loading, empty, and request-error outcomes.

The visible result remains deliberately small. It establishes the first browser-to-GraphQL-to-PostgreSQL product path without building detail navigation, mutations, a design system, a component workshop, or the responsive and image-failure work owned by later tasks.

## Context and Orientation

TASK-010 owns [FR-FE-001](../REQUIREMENTS.md#fr-fe-001---character-list), [FR-FE-002](../REQUIREMENTS.md#fr-fe-002---sorting), [NFR-001](../REQUIREMENTS.md#nfr-001---frontend-technologies), [AC-001 and AC-002](../REQUIREMENTS.md#8-minimum-acceptance-criteria). It also implements adopted optional [OR-003](../REQUIREMENTS.md#or-003---interface-filters) and contributes adopted optional OR-004 tests without reclassifying either as source-mandatory.

The governing decisions are [ADR-0002](../adrs/0002-use-typescript-across-the-stack.md), [ADR-0006](../adrs/0006-define-a-use-case-oriented-graphql-contract.md), [ADR-0009](../adrs/0009-keep-frontend-state-close-to-its-owner.md), [ADR-0014](../adrs/0014-persist-and-deliver-character-image-urls-directly.md), [ADR-0016](../adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md), and [ADR-0017](../adrs/0017-use-tanstack-query-with-a-project-owned-typed-graphql-executor.md). The routed observable rules are [SPEC-001, SPEC-002, and SPEC-006](../specs/SPEC.feature) plus the list/sort/filter portions of [HS-015, HS-016, and HS-017](../specs/HARD_SPEC.feature).

The UI authorities are the [field-visibility decision](../ui/README.md#ui-field-visibility-decision), [data-driven constraints](../ui/README.md#data-driven-design-constraints), and [Interdimensional Dark visual foundation](../ui/visual-foundations.md). DPL-DEC-049 owns the reversible TASK-010 choices that those authorities intentionally left open.

Existing implementation boundaries to reuse are:

- `apps/web/src/app.tsx` for root routing;
- `apps/web/src/shell.tsx` for the product frame and title;
- `apps/web/src/styles.css` for Tailwind and task-local tokens/styles;
- `apps/web/src/app.application.test.tsx` and `apps/web/src/shell.unit.test.tsx` for current route and shell characterization;
- `apps/web/server.ts` for built-web headers and history fallback;
- `apps/api/src/transport/graphql/schema.ts` as the single GraphQL schema source;
- `apps/api/src/app.ts` and `apps/api/src/transport/graphql/graphql-handler.ts` for the browser-to-GraphQL HTTP boundary;
- `playwright.config.ts` and `tests/smoke/walking-skeleton.smoke.test.ts` for the single existing narrow browser smoke.

Prerequisites TASK-005 and TASK-009 are complete. DG-001 through DG-004 and DG-006 are resolved through their accepted decisions, and AUTH-001 is Authorized for the bounded direct-avatar behavior. These facts make the task dependency-ready but do not replace separate execution authorization.

## Scope and Non-Goals

### Required visible elements

| Element | Exact TASK-010 responsibility | Reuse disposition |
|---|---|---|
| Application frame | Preserve one product title and add one semantic main-content outlet. No global navigation is needed yet. | `EXTEND` `apps/web/src/shell.tsx` |
| Character list route | Own URL normalization, query-state selection, result ordering, and composition of the controls and result grid at `/`. | `CREATE` one route-local component |
| Filter and sort controls | One labeled form: A-Z/Z-A sort select, status select, species text input, gender select, and one `Apply filters` button. | `CREATE` one task-local component |
| Character card | Render only `name`, native `imageUrl`, and `species`; use `id` only as the React key. Set meaningful alt text, anonymous CORS, and no-referrer on the native image. | `CREATE` one task-local component |
| Query states | Render loading text, empty text, or request-error text plus one Retry action in the route. Do not create one component per state. | `REUSE_AS_IS` route semantics; keep inline |
| Visual styles | Apply the documented dark tokens, visible 2-pixel cyan focus, restrained borders/spacing, and self-hosted documented fonts. | `EXTEND` `apps/web/src/styles.css` |

No present duplication justifies `EXTRACT_LOCAL`. Do not create a shared component package, design-system directory, primitive layer, generic card variants, generic data-state framework, or generalized form abstraction. Refresh this audit immediately before Milestone 3; tree drift or a newly available reusable owner stops Green until the coordinator accepts a new disposition.

Required visible copy is equally bounded:

| Owner | Exact visible copy |
|---|---|
| Product title | `Rick and Morty Explorer` |
| List heading | `Characters` |
| Controls | Labels `Sort`, `Status`, `Species`, and `Gender`; options `A-Z`, `Z-A`, `Any status`, and `Any gender`; action `Apply filters` |
| Loading | `Loading characters...` |
| Empty | `No characters match these filters.` |
| Error | `Characters could not be loaded.` and action `Retry` |

Status/gender option labels use their source names (`Alive`, `Dead`, `Unknown`, `Female`, `Male`, and `Genderless`). Do not add a hero statement, introduction, helper paragraph, result count, promotional copy, or decorative slogan.

### Required state and viewport matrix

| State or interaction | Required evidence in TASK-010 | Explicit boundary |
|---|---|---|
| Populated list | Fifteen imported summaries render through GraphQL; every card has only the three approved visible fields. | No result count, pagination, badges, or detail link |
| Loading | A stable text status is exposed while the list query is pending. | No skeleton library or decorative loader |
| Empty | A stable empty result is distinguishable from loading and failure. | No illustration or invented call to action |
| Request error | A stable non-sensitive message and one Retry action preserve the current query key. | No error-detail panel or notification framework |
| Sort and filters | Apply each control alone and in combination; reload and Back/Forward restore URL-derived state. | No Zustand or duplicate applied-state copy |
| Successful image | Exact governed avatar URL loads in a native image with `alt=<name>`, `crossorigin=anonymous`, and `referrerpolicy=no-referrer`. | Failure fallback/retry belongs to TASK-012 |
| 375 px and 1280 px | Inspect the populated route, controls, focus, and required states for usable hierarchy and no immediate horizontal overflow. | Supporting milestone evidence only; AC-006 and full 375/768/1280 closure belong to TASK-012 |

### In scope

- a client-neutral generated `Characters` operation returning exactly `id`, `name`, `imageUrl`, and `species`;
- one project-owned typed GraphQL fetch executor with ADR-0017 media-aware success/error mapping;
- one stable character-list query key derived from normalized GraphQL variables and one fresh `QueryClient` per test/application owner;
- the root Query provider and configurable browser GraphQL endpoint, defaulting to the documented loopback API and overridden for smoke;
- the four DPL-DEC-049 URL parameters, normalization, stable locale-aware case-insensitive sort with ID tie-breaker, and API variable mapping;
- explicit anonymous browser CORS for the two repository-owned loopback web origins and an enforcing built-web CSP for the exact avatar path;
- deterministic isolated smoke data created through existing import/persistence behavior with injected local character payloads, a unique PostgreSQL schema and Redis namespace, and unconditional exact-scope cleanup;
- the bounded visible elements and states in the tables above;
- focused unit/application tests, one extended narrow browser smoke, accepted real-browser evidence, and task-closure documentation.

### Out of scope

- `/characters/:id` behavior, selectable cards, detail links, favorites, comments, or any mutation; these belong to TASK-011 and TASK-008;
- name, origin, or type filters; a filter reset button; result counts; pagination; infinite scroll; virtualized lists; saved filters; autocomplete; suggestions; or a hard-coded species catalog;
- visible IDs, status, gender, type, origin, location, episode, favorite badges, comment counts, or any card metadata beyond name, image, and species;
- image proxying, assets, JavaScript image fetching, retries, alternate sources, failure fallback, provider telemetry, or full image-resilience proof;
- AC-006 closure, full responsive proof, the 768-pixel matrix, detail layouts, or resilient image/error presentation owned by TASK-012;
- Storybook activation, static mockups, screenshot-golden tests, visual-regression services, a component library, a design system, theme switching, runtime Google Fonts, icons, illustrations, gradients, glass, glow, oversized hero copy, decorative badges, or motion;
- GraphQL subscriptions, mutations, normalized entity caching, optimistic updates, offline persistence, SSR, hydration, authentication, localization infrastructure, analytics, or observability additions;
- a second smoke suite, live upstream character-JSON traffic, or live avatar dependency in automated tests.

If execution uncovers an attractive idea outside these boundaries, do not implement it. Record it only when a present, evidenced problem meets the repository's technical-debt policy; otherwise leave it untracked under YAGNI.

## Plan of Work

Execution may begin only after the owner explicitly authorizes TASK-010 and the primary coordinator updates the canonical task state to `In progress`. The implementation workflow ID will remain `TASK-010-20260820-01` unless a material authority change requires a successor plan identity.

For each implementation milestone, the primary issues one complete Milestone Assignment Packet v2, captures a fresh relevant-tree fingerprint, and routes sequential leases. The default budget is one preflight, one coherent Red or passing characterization, one Green with optional same-turn Refactor, at most one same-contract correction per role, and one review correction loop. The test worker may use at most three turns; the applicable implementation worker may use at most two. Stop after the same decisive failure twice, two no-diff write handoffs, an invalid Red, changed authority or visual capsule, dependency drift, a lease violation, contaminated external state, or exhausted budget.

No writer is parallel-safe in this worktree. Independent read-only dependency, reuse, and environment inspection may run concurrently before a write barrier. Red and Green are always sequential, and Milestone 3 cannot start until Milestones 1 and 2 pass their joins.

### Milestone 1: Typed list-query transport and cache ownership

Observable acceptance contract: a generated, client-neutral `Characters` document accepts only status, species, and gender variables and returns only the four `CharacterSummary` fields. The project-owned fetch executor sends the document and variables to the configured `/graphql` endpoint and applies ADR-0017 precedence for abort, network, GraphQL, decode/protocol, and HTTP failure. A small operation-specific decoder verifies that `data.characters` is an array of values containing string `id`, `name`, `imageUrl`, and `species`; generated TypeScript alone is not treated as runtime validation. Preserve only bounded HTTP status and stable GraphQL codes, never raw response bodies or internal detail. TanStack Query owns server data under the exact complete key recorded above, disables automatic retry/focus/reconnect requests, gives every test a fresh `QueryClient`, and gives the root application exactly one client instance. Neither executor nor query owner calls the upstream character API.

Before Red, a standard-profile setup lease may update only the web manifest/lockfile, web Codegen configuration/scripts, operation source, and generated output with exact pinned dependencies. Declarative setup is validated through generation/check/build; it does not justify an artificial behavior test.

Preflight target: current web manifest, routing composition, all web tests, API schema/codegen source, accepted ADR-0017, and installed lockfile graph. The test worker returns one ADR-0016 classification for generation drift, request serialization, media/error mapping, normalized query keys, cache isolation, and root provider ownership. Current planning inspection suggests `MISSING`; preflight remains authoritative.

Test ownership is limited to focused web unit/application tests for the executor, query owner, and provider. Green ownership is limited to the web manifest/lockfile, one web Codegen configuration and operation, checked-in generated output, one project-owned executor, one task-local list-query owner, and root Query provider composition. API behavior, visible list components, CSS, browser security headers, smoke infrastructure, and unrelated packages are frozen.

Risk is `S1`: ordinary bounded application/client integration. Escalate for a hand-edited generated file, generated hook/client runtime, unstable or non-serializable key, shared QueryClient across tests, swallowed GraphQL error, secret/error-detail exposure, upstream JSON request, extra summary field, or dependency outside the recorded set.

Focused Red/Green command shape, finalized against actual test filenames during preflight:

    npm exec -- vitest run --config vitest.config.ts --project web-unit --project web-application <Milestone-1 test paths>

Milestone validation:

    npm run typecheck
    npm run build --workspace @rick-and-morty/web

The generated-output drift check must be an authoritative web build prerequisite, mirroring the established API approach without sharing generated server types. A fresh `milestone_reviewer` performs the S1 semantic review. Milestone yield is typed list data and cache ownership only; it does not prove a rendered list, CORS/CSP, PostgreSQL, or browser behavior.

### Milestone 2: Isolated browser runtime and security-header boundary

Observable acceptance contract: a browser at the repository-owned development or built-web loopback origin can make an anonymous GraphQL request to `/graphql`, while an unrecognized origin does not receive permission. The built web response emits the ADR-0014 path-qualified avatar CSP. The single smoke environment creates a unique test-owned PostgreSQL schema and `character-app:test:t010-smoke-<runId>` Redis namespace, applies the existing migration, publishes the deterministic 15-character batch through existing import/persistence behavior with injected local payloads, starts the API against those identities, and always removes only its own schema and exact Redis prefix. No public character JSON or avatar request occurs in this milestone.

Preflight target: `apps/api/src/app.ts`, GraphQL handler/application tests, `apps/web/server.ts`, `.env.example`, `playwright.config.ts`, current smoke and lifecycle tests, migration/import composition, and test-owned PostgreSQL helpers. The test worker classifies CORS, CSP, smoke endpoint configuration, deterministic seed, and cleanup independently. Existing API/import tests may be reused only when their full evidence identity matches; current inspection suggests explicit browser CORS, CSP, and product-smoke ownership are `MISSING`.

Test ownership is limited to focused API/web header tests, `playwright.config.ts`, the existing smoke test, and the minimum task-local smoke fixture/cleanup support. Green ownership is limited to API GraphQL CORS configuration, built-web CSP/header composition, browser endpoint configuration, and the minimum production seam required by a valid Red. The visual route, controls, cards, CSS presentation, unrelated API behavior, import policy, migrations, and public upstream client are frozen.

Risk is `S2` because the milestone crosses browser, web server, GraphQL HTTP, PostgreSQL, Redis, migration/import, and lifecycle boundaries. Escalate for wildcard credentials, an origin derived from untrusted request data, a broader `img-src`, schema/database or Redis cleanup without exact ownership, live upstream JSON, public avatar access, a production test branch, a second migration/import implementation, or lifecycle residue.

Focused commands are selected by the Red but must remain within existing projects and the one smoke boundary. Milestone validation includes:

    npm run typecheck
    npm run build
    npm run test:application
    npm run test:smoke
    npm run test:smoke:lifecycle

Record the unique schema, PostgreSQL container/port, Redis container/port/namespace, web/API ports, CSP value, allowed/disallowed origin results, network-denial evidence, exact-prefix empty readback, and cleanup result. A fresh `independent_reviewer` performs the S2 cross-boundary review. Milestone yield is a deterministic browser runtime foundation only; it does not prove cards, visual quality, sort, filters, or AC-001/AC-002.

### Milestone 3: Bounded visible character-list experience

Observable acceptance contract: `/` renders the exact visible surface defined above. Fifteen real imported summaries appear as cards containing only name, image, and species. The default is stable A-Z; Z-A reverses name order while ties remain deterministic by ID. Status, species, and gender each affect the URL, GraphQL variables, and visible results, and the combined state survives reload plus browser Back/Forward. Loading, empty, and request-error/retry states remain distinct. Exact avatar requests are native, anonymous, no-referrer requests permitted only by the accepted CSP and locally intercepted with deterministic CORS-enabled 300-by-300 fixtures.

Preflight target: every current web component/style/test/fixture path, Milestones 1 and 2 evidence, DPL-DEC-005, DPL-DEC-006, DPL-DEC-049, UI field constraints, and the accepted reuse audit refreshed against the current tree. The test worker classifies the grouped card/list/state/sort/filter/navigation contract. The slice contains multiple scenarios because they jointly define one root list experience; it must not be split into styling microcycles or expanded into later-task behavior.

Test ownership is limited to focused card/route unit and application tests plus the existing narrow smoke test. The frozen accepted Red must cover approved card fields and exclusions, stable both-direction sorting, each filter, combined variables/URL, normalization, reload, Back/Forward, loading, empty, error, retry, image attributes, and the final real path. Green ownership is limited to `apps/web/src/app.tsx`, `apps/web/src/shell.tsx`, `apps/web/src/styles.css`, the three accepted task-local component owners, and exact font imports. Data-access semantics, generated output, manifests/lockfile, API, servers, smoke fixture ownership, and tests are frozen.

Risk is `S2` because the first visible product slice integrates rendered state, URL navigation, a generated GraphQL client boundary, real PostgreSQL data, CSP-governed cross-origin images, and browser evidence. Escalate for a new visible field/control, changed URL decision, duplicated applied state, unstable sort, filter not reaching GraphQL, hidden error, missing keyboard focus, unavailable reuse owner, new component/dependency beyond the capsule, live public network access, fallback behavior, or responsive-closure claim.

Conditional frontend-visual capsule:

- Implementation profile: `frontend-visual`.
- UI/design authorities: DPL-DEC-005, DPL-DEC-006, DPL-DEC-049, `docs/ui/README.md`, and `docs/ui/visual-foundations.md`.
- Reuse audit: refresh `TASK-010-REUSE-20260820-01`; preserve `EXTEND` for Shell/styles and `CREATE` only for the route, controls, and card unless drift is reconciled.
- Required states: populated, loading, empty, request error with Retry, and successful image. Mutation pending and image failure are not applicable to this task.
- Viewports/interactions: Chromium at 375 by 812 and 1280 by 800; keyboard through every control and Retry; Apply, reload, Back, and Forward; inspect populated plus loading/empty/error without claiming TASK-012 closure.
- Browser evidence: the single TASK-010 product smoke against the exact Milestone 2 schema/container/build identities, with deterministic local avatar interception, screenshot only when it materially supports visual review, and network/console inspection for the governed GraphQL/avatar boundaries.
- Prohibited scope: every item in this plan's out-of-scope list, especially Storybook, mockups, extra card fields, detail navigation, reset/count/pagination controls, image fallback, theme switcher, gradient/glass/glow/badges/motion, or a new frontend dependency.

Focused Red/Green command shape, finalized to the accepted test paths:

    npm exec -- vitest run --config vitest.config.ts --project web-unit --project web-application <Milestone-3 test paths>

Milestone validation:

    npm run typecheck
    npm run build --workspace @rick-and-morty/web
    npm run validate:tailwind
    npm run test:smoke

The specialized `frontend_code_worker` performs Green and optional same-turn behavior-preserving Refactor only after the primary accepts the refreshed audit and complete capsule. A fresh `independent_reviewer` performs the S2 review, including the same accepted reuse dispositions and browser evidence. Milestone yield is SPEC-001, SPEC-002, SPEC-006 and the TASK-010 portions of HS-015 through HS-017, subject to integrated closure.

### Milestone 4: Integrated validation, acceptance, and closure

This is a standard evidence/documentation milestone and contains no frontend-visual marker. First perform a cumulative relevance audit: every test must map to TASK-010 behavior or a changed shared boundary, every fixture must be deterministic, no public network may be required, no focused/skipped/pending test or obsolete duplicate may remain, and the single smoke must still prove browser -> project GraphQL -> PostgreSQL plus exact locally intercepted avatar requests.

Run the complete authoritative closure packet once on the exact candidate:

    npm run typecheck
    npm run build
    npm run validate:tailwind
    npm run test:unit
    npm run test:integration
    npm run test:application
    npm run test:smoke
    npm run test:smoke:lifecycle
    python .agents/skills/verify-repository/scripts/validate_docs.py
    python .agents/skills/govern-adrs/scripts/validate_adrs.py
    git diff --check

Record exact Node/npm versions, candidate commit/tree or relevant-tree fingerprint, generated-output identity, PostgreSQL container/port/schema, Redis identity if the list path exercised it, web/API ports, Chromium version, avatar fixture digest, intercepted request list and headers, blocked upstream JSON evidence, counts, teardown result, and dirty-tree scope. External-state evidence is not reusable without all identities.

A fresh `independent_reviewer` performs the integrated S2 acceptance review against FR-FE-001, FR-FE-002, NFR-001, adopted OR-003/OR-004, AC-001, AC-002, SPEC-001, SPEC-002, SPEC-006, HS-015, HS-016, and HS-017. The primary alone reconciles the verdict, updates authoritative task/acceptance/current-status owners, writes or links the dated review, completes the documentation-impact table, moves this plan to `docs/plans/completed/`, repairs links, reruns documentation validation, and declares closure.

TASK-010 is done only when all of the following are true:

- the exact list/card/sort/filter/URL/state behavior passes focused and integrated tests;
- the final narrow browser smoke renders the deterministic imported 15 through project GraphQL and PostgreSQL with no upstream character-JSON dependency;
- exact avatars are locally intercepted and demonstrate anonymous CORS/no-referrer under the enforcing path-qualified CSP;
- the accepted reuse audit and visual capsule have no unresolved review finding;
- no out-of-scope component, field, interaction, dependency, or later-task claim was introduced;
- task-owned external state and processes are clean;
- the task-closure documentation gate passes and canonical TASK-010/AC states are truthful.

## Concrete Steps

All commands run from the repository root unless a command explicitly selects a workspace.

1. At the future activation checkpoint, read back TASK-010, DPL-DEC-049, this plan, current authority states, and the working tree. Obtain explicit execution authorization and then update TASK-010 to `In progress` before starting a lease.
2. Refresh registry metadata before a manifest write. If a selected exact version or peer range drifted, stop for a planning decision rather than silently changing the dependency contract.
3. Execute Milestone 1 through the standard `test_worker` -> `code_worker` route, close every lease, accept evidence, and obtain its S1 review before advancing.
4. Execute Milestone 2 through the standard route against uniquely owned PostgreSQL/browser state, verify unconditional cleanup, and obtain its S2 review before advancing.
5. Refresh and accept the reuse audit and frontend-visual capsule. Execute Milestone 3 through `test_worker` -> `frontend_code_worker`, capture browser evidence at the two named viewports, close every lease, and obtain its S2 review.
6. Freeze the candidate, perform the relevance audit and one closure packet, request a fresh integrated S2 acceptance review, and correct only actionable in-scope findings through a new bounded cycle.
7. Reconcile documentation and status only after PASS. Preserve historical reviews and this living chronology; archive the plan only after the documentation gate passes.

## Validation and Acceptance

Focused milestone commands prove only their assigned contracts. A passing jsdom component test does not prove browser navigation, CSP, native image headers, responsive behavior, or PostgreSQL. A passing browser screenshot does not prove field exclusions, sort stability, URL normalization, query variables, or error taxonomy. The final acceptance claim therefore requires the combined test boundaries listed above.

The acceptance reviewer must explicitly report:

- card field inclusion and exclusion;
- default and reverse stable sort results;
- each adopted filter and combined filter variables/results;
- canonical URL, invalid-value recovery, reload, Back, and Forward;
- loading, empty, error, Retry, and successful-image states;
- keyboard focus and the two milestone viewports without promoting AC-006;
- generated-operation drift, typed executor errors, query-key/cache ownership, and fresh-client isolation;
- GraphQL CORS, built-web CSP, exact avatar URL/headers, upstream JSON denial, real PostgreSQL path, and cleanup;
- reuse dispositions, prohibited-scope audit, dependency audit, and documentation impact.

Do not accept TASK-010 using live public API availability, a static mockup, Storybook, a screenshot alone, an in-memory repository alone, a preexisting database, or reused external-service evidence without identity.

## Idempotence and Recovery

- URL parsing and normalization are pure and repeatable; applying the same values produces the same canonical URL and query key.
- Generated output is reproduced from checked-in schema/operation/config and rejected on drift; never hand-edit it.
- The task-owned smoke fixture uses one unique PostgreSQL schema and `character-app:test:t010-smoke-<runId>` Redis namespace per run, applies existing migrations/import behavior, and removes only that schema and exact namespace prefix in `finally`. It never drops the repository default database, deletes a broad Redis pattern, or acts on an unverified identity.
- Avatar interception is local and exact. A non-avatar request to the public Rick and Morty domain fails the smoke instead of falling through to the network.
- Browser/server processes and ports are owned by Playwright/lifecycle checks and must be empty after success or failure.
- If an external prerequisite is unavailable, report `Blocked`; do not replace real-boundary acceptance with a unit test or live shared service.
- If a milestone changes a binding requirement, URL decision, reuse disposition, dependency, side effect, validation command, or visual capsule, close the lease and return to the primary for a replacement packet.
- Never reset or clean the user's worktree. Preserve unrelated changes and use exact path leases.

## Artifacts and Notes

Planning evidence `TASK-010-REUSE-20260820-01`:

- repository baseline: `40590b5d9ecf9fff5c78f67a0b511a4ba632e6b0`;
- `apps/web/src/app.tsx`: `75066b2ccaac0d0cc101174d776c9c0772afb4a4`;
- `apps/web/src/shell.tsx`: `f3a57b4840374ff9258731ad11bb618ef7cb7d14`;
- `apps/web/src/styles.css`: `f1d8c73cdcf9eaacb01fec99963ad78d591305ae`;
- `apps/web/package.json`: `bbe64dc132b3671342361c5d337c4dafbee89ec5`;
- `apps/web/server.ts`: `f22552bc3a95ad2a1406cd37d0963ac8cfaa3629`;
- `tests/smoke/walking-skeleton.smoke.test.ts`: `c4515eff758eb6cb72997fc6fabab3b4331667d5`;
- `playwright.config.ts`: `2fcfb118213d05bd728a7e667c8d24fb828ebed3`.

This evidence establishes only the planning-time absence/presence and reuse dispositions. It is stale for Green if any listed path changes.

Expected implementation path families, subject to accepted preflight and exact leases:

- `apps/web/package.json`, `package-lock.json`, and one web Codegen config/script;
- `apps/web/src` operation/generated/data owners, existing app/shell/styles, and the three accepted task-local component owners;
- focused web unit/application tests;
- `apps/api/src/app.ts` and/or the existing GraphQL handler plus focused application tests for CORS;
- `apps/web/server.ts` for CSP;
- `.env.example`, `playwright.config.ts`, the existing smoke test, and minimum task-owned smoke fixtures;
- affected documentation and one dated acceptance review at closure.

This list is orientation, not a pre-authorized write lease. The actual packet must use exact paths and freeze every unassigned boundary.

## Interfaces and Dependencies

ADR-0017 proportionality readback:

| Dimension | Planned TASK-010 cost and boundary |
|---|---|
| Dependencies | Two data-boundary runtime packages (`@tanstack/react-query` and already-selected `graphql`), two self-hosted font packages required by DPL-DEC-006, and direct declarations for the already lock-resolved Codegen plugins; no full GraphQL client or validation library |
| Authored files | One Codegen config, one operation source, one executor/decoder owner, one key/query owner, one provider integration, and the three visual components accepted by the reuse audit |
| Configuration | One browser GraphQL endpoint with documented local/smoke values, one generate/check script pair, explicit anonymous loopback CORS, and one built-web CSP; no new state store or service configuration framework |
| Generated artifacts | One checked-in client-neutral output for the TASK-010 list operation; no hooks, mutation output, fragment masking, or server-type sharing |
| Tests | Focused existing Vitest projects plus the one existing Playwright smoke; no new runner, mock-server package, Storybook, snapshot suite, or visual-regression service |
| Build effects | Web build gains one deterministic generation-drift prerequisite and local font assets; record generated bytes, built asset sizes, and command duration during Milestone 1 and stop if they contradict this bounded projection |
| Maintenance | Query keys, executor classification, and list decoding remain centralized in two task-local data owners; presentation receives typed data and no direct QueryClient API |

Planned direct web runtime dependencies:

- `@tanstack/react-query` 5.101.4;
- `graphql` 16.14.2;
- `@fontsource/bangers` 5.3.0;
- `@fontsource/space-grotesk` 5.3.0.

Planned direct web development dependencies reuse the repository's existing Codegen toolchain and current lock-compatible plugins:

- `@graphql-codegen/cli` 7.2.0;
- `@graphql-codegen/typescript` 6.1.0;
- `@graphql-codegen/typescript-operations` 6.1.6;
- `@graphql-codegen/typed-document-node` 7.1.0;
- `@graphql-typed-document-node/core` 3.2.0.

Do not add Apollo Client, urql, Relay, graphql-request, Axios, Zustand, Redux, a router replacement, a form library, a schema-validation library, a component framework, an icon package, an animation library, Storybook, or a visual-regression service.

The generated operation interface is conceptually:

    query Characters($filter: CharacterFilter) {
      characters(filter: $filter) {
        id
        name
        imageUrl
        species
      }
    }

The project-owned executor accepts a typed document, exact variables, and a narrow operation decoder, then returns validated typed data or one stable ADR-0017 error category. The list query owner accepts normalized `{ status?, species?, gender? }` and keys it as `['characters', status ?? null, species ?? null, gender ?? null]`; sort never reaches GraphQL. The visible route consumes that query owner and sorts a copy of returned summaries without mutating cached data or directly accessing the QueryClient.

The browser endpoint defaults to `http://127.0.0.1:3000/graphql` for the documented local composition and is overridden to `http://127.0.0.1:4174/graphql` by the smoke build. Only `http://127.0.0.1:5173` and `http://127.0.0.1:4173` are accepted browser origins for anonymous GraphQL access in the current loopback-only deployment. Do not add credentials or infer an allowed origin from arbitrary request input.

## Revision Note

2026-08-20: created the first TASK-010 ExecPlan from the dependency-ready canonical task, recorded the remaining reversible UI choices, accepted a bounded reuse audit, separated two standard nonvisual milestones from one frontend-visual milestone, and excluded later-task or speculative visual work. TASK-010 remains `Pending`; implementation was not started.
