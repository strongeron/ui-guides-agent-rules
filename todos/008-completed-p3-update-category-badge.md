---
status: completed
priority: p3
issue_id: "008"
tags: [shadcn, badge, polish]
dependencies: []
---

# Update Category Badge in PrincipleView to Use shadcn Badge

## Problem Statement

Category badge in PrincipleView still uses hardcoded Tailwind classes instead of the shadcn Badge component for consistency.

## Findings

Current (PrincipleView.tsx line 33-35):
```tsx
<div className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
  {principle.category.toUpperCase()}
</div>
```

Should use shadcn Badge for consistency with SourceBadge.

## Proposed Solutions

Replace with shadcn Badge:
```tsx
<Badge variant="secondary" className="uppercase">
  {principle.category}
</Badge>
```

## Recommended Action

Simple replacement - can be done immediately.

## Acceptance Criteria

- [x] Category badge uses shadcn Badge component
- [x] Visual appearance matches design
- [x] Consistent with SourceBadge styling

## Work Log

### 2025-01-15 - Created Issue

**By:** Claude Code

**Actions:**
- Identified inconsistency in PrincipleView
- Created tracking issue for polish

### 2026-01-17 - Completed

**By:** Claude Code

**Actions:**
- Imported Badge component from @/components/ui/badge
- Replaced hardcoded div with `<Badge variant="secondary" className="uppercase">`
- Verified TypeScript compiles without errors
