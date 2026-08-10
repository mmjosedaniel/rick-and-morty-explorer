# Resolve TASK-002 by Selecting the Sequelize Migration Lifecycle

This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.

## Purpose / Big Picture

This plan explains how to execute `TASK-002 - Resolve the Sequelize migration-lifecycle gate` from its current `Pending` state through an evidence-based, project-owner-approved architecture decision that resolves `DG-002`. After the task closes, a contributor executing `TASK-004` must be able to implement one unambiguous migration boundary: the selected runner, the TypeScript source and emitted-artifact policy, the local and isolated-test invocations, the metadata and ordering rules, forward and rollback semantics, failure recovery, and PostgreSQL concurrency control.

The observable result of `TASK-002` is an accepted ADR and synchronized decision documentation, not an installed runner or a migrated database. A reviewer must be able to follow the decision from the ADR index and canonical implementation plan, inspect the exact future command and integration interfaces, and run the repository documentation validators. No manifest, dependency, migration configuration, migration file, executable migration command, database-backed harness, ERD, application source, or runtime behavior belongs to this task.

## Progress

- [x] (2026-08-10 22:08Z) Read the repository policy, documentation map, source assessment, normalized requirements, optional-scope dispositions, ExecPlan convention, canonical task graph, TASK-002, DG-002, ADR-0001, ADR-0002, ADR-0003, ADR-0008, ADR-0010, ADR-0011, target module view, specification routing, HS-002, HS-011, HS-018, SPEC-010, and SPEC-016.
- [x] (2026-08-10 22:08Z) Confirmed from the tracked tree that no application manifest, Sequelize configuration, migration artifact, migration command, executable product test, ERD, or application scaffold exists.
- [x] (2026-08-10 22:08Z) Reconciled the current TASK-002 traceability with accepted ADR-0011 and the current graph state without starting TASK-002 or resolving DG-002.
- [x] (2026-08-10 22:08Z) Added and registered this task-scoped ExecPlan as ready to execute while preserving TASK-002 and DG-002 as `Pending`.
- [x] (2026-08-10 22:24Z) Passed the ADR and documentation validators, whitespace and negative-artifact checks, corrected the independent review's research-restartability finding, and received a final `PASS` with no remaining material findings.
- [ ] Start TASK-002 by updating its authoritative state to `In progress` and appending an evidence-linked start record; creating this plan alone is not a task start.
- [ ] Reconfirm the ADR sequence and coordinate the next unused number with TASK-016 without reserving or creating an ADR prematurely.
- [ ] Complete the source-executed programmatic Umzug report and preserve its dated summary in the Durable Research Record.
- [ ] Complete the build-first programmatic Umzug report and preserve its dated summary in the Durable Research Record.
- [ ] Complete the compiled-artifact Sequelize CLI report, or document and research its credible replacement, and preserve the dated summary in the Durable Research Record.
- [ ] Complete the decision-analysis comparability audit and preserve the normalized matrix, ranking, recommendation, confidence, dissent, gaps, and ADR outline in the Durable Research Record.
- [ ] Pass the complete research set through decision analysis, draft the proposed gate-resolution ADR, score it with the repository rubric, validate it, and complete bounded independent review.
- [ ] Present the exact proposed recommendation, alternatives, lifecycle contract, score, risks, and follow-ups to the project owner and obtain explicit approval or revision instructions.
- [ ] After approval only, accept the ADR, resolve DG-002, close TASK-002, synchronize every affected authority and navigation document, and preserve this plan under `docs/plans/completed/`.
- [ ] Complete the documentation relevance audit, negative artifact checks, validators, whitespace check, final diff review, and retrospective handoff.

## Surprises & Discoveries

- Observation: `TASK-002`, not `DG-002`, is the executable roadmap node. DG-002 is the controlled architecture state that an accepted TASK-002 ADR may resolve.
  Evidence: `docs/IMPLEMENTATION_PLAN.md` gives TASK-002 its own outcome, artifacts, approval join, validation, documentation impact, and definition of done.
- Observation: The repository remains documentation-only, so even a small in-tree runner spike would cross the pending-gate guard before the owner-approved decision exists.
  Evidence: The tracked tree contains no manifest, Sequelize configuration, migration, test, or application source, and HS-002 prohibits each controlled artifact while DG-002 is pending.
- Observation: ADR-0011 now directly constrains TASK-002 even though it was accepted after the original TASK-002 mapping was written.
  Evidence: ADR-0011 reserves migrated-state integration activation for TASK-004 after DG-002, requires each run to receive an isolated PostgreSQL namespace, and requires tests to invoke the interface selected by DG-002 rather than inventing one in TASK-003.
- Observation: Current Sequelize documentation presents a materially different support posture for its CLI across release lines.
  Evidence: The current Sequelize v7 CLI page labels v7 as alpha, says its CLI is not ready for Sequelize 7, and directs migration users toward Umzug or another tool; the v6 migration documentation describes the stable JavaScript CLI, `SequelizeMeta`, explicit `up` and `down`, and per-migration transaction examples.
