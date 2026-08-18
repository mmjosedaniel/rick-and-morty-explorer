# Execution Records

Start from the repository [documentation map](../../README.md#documentation-map). This directory indexes chronological execution records; it does not own product scope, architecture, implementation sequencing, current repository status, or acceptance results.

## Authority Boundary

- The root [README](../../README.md#repository-status) owns the current repository and delivery-status summary.
- The [requirements specification](../REQUIREMENTS.md) owns requirement, deliverable, and acceptance IDs.
- The [ADR index](../adrs/README.md) and individual ADRs own accepted architecture and optional-scope disposition.
- The [target system module diagram](../SYSTEM_DIAGRAM.md) provides a derived overview of those decisions and the unresolved boundaries in the plan.
- The [implementation plan](../IMPLEMENTATION_PLAN.md) owns decision gates, dependency order, and `TASK-*` work items.
- The [Gherkin specification index](../specs/README.md) routes derived `SPEC-*` and `HS-*` examples.
- Dated [review records](../reviews/README.md) report point-in-time evidence and gaps.

Execution records may summarize and link those owners. They must not duplicate their normative content or turn documentation into implementation evidence.

## Records

- [Decision and progress log](./decision-and-progress-log.md) — stable chronological record of reversible execution decisions and evidence-linked progress.

This directory does not contain separate per-task or per-milestone record files. Task-specific execution history is preserved in the [completed ExecPlans](../plans/README.md), point-in-time acceptance results are indexed under [review records](../reviews/README.md), and the decision/progress log remains the chronological execution owner.

## Recording Rules

- Keep this index and the global decision/progress log at stable paths.
- Use `DPL-DEC-NNN` for reversible execution decisions and `TASK-NNN` from the implementation plan for work status.
- Record only coordination, sequencing, and local implementation choices that do not change scope, architecture, optional disposition, or decision-gate status.
- Change the authoritative owner first when a requirement, ADR, gate, task, or current-status fact changes, then add a chronological log entry that links to it.
- Never report a task, scenario, criterion, or deliverable as passing without reproducible repository or runtime evidence.
