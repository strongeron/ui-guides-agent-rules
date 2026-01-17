# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application showcasing Vercel's Web Interface Guidelines. It displays UI/UX principles with interactive good/bad examples, helping developers understand and apply best practices for accessible, performant web interfaces.

## Commands

```bash
# Development
npm run dev          # Start Vite dev server

# Build & Preview
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # ESLint check
npm run typecheck    # TypeScript type checking

# Testing
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## Architecture

### Data Flow

1. **Principles Data** (`src/data/principles.ts`): Array of `Principle` objects containing metadata, descriptions, and example keys
2. **Agent Rules** (`src/data/agentRules.ts`): Companion rules for AI agents, keyed by principle ID with type-safe linking
3. **Example Renderer** (`src/components/ExampleRenderer.tsx`): Auto-discovers example components via `import.meta.glob`

### Component Structure

- `App.tsx`: Main layout with keyboard navigation, URL hash state, dynamic page title, sidebar toggle
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
1. Add the `Principle` object to `src/data/principles.ts` with matching example keys
2. Create Good/Bad example components in the appropriate category folder
3. Optionally add an agent rule to `src/data/agentRules.ts`

### Types

`src/types/principle.ts` defines:
- `Principle`: Main data structure for each guideline
- `PrincipleCategory`: Union type for categories
- `AgentRule` / `AgentRulePriority`: Rule types with MUST/SHOULD/NEVER

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
