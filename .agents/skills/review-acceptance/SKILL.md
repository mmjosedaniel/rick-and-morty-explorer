---
name: review-acceptance
description: Evaluate implementation readiness against the repository's requirements and acceptance criteria using traceable evidence. Use for acceptance reviews, definition-of-done checks, assessment grading, release readiness, or a gap analysis against AC, FR, NFR, and optional requirements.
---

# Review Acceptance

Determine what the repository demonstrably satisfies without converting documentation, mocks, or assumptions into false passes.

## Establish the review contract

1. Read the applicable `AGENTS.md` files, the root `README.md` documentation map and current status, `docs/REQUIREMENTS.md`, and the technical assessment.
2. Read the ADR index's optional-scope dispositions and architecture coverage, the active decision gates in `docs/IMPLEMENTATION_PLAN.md`, and every relevant ADR.
3. Identify mandatory requirements, minimum acceptance criteria, required deliverables, adopted optional repository commitments, and deferred optional requirements.
4. Treat a `Proposed` ADR as an evaluated recommendation awaiting approval. Treat a pending decision gate as an unresolved planning constraint with no selected option. Neither is accepted scope or implementation evidence.
5. Inspect the implementation, manifests, migrations, tests, documentation, and Git evidence relevant to each criterion.

## Use evidence in descending strength

Prefer:

1. a passing automated test that exercises the real boundary;
2. a reproducible runtime observation against isolated real dependencies;
3. static implementation evidence with a clear execution path;
4. documentation as evidence of intent only.

Never mark a criterion as passing solely because a requirement, plan, ADR, mock, stub, or unchecked code path says it should work.

## Review every acceptance area

Evaluate each `AC-001` through `AC-012` independently. Trace failures to related functional or non-functional requirements. Apply source-mandatory checks to both readiness views. Apply checks introduced solely by accepted ADRs or repository policy only to repository-baseline readiness. Include these checks when the necessary implementation exists:

- character cards, deterministic A-Z/Z-A sorting, detail routing, favorites, and comments;
- responsive layouts using both Grid and Flexbox, including loading, empty, and error states;
- Express-hosted GraphQL queries and mutations, all required filters alone and combined, and safe input handling;
- migrations from an empty PostgreSQL database, exactly 15 distinct initial characters, foreign-key behavior, and persistence across reloads;
- real Redis miss, hit, TTL, canonical key behavior, isolation, and database fallback during an outage;
- bounded, non-sensitive request logging;
- an accessible public GitHub repository, ERD, setup instructions, API usage examples, configuration documentation, and repository hygiene.

Use browser control only after deterministic build and service checks pass. Verify direct-route reloads, back and forward navigation, responsive breakpoints, and mutation persistence when a runnable UI is available.

Report two explicit readiness views when optional scope has been adopted:

- Minimum-assessment readiness covers the mandatory requirements and deliverables from the source assessment together with the derived acceptance criteria in `docs/REQUIREMENTS.md`.
- Repository-baseline readiness also covers optional requirements adopted by accepted ADRs or repository policy.

A missing deferred optional feature affects neither view. A missing adopted optional commitment fails repository-baseline readiness but does not retroactively change the source assessment's minimum classification.

## Assign statuses consistently

- `Pass`: sufficient reproducible evidence satisfies the whole criterion.
- `Fail`: evidence shows the criterion is implemented incorrectly or incompletely.
- `Blocked`: implementation evidence exists or may satisfy the criterion, but a missing external prerequisite prevents verification.
- `Not applicable`: use only when the governing requirements explicitly exclude the criterion from the requested review scope.

For a current-state acceptance or readiness review, mark a missing required scaffold, implementation, or deliverable as `Fail`. Reserve `Blocked` for an unavailable verification environment, permission, dependency, or service when repository evidence cannot establish the outcome. Never convert either case into `Pass`.

## Report the matrix

Report every criterion with its status, requirement links, exact evidence, remaining gap, and smallest next action. Summarize mandatory readiness separately from optional coverage and list all commands executed. Do not implement fixes unless the user also requests remediation. Write any persisted review artifact in English.
