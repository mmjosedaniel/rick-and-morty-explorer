# Decision and Progress Log

- Status: Active
- Documentation entry point: [repository documentation map](../../README.md#documentation-map)
- Implementation sequence: [implementation plan](../IMPLEMENTATION_PLAN.md)

## Purpose

This stable-path log records reversible execution decisions and evidence-linked progress while the implementation plan is carried out. It does not replace requirements, accepted architecture decision records, decision gates, implementation tasks, the root current-status summary, or repository and runtime evidence.

Architectural decisions must use the ADR workflow. A DPL entry cannot change product scope, optional disposition, accepted architecture, or gate status. Completed work must link to reproducible evidence before it is reported as implemented or passing.

## Decision Log

| ID | Date | Status | Related IDs | Decision | Rationale or supersession |
|---|---|---|---|---|---|
| DPL-DEC-001 | 2026-08-09 | Superseded | - | Maintain a separate current progress snapshot in the execution-record index. | Superseded by DPL-DEC-003 because the root README already owns the current repository and delivery-status summary. |
| DPL-DEC-002 | 2026-08-09 | Recorded | SPEC-001 through SPEC-017; HS-001 through HS-019 | Use `SPEC.feature` for observable success paths and `HARD_SPEC.feature` for constraints, negative paths, failure behavior, scope guards, and human-controlled gates. | The separation makes derived examples searchable by stable rule ID while the requirements, ADRs, and implementation plan remain authoritative. |
| DPL-DEC-003 | 2026-08-09 | Recorded | DPL-DEC-001 | Keep the root README as the only current-status summary and use `docs/execution/` only for stable navigation and chronology. | One current-state owner prevents manually duplicated phase, gate, acceptance, and deliverable counts from drifting. |
| DPL-DEC-004 | 2026-08-09 | Recorded | DG-001; SPEC-001 through SPEC-017; HS-001 through HS-019 | Treat unbound Gherkin examples as documentation while DG-001 is pending; DG-001 continues to block runner configuration, executable bindings, application tests, and production-behavior TDD cycles. | This clarifies the existing gate without selecting a harness or treating derived examples as tests. |

## Progress Log

| Date | Status | Related IDs | Summary | Evidence or next step |
|---|---|---|---|---|
| 2026-08-09 | Documented | ADR-0001 through ADR-0010; DG-001 through DG-003; AC-001 through AC-012; DEL-001 through DEL-003 | Initialized the execution-record structure and recorded the first evidence-linked planning baseline. | Current state remains authoritative in the [root README](../../README.md#repository-status); implementation and acceptance are not demonstrated. |
| 2026-08-09 | Specified | SPEC-001 through SPEC-017; HS-001 through HS-019 | Added derived Gherkin suites with 36 stable rule IDs and complete reference coverage for FR-FE-001 through FR-FE-005, FR-BE-001 through FR-BE-006, NFR-001 through NFR-006, OR-001 through OR-009, DEL-001 through DEL-003, and AC-001 through AC-012. | See the [Gherkin specification index](../specs/README.md); examples remain unexecuted until DG-001 and each example's other applicable gates are resolved and executable evidence exists. |
| 2026-08-09 | Reviewed | TASK-001 through TASK-015; AC-001 through AC-012 | Reviewed the latest documentation batch, corrected its gate and classification boundaries, and expanded the plan into dependency-ordered implementation work. | See the [dated latest-work review](../reviews/2026-08-09-latest-documentation-work-review.md) and begin with TASK-001 and TASK-002. |

## Conventions

- Assign stable execution-decision IDs in the form `DPL-DEC-001`; never reuse or silently rewrite an ID.
- Use ISO 8601 dates in the form `YYYY-MM-DD`.
- Use `Recorded`, `Superseded`, or `Rejected` for decision status and link a superseding entry.
- Reference only directly affected requirement, acceptance, deliverable, ADR, gate, specification, hard-specification, and task IDs.
- Keep this file at its stable path; append chronology instead of moving or renaming the global log.
- Link progress claims to repository or runtime evidence and preserve the distinction between intent and proof.
