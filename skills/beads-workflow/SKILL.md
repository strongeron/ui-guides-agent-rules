# Beads Workflow Skill

Manage tasks with Beads - a git-native issue tracker designed for AI agents. Use this skill when working with plans, todos, and task dependencies in this project.

## When to Use This Skill

Use this skill when:
- Starting work and need to find available tasks
- Creating new tasks from discovered work
- Tracking progress on multi-step implementations
- Managing task dependencies and blockers
- Converting plans into actionable tasks

## Quick Commands

```bash
bd ready              # Find available work (no blockers)
bd show <id>          # View task details
bd list               # List all tasks
bd blocked            # See blocked tasks
```

## Core Workflows

### 1. Find and Claim Work

```bash
# See what's ready
bd ready

# Pick a task and claim it
bd update <id> --status in_progress

# View full details
bd show <id>
```

### 2. Complete Work

```bash
# After finishing implementation
bd close <id> --reason "What was done"

# Check what's now unblocked
bd ready
```

### 3. Create Tasks

```bash
# Basic task
bd create "Task title" -p 1 -l work --description "Details"

# With parent (subtask of epic)
bd create "Subtask" -p 2 -l work
bd dep add <new-id> <epic-id> --type parent-child

# Discovered during work
bd create "Found: need X" -p 2 -l work
bd dep add <new-id> <original-id> --type discovered-from
```

### 4. Manage Dependencies

```bash
# A blocks B (A must complete first)
bd dep add <blocked-id> <blocker-id> --type blocks

# View dependency tree
bd dep tree <id>

# Remove dependency
bd dep remove <child-id> <parent-id>
```

## Priority Levels

| Priority | Flag | Use For |
|----------|------|---------|
| P0 | `-p 0` | Critical/blocking issues |
| P1 | `-p 1` | High priority work |
| P2 | `-p 2` | Normal priority |
| P3 | `-p 3` | Nice to have |
| P4 | `-p 4` | Backlog |

## Labels

| Label | Use For |
|-------|---------|
| `work` | Implementation tasks |
| `plan` | Planning/research |
| `review` | Code review tasks |
| `bug` | Bug fixes |
| `epic` | Parent container |
| `research` | Investigation |

## AI Operation Pattern

```
┌─────────────────────────────────────────────┐
│ 1. CHECK: bd ready                          │
│    Pick highest priority unblocked task     │
├─────────────────────────────────────────────┤
│ 2. CLAIM: bd update <id> --status in_progress│
├─────────────────────────────────────────────┤
│ 3. WORK: Implement using Edit/Write/Bash    │
├─────────────────────────────────────────────┤
│ 4. DISCOVER: bd create "Found X" if needed  │
├─────────────────────────────────────────────┤
│ 5. COMPLETE: bd close <id> --reason "..."   │
├─────────────────────────────────────────────┤
│ 6. REPEAT until bd ready is empty           │
└─────────────────────────────────────────────┘
```

## Converting Plans to Tasks

When a plan is approved, convert it to beads tasks:

```bash
# 1. Create epic
bd create "Feature Epic" -p 0 -l epic,plan --description "Overview"

# 2. Create subtasks
bd create "Step 1" -p 1 -l work
bd create "Step 2" -p 1 -l work
bd create "Step 3" -p 2 -l work

# 3. Link to epic
bd dep add <step1-id> <epic-id> --type parent-child
bd dep add <step2-id> <epic-id> --type parent-child
bd dep add <step3-id> <epic-id> --type parent-child

# 4. Set execution order
bd dep add <step2-id> <step1-id> --type blocks
bd dep add <step3-id> <step2-id> --type blocks
```

## With Compound Agents

### Planning Phase
```javascript
// Research before creating tasks
Task({
  subagent_type: "compound-engineering:research:repo-research-analyst",
  prompt: "Analyze codebase for existing patterns"
})
```

### Review Phase
```javascript
// Review after implementation
Task({
  subagent_type: "compound-engineering:review:kieran-typescript-reviewer",
  prompt: "Review the implementation"
})
```

## Git Sync

Beads tracks tasks in `.beads/` which is git-versioned:

```bash
# Sync beads state
bd sync

# Commit with code
git add .beads/
git commit -m "Update tasks"
```

## Current Project State

Check the current state with:
```bash
bd ready    # Available work
bd blocked  # What's waiting
bd list     # All tasks
```

## Troubleshooting

### "No ready tasks"
```bash
bd blocked  # Check what's blocking
bd list --status open  # See all open tasks
```

### Sync issues
```bash
bd sync  # Force sync
bd doctor  # Check health
```

## Examples

### Start a work session
```bash
# What's available?
bd ready

# Claim highest priority
bd update web-ui_guide_react-ce6 --status in_progress

# Do the work...

# Mark complete
bd close web-ui_guide_react-ce6 --reason "Installed @mdx-js/react and @mdx-js/rollup"
```

### Discover new work
```bash
# While working on task X, found issue Y
bd create "Fix: found null check missing" -p 1 -l bug
bd dep add <new-id> <current-id> --type discovered-from
```
