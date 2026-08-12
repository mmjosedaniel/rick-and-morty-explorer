# Repository Execution Plans (ExecPlans)

This document defines the required format for a repository execution plan, or ExecPlan. An ExecPlan is a living, task-scoped design and execution document that a person or coding agent can follow from the current working tree without relying on prior conversation. The canonical task graph, decision gates, and scope remain in `docs/IMPLEMENTATION_PLAN.md`; an ExecPlan only decomposes one of those tasks into concrete work and evidence.

## When to use an ExecPlan

Use an ExecPlan when a `TASK-*` node is substantial enough to require staged research, an approval checkpoint, multiple independently verifiable milestones, recovery instructions, or a durable record of discoveries and decisions. Also use one when the project owner explicitly requests it. Store active plans directly under `docs/plans/`, move plans whose owning tasks have passed the task-closure documentation gate to `docs/plans/completed/`, and register both active and completed plans in `docs/plans/README.md`.

Move a plan to `docs/plans/completed/` only after its authoritative `TASK-*` state is `Complete`. Preserve the plan's stable filename, IDs, execution history, and revision notes. In the same documentation change, repair inbound links, update the plan index, and append any materially affected durable chronology.

An ExecPlan must not create product scope, change task dependencies, approve an ADR, resolve a decision gate, or claim implementation evidence. Those changes belong to their authoritative documents and workflows. If execution reveals a conflict or a consequential choice not covered by the owning task, update the authoritative owner or activate the applicable decision gate before continuing the dependent work.

## Required operating rules

Every ExecPlan must be self-contained. Explain the relevant repository state, requirements, accepted decisions, unresolved gates, and terms in enough detail that a newcomer can execute the plan. Name repository-relative paths and stable requirement, ADR, gate, task, `SPEC-*`, `HS-*`, and `DPL-DEC-*` IDs wherever they control the work.

Every ExecPlan is a living document. Update it whenever progress is made, evidence changes, a material discovery occurs, or a decision is taken. At every stopping point, the plan must say what is complete, what remains, and what should happen next. A reader must be able to restart from the plan alone.

Every ExecPlan must lead to an observable, falsifiable outcome. For application work, describe the behavior and how a reviewer exercises it. For internal, documentation, or decision work, describe the authoritative artifact, validator, approval, state transition, and negative checks that prove the intended boundary was preserved.

Follow `AGENTS.md`, the root documentation map, the exact `TASK-*` record, its mapped requirements and accepted ADRs, its active gates, and only the routed specifications needed by the task. An ExecPlan cannot weaken the repository's language, evidence, preservation, simplicity, TypeScript, TDD, or task-closure policies.

For write-authorized implementation, use the [worker-first ExecPlan implementation workflow](.codex/execplan-implementation-workflow.md). The primary coordinator normally delegates edits to `test_worker` and `code_worker` through explicit, sequential write leases while retaining integration, evidence acceptance, authoritative status, and closure ownership. Decision work continues to use the sole-writer topology in [.codex/README.md](.codex/README.md).

## Format

Write an ExecPlan as one Markdown document. When the plan is stored in a `.md` file, do not surround the document with an outer code fence. Use prose first. Tables and lists are appropriate when they make traceability or alternatives materially easier to compare, but avoid turning narrative milestones into administrative checklists.

Begin with a short action-oriented H1 and this statement:

    This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.

Use two blank lines after each heading. The following sections are mandatory and must remain present for the life of the plan.

## Required living sections

### Progress

Use timestamped checkboxes. This is the only section where checklists are mandatory. Record completed, remaining, and split partial work accurately; never mark approval, validation, implementation, or acceptance complete without evidence.

    - [x] (2026-08-10 00:00Z) Example completed step with its evidence location.
    - [ ] Example remaining step.
    - [ ] Example partial step (completed: exact portion; remaining: exact portion).

### Surprises & Discoveries

Record facts that changed or constrained the approach. Pair each observation with concise evidence such as a path, command, or short output. Do not record ordinary planned work here.

### Decision Log

Record every material execution-plan decision and why it was made. Use this shape:

    - Decision: The decision taken by the plan author or executor.
      Rationale: The evidence and trade-off that justify it.
      Date/Author: 2026-08-10 / name or role.

An ExecPlan decision is not an architectural approval. A choice governed by a decision gate must still follow the ADR workflow and receive the required project-owner approval.

### Outcomes & Retrospective

At each major milestone and at completion, compare the observed result with the original purpose. Record what was achieved, what remains, unexpected costs, and lessons that should affect later tasks. An empty initial entry may state that execution has not started.

## Required execution sections

### Purpose / Big Picture

Explain why the work matters, what becomes possible after it, and how a reviewer will observe success. Distinguish planning intent from current implementation evidence.

### Context and Orientation

Describe the current repository state relevant to the task. Name the authoritative files, explain how they relate, define non-obvious terms, identify prerequisites, and state every assumption the plan relies on.

### Scope and Non-Goals

State what the owning task includes and what remains outside it. Preserve mandatory and optional classifications and identify adopted optional commitments. Call out artifacts or behavior blocked by unresolved gates.

### Plan of Work

Describe the dependency-ordered sequence of edits and additions in prose. For each milestone, state what will exist afterward, what did not exist before, what evidence will be captured, and what condition permits the next milestone to start. Use approval checkpoints only where repository policy requires a human decision.

