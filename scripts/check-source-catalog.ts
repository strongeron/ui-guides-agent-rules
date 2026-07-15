#!/usr/bin/env npx tsx
/**
 * Catalog Coverage Check
 *
 * Diffs src/data/sources.ts against the provenance report
 * ("UI · Animation · Design Skills — Source Directory 2026"): which GitHub
 * sources in the report are not yet in our catalog, and which catalog entries
 * are missing check config. Keeps the app's source catalog in sync with the note.
 *
 *   npm run sources:catalog
 *   npm run sources:catalog -- --report="/abs/path/to/report.md"
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { sourceCatalog, declinedSources } from '../src/data/sources';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docDir = join(__dirname, '..', 'doc');
const outPath = join(docDir, 'source-catalog-check.json');

const DEFAULT_REPORT =
  '/Users/strongeron/Library/Mobile Documents/iCloud~md~obsidian/Documents/Fox Brains/AI/Claude Code/UI · Animation · Design Skills — Source Directory 2026.md';

// Non-source repos that appear in the report but aren't rule sources to catalogue.
const IGNORE_REPOS = new Set(['anthropics/claude-code', 'anthropics']);

function normalizeRepo(raw: string): string | null {
  const repo = raw
    .replace(/^https?:\/\//, '')
    .replace(/^github\.com\//, '')
    .replace(/\.git$/, '')
    .replace(/\/(tree|blob)\/.*$/, '')
    .replace(/[.,)`\]]+$/, '')
    .toLowerCase();
  const parts = repo.split('/');
  if (parts.length < 2) return null;
  const [owner, name] = parts;
  if (['github', 'www', 'http', 'https'].includes(owner)) return null;
  const norm = `${owner}/${name}`;
  return IGNORE_REPOS.has(norm) ? null : norm;
}

function extractRepos(md: string): string[] {
  const repos = new Set<string>();
  // Only trust two contexts: GitHub links, or backtick-delimited `owner/repo`.
  const patterns = [
    /github\.com\/([a-z0-9][\w.-]+\/[\w.-]+)/gi,
    /`([a-z0-9][a-z0-9-]+\/[\w.-]+)`/gi,
  ];
  for (const re of patterns) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(md)) !== null) {
      const norm = normalizeRepo(m[1]);
      if (norm) repos.add(norm);
    }
  }
  return [...repos].sort();
}

function main() {
  const reportPath = process.argv.find((a) => a.startsWith('--report='))?.split('=')[1] ?? DEFAULT_REPORT;
  const catalogRepos = new Set(sourceCatalog.map((s) => s.repo?.toLowerCase()).filter(Boolean) as string[]);

  const nowISO = new Date().toISOString();
  let reportRepos: string[] = [];
  let reportFound = false;
  if (existsSync(reportPath)) {
    reportFound = true;
    reportRepos = extractRepos(readFileSync(reportPath, 'utf-8'));
  }

  // Subtract deliberately-declined repos: they appear in the report but were reviewed
  // and rejected (see `declinedSources`). Re-surfacing them as "candidates to add"
  // re-litigates settled decisions — the exact thing that array exists to prevent.
  const declined = new Set<string>(declinedSources.map((r) => r.toLowerCase()));
  const inReportNotCatalog = reportRepos.filter((r) => !catalogRepos.has(r) && !declined.has(r));
  const inReportDeclined = reportRepos.filter((r) => declined.has(r));
  const inCatalogNotReport = [...catalogRepos].filter((r) => !reportRepos.includes(r)).sort();
  const catalogMissingCheck = sourceCatalog
    .filter((s) => s.check.mode === 'github' && (s.check.rawUrls?.length ?? 0) === 0)
    .map((s) => s.id);

  console.log('\n🗂️  Source Catalog Coverage\n');
  console.log(`  Catalog sources:   ${sourceCatalog.length}`);
  console.log(`  Onboarded (app):   ${sourceCatalog.filter((s) => s.patternSource).length}`);
  console.log(`  Auto-diffable:     ${sourceCatalog.filter((s) => s.check.mode === 'github').length}`);
  if (!reportFound) {
    console.log(`\n  ⚠️  Report not found at:\n     ${reportPath}`);
    console.log('     Pass --report="/path/to/report.md" to diff against it.');
  } else {
    console.log(`\n  Report repos found: ${reportRepos.length}`);
    if (inReportNotCatalog.length) {
      console.log(`\n  🆕 In report, NOT in catalog (${inReportNotCatalog.length}) — candidates to add:`);
      for (const r of inReportNotCatalog) console.log(`      • ${r}`);
    } else {
      console.log('\n  ✅ Every report repo is represented in the catalog.');
    }
    if (inReportDeclined.length) {
      console.log(`\n  🚫 In report but previously DECLINED (${inReportDeclined.length}, not re-surfaced): ${inReportDeclined.join(', ')}`);
    }
    if (inCatalogNotReport.length) {
      console.log(`\n  ℹ️  In catalog, not matched in report (${inCatalogNotReport.length}): ${inCatalogNotReport.join(', ')}`);
    }
  }
  if (catalogMissingCheck.length) {
    console.log(`\n  ⚠️  github sources with no rawUrls: ${catalogMissingCheck.join(', ')}`);
  }

  writeFileSync(
    outPath,
    JSON.stringify({ generatedAt: nowISO, reportFound, reportPath, inReportNotCatalog, inReportDeclined, inCatalogNotReport, catalogMissingCheck }, null, 2) + '\n'
  );
  console.log(`\n📁 → doc/source-catalog-check.json\n`);
}

main();
