# Project-Scoped Codex Agents

This directory contains reusable Codex agent definitions that are versioned with the repository as portfolio artifacts. They define stable working roles; a coordinating prompt still supplies the concrete `TASK-*`, option, artifact, criteria, output contract, and stopping condition for each spawned instance.

These agents support repository work. They do not change product scope, approve architecture, resolve a decision gate, replace an ExecPlan, or count as implementation or acceptance evidence. All agents remain subject to the root [repository guidelines](../AGENTS.md) and must begin repository work from the [documentation map](../README.md#documentation-map).

## Agent Registry

| Agent | Permission boundary | Stable responsibility | Not responsible for |
|---|---|---|---|
| [`technology_researcher`](./agents/technology-researcher.toml) | Read only | Investigate one assigned technical option against common criteria and return primary-source evidence in a fixed structure | Repository edits, final synthesis, architecture approval, or task and gate status changes |
| [`decision_analyst`](./agents/decision-analyst.toml) | Read only | Audit research comparability and Decision Review Contract coverage, rank options, and return a traceable recommendation, ADR outline, and synthesis-readiness verdict | Repository edits, ADR numbering or approval, owner-controlled choices, or task and gate status changes |
| [`independent_reviewer`](./agents/independent-reviewer.toml) | Read only | Try to falsify an assigned pre-draft decision contract or exact final artifact against repository authorities and reproducible evidence | Editing the reviewed work, approving owner-controlled decisions, or taking closure ownership |

Codex identifies each custom agent by the `name` field inside its TOML file. The filenames follow the same names in kebab case for navigation only.

## Model and Reasoning Policy

The workflow uses one model family with role-specific reasoning effort:

| Execution role | Model and effort | Rationale |
|---|---|---|
| Primary coordinating thread | `gpt-5.6-sol` with `max` when available | Owns cross-report synthesis, repository writes, state reconciliation, approval handling, and final closure. The parent-session setting is selected by the operator and cannot be enforced by these project-scoped agent files. |
| `technology_researcher` | `gpt-5.6-sol`, `high` | Each instance has a bounded, parallel, evidence-gathering assignment. |
| `decision_analyst` | `gpt-5.6-sol`, `xhigh` | Must reconcile multiple reports, contract coverage, ranking, and decide-now versus prove-later boundaries. |
| `independent_reviewer` | `gpt-5.6-sol`, `max` | Performs quality-first adversarial exploration and verification at the highest-risk checkpoints. |

The custom-agent TOML values take precedence over the parent setting, so the differentiated policy is explicit rather than inherited. The primary coordinator must confirm its actual model, reasoning, permissions, and working-tree state at the start of a consequential decision run. `Ultra` is not a substitute for this topology: proactive delegation may help independent work, but the repository still requires the named barriers, fresh review, bounded correction, and owner approval below.

Role instructions remain necessary. More reasoning does not replace primary-source requirements, common criteria, explicit uncertainty, artifact-local completeness, read-only boundaries, or executable validation. If the configured model or effort becomes unavailable in a target Codex environment, update this policy and the affected agent files together rather than allowing silent drift. Compare policy changes on representative repository decisions instead of assuming that a higher effort alone improves the workflow.

The model ID, supported reasoning levels, custom-agent precedence, and parallel-work guidance are documented in the [official GPT-5.6 Sol model reference](https://developers.openai.com/api/docs/models/gpt-5.6-sol), [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model), and [Codex subagent documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents).

## Collaboration Topology

The repository uses a risk-tiered, contract-first graph with explicit ownership:

```text
Primary Codex thread (coordinator, sole writer, final closure owner)
  |
  +-- living Decision Review Contract in the owning ExecPlan
  |
  +-- technology_researcher A (option A, parallel)
  +-- technology_researcher B (option B, parallel)
  +-- technology_researcher C (option C, parallel)
  |
  +-- research synchronization barrier
  |
  +-- decision_analyst
  |      +-- DRAFT READY
  |      +-- RETURN FOR RESEARCH
  |      +-- OWNER DIRECTION
  |
  +-- if a risk trigger applies: independent_reviewer instance A
  |      +-- contract checkpoint before drafting
  |
  +-- primary thread drafts the decision artifact
  |
  +-- fresh independent_reviewer instance B
  |      +-- evidence checkpoint on the complete artifact and exact diff
  |      +-- findings -> bounded correction -> complete re-review
  |
  +-- primary post-verdict reconciliation barrier
  |
  +-- project-owner approval checkpoint
```

The contract and evidence checkpoints are agent-workflow controls, not `DG-*` architecture decision gates and not the task-closure documentation gate. The option and reviewer labels belong to instances, not permanent definitions. The pre-draft and final reviewers are separate fresh instances of the same `independent_reviewer` role; no permanent panel or second reviewer role is required.

The primary thread is deliberately not duplicated as a custom `coordinator` agent. It owns orchestration, repository writes, approval handling, integration, and final closure. Parallel work is limited to independent, read-heavy assignments. The final reviewer receives the authoritative inputs, living contract, cumulative invariant packet, exact artifact, and diff, and independently reproduces evidence instead of treating the prior review or the primary summary as proof.

## Decision Review Contract and Risk Tier

For an ExecPlan that compares consequential options or prepares an ADR, the primary coordinator creates a living Decision Review Contract inside that ExecPlan before option research. Do not create a separate contract document. Link to authority owners and record:

- exact task, decision gate, target artifact, approval boundary, and forbidden scope;
- common criteria, evidence classes, and required artifact-local sections or outputs;
- hard gates and score, recommendation, artifact-status, task-state, and gate-state invariants;
- a decide-now versus prove-later disposition so downstream implementation proves defined semantics rather than inventing them;
- a cumulative invariant packet with a plan-local ID, trigger or fixture, expected result, evidence or actual result, and responsible reviewer; and
- correction, escalation, re-entry, and stopping conditions.

Every invariant packet covers artifact completeness, evidence honesty, and authority-state consistency. Add triggered invariants when the decision defines state transitions or concurrency, integrity or identity, deterministic or canonical bytes, cross-platform equivalence, recovery, or ownership. Re-run every applicable invariant after a material revision, not only the invariant that previously failed.

The decision analyst audits the complete contract and returns one synthesis-readiness result:

- `DRAFT READY`: research is comparable, every required contract item is covered, decision semantics are complete enough to draft, and remaining unknowns are explicitly assigned to downstream proof. This does not approve the decision.
- `RETURN FOR RESEARCH`: evidence is missing, asymmetric, stale, or contradictory, or decision semantics remain unresolved.
- `OWNER DIRECTION`: an owner-controlled value choice, scope boundary, or exhausted stopping condition prevents an evidence-only recommendation.

An independent contract checkpoint is required before drafting when any of these risk triggers applies:

- the decision defines a custom serialization, integrity, identity, concurrency, recovery, or cross-platform contract;
- a decision-semantic uncertainty is proposed for deferral as downstream runtime proof;
- candidates remain closely ranked or materially contradictory; or
- a correction introduces decision-critical mechanics outside the reviewed contract.

For ordinary decisions without a trigger, the analyst's `DRAFT READY` result is the contract checkpoint. A triggered independent checkpoint permits one supported outline correction; if it still does not pass, return to research, analysis, or project-owner direction instead of drafting.

## How to Invoke the Workflow

Custom agents do not run automatically merely because their files exist. The coordinating request must name the roles, barriers, and stopping conditions. For example:

```text
Act as the primary coordinator for the exact TASK-* and its owning ExecPlan.
Use gpt-5.6-sol with max reasoning for the primary thread when available.

Before research, create or verify the living Decision Review Contract in the
ExecPlan. Have one read-only technology_researcher instance evaluate each option
against the identical contract criteria. Wait for every durable report.

Give the complete report set and contract to decision_analyst. Require the
criteria matrix, contract coverage, decide-now/prove-later disposition, ranked
recommendation, mapped ADR outline, and one synthesis-readiness result.

If a risk trigger applies, have a fresh independent_reviewer perform the contract
checkpoint. Draft only after DRAFT READY and the applicable checkpoint pass.

Have the primary thread draft the artifact. Then spawn a different fresh
independent_reviewer to inspect the exact artifact and diff, reproduce the full
invariant packet, and return a verdict. Apply the bounded correction protocol,
perform the post-verdict reconciliation barrier, and stop for project-owner
approval when the exact proposal is ready.
```

A good instance assignment states:

- the exact task, gate, artifact, option, and review stage;
- the authoritative repository inputs and Decision Review Contract to read;
- common comparison criteria or invariant IDs;
- whether repository writes are allowed;
- the required output structure and evidence;
- whether the coordinator must wait for peer results or use a fresh instance; and
- the success, escalation, re-entry, and stopping conditions.

## Review, Correction, and Approval Protocol

The fresh final reviewer always performs the evidence checkpoint and returns `PASS`, `PASS WITH FOLLOW-UPS`, `REVISE`, or `BLOCKED` with evidence. The final review loop is intentionally bounded:

1. The primary coordinator applies only supported, in-scope corrections.
2. The reviewer inspects the complete revised artifact and exact diff and re-runs the full applicable invariant packet.
3. A correction that introduces a new normative subsystem or other decision-critical mechanics invalidates the prior contract checkpoint. Update the living contract and repeat the applicable fresh checkpoint without silently resetting the final correction count.
4. After two unsuccessful final-artifact correction cycles, freeze the proposal and ask the project owner for direction.

After cycle exhaustion, the project owner may reject the proposal, authorize named fixes plus one fresh review, or authorize a new two-cycle budget. A newly discovered Blocker or Major outside the authorized remediation returns to the owner. Do not infer a new budget from permission to make one named correction.

Before presenting any proposal for approval, the primary coordinator performs a post-verdict reconciliation barrier. It verifies the exact reviewed artifact against the Decision Review Contract and aligns the reviewer verdict, open findings, hard gates, score, recommendation, artifact status, task and gate states, documentation impact, and next action. `REVISE` or `BLOCKED` permits correction or owner direction, never an acceptance-ready presentation.

Human-controlled milestones remain human controlled. An agent report cannot accept an ADR, resolve a `DG-*` gate, or close the owning task. Decisions already at an explicit owner-approval checkpoint when this policy is adopted retain their completed review evidence; do not fabricate a retrospective contract checkpoint. Any later material change to such a proposal activates the material-change invalidation rule before a new approval request.

## TASK-001 Historical Example

The completed [TASK-001 ExecPlan](../docs/plans/completed/TASK-001-test-harness-decision.md) preserves the workflow that existed when it ran: three independent option researchers, a synchronization barrier, one decision analyst, a primary-authored proposal, and bounded final review. Under the current risk-tiered policy, a similarly bounded decision would use the analyst's readiness result as its contract checkpoint unless its current Decision Review Contract identifies a risk trigger. Historical plans are not rewritten to simulate a checkpoint that did not exist.

## Permission and Evidence Boundaries

All three custom agent definitions set `model = "gpt-5.6-sol"` and `sandbox_mode = "read-only"`; their reasoning efforts are `high`, `xhigh`, and `max` according to role. Current-session permission overrides may still be applied by the Codex client, so the primary thread must inspect permissions and the working tree before relying on isolation. Repository writes remain centralized in the primary thread.

Agent output is supporting evidence, not self-validating proof. The primary agent must inspect the final repository state, run the task's authoritative validators, perform the documentation-impact review, and own the handoff.

The file schema and project-scoped `.codex/agents/` location follow the [official OpenAI documentation for Codex subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents).
