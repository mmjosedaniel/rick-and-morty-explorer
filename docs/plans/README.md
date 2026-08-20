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
| TASK-003 | None; DG-001 is resolved | [Establish the operational walking skeleton](./completed/TASK-003-operational-walking-skeleton.md) | Complete | Complete |
| TASK-004 | None; DG-005 is Resolved | [Create relational persistence from migrations](./completed/TASK-004-relational-persistence-from-migrations.md) | Complete | Complete |
| TASK-005 | None; DG-006 is Resolved and AUTH-001 is Authorized | [Import the deterministic 15-character baseline](./completed/TASK-005-import-deterministic-15-character-baseline.md) | Complete | Complete |
| TASK-006 | None; DG-006 is Resolved and AUTH-001 is Authorized | [Expose GraphQL reads, filters, and request logging](./completed/TASK-006-graphql-reads-filters-and-request-logging.md) | Complete; Milestones 1-4 and integrated closure accepted | Complete |
| TASK-007 | None; DG-006 is Resolved and AUTH-001 is Authorized | [Implement bounded Redis cache-aside searches](./completed/TASK-007-bounded-redis-cache-aside.md) | Complete; product milestones, reproducibility corrections, merged hosted pass, integrated re-review, and documentation gate accepted | Complete |
| TASK-009 | DG-003 | [Select the frontend GraphQL client and query cache](./completed/TASK-009-frontend-graphql-client-decision.md) | ADR-0017 accepted; DG-003 resolved; documentation gate passed | Complete |
| TASK-010 | None; DG-003 and DG-006 are Resolved and AUTH-001 is Authorized | [Deliver the character list, sorting, and interface filters](./TASK-010-character-list-sorting-and-interface-filters.md) | Planning complete; separate execution authorization required | Pending |
| TASK-016 | DG-004 | [Resolve the character-image delivery decision](./completed/TASK-016-character-image-delivery-decision.md) | Complete | Complete |
| TASK-017 | DG-006 | [Replace character-image materialization with a proportional URL boundary](./completed/TASK-017-character-image-url-successor-decision.md) | Complete | Complete |
| TASK-018 | DG-005 | [Resolve the PostgreSQL migration-lock namespace identity](./completed/TASK-018-postgresql-migration-lock-identity-decision.md) | Complete | Complete |

TASK-009 is `Complete` under its [completed ExecPlan](./completed/TASK-009-frontend-graphql-client-decision.md). [Accepted ADR-0017](../adrs/0017-use-tanstack-query-with-a-project-owned-typed-graphql-executor.md) selects TanStack Query with a project-owned typed GraphQL executor and resolves DG-003 after exact project-owner approval; no frontend implementation artifact or TASK-010 execution authorization is implied.

TASK-007 is `Complete` under its [completed ExecPlan](./completed/TASK-007-bounded-redis-cache-aside.md). Three product milestones and AC-010 behavior pass. Historical reviews preserve the earlier product, unit-reproducibility, and failed hosted-candidate evidence. The current [hosted-CI acceptance re-review](../reviews/2026-08-20-task-007-hosted-ci-acceptance-re-review.md) returns `PASS` after merged `main` run `32396138822` passed unit 140/140, integration 74/74, application 13/13, Chromium 1/1, lifecycle 6/6, and unconditional teardown. The plan continues to route warning suppression to [DPL-DEC-046](../IMPLEMENTATION_PLAN.md#technical-debt-and-future-implementations).

`Complete` for TASK-001 through TASK-007, TASK-009, TASK-016, TASK-017, and TASK-018 means their task-specific outcome and documentation gates passed. TASK-007's plan preserves three accepted behavior milestones, the original exact candidate, the later unit reproducibility correction, the hosted-CI contradiction, and the final merged correction/pass. The owner's option A assigns bounded comment reads to TASK-006 and mutations to TASK-008. AC-007, AC-008, AC-009, AC-010, and AC-011 product behavior passes; overall minimum-assessment readiness remains `Fail` at 5/12.

## Maintenance

- Keep one active plan per task unless a later plan explicitly supersedes an earlier retained plan.
- Update this index when a plan is created, completed, superseded, or retired.
- Move completed plans to `docs/plans/completed/` only after task closure, and preserve completed and superseded plans as historical execution evidence.
- Preserve stable plan filenames and repair inbound links when a plan changes lifecycle location.
- Update the authoritative task and gate first when their status changes, then synchronize the plan and this index.
- Validate links and stable IDs through the repository documentation validator before handoff.
