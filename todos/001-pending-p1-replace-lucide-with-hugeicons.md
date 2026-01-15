---
status: pending
priority: p1
issue_id: "001"
tags: [icons, hugeicons, lucide-react, migration]
dependencies: []
---

# Replace lucide-react with HUGEICONS

## Problem Statement

HUGEICONS package is installed but not used. 19 files still import from `lucide-react` instead of using the configured HUGEICONS library.

## Findings

Files using lucide-react:
- `src/components/Header.tsx` - Menu icon
- `src/components/Sidebar.tsx` - X (close) icon
- `src/components/Navigation.tsx` - ChevronLeft, ChevronRight
- `src/components/PrincipleView.tsx` - ExternalLink, AlertCircle, CheckCircle, Copy, Check
- Multiple example components in `src/components/examples/`

## Proposed Solutions

### Option A: Full Migration
Replace all lucide-react imports with HUGEICONS equivalents across all 19 files.
- **Pros:** Consistent icon library, smaller bundle (single library)
- **Cons:** Time-consuming, need to find HUGEICONS equivalents for each icon
- **Effort:** Medium (2-3 hours)

### Option B: Core Components Only
Replace lucide-react only in core components (Header, Sidebar, Navigation, PrincipleView), leave examples as-is.
- **Pros:** Quick wins, examples intentionally use various approaches
- **Cons:** Mixed icon libraries in codebase
- **Effort:** Low (30-60 minutes)

## Recommended Action

_To be filled during triage_

## Acceptance Criteria

- [ ] Core components use HUGEICONS
- [ ] No lucide-react imports in core layout components
- [ ] Build passes without errors
- [ ] Icons render correctly in UI

## Work Log

### 2025-01-15 - Initial Discovery

**By:** Claude Code

**Actions:**
- Identified 19 files using lucide-react via grep
- Verified HUGEICONS package is installed in package.json
- Created this tracking issue

**Learnings:**
- HUGEICONS uses different naming conventions than lucide-react
- Need to verify icon name mappings before migration
