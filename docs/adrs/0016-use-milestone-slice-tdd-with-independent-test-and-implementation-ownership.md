# ADR-0016: Use Milestone-Slice TDD with Independent Test and Implementation Ownership

- Status: Accepted
- Date: 2026-08-16
- Approval date: 2026-08-16
- Decision owners: Project owner and project maintainers
- Related requirements: NFR-004, OR-004, OR-007, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009, AC-010, AC-011, AC-012
- Related decisions: ADR-0010, ADR-0011, ADR-0015
- Supersedes: [ADR-0010](./superseded/0010-use-a-targeted-automated-testing-strategy.md)
- Superseded by: None

## Context

ADR-0010 established test-first development, targeted automated coverage, and a final relevance audit. Its strict one-smallest-test interpretation was applied to TASK-004 through separate test and implementation workers, producing 209 serial assignments across 109 cycles. The resulting implementation passed its acceptance review, but the execution audit found repeated Red-Green handoffs, redundant validation, and cases where tests were added to demonstrate behavior that the repository already implemented. The cost was disproportionate to the product change.

The project owner wants to retain TDD and the quality benefit of independent test and implementation contexts. The problem is therefore the granularity and evidence cadence, not test-first development or role separation. The workflow needs one causal Red-Green proof for a coherent milestone slice, a preflight that distinguishes missing behavior from existing behavior, and proportional validation that does not repeatedly reproduce stable evidence.

ADR-0011 already defines milestone-aware test projects and focused execution boundaries. ADR-0015 remains the accepted migration authority and is not changed by this decision. Its large custom lifecycle is nevertheless a relevant cost signal for future extensions, which must be measured before that boundary grows.

## Decision drivers

- Preserve test-first design feedback and regression protection.
- Preserve independent test and implementation ownership without multiplying handoffs per assertion.
- Prevent fabricated Red-Green cycles for behavior that already exists.
- Keep each implementation change causally tied to a decisive failing test set.
- Validate holistically at milestone boundaries, early enough to expose integration drift.
- Avoid rerunning stable suites and evidence without a concrete risk trigger.
- Keep workflow rules independent of a specific model, vendor, or orchestration product.
- Preserve accepted architecture and historical execution evidence.

## Considered options

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| Continue strict micro-TDD with separate test and implementation workers | Maximizes per-assertion causal evidence and preserves context separation | Multiplies reads, writes, leases, handoffs, and test executions; encourages artificial Reds when behavior already exists | Rejected |
| Use milestone-slice TDD with independent test and implementation ownership | Preserves causal test-first evidence and context separation while batching only related scenarios and validating at meaningful joins | Requires a precise slice boundary, preflight classification, and stop rules to prevent oversized batches | Selected |
| Use one combined worker for tests and implementation | Minimizes handoff overhead and keeps one local context | Removes independent ownership and makes tests more likely to mirror the implementation | Rejected |
| Implement a milestone first and add tests afterward | Reduces early workflow coordination | Delays design feedback and cannot prove that tests detect the missing behavior | Rejected |

## Decision

Production behavior changes use milestone-slice Red-Green-Refactor. A milestone slice is the minimum coherent vertical group of related observable scenarios that share one delivery goal, contract, boundary, and change surface. Multiple failures are allowed in one slice only when they are consequences of that same missing behavior. Unrelated behaviors, contracts, or boundaries require separate slices.

Before opening Red, the test owner inspects the relevant implementation and existing tests and classifies each intended scenario:

- `EXISTING_AND_COVERED`: the implementation and a relevant passing automated test already prove the behavior;
- `EXISTING_BUT_UNCOVERED`: the implementation already provides the behavior, but coverage is absent or insufficient, so add passing characterization evidence without opening Green;
- `MISSING`: the behavior is absent and requires a new failing test;
- `REGRESSION`: previously intended behavior is broken and requires a failing regression test;
- `PARTIAL`: part of the behavior exists and only a specifically confirmed gap may enter the new slice;
- `CONFLICTING`: implementation, requirements, decisions, tests, or runtime evidence disagree, so dependent work stops for reconciliation; or
- `UNKNOWN`: evidence is insufficient, so dependent work stops for bounded investigation.

Only `MISSING`, `REGRESSION`, and a coordinator-confirmed explicit gap of `PARTIAL` may open a Red-Green cycle. `EXISTING_AND_COVERED` records the confirming test and implementation evidence without a new cycle. `EXISTING_BUT_UNCOVERED` adds and runs passing characterization evidence without authorizing Green or a production edit. `CONFLICTING` and `UNKNOWN` cannot authorize dependent test or production changes until reconciliation or bounded investigation resolves them.

Independent ownership remains mandatory for owner-authorized implementation ExecPlans:

