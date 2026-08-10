# Execution Plans

Start from the repository [documentation map](../../README.md). The root [ExecPlan convention](../../PLANS.md) defines how these living task-scoped plans are written and maintained.

## Authority Boundary

An ExecPlan decomposes one `TASK-*` node into concrete research, milestones, commands, evidence, decisions, and recovery steps. It does not replace the canonical task graph in the [implementation plan](../IMPLEMENTATION_PLAN.md), approve architecture, resolve a decision gate, change requirement scope, or prove that planned behavior exists.

Current task and gate status remains authoritative in `docs/IMPLEMENTATION_PLAN.md`. Accepted architectural direction remains authoritative in the [ADR index](../adrs/README.md) and individual ADRs. Chronological execution evidence remains in the [decision and progress log](../execution/decision-and-progress-log.md).

## Storage and Lifecycle

Active task-scoped plans live directly in `docs/plans/`. After the authoritative task is `Complete` and its task-closure documentation gate passes, preserve the plan under `docs/plans/completed/` with the same stable filename and history. This index is the navigation owner for both locations.

## Plan Index

| Task | Controlled gate | ExecPlan | Plan state | Authoritative task state |
|---|---|---|---|---|
| TASK-001 | DG-001 | [Resolve the TypeScript test-harness decision](./completed/TASK-001-test-harness-decision.md) | Complete | Complete |

`Complete` means ADR-0011 is accepted, DG-001 is resolved, and TASK-001's relevance and documentation gates passed. It does not mean the harness is implemented or TASK-003 has started.

## Maintenance

- Keep one active plan per task unless a later plan explicitly supersedes an earlier retained plan.
- Update this index when a plan is created, completed, superseded, or retired.
- Move completed plans to `docs/plans/completed/` only after task closure, and preserve completed and superseded plans as historical execution evidence.
- Preserve stable plan filenames and repair inbound links when a plan changes lifecycle location.
- Update the authoritative task and gate first when their status changes, then synchronize the plan and this index.
- Validate links and stable IDs through the repository documentation validator before handoff.
