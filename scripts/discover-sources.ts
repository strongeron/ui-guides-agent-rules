#!/usr/bin/env npx tsx
/**
 * Source Discovery — the ecosystem-level scanner.
 *
 * `check:sources` diffs the exact rawUrls we hardcoded (rule-level). `sources:catalog`
 * diffs the catalog against the Obsidian report (source-level). Neither notices when a
 * publisher ADDS a new skill to a repo we already track: e.g. ibelick/ui-skills grew
 * `baseline-ui` + `fixing-*` and nothing flagged them — they had to be found by hand.
 *
 * This walks every catalogued GitHub repo's tree, lists its skill directories (dirs
 * containing a SKILL.md), and flags the ones NOT already wired into a source's rawUrls.
 * For github-mode sources an un-wired skill is actionable (add its SKILL.md to rawUrls).
 * For manual sources it is informational (the repo has more than we're diffing).
 *
 *   npm run sources:discover
 *
 * Read-only: never mutates sources.ts or principles/**. Uses the GitHub API — set
 * GITHUB_TOKEN (or GH_TOKEN) to lift the 60 req/hr unauthenticated rate limit.
 */
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { sourceCatalog } from '../src/data/sources';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '..', 'doc', 'source-discovery.json');

const TOKEN = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;

async function ghFetch<T>(path: string): Promise<T> {
  const headers: Record<string, string> = {
    'User-Agent': 'ui-guides-sync/1.0',
    Accept: 'application/vnd.github+json',
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(`https://api.github.com/${path}`, { signal: controller.signal, headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}${res.status === 403 ? ' (rate limit? set GITHUB_TOKEN)' : ''}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

/** Skill dirs = directories that contain a SKILL.md. Returns full dir paths ('(root)' for a top-level one). */
function skillDirsFromTree(tree: { path: string; type: string }[]): string[] {
  const dirs = new Set<string>();
  for (const entry of tree) {
    if (entry.type !== 'blob') continue;
    if (!/(^|\/)SKILL\.md$/i.test(entry.path)) continue;
    // Skip test scaffolding, not real skills.
    if (/(^|\/)(tests?|fixtures|node_modules|\.git)(\/|$)/i.test(entry.path)) continue;
    const dir = entry.path.replace(/\/?SKILL\.md$/i, '');
    dirs.add(dir === '' ? '(root)' : dir);
  }
  return [...dirs].sort();
}

/** The skill's identity is its dir name — collapse copies mirrored across agent dirs
 *  (`.claude/skills/x`, `.cursor/skills/x` … all name the SAME skill `x`). */
const skillName = (dir: string): string => dir.split('/').pop() || dir;
const uniq = (xs: string[]): string[] => [...new Set(xs)].sort();

interface RepoReport {
  source: string;
  name: string;
  repo: string;
  mode: 'github' | 'manual';
  status: 'scanned' | 'unreachable' | 'no-skill-dirs';
  wired?: string[];
  unwired?: string[];
  truncated?: boolean;
  note?: string;
}

async function main() {
  const nowISO = new Date().toISOString();
  const withRepo = sourceCatalog.filter((s) => s.repo);
  const reports: RepoReport[] = [];

  for (const src of withRepo) {
    const repo = src.repo!;
    const mode = src.check.mode;
    const rawUrls = src.check.mode === 'github' ? src.check.rawUrls : [];
    try {
      const meta = await ghFetch<{ default_branch: string }>(`repos/${repo}`);
      const treeRes = await ghFetch<{ tree: { path: string; type: string }[]; truncated: boolean }>(
        `repos/${repo}/git/trees/${meta.default_branch}?recursive=1`
      );
      const dirs = skillDirsFromTree(treeRes.tree);
      if (dirs.length === 0) {
        reports.push({ source: src.id, name: src.name, repo, mode, status: 'no-skill-dirs', note: 'rules live in README/other, not SKILL.md dirs' });
        continue;
      }
      // A skill dir is "wired" if some rawUrl points inside it. Match on the full path,
      // then report by unique skill name so mirrored copies collapse to one entry.
      const wiredDirs = dirs.filter((d) => d !== '(root)' && rawUrls.some((u) => u.includes(`/${d}/`)));
      const wired = uniq(wiredDirs.map(skillName));
      const unwired = uniq(dirs.filter((d) => !wiredDirs.includes(d)).map(skillName)).filter((n) => !wired.includes(n));
      reports.push({ source: src.id, name: src.name, repo, mode, status: 'scanned', wired, unwired, truncated: treeRes.truncated || undefined });
    } catch (err) {
      reports.push({ source: src.id, name: src.name, repo, mode, status: 'unreachable', note: (err as Error).message });
    }
  }

  print(reports);
  writeFileSync(outPath, JSON.stringify({ generatedAt: nowISO, tokenUsed: Boolean(TOKEN), reports }, null, 2) + '\n');
  console.log(`\n📁 → doc/source-discovery.json\n`);
}

function print(reports: RepoReport[]): void {
  console.log('\n🔭 Source Discovery — skills in catalogued repos\n');
  // github-mode with un-wired skills is the actionable bucket; surface it first.
  const actionable = reports.filter((r) => r.mode === 'github' && (r.unwired?.length ?? 0) > 0);
  console.log(`  Repos scanned: ${reports.filter((r) => r.status === 'scanned').length}/${reports.length}`);
  console.log(`  🎯 github-mode repos with NEW un-wired skills: ${actionable.length}\n`);

  for (const r of reports) {
    const label = r.name.padEnd(22);
    if (r.status === 'unreachable') {
      console.log(`  ${label} ⚠️  ${r.repo} — ${r.note}`);
    } else if (r.status === 'no-skill-dirs') {
      console.log(`  ${label} ·  ${r.repo} — no SKILL.md dirs (${r.note})`);
    } else {
      const nUn = r.unwired?.length ?? 0;
      const flag = r.mode === 'github' ? (nUn > 0 ? `🆕 ${nUn} un-wired` : '✅ all wired') : `ℹ️  manual (${(r.wired?.length ?? 0) + nUn} skills available)`;
      console.log(`  ${label} ${flag}  — ${r.repo}${r.truncated ? '  [tree truncated!]' : ''}`);
      if (nUn > 0) console.log(`      ${r.mode === 'github' ? 'add to rawUrls' : 'available'}: ${r.unwired!.join(', ')}`);
    }
  }
  console.log('\n  Wire a new skill:  add its raw SKILL.md URL to that source\'s check.rawUrls in src/data/sources.ts,');
  console.log('  then: npm run check:sources');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
