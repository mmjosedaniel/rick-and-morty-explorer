# Automatic Write-Lease Guard

The automatic write-lease guard makes the worker-first path contract verifiable. The primary coordinator captures one immutable repository baseline immediately before a write-capable worker starts and terminally closes that exact lease after the worker stops. A handoff barrier may advance only when closure returns a compliant receipt.

The guard is a repository workflow control. It does not decide whether a test is valid, prove product behavior, replace review, isolate operating-system permissions, or identify which process made a change. It never resets, restores, stages, commits, deletes, or otherwise repairs repository work.

The dependency-free Python implementation is repository workflow tooling, not application source, a product test harness, or TASK-003 implementation evidence. Python is used because the repository has no executable Node workspace until TASK-003 creates the accepted TypeScript scaffold.

## Lifecycle

```mermaid
flowchart LR
    A["Coordinator defines exact path scope"] --> B["start captures baseline and contract digest"]
    B --> C["One worker writes under the pinned lease"]
    C --> D["Coordinator may run verify"]
    D --> E["close writes terminal receipt"]
    E --> F{"Receipt outcome"}
    F -- "compliant" --> G["Coordinator may inspect and accept the handoff barrier"]
    F -- "violated" --> H["Freeze writes and triage without automatic revert"]
    H --> I["Reconcile the tree and open a new correction lease"]
```

Only one worker lease may be active in one Git worktree. Independent work can use separate Git worktrees with separate baselines. The worker receives the lease ID, contract digest, allowed paths, and forbidden paths, but never invokes the guard or edits its runtime records.

## Commands

Run commands from the repository root in PowerShell. `start` emits JSON; retain its `contract_digest` exactly:

```powershell
$lease = python -B .codex\leases\lease_guard.py start `
  --workflow-id TASK-003-20260812-01 `
  --task-id TASK-003 `
  --cycle-id TASK-003-20260812-01-cycle-01 `
  --lease-id TASK-003-20260812-01-cycle-01-red-01 `
  --phase red `
  --attempt 1 `
  --owner test-worker-01 `
  --agent-type test_worker `
  --allow-file apps/web/src/shell.test.tsx `
  --allow-dir-root apps/web/src/test-fixtures `
  --forbid-dir-root apps/api `
  --forbid-dir-root docs | ConvertFrom-Json

$leaseDigest = $lease.contract_digest
```

The coordinator may inspect a nonterminal result without accepting the handoff:

```powershell
python -B .codex\leases\lease_guard.py verify `
  --lease-id TASK-003-20260812-01-cycle-01-red-01 `
  --contract-digest $leaseDigest
```

After the worker stops, terminally close the lease:

```powershell
$closeResult = python -B .codex\leases\lease_guard.py close `
  --lease-id TASK-003-20260812-01-cycle-01-red-01 `
  --contract-digest $leaseDigest | ConvertFrom-Json
$closeExit = $LASTEXITCODE

if ($closeExit -ne 0 -or $closeResult.status -ne "closed-compliant" -or $closeResult.already_closed) {
  throw "The lease did not produce a fresh compliant closure."
}
```

`status` validates the pinned contract and reports whether a receipt exists. For a closed lease, `terminal_receipt` preserves the immutable closure outcome while `post_close_drift`, `post_close_drift_details`, and `current_changes_from_baseline` describe later repository movement. Post-close drift exits nonzero without rewriting the receipt:

```powershell
$statusResult = python -B .codex\leases\lease_guard.py status `
  --lease-id TASK-003-20260812-01-cycle-01-red-01 `
  --contract-digest $leaseDigest | ConvertFrom-Json
$statusExit = $LASTEXITCODE
```

If `close` reports `already_closed: true`, it returns nonzero because it replayed an existing receipt rather than performing fresh verification. It may release only a stale active pointer matching that receipt. Before accepting the original receipt, require `$statusExit -eq 0`, `$statusResult.status -eq "closed-compliant"`, and `$statusResult.post_close_drift -eq $false`.

Run the isolated standard-library test packet without touching the current repository state:

```powershell
python -B .codex\leases\lease_guard.py self-test
```

All commands return one JSON object. Exit `0` means the requested operation is valid and compliant. Exit `1` means verified noncompliance for the requested view: an active or terminal violation, or post-close drift. Exit `2` means invalid command input. Exit `3` means missing, replayed, conflicting, malformed, tampered, unstable, or otherwise unverifiable guard or Git state. Inspect the JSON fields rather than interpreting the code alone. Every nonzero result freezes workflow advancement until the coordinator triages it.

## Scope Rules

