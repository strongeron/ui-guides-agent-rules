---
status: completed
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

- [x] All 82 principles have MDX files
- [x] Frontmatter includes id, title, source, category
- [x] Examples render correctly via ExampleComparison component
- [x] Agent rules preserved (remain in agentRules.ts, linked by principle ID)
- [ ] Old principles.ts can be removed (kept for now as data source)

## Work Log

### 2025-01-15 - Created Issue

**By:** Claude Code

**Actions:**
- Created tracking issue
- Documented current vs target format
- Blocked by issues 004, 005

### 2026-01-17 - Completed

**By:** Claude Code

**Actions:**
- Created automated conversion script `scripts/convert-principles-to-mdx.cjs`
- Generated 75 new MDX files (7 already existed from prior work)
- Total: 82 MDX files covering all principles
- Each MDX file includes:
  - Frontmatter with id, category, source, title, description, badExampleKey, goodExampleKey
  - Import for Callout and ExampleComparison MDX components
  - Source quote in Callout component
  - "Why This Matters" section with additionalExplanation
  - ExampleComparison component for good/bad examples
  - "Learn More" section with sourceLinks
- Verified TypeScript compiles without errors
