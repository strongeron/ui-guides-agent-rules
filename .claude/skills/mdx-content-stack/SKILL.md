---
name: mdx-content-stack
description: Build content-driven React apps with MDX, Vite, and auto-discovered components. Use when creating documentation sites, guidelines showcases, educational platforms, pattern libraries, or any project needing rich content pages with interactive React components embedded in markdown.
---

# MDX Content Stack

Build content-driven React applications where MDX files define pages with embedded interactive components, frontmatter metadata, and auto-discovery patterns.

## Quick Start

**1. Vite MDX Setup:**

```typescript
// vite.config.ts
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        remarkGfm,
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
      ],
      rehypePlugins: [rehypeSlug],
      providerImportSource: '@mdx-js/react',
    }),
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
});
```

**2. Create MDX Content:**

```mdx
---
id: my-principle
category: forms
title: Enter Submits
description: When a text input is focused, Enter should submit
badExampleKey: forms-enter-submits-bad
goodExampleKey: forms-enter-submits-good
---

import { Callout, ExampleComparison } from '@/components/mdx';

<Callout type="quote" title="From the Guidelines">
  Enter submits when a text input is focused.
</Callout>

## Why This Matters

Users expect pressing Enter to submit forms.

<ExampleComparison
  badKey="forms-enter-submits-bad"
  goodKey="forms-enter-submits-good"
/>
```

**3. Auto-Discover Examples:**

```typescript
// ExampleRenderer.tsx
const exampleModules = import.meta.glob<{ [key: string]: ComponentType }>(
  './examples/**/*.tsx',
  { eager: false }
);

// Converts: ./examples/forms/EnterSubmitsBad.tsx → forms-enter-submits-bad
```

## When To Use This Stack

### Ideal Use Cases

| Project Type | Why MDX Works |
|--------------|---------------|
| **Documentation sites** | Mix prose with live code examples |
| **Design systems** | Component demos embedded in guidelines |
| **Educational platforms** | Interactive exercises in lessons |
| **Pattern libraries** | Good/bad examples with explanations |
| **Style guides** | Rules with live previews |
| **API references** | Endpoints with playground widgets |
| **Tutorials** | Step-by-step with runnable code |

### When NOT To Use

- **Pure SPA** - No content pages, just app UI
- **E-commerce** - Product pages from CMS/database
- **Real-time apps** - Chat, dashboards, collaborative tools
- **Content from external CMS** - Use CMS API instead
- **High SEO needs** - Consider Next.js/Astro with SSG

## Architecture Patterns

### Content Organization

```
content/
└── principles/           # or pages/, docs/, guides/
    ├── animations/
    │   ├── prefers-reduced-motion.mdx
    │   └── compositor-friendly.mdx
    ├── forms/
    │   ├── enter-submits.mdx
    │   └── labels-everywhere.mdx
    └── performance/
        └── minimize-rerenders.mdx
```

### Component Auto-Discovery

Examples are discovered automatically - no manual registration:

```
src/components/examples/
├── forms/
│   ├── EnterSubmitsGood.tsx    → forms-enter-submits-good
│   └── EnterSubmitsBad.tsx     → forms-enter-submits-bad
└── animations/
    ├── ReducedMotionGood.tsx   → animations-reduced-motion-good
    └── ReducedMotionBad.tsx    → animations-reduced-motion-bad
```

**Key pattern:** File path converts to kebab-case key:
- `PascalCase` → `kebab-case`
- Directory becomes prefix: `forms/EnterSubmitsBad.tsx` → `forms-enter-submits-bad`

### Custom MDX Components

Create reusable components for consistent content patterns:

```typescript
// src/components/mdx/index.ts
export { Callout } from './Callout';
export { ExampleComparison } from './ExampleComparison';
export { CodeBlock } from './CodeBlock';
```

**Callout types:** `info`, `warning`, `tip`, `quote`

```mdx
<Callout type="warning" title="Important">
  This pattern can cause accessibility issues.
</Callout>
```

**Side-by-side comparisons:**

