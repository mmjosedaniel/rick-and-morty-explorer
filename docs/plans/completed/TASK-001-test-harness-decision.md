# Resolve TASK-001 by Selecting the TypeScript Test-Harness Boundaries

This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.

## Purpose / Big Picture

This plan records how `TASK-001 - Resolve the TypeScript test-harness gate` moved from its initial `Pending` state through decision work to an owner-approved architecture decision that resolved `DG-001`. A contributor starting `TASK-003` can now determine which TypeScript runners and browser-like Document Object Model (DOM) environment to configure, how fast unit tests differ from real PostgreSQL and Redis integration tests, how the narrow real-browser walking-skeleton smoke is run, and which package-level and root command boundaries must exist.

The observable result of this plan is documentation and approval evidence, not an installed harness. A reviewer can verify success by opening the accepted gate-resolution ADR, following its links from the ADR index and implementation plan, and running both repository documentation validators. No `package.json`, lockfile, test configuration, executable test, browser binary, application source, or new runtime behavior belongs to `TASK-001`.

## Progress

- [x] (2026-08-10 04:33Z) Read the repository policy, documentation map, source assessment, normalized requirements, optional-scope dispositions, ADR-0001, ADR-0002, ADR-0010, target module view, canonical task graph, TASK-001, DG-001, specification routing, HS-001, HS-006, and HS-017.
- [x] (2026-08-10 04:33Z) Confirmed from the tracked tree that no application manifest, runner configuration, executable product test, or application scaffold exists.
- [x] (2026-08-10 04:33Z) Added the root `PLANS.md` convention and registered this node-scoped ExecPlan without changing TASK-001 or DG-001 status.
- [x] (2026-08-10) Added reusable project-scoped technology-researcher, decision-analyst, and independent-reviewer definitions plus an optional multi-agent execution topology; this preparation does not start TASK-001 or change DG-001.
- [x] (2026-08-10) Parsed all three agent TOML files, passed repository documentation validation, preserved TASK-001 and DG-001 as `Pending`, and completed an independent agent-portfolio review with no blocking or major findings.
- [x] (2026-08-10) Pinned all three project-scoped agents to `gpt-5.6-sol` with `high` reasoning as the owner-selected quality-first policy; this workflow configuration does not select or implement a test harness.
- [x] (2026-08-10 21:01Z) Marked TASK-001 `In progress` in `docs/IMPLEMENTATION_PLAN.md`, kept DG-001 and TASK-003 `Pending`, and appended the evidence-linked start entry to `docs/execution/decision-and-progress-log.md`.
- [x] (2026-08-10 21:11Z) Reconfirmed ADR-0010 as the highest allocated number, found no harness artifacts, and completed three parallel primary-source reports for the Vitest, Jest, and split-runner candidates.
- [x] (2026-08-10 21:18Z) Completed the `decision_analyst` comparability audit and 14-criterion matrix across all three complete reports; it recommended Vitest projects, jsdom, and Playwright with high confidence.
- [x] (2026-08-10 21:18Z) Drafted ADR-0011 as `Proposed`, selected Vitest projects plus jsdom and a Chromium-only Playwright smoke, recorded rejected alternatives, and scored the proposal 92/100.
- [x] (2026-08-10 21:26Z) Validated the proposal, corrected the supported pass-1 findings, received an independent-review pass-2 `PASS` with no findings, and prepared the exact project-owner approval request for ADR-0011.
- [x] (2026-08-10 21:41Z) Recorded owner approval, accepted ADR-0011, resolved DG-001, marked TASK-001 `Complete`, and updated every affected navigation, specification, status, and execution record without claiming that the harness exists.
- [x] (2026-08-10 21:41Z) Completed the test-relevance audit, ADR validator, documentation validator, whitespace check, negative artifact searches, final scope review, retrospective, and documentation-impact record.
- [x] (2026-08-10 21:49Z) Preserved this completed plan under `docs/plans/completed/`, retained its stable filename and history, and repaired its index, inbound links, path-sensitive commands, and current-orientation wording under DPL-DEC-010.
- [x] (2026-08-10 21:54Z) Revalidated the reorganized documentation: 33 Markdown files and 11 ADRs pass their validators, `git diff --check` exits 0, the former directory is absent, and exhaustive search finds no reference to its old name.

## Surprises & Discoveries

- Observation: The canonical roadmap names TASK-001, not DG-001, as the executable work unit; DG-001 is the stateful gate that TASK-001 resolves.
  Evidence: `docs/IMPLEMENTATION_PLAN.md` defines `TASK-001 - Resolve the TypeScript test-harness gate` and lists project-owner approval as its completion join.
