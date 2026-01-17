# Style Fix Plan: Theming & Accessibility

## Overview
Update theming system with theme switcher, ensure all components support dark mode, fix CTA accessibility issues, and simplify good/bad example cards to minimalistic design.

---

## Epic: Style Fix - Theming & Accessibility

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
- Use only colored icon and text
- Full green (`text-green-600`) for good examples
- Full red (`text-red-600`) for bad examples
- Clean card with subtle shadow only

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
| Theme Switcher | P0 | 3 files |
| Good/Bad Cards Minimalistic | P0 | 1 file |
| CTA Accessibility | P0 | 3 files |
| Main Components Dark Mode | P1 | 9 files |
| Example Components Dark Mode | P2 | ~160 files |
| Review & Testing | P1 | - |

---

## Dependencies

```
Theme Switcher (1)
    ↓
Main Components (4) ─────────┐
    ↓                        │
Example Components (5) ──────┼──→ Review & Testing (6)
                             │
Good/Bad Cards (2) ──────────┤
                             │
CTA Accessibility (3) ───────┘
```
