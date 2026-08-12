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
- [x] (2026-08-12 00:29Z) Revised the still-unstarted plan to adopt DPL-DEC-014's worker-first implementation topology, including serial write leases, task-local path ownership, handoff barriers, correction limits, and fresh integrated review; the prior hash-specific review remains historical evidence, and fresh review of this revision is pending.
- [x] (2026-08-12 00:53Z) Obtained complete fresh correction-cycle review `PASS` for the worker-flow revision at reviewed plan SHA-256 `43BD0E3DA5853BC8DC29FFA18490ED601F591F1AFE2134271DBE20FC89C1C5E3` and complete raw working-tree patch SHA-256 `91F10449A0B4F4D5C42AF5E568B88C3085779CDAA93437A1371DCCCC8C75E3`; the initial review's sole Major about `PASS WITH FOLLOW-UPS` routing was corrected and no finding remains.
- [x] (2026-08-12 05:15Z) Revised the still-unstarted worker assignments to require coordinator-owned automatic lease baselines and terminal compliant receipts; prior reviewed hashes remain historical evidence, and fresh review of this guard revision is pending.
- [x] (2026-08-12 06:30Z) Obtained complete fresh independent review `PASS` for the automatic-lease revision at reviewed 15-path packet SHA-256 `5879C3C8A59C98375CACC9568FD350A55F854A800A114875139D4B600A5628A0`; all 25 isolated Windows self-tests passed and no Blocker, Major, or Minor remains. TASK-003 stayed `Pending` and unstarted, and this plan returned to ready-to-execute.
- [x] (2026-08-12 12:00Z) Revised the still-unstarted assignment contract under DPL-DEC-017 to require one minimum-but-extensible `Worker Assignment Packet v1` for every writer spawn. Prior reviewed hashes remain historical evidence; fresh complete review of this packet revision is pending.
- [x] (2026-08-12 12:29Z) Obtained complete fresh correction-cycle review `PASS` for the assignment-packet revision at reviewed 12-path packet SHA-256 `FE9711A5743AD995792EF8447BEACC1AFC0F261D3EAC997D42B1065A6D49EA22` and plan SHA-256 `26C1AF7883DBFCF89D4A998B1E068CF2D076A71425846D420C464E6315DEAAD1`. The initial review's sole Minor metrics-schema mismatch was corrected; no finding remains, TASK-003 stayed `Pending` and unstarted, and this plan returned to ready-to-execute.
- [x] (2026-08-12 14:11Z) Corrected the later current-state review findings: Green and Refactor corrections now require fresh attempt-2 packets and guarded leases, Refactor has an explicit semantic acceptance barrier, the guard enforces attempts 1/2 plus the exact worker/phase matrix, and correction lineage is no longer attributed to the guard contract. The prior hashes and verdict remain historical; this correction revision requires complete fresh review before the plan is ready again.
- [x] (2026-08-12 14:25Z) Corrected a transverse control-flow review: rejected Setup and Red now enter explicit fresh attempt-2 leases, delegated evidence separates terminal guard compliance from coordinator semantic acceptance, and final-review corrections stop rather than issue attempt 3 when the assignment budget is exhausted or its identity changes. The plan remains under complete fresh review.
- [x] (2026-08-12 14:30Z) Corrected the fresh review's remaining Setup-diagram omission by requiring the coordinator to spawn `code_worker` under the new attempt-2 packet and lease before checking its terminal receipt. The reviewed hash remains historical and another complete fresh review is required.
- [x] (2026-08-12 14:33Z) Normalized every remaining assignment edge so Red correction, initial Green, delegated evidence, and final-review correction explicitly build the packet, start the guarded lease, and spawn the responsible worker before work or closure. Complete fresh review remains pending.
- [x] (2026-08-12 14:37Z) Removed the last unsafe re-entry: a material concern with an accepted or frozen test after Green now requires rejected-Green reconciliation, current-cycle termination, and a fresh cycle ID before behavior selection and a new attempt-1 Red assignment. The current correction remains under fresh review.
- [x] (2026-08-12 14:41Z) Strengthened the guard's grouped assignment-identity self-test to prove rejection both before `start` creates state and when a digest-valid stored contract is reloaded with an invalid attempt. Native Windows PowerShell still passes all 26 isolated groups; fresh current-state review remains pending.
- [x] (2026-08-12 14:42Z) Hardened post-Green triage so an exhausted production correction stops and a fresh cycle begins only after rejected Green state is accepted with no old-cycle write pending. This closes attempt-3 and implicit-reconciliation paths before fresh review.
- [x] (2026-08-12 14:56Z) Replaced the compressed assignment graph after complete packet and edge review: every phase now exposes packet draft, guard start/digest, worker execution, terminal receipt, and semantic acceptance; corrections require prior reconciliation; each slice receives a fresh cycle ID; and final review enforces its global two-cycle limit. Fresh review of this revision is pending.
- [x] (2026-08-12 15:09Z) Reconciled the parallel review of the expanded graph: the integral reviewer returned point-in-time `PASS`, but the more specific graph and coherence audits found Setup identity ordering, Green terminal-close ordering, an overpermissive guard mini-flow, and two identity/packet wording ambiguities. Corrected all five issues; the resulting current state requires a new complete review.
- [x] (2026-08-12 15:44Z) Reconciled fresh review of 14-path packet `3882498D1260793122052BACA71EF28843FF395C8FC81E0F3410F9B5A4AC88B6` as `REVISE`. Replaced the one-time Setup branch with a reusable next-work selector, added a role-matched evidence queue with bounded delegated correction, and required the complete closure-validation packet to be refreshed after every accepted final-review correction. TASK-003 remains `Pending` and unstarted; the corrected workflow still requires complete fresh review.
- [x] (2026-08-12 15:44Z) Reconciled review of corrected packet `146BD7AC38E0533E1ED55A9A3109B56C22BC81494206DCBBC42DBE9F6FA01D0B` as `REVISE`: accepted review corrections lacked durable evidence before refreshed closure, and the generic attempt-2 path was incompatible with already accepted Red and Green. The workflow now drains correction evidence to refreshed closure without resetting the global count and routes behavioral or test-contract findings through a fresh behavior cycle. Fresh complete review is still required.
- [x] (2026-08-12 15:57Z) Reconciled focused review of packet `53A02582FBE9490D8E5CE4A80E111614808B0588DB16DF90B58BB6180D7A30ED`: the otherwise-correct fresh behavior remediation did not explicitly carry its evidence return target or durable old/new-cycle lineage through the graph. The fresh-cycle entry and evidence queue now pin both. Fresh complete review remains required.
- [x] (2026-08-12 16:09Z) Reconciled complete review of packet `C173B64DAAA48EA138D17DA92769EA2470E6B812D05BA7C0EA9B025962507FCD` as `REVISE`. A material-test replacement inside reviewer remediation could overwrite its refreshed-closure target and lineage, Green lacked an explicit blocked/conflict exit, and an Evidence-phase correction record could enter a recursive evidence lease. The graph and evidence policy now close all three routes; fresh complete review remains required.
- [x] (2026-08-12 16:28Z) Applied the owner-directed DPL-DEC-018 simplification: retained the minimum context packet, blocking path lease, serial Red then Green with optional same-turn Refactor, coordinator evidence ownership, and one fresh final review; replaced the exhaustive correction and evidence state machine with one stop-and-triage boundary. TASK-003 remains `Pending` and unstarted, and this revision requires fresh review.
- [x] (2026-08-12 16:42Z) Reconciled fresh review of simplified packet `F402ED8554F6362AD5E7FC9E19F504866E76C5AAF16988503CD064D7807A9AA4` as `REVISE` for one stale closure sentence that returned every finding directly to a worker. The active closure rule now returns findings to primary-coordinator triage and permits a later fix only through the ordinary fresh-packet and fresh-lease loop; final fresh review is pending.
- [x] (2026-08-12 16:49Z) Obtained complete fresh correction-cycle review `PASS` for simplified packet `1B4FBEA61C2CE047579B4B7BD35A2C1D627DCC7945930090B9A6979B88464280`; the prior review's sole Major is corrected and no Blocker, Major, or Minor remains. TASK-003 stayed `Pending` and unstarted, and this plan is ready for a separate execution instruction.
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

