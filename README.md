# UI Guides & Agent Rules

Web UI principles, made interactive. Every rule paired with a **good** and **bad** example you can actually tab through — plus a copy-paste **MUST / SHOULD / NEVER** rule your coding agent can read.

**→ [ui-guides-agent-rules.netlify.app](https://ui-guides-agent-rules.netlify.app)**

https://github.com/user-attachments/assets/cd40ca11-f7e3-439d-993a-7f5aa99132b6

<sup>Two principles, keyboard only. On **Keyboard Works Everywhere** focus leaps straight over the bad card — its menu items are `div`s, so there is nothing to land on. On **Clear Focus** both cards take focus, but only the good one tells you where you are.</sup>

## What it is

**The rules are not mine.** They come from other people's agent skills and guidelines — Vercel's `web-design-guidelines`, [Rauno Freiberg](https://interfaces.rauno.me), [@Ibelick's UI Skills](https://www.ui-skills.com/), [impeccable.style](https://impeccable.style/), [Emil Kowalski's animation skills](https://emilkowalski.com/), Tailwind, [RAMS](https://www.rams.ai/). Good guidance, scattered across a dozen skill files, README bullets, and markdown lists you'd otherwise hunt down one at a time.

**The work here is extraction and wiring.** Every rule is pulled into a single corpus, then given three things it didn't have:

1. **A good and a bad example you can operate** — real components, not screenshots. Tab through both. Feel the difference between a missing focus ring and a clear one, or a form that eats your paste and one that doesn't.
2. **A `MUST` / `SHOULD` / `NEVER` rule** an agent can paste straight into its context.
3. **A link back to where it came from**, so credit stays attached to the rule.

404 principles across eight categories — interactions, animations, layout, content, forms, performance, design, aesthetics — drawn from 15 upstream sources. Search, filter by source or tag, deep-link to any rule.

**To use it:** point a coding agent at [`principles/index.md`](https://ui-guides-agent-rules.netlify.app/principles/index.md) — every rule id and title in ~8k tokens — and let it fetch the categories or individual rules that apply. Or install the [`web-design-guidelines`](https://github.com/strongeron/agent-skills/tree/main/skills/web-design-guidelines) skill and skip the wiring.

## What's inside

- **404 principles**, each with a side-by-side good/bad example you can operate — not screenshots, real components.
- **Multi-source and attributed.** Every rule is tagged with the upstream project it came from, filterable by origin, and credited on the Sources page.
- **Agent-ready rules.** All 404 principles carry a `MUST` / `SHOULD` / `NEVER` rule written to be pasted straight into a coding agent's context; 106 of them add a code example. One click to copy.
- **Fetchable in slices.** Published as static files an agent pays for by the piece: a ~8k-token [index](https://ui-guides-agent-rules.netlify.app/principles/index.md), all 191 [MUST rules](https://ui-guides-agent-rules.netlify.app/principles/must.md) at ~11k, one category at 6k–26k, or [a single rule](https://ui-guides-agent-rules.netlify.app/principles/forms-enter-submits.md) at ~1.4k — that last one carrying **both example components as real code**, which nothing else exposes. All generated from the principle data at build time.
- **Keyboard-first, accessible, themed.** The guide practices what it documents: visible focus rings, focus traps, hit targets, `prefers-reduced-motion`, light/dark, dynamic page titles.

## Use the rules in your own project

The rules are free to take. Nothing to install — everything below is a static file you fetch.

### Install the skill

If you use Claude Code, Codex or Cursor, the
[`web-design-guidelines`](https://github.com/strongeron/agent-skills/tree/main/skills/web-design-guidelines)
skill wires this up for you: it knows which slice to fetch for the code being
reviewed, so you don't have to think about it.

### Or point your agent at the endpoints

The whole corpus is **166k tokens**, so fetching it is almost never right. Fetch the slice that matches what you're doing:

| Doing | Fetch | Cost |
| --- | --- | --- |
| Reviewing a diff or a few files | `/categories/<category>.md` | 6k–26k |
| A fast pass over anything | `/principles/must.md` — all 191 MUST rules | ~11k |
| Fixing or applying one rule | `/principles/<id>.md` | ~1.4k |
| Finding which rule covers something | `/principles/index.md` — every id + title | ~8k |
| Programmatic use | `/principles/<id>.json` | ~1.4k |
| Everything, rarely correct | `/llms-full.txt` | 166k |

Base URL: `https://ui-guides-agent-rules.netlify.app` · categories are
`interactions` `animations` `layout` `content` `forms` `performance` `design` `aesthetics`

```bash
# every forms rule, with reasoning
curl -s https://ui-guides-agent-rules.netlify.app/categories/forms.md

# one rule — including the good AND bad component, as real code
curl -s https://ui-guides-agent-rules.netlify.app/principles/forms-enter-submits.md
```

**The per-rule payload is the one worth knowing about.** It carries both example
components in full — the correct implementation and the wrong one. No other
endpoint exposes them, and the wrong example is often more useful than the rule
text, because it shows the specific mistake the rule exists to prevent.

### Or add a line to your agent config

In `CLAUDE.md`, `AGENTS.md`, or Cursor rules:

```md
When writing or reviewing UI code, consult
https://ui-guides-agent-rules.netlify.app/principles/index.md,
then fetch the categories or individual rules that apply.
Do not fetch llms-full.txt — it is 166k tokens.
```

**Or take one rule by hand.** Every principle on the site has a **Copy Rule** button — the `MUST` / `SHOULD` / `NEVER` line, the description, and a code example where one exists.

If you cite a rule, credit the upstream author it came from — not this repo.

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
