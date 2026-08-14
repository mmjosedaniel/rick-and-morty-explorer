# Proposed Storybook Pilot Workflow

- Status: Proposed non-blocking pilot; not implemented
- Date: 2026-08-09
- Decision owner: [DPL-DEC-013](../execution/decision-and-progress-log.md#decision-log); DPL-DEC-007 is Superseded history
- Related UI scope: NFR-001, NFR-002, NFR-005, AC-001 through AC-006, DPL-DEC-005, DPL-DEC-006, SPEC-001 through SPEC-007, TASK-010 through TASK-012
- Planning guardrails: ADR-0001 (Superseded history), ADR-0002, ADR-0004 (Superseded history), ADR-0006, ADR-0009, ADR-0010, ADR-0013 (Superseded history), ADR-0014, DG-001, DG-003, DG-006
- UI documentation index: [UI design documentation](./README.md)

## Document role

This document provides implementation guidance for the reversible Storybook pilot owned by DPL-DEC-013. It does not independently own the decision, add product scope, approve architecture, change a task definition of done, resolve a decision gate, select a package version, add a dependency, or prove that Storybook or any UI component exists. If this guidance conflicts with the decision log or implementation plan, reconcile the guidance with those authoritative owners before dependent work continues.

The [requirements specification](../REQUIREMENTS.md) remains authoritative for product behavior. Accepted ADRs own application boundaries, the [implementation plan](../IMPLEMENTATION_PLAN.md) owns task sequencing and gates, and source plus runtime evidence will be required before any story or component is reported as implemented.

## Pilot summary

TASK-003 has established the React application and workspace foundation. After TASK-010's gates and prerequisites are satisfied, TASK-010 may run a non-blocking Storybook pilot inside `apps/web` for building and reviewing isolated list UI components and their approved states. Candidate story files use strict TypeScript, remain colocated with the components they describe, and render deterministic local fixtures or intercepted exact avatar URLs rather than contact the live public API.

The candidate boundary includes component development, responsive inspection, state enumeration, and local design review. It does not include a published catalog, hosted visual-regression service, CI quality gate, test-runner selection, or production runtime dependency. The current implementation plan does not require Storybook for TASK-010, TASK-011, or TASK-012 completion.

## Implementation ownership and plan impact

- TASK-003 provides the prerequisite React and workspace foundation; it does not own Storybook installation under this pilot.
- TASK-010 is the only initial pilot owner. If activated, it may add base configuration plus list-card, list-state, sorting, and filter stories within that task's existing behavior scope.
- If the pilot is retained, TASK-011 may add detail, favorite, and comment stories, and TASK-012 may add responsive and resilient-state variants within their existing scopes.
- TASK-009 remains the owner of DG-003 resolution and is not a Storybook implementation task.
- TASK-016 and DG-004 preserve the Superseded ADR-0013 decision history. TASK-017 resolved DG-006 through accepted ADR-0014, and AUTH-001 is separately Authorized under disposition A within the recorded personal, educational, non-commercial portfolio and direct-URL scope. Local story fixtures neither prove the direct runtime character-image boundary nor constitute authorization evidence.
- TASK-013 remains the owner of adopted automated-test closure. Stories do not contribute to OR-004 or automated-test evidence unless the accepted DG-001 decision and implementation plan explicitly make them part of the test boundary.
- Storybook is not an expected artifact or completion gate in the current implementation plan. Choosing not to activate the pilot, or removing it after evaluation, does not block TASK-010 through TASK-012.

Before Storybook becomes a required artifact, validation command, or definition-of-done condition, update the exact owning tasks in the implementation plan and follow the applicable ADR workflow if the expansion crosses one of the triggers below.

## Why this workflow is useful

Static images communicate visual direction but cannot expose component properties, interactive behavior, accessibility semantics, responsive reflow, or failure states. A Storybook story can make one named state reproducible and inspectable in a browser without requiring the complete application or backend flow.

That boundary gives maintainers and Codex a shared visual feedback loop:

1. Select a documented UI state and viewport.
2. Render the component with deterministic inputs.
3. Inspect its layout, semantics, and interaction affordances.
4. Change the component or story through the active TDD workflow when production behavior is involved.
5. Recheck the same named state without inventing new data or presentation fields.

If retained, Storybook is an implementation-aligned preview surface, not a replacement for requirements, route-level behavior, GraphQL integration tests, responsive browser checks, or acceptance review.

## Candidate artifact placement

If TASK-010 activates the pilot, use these conventions unless the selected workspace or builder requires a documented adjustment:

```text
apps/web/
  .storybook/
    main.ts
    preview.ts
  src/
    ...
    ComponentName.tsx
    ComponentName.stories.tsx
```

- Keep Storybook configuration inside the web application boundary carried forward by ADR-0014.
- Use `*.stories.tsx` and strict TypeScript in accordance with ADR-0002.
- Colocate a story with the component it documents unless a page-level composition has a clearer existing owner.
- Do not create a shared workspace package solely for stories or fixtures.
- Treat Storybook packages as development dependencies; production bundles and runtime behavior must not depend on the Storybook environment.
- TASK-003 already established the package manager, runtime targets, and frontend build foundation. If TASK-010 activates the pilot, record its exact Storybook version, builder, development dependency, install command, and root script before adding those artifacts; this workflow does not select them.

## Candidate story coverage

If the pilot is retained beyond its first list-component stories, the smallest useful catalog should cover required behavior and high-risk presentation states without turning every wrapper into a story.

| Component or composition | Planned states | Governing UI intent |
|---|---|---|
| Character card | Default content, long name or species, and image failure | Show only name, image, and species; preserve a square image region and meaningful alternative text |
| Character list or grid | Populated, loading, empty, and request error | Keep required cards and recovery states readable across the selected layouts |
| Sort and filter controls | Default and applied values at mobile and desktop widths | Represent A-Z/Z-A sorting plus the adopted status, species, and gender controls without adding name, origin, or type filters |
| Character detail | Complete descriptive data, empty `type`, `unknown` values, and image failure | Show the approved detail projection and omit the complete type row when the value is empty |
| Favorite control | Off, on, pending, and mutation error | Reflect `isFavorite` without presenting a failed mutation as persisted state |
| Comment form and list | Empty, validation error, pending, request error, no comments, and populated comments | Show plain-text bodies newest-first without inventing author, timestamp, or total-count metadata |
| List and detail compositions | 375, 768, and 1280 pixel widths | Support the responsive checks selected by ADR-0009 and TASK-012 |

Do not add stories merely to increase their count. Each story must protect a named design or behavior state that is relevant to the current UI documentation, an active task, a requirement, or a confirmed regression.

## Fixture and dependency policy

- Use deterministic local fixtures shaped by the project-owned GraphQL projections in ADR-0006.
- Do not fetch the public Rick and Morty API, require a running PostgreSQL or Redis service, or make Storybook a browser path to upstream data.
- Intercept an exact ADR-0014 avatar URL with a deterministic local response when a story needs image success or failure; do not rewrite the component input to a same-origin production-style asset path.
- Display only the fields accepted by the [UI field-visibility decision](./README.md#ui-field-visibility-decision). Do not invent comment authors, timestamps, counts, or upstream-only fields to make a story appear more complete.
- Include normal baseline values such as empty `type` and literal `unknown` where the state is relevant.
- Prefer component inputs and small local adapters for stories that can remain independent of GraphQL client behavior.
- When TASK-010 creates generated frontend operation types under the client boundary selected by TASK-009, align story fixtures with those types rather than maintaining a competing handwritten client contract.
- A story that depends on GraphQL client providers, request mocking, cache behavior, mutation refetching, or error mapping must wait for DG-003 to be resolved and use the selected client boundary.

## Relationship to mockups

Before the relevant product UI components exist, lightweight interactive HTML/CSS mockups or reviewed design frames may live under `docs/ui/mockups/` and remain design intent. If the pilot is retained and a corresponding story exists, that story becomes the preferred editable component preview.

Reviewed PNG, SVG, or other static exports may remain under `docs/ui/mockups/` when they help compare or approve a design. Each export must record its viewport, status, related IDs, and source story or frame. Static exports do not replace the story, component, or runtime verification and must not be described as implementation evidence.

AI-generated images may support mood, illustration, or decorative exploration. They are not suitable as the authoritative specification for component layout, responsive behavior, interaction, accessibility, or application data.

## Decision-gate boundaries

### DG-001 - Resolved TypeScript test harness

TASK-001 resolved DG-001 through accepted ADR-0011. ADR-0011 did not select Storybook stories as an executable test boundary, and DPL-DEC-013 does not change that decision. The pilot remains outside unit, integration, application, browser-smoke, root-command, and CI evidence unless a future project-owner-approved decision and the implementation plan explicitly promote it.

The pilot boundary prohibits the following unless that accepted decision and the implementation plan authorize them:

- do not add a Storybook test runner or Vitest testing addon;
- do not treat stories as executable bindings for `SPEC-*` or `HS-*` rules;
- do not run stories as automated tests or a CI gate;
- do not claim that a rendering story satisfies OR-004, ADR-0010, or an acceptance criterion.

If future decision work proposes Storybook stories as part of the component-test boundary, it must define the runner, browser or DOM environment, commands, CI behavior, failure semantics, and relationship to other frontend tests before the integration is added, and it must supersede or amend the current accepted boundary through the governed ADR workflow.

### DG-003 - Frontend GraphQL client and query cache

TASK-009 must resolve DG-003 before TASK-010 can begin. Presentational pilot stories may remain driven by component inputs, but any story that exercises queries, mutations, cache ownership, generated operations, request mocking, or explicit detail refetching must use the client boundary selected by the accepted DG-003 decision.

Neither this document nor DPL-DEC-013 resolves pending DG-003 or changes the resolved ADR-0011 test boundary.

### DG-006 - Accepted character-image URL successor boundary

TASK-017 resolved DG-006 through accepted ADR-0014. TASK-016 remains `Complete`, DG-004 remains `Resolved`, and ADR-0013 remains `Superseded` as historical evidence. Storybook may intercept the exact governed absolute avatar URL with deterministic local success and failure responses to exercise anonymous-CORS, no-referrer, fixed-square, and one-way fallback presentation. Those fixtures must not contact the live upstream host, become a same-origin production asset path, or be treated as runtime implementation, content-rights authorization, or production delivery evidence.

This document and DPL-DEC-013 do not prove ADR-0014 behavior. [AUTH-001](../IMPLEMENTATION_PLAN.md#auth-001---character-image-content-rights-authorization) is separately `Authorized` under disposition A only within its recorded portfolio/direct-URL scope, but that authorization is not Storybook, runtime, or acceptance evidence.

## Pilot evaluation

If TASK-010 activates the pilot, record its retain-or-remove result in the decision and progress log. Use the following checks to evaluate the pilot without turning them into undeclared task completion gates:

- the configured Storybook version supports the selected React 18 and frontend builder foundation;
- Storybook starts and builds through documented web-workspace commands;
- the production web build does not include Storybook runtime code;
- stories render without the public API, PostgreSQL, or Redis;
- the visual foundation and Tailwind styles load consistently with the application;
- the stories added by the active task represent only that task's documented fields and states;
- Storybook testing or CI claims are absent unless DG-001 has explicitly selected and defined that boundary;
- GraphQL-client-dependent stories are absent unless DG-003 has been resolved and the stories use the selected client boundary.

These checks determine whether the pilot is useful enough to retain. They do not change the existing definitions of done, satisfy OR-004, or establish acceptance evidence. Any retained dependency and configuration must still pass the ordinary build, type, documentation, and task-specific verification selected by the authoritative repository manifests and exact active `TASK-*`. This document does not invent commands before those manifests exist.

## Reconsideration and ADR triggers

Remove or narrow Storybook if its configuration materially duplicates the application, its stories repeatedly drift from components, or its maintenance cost exceeds the value of isolated state review. Record that reversal in the decision and progress log.

Evaluate a dedicated ADR, or incorporate the choice into the gate-resolution ADR that owns it, before any of these expansions:

- Storybook becomes a mandatory CI or release gate.
- A hosted visual-regression or review service such as Chromatic is introduced.
- Storybook becomes a published deliverable or externally consumed design-system site.
- Multiple applications or packages depend on a shared story, addon, fixture, or component-governance architecture.
- Stories become the authoritative automated frontend-test boundary.

Until one of those triggers occurs, Storybook remains a proposed, non-blocking, local UI-development pilot recorded by DPL-DEC-013 rather than a standalone architecture decision or implementation-plan requirement.

## References

- [Storybook documentation](https://storybook.js.org/docs/)
- [Storybook UI testing documentation](https://storybook.js.org/docs/writing-tests)
- [Storybook viewport documentation](https://storybook.js.org/docs/essentials/viewport)
- [Repository documentation map](../../README.md#documentation-map)
- [Requirements specification](../REQUIREMENTS.md)
- [ADR-0001: Use a Modular Monolith Workspace (`Superseded`)](../adrs/0001-use-a-modular-monolith-workspace.md)
- [ADR-0002: Use TypeScript Across the Stack](../adrs/0002-use-typescript-across-the-stack.md)
- [ADR-0006: Define a Use-Case-Oriented GraphQL Contract](../adrs/0006-define-a-use-case-oriented-graphql-contract.md)
- [ADR-0009: Keep Frontend State Close to Its Owner](../adrs/0009-keep-frontend-state-close-to-its-owner.md)
- [ADR-0010: Use a Targeted Automated Testing Strategy](../adrs/0010-use-a-targeted-automated-testing-strategy.md)
- [ADR-0013: Materialize Character Images During Ingestion (`Superseded`)](../adrs/superseded/0013-materialize-character-images-during-ingestion.md)
- [ADR-0014: Persist and Deliver Character Image URLs Directly (`Accepted`)](../adrs/0014-persist-and-deliver-character-image-urls-directly.md)
- [Active decision gates](../IMPLEMENTATION_PLAN.md#active-decision-gates), [TASK-009](../IMPLEMENTATION_PLAN.md#task-009---resolve-the-frontend-graphql-client-gate), [TASK-010](../IMPLEMENTATION_PLAN.md#task-010---deliver-the-character-list-sorting-and-adopted-interface-filters), [TASK-011](../IMPLEMENTATION_PLAN.md#task-011---deliver-character-detail-favorites-and-comments), and [TASK-012](../IMPLEMENTATION_PLAN.md#task-012---complete-responsive-and-resilient-ui-states)
- [DPL-DEC-005, DPL-DEC-006, and DPL-DEC-013](../execution/decision-and-progress-log.md#decision-log)
- [SPEC-001 through SPEC-007 routing](../specs/README.md#codex-rule-routing)
- [UI field visibility and mockup coverage](./README.md)
- [UI visual foundations](./visual-foundations.md)
