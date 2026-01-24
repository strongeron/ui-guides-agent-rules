---
name: principles-authoring
description: This skill should be used when creating, editing, or extending UI/UX principles in the Web UI Guide React project. It covers the complete workflow for adding new principles including data structures, example components, MDX documentation, agent rules, and verification. Triggers on requests to "add a principle", "create a guideline", "add a category", or work with the principles system.
---

# Principles Authoring

Create and maintain UI/UX principles with interactive good/bad examples for the Web UI Guide.

## Architecture Overview

The principles system uses a multi-layer architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                                │
├─────────────────────────────────────────────────────────────┤
│  src/types/principle.ts      - Type definitions              │
│  src/data/principles.ts      - Principle objects + categories│
│  src/data/agentRules.ts      - AI-consumable rules          │
│  src/components/source-registry.ts - Source badge config    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  Example Components                          │
├─────────────────────────────────────────────────────────────┤
│  src/components/examples/{category}/                         │
│    {PrincipleName}Bad.tsx   - Anti-pattern demonstration     │
│    {PrincipleName}Good.tsx  - Correct implementation         │
│                                                              │
│  Auto-discovered via import.meta.glob('./examples/**/*.tsx') │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    MDX Content                               │
├─────────────────────────────────────────────────────────────┤
│  content/principles/{category}/{principle-name}.mdx          │
│    - Frontmatter with metadata                               │
│    - Callout quotes, ExampleComparison, Learn More links    │
└─────────────────────────────────────────────────────────────┘
```

### Key Generation

File paths are converted to keys automatically:
- `./examples/forms/EnterSubmitsBad.tsx` → `forms-enter-submits-bad`
- `./examples/aesthetics/ColorDominanceGood.tsx` → `aesthetics-color-dominance-good`

The conversion uses `pathToKey()` in `src/utils/exampleKeys.ts`:
1. Extract category from path
2. Convert PascalCase filename to kebab-case
3. Combine: `{category}-{kebab-name}`

## Creating a New Principle

### Step 1: Define the Principle Object

Add to `src/data/principles.ts`:

```typescript
{
  id: 'category-principle-name',           // Must be unique, kebab-case
  category: 'forms',                        // Must match PrincipleCategory type
  source: 'vercel',                         // Optional, must match PatternSource type
  title: 'Short Title',                     // Display name (2-4 words)
  description: 'Brief description',         // One sentence explaining the principle
  sourceQuote: 'Original quote from source', // Exact quote with attribution
  additionalExplanation: 'Longer explanation of why this matters and how to implement it.',
  sourceLinks: [
    { text: 'Link Text', url: 'https://...' }
  ],
  badExampleKey: 'category-principle-name-bad',   // Must match component file
  goodExampleKey: 'category-principle-name-good'  // Must match component file
}
```

#### Source Attribution Requirements

**When to use each source:**
- `vercel` - Principles from Vercel Web Interface Guidelines
- `wcag` - WCAG 2.1/2.2 success criteria (accessibility)
- `aria` - WAI-ARIA Authoring Practices
- `tailwind` - Tailwind CSS best practices
- `anthropic` - Anthropic skills (frontend-design, etc.)
- `claude-code` - Research-based rules from Claude Code
- `custom` - Internal patterns without external source

**Using Anthropic Skills as Source:**

Anthropic publishes agent skills at [github.com/anthropics/skills](https://github.com/anthropics/skills) that contain high-quality UI/UX guidelines. To extract principles from skills:

1. **Find relevant skills:**
   ```
   https://github.com/anthropics/skills/tree/main/skills
   ```
   Key skills for UI principles:
   - `frontend-design` - Visual design, typography, color, motion
   - `ui-skills` - Interface constraints and patterns

2. **Read the SKILL.md file:**
   ```
   https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md
   ```

3. **Extract principles from skill sections:**
   - Each numbered guideline or rule can become a principle
   - Use the skill's exact wording for `sourceQuote`
   - Link back to the skill file or specific line

4. **Source attribution for Anthropic skills:**
   ```typescript
   {
     source: 'anthropic',
     sourceQuote: 'Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter.',
     sourceLinks: [
       {
         text: 'Anthropic frontend-design skill',
         url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md'
       }
     ]
   }
   ```

5. **Verify skill content is current:**
   - Check the skill's last commit date
   - Skills may be updated; re-verify periodically
   - Use raw GitHub URLs for stable references

**sourceQuote guidelines:**
- Use exact quotes when available
- Keep under 2 sentences
- Include the guideline name/number if applicable
- Example: `"WCAG 2.4.7: Focus Visible. Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible."`

**sourceLinks best practices:**
- Always include at least one authoritative link
- Prefer official documentation over blog posts
- Include MDN links for web platform features
- Add multiple links for complex topics

```typescript
sourceLinks: [
  { text: 'WCAG 2.4.7 Understanding', url: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html' },
  { text: 'MDN :focus-visible', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible' }
]
```

### Step 2: Create Example Components

Create in `src/components/examples/{category}/`:

**Bad Example** (`{PrincipleName}Bad.tsx`):
```tsx
export function PrincipleNameBad() {
  return (
    <div className="w-full max-w-sm">
      {/* Demo showing the anti-pattern */}
      <p className="text-xs text-destructive mt-4">
        Explanation of what's wrong
      </p>
    </div>
  );
}
```

**Good Example** (`{PrincipleName}Good.tsx`):
```tsx
export function PrincipleNameGood() {
  return (
    <div className="w-full max-w-sm">
      {/* Demo showing correct implementation */}
      <p className="text-xs text-success mt-4">
        Explanation of why this is better
      </p>
    </div>
  );
}
```

#### Good vs Bad Example Design

**Bad examples should be:**
- Obviously problematic (user can see the issue immediately)
- Functional (not broken/crashing)
- Representative of real-world mistakes
- Instructive (shows what NOT to do)

**Good examples should be:**
- Clearly better (improvement is self-evident)
- Following best practices
- Accessible and semantic
- Production-ready code

### Step 3: Create MDX Content

Create `content/principles/{category}/{principle-name}.mdx`:

```mdx
---
id: category-principle-name
category: category
source: vercel
title: Principle Title
description: Brief description
badExampleKey: category-principle-name-bad
goodExampleKey: category-principle-name-good
---

import { Callout, ExampleComparison } from '@/components/mdx';

<Callout type="quote" title="From the Guidelines">
  Original quote from the source material.
</Callout>

## Why This Matters

Explanation of the principle's importance and impact on user experience.

## Implementation

<ExampleComparison
  badKey="category-principle-name-bad"
  goodKey="category-principle-name-good"
/>

## Learn More

- [Resource Name](https://...)
```

### Step 4: Add Agent Rule

Add to `src/data/agentRules.ts`:

```typescript
'category-principle-name': {
  priority: 'MUST',  // MUST | SHOULD | NEVER
  rule: 'Concise rule text for AI agents to follow'
}
```

Priority meanings:
- `MUST` - Required for accessibility or critical UX
- `SHOULD` - Best practice, recommended
- `NEVER` - Anti-pattern to avoid

## Example Component Patterns

### Pattern 1: Simple Visual Demo

For principles about visual design, layout, colors:

```tsx
export function NestedRadiiBad() {
  return (
    <div className="w-full max-w-sm flex items-center justify-center py-8">
      <div
        className="w-48 h-32 bg-card rounded-lg flex items-center justify-center"
        style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}
      >
        <p className="text-sm text-muted-foreground text-center px-4">
          Single flat shadow
        </p>
      </div>
      <p className="text-xs text-destructive mt-4">
        Single shadow lacks depth and realism
      </p>
    </div>
  );
}
```

### Pattern 2: Interactive Form Demo

For principles about forms, inputs, validation:

```tsx
import { useState } from 'react';

export function EnterSubmitsBad() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="bad-email" className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <input
          id="bad-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Enter your email"
        />
        <button
          type="button"  {/* Bug: should be type="submit" */}
          onClick={() => setSubmitted(true)}
          className="mt-3 w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          {submitted ? 'Submitted!' : 'Subscribe'}
        </button>
      </form>
      <p className="text-xs text-destructive mt-4">
        Try pressing Enter - it won't submit
      </p>
    </div>
  );
}
```

### Pattern 3: Animation Demo

For principles about motion, transitions, animations:

```tsx
import { useState } from 'react';

