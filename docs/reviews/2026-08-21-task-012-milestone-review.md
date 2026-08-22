# TASK-012 Milestone Review — 2026-08-21

- Review status: Complete — `REVISE`
- Review scope: TASK-012 Milestone 1 responsive and resilient list/detail presentation
- Candidate: `78AEC4BA8A58D6EDA0EE84DC7A6AABFCAC28169F46C6BBB9EF4D71081625F237` over the ordered 21-path TASK-012 projection
- Owning evidence: active-at-review [TASK-012 ExecPlan](../plans/completed/TASK-012-responsive-and-resilient-ui-states.md), now archived after task closure

## Verdict

`REVISE`. The verdict is not closure-permitting for Milestone 1. No Blocker was found. One Major coverage finding prevents the current browser evidence from proving the required responsive detail-state matrix, and one Minor identifies a stale introductory sentence in the living ExecPlan.

The review passes the TASK-012 authority, scope, reuse, TDD, lease, generated-file, product fallback, accessibility, exact-text, no-alternate/no-retry, executed request/diagnostic/cleanup, and test-relevance boundaries. AC-006 remains incomplete because the smoke does not execute every required detail state at the selected viewports.

## Review matrix

| Review area | Result | Decisive evidence |
|---|---|---|
| Authority and scope | Pass | TASK-012, NFR-001, NFR-002, NFR-005, AC-006, adopted OR-004, ADR-0009, ADR-0014, ADR-0016, AUTH-001, SPEC-007, HS-016, HS-017, and the UI authorities remain aligned. |
| Candidate and guarded workflow | Pass | Aggregate `78AEC4BA...25F237`, all six supplied hashes, five terminal compliant receipts, rejected pre-lease attempts, and the zero-active-lease state reproduce. |
| Product fallback | Pass | Card/detail state is component-local and keyed to the current URL; the exact governed native image attributes remain on success; the fallback preserves character identity, exact visible `Image unavailable`, square CSS, no alternate source, and no application retry. |
| Reuse and proportionality | Pass | Existing card, detail, style, semantic-test, and smoke owners were extended. No component, hook, shared abstraction, dependency, fixture, project, or process owner was added. |
| Executed Chromium scope | Pass for what ran | Run `c0a9c55f982aa0f1` passes 1/1 with list loading/empty/error-retry at 375/768/1280, populated list at all widths, populated detail at 1280/375, failed-image card/detail at all widths, request constraints, zero overflow in the asserted states, clean unexpected diagnostics, and exact cleanup. |
| Required responsive detail-state matrix | Fail — Major | The smoke does not execute initial detail loading, not-found, or request-error/retry at any selected width, does not execute populated detail at 768, and does not assert the successful native image's rendered square geometry. |
| Documentation currentness | Fail — Minor | The living ExecPlan introduction still said implementation and validation were pending after implementation and milestone validation had occurred. |
| Closure boundary | Pass | Milestone 1, AC-006, task closure, commit, push, pull request, publication, and deployment remain withheld. |

## Findings

### Major — Required detail-state browser matrix is absent

The active ExecPlan requires list and detail loading, empty/not-found, error/retry, populated, and image-failure behavior across 375 by 812, 768 by 1024, and 1280 by 800. The smoke's `exerciseRequiredStates` helper covers only list loading, empty, and error/retry. Populated detail runs only at 1280 and 375; failed-image detail runs at all three widths. No initial detail loading, not-found, or request-error/retry browser scenario exists at any required width, populated detail at 768 is absent, and successful native images have no rendered square-box assertion comparable to the fallback.

The smallest remediation is one bounded extension of the existing smoke owner: deterministic detail loading, not-found, and error/retry at all three widths; populated detail at 768; recovery/overflow checks; and successful native-image square geometry. One fresh isolated smoke with exact cleanup and a refreshed aggregate must then receive independent confirmation. No product change is currently indicated.

### Minor — ExecPlan introduction was stale

The ExecPlan introduction said implementation and validation remained pending while its status, Progress, Outcomes, and evidence sections recorded completed implementation and milestone validation. The primary corrected that sentence while recording this verdict; no product or test byte changed.

## Validation evidence

The fresh read-only reviewer independently reproduced the candidate and supplied hashes; authenticated the five terminal compliant receipts; confirmed the generated working/HEAD blob `3d4caf9e4558fe36dd7165b54a99153690a11330` and exact `text eol=lf` attribute; and passed documentation validation, ADR validation with only the established NFR-006 warning, `git diff --check`, scope audits, focused/skipped-test searches, test-only production-branch searches, and generated logical-drift checks.

The reviewer reused web unit/application 63/63, root typecheck, web build with GraphQL drift, Tailwind validation, and Chromium run `c0a9c55f982aa0f1` only for their actual executed scope. Failed runs `9bdd0bf6aacd4bf0` and `888867d5ae65c193` remain rejected as acceptance evidence.

## Residual boundaries

- Detail loading, not-found, request-error/retry, and recovery layout remain unverified at the required widths.
- Populated detail at 768 and successful native-image rendered square geometry remain unverified.
- The passing screenshots do not cover the missing detail states and are not substitutes for deterministic browser assertions.
- No correction budget remains. A new test write requires explicit project-owner authorization.
- AC-006, TASK-012 closure, commit, push, pull request, publication, and deployment remain unclaimed.