- Observation: The repository currently contains documentation only, so a configuration spike inside the working tree would cross HS-001 before the gate is resolved.
  Evidence: `git ls-files` contains no application manifest, lockfile, test configuration, application source, or executable product test; `docs/specs/HARD_SPEC.feature` lines under HS-001 prohibit those artifacts while DG-001 is pending.
- Observation: ADR-0010 already fixes the testing philosophy and risk portfolio. TASK-001 must select execution tooling and boundaries without reopening TDD, the required frontend and backend coverage, or the real PostgreSQL and Redis requirements.
  Evidence: `docs/adrs/superseded/0010-use-a-targeted-automated-testing-strategy.md` requires Red-Green-Refactor, deterministic fixtures, real infrastructure integration, a narrow optional browser smoke, and a plan-completion test-relevance audit.
- Observation: Project-scoped Codex agents are reusable role configurations, while each spawned instance still needs a bounded task-specific assignment; the primary thread remains the coordinator rather than delegating closure to another custom agent.
  Evidence: `.codex/agents/` defines stable research, decision-analysis, and review behavior; `.codex/README.md` defines the instance contract and TASK-001 topology without creating a task runner or product dependency.
- Observation: On this Windows working tree, `git diff --check` can exit successfully while Git emits line-ending conversion warnings that are not whitespace-error findings.
  Evidence: The agent-portfolio validation run exited 0 with no whitespace-error paths or line numbers and separately warned that Git may convert LF to CRLF in four already-modified documentation files.
- Observation: The current Vitest documentation supports ESM-first projects and distinct Node/jsdom environments, but its default Vite module runner is not identical to native Node execution.
  Evidence: The `research_vitest` report cites the current Vitest projects, environments, Vite TypeScript, and Vitest 4.1 module-runner documentation; it recommends preserving separate production build/start evidence instead of treating runner transformation as runtime proof.
- Observation: The current Jest ESM path remains experimental and requires the Node VM-modules flag plus an explicitly ESM-emitting transform, while the split `node:test` option constrains TypeScript syntax and duplicates runner conventions without removing Vitest from the repository.
  Evidence: The `research_jest` and `research_split_runner` reports cite current Jest ESM, Node VM and TypeScript, ts-jest, and Node test-runner documentation and independently classify both candidates as viable but not preferred.
- Observation: All three candidate reports select jsdom over happy-dom for compatibility clarity and preserve Playwright as a Chromium-only process smoke, but current Playwright documentation states that graceful SIGTERM/SIGINT shutdown is ignored on Windows.
  Evidence: All three reports cite the Vitest/Jest DOM environment, jsdom limitation, and Playwright web-server documentation; each requires TASK-003 runtime evidence for cancellation, timeout, startup-failure, assertion-failure, and port-release cleanup.
- Observation: A fixed final root-suite contract becomes contradictory if it requires future integration scopes before their owning tasks and gates have completed.
  Evidence: Independent review pass 1 showed that TASK-003 depends only on TASK-001 and must not invoke the DG-002 migration interface, while the initial ADR draft made all integration scopes required by root `test`. ADR-0011 now activates only explicitly registered scopes in canonical order and reserves the first integration registration for TASK-004 after DG-002.

## Decision Log

- Decision: Scope this ExecPlan to TASK-001 and treat DG-001 resolution as its outcome.
  Rationale: The implementation plan owns TASK-001 as the ready graph node and states that its accepted ADR resolves DG-001. Planning directly against the gate would omit task status, evidence, and closure responsibilities.
  Date/Author: 2026-08-10 / Codex
- Decision: Do not select or install a runner in this ExecPlan. Require the proposed ADR to make one evidence-based recommendation and require explicit project-owner approval before that recommendation becomes accepted direction.
  Rationale: HS-001 forbids implicit selection while DG-001 is pending, and the task definition of done requires owner approval. A planning artifact may define the evaluation but cannot resolve the gate itself.
  Date/Author: 2026-08-10 / Codex
- Decision: Require evaluation of three concrete strategy shapes: Vitest plus Playwright; Jest plus Playwright; and a split Node.js test runner, Vitest, and Playwright portfolio.
  Rationale: These candidates cover a unified ESM-first application runner, a mature alternative with additional ESM transformation concerns, and a lower-dependency backend runner that increases workspace fragmentation. All can be compared against the same React, API, infrastructure, and browser-smoke needs.
  Date/Author: 2026-08-10 / Codex
