---
name: verify-repository
description: Discover and run the repository's available quality gates, then report reproducible evidence. Use before a handoff, review, commit, milestone, or release, and whenever build, test, lint, type, migration, seed, documentation, or infrastructure readiness must be verified.
---

# Verify Repository

Verify the repository with authoritative, non-destructive checks and distinguish passing evidence from missing infrastructure.

## Discover authoritative checks

1. Read the applicable `AGENTS.md` files, the root `README.md` documentation map and current status, and the affected repository documentation.
2. Inspect manifests and automation sources such as workspace configuration, `package.json` scripts, lockfiles, Compose files, CI workflows, Makefiles, and application READMEs. Treat them as command authority and cross-check any documented command against them.
3. Inspect the working tree before running formatters or generators. Preserve unrelated user changes.
4. Use documented scripts instead of inventing commands. Do not install dependencies, start external services, or mutate shared data unless the request authorizes it.

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

## Execute safely

- Prefer read-only or check modes.
- Use isolated test databases, schemas, ports, and Redis prefixes when the repository defines them.
- Do not run production migrations, delete broad paths, reset the working tree, or expose secrets.
- Stop a dependent check when its prerequisite fails, but continue independent checks that can still provide evidence.
- Do not treat an absent application scaffold, missing service, or unavailable dependency as a pass.

## Close documentation impact

Before handoff, apply the root README task-closure documentation gate:

1. Compare the completed scope and changed paths with the documentation change-impact table.
2. When writes are authorized, update and link materially affected authoritative documents; when the task is read-only, report required follow-ups without writing them.
3. Validate changed local documentation paths and anchors, and run the ADR validator when architecture-related documentation changed.
4. Report `Documentation impact` as updated, none with a concrete reason, or proposed but not written because the task was read-only.

## Report evidence

For every check, report:

| Field | Required content |
|---|---|
| Scope | Component or requirement covered |
| Command | Exact command executed, or the discovered command that was blocked |
| Outcome | Pass, Fail, or Blocked |
| Evidence | Exit code and concise relevant output |
| Follow-up | Smallest action needed when not passing |

Classify an executable gate as `Fail` when it runs unsuccessfully. Classify a required artifact as `Fail` when static evidence proves it is absent or incorrect. Use `Blocked` when a check cannot run because an external prerequisite, permission, service, or authoritative command is unavailable and the outcome cannot otherwise be determined. A planning-only repository may therefore have blocked executable gates while still failing an implementation-readiness claim.

Separate verified facts, static observations, and untested assumptions. End with an overall readiness statement and list any skipped check with its reason. Write repository artifacts and examples in English.