export function OrchestratedMotionGood() {
  const [isVisible, setIsVisible] = useState(true);
  const items = ['Hero loads first', 'Nav fades second', 'Content reveals third'];

  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm mb-4"
      >
        Replay Sequence
      </button>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item}
            className="p-3 bg-muted rounded motion-safe:transition-all motion-safe:duration-500"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <p className="text-xs text-success mt-4">
        Staggered reveal with consistent timing feels intentional
      </p>
    </div>
  );
}
```

### Pattern 4: Comparison Demo

For principles showing before/after or side-by-side:

```tsx
export function ColorDominanceBad() {
  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      {/* Color palette preview */}
      <div className="flex gap-2 mb-4">
        <div className="w-8 h-8 rounded bg-blue-400" />
        <div className="w-8 h-8 rounded bg-green-400" />
        <div className="w-8 h-8 rounded bg-purple-400" />
        <div className="w-8 h-8 rounded bg-orange-400" />
        <div className="w-8 h-8 rounded bg-pink-400" />
      </div>
      {/* Demo buttons showing the problem */}
      <div className="space-x-2">
        <button className="px-4 py-2 bg-blue-400 text-white rounded text-sm">Primary</button>
        <button className="px-4 py-2 bg-green-400 text-white rounded text-sm">Secondary</button>
        <button className="px-4 py-2 bg-purple-400 text-white rounded text-sm">Tertiary</button>
      </div>
      <p className="text-xs text-destructive mt-4">
        Evenly-distributed colors create visual confusion
      </p>
    </div>
  );
}
```

### Style Guidelines for Examples

**Use semantic color tokens:**
- `bg-card`, `bg-muted`, `bg-primary`
- `text-foreground`, `text-muted-foreground`
- `text-destructive` for bad example explanations
- `text-success` for good example explanations
- `border-border`, `border-ring`

**Use Tailwind utilities:**
- Prefer Tailwind classes over inline styles
- Use inline styles only for demonstration-specific values (custom fonts, gradients)

**Container patterns:**
- `w-full max-w-sm` or `max-w-md` for consistent widths
- `p-6` or `py-8` for padding
- `space-y-4` for vertical spacing

**Accessibility in examples:**
- Always use `<label>` with `htmlFor` for inputs
- Include focus-visible styles: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`
- Use semantic HTML elements

