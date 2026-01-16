# /ralph:init

Initialize Ralph-Beads workflow in the current project.

## What This Command Does

1. Initializes Beads task tracking (`bd init`)
2. Installs git hooks for sync
3. Creates `.ralph/` state directory
4. Generates AGENTS.md with landing instructions

## Usage

```
/ralph:init
```

## Prerequisites

- Node.js installed (for `bd` CLI)
- Git repository initialized
- Write access to project root

## Execution Steps

```bash
# Step 1: Check if beads is installed
if ! command -v bd &> /dev/null; then
  echo "Installing beads..."
  npm install -g @beads/bd
fi

# Step 2: Initialize beads
bd init

# Step 3: Install hooks
bd hooks install

# Step 4: Create ralph state directory
mkdir -p .ralph/logs

# Step 5: Initialize state files
echo "CLOSED" > .ralph/circuit_state
echo "0" > .ralph/consecutive_errors
echo "0" > .ralph/call_count

# Step 6: Verify setup
bd doctor
```

## Output

```
✓ Beads initialized in .beads/
✓ Git hooks installed
✓ Ralph state directory created
✓ Ready to create tasks with: bd create "Task" -l plan
```

## Next Steps

After initialization:
1. Create your first epic: `bd create "Epic title" -p 0 -l plan,epic`
2. Run the workflow: `/ralph:run`
