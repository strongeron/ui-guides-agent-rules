# Ralph-Beads Workflow Skill

Autonomous workflow orchestration combining Beads (persistent task memory), Ralph Loop (iterative execution), and Compound Agents (specialized reviewers).

## When to Use This Skill

Use this skill when you need:
- **Long-horizon autonomous work** spanning multiple iterations
- **Persistent task tracking** that survives context resets
- **Phase-based execution** with specialized agents per phase
- **Dependency-aware workflows** where task order matters

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    RALPH-BEADS WORKFLOW                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│  │   BEADS     │    │   RALPH     │    │  COMPOUND   │             │
│  │   Memory    │───▶│   Loop      │───▶│  Agents     │             │
│  └─────────────┘    └─────────────┘    └─────────────┘             │
│        │                  │                  │                      │
│        ▼                  ▼                  ▼                      │
│  .beads/tasks.jsonl  Fresh context    Phase-specific               │
│  Dependencies        per iteration    expertise                    │
│  Git-native sync     Dual-gate exit   Parallel execution           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Components

### 1. Beads (Task Memory)

Git-native task tracking with:
- **Hash-based IDs**: Conflict-free parallel work
- **Dependency graph**: `blocks`, `parent-child`, `discovered-from`
- **Label filtering**: Phase detection via labels
- **JSON output**: Machine-readable for agent consumption

### 2. Ralph Loop (Execution Pattern)

Iterative execution with:
- **Fresh context**: Each iteration starts clean (no context accumulation)
- **Dual-gate exit**: Heuristic patterns + explicit signal required
- **Circuit breaker**: Halts on repeated failures
- **Rate limiting**: Respects API limits

### 3. Compound Agents (Specialized Expertise)

Phase-specific agents launched in parallel:

| Phase | Agents | Purpose |
|-------|--------|---------|
| **Plan** | repo-research-analyst, best-practices-researcher, framework-docs-researcher | Gather context, research patterns |
| **Work** | TodoWrite, Edit/Write tools | Implementation |
| **Review** | kieran-*-reviewer, security-sentinel, performance-oracle | Quality validation |
| **Compound** | Documentation agents | Capture learnings |

---

## Commands

### `/ralph:init`

Initialize Ralph-Beads in a project.

```bash
# What it does:
bd init                           # Initialize beads
bd hooks install                  # Install git hooks
mkdir -p .ralph                   # Create state directory
```

### `/ralph:start <epic-title>`

Start a new workflow with an epic task.

```bash
# Creates epic and enters planning phase
bd create "<epic-title>" -p 0 -l plan,epic --description "..."
```

### `/ralph:run`

Execute the Ralph loop until completion or max iterations.

```bash
./scripts/ralph/ralph-beads.sh
```

### `/ralph:status`

Show current workflow state.

```bash
bd ready --json                   # Ready tasks
cat .ralph/circuit_state          # Circuit breaker state
tail -20 .ralph/logs/ralph.log    # Recent activity
```

### `/ralph:reset`

Reset circuit breaker and state files.

```bash
./scripts/ralph/ralph-beads.sh --reset-circuit
```

---

## Workflow Phases

### Phase 1: Plan (label: `plan`)

**Objective**: Break down epic into actionable tasks with dependencies.

**Agents**:
```
Task(subagent_type="compound-engineering:research:repo-research-analyst")
Task(subagent_type="compound-engineering:research:best-practices-researcher")
Task(subagent_type="compound-engineering:research:framework-docs-researcher")
Task(subagent_type="compound-engineering:workflow:spec-flow-analyzer")
```

**Actions**:
1. Research existing patterns in codebase
2. Gather external best practices
3. Create subtasks via `bd create`
4. Link dependencies via `bd dep add`
5. Close planning task when breakdown complete

**Exit Criteria**:
- All subtasks created with clear descriptions
- Dependencies properly linked
- No ambiguous requirements remain

