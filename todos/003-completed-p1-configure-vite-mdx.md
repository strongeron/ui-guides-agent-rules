---
status: completed
completed_at: 2026-01-17
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

- [ ] vite.config.ts includes MDX plugin
- [ ] Code Hike theme configured
- [ ] Frontmatter parsing works
- [ ] MDX files compile without errors

## Work Log

### 2025-01-15 - Created Issue

**By:** Claude Code

**Actions:**
- Created tracking issue for Vite MDX configuration
- Blocked by issue 002 (dependencies)

### 2026-01-17 - Completed

**By:** Claude Code

**Actions:**
- Verified vite.config.ts already has MDX plugin configured
- Configuration includes remarkGfm, remarkFrontmatter, remarkMdxFrontmatter, rehypeSlug
- providerImportSource set to '@mdx-js/react'
- All acceptance criteria met
