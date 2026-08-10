# Project-Scoped Codex Agents

This directory contains reusable Codex agent definitions that are versioned with the repository as portfolio artifacts. They define stable working roles; a coordinating prompt still supplies the concrete `TASK-*`, option, artifact, criteria, output contract, and stopping condition for each spawned instance.

These agents support repository work. They do not change product scope, approve architecture, resolve a decision gate, replace an ExecPlan, or count as implementation or acceptance evidence. All agents remain subject to the root [repository guidelines](../AGENTS.md) and must begin repository work from the [documentation map](../README.md#documentation-map).

## Agent Registry

| Agent | Permission boundary | Stable responsibility | Not responsible for |
|---|---|---|---|
| [`technology_researcher`](./agents/technology-researcher.toml) | Read only | Investigate one assigned technical option against common criteria and return primary-source evidence in a fixed structure | Repository edits, final synthesis, architecture approval, or task and gate status changes |
| [`decision_analyst`](./agents/decision-analyst.toml) | Read only | Audit research comparability, build a criteria matrix, rank options, and prepare a traceable recommendation or ADR outline | Repository edits, ADR numbering or approval, owner-controlled choices, or task and gate status changes |
| [`independent_reviewer`](./agents/independent-reviewer.toml) | Read only | Try to falsify a proposed decision or completed change against repository authorities and executable evidence | Editing the reviewed work, approving owner-controlled decisions, or taking closure ownership |

Codex identifies each custom agent by the `name` field inside its TOML file. The filenames follow the same names in kebab case for navigation only.

## Model and Reasoning Policy

All three project-scoped agents pin the same quality-first configuration:

```toml
model = "gpt-5.6-sol"
model_reasoning_effort = "high"
```

This is intentional rather than an inherited default. The workflow depends on current external technical research, comparison of consequential architecture options, contradiction detection, and adversarial review. Keeping every role on GPT-5.6 Sol with high reasoning makes the evidence pipeline consistent from research through review and prioritizes decision quality over token cost and latency.

The role instructions remain necessary: model capability does not replace primary-source requirements, identical comparison criteria, explicit uncertainty, read-only boundaries, or independent validation. If the configured model becomes unavailable in a target Codex environment, update this policy and all three agent files together rather than allowing silent per-role drift.

The model ID, supported tools, and reasoning levels are documented in the [official GPT-5.6 Sol model reference](https://developers.openai.com/api/docs/models/gpt-5.6-sol) and [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model).

## Collaboration Topology

The repository uses a small graph with explicit ownership:

```text
Primary Codex thread (coordinator, only writer, final closure owner)
  |
  +-- technology_researcher instance A (option A)
  +-- technology_researcher instance B (option B)
  +-- technology_researcher instance C (option C)
  |
  +-- synchronization barrier
  |
  +-- decision_analyst (comparison and recommendation)
  |
  +-- primary thread drafts or implements
  |
  +-- independent_reviewer
           |
           +-- findings -> bounded correction loop -> re-review
```

The option labels belong to instances, not to permanent agent definitions. For example, `research_vitest`, `research_jest`, and `research_split_runner` can all be instances of `technology_researcher`.

The primary thread is deliberately not duplicated as a custom `coordinator` agent. Project-scoped agent files configure spawned sessions; the primary thread already owns orchestration, repository writes, approval handling, integration, and final closure. The three permanent agents therefore remain narrow, reusable, and read-only.

## How to Invoke the Workflow

Custom agents do not run automatically merely because their files exist. Ask Codex to use the named roles and provide a bounded assignment. For example:

```text
Act as the primary coordinator for TASK-001 and its owning ExecPlan.

Have three technology_researcher instances evaluate the Vitest, Jest, and
split Node.js test runner plus Vitest strategies against the identical criteria
already defined in the ExecPlan. Keep every researcher read-only, require the
standard structured report, and wait for all three results before synthesis.

Give all three reports to decision_analyst. Ask it to audit comparability, build
the criteria matrix, rank the options, and return a recommendation plus an ADR
outline. Then draft the proposed ADR in the primary thread.

After the proposed ADR is drafted, have independent_reviewer try to falsify it
against TASK-001, DG-001, the mapped requirements, ADRs, SPEC/HS rules, and
repository evidence. Limit revision and re-review to two cycles, then return any
remaining blocker for project-owner direction.
```

A good instance assignment states:

- the exact task, gate, artifact, or option;
- the authoritative repository inputs to read;
- common comparison or review criteria;
- whether repository writes are allowed;
- the required output structure;
- whether the coordinator must wait for peer results;
- the success, escalation, and stopping conditions.

## TASK-001 Example

The completed [TASK-001 ExecPlan](../docs/plans/completed/TASK-001-test-harness-decision.md) defines three candidate harness strategies. A suitable execution uses three instances of `technology_researcher` in parallel because those investigations are independent and read-heavy. The primary coordinator waits at a synchronization barrier, gives the complete report set to `decision_analyst`, and uses its comparison to draft one proposed ADR. Only then does `independent_reviewer` inspect the combined proposal and actual diff.

The review loop is intentionally bounded:

1. The reviewer returns `PASS`, `PASS WITH FOLLOW-UPS`, `REVISE`, or `BLOCKED` with evidence.
2. The primary coordinator applies only supported corrections within TASK-001 scope.
3. The reviewer inspects the revised artifact, not merely the coordinator's summary.
4. After two unsuccessful correction cycles, the primary coordinator stops and asks the project owner for direction.

Human-controlled milestones remain human controlled. In particular, an agent report cannot accept the TASK-001 ADR or resolve DG-001.

## Permission and Evidence Boundaries

All three custom agent definitions set `model = "gpt-5.6-sol"`, `model_reasoning_effort = "high"`, and `sandbox_mode = "read-only"`. Current-session permission overrides may still be applied by the Codex client, so the primary thread must inspect permissions and the working tree before relying on isolation. Repository writes remain centralized in the primary thread.

Agent output is supporting evidence, not self-validating proof. The primary agent must inspect the final repository state, run the task's authoritative validators, perform the documentation-impact review, and own the handoff.

The file schema and project-scoped `.codex/agents/` location follow the [official OpenAI documentation for Codex subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents).