---

### Phase 2: Work (label: `work`)

**Objective**: Implement the task.

**Tools**:
- `TodoWrite` for progress tracking
- `Edit/Write` for code changes
- `Bash` for commands

**Actions**:
1. Claim task: `bd update <id> --status in_progress`
2. Implement the feature/fix
3. Create discovered issues: `bd create "Found X" --deps discovered-from:<id>`
4. Run quality gates (tests, lint, typecheck)
5. Close task: `bd close <id> --reason "description"`

**Exit Criteria**:
- Tests pass
- Linting passes
- TypeScript compiles
- Task closed with reason

---

### Phase 3: Review (label: `review`)

**Objective**: Validate quality with specialized reviewers.

**Agents** (launched in parallel):
```
Task(subagent_type="compound-engineering:review:kieran-typescript-reviewer")
Task(subagent_type="compound-engineering:review:security-sentinel")
Task(subagent_type="compound-engineering:review:performance-oracle")
Task(subagent_type="compound-engineering:review:architecture-strategist")
Task(subagent_type="compound-engineering:review:code-simplicity-reviewer")
Task(subagent_type="compound-engineering:review:pattern-recognition-specialist")
```

**Actions**:
1. Launch review agents in parallel
2. Collect findings (P1/P2/P3 severity)
3. Create fix tasks for P1/P2 findings
4. Close review when findings documented

**Exit Criteria**:
- All P1 findings addressed
- P2 findings tracked as tasks
- Review summary documented

---

### Phase 4: Compound (label: `compound`)

**Objective**: Document learnings for future reference.

**Actions**:
1. Summarize what was built
2. Document patterns discovered
3. Create reusable templates
4. Update project documentation

**Exit Criteria**:
- Learnings captured in docs/
- Patterns documented for reuse
- Knowledge compounded for future iterations

---

## Subagents Reference

### Research Agents

| Agent | Use When |
|-------|----------|
| `repo-research-analyst` | Understanding existing codebase patterns |
| `best-practices-researcher` | Gathering external standards and examples |
| `framework-docs-researcher` | Deep-diving into library/framework docs |
| `git-history-analyzer` | Understanding code evolution and decisions |

### Review Agents

| Agent | Focus Area |
|-------|------------|
| `kieran-typescript-reviewer` | TypeScript/React quality |
| `kieran-rails-reviewer` | Rails conventions |
| `kieran-python-reviewer` | Python best practices |
| `security-sentinel` | Vulnerabilities, auth, data protection |
| `performance-oracle` | N+1 queries, caching, optimization |
| `architecture-strategist` | Component boundaries, patterns |
| `code-simplicity-reviewer` | Over-engineering, YAGNI |
| `pattern-recognition-specialist` | Anti-patterns, code smells |
| `data-integrity-guardian` | Migrations, data consistency |

### Workflow Agents

| Agent | Purpose |
|-------|---------|
| `spec-flow-analyzer` | Validate specifications for gaps |
| `bug-reproduction-validator` | Verify bug reports |
| `pr-comment-resolver` | Address PR feedback |

---

## State Management

### Beads State (`.beads/`)

```
.beads/
├── beads.db           # SQLite database
├── issues.jsonl       # Git-tracked task data
└── config.json        # Repository configuration
```

### Ralph State (`.ralph/`)

```
.ralph/
├── logs/ralph.log     # Execution history
├── response.json      # Last Claude response
├── circuit_state      # CLOSED/OPEN/HALF_OPEN
├── consecutive_errors # Error counter
├── previous_hash      # Stagnation detection
├── call_count         # Rate limit tracking
└── last_prompt.md     # Debug: last prompt sent
```

---

## Exit Detection (Dual-Gate)

The workflow only exits when **both gates pass**:

### Gate 1: Heuristic Patterns

Natural language indicators of completion:
- "all tasks complete"
- "nothing left to do"
- "workflow complete"
- "ready to ship"
- "fully implemented"

