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
| TASK-006 | None; DG-006 is Resolved and AUTH-001 is Authorized | [Expose GraphQL reads, filters, and request logging](./TASK-006-graphql-reads-filters-and-request-logging.md) | Registered; execution authorization pending; detail/comment reconciliation pending | Pending |
| TASK-016 | DG-004 | [Resolve the character-image delivery decision](./completed/TASK-016-character-image-delivery-decision.md) | Complete | Complete |
| TASK-017 | DG-006 | [Replace character-image materialization with a proportional URL boundary](./completed/TASK-017-character-image-url-successor-decision.md) | Complete | Complete |
| TASK-018 | DG-005 | [Resolve the PostgreSQL migration-lock namespace identity](./completed/TASK-018-postgresql-migration-lock-identity-decision.md) | Complete | Complete |

`Complete` for TASK-001, TASK-002, TASK-003, TASK-004, TASK-016, TASK-017, and TASK-018 means their task-specific outcome and documentation gates passed. TASK-016 and ADR-0013 remain historical evidence; TASK-017 produced accepted ADR-0014 and resolved DG-006. TASK-018 produced accepted [ADR-0015](../adrs/0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md) after fresh independent `PASS` on exact proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1` and explicit owner approval on 2026-08-14; ADR-0012 is reciprocally Superseded and DG-005 is Resolved. [AUTH-001](../IMPLEMENTATION_PLAN.md#auth-001---character-image-content-rights-authorization) is `Authorized` within its recorded non-commercial portfolio/direct-URL scope. TASK-003 remains foundation-only evidence. The project owner separately authorized TASK-004 execution on 2026-08-14. Its completed plan preserves exactly TASK-002 and TASK-003 as dependencies, the corrected inherited compiler-input and LF/CRLF determinism cycles, committed clean checkout `646e8cd5e4c3b5bc6f2b6e4446f8cddd6be21d46`, hosted run `31947144452`, fresh independent `PASS`, and documentation closure. TASK-005 and TASK-006 remain `Pending`; the active TASK-006 plan is registered but supplies no implementation or start evidence. Overall product acceptance remains 0/12.

## Maintenance

- Keep one active plan per task unless a later plan explicitly supersedes an earlier retained plan.
- Update this index when a plan is created, completed, superseded, or retired.
- Move completed plans to `docs/plans/completed/` only after task closure, and preserve completed and superseded plans as historical execution evidence.
- Preserve stable plan filenames and repair inbound links when a plan changes lifecycle location.
- Update the authoritative task and gate first when their status changes, then synchronize the plan and this index.
- Validate links and stable IDs through the repository documentation validator before handoff.