```mdx
<ExampleComparison
  badKey="forms-enter-submits-bad"
  goodKey="forms-enter-submits-good"
  badTitle="Without Enter Submit"
  goodTitle="With Enter Submit"
/>
```

### Frontmatter as Data Source

Frontmatter becomes typed metadata accessible in your app:

```typescript
// types/principle.ts
interface Principle {
  id: string;
  category: PrincipleCategory;
  title: string;
  description: string;
  badExampleKey: string;
  goodExampleKey: string;
}

type PrincipleCategory = 'forms' | 'animations' | 'layout' | 'content';
```

## Essential Dependencies

```json
{
  "dependencies": {
    // MDX Core
    "@mdx-js/react": "^3.1.1",
    "@mdx-js/rollup": "^3.1.1",
    "remark-frontmatter": "^5.0.0",
    "remark-gfm": "^4.0.1",
    "remark-mdx-frontmatter": "^5.2.0",
    "rehype-slug": "^6.0.0",

    // shadcn/ui + Radix primitives
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.2.6",
    "@radix-ui/react-slot": "^1.2.4",

    // Styling utilities
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.4.0",

    // Animation (optional)
    "motion": "^12.28.1"
  },
  "devDependencies": {
    "shadcn": "^3.6.0",
    "tailwindcss": "^4.1.18",
    "@tailwindcss/vite": "^4.1.18"
  }
}
```

## shadcn/ui Integration

### Setup shadcn with MDX

**1. Initialize shadcn:**
```bash
npx shadcn@latest init
```

**2. components.json configuration:**
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "stone",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

**3. Add components:**
```bash
npx shadcn@latest add card button dialog tabs
```

### Using shadcn in MDX Components

**Pattern:** Wrap shadcn components in domain-specific MDX components:

```typescript
// src/components/mdx/ExampleComparison.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExampleRenderer } from '../ExampleRenderer';

export function ExampleComparison({ badKey, goodKey }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
      <Card className="bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-error">Bad Example</CardTitle>
        </CardHeader>
        <CardContent>
          <ExampleRenderer exampleKey={badKey} />
        </CardContent>
      </Card>
      {/* Good example card... */}
    </div>
  );
}
```

**Don't use shadcn directly in MDX files:**
```mdx
// ❌ Avoid - verbose and couples content to UI library
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader><CardTitle>Example</CardTitle></CardHeader>
  <CardContent>...</CardContent>
</Card>
```

**Do create semantic MDX wrappers:**
```mdx
// ✅ Clean - semantic, reusable, decoupled
import { ExampleComparison } from '@/components/mdx';

<ExampleComparison badKey="forms-bad" goodKey="forms-good" />
```

### The cn() Utility

Essential for merging Tailwind classes in components:

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Usage in MDX components:
```typescript
export function Callout({ type, className, children }: Props) {
  return (
    <div className={cn(
      "p-4 my-6 rounded-r-lg border-l-4",
      typeStyles[type],
      className  // Allow overrides from MDX
    )}>
      {children}
    </div>
  );
}
```

## Guidelines

- Keep MDX files focused on content - complex logic belongs in components
- Use frontmatter for metadata, not configuration
- Auto-discover components via `import.meta.glob` - avoid manual registries
- Create custom MDX components for repeated content patterns
- Type your frontmatter - it's your content schema
- Organize content by category in directories
- Name example files with Good/Bad suffix for clear intent

## Common Mistakes

**Don't:** Import components in every MDX file
```mdx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

**Do:** Create domain-specific MDX components
```mdx
import { ExampleComparison } from '@/components/mdx';
<ExampleComparison badKey="..." goodKey="..." />
```

**Don't:** Manual component registration
```typescript
const components = {
  'forms-enter-submits-bad': EnterSubmitsBad,
  'forms-enter-submits-good': EnterSubmitsGood,
  // ... 50 more entries
};
```

**Do:** Auto-discovery with glob
```typescript
const modules = import.meta.glob('./examples/**/*.tsx');
```

## Advanced Patterns

For detailed implementation patterns, see [REFERENCE.md](REFERENCE.md).
