---
status: pending
priority: p1
issue_id: "002"
tags: [mdx, code-hike, vite, dependencies]
dependencies: []
---

# Install MDX + Code Hike Dependencies

## Problem Statement

MDX and Code Hike infrastructure is completely missing. The plan calls for MDX-based content with Code Hike syntax highlighting, but no dependencies are installed.

## Findings

Missing packages:
- `@mdx-js/rollup` - MDX plugin for Vite/Rollup
- `@code-hike/mdx` - Code Hike syntax highlighting
- `remark-gfm` - GitHub Flavored Markdown
- `remark-frontmatter` - YAML frontmatter parsing
- `remark-mdx-frontmatter` - Expose frontmatter to MDX
- `rehype-slug` - Add IDs to headings

## Proposed Solutions

### Option A: Full MDX Stack
Install all MDX + Code Hike dependencies and configure Vite.
- **Pros:** Rich content authoring, syntax highlighting, annotations
- **Cons:** Adds complexity, bundle size increase
- **Effort:** Medium (1-2 hours for setup)

### Option B: MDX Only (No Code Hike)
Install basic MDX support without Code Hike.
- **Pros:** Simpler setup, smaller bundle
- **Cons:** No fancy code annotations
- **Effort:** Low (30 minutes)

## Recommended Action

_To be filled during triage_

## Acceptance Criteria

- [ ] MDX dependencies installed
- [ ] Vite configured with MDX plugin
- [ ] Sample .mdx file renders correctly
- [ ] Code blocks have syntax highlighting

## Work Log

### 2025-01-15 - Initial Assessment

**By:** Claude Code

**Actions:**
- Checked package.json - no MDX deps present
- Checked vite.config.ts - no MDX plugin
- Verified no .mdx files exist in project

**Learnings:**
- Clean slate for MDX setup
- Will need TypeScript types for MDX imports
