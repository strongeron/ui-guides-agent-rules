# UI Guides & Agent Rules

Web UI principles, made interactive. Every rule paired with a **good** and **bad** example you can actually tab through — plus a copy-paste **MUST / SHOULD / NEVER** rule your coding agent can read.

**→ [ui-guides-agent-rules.netlify.app](https://ui-guides-agent-rules.netlify.app)**

https://github.com/user-attachments/assets/fa853434-2f94-4fe1-aa50-f5b426202164

<sup>Two principles, keyboard only. On **Keyboard Works Everywhere** focus leaps straight over the bad card — its menu items are `div`s, so there is nothing to land on. On **Clear Focus** both cards take focus, but only the good one tells you where you are.</sup>

## What it is

**The rules are not mine.** They come from other people's agent skills and guidelines — Vercel's `web-design-guidelines`, [Rauno Freiberg](https://interfaces.rauno.me), [@Ibelick's UI Skills](https://www.ui-skills.com/), [impeccable.style](https://impeccable.style/), [Emil Kowalski's animation skills](https://emilkowalski.com/), Tailwind, [RAMS](https://www.rams.ai/). Good guidance, scattered across a dozen skill files, README bullets, and markdown lists you'd otherwise hunt down one at a time.

**The work here is extraction and wiring.** Every rule is pulled into a single corpus, then given three things it didn't have:

1. **A good and a bad example you can operate** — real components, not screenshots. Tab through both. Feel the difference between a missing focus ring and a clear one, or a form that eats your paste and one that doesn't.
2. **A `MUST` / `SHOULD` / `NEVER` rule** an agent can paste straight into its context.
3. **A link back to where it came from**, so credit stays attached to the rule.

404 principles across eight categories — interactions, animations, layout, content, forms, performance, design, aesthetics — drawn from 15 upstream sources. Search, filter by source or tag, deep-link to any rule.

**To use it:** point a coding agent at [`llms-full.txt`](https://ui-guides-agent-rules.netlify.app/llms-full.txt) — the whole corpus as plain text, no JavaScript required.

## What's inside

- **404 principles**, each with a side-by-side good/bad example you can operate — not screenshots, real components.
- **Multi-source and attributed.** Every rule is tagged with the upstream project it came from, filterable by origin, and credited on the Sources page.
- **Agent-ready rules.** Every principle carries a `MUST` / `SHOULD` / `NEVER` rule with a code snippet, written to be copy-pasted straight into a coding agent's context. One click to copy.
- **Fetchable by agents.** The whole corpus is published as [`llms-full.txt`](https://ui-guides-agent-rules.netlify.app/llms-full.txt) — plain text, no JavaScript, generated from the principle data at build time. Point a coding agent at it directly.
- **Keyboard-first, accessible, themed.** The guide practices what it documents: visible focus rings, focus traps, hit targets, `prefers-reduced-motion`, light/dark, dynamic page titles.

## Use the rules in your own project

The rules are free to take. There's no package to install — the corpus is one plain-text file.

**Give your agent the URL.** The simplest setup, and the one to start with. Add a line to your `CLAUDE.md`, `AGENTS.md`, or Cursor rules:

```md
When writing or reviewing UI code, follow the interface rules at
https://ui-guides-agent-rules.netlify.app/llms-full.txt
```

Your agent fetches it when it needs it. Nothing gets stored in your repo, and you get updates for free.

**Or vendor a copy** if you want the rules pinned and offline:

```bash
curl -o .agent/ui-rules.md https://ui-guides-agent-rules.netlify.app/llms-full.txt
```

**Watch the size.** The full corpus is ~590 KB, roughly 150k tokens. That's a large chunk of a context window, so don't paste the whole thing into a system prompt. Let the agent fetch it on demand, or take just the slice you need — the file is organized by `## Category` headings (Interactions, Animations, Layout, Content, Forms, Performance, Design, Aesthetics):

```bash
# just the forms rules
curl -s https://ui-guides-agent-rules.netlify.app/llms-full.txt \
  | awk '/^## Forms$/,/^## Performance$/'
```

**Or take one rule.** Every principle on the site has a **Copy Rule** button that yields a single `MUST` / `SHOULD` / `NEVER` line with its code snippet — useful when you're fixing one thing and don't want to reshape the agent's whole context.

Each rule carries the upstream project it came from. If you cite one, credit that source, not this repo.

## Built with

React 18 · TypeScript (strict) · Vite · Tailwind v4 · Radix UI + shadcn/ui · Motion · HugeIcons

Principles live as TypeScript in `src/data/principles/`, one module per category. Example components auto-discover from `src/components/examples/` via `import.meta.glob` — drop a `NameGood.tsx` / `NameBad.tsx` in the right folder and it wires itself up. See [`CLAUDE.md`](./CLAUDE.md) for the full architecture.

## Run it

```bash
npm install
npm run dev          # vite dev server
npm run build        # production build → dist/
npm run typecheck    # tsc, strict
npm run lint         # eslint
npm test             # vitest
npm run generate:og  # redraw public/og-image.png from the principle data
```

`generate:og` is deliberately not part of `prebuild` — it drives headless Chromium, which isn't guaranteed on a deploy runner. Run it locally whenever the corpus grows and commit the PNG.

## Credits

The principles belong to their authors — [Vercel](https://github.com/vercel-labs/agent-skills), [Rauno Freiberg](https://interfaces.rauno.me), [@Ibelick](https://www.ui-skills.com/), [impeccable.style](https://impeccable.style/), [Tailwind](https://tailwindcss.com/docs), [RAMS](https://www.rams.ai/), [Emil Kowalski](https://emilkowalski.com/) — who did the thinking. Attribution is preserved per-rule in the source badges and on the Sources page.

The corpus, the good/bad examples, and the agent-rule phrasings are the original contribution here. Extraction and wiring, not authorship.

Built by [Gleb Stroganov](https://glebstroganov.com) — design engineer, developer tools & AI. One of the [explorations](https://glebstroganov.com/explorations).
