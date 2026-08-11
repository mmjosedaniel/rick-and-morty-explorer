# Rick and Morty Full Stack Assessment

## Repository status

This repository is currently in its requirements and architecture phase. It contains the assessment contract; accepted architecture decisions including ADR-0011 for the planned TypeScript test harness, ADR-0012 for a build-first programmatic migration lifecycle, and [ADR-0014](./docs/adrs/0014-persist-and-deliver-character-image-urls-directly.md) for persisting each exact validated official avatar URL and loading it directly; a target system module diagram; a graph-oriented implementation plan whose first implementation node is an operational walking skeleton; a root ExecPlan convention; completed TASK-001, TASK-002, [TASK-016](./docs/plans/completed/TASK-016-character-image-delivery-decision.md), and [TASK-017](./docs/plans/completed/TASK-017-character-image-url-successor-decision.md) decision ExecPlans; an active [TASK-003 operational walking-skeleton ExecPlan](./docs/plans/TASK-003-operational-walking-skeleton.md); three project-scoped Codex agent definitions; derived Gherkin specifications; UI field-visibility and visual-foundation specifications; a proposed non-blocking Storybook pilot; execution records; and repository-specific workflow guidance. ADR-0014 is `Accepted`, ADR-0001 and ADR-0013 are preserved as `Superseded` by ADR-0014, and ADR-0004 remains `Superseded` by ADR-0013 in the historical chain. DG-001, DG-002, DG-004, and DG-006 are resolved, and TASK-001, TASK-002, TASK-016, and TASK-017 are `Complete`; DG-004/TASK-016 remain historical image-decision evidence, while ADR-0014/DG-006/TASK-017 own the current direct-URL direction. [AUTH-001](./docs/IMPLEMENTATION_PLAN.md#auth-001---character-image-content-rights-authorization) is `Authorized` under disposition A for this personal, educational, non-commercial portfolio's direct display of the official API images and ordinary browser/intermediary caching. The owner subsequently clarified that provider, project-scope, and provider-condition changes do not require AUTH-001 review or reopening; a change to ADR-0014's technical delivery boundary remains an architecture decision rather than an authorization renewal. Authorization does not prove implementation or start a task. TASK-003 remains `Pending` and has not started; its active plan is ready to execute but is not implementation evidence. DG-005 separately remains `Pending` for an ADR-0012 migration-lock successor before TASK-004, which also remains `Pending`. No migration runner, test harness, character-image delivery behavior, application scaffold, UI mockup, Storybook configuration or story, runnable web or API service, migration, automated product test, image asset, ERD, or authoritative install, run, migration, import, and API-usage command exists.

An accepted ADR records approved implementation direction only. Requirements, ADRs, plans, examples, mocks, and stubs must not be treated as implementation or acceptance evidence.

## Documentation map

This README is the single documentation entry point and current-state summary for both maintainers and Codex. It routes readers to the authoritative owner of each kind of information; it does not replace those documents.

| Artifact | Authoritative for | Not authoritative for |
|---|---|---|
| [Repository guidelines](./AGENTS.md) | Codex operating policy, language, evidence rules, documentation lifecycle and preservation, KISS and clean-code rules, TypeScript conventions, and TDD workflow | Product scope, architectural choices, or implementation status |
| [Technical assessment](./docs/FULL_STACK_TECHNICAL_ASSESSMENT.md) | Original assessment scope and mandatory-versus-optional classification | Repository-specific decisions or implementation evidence |
| [Requirements specification](./docs/REQUIREMENTS.md) | Normalized functional, non-functional, optional, deliverable, and acceptance IDs | Architectural choices or implementation status |
| [ADR index](./docs/adrs/README.md) and individual ADRs | Portfolio status, optional-scope disposition, architecture coverage, and accepted decision detail | Implementation or acceptance status |
| [System module diagram](./docs/SYSTEM_DIAGRAM.md) | Derived high-level target modules and principal data flows | New architecture, resolution of pending gates, implementation status, or acceptance evidence |
| [Implementation plan](./docs/IMPLEMENTATION_PLAN.md) | Stable `TASK-*` work items, the canonical dependency graph, AI-assistant execution rules, validation intent, decision gates, and non-architectural `AUTH-*` authorization status | New product scope, unapproved architectural choices, or implementation status |
| [ExecPlan convention](./PLANS.md) and [plan index](./docs/plans/README.md) | Required living-document format, active task-scoped plans, and preserved completed plans | Canonical task dependencies, architectural approval, gate status, implementation status, or acceptance evidence |
| [Gherkin specifications](./docs/specs/README.md), [SPEC](./docs/specs/SPEC.feature), and [HARD_SPEC](./docs/specs/HARD_SPEC.feature) | Derived behavioral examples, non-negotiable constraints, failure modes, and human decision guards | Source scope, architectural approval, implementation status, or passing evidence |
| [UI design documentation](./docs/ui/README.md) and [visual foundations](./docs/ui/visual-foundations.md) | Detailed specification and navigation for the UI choices recorded in the execution log, including field visibility and visual foundations | Product scope, architectural approval, decision status or rationale, implementation status, or acceptance evidence |
| [Proposed Storybook pilot workflow](./docs/ui/storybook-workflow.md) | Implementation guidance for the reversible pilot currently recorded by DPL-DEC-013; DPL-DEC-007 is preserved as Superseded history | Product scope, architectural approval, task definitions, gate resolution, implementation status, or acceptance evidence |
| [Execution records](./docs/execution/README.md) and [decision and progress log](./docs/execution/decision-and-progress-log.md) | Stable navigation, reversible decision status and rationale, and chronological evidence links | Current repository status, product scope, architecture approval, gate resolution, detailed design specification, or acceptance status |
| [Review records](./docs/reviews/README.md) | Point-in-time evidence-based assessments, readiness matrices, gaps, and verification commands | Product scope, architectural approval, or permanent current status |
| This README | Documentation routing, current repository phase, and current delivery-status summary | Requirement or architecture definition |
| Source, manifests, migrations, tests, runtime observations, and Git history | Actual implementation and verification evidence | Requirement intent or approval of architectural changes |
| [Repository skills](./.agents/skills) | Repeatable ADR, planning, acceptance, and verification procedures | Product scope, architectural approval, or passing evidence |
| [Project-scoped Codex agents](./.codex/README.md) | Reusable research, decision-analysis, and independent-review roles, plus their risk-tiered contract-first topology, review checkpoints, permission boundaries, and invocation examples | Product scope, task ownership, architectural approval, implementation status, or acceptance evidence |

### Codex reading hierarchy

Use this dependency chain to gather context, not as a single global precedence rule:

```text
repository policy
  -> source assessment
  -> normalized requirement IDs
  -> accepted decisions and optional disposition
  -> active gates and exact TASK ID
  -> exact SPEC/HS rules needed by that task
  -> repository/runtime evidence
  -> execution log and dated review
```

Authority remains domain-specific. For example, the assessment owns source classification, the requirements specification owns stable scope wording, an accepted ADR owns implementation direction, the implementation plan owns sequencing, and only repository/runtime evidence can prove behavior.

### Conflict rules

- Derived documents cannot weaken or silently expand mandatory assessment scope.
- Optional requirements retain their source classification; only the ADR index records their repository adoption or deferral.
- An individual accepted ADR owns decision detail, while the ADR index owns portfolio status and optional disposition.
- The implementation plan cannot introduce scope or select an option controlled by a pending decision gate.
- SPEC/HS selectors and examples cannot reclassify source scope or replace the requirement, ADR, or gate that they reference.
- Execution logs and dated reviews cannot resolve gates, approve architecture, or become a second current-status owner.
- Only repository or runtime evidence can establish that behavior exists or a criterion passes.
- If documents conflict, identify the authority domain above and reconcile the inconsistency instead of choosing silently.

## Scope interpretation

The source assessment's mandatory requirements and deliverables, together with the derived `AC-001` through `AC-012`, form the minimum-assessment baseline. Optional requirements keep their source classification. When an accepted ADR adopts one of them, it becomes an additional repository delivery commitment and is reported separately from minimum-assessment readiness.

The current adopted and deferred optional scope is authoritative in the [optional-scope disposition table](./docs/adrs/README.md#optional-scope-decisions).

## Readiness status

The current evidence-based [documentation consistency review](./docs/reviews/2026-08-09-documentation-consistency-review.md) records:

| View | Current result |
|---|---|
| Minimum assessment | Fail: 0 of 12 acceptance criteria pass because the required application behavior and deliverables have no implementation/runtime evidence. |
| Repository baseline | Fail: the minimum assessment fails and the adopted optional commitments also have no implementation evidence. |

Pending decision gates explain the next planning work; they do not convert missing implementation into `Blocked` or `Pass`.

## Delivery status

| Required deliverable | Current evidence |
|---|---|
| [DEL-001](./docs/REQUIREMENTS.md#del-001---public-source-repository) - Public source repository | Partially demonstrated: anonymous read access to the configured [GitHub repository](https://github.com/mmjosedaniel/rick-and-morty-explorer) was verified on 2026-08-09 with `git ls-remote`, but no application source has been committed, so the deliverable does not pass. |
| [DEL-002](./docs/REQUIREMENTS.md#del-002---entity-relationship-diagram) - Entity-relationship diagram | Not yet available because no migrations have been implemented. |
| [DEL-003](./docs/REQUIREMENTS.md#del-003---run-and-api-usage-documentation) - Run and API usage documentation | Not yet available because no authoritative application commands or executable GraphQL schema exist. |

This status section must be updated and supplemented with links to reproducible prerequisites, configuration, installation, infrastructure, migration, character-import, development, test, build, and GraphQL usage instructions as the corresponding executable artifacts are added.

## Codex task routing

| Task | Required reading order | Repository workflow |
|---|---|---|
| Interpret or change scope | [AGENTS.md](./AGENTS.md) -> [this map](#documentation-map) -> [technical assessment](./docs/FULL_STACK_TECHNICAL_ASSESSMENT.md) -> [requirements specification](./docs/REQUIREMENTS.md) -> [optional-scope dispositions](./docs/adrs/README.md#optional-scope-decisions) -> relevant accepted ADRs -> [active decision gates](./docs/IMPLEMENTATION_PLAN.md#active-decision-gates) | Preserve source classification, stable IDs, adopted commitments, and unresolved constraints. |
| Review or change architecture | [AGENTS.md](./AGENTS.md) -> [this map](#documentation-map) -> [technical assessment](./docs/FULL_STACK_TECHNICAL_ASSESSMENT.md) -> [requirements](./docs/REQUIREMENTS.md) -> [ADR index](./docs/adrs/README.md) -> relevant ADRs -> [derived system module view](./docs/SYSTEM_DIAGRAM.md) -> [active decision gates](./docs/IMPLEMENTATION_PLAN.md#active-decision-gates) | [Govern ADRs](./.agents/skills/govern-adrs/SKILL.md) |
| Plan implementation or resolve gates | [AGENTS.md](./AGENTS.md) -> [this map](#documentation-map) -> [technical assessment](./docs/FULL_STACK_TECHNICAL_ASSESSMENT.md) -> [requirements](./docs/REQUIREMENTS.md) -> [architecture coverage](./docs/adrs/README.md#architecture-coverage) -> relevant accepted ADRs -> [derived system module view](./docs/SYSTEM_DIAGRAM.md) -> [implementation plan](./docs/IMPLEMENTATION_PLAN.md) -> the owning [plan index](./docs/plans/README.md) entry when one exists | [Plan implementation](./.agents/skills/plan-implementation/SKILL.md) and maintain the ExecPlan under [PLANS.md](./PLANS.md) |
| Implement behavior or fix a bug | [AGENTS.md](./AGENTS.md) -> [current status](#repository-status) -> exact requirement/AC IDs -> optional disposition -> relevant accepted ADRs -> exact [TASK](./docs/IMPLEMENTATION_PLAN.md#implementation-work-sequence) and gates -> only the mapped [SPEC/HS rules](./docs/specs/README.md#codex-rule-routing) -> applicable [UI design documents](./docs/ui/README.md) and recorded reversible decisions -> repository evidence | Follow the required Red-Green-Refactor workflow and update the task's evidence/documentation owners. |
| Review acceptance or readiness | [AGENTS.md](./AGENTS.md) -> [current status](#repository-status) -> [technical assessment](./docs/FULL_STACK_TECHNICAL_ASSESSMENT.md) -> [requirements and ACs](./docs/REQUIREMENTS.md) -> [optional dispositions](./docs/adrs/README.md#optional-scope-decisions) -> relevant ADRs -> [active gates/tasks](./docs/IMPLEMENTATION_PLAN.md) -> implementation/runtime evidence -> [prior reviews](./docs/reviews/README.md) | [Review acceptance](./.agents/skills/review-acceptance/SKILL.md) |
| Record execution progress | [AGENTS.md](./AGENTS.md) -> authoritative changed artifact -> exact [TASK](./docs/IMPLEMENTATION_PLAN.md#implementation-work-sequence) -> [execution-record boundary](./docs/execution/README.md#authority-boundary) | Update the authority owner first, then append an evidence-linked chronological record. |
| Verify a handoff, milestone, or release | [AGENTS.md](./AGENTS.md) -> [current status](#repository-status) -> exact task and affected requirements -> authoritative manifests and automation -> affected documentation -> [prior reviews](./docs/reviews/README.md) | [Verify repository](./.agents/skills/verify-repository/SKILL.md) |

For implementation work, use this invariant route:

```text
AGENTS.md
  -> documentation map
  -> exact requirement, deliverable, and acceptance IDs
  -> optional-scope disposition
  -> relevant accepted ADRs
  -> active decision gates and exact TASK ID
  -> exact mapped SPEC/HS rules
  -> applicable design documents and recorded reversible decisions
  -> repository evidence
  -> TDD and proportional verification
```

A workflow skill defines how Codex performs a task. It does not override the authority map or substitute for implementation evidence.

## Documentation change impact

| Change | Canonical edit | Review or update when affected |
|---|---|---|
| Documentation supersession, retirement, consolidation, move, rename, or deletion | Existing authoritative document and its successor or current owner | Apply the [documentation-preservation policy](./AGENTS.md#documentation-preservation); preserve point-in-time evidence and stable IDs, repair map/index entries and inbound links, record the rationale and successor when applicable, and run documentation validation |
| Source clarification approved by the project owner | Technical assessment | Requirements, ADR portfolio, implementation plan, and this map |
| Requirement, deliverable, or acceptance interpretation | Requirements specification | ADR metadata and index, optional disposition, and implementation plan |
| ADR creation, status change, or supersession | Individual ADR | ADR index, architecture coverage, system module diagram, optional disposition, and related decision gate; run the ADR validator |
| Authorization creation, status, scope, or reopen-condition change | Stable `AUTH-*` record in the implementation plan | Root current status, the owning accepted ADR's authorization note, affected task authorization joins and SPEC/HS guards, and the execution log; run documentation validation |
| Decision-gate or task change | Implementation plan and, for a resolved gate, the new ADR | ADR index, system module diagram when a module boundary changes, mapped SPEC/HS rules, execution log, and dependent work items |
| ExecPlan creation, progress, completion, supersession, or retirement | Active task-scoped ExecPlan and ExecPlan index | Canonical task, gate, ADR, requirement, specification, current-status, and execution-record owners only when their authoritative state materially changes |
| Derived behavioral example or hard constraint | Requirements/ADR/plan owner first when semantics change; otherwise the exact SPEC/HS rule | Specification index routing, mapped tasks, and execution log; never promote derived wording to authority |
| UI field mapping, design annotation, or mockup | UI design documentation | Governing requirement, ADR, or plan owner first when semantics change; mapped SPEC/HS rules and execution log when affected |
| Implementation behavior | Tests, source, and configuration | Task mappings, relevant SPEC/HS rules, setup/API/ERD documentation, execution log, and current delivery status |
| Reversible execution decision or progress evidence | Execution log | Governing task and authority owner; current status only when repository evidence materially changes it |
| Verification or readiness result | Repository and runtime evidence | Dated review record and current delivery status when the result changes current readiness |

Reviewing a document does not require changing it. Update only when the new information materially affects the document's authority domain, and link to the owner instead of duplicating normative prose.

### Task-closure documentation gate

Every completed repository task must include a documentation-impact review before handoff:

1. Compare the completed scope, changed paths, selected decisions, and new evidence with the change-impact table above.
2. For a write-authorized task, update every materially affected authoritative document and add or repair navigation links when the change creates a new dependency, owner, artifact, command, or evidence location.
3. For a read-only task, do not modify files; report the documentation changes that would be required if the findings are acted upon.
4. Preserve stable requirement, deliverable, acceptance, ADR, authorization, decision-gate, task, SPEC, HS, and DPL decision IDs. Do not convert plans or documentation into implementation evidence.
5. Run `python .agents/skills/verify-repository/scripts/validate_docs.py --repo .` to validate local paths, anchors, stable IDs, readiness tags, and static Gherkin structure. Run the ADR validator when ADRs, architecture coverage, optional disposition, or decision gates are affected.
6. End the handoff with one explicit result: `Documentation impact: Updated ...`, `Documentation impact: None - ...`, or `Documentation impact: Proposed ...; not written because the task was read-only`.

A task is not complete until this gate has been performed and the relevant documentation checks pass. `None` is valid only with a concrete reason; unrelated documents must not be edited merely to produce a change.

The agent responsible for the task owns this gate because it has the full implementation and evidence context. It may delegate an independent documentation review when a change spans multiple authority domains, changes requirement or ADR semantics, or prepares a milestone or release, but delegation does not transfer closure responsibility.
