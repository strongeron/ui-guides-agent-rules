# /beads:ready

Show available tasks with no blockers.

## Usage

```
/beads:ready
```

## Execution

```bash
bd ready
```

## Output

Lists all open tasks that have no blocking dependencies, sorted by priority.

## Example

```
📋 Ready work (7 issues with no blockers):

1. [● P0] [task] web-ui_guide_react-2gs: Brain Center Migration Epic
2. [● P1] [task] web-ui_guide_react-ce6: Install MDX dependencies
3. [● P1] [task] web-ui_guide_react-yvy: Replace lucide-react with HUGEICONS
4. [● P2] [task] web-ui_guide_react-w18: Create content directory structure
```

## Next Steps

After seeing ready tasks:
1. Pick highest priority task
2. Run `/beads:claim <id>` to start working
