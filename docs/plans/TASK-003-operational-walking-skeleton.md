# Establish the TASK-003 Operational Walking Skeleton


This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.


## Purpose / Big Picture


TASK-003 is the first executable node in the canonical implementation graph. It turns the documentation-only repository into the smallest operational modular-monolith workspace that a contributor can install, type-check, build, test, and start through documented root commands. A reviewer must be able to see a minimal React 18 shell in Chromium, request `GET /healthz` from the Express process and receive HTTP 200 with exactly `{ "status": "ok" }`, and observe healthy PostgreSQL and Redis containers that remain independent of application liveness.

This plan is intent, not runtime evidence. At plan registration the repository has no package manifest, lockfile, application source, test runner, browser binary, Compose definition, or executable application command. Creating this plan does not start TASK-003, satisfy NFR-001 or NFR-003, make AC-007 or AC-012 pass, or prove any product behavior. When the task eventually completes, it will establish an operational foundation only; the first browser-to-GraphQL product slice remains TASK-010.


## Progress


- [x] (2026-08-11 20:54Z) Read the documentation map, TASK-003 authority, mapped requirements, current accepted ADRs, routed HS rules, active gates, plan convention, and current repository tree; `git status --short` was empty and no executable workspace artifact existed.
- [x] (2026-08-11 20:54Z) Created and registered this task-scoped ExecPlan while preserving TASK-003 as `Pending`, adding accepted ADR-0011 to the canonical governing-decision list, and recording plan creation without starting implementation.
- [x] (2026-08-11 21:26Z) Validated the final post-review registration reconciliation: documentation validation passed for 42 Markdown files, 41 requirement IDs, 1 authorization, 17 tasks, 17 SPEC rules, 20 HS rules, and 119 scenarios; ADR validation passed for 14 ADRs and 38 mapped requirements with only the known NFR-006 warning; `git diff --check` and the cached check passed with line-ending notices only; changed paths remain README/documentation only; trailing-whitespace and executable-workspace/Python-cache discovery returned no paths.
- [x] (2026-08-11 21:24Z) Obtained fresh independent final review `PASS` on the corrected complete registration tree, including reviewed plan SHA-256 `4AEEE0B1F0FED6EAA65CF6B36CF90D585F896B3BB52CAB69182F12827D7C5156`; two provisional Majors plus later smoke-scope and closure-wording findings were corrected before the verdict, and no Blocker, Major, or Minor remains. TASK-003 stayed `Pending` and unstarted.
- [ ] Start TASK-003 only after a separate execution instruction: update the canonical task state to `In progress` first, synchronize the root status and plan index, and append a distinct `Started` execution-log entry.
- [ ] Reconfirm supported tool versions from primary sources and record the next unused `DPL-DEC-*` choice or choices for package manager and lockfile, Node.js and browser targets, web build tool, workspace names, ports and origins, environment keys, Compose identity, root process orchestration, and the smoke-lifecycle command and supported triggers before adding dependent artifacts.
- [ ] Resolve the ADR-0011 Windows-and-continuous-integration evidence boundary, or preserve it as an explicit task-closure blocker, before claiming lifecycle conformance or TASK-003 completion.
- [ ] Bootstrap only the declarative workspace, strict TypeScript, package, ignore, environment-example, and test-registration foundations needed for the first Red cycle; keep every inactive future scope absent.
- [ ] Complete and record separate React shell and BrowserRouter-owned application-composition Red-Green-Refactor cycles through the package-local web unit and application boundaries.
- [ ] Complete and record the runtime-configuration and Express `GET /healthz` Red-Green-Refactor cycles through Node unit/application boundaries.
- [ ] Complete and record the native build/start Chromium smoke Red-Green-Refactor cycle with two owned foreground processes, then validate Tailwind as declarative configuration through an automated production-build/output check that does not extend the smoke contract.
- [ ] Add and verify isolated PostgreSQL and Redis Compose health without connecting either application or the liveness route to those services.
- [ ] Run the supported Windows and continuous-integration smoke-lifecycle matrix, including port-release proof for success and every defined failure or interruption trigger.
- [ ] Perform an isolated clean-checkout verification, the ADR-0010 test-relevance audit, documentation impact review, task definition of done, and independent closure review.
- [ ] After TASK-003 is canonically `Complete` and the task-closure documentation gate passes, preserve this plan under `docs/plans/completed/` with its stable filename and repair every inbound link.


## Surprises & Discoveries


