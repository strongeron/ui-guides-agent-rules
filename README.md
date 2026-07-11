# UI Guides

Web interface guidelines, made interactive. Every rule paired with a **good** and **bad** example you can actually tab through — plus copy-paste rules for coding agents.

**→ [ui-guides.netlify.app](https://ui-guides.netlify.app)**

![UI Guides — web interface guidelines, made interactive](./public/og-image.png)

## What it is

Most interface guidelines are a wall of text. This one is a browsable reference where every principle is live: read the rule, then interact with the anti-pattern next to the fix. Tab through both. Feel the difference between a missing focus ring and a clear one, a form that eats your paste and one that doesn't.

200 principles across seven categories — interactions, forms, layout, design, content, animations, performance. Search, filter by source, deep-link to any rule.

## What's inside

- **200 principles**, each with a side-by-side good/bad example you can operate — not screenshots, real components.
- **Multi-source.** Rules pulled from Vercel's Web Interface Guidelines, WCAG, ARIA APG, Tailwind, Dieter Rams, and Rauno Freiberg's interface principles — tagged and filterable by origin.
- **Agent-ready rules.** Every principle carries a `MUST` / `SHOULD` / `NEVER` rule with a code snippet, written to be copy-pasted straight into a coding agent's context. One click to copy.
- **Keyboard-first, accessible, themed.** The guide practices what it documents: visible focus rings, focus traps, hit targets, `prefers-reduced-motion`, light/dark, dynamic page titles.

## Built with

React 18 · TypeScript (strict) · Vite · Tailwind v4 · MDX · Radix UI + shadcn/ui · Motion · HugeIcons

Principles live as MDX in `content/principles/`. Example components auto-discover from `src/components/examples/` via `import.meta.glob` — drop a `NameGood.tsx` / `NameBad.tsx` in the right folder and it wires itself up. See [`CLAUDE.md`](./CLAUDE.md) for the full architecture.

## Run it

```bash
npm install
npm run dev          # vite dev server
npm run build        # production build → dist/
npm run typecheck    # tsc, strict
npm run lint         # eslint
npm test             # vitest
```

## Credits

Principles adapted from [Vercel's Web Interface Guidelines](https://vercel.com/design/guidelines), [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/), the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/), and [Rauno Freiberg's interface principles](https://interfaces.rauno.me). Attribution is preserved per-rule in the source badges.

Built by [Gleb Stroganov](https://glebstroganov.com) — design engineer, developer tools & AI. One of the [explorations](https://glebstroganov.com/explorations).