- Decision: Keep Storybook testing, executable Cucumber-style Gherkin bindings, broad end-to-end coverage, coverage-percentage gates, and CI-provider configuration outside the initial decision unless the ADR demonstrates that one is necessary for a DG-001 definition-of-done condition.
  Rationale: DPL-DEC-007 keeps the Storybook pilot non-blocking and outside test evidence, the specifications permit an equivalent automated check instead of executable feature bindings, ADR-0010 defers broad end-to-end coverage, and no requirement mandates a numeric coverage threshold or CI vendor.
  Date/Author: 2026-08-10 / Codex
- Decision: Keep the primary Codex thread as TASK-001 coordinator and writer, and use three reusable read-only project-scoped roles for optional multi-agent execution: any number of task-labelled instances of one technology researcher, one decision analyst after the research barrier, and one independent reviewer after the primary thread drafts the ADR.
  Rationale: Custom agent files configure spawned sessions, so a second permanent coordinator would duplicate orchestration and blur closure ownership. Stable helper definitions make the workflow reproducible and portfolio-visible, while task-specific researcher assignments avoid duplicating a permanent agent for every candidate technology.
  Date/Author: 2026-08-10 / Codex
- Decision: Pin `technology_researcher`, `decision_analyst`, and `independent_reviewer` to `gpt-5.6-sol` with `model_reasoning_effort = "high"`.
  Rationale: TASK-001 research depends on current external sources, cross-source reconciliation, consequential architecture choices, and adversarial review. The project owner selected a consistent quality-first model policy and accepts higher latency and token use rather than optimizing these three roles independently for cost.
  Date/Author: 2026-08-10 / Project owner and Codex
- Decision: Propose Vitest projects for every non-browser test, jsdom for React DOM semantics, and one Chromium-only Playwright project for the TASK-003 process smoke.
  Rationale: The three symmetric technology reports and the decision analyst found this option provides the strongest proportionality and workspace consistency while preserving explicit native-Node, DOM-fidelity, infrastructure-isolation, and Windows-cleanup limitations. Jest retains experimental ESM costs, while the split runner adds a second non-browser dialect without removing Vitest.
  Date/Author: 2026-08-10 / Codex, informed by the project-scoped research and decision-analysis roles
- Decision: Activate test projects and root scope commands only when their owning TASK creates executable behavior and every controlling gate is resolved; make every registered project mandatory while treating unregistered future scopes as not yet executable rather than skipped or passing.
  Rationale: This preserves a deterministic final unit-integration-application-smoke order without forcing TASK-003 to invent DG-002 migration behavior or later-task integration suites. It also makes absence falsifiable once a task registers a project.
  Date/Author: 2026-08-10 / Codex after independent review pass 1
- Decision: Accept ADR-0011 exactly as presented and proceed with TASK-001 closure without starting TASK-003.
  Rationale: After receiving the proposed path, recommendation, alternatives, score, command boundaries, validation evidence, and residual risks, the project owner responded "adelante" to the explicit approval checkpoint.
  Date/Author: 2026-08-10 / Project owner
- Decision: Preserve this closed plan under `docs/plans/completed/` with its stable filename and execution history.
  Rationale: The project owner generalized the planning directory and requested a dedicated completed area. Separating active work from closed historical evidence improves navigation without changing TASK-001's outcome or starting TASK-003.
  Date/Author: 2026-08-10 / Project owner and Codex

## Outcomes & Retrospective

TASK-001 is complete. [ADR-0011](../../adrs/0011-define-the-typescript-test-harness.md) is `Accepted`, DG-001 is `Resolved`, and the ADR index, implementation plan, specification guidance, HS-001 invariant, root status, plan index, and execution chronology distinguish accepted direction from unimplemented tooling. The test-relevance audit found no TypeScript source, executable test, fixture, mock, helper, snapshot, skipped/focused test, executable Gherkin binding, manifest, lockfile, harness configuration, browser binary, or application scaffold. The ADR and documentation validators and `git diff --check` pass; the NFR-006 ADR-metadata warning and Windows LF/CRLF notices are non-error diagnostics. TASK-003 is ready by dependency but remains `Pending` and has not started.

Documentation impact: Updated ADR-0011, the ADR index and architecture coverage, the canonical gate/task state, specification execution guidance and HS-001, root current status, plan navigation, and execution chronology. After closure, this historical plan was preserved under `docs/plans/completed/` and all path-sensitive references were repaired. The system diagram has no change because ADR-0011 defines development tooling outside the runtime module view. Requirements and optional-scope dispositions have no semantic change.

## Context and Orientation

