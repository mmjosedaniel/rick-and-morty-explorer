# Rick and Morty Full Stack Assessment

## Repository status

This repository is currently in its requirements and architecture phase. It contains the assessment contract, accepted architecture decisions, and repository-specific workflow guidance. It does not yet contain an application scaffold, runnable web or API services, migrations, automated product tests, an ERD, or authoritative install, run, import, and API-usage commands.

An accepted ADR records approved implementation direction only. Requirements, ADRs, plans, examples, mocks, and stubs must not be treated as implementation or acceptance evidence.

## Documentation map

This README is the single documentation entry point and current-state summary for both maintainers and Codex. It routes readers to the authoritative owner of each kind of information; it does not replace those documents.

| Artifact | Authoritative for | Not authoritative for |
|---|---|---|
| [Repository guidelines](./AGENTS.md) | Codex operating policy, language, evidence rules, TypeScript conventions, and TDD workflow | Product scope, architectural choices, or implementation status |
| [Technical assessment](./docs/FULL_STACK_TECHNICAL_ASSESSMENT.md) | Original assessment scope and mandatory-versus-optional classification | Repository-specific decisions or implementation evidence |
| [Requirements specification](./docs/REQUIREMENTS.md) | Normalized functional, non-functional, optional, deliverable, and acceptance IDs | Architectural choices or implementation status |
| [ADR index](./docs/adrs/README.md) and individual ADRs | Portfolio status, optional-scope disposition, architecture coverage, and accepted decision detail | Implementation or acceptance status |
| [Implementation plan](./docs/IMPLEMENTATION_PLAN.md) | Work ordering, dependencies, decision gates, and future implementation tasks | New product scope or unapproved architectural choices |
| This README | Documentation routing, current repository phase, and current delivery-status summary | Requirement or architecture definition |
| Source, manifests, migrations, tests, runtime observations, and Git history | Actual implementation and verification evidence | Requirement intent or approval of architectural changes |
| [Repository skills](./.agents/skills) | Repeatable ADR, planning, acceptance, and verification procedures | Product scope, architectural approval, or passing evidence |

### Conflict rules

- Derived documents cannot weaken or silently expand mandatory assessment scope.
- Optional requirements retain their source classification; only the ADR index records their repository adoption or deferral.
- An individual accepted ADR owns decision detail, while the ADR index owns portfolio status and optional disposition.
- The implementation plan cannot introduce scope or select an option controlled by a pending decision gate.
- Only repository or runtime evidence can establish that behavior exists or a criterion passes.
- If documents conflict, identify the authority domain above and reconcile the inconsistency instead of choosing silently.

## Scope interpretation

The source assessment's mandatory requirements and deliverables, together with the derived `AC-001` through `AC-012`, form the minimum-assessment baseline. Optional requirements keep their source classification. When an accepted ADR adopts one of them, it becomes an additional repository delivery commitment and is reported separately from minimum-assessment readiness.

