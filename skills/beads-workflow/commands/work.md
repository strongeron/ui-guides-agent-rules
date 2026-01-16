# /beads:work

Start working on the next available task.

## Usage

```
/beads:work [task-id]
```

If no task-id provided, picks highest priority ready task.

## Workflow

1. **Find task**: `bd ready --json --limit 1`
2. **Claim it**: `bd update <id> --status in_progress`
3. **Show details**: `bd show <id>`
4. **Work on it**: Implement the task
5. **Complete**: `bd close <id> --reason "..."`

## Example Session

```
User: /beads:work

Claude:
Found ready task: web-ui_guide_react-ce6 "Install MDX dependencies" (P1)

Claiming task...
✓ Updated to in_progress

Task details:
- Install @mdx-js/react
- Install @mdx-js/rollup
- Install Code Hike dependencies

Working on it now...

[npm install @mdx-js/react @mdx-js/rollup]

✓ Dependencies installed

Completing task...
✓ Closed: Installed MDX dependencies

Next ready: web-ui_guide_react-ci2 "Configure Vite for MDX"
```