- Observation: A programmatic Umzug option does not make source/build parity, atomic failure behavior, or concurrent execution automatic.
  Evidence: Current Umzug documentation supports TypeScript entrypoints, lexicographically sorted globs, Sequelize-backed metadata, and programmatic `up`/`down`, but its default migration identity includes the file extension, built-in Sequelize storage records metadata separately from migration code, and its optional `FileLocker` is filesystem-scoped rather than a database-wide serialization mechanism.
- Observation: A dual `.ts` and emitted `.js` lifecycle can treat one logical migration as two different migrations unless the decision defines an artifact-neutral identity.
  Evidence: Current Umzug resolution and storage use the discovered filename as the default migration name, so a source filename ending in `.ts` and its emitted counterpart ending in `.js` are distinct by default.
- Observation: “Use a transaction” is not a complete failure policy.
  Evidence: Sequelize does not enable transactions by default; Umzug logs successful execution after calling a migration; PostgreSQL supports transactional DDL broadly but also has operations, such as concurrent index creation, that cannot execute inside a transaction block. The ADR must define schema-plus-metadata atomicity or a precise recovery model.
- Observation: A whole-run migration lock and a per-migration transaction have different lifetimes.
  Evidence: PostgreSQL session-level advisory locks remain until release or session end, while transaction-level advisory locks end with one transaction. If migrations use one transaction apiece, a transaction-scoped lock alone cannot serialize the complete pending batch.
- Observation: The old TASK-002 prerequisite prose said it could run in parallel with TASK-001, but TASK-001 is already complete.
  Evidence: The canonical status index marks TASK-001 `Complete`; TASK-002 is currently independent and may proceed alongside the still-pending TASK-003 and TASK-016 nodes before joining TASK-003 at TASK-004.

## Decision Log

- Decision: Scope this ExecPlan to TASK-002 and treat an owner-approved resolution of DG-002 as its outcome.
  Rationale: The implementation plan owns TASK-002 as the ready decision node. Planning only against DG-002 would omit task status, approval, evidence, documentation impact, and closure responsibilities.
  Date/Author: 2026-08-10 / Codex
- Decision: Do not select, install, or prototype a migration runner in this ExecPlan.
  Rationale: HS-002 forbids runner, configuration, migration, command, database-backed harness, and ERD artifacts while DG-002 remains pending. A plan may define how to compare options but cannot approve architecture or count as implementation evidence.
  Date/Author: 2026-08-10 / Codex
- Decision: Require symmetric evaluation of three initial strategy shapes: programmatic Umzug executing TypeScript source through an explicit loader; programmatic Umzug executing build-first emitted ESM artifacts; and the Sequelize CLI executing compatible compiled JavaScript artifacts.
  Rationale: These strategies expose the principal source-versus-build and programmatic-versus-framework-CLI trade-offs named by DG-002. If current primary evidence makes one non-credible for the repository's eventual Sequelize release line, replace it before the research barrier with a typed custom QueryInterface runner and record the substitution; do not retain a straw-man option merely to reach three.
  Date/Author: 2026-08-10 / Codex
- Decision: Treat migration identity, metadata atomicity, and database-backed serialization as first-class comparison criteria rather than Umzug or CLI defaults.
  Rationale: A source/build extension change can alter default migration identity, built-in metadata updates may not share the migration transaction, and neither an ordinary metadata table nor a filesystem lock alone prevents two hosts from applying the same pending DDL.
  Date/Author: 2026-08-10 / Codex
- Decision: Require the ADR to distinguish one whole-command concurrency boundary from each migration's transaction boundary.
  Rationale: PostgreSQL session-level and transaction-level advisory locks have different release behavior. The selected design must state its lock scope, key, wait or fail-fast policy, timeout, diagnostics, and release behavior without assuming that a short transaction lock protects the full batch.
  Date/Author: 2026-08-10 / Codex
- Decision: Make local setup, isolated integration setup, and emitted-runtime validation consume the same logical migration sequence even if their physical file extensions differ.
  Rationale: ADR-0011 requires migrated-state tests to invoke the DG-002 interface, while ADR-0003 requires version-controlled migrations to be the schema source of truth. Different logical identities or discovery order would create undetectable environment drift.
  Date/Author: 2026-08-10 / Codex
- Decision: Keep upstream character import, seed content, `sequelize.sync`, model-derived schema mutation, ERD authoring, application boot behavior, and actual package/version installation outside TASK-002.
  Rationale: ADR-0008 separates migration from import, ADR-0003 makes migrations authoritative, TASK-004 owns the first runner and schema migration, TASK-005 owns deterministic import, and an ERD must describe implemented migrated state rather than the decision alone.
  Date/Author: 2026-08-10 / Codex
- Decision: Reuse the repository's read-only technology-researcher, decision-analyst, and independent-reviewer roles when the execution environment supports them, while keeping the primary thread as coordinator, sole writer, approval handler, and closure owner.
  Rationale: Independent option research can proceed in parallel against identical criteria, but agent reports neither approve an ADR nor transfer the universal task-closure responsibility.
  Date/Author: 2026-08-10 / Codex
- Decision: Preserve every completed research report's decision-critical summary and the normalized comparison matrix inside this ExecPlan at each stopping point.
  Rationale: Agent transcripts are supporting inputs rather than durable repository artifacts. Copying source/version/date, criteria findings, uncertainties, substitutions, and disposition into Artifacts and Notes lets a new contributor resume from this plan alone before the proposed ADR exists.
  Date/Author: 2026-08-10 / Codex after independent review

