# /ralph:run

Execute the Ralph-Beads workflow loop.

## What This Command Does

1. Reads next ready task from Beads
2. Detects phase from task labels
3. Builds phase-specific prompt
4. Executes Claude with fresh context
5. Updates Beads with progress
6. Checks exit conditions
7. Repeats until complete or max iterations

## Usage

```
/ralph:run [options]
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `--dry-run` | Show what would happen without executing | false |
| `--max-iterations N` | Maximum loop iterations | 50 |
| `--verbose` | Enable detailed logging | false |
| `--reset-circuit` | Reset circuit breaker and exit | - |

## Execution

```bash
./scripts/ralph/ralph-beads.sh
```

## Flow Diagram

```
┌─────────────────────────────────────┐
│         Start Iteration             │
└─────────────────┬───────────────────┘
                  ▼
┌─────────────────────────────────────┐
│   Check Circuit Breaker             │
│   (OPEN? → halt)                    │
└─────────────────┬───────────────────┘
                  ▼
┌─────────────────────────────────────┐
│   Get Next Ready Task               │
│   bd ready --json --limit 1         │
└─────────────────┬───────────────────┘
                  ▼
          ┌──────┴──────┐
          │ No tasks?   │
          └──────┬──────┘
          YES    │    NO
           │     │     │
           ▼     │     ▼
        EXIT OK  │  ┌─────────────────┐
                 │  │ Detect Phase    │
                 │  │ (plan/work/     │
                 │  │  review/compound)│
                 │  └────────┬────────┘
                 │           ▼
                 │  ┌─────────────────┐
                 │  │ Build Prompt    │
                 │  │ with agents     │
                 │  └────────┬────────┘
                 │           ▼
                 │  ┌─────────────────┐
                 │  │ Execute Claude  │
                 │  │ (fresh context) │
                 │  └────────┬────────┘
                 │           ▼
                 │  ┌─────────────────┐
                 │  │ Check Exit      │
                 │  │ (dual-gate)     │
                 │  └────────┬────────┘
                 │           ▼
                 │    ┌──────┴──────┐
                 │    │ Exit signal │
                 │    │ + heuristic?│
                 │    └──────┬──────┘
                 │    YES    │    NO
                 │     │     │     │
                 │     ▼     │     ▼
                 │  EXIT OK  │  Loop back
                 │           │     │
                 └───────────┴─────┘
```

## Phase-Specific Behavior

### Plan Phase
- Launches research agents in parallel
- Creates subtasks with `bd create`
- Links dependencies with `bd dep add`

### Work Phase
- Uses TodoWrite for tracking
- Implements with Edit/Write
- Creates discovered issues

### Review Phase
- Launches 6+ review agents in parallel
- Creates P1/P2 fix tasks
- Documents findings

### Compound Phase
- Documents learnings
- Creates reusable patterns
- Updates project docs

## Exit Conditions

Loop exits when ANY of these are true:
1. `bd ready` returns empty (all tasks done)
2. Dual-gate passes (heuristic + explicit signal)
3. Circuit breaker opens (too many failures)
4. Max iterations reached

## Example Output

```
[2026-01-15 21:24:45] [INFO] Starting Ralph-Beads workflow (max: 50)
[2026-01-15 21:24:45] [INFO] Task: web-ui-123 - Implement auth
[2026-01-15 21:24:45] [INFO] Phase: work | Agents: TodoWrite, Edit/Write
[2026-01-15 21:24:46] [INFO] Executing Claude Code...
[2026-01-15 21:25:30] [OK] Claude execution completed
[2026-01-15 21:25:30] [INFO] Exit check: indicators=0, signal=false, ready=3
[2026-01-15 21:25:32] [INFO] === Iteration 2 ===
...
[2026-01-15 21:30:15] [OK] All beads tasks completed!
```
