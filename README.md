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

404 principles across eight categories — interactions, animations, layout, content, forms, performance, design, aesthetics — drawn from 15 upstream sources. Search, filter by source or tag. Every rule is its own page at `/principles/<id>`, with a Markdown twin at `/principles/<id>.md`.

**To use it:** point a coding agent at [`principles/index.md`](https://ui-guides-agent-rules.netlify.app/principles/index.md) — every rule tagged with what it applies to, searchable in ~12k tokens — and let it fetch only what matched.

## What's inside

- **404 principles**, each with a side-by-side good/bad example you can operate — not screenshots, real components.
- **Multi-source and attributed.** Every rule is tagged with the upstream project it came from, filterable by origin, and credited on the Sources page.
- **Agent-ready rules.** All 404 principles carry a `MUST` / `SHOULD` / `NEVER` rule written to be pasted straight into a coding agent's context; 106 of them add a code example. One click to copy.
- **Fetchable in slices.** Static files an agent pays for by the piece: a searchable [index](https://ui-guides-agent-rules.netlify.app/principles/index.md) at ~12k tokens, all 191 [MUST rules](https://ui-guides-agent-rules.netlify.app/principles/must.md) at ~11k, one category at 6k–26k, or [a single rule](https://ui-guides-agent-rules.netlify.app/principles/forms-enter-submits.md) at ~1.4k — that last one carrying **both example components as real code**, which nothing else exposes.
- **Every rule is a real page**, prerendered with its own title, description, OG card and structured data — 408 URLs in the sitemap, not one. All of it generated from the principle data at build time.
- **Keyboard-first, accessible, themed.** The guide practices what it documents: visible focus rings, focus traps, hit targets, `prefers-reduced-motion`, light/dark, dynamic page titles.

## Use the rules in your own project

The rules are free to take. Everything below is a static file you fetch — no install, no key, no build step.

The whole corpus is **169k tokens**. Almost nothing needs it — the point of the
layout below is that a real review costs about **5k**.

### The cheap path

```bash
BASE=https://ui-guides-agent-rules.netlify.app

# 1. Grep the index for what you're building, or for a symbol already in your code.
#    Don't read it whole — grepping is 5-25x cheaper.
curl -s $BASE/principles/index.md | grep onSubmit         # ~540 tokens, 16 lines
curl -s $BASE/principles/index.md | grep dialog-overlay   # 25 lines

# 2. Fetch only what matched. Each payload carries the rule, the reasoning,
#    and BOTH example components as real code.
curl -s $BASE/principles/forms-enter-submits.md           # 917 tokens
```

Every index line ends with match tokens: the surfaces a rule applies to
(`form-input`, `dialog-overlay`, `focus-keyboard`, `motion`, `media`…) and the
symbols its examples use (`onSubmit`, `:focus-visible`, `aria-live`,
`overscroll-behavior`). A rule carries *every* surface it applies to, so a focus
rule turns up under buttons, forms, dialogs and links alike.

### What each fetch costs

| Fetch | Cost | For |
| --- | --- | --- |
| `/llms.txt` | 1.5k | What exists at all. Cheapest possible start. |
| `grep` on `/principles/index.md` | 0.5k–2.6k | **Finding which rules apply.** |
| `/principles/<id>.md` | ~1.5k | One rule + both examples. The payload worth knowing about. |
| `/principles/<id>.json` | ~1.5k | Same, structured. |
| `/principles/index.md` (whole) | 12k | Only if you can't grep. |
| `/principles/must.md` | 11k | All 191 MUST rules — a sweep over a large diff. |
| `/categories/<category>.md` | 6k–26k | Everything in one area, no example code. |
| `/llms-full.txt` | **169k** | Rarely correct. |

Categories: `interactions` `animations` `layout` `content` `forms` `performance`
`design` `aesthetics`

**Why the per-rule payload is the one to reach for.** It carries both example
components in full — the correct implementation and the wrong one. No other
endpoint exposes them, and the wrong example is often more useful than the rule
text, because it shows the exact mistake the rule exists to prevent.

A wrong id returns **404** with a pointer back to the index, so a typo fails
loudly instead of handing your agent an HTML page to parse.

### Or add a line to your agent config

In `CLAUDE.md`, `AGENTS.md`, or Cursor rules:

```md
When writing or reviewing UI code, consult ui-guides-agent-rules:

1. Grep https://ui-guides-agent-rules.netlify.app/principles/index.md for the
   surface you're working on (form-input, dialog-overlay, focus-keyboard,
   motion, media...) or for a symbol already in the code (onSubmit,
   :focus-visible, aria-live). Grep it — don't read the whole file.
2. Fetch only the matched rules at /principles/<id>.md. Each is ~1.5k tokens
   and includes a correct and an incorrect implementation.
3. Never fetch llms-full.txt — it is 169k tokens.
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
