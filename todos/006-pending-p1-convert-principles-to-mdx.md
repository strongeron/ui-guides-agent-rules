---
status: pending
priority: p1
issue_id: "006"
tags: [mdx, migration, content, principles]
dependencies: ["004", "005"]
---

# Convert 78 Principles from TypeScript to MDX Files

## Problem Statement

All 78 principles are currently stored in `src/data/principles.ts` as TypeScript objects. Need to convert to MDX files for richer content authoring with Code Hike annotations.

## Findings

Current format in principles.ts:
```typescript
{
  id: 'forms-enter-submits',
  category: 'forms',
  source: 'vercel',
  title: 'Enter Submits',
  description: '...',
  sourceQuote: '...',
  additionalExplanation: '...',
  sourceLinks: [...],
  badExampleKey: 'forms-enter-submits-bad',
  goodExampleKey: 'forms-enter-submits-good',
}
```

Target MDX format:
```mdx
---
id: forms-enter-submits
title: Enter Submits
source: vercel
category: forms
---

## The Principle

<Callout type="quote">
"Enter submits..."
</Callout>

<ExampleComparison>
  <ExampleComparison.Bad><EnterSubmitsBad /></ExampleComparison.Bad>
  <ExampleComparison.Good><EnterSubmitsGood /></ExampleComparison.Good>
</ExampleComparison>
```

## Proposed Solutions

### Option A: Automated Script
Write a Node.js script to convert principles.ts to MDX files automatically.
- **Pros:** Fast, consistent
- **Cons:** May need manual polish
- **Effort:** Medium (2-3 hours)

### Option B: Manual Conversion
Convert each principle by hand with custom content.
- **Pros:** High quality, custom content
- **Cons:** Time-consuming (78 files)
- **Effort:** High (8+ hours)

## Recommended Action

_To be filled during triage_

## Acceptance Criteria

- [ ] All 78 principles have MDX files
- [ ] Frontmatter includes id, title, source, category
- [ ] Examples render correctly
- [ ] Agent rules preserved
- [ ] Old principles.ts can be removed

## Work Log

### 2025-01-15 - Created Issue

**By:** Claude Code

**Actions:**
- Created tracking issue
- Documented current vs target format
- Blocked by issues 004, 005
