# Plan Phase Agents

Agents launched during the **plan** phase to research and break down epics.

## Agent Configuration

```yaml
phase: plan
trigger_label: plan
parallel: true
agents:
  - repo-research-analyst
  - best-practices-researcher
  - framework-docs-researcher
  - spec-flow-analyzer
```

## Agent Details

### repo-research-analyst

**Purpose**: Analyze repository structure and existing conventions.

**When to Use**: Understanding how similar features are implemented in the codebase.

**Invocation**:
```javascript
Task({
  subagent_type: "compound-engineering:research:repo-research-analyst",
  prompt: "Analyze the repository to understand patterns for <feature>.
           Look at existing implementations, naming conventions, and
           architectural decisions.",
  description: "Research repo patterns"
})
```

**Output**: List of relevant files, patterns discovered, conventions to follow.

---

### best-practices-researcher

**Purpose**: Gather external best practices and standards.

**When to Use**: Learning industry patterns for the feature being planned.

**Invocation**:
```javascript
Task({
  subagent_type: "compound-engineering:research:best-practices-researcher",
  prompt: "Research best practices for <feature>. Include security
           considerations, performance patterns, and common pitfalls.",
  description: "Research best practices"
})
```

**Output**: External references, recommended patterns, anti-patterns to avoid.

---

### framework-docs-researcher

**Purpose**: Deep-dive into framework/library documentation.

**When to Use**: When the feature requires specific library knowledge.

**Invocation**:
```javascript
Task({
  subagent_type: "compound-engineering:research:framework-docs-researcher",
  prompt: "Research <library> documentation for <feature>. Find API
           references, examples, and version-specific constraints.",
  description: "Research framework docs"
})
```

**Output**: Relevant API references, code examples, version constraints.

---

### spec-flow-analyzer

**Purpose**: Validate specifications for completeness.

**When to Use**: After initial planning to catch missing requirements.

**Invocation**:
```javascript
Task({
  subagent_type: "compound-engineering:workflow:spec-flow-analyzer",
  prompt: "Analyze this specification for user flows and gaps:
           <specification>
           Identify missing edge cases, error handling, and UX flows.",
  description: "Analyze spec flows"
})
```

**Output**: List of missing flows, edge cases, questions to resolve.

---

## Phase Workflow

```
1. Epic Created (label: plan)
         │
         ▼
2. Launch Research Agents (parallel)
   ┌─────┼─────┬─────┐
   ▼     ▼     ▼     ▼
 repo  best  docs  spec
   │     │     │     │
   └─────┴─────┴─────┘
         │
         ▼
3. Synthesize Findings
         │
         ▼
4. Create Subtasks
   bd create "Task 1" -l work
   bd create "Task 2" -l work
   bd create "Review" -l review
         │
         ▼
5. Link Dependencies
   bd dep add task2 task1 --type blocks
   bd dep add review task2 --type blocks
         │
         ▼
6. Close Planning Task
   bd close <epic-id> --reason "Breakdown complete"
```

## Example Output

After running plan phase agents on "Add user authentication":

```bash
# Created tasks:
web-ui-001: Research OAuth providers (work)
web-ui-002: Implement OAuth flow (work) - blocked by 001
web-ui-003: Add session management (work) - blocked by 002
web-ui-004: Write auth tests (work) - blocked by 003
web-ui-005: Review auth implementation (review) - blocked by 004
web-ui-006: Document auth system (compound) - blocked by 005

# Dependency chain:
001 → 002 → 003 → 004 → 005 → 006
```