## Outcomes & Retrospective

This plan is ready to execute. TASK-002 and DG-002 remain `Pending`; no runner has been selected, no ADR number has been reserved, and no implementation artifact has been added. The initial repository orientation exposed the concurrency, source/build identity, and schema-plus-metadata failure questions that the future ADR must answer explicitly rather than inheriting defaults from a candidate tool. The ADR validator, documentation validator, whitespace check, English and trailing-whitespace searches, and controlled-artifact search pass; independent review returned `PASS` after the Durable Research Record correction.

Documentation impact: Added this active ExecPlan and its plan-index entry, linked it from the canonical TASK-002 record, corrected the task's current parallel-work wording, added ADR-0011 to the current DG-002/TASK-002 traceability, updated the root current-status inventory, and appended planning chronology. Requirements, optional-scope dispositions, ADR status, task status, gate status, specifications, and the target system diagram have no semantic or execution-state change because TASK-002 has not started and DG-002 remains unresolved.

## Context and Orientation

The repository is currently a documentation and architecture portfolio with no application scaffold. Start from `README.md`, which owns current-state navigation. `docs/REQUIREMENTS.md` normalizes the assessment scope: FR-BE-003 mandates Sequelize migrations over the selected relational database, FR-BE-004 requires initialization with 15 public-API characters, NFR-003 fixes the backend stack including Sequelize and PostgreSQL or MySQL, DEL-002 requires an ERD, and AC-009 and AC-012 require migrated schema, initialized data, and delivery artifacts. OR-001 is source-optional but repository-adopted by ADR-0002, so migration and runner source must be strict TypeScript even though the original assessment did not mandate that language.

`docs/IMPLEMENTATION_PLAN.md` is authoritative for task and gate state. DG-002 is pending and blocks a runner or configuration, the first migration, a root migration command, database-backed migration setup, and an ERD derived from intended state. TASK-002 is immediately ready and has no prerequisite, but project-owner approval is a completion join. TASK-004 depends on both TASK-002 and TASK-003 and owns implementation of the selected runner, the first schema migrations, empty-database evidence, and the first migrated-state integration activation.

The accepted architecture narrows the decision. ADR-0001 requires transparent root-to-workspace commands and isolated integration namespaces. ADR-0002 requires strict ESM TypeScript and an independent no-emit type check. ADR-0003 selects PostgreSQL, prohibits `sequelize.sync` as schema authority, requires version-controlled empty-database migrations, and makes the eventual ERD match implemented migration state. ADR-0008 forbids public-API access during migrations and assigns ingestion to a later explicit importer. ADR-0010 requires real PostgreSQL integration evidence for migration behavior. ADR-0011 requires migrated-state tests to call the interface selected here, gives each run a unique PostgreSQL database or schema, and defers activation of that integration scope to TASK-004.

`docs/specs/HARD_SPEC.feature` owns the pending-gate invariant in HS-002. HS-011, SPEC-010, SPEC-016, and the ERD clause in HS-018 describe later observable outcomes; they remain specified but unexecuted after this decision and cannot be marked passing by an accepted ADR. `docs/SYSTEM_DIAGRAM.md` intentionally labels the migration runner as selected by DG-002 until approval. Historical TASK-001 plans, dated reviews, and earlier execution-log entries are point-in-time evidence and must not be rewritten when current state changes.

## Scope and Non-Goals

TASK-002 includes:

- primary-source research and comparable reports for at least three credible runner/artifact strategies;
- one proposed ADR that selects a runner and lifecycle, records alternatives, carries the repository score, and remains subject to explicit owner approval;
- precise future contracts for migration discovery, stable identity, ordering, metadata storage, `up`, `down`, pending/status reporting, source/build execution, local and test invocation, transactions, failure, recovery, concurrency, and diagnostics;
- an isolated-test handoff compatible with ADR-0011 and a future empty-PostgreSQL validation contract for TASK-004;
- approved-decision synchronization across the ADR index, implementation plan, system diagram, specification guidance, execution chronology, root status, plan index, and this living document; and
- documentation validation, negative artifact checks, and the universal closure gate.

TASK-002 does not include:

- installing Sequelize, Umzug, a TypeScript loader, the Sequelize CLI, PostgreSQL tooling, or any other dependency;
- creating or changing manifests, lockfiles, TypeScript build configuration, migration directories, runner source, migrations, models, fixtures, database containers, or root commands;
- connecting to PostgreSQL, running a migration, creating an ERD, importing the 15 characters, or calling the public Rick and Morty API;
- selecting the domain schema, GraphQL shape, Redis behavior, image-delivery strategy, frontend client, package manager, exact dependency versions, or deployment provider;
- marking any SPEC or HS example executable or passing; or
- starting TASK-003, TASK-004, TASK-005, or TASK-016 or changing their dependencies.

## Agent Collaboration Topology

