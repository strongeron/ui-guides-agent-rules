# Beads Cheatsheet for AI Operation

## Reading Tasks

```bash
# See ready work (no blockers)
bd ready

# See ready as JSON (for AI parsing)
bd ready --json

# View specific task
bd show <id>

# See blocked tasks
bd blocked

# List all tasks
bd list
bd list --status open
bd list --label work
```

## Creating Tasks

```bash
# Basic task
bd create "Task title" -p 1 -l work

# With description
bd create "Task title" -p 1 -l work --description "Details..."

# Priority levels: P0 (critical) → P4 (backlog)
bd create "Critical bug" -p 0 -l bug
bd create "Nice to have" -p 3 -l enhancement
```

## Linking Dependencies

```bash
# Parent-child (epic → subtask)
bd dep add <child-id> <parent-id> --type parent-child

# Blocks (A must complete before B starts)
bd dep add <blocked-id> <blocker-id> --type blocks

# Discovered during work
bd dep add <new-id> <original-id> --type discovered-from

# View dependency tree
bd dep tree <id>
```

## Operating on Tasks

```bash
# Start work
bd update <id> --status in_progress

# Complete work
bd close <id> --reason "What was done"

# Add notes
bd update <id> --notes "Found issue with X"

# Add labels
bd label add <id> needs-review
```

## AI Operation Pattern

```
┌─────────────────────────────────────────────────┐
│ 1. CHECK: bd ready --json                       │
│    → Pick highest priority unblocked task       │
├─────────────────────────────────────────────────┤
│ 2. CLAIM: bd update <id> --status in_progress   │
│    → Signals you're working on it               │
├─────────────────────────────────────────────────┤
│ 3. WORK: Use Edit, Write, Bash, Task tools      │
│    → Implement the feature/fix                  │
├─────────────────────────────────────────────────┤
│ 4. DISCOVER: bd create "Found X" --deps ...     │
│    → Create tasks for new work found            │
├─────────────────────────────────────────────────┤
│ 5. COMPLETE: bd close <id> --reason "..."       │
│    → Mark done with summary                     │
├─────────────────────────────────────────────────┤
│ 6. REPEAT: Go back to step 1                    │
│    → Continue until bd ready is empty           │
└─────────────────────────────────────────────────┘
```

## Labels for Phases

| Label | Use For |
|-------|---------|
| `plan` | Planning/research tasks |
| `work` | Implementation tasks |
| `review` | Code review tasks |
| `research` | Investigation tasks |
| `bug` | Bug fixes |
| `epic` | Parent container tasks |

## With Compound Agents

```javascript
// Research phase
Task({
  subagent_type: "compound-engineering:research:best-practices-researcher",
  prompt: "Research X patterns"
})

// Review phase
Task({
  subagent_type: "compound-engineering:review:security-sentinel",
  prompt: "Review code for vulnerabilities"
})
```

## Example Session

```
User: "Work on next task"

Claude:
1. [bd ready --json] → Found: "Install MDX deps" (P1)
2. [bd update ce6 --status in_progress] → Claimed
3. [npm install @mdx-js/react @mdx-js/rollup] → Installed
4. [bd close ce6 --reason "Installed MDX deps"] → Done
5. [bd ready] → Next: "Configure Vite for MDX" now unblocked!
```

## Git Sync

```bash
# Sync beads with git
bd sync

# Commit workflow
git add .beads/
git commit -m "Update tasks"
git push
```