### Gate 2: Explicit Signal

RALPH_STATUS block with `exit_signal: true`:

```json
{
  "ralph_status": {
    "task_id": "web-ui_guide_react-xyz",
    "status": "COMPLETE",
    "exit_signal": true,
    "work_summary": "Implemented feature X with tests",
    "next_steps": "None - ready for PR"
  }
}
```

### Additional Check: Empty Queue

Workflow also exits if `bd ready --json` returns empty array (all tasks closed).

---

## Circuit Breaker

Protects against infinite loops and runaway costs.

### States

| State | Meaning | Behavior |
|-------|---------|----------|
| `CLOSED` | Normal operation | Loop continues |
| `OPEN` | Too many failures | Loop halts |
| `HALF_OPEN` | Testing recovery | Careful retry |

### Triggers

- **3 consecutive errors**: Opens circuit
- **Stagnation**: Identical responses detected
- **No progress**: No file changes across iterations

### Recovery

```bash
# Manual reset
./scripts/ralph/ralph-beads.sh --reset-circuit

# Or wait for cooldown (future enhancement)
```

---

## Best Practices

### Task Creation

```bash
# Good: Clear title, description, labels
bd create "Add user authentication" -p 1 -l work \
  --description "Implement JWT-based auth with login/logout endpoints"

# Bad: Vague
bd create "Fix auth"
```

### Dependencies

```bash
# Chain phases properly
bd dep add implement-auth research-auth --type blocks
bd dep add review-auth implement-auth --type blocks
bd dep add compound-auth review-auth --type blocks
```

### Labels

```bash
# Use consistent labels for phase detection
-l plan      # Planning phase
-l work      # Implementation phase
-l review    # Review phase
-l compound  # Documentation phase
-l epic      # Epic-level task
```

### Exit Signals

```markdown
# Set exit_signal: true ONLY when:
- Task is fully complete
- Beads is updated (task closed)
- No immediate follow-up needed
- Quality gates pass

# Set exit_signal: false when:
- Task is partially complete
- Errors occurred
- Follow-up work discovered
- Waiting on input
```

---

## Integration Examples

### Example 1: Feature Development

```bash
# 1. Create epic
bd create "Add dark mode" -p 1 -l plan,epic

# 2. Run planning phase
./scripts/ralph/ralph-beads.sh
# Creates subtasks: research, implement, review, document

# 3. Continue workflow
./scripts/ralph/ralph-beads.sh
# Works through subtasks automatically
```

### Example 2: Bug Fix

```bash
# 1. Create bug task
bd create "Fix login redirect loop" -p 0 -l work \
  --description "Users stuck in redirect after OAuth callback"

# 2. Run workflow
./scripts/ralph/ralph-beads.sh
```

### Example 3: Code Review

```bash
# 1. Create review task
bd create "Review auth PR #123" -p 1 -l review

# 2. Run workflow (launches review agents)
./scripts/ralph/ralph-beads.sh
```

---

## Troubleshooting

### Circuit Breaker Open

```bash
# Check why
cat .ralph/logs/ralph.log | grep -i error

# Reset and retry
./scripts/ralph/ralph-beads.sh --reset-circuit
```

### No Progress

```bash
# Check ready tasks
bd ready

# Check blocked tasks
bd blocked

# Check dependencies
bd dep tree <id>
```

### Rate Limited

```bash
# Check current count
cat .ralph/call_count

# Wait for reset or adjust limit
RATE_LIMIT_HOURLY=200 ./scripts/ralph/ralph-beads.sh
```

---

## Sources

- [Beads](https://github.com/steveyegge/beads) - Distributed task memory for AI agents
- [Ralph Loop](https://github.com/frankbria/ralph-claude-code) - Autonomous development loop
- [Compound Engineering](https://github.com/kieranklaassen/compound-engineering-plugin) - Specialized review agents
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
