# Ralph-Beads Quick Start

Get up and running in 5 minutes.

## 1. Install Dependencies

```bash
# Install beads CLI
npm install -g @beads/bd

# Verify installation
bd --version
```

## 2. Initialize Project

```bash
# Initialize beads
bd init

# Install git hooks
bd hooks install

# Create ralph state directory
mkdir -p .ralph/logs
```

## 3. Create Your First Epic

```bash
# Create an epic task with plan label
bd create "My Feature" -p 0 -l plan,epic \
  --description "Description of what needs to be built"
```

## 4. Run the Workflow

```bash
# Dry run first (see what would happen)
./scripts/ralph/ralph-beads.sh --dry-run

# Run for real
./scripts/ralph/ralph-beads.sh
```

## 5. Monitor Progress

```bash
# Check ready tasks
bd ready

# View all tasks
bd list

# Check workflow state
cat .ralph/circuit_state
```

## Quick Commands

| Command | Description |
|---------|-------------|
| `bd ready` | Show unblocked tasks |
| `bd list` | Show all tasks |
| `bd show <id>` | View task details |
| `bd close <id> --reason "..."` | Complete a task |
| `bd create "title" -l work` | Create new task |

## Phase Labels

| Label | When to Use |
|-------|-------------|
| `plan` | Planning/breakdown tasks |
| `work` | Implementation tasks |
| `review` | Code review tasks |
| `compound` | Documentation tasks |

## Example Workflow

```bash
# Create epic
bd create "Add user auth" -p 0 -l plan,epic

# Run planning (creates subtasks)
./scripts/ralph/ralph-beads.sh

# Check what was created
bd list

# Continue execution
./scripts/ralph/ralph-beads.sh

# Repeat until complete
```

## Troubleshooting

### "Circuit breaker OPEN"
```bash
./scripts/ralph/ralph-beads.sh --reset-circuit
```

### "No ready tasks"
```bash
bd blocked  # Check what's blocking
bd dep tree <id>  # View dependency tree
```

### "bd not found"
```bash
npm install -g @beads/bd
```

## Next Steps

- Read [SKILL.md](./SKILL.md) for full documentation
- Review [agents/](./agents/) for agent configurations
- Check [commands/](./commands/) for command details
