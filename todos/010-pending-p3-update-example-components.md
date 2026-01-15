---
status: pending
priority: p3
issue_id: "010"
tags: [examples, shadcn, optional]
dependencies: []
---

# Update 165 Example Components to Use shadcn (Optional)

## Problem Statement

All 165 example components use plain HTML + Tailwind instead of shadcn components. This is intentional for pedagogical purposes but could be updated for consistency.

## Findings

- 165 example files in src/components/examples/
- 0 currently use shadcn components
- All use inline Tailwind classes
- Distribution: forms (30), interactions (46), animations (16), content (32), design (14), layout (12), performance (14)

## Proposed Solutions

### Option A: Keep As-Is (Recommended)
Examples intentionally show semantic HTML patterns - this is pedagogically sound.
- **Pros:** Shows proper HTML foundations, framework-agnostic
- **Cons:** Inconsistent with core components

### Option B: Selective Update
Update only form-heavy examples to use shadcn Input/Button.
- **Pros:** More consistent feel
- **Cons:** Time investment for minor gain
- **Effort:** High (4-6 hours)

### Option C: Full Migration
Update all examples to shadcn.
- **Pros:** Full consistency
- **Cons:** Massive effort, may obscure semantic HTML lessons
- **Effort:** Very High (10+ hours)

## Recommended Action

**Keep as-is** - the examples intentionally demonstrate semantic HTML best practices without framework abstraction.

## Acceptance Criteria

- [ ] Decision documented
- [ ] If migrating: all Button/Input elements use shadcn
- [ ] Examples still demonstrate intended patterns

## Work Log

### 2025-01-15 - Created Issue

**By:** Claude Code

**Actions:**
- Documented current state
- Recommendation: keep plain HTML for educational value
