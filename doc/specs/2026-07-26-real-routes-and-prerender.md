# Real Routes & Prerender

**Date:** 2026-07-26
**Status:** Draft — awaiting approval before `ce-plan` / implementation

## Problem

Per-principle state lives in the URL **hash**, so all 404 rules collapse into one
indexable URL. Three consequences, in descending order of cost:

1. **Search engines index 1 page, not 404.** Hash fragments are not distinct URLs.
   `sitemap.xml` honestly lists 3 entries because 3 is all that is fetchable.
2. **Every rule shares one title, one OG card, one description.** A link to a
   specific rule previews as the generic site card. There is no per-rule social
   surface and no per-rule author credit.
3. **Agents fetching a rule URL get a React shell.** Mitigated — `llms-full.txt`
   carries the corpus and now has a permalink per rule — but the permalink still
   resolves to a page whose HTML contains none of the rule.

CLAUDE.md has called this "the unlock" for a while. This spec decides how.

## Constraints

- **Netlify static hosting.** No SSR runtime unless we adopt edge functions,
  which is a bigger operational commitment than this problem warrants.
- **Hash URLs must keep working, permanently.** They are in the wild: the
  `llms.txt` shipped in #36 deep-links every category by hash, and `llms-full.txt`
  carries a hash permalink for all 404 rules. Breaking them breaks citations we
  just published.
- **404 example components are not SSR-safe.** They are the point of the app and
  many touch DOM, canvas, WebGL, and timers. Any design that requires rendering
  them on the server is a large, open-ended porting job.
- **Single source of truth.** `src/data/principles/**` already generates
  `llms.txt` / `llms-full.txt` / `sitemap.xml`. Route output must come from the
  same place or it will drift.
- The existing hash logic has careful history semantics (pushState vs
  replaceState, `hashchange` **and** `popstate`) documented in CLAUDE.md. Whatever
  replaces it must preserve Back/Forward behaviour, not regress it.

## Options

### A. React SSR / SSG the whole app (`vite-react-ssg`, or `renderToString` at build)

Render each route fully — including the Good/Bad examples — to static HTML.

- **Pro:** maximal fidelity; the served HTML is exactly the app.
- **Con:** requires all 404 example components to be SSR-safe. They are not, and
  making them so is open-ended work with no user-visible payoff. This is the
  option that looks obvious and is actually the trap.

### B. Static shell per route, generated from principle data (recommended)

Emit `dist/principles/<id>/index.html` at build: correct `<title>`, meta,
canonical, OG/Twitter, per-rule JSON-LD, and a **real content block** carrying the
rule prose (title, category, MUST/SHOULD/NEVER rule, description, explanation,
source links). React mounts and takes over; the static block is removed on mount.
The examples stay client-only — they are interactive demos, not indexable prose.

- **Pro:** no SSR constraint at all; reuses the data pipeline that already writes
  `llms-full.txt`; the generator is ~1 file. Ships every SEO/OG/agent benefit that
  motivated the work.
- **Con:** served HTML is not byte-identical to the hydrated app (examples are
  absent pre-hydration). Drift risk between the static block and the React view —
  mitigated by generating both from the same `Principle` object and keeping the
  static block deliberately minimal.

### C. `.md` twins only, keep hash routing

Emit `/principles/<id>.md` and stop.

- **Pro:** cheapest; real agent value today.
- **Con:** does nothing for options 1 and 2 — no indexable pages, no OG cards.
  This is a *subset* of B, not an alternative to it.

## Chosen direction

**B, with C's `.md` output folded in** — the same generator emits, per rule:

| Path | Purpose |
|---|---|
| `/principles/<id>/index.html` | indexable page, per-rule `<head>`, static prose |
| `/principles/<id>.md` | clean Markdown twin for agents |

Routing moves from hash to History API. **Hand-rolled, not react-router**: the app
has exactly three route shapes (`/`, `/principles/:id`, `/sources`), the existing
hash logic is already a careful hand-rolled two-way binding, and a router library
would add a dependency to replace ~60 lines while forcing a rewrite of semantics
that currently work. Revisit if a fourth route shape appears.

**Compatibility layer, permanent:** on mount, if the pathname is `/` and the hash
matches a principle id, `replaceState` to `/principles/<id>`. Costs ~5 lines and
keeps every published citation alive.

Once routes are live, `llms.txt` / `llms-full.txt` / `sitemap.xml` switch from
hash permalinks to real ones, and the sitemap grows from 3 URLs to 400+.

## Scope

- History-API routing for `/`, `/principles/:id`, `/sources`.
- Sidebar and Prev/Next become real `<a href>` with intercepted clicks — currently
  buttons, which are invisible to a crawler even once routes exist. This is
  load-bearing, not polish.
- Build-time generator for the HTML shells and `.md` twins.
- Hash → path compatibility redirect.
- Regenerated `llms.txt` / `llms-full.txt` / `sitemap.xml` pointing at real URLs.
- `netlify.toml`: keep `/*` → `/index.html` **200** as the fallback only; Netlify
  serves existing static files first, so prerendered pages win without reordering.

## Non-goals

- SSR of example components (option A). Explicitly rejected above.
- Edge functions or `Accept: text/markdown` content negotiation. Static `.md`
  twins cover the agent case; negotiation is a later, separate call.
- Changing the principle data model, the sidebar UX, or the visual design.
- Per-rule OG **images**. Per-rule OG *metadata* is in scope; generating 404
  images is a separate piece of work.

## Open questions

1. **URL shape** — `/principles/<id>` (namespaced, room to grow) vs `/<id>`
   (shorter, but squats the root namespace). Spec assumes the former.
2. **Hydration flash** — the static block is removed on mount. If React is slow
   on a cold cache the user sees unstyled-ish prose first. Arguably better than a
   blank screen, but it is a visible behaviour change worth agreeing on.
3. **Does the static block include the agent rule verbatim?** It is the most
   citable part, which argues yes; it also duplicates `llms-full.txt`, which is
   fine, but it means the HTML is no longer a strict subset of the app view.
