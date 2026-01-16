# Phase Transitions

How tasks flow through Ralph-Beads workflow phases.

## Phase State Machine

```
                    ┌─────────────────────────────────────────┐
                    │                                         │
                    ▼                                         │
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐     │
│  PLAN   │───▶│  WORK   │───▶│ REVIEW  │───▶│COMPOUND │─────┘
└─────────┘    └─────────┘    └─────────┘    └─────────┘
     │              │              │              │
     │              │              │              │
     ▼              ▼              ▼              ▼
 Creates        Implements     Validates     Documents
 subtasks       features       quality       learnings
```

## Transition Rules

### Plan → Work

**Trigger**: Planning task closed with subtasks created.

**Conditions**:
- All requirements understood
- Subtasks have clear descriptions
- Dependencies properly linked

**Actions**:
```bash
# Close planning task
bd close <plan-id> --reason "Created N subtasks"

# Work tasks become ready automatically
bd ready  # Shows work-labeled tasks
```

---

### Work → Review

**Trigger**: All work tasks for a feature closed.

**Conditions**:
- Implementation complete
- Tests pass locally
- Code committed

**Actions**:
```bash
# Close last work task
bd close <work-id> --reason "Implementation complete"

# Review task unblocked
bd ready  # Shows review-labeled task
```

---

### Review → Compound

**Trigger**: Review complete with findings addressed.

**Conditions**:
- All P1 findings fixed
- P2 findings tracked
- Review summary documented

**Actions**:
```bash
# Close review task
bd close <review-id> --reason "Reviewed, X fixes applied"

# Compound task unblocked
bd ready  # Shows compound-labeled task
```

---

### Compound → Complete

**Trigger**: Documentation and learnings captured.

**Conditions**:
- Learnings documented
- Patterns captured for reuse
- PR ready for merge

**Actions**:
```bash
# Close compound task
bd close <compound-id> --reason "Documented in docs/"

# Epic complete
bd close <epic-id> --reason "Feature complete"
```

---

## Handling Discoveries

When new work is found during any phase:

```bash
# Create discovered issue
bd create "Found: <description>" --deps discovered-from:<current-id>

# Link appropriately
bd dep add <new-id> <current-id> --type discovered-from

# Label based on nature
bd label add <new-id> work   # Implementation needed
bd label add <new-id> bug    # Bug found
bd label add <new-id> tech-debt  # Technical debt
```

## Phase Labels Reference

| Label | Phase | Description |
|-------|-------|-------------|
| `plan` | Plan | Research and breakdown |
| `work` | Work | Implementation |
| `review` | Review | Quality validation |
| `compound` | Compound | Documentation |
| `epic` | Any | Parent task marker |
| `bug` | Work | Bug fix work |
| `tech-debt` | Work | Technical debt |

## Example: Full Lifecycle

```bash
# 1. Create Epic (Plan Phase)
bd create "Add notifications" -p 1 -l plan,epic
# → web-ui-001

# 2. Planning creates subtasks
bd create "Research notification APIs" -l work
bd create "Implement push notifications" -l work
bd create "Review notifications" -l review
bd create "Document notification system" -l compound

# 3. Link dependencies
bd dep add web-ui-002 web-ui-001  # work after plan
bd dep add web-ui-003 web-ui-002  # next work after
bd dep add web-ui-004 web-ui-003  # review after work
bd dep add web-ui-005 web-ui-004  # compound after review

# 4. Close planning
bd close web-ui-001 --reason "Breakdown complete"

# 5. Work phase begins (web-ui-002 ready)
# ... implementation ...
bd close web-ui-002 --reason "API research done"

# 6. More work (web-ui-003 ready)
# ... implementation ...
bd close web-ui-003 --reason "Push notifications working"

# 7. Review phase (web-ui-004 ready)
# ... agents review ...
bd close web-ui-004 --reason "Reviewed, 2 fixes applied"

# 8. Compound phase (web-ui-005 ready)
# ... documentation ...
bd close web-ui-005 --reason "Documented in docs/notifications.md"

# 9. Complete!
bd ready  # Empty - all done
```

## Rollback Scenarios

### Review Finds Critical Issues

```bash
# Reopen work tasks or create new ones
bd create "Fix auth vulnerability" -p 0 -l work
bd dep add <review-id> <fix-id> --type blocks

# Review stays open until fixes complete
```

### Scope Creep During Work

```bash
# Create new epic for out-of-scope work
bd create "New epic: <scope>" -l plan,epic

# Link as related (not blocking)
bd dep add <new-epic> <current-work> --type related
```

### Failed Circuit Breaker

```bash
# Check what went wrong
cat .ralph/logs/ralph.log | grep ERROR

# Fix the issue, then reset
./scripts/ralph/ralph-beads.sh --reset-circuit

# Resume workflow
./scripts/ralph/ralph-beads.sh
```