The repository is in its requirements and architecture phase. `README.md` is the documentation entry point and current-status owner. `docs/REQUIREMENTS.md` defines NFR-004 code quality and the source-optional requirements OR-001 TypeScript, OR-004 frontend tests, and OR-007 backend tests. The optional-scope table in `docs/adrs/README.md` records all three optional requirements as adopted repository commitments; their source classification remains optional.

`docs/IMPLEMENTATION_PLAN.md` owns the dependency graph. TASK-001 had no prerequisite and is now `Complete`; ADR-0011 is `Accepted`, and DG-001 is `Resolved`. Before that resolution, DG-001 blocked any test-runner dependency or configuration, executable binding of a derived scenario, first executable application test, walking-skeleton browser smoke, or production-behavior TDD cycle. TASK-003 is ready by dependency but remains `Pending` and has not started.

ADR-0001 fixes a modular-monolith workspace with future `apps/web`, `apps/api`, and `packages/shared` workspaces, root command entry points, and external PostgreSQL and Redis services. ADR-0002 requires strict TypeScript and ECMAScript modules for all application and test source, while retaining a separate no-emit type check because a test runner's TypeScript transformation does not prove type correctness. ADR-0010 fixes the Red-Green-Refactor workflow and the target risk portfolio. TASK-001 selected only how those accepted decisions will execute.

For this plan, a unit test exercises one isolated component, function, or service with test doubles instead of real infrastructure. A component test renders React into a browser-like DOM implemented in Node.js; it is not a real browser test. An integration test crosses a real boundary such as Express and GraphQL wiring, PostgreSQL, Redis, or migrations. An application test exercises an application-owned boundary through its public interface while remaining narrower than a browser-to-database end-to-end flow. The real-browser smoke launches the minimal web and API processes created by TASK-003 and uses one actual browser engine to observe the visible React shell and the API liveness response. ADR-0011 refines these definitions and maps each one to future commands without claiming those commands already exist.

The derived feature files in `docs/specs/` are currently specification-only. HS-001 is the human-decision guard for DG-001. HS-006 requires strict TypeScript once source exists. HS-017 defines the target test portfolio and the evidence required for each TDD cycle. Tests may cite stable `SPEC-*` and `HS-*` IDs or otherwise map to equivalent automated checks; TASK-001 decided that a separate feature-file execution layer does not provide enough value to justify its cost.

## Scope and Non-Goals

TASK-001 includes the proposed and, after explicit approval, accepted ADR; the ADR-index entry and score; the DG-001 and TASK-001 state transitions; affected specification guidance; execution chronology; and documentation validation. The ADR must decide runner count, strict-TypeScript and ESM integration, the React DOM environment, workspace configuration ownership, unit/integration/application/root command semantics, external-service process ownership, browser-smoke scope, deterministic fixture rules, isolation, failure behavior, and the relationship between Gherkin examples and executable tests.

This plan does not add dependencies, manifests, lockfiles, TypeScript configuration, runner configuration, test files, application source, Compose services, browser binaries, CI workflows, or authoritative package commands. Those implementation artifacts begin in TASK-003 or later dependency nodes after DG-001 and each other applicable gate is resolved. This plan does not select the package manager, exact Node.js version, application ports, migration runner controlled by DG-002, GraphQL client controlled by DG-003, or character-image boundary controlled by DG-004.

Broad browser end-to-end coverage remains deferred. The TASK-003 smoke proves only that the real browser can render the minimal web shell and that the API process exposes its liveness contract; it does not prove GraphQL product behavior or any AC-001 through AC-012 result. Storybook remains a development-only pilot proposal and provides no automated-test or acceptance evidence unless a later accepted decision changes that boundary.

## Agent Collaboration Topology

The reusable agent definitions and their invocation contract are documented in `.codex/README.md`. This ExecPlan can be executed by the primary Codex thread alone; multi-agent execution is an optional coordination method and does not change the task graph, evidence standard, approval boundary, or definition of done.

When multi-agent execution is requested, the primary thread remains TASK-001 coordinator, sole writer, and final closure owner. It creates three bounded, read-only instances of `technology_researcher`, labelled by assignment rather than by permanent role: `research_vitest`, `research_jest`, and `research_split_runner`. Every project-scoped agent uses `gpt-5.6-sol` with `high` reasoning, and every researcher instance receives the same evaluation criteria and output schema. The primary thread waits for all three reports, then gives the complete set to `decision_analyst` to audit comparability, build the decision matrix, and recommend an option. The primary thread—not the analyst—drafts the proposed ADR.

After synthesis, `independent_reviewer` inspects the actual proposed ADR and related diff against TASK-001, DG-001, mapped requirements, accepted ADRs, SPEC/HS rules, and repository evidence. A `REVISE` result may return to the primary thread for at most two correction-and-review cycles. A remaining contradiction, missing authority, or owner-controlled choice stops the loop and returns to the project owner. The analyst and reviewer cannot approve the ADR, and none of the agent reports resolves DG-001.

