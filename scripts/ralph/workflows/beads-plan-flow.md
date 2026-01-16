# Beads Plan Flow (No Ralph)

A simpler workflow using Beads directly with Claude Code's Plan Mode and Compound agents.

## Flow Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     BEADS PLAN FLOW                                 │
│                                                                     │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐      │
│  │ PLAN     │───▶│ REVIEW   │───▶│ BEADS    │───▶│ EXECUTE  │      │
│  │ MODE     │    │ & ASK    │    │ CREATE   │    │ TASKS    │      │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘      │
│       │              │               │               │              │
│       ▼              ▼               ▼               ▼              │
│   Compound       User input      bd create      AI works on        │
│   research       AskTool         bd dep add     bd ready tasks     │
│   agents                                                            │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Difference from Ralph

| Aspect | Ralph Loop | Beads Plan Flow |
|--------|------------|-----------------|
| **Execution** | External bash loop | Claude Code native |
| **Context** | Fresh each iteration | Single conversation |
| **Control** | Automated | User-guided |
| **Exit** | Dual-gate detection | Natural completion |

## Phase 1: Plan with Compound Agents

Use Plan Mode to research and design the implementation.

### Trigger: Enter Plan Mode

```
User: "I need to migrate from lucide-react to hugeicons"
Claude: [Enters Plan Mode via EnterPlanMode tool]
```

### Research with Compound Agents

Launch research agents in parallel:

```javascript
// In Plan Mode, launch these agents:
Task({
  subagent_type: "compound-engineering:research:repo-research-analyst",
  prompt: "Find all lucide-react usage patterns in codebase"
})

Task({
  subagent_type: "compound-engineering:research:best-practices-researcher",
  prompt: "Research icon library migration best practices"
})
```

### Write Plan File

```markdown
# Plan: Migrate to HUGEICONS

## Research Summary
- Found 19 files using lucide-react
- HUGEICONS uses different naming: `Menu01Icon` vs `Menu`

## Tasks
1. Create icon mapping file
2. Update core components (Header, Sidebar, Navigation)
3. Update PrincipleView component
4. Update example components (optional)
5. Remove lucide-react dependency

## Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 1
- Task 4 depends on Tasks 2, 3
```

### Exit Plan Mode

Use `ExitPlanMode` tool to get user approval.

---

## Phase 2: Review with AskUserQuestion

Before creating Beads tasks, validate with user.

```javascript
AskUserQuestion({
  questions: [{
    question: "Which migration approach do you prefer?",
    header: "Approach",
    options: [
      { label: "Full migration (all 19 files)", description: "Replace everywhere" },
      { label: "Core only (4 files)", description: "Just main components" },
      { label: "Gradual (by priority)", description: "P1 first, then P2" }
    ],
    multiSelect: false
  }]
})
```

---

## Phase 3: Create Beads Tasks

Convert approved plan to Beads tasks with dependencies.

### Script: Plan to Beads

```bash
#!/bin/bash
# plan-to-beads.sh - Convert plan to beads tasks

# Create epic
EPIC=$(bd create "Migrate to HUGEICONS" -p 1 -l epic --json | jq -r '.id')

# Create tasks
T1=$(bd create "Create icon mapping file" -p 1 -l work --json | jq -r '.id')
T2=$(bd create "Update Header, Sidebar, Navigation" -p 1 -l work --json | jq -r '.id')
T3=$(bd create "Update PrincipleView icons" -p 1 -l work --json | jq -r '.id')
T4=$(bd create "Update example components" -p 2 -l work --json | jq -r '.id')
T5=$(bd create "Remove lucide-react dependency" -p 1 -l work --json | jq -r '.id')

# Link to epic
bd dep add $T1 $EPIC --type parent-child
bd dep add $T2 $EPIC --type parent-child
bd dep add $T3 $EPIC --type parent-child
bd dep add $T4 $EPIC --type parent-child
bd dep add $T5 $EPIC --type parent-child

# Set dependencies
bd dep add $T2 $T1 --type blocks
bd dep add $T3 $T1 --type blocks
bd dep add $T4 $T2 --type blocks
bd dep add $T4 $T3 --type blocks
bd dep add $T5 $T4 --type blocks

echo "Created epic $EPIC with 5 tasks"
bd ready
```

### Or via Claude Code directly:

