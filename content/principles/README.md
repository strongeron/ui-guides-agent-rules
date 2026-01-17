# Principles Content (MDX)

This directory contains MDX files for each principle in the Web UI Guidelines.

## Directory Structure

```
content/principles/
├── animations/
├── content/
├── design/
├── forms/
│   └── enter-submits.mdx
├── interactions/
├── layout/
└── performance/
```

## MDX File Format

Each principle has a corresponding MDX file with:

### Frontmatter (Required)

```yaml
---
id: forms-enter-submits              # Unique principle ID
category: forms                       # Category (matches directory)
source: vercel                        # Pattern source
title: Enter Submits                  # Display title
description: Brief description        # Short description
badExampleKey: forms-enter-submits-bad   # Key for bad example component
goodExampleKey: forms-enter-submits-good # Key for good example component
---
```

### Content Components

Import MDX components at the top:

```mdx
import { Callout, ExampleComparison, CodeBlock } from '@/components/mdx';
```

Available components:

- `<Callout type="quote|info|warning|tip" title="...">` - Highlighted callout boxes
- `<ExampleComparison badKey="..." goodKey="..." />` - Side-by-side examples
- `<CodeBlock title="..." language="tsx">` - Syntax-highlighted code

### Example Structure

```mdx
<Callout type="quote" title="From the Guidelines">
  The original quote from the source guidelines.
</Callout>

## Why This Matters

Explanation of the principle...

## Implementation

<ExampleComparison
  badKey="category-principle-bad"
  goodKey="category-principle-good"
/>

<CodeBlock title="Good Implementation">
\`\`\`tsx
// Code example
\`\`\`
</CodeBlock>

## Learn More

- [Link text](url)
```

## File Naming

Files should be named using the principle's slug (kebab-case):
- `enter-submits.mdx` for `forms-enter-submits`
- `keyboard-everywhere.mdx` for `interactions-keyboard-everywhere`