## Adding a New Category

### 1. Update Type Definition

In `src/types/principle.ts`, add to `PrincipleCategory`:

```typescript
export type PrincipleCategory =
  | 'interactions'
  | 'forms'
  // ... existing categories
  | 'new-category';  // Add here
```

### 2. Register Category

In `src/data/principles.ts`, add to `categories` array:

```typescript
{
  id: 'new-category',
  title: 'New Category',
  description: 'Description for sidebar and overview'
}
```

### 3. Create Folder Structure

```bash
mkdir -p src/components/examples/new-category
mkdir -p content/principles/new-category
```

## Adding a New Source

### 1. Update Type Definition

In `src/types/principle.ts`, add to `PatternSource`:

```typescript
export type PatternSource =
  | 'vercel'
  // ... existing sources
  | 'new-source';  // Add here
```

### 2. Register Source with Badge

In `src/components/source-registry.ts`:

```typescript
'new-source': {
  id: 'new-source',
  name: 'Display Name',
  description: 'Source description',
  url: 'https://source-url.com',  // Optional
  color: 'bg-[#hexcolor] text-white border-[#hexcolor]',
}
```

Use semantic tokens when possible: `bg-primary`, `text-primary-foreground`, etc.

## MDX Components Reference

### Callout

```mdx
<Callout type="quote" title="From the Guidelines">
  Quote text here.
</Callout>

<Callout type="info" title="Note">
  Informational content.
</Callout>

<Callout type="warning" title="Caution">
  Warning content.
</Callout>

<Callout type="tip" title="Tip">
  Helpful suggestion.
</Callout>
```

### ExampleComparison

```mdx
<ExampleComparison
  badKey="category-principle-name-bad"
  goodKey="category-principle-name-good"
/>
```

## Validation and Common Errors

### Running Validation

```bash
# Type checking - catches type errors, missing properties
npm run typecheck

# Build - catches import errors, component issues
npm run build

# Dev server - visual verification
npm run dev
```

### Common Errors and Fixes

#### Error: Property 'new-source' is missing in type

**Cause:** Added source to `PatternSource` type but not to `source-registry.ts`

**Fix:** Add the source entry to `src/components/source-registry.ts`

#### Error: Type '"new-category"' is not assignable to type 'PrincipleCategory'

**Cause:** Using a category that's not in the type definition

**Fix:** Add category to `PrincipleCategory` in `src/types/principle.ts`

#### Example shows "Coming Soon" instead of component

**Cause:** Example key doesn't match the component filename

**Fix:** Verify key generation:
- File: `src/components/examples/forms/EnterSubmitsBad.tsx`
- Key should be: `forms-enter-submits-bad`
- Check: category matches folder, PascalCase converts correctly to kebab-case

#### MDX not rendering / import errors

**Cause:** Wrong import path or component name

**Fix:** Use exact import:
```mdx
import { Callout, ExampleComparison } from '@/components/mdx';
```

### Validation Checklist

After creating or modifying principles, verify:

**TypeScript:**
- [ ] `npm run typecheck` passes
- [ ] No "Property is missing" errors
- [ ] No "not assignable to type" errors

