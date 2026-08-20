# Frontend Execution Profile Review

Status: `PASS WITH OPERATOR FOLLOW-UP`

Date: 2026-08-20

## Scope and authority

This workflow audit reviews the conditional frontend execution profile introduced on branch `codex/frontend-execution-profile` at baseline commit `4fdb625`. It covers the project-scoped custom agent, repository skill, Milestone Assignment Packet v2 overlay, write-lease compatibility, lifecycle hooks, flow metrics, ExecPlan convention, navigation, and execution records. It does not review product UI, change TASK-010 through TASK-012 status, or provide implementation or acceptance evidence for those tasks.

The review uses [DPL-DEC-048](../execution/decision-and-progress-log.md), [ADR-0016](../adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md), the [worker-first implementation workflow](../../.codex/execplan-implementation-workflow.md), and the repository [frontend-quality skill](../../.agents/skills/frontend-quality/SKILL.md). The external configuration contract was checked against the official OpenAI documentation for [custom agents](https://learn.chatgpt.com/docs/agent-configuration/subagents#custom-agents), [skills](https://developers.openai.com/plugins/build/skills), and [hooks](https://learn.chatgpt.com/docs/hooks).

## Verdict

The repository configuration and documentation are internally consistent after two corrections made during this review. No open Blocker, Major, or Minor finding remains in the static workflow surface. The standard implementation path remains unchanged: its common packet has no implementation-profile field, and its existing `test_worker` then Sol-medium `code_worker` sequence, TDD order, leases, budgets, risk routing, and closure gate are preserved.

Only a coherent milestone that materially changes rendered UI appends `Implementation profile: frontend-visual` and the conditional reuse, state, viewport, and browser-evidence capsule. Only that milestone routes Green, including any optional same-turn behavior-preserving Refactor, to the Sol-high `frontend_code_worker`.

The operator follow-up is required before TASK-010 relies on the new role: start a fresh trusted project task, confirm that `frontend_code_worker` is discoverable, and review or trust the changed project hook through the client's hook UI or `/hooks`. The current app session exposes `frontend-quality`, which confirms project-skill discovery, but it cannot prove fresh custom-agent discovery or persisted hook trust.

## Findings resolved during review

### Major — standard packets carried frontend-profile bookkeeping

The initial implementation added `Implementation profile: standard | frontend-visual` to the common packet and required every ExecPlan milestone to record it. That contradicted the owner's requirement that non-frontend implementation retain its existing flow. DPL-DEC-048 supersedes only that part of DPL-DEC-047: standard is now implicit, the common packet is unchanged, and the marker exists only inside the conditional frontend capsule.

### Minor — the worker implied a separate Refactor assignment

The initial worker instruction said it could own a “Green or Refactor assignment,” while the workflow and lease guard permit the specialized role only in phase `green`. The instruction now states that it owns one Green assignment with an optional same-turn behavior-preserving Refactor. The guard self-test also explicitly rejects `red`, `evidence`, `setup`, and `refactor` for `frontend_code_worker`.

## Contract review

| Surface | Result | Decisive evidence |
|---|---|---|
| Custom agent schema and model route | Pass | All 11 project agent TOMLs contain `name`, `description`, and `developer_instructions`; names are unique and match the repository filename convention. `frontend_code_worker` is `gpt-5.6-sol` at `high`; the unchanged `code_worker` remains `medium`. |
| Skill package and discovery | Pass | The current trusted project turn exposes `frontend-quality`. Its frontmatter, folder identity, description, UI metadata, explicit `$frontend-quality` prompt, and absence of placeholders pass both an independent parse with the repository `yaml` package and the installed `skill-creator` validator. |
| Skill activation boundary | Pass | A fresh independent read-only forward test confirmed direct and indirect visible-UI activation, a stop before preflight for incomplete authority and capsule inputs, non-activation for generated GraphQL types and TanStack Query data access, and rejection of unauthorized themes, effects, fields, and motion. The fresh evaluator discovered `frontend-quality` in its initial skill catalog before explicitly loading the file. |
| Standard-flow preservation | Pass | The common packet contains no profile marker. Only the conditional capsule contains `Implementation profile: frontend-visual`. Diff inspection against `main` found no change in product paths, `docs/IMPLEMENTATION_PLAN.md`, standard test/code workers, or any existing reviewer definition. |
| Write-lease compatibility | Pass | `python -B .codex/leases/lease_guard.py self-test` passed all 26 isolated checks. The assignment-identity group accepts only frontend Green and rejects every other supported write phase for the specialized role. |
| Hook schema and behavior | Pass, trust pending | `python -m json.tool .codex/hooks.json` passed. An isolated Start/Stop probe for `agent_type=frontend_code_worker` wrote two valid events, returned JSON `{}` for both hooks, and produced one complete lifecycle pair. `python -B .codex/metrics/agent_flow_metrics.py self-test` passed all eight behavioral groups. Persisted project-hook trust still requires the operator follow-up. |
| Documentation and navigation | Pass | Root navigation, the Codex guide, ExecPlan convention, workflow, lease guide, metrics guide, decision record, and this review index link the current owners without changing product status. |

The reviewed runtime/configuration fingerprint is `d074553913ee49885811446cf1136b337e4698e47230f0386080251e57f9d6f1`, computed from the final specialized agent, skill and UI metadata, implementation workflow, lease guard, hook definition, and unchanged metrics implementation.

## Verification

Executed from the repository root:

```text
python C:\Users\mmjos\.codex\skills\.system\skill-creator\scripts\quick_validate.py .agents\skills\frontend-quality
python -B .codex/leases/lease_guard.py self-test
python -B .codex/metrics/agent_flow_metrics.py self-test
python -m json.tool .codex/hooks.json
python -B .agents/skills/verify-repository/scripts/validate_docs.py --repo .
git diff --check
```

After PyYAML 6.0.3 was installed in the operator's Python 3.12 user environment, the installed `skill-creator` validator was rerun outside the sandbox and returned `Skill is valid!` with exit code 0. Additional isolated probes parsed all agent TOMLs, parsed the skill frontmatter and `agents/openai.yaml`, verified the conditional-marker location, exercised hook Start/Stop capture for the new role, and confirmed an empty diff against `main` for product paths, the canonical implementation plan, standard workers, and existing reviewers.

A fresh independent forward test then exercised five realistic requests against skill blob `27951f5be6b4eaf48b7dc15db79f85bbf42997d6`: explicit TASK-010 visual planning, implicit mobile-UI review, an incomplete visual implementation request, nonvisual generated-type and data-access work, and an unsupported visual-direction request. It returned `PASS` with no Blocker, Major, or Minor, made no repository edit, and correctly distinguished routing evidence from absent product/browser evidence. The current application still contains only the TASK-003 shell, so no card-layout, focus, or image-fallback product claim was made.

The packaged Codex CLI binary was discoverable at the desktop app installation path, but both sandboxed and approved read-only attempts to run `codex --version` and `codex features list` returned Windows `Access denied`. That environment limitation does not invalidate repository configuration, but it prevents this task from replacing the required fresh-session discovery and hook-trust checks.

## Documentation impact

Documentation impact: Updated the current workflow, skill, custom-agent instruction, ExecPlan convention, Codex validation matrix, write-lease tests and references, DPL decision lifecycle, review index, and chronological progress record, including the later successful official skill-validator evidence. PyYAML was installed only in the operator's user environment; no repository dependency, ADR, requirement, acceptance criterion, product task, source, application test, build output, publication, or deployment changed.