- Observation: A worker's reported path list and `git status` cannot detect that an already-dirty file changed again. The repository now provides a coordinator-owned endpoint-state guard that hashes the tracked and untracked non-ignored baseline, pins Git control state, and requires terminal closure before a handoff barrier. This proves net repository endpoint state only; it neither observes transient edits restored byte-for-byte nor attributes a concurrent writer whose result stays wholly within allowed paths.


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

- Decision: Execute implementation through the DPL-DEC-014 worker-first topology, with sequential path leases for `test_worker` and `code_worker` and fresh read-only integrated review.
  Rationale: Bounded workers can own detailed edits and command output without crowding the primary context, while the primary retains task state, DPL decisions, Red acceptance, integration, authority reconciliation, and closure. Same-cycle writers remain serial, accepted test paths stay frozen during Green and Refactor, and decision artifacts remain primary-written under DPL-DEC-011.
  Date/Author: 2026-08-12 / Codex primary thread.

- Decision: Enforce every TASK-003 worker lease with the coordinator-owned automatic write-lease guard before accepting its Setup, Red, or Green handoff.
  Rationale: An immutable dirty-worktree baseline and fresh terminal compliant receipt make the existing path lease falsifiable without adding another agent, hook, workflow engine, or product dependency. Any ambiguous, tampered, forbidden, unleased, or scan-unstable result freezes advancement; the guard never attributes or reverts repository work.
  Date/Author: 2026-08-12 / Codex primary thread.

- Decision: Instantiate the canonical `Worker Assignment Packet v1` for every TASK-003 writer spawn.
  Rationale: A common minimum contract makes identity, authority, objective, commands, path scope, evidence, and stopping conditions reviewable without turning the packet into a context cap. The coordinator may append relevant context and workers may inspect additional repository files, while the automatic guard remains the hard write boundary and any binding assignment change requires a new packet and lease.
  Date/Author: 2026-08-12 / Codex primary thread. See DPL-DEC-017.

- Decision: Keep implementation orchestration on the small normal path defined by DPL-DEC-018.
  Rationale: The packet and lease already protect context and writes. Serial Red, Green with optional same-turn Refactor, primary-owned evidence, and one final review preserve the useful controls without encoding every possible failure, correction, or evidence update as workflow state.
  Date/Author: 2026-08-12 / Codex primary thread. See DPL-DEC-018.


## Outcomes & Retrospective


Plan registration, its hash-specific independent reviews, and every later worker-flow verdict remain point-in-time history. DPL-DEC-018 deliberately replaced the over-specified exception state machine with a compact normal path while retaining the packet, blocking lease, serial TDD ownership, coordinator evidence acceptance, and fresh final review. Exact correction-cycle packet `1B4FBEA61C2CE047579B4B7BD35A2C1D627DCC7945930090B9A6979B88464280` passed complete fresh review with no finding, so this plan is ready for a separate execution instruction. TASK-003 remains `Pending`; no dependency, command, application process, infrastructure container, product test, browser binary, or acceptance evidence has been created.

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


### Worker-first assignments and barriers