1. The test owner writes the minimum coherent test set for one milestone slice and runs one decisive focused command that fails for the intended shared reason.
2. The coordinator accepts the Red evidence and freezes the test paths and observable contract for that slice.
3. The implementation owner reuses a fresh accepted aggregate Red and does not rerun it merely because ownership changed. Reproduction is required only when the evidence is missing or stale, the worktree or frozen contract drifted, or an external-state mismatch could change the result. The owner then makes the smallest complete production change that satisfies the slice and uses the focused scope to reach Green.
4. The implementation owner may refactor only while the focused scope remains green.
5. A new slice cannot begin until the current slice is Green and its affected validation is accepted.

Validation is proportional and evidence-aware:

- run the relevant existing scope once during preflight;
- run one decisive focused command for Red and the same focused boundary during Green;
- after all coherent slices in an ExecPlan milestone reach Green, run the milestone's affected suites and relevant strict type-check or build boundary once as the holistic join under ADR-0011;
- obtain an independent semantic milestone review whose reasoning depth is proportional to the change risk;
- validate clean-checkout or hosted-platform boundaries at the first milestone that introduces or changes those boundaries, rather than waiting until final closure;
- run closure-level full checks once unless evidence is incomplete, contaminated, or invalidated by a later change; and
- do not repeat stable evidence solely because ownership changes between agents.

Deterministic repository validators are preferred to repeated prose review. Exact model selection, reasoning level, retry limits, and token budgets are operational routing policy owned under `.codex/`, not architectural constraints in this ADR. The workflow must nevertheless stop and escalate when a Red is invalid, the same failure repeats without material progress, a milestone exceeds its declared execution budget, or a worker cannot produce contract-compliant evidence.

At plan completion, retain ADR-0010's semantic relevance audit: remove or revise tests that duplicate another test without adding confidence, assert an abandoned implementation detail, exercise scaffolding with no current consumer, or no longer map to a requirement, accepted decision, regression, or supported behavior. This audit preserves relevant coverage; it is not a mandate to reduce test count.

ADR-0016 carries forward ADR-0010's adoption of OR-004 and OR-007 and its preference for focused unit, component, application, real-infrastructure integration, and narrow browser-smoke boundaries. ADR-0011 continues to own the concrete TypeScript harness and scope activation.

ADR-0015 remains unchanged. Before future work extends or materially touches its migration lifecycle, the owning plan must record the mapped obligations, reusable versus new tests, projected milestone slices and worker handoffs, expected focused and full-suite runtime, and net-new custom lifecycle surface. Observed cost is compared with that estimate after the milestone. Disproportionate extension cost triggers project-owner review and, when the accepted boundary must change, a successor ADR; it never authorizes silently weakening ADR-0015.

## Consequences

### Positive

- Test-first causality is preserved at a coherent behavioral boundary.
- Separate test and implementation contexts continue to provide independent challenge.
- Existing behavior is verified without manufacturing failing tests or unnecessary production edits.
- Fewer leases, handoffs, and repeated suite executions reduce latency and token use.
- Milestone reviews expose integration and architectural drift before final closure.
- Historical TASK-004 evidence remains valid under the policy that governed it.

### Negative

- Slice boundaries require judgment and can be drawn too broadly or too narrowly.
- An aggregate Red is less granular than strict per-assertion micro-TDD.
- Preflight adds a small read-only cost before implementation.
- Proportional review and validation require explicit risk reasoning rather than a uniform checklist.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| A milestone slice becomes a large batch with unrelated failures | Require one shared goal, contract, boundary, change surface, and decisive failure reason; split any unrelated behavior before Red acceptance. |
| Preflight incorrectly labels missing behavior as existing | Require repository or runtime evidence and an exact command or stable source reference; use `CONFLICTING` for disagreement and `UNKNOWN` when evidence is insufficient. |
| Independent workers drift after the Red handoff | Freeze test paths and observable contract; changes require coordinator reconciliation before implementation continues. |
| Reduced suite repetition misses a regression | Run focused checks for every slice, the affected suites and type or build boundary at the milestone join, and repeat complete closure checks only when later changes invalidate evidence. |
| Lower-cost review misses cross-boundary defects | Route semantic review by risk and escalate reasoning for security, data integrity, irreversible migration, or repeated-failure boundaries. |
| ADR-0015 extensions reproduce TASK-004's disproportionate cost | Require the extension-cost watch and owner review before expanding custom lifecycle surface. |
| Operational model policy becomes embedded in architecture | Keep provider, model, retry, and budget configuration in `.codex/` while this ADR specifies observable workflow invariants. |

## Validation

- Every production milestone slice has a recorded preflight classification for each intended scenario.
- Every accepted Red records one focused command and an intended shared failure; every Green records the matching focused command and passing result.
- No `EXISTING_AND_COVERED` or `EXISTING_BUT_UNCOVERED` scenario is represented as a new Red-Green production cycle; uncovered behavior has passing characterization evidence and no Green.
- Every `PARTIAL` cycle identifies the coordinator-confirmed gap, and every `CONFLICTING` or `UNKNOWN` result stops dependent work.
- An implementation owner repeats a fresh accepted Red only when the handoff records missing or stale evidence, worktree or contract drift, or an external-state mismatch.
- Test and implementation changes have distinct owners for owner-authorized implementation ExecPlans.
- A slice contains no unrelated contract or boundary, and no next slice begins before Green.
- Each completed slice records its focused Green result.
- Each ExecPlan milestone records one affected-suite and relevant type-check or build join plus one independent semantic review, with stated risk level.
- Clean-checkout or hosted-platform validation appears at the first milestone that materially changes that boundary.
- Repeated full-suite or closure validation records the concrete invalidation or contamination trigger.
- Future ADR-0015 extension work records the estimate and observed extension-cost watch before closure.
- Plan completion includes a semantic test-relevance audit.