The current adopted and deferred optional scope is authoritative in the [optional-scope disposition table](./docs/adrs/README.md#optional-scope-decisions).

## Delivery status

| Required deliverable | Current evidence |
|---|---|
| [DEL-001](./docs/REQUIREMENTS.md#del-001---public-source-repository) - Public source repository | Not yet demonstrated; the local repository has no committed application source or configured public remote. |
| [DEL-002](./docs/REQUIREMENTS.md#del-002---entity-relationship-diagram) - Entity-relationship diagram | Not yet available because no migrations have been implemented. |
| [DEL-003](./docs/REQUIREMENTS.md#del-003---run-and-api-usage-documentation) - Run and API usage documentation | Not yet available because no authoritative application commands or executable GraphQL schema exist. |

This status section must be updated and supplemented with links to reproducible prerequisites, configuration, installation, infrastructure, migration, character-import, development, test, build, and GraphQL usage instructions as the corresponding executable artifacts are added.

## Codex task routing

| Task | Required reading order | Repository workflow |
|---|---|---|
| Interpret or change scope | [AGENTS.md](./AGENTS.md) -> [this map](#documentation-map) -> [technical assessment](./docs/FULL_STACK_TECHNICAL_ASSESSMENT.md) -> [requirements specification](./docs/REQUIREMENTS.md) -> [optional-scope dispositions](./docs/adrs/README.md#optional-scope-decisions) -> relevant accepted ADRs -> [active decision gates](./docs/IMPLEMENTATION_PLAN.md#active-decision-gates) | Preserve source classification, stable IDs, adopted commitments, and unresolved constraints. |
| Review or change architecture | [AGENTS.md](./AGENTS.md) -> [requirements](./docs/REQUIREMENTS.md) -> [ADR index](./docs/adrs/README.md) -> relevant ADRs -> [active decision gates](./docs/IMPLEMENTATION_PLAN.md#active-decision-gates) | [Govern ADRs](./.agents/skills/govern-adrs/SKILL.md) |
| Plan implementation or resolve gates | [AGENTS.md](./AGENTS.md) -> [requirements](./docs/REQUIREMENTS.md) -> [architecture coverage](./docs/adrs/README.md#architecture-coverage) -> relevant accepted ADRs -> [implementation plan](./docs/IMPLEMENTATION_PLAN.md) | [Plan implementation](./.agents/skills/plan-implementation/SKILL.md) |
| Implement behavior or fix a bug | [AGENTS.md](./AGENTS.md) -> [current status](#repository-status) -> exact requirement and AC IDs -> relevant accepted ADRs -> [active decision gates](./docs/IMPLEMENTATION_PLAN.md#active-decision-gates) -> repository evidence | Follow the required Red-Green-Refactor workflow. |
| Review acceptance or readiness | [AGENTS.md](./AGENTS.md) -> [requirements and ACs](./docs/REQUIREMENTS.md) -> [optional-scope dispositions](./docs/adrs/README.md#optional-scope-decisions) -> [active decision gates](./docs/IMPLEMENTATION_PLAN.md#active-decision-gates) -> implementation and runtime evidence | [Review acceptance](./.agents/skills/review-acceptance/SKILL.md) |
| Verify a handoff, milestone, or release | [AGENTS.md](./AGENTS.md) -> [current status](#repository-status) -> authoritative manifests and automation -> affected documentation | [Verify repository](./.agents/skills/verify-repository/SKILL.md) |

For implementation work, use this invariant route:

```text
AGENTS.md
  -> documentation map
  -> exact requirement, deliverable, and acceptance IDs
  -> optional-scope disposition
  -> relevant accepted ADRs
  -> active decision gates
  -> repository evidence
  -> TDD and proportional verification
```

A workflow skill defines how Codex performs a task. It does not override the authority map or substitute for implementation evidence.

## Documentation change impact

| Change | Canonical edit | Review or update when affected |
|---|---|---|
| Source clarification approved by the project owner | Technical assessment | Requirements, ADR portfolio, implementation plan, and this map |
| Requirement, deliverable, or acceptance interpretation | Requirements specification | ADR metadata and index, optional disposition, and implementation plan |
| ADR creation, status change, or supersession | Individual ADR | ADR index, architecture coverage, optional disposition, and related decision gate; run the ADR validator |
| Decision-gate resolution | Implementation plan and the new ADR | ADR index, related ADR references, and any dependent work item |
| Implementation behavior | Tests, source, and configuration | Plan mappings, setup/API/ERD documentation, and current delivery status |
| Verification or readiness result | Repository and runtime evidence | Current delivery status or a separately requested review artifact |

Reviewing a document does not require changing it. Update only when the new information materially affects the document's authority domain, and link to the owner instead of duplicating normative prose.

### Task-closure documentation gate

Every completed repository task must include a documentation-impact review before handoff:

1. Compare the completed scope, changed paths, selected decisions, and new evidence with the change-impact table above.
2. For a write-authorized task, update every materially affected authoritative document and add or repair navigation links when the change creates a new dependency, owner, artifact, command, or evidence location.
3. For a read-only task, do not modify files; report the documentation changes that would be required if the findings are acted upon.
4. Preserve stable requirement, deliverable, acceptance, ADR, decision-gate, and task IDs. Do not convert plans or documentation into implementation evidence.
5. Validate every changed local path and Markdown anchor. Run the ADR validator when ADRs, architecture coverage, optional disposition, or decision gates are affected.
6. End the handoff with one explicit result: `Documentation impact: Updated ...`, `Documentation impact: None - ...`, or `Documentation impact: Proposed ...; not written because the task was read-only`.

A task is not complete until this gate has been performed and the relevant documentation checks pass. `None` is valid only with a concrete reason; unrelated documents must not be edited merely to produce a change.

The agent responsible for the task owns this gate because it has the full implementation and evidence context. It may delegate an independent documentation review when a change spans multiple authority domains, changes requirement or ADR semantics, or prepares a milestone or release, but delegation does not transfer closure responsibility.
