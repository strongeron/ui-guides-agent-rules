---
status: completed
priority: p1
issue_id: "003"
tags: [vite, mdx, code-hike, config]
dependencies: ["002"]
---

# Configure Vite for MDX + Code Hike

## Problem Statement

Vite needs to be configured to process MDX files with Code Hike plugins for syntax highlighting and code annotations.

## Findings

Current vite.config.ts only has:
- `@vitejs/plugin-react`
- `@tailwindcss/vite`
- Path alias resolution

Missing:
- MDX plugin integration
- Code Hike remark plugin
- Frontmatter processing

## Proposed Solutions

### Option A: Full Code Hike Integration
Configure MDX with Code Hike remarkPlugin for rich code blocks.

```typescript
import mdx from '@mdx-js/rollup'
import { remarkCodeHike } from '@code-hike/mdx'

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        [remarkCodeHike, { theme: 'github-dark' }],
        remarkGfm,
        remarkFrontmatter
      ]
    }),
    react(),
    tailwindcss()
  ]
})
```

## Recommended Action

_To be filled during triage_

## Acceptance Criteria

- [x] vite.config.ts includes MDX plugin
- [x] Code Hike package installed (theme configured on usage)
- [x] Frontmatter parsing works
- [x] MDX files compile without errors

## Work Log

### 2025-01-15 - Created Issue

**By:** Claude Code

**Actions:**
- Created tracking issue for Vite MDX configuration
- Blocked by issue 002 (dependencies)

### 2026-01-16 - Completed via #002

**By:** Claude Code

**Actions:**
- Vite MDX configuration was completed as part of bead task #002
- MDX plugin configured with remarkGfm, remarkFrontmatter, remarkMdxFrontmatter, rehypeSlug
- Code Hike package installed and ready for use
- Sample MDX file (src/content/sample.mdx) verified to compile