- `--allow-file` matches one exact repository-relative path. An existing endpoint must be an ordinary file; a missing endpoint may be created as a file during the lease.
- `--allow-dir-root` matches the named directory and descendants on path-component boundaries. `src` never matches `src2`. An existing root must be an ordinary directory, and a root created during the lease must remain a directory.
- `--forbid-file` and `--forbid-dir-root` use the same matching rules and always override an allowed scope.
- A named scope that Git already ignores is rejected because its endpoint cannot be verified. Ignored descendants inside an otherwise observable directory root remain outside the proof boundary; use narrow source scopes and never rely on the guard to constrain generated ignored output.
- Repeat an option to name multiple paths. Use `/` as the portable separator. Globs, absolute paths, drive-relative paths, empty components, traversal, `.git`, and the guard runtime directory are rejected. On Windows, control characters, alternate-data-stream colons, trailing periods or spaces, and reserved device basenames are also rejected.
- A rename is conservatively observed as deletion plus creation. Both endpoints must be allowed and neither may be forbidden.
- Windows ASCII path comparison is case-insensitive and non-expanding; non-ASCII spelling remains exact so Unicode folding cannot authorize a different endpoint. Case-colliding observed paths fail closed.
- The worker may not stage or commit. Logical Git-index content or flag drift, `HEAD` object drift, and symbolic branch/detachment drift are violations even when worktree bytes remain allowed.
- Ignore controls are frozen because changing them could hide new files from the endpoint scan. Every tracked `.gitignore` and every applicable `.gitignore` below a non-ignored parent is sealed even when it ignores itself. Controls below a parent that Git already ignores remain outside the proof boundary. A sealed `.gitignore`, `.git/info/exclude`, explicit `core.excludesFile`, effective implicit XDG/HOME global excludes file, or relevant Git setting change is a violation even when the file path was listed as allowed. Legitimate ignore maintenance is an exceptional coordinator edit performed and recorded between worker leases.
- Existing symbolic links, junctions, or reparse points in a scope or a non-ignored scanned endpoint fail closed. The fixed runtime path, each lease directory, and contract, receipt, and active-pointer endpoints must retain ordinary topology. Gitlinks, submodules, nested repositories, and special files are unsupported rather than partially verified.

The baseline includes Git-tracked files and untracked, non-ignored files. It hashes working-tree endpoint content rather than comparing only with `HEAD`, so a second change to a file that was already dirty before the worker started is still detected.

## Terminal Results and Recovery

A fresh compliant `close` writes an immutable receipt, releases the worktree's active pointer, and permits coordinator inspection of the Red, Green, Refactor, setup, or evidence-document barrier. A successful command does not make the barrier correct by itself; the coordinator still reviews the actual diff and command evidence. Repeating the same pinned `close` is state-safe but returns nonzero with `closed-replayed`; it does not freshly validate the worktree. If receipt publication succeeded but active-pointer release failed, that retry may release only its matching stale pointer, after which pinned `status` must confirm the original compliant receipt and absence of post-close drift.

A policy violation writes a terminal `violated` receipt, releases the active pointer, and exits nonzero. The coordinator freezes writes, identifies the unexpected, forbidden, concurrent, index, `HEAD`, or ignore-control change, and decides whether the handoff is rejected. The guard never attributes or reverts the change. After the tree is reconciled and the last accepted workflow barrier is re-established, a supported correction uses a new lease ID and a fresh baseline. Never reuse or redefine the prior lease.

An integrity or inspection error may be retried only after the underlying state is stable and understood. Controlled `start` failures attempt to remove their unpublished contract directory and matching reservation, but the current CLI does not attest that rollback in its error output. If `start` is interrupted or does not return a valid `started` object and contract digest, do not spawn a worker or reuse the ID: the state is ambiguous. Once `start` returns a digest, never reuse or redefine that lease ID. The CLI intentionally has no force-recovery command. Do not bypass a wrong digest, rewrite runtime JSON, or delete a live pointer merely to continue. Irrecoverably missing, tampered, or ambiguous active state requires separately authorized coordinator recovery recorded in the ExecPlan or execution log before any replacement baseline.

## State, Privacy, and Proof Boundary

Runtime data lives under the already ignored `logs/agent-flow-leases/v1/` directory. A lease stores identifiers, normalized scope, repository identity, `HEAD` object and symbolic reference, Git-control digests, path names, and SHA-256 content digests. It stores no prompts, messages, command output, secrets, or file contents. Contracts and receipts are write-once and digest-pinned; this is tamper-evident workflow state, not an operating-system security boundary against a malicious same-user process.

The guard proves net endpoint state between baseline and inspection. It cannot prove that a file was changed and restored byte-for-byte before closure. Ignored descendants, empty directory creation, Windows alternate data streams, access-control lists, extended attributes, and targets outside the worktree are outside its proof boundary. Concurrent forbidden or unleased endpoint changes and scan-time movement fail closed, but a concurrent process that leaves only an allowed net endpoint state is indistinguishable from the assigned worker and cannot be attributed. Unsupported path types or a tree that changes during inspection fail closed.

The guard is intentionally separate from [agent-flow metrics](./agent-flow-metrics.md). Lease closure is blocking evidence for path ownership. Metrics and asynchronous hooks remain best-effort observations and cannot accept or reject a lease.

## Related Policy

- [Worker-first ExecPlan implementation workflow](./execplan-implementation-workflow.md)
- [Project-scoped agent guide](./README.md)
- [ExecPlan convention](../PLANS.md)
- [Repository guidelines](../AGENTS.md)
- [DPL-DEC-016](../docs/execution/decision-and-progress-log.md)
