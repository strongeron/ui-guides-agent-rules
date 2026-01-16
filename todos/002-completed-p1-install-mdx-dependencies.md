---
status: completed
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

Option A: Full MDX Stack - Install all MDX + Code Hike dependencies.

## Acceptance Criteria

- [x] MDX dependencies installed
- [x] Vite configured with MDX plugin
- [x] Sample .mdx file created (src/content/sample.mdx)
- [x] Build passes with MDX configuration

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

### 2026-01-16 - MDX Infrastructure Complete

**By:** Claude Code

**Actions:**
- Installed MDX packages: @mdx-js/rollup, @mdx-js/react, remark-gfm, remark-frontmatter, remark-mdx-frontmatter, rehype-slug
- Installed Code Hike package: codehike
- Configured vite.config.ts with MDX plugin and remark/rehype plugins
- Added TypeScript module declaration for .mdx files in src/vite-env.d.ts
- Created sample MDX file at src/content/sample.mdx with frontmatter, code blocks, and tables
- Verified TypeScript type checking passes
- Verified production build passes

**Packages Installed:**
| Package | Purpose |
|---------|---------|
| @mdx-js/rollup | Vite/Rollup MDX plugin |
| @mdx-js/react | React MDX provider |
| remark-gfm | GitHub Flavored Markdown (tables, strikethrough) |
| remark-frontmatter | YAML frontmatter parsing |
| remark-mdx-frontmatter | Expose frontmatter as named export |
| rehype-slug | Auto-generate heading IDs |
| codehike | Code syntax highlighting and annotations |

**Configuration:**
- MDX plugin placed before React plugin in Vite config
- React plugin configured to include .mdx/.md extensions
- Frontmatter exposed as `frontmatter` named export