## Evaluation

### Proportionality gate

| Dimension | ADR-0010 strict microcycle baseline | ADR-0016 selected policy | Proportionality conclusion |
|---|---|---|---|
| Implementation surface | Separate workers and guard-controlled leases hand off each assertion-level Red and Green | Reuses the existing worker roles, lease guard, and ADR-0011 harness; adds no product behavior, dependency, or agent-framework/orchestrator | Smaller recurring coordination surface with no application or runtime expansion |
| Test surface | One smallest test per cycle can multiply focused commands and create artificial Reds for existing behavior | One minimum coherent test set per slice, seven-class preflight, passing characterization without Green, and no unrelated behavior batching | Preserves relevant coverage while removing proof that adds no behavioral confidence |
| Tooling and review surface | One general independent review posture is applied after extensive serial work | Adds only two orchestration reviewer profiles: milestone review for ordinary semantic joins and critical review for escalated risk; deterministic validators and the existing harness remain authoritative | Two bounded routing profiles are less costly than repeating maximum-depth review and add no product dependency |
| Documentation surface | Per-microcycle packets, leases, handoffs, and repeated evidence amplify chronology | One accepted Red-Green handoff per coherent slice and one semantic review plus affected-boundary join per milestone; only material decisions, exceptions, milestones, and closure need durable global chronology | Expected handoffs move from per assertion to per coherent slice, reducing repeated context and records |
| Recurring operational burden | Every assertion-level ownership transition can reread context and rerun a fresh Red | A fresh accepted Red is reused unless evidence is stale, drifted, missing, or sensitive to external state | Removes routine duplicate work while retaining explicit invalidation triggers |
| Next-feature extension friction | Cost grows with assertion count even when scenarios share one contract and change surface | Cost grows with coherent behavioral slices and risk boundaries; ADR-0015 extensions also receive an estimate-versus-observed cost watch | Better aligns workflow cost with feature and architectural risk rather than assertion count |
| Reversibility | The superseded record and completed TASK-004 evidence remain intact | Policy-only routing and cadence can be superseded without data migration, product rollback, dependency removal, or runtime compatibility work | Highly reversible because no product artifact or external service depends on it |
| Scope source | NFR-004 plus adopted optional OR-004 and OR-007 govern testing; product ACs remain evidence targets | Preserves the same mandatory-versus-adopted-optional distinction and changes neither product scope nor acceptance status | Efficiency is improved without promoting optional source scope or weakening mandatory evidence |

The selected policy passes this proportionality gate: it addresses the measured present problem with existing infrastructure and two narrow reviewer-routing profiles, while avoiding new product code, dependencies, services, or orchestration frameworks.

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 19 | 20 | Preserves NFR-004 and adopted OR-004/OR-007 while covering every acceptance boundary. |
| Architectural fit and consistency | 19 | 20 | Fits ADR-0011's milestone-aware scopes and preserves ADR-0015 unchanged. |
| Options and trade-offs | 14 | 15 | Compares strict micro-TDD, milestone slices, combined ownership, and tests-after implementation. |
| Feasibility and proportionality | 13 | 15 | Uses existing roles and commands; slice classification and risk routing still require judgment. |
| Quality attributes | 9 | 10 | Improves efficiency and maintainability while retaining independent review and coverage. |
| Verifiability | 10 | 10 | Defines observable classifications, commands, handoffs, milestone joins, and stop triggers. |
| Evolution and reversibility | 7 | 10 | Model-independent and supersedable, though downstream workflow documents must align. |
| **Total** | **91** | **100** | |

**Recommendation:** Accept.

The project owner authorized this repository-policy decision on 2026-08-16. Acceptance changes the governing workflow for pending and future implementation; it does not retroactively reinterpret completed TASK-004 evidence or claim that pending product behavior is implemented.

## References

- [Repository guidelines](../../AGENTS.md)
- [ExecPlan standard](../../PLANS.md)
- [Implementation plan](../IMPLEMENTATION_PLAN.md)
- [ADR-0010: Targeted automated testing strategy](./superseded/0010-use-a-targeted-automated-testing-strategy.md)
- [ADR-0011: TypeScript test harness](./0011-define-the-typescript-test-harness.md)
- [ADR-0015: Build-first migration lifecycle with exact catalog-bound identity](./0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md)
- [Agentic workflow efficiency audit](../reviews/2026-08-16-agentic-workflow-efficiency-audit.md)
- [Decision and progress log](../execution/decision-and-progress-log.md)
