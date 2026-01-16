# Ralph-Beads Workflow

Autonomous workflow system combining:
- **Beads**: Git-native task memory with dependencies
- **Ralph Loop**: Iterative execution with fresh context per iteration
- **Compound Agents**: Specialized parallel reviewers

## Quick Start

```bash
# Initialize beads (first time only)
bd init

# Create your epic task
bd create "My Feature" -p 0 -l plan --description "Feature description"

# Run the workflow
./scripts/ralph/ralph-beads.sh
```

## How It Works

```
┌─────────────────────────────────────────────────┐
│              RALPH LOOP (Outer Shell)           │
│                                                 │
│  while (tasks remain) {                         │
│    1. Read state from .beads/                   │
│    2. Get next ready task (unblocked)           │
│    3. Detect phase from labels                  │
│    4. Execute Claude with phase-specific prompt │
│    5. Update beads with progress                │
│    6. Check exit conditions                     │
│    7. Fresh context restart                     │
│  }                                              │
└─────────────────────────────────────────────────┘
```

## Phases

| Phase | Label | Compound Agents |
|-------|-------|-----------------|
| **Plan** | `plan` | repo-research-analyst, best-practices-researcher, framework-docs-researcher |
| **Work** | `work` | TodoWrite tracking, Edit/Write tools |
| **Review** | `review` | kieran-*-reviewer, security-sentinel, performance-oracle, architecture-strategist |
| **Compound** | `compound` | Documentation agents |

## Usage

```bash
# Dry run (see what would happen)
./ralph-beads.sh --dry-run

# Run with max iterations
./ralph-beads.sh --max-iterations 10

# Reset circuit breaker after failures
./ralph-beads.sh --reset-circuit

# Verbose logging
./ralph-beads.sh --verbose
```

## Task Management

```bash
# Create tasks with phase labels
bd create "Research auth patterns" -p 1 -l plan
bd create "Implement auth" -p 1 -l work
bd create "Review auth code" -p 2 -l review

# Chain dependencies
bd dep add work-id plan-id --type blocks
bd dep add review-id work-id --type blocks

# Check ready tasks
bd ready --json
```

## Exit Detection (Dual-Gate)

The loop exits only when BOTH conditions are met:
1. **Heuristic gate**: Natural language patterns like "all tasks complete"
2. **Explicit gate**: `EXIT_SIGNAL: true` in RALPH_STATUS block

## Circuit Breaker

Protects against infinite loops:
- Opens after 3 consecutive failures
- Detects stagnation (identical responses)
- Reset with `--reset-circuit`

## State Files

```
.ralph/
├── logs/ralph.log       # Execution history
├── response.json        # Last Claude response
├── circuit_state        # CLOSED/OPEN/HALF_OPEN
├── last_prompt.md       # Debug: last prompt sent
└── call_count           # Rate limit tracking
```

## Integration with Compound Engineering

The workflow integrates with compound-engineering plugin agents:

```bash
# In Claude Code, these agents are launched via Task tool:
Task(subagent_type="compound-engineering:review:security-sentinel", ...)
Task(subagent_type="compound-engineering:research:best-practices-researcher", ...)
```

## Sources

- [Beads](https://github.com/steveyegge/beads) - Distributed task memory
- [Ralph Loop](https://github.com/frankbria/ralph-claude-code) - Iterative agent pattern
- [Compound Engineering](https://github.com/kieranklaassen/compound-engineering-plugin) - Specialized agents
