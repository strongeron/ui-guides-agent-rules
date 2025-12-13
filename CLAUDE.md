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
```

## Architecture

### Data Flow

1. **Principles Data** (`src/data/principles.ts`): Array of `Principle` objects containing metadata, descriptions, and example keys
2. **Agent Rules** (`src/data/agentRules.ts`): Companion rules for AI agents, keyed by principle ID
3. **Example Renderer** (`src/components/ExampleRenderer.tsx`): Maps example keys to React components via a registry object

### Component Structure

- `App.tsx`: Main layout with keyboard navigation, URL hash state, sidebar toggle
- `PrincipleView.tsx`: Displays principle details with side-by-side good/bad examples
- `ExampleRenderer.tsx`: Component registry that dynamically renders examples by key
- `Sidebar.tsx` / `Navigation.tsx` / `Header.tsx`: Chrome components

### Example Components Pattern

Examples live in `src/components/examples/{category}/` with naming convention:
- `{PrincipleName}Good.tsx` - Correct implementation
- `{PrincipleName}Bad.tsx` - Anti-pattern demonstration

To add a new principle:
1. Add the `Principle` object to `src/data/principles.ts`
2. Create Good/Bad example components in the appropriate category folder
3. Register both components in `ExampleRenderer.tsx`'s `exampleComponents` object
4. Optionally add an agent rule to `src/data/agentRules.ts`

### Types

`src/types/principle.ts` defines:
- `Principle`: Main data structure for each guideline
- `PrincipleCategory`: Union type for categories (interactions, animations, layout, content, forms, performance, design)
- `SourceLink`: External reference links

## Tech Stack

- React 18 with TypeScript (strict mode)
- Vite for bundling
- Tailwind CSS for styling
- lucide-react for icons
- ESLint with react-hooks and react-refresh plugins

## UI/UX Guidelines Reference

This project implements principles from Vercel's Web Interface Guidelines. When working on this codebase, follow the same principles being demonstrated:

- Full keyboard accessibility with visible focus rings (`:focus-visible`)
- Hit targets ≥24px (≥44px on mobile)
- Proper form semantics with labels, autocomplete, and validation
- Respect `prefers-reduced-motion`
- Use compositor-friendly animations (`transform`, `opacity`)
- Never `transition: all`

See `doc/vercel-web-guides.md` for the full source guidelines and `doc/vercel-web-guides-agent.md` for the condensed agent rules.