## Plan of Work

### Milestone 1: Start the decision task without crossing the gate

When execution begins, re-read this plan and the current TASK-001 and DG-001 records because another planning branch may have changed them. Change TASK-001 from `Pending` to `In progress` only in `docs/IMPLEMENTATION_PLAN.md`, then append a dated progress entry to `docs/execution/decision-and-progress-log.md` linking this ExecPlan. Do not change DG-001 at this milestone. Verify that the diff contains no harness dependency, configuration, executable test, or application source. At the end of the milestone, reviewers can see that decision work has started while HS-001 still protects implementation.

### Milestone 2: Produce a falsifiable proposed ADR

Immediately before creating the ADR, list `docs/adrs/` and choose the next unused sequential number. At the time this ExecPlan was authored, ADR-0010 was the highest record, so the next record would currently use sequence number `0011` and the slug `define-the-typescript-test-harness`. If another task has claimed that number, allocate the actual next number and update every path and reference in this ExecPlan before proceeding.

Create the ADR with status `Proposed`. Compare at least the following strategies:

1. Vitest projects for web, API, shared, and non-browser integration tests; a selected Node-based DOM implementation for React; and Playwright Test only for the real-browser smoke.
2. Jest projects for web, API, shared, and non-browser integration tests; jsdom for React; and Playwright Test for the real-browser smoke, including the TypeScript transformation and native ESM costs.
3. The built-in Node.js test runner for API, shared, and infrastructure tests; Vitest for React tests; and Playwright Test for the real-browser smoke, including the duplicated configuration and assertion/mocking conventions.

If the project-scoped multi-agent workflow is used, assign one strategy to each `technology_researcher` instance with the identical criteria below. Wait for every report, preserve cited upstream evidence, and give the complete report set to `decision_analyst` for a comparability audit and criteria matrix. The primary thread must reconcile conflicting findings before writing the proposed ADR. Research and analysis reports are inputs to the decision, not architecture approval or repository evidence that a harness exists.

Evaluate each strategy against the accepted ADR rubric and the following harness-specific criteria: strict TypeScript remains a separate no-emit check; ESM works without silently compiling production code to CommonJS; React tests have a named DOM environment and documented limitations; backend unit tests run in a Node environment; PostgreSQL and Redis remain external processes with per-run isolation; migration setup delegates to the future DG-002 decision; one browser engine can run the TASK-003 smoke without broadening end-to-end scope; package-level commands support fast Red feedback; a root full-suite boundary is deterministic; Windows and CI process cleanup are bounded; no automated test calls the live public Rick and Morty API; and the total tool and configuration surface remains proportional to the assessment.

The ADR must separately compare jsdom and happy-dom, then select one React DOM environment. It must select root-versus-workspace configuration ownership and name the future command contract for unit, integration, application, smoke, and full-root scopes. These names are planned interfaces until TASK-003 creates matching manifests. Define which scopes require PostgreSQL, Redis, migrated state, running web/API processes, and a browser binary; define their exit behavior and cleanup responsibility. State whether the `.feature` files remain traceability documents mapped to ordinary tests or gain executable bindings, and justify the result under KISS.

The recommendation must preserve a narrow Playwright-style real-browser smoke as a separate process boundary unless another candidate demonstrably satisfies the same real-browser, multi-process, startup-wait, failure-reporting, and cleanup behavior with less complexity. It must keep the TASK-003 smoke limited to the visible shell and `/healthz`; TASK-010 owns the later browser-to-GraphQL-to-PostgreSQL product smoke.

Score the ADR using the repository's 100-point rubric. A score from 85 through 100 supports an `Accept` recommendation; 75 through 84 supports `Accept with explicit follow-ups and residual risks`; 60 through 74 requires revision while the ADR remains proposed; and a score below 60 requires rejection. Add the proposed record to the ADR index as `Proposed`, but do not alter the optional-scope dispositions or mark DG-001 resolved.

### Milestone 3: Obtain the required architecture approval

Run the ADR and documentation validators against the proposed state. If the project-scoped multi-agent workflow is used, have `independent_reviewer` inspect the proposed ADR and actual diff. The primary thread must correct supported findings and request no more than two review passes. Present the project owner with the exact ADR path, selected strategy, rejected alternatives, command-boundary summary, DOM selection, integration-process boundary, browser-smoke boundary, score, follow-ups, and residual risks. Ask for approval of that exact recommendation, not a general request for next steps.

