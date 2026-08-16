# Repository Guidelines

## Language

All documentation and source code in this repository must be written in English. This requirement includes file and directory names, headings, prose, code identifiers, comments, docstrings, test descriptions, log messages, error messages, and other user-facing text. Preserve official proper names and external API field names when they cannot be translated without breaking compatibility or accuracy.

## Scope and Evidence

The technical assessment and `docs/REQUIREMENTS.md` preserve the source assessment's distinction between mandatory and optional requirements. An accepted ADR or repository policy may adopt an optional requirement as a stricter repository delivery commitment without changing its source classification. Use the optional-scope disposition table in `docs/adrs/README.md` as the current record of those commitments.

Requirements, accepted ADRs, plans, examples, mocks, and stubs are evidence of intent only. Never describe a feature, command, service, or acceptance criterion as implemented or passing without corresponding repository or runtime evidence.

## Documentation Workflow

Start repository work from the [documentation map](README.md#documentation-map). Follow its authority domains and task-specific reading order before planning, editing, reviewing, or verifying work.

- Use stable requirement, deliverable, acceptance, ADR, decision-gate, authorization, `TASK-*`, `SPEC-*`, `HS-*`, and `DPL-DEC-*` IDs in plans, tests, reviews, execution records, and handoffs.
- Read only the relevant ADRs for scoped work; read the full portfolio for portfolio-wide architecture reviews.
- Before adding a dependency, configuration, migration, test, or application behavior, select the exact `TASK-*` work item, read its mapped requirements and `SPEC-*`/`HS-*` rules, compare the intended artifact with each active gate's `Must be resolved before` condition in `docs/IMPLEMENTATION_PLAN.md`, and resolve only the gate whose trigger covers that artifact.
- Follow the [documentation change-impact table](README.md#documentation-change-impact) after every scope, decision, planning, implementation, or evidence change.
- Link to the authoritative owner instead of duplicating normative prose. If two authoritative documents conflict, surface and reconcile the conflict before continuing dependent work.

## ExecPlans

For substantial `TASK-*` work or when the project owner explicitly requests one, use a living, task-scoped ExecPlan stored under `docs/plans/` and maintain it according to [PLANS.md](PLANS.md). Keep active plans directly in that directory and move a plan to `docs/plans/completed/` only after its owning task passes the task-closure documentation gate. An ExecPlan may decompose its owning task into research, milestones, commands, evidence, decisions, and recovery steps, but it cannot replace `docs/IMPLEMENTATION_PLAN.md`, change task dependencies or scope, approve an ADR, resolve a decision gate, or count as implementation evidence.

Keep the ExecPlan's `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` sections current at every stopping point. Update authoritative task, gate, ADR, requirement, specification, status, and execution-record owners before reflecting those changes in the ExecPlan or its index.

For consequential decision work, follow the risk-tiered collaboration policy in the [project-scoped Codex guide](.codex/README.md); keep its Decision Review Contract inside the owning ExecPlan, preserve the primary thread as sole decision-artifact writer and closure owner, and stop at owner-controlled approval boundaries.

For an owner-authorized implementation ExecPlan whose task is `In progress`, follow the [worker-first implementation workflow](.codex/execplan-implementation-workflow.md). That guide and the linked [write-lease guard](.codex/write-lease-guard.md) own milestone packets, sequential leases, handoffs, bounded corrections, evidence reuse, and risk-routed review mechanics. The primary coordinator retains integration, evidence acceptance, approvals, authoritative status, exception handling, and closure, and records the reason, paths, and validation for any exceptional direct implementation edit. [Agent-flow metrics](.codex/agent-flow-metrics.md) remain optional and may be used only when a documented present question justifies their overhead.

## Documentation Preservation

Do not silently delete, replace, move, rename, or consolidate repository documentation.

- Update active authoritative documents in place when the documented truth changes, unless their authority-specific lifecycle requires a successor.
- Preserve accepted ADRs, dated reviews, execution chronology, and other point-in-time records as historical evidence. Supersede or append according to their governing workflow instead of rewriting history.
- When a document is superseded or retired, retain it with an explicit status and a link to its successor or current authoritative owner.
- Delete documentation only when it is an accidental duplicate, a reproducible non-authoritative generated artifact, fully consolidated without losing history or traceability, or must be removed for security, privacy, or legal reasons.
- Before an authorized replacement, supersession, retirement, deletion, consolidation, move, or rename, repair inbound links and indexes, preserve stable IDs and relevant history, record the rationale and, when applicable, the successor or current authoritative owner in the task's documentation impact and, when durable chronology is materially affected, in the execution log, then run documentation validation.

## Task Closure

Every completed repository task must pass the [task-closure documentation gate](README.md#task-closure-documentation-gate). The primary agent responsible for the task owns the gate. It may delegate bounded implementation and evidence-document edits to write-capable workers and delegate independent review to a read-only reviewer, but only the primary may reconcile the evidence, change authoritative status, or declare the gate passed; delegation never transfers closure responsibility. For write-authorized work, update and link all materially affected documentation before handoff. For read-only work, report required documentation follow-ups without modifying files. Every final handoff must state the documentation impact explicitly, including a concrete reason when no documentation change was necessary.

## Implementation Simplicity and Clean Code

Implement the smallest complete change that satisfies the active `TASK-*`, its mapped requirements and specifications, the current failing test, and the accepted architecture. Preserve KISS by limiting the change surface to necessary behavior and artifacts, reusing established boundaries, and avoiding unrelated refactors, dependencies, configuration, indirection, or speculative generalization. Smallest means the simplest complete solution, not the fewest lines or files; never omit required tests, types, validation, failure handling, migrations, observability, or documentation. If correctness or an accepted constraint requires a broader change, state the concrete reason and verify the expanded scope.

Apply YAGNI to product code and repository workflow changes alike. Do not add behavior, abstractions, dependencies, configuration, automation, telemetry, extensibility, or process machinery unless it is required by the active `TASK-*`, its mapped requirements and specifications, accepted architecture or repository policy, the current failing test, or a documented present operational problem. A policy introduced by the same change cannot, by itself, establish that need; record the present problem and evidence that justify it. YAGNI must not be used to omit required tests, types, validation, security, failure handling, migrations, observability, or documentation.

Follow clean-code principles throughout the changed scope:

- Use intention-revealing names and focused, cohesive functions, modules, and components.
- Keep inputs, outputs, state changes, side effects, and failure paths explicit; prefer clear control flow over clever or compressed code.
- Preserve accepted dependency direction and separate domain, application, adapter, transport, and presentation responsibilities where the governing ADRs require those boundaries.
- Remove dead code and avoid meaningful duplication when a simple local abstraction makes the current intent clearer; do not introduce abstractions for hypothetical reuse.
- Write comments only when they explain rationale, a non-obvious constraint, or an external compatibility requirement; do not restate readable code.
- Improve cleanliness only within the task's necessary change surface. Record unrelated cleanup separately instead of expanding the active task.

## JavaScript and TypeScript

Follow the accepted [ADR-0002](docs/adrs/0002-use-typescript-across-the-stack.md): all application and test source code must use TypeScript with strict compiler checks.

Use modern, stable ECMAScript features supported by the repository's documented Node.js and browser targets:

- Prefer `async`/`await` for readable asynchronous control flow.
- Use `Promise.all`, `Promise.allSettled`, or another explicit concurrency primitive when independent operations should run concurrently; do not serialize them through unnecessary consecutive `await` expressions.
- Prefer ECMAScript modules, `const` by default, `let` only for reassignment, and clear modern constructs such as destructuring, optional chaining, and nullish coalescing when they improve readability.
- Avoid `var`, nested callback-based asynchronous control flow, and unnecessary `.then()` chains.
- Do not introduce experimental language or compiler features without an accepted ADR that justifies them.

## Test-Driven Development

All production behavior changes must follow the milestone-slice TDD workflow documented in [ADR-0016](docs/adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md).

Before authoring a test, inspect the relevant implementation and test boundary and classify the requested contract as `EXISTING_AND_COVERED`, `EXISTING_BUT_UNCOVERED`, `MISSING`, `REGRESSION`, `PARTIAL`, `CONFLICTING`, or `UNKNOWN`. Do not manufacture a Red for behavior that already exists. Reuse existing passing coverage for `EXISTING_AND_COVERED`, add passing characterization evidence for `EXISTING_BUT_UNCOVERED`, test only the missing gap for `PARTIAL`, and stop for coordinator triage on `CONFLICTING` or `UNKNOWN`.

Use one coherent milestone-slice Red-Green-Refactor cycle at a time:

- Red: the test owner adds the minimum coherent set of related tests that proves one observable milestone contract is missing or regressed, then runs the focused scope and confirms the intended failure. A slice may contain multiple assertions or scenarios when they jointly prove the same outcome or boundary; do not split it into microcycles merely because individual assertions can fail separately.
- Green: the implementation owner works in a separate context against the accepted, frozen test contract, changes only what the slice requires, and runs the focused scope until it passes.
- Refactor: improve structure only within the slice while its focused tests remain green, then validate the affected milestone boundary.

Start every bug fix with a failing regression test. Choose the smallest coherent test boundary that can prove the outcome; use an integration test first when the behavior belongs to GraphQL wiring, PostgreSQL, Redis, migrations, or another real boundary. Do not commit exploratory production code, skipped tests, focused tests, or test-only branches that change production behavior. Generated artifacts and declarative configuration do not require artificial unit tests, but their observable build, migration, or runtime outcomes require automated validation.

Run focused checks at Red and Green, the affected suite and build or type boundary at each milestone, and complete authoritative gates once at task closure unless risk, drift, or a failed prerequisite requires an earlier full run. Reuse passing command evidence only when command, working directory, relevant-tree fingerprint, environment fingerprint, and mutable external-state identity are unchanged. In progress updates and final handoffs, report the preflight classification, exact Red and Green evidence when applicable, milestone validation, reused evidence, and closure validation.
