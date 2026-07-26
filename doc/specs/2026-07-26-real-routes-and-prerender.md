# Real Routes & Prerender

**Date:** 2026-07-26
**Status:** Draft — awaiting approval before `ce-plan` / implementation
**Revised:** 2026-07-26 — direction changed from a hand-built static shell to
islands SSG, after probing the components under `react-dom/server` instead of
assuming they would fail. See "Measured, not assumed".

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

## Measured, not assumed

The first draft of this spec assumed the components were not server-renderable and
recommended hand-building a static shell from the data. That assumption was wrong,
and it was cheap to test. Rendering the real components under `react-dom/server`:

| Component | Result |
|---|---|
| `AgentRuleCard` | renders, 10 KB, agent rule present in the markup |
| `PrincipleReferencesCard` | renders, all 6 split paragraphs present |
| `Footer` | renders, 2.7 KB |
| `Header` | renders, 7.0 KB |
| `Sidebar` | renders, **340 KB** — every one of the 404 links |

Nothing touches `window` during render. The only genuinely client-only part is
`ExampleRenderer`, which is already lazy-loaded — i.e. already an island.

Also measured, for the URL question: all 404 ids are prefixed by their own
category (0 exceptions), no id collides with a reserved root path, and exactly one
slug (`no-dead-zones`) appears in two categories.

## Options

### A. SSR the whole app, examples included

Still rejected. The 404 example components touch DOM, canvas, WebGL and timers;
making them all server-safe is open-ended work with no user-visible payoff.

### B. Hand-built static shell per route, generated from principle data

Emit HTML from a template fed by the `Principle` object; React wipes and replaces
it on mount.

- **Pro:** no SSR machinery.
- **Con:** the template duplicates the JSX structure, so the two drift. Replacing
  the content on mount means a flash and a layout shift. And it forces two
  arbitrary decisions — how much prose to include, and whether hidden-ish content
  is safe — that only exist *because* the HTML is a hand-made approximation.

### C. Islands SSG — prerender the real components, examples stay client-only ✅

Render the actual `PrincipleView` tree at build time with `ExampleRenderer`
replaced by a sized placeholder, then `hydrateRoot` on the client.

- **Pro:** no duplication and therefore no drift — the same components produce
  both renders. No flash: React hydrates in place rather than replacing. The
  agent rule, the description and the split explanation are all in the HTML
  because the components put them there. The example cards already carry
  `min-h-[180px]`, so the island placeholder reserves its own height and the
  hydration swap costs no layout shift.
- **Con:** needs a second Vite build pass (SSR target) and `hydrateRoot` instead
  of `createRoot`. More setup than B — but less bespoke code, because there is no
  template to write or maintain.

### D. `.md` twins only

A subset of C, not an alternative: real agent value, but no indexable pages and no
OG cards. Folds into C's generator.

## Chosen direction

**C, with D's `.md` output folded in.** Per rule, the build emits:

| Path | Purpose |
|---|---|
| `/principles/<id>` | indexable page, per-rule `<head>`, real prerendered content |
| `/principles/<id>.md` | clean Markdown twin for agents |

**URL shape: `/principles/<id>`** — flat, not `/principles/<category>/<slug>`.
Hierarchy is derivable (measured above) and would enable category hub pages, but
it couples every rule's URL to a mutable piece of metadata: recategorising a rule
would change its URL and need a redirect. Deriving permanent URLs from a stable
identifier rather than from taxonomy is the older and better rule — it is why
WordPress permalinks moved off `/category/post`. Category hubs can live at their
own path without rule URLs depending on them. The `/principles/` prefix also keeps
the root namespace free, which `/` -squatting ids would not.

The id→URL map is 1:1 and total, so no mapping table is needed.

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

## Resolved

The three questions the first draft left open were artifacts of choosing option B.
Two of them stop existing under C:

1. **URL shape** — settled above: `/principles/<id>`, flat, on the
   stable-identifier argument.
2. **Hydration flash** — does not occur. Hydration reuses the server markup rather
   than replacing it, and the example island's placeholder inherits the existing
   `min-h-[180px]`, so there is no layout shift either.
3. **Agent rule in the HTML** — not a decision. `AgentRuleCard` renders it, so it
   is there; verified in the probe. That it also appears in `llms-full.txt` is the
   point of `rel="alternate"`, not a duplication problem — and the GEO evidence is
   that visible rendered text is what models actually weight.

## Open question

**Sidebar weight.** It renders every one of the 404 links, which is 340 KB per
page — about 137 MB across the corpus, before gzip. Full nav on every page is good
internal linking, but that is a lot of bytes for LCP and for the build. Three ways
out, in preference order:

1. Prerender the current category's rules only (~89 worst case, ~20 KB) and let
   the client fill in the rest on hydrate.
2. Prerender the 8 category headings only; rules load client-side.
3. Keep the sidebar entirely client-only and rely on `sitemap.xml` plus category
   hubs for crawl paths.

Option 1 keeps meaningful internal linking at ~6% of the cost and is the default
unless there is a reason to prefer another.
