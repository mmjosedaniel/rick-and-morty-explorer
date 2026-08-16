---
name: verify-repository
description: Discover and run proportional repository quality gates, reuse fresh evidence, and report reproducible results. Use for focused worker checks, milestone validation, task closure, reviews, commits, or releases involving build, test, lint, type, migration, seed, documentation, or infrastructure readiness.
---

# Verify Repository

Verify the repository with authoritative, non-destructive checks and distinguish passing evidence from missing infrastructure.

## Discover authoritative checks

1. Read the applicable `AGENTS.md` files and the root `README.md` documentation map, then follow only the route for the requested verification scope.
2. Inspect manifests and automation sources such as workspace configuration, `package.json` scripts, lockfiles, Compose files, CI workflows, Makefiles, and application READMEs. Treat them as command authority and cross-check any documented command against them.
3. Inspect the working tree before running formatters or generators. Preserve unrelated user changes.
4. Use documented scripts instead of inventing commands. Do not install dependencies, start external services, or mutate shared data unless the request authorizes it.

## Choose the verification mode

Select one mode before discovering commands:

| Mode | Use | Default boundary |
|---|---|---|
| `focused` | Red, Green, or one bounded worker barrier | The smallest authoritative command that proves the assigned contract |
| `milestone` | Integrated milestone acceptance | Affected suites plus the relevant typecheck, build, migration, or smoke boundary |
| `closure` | Task, release, CI, or explicit full verification | Complete authoritative gates required by the task and documentation-closure policy |

Do not promote a worker handoff to `closure` merely because another agent requests verification. Escalate only when the requested claim, risk tier, prerequisite failure, or tree drift makes the narrower mode insufficient.

## Select checks proportionally

Run the smallest authoritative set that covers the changed or requested scope. Consider, when available:

- documentation and ADR validation;
- task-closure documentation impact and local link or anchor validation;
- formatting and lint checks;
- static type checking;
- unit and integration tests;
- production builds;
- migration and seed or import checks against an isolated test database;
- real Redis integration for cache hit, miss, TTL, and fail-open behavior;
- API or browser smoke tests;
- secret, generated-file, and repository-hygiene checks.

If `.agents/skills/govern-adrs/scripts/validate_adrs.py` exists, run it whenever ADRs or architecture-dependent work are in scope.

If `.agents/skills/verify-repository/scripts/validate_docs.py` exists, run it whenever local documentation changes or the task-closure documentation gate is in scope. It is the authoritative repository check for relative Markdown paths and anchors, stable requirement/ADR/gate/task/SPEC/HS/DPL references, readiness-selector tags, and static Gherkin structure.

## Reuse fresh evidence

Before rerunning a command, inspect accepted evidence from the current milestone. Reuse it only when all of these identities match:

- exact command and working directory;
- relevant-tree fingerprint and frozen test boundary;
- environment fingerprint, including toolchain and configuration;
- external run identity for mutable PostgreSQL, Redis, browser, filesystem, or process state.

External-service evidence is non-reusable by default unless the isolated database, schema, container, seed, port, and artifact identities are recorded and unchanged. Any relevant tree drift, failed prerequisite, contradictory result, or missing identity invalidates reuse. Report reused evidence separately from commands executed in the current verification; do not rerun a complete suite only to create a second transcript.

## Execute safely

- Prefer read-only or check modes.
- Use isolated test databases, schemas, ports, and Redis prefixes when the repository defines them.
- Do not run production migrations, delete broad paths, reset the working tree, or expose secrets.
- Stop a dependent check when its prerequisite fails, but continue independent checks that can still provide evidence.
- Do not treat an absent application scaffold, missing service, or unavailable dependency as a pass.

## Close documentation impact

In `closure` mode, or before a final handoff that completes a repository task, apply the root README [task-closure documentation gate](../../../README.md#task-closure-documentation-gate). Use this skill to discover and run the required validators, report their exact outcomes, and state the resulting documentation impact; do not duplicate or reinterpret the gate's policy here. A `focused` worker barrier or ordinary `milestone` check does not run task closure merely because it has a handoff; report only the documentation affected by that bounded scope.

## Report evidence

For every check, report:

| Field | Required content |
|---|---|
| Scope | Component or requirement covered |
| Command | Exact command executed, or the discovered command that was blocked |
| Outcome | Pass, Fail, or Blocked |
| Evidence | Exit code and concise relevant output, or the accepted evidence ID and matching fingerprints when reused |
| Source | `Executed` or `Reused` |
| Follow-up | Smallest action needed when not passing |

Classify an executable gate as `Fail` when it runs unsuccessfully. Classify a required artifact as `Fail` when static evidence proves it is absent or incorrect. Use `Blocked` when a check cannot run because an external prerequisite, permission, service, or authoritative command is unavailable and the outcome cannot otherwise be determined. A planning-only repository may therefore have blocked executable gates while still failing an implementation-readiness claim.

Separate verified facts, static observations, reused evidence, and untested assumptions. State the selected mode, end with an overall readiness statement limited to that mode, and list every skipped check with its reason. Write repository artifacts and examples in English.
