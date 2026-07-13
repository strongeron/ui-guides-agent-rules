# Source Freshness & Sync

**Date:** 2026-07-12
**Status:** Draft — awaiting approval before `ce-plan` / implementation

## Problem

Every rule in `src/data/principles/**` was hand-copied from an upstream "skill"
source (Vercel guidelines, Tailwind docs, Rauno, RAMS, @Ibelick/ui-skills,
Anthropic Skills, Claude Code research). There is **no mechanism** to tell when a
source publishes a new/changed rule, so our copy silently goes stale. We want to:

1. Periodically **check each source** for rules we don't have yet.
2. When a new rule appears, **add it to a queue** and **flag it "needs examples"**
   (Good/Bad components) so a human/agent can author it.
3. Formalize a **sources config** so each source declares *how* it can be checked.

## Hard constraint: sources are not equally machine-checkable

This is the crux. Only two sources expose a stable, fetchable rule list we can
diff automatically; the rest are prose HTML with no rule manifest.

| Source | Canonical machine-readable list? | Auto-diffable? |
|---|---|---|
| **Vercel** | `raw.githubusercontent.com/.../command.md` (already in registry `rulesUrl`) | ✅ Yes |
| **Anthropic Skills** | `github.com/anthropics/skills` → `SKILL.md` files (GitHub API / raw) | ✅ Yes |
| Tailwind | `tailwindcss.com/docs` (HTML, no manifest) | ⚠️ Heuristic scrape only |
| @Ibelick / ui-skills | `ui-skills.com` (HTML) | ⚠️ Heuristic scrape only |
| Rauno | `interfaces.rauno.me` (HTML) | ⚠️ Heuristic scrape only |
| RAMS | `rams.ai` (HTML) | ⚠️ Heuristic scrape only |
| WCAG / ARIA | W3C spec pages (stable, versioned, rarely change) | ⚠️ Manual cadence |
| Claude Code | research-derived, no canonical URL | ❌ Manual only |

**Implication:** "fully automatic for every source" is not achievable honestly.
The realistic design is *auto-diff where a manifest exists, scheduled manual-review
reminders where it doesn't* — and be explicit in output about which is which.

## Constraints

- No secrets/API keys beyond an optional `GITHUB_TOKEN` (raise rate limits).
- Deterministic, CI-runnable (`npx tsx`), no browser required for the two
  auto-diffable sources.
- Matching is fuzzy: we compare on normalized `sourceQuote` / `title`, not exact
  string equality (upstream wording drifts).
- Must not mutate `principles/**` automatically — humans decide what to add.

## Options

### Option A — Per-source manifest + diff report (recommended)
Add a `check` descriptor to each source (in `source-registry.ts` or a new
`src/data/source-manifests.ts`):
```ts
type SourceCheck =
  | { mode: 'fetch-markdown'; url: string; splitRules: RegExp }   // Vercel
  | { mode: 'github-skills'; repo: string; globs: string[] }      // Anthropic
  | { mode: 'manual'; reviewEveryDays: number; url: string };     // the rest
```
A script `scripts/check-source-freshness.ts`:
1. For `fetch-*` sources: fetch upstream, extract candidate rules, normalize.
2. Diff against our principles for that source (fuzzy match on quote/title).
3. Emit `doc/source-freshness.json` + a console table: **NEW / CHANGED / REMOVED**,
   plus **MANUAL-DUE** entries for `manual` sources past their review window.
4. New rules are written to `doc/pending-rules.json` with
   `status: "needs-examples"` and a scaffolded principle id.
- **Pros:** honest per-source handling; two sources fully automatic today;
  extensible; no auto-mutation. **Cons:** scrapers for HTML sources are best-effort.

### Option B — Manual review checklist only
Just a script that lists each source, its URL, and "last reviewed" dates; no
fetching/diffing. **Pros:** trivial, no fragile scrapers. **Cons:** doesn't
deliver the "automatically check" ask for Vercel/Anthropic where we *can*.

### Option C — Full scrape-everything
Playwright-scrape every HTML source into rule lists. **Pros:** maximal coverage.
**Cons:** brittle, high-maintenance, false positives; over-engineered for 6 sites
that change rarely.

## Chosen direction

**Option A.** It matches reality: automatic diff for Vercel + Anthropic Skills
(real value now), scheduled manual-review reminders for the HTML/research sources,
and a `pending-rules.json` queue that flags new rules as "needs examples" — feeding
directly into the existing `principles-authoring` workflow.

## Scope

**In:** source manifest type; `check-source-freshness.ts` (fetch-markdown +
github-skills + manual modes); `doc/source-freshness.json` + `doc/pending-rules.json`;
`npm run check:sources`; a short README section; optional CI/cron (weekly).

**Out (non-goals):** auto-adding principles to `principles/**`; auto-generating
Good/Bad example components; HTML scrapers for Tailwind/Rauno/RAMS/ui-skills
(v1 treats them as `manual` with a review cadence — can add scrapers later per source);
changing the runtime app.

## v2 — Sync System (built 2026-07-13)

Extended the freshness checker into a full add→extract→build→tag→check loop:

- **Catalog** `src/data/sources.ts` (`sourceCatalog`, 20 sources) mirrors the Obsidian
  provenance report; decoupled from `PatternSource` so sources can be catalogued
  before onboarding. Absorbs the old `source-manifests.ts` (deleted).
- **`npm run sources:build -- <id>`** — fetch → extract → classify category + tags →
  scaffold `status:'draft'` principles into `src/data/principles/drafts.ts` (hidden
  until examples exist + promoted). Proof: `emilkowalski` → 12 drafts.
- **`npm run sources:catalog`** — diffs catalog vs the report, flags uncatalogued repos.
- **Tags** — `src/data/tags.ts` derives cross-cutting tags at runtime; sidebar `TagFilter`.
- Shared extraction lib: `scripts/lib/rules.ts`.

## Decisions (approved 2026-07-12)

1. **Direction:** Option A.
2. **Surface:** local `npm run check:sources` + JSON artifacts. No CI in v1.
3. **Queue depth:** flag-only — `doc/pending-rules.json` lists new rules as
   `needs-examples`; no auto-scaffolding of example stubs.
4. **Manual review window:** 30 days for content sources (Tailwind, Rauno, RAMS,
   ui-skills), 90 days for slow-moving specs (WCAG, ARIA, Claude Code research).
5. **Review state** tracked in `doc/source-review-state.json`; stamp a source as
   reviewed with `npm run check:sources -- --mark-reviewed=<source>`.
