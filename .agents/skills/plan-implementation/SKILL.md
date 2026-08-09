---
name: plan-implementation
description: Create, review, or update dependency-ordered implementation plans and requirement traceability for this repository. Use when turning the assessment, requirements, or ADRs into milestones, work items, definitions of done, or an execution sequence.
---

# Plan Implementation

Turn the repository documentation into an executable plan without confusing proposed architecture with implemented behavior.

## Establish the planning baseline

1. Read the nearest `AGENTS.md` files, the root `README.md` documentation map and current status, and the existing `docs/IMPLEMENTATION_PLAN.md`.
2. Read `docs/REQUIREMENTS.md`, `docs/FULL_STACK_TECHNICAL_ASSESSMENT.md`, `docs/adrs/README.md`, and every ADR that affects the requested scope.
3. Use the ADR index's architecture coverage only to locate relevant decisions; verify exact scope in the requirements and individual ADRs.
4. Inspect the repository tree and authoritative manifests before describing existing code, commands, or dependencies.
5. Record missing, contradictory, or unapproved inputs as assumptions or decision gates. Do not silently resolve scope-changing ambiguity.

## Interpret scope correctly

- Treat mandatory functional requirements, non-functional requirements, deliverables, and acceptance criteria as baseline scope.
- Preserve the source assessment's optional classification. Schedule an optional requirement only when the user selects it or an accepted ADR adopts it as a repository delivery commitment, and label that work as `adopted optional` rather than source-mandatory.
- When one ADR discusses both mandatory and optional work, split those outcomes into separate tasks or gates so optional approval never blocks the mandatory baseline.
- Treat a `Proposed` ADR as an evaluated recommendation awaiting approval. Label any task based on it as an architectural assumption or approval gate.
- Treat an `Accepted` ADR as the current implementation direction and never as evidence that the decision has already been implemented.
- Treat rejected, deprecated, and superseded ADRs as historical context, not active direction.
- Do not claim that a documented decision, command, service, or feature already exists without repository evidence.

## Build the plan

1. Convert requirements into vertical, independently verifiable outcomes.
2. Order outcomes by real dependencies: repository foundation, local infrastructure, persistence, ingestion, API contracts, UI flows, cross-cutting quality, and delivery evidence. Adjust this order when repository evidence requires it.
3. Define each work item with:
   - stable task ID and outcome;
   - mapped requirement, deliverable, and acceptance-criterion IDs;
   - governing ADR IDs and approval state;
   - prerequisites and decision gates;
   - expected artifacts or paths;
   - executable or observable validation;
   - documentation impact, affected authority owners, and required links or an explicit no-impact reason;
   - a falsifiable definition of done.
4. Separate implementation work from optional enhancements, deferred work, and release-readiness checks.
5. Check that every mandatory requirement, required deliverable, and acceptance criterion maps to at least one task and one validation activity.
6. Identify the critical path, work that can run in parallel, and risks that could invalidate later work.

## Produce the requested artifact

- Return a plan in the response when the user requests analysis or planning only.
- Create or update `docs/IMPLEMENTATION_PLAN.md` when the user asks for a repository planning artifact. Create `docs/TRACEABILITY_MATRIX.md` only after executable work items exist and the user requests a separate matrix; do not duplicate the ADR index's architecture coverage while the plan contains decision gates only.
- Preserve unrelated user changes and existing document structure.
- Write filenames, documentation, identifiers, examples, and code in English as required by the repository policy.
- Do not implement application code unless the user explicitly expands the request beyond planning.

## Final quality check

Verify that the plan is dependency-ordered, fully traceable, honest about ADR approval, explicit about optional scope, and testable without invented commands or evidence. Every work item must inherit the root README task-closure documentation gate before it can be marked complete.