When execution is separately authorized, follow the [worker-first ExecPlan implementation workflow](../../.codex/execplan-implementation-workflow.md), its canonical [Worker Assignment Packet v1](../../.codex/execplan-implementation-workflow.md#worker-assignment-packet-v1), and the [automatic write-lease guard](../../.codex/write-lease-guard.md). The primary issues one bounded assignment at a time, opens the guard before spawning, and terminally closes the same lease after the handoff. It accepts a barrier only after inspecting the receipt, actual diff, commands, and outcome. The anticipated ownership below controls execution unless current evidence requires a narrower scope:

| Slice | Writer and mode | Owned path family | Barrier before continuing |
|---|---|---|---|
| Task start, reversible DPL choices, authority state, evidence, and ignore controls | Primary coordinator | This ExecPlan and the exact authority or control documents affected | TASK-003 is `In progress`; choices and exceptional primary edits are recorded and validated before worker baselines. |
| Each independent declarative setup objective | `code_worker` in `setup` | Only the approved manifest, configuration, infrastructure, or registration paths | Terminal lease is compliant; the primary accepts `SETUP VERIFIED`, the actual diff, and every assigned structural, build, or runtime result. |
| Each web, API, and smoke Red | `test_worker` in `red` | Only the current behavior slice's tests, fixtures, setup, and necessary registration paths | Terminal lease is compliant; the primary accepts the intended nonzero Red and freezes the accepted test-owned paths. |
| Each Green and optional Refactor | `code_worker` in `green` | Only the current cycle's production and explicitly required non-test configuration paths | Green reproduces the accepted Red before editing and passes it afterward. Any same-turn Refactor adds no behavior. The primary accepts the terminal receipt, complete diff, results, and unchanged frozen tests. |
| Milestone and task closure | Primary coordinator, then fresh `independent_reviewer` | Primary-owned evidence and authority documents; reviewer remains read-only | Complete validation, test-relevance audit, and documentation checks precede review; only the primary reconciles and closes. |

Only one write-capable lease may be active in this worktree, and the test and code workers never write concurrently. Create the workflow ID before the first assignment, one cycle ID per setup objective or behavior slice, and a new packet and lease for each worker turn. The packet is a minimum context floor: the coordinator may append relevant context and the worker may inspect additional readable files, but neither may expand a binding objective, authority, command, dependency, result, or write scope. The worker never invokes the guard or edits its runtime records.

Any noncompliant lease, rejected handoff, wrong Red, changed test contract, blocked dependency, authority or scope change, ambiguous concurrent state, or review finding stops writes for primary triage. Any authorized follow-up re-enters the ordinary loop only after reconciliation and with a fresh packet, baseline, lease ID, digest, and worker turn; a materially changed objective is a new assignment. The primary records accepted evidence directly and requests one fresh independent review of each candidate final state. The ExecPlan does not encode a separate branch for every exception.


### Milestone 0: Register the plan without starting implementation


Add this active plan, register it in `docs/plans/README.md`, link it from TASK-003, add the missing ADR-0011 governing reference, note the active plan in the root current-status summary, and append one `Planned` chronology row. Keep TASK-003 `Pending`, the application-absence statement true, and every gate state unchanged. Validate the documentation-only diff and obtain an independent review before treating registration as complete.


### Milestone 1: Start the task and fix reversible execution interfaces before artifacts


When the project owner separately directs execution, re-read the exact current state and confirm TASK-001 remains complete, DG-001 remains resolved, ADR-0011 remains accepted, and no concurrent change has claimed TASK-003. Change TASK-003 to `In progress` in the canonical task owner, synchronize the root status and plan index, and append a distinct `Started` record before implementation claims.

Use current primary documentation to find a supported common Node.js version for React 18, the stable Vitest line, Playwright, the selected package manager, TypeScript, the selected web build tool, and Express. Record the evidence date and exact versions. Allocate the next unused `DPL-DEC-*` ID or IDs only after re-listing the log. Record the package manager and lockfile, package/workspace names, Node.js and browser targets, web build and production-start mode, web/API development and smoke ports, host/origin rules, environment keys and defaults, Compose project/service identity, root foreground process orchestration, the proposed lifecycle command name, bounded cancellation/interruption triggers, the exact direct-dependency allowlist by workspace and current consumer, an exact all-workspace direct-dependency report command, and an exact Tailwind production-build/output validation command. These records must exist before their dependent manifest, configuration, dependency, or helper.

Do not use a DPL entry to amend ADR-0011. Before task closure, either identify an already available continuous-integration execution route that can run the same lifecycle command without selecting a provider here, or complete the accepted owner/ADR workflow and synchronize every affected authority before applying a changed evidence contract. Authorization or initiation of that workflow is not reconciliation and cannot close the task. If no supported Node/Vitest/Playwright intersection exists, if foreground descendants cannot be cleaned on Windows, or if the required lifecycle semantics cannot be tested without changing ADR-0011, stop and invoke its reversal path.


### Milestone 2: Bootstrap only the configuration needed to produce the first Red


Before opening the first worker lease, the primary exceptionally updates the existing `.gitignore` in place for the exact dependency, build, coverage, Playwright, and runtime outputs recorded in Milestone 1. Record the reason and validation because ignore controls are intentionally frozen during every worker baseline. Then open the setup lease and add the selected root workspace manifest, one lockfile, runtime-version pin, strict common TypeScript base, web/API environment configurations, package manifests, and the minimum build/test configuration required to execute a package-local web unit test. Add a non-secret `.env.example` only after its names and values are recorded. Any later ignore-control need closes the current lease and returns to the primary; a worker never changes `.gitignore`.

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

For each cycle, each worker returns the exact command, nonzero Red diagnostic, Green pass, post-Refactor result when applicable, changed paths, lease ID, and contract digest in its concise handoff. The primary terminally closes the pinned lease, inspects the receipt, actual diff, command evidence, and frozen paths, then records accepted evidence directly in `Progress` and `Artifacts and Notes`. Only the primary updates authoritative status and task chronology. Do not preserve the placeholder once a command becomes authoritative.

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


Registration passes only when this plan is active and linked, TASK-003 remains `Pending`, ADR-0011 is listed as governing, the documentation-only diff validates, and an independent reviewer finds no material scope, authority, traceability, or restartability defect. No product command or TDD cycle applies to plan registration because no production behavior changes. Each material agent, worker-topology, assignment-packet, or guard revision requires its own fresh plan hash, agent-schema and permission checks, guard self-test, documentation validation, exact-diff review, and independent verdict before the plan index may again call the plan ready to execute.

Execution must collect the following observable evidence before TASK-003 can close:

| Boundary | Required Red | Required Green | Required post-Refactor proof |
|---|---|---|---|
| Web shell | Package-local `test:unit` exits nonzero because the shell module or accessible heading does not exist. | The same command passes after the minimum semantic React shell exists. | The focused command and root `test:unit` pass after ownership/clarity cleanup. |
| Routed web composition | `web-application` exits nonzero because the BrowserRouter-owned root composition or `/` route does not exist. | The focused application test passes after the root route renders the existing shell. | Package-local and root `test:application` pass with routing retained at the application edge. |
| Runtime configuration | Node unit scope exits nonzero for the first missing or invalid consumed-value rule. | The focused rule passes with explicit validation and diagnostics. | API unit and strict `typecheck` remain green. |
| HTTP liveness | `api-application` exits nonzero for missing composition, 404, wrong status, or wrong body. | It passes with HTTP 200 and exactly `{ "status": "ok" }`. | The app/server split remains clear; focused application, root application, and strict type-check pass. |
| Native browser smoke | `test:smoke` exits nonzero for the recorded missing startup or shell/liveness assertion. | Chromium observes the visible shell and exact API response through two owned processes. | Independent builds, smoke, root `test`, and port-release happy path pass. |

Every Red must fail for the intended reason before its production edit. A dependency-resolution, unrelated type error, stale process, occupied port, or previous failing test is not acceptable Red evidence. `test_worker` returns the test diff and Red result to the primary, which first obtains a compliant terminal lease receipt and then accepts or rejects that barrier. `code_worker` reproduces the accepted Red, adds only enough production behavior for the current failure, and may perform a small same-turn Refactor only after Green while frozen tests remain unchanged and validation is repeated. The coordinator records accepted evidence directly. A missing or noncompliant receipt keeps the barrier unaccepted even when the focused command succeeds. Exact transcripts replace the generic expectations in the table as execution proceeds.

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

Documentation closure must update every materially affected owner, state the documentation impact explicitly, preserve dated history, pass both validators and `git diff --check`, and receive fresh read-only review of the complete tests, implementation, evidence, documentation, and exact diff. Reviewer findings stop closure and return to primary-coordinator triage. After reconciliation, any authorized implementation fix re-enters the ordinary workflow under the appropriate owner with a fresh packet, baseline, and lease; evidence and authority updates remain primary-owned. Only the primary performs post-review reconciliation and may change TASK-003 to `Complete`; AC-001 through AC-012 and product SPEC scenarios remain unpassed unless later owning tasks provide evidence.


## Idempotence and Recovery


Plan registration is additive and safe to validate repeatedly. Do not start the task merely to repair this plan. Preserve historical log rows and completed plans; append or supersede according to their governing workflow.

Package installation must be repeatable from exactly one lockfile. Never mix package managers or hand-edit the lockfile. Build, type-check, unit, application, and smoke commands must be safe to rerun. Keep generated build, coverage, Playwright, and runtime outputs in dedicated ignored paths so a failed run cannot overwrite source evidence.

Use one unique Compose project name per verification. Teardown only that explicit name. Never run broad Docker prune operations, remove unrelated volumes, or reuse a generic project whose ownership is uncertain. PostgreSQL/Redis failure does not justify changing `/healthz` or tests because those services are intentionally independent here.

The smoke must never attach to an existing server. If a configured port is occupied, report the owner-neutral conflict and fail; do not terminate the occupying process. Lifecycle cleanup may terminate only process identifiers or groups created and recorded by the current owned run. Confirm port bindability after cleanup, and preserve the primary failure while reporting any cleanup failure separately.

If work stops during Red, leave the exact failing command and intended diagnostic in `Progress` and resume from that test. If Green is complete but Refactor is not, keep the same scope green before editing. Do not skip, weaken, delete, or condition a test to recover. Do not use `git reset --hard`, broad checkout, recursive workspace deletion, or another task's files as recovery.

If a worker stops, the guard finds an unexpected or forbidden path, or Git/control state becomes ambiguous, terminally close the lease with its honest result when the pinned CLI can do so, freeze further writes, and inspect the shared working tree without automatically reverting it. A missing `started` result or irrecoverable active state has no force-recovery command and requires separately authorized coordinator recovery recorded here before another baseline. Resume only after identifying the source, re-establishing the last accepted setup, Red, Green, or Refactor barrier, and opening a new lease against the reconciled baseline. Never recover by redefining or rebasing the prior contract, overlapping the test and code workers, letting the code worker change a test, or treating a new test contract as part of the prior cycle.

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

Worker-flow revision evidence checkpoint on 2026-08-12:

```text
initial verdict: REVISE; one Major for missing PASS WITH FOLLOW-UPS routing
correction: Mermaid, prose, registry policy, and copy-paste prompt now disposition
            every follow-up and re-review any DoD/gate/validation/documentation conflict
reviewed plan SHA-256: 43BD0E3DA5853BC8DC29FFA18490ED601F591F1AFE2134271DBE20FC89C1C5E3
reviewed raw working-tree patch SHA-256: 91F10449A0B4F4D5C42AF5E568B88C3085779CDAA93437A1371DCCCC8C75E3
correction-cycle verdict: PASS; no Blocker, Major, or Minor
validation: five agent TOMLs, documentation and ADR validators, diff/whitespace,
            verdict routing, stale wording, pending state, and negative artifacts passed
authority state: TASK-003 Pending/unstarted; no architecture or gate change
implementation evidence: none
```

Automatic write-lease guard revision evidence checkpoint on 2026-08-12:

```text
reviewed 15-path packet SHA-256: 5879C3C8A59C98375CACC9568FD350A55F854A800A114875139D4B600A5628A0
lease_guard.py SHA-256: 04B83DEBC4DCE4CF8C662925DAE5688CFDD581DC7E11981D11528F100BA6C3BA
verdict: PASS; no Blocker, Major, or Minor
Windows PowerShell guard self-test: pass; 25/25 isolated temporary-repository checks
validation: documentation and ADR validators, five agent TOMLs, hook JSON, Python AST,
            CLI help, diff/whitespace, exact path set, and packet identity passed
authority state: TASK-003 Pending/unstarted; plan ready for separate execution instruction
implementation evidence: workflow tooling only; no product or acceptance evidence
```

Worker Assignment Packet v1 revision evidence checkpoint on 2026-08-12:

```text
initial reviewed 12-path packet SHA-256: 96580D8359257BD9A71DB68CE544714AB39D2907EB42C08AE5F81C2A13CFE783
initial verdict: REVISE; one Minor metrics-schema projection mismatch
correction: spawned agent maps to agent_id and packet role maps to agent_type;
            lease owner and correction lineage remain in packet/guard/handoff/ExecPlan
final reviewed 12-path packet SHA-256: FE9711A5743AD995792EF8447BEACC1AFC0F261D3EAC997D42B1065A6D49EA22
reviewed plan SHA-256: 26C1AF7883DBFCF89D4A998B1E068CF2D076A71425846D420C464E6315DEAAD1
correction-cycle verdict: PASS; no Blocker, Major, or Minor
validation: documentation and ADR validators, five agent TOMLs, hook JSON, metrics
            schema and self-test, Windows guard 25/25, diff, exact path set, and hashes passed
authority state: TASK-003 Pending/unstarted; plan ready for separate execution instruction
implementation evidence: workflow tooling only; no product or acceptance evidence
```

The later current-state audit clarified that the historical line above grouped two different projections: lease owner is stored in the guard contract, while correction lineage has always remained only in the packet, handoff, ExecPlan evidence, and reviewer checks. The historical hashes and verdict are preserved; the current workflow wording now states the boundary exactly.

Current-state correction checkpoint on 2026-08-12:

```text
pre-correction current 12-path packet SHA-256: BCC76388B327067DA5DE4DCA65168693BB8569C1B83B41829E8B60060294D342
pre-correction current plan SHA-256: 7E84B4A173AC186EBB7784CA898C1F1C0E39AF94B1CE87E5F0A363538F1164A8
fresh current-state verdict: REVISE
findings: Green correction bypassed a fresh attempt-2 lease;
          Refactor lacked a coordinator semantic acceptance barrier;
          correction lineage was incorrectly attributed to the guard contract;
          guard start accepted invalid attempts and worker/phase combinations
guard Red: native Windows self-test exited 3 because attempt 0 returned the old
           positive-integer error instead of the new exact-domain result
guard Green: native Windows self-test passed 26/26 isolated checks
current correction review: pending
authority state: TASK-003 Pending/unstarted; plan not ready for execution
implementation evidence: workflow tooling only; no product or acceptance evidence
```

Transverse correction checkpoint on 2026-08-12:

```text
reviewed 13-path packet SHA-256: 63AC77142BB6D289A2E1669D1C7D9425C3EF6B3960946F8B6B0006B31C9CBB93
reviewed plan SHA-256: E0BE102299EDF26E6DDCC5B6AEEA25C4778D635E2846AE943B5862B9DE9E50EA
reviewed guard SHA-256: BF5B547E8E2C850692E10122994748ADA716C6FD14DF6AC1ADD732684CE3C6CA
transverse verdict: REVISE
findings: Setup and Red correction routes did not locally require fresh attempt-2 state;
          final-review REVISE lacked a per-assignment exhaustion decision;
          delegated evidence combined mechanical and semantic acceptance
post-flow-fix pre-evidence packet SHA-256: A5D5C30CF28F7D162635957FCE911DEFAE14F695DBB3C4BB2BD603384A75156D
post-flow-fix workflow SHA-256: FAB398411A3618D8DDA63493F65CF85787B5E2717B34F6067A64F92B70E97C49
current correction review: pending
authority state: TASK-003 Pending/unstarted; plan not ready for execution
implementation evidence: workflow tooling only; no product or acceptance evidence
```

The fresh review of the documented post-flow-fix packet `20730F61A38F6064ADF8813E5AFFD1D69CDE031BF590A3E987FB265E53C2A26F` found one remaining diagram omission before a final verdict: the attempt-2 Setup node created the packet and lease but did not explicitly spawn `code_worker` before the receipt check. The node now includes that spawn; the reviewed packet remains point-in-time `REVISE` evidence and the corrected current state requires another complete fresh review.

The next fresh audit of packet `33EBA111702C10665A0D5752928B849F5A0B4CFEB9AD7C4D4ACA635A90628C3F` found the same explicit-spawn omission in the attempt-2 Red and final-review correction nodes. A systematic assignment-edge scan also identified the equivalent ambiguity in initial Green and delegated evidence. All four nodes now state the complete packet, guarded lease, and worker-spawn sequence. That reviewed packet is preserved as point-in-time `REVISE` evidence; the normalized current state requires another complete fresh review.

The adversarial scan of normalized packet `7456C6839E9258D5FDDA70C39FCD4F3129A8058A84D97F2C9B4958E8B290952D` found one remaining unsafe re-entry: a test-contract concern after Green returned directly to the initial test assignment in the existing cycle. The workflow now distinguishes an unchanged-test production defect, which uses the bounded Green correction, from an authorized material test correction, which reconciles rejected Green state, ends the old cycle, creates a fresh cycle ID, and returns to behavior selection. The reviewed packet remains point-in-time `REVISE` evidence and the corrected current state requires complete fresh review.

Complete packet and 67-edge review of packet `BBD03CF68AE430A7342C79212BD475A1B610D4A03A6D23903A37BCC03CA784E9` returned `REVISE`. It found that Green, Refactor, and final-review correction nodes omitted local prior-state reconciliation; Setup, Green, and Refactor semantic gates were weaker than their prose; normal next-slice routing did not create a fresh cycle ID; the global final-review correction limit was absent from the graph; compressed Setup, Green, and delegated-evidence nodes skipped explicit worker execution; and material-test reclassification did not require an accepted old-cycle state. The current graph and matching packet, prompt, worker, reviewer, guard-guide, and task-plan contracts close those six findings. The BBD03C packet remains point-in-time review evidence; the current revision requires complete fresh review.

Parallel review of expanded packet `7C55B4AFAB1F865B7DC6BDD2AEDF4AE46944E4A825594CE4CA5013D8D9E52648`, plan `3DE31513D8FF430C911BB4D56D76FA1A401DC373B9069AF1A5886CC7DBB727D4`, guard `40C7D5343A11D536742F2F10840B282AD1A79E2E504CB5D581BE83AD9698DC41`, and workflow `A3FC55301BAEB57C65DBAD71D3BA41018C41B9990AB628CC094A7E3B03C3912B` produced an integral point-in-time `PASS`, but the authoritative combined disposition remains `REVISE`: the edge audit found Setup could precede workflow/setup-cycle identity, Green conflict prose could classify before terminal close, and the guard mini-flow routed every violation to correction; the coherence audit found ambiguous packet/lease correction wording and impossible literal `same assignment identity` wording. The current revision fixes those five findings and requires another complete review.

Fresh review of 14-path packet `3882498D1260793122052BACA71EF28843FF395C8FC81E0F3410F9B5A4AC88B6` returned `REVISE`. The graph could schedule only one Setup objective, final-review correction returned directly to the reviewer without refreshing full closure validation, and delegated evidence could process only one producer record without a deterministic bounded correction route. The current selector, evidence queue, and post-correction validation loop close those findings. The reviewed hash remains point-in-time evidence; the corrected state remains review-pending until complete fresh review passes.

Review of corrected packet `146BD7AC38E0533E1ED55A9A3109B56C22BC81494206DCBBC42DBE9F6FA01D0B`, workflow `8E13F4C9F1ED996DFCE1CBA56EEF446C74E6DDE39C7FC2650FD06EE2F491936A`, plan `F501BB96BADD85C9144FAEE93C3E08E44DA78062CE27FC24FB3A03847E266CFE`, and unchanged guard `40C7D5343A11D536742F2F10840B282AD1A79E2E504CB5D581BE83AD9698DC41` returned `REVISE`. The accepted final-review correction path did not durably record its new packet, receipt, handoff, and acceptance before refreshed closure. A coherence audit also proved that an already accepted Red or Green cannot legally use generic attempt 2 because its test is frozen and integrated Green no longer reproduces Red. The current graph queues correction evidence with a direct refreshed-closure return target and routes behavioral or accepted-test findings through a new attempt-1 behavior cycle while preserving the global review count. This reviewed packet remains historical; the corrected state still requires complete fresh review.

Focused review of packet `53A02582FBE9490D8E5CE4A80E111614808B0588DB16DF90B58BB6180D7A30ED`, workflow `FEAB306EEB561721D5B46AAA6569357F7FE7AEEAC54D645C35794E9ECFEAEAF1`, plan `9A473D3CD4D3BD48C30B6260FAA98791C882864460B617F2F76C60E06F3BB26B`, DPL `766666BDFFC8CBD0F3C93D4F2FFA452EE0048234A31FF4D2E3CEDDD7BF9CB614`, and unchanged guard returned a provisional integral `PASS` but specific graph/coherence review identified one remaining deterministic-evidence defect: a reviewer-directed fresh behavior cycle did not explicitly carry its `refreshed closure` return target or a durable record connecting the finding and replaced cycle to the fresh cycle and consumed global count. The current graph now sets both before Red and requires the lineage record in that cycle's evidence queue. The reviewed packet remains point-in-time evidence; the corrected state requires complete fresh review.

Complete review of packet `C173B64DAAA48EA138D17DA92769EA2470E6B812D05BA7C0EA9B025962507FCD`, workflow `5980DD5769797C70923D8F85DC220546E86844639E4212A1991E142297F5FA24`, plan `09E0EF114BB1C33B07265FE35D82718F408B571814A1ED9DF0BD9973465911C1`, DPL `251D0C35A00CEA2ABFEE021DDC3046083CF4F54A320BDEA5BDF7A8331DB09D05`, and unchanged guard returned `REVISE`. Within reviewer-directed fresh behavior remediation, a later material-test replacement could route through the ordinary cycle creator and overwrite its refreshed-closure target and lineage; the Green semantic gate omitted an explicit unsupported/blocked exit; and an attempt-2 correction whose phase was already Evidence could send its mandatory record through another Evidence lease. The current graph parameterizes material-test replacement, permits it at most once for the same finding/objective/authority while preserving count/target and extending lineage, adds the Green stop edge, and classifies evidence metadata, correction records, and remediation lineage as coordinator-only queue items. The reviewed packet remains historical; fresh complete review of the current state is required.

Expected owned artifact families after execution, subject to the exact Milestone 1 DPL records, are:

- root: `package.json`, the selected workspace metadata and single lockfile, runtime pin, `tsconfig.base.json`, root TypeScript/test configuration, `vitest.config.ts`, `playwright.config.ts`, `compose.yaml`, `.env.example`, and targeted additions to `.gitignore`;
- web: `apps/web/package.json`, build and strict TypeScript configuration, `index.html`, a minimal `src/main.tsx`, semantic shell component, BrowserRouter-owned application composition, Tailwind entry, jsdom setup, one focused shell unit test, and one distinct routed application test;
- API: `apps/api/package.json`, no-emit/build configuration, runtime configuration parser, `src/app.ts`, `src/server.ts`, focused configuration tests, and one public `/healthz` application test;
- shared: `packages/shared/package.json` and boundary configuration, plus source only when a stable operational contract has a real consumer;
- smoke: one owned Playwright test under a clearly named `tests/smoke/` boundary and one clearly consumed lifecycle/port helper only after its triggers are recorded;
- documentation: this living plan, plan index, canonical TASK-003 record, root current status and command navigation, execution DPL/progress records, and only other owners materially changed by actual implementation.

Append short evidence here as work proceeds. At minimum retain: tool/version compatibility sources and date; allocated DPL IDs; each assignment identity; lease ID, digest, and terminal result; accepted Red, Green, and post-Refactor commands and decisive output; changed paths; project registry listing; clean-install/build/test transcripts; direct HTTP status/body; Playwright report paths; lifecycle and port-rebind results; Compose health/teardown output; negative-scope and relevance-search results; documentation validators; diff checks; and independent-review verdicts. Keep secrets, ignored guard runtime records, full dependency logs, browser binaries, and disposable generated output out of this document and Git.


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
- 2026-08-12 / Codex primary thread: Materially revised the still-unstarted plan to adopt DPL-DEC-014 and the project-scoped `test_worker`/`code_worker` contracts. Added task-local serial leases, path families, Red acceptance and frozen-test barriers, bounded correction and re-entry, evidence ownership, and fresh integrated review requirements. The prior reviewed hash remains historical; this revision requires a new hash and verdict before the plan is again marked ready to execute.
- 2026-08-12 / Codex primary thread: Recorded complete fresh correction-cycle `PASS` for reviewed plan SHA-256 `43BD0E3DA5853BC8DC29FFA18490ED601F591F1AFE2134271DBE20FC89C1C5E3` and raw working-tree patch SHA-256 `91F10449A0B4F4D5C42AF5E568B88C3085779CDAA93437A1371DCCCC8C75E3`. The initial review's only Major was corrected by defining deterministic `PASS WITH FOLLOW-UPS` disposition and re-review semantics; no finding remains. This reconciliation returns the plan to ready-to-execute without starting TASK-003 or creating implementation evidence.
- 2026-08-12 / Codex primary thread: Materially revised the still-unstarted worker contract to require automatic coordinator-owned baseline capture, pinned contract digests, one active lease per worktree, and terminal compliant receipts before every handoff barrier. This enforcement revision changes no product scope, task state, gate, accepted architecture, or implementation evidence; the prior reviewed hashes remain historical, and complete fresh review is required before the plan is again ready to execute.
- 2026-08-12 / Codex primary thread: Recorded complete fresh independent `PASS` for the automatic-lease revision at reviewed 15-path packet SHA-256 `5879C3C8A59C98375CACC9568FD350A55F854A800A114875139D4B600A5628A0`, with 25/25 isolated Windows guard checks and no open finding. This bounded evidence reconciliation returns the plan to ready-to-execute while preserving TASK-003 as `Pending` and unstarted.
- 2026-08-12 / Codex primary thread: Materially revised the still-unstarted assignment contract under DPL-DEC-017 to require the canonical minimum-but-extensible `Worker Assignment Packet v1`, exact packet-to-guard projection matching, full handoff identity, and fresh review. The primary made this bounded workflow bootstrap edit directly because the worker contract itself was changing while TASK-003 remains `Pending` and the worker agents correctly require an `In progress` task before writing. The changed policy and plan paths, structural validation, guard regression check, and independent verdict are recorded in the execution log; prior review hashes remain historical, and this revision is not ready until the fresh review is reconciled.
- 2026-08-12 / Codex primary thread: Recorded complete fresh correction-cycle `PASS` for the assignment-packet revision at reviewed 12-path packet SHA-256 `FE9711A5743AD995792EF8447BEACC1AFC0F261D3EAC997D42B1065A6D49EA22` and plan SHA-256 `26C1AF7883DBFCF89D4A998B1E068CF2D076A71425846D420C464E6315DEAAD1`. The initial review's only Minor was corrected by aligning packet identity with the metrics CLI projection; no finding remains. This evidence reconciliation returns the plan to ready-to-execute while TASK-003 remains `Pending` and unstarted.
- 2026-08-12 / Codex primary thread: A fresh review of the later current tree returned `REVISE` because the Mermaid could reuse a terminal Green lease and could advance from Refactor on guard compliance without semantic acceptance. A supplemental contract audit also found that correction lineage was attributed to a guard schema that did not store it and that the guard accepted invalid attempt and role/phase identities. Corrected all four defects, preserved the earlier hashes and verdicts as point-in-time history, and moved the plan back to review-pending. The primary made this bounded edit directly because it changes the worker-assignment control itself while TASK-003 remains `Pending`; no product behavior or acceptance evidence was added.
- 2026-08-12 / Codex primary thread: Corrected the subsequent transverse control-flow review findings. Setup and Red now have explicit attempt-2 correction nodes and operational instructions; delegated evidence has separate terminal-compliance and coordinator-acceptance barriers; and final-review findings may enter attempt 2 only with unchanged assignment identity and unused budget, otherwise the flow stops for reclassification. This remains a workflow-policy edit with no TASK-003 start or product evidence, and the complete current state still requires fresh review.
- 2026-08-12 / Codex primary thread: Corrected the fresh review's remaining Setup-diagram omission by making the attempt-2 node explicitly build the packet, start its guarded lease, and spawn `code_worker` before terminal closure. The reviewed packet hash is preserved as point-in-time `REVISE` evidence; no task, product, gate, or acceptance state changed.
- 2026-08-12 / Codex primary thread: Normalized the remaining assignment edges after fresh review found that attempt-2 Red and final-review corrections did not explicitly spawn their responsible workers. Initial Green and delegated evidence received the same explicit packet, guarded-lease, and spawn wording so no diagram edge can authorize work or closure without a worker launch. The change remains workflow-only and awaits complete fresh review.
- 2026-08-12 / Codex primary thread: Removed the normalized flow's final direct frozen-test re-entry. A material test concern discovered after Green now ends the current cycle only after rejected-Green reconciliation, then obtains a fresh cycle ID and new attempt-1 Red assignment; an unchanged-test production defect remains a bounded Green correction. This preserves TDD and lease identity without changing TASK-003 or product state.
- 2026-08-12 / Codex primary thread: Added a hostile stored-contract fixture to the existing assignment-identity self-test group. It recomputes the tamper-evident digest after changing a valid contract to attempt 3, proving that loaded-contract semantic validation, not only digest validation or `start` input validation, fails closed. Native Windows PowerShell retains a 26/26 result.
- 2026-08-12 / Codex primary thread: Hardened the new post-Green fresh-cycle route so an unchanged-test production defect cannot bypass an exhausted correction budget and a material test correction cannot begin a new cycle while any old-cycle write remains necessary or unresolved. This is conservative workflow control and changes no product state.
- 2026-08-12 / Codex primary thread: Replaced the compressed Mermaid after complete packet and 67-edge review. Assignment phases now expose draft, guard/digest, worker action, terminal closure, and distinct semantic acceptance; every correction begins from terminal coordinator-reconciled state; every slice gets a fresh cycle ID; and final review carries both local and global correction limits. Mirrored the barriers in the prompt, worker and reviewer contracts, guard guide, and task-local assignment table. The revision remains workflow-only and under complete fresh review.
- 2026-08-12 / Codex primary thread: Reconciled the expanded packet's parallel reviews conservatively. Added workflow and dedicated setup-cycle identity before Setup, moved Green conflict classification after terminal closure, made the guard violation mini-flow check correction eligibility and budget, clarified that every packet/lease authorizes one attempt, and replaced impossible literal “same identity” wording with the stable workflow/task/cycle/phase/role/objective/authority subset. The integral `PASS` remains point-in-time evidence, but the combined verdict is `REVISE` until this corrected state receives fresh complete review.
- 2026-08-12 / Codex primary thread: Reconciled fresh graph and coherence review of packet `3882498D1260793122052BACA71EF28843FF395C8FC81E0F3410F9B5A4AC88B6`. Replaced the one-time Setup decision with a reusable Setup/behavior/closure selector, made accepted Setup and behavior work drain every role-matched evidence record before selecting more work, added a bounded delegated-evidence correction route, and rerouted every accepted final-review correction through refreshed closure validation before complete re-review. The primary made this bounded workflow-contract correction directly because TASK-003 is still `Pending` and the writer contracts themselves are changing; no product behavior or acceptance evidence was added, and the corrected state remains under fresh review.
- 2026-08-12 / Codex primary thread: Reconciled review of packet `146BD7AC38E0533E1ED55A9A3109B56C22BC81494206DCBBC42DBE9F6FA01D0B`. Added an explicit evidence return target so every accepted final-review correction records its packet, receipt, handoff, results, and correction history before refreshed closure without resetting the global count. Excluded already accepted Red and Green from generic attempt 2; a reviewer behavioral or test-contract finding now starts a fresh behavior cycle from a reconciled accepted state, while only compatible Setup, Refactor, or Evidence assignments retain the attempt-2 route. This workflow-only correction leaves TASK-003 `Pending` and unstarted and still requires complete fresh review.
- 2026-08-12 / Codex primary thread: Reconciled focused review of packet `53A02582FBE9490D8E5CE4A80E111614808B0588DB16DF90B58BB6180D7A30ED`. The reviewer-directed fresh behavior entry now explicitly increments the global count, binds the finding and replaced cycle to a fresh cycle, sets `refreshed closure` as that cycle's evidence return target, and requires a durable lineage record with reason and accepted results. This removes implicit queue-target state while preserving the one-correction metric distinction, TASK-003 `Pending` state, and absence of product evidence.
- 2026-08-12 / Codex primary thread: Reconciled complete review of packet `C173B64DAAA48EA138D17DA92769EA2470E6B812D05BA7C0EA9B025962507FCD`. A material-test replacement nested inside reviewer remediation now preserves the initialized global count and refreshed-closure target, extends finding/intermediate/successor lineage, and is limited to one replacement with unchanged objective and authority. Green now stops explicitly for blocked or unsupported scope/dependency/path/authority results. Evidence metadata, receipts, correction records, and remediation lineage are coordinator-only, so an Evidence-phase correction cannot create evidence of evidence. TASK-003 remains `Pending` and unstarted; the corrected workflow remains under complete fresh review.
- 2026-08-12 / Codex primary thread: Applied DPL-DEC-018 after the project owner judged the exception state machine disproportionate. The active plan now uses one compact normal loop: minimum packet, guarded lease, Red, Green with optional same-turn Refactor, primary-recorded evidence, complete checks, and one fresh final review. Every exception stops for coordinator triage instead of selecting a specialized graph branch. The prior rows, hashes, and verdicts remain point-in-time history; TASK-003 is still `Pending` and the simplified revision awaits fresh review.
- 2026-08-12 / Codex primary thread: Reconciled the simplified packet's first fresh review at `F402ED8554F6362AD5E7FC9E19F504866E76C5AAF16988503CD064D7807A9AA4`. Its sole Major identified a stale task-local sentence that bypassed coordinator triage after final review. The corrected closure rule stops first, keeps evidence and authority primary-owned, and routes only an authorized implementation fix through the ordinary fresh assignment loop. The reviewed hash remains historical and the corrected state requires final fresh review.
- 2026-08-12 / Codex primary thread: Recorded complete fresh correction-cycle `PASS` for simplified packet `1B4FBEA61C2CE047579B4B7BD35A2C1D627DCC7945930090B9A6979B88464280`. The reviewer reproduced all supplied component hashes and found no Blocker, Major, or Minor after the coordinator-triage correction. This post-verdict reconciliation returns the plan to ready-to-execute while preserving TASK-003 as `Pending` and unstarted and adding no product or acceptance evidence.
