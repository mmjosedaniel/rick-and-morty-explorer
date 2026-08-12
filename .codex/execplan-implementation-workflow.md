# Implement an ExecPlan with Worker Agents

This guide explains the repository's worker-first flow for executing a write-authorized implementation ExecPlan. It keeps the primary Codex thread focused on scope, decisions, integration, and closure while bounded workers perform the normal repository writes.

The guide is a workflow policy. It does not start a task, change product scope, resolve a decision gate, approve architecture, or prove that an implementation passes. The exact `TASK-*`, its owning ExecPlan, repository authorities, and runtime evidence remain controlling.

## When to use this flow

Use this flow when the project owner asks Codex to implement an active ExecPlan that changes application behavior, tests, configuration, or other implementation artifacts.

Do not use it to compare consequential options, prepare an ADR, or resolve a decision gate. Decision work continues to use the contract-first, primary-writer workflow in the [project-scoped agent guide](./README.md#collaboration-topology).

Before spawning a writer, the coordinator must confirm that:

- the exact `TASK-*` and active ExecPlan are named;
- task dependencies, decision gates, and authorization joins permit the assigned artifact;
- the task state and execution record allow implementation to start or continue;
- the parent session permits workspace writes, because live parent permissions can constrain spawned agents;
- the working tree and existing changes are understood; and
- every assignment has an explicit write lease and stopping condition; and
- the coordinator can start and terminally close the [automatic write-lease guard](./write-lease-guard.md) around the assignment.

## Roles

| Role | Normal permission | Responsibility | Must not do |
|---|---|---|---|
| Primary coordinator | Workspace capable, normally non-writing | Select the next slice, grant leases, inspect handoffs and diffs, route corrections, reconcile state, and own closure | Delegate scope, approval, task status, or closure ownership |
| [`test_worker`](./agents/test-worker.toml) | Workspace write | Add one smallest test, prove the intended Red state, and return concise evidence | Edit production behavior or authorize Green |
| [`code_worker`](./agents/code-worker.toml) | Workspace write | Perform explicitly assigned setup, minimum Green implementation, and behavior-preserving Refactor | Change an accepted test or start another TDD slice |
| [`independent_reviewer`](./agents/independent-reviewer.toml) | Read only | Falsify the integrated result, reproduce safe validation, and return a verdict | Edit findings, approve architecture, or close the task |

The coordinator remains the sole integration, evidence, approval-handling, and closure owner. It normally delegates repository edits to workers. If it must make an exceptional edit, it records the reason, paths, and validation in the ExecPlan or final handoff.

## Write leases

A write lease is a temporary assignment for one agent turn. The coordinator makes it executable by starting the [automatic write-lease guard](./write-lease-guard.md) immediately before the worker is spawned. The guard returns an immutable contract digest that is passed to the worker and retained by the coordinator. A lease contains:

- the exact cycle or setup mode;
- stable workflow, cycle, and lease identifiers plus the attempt number;
- allowed paths;
- forbidden paths;
- the required command and expected result;
- authority IDs and source documents;
- whether task-scoped evidence documentation may be updated; and
- stop and escalation conditions.

Only one automatic worker lease may be active in a Git worktree, and only one agent may own a path at a time. The test and code workers never write concurrently during the same Red-Green-Refactor cycle. Shared manifests, lockfiles, root configuration, schemas, lifecycle helpers, ExecPlans, execution records, and current-status documents require a single explicit owner and an ordered handoff.

After the worker stops, the coordinator terminally closes the pinned lease. Only a fresh `closed-compliant` result permits inspection and acceptance of the handoff barrier. A replayed close returns nonzero and is recovery evidence only; before accepting its original receipt, the coordinator must run pinned `status` and require `closed-compliant` with `post_close_drift: false`. A verified violation, wrong digest, tamper indication, repository mismatch, forbidden or unleased endpoint change, index or `HEAD` drift, ignore-control drift, unsupported path state, unstable scan, or guard error freezes further writes. The guard cannot attribute a concurrent writer whose final net change is wholly inside an allowed endpoint, and it never reverts work. See the operating guide for exact commands, path semantics, recovery, and proof limits.

## Correction and stopping limits

Each initial assignment may receive at most one coordinator-authorized correction. A correction is a separate guarded lease with a new lease ID, new baseline, and attempt 2; it never reopens, rebaselines, or overwrites the terminal initial lease. If the correction still fails, changes the expected behavior, needs an unleased path or dependency, crosses an authority boundary, or produces a guard violation, the worker stops and the coordinator reclassifies the work instead of continuing an unbounded loop.

A correction is counted only when the coordinator issues that new correction lease because it rejected a handoff or routed an actionable reviewer finding. The initial lease, a clarification with no new work, a new behavior slice, and a reclassification that stops the branch are not corrections.

Once Red is accepted and production work begins, its test paths stay frozen. A material test correction ends that cycle and requires a new test lease plus fresh Red evidence. The final integrated review permits at most two unsuccessful correction cycles before project-owner direction is required.

## Flow

```mermaid
flowchart TD
    A["Coordinator loads the exact TASK and ExecPlan"] --> B{"Declarative setup needed before Red?"}
    B -- "Yes" --> C["Start guarded SETUP lease and spawn code_worker"]
    C --> C1{"Terminal lease receipt compliant?"}
    C1 -- "No" --> Z
    C1 -- "Yes" --> D{"Setup validation passes?"}
    D -- "No; one correction remains" --> C
    D -- "Correction exhausted" --> Z
    D -- "Blocked or out of scope" --> Z["Stop for coordinator or owner direction"]
    D -- "Yes" --> E["Choose one observable behavior slice"]
    B -- "No" --> E
    E --> F["Start guarded test lease and spawn test_worker"]
    F --> G["test_worker writes one test and runs focused command"]
    G --> G1{"Terminal lease receipt compliant?"}
    G1 -- "No" --> Z
    G1 -- "Yes" --> H{"Coordinator accepts intended Red?"}
    H -- "Wrong failure; one correction remains" --> F
    H -- "Correction exhausted" --> Z
    H -- "Blocked or contract conflict" --> Z
    H -- "Yes" --> I["Freeze tests and start guarded GREEN lease"]
    I --> J["code_worker writes minimum production change"]
    J --> J1{"Terminal lease receipt compliant?"}
    J1 -- "No" --> Z
    J1 -- "Yes" --> K{"Focused test is Green?"}
    K -- "Code defect; one correction remains" --> J
    K -- "Correction exhausted" --> Z
    K -- "Test contract concern" --> L["Coordinator triages without edits"]
    L --> F
    K -- "Yes" --> M["Start guarded REFACTOR lease and rerun checks"]
    M --> M1{"Terminal lease receipt compliant?"}
    M1 -- "No" --> Z
    M1 -- "Yes" --> N{"More behavior slices?"}
    N -- "Yes" --> E
    N -- "No" --> O["Run relevance audit, complete validation, and documentation closure"]
    O --> P["Fresh independent_reviewer checks full state and diff"]
    P --> Q{"Verdict"}
    Q -- "REVISE" --> R["Coordinator routes each finding to its owning worker"]
    R --> P
    Q -- "BLOCKED" --> Z
    Q -- "PASS WITH FOLLOW-UPS" --> T["Coordinator dispositions every follow-up"]
    T --> U{"Any follow-up required by a task or gate?"}
    U -- "Yes" --> R
    U -- "No; record as non-blocking" --> S
    Q -- "PASS" --> S["Coordinator reconciles evidence and closes only if every gate passes"]
```

## Step-by-step operation

### 1. Establish the baseline

The coordinator follows the root [documentation map](../README.md#documentation-map), reads the owning ExecPlan and exact routed authorities, inspects the working tree, and confirms the next permitted artifact. It does not infer readiness from a plan alone. Immediately before spawning a writer, it starts the automatic guard with the exact path contract and retains the returned digest. Immediately after the worker stops, it terminally closes that pinned lease; a noncompliant or unverifiable result stops the branch before semantic handoff review.

If the ExecPlan requires manifests, test registration, or other declarative foundations before a meaningful Red can run, the coordinator gives `code_worker` a bounded, guarded `SETUP` lease. Setup validation is structural, build-based, or runtime-based; it is not an artificial TDD cycle and must not add production behavior. Ignore-control files are frozen while a lease is active; a legitimate change such as `.gitignore` maintenance is an exceptional recorded coordinator edit between leases.

### 2. Produce one valid Red

The coordinator defines one observable behavior and the correct test boundary, but leaves the smallest defensible test design to `test_worker`. The test worker writes only leased test-side paths and runs the focused command.

The coordinator first requires a compliant terminal test-lease receipt and then accepts Red only when the test fails for the intended behavioral reason. A dependency error, unrelated type failure, stale process, occupied port, or pre-existing failure is not valid Red evidence unless the ExecPlan names that condition as the target.

Every rejected Red is recorded as a false Red with the coordinator-selected reason. A test that is corrected before its first handoff is not a separate false Red because it never crossed the coordinator acceptance barrier.

### 3. Reach Green without changing the test

After accepting Red, the coordinator freezes the test-owned paths and starts a guarded `GREEN` lease for `code_worker`. The code worker receives the exact Red command and decisive failure, writes the minimum production behavior, and runs the same focused scope. Green is not accepted until the coordinator obtains the pinned lease's compliant terminal receipt.

If the code worker believes the accepted test is wrong, it returns `TEST CONTRACT CONFLICT` without modifying the test. The coordinator then decides whether the test worker must correct and re-establish Red or whether the task needs authority clarification.

The code worker must reproduce the accepted Red before editing. A different failure returns `RED MISMATCH` and freezes the lease until the coordinator has classified it.

### 4. Refactor and validate

Once Green is confirmed, `code_worker` may receive a new guarded `REFACTOR` lease. Refactor adds no behavior. The worker reruns the focused test and the proportional checks named by the coordinator. The Refactor barrier likewise requires terminal compliant closure.

The next behavior slice cannot start until the current cycle is Green, every writer lease is terminal and compliant, and its evidence is recorded in the living ExecPlan and required execution handoff. Evidence-document writes may be delegated only through a separate guarded documentation lease.

### 5. Triage failures before editing

| Failure class | Route |
|---|---|
| Wrong assertion, false Red, or requirement mismatch | Return to `test_worker`, then reproduce Red |
| Production behavior defect | Return to `code_worker` with the accepted test frozen |
| Harness, dependency, process, or infrastructure defect | Assign bounded `SETUP` work; do not weaken the test |
| Consequential architecture or scope conflict | Stop the dependent branch and follow the governing decision workflow |
| Unrelated existing failure | Record separately; it cannot serve as Red evidence |

When the failure source is genuinely ambiguous, the coordinator may request parallel read-only diagnosis, but only one guarded write lease is granted after the evidence is reconciled. A guard violation or ambiguous concurrent change is triaged before test-versus-code classification because its source cannot be attributed from endpoint state alone.

A regression is counted only after triage shows that a check which previously passed in the accepted baseline now fails because of the current workflow's change. The event carries the check's stable repository or plan-local ID so a retry cannot double-count it. A transient, infrastructure, pre-existing, or unrelated failure is not a regression.

### 6. Review and close

At a major milestone and before task closure, perform the ADR-0010 test-relevance audit, affected and complete validation, documentation-impact review, and authoritative validators required by the ExecPlan.

A fresh `independent_reviewer` then inspects the complete implementation, tests, evidence, documentation, exact diff, and immutable guard contracts and terminal receipts. It returns `PASS`, `PASS WITH FOLLOW-UPS`, `REVISE`, or `BLOCKED`. A `REVISE` finding is routed to the responsible worker under a new guarded lease, and the reviewer rechecks the complete revised state rather than only the correction.

`PASS WITH FOLLOW-UPS` does not bypass reconciliation. The coordinator must disposition every follow-up. If any item conflicts with the definition of done, a hard gate, a required validation result, or the documentation gate, route it as a correction and obtain complete fresh re-review. Only genuinely non-blocking items with an explicit owner and durable tracking may proceed to final reconciliation.

When flow metrics are available, the reviewer checks their classifications against the handoffs and evidence. Missing lifecycle events, elapsed intervals, or token values are coverage gaps rather than review findings and cannot change the verdict.

After two unsuccessful final-review correction cycles, stop and ask the project owner for direction. The coordinator alone decides whether the final evidence satisfies the task and documentation gates; a worker or reviewer report cannot close the task.

## Concise handoffs

Workers return the fixed sections defined in their TOML contracts. They should provide exact commands, exit codes, and only the decisive output needed to recognize the result. Raw installation logs, complete stack traces, and repetitive test output stay in the worker thread unless the coordinator requests a specific excerpt.

The coordinator terminally closes the pinned lease, reviews the actual changed files, and does not treat a worker summary or nonterminal verification as self-validating proof. This separation keeps the primary context small without weakening evidence ownership.

## Flow metrics

The coordinator follows the [agent-flow metrics policy](./agent-flow-metrics.md) as an observational sidecar. It creates one stable workflow ID, one task identity, one cycle ID per behavior slice, and one lease ID per assignment. Project hooks capture sanitized lifecycle timestamps for the implementation roles, while the coordinator records semantic barriers such as accepted or rejected Red, correction requests, and confirmed regressions. Every completion and correction repeats the complete assignment identity; a correction uses a new lease ID and attempt 2 exactly.

Metrics recording is best effort and deliberately outside the write-lease graph. Workers echo correlation IDs but never edit metrics runtime data. Exact logical replays are counted once and reported; conflicting workflow/task, correction/lease, linked-token role, lifecycle-turn, Red, regression-check, token-report, or time identities are excluded and reported as dataset errors. If a hook is untrusted, Python is unavailable, an event cannot be written, an event conflicts, or an interval or token value is missing, the coordinator reports incomplete or invalid coverage and continues the repository workflow. Metrics never authorize Green, satisfy a test or review, alter task status, or replace the ExecPlan and execution evidence.

Automatic lease verification is different: it is a blocking handoff control owned by the coordinator. A metrics failure remains a coverage gap; a guard failure freezes the write branch. The guard is invoked synchronously around workers and is not implemented through the asynchronous project hooks.

## Copy-paste prompt example

Replace `<TASK_ID>` and `<EXECPLAN_PATH>` before running this prompt. The named task must already be authorized to start or continue.

```text
Implement <EXECPLAN_PATH> for <TASK_ID> using the repository's worker-first
ExecPlan implementation workflow in .codex/execplan-implementation-workflow.md.
This request authorizes in-scope local repository writes and non-destructive
validation, but it does not authorize destructive actions, external writes,
new product scope, architecture decisions, gate resolution, or owner-controlled
approvals.

Act as the primary coordinator and final closure owner. Keep the primary context
focused: normally delegate edits and detailed command execution to the workers,
receive their fixed concise handoffs, inspect the actual diffs, and write directly
only when a safe integration edit cannot be delegated. Record any exceptional
primary-thread edit and its reason.

Before implementation:
1. Follow the documentation map and read the exact task, active ExecPlan, mapped
   requirements, accepted ADRs, active gates, SPEC/HS rules, current evidence,
   and repository state.
2. Confirm that dependencies, gates, authorization joins, task state, permissions,
   and the working tree allow the next artifact. Stop with evidence if they do not.
3. Identify any declarative bootstrap needed before the first meaningful Red.
   Perform and record legitimate ignore-control maintenance as an exceptional
   coordinator edit before a worker baseline. Assign the remaining setup to
   code_worker under an exact guarded SETUP lease and validate it without adding
   production behavior.
4. Create one stable workflow ID and best-effort record workflow_started using the
   agent-flow metrics policy. Use stable cycle and lease IDs in every assignment.

For each behavior slice, complete exactly one Red-Green-Refactor cycle:
1. Define the observable behavior, correct test boundary, focused command,
   expected failure class, authority IDs, allowed paths, forbidden paths, and stop
   conditions.
2. Start the automatic write-lease guard with the exact paths, retain its contract
   digest, and send that pinned lease to test_worker. Require one smallest test and
   its structured handoff. After the worker stops, terminally close the pinned
   lease. Only a fresh `closed-compliant` result permits diff inspection and Red
   acceptance. If close reports `already_closed`, require pinned status to return
   `closed-compliant` with no post-close drift before using the original receipt.
   Accept Red only when the command fails for the intended behavioral reason.
   Record red_accepted or red_rejected with its reason. Return invalid Red through
   a new correction lease and fresh baseline.
3. Freeze the accepted test paths. Start and send code_worker a guarded GREEN lease containing the
   exact accepted Red evidence. Prohibit test edits and require only the minimum
   production change. If it reports TEST CONTRACT CONFLICT, triage before any edit.
   Terminally close the pinned lease and require a compliant receipt before Green.
4. After Green, start a new guarded REFACTOR lease that permits no new behavior and
   requires the focused and proportional checks. Terminally close it and require a
   compliant receipt. Do not start the next slice until the current cycle is Green
   and its evidence is recorded.

Grant only one active guarded worker lease per worktree and one writer ownership of
a path at a time. Never run test_worker and code_worker concurrently on the same
cycle. Give every worker the lease ID and immutable contract digest, and prohibit
workers from invoking the guard or editing its ignored state. Use separate guarded
documentation leases to have the worker that owns the evidence update the living
ExecPlan or execution record, but do not let a worker change task, gate, ADR,
authorization, requirement, or acceptance state.

If verify or terminal close reports any violation, wrong digest, tamper, repository
mismatch, forbidden or unleased endpoint change, index or HEAD drift, ignore-control drift,
unsupported state, or unstable scan, freeze writes. Do not revert automatically or
rebaseline the lease. Reconcile the tree and last accepted barrier, terminally
disposition the prior lease when the pinned CLI can do so, and use a new lease ID plus
fresh baseline only for a supported correction. If `start` does not return a valid
`started` JSON object and contract digest, do not spawn or reuse the ID: treat the
state as ambiguous. The current CLI has no force-recovery operation; irrecoverable
active state requires separately authorized coordinator recovery.

After each spawn, best-effort record lease_started with its complete task, cycle,
lease, phase, attempt, agent, and role identity; after the handoff, record
lease_completed with the same identity. Record correction_requested only for
additional work caused by a rejected handoff or actionable reviewer finding, using
the new correction lease ID, the same assignment identity, and attempt 2. Record
regression_confirmed only after
triage proves that the current change broke a check that passed in the accepted
baseline, and include that check's stable workflow-wide ID. Supply token counters only when the
runtime reports exact values; never estimate them or parse transcripts. A metrics
failure is a coverage gap and must not interrupt or change the workflow.

When a test or broader validator fails, freeze writes and classify the failure as
test contract, production behavior, setup/infrastructure, unrelated existing
failure, or authority conflict. Route only the supported correction. Stop the
dependent branch for a consequential scope or architecture conflict.

At the final milestone, run the test-relevance audit, all task-authoritative checks,
the documentation-impact gate, and repository validators. Spawn a fresh read-only
independent_reviewer to inspect the complete final state and exact diff, reproduce
safe validation, and return a verdict. Route REVISE findings to the owning worker
and request complete re-review. For PASS WITH FOLLOW-UPS, disposition every item;
if any item conflicts with the definition of done, a hard gate, required validation,
or the documentation gate, route it as a correction and request complete re-review.
Track only genuinely non-blocking follow-ups with an explicit owner. After two
unsuccessful final-review correction cycles, stop for project-owner direction.

Close the task only after the definition of done, runtime evidence, documentation
gate, and final reconciliation all pass. The final handoff must list each Red,
Green, and post-Refactor command, every lease ID, contract digest and terminal
receipt result, the reviewer verdict, residual risks, skipped or blocked checks,
every follow-up disposition, and one explicit Documentation impact result.
Best-effort record workflow_completed, generate the metrics summary, and
report corrections, false Reds, confirmed regressions, elapsed coverage, exact token
coverage, and any telemetry gaps separately from implementation evidence.
```

## Related authorities

- [Repository guidelines](../AGENTS.md)
- [ExecPlan convention](../PLANS.md)
- [Canonical implementation plan](../docs/IMPLEMENTATION_PLAN.md)
- [ADR-0010 testing strategy](../docs/adrs/0010-use-a-targeted-automated-testing-strategy.md)
- [Project-scoped agent registry and decision workflow](./README.md)
- [DPL-DEC-014 worker-first implementation decision](../docs/execution/decision-and-progress-log.md)
- [Agent-flow metrics policy](./agent-flow-metrics.md)
- [DPL-DEC-015 metrics decision](../docs/execution/decision-and-progress-log.md)
- [Automatic write-lease guard](./write-lease-guard.md)
- [DPL-DEC-016 automatic lease decision](../docs/execution/decision-and-progress-log.md)
- [Official OpenAI documentation for Codex subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [Official OpenAI documentation for Codex hooks](https://learn.chatgpt.com/docs/hooks)
