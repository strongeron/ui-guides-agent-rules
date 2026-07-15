#!/usr/bin/env npx tsx
/**
 * Source Freshness Checker
 *
 * For each catalogued source (src/data/sources.ts) whose rules live as raw
 * markdown on GitHub, fetch the upstream list, extract candidate rules, and diff
 * them against the rules we already have in src/data/principles/**. Uncovered
 * upstream rules are written to doc/pending-rules.json flagged "needs-examples".
 * Sources with no machine-readable list are reminded on a review cadence.
 *
 *   npm run check:sources
 *   npm run check:sources -- --mark-reviewed=tailwind
 *
 * Never mutates src/data/principles/** — humans decide what to add.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { principles } from '../src/data/principles';
import { sourceCatalog, catalogById } from '../src/data/sources';
import { tokenize, coverage, extractRules, fetchText, slug, classifyCategory } from './lib/rules';
import type { PrincipleCategory } from '../src/types/principle';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docDir = join(__dirname, '..', 'doc');
const freshnessPath = join(docDir, 'source-freshness.json');
const pendingPath = join(docDir, 'pending-rules.json');
const reviewStatePath = join(docDir, 'source-review-state.json');
// Rule-level "reviewed & declined" — the analog of `declinedSources` in sources.ts, but
// for individual upstream rules we never intend to onboard (product philosophy, dev
// process, off-domain). Keyed by suggestedId. Keeps them out of the backlog for good.
const dismissedPath = join(docDir, 'dismissed-rules.json');

const MATCH_THRESHOLD = 0.5;
const DAY_MS = 24 * 60 * 60 * 1000;

interface NewRule {
  source: string;
  text: string;
  suggestedId: string;
  category: PrincipleCategory;
  tags: string[];
  bestMatch: number;
}
interface SourceReport {
  source: string;
  name: string;
  mode: 'github' | 'manual';
  status: 'checked' | 'unreachable' | 'manual-ok' | 'manual-due';
  upstreamRules?: number;
  ourRules: number;
  newRules?: NewRule[];
  daysSinceReview?: number;
  reviewEveryDays?: number;
  note?: string;
}

function loadJson<T>(path: string, fallback: T): T {
  if (!existsSync(path)) return fallback;
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as T;
  } catch {
    return fallback;
  }
}

function tokenizeKey(text: string): string {
  return [...tokenize(text)].sort().join(' ');
}

async function main() {
  const markReviewed = process.argv.find((a) => a.startsWith('--mark-reviewed='))?.split('=')[1];
  const reviewState = loadJson<Record<string, string>>(reviewStatePath, {});
  const nowISO = new Date().toISOString();

  if (markReviewed) {
    if (!catalogById.has(markReviewed)) {
      console.error(`Unknown source: ${markReviewed}. Known: ${sourceCatalog.map((s) => s.id).join(', ')}`);
      process.exit(1);
    }
    reviewState[markReviewed] = nowISO;
    writeFileSync(reviewStatePath, JSON.stringify(reviewState, null, 2) + '\n');
    console.log(`✅ Marked "${markReviewed}" reviewed at ${nowISO}`);
    return;
  }

  // Match upstream rules against the WHOLE corpus (not just same-source) — we
  // often tag a rule under a different source than upstream does.
  const allOurTokens: Set<string>[] = [];
  const oursBySource = new Map<string, number>();
  for (const p of principles) {
    allOurTokens.push(tokenize(`${p.title} ${p.sourceQuote} ${p.description}`));
    if (p.source) oursBySource.set(p.source, (oursBySource.get(p.source) ?? 0) + 1);
  }

  const reports: SourceReport[] = [];

  for (const src of sourceCatalog) {
    const ourCount = src.patternSource ? oursBySource.get(src.patternSource) ?? 0 : 0;

    if (src.check.mode === 'manual') {
      const last = reviewState[src.id];
      const daysSince = last ? Math.floor((Date.now() - Date.parse(last)) / DAY_MS) : Infinity;
      const due = daysSince >= src.check.reviewEveryDays;
      reports.push({
        source: src.id,
        name: src.name,
        mode: 'manual',
        status: due ? 'manual-due' : 'manual-ok',
        ourRules: ourCount,
        daysSinceReview: Number.isFinite(daysSince) ? daysSince : undefined,
        reviewEveryDays: src.check.reviewEveryDays,
        note: src.homepage,
      });
      continue;
    }

    // github mode
    let upstream: string[] = [];
    let unreachable = false;
    for (const url of src.check.rawUrls) {
      try {
        upstream.push(...extractRules(await fetchText(url)));
      } catch (err) {
        unreachable = true;
        console.error(`  ⚠️  ${src.id}: failed to fetch ${url} — ${(err as Error).message}`);
      }
    }
    upstream = [...new Set(upstream)];

    if (upstream.length === 0) {
      reports.push({
        source: src.id,
        name: src.name,
        mode: 'github',
        status: 'unreachable',
        ourRules: ourCount,
        note: unreachable ? 'fetch failed' : 'no bullet rules extracted',
      });
      continue;
    }

    const newRules: NewRule[] = [];
    for (const rule of upstream) {
      const cand = tokenize(rule);
      let best = 0;
      for (const ours of allOurTokens) best = Math.max(best, coverage(cand, ours));
      if (best < MATCH_THRESHOLD) {
        const category = classifyCategory(rule);
        newRules.push({
          source: src.id,
          text: rule,
          suggestedId: `${src.patternSource ?? src.id}-${slug(rule)}`,
          category,
          tags: [...new Set([...(src.defaultTags ?? []), category])],
          bestMatch: Number(best.toFixed(2)),
        });
      }
    }
    newRules.sort((a, b) => a.bestMatch - b.bestMatch);

    reports.push({
      source: src.id,
      name: src.name,
      mode: 'github',
      status: 'checked',
      upstreamRules: upstream.length,
      ourRules: ourCount,
      newRules,
    });
  }

  // Merge new rules into pending-rules.json (preserve existing status).
  interface PendingEntry {
    suggestedId: string;
    source: string;
    text: string;
    category: PrincipleCategory;
    tags: string[];
    status: string;
    firstSeen: string;
    lastSeen: string;
  }
  const existing = loadJson<{ pending: PendingEntry[] }>(pendingPath, { pending: [] });
  const byKey = new Map(existing.pending.map((e) => [`${e.source}::${tokenizeKey(e.text)}`, e]));

  // Everything actually observed upstream this run (uncovered rules from reachable sources).
  const seenKeys = new Set<string>();
  const checkedSources = new Set(reports.filter((r) => r.status === 'checked').map((r) => r.source));
  for (const nr of reports.flatMap((r) => r.newRules ?? [])) {
    const key = `${nr.source}::${tokenizeKey(nr.text)}`;
    seenKeys.add(key);
    const prev = byKey.get(key);
    if (prev) {
      prev.lastSeen = nowISO;
      prev.category = nr.category;
      prev.tags = nr.tags;
    } else {
      byKey.set(key, {
        suggestedId: nr.suggestedId,
        source: nr.source,
        text: nr.text,
        category: nr.category,
        tags: nr.tags,
        status: 'needs-examples',
        firstSeen: nowISO,
        lastSeen: nowISO,
      });
    }
  }

  const dismissed = new Set(
    loadJson<{ dismissed: { suggestedId: string }[] }>(dismissedPath, { dismissed: [] }).dismissed.map((d) => d.suggestedId)
  );
  const githubSourceIds = new Set(sourceCatalog.filter((s) => s.check.mode === 'github').map((s) => s.id));

  // A pending item survives only if it is still a live, undismissed, uncovered upstream rule.
  // Drop it when: its source left github mode; it was reviewed-and-dismissed; or its source
  // was fetched this run but the rule was NOT re-observed — meaning upstream removed it, we
  // stopped fetching that file (a rawUrl was pruned), or we have since covered it (best >=
  // threshold, so it no longer counts as new). Items from a source that was unreachable this
  // run are kept untouched, since absence there means "couldn't check", not "gone".
  let droppedStale = 0;
  let droppedDismissed = 0;
  const pending = [...byKey.values()]
    .filter((e) => {
      if (!githubSourceIds.has(e.source)) return false;
      if (dismissed.has(e.suggestedId)) { droppedDismissed++; return false; }
      const key = `${e.source}::${tokenizeKey(e.text)}`;
      if (checkedSources.has(e.source) && !seenKeys.has(key)) { droppedStale++; return false; }
      return true;
    })
    .sort((a, b) => a.source.localeCompare(b.source));
  if (droppedStale || droppedDismissed) {
    console.log(`\n🧹 pruned ${droppedStale} stale (covered/removed) + ${droppedDismissed} dismissed from the backlog`);
  }
  writeFileSync(pendingPath, JSON.stringify({ generatedAt: nowISO, pending }, null, 2) + '\n');
  writeFileSync(freshnessPath, JSON.stringify({ generatedAt: nowISO, reports }, null, 2) + '\n');

  printReport(reports, pending.filter((p) => p.status === 'needs-examples').length);
}

function printReport(reports: SourceReport[], pendingCount: number): void {
  console.log('\n🔎 Source Freshness\n');
  for (const r of reports) {
    const label = r.name.padEnd(22);
    if (r.mode === 'github') {
      if (r.status === 'unreachable') {
        console.log(`  ${label} ⚠️  ${r.note ?? 'unreachable'} (kept ${r.ourRules} local)`);
      } else {
        const n = r.newRules?.length ?? 0;
        console.log(`  ${label} ${n > 0 ? `🆕 ${n} to review` : '✅ up to date'}  (upstream ${r.upstreamRules}, ours ${r.ourRules})`);
        for (const nr of r.newRules ?? []) {
          console.log(`      • [${nr.category}] ${nr.text}  (closest ${Math.round(nr.bestMatch * 100)}%)`);
        }
      }
    } else if (r.status === 'manual-due') {
      const since = r.daysSinceReview === undefined ? 'never reviewed' : `${r.daysSinceReview}d ago`;
      console.log(`  ${label} 🔁 review due (${since}, cadence ${r.reviewEveryDays}d) → ${r.note ?? ''}`);
    } else {
      console.log(`  ${label} ✅ reviewed ${r.daysSinceReview}d ago (< ${r.reviewEveryDays}d)`);
    }
  }
  console.log(`\n📥 ${pendingCount} rule(s) awaiting examples → doc/pending-rules.json`);
  console.log('📁 Full report → doc/source-freshness.json');
  console.log('   Onboard a source:   npm run sources:build -- <id>');
  console.log('   Mark manual reviewed: npm run check:sources -- --mark-reviewed=<id>\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
