# /beads:plan

Convert a plan into beads tasks with dependencies.

## Usage

```
/beads:plan <epic-title>
```

## Workflow

1. **Create epic**: `bd create "<title>" -p 0 -l epic,plan`
2. **Research** (optional): Launch compound research agents
3. **Create subtasks**: Break down into work items
4. **Link dependencies**: Set execution order
5. **Validate**: Check `bd ready` and `bd blocked`

## Example

```
User: /beads:plan "Add dark mode support"

Claude:
Creating epic...
✓ Created: web-ui-abc "Add dark mode support"

Breaking down into tasks:
1. Research theme implementation patterns
2. Create theme context
3. Add theme toggle component
4. Update CSS variables
5. Test theme switching

Creating tasks...
✓ Created: web-ui-001 "Research theme patterns" (P1, research)
✓ Created: web-ui-002 "Create theme context" (P1, work)
✓ Created: web-ui-003 "Add theme toggle" (P2, work)
✓ Created: web-ui-004 "Update CSS variables" (P2, work)
✓ Created: web-ui-005 "Test theme switching" (P2, work)

Linking dependencies...
✓ 001 blocks 002 (research before implementation)
✓ 002 blocks 003, 004 (context before components)
✓ 003, 004 block 005 (test after implementation)

Ready to start:
- web-ui-001: Research theme patterns
```

## With Compound Agents

```javascript
// Research before planning
Task({
  subagent_type: "compound-engineering:research:best-practices-researcher",
  prompt: "Research dark mode implementation patterns"
})
```