If approval is denied or revisions are requested, keep the ADR `Proposed`, keep DG-001 `Pending`, record the feedback in this ExecPlan's Decision Log, revise the affected ADR sections, rerun both validators, and present the revised recommendation. Do not add harness artifacts while awaiting a decision.

### Milestone 4: Resolve DG-001 and close TASK-001 after approval

Only after explicit project-owner approval, change the ADR status to `Accepted` and record the approval date and owner. Update `docs/adrs/README.md` so its decision index, portfolio narrative, architecture coverage, and references include the new accepted decision without changing the source-optional classifications of OR-001, OR-004, or OR-007.

Update the DG-001 row and definition of done in `docs/IMPLEMENTATION_PLAN.md` to mark the gate `Resolved` and link the accepted ADR. Change TASK-001 to `Complete` only when every definition-of-done condition and the universal documentation gate passes. Add or update the TASK-001 execution-plan link without changing graph edges or claiming that TASK-003 has begun.

Update `docs/specs/README.md` so it distinguishes an accepted harness decision from an implemented harness: derived scenarios remain `Specified, not executed` until TASK-003 or the relevant later task creates the selected boundary and passing evidence. Review HS-001 in `docs/specs/HARD_SPEC.feature`; preserve the stable ID while changing the pending-gate guard to the approved-decision invariant if the accepted ADR makes the old active wording stale. Do not add step definitions or mark any scenario executable.

Append evidence-linked completion chronology to `docs/execution/decision-and-progress-log.md`. Update the root README current status and this directory's index only to reflect the accepted decision and completed planning task; keep the repository in the requirements and architecture phase and state that no harness is implemented. The system diagram needs no runtime-module change because test tooling is intentionally outside its module view; record that explicit no-impact reason in the retrospective.

### Milestone 5: Audit relevance, validate documentation, and hand off

Perform the ADR-0010 test-relevance audit. Because TASK-001 must not create tests, the expected result is that no test was added, changed, skipped, focused, weakened, or removed and no fixture, mock, helper, snapshot, or executable Gherkin binding exists. If the repository state contradicts that expectation, stop closure and reconcile the unexpected artifacts with their owning task.

Run the ADR validator, documentation validator, `git diff --check`, and targeted searches shown below. Inspect the final diff for English-only prose, stable IDs, correct relative links, unchanged task edges, unchanged optional classifications, and honest evidence language. Update this ExecPlan's living sections and add a revision note. TASK-001 is complete only when the accepted ADR, gate link, task state, validators, negative checks, execution chronology, and documentation-impact statement all agree.

## Concrete Steps

Run all commands from the repository root, `C:\Users\mmjos\Desktop\workbeanch\rick-and-morty-test`, in PowerShell.

Before beginning execution, confirm the current task, gate, ADR sequence, and cleanly scoped working state:

    git status --short
    rg -n "TASK-001|DG-001" docs/IMPLEMENTATION_PLAN.md docs/specs docs/execution
    Get-ChildItem docs/adrs -File | Sort-Object Name | Select-Object -ExpandProperty Name
    rg --files -g "package.json" -g "*lock*" -g "*test*" -g "*spec.ts" -g "*spec.tsx" -g "!docs/specs/**"

The last search is expected to find no application manifest, lockfile, runner configuration, or executable application test before TASK-001 executes. Documentation and skill files whose names contain `test` do not count as harness artifacts; inspect any result instead of deleting it.

After drafting the proposed ADR and index entry, run:

    python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
    python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    git diff --check

Expect both Python commands to exit with status 0 and report no validation errors. `git diff --check` must exit 0 and report no whitespace-error path or line; record platform line-ending conversion warnings separately as non-error diagnostics. These commands validate structure and links; they do not approve the ADR or prove a harness exists.

Before asking for owner approval, review the decision boundary:

    rg -n "Vitest|Jest|Node.js test runner|jsdom|happy-dom|Playwright|unit|integration|application|smoke|root" docs/adrs/<actual-adr-file>.md
    rg -n "Status: Proposed|Recommendation:" docs/adrs/<actual-adr-file>.md
    git diff -- docs/adrs docs/IMPLEMENTATION_PLAN.md docs/specs docs/execution README.md docs/plans

Replace `<actual-adr-file>` with the allocated filename. The proposed diff must leave DG-001 pending and TASK-001 in progress. It must not contain a manifest, dependency, runner configuration, executable test, or application source.

