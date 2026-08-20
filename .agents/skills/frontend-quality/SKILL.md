---
name: frontend-quality
description: Plan, implement, or review visible frontend UI in this repository with an accepted reuse audit, repository-owned visual direction, accessible states, and real-browser evidence. Use for rendered components, CSS, layout, or presentation interactions; do not use for backend work or nonvisual frontend configuration, generated types, data access, or routing logic.
---

# Frontend Quality

Apply a narrow frontend-visual overlay without changing the repository's standard worker-first workflow. Product requirements, accepted ADRs, the exact `TASK-*`, routed `SPEC-*` and `HS-*` rules, and repository UI documents always override general design preferences.

## Decide whether the frontend-visual overlay applies

Use `frontend-visual` only when the coherent milestone contract materially changes rendered components, CSS, layout, visual hierarchy, responsive presentation, or visible interaction states. Use `standard` for backend work and for frontend setup, generated types, data-access code, cache behavior, or routing logic that has no material presentation contract.

When a proposed milestone mixes separable visual and nonvisual outcomes, split it into coherent milestones. When they cannot be separated without making the observable contract artificial, use `frontend-visual` and state why. A file's location under `apps/web` does not select the profile by itself.

The standard route is implicit and keeps the existing packet unchanged. Do not add a profile marker, reuse audit, visual capsule, or browser-evidence obligation to a standard milestone. The frontend-visual overlay changes only the Green implementation worker and adds the evidence below. It does not change test ownership, Red-Green-Refactor order, write leases, correction budgets, risk routing, review authority, task scope, or closure gates.

## Prepare the frontend-visual capsule

Before test preflight, the primary coordinator either performs or accepts a bounded read-only reuse audit and accepts a capsule containing:

- exact UI/design authority anchors and explicit non-goals;
- a reuse-audit evidence ID and one disposition for every required component or style;
- the required populated, loading, empty, error, pending, image-failure, or other states that belong to the exact milestone;
- the named viewport and interaction matrix needed by the current task, without claiming downstream responsive closure;
- the browser or visual-evidence target and its reproducibility identity; and
- prohibited scope, dependencies, fields, copy, themes, effects, or animations.

Missing capsule fields stop a `frontend-visual` Green. They do not authorize the implementation worker to design the contract.

Before writing, the frontend worker confirms that every cited reuse path and evidence identity still matches the assigned tree. Drift stops the assignment for coordinator reconciliation; it does not let the worker change a disposition.

## Audit reuse before implementation

Inspect only the relevant component, route, style, token, fixture, story, test, dependency, and shared-package boundaries. For every required element, cite exact paths and record one disposition:

| Disposition | Use when |
|---|---|
| `REUSE_AS_IS` | An existing artifact satisfies the contract without modification. |
| `EXTEND` | One existing owner can satisfy the contract with a bounded change. |
| `EXTRACT_LOCAL` | Current concrete duplication justifies one task-local shared artifact. |
| `CREATE` | No current artifact can satisfy the contract within its accepted responsibility. |

Search absence alone does not prove `CREATE`; inspect the relevant ownership boundary. Do not introduce a shared package, design system, primitive layer, or generalized variant API for hypothetical consumers. If implementation evidence contradicts the accepted disposition, stop for coordinator reconciliation instead of silently changing it.

## Implement the accepted visual contract

- Preserve the repository's documented palette, typography, spacing, semantics, component ownership, and information hierarchy. Do not replace an existing visual direction with a generic taste framework.
- Keep the smallest complete component surface. Avoid repeated nested cards, decorative gradients, glass, glow, badges, oversized headings, arbitrary asymmetry, or motion unless the product-specific contract justifies them.
- Do not invent content, data fields, controls, metadata, empty-state promises, or fake product complexity to make a screen look complete.
- Use semantic elements and accessible names. Preserve visible keyboard focus, operable targets, meaningful alternative text, sufficient contrast, text reflow, and non-color status cues where the mapped requirements apply.
- Add motion only when the owning task requires or explicitly accepts it. Keep it functional, respect reduced-motion preferences, and add no animation dependency without separate authority.
- Implement every state in the capsule, but do not pull states owned by a later task into the current milestone.
- Treat Storybook as an optional component preview under its recorded repository decision. It is not executable acceptance evidence unless a later authoritative decision changes that boundary.

## Produce proportional visual evidence

Use component or route tests for observable semantics and state transitions. Use a real browser for claims that jsdom cannot prove, including layout, responsive reflow, focus appearance, image rendering or fallback, browser navigation, and horizontal overflow.

At the assigned milestone barrier, inspect only the named viewports and states. Record the application build or source identity, browser and viewport, deterministic fixture or runtime identity, interaction performed, decisive result, and screenshot path or evidence ID when a screenshot materially helps review. Check console or network behavior only when the task contract includes it.

A screenshot is supporting point-in-time evidence, not a golden specification or substitute for tests. Image generation may support exploration only when explicitly authorized; it does not own component behavior, responsive rules, accessibility, or application data.

## Review independently

The implementation worker must not self-approve visual quality. The existing risk-routed reviewer checks the accepted reuse dispositions, scope, UI authorities, state matrix, executable evidence, and real-browser evidence. Report only actionable findings tied to a requirement, design authority, exact path, browser observation, or reproducible command.

Keep skill-specific evidence inside the role's existing handoff format. This skill does not replace the `Milestone Assignment Packet v2`, worker outcome contract, reviewer verdict, or task-closure documentation gate.
