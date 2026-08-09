# Repository Guidelines

## Language

All documentation and source code in this repository must be written in English. This requirement includes file and directory names, headings, prose, code identifiers, comments, docstrings, test descriptions, log messages, error messages, and other user-facing text. Preserve official proper names and external API field names when they cannot be translated without breaking compatibility or accuracy.

## Scope and Evidence

The technical assessment and `docs/REQUIREMENTS.md` preserve the source assessment's distinction between mandatory and optional requirements. An accepted ADR or repository policy may adopt an optional requirement as a stricter repository delivery commitment without changing its source classification. Use the optional-scope disposition table in `docs/adrs/README.md` as the current record of those commitments.

Requirements, accepted ADRs, plans, examples, mocks, and stubs are evidence of intent only. Never describe a feature, command, service, or acceptance criterion as implemented or passing without corresponding repository or runtime evidence.

## Documentation Workflow

Start repository work from the [documentation map](README.md#documentation-map). Follow its authority domains and task-specific reading order before planning, editing, reviewing, or verifying work.

- Use stable requirement, deliverable, acceptance, ADR, and decision-gate IDs in plans, tests, reviews, and handoffs.
- Read only the relevant ADRs for scoped work; read the full portfolio for portfolio-wide architecture reviews.
- Before adding a dependency, configuration, migration, test, or application behavior, compare the intended artifact with each active gate's `Must be resolved before` condition in `docs/IMPLEMENTATION_PLAN.md` and resolve only the gate whose trigger covers that artifact.
- Follow the [documentation change-impact table](README.md#documentation-change-impact) after every scope, decision, planning, implementation, or evidence change.
- Link to the authoritative owner instead of duplicating normative prose. If two authoritative documents conflict, surface and reconcile the conflict before continuing dependent work.

## Task Closure

Every completed repository task must pass the [task-closure documentation gate](README.md#task-closure-documentation-gate). The agent responsible for the task owns the gate and may use a subagent only as an independent reviewer; delegation never transfers closure responsibility. For write-authorized work, update and link all materially affected documentation before handoff. For read-only work, report required documentation follow-ups without modifying files. Every final handoff must state the documentation impact explicitly, including a concrete reason when no documentation change was necessary.

## JavaScript and TypeScript

Follow the accepted [ADR-0002](docs/adrs/0002-use-typescript-across-the-stack.md): all application and test source code must use TypeScript with strict compiler checks.

Use modern, stable ECMAScript features supported by the repository's documented Node.js and browser targets:

- Prefer `async`/`await` for readable asynchronous control flow.
- Use `Promise.all`, `Promise.allSettled`, or another explicit concurrency primitive when independent operations should run concurrently; do not serialize them through unnecessary consecutive `await` expressions.
- Prefer ECMAScript modules, `const` by default, `let` only for reassignment, and clear modern constructs such as destructuring, optional chaining, and nullish coalescing when they improve readability.
- Avoid `var`, nested callback-based asynchronous control flow, and unnecessary `.then()` chains.
- Do not introduce experimental language or compiler features without an accepted ADR that justifies them.

## Test-Driven Development

All production behavior changes must follow the TDD workflow documented in [ADR-0010](docs/adrs/0010-use-a-targeted-automated-testing-strategy.md).

Apply the three laws of TDD:

1. Do not write production code unless it is required to make a failing test pass.
2. Do not write more test code than is sufficient to produce the next failure; a compilation or type-check failure counts as a failure.
3. Do not write more production code than is sufficient to make the currently failing test pass.

Use one observable Red-Green-Refactor cycle at a time:

- Red: add the smallest relevant test and run it to confirm that it fails for the intended reason.
- Green: implement only the behavior required by that test and run the relevant test scope until it passes.
- Refactor: improve structure only while the relevant tests remain green, then run them again.

Start every bug fix with a failing regression test. Choose the smallest test boundary that can prove the behavior; use an integration test first when the behavior belongs to GraphQL wiring, PostgreSQL, Redis, migrations, or another real boundary. Do not commit exploratory production code, skipped tests, focused tests, or test-only branches that change production behavior. Generated artifacts and declarative configuration do not require artificial unit tests, but their observable build, migration, or runtime outcomes require automated validation.

In progress updates and final handoffs, report the command and intended failure observed during Red, the passing command observed during Green, and the validation performed after Refactor.
