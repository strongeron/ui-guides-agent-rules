# /ralph:status

Display current workflow state and task queue.

## What This Command Does

1. Shows ready tasks from Beads
2. Displays circuit breaker state
3. Shows recent activity log
4. Reports rate limit status

## Usage

```
/ralph:status
```

## Execution

```bash
echo "=== Ready Tasks ==="
bd ready --json | jq '.[] | {id, title, priority, labels}'

echo ""
echo "=== Blocked Tasks ==="
bd blocked --json | jq '.[] | {id, title, blocked_by: .dependencies}'

echo ""
echo "=== Circuit Breaker ==="
cat .ralph/circuit_state 2>/dev/null || echo "Not initialized"

echo ""
echo "=== Consecutive Errors ==="
cat .ralph/consecutive_errors 2>/dev/null || echo "0"

echo ""
echo "=== Rate Limit ==="
echo "Calls this hour: $(cat .ralph/call_count 2>/dev/null || echo 0)"

echo ""
echo "=== Recent Activity ==="
tail -10 .ralph/logs/ralph.log 2>/dev/null || echo "No logs yet"
```

## Example Output

```
=== Ready Tasks ===
{
  "id": "web-ui-abc",
  "title": "Implement user auth",
  "priority": 1,
  "labels": ["work"]
}
{
  "id": "web-ui-def",
  "title": "Add tests",
  "priority": 2,
  "labels": ["work"]
}

=== Blocked Tasks ===
{
  "id": "web-ui-ghi",
  "title": "Review auth code",
  "blocked_by": ["web-ui-abc"]
}

=== Circuit Breaker ===
CLOSED

=== Consecutive Errors ===
0

=== Rate Limit ===
Calls this hour: 5

=== Recent Activity ===
[2026-01-15 21:24:45] [INFO] Started iteration 1
[2026-01-15 21:24:46] [OK] Task web-ui-abc claimed
[2026-01-15 21:25:30] [OK] Claude execution completed
[2026-01-15 21:25:31] [INFO] Exit check: indicators=0, signal=false
```

## Interpreting Status

### Task Queue
- **Ready**: Tasks with no blockers, can be worked on
- **Blocked**: Tasks waiting on dependencies

### Circuit Breaker
- `CLOSED`: Normal operation
- `OPEN`: Halted due to failures (use `/ralph:reset`)
- `HALF_OPEN`: Testing recovery

### Rate Limit
- Default: 100 calls/hour
- Reset: Automatically at hour boundary