- Observation: The repository is still documentation-only even though four decision tasks are complete. There is an existing root `.gitignore`, but no `package.json`, lockfile, `apps/`, `packages/`, TypeScript configuration, test configuration, `compose.yaml`, `.env.example`, or application/test source. Evidence: `git status --short`; `rg --files`; root [repository status](../../README.md#repository-status).

- Observation: The canonical TASK-003 record omitted ADR-0011 even though that accepted ADR explicitly assigns TASK-003 the first unit, application, strict type-check, and Chromium smoke implementation. This registration corrects the governing-decision list without changing scope or status. Evidence: [TASK-003](../IMPLEMENTATION_PLAN.md#task-003---establish-the-operational-walking-skeleton) and [ADR-0011](../adrs/0011-define-the-typescript-test-harness.md#validation).

- Observation: ADR-0001 is preserved `Superseded` history, not current workspace authority. Accepted ADR-0014 carries forward its workspace, one-process API, contract-only shared package, root command, Compose, isolation, and no-microservice constraints. Evidence: [ADR-0014 whole-record lifecycle](../adrs/0014-persist-and-deliver-character-image-urls-directly.md#whole-record-lifecycle-and-carried-forward-architecture).

- Observation: DG-005 blocks TASK-004 migration-lock work, not TASK-003. Nevertheless, it reinforces the negative boundary: this task must not create migrations, a migration runner, an integration-test registry, Sequelize behavior, migrated schemas, or an ERD. DG-003 likewise keeps every frontend GraphQL-client artifact outside this task. Evidence: [active decision gates](../IMPLEMENTATION_PLAN.md#active-decision-gates) and the canonical task index.

- Observation: ADR-0011 requires normal completion, startup failure, assertion failure, timeout, cancellation, and interruption to release both owned ports on Windows and continuous integration, but it also leaves continuous-integration provider selection absent unless a later accepted decision changes scope. The repository has no CI provider or configuration. Local work can proceed, but TASK-003 cannot truthfully close the CI half until the project owner supplies an existing evidence route or the governing authority is reconciled through its normal workflow. Evidence: ADR-0011 Decision paragraphs for process cleanup and [Validation](../adrs/0011-define-the-typescript-test-harness.md#validation).

- Observation: ADR-0011 does not define executable cancellation and interruption triggers, and an arbitrary hard machine or runner termination cannot guarantee child cleanup. Before lifecycle code is added, a reversible execution decision must define bounded supported triggers and observable results. If that choice changes the accepted process-ownership semantics, execution must stop for the ADR lifecycle instead of hiding the change in a helper script.

- Observation: The TASK-003 shell, liveness route, and smoke have no product `SPEC-*` rule. They are ordinary task-local tests traceable to TASK-003 and HS-001, HS-006, HS-007, HS-017, and HS-019; they do not make the Gherkin files executable or satisfy SPEC-008, SPEC-014, SPEC-017, AC-007, AC-012, or another acceptance criterion. Evidence: [specification routing](../specs/README.md#codex-rule-routing) and DPL-DEC-012 in the [decision log](../execution/decision-and-progress-log.md#decision-log).

- Observation: The initial draft put BrowserRouter ownership and a consumed Tailwind entry into the Green for a smoke Red that observed only process startup, shell visibility, and liveness. Fresh independent review correctly found that those edits were not required by that failure and therefore violated ADR-0010's third law. A first correction gave Tailwind a separate computed-style assertion, but final-state review then found that ADR-0011 limits the TASK-003 smoke to only the visible shell and exact `/healthz` response. The current plan gives routed composition its own jsdom application cycle and treats Tailwind integration as declarative configuration proven by automated production-build output, without adding a browser assertion.


## Decision Log


- Decision: Register the ExecPlan without starting TASK-003.
  Rationale: A living plan is explicitly requested and the task is dependency-ready, but plan creation is not implementation evidence and does not itself authorize a task-state transition.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Treat ADR-0014 as the current workspace authority and cite ADR-0001 only as preserved historical provenance.
  Rationale: ADR-0014 supersedes ADR-0001 as a whole record while explicitly carrying forward the modular-monolith constraints TASK-003 must implement.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Do not create a Decision Review Contract for this plan.
  Rationale: TASK-003 implements accepted architecture and does not compare consequential architecture options, prepare an ADR, or resolve a decision gate. Its unselected package, runtime, port, and orchestration details are reversible execution choices that must be recorded in the global DPL before dependent artifacts. A discovered architecture conflict still stops work and enters the ADR workflow.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Activate only the unit, non-browser application, and Chromium smoke scopes during TASK-003; keep `test:integration` absent.
  Rationale: ADR-0011 assigns those three scopes to TASK-003 and assigns first integration activation to TASK-004. An inactive scope is neither skipped nor reported as passing.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Use separate Red-Green-Refactor cycles for the semantic React shell, BrowserRouter-owned application composition, runtime configuration, Express HTTP liveness, and built-process smoke wiring.
  Rationale: The separation keeps every Red diagnostic and Green implementation small, prevents declarative bootstrap from becoming untested production behavior, and supplies the exact evidence required by ADR-0010 and the TASK-003 validation contract.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Validate the consumed Tailwind foundation through a dedicated production-build/output command, not through an assertion in the authoritative smoke.
  Rationale: ADR-0010 permits declarative configuration to use automated build/runtime outcomes instead of an artificial unit test, while ADR-0011 fixes the TASK-003 smoke assertions to only the visible shell and exact liveness response. The build check proves toolchain consumption without making a CSS layout or responsive claim.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Keep `packages/shared` structurally present but do not invent dummy exports, backend models, or an empty registered test project merely to populate it.
  Rationale: ADR-0014 restricts the shared package to stable cross-boundary contracts. TASK-003 may add a real operational contract only if a Red cycle demonstrates a current consumer; otherwise package metadata and boundary configuration are sufficient for this milestone.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Make the documented root development workflow start web, API, PostgreSQL, and Redis, while keeping the authoritative TASK-003 smoke independent of infrastructure.
  Rationale: ADR-0014 carries forward the requirement for one root workflow that starts all required local components, whereas ADR-0011 explicitly limits the smoke to two application processes with no database or cache readiness dependency.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Verify the exact DPL-recorded direct-dependency allowlist, then check known gate-blocked families in every workspace manifest and through a broad source/test token search.
  Rationale: An import-pattern-only search can miss an unanticipated client/cache package, forbidden direct dependency, side-effect import, dynamic import, or require call. The allowlist plus broad checks favor reviewable false positives over a false pass across DG-003 and the TASK-003 migration/cache boundaries.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Treat valid Windows and continuous-integration lifecycle evidence as a closure join under current ADR-0011, replaceable only by a completed, accepted, and fully synchronized authority reconciliation.
  Rationale: The accepted ADR simultaneously requires both environments and keeps provider selection out of scope. The ExecPlan cannot manufacture evidence, treat authorization to begin reconciliation as completion, or amend that authority.
  Date/Author: 2026-08-11 / Codex primary thread.


## Outcomes & Retrospective


Plan registration and its independent final evidence review are the only completed outcomes. The corrected registration received `PASS` with no open finding. TASK-003 remains `Pending`; no dependency, command, application process, infrastructure container, test, browser binary, or acceptance evidence has been created. The plan makes the implementation sequence restartable and surfaces the unresolved CI evidence boundary before code can be mistaken for complete delivery.

At each major milestone, append the observed result here: what became runnable, the exact Red/Green/Refactor evidence, any change in cost or scope, the state of the lifecycle evidence boundary, and what remains before closure. At completion, compare the clean-checkout and reviewer observations with the purpose above and record any lesson that must constrain TASK-004.


## Context and Orientation


The root [documentation map](../../README.md#documentation-map) is the entry point. [REQUIREMENTS.md](../REQUIREMENTS.md) owns the source-normalized scope. The [ADR index](../adrs/README.md) and accepted ADRs own architecture. [IMPLEMENTATION_PLAN.md](../IMPLEMENTATION_PLAN.md) owns task status, dependencies, gates, and the TASK-003 definition of done. [HARD_SPEC.feature](../specs/HARD_SPEC.feature) is derived intent only. The global [decision and progress log](../execution/decision-and-progress-log.md) owns reversible `DPL-DEC-*` choices and chronology. This plan decomposes TASK-003 only.

The direct scope mappings are:

| ID | TASK-003 contribution | What TASK-003 must not claim |
|---|---|---|
| [NFR-001](../REQUIREMENTS.md#nfr-001---frontend-technologies) | Establish a consumed React 18, React Router DOM, and Tailwind shell foundation. Keep frontend GraphQL client work gate-blocked. | Completion of the product frontend, GraphQL data access, responsive UI, or SPEC-014. |
| [NFR-003](../REQUIREMENTS.md#nfr-003---backend-technologies) | Establish the Express process and independently healthy PostgreSQL/Redis local infrastructure. | GraphQL product behavior, Sequelize persistence, Redis application use, or readiness coupling. |
| [NFR-004](../REQUIREMENTS.md#nfr-004---code-quality) | Create small, intention-revealing web/API boundaries and keep comments limited to non-obvious constraints. | Final code-quality acceptance for later product modules. |
| [OR-001](../REQUIREMENTS.md#or-001---typescript) | Implement the adopted optional strict TypeScript/ESM baseline for all application and test source. | Reclassifying TypeScript as source-mandatory. |
| [OR-008](../REQUIREMENTS.md#or-008---design-patterns) | Demonstrate the accepted workspace and app/server ownership boundaries without speculative abstraction. | Claiming that every later application, repository, cache, or transport pattern exists. |
| AC-007 | Provide an Express-process and liveness foundation only. | `GET /healthz` is not GraphQL and cannot make AC-007 pass. |
| AC-012 | Provide honest install/build/test/start navigation for the artifacts created here. | DEL-002, complete DEL-003, or AC-012; migrations, ERD, import, and GraphQL usage remain absent. |

TASK-001 is complete and DG-001 is resolved through accepted ADR-0011, so TASK-003 is dependency-ready. TASK-003 remains `Pending` until explicitly started. TASK-004 is its direct successor, but TASK-004 also waits for the separate DG-005 migration-lock successor approval. AUTH-001 is `Authorized`, DG-006 is resolved, and ADR-0014 is accepted; none transfers image-specific work into this task.

The effective accepted decisions are:

- [ADR-0002](../adrs/0002-use-typescript-across-the-stack.md): strict TypeScript, ESM, documented Node.js/browser targets, runtime input validation, separate no-emit type checking, and production-build proof.
- [ADR-0006](../adrs/0006-define-a-use-case-oriented-graphql-contract.md): GraphQL remains the sole product API. The operational liveness exception must not become a parallel REST product surface.
- [ADR-0010](../adrs/0010-use-a-targeted-automated-testing-strategy.md): one observable Red-Green-Refactor cycle at a time, exact handoff evidence, deterministic tests, and a completion test-relevance audit.
- [ADR-0011](../adrs/0011-define-the-typescript-test-harness.md): Vitest projects with explicit Node/jsdom environments, a separate strict `typecheck`, one Chromium/one-worker Playwright smoke with two owned processes, incremental scope activation, no TASK-003 integration scope, and lifecycle cleanup evidence.
- [ADR-0014](../adrs/0014-persist-and-deliver-character-image-urls-directly.md): current carried-forward workspace, shared-package, root-command, Compose, one-process API, isolation, and no-microservice rules. Its image semantics are outside TASK-003.

The directly applicable derived rules are HS-001, HS-006, HS-007, HS-017, and HS-019. SPEC-014 through SPEC-017 and HS-018 remain downstream delivery guardrails; TASK-003 contributes foundations but does not execute or satisfy them. DPL-DEC-012 keeps both feature files non-executable.


## Scope and Non-Goals


TASK-003 includes the smallest complete foundation for:

- one workspace with root/package manifests, exactly one selected lockfile, documented runtime targets, strict shared and environment-specific TypeScript configurations, and `apps/web`, `apps/api`, and `packages/shared` ownership;
- a minimal accessible React 18 shell mounted through a real browser entry, with React Router DOM and Tailwind used by a current shell consumer rather than installed unused;
- an Express application factory separated from the listening process and an operational `GET /healthz` route returning HTTP 200 and exactly `{ "status": "ok" }`;
- runtime validation for the environment values the web/API processes actually consume;
- ADR-0011 unit, application, and smoke scopes, separate root `typecheck`, deterministic single-run commands, and a root `test` that runs the currently registered scopes in canonical `unit -> application -> smoke` order;
- one Chromium/one-worker smoke with two foreground, non-detaching owned server entries, `reuseExistingServer: false`, bounded waits and assertions, visible server logs, failure screenshots/traces, and explicit port-release evidence;
- root Compose ownership of healthy PostgreSQL and Redis with non-secret example configuration, unique execution identity, scoped teardown, and no application dependency on either service yet;
- authoritative root install, type-check, test, build, development, production-start, browser-install, infrastructure, and smoke-lifecycle navigation for only the artifacts that exist by task closure.

The following remain outside TASK-003:

- a frontend GraphQL client, provider, cache, operation, generated type, hook, query, mutation, error integration, or browser-to-GraphQL request while DG-003 remains pending;
- a GraphQL schema, resolver, product route, application service, repository, Sequelize model, migration, migration runner, migrated test state, Redis client, cache behavior, importer, seed command, ERD, or live public-API request;
- `test:integration`, a placeholder integration project, a skipped future scope, or a claim that an inactive scope passes;
- character data, cards, sorting, search, details, favorites, comments, images, CSP, fallback, Storybook, broad end-to-end coverage, executable Gherkin bindings, numeric coverage gates, or deferred optional features;
- making the React application call `/healthz`; the smoke observes web and API independently;
- coupling `/healthz` to GraphQL, PostgreSQL, Redis, readiness, product data, or an upstream service;
- selecting a continuous-integration provider without the accepted authority change ADR-0011 requires;
- changing an ADR, gate, authorization, task dependency, requirement scope, or acceptance result from this ExecPlan.


## Plan of Work


### Milestone 0: Register the plan without starting implementation


Add this active plan, register it in `docs/plans/README.md`, link it from TASK-003, add the missing ADR-0011 governing reference, note the active plan in the root current-status summary, and append one `Planned` chronology row. Keep TASK-003 `Pending`, the application-absence statement true, and every gate state unchanged. Validate the documentation-only diff and obtain an independent review before treating registration as complete.


### Milestone 1: Start the task and fix reversible execution interfaces before artifacts


When the project owner separately directs execution, re-read the exact current state and confirm TASK-001 remains complete, DG-001 remains resolved, ADR-0011 remains accepted, and no concurrent change has claimed TASK-003. Change TASK-003 to `In progress` in the canonical task owner, synchronize the root status and plan index, and append a distinct `Started` record before implementation claims.

Use current primary documentation to find a supported common Node.js version for React 18, the stable Vitest line, Playwright, the selected package manager, TypeScript, the selected web build tool, and Express. Record the evidence date and exact versions. Allocate the next unused `DPL-DEC-*` ID or IDs only after re-listing the log. Record the package manager and lockfile, package/workspace names, Node.js and browser targets, web build and production-start mode, web/API development and smoke ports, host/origin rules, environment keys and defaults, Compose project/service identity, root foreground process orchestration, the proposed lifecycle command name, bounded cancellation/interruption triggers, the exact direct-dependency allowlist by workspace and current consumer, an exact all-workspace direct-dependency report command, and an exact Tailwind production-build/output validation command. These records must exist before their dependent manifest, configuration, dependency, or helper.

Do not use a DPL entry to amend ADR-0011. Before task closure, either identify an already available continuous-integration execution route that can run the same lifecycle command without selecting a provider here, or complete the accepted owner/ADR workflow and synchronize every affected authority before applying a changed evidence contract. Authorization or initiation of that workflow is not reconciliation and cannot close the task. If no supported Node/Vitest/Playwright intersection exists, if foreground descendants cannot be cleaned on Windows, or if the required lifecycle semantics cannot be tested without changing ADR-0011, stop and invoke its reversal path.


### Milestone 2: Bootstrap only the configuration needed to produce the first Red


Add the selected root workspace manifest, one lockfile, runtime-version pin, strict common TypeScript base, web/API environment configurations, package manifests, and the minimum build/test configuration required to execute a package-local web unit test. Update the existing `.gitignore` in place for dependency, build, coverage, Playwright, and runtime outputs; do not replace it. Add a non-secret `.env.example` only after its names and values are recorded.

Establish a root Vitest registry using the accepted current `projects` model. Register `web-unit` only when its first executable test is added, with explicit jsdom, a web-owned React Testing Library setup, DOM matchers, a unique name, non-overlapping includes, and deterministic single-run defaults. Add root `typecheck` separately from runner transforms. Do not register an empty API, shared, integration, or future product project. At the end of this milestone, configuration is sufficient for the next test to fail for the intended missing-shell reason; no untested production shell or liveness behavior exists.


### Milestone 3: Drive the semantic shell and routed application through separate Red-Green-Refactor cycles


During Red, add the smallest package-local jsdom test that renders the shell and queries an accessible level-one `Rick and Morty Explorer` heading. Run only the web workspace `test:unit` and capture the nonzero result caused by the missing shell module or missing heading. Do not add production code before that observation.

During Green, add only the React component necessary to expose that semantic shell and pass the focused test. Use React 18-compatible component APIs and keep the component independent of `/healthz`, GraphQL, product data, and external network access. During Refactor, make only clarity/ownership improvements while the same test stays green, then run root `test:unit` and record both commands and outputs.

After that cycle is green, begin a distinct routed-composition cycle. Red adds one `web-application` jsdom test that renders the actual application composition at `/` and expects the shell through a BrowserRouter-owned route; it must fail because that composition or root route does not yet exist. Green adds only the BrowserRouter/route composition required by that test and reuses the already-tested shell. Refactor keeps routing at the application edge and leaves the shell presentation-only. Register `web-application` and root `test:application` only with this distinct test; root `test` now runs unit then application, while smoke remains absent until Milestone 5. This is not a duplicate heading test added to fill a project: it proves the separate router ownership and root-route behavior required by NFR-001.


### Milestone 4: Drive runtime configuration and HTTP liveness through Red-Green-Refactor


For each consumed runtime value whose invalid form could make ownership ambiguous, run one complete cycle at a time, beginning with the API port. Add only the smallest Node unit test for that one value, observe its intended failure, implement a focused parser with explicit diagnostics, and refactor while the unit scope stays green before adding another case. Never accumulate multiple failing configuration cases. Register an `api-unit` project only when the first real test exists.

Then add one `api-application` test that exercises the public Express composition over HTTP with an ephemeral owned server and Node's native `fetch`, unless the recorded tool decision justifies an equally small adapter. The test must close its owned server in a `finally` boundary and report cleanup failure without hiding the primary assertion failure. Red must be a missing composition, HTTP 404, wrong status, or wrong body—not a dependency-install accident. Green adds the minimum Express application factory and `GET /healthz` behavior needed to return HTTP 200 and exactly the JSON object `{ "status": "ok" }`. The route must require no PostgreSQL, Redis, GraphQL, public API, or domain state. Refactor to keep application construction separate from the listening entry and run the focused application project again.

Add `api-application` to the already-real root application scope only when the HTTP test exists. Update root `test` to execute every currently registered scope in order without mentioning an inactive integration scope. At this milestone, semantic component, routed web composition, and HTTP composition evidence exists, but native production start, Tailwind delivery, and real-browser wiring remain intentionally unproven.


### Milestone 5: Drive native process wiring through Chromium, then validate declarative Tailwind output


Add one Playwright smoke test and its configuration before completing the runnable entries. Configure Chromium only, one worker, `reuseExistingServer: false`, two foreground non-detaching `webServer` entries, the recorded free smoke ports, bounded startup and assertion timeouts, named visible server output, non-interactive reporting, and a dedicated ignored output directory retaining screenshots and traces on failure. The test independently asserts the visible shell and exact API status/body; the page must not request `/healthz`.

Run root `test:smoke` for Red and record the intended startup or assertion failure caused by the missing native web/API wiring. Green adds only the web HTML/mount that renders the already-tested routed application, API listen entry, independent web/API production build/start scripts, and root foreground orchestration required for that smoke to pass. No Tailwind setup, GraphQL, or product route is smuggled into this Green. During Refactor, keep process ownership explicit and commands non-detaching, then rerun independent builds, `test:smoke`, and root `test`.

After native smoke wiring is green, add the recorded Tailwind package/build integration, stylesheet import, and one stable utility token used by the shell as declarative configuration. Do not add a browser assertion or alter the authoritative smoke's visible-shell and liveness contract. ADR-0010 does not require an artificial Red for declarative configuration, but its observable outcome must be automated: run the independent web production build and the exact Milestone 1 Tailwind-output validation command, which must locate the emitted stylesheet through the build manifest or HTML, prove that it is non-empty and referenced, and prove that the configured utility rule was emitted from the current shell consumer. This evidence establishes toolchain consumption only; it does not prove CSS layout, responsiveness, final visual design, NFR-002, NFR-005, or SPEC-014.

At the end, root `test` runs registered `unit -> application -> smoke` scopes and propagates setup, process, assertion, artifact, and cleanup failures. There is still no `test:integration` script, registry entry, skipped project, or migration interface.


### Milestone 6: Add independent local infrastructure and lifecycle conformance


Add root `compose.yaml` with PostgreSQL and Redis services, pinned or bounded versions selected in Milestone 1, explicit health checks, non-secret example values, and no application service containers. Use a unique Compose project name for every verification and prove `config`, startup with health wait, `ps`, and scoped teardown. Application tests, `/healthz`, and the browser smoke must still pass while PostgreSQL and Redis are absent.

Complete the single documented root development workflow required by ADR-0014's carried-forward workspace contract. That workflow must start healthy PostgreSQL and Redis through root Compose and start the web and API through transparent workspace scripts while preserving the selected ownership and failure propagation. Keep separate scoped infrastructure commands available for diagnosis and teardown, and keep the narrower Playwright smoke independent of PostgreSQL and Redis. Record whether root development teardown retains or removes local infrastructure and make repeated invocation safe.

After the lifecycle triggers and evidence route are valid, implement the smallest cross-platform lifecycle verification interface around the exact Playwright smoke. Exercise one case at a time: normal completion, occupied-port/startup failure, assertion failure, readiness timeout, the recorded cancellation trigger, and the recorded interruption trigger. Each case must assert its expected exit category and diagnostics, then prove both owned ports can be rebound with a repository-owned Node helper. Never kill a process merely because it occupies a configured port; fail instead. Never claim graceful Windows SIGTERM or SIGINT handling that Playwright does not provide. Preserve the primary failure and report cleanup failure separately.

Capture Windows observations and the same command's continuous-integration observations. If continuous-integration evidence is unavailable, leave this milestone and TASK-003 incomplete; do not substitute configuration inspection, a local second run, or a future promise.


### Milestone 7: Prove a clean checkout and close the task honestly


From a separately owned clean checkout or worktree, install exactly from the committed lockfile, install Chromium only, run strict no-emit type checking, every registered unit/application/smoke scope, root `test`, independent web and API builds, production starts, the root development workflow, direct HTTP observation, browser smoke, infrastructure health, and the lifecycle matrix. Ensure the documented commands match the actual manifest and do not rely on untracked files, global packages, secrets, or a warm dependency cache.

Perform the ADR-0010 test-relevance audit. Inspect every affected test and suite-wide fixture, mock, helper, output, snapshot, empty project, skipped/focused test, and lifecycle failure fixture. Retain only artifacts with an explicit current consumer and TASK/ADR/HS traceability. Record any consolidation or removal and rerun affected scopes plus root `test`.

Update the root current-status and command navigation, canonical TASK-003 evidence/status, plan index, execution chronology including exact Red/Green/Refactor commands, and every materially affected documentation owner. Do not mark product Gherkin scenarios or acceptance criteria as passing. Run the documentation gate, request an independent closure review, and change TASK-003 to `Complete` only after every definition-of-done item and the CI lifecycle evidence join required by the then-current accepted authority passes. If that authority has been reconciled instead, update this plan and the canonical task contract to the accepted synchronized outcome before applying it. Then move this plan to `docs/plans/completed/` without changing its stable filename.


## Concrete Steps


Run all commands from the repository root unless a different working directory is shown. At plan registration, no Node/package command exists. The angle-bracket tokens below are explicitly future command placeholders, not currently runnable commands. Milestone 1 must replace every placeholder in this living section with the selected executable, exact workspace selector, port, and lifecycle command immediately after the corresponding DPL record and before dependent code is written.

The registration checks that are authoritative now are:

```powershell
python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
git diff --check
git status --short
```

Expected at registration: both validators exit zero; the ADR validator may retain only the already-known NFR-006 warning; `git diff --check` exits zero; `git status --short` lists only the intended README and documentation registration paths; and no application artifact exists.

After Milestone 1 replaces the placeholders, the created root interface must be exercised in this order:

```text
<LOCKFILE_INSTALL_COMMAND>
<DIRECT_DEPENDENCY_REPORT_COMMAND>
<PM> exec playwright install chromium
<PM> run typecheck
<PM> run test:unit
<PM> run test:application
<PM> run test:smoke
<PM> run test
<PM> run build
<TAILWIND_BUILD_VALIDATION_COMMAND>
<PM> run <SMOKE_LIFECYCLE_COMMAND>
```

Expected: the lockfile install is immutable; the direct-dependency report exactly matches the DPL-recorded per-workspace allowlist and identifies each current consumer; only Chromium is installed; type checking emits nothing; every command is non-interactive and returns nonzero for its owned failures; root `test` runs unit, application, and smoke in that order; there is no `test:integration`; both application builds succeed independently; the Tailwind command proves an emitted, referenced stylesheet and current shell utility without a smoke assertion; and the lifecycle command exercises the defined matrix rather than merely rerunning the happy path.

Use these focused TDD commands after replacing `<PM>` with the selected executable:

```text
# Working directory: apps/web
<PM> run test:unit
<PM> run test:application

# Working directory: apps/api
<PM> run test:unit
<PM> run test:application

# Working directory: repository root
<PM> run test:unit
<PM> run test:application
<PM> run test:smoke
<PM> run test
```

For each cycle, append the exact final command, nonzero Red diagnostic, Green pass summary, and post-Refactor pass summary to `Progress`, `Artifacts and Notes`, and the task's execution chronology. Do not preserve the placeholder once a command becomes authoritative.

Exercise independent infrastructure with a task-owned project name selected in Milestone 1:

```powershell
docker compose -p <TASK003_COMPOSE_PROJECT> config
docker compose -p <TASK003_COMPOSE_PROJECT> up -d --wait
docker compose -p <TASK003_COMPOSE_PROJECT> ps
docker compose -p <TASK003_COMPOSE_PROJECT> down --volumes
```

Expected: configuration resolves without embedded secrets; PostgreSQL and Redis alone become healthy; no web/API container or application readiness dependency appears; and teardown removes only the named project's containers, network, and volumes.

After selected ports are recorded, observe the API through the native production start boundary with an exact URL, not an in-process test, and record status plus raw response text. Observe the shell through Playwright Chromium, not jsdom. The plan must replace this sentence with the exact final commands and URLs before closure.

Run negative-scope and test-relevance searches against implementation paths after they exist:

```powershell
rg -n '"test:integration"|"migrate:[^"]*"' package.json apps packages tests
rg -ni -g package.json '"[^"]*(apollo|urql|graphql|sequelize|umzug|ioredis|redis)[^"]*"\s*:' package.json apps packages
rg -ni 'apollo|urql|graphql|sequelize|umzug|ioredis|redis' apps packages tests
rg -n 'rickandmortyapi\.com' apps packages tests
rg -n '/healthz' apps/web
rg -n '\.(only|skip)\(|describe\.(only|skip)|it\.(only|skip)|test\.(only|skip)' apps packages tests
rg --files apps packages tests | rg '(^|[\\/])(migrations?|seeders?)([\\/]|$)|\.(js|jsx|cjs|mjs)$'
```

Expected: the exact dependency report has no package outside the DPL-recorded TASK-003 allowlist, so an unanticipated client/cache family fails even when its name is not known in advance. In addition, no integration or migration script, migration/seed path, direct Apollo/urql/GraphQL/Sequelize/Umzug/Redis-client manifest entry, matching source/test token, or live-upstream reference is introduced. The broad token search deliberately covers static, side-effect, dynamic, and require-style imports and may require manual classification of an explanatory string. The Redis service in `compose.yaml` is the intentional infrastructure exception and is outside the manifest/source checks. `/healthz` has no web consumer; no focused or skipped test exists; and application/test source is TypeScript. If an exact token occurs in an intentional negative test or explanatory fixture, record the path and consumer instead of weakening the search.

Final documentation and diff checks remain:

```powershell
python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
git diff --check
git status --short
```


## Validation and Acceptance


Registration passes only when this plan is active and linked, TASK-003 remains `Pending`, ADR-0011 is listed as governing, the documentation-only diff validates, and an independent reviewer finds no material scope, authority, traceability, or restartability defect. No product command or TDD cycle applies to plan registration because no production behavior changes.

Execution must collect the following observable evidence before TASK-003 can close:

| Boundary | Required Red | Required Green | Required post-Refactor proof |
|---|---|---|---|
| Web shell | Package-local `test:unit` exits nonzero because the shell module or accessible heading does not exist. | The same command passes after the minimum semantic React shell exists. | The focused command and root `test:unit` pass after ownership/clarity cleanup. |
| Routed web composition | `web-application` exits nonzero because the BrowserRouter-owned root composition or `/` route does not exist. | The focused application test passes after the root route renders the existing shell. | Package-local and root `test:application` pass with routing retained at the application edge. |
| Runtime configuration | Node unit scope exits nonzero for the first missing or invalid consumed-value rule. | The focused rule passes with explicit validation and diagnostics. | API unit and strict `typecheck` remain green. |
| HTTP liveness | `api-application` exits nonzero for missing composition, 404, wrong status, or wrong body. | It passes with HTTP 200 and exactly `{ "status": "ok" }`. | The app/server split remains clear; focused application, root application, and strict type-check pass. |
| Native browser smoke | `test:smoke` exits nonzero for the recorded missing startup or shell/liveness assertion. | Chromium observes the visible shell and exact API response through two owned processes. | Independent builds, smoke, root `test`, and port-release happy path pass. |

Every Red must fail for the intended reason before its production edit. A dependency-resolution, unrelated type error, stale process, occupied port, or previous failing test is not acceptable Red evidence. Green may add only enough production behavior for the current failure. Refactor may not add behavior and must repeat the relevant scope. Exact transcripts replace the generic expectations in the table as execution proceeds.

Tailwind is not an additional TDD row or smoke assertion. It is declarative configuration whose automated production-build/output command must prove that the web build emits and references a non-empty stylesheet containing the exact utility generated for the current shell consumer. That structural evidence must pass alongside the independent web build and cannot be reported as CSS layout, responsive, browser-style, or product acceptance evidence.

The implemented harness passes only when:

- Vitest uses the stable line and current `projects` model recorded at execution; project names are unique, environments are explicit, includes do not overlap, shared settings are extended explicitly, and missing/empty registered scopes fail;
- `web-unit` and `web-application` use jsdom and web-owned React Testing Library/DOM setup; API projects explicitly use Node;
- root `typecheck` delegates strict `tsc --noEmit` across all implemented application and test configurations and is independent of runner transforms;
- package-local `test:unit` can reproduce one focused Red without PostgreSQL, Redis, app processes, or a browser;
- root `test` runs all and only registered unit, application, and smoke scopes in order, while `test:integration` is absent rather than skipped or passing;
- the Chromium smoke uses one worker, two foreground non-detaching servers, `reuseExistingServer: false`, bounded startup/assertion timeouts, visible named logs, non-interactive output, and retained failure screenshots/traces;
- the web page never calls `/healthz`, and the smoke needs no GraphQL, character data, PostgreSQL, Redis, image, or live public network;
- normal completion and each defined startup, assertion, timeout, cancellation, and interruption case return the expected status/diagnostics and leave both owned ports bindable on Windows and continuous integration.

The operational workspace passes only when a separately owned clean checkout can perform the immutable install, reproduce the exact per-workspace direct-dependency allowlist, install Chromium only, run strict type-check, registered tests, independent builds, root build, production starts, and the root development workflow through documented commands. The shell is observable in real Chromium. The API returns the exact liveness contract over HTTP. PostgreSQL and Redis report healthy under a uniquely named Compose project and can be removed with scoped teardown. The apps remain operational without those containers.

Under current ADR-0011, the task remains incomplete if the continuous-integration half lacks runtime evidence. It also remains incomplete if cancellation/interruption semantics are undefined, any process or port leaks, an inactive integration scope is present, an unresolved gate's artifact appears, a required Red was not observed, or a command depends on an untracked/global artifact.

Before closure, perform the ADR-0010 relevance audit and record a disposition for the shell unit test, routed application test, configuration tests, liveness application test, native smoke assertions, Tailwind build-output validator, lifecycle cases, fixtures, and helpers. Search the complete suite for residual mocks, fixtures, snapshots, empty projects, focused/skipped tests, test-only production branches, and unconsumed output. Run affected scopes and root `test` after any maintenance.

Documentation closure must update every materially affected owner, state the documentation impact explicitly, preserve dated history, pass both validators and `git diff --check`, and receive independent review. TASK-003 may then become `Complete`; AC-001 through AC-012 and product SPEC scenarios remain unpassed unless later owning tasks provide evidence.


## Idempotence and Recovery


Plan registration is additive and safe to validate repeatedly. Do not start the task merely to repair this plan. Preserve historical log rows and completed plans; append or supersede according to their governing workflow.

Package installation must be repeatable from exactly one lockfile. Never mix package managers or hand-edit the lockfile. Build, type-check, unit, application, and smoke commands must be safe to rerun. Keep generated build, coverage, Playwright, and runtime outputs in dedicated ignored paths so a failed run cannot overwrite source evidence.

Use one unique Compose project name per verification. Teardown only that explicit name. Never run broad Docker prune operations, remove unrelated volumes, or reuse a generic project whose ownership is uncertain. PostgreSQL/Redis failure does not justify changing `/healthz` or tests because those services are intentionally independent here.

The smoke must never attach to an existing server. If a configured port is occupied, report the owner-neutral conflict and fail; do not terminate the occupying process. Lifecycle cleanup may terminate only process identifiers or groups created and recorded by the current owned run. Confirm port bindability after cleanup, and preserve the primary failure while reporting any cleanup failure separately.

If work stops during Red, leave the exact failing command and intended diagnostic in `Progress` and resume from that test. If Green is complete but Refactor is not, keep the same scope green before editing. Do not skip, weaken, delete, or condition a test to recover. Do not use `git reset --hard`, broad checkout, recursive workspace deletion, or another task's files as recovery.

Perform clean-checkout work only in a separately resolved path owned for TASK-003. Verify the absolute path before any cleanup; prefer removing only known generated outputs or retiring the disposable checkout through the repository's safe worktree workflow. Lack of commit authorization or a clean source snapshot keeps clean-checkout evidence pending rather than authorizing a destructive substitute.

If exact supported tool versions no longer overlap, Windows process trees leak, the defined cancellation/interruption triggers cannot represent ADR-0011 honestly, or the CI evidence route remains absent, stop at the last green milestone. Record the evidence and invoke the accepted ADR's reversal/authority workflow. Do not introduce a hidden platform branch, background daemon, detached process, provider selection, or false pass.


## Artifacts and Notes


Initial baseline on 2026-08-11:

```text
git status --short
# no output

Executable workspace artifacts
# package.json, lockfile, apps/, packages/, TypeScript/Vitest/Playwright config,
# compose.yaml, .env.example, application/test source, and authoritative Node commands absent
```

Plan-registration verification on 2026-08-11:

```text
validate_docs.py: pass; 42 Markdown files, 41 requirement IDs, 1 authorization,
                  17 tasks, 17 SPEC rules, 20 HS rules, 119 scenarios
validate_adrs.py: pass; 14 ADRs, 38 mapped requirements; known NFR-006 warning only
git diff --check: pass; line-ending notices only
changed scope: README.md plus docs/IMPLEMENTATION_PLAN.md, docs/execution/, and docs/plans/
executable artifact search: no package, lockfile, app/package tree, TypeScript/test,
                            Compose, or example-environment artifact found
```

Independent final evidence checkpoint on 2026-08-11:

```text
reviewed plan SHA-256: 4AEEE0B1F0FED6EAA65CF6B36CF90D585F896B3BB52CAB69182F12827D7C5156
verdict: PASS
open findings: none
correction history: two provisional Majors plus later smoke-scope and closure-wording
                    findings corrected before the final verdict
authority state: TASK-003 Pending/unstarted; gate and acceptance states unchanged
implementation evidence: none
post-review reconciliation: validators, diff/cached checks, whitespace, scope, task
                            state, and negative artifact searches repeated and passed
```

Expected owned artifact families after execution, subject to the exact Milestone 1 DPL records, are:

- root: `package.json`, the selected workspace metadata and single lockfile, runtime pin, `tsconfig.base.json`, root TypeScript/test configuration, `vitest.config.ts`, `playwright.config.ts`, `compose.yaml`, `.env.example`, and targeted additions to `.gitignore`;
- web: `apps/web/package.json`, build and strict TypeScript configuration, `index.html`, a minimal `src/main.tsx`, semantic shell component, BrowserRouter-owned application composition, Tailwind entry, jsdom setup, one focused shell unit test, and one distinct routed application test;
- API: `apps/api/package.json`, no-emit/build configuration, runtime configuration parser, `src/app.ts`, `src/server.ts`, focused configuration tests, and one public `/healthz` application test;
- shared: `packages/shared/package.json` and boundary configuration, plus source only when a stable operational contract has a real consumer;
- smoke: one owned Playwright test under a clearly named `tests/smoke/` boundary and one clearly consumed lifecycle/port helper only after its triggers are recorded;
- documentation: this living plan, plan index, canonical TASK-003 record, root current status and command navigation, execution DPL/progress records, and only other owners materially changed by actual implementation.

Append short evidence here as work proceeds. At minimum retain: tool/version compatibility sources and date; allocated DPL IDs; exact Red/Green/Refactor commands and decisive output; project registry listing; clean-install/build/test transcripts; direct HTTP status/body; Playwright report paths; lifecycle case matrix with port-rebind results per platform; Compose health/teardown output; negative-scope and relevance-search results; documentation validators; diff checks; and independent-review verdicts. Keep secrets, full dependency logs, browser binaries, and disposable generated output out of this document and Git.


## Interfaces and Dependencies


The completed TASK-003 public operational interfaces must be:

- web shell: a real React 18 browser entry with an accessible level-one `Rick and Morty Explorer` heading, BrowserRouter ownership at the application edge, and a consumed Tailwind stylesheet; it performs no data or liveness request;
- API composition: an exported Express application factory that can be exercised without binding a fixed port;
- API process: a separate entry that validates consumed environment input, listens on the recorded host/port, reports actionable startup failure without secrets, and remains foreground-owned;
- liveness: `GET /healthz` returns HTTP 200 and JSON `{ "status": "ok" }` with no readiness, database, Redis, GraphQL, domain, image, or upstream dependency;
- root development: one documented workflow starts the web and API through transparent workspace scripts and PostgreSQL/Redis through root Compose, while separate scoped infrastructure commands retain diagnostic and teardown control;
- package-local web `test:unit` and `test:application`; package-local API `test:unit` only when configuration behavior exists; package-local API `test:application`; root `typecheck`, `test:unit`, `test:application`, `test:smoke`, `test`, `build`, `dev`, independent workspace `build`/production `start`, Tailwind build-output validation, Chromium install, scoped infrastructure, and the recorded smoke-lifecycle command;
- root `test` at this milestone: registered unit, then application, then smoke. There is no `test:integration` interface until TASK-004 owns it.

The accepted dependency categories are:

- React 18, React DOM, React Router DOM, and Tailwind CSS for the consumed web shell;
- Express for the API and liveness composition;
- TypeScript with strict ESM configurations for all application and test source;
- the stable Vitest line available at execution, jsdom, React Testing Library, and DOM matchers for non-browser tests;
- Playwright Test with Chromium only for the real-browser smoke;
- PostgreSQL and Redis official container images selected and documented for independent local infrastructure;
- one package manager, web build tool, root foreground process orchestrator, and exact supported versions selected from current primary evidence and recorded through DPL before use. Every direct dependency must also appear in the DPL-recorded workspace allowlist with a current TASK-003 consumer.

Do not add GraphQL client/server tooling, Sequelize, Redis clients, a migration tool, public-API adapter, image tooling, Storybook, Cucumber, another test runner, broad browser dependencies, or an embedded database/cache. A new direct dependency needs a current TASK-003 consumer, must appear in the recorded per-workspace allowlist before installation, and must remain within the accepted boundaries.

Before TASK-003 closure, the owner/authority join for ADR-0011 must be explicit: either the same repository lifecycle command has run successfully in an already supplied continuous-integration environment, or the accepted authority has been fully reconciled through its owner/ADR workflow and every affected current owner, task contract, validation rule, and this living plan has been synchronized to that completed outcome. Authorization or initiation of a reconciliation workflow is not sufficient. A local simulation, a CI configuration file without a run, an agent's prediction, or a proposed-but-unaccepted ADR is not runtime or reconciliation evidence.


## Revision Note


- 2026-08-11 / Codex primary thread: Created the initial active TASK-003 ExecPlan from the clean documentation-only baseline. Registration added ADR-0011 to the task's effective authority, preserved TASK-003 as `Pending`, kept integration/GraphQL/migration/image work out of scope, and recorded the unresolved Windows/continuous-integration cleanup evidence join as a truthful closure boundary. Later notes below record review-driven refinement of the initial TDD decomposition.
- 2026-08-11 / Codex primary thread: Recorded the passing registration validators, narrowed negative implementation searches so the intentional Compose Redis service is not mistaken for a Redis client, and made ADR-0014's carried-forward single root development workflow explicit while preserving the smoke's infrastructure independence.
- 2026-08-11 / Codex primary thread: Corrected a fresh independent review Major by removing BrowserRouter and Tailwind work from the native-smoke Green. Routed composition received a distinct jsdom application cycle; the first Tailwind correction attempted a separate Chromium computed-style cycle, which the later final-state correction below replaces.
- 2026-08-11 / Codex primary thread: Corrected a second fresh-review Major by requiring an exact DPL-recorded direct-dependency allowlist and report, then splitting known forbidden-family verification into an all-workspace manifest check and a broad source/test token search. This closes the prior false-pass path for unanticipated client/cache packages and direct, side-effect, dynamic, or require-style GraphQL, Sequelize, Umzug, or Redis-client additions.
- 2026-08-11 / Codex primary thread: Corrected final-state review findings by removing Tailwind assertions from the ADR-0011 smoke and requiring a dedicated automated production-build/output validation for the declarative Tailwind integration. Also closed a false task-completion path by requiring any alternative to current CI runtime evidence to be a completed, accepted, and fully synchronized authority reconciliation rather than mere authorization to begin that workflow.
- 2026-08-11 / Codex primary thread: Recorded fresh independent final `PASS` for the corrected complete registration tree at reviewed plan SHA-256 `4AEEE0B1F0FED6EAA65CF6B36CF90D585F896B3BB52CAB69182F12827D7C5156`, after two provisional Majors plus later smoke-scope and closure-wording findings were corrected and with no open Blocker, Major, or Minor. This evidence-only reconciliation leaves TASK-003 `Pending` and creates no implementation claim.
