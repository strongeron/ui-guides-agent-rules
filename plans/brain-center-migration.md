# Web UI Patterns - Incremental Evolution Plan

## Approach: Option B (Incremental)

Add shadcn + Base UI to existing project, keep TypeScript data model, defer MDX/Code Hike until needed.

**Timeline:** 3-5 days | **Risk:** Low | **Preserves:** All 164 examples, keyboard nav, search

---

## Phase 1: Design Foundation (Days 1-2)

### 1.1 Add shadcn to Existing Project

```bash
cd /Users/strongeron/Evil\ Martians/Guides/web-ui_guide_react
bunx --bun shadcn@latest init
```

Configuration during init:
- Base: **Base UI**
- Style: **Vega**
- Base Color: **Stone**
- CSS Variables: **Yes**

### 1.2 Add Required Components

```bash
bunx --bun shadcn@latest add button input card badge tabs
```

### 1.3 Configure Design Tokens

**JetBrains Mono Font:**
```css
/* src/index.css */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

:root {
  --font-mono: 'JetBrains Mono', monospace;
}
```

**Lime Theme:**
```css
/* src/index.css - override shadcn tokens */
:root {
  --primary: 84 81% 44%;        /* lime-500 */
  --primary-foreground: 0 0% 100%;
  --accent: 82 78% 55%;         /* lime-400 */
}
```

### 1.4 Add HUGEICONS

```bash
bun add @hugeicons/react
```

Replace lucide-react icons with HUGEICONS equivalents.

---

## Phase 2: Component Updates (Days 2-3)

### 2.1 Update Core Components

| Current | Replace With | Notes |
|---------|--------------|-------|
| Custom buttons | `@/components/ui/button` | Keep existing handlers |
| Custom inputs | `@/components/ui/input` | Preserve autocomplete attrs |
| Custom cards | `@/components/ui/card` | Good/Bad example containers |
| Custom badges | `@/components/ui/badge` | Category badges |

### 2.2 Preserve Critical Patterns

**DO NOT CHANGE:**
- `ExampleRenderer.tsx` - Excellent lazy loading via `import.meta.glob`
- Hash-based URL routing
- Keyboard navigation (arrow keys, Escape)
- Focus trap in sidebar

### 2.3 Update Example Components

Batch update examples by category:
1. `forms/` - 15 pairs (30 components)
2. `interactions/` - 23 pairs (46 components)
3. `animations/` - 8 pairs (16 components)
4. `content/` - 16 pairs (32 components)
5. `design/` - 7 pairs (14 components)
6. `layout/` - 6 pairs (12 components)
7. `performance/` - 7 pairs (14 components)

**Update pattern per component:**
```typescript
// Before
<button className="px-4 py-2 bg-blue-600 text-white rounded">

// After
import { Button } from '@/components/ui/button'
<Button>
```

---

## Phase 3: Source Tagging (Days 4-5)

### 3.1 Extend Type Definition

```typescript
// src/types/principle.ts
export type PatternSource = 'vercel' | 'wcag' | 'aria' | 'design-system' | 'custom';

export interface Principle {
  // ... existing fields ...
  source?: PatternSource;  // Add this
}
```

### 3.2 Add Source to Existing Data

```typescript
// src/data/principles.ts
{
  id: 'forms-enter-submits',
  source: 'vercel',  // Add to each principle
  // ... rest of existing fields
}
```

### 3.3 Create SourceBadge Component

```typescript
// src/components/SourceBadge.tsx
import { Badge } from '@/components/ui/badge'

const sourceConfig = {
  vercel: { label: 'Vercel', className: 'bg-black text-white' },
  wcag: { label: 'WCAG', className: 'bg-blue-600 text-white' },
  aria: { label: 'ARIA', className: 'bg-purple-600 text-white' },
  'design-system': { label: 'Design System', className: 'bg-lime-600 text-white' },
  custom: { label: 'Custom', className: 'bg-stone-600 text-white' },
};

export function SourceBadge({ source }: { source: PatternSource }) {
  const config = sourceConfig[source];
  return <Badge className={config.className}>{config.label}</Badge>;
}
```

### 3.4 Update PrincipleView

Add SourceBadge next to category badge in header.

---

## Deferred (Add When Needed)

| Feature | Trigger | Implementation |
|---------|---------|----------------|
| MDX per pattern | Need rich prose content | `@mdx-js/rollup` + migrate one category |
| Code Hike | Need static code annotation | `@code-hike/mdx` + configure Vite |
| Path routing | SEO becomes important | `@tanstack/react-router` |
| Multi-source arrays | Add non-Vercel patterns | Extend type to `sources: PatternSource[]` |
| Related patterns | Design the UI | Add `relatedPatterns?: string[]` field |

---

## Files to Modify

### Core Configuration
- `package.json` - Add shadcn, HUGEICONS dependencies
- `src/index.css` - Add font, color tokens
- `components.json` - shadcn configuration (created by init)

### Type Definitions
- `src/types/principle.ts` - Add `PatternSource` type, `source` field

### Data
- `src/data/principles.ts` - Add `source: 'vercel'` to all 78 principles

### Components
- `src/components/ui/` - New shadcn components (created by add)
- `src/components/SourceBadge.tsx` - New
- `src/components/PrincipleView.tsx` - Update to use shadcn Card, add SourceBadge
- `src/components/Sidebar.tsx` - Update to use shadcn components
- `src/components/Header.tsx` - Update to use shadcn components
- `src/components/examples/**/*.tsx` - Update 164 examples to use shadcn

### Preserve (Do Not Modify Logic)
- `src/components/ExampleRenderer.tsx` - Keep lazy loading pattern
- `src/App.tsx` - Keep navigation, URL state logic

---

## Verification Plan

1. **Build succeeds:** `bun run build` completes without errors
2. **Dev server works:** `bun run dev` starts correctly
3. **Design applied:** JetBrains Mono, Lime theme, HUGEICONS visible
4. **All 78 patterns render:** Navigate through each pattern
5. **All 164 examples work:** Interactive Good/Bad examples function
6. **Keyboard navigation:** Arrow keys, Escape, Tab work
7. **Source badges display:** Each principle shows source badge
8. **Responsive design:** Test mobile breakpoints
9. **No bundle regression:** Build size stays under 100KB gzipped

---

## Success Criteria

- [ ] shadcn + Base UI components integrated
- [ ] JetBrains Mono font applied
- [ ] Lime color theme applied
- [ ] HUGEICONS replacing lucide-react
- [ ] All 164 example components updated
- [ ] Source tagging working
- [ ] Zero functionality regressions