When the repository's project-scoped agents are available, the primary coordinator should create one read-only `technology_researcher` instance for each credible strategy and give every instance the same repository inputs, comparison criteria, evidence standard, output template, and stopping condition. The initial assignments are source-executed programmatic Umzug, build-first programmatic Umzug, and compiled-artifact Sequelize CLI. Wait for all reports before synthesis. If one candidate is replaced as non-credible, document the evidence and give the replacement researcher the identical criteria.

As each researcher finishes, the primary coordinator must copy its decision-critical output into the Durable Research Record in Artifacts and Notes before marking the corresponding Progress item complete. Preserve the candidate, research date, upstream release or documentation version, primary-source URLs, criterion-level findings, unsupported or inferred claims, unknowns, substitution rationale when applicable, and preliminary disposition. Raw agent transcripts may remain session-local, but no fact needed to reconstruct the comparison may exist only in a transcript.

Pass the complete report set to `decision_analyst`. It must audit whether the reports are truly comparable, identify unsupported assumptions, construct the criteria matrix, rank the strategies, and return a recommendation plus an ADR outline. The primary thread reconciles conflicts and drafts the proposed ADR. Only then should `independent_reviewer` inspect the proposal and actual repository diff against TASK-002, DG-002, mapped requirements, accepted ADRs, SPEC/HS rules, and current evidence.

Before ADR drafting, append the decision analyst's normalized matrix, weighting or ranking method, gaps returned for more research, final ranking, recommendation, confidence, and dissenting evidence to the same Durable Research Record. Update Progress with the exact report and matrix completion times. This in-plan record is the restart point until the proposed ADR becomes the durable decision artifact.

The review loop is bounded to two supported correction cycles. A reviewer may return `PASS`, `PASS WITH FOLLOW-UPS`, `REVISE`, or `BLOCKED`; it cannot accept the ADR or resolve DG-002. If two correction cycles do not remove a blocker, stop and ask the project owner for direction. The primary thread remains the only writer and owns approval handling, authoritative synchronization, validation, and final closure.

## Plan of Work

### Milestone 1: Start the task and establish a collision-safe research baseline

Re-read the current documentation map and task authorities because TASK-003 or TASK-016 may have advanced since this plan was authored. Inspect the working tree and current ADR directory before editing. Confirm that TASK-002 is still `Pending`, DG-002 is still `Pending`, and no controlled artifact already exists. If the baseline has changed, reconcile the authoritative owner before following this plan.

When decision execution actually begins, update TASK-002 to `In progress` in `docs/IMPLEMENTATION_PLAN.md` while leaving DG-002 `Pending`, then append an evidence-linked start entry to `docs/execution/decision-and-progress-log.md`. Do not change TASK-004 or imply that persistence implementation has begun.

Re-list `docs/adrs/` immediately before allocation. ADR-0011 is the highest allocated record at plan-authoring time, so sequence number `0012` is expected but not reserved. Coordinate with TASK-016 before creating a file. If another record claimed that number, use the next unused sequential number and update all new references consistently; never overwrite or renumber existing history.

Reconfirm current primary documentation for Sequelize, its CLI, Umzug, Node.js TypeScript execution, TypeScript ESM emit, and PostgreSQL transactions and advisory locks. Record exact versions or documentation release lines in each research report. Do not infer current behavior from tutorials, generated snippets, or a candidate's defaults.

### Milestone 2: Compare complete runner and artifact lifecycles

Evaluate the three initial strategy shapes against an identical rubric:

1. Programmatic Umzug loads strict TypeScript migration source through an explicitly selected source executor in local and test contexts. The report must state what executes in delivery/runtime validation and whether a build artifact also exists.
2. Programmatic Umzug loads emitted ESM JavaScript from a build-first migration artifact in local, test, and delivery contexts. TypeScript remains the authored source and is independently type-checked.
3. The supported Sequelize CLI release line loads compiled JavaScript migrations through its CLI configuration and metadata conventions while TypeScript remains the authored source.

For every strategy, report:

- compatibility with accepted Sequelize, PostgreSQL, ESM, strict TypeScript, Node.js, and workspace boundaries;
- direct and transitive tooling surface, version posture, maintenance burden, and Windows/CI behavior;
- exact authored-source root, emitted-artifact root, resolver base, file pattern, ordering, and protection against process-current-directory drift;
- a canonical migration identifier that is stable across `.ts` and `.js`, rejects duplicates, and does not reinterpret an applied migration after a build-layout change;
- metadata storage name, database/schema placement, uniqueness, history inspection, applied-file mutation policy, and any checksum or drift-detection choice;
- the typed migration contract and whether both `up` and `down` are mandatory and validated before execution;
- forward execution, no-pending behavior, last/step/target rollback semantics, unsafe bulk rollback guardrails, and failed-rollback recovery;
- per-migration versus per-command transactions, schema-plus-metadata atomicity, handling of PostgreSQL operations that cannot run inside a transaction block, and the state left by an interrupted process;
- whole-run concurrency behavior for the same database/schema, independent behavior for disjoint test namespaces, advisory-lock scope and key derivation, timeout or fail-fast semantics, cleanup, and operator diagnostics;
- exact future local, integration-setup, status, rollback, and emitted-runtime validation boundaries, including exit codes and which caller owns connection cleanup;
- parity between local and isolated tests, with no live public API or model synchronization involved;
- empty-database, repeat-up, rollback-and-reapply, injected-failure, metadata-drift, emitted-artifact, and two-run concurrency validation plans; and
- feasibility, proportionality, reversibility, residual risks, and the smallest TASK-004 implementation surface.

