# Style Fix Plan: Theming & Accessibility

## Overview
Update theming system with theme switcher, ensure all components support dark mode, fix CTA accessibility issues, and simplify good/bad example cards to minimalistic design.

## Centralized Theming Approach (Best Practice)

All theme colors are defined in **one place**: `src/index.css`

```
:root { ... }     ← Light mode tokens
.dark { ... }     ← Dark mode tokens
```

**Existing tokens** (already defined):
- `--background`, `--foreground` - Base colors
- `--card`, `--card-foreground` - Card surfaces
- `--muted`, `--muted-foreground` - Subtle backgrounds/text
- `--primary`, `--primary-foreground` - Brand/action colors
- `--destructive` - Error/danger actions
- `--border`, `--input`, `--ring` - UI chrome

**Tokens to add** for good/bad cards:
- `--success`, `--success-foreground` - Good examples (green)
- `--error`, `--error-foreground` - Bad examples (red)

**Usage in components:**
- Use `bg-background` NOT `bg-white`
- Use `bg-muted` NOT `bg-gray-50`
- Use `text-foreground` NOT `text-gray-900`
- Use `border-border` NOT `border-gray-200`

---

## Epic: Style Fix - Theming & Accessibility

### 0. Add Semantic Color Tokens (NEW)
**Priority:** P0 (Critical - do first)
**Labels:** work

Add success/error tokens to `src/index.css`:

```css
:root {
  /* Success (good examples) */
  --success: oklch(0.723 0.219 142.495);
  --success-foreground: oklch(0.262 0.051 150.107);

  /* Error (bad examples) */
  --error: oklch(0.637 0.237 25.331);
  --error-foreground: oklch(0.269 0.066 25.041);
}

.dark {
  --success: oklch(0.627 0.194 145.071);
  --success-foreground: oklch(0.982 0.018 155.826);

  --error: oklch(0.704 0.191 22.216);
  --error-foreground: oklch(0.982 0.018 15.826);
}
```

Also add to `@theme inline`:
```css
--color-success: var(--success);
--color-success-foreground: var(--success-foreground);
--color-error: var(--error);
--color-error-foreground: var(--error-foreground);
```

---

### 1. Theme Switcher Implementation
**Priority:** P0 (Critical)
**Labels:** work

Create a theme switcher component that:
- Toggles between light/dark mode
- Persists preference to localStorage
- Respects `prefers-color-scheme` system preference
- Adds `.dark` class to `<html>` element

**Files to create/modify:**
- `src/hooks/useTheme.ts` - Theme state management hook
- `src/components/ThemeSwitcher.tsx` - UI toggle component
- `src/components/Header.tsx` - Add ThemeSwitcher to header

---

### 2. Update Good/Bad Example Cards (Minimalistic)
**Priority:** P0 (Critical)
**Labels:** work

Current cards have:
- Border strokes (`border-2 border-red-200`)
- Background fills on headers (`bg-red-50`, `bg-green-50`)
- Header bottom borders

**New minimalistic design:**
- Remove all borders and background fills
- Use only colored icon and text with semantic tokens:
  - Good: `text-success` (icon + label)
  - Bad: `text-error` (icon + label)
- Clean card with `bg-card` and subtle shadow only
- Works automatically in both light/dark modes

**File to modify:**
- `src/components/PrincipleView.tsx` (lines 79-103)

---

### 3. CTA Accessibility Audit & Fix
**Priority:** P0 (Critical)
**Labels:** work, accessibility

Issues identified in Navigation/CTA components:
- Review contrast ratios for all button states
- Ensure hit targets meet 44px minimum on mobile
- Verify focus states are visible in both themes
- Check disabled state contrast

**Files to audit:**
- `src/components/Navigation.tsx`
- `src/components/Header.tsx`
- `src/components/ui/button.tsx`

---

### 4. Update Main Components for Dark Mode
**Priority:** P1 (High)
**Labels:** work

Convert hardcoded gray/white colors to theme-aware CSS variables.

**Components to update:**
- `src/App.tsx` - `bg-gray-50` → `bg-background`
- `src/components/Header.tsx` - `bg-white`, `border-gray-200`
- `src/components/Navigation.tsx` - `bg-white`, `border-gray-200`
- `src/components/Sidebar.tsx` - Multiple gray colors
- `src/components/PrincipleView.tsx` - `text-gray-*`, `bg-gray-*`, `bg-blue-*`
- `src/components/AgentRuleCard.tsx` - Gray colors
- `src/components/mdx/Callout.tsx` - Gray colors
- `src/components/mdx/CodeBlock.tsx` - Gray colors
- `src/components/ExampleRenderer.tsx` - Gray colors

**Color mapping:**
| Hardcoded | Theme-aware |
|-----------|-------------|
| `bg-white` | `bg-background` or `bg-card` |
| `bg-gray-50` | `bg-muted` |
| `text-gray-900` | `text-foreground` |
| `text-gray-700` | `text-foreground` |
| `text-gray-600` | `text-muted-foreground` |
| `text-gray-500` | `text-muted-foreground` |
| `border-gray-200` | `border-border` |
| `border-gray-100` | `border-border` |

---

### 5. Update Example Components for Dark Mode
**Priority:** P2 (Medium)
**Labels:** work

~160 example components use hardcoded colors. Apply same color mapping.

**Batch approach:**
- Use search/replace for common patterns
- Review each category folder
- Test visual appearance in both themes

**Folders:**
- `src/components/examples/animations/`
- `src/components/examples/content/`
- `src/components/examples/design/`
- `src/components/examples/forms/`
- `src/components/examples/interactions/`
- `src/components/examples/layout/`
- `src/components/examples/performance/`

---

### 6. Review & Testing
**Priority:** P1 (High)
**Labels:** review

- Test theme switcher persistence
- Verify all components render correctly in both themes
- Run accessibility audit (contrast, focus states)
- Check mobile hit targets
- Verify `prefers-reduced-motion` still respected

---

## Summary

| Task | Priority | Estimated Scope |
|------|----------|-----------------|
| **Add Semantic Tokens** | P0 | 1 file (index.css) |
| Theme Switcher | P0 | 3 files |
| Good/Bad Cards Minimalistic | P0 | 1 file |
| CTA Accessibility | P0 | 3 files |
| Main Components Dark Mode | P1 | 9 files |
| Example Components Dark Mode | P2 | ~160 files |
| Review & Testing | P1 | - |

---

## Dependencies

```
Add Semantic Tokens (0)
    ↓
Theme Switcher (1) ──────────┐
    ↓                        │
Main Components (4) ─────────┤
    ↓                        │
Example Components (5) ──────┼──→ Review & Testing (6)
                             │
Good/Bad Cards (2) ──────────┤
                             │
CTA Accessibility (3) ───────┘
```

## Color Token Reference

| Usage | Light Mode | Dark Mode | Tailwind Class |
|-------|------------|-----------|----------------|
| Page background | white | near-black | `bg-background` |
| Card surface | white | dark gray | `bg-card` |
| Subtle background | gray-50 | dark gray | `bg-muted` |
| Primary text | gray-900 | white | `text-foreground` |
| Secondary text | gray-600 | gray-400 | `text-muted-foreground` |
| Borders | gray-200 | white/10% | `border-border` |
| Success (good) | green | green | `text-success` |
| Error (bad) | red | red | `text-error` |
