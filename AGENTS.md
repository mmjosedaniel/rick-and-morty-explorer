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

When an ExecPlan compares consequential options or prepares an ADR, follow the risk-tiered, contract-first collaboration policy in [.codex/README.md](.codex/README.md). Keep the Decision Review Contract inside the owning ExecPlan, preserve the primary thread as the sole writer and closure owner, complete every applicable contract and evidence checkpoint, and stop at owner-controlled approval boundaries.

When an authorized ExecPlan implements repository changes, follow the [worker-first ExecPlan implementation workflow](.codex/execplan-implementation-workflow.md). The primary coordinator normally delegates bounded edits to `test_worker` and `code_worker` through explicit, sequential write leases, while retaining integration, evidence acceptance, approval handling, task status, and closure ownership. Record the reason, paths, and validation for any exceptional implementation edit made directly by the primary thread. This implementation topology does not change the sole-writer rule for decision artifacts.

For each worker-first implementation run, the coordinator owns the correlation IDs and best-effort semantic events defined by the [agent-flow metrics policy](.codex/agent-flow-metrics.md). Workers report the lease and cycle identifiers in their handoffs but never edit metrics runtime data. Metrics are observational: a missing event, unavailable hook, or recorder failure cannot accept or reject Red, authorize Green, satisfy implementation evidence, or block task closure. Record token usage only when the runtime supplies exact values; never estimate it or parse unstable transcript files to derive it.

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

All production behavior changes must follow the TDD workflow documented in [ADR-0010](docs/adrs/0010-use-a-targeted-automated-testing-strategy.md).

Apply the three laws of TDD:

1. Do not write production code unless it is required to make a failing test pass.
2. Do not write more test code than is sufficient to produce the next failure; a compilation or type-check failure counts as a failure.
3. Do not write more production code than is sufficient to make the currently failing test pass.

Use one observable Red-Green-Refactor cycle at a time:

- Red: add the smallest relevant test and run it to confirm that it fails for the intended reason.
- Green: implement only the behavior required by that test and run the relevant test scope until it passes.
- Refactor: improve structure only while the relevant tests remain green, then run them again.

Start every bug fix with a failing regression test. Choose the smallest test boundary that can prove the behavior; use an integration test first when the behavior belongs to GraphQL wiring, PostgreSQL, Redis, migrations, or another real boundary. Do not commit exploratory production code, skipped tests, focused tests, or test-only branches that change production behavior. Generated artifacts and declarative configuration do not require artificial unit tests, but their observable build, migration, or runtime outcomes require automated validation.

In progress updates and final handoffs, report the command and intended failure observed during Red, the passing command observed during Green, and the validation performed after Refactor.