Do not treat successful schema DDL and successful metadata recording as the same event unless the candidate proves they share an atomic boundary. Do not treat Umzug `FileLocker`, a process-local mutex, or a unique metadata row as equivalent to cross-process database serialization. Do not assume that migration file ordering is numeric when the candidate's resolver sorts lexicographically. Do not assume that native Node TypeScript execution performs type checking or honors `tsconfig.json`.

After the research barrier, have `decision_analyst` normalize the evidence and identify any criteria that one report omitted. Return incomplete reports to their researchers instead of filling gaps with coordinator memory. The matrix must distinguish confirmed upstream behavior, repository-derived constraints, reasoned inference, and behavior that TASK-004 must prove at runtime.

At every stopping point during this milestone, update Progress and the Durable Research Record below. A report is not complete for planning purposes until its durable summary is present. The research barrier is not complete until all candidate summaries and the normalized matrix can be understood without access to agent transcripts or conversation history.

### Milestone 3: Draft, score, validate, and review the proposed ADR

Create the next unused ADR as `Proposed`. The title should describe the selected lifecycle, not merely name a package. Add it to `docs/adrs/README.md` as proposed without changing DG-002 or TASK-002 to complete and without altering optional-scope dispositions.

The ADR must summarize all candidate strategies, show the common criteria matrix, explain the recommendation, and score the proposal with the repository's 100-point rubric. A score of 85 through 100 supports `Accept`; 75 through 84 supports `Accept with explicit follow-ups and residual risks`; 60 through 74 requires revision while proposed; below 60 requires rejection. A high numeric score cannot override a mandatory requirement conflict, hidden high-impact assumption, missing measurable validation, or conflict with an accepted ADR.

Make the selected lifecycle self-contained. At minimum, the ADR must define:

- the runner library or repository-owned runner, its supported Sequelize release-line assumption, and why its public API is stable enough for TASK-004;
- the strict-TypeScript authoring contract, ESM module semantics, source and emitted paths, loader or build step, source-map/error behavior, and which artifact each local, test, and delivery command executes;
- canonical extension-neutral migration identity, deterministic discovery and ordering, duplicate and stale-build detection, and the rule for modifying an already-applied migration;
- one metadata-store contract, including table/schema ownership, transaction participation, drift observation, and recovery when metadata and schema disagree;
- typed `up` and `down` contracts, mandatory validation, query-interface/transaction context, and the policy for transaction-incompatible PostgreSQL operations;
- one forward policy, one explicit rollback policy, stop-on-first-failure behavior, exit and log semantics, partial-batch state, interrupted-process recovery, and failed-rollback recovery;
- a database-backed whole-command concurrency contract with key scope, connection ownership, wait/fail-fast behavior, bounded timeout, diagnostics, and guaranteed release, plus how disjoint test namespaces avoid blocking one another;
- future command-boundary names for local up, pending/status, bounded down, integration setup, and emitted-runtime validation, clearly labelled as planned interfaces until TASK-004 creates them;
- the callable interface that ADR-0011's migrated-state setup will invoke, its input PostgreSQL namespace, and cleanup ownership without activating the integration project in TASK-002;
- the TASK-004 validation matrix for empty database, idempotent second up, rollback/reapply, injected failure, duplicate/drift rejection, emitted runtime, two callers on one namespace, and two callers on disjoint namespaces;
- confirmation that migrations cannot call the public Rick and Morty API, import records, depend on API boot, call `sequelize.sync`, or derive the ERD before migrated state exists; and
- explicit follow-ups, operational limitations, rejected alternatives, and conditions that would require a superseding ADR.

The decision must say whether migrations are an explicit one-shot operation or can be invoked during another process lifecycle; it may not leave accidental API-startup migration as an implementation default. It must also say whether the selected metadata implementation can participate in the same transaction as schema changes. If not, describe the accepted consistency gap and exact detection/recovery procedure rather than claiming atomicity.

Run both repository validators and the whitespace check against the proposed state. Then give the proposed ADR and actual diff to `independent_reviewer`. Correct supported findings within scope and rerun validation after every correction. Stop after two unsuccessful review cycles and seek owner direction.

### Milestone 4: Obtain explicit project-owner approval

Present the project owner with the exact ADR path, selected strategy, rejected alternatives, supported Sequelize/tool release posture, source-versus-emitted policy, planned command boundaries, transaction and metadata model, rollback and failure semantics, whole-run lock behavior, isolated-test handoff, score, follow-ups, and residual risks. Ask for approval of that exact recommendation.

If the owner requests revision or rejects the recommendation, keep the ADR `Proposed`, TASK-002 `In progress`, and DG-002 `Pending`. Record the feedback in this plan's Decision Log and Progress, revise only supported sections, rerun the validators and review as warranted, and present the revised recommendation. Do not add implementation artifacts while approval is pending.

### Milestone 5: Resolve DG-002 and close TASK-002 after approval

