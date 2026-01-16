# Review Phase Agents

Agents launched during the **review** phase for comprehensive code quality validation.

## Agent Configuration

```yaml
phase: review
trigger_label: review
parallel: true
agents:
  - kieran-typescript-reviewer   # Language-specific
  - security-sentinel           # Security
  - performance-oracle          # Performance
  - architecture-strategist     # Architecture
  - code-simplicity-reviewer    # Complexity
  - pattern-recognition-specialist  # Patterns
```

## Agent Details

### kieran-typescript-reviewer

**Purpose**: High-bar TypeScript/React code review.

**Focus Areas**:
- Type safety and inference
- React patterns (hooks, components)
- Naming conventions
- Test coverage

**Invocation**:
```javascript
Task({
  subagent_type: "compound-engineering:review:kieran-typescript-reviewer",
  prompt: "Review the TypeScript code changes in this PR for quality,
           type safety, and React best practices.",
  description: "TypeScript review"
})
```

**Finding Format**:
```markdown
## P1 (Critical)
- [file:line] Issue description

## P2 (Important)
- [file:line] Issue description

## P3 (Nice to Have)
- [file:line] Issue description
```

---

### security-sentinel

**Purpose**: Vulnerability scanning and security review.

**Focus Areas**:
- Authentication/authorization flaws
- Injection vulnerabilities (SQL, XSS, command)
- Secrets exposure
- OWASP Top 10

**Invocation**:
```javascript
Task({
  subagent_type: "compound-engineering:review:security-sentinel",
  prompt: "Scan this code for security vulnerabilities. Check for
           auth issues, injection risks, and data exposure.",
  description: "Security review"
})
```

---

### performance-oracle

**Purpose**: Performance analysis and optimization recommendations.

**Focus Areas**:
- N+1 queries
- Memory leaks
- Caching opportunities
- Bundle size impact

**Invocation**:
```javascript
Task({
  subagent_type: "compound-engineering:review:performance-oracle",
  prompt: "Analyze this code for performance issues. Look for N+1
           queries, expensive operations, and caching opportunities.",
  description: "Performance review"
})
```

---

### architecture-strategist

**Purpose**: Architectural compliance and system design review.

**Focus Areas**:
- Component boundaries
- Dependency direction
- Layer violations
- Scalability concerns

**Invocation**:
```javascript
Task({
  subagent_type: "compound-engineering:review:architecture-strategist",
  prompt: "Review the architectural decisions in this code. Check
           component boundaries, dependencies, and patterns.",
  description: "Architecture review"
})
```

---

### code-simplicity-reviewer

**Purpose**: Detect over-engineering and unnecessary complexity.

**Focus Areas**:
- YAGNI violations
- Premature abstractions
- Unnecessary indirection
- Code that could be simpler

**Invocation**:
```javascript
Task({
  subagent_type: "compound-engineering:review:code-simplicity-reviewer",
  prompt: "Review this code for unnecessary complexity. Identify
           over-engineering, premature abstractions, and simpler alternatives.",
  description: "Simplicity review"
})
```

---

### pattern-recognition-specialist

**Purpose**: Identify anti-patterns and code smells.

**Focus Areas**:
- Design pattern violations
- Code duplication
- Naming inconsistencies
- Structural anti-patterns

**Invocation**:
```javascript
Task({
  subagent_type: "compound-engineering:review:pattern-recognition-specialist",
  prompt: "Analyze this code for anti-patterns and code smells.
           Check for duplication, naming issues, and structural problems.",
  description: "Pattern review"
})
```

---

## Phase Workflow

```
1. Review Task Ready (label: review)
         │
         ▼
2. Launch Review Agents (parallel - 6 agents)
   ┌────┬────┬────┬────┬────┬────┐
   ▼    ▼    ▼    ▼    ▼    ▼    ▼
  TS  SEC  PERF ARCH SIMP PATT
   │    │    │    │    │    │
   └────┴────┴────┴────┴────┘
         │
         ▼
3. Collect Findings
   - P1: Critical (blocks merge)
   - P2: Important (should fix)
   - P3: Nice to have (optional)
         │
         ▼
4. Create Fix Tasks for P1/P2
   bd create "Fix SQL injection in auth" -p 0 -l work
   bd create "Add missing error handling" -p 1 -l work
         │
         ▼
5. Link Fixes to Review
   bd dep add <review-id> <fix-id> --type blocks
         │
         ▼
6. Close Review (or wait for fixes)
   bd close <review-id> --reason "Findings documented, X fixes created"
```

## Severity Guidelines

### P1 - Critical (Must Fix)
- Security vulnerabilities
- Data corruption risks
- Breaking changes
- Test failures

### P2 - Important (Should Fix)
- Performance issues
- Code smell accumulation
- Missing error handling
- Documentation gaps

### P3 - Nice to Have (Optional)
- Style improvements
- Minor optimizations
- Refactoring suggestions
- Documentation enhancements

## Example Output

```markdown
# Review Summary: Auth Implementation

## Agents Run: 6 | Duration: 45s | Files Reviewed: 12

### P1 - Critical (2)
1. [src/auth/login.ts:45] SQL injection via unsanitized input
   → Created: web-ui-fix-001

2. [src/auth/session.ts:23] Missing CSRF token validation
   → Created: web-ui-fix-002

### P2 - Important (3)
1. [src/auth/oauth.ts:78] N+1 query in token refresh
2. [src/auth/middleware.ts:12] Over-engineered error handling
3. [src/auth/types.ts:1-50] Missing JSDoc for public API

### P3 - Nice to Have (5)
1. Inconsistent naming: `getUser` vs `fetchUser`
2. Dead code at auth/legacy.ts
3. Consider extracting auth config to env
4. Add integration tests for OAuth flow
5. Update README with auth setup

## Next Actions
- Fix P1 issues before merge (2 tasks created)
- Consider P2 issues for follow-up PR
```