After approval and all authority updates, run:

    rg -n "DG-001.*Resolved|TASK-001.*Complete" docs/IMPLEMENTATION_PLAN.md
    rg -n "Status: Accepted|Related requirements:.*NFR-004.*OR-001.*OR-004.*OR-007" docs/adrs/<actual-adr-file>.md
    rg -n "Specified, not executed|not.*implemented|no.*harness" README.md docs/specs/README.md docs/plans/completed/TASK-001-test-harness-decision.md
    rg -n "\.only\(|\.skip\(|test\.only|test\.skip|describe\.only|describe\.skip" --glob "*.ts" --glob "*.tsx" .
    python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
    python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    git diff --check
    git status --short

The skipped/focused-test search is expected to return no matches and may exit with status 1 because no TypeScript test source exists. Record that as a successful negative check, not a failing validation. The two validators and `git diff --check` must exit 0; the latter must report no whitespace-error path or line, while platform line-ending conversion warnings are recorded separately.

## Validation and Acceptance

TASK-001 passes when all of the following are observable together:

- The next unused ADR is accepted by the project owner, scores at least 85 or carries the explicit follow-ups allowed by the ADR rubric, compares at least the three required strategy shapes, and makes one clear recommendation.
- The accepted decision defines ESM and strict-TypeScript behavior, one React DOM environment, workspace configuration ownership, unit/integration/application/smoke/root command semantics, PostgreSQL and Redis process isolation, deterministic external fixtures, browser-smoke scope, cleanup and failure behavior, and the Gherkin binding boundary.
- `docs/adrs/README.md` links the accepted ADR and leaves OR-001, OR-004, and OR-007 classified as source-optional but repository-adopted.
- `docs/IMPLEMENTATION_PLAN.md` links the accepted ADR, marks DG-001 `Resolved`, marks TASK-001 `Complete`, preserves every task dependency, and still describes TASK-003 as not started until separate evidence says otherwise.
- `docs/specs/README.md` and HS-001 accurately distinguish accepted direction from implemented/executed tests. No `SPEC-*` or `HS-*` scenario is marked passing.
- The execution log links the start, approval, and completion evidence, while this ExecPlan and its index reflect the final state.
- No harness dependency, manifest, lockfile, runner configuration, application source, executable test, browser binary, or implemented command appears in the TASK-001 diff.
- The test-relevance audit records that no executable suite was changed and finds no residual or disabled test scaffolding.
- The ADR validator, documentation validator, and `git diff --check` pass exactly as described in Concrete Steps.

No Red-Green-Refactor cycle applies to TASK-001 because it changes architectural and planning documentation only and must not add production behavior. The validators, owner approval, authority-state checks, and negative artifact searches are its executable evidence. TASK-003 will own the first failing application tests and the implementation of the selected harness.

## Idempotence and Recovery

All read and validation commands are safe to repeat. Documentation edits are additive or in-place and must preserve history. If validation fails, correct only the reported path, anchor, ID, metadata, or semantic mismatch and rerun the same validator.

Before allocating the ADR number, always re-list `docs/adrs/`. If another task claimed the expected number, do not rename or overwrite that record. Allocate the next unused number, update this plan and all new links, and record the collision in Surprises & Discoveries and Decision Log.

If work stops before owner approval, leave the ADR `Proposed`, TASK-001 `In progress`, and DG-001 `Pending`. Record the exact review state and next action in Progress. If the owner rejects the recommendation, preserve the proposed ADR according to the ADR lifecycle, record the rejection or revision path, and do not mark the gate resolved.

If an authority update was partially applied after approval, use `git diff` and the acceptance list to repair forward. Do not use `git reset --hard`, delete the ADR, rewrite execution history, or reuse its number. An accepted ADR can be reversed only by a later superseding ADR.

## Artifacts and Notes

At authoring time, the relevant tracked-tree evidence is:

    Highest ADR: docs/adrs/superseded/0010-use-a-targeted-automated-testing-strategy.md
    TASK-001 status: Pending
    DG-001 status: Pending
    Application manifests: none
    Executable product tests: none
    Application scaffold: none

Primary upstream facts to reconfirm immediately before ADR drafting are that current Vitest documentation describes ESM-first TypeScript/JSX support, multi-project configuration, and jsdom or happy-dom environments; current Jest documentation must be checked for its ESM and TypeScript transformation status; the active Node.js documentation must be checked for the built-in runner's TypeScript and isolation capabilities; and current Playwright documentation supports starting multiple local web servers for a real-browser test. Summarize the relevant facts in the ADR so the decision remains understandable without relying on links alone, then cite only official project documentation in its References section.

The proposed ADR should contain a concise command-boundary contract. The exact command names are part of the decision and remain planned interfaces until TASK-003 implements them. Each row should state its intended caller, test kinds, environment, infrastructure prerequisites, whether a real browser is used, and whether the scope belongs in the default root test command.