Only after explicit owner approval, set the ADR to `Accepted` with the approval date and owner. Update `docs/adrs/README.md` so its index, portfolio narrative, architecture coverage, and references reflect the accepted lifecycle without changing requirement classifications.

Update the DG-002 row and definition-of-done section in `docs/IMPLEMENTATION_PLAN.md` to `Resolved` with a link to the accepted ADR. Mark TASK-002 `Complete` only when every TASK-002 definition-of-done condition and the universal documentation gate passes. Preserve task dependencies and leave TASK-004 `Pending` until separate execution evidence says otherwise.

Replace the generic DG-002 runner placeholder in `docs/SYSTEM_DIAGRAM.md` with the accepted boundary and keep it explicit that the module is target architecture rather than a running service. Update `docs/specs/README.md` to distinguish an accepted migration decision from executable migrated-state tests. Review HS-002 and convert its pending-gate prohibition into the accepted-decision invariant while preserving the stable ID; review HS-011, SPEC-010, SPEC-016, and HS-018 for affected routing or wording, but do not mark them executed or passing.

Append approval and completion chronology to `docs/execution/decision-and-progress-log.md`. Update the root README current status and this plan index to reflect accepted direction without claiming a runner exists. When TASK-002 is canonically complete and closure has passed, move this file to `docs/plans/completed/` with the same filename, preserve every living section and revision note, and repair all inbound links.

### Milestone 6: Audit relevance, validate documentation, and hand off

Perform the ADR-0010 test-relevance audit. Because TASK-002 is decision-only, the expected result is no added, changed, skipped, focused, weakened, or removed executable test and no fixture, migration helper, database harness, or Gherkin binding. If controlled implementation artifacts appear, stop closure and assign them to the correct downstream task rather than rationalizing them as decision evidence.

Run the ADR validator, documentation validator, `git diff --check`, authority-state searches, and negative artifact searches below. Inspect the final diff for English-only prose, stable IDs, valid links, unchanged task edges, unchanged requirement classifications, explicit owner approval, and honest evidence language. Update all living sections and the revision note at the stopping point.

## Concrete Steps

Run every command from the repository root, `C:\Users\mmjos\Desktop\workbeanch\rick-and-morty-test`, in PowerShell.

Before starting TASK-002, establish the current state:

    git status --short
    rg -n "TASK-002|DG-002|ADR-0011|HS-002|HS-011|SPEC-010|SPEC-016|HS-018" README.md docs/IMPLEMENTATION_PLAN.md docs/adrs docs/specs docs/execution docs/plans
    Get-ChildItem docs/adrs -File | Sort-Object Name | Select-Object -ExpandProperty Name
    rg --files -g "package.json" -g "pnpm-workspace.yaml" -g "*lock*" -g "*migration*" -g "*sequelize*" -g "*.ts" -g "*.tsx" -g "!docs/**"

At authoring time the final search produces no application manifest, lockfile, runner configuration, migration, Sequelize source, or executable TypeScript product code. Inspect any future result rather than deleting it; a newly valid artifact may belong to another task.

After drafting the proposed ADR and index entry, run:

    python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
    python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    git diff --check

Both Python validators must exit 0 with no validation errors. `git diff --check` must exit 0 with no whitespace-error location; Windows line-ending conversion notices may be recorded as non-error diagnostics.

Before requesting approval, inspect the controlled decision and diff:

    rg -n "Status: Proposed|Recommendation:|Umzug|sequelize-cli|TypeScript|compiled|migration identity|SequelizeMeta|transaction|rollback|failure|advisory lock|concurr|empty database|public.*API" docs/adrs/<actual-adr-file>.md
    rg -n "DG-002.*Pending|TASK-002.*In progress|TASK-004.*Pending" docs/IMPLEMENTATION_PLAN.md
    git diff -- docs/adrs docs/IMPLEMENTATION_PLAN.md docs/SYSTEM_DIAGRAM.md docs/specs docs/execution README.md docs/plans

Replace `<actual-adr-file>` with the allocated filename. The pre-approval diff must leave DG-002 pending and TASK-004 pending and must contain no implementation artifact.

After approval and authoritative synchronization, run:

    rg -n "DG-002.*Resolved|TASK-002.*Complete|TASK-004.*Pending" docs/IMPLEMENTATION_PLAN.md
    rg -n "Status: Accepted|FR-BE-003|FR-BE-004|NFR-003|DEL-002|AC-009|AC-012|OR-001" docs/adrs/<actual-adr-file>.md
    rg -n "Specified, not executed|not.*implemented|no.*runner|no.*migration" README.md docs/specs/README.md docs/plans/completed/TASK-002-sequelize-migration-lifecycle-decision.md
    rg -n "\.only\(|\.skip\(|test\.only|test\.skip|describe\.only|describe\.skip" --glob "*.ts" --glob "*.tsx" .
    rg --files -g "package.json" -g "pnpm-workspace.yaml" -g "*lock*" -g "*migration*" -g "*sequelize*" -g "*.ts" -g "*.tsx" -g "!docs/**"
    python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
    python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    git diff --check
    git status --short

