# TASK-010 Acceptance Review — 2026-08-20

- Review status: Complete — `PASS WITH FOLLOW-UPS`
- Review scope: TASK-010 character list, sorting, adopted interface filters, typed frontend data boundary, native list-avatar security boundary, and integrated closure
- Candidate: branch `codex/execplan-010`, HEAD `1370878ce0f11bd61aff6f7fb11179d0d4201381`
- Authenticated candidate aggregate: `9AD1FC659307220CEC4B0B0199206CB6BA40B5E95393F810095C9612657B5F8D` over 224 sorted existing tracked/untracked nonignored paths
- Owning evidence: completed [TASK-010 ExecPlan](../plans/completed/TASK-010-character-list-sorting-and-interface-filters.md)

## Verdict

`PASS WITH FOLLOW-UPS`. No Blocker, Major, or Minor finding remains. TASK-010 satisfies FR-FE-001, FR-FE-002, NFR-001, AC-001, AC-002, adopted OR-003, the TASK-010 portion of adopted OR-004, SPEC-001, SPEC-002, SPEC-006, and its list/sort/filter portions of HS-015, HS-016, and HS-017.

Minimum-assessment readiness advances to 7/12 and remains `Fail` because AC-003 through AC-006 and AC-012 remain incomplete. Repository-baseline readiness also remains `Fail` because later adopted commitments remain incomplete. This review does not claim TASK-012 detail, image-failure, or full-responsive closure.

## Acceptance matrix

| Scope | Result | Decisive evidence |
|---|---|---|
| FR-FE-001 / AC-001 / SPEC-001 | Pass | Unit/application coverage and smoke `937476adea51a78b` render exactly 15 GraphQL/PostgreSQL summaries as cards containing only name, native image, and species; exact avatar URLs and no public character-JSON or proxy path are proven. |
| FR-FE-002 / AC-002 / SPEC-002 | Pass | Application and Chromium evidence prove deterministic A-Z/Z-A ordering, English case-insensitive comparison, numeric-ID ties, and canonical omission of default `sort=asc`. |
| NFR-001 | Pass | React 18, React Router, TanStack Query, generated GraphQL operations, Tailwind consumption, strict typecheck, and the complete root build pass. |
| Adopted OR-003 / SPEC-006 | Pass | Status, species, and gender work individually and together through URL ownership, exact GraphQL variables, visible results, reload, Back, and Forward. |
| Adopted OR-004, TASK-010 portion | Pass | Card, controls, route, App, Shell, and real-browser layout/state behavior have meaningful automated coverage; detail-specific coverage remains later work. |
| HS-015 / HS-016 / HS-017, TASK-010 portions | Pass | URL-owned applied state, component-local drafts, query-owned server data, canonical recovery, list error/Retry, keyboard focus, two milestone viewports, milestone-slice TDD, independent reviews, real-boundary joins, and cumulative relevance evidence pass. |

## Verification evidence

The fresh read-only reviewer authenticated the branch/HEAD, 224-path aggregate, plan/chronology hashes, M3 projection `4076A45C5C1FF70EEE4F2F6F0893E895F528A8178C5BAB95B4524A48F86635CC`, and the disclosed historical overlap of M1/M2 projections. It reused the primary's exact candidate-matching closure packet:

- root typecheck: pass;
- root build: pass, including both GraphQL drift checks;
- Tailwind validation: pass;
- unit: 31 files, 170/170;
- provisioned PostgreSQL/Redis integration: 11 files, 74/74;
- application: 6 files, 25/25;
- Chromium smoke `937476adea51a78b`: 1/1 in 3.1 seconds with zero page errors and zero unexpected console errors;
- Windows smoke lifecycle: 7/7;
- documentation validation: 69 Markdown files and 123 scenarios;
- ADR validation: 18 ADRs and 38 requirements, with only the established NFR-006 warning;
- `git diff --check`: pass with line-ending warnings only;
- external residue: no `task_004_*` database, `t010_smoke_*` schema, TASK-010 Redis key, or listener on ports 4173/4174.

The first integration invocation omitted PostgreSQL port 55432 and the required Redis namespace and stopped at prerequisite authentication/configuration. It is invalid setup chronology, not product evidence. The controlling provisioned run used namespace `character-app:test:t010-closure-caef67ef`, passed 74/74, and left exact residue empty.

## Non-blocking follow-ups

- The current one-moderate/one-high transitive advisory count is not by itself a validated reachable TASK-010 vulnerability. It remains a dependency/security-triage follow-up; investigation or lockfile remediation requires separate authority, and no automatic audit fix is authorized by this task.
- Pending `esbuild@0.28.2` install-script policy coverage remains a separate supply-chain-policy follow-up. Immutable install, build, smoke, and generated-output checks pass; adding a new allowlist policy requires separate repository-policy authority.

These follow-ups are neither waived nor TASK-010 blockers.

## Documentation impact

TASK-010 changes from `In progress` to `Complete`; AC-001 and AC-002 become checked; current minimum-assessment readiness advances from 5/12 to 7/12; root status/operation guidance, implementation and system status, specification routing, UI navigation, review/plan indexes, ADR task metadata/link, chronology, and this dated review are synchronized. The living ExecPlan is preserved under `docs/plans/completed/`. No requirement wording, ADR decision substance, dependency graph, product behavior, commit, push, PR, publication, or deployment changes during closure.
