# Principles Quick Reference

## Existing Categories

| Category | ID | Description |
|----------|----|----|
| Interactions | `interactions` | Keyboard, focus, user interaction patterns |
| Animations | `animations` | Motion design and animation best practices |
| Layout | `layout` | Responsive design, alignment, structure |
| Content | `content` | Typography, accessibility, content presentation |
| Forms | `forms` | Form controls, validation, input handling |
| Performance | `performance` | Optimization and rendering efficiency |
| Design | `design` | Visual design principles |
| Aesthetics | `aesthetics` | Creative visual design for distinctive interfaces |

## Existing Sources

| Source | ID | Badge Color | URL |
|--------|----|----|-----|
| Vercel | `vercel` | Black/white | https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md |
| WCAG | `wcag` | Blue (info) | https://www.w3.org/WAI/WCAG21/quickref/ |
| ARIA | `aria` | Red (destructive) | https://www.w3.org/WAI/ARIA/apg/ |
| Design System | `design-system` | Primary | — |
| Tailwind | `tailwind` | Cyan (#38bdf8) | https://tailwindcss.com/docs |
| RAMS | `rams` | Purple | https://www.rams.ai/ |
| @Ibelick | `ibelick` | Amber | https://www.ui-skills.com/ |
| Claude Code | `claude-code` | Orange (#d97706) | https://claude.ai/code |
| Anthropic | `anthropic` | Terracotta (#cc785c) | https://github.com/anthropics/skills |
| Custom | `custom` | Muted | — |

## Anthropic Skills Repository

| Skill | Path | Use For |
|-------|------|---------|
| frontend-design | `skills/frontend-design/SKILL.md` | Typography, color, motion, layouts |
| ui-skills | `skills/ui-skills/SKILL.md` | Interface constraints, patterns |

**Base URL:** `https://github.com/anthropics/skills/blob/main/`

**Raw content URL:** `https://raw.githubusercontent.com/anthropics/skills/main/`

**Extracting principles from skills:**
1. Read the SKILL.md file for the relevant skill
2. Identify numbered guidelines or rules
3. Use exact wording for `sourceQuote`
4. Link to the skill file in `sourceLinks`

## File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Principle ID | `{category}-{name}` | `forms-enter-submits` |
| Bad Component | `{PrincipleName}Bad.tsx` | `EnterSubmitsBad.tsx` |
| Good Component | `{PrincipleName}Good.tsx` | `EnterSubmitsGood.tsx` |
| MDX File | `{principle-name}.mdx` | `enter-submits.mdx` |
| Example Key | `{category}-{kebab-name}-{good\|bad}` | `forms-enter-submits-bad` |

## Key Generation Algorithm

```
File Path → Example Key

1. ./examples/forms/EnterSubmitsBad.tsx
2. Extract: category="forms", filename="EnterSubmitsBad"
3. Convert PascalCase → kebab-case: "enter-submits-bad"
4. Combine: "forms-enter-submits-bad"
```

## Principle Object Template

```typescript
{
  id: 'category-principle-name',
  category: 'forms',
  source: 'vercel',
  title: 'Short Title',
  description: 'One sentence description',
  sourceQuote: 'Exact quote from source',
  additionalExplanation: 'Why this matters and how to implement.',
  sourceLinks: [
    { text: 'Link Text', url: 'https://...' }
  ],
  badExampleKey: 'category-principle-name-bad',
  goodExampleKey: 'category-principle-name-good'
}
```

## Semantic Color Tokens

### Backgrounds
- `bg-card` - Card background
- `bg-muted` - Muted/secondary background
- `bg-primary` - Primary action background
- `bg-destructive` - Error/danger background

### Text
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `text-destructive` - Error text (use in bad examples)
- `text-success` - Success text (use in good examples)
- `text-primary-foreground` - Text on primary background

### Borders
- `border-border` - Default border
- `border-ring` - Focus ring border
- `border-input` - Input border

## Common Tailwind Patterns

### Container
```tsx
<div className="w-full max-w-sm p-6 bg-card rounded-lg">
```

### Form Input
```tsx
<input className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
```

### Button
```tsx
<button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
```

### Explanation Text
```tsx
// Bad example
<p className="text-xs text-destructive mt-4">What's wrong here</p>

// Good example
<p className="text-xs text-success mt-4">Why this is better</p>
```

## Agent Rule Priorities

| Priority | Usage | Example |
|----------|-------|---------|
| `MUST` | Required, accessibility-critical | "Visible focus rings" |
| `SHOULD` | Best practice, recommended | "Disable spellcheck for emails" |
| `NEVER` | Anti-pattern to avoid | "Block paste in inputs" |

## MDX Frontmatter Schema

```yaml
---
id: string           # Required, matches principle ID
category: string     # Required, must be valid category
source: string       # Optional, must be valid source
title: string        # Required, display title
description: string  # Required, brief description
badExampleKey: string   # Required, matches bad component
goodExampleKey: string  # Required, matches good component
---
```

## Callout Types

| Type | Usage | Title Example |
|------|-------|---------------|
| `quote` | Source quotations | "From the Guidelines" |
| `info` | Informational notes | "Note" |
| `warning` | Cautions and gotchas | "Caution" |
| `tip` | Helpful suggestions | "Tip" |

## Common sourceLinks

### Accessibility
- WCAG Understanding: `https://www.w3.org/WAI/WCAG21/Understanding/{criterion}.html`
- ARIA APG: `https://www.w3.org/WAI/ARIA/apg/patterns/{pattern}/`
- WebAIM: `https://webaim.org/techniques/{topic}/`

### Web Platform
- MDN: `https://developer.mozilla.org/en-US/docs/Web/{API_or_Element}`
- web.dev: `https://web.dev/articles/{topic}`
- Can I Use: `https://caniuse.com/{feature}`

### Design
- Refactoring UI: `https://www.refactoringui.com/`
- Tailwind Docs: `https://tailwindcss.com/docs/{topic}`

## Validation Commands

```bash
# Type check (catches missing types, wrong keys)
npm run typecheck

# Build (catches import/component errors)
npm run build

# Dev server (visual verification)
npm run dev
```

## Common Errors Quick Fix

| Error | Cause | Fix |
|-------|-------|-----|
| Property 'X' is missing in type | Source not in registry | Add to `source-registry.ts` |
| Type 'X' not assignable to PrincipleCategory | Category not defined | Add to `src/types/principle.ts` |
| Example shows "Coming Soon" | Key mismatch | Verify filename → key conversion |
| MDX import error | Wrong path | Use `@/components/mdx` |
