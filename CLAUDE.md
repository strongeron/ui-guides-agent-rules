# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application showcasing Vercel's Web Interface Guidelines. It displays UI/UX principles with interactive good/bad examples, helping developers understand and apply best practices for accessible, performant web interfaces.

## Commands

```bash
# Development
npm run dev          # Start Vite dev server

# Build & Preview
npm run build        # Build for production (runs generate:llms first via prebuild)
npm run preview      # Preview production build
npm run generate:llms # Regenerate public/llms.txt, llms-full.txt, sitemap.xml

# Code Quality
npm run lint         # ESLint check
npm run typecheck    # TypeScript type checking

# Data / Sources
npm run validate       # Field completeness + example mapping + theme checks
npm run check:sources  # Check upstream skill sources for new/uncovered rules

# Testing
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report

# E2E Testing (Playwright)
npm run test:e2e           # Run all e2e tests
npm run test:e2e:headed    # Run with visible browser
npm run test:e2e:ui        # Run with Playwright UI
npm run test:e2e:principle # Run principle visual tests only
```

## Architecture

### Data Flow

1. **Principles Data** (`src/data/principles/`): The single source of truth, split into one module per category (`interactions.ts`, `animations.ts`, `layout.ts`, `content.ts`, `forms.ts`, `performance.ts`, `design.ts`, `aesthetics.ts`). `index.ts` is the barrel that re-exports `categories` (from `categories.ts`) and a flat, category-grouped `principles` array. Import from `@/data/principles` — never a category file directly.
2. **Agent Rules** (`src/data/agentRules.ts`): Companion rules for AI agents, keyed by principle ID with type-safe linking
3. **Example Renderer** (`src/components/ExampleRenderer.tsx`): Auto-discovers example components via `import.meta.glob`

### Component Structure

- `App.tsx`: Main layout with keyboard navigation, URL hash state, dynamic page title, sidebar toggle

  **The hash is a two-way binding, and both directions are load-bearing.** Reading it needs `hashchange` *and* `popstate`: an anchor or a manual URL edit fires only the former, while back/forward over a pushed entry fires only the latter. Writing it uses `pushState`, so each principle is its own history entry — with two guards that are easy to delete by accident. Skipping the write when the hash already matches prevents a change that *came from* the URL being pushed back on top of itself; and the first run of the effect uses `replaceState`, so landing on `/` corrects the address bar without leaving a phantom entry behind the user's first Back press. That first-run flag is consumed before the early returns — if it only flipped on an actual write, a deep link would leave it unset and the next navigation would silently eat a history step.
- `PrincipleView.tsx`: Displays principle details with side-by-side good/bad examples
- `ExampleRenderer.tsx`: Lazy-loads examples automatically from `./examples/**/*.tsx`
- `Sidebar.tsx`: Navigation with search, focus trap, and `overscroll-behavior: contain`
- `Navigation.tsx` / `Header.tsx`: Chrome components

### Example Components Pattern

Examples live in `src/components/examples/{category}/` with naming convention:
- `{PrincipleName}Good.tsx` - Correct implementation
- `{PrincipleName}Bad.tsx` - Anti-pattern demonstration

Examples are **automatically discovered** - no manual registration needed. Just:
1. Create the component in the appropriate category folder
2. Export the component as a named export
3. The file path is converted to a key: `forms/EnterSubmitsBad.tsx` → `forms-enter-submits-bad`

To add a new principle:
1. Add the `Principle` object to the matching category module in `src/data/principles/{category}.ts` with example keys
2. Create Good/Bad example components in the appropriate category folder (the derived key must match `badExampleKey`/`goodExampleKey` exactly — beware acronym casing, e.g. `ZIndex` → `zindex`, not `z-index`)
3. Optionally add an agent rule to `src/data/agentRules.ts`
4. Verify: `npm run typecheck && npm run validate`

### Types

`src/types/principle.ts` defines:
- `Principle`: Main data structure for each guideline
- `PrincipleCategory`: Union type for categories
- `PatternSource` / `PatternSourceInfo`: Multi-source tagging system
- `AgentRule` / `AgentRulePriority`: Rule types with MUST/SHOULD/NEVER

### Multi-Source Tagging System

Principles can be tagged with their pattern source for the "brain center" concept:

```typescript
type PatternSource = 'vercel' | 'wcag' | 'aria' | 'design-system' | 'custom';
```

Each principle has an optional `source` field linking it to its origin (Vercel guidelines, WCAG criteria, ARIA practices, etc.). This enables filtering and attribution.

### Agent Rules System

Agent rules in `src/data/agentRules.ts` provide AI-consumable guidelines:

```typescript
type AgentRulePriority = 'MUST' | 'SHOULD' | 'NEVER';

interface AgentRule {
  priority: AgentRulePriority;
  rule: string;
  codeExample?: string;
}
```

Rules are keyed by principle ID with type-safe linking to ensure every rule maps to a valid principle.

### Source Sync System

Rules are hand-transcribed from upstream "skill" sources, so a small sync system keeps us aligned. The authority is the **source catalog** `src/data/sources.ts` (`sourceCatalog`), which mirrors the Obsidian provenance report *"UI · Animation · Design Skills — Source Directory 2026"*. It's decoupled from the app's `PatternSource`/badge system: a source can be catalogued (for coverage) before any of its rules are onboarded. Each entry has a `check` mode:
- **`github`** — rules live as raw markdown bullet/numbered lists (`rawUrls`). Verified auto-diffable: Vercel `command.md`, Rauno `README.md`, Emil Kowalski `review-animations/SKILL.md`.
- **`manual`** — no diffable rule file; reminded on a `reviewEveryDays` cadence.