```
Claude: I'll create the beads tasks from our plan.

[Runs bd create commands]
[Runs bd dep add commands]

Created:
- web-ui-abc: Create icon mapping (ready)
- web-ui-def: Update Header/Sidebar/Nav (blocked by abc)
- web-ui-ghi: Update PrincipleView (blocked by abc)
- web-ui-jkl: Update examples (blocked by def, ghi)
- web-ui-mno: Remove lucide-react (blocked by jkl)
```

---

## Phase 4: Execute Tasks

AI works through tasks using `bd ready` to find next work.

### Workflow Pattern

```
1. Check ready tasks: bd ready --json
2. Claim task: bd update <id> --status in_progress
3. Do the work (Edit, Write, Bash)
4. Complete task: bd close <id> --reason "description"
5. Repeat until bd ready is empty
```

### Example Session

```
User: "Work on the next task"

Claude: Let me check what's ready.

[Runs: bd ready --json]

Ready task: web-ui-abc "Create icon mapping file"

I'll work on this now.

[Creates icon-mapping.ts file]
[Runs: bd close web-ui-abc --reason "Created mapping for 15 icons"]

Done! Next ready task is now web-ui-def "Update Header/Sidebar/Nav"
Want me to continue?
```

---

## Migrating File Todos to Beads

Convert existing `todos/*.md` files to Beads tasks.

### Migration Script

```bash
#!/bin/bash
# migrate-todos-to-beads.sh

for file in todos/*.md; do
  # Extract frontmatter
  status=$(grep "^status:" "$file" | cut -d: -f2 | tr -d ' ')
  priority=$(grep "^priority:" "$file" | cut -d: -f2 | tr -d ' ')
  issue_id=$(grep "^issue_id:" "$file" | cut -d: -f2 | tr -d ' "')

  # Extract title (first H1)
  title=$(grep "^# " "$file" | head -1 | sed 's/^# //')

  # Map priority
  case $priority in
    p1) p=1 ;;
    p2) p=2 ;;
    p3) p=3 ;;
    *) p=2 ;;
  esac

  # Create beads task
  bd create "$title" -p $p -l work --description "Migrated from todos/$issue_id"

  echo "Migrated: $title"
done
```

### Manual Migration via Claude

```
User: "Migrate my todos to beads"

Claude: I'll read each todo file and create corresponding beads tasks.

[Reads todos/001-*.md]
[Runs: bd create "Replace lucide-react with HUGEICONS" -p 1 -l work]

[Reads todos/002-*.md]
[Runs: bd create "Install MDX dependencies" -p 1 -l work]

... continues for all 10 todos ...

[Sets up dependencies based on frontmatter]

Migration complete! Run `bd ready` to see available tasks.
```

---

## Commands for AI Operation

### Check Next Work
```bash
bd ready --json --limit 1
```

### Claim Task
```bash
bd update <id> --status in_progress
```

### Complete Task
```bash
bd close <id> --reason "What was done"
```

### Create Subtask (discovered work)
```bash
bd create "Found: need to also update X" --deps discovered-from:<current-id>
```

### View Task Details
```bash
bd show <id>
```

### Check Blocked Tasks
```bash
bd blocked
```

---

## Integration with Compound Agents

During execution, launch review agents when appropriate:

### After Implementation
```javascript
Task({
  subagent_type: "compound-engineering:review:kieran-typescript-reviewer",
  prompt: "Review the icon migration changes"
})
```

### For Complex Decisions
```javascript
Task({
  subagent_type: "compound-engineering:research:best-practices-researcher",
  prompt: "Research best way to handle icon fallbacks"
})
```

---

## Benefits of This Flow

1. **User Control**: Plan Mode requires explicit approval
2. **Natural Conversation**: No external loop, just Claude Code
3. **Persistent Memory**: Beads survives conversation resets
4. **Git Native**: Tasks commit with code
5. **Dependency Aware**: Only ready tasks shown
6. **Compound Expertise**: Agents available when needed

---

## Quick Reference

| Action | Command |
|--------|---------|
| Enter planning | `EnterPlanMode` tool |
| Research | `Task` with research agents |
| Get user input | `AskUserQuestion` tool |
| Create tasks | `bd create "title" -p N -l label` |
| Link dependencies | `bd dep add child parent` |
| Find work | `bd ready` |
| Claim work | `bd update <id> --status in_progress` |
| Complete work | `bd close <id> --reason "..."` |
| Review changes | `Task` with review agents |