When the worker-first implementation workflow applies, identify each declarative setup slice and observable behavior cycle, the intended worker mode, path-ownership boundary, frozen test boundary after accepted Red, required handoff evidence, synchronization barrier, correction route, and re-entry condition. The two write-capable workers must not operate concurrently on the same cycle.

### Decision Review Contract (decision work only)

When the owning task compares consequential options, prepares an ADR, or resolves a decision gate, create a living Decision Review Contract inside the ExecPlan before option research starts. This is a workflow contract, not a new authority document or a substitute for the ADR. Link to authoritative wording instead of copying it wholesale.

The contract must identify the exact task, decision gate, proposed artifact, approval boundary, and forbidden scope; common comparison criteria and evidence classes; required artifact-local sections and outputs; hard gates and score, recommendation, and status invariants; decision semantics that must be fixed before drafting versus downstream evidence that may prove an already-defined contract; applicable adversarial properties; and correction, escalation, and stopping conditions.

Define a compact cumulative invariant packet. Each invariant needs a plan-local ID, trigger or fixture, expected result, evidence or actual result, and responsible reviewer. Every packet includes artifact coverage, evidence honesty, and authority-state consistency. Add triggered invariants for state transitions or concurrency, integrity or identity, deterministic or canonical bytes, cross-platform equivalence, recovery, or ownership when the proposed decision contains those properties.

After the research barrier, the decision analyst maps every contract item and returns exactly `DRAFT READY`, `RETURN FOR RESEARCH`, or `OWNER DIRECTION`. `DRAFT READY` permits drafting but does not approve an ADR or resolve a decision gate. Apply the risk triggers, contract checkpoint, fresh evidence checkpoint, material-change invalidation rule, bounded correction protocol, and post-verdict reconciliation barrier defined by [.codex/README.md](.codex/README.md).

### Concrete Steps

Give exact commands and the working directory. Commands must match current repository evidence or be explicitly labeled as commands that will become authoritative only after their implementation task creates them. Include short expected results so the executor can recognize success and failure.

### Validation and Acceptance

Define observable acceptance in terms of behavior, authoritative state, or reproducible validator output. For production behavior, include the exact Red failure, Green pass, and post-Refactor validation required by ADR-0010. For declarative or decision work with no production behavior, explain why a TDD cycle does not apply and define the structural, semantic, and negative checks that replace it.

For worker-first implementation, record who produced each Red, Green, and post-Refactor result, the coordinator's acceptance of each barrier, and the fresh independent review verdict for the integrated final state. Worker summaries support but do not replace the coordinator's inspection and task-authoritative validation.

For decision work, record both the contract-checkpoint result when risk triggers require it and the fresh evidence-checkpoint result for the exact final artifact. Re-run the complete applicable invariant packet after every material revision, and reconcile the final verdict with the score, recommendation, artifact status, task and gate states, and next action before an owner-approval request.

### Idempotence and Recovery

Explain which steps are safe to repeat, how to resume after a partial failure, and how to avoid overwriting another task's work. Prefer additive changes. Never use destructive recovery commands when a targeted edit or preserved historical record is sufficient.

If multiple agents share the working tree, define how leases are released, how unexpectedly changed paths are handled, and which actor may resume after a failed handoff. Re-establish the last accepted barrier before granting the next write lease; never recover by running the same-cycle test and code writers concurrently.

### Artifacts and Notes

Keep the most important short transcripts, path lists, decision matrices, or excerpts needed to prove or resume the work. Do not duplicate authoritative prose wholesale.

### Interfaces and Dependencies

Name every library, service, command boundary, configuration file, interface, or document contract that the completed task must establish. When a pending gate owns a choice, describe the required interface and evaluation criteria without presenting an unapproved option as accepted.

## Milestones, TDD, and task closure

Milestones must be independently verifiable and must build toward the owning task's falsifiable outcome. Describe them as a narrative of goal, work, result, and proof. Prototypes are permitted only when they stay within task scope, do not cross an unresolved gate, use disposable or clearly isolated artifacts, and define promotion or removal criteria.

Every production behavior follows one observable Red-Green-Refactor cycle at a time under ADR-0010. Under the worker-first workflow, `test_worker` stops after proving Red, the primary coordinator accepts and freezes that test boundary, and `code_worker` performs the minimum Green and behavior-preserving Refactor sequentially. Record the exact command and intended failure during Red, the passing command during Green, and the repeated validation after Refactor in both the ExecPlan and the execution log or handoff evidence required by the task.

Before an ExecPlan or major milestone completes, perform the ADR-0010 test-relevance audit. Inspect affected tests and suite-wide residual fixtures, mocks, helpers, snapshots, skipped tests, and focused tests. Record why each affected test remains, changes, consolidates, or is removed; then run the affected and complete suites. If the task changed no tests and no executable suite exists, record that evidence explicitly rather than inventing a test command.

Finally, apply the root README task-closure documentation gate. Update every materially affected authority owner, navigation link, execution record, and current-status statement; preserve historical documentation; run the required validators; and record one explicit documentation-impact result. The owning `TASK-*` node remains incomplete until these checks and its own definition of done pass.

## Revision note

Whenever the plan changes materially, add a dated note at the bottom of that ExecPlan explaining what changed and why. Reflect the same change in `Progress`, `Decision Log`, and any affected milestone, command, validation, or recovery section so the document never contradicts itself.
