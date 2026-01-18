# Beads Review Tasks

This directory contains task tracking documents for the Beads Review Epic.

## Epic Overview

**Goal**: Ensure all principles, agent rules, and examples are properly linked, referenced, and demonstrate best practices effectively.

## Task List

| Task | Description | Priority | Status |
|------|-------------|----------|--------|
| [TASK-001](./TASK-001-source-links-audit.md) | Source Links Audit | High | Not Started |
| [TASK-002](./TASK-002-agent-rules-alignment.md) | Agent Rules Alignment | High | Not Started |
| [TASK-003](./TASK-003-example-quality-audit.md) | Example Quality Audit | High | Not Started |
| [TASK-004](./TASK-004-standalone-rules-evaluation.md) | Standalone Rules Evaluation | Medium | Not Started |
| [TASK-005](./TASK-005-cross-cutting-review.md) | Cross-Cutting Concerns Review | Medium | Not Started |

## Quick Stats

| Component | Count |
|-----------|-------|
| Principles | 82 |
| Agent Rules | 91 |
| Good Examples | 82 |
| Bad Examples | 82 |
| Categories | 7 |

## How to Use

1. Start with **TASK-001** (Source Links) and **TASK-002** (Agent Rules) as they inform the example review
2. Proceed to **TASK-003** (Example Quality) for the detailed component audit
3. Complete **TASK-004** (Standalone Rules) to decide on expanding principle coverage
4. Finish with **TASK-005** (Cross-Cutting) for systemic improvements

## Workflow

```
TASK-001 ──┐
           ├──> TASK-003 ──> TASK-005
TASK-002 ──┘

TASK-004 (can run in parallel)
```

## Related Documents

- [Epic Overview](../BEADS_REVIEW_EPIC.md) - Full epic documentation
- [Principles Data](../../src/data/principles.ts) - Source of truth for principles
- [Agent Rules](../../src/data/agentRules.ts) - Agent rule definitions
- [Examples Directory](../../src/components/examples/) - Example components

## Progress Tracking

Update this section as tasks are completed:

- [ ] TASK-001: Source Links Audit
- [ ] TASK-002: Agent Rules Alignment
- [ ] TASK-003: Example Quality Audit
- [ ] TASK-004: Standalone Rules Evaluation
- [ ] TASK-005: Cross-Cutting Concerns Review
