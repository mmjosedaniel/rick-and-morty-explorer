# Project-Scoped Codex Agents

This directory contains reusable Codex agent definitions that are versioned with the repository as portfolio artifacts. They define stable working roles; a coordinating prompt still supplies the concrete `TASK-*`, milestone or option, artifact, criteria, write lease when applicable, output contract, and stopping condition for each spawned instance.

These agents support repository work. They do not change product scope, approve architecture, resolve a decision gate, replace an ExecPlan, or count as implementation or acceptance evidence. All agents remain subject to the root [repository guidelines](../AGENTS.md) and must begin repository work from the [documentation map](../README.md#documentation-map).

## Agent Registry

| Agent | Permission boundary | Stable responsibility | Not responsible for |
|---|---|---|---|
| [`technology_researcher`](./agents/technology-researcher.toml) | Read only | Investigate one assigned technical option against common criteria and return primary-source evidence in a fixed structure | Repository edits, final synthesis, architecture approval, or task and gate status changes |
| [`decision_analyst`](./agents/decision-analyst.toml) | Read only | Audit research comparability and Decision Review Contract coverage, rank options, and return a traceable recommendation, ADR outline, and synthesis-readiness verdict | Repository edits, ADR numbering or approval, owner-controlled choices, or task and gate status changes |
| [`independent_reviewer`](./agents/independent-reviewer.toml) | Read only | Try to falsify an assigned pre-draft decision contract or exact final artifact against repository authorities and reproducible evidence | Editing the reviewed work, approving owner-controlled decisions, or taking closure ownership |
| [`test_worker`](./agents/test-worker.toml) | Workspace write under an explicit lease | Add one smallest test for an assigned behavior slice, run it, and prove the intended Red state | Production behavior, architecture decisions, status changes, Green authorization, or task closure |
| [`code_worker`](./agents/code-worker.toml) | Workspace write under an explicit lease | Perform bounded declarative setup, minimum Green implementation, and behavior-preserving Refactor work | Changing an accepted test, selecting architecture, status changes, or task closure |

Codex identifies each custom agent by the `name` field inside its TOML file. The filenames follow the same names in kebab case for navigation only.

## Model and Reasoning Policy

The workflow uses one model family with role-specific reasoning effort:

| Execution role | Model and effort | Rationale |
|---|---|---|
| Primary coordinating thread | `gpt-5.6-sol` with `max` when available | Owns synthesis, write-lease routing, integration, state reconciliation, approval handling, and final closure. It is the sole writer for decision work and normally delegates implementation writes. The parent-session setting is selected by the operator and cannot be enforced by these project-scoped agent files. |
| `technology_researcher` | `gpt-5.6-sol`, `high` | Each instance has a bounded, parallel, evidence-gathering assignment. |
| `decision_analyst` | `gpt-5.6-sol`, `xhigh` | Must reconcile multiple reports, contract coverage, ranking, and decide-now versus prove-later boundaries. |
| `independent_reviewer` | `gpt-5.6-sol`, `max` | Performs quality-first adversarial exploration and verification at the highest-risk checkpoints. |
| `test_worker` | `gpt-5.6-sol`, `medium` | Owns one narrow test-side slice and returns concise Red evidence. |
| `code_worker` | `gpt-5.6-sol`, `medium` | Owns bounded setup, Green, or Refactor work after the applicable coordinator barrier. |

The custom-agent TOML values take precedence over the parent setting, so the differentiated policy is explicit rather than inherited. The primary coordinator must confirm its actual model, reasoning, permissions, and working-tree state at the start of a consequential decision or implementation run. `Ultra` is not a substitute for these topologies: proactive delegation may help independent work, but the repository still requires named barriers, explicit write ownership, fresh review, bounded correction, and owner approval where applicable.

Role instructions remain necessary. More reasoning does not replace primary-source requirements, common criteria, explicit uncertainty, artifact-local completeness, read-only boundaries or write leases, or executable validation. If the configured model or effort becomes unavailable in a target Codex environment, update this policy and the affected agent files together rather than allowing silent drift. Compare policy changes on representative repository work instead of assuming that a higher effort alone improves the workflow.

The model ID, supported reasoning levels, custom-agent precedence, and parallel-work guidance are documented in the [official GPT-5.6 Sol model reference](https://developers.openai.com/api/docs/models/gpt-5.6-sol), [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model), and [Codex subagent documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents).

## Collaboration Topology

### Decision work

Decision-oriented ExecPlans use a risk-tiered, contract-first graph with explicit ownership:

```text
Primary Codex thread (coordinator, sole decision-artifact writer, final closure owner)
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

For decision work, the primary thread is deliberately not duplicated as a custom `coordinator` agent. It owns orchestration, decision-artifact writes, approval handling, integration, and final closure. Parallel work is limited to independent, read-heavy assignments. The final reviewer receives the authoritative inputs, living contract, cumulative invariant packet, exact artifact, and diff, and independently reproduces evidence instead of treating the prior review or the primary summary as proof.

### Implementation work

Write-authorized implementation ExecPlans use the complementary [worker-first ExecPlan implementation workflow](./execplan-implementation-workflow.md). The primary remains the sole integration, evidence, approval-handling, and closure owner but normally delegates repository edits to `test_worker` and `code_worker` through explicit, sequential path leases. The primary enforces each assignment with the [automatic write-lease guard](./write-lease-guard.md): it starts an immutable baseline before spawning the worker and requires a fresh terminal compliant result, or a replayed compliant receipt plus clean pinned status, before accepting the handoff barrier. Only one worker lease may be active per worktree, and the same-cycle Red and Green writers never run concurrently. A fresh `independent_reviewer` examines the complete final state, exact diff, and lease receipts before the primary reconciles closure.

The [agent-flow metrics policy](./agent-flow-metrics.md) adds a non-blocking observation sidecar to this implementation topology. Project hooks record sanitized subagent lifecycle events, while the coordinator records the semantic decisions that distinguish a correction, rejected Red, or confirmed regression. Metrics never replace the blocking lease guard, ExecPlan evidence, Red-Green-Refactor barriers, reviewer verdict, or task-closure gate.

The decision topology above remains unchanged: write-capable implementation workers do not research options, draft ADRs, resolve gates, or replace the primary decision writer.

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

### Decision workflow prompt

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

### Implementation workflow prompt

Use the copy-paste prompt and lease contract in the [worker-first ExecPlan implementation workflow](./execplan-implementation-workflow.md#copy-paste-prompt-example). It names the automatic lease, Red, Green, Refactor, review, correction, metrics, and closure barriers without duplicating them here.

## Review, Correction, and Approval Protocol

The fresh final reviewer always performs the evidence checkpoint and returns `PASS`, `PASS WITH FOLLOW-UPS`, `REVISE`, or `BLOCKED` with evidence. A `PASS WITH FOLLOW-UPS` may advance only after the primary dispositions every item and confirms that none conflicts with a definition of done, hard gate, required validation result, or documentation gate; any such conflict is a correction that requires complete fresh re-review. The decision-artifact review loop below is intentionally bounded. Worker-first implementation uses the same fresh full-state re-review rule and the role-specific correction routing in its implementation guide.

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

All five custom agent definitions set `model = "gpt-5.6-sol"`. The researcher, analyst, and reviewer remain `read-only` with `high`, `xhigh`, and `max` reasoning according to role. The test and code workers use `medium` reasoning and `workspace-write`, but only an explicit coordinator-issued path lease with a pinned automatic-guard contract authorizes a particular edit. Current-session permission overrides may still be applied by the Codex client, so the primary thread must inspect permissions and the working tree before relying on isolation.

Decision-artifact writes remain centralized in the primary thread. During write-authorized implementation, repository edits are normally delegated to the test and code workers in the serial order defined by the implementation guide. An exceptional primary-thread implementation edit must be recorded with its reason, paths, and validation.

Agent output and flow metrics are supporting observations, not self-validating proof. A terminal compliant lease receipt proves only that net non-ignored repository changes stayed within the pinned path contract and Git control state; it does not prove semantic correctness. The primary agent must inspect the final repository state, run the task's authoritative validators, perform the documentation-impact review, and own the handoff. A telemetry failure is reported as missing coverage, while a lease-guard failure freezes the write branch.

The file schema and project-scoped `.codex/agents/` location follow the [official OpenAI documentation for Codex subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents). Project lifecycle instrumentation follows the [official Codex hooks documentation](https://learn.chatgpt.com/docs/hooks).
