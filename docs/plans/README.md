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
| TASK-002 | DG-002 | [Resolve the Sequelize migration-lifecycle decision](./completed/TASK-002-sequelize-migration-lifecycle-decision.md) | Complete | Complete |
| TASK-003 | None; DG-001 is resolved | [Establish the operational walking skeleton](./TASK-003-operational-walking-skeleton.md) | Ready to execute | Pending |
| TASK-016 | DG-004 | [Resolve the character-image delivery decision](./completed/TASK-016-character-image-delivery-decision.md) | Complete | Complete |
| TASK-017 | DG-006 | [Replace character-image materialization with a proportional URL boundary](./completed/TASK-017-character-image-url-successor-decision.md) | Complete | Complete |

`Complete` for TASK-001, TASK-002, TASK-016, and TASK-017 means their owner-approved ADRs are accepted or preserved through the governed successor lifecycle, their controlled gates are resolved, and each task's relevance and documentation gates passed. TASK-016 and ADR-0013 remain historical evidence; TASK-017 allocated ADR-0014 only after research, analysis, fresh IR-A, collision checking, and complete fresh final IR-B `PASS`, and the project owner then approved that exact artifact. ADR-0014 is Accepted, ADR-0001 and ADR-0013 are Superseded, and DG-006 is Resolved. [AUTH-001](../IMPLEMENTATION_PLAN.md#auth-001---character-image-content-rights-authorization) is `Authorized`; the implementation plan owns its continuity policy, while ADR-0014 independently owns the current direct-URL technical boundary. The active TASK-003 plan remains `Pending` and unstarted. Its prior worker-flow, lease, packet, hash, and review evidence remains historical; the DPL-DEC-018 simplified revision passed complete fresh correction-cycle review and is ready for a separate execution instruction. DG-005 still blocks TASK-004 for a future ADR-0012 migration-lock successor. No image-delivery, migration, harness, or walking-skeleton behavior is implemented, and no downstream implementation task has started.

## Maintenance

- Keep one active plan per task unless a later plan explicitly supersedes an earlier retained plan.
- Update this index when a plan is created, completed, superseded, or retired.
- Move completed plans to `docs/plans/completed/` only after task closure, and preserve completed and superseded plans as historical execution evidence.
- Preserve stable plan filenames and repair inbound links when a plan changes lifecycle location.
- Update the authoritative task and gate first when their status changes, then synchronize the plan and this index.
- Validate links and stable IDs through the repository documentation validator before handoff.