## Documentation impact

The primary records the non-closure-permitting verdict, corrects the overstatement that the smoke covered the complete list/detail matrix, resolves the stale ExecPlan introduction, and preserves the smallest next action. TASK-012 remains `In progress`; AC-006 and readiness do not change. No requirement wording, ADR substance, task dependency, product/test byte, commit, push, pull request, publication, or deployment changes during this reconciliation.

## Owner disposition — 2026-08-22

The project owner explicitly authorized the review's smallest remediation as one bounded evidence correction. The persistent test worker may change only `tests/smoke/walking-skeleton.smoke.test.ts` to add deterministic detail loading, not-found, request-error/retry, populated-768, recovery/overflow, and successful native-image square-geometry coverage. The primary must run one fresh isolated smoke, refresh the aggregate, and return to the same reviewer for finding-specific confirmation. No product change or further correction budget is authorized. This disposition does not alter the historical `REVISE` verdict or advance Milestone 1 or AC-006.

## Correction acceptance — 2026-08-22

The primary accepted assignment `TASK-012-M1-DETAIL-MATRIX-EVIDENCE-01` after closed-compliant lease receipt `2d7ba3857e8716f682590169014fa2864656758d4870d671a57862372f1e076c`. Only `tests/smoke/walking-skeleton.smoke.test.ts` changed; its SHA-256 is `CC2FB736A546B473255C3C65948965C08FFA0E684B27B2A3C94D75BEE6FB0527`. Static diff checking and root typecheck pass, and all frozen product/component-test hashes remain unchanged. This is accepted test evidence construction only: no browser pass, corrected aggregate, Major closure, Milestone 1, or AC-006 result is claimed until the primary's one fresh isolated smoke and this reviewer's finding-specific confirmation pass.

## Runtime stopping record — 2026-08-22

The primary's sole authorized `npm run test:smoke` attempt exited 1 before Playwright/Chromium began. The web and API builds passed, but fixture setup could not connect to PostgreSQL `127.0.0.1:55432` or Redis `127.0.0.1:56400`; cleanup reported the same refused endpoints. A subsequent read-only audit found the Docker daemon unavailable and no listeners on 4173, 4174, 55432, or 56400. This is invalid environment evidence, not a test or product acceptance result, and it created no corrected aggregate. The explicit stop condition now withholds rerun and finding-specific review pending project-owner direction; the historical `REVISE` verdict, open Major, Milestone 1, TASK-012, AC-006, and 10/12 readiness remain unchanged.

## Replacement runtime authorization — 2026-08-22

The project owner explicitly authorized continuation after receiving the complete unavailable-service stopping record. The primary may start Docker Desktop, wait for the repository's isolated PostgreSQL/Redis services to become ready, and run the unchanged corrected smoke exactly once. A pass permits aggregate refresh and finding-specific confirmation by this same reviewer; any replacement test or cleanup failure stops again. No product, test, configuration, dependency, fixture, lifecycle, or documentation-contract correction and no additional runtime attempt is authorized.

## Replacement runtime evidence — 2026-08-22

After Docker 29.7.2 started and the existing PostgreSQL/Redis Compose services became healthy on 55432/56400, the unchanged smoke hash `CC2FB736...B0527` passed Chromium 1/1 in 6.6 seconds. Run `3d93ab11065f7744` used schema `t010_smoke_3d93ab11065f7744`, namespace `character-app:test:t010-smoke-3d93ab11065f7744`, and migration build `66b43bbb...61abce`. The complete corrected list/detail state, recovery, overflow, native-image, and fallback geometry assertions executed at 1280 by 800, 768 by 1024, and 375 by 812. Diagnostics report `pageErrors=0`, `deliberateGraphqlFailures=3`, `allowedGraphql503=3`, and `unexpectedConsoleErrors=0`; matching READY/CLEANUP and independent empty schema/namespace and web-port audits confirm cleanup. The refreshed 21-path candidate is `D4E87CBED378F8C60A97714F46194D68E1515BB999968D00C49CE903A3FE3983`. The historical verdict and Major remain open until this same reviewer completes finding-specific confirmation.

## Finding-specific confirmation — 2026-08-22

The same independent reviewer reproduced candidate `D4E87CBED378F8C60A97714F46194D68E1515BB999968D00C49CE903A3FE3983` and returned closure-permitting `PASS WITH FOLLOW-UPS` with zero Blockers, zero Majors, and one Minor. The prior Major is closed: the smoke executes detail loading, not-found with navigation recovery, request error with successful Retry, populated detail, and overflow at 1280/768/375, and asserts rendered square geometry for native list/detail images while preserving every fallback, request-count, same-URL/no-retry, diagnostic, public-request, focus, and cleanup assertion. Receipt, frozen hashes, prior-candidate reconstruction, corrected run identity, and cleanup evidence all reproduce. The sole documentation-currentness Minor identified stale introductory ExecPlan status; the primary synchronized that header while recording this confirmation. Milestone 1 is accepted on the corrected candidate. Closure validation, integrated review, task documentation closure, AC-006, commit, push, pull request, publication, and deployment remain pending or unauthorized.
