# MDX Content Stack Reference

Detailed implementation patterns for MDX-driven content applications with shadcn/ui integration.

## Complete Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeSlug from 'rehype-slug';
import path from 'path';

export default defineConfig({
  plugins: [
    // MDX must come before React plugin
    mdx({
      remarkPlugins: [
        remarkGfm,                                    // Tables, strikethrough, etc.
        remarkFrontmatter,                            // Parse YAML frontmatter
        [remarkMdxFrontmatter, { name: 'frontmatter' }], // Export as 'frontmatter'
      ],
      rehypePlugins: [
        rehypeSlug,                                   // Add IDs to headings
      ],
      providerImportSource: '@mdx-js/react',         // Enable MDXProvider
    }),
    // Include MDX in React processing
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

## Plugin Purposes

| Plugin | Purpose |
|--------|---------|
| `@mdx-js/rollup` | Core MDX compilation for Vite |
| `remark-gfm` | GitHub Flavored Markdown (tables, task lists) |
| `remark-frontmatter` | Parse YAML/TOML frontmatter |
| `remark-mdx-frontmatter` | Export frontmatter as JS variable |
| `rehype-slug` | Auto-generate heading IDs for anchor links |

## Component Auto-Discovery Pattern

### The Glob Pattern

```typescript
// src/components/ExampleRenderer.tsx
import { lazy, Suspense, ComponentType } from 'react';
import { pathToKey } from '@/utils/exampleKeys';

// Auto-discover all example components
const exampleModules = import.meta.glob<{ [key: string]: ComponentType }>(
  './examples/**/*.tsx',
  { eager: false }  // Lazy load
);

// Build registry from discovered modules
const exampleComponents: Record<string, ReturnType<typeof lazy>> = {};

for (const path of Object.keys(exampleModules)) {
  const key = pathToKey(path);
  if (key) {
    exampleComponents[key] = lazy(async () => {
      const module = await exampleModules[path]();
      const componentName = Object.keys(module).find(
        (name) => typeof module[name] === 'function'
      );
      if (componentName) {
        return { default: module[componentName] as ComponentType };
      }
      throw new Error(`No component found in ${path}`);
    });
  }
}

// Render component by key
export function ExampleRenderer({ exampleKey }: { exampleKey: string }) {
  const Component = exampleComponents[exampleKey];

  if (!Component) {
    return <div>Example "{exampleKey}" not found</div>;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
}
```

### Path-to-Key Conversion

```typescript
// src/utils/exampleKeys.ts

/**
 * Convert file paths to example keys
 * @example
 * pathToKey('./examples/forms/EnterSubmitsBad.tsx')
 * // Returns: 'forms-enter-submits-bad'
 */
export function pathToKey(path: string): string {
  const match = path.match(/\.\/examples\/(.+)\/(.+)\.tsx$/);
  if (!match) return '';

  const [, category, fileName] = match;
  // Convert PascalCase to kebab-case
  const kebabName = fileName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();

  return `${category}-${kebabName}`;
}

/**
 * Convert PascalCase to kebab-case
 * @example pascalToKebab('EnterSubmitsBad') // 'enter-submits-bad'
 */
export function pascalToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
```

## Custom MDX Components

### Callout Component

```typescript
// src/components/mdx/Callout.tsx
import { ReactNode } from 'react';

type CalloutType = 'info' | 'warning' | 'tip' | 'quote';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const styles: Record<CalloutType, { container: string; icon: string }> = {
  info: {
    container: 'bg-blue-50 border-l-4 border-blue-500',
    icon: 'text-blue-500',
  },
  warning: {
    container: 'bg-amber-50 border-l-4 border-amber-500',
    icon: 'text-amber-500',
  },
  tip: {
    container: 'bg-green-50 border-l-4 border-green-500',
    icon: 'text-green-500',
  },
  quote: {
    container: 'bg-gray-100 border-l-4 border-gray-400',
    icon: 'text-gray-500',
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const style = styles[type];

  return (
    <div className={`${style.container} p-4 my-6 rounded-r-lg`}>
      {title && <h4 className="font-semibold text-sm mb-1">{title}</h4>}
      <div className={`text-sm ${type === 'quote' ? 'italic' : ''}`}>
        {children}
      </div>
    </div>
  );
}
```

### Example Comparison Component

```typescript
// src/components/mdx/ExampleComparison.tsx
import { ExampleRenderer } from '../ExampleRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ExampleComparisonProps {
  badKey: string;
  goodKey: string;
  badTitle?: string;
  goodTitle?: string;
}

export function ExampleComparison({
  badKey,
  goodKey,
  badTitle = 'Bad Example',
  goodTitle = 'Good Example',
}: ExampleComparisonProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">{badTitle}</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[200px] flex items-center justify-center">
          <ExampleRenderer exampleKey={badKey} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">{goodTitle}</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[200px] flex items-center justify-center">
          <ExampleRenderer exampleKey={goodKey} />
        </CardContent>
      </Card>
    </div>
  );
}
```

### CodeBlock with Copy

```typescript
// src/components/mdx/CodeBlock.tsx
import { useState, ReactNode } from 'react';

interface CodeBlockProps {
  title?: string;
  children: ReactNode;
}

export function CodeBlock({ title, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const codeElement = document.querySelector('[data-code-block-content]');
    const text = codeElement?.textContent || '';
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
          <span className="text-sm font-medium">{title}</span>
          <button onClick={handleCopy} className="text-sm">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <div data-code-block-content className="p-4 overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
```

### Export Barrel

```typescript
// src/components/mdx/index.ts
export { Callout } from './Callout';
export { ExampleComparison } from './ExampleComparison';
export { CodeBlock } from './CodeBlock';
```

## Frontmatter Type System

### Define Content Schema

```typescript
// src/types/principle.ts
export type PrincipleCategory =
  | 'interactions'
  | 'animations'
  | 'layout'
  | 'content'
  | 'forms'
  | 'performance'
  | 'design';

export interface Principle {
  id: string;
  category: PrincipleCategory;
  title: string;
  description: string;
  badExampleKey: string;
  goodExampleKey: string;
  // Optional fields
  source?: PatternSource;
  sourceLinks?: SourceLink[];
}

export interface SourceLink {
  text: string;
  url: string;
}

export type PatternSource = 'vercel' | 'wcag' | 'aria' | 'custom';
```

### Category Metadata

```typescript
// src/data/categories.ts
import { CategoryInfo } from '@/types/principle';

export const categories: CategoryInfo[] = [
  {
    id: 'forms',
    title: 'Forms',
    description: 'Form controls, validation, and user input handling'
  },
  {
    id: 'animations',
    title: 'Animations',
    description: 'Motion design principles and animation best practices'
  },
  // ...
];
```

## Project Architectures

### Documentation Site

```
project/
├── content/
│   └── docs/
│       ├── getting-started/
│       │   ├── installation.mdx
│       │   └── quick-start.mdx
│       ├── guides/
│       │   ├── authentication.mdx
│       │   └── deployment.mdx
│       └── api/
│           ├── endpoints.mdx
│           └── webhooks.mdx
├── src/
│   ├── components/
│   │   ├── mdx/
│   │   │   ├── Callout.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   └── ApiPlayground.tsx
│   │   └── layout/
│   │       ├── DocsSidebar.tsx
│   │       └── DocsLayout.tsx
│   └── types/
│       └── docs.ts
```

### Pattern Library / Style Guide

```
project/
├── content/
│   └── principles/
│       ├── animations/
│       ├── forms/
│       ├── layout/
│       └── accessibility/
├── src/
│   ├── components/
│   │   ├── mdx/
│   │   │   ├── Callout.tsx
│   │   │   └── ExampleComparison.tsx
│   │   └── examples/
│   │       ├── animations/
│   │       │   ├── ReducedMotionGood.tsx
│   │       │   └── ReducedMotionBad.tsx
│   │       └── forms/
│   │           ├── EnterSubmitsGood.tsx
│   │           └── EnterSubmitsBad.tsx
│   └── types/
│       └── principle.ts
```

### Educational Platform

```
project/
├── content/
│   └── courses/
│       └── react-fundamentals/
│           ├── 01-introduction.mdx
│           ├── 02-components.mdx
│           └── 03-state.mdx
├── src/
│   ├── components/
│   │   ├── mdx/
│   │   │   ├── Callout.tsx
│   │   │   ├── Quiz.tsx
│   │   │   ├── Exercise.tsx
│   │   │   └── CodePlayground.tsx
│   │   └── course/
│   │       ├── LessonNav.tsx
│   │       └── ProgressTracker.tsx
│   └── types/
│       └── course.ts
```

## shadcn/ui + MDX Integration

### Architecture Pattern

```
src/
├── components/
│   ├── ui/                    # shadcn/ui primitives (don't import in MDX)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── tabs.tsx
│   ├── mdx/                   # MDX-specific wrappers (import in MDX)
│   │   ├── Callout.tsx        # Uses ui/card internally
│   │   ├── ExampleComparison.tsx
│   │   ├── CodeBlock.tsx      # Uses ui/button for copy
│   │   └── index.ts
│   └── examples/              # Interactive demos (auto-discovered)
│       └── forms/
│           └── EnterSubmitsGood.tsx  # Can use any ui/* components
└── lib/
    └── utils.ts               # cn() utility
```

### Why This Separation?

1. **MDX files stay clean** - No verbose UI library imports
2. **Easy to swap UI libraries** - Only change mdx/ wrappers
3. **Consistent styling** - All callouts look the same
4. **Type safety** - Props are domain-specific, not generic

### Complete MDX Component with shadcn

```typescript
// src/components/mdx/InteractiveDemo.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface InteractiveDemoProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function InteractiveDemo({
  title,
  description,
  children,
  className,
}: InteractiveDemoProps) {
  const [activeTab, setActiveTab] = useState('preview');

  return (
    <Card className={cn("my-8", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-4">
            <div className="p-6 border rounded-lg bg-background">
              {children}
            </div>
          </TabsContent>
          <TabsContent value="code" className="mt-4">
            {/* Code view */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
```

Usage in MDX:
```mdx
import { InteractiveDemo } from '@/components/mdx';

<InteractiveDemo title="Form Validation" description="Try submitting with empty fields">
  <MyFormComponent />
</InteractiveDemo>
```

### CVA Variants Pattern

For complex MDX components with multiple variants:

```typescript
// src/components/mdx/callout.variants.ts
import { cva } from 'class-variance-authority';

export const calloutVariants = cva(
  "p-4 my-6 rounded-r-lg border-l-4",
  {
    variants: {
      type: {
        info: "bg-blue-50 border-blue-500 dark:bg-blue-950",
        warning: "bg-amber-50 border-amber-500 dark:bg-amber-950",
        tip: "bg-green-50 border-green-500 dark:bg-green-950",
        quote: "bg-muted border-muted-foreground/40 italic",
      },
    },
    defaultVariants: {
      type: "info",
    },
  }
);

// src/components/mdx/Callout.tsx
import { calloutVariants } from './callout.variants';
import type { VariantProps } from 'class-variance-authority';

interface CalloutProps extends VariantProps<typeof calloutVariants> {
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
  return (
    <div className={calloutVariants({ type })}>
      {title && <h4 className="font-semibold mb-1">{title}</h4>}
      <div className="text-sm">{children}</div>
    </div>
  );
}
```

### Dialog/Modal in MDX

```typescript
// src/components/mdx/ExpandableExample.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExampleRenderer } from '../ExampleRenderer';

interface ExpandableExampleProps {
  exampleKey: string;
  title: string;
}

export function ExpandableExample({ exampleKey, title }: ExpandableExampleProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Full Example</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ExampleRenderer exampleKey={exampleKey} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### Recommended shadcn Components for MDX

| Component | MDX Use Case |
|-----------|--------------|
| `Card` | Content containers, example boxes |
| `Tabs` | Code/preview toggles, variant demos |
| `Dialog` | Expanded views, fullscreen examples |
| `Button` | Copy buttons, action triggers |
| `Badge` | Category tags, status indicators |
| `Popover` | Tooltips, contextual help |
| `Switch` | Interactive toggles in demos |
| `Checkbox` | Form examples, option lists |

## CodeHike Integration

[CodeHike](https://codehike.org/) transforms code blocks into rich, interactive experiences.

### Full Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import { remarkCodeHike, recmaCodeHike } from 'codehike/mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const chConfig = {
  components: { code: "Code" },
  syntaxHighlighting: {
    theme: "github-dark",
  },
};

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        remarkGfm,
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
        [remarkCodeHike, chConfig],
      ],
      recmaPlugins: [[recmaCodeHike, chConfig]],
      providerImportSource: '@mdx-js/react',
    }),
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
});
```

### CodeHike Component Setup

```typescript
// src/components/mdx/Code.tsx
import { Pre, RawCode, highlight } from "codehike/code";

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark");
  return <Pre code={highlighted} />;
}
```

Register in MDX provider:
```typescript
// src/components/MDXProvider.tsx
import { MDXProvider } from '@mdx-js/react';
import { Code } from './mdx/Code';

const components = {
  Code,
};

export function MDXWrapper({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
```

### CodeHike Features in MDX

**Line Focus:**
```mdx
```tsx
// !focus[2:4]
function Component() {
  const [value, setValue] = useState('');
  const handleChange = (e) => setValue(e.target.value);
  return <input value={value} onChange={handleChange} />;
}
```

**Annotations:**
```mdx
```tsx
function Example() {
  // !callout[/useState/] React hook for local state
  const [count, setCount] = useState(0);
  return <button>{count}</button>;
}
```

**Diff Highlighting:**
```mdx
```tsx
function Component() {
-  const value = props.value;
+  const { value } = props;
  return <div>{value}</div>;
}
```

**File Tabs:**
```mdx
<CodeWithTabs>
```tsx App.tsx
export function App() {
  return <Counter />;
}
```

```tsx Counter.tsx
export function Counter() {
  const [count, setCount] = useState(0);
  return <button>{count}</button>;
}
```
</CodeWithTabs>
```

### When to Use CodeHike

| Use Case | CodeHike Benefit |
|----------|------------------|
| Tutorials | Step-through with focus changes |
| API docs | Highlight specific parameters |
| Code reviews | Show diffs with explanations |
| Pattern comparison | Side-by-side with annotations |

## Alternative Frameworks

### When to Consider Next.js + MDX

- Need SSG/SSR for SEO
- Server components for large content sets
- File-based routing matches content structure
- Incremental static regeneration

### When to Consider Astro + MDX

- Primarily static content
- Minimal JavaScript needed
- Multi-framework components (React + Vue + Svelte)
- Maximum performance priority

### When Vite + MDX Excels

- Client-side React app with content sections
- Fast development iteration
- Full React ecosystem (no framework constraints)
- Interactive content with complex state
