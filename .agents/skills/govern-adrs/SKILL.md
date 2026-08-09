---
name: govern-adrs
description: Create, evaluate, review, validate, update, or supersede Architecture Decision Records for this repository. Use when an architectural choice changes, when ADR quality or traceability must be checked, or when a proposed decision needs an evidence-based recommendation.
---

# Govern ADRs

Keep architectural decisions specific, falsifiable, traceable, and consistent with the assessment scope.

## Gather decision context

1. Read the applicable `AGENTS.md` files and the root `README.md` documentation map.
2. Read `docs/REQUIREMENTS.md`, `docs/FULL_STACK_TECHNICAL_ASSESSMENT.md`, and `docs/adrs/README.md`.
3. Read `docs/IMPLEMENTATION_PLAN.md` when the decision originates from, changes, or resolves a decision gate.
4. Read every ADR that constrains or could conflict with the decision.
5. Inspect implementation evidence when the decision describes current behavior. Do not infer implementation from documentation alone.

## Decide whether an ADR is warranted

Create an ADR only for a consequential choice with credible alternatives, meaningful trade-offs, or future reversal cost. Do not create an ADR merely to repeat a technology imposed by a mandatory requirement. Capture the discretionary choice around that constraint instead.

Prefer a short implementation note when the choice is local, easily reversible, and has no cross-cutting consequences.

## Create or revise a decision

1. Assign the next unused four-digit ID and an English kebab-case filename.
2. Start a new decision as `Proposed`.
3. Distinguish mandatory, optional, and deferred requirements in the context and drivers.
4. Compare at least two credible alternatives in addition to the selected option.
5. State one concrete decision that can be disproved by inspecting the system.
6. Record positive and negative consequences, residual risks, mitigations, reversal triggers, and measurable validation.
7. Link exact requirement IDs and related ADRs. Treat `Related requirements` as an addressed-by relationship, not as proof that an optional requirement is adopted or implemented; record optional adoption or deferral explicitly in the ADR index.
8. Score the ADR with the rubric in `docs/adrs/README.md`; derive the recommendation from the score and the rubric's acceptance gates.
9. Update the decision index and architecture coverage without claiming implementation. When the decision resolves a gate, update that gate only after project-owner approval.

Use these required sections in order: `Context`, `Decision drivers`, `Considered options`, `Decision`, `Consequences`, `Risks and mitigations`, `Validation`, `Evaluation`, and `References`.

## Preserve decision history

- Change `Proposed` records while they are under review, preserving their intent and review history.
- Mark a record `Accepted` only with project-owner approval.
- Never rewrite an accepted decision to reverse it. Create a new ADR, mark the old one `Superseded`, and add reciprocal links.
- Use `Rejected` for an evaluated decision not selected, and `Deprecated` only when it is no longer recommended without a direct replacement.
- Keep filenames and historical records stable after acceptance.

## Validate the portfolio

Run the bundled deterministic validator for every portfolio-validation request and after any ADR or index change:

```text
python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
```

Use an available Python 3 executable when `python` is not on `PATH`. Fix validation errors before handoff. Treat warnings as review items and explain any intentional exception.

Then review semantic concerns the script cannot prove:

- compatibility among decisions;
- proportionality to the small assessment scope;
- hidden promotion of optional work;
- security, operability, data ownership, and failure semantics;
- cross-store atomicity claims;
- validation criteria that exercise the selected boundary rather than a mock.

## Report the outcome

Summarize decisions created or changed, recommendation and score, unresolved approval gates, validator results, and any implementation plan that must be updated. Write all repository documentation and examples in English.
