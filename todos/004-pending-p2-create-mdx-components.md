---
status: pending
priority: p2
issue_id: "004"
tags: [mdx, components, react]
dependencies: ["003"]
---

# Create mdx-components.tsx for Custom Component Mapping

## Problem Statement

MDX needs a components file to map markdown elements to custom React components (shadcn Button, Card, etc.).

## Findings

No `mdx-components.tsx` exists. This file maps:
- `<h1>` → Custom heading with anchor
- `<pre>` → Code Hike code blocks
- `<a>` → Custom link component
- Custom components like `<ExampleComparison>`, `<AgentRuleCard>`

## Proposed Solutions

Create `src/mdx-components.tsx` with component mappings:

```tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ExampleComparison } from '@/components/patterns/ExampleComparison'

export function useMDXComponents(components) {
  return {
    h1: (props) => <h1 className="text-3xl font-bold" {...props} />,
    a: (props) => <a className="text-primary hover:underline" {...props} />,
    Button,
    Card,
    ExampleComparison,
    ...components,
  }
}
```

## Recommended Action

_To be filled during triage_

## Acceptance Criteria

- [ ] mdx-components.tsx created
- [ ] Headings render with proper styling
- [ ] Links use primary color
- [ ] Custom components available in MDX

## Work Log

### 2025-01-15 - Created Issue

**By:** Claude Code

**Actions:**
- Created tracking issue
- Blocked by issue 003 (Vite config)