Scripts (shared extraction in `scripts/lib/rules.ts` — tokenize/extract/classify/fetch):
- `npm run check:sources` — freshness. Fetches github sources, extracts rules, fuzzy-diffs against the whole corpus, writes uncovered ones to `doc/pending-rules.json` (flagged `needs-examples`, with auto-classified category + tags). `-- --mark-reviewed=<id>` stamps a manual source (`doc/source-review-state.json`).
- `npm run sources:build -- <id> [--limit=N]` — onboard a source: fetch → extract → classify category + tags → scaffold `status:'draft'` Principle entries into `src/data/principles/drafts.ts`. Requires the source to have `check.mode:'github'` + a `patternSource` (add to the `PatternSource` union + a `source-registry.ts` badge first).
- `npm run sources:catalog` — diffs `sourceCatalog` against the Obsidian report → flags report repos not yet catalogued. `-- --report="/path"` to override.

**Drafts** (`draftPrinciples` in `src/data/principles/drafts.ts`) are NOT in the `principles` array, so they're hidden from the app until promoted: author their Good/Bad examples, move the entry into its category module, drop `status`. Never auto-mutates published data.

**Tags** — `src/data/tags.ts` derives cross-cutting filter tags (motion, a11y, typography, forms, color…) at runtime from category + keywords, merged with explicit `tags`. Applied in the barrel via `withTags()`, surfaced by the sidebar `TagFilter` (alongside `SourceFilter`).

See `doc/specs/2026-07-12-source-freshness-sync.md`.

> Note: the MDX content layer under `content/principles/` was removed — it duplicated `principles.ts` and was never rendered by the app. `principles/**` is now the sole source of truth.

### Discoverability & Attribution

The app is a client-rendered SPA whose per-principle state lives in the **URL hash**, so a crawler or coding agent that fetches the site gets a React shell and none of the rules. Two consequences shape this layer:

- **`scripts/generate-llms.ts`** (run by `prebuild`, so `npm run build` always refreshes it) emits `public/llms.txt`, `public/llms-full.txt`, and `public/sitemap.xml` from the principle data. `llms-full.txt` is the **only** machine-readable copy of the corpus — it's what agents actually fetch and cite. Never hand-edit those three files; edit `src/data/principles/*` and regenerate. `public/robots.txt` is hand-written and allows all AI crawlers.
- **Authorship is expressed by a shared `@id`.** The JSON-LD in `index.html` names the author as `{"@id": "https://glebstroganov.com/#person"}` — the same node glebstroganov.com publishes in its `/about.json`. That is what merges the project into its author's works graph instead of creating a second, unlinked "Gleb Stroganov". `src/components/Footer.tsx` carries the visible credit with `rel="author me"` to the same URL. Keep the footer href, the JSON-LD `@id`/`sameAs`, and the generator's attribution block in sync.

**Known ceiling:** hash fragments are not indexable as separate URLs, so all 300+ principles collapse into one indexable page, and `sitemap.xml` honestly lists only what is fetchable. Converting to real routes (`/principles/:id`) plus a prerender step is the unlock — it would turn 1 indexable page into 300+, each with its own title, OG card, and author credit. Not done.

### UI Components (shadcn/ui + Radix)

Uses shadcn/ui (new-york style) with Radix UI primitives in `src/components/ui/`.

**Pattern**: Components use `class-variance-authority` (CVA) for variants, extracted to `.variants.ts` files for fast-refresh compatibility.

**Adding components**: Use `npx shadcn@latest add <component>` - configured in `components.json` with path aliases (@/components, @/lib/utils, etc.)

### Custom Animations

Defined in `src/index.css` using Tailwind v4's `@theme` and `@utility` directives:
- `motion-safe-fade-in-slide`: Respects `prefers-reduced-motion`
- `animate-scale-in`, `animate-scale-in-from-top`: Menu animations
- `transition-transform-shadow`, `transition-transform-opacity`: Compositor-friendly transitions

## Tech Stack

- React 18 with TypeScript (strict mode)
- Vite with `@tailwindcss/vite` plugin
- Tailwind CSS v4 (CSS-based config)
- HUGEICONS for icons (@hugeicons/react)
- Vitest for unit testing
- ESLint with react-hooks and react-refresh plugins

## UI/UX Guidelines Reference

This project implements principles from Vercel's Web Interface Guidelines. When working on this codebase, follow the same principles being demonstrated:

- Full keyboard accessibility with visible focus rings (`:focus-visible`)
- Focus traps in modals with focus return on close
- Hit targets ≥24px (≥44px on mobile)
- Proper form semantics with labels, autocomplete, and validation
- Respect `prefers-reduced-motion`
- Use compositor-friendly animations (`transform`, `opacity`)
- Never `transition: all`
- `overscroll-behavior: contain` in modals/drawers
- Dynamic page titles matching current context

See `doc/vercel-web-guides.md` for the full source guidelines and `doc/vercel-web-guides-agent.md` for the condensed agent rules.