## Interfaces and Dependencies

The optional multi-agent workflow depends on the stable agent names, pinned `gpt-5.6-sol` and `high` reasoning policy, and report contracts in `.codex/README.md`. The primary thread supplies identical criteria to every `technology_researcher` instance, passes the complete report set to `decision_analyst`, and gives the resulting proposed ADR and actual diff to `independent_reviewer`. These are development-workflow interfaces only and introduce no product runtime dependency. A Codex environment that does not provide the pinned model must stop and report the compatibility issue instead of silently selecting another model.

The accepted ADR must define future interfaces rather than install them. At minimum it must name:

- the runner used by frontend component and unit tests;
- the runner used by backend and shared unit tests;
- the runner used by GraphQL, PostgreSQL, Redis, and migration integration tests;
- the React DOM implementation and setup-file ownership;
- the real-browser smoke runner, browser engine count, web/API process startup contract, readiness observation, failure artifacts, and cleanup behavior;
- the root and workspace configuration model;
- the future package-script contract for unit, integration, application, smoke, and complete repository tests;
- the separate strict `tsc --noEmit` boundary for application and test source;
- the unique PostgreSQL database or schema and Redis prefix inputs owned by each integration run;
- the deterministic fixture boundary that prevents live public Rick and Morty API calls in automated tests;
- the delegation point to the unresolved DG-002 migration lifecycle;
- the traceability rule connecting ordinary tests to `SPEC-*`, `HS-*`, requirements, ADRs, public contracts, or regressions;
- the explicit exclusions for broad end-to-end coverage and any unselected Storybook or executable-Gherkin integration.

Dependency versions and actual manifest entries belong to TASK-003. The ADR may state compatibility constraints observed during evaluation, but it must not pin versions or claim installation without repository evidence.

## Revision Note

2026-08-10: Created the initial TASK-001 ExecPlan after clarifying that TASK-001 is the executable work item and DG-001 is its controlled outcome. The plan adopts no harness, preserves the owner-approval checkpoint, and introduces no application or test artifacts.

2026-08-10: Added the optional project-scoped multi-agent topology and linked its reusable researcher, decision-analyst, and independent-reviewer roles while keeping the primary thread as coordinator and sole writer. The change makes delegation, synthesis, and bounded review reproducible without starting TASK-001, selecting a harness, changing graph dependencies, or weakening owner approval and evidence requirements.

2026-08-10: Recorded successful static validation and independent review of the agent portfolio, and clarified that `git diff --check` is accepted by exit status and absence of whitespace-error locations rather than by total output silence because Git may emit non-error LF/CRLF conversion warnings on Windows.

2026-08-10: Applied the project owner's quality-first agent policy by pinning all three project-scoped roles to `gpt-5.6-sol` with `high` reasoning. The change accepts additional latency and token use for consistent external research, decision analysis, and independent review without changing TASK-001 or DG-001 status.

2026-08-10: Began TASK-001, completed the three-report multi-agent research barrier and decision analysis, and drafted and validated proposed ADR-0011. The proposal remains subject to independent review and project-owner approval, leaves DG-001 and TASK-003 pending, and adds no harness or application artifact.

2026-08-10: Corrected independent review pass 1 by making root test-scope activation follow the canonical task graph and resolved gates. TASK-003 now activates only unit, application, and smoke projects; TASK-004 activates integration only after DG-002, preventing future scopes from being treated as either missing current work or silently skipped.

2026-08-10: Completed independent review pass 2 with `PASS` and no findings, synchronized the pre-approval state, and stopped at the project-owner approval checkpoint. ADR-0011 remains proposed, DG-001 remains pending, and TASK-003 has not started.

2026-08-10: Recorded the project owner's approval, accepted ADR-0011, resolved DG-001, and updated the affected authority and navigation documents. The change preserves TASK-003 as pending and records the system diagram as unaffected because test tooling remains outside its runtime module view.

2026-08-10: Completed TASK-001 after the relevance audit, both documentation validators, whitespace validation, negative artifact searches, and final authority-state review passed. TASK-003 is ready by dependency but remains pending and no implementation artifact was added.

2026-08-10: Preserved this completed historical plan under `docs/plans/completed/` after the planning directory was generalized. The change retains the stable filename, IDs, and execution history; repairs navigation, relative links, path-sensitive commands, and stale current-orientation wording; and does not change TASK-001, DG-001, ADR-0011, or TASK-003 state. The documentation and ADR validators, whitespace check, topology check, and exhaustive old-name search pass.
