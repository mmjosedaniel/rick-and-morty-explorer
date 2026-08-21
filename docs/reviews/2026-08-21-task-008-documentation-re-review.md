# TASK-008 Documentation Re-review — 2026-08-21

- Review status: Complete — `PASS`
- Review scope: Post-closure correction of the documented `addCharacterComment` operation and preservation of TASK-008 acceptance history
- Product candidate: unchanged authenticated aggregate `58A8808786F45D5195FE441FD48D89E1AC0DBA644A37DA75DDCFF41DEDB9413B`
- Predecessor: [TASK-008 acceptance review](./2026-08-21-task-008-acceptance-review.md)
- Owning execution record: completed [TASK-008 ExecPlan](../plans/completed/TASK-008-persist-favorite-and-comment-mutations.md)

## Verdict

`PASS`. The independently reported Minor documentation finding is resolved. The README `AddCharacterComment` example now requests only `id` and `body`, exactly matching [ADR-0006](../adrs/0006-define-a-use-case-oriented-graphql-contract.md) and the implemented [GraphQL schema](../../apps/api/src/transport/graphql/schema.ts).

No Blocker, Major, or Minor remains in this documentation re-review. TASK-008 remains `Complete`; AC-004 and AC-005 remain unchecked; TASK-011 remains `Pending`; minimum-assessment readiness remains `Fail` at 7/12.

## Preserved finding

The independent post-closure review returned `REVISE` with one Minor because the README comment mutation selected persistence-only `characterId` and `createdAt` fields that the public `Comment` type does not expose. Direct schema validation reported:

- `Cannot query field "characterId" on type "Comment".`
- `Cannot query field "createdAt" on type "Comment".`

The original acceptance review remains preserved as the implementation and runtime assessment. This re-review supersedes only its documentation-closure conclusion for the invalid example and records the corrected current state.

## Correction

The README example removed only the unsupported `characterId` and `createdAt` selections. It retains the accepted mutation name, variables, arguments, and public `Comment` fields:

```graphql
mutation AddCharacterComment($characterId: ID!, $body: String!) {
  addCharacterComment(characterId: $characterId, body: $body) {
    id
    body
  }
}
```

No source, test, generated type, schema, requirement, ADR, task dependency, acceptance status, or external state changed.

## Verification evidence

- Exact README fenced-operation validation against the implemented `typeDefs`: pass; both documented mutations parse and validate with zero GraphQL errors.
- Documentation validation: pass for 73 Markdown files, 41 requirement IDs, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 123 scenarios.
- ADR validation: pass for 18 ADRs and 38 mapped requirements, with only the established NFR-006 warning.
- `git diff --check`: pass with line-ending notices only.

The independent review also reported fresh passing typecheck, build/GraphQL drift, 174 unit tests, 25 application tests, Tailwind validation, documentation/ADR validation, and diff checking. Its unchanged-candidate integration 77/77, Chromium 1/1, and lifecycle 7/7 evidence was reused while Docker was stopped. This documentation correction does not promote or alter those product/runtime claims.

## Documentation impact

Updated the README mutation example, this current re-review, the review and plan indexes, the completed TASK-008 ExecPlan, root review navigation, and the append-only execution chronology. The predecessor acceptance review remains unchanged as historical evidence. No implementation-plan status, requirements, ADR substance, system/specification state, readiness count, TASK-011 activation, commit, push, PR, publication, or deployment changed.