**Build:**
- [ ] `npm run build` succeeds
- [ ] No import/export errors
- [ ] No component errors

**Visual (in browser):**
- [ ] Category appears in sidebar
- [ ] Principle appears under correct category
- [ ] Source badge displays correctly
- [ ] Bad example renders and is obviously problematic
- [ ] Good example renders and is clearly better
- [ ] MDX content renders (callouts, links)
- [ ] Example keys match (no "Coming Soon")

## Good Practices

1. **Keep examples focused** - Demonstrate one concept per principle
2. **Make bad examples obviously wrong** - Users should immediately see the problem
3. **Make good examples clearly better** - The improvement should be self-evident
4. **Include explanatory text** - Both examples need brief text explaining what to notice
5. **Self-contained examples** - No external dependencies or API calls
6. **Accessible examples** - Use proper labels, focus states, semantic HTML
7. **Consistent sizing** - Use `max-w-sm` or `max-w-md` for predictable layouts
8. **Always cite sources** - Include authoritative links for credibility
9. **Use exact quotes** - When referencing guidelines, quote exactly

## Anti-Patterns to Avoid

1. **Overly complex examples** - Keep demos minimal and focused
2. **External dependencies** - Examples must work offline
3. **Vague descriptions** - Be specific about what makes something good/bad
4. **Missing source attribution** - Always link to authoritative sources
5. **Duplicate principles** - Check existing principles before creating new ones
6. **Broken key mapping** - Verify example keys match component filenames exactly
7. **Broken bad examples** - Bad examples should work, just poorly
8. **Missing accessibility** - Even bad examples need basic a11y (labels, etc.)

## Complete Example: Adding a New Principle

Here's a complete walkthrough for adding "Focus Visible" principle:

### 1. Add to principles.ts

```typescript
{
  id: 'interactions-clear-focus',
  category: 'interactions',
  source: 'wcag',
  title: 'Clear Focus Indicators',
  description: 'Interactive elements must have visible focus indicators for keyboard users',
  sourceQuote: 'WCAG 2.4.7: Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.',
  additionalExplanation: 'Keyboard users need to see which element is focused. Use :focus-visible to show focus rings only for keyboard navigation, not mouse clicks. The focus indicator should have sufficient contrast.',
  sourceLinks: [
    { text: 'WCAG 2.4.7 Understanding', url: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html' },
    { text: 'MDN :focus-visible', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible' }
  ],
  badExampleKey: 'interactions-clear-focus-bad',
  goodExampleKey: 'interactions-clear-focus-good'
}
```

### 2. Create ClearFocusBad.tsx

```tsx
export function ClearFocusBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg outline-none"
        style={{ outline: 'none' }}
      >
        No Focus Ring
      </button>
      <input
        type="text"
        placeholder="Tab to me"
        className="w-full px-3 py-2 border border-border rounded-lg outline-none"
        style={{ outline: 'none' }}
      />
      <p className="text-xs text-destructive">
        Tab through - no visible focus indicator
      </p>
    </div>
  );
}
```

### 3. Create ClearFocusGood.tsx

```tsx
export function ClearFocusGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        Clear Focus Ring
      </button>
      <input
        type="text"
        placeholder="Tab to me"
        className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <p className="text-xs text-success">
        Tab through - focus ring visible on keyboard nav
      </p>
    </div>
  );
}
```

### 4. Create clear-focus.mdx

```mdx
---
id: interactions-clear-focus
category: interactions
source: wcag
title: Clear Focus Indicators
description: Interactive elements must have visible focus indicators
badExampleKey: interactions-clear-focus-bad
goodExampleKey: interactions-clear-focus-good
---

import { Callout, ExampleComparison } from '@/components/mdx';

<Callout type="quote" title="WCAG 2.4.7">
  Any keyboard operable user interface has a mode of operation where the
  keyboard focus indicator is visible.
</Callout>

## Why This Matters

Keyboard users rely on focus indicators to know which element will receive
their input. Without visible focus, navigation becomes a guessing game.

## Implementation

<ExampleComparison
  badKey="interactions-clear-focus-bad"
  goodKey="interactions-clear-focus-good"
/>

## Learn More

- [WCAG 2.4.7 Understanding](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)
- [MDN :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
```

### 5. Add agent rule

```typescript
'interactions-clear-focus': {
  priority: 'MUST',
  rule: 'Visible focus rings using :focus-visible; group with :focus-within'
}
```

### 6. Verify

```bash
npm run typecheck  # Should pass
npm run build      # Should succeed
npm run dev        # Check visually
```