The skipped/focused-test search is expected to have no matches and may exit 1. The artifact search is also expected to have no matches in the TASK-002 diff; if another authorized task has added an artifact, inspect its ownership and exclude it from TASK-002 evidence instead of claiming a clean global tree. Validators and `git diff --check` must exit 0.

## Validation and Acceptance

TASK-002 passes only when all of the following are observable together:

- The next unused ADR is explicitly accepted by the project owner, compares at least three credible runner/artifact lifecycle strategies against the same evidence-backed criteria, carries the repository score and recommendation, and makes one clear selection.
- The accepted ADR defines the runner, supported release posture, strict-TypeScript/ESM authoring boundary, source-versus-emitted execution policy, stable logical migration identity, deterministic discovery/order, metadata storage and drift policy, and planned local/test/delivery interfaces.
- Forward, no-op, rollback, partial failure, interruption, failed rollback, metadata mismatch, and recovery behavior are unambiguous. Transactional and nontransactional PostgreSQL operations have an explicit policy.
- Concurrent execution against one namespace has a database-backed whole-command serialization contract with bounded behavior and diagnostics, while disjoint ADR-0011 test namespaces can proceed independently.
- TASK-004 can implement falsifiable empty-database, second-up, down/up, injected-failure, emitted-runtime, same-namespace concurrency, and disjoint-namespace concurrency checks without inventing unresolved semantics.
- The decision preserves version-controlled Sequelize migrations as schema authority, forbids public-API calls and `sequelize.sync`, separates import, and defers the ERD until migrated state exists.
- The ADR index, canonical DG-002 and TASK-002 records, system diagram, specification guidance, root status, plan index, execution chronology, and this living plan agree while TASK-004 remains pending and no runner is described as implemented.
- The relevance audit finds no TASK-002 implementation or executable-test artifact, and the ADR validator, documentation validator, and `git diff --check` pass exactly as described in Concrete Steps.

No Red-Green-Refactor cycle applies to TASK-002 because it changes architectural and planning documentation only and must not add production behavior. Owner approval, the ADR rubric, documentation validators, authority-state checks, and negative artifact searches are its executable evidence. TASK-004 will own the first failing migration integration test and the minimal runner and migration implementation that makes it pass.

## Idempotence and Recovery

All discovery and validation commands are safe to repeat. Documentation edits must be additive or in-place and preserve historical records. Correct validator failures only at the reported path, anchor, ID, metadata, or authority mismatch, then rerun the same check.

Always re-list ADR files before creating the proposed record. If TASK-016 or another task claims the expected number, allocate the next unused sequential number, repair only the new links, and record the collision in Surprises & Discoveries and Decision Log. Never rename, overwrite, or delete an existing ADR to recover a preferred number.

If work pauses before owner approval, leave the ADR `Proposed`, TASK-002 `In progress`, DG-002 `Pending`, and TASK-004 `Pending`. Record the exact research, review, validation, and approval state in Progress. If the owner rejects the proposal, preserve it according to the ADR lifecycle and record the next action without implementing a fallback silently.

If authority synchronization is partially applied after approval, use `git diff`, the acceptance list, and the execution chronology to repair forward. Do not use `git reset --hard`, rewrite the historical TASK-001 plan or dated reviews, delete an accepted record, or reuse its number. Reversing an accepted lifecycle requires a later superseding ADR.

If a candidate cannot make schema and metadata changes atomic, the research and ADR must surface the gap and recovery path. Do not conceal it with a broad retry instruction: repeated DDL after a partial failure can itself be destructive. If concurrency validation exposes a lock leak, ambiguous timeout, or cross-schema collision, keep the gate pending until the contract is corrected.

## Artifacts and Notes

At plan-authoring time, the relevant tracked-tree baseline is:

    Highest allocated ADR: docs/adrs/0011-define-the-typescript-test-harness.md
    TASK-002 status: Pending
    DG-002 status: Pending
    TASK-004 status: Pending
    Application manifests: none
    Sequelize or migration configuration: none
    Migration source or emitted artifacts: none
    Executable product tests: none
    ERD: none
    Application scaffold: none

Reconfirm these primary sources immediately before ADR drafting because tool support and release posture can change:

