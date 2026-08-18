# Project-Scoped Codex Agents

This directory contains reusable Codex agent definitions that are versioned with the repository as portfolio artifacts. They define stable working roles; a coordinating prompt still supplies the concrete `TASK-*`, milestone or option, artifact, criteria, write lease when applicable, output contract, budget, and stopping condition for each instance. Write-capable implementation workers receive the canonical [Milestone Assignment Packet v2](./execplan-implementation-workflow.md#milestone-assignment-packet-v2), whose compact capsule supplies exact authority anchors and accepted evidence for one coherent milestone slice.

These agents support repository work. They do not change product scope, approve architecture, resolve a decision gate, replace an ExecPlan, or count as implementation or acceptance evidence. All agents remain subject to the root [repository guidelines](../AGENTS.md) and must begin repository work from the [documentation map](../README.md#documentation-map).

## Start Here

| Need | Start with | Continue with |
|---|---|---|
| Persistent repository rules and authority | [Repository guidelines](../AGENTS.md) | [Documentation map](../README.md#documentation-map) and its task-specific reading order |
| Repeatable ADR, planning, acceptance, or verification procedure | [Codex task routing](../README.md#codex-task-routing) | The selected `SKILL.md` and only the references or scripts it routes to |
| Consequential decision work | [Decision work](#decision-work) | Owning ExecPlan and its Decision Review Contract |
| Owner-authorized implementation ExecPlan | [Implementation workflow](./execplan-implementation-workflow.md) | [Write-lease guard](./write-lease-guard.md) and owning ExecPlan |
| Custom role selection | [Agent registry](#agent-registry) | Exact role TOML and bounded instance assignment |
| Operator-managed runtime concurrency | [Runtime concurrency capacity](#runtime-concurrency-capacity) | [Collaboration topology](#collaboration-topology), [implementation workflow](./execplan-implementation-workflow.md), and [write-lease guard](./write-lease-guard.md) |
| Optional worker-flow telemetry | [Agent-flow metrics](./agent-flow-metrics.md) | [Hook activation and trust](./agent-flow-metrics.md#activate-the-lifecycle-hooks) only when a present measurement question justifies the overhead |

Keep `AGENTS.md` concise and durable; put task-specific procedures in the linked ExecPlan, workflow, or repository skill. Codex discovers repository skills under `.agents/skills` using progressive disclosure: it first sees skill metadata, then loads a selected `SKILL.md` and only the supporting resources needed for the task. Project-scoped custom agents live under `.codex/agents`; their definitions do not execute merely because the files exist.

Project-scoped `.codex` configuration and hooks load only for a trusted project. Non-managed command hooks require a separate review of the current definition before they run; use `/hooks` in Codex CLI to inspect, trust, or disable them. The optional metrics guide owns the exact activation steps and evidence boundary.

## Agent Registry

| Agent | Permission boundary | Stable responsibility | Not responsible for |
|---|---|---|---|
| [`technology_researcher`](./agents/technology-researcher.toml) | Read only | Investigate one assigned technical option against common criteria and return primary-source evidence in a fixed structure | Repository edits, final synthesis, architecture approval, or task and gate status changes |
| [`decision_analyst`](./agents/decision-analyst.toml) | Read only | Audit research comparability and Decision Review Contract coverage, rank options, and return a traceable recommendation, ADR outline, and synthesis-readiness verdict | Repository edits, ADR numbering or approval, owner-controlled choices, or task and gate status changes |
| [`independent_reviewer`](./agents/independent-reviewer.toml) | Read only | Try to falsify an ordinary higher-risk decision contract, milestone, or integrated final artifact against repository authorities and reproducible evidence | Editing the reviewed work, approving owner-controlled decisions, or taking closure ownership |
| [`milestone_reviewer`](./agents/milestone-reviewer.toml) | Read only | Review one ordinary completed implementation milestone proportionally and reuse fresh evidence | Critical-risk review, editing, or closure ownership |
| [`critical_reviewer`](./agents/critical-reviewer.toml) | Read only | Perform maximum-effort adversarial review when a named critical trigger applies | Routine milestone review, editing, or closure ownership |
| [`test_worker`](./agents/test-worker.toml) | Workspace write under an explicit lease | Perform read-only preflight, then own one coherent milestone Red or passing characterization | Production behavior, evidence-document edits, architecture decisions, status changes, Green authorization, or task closure |
| [`code_worker`](./agents/code-worker.toml) | Workspace write under an explicit lease | Perform bounded setup or milestone Green with optional same-turn behavior-preserving Refactor | Changing an accepted test, evidence-document edits, selecting architecture, status changes, or task closure |

Codex identifies each custom agent by the `name` field inside its TOML file. The filenames follow the same names in kebab case for navigation only.

## Model and Reasoning Policy

The workflow routes model and reasoning effort by responsibility and risk:

| Execution role | Model and effort | Rationale |
|---|---|---|
| Primary coordinating thread | `gpt-5.6-sol`, `medium` by default; `high` for S2 or equivalent cross-boundary synthesis; `max` only for S3/critical triggers or explicit owner direction | Owns synthesis, write-lease routing, integration, state reconciliation, approval handling, and final closure. It is the sole writer for decision work and normally delegates implementation writes. The parent-session setting is selected by the operator and cannot be enforced by these project-scoped agent files. |
| `technology_researcher` | `gpt-5.6-sol`, `high` | Each instance has a bounded, parallel, evidence-gathering assignment. |
| `decision_analyst` | `gpt-5.6-sol`, `xhigh` | Must reconcile multiple reports, contract coverage, ranking, and decide-now versus prove-later boundaries. |
| `milestone_reviewer` | `gpt-5.6-terra`, `high` | Reviews an ordinary completed milestone proportionally without paying maximum-effort cost. |
| `independent_reviewer` | `gpt-5.6-sol`, `high` | Reviews ordinary higher-risk milestones, decision checkpoints, and integrated final states. |
| `critical_reviewer` | `gpt-5.6-sol`, `max` | Performs quality-first adversarial review only for named critical triggers. |
| `test_worker` | `gpt-5.6-sol`, `medium` | Performs preflight and owns one coherent milestone test contract while preserving a separate test context. |
| `code_worker` | `gpt-5.6-sol`, `medium` | Owns bounded setup or milestone Green with an optional same-turn Refactor while preserving a separate code context. |

Each custom-agent file's explicit `model` and `model_reasoning_effort` values take precedence over the corresponding parent settings. Omitted session settings inherit from the parent, while current-turn runtime overrides can still supersede agent-file sandbox and approval defaults. The primary coordinator must confirm its actual model, reasoning, permissions, and working-tree state at the start of a consequential decision or implementation run. `Ultra` is not a substitute for these topologies: proactive delegation may help independent work, but the repository still requires named barriers, explicit write ownership, fresh review, bounded correction, and owner approval where applicable.

Role instructions remain necessary. More reasoning does not replace primary-source requirements, common criteria, explicit uncertainty, artifact-local completeness, read-only boundaries or write leases, or executable validation. If the configured model or effort becomes unavailable in a target Codex environment, update this policy and the affected agent files together rather than allowing silent drift. Compare policy changes on representative repository work instead of assuming that a higher effort alone improves the workflow.

The model ID, supported reasoning levels, custom-agent precedence, and parallel-work guidance are documented in the [official GPT-5.6 Sol model reference](https://developers.openai.com/api/docs/models/gpt-5.6-sol), [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model), and [Codex subagent documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents).

## Runtime Concurrency Capacity

The spawned-agent ceiling belongs to each operator's untracked `~/.codex/config.toml`; this repository neither versions nor requires a numeric value. The current operator profile uses:

```toml
[agents]
max_concurrent_threads_per_session = 6
```

The [official Codex configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference) defines this key as the maximum number of spawned-agent threads and excludes the primary thread. This value therefore permits up to six spawned agents alongside the primary coordinator, or seven active threads in total. It is a ceiling, not a workload target or guaranteed allocation; the coordinator must use the capacity actually available in the current session, and another operator may select a lower value without creating repository drift. The [official subagent documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents) owns the runtime feature semantics.

Additional slots are useful for bounded, independent work, especially read-only research and review. They do not expand task scope, grant write authority, increase correction budgets, replace fresh review, or relax closure ownership. Write-capable implementation still follows the [serial milestone flow](./execplan-implementation-workflow.md) and permits only one active [write lease](./write-lease-guard.md) per worktree; Red and Green writers never run concurrently for the same slice. Truly independent concurrent writers require separate worktrees and separate baselines.

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

Write-authorized implementation ExecPlans use the complementary [worker-first ExecPlan implementation workflow](./execplan-implementation-workflow.md). The primary retains integration, evidence acceptance, exception handling, approvals, authoritative status, and closure while delegating bounded edits to separate `test_worker` and `code_worker` contexts through sequential path leases.

For each coherent milestone slice, the primary creates one compact `Milestone Assignment Packet v2`, keeps one test-worker instance and one code-worker instance alive only for that milestone, and retires them after the milestone barrier. Agent persistence reduces repeated context loading but never persists write authority: every write turn has a fresh packet, baseline, digest, lease ID, and terminal close. If a live instance is unavailable, the primary respawns it from the same capsule.

The test worker first performs read-only preflight and returns `EXISTING_AND_COVERED`, `EXISTING_BUT_UNCOVERED`, `MISSING`, `REGRESSION`, `PARTIAL`, `CONFLICTING`, or `UNKNOWN`. Existing covered behavior needs no write. Existing uncovered behavior receives a guarded passing characterization. Missing or regressed behavior follows serial Red then Green. For `PARTIAL`, the coordinator confirms and isolates the explicit missing gap before only that gap follows Red then Green. `CONFLICTING` or `UNKNOWN` stops for triage.

The primary opens and terminally closes the [automatic write-lease guard](./write-lease-guard.md), then inspects the receipt, actual diff, command results, and handoff. Red precedes Green when behavior is missing or regressed; accepted Red evidence can be reused without duplicate execution only while its command, working directory, relevant-tree fingerprint, environment fingerprint, and no-drift condition still match. The code worker may Refactor in the same Green turn only while tests stay green and frozen.

Default milestone limits are one preflight, one coherent Red or characterization, one Green, at most one same-contract correction per role, one review correction loop, stop after the same decisive failure twice, and stop after two no-diff write handoffs. More than three TDD cycles in one milestone requires rescoping instead of silent microcycling.

Review is risk-routed:

| Tier | Typical surface | Review route |
|---|---|---|
| `S0` | Documentation-only or deterministic mechanical work inside an implementation ExecPlan milestone | Fresh `milestone_reviewer` at Terra high, reusing deterministic evidence; S0 work outside an implementation ExecPlan needs no LLM reviewer unless another trigger applies |
| `S1` | Ordinary bounded application milestone | Fresh `milestone_reviewer` at Terra high |
| `S2` | Cross-boundary database, API, platform, or integration milestone | Fresh `independent_reviewer` at Sol high |
| `S3` | Security, irreversible data, concurrency, locking, recovery, custom integrity or identity, or cross-platform byte equivalence | Fresh `critical_reviewer` at Sol max |

An unresolved Blocker or Major from an ordinary reviewer, or explicit project-owner direction, also triggers critical review. Final ordinary integration uses a fresh `independent_reviewer`; use `critical_reviewer` only when a critical trigger remains. Reviewers reuse fresh evidence and rerun missing, stale, contradictory, externally mutable, or risk-critical checks rather than reflexively repeating every suite.

The [agent-flow metrics policy](./agent-flow-metrics.md) is an optional, non-blocking observation sidecar. Use it only when corrections, false Reds, regressions, time, or exact token coverage are worth measuring. Metrics never replace the lease guard, ExecPlan evidence, Red-Green-Refactor barriers, reviewer verdict, or task-closure gate.

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
Use gpt-5.6-sol with medium reasoning for ordinary primary coordination. Escalate
the primary to high only for S2 or equivalent cross-boundary synthesis, and to max
only for an S3/critical trigger or explicit project-owner direction.

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

Use the concise copy-paste prompt, canonical assignment packet, and lease contract in the [worker-first ExecPlan implementation workflow](./execplan-implementation-workflow.md#copy-paste-prompt-example). It defines the serial normal path and deliberately returns exceptions to coordinator triage.

## Review, Correction, and Approval Protocol

The fresh final reviewer always performs the evidence checkpoint and returns `PASS`, `PASS WITH FOLLOW-UPS`, `REVISE`, or `BLOCKED` with evidence. A `PASS WITH FOLLOW-UPS` may advance only after the primary dispositions every item and confirms that none conflicts with a definition of done, hard gate, required validation result, or documentation gate; any such conflict requires a fix and complete fresh re-review. The bounded decision-artifact review loop below remains specific to decision work. Implementation exceptions return to coordinator triage under the implementation guide.

1. The primary coordinator applies only supported, in-scope corrections.
2. The reviewer inspects the complete revised artifact and exact diff and re-runs the full applicable invariant packet.
3. A correction that introduces a new normative subsystem or other decision-critical mechanics invalidates the prior contract checkpoint. Update the living contract and repeat the applicable fresh checkpoint without silently resetting the final correction count.
4. After two unsuccessful final-artifact correction cycles, freeze the proposal and ask the project owner for direction.

After cycle exhaustion, the project owner may reject the proposal, authorize named fixes plus one fresh review, or authorize a new two-cycle budget. A newly discovered Blocker or Major outside the authorized remediation returns to the owner. Do not infer a new budget from permission to make one named correction.

Before presenting any proposal for approval, the primary coordinator performs a post-verdict reconciliation barrier. It verifies the exact reviewed artifact against the Decision Review Contract and aligns the reviewer verdict, open findings, hard gates, score, recommendation, artifact status, task and gate states, documentation impact, and next action. `REVISE` or `BLOCKED` permits correction or owner direction, never an acceptance-ready presentation.

Human-controlled milestones remain human controlled. An agent report cannot accept an ADR, resolve a `DG-*` gate, or close the owning task. Decisions already at an explicit owner-approval checkpoint when this policy is adopted retain their completed review evidence; do not fabricate a retrospective contract checkpoint. Any later material change to such a proposal activates the material-change invalidation rule before a new approval request.

## Validation

Run the smallest checks that cover the changed Codex surface; do not run optional tooling merely because it exists.

| Changed surface | Proportional repository check |
|---|---|
| Any local documentation or navigation | `python -B .agents/skills/verify-repository/scripts/validate_docs.py --repo .` |
| Agent definitions | `python -c "import pathlib,tomllib; files=sorted(pathlib.Path('.codex/agents').glob('*.toml')); [tomllib.loads(path.read_text(encoding='utf-8')) for path in files]; print(f'Parsed {len(files)} agent TOML files.')"` |
| Hook definition | `python -m json.tool .codex/hooks.json` |
| Write-lease guard | `python -B .codex/leases/lease_guard.py self-test` |
| Agent-flow metrics | `python -B .codex/metrics/agent_flow_metrics.py self-test` and, when runtime events exist, `python -B .codex/metrics/agent_flow_metrics.py validate` |
| Any changed text | `git diff --check` |

TOML and JSON parsing validate syntax only. A trusted Codex project session establishes project-layer discovery, and `/hooks` in Codex CLI establishes the current command-hook trust state; neither parser proves runtime activation.

Apply the root [task-closure documentation gate](../README.md#task-closure-documentation-gate) after the component checks. Run the ADR validator only when architecture, ADR coverage, optional disposition, or decision-gate semantics changed.

## TASK-001 Historical Example

The completed [TASK-001 ExecPlan](../docs/plans/completed/TASK-001-test-harness-decision.md) preserves the workflow that existed when it ran: three independent option researchers, a synchronization barrier, one decision analyst, a primary-authored proposal, and bounded final review. Under the current risk-tiered policy, a similarly bounded decision would use the analyst's readiness result as its contract checkpoint unless its current Decision Review Contract identifies a risk trigger. Historical plans are not rewritten to simulate a checkpoint that did not exist.

## Permission and Evidence Boundaries

The custom definitions route model and effort by role: research and analysis remain Sol high/xhigh; ordinary independent review is Sol high; milestone review is Terra high; critical review is Sol max; and test and code workers remain Sol medium. Review roles are read-only. Test and code workers use `workspace-write`, but only an explicit coordinator-issued path lease with a pinned automatic-guard contract authorizes a particular edit. Test-worker preflight is read-only by workflow contract and has no lease; the configured sandbox does not itself enforce that narrower phase, so any write is a violation. Current-session permission overrides may still be applied by the Codex client, so the primary thread must inspect permissions and the working tree before relying on isolation.

Decision-artifact writes remain centralized in the primary thread. During write-authorized implementation, repository edits are normally delegated to persistent milestone-local test and code workers in the serial order defined by the implementation guide. Persistence retains role context, not leases or authority. The coordinator records accepted evidence identities and any exceptional primary-thread implementation edit with its reason, paths, and validation.

Agent output and flow metrics are supporting observations, not self-validating proof. A terminal compliant lease receipt proves only that net non-ignored repository changes stayed within the pinned path contract and Git control state; it does not prove semantic correctness. The primary agent must inspect the final repository state, run the task's authoritative validators, perform the documentation-impact review, and own the handoff. A telemetry failure is reported as missing coverage, while a lease-guard failure freezes the write branch.

Repository instruction discovery follows the official OpenAI documentation for [custom instructions with `AGENTS.md`](https://learn.chatgpt.com/docs/agent-configuration/agents-md). Repository skill location and progressive disclosure follow [Build skills](https://learn.chatgpt.com/docs/build-skills). The file schema and project-scoped `.codex/agents/` location follow the [Codex subagent documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents). Project-layer trust and configuration follow the [configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference), and project lifecycle instrumentation follows the [Codex hooks documentation](https://learn.chatgpt.com/docs/hooks).
