# UI Guides

Web interface guidelines, made interactive. Every rule paired with a **good** and **bad** example you can actually tab through — plus copy-paste rules for coding agents.

**→ [ui-guides.netlify.app](https://ui-guides.netlify.app)**

![UI Guides — web interface guidelines, made interactive](./public/og-image.png)

## What it is

Most interface guidelines are a wall of text. This one is a browsable reference where every principle is live: read the rule, then interact with the anti-pattern next to the fix. Tab through both. Feel the difference between a missing focus ring and a clear one, a form that eats your paste and one that doesn't.

300 principles across eight categories — interactions, animations, layout, content, forms, performance, design, aesthetics. Search, filter by source or tag, deep-link to any rule.

## What's inside

- **300 principles**, each with a side-by-side good/bad example you can operate — not screenshots, real components.
- **Multi-source.** Rules transcribed from Vercel's Web Interface Guidelines, Rauno Freiberg's interfaces.rauno.me, @Ibelick's UI Skills, impeccable.style, Tailwind, RAMS, Emil Kowalski's animation skills, and more — tagged, attributed, and filterable by origin.
- **Agent-ready rules.** Every principle carries a `MUST` / `SHOULD` / `NEVER` rule with a code snippet, written to be copy-pasted straight into a coding agent's context. One click to copy.
- **Fetchable by agents.** The whole corpus is published as [`llms-full.txt`](https://ui-guides.netlify.app/llms-full.txt) — plain text, no JavaScript, generated from the principle data at build time. Point a coding agent at it directly.
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

Principles are transcribed from their upstream authors — [Vercel's Web Interface Guidelines](https://github.com/vercel-labs/agent-skills), [Rauno Freiberg](https://interfaces.rauno.me), [@Ibelick's UI Skills](https://www.ui-skills.com/), [impeccable.style](https://impeccable.style/), [Tailwind](https://tailwindcss.com/docs), [RAMS](https://www.rams.ai/), and [Emil Kowalski](https://emilkowalski.com/) — who deserve credit for the underlying guidance. Attribution is preserved per-rule in the source badges and on the Sources page. The interactive examples and agent-rule phrasings are original work.

Built by [Gleb Stroganov](https://glebstroganov.com) — design engineer, developer tools & AI. One of the [explorations](https://glebstroganov.com/explorations).