- [Sequelize v7 CLI documentation](https://sequelize.org/docs/v7/cli/) for the current warning, migration/undo surface, and programmatic Umzug direction.
- [Sequelize v6 migration documentation](https://sequelize.org/docs/v6/other-topics/migrations/) for the stable CLI lifecycle, `SequelizeMeta`, `up`/`down`, and explicit transaction examples.
- [Sequelize transaction documentation](https://sequelize.org/docs/v6/other-topics/transactions/) for managed and unmanaged transaction behavior and the fact that transactions are not automatic.
- [Umzug repository documentation](https://github.com/sequelize/umzug) and current source for TypeScript loading, migration resolution and identity, sequential execution, Sequelize storage, errors, CLI behavior, and `FileLocker` limits.
- [PostgreSQL transaction documentation](https://www.postgresql.org/docs/current/tutorial-transactions.html), [CREATE INDEX documentation](https://www.postgresql.org/docs/current/sql-createindex.html), [explicit-locking documentation](https://www.postgresql.org/docs/current/explicit-locking.html), and [advisory-lock functions](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS) for atomicity limitations and session-versus-transaction lock semantics.
- [Node.js TypeScript documentation](https://nodejs.org/api/typescript.html) and the [TypeScript module reference](https://www.typescriptlang.org/docs/handbook/modules/reference) for native source-execution limits, ESM format rules, and emitted import behavior.

Summarize decision-critical facts inside the ADR so it remains understandable if an external page moves. Cite only primary project documentation for technology behavior. Mark inferences as inferences and reserve runtime claims for TASK-004 evidence.

### Durable Research Record

This subsection is intentionally empty at plan creation and must be filled during TASK-002 execution. It is the durable restart boundary between ephemeral research sessions and the proposed ADR. Do not mark a researcher or analysis step complete in Progress until the corresponding entry is present here.

For each candidate, append a summary with this structure:

    Candidate: <strategy name>
    Research completed: <YYYY-MM-DD HH:MMZ>
    Upstream release/documentation posture: <versions or dated documentation lines>
    Primary sources: <direct URLs>
    Criterion results: <concise findings for every common criterion>
    Repository fit: <confirmed constraints and reasoned inferences, labelled separately>
    Unknowns and runtime proofs: <what remains for the ADR or TASK-004>
    Substitution or exclusion rationale: <if applicable>
    Preliminary disposition and confidence: <advance/reject plus confidence>

After every candidate summary is present, replace the placeholders in this matrix and add rows if the decision analyst identifies another material criterion:

| Criterion | Source-executed programmatic Umzug | Build-first programmatic Umzug | Compiled-artifact Sequelize CLI or recorded replacement | Evidence class or unresolved gap |
|---|---|---|---|---|
| Accepted architecture and release-line fit | Pending research | Pending research | Pending research | Pending research |
| TypeScript source, ESM, and emitted-artifact honesty | Pending research | Pending research | Pending research | Pending research |
| Stable identity, discovery, order, and drift detection | Pending research | Pending research | Pending research | Pending research |
| Metadata and transaction consistency | Pending research | Pending research | Pending research | Pending research |
| Forward, rollback, failure, and recovery semantics | Pending research | Pending research | Pending research | Pending research |
| Same-namespace serialization and disjoint-run concurrency | Pending research | Pending research | Pending research | Pending research |
| Local, test, and delivery invocation parity | Pending research | Pending research | Pending research | Pending research |
| Dependency surface, proportionality, and maintainability | Pending research | Pending research | Pending research | Pending research |
| Validation feasibility and residual risk | Pending research | Pending research | Pending research | Pending research |

Immediately below the completed matrix, record the decision analyst's ranking method, ordered result, recommendation, confidence, dissenting evidence, returned research gaps, and proposed ADR outline. If work stops before all entries are complete, state which exact report or criterion is missing and the smallest next action in Progress.

## Interfaces and Dependencies

The accepted ADR must define future interfaces; TASK-002 must not create them. At minimum, the decision must specify:

- one migrator factory or CLI construction boundary and the configured Sequelize instance, QueryInterface, connection, database/schema, logger, and migration-root inputs it owns;
- one typed migration module contract with required `up` and `down` operations and explicit transaction/context parameters;
- one stable migration-name format independent of authored or emitted extension, one deterministic ordering rule, and validation for duplicate or altered entries;
- one database metadata-store contract and its atomicity or recovery relationship with schema DDL;
- one whole-command lock contract and its key derivation, connection lifetime, timeout, failure result, logging, and release guarantees;
- planned operation boundaries for apply pending migrations, inspect status, perform bounded rollback, prepare an isolated integration namespace, and validate emitted execution;
- the root-to-workspace command ownership, intended caller, prerequisites, artifact root, exit behavior, and cleanup owner for each operation;
- the ADR-0011 handoff through which migrated-state tests pass a unique PostgreSQL database or schema and call the same logical migration sequence used locally;
- the separation from API process startup, public Rick and Morty API access, record import, Redis, GraphQL, frontend behavior, model synchronization, and ERD generation; and
- the evidence TASK-004 must produce before any planned interface can be called implemented.

The optional multi-agent workflow depends only on the stable role contracts in `.codex/README.md`; those roles are development workflow, not product dependencies. Actual package names, versions, manifests, scripts, runner source, migrations, database fixtures, and integration tests belong to TASK-004 or another explicit downstream owner after DG-002 is resolved.

## Revision Note

2026-08-10: Created the initial TASK-002 ExecPlan after confirming that TASK-002 is the executable work item and DG-002 is its controlled outcome. The plan introduces no runner or migration, preserves the owner-approval checkpoint, incorporates accepted ADR-0011's migrated-state handoff, and makes source/build identity, metadata atomicity, rollback, failure recovery, and PostgreSQL concurrency explicit decision criteria.

2026-08-10: Corrected independent review by adding an in-plan Durable Research Record for every candidate summary and the normalized decision matrix. This makes the research barrier restartable without agent transcripts or conversation history while leaving TASK-002 and DG-002 pending and adding no implementation artifact.

2026-08-10: Revalidated the corrected plan and received independent-review `PASS` with no remaining material findings. Documentation and ADR validation pass, the tracked diff has no whitespace-error location, and negative searches find no controlled implementation artifact.
