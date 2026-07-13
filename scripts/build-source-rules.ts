#!/usr/bin/env npx tsx
/**
 * Build draft principles from a catalogued source.
 *
 *   npm run sources:build -- <sourceId> [--limit=N]
 *
 * Fetches the source's raw markdown, extracts candidate rules, drops any already
 * covered by our corpus, classifies each into a category + tags, and writes them
 * as `status: 'draft'` Principle entries to src/data/principles/drafts.ts. Drafts
 * are hidden from the app until their Good/Bad example components are authored and
 * they are promoted into a category module. Never touches published data.
 */
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { principles, draftPrinciples } from '../src/data/principles';
import { catalogById } from '../src/data/sources';
import { tokenize, coverage, extractRules, fetchText, slug, deriveTitle, classifyCategory } from './lib/rules';
import type { Principle } from '../src/types/principle';

const __dirname = dirname(fileURLToPath(import.meta.url));
const draftsPath = join(__dirname, '..', 'src', 'data', 'principles', 'drafts.ts');
const MATCH_THRESHOLD = 0.5;

function tsStr(s: string): string {
  return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t') + "'";
}

function serializeDraft(p: Principle): string {
  const lines = ['  {'];
  lines.push(`    id: ${tsStr(p.id)},`);
  lines.push(`    category: ${tsStr(p.category)},`);
  if (p.source) lines.push(`    source: ${tsStr(p.source)},`);
  lines.push(`    title: ${tsStr(p.title)},`);
  lines.push(`    description: ${tsStr(p.description)},`);
  lines.push(`    sourceQuote: ${tsStr(p.sourceQuote)},`);
  lines.push(`    additionalExplanation: ${tsStr(p.additionalExplanation)},`);
  if (p.sourceLinks.length === 0) {
    lines.push('    sourceLinks: [],');
  } else {
    lines.push('    sourceLinks: [');
    p.sourceLinks.forEach((l) => lines.push(`      { text: ${tsStr(l.text)}, url: ${tsStr(l.url)} },`));
    lines.push('    ],');
  }
  lines.push(`    tags: [${(p.tags ?? []).map(tsStr).join(', ')}],`);
  lines.push(`    status: 'draft',`);
  lines.push(`    badExampleKey: ${tsStr(p.badExampleKey)},`);
  lines.push(`    goodExampleKey: ${tsStr(p.goodExampleKey)},`);
  lines.push('  }');
  return lines.join('\n');
}

async function main() {
  const id = process.argv.slice(2).find((a) => !a.startsWith('--'));
  const limit = Number(process.argv.find((a) => a.startsWith('--limit='))?.split('=')[1] ?? '0') || Infinity;

  if (!id) {
    console.error('Usage: npm run sources:build -- <sourceId> [--limit=N]');
    console.error(`Sources: ${[...catalogById.keys()].join(', ')}`);
    process.exit(1);
  }
  const src = catalogById.get(id);
  if (!src) {
    console.error(`Unknown source: ${id}`);
    process.exit(1);
  }
  if (src.check.mode !== 'github') {
    console.error(`Source "${id}" has no github rawUrls to extract from (mode: manual).`);
    console.error('Add verified rawUrls + set check.mode "github" in src/data/sources.ts first.');
    process.exit(1);
  }
  if (!src.patternSource) {
    console.error(`Source "${id}" has no patternSource. Add it to the PatternSource union in`);
    console.error('src/types/principle.ts and a badge entry in src/data/source-registry.ts, then re-run.');
    process.exit(1);
  }

  // Fetch + extract
  const upstream: string[] = [];
  for (const url of src.check.rawUrls) {
    upstream.push(...extractRules(await fetchText(url)));
  }
  const rules = [...new Set(upstream)];

  // Match against the whole corpus (published + existing drafts) to avoid dupes.
  const corpus = [...principles, ...draftPrinciples].map((p) => tokenize(`${p.title} ${p.sourceQuote} ${p.description}`));
  const usedIds = new Set([...principles, ...draftPrinciples].map((p) => p.id));

  const drafts: Principle[] = [...draftPrinciples];
  let added = 0;
  for (const rule of rules) {
    if (added >= limit) break;
    const cand = tokenize(rule);
    let best = 0;
    for (const c of corpus) best = Math.max(best, coverage(cand, c));
    if (best >= MATCH_THRESHOLD) continue; // already covered

    const category = classifyCategory(rule);
    const base = `${src.patternSource}-${slug(rule)}`;
    let uid = base;
    let n = 2;
    while (usedIds.has(uid)) uid = `${base}-${n++}`;
    usedIds.add(uid);

    drafts.push({
      id: uid,
      category,
      source: src.patternSource,
      title: deriveTitle(rule) || rule.slice(0, 40),
      description: rule,
      sourceQuote: rule,
      additionalExplanation: '',
      sourceLinks: src.homepage ? [{ text: src.name, url: src.homepage }] : [],
      tags: [...new Set([...(src.defaultTags ?? []), category])],
      status: 'draft',
      badExampleKey: `${uid}-bad`,
      goodExampleKey: `${uid}-good`,
    });
    added++;
  }

  writeDrafts(drafts);
  console.log(`\n✅ ${id}: extracted ${rules.length} rules, added ${added} new draft(s) (${drafts.length} total).`);
  console.log(`   → src/data/principles/drafts.ts  (status: 'draft', hidden in app)`);
  console.log(`   Next: author Good/Bad examples, then promote into the category module.\n`);
}

function writeDrafts(drafts: Principle[]): void {
  const body =
    `import type { Principle } from '../../types/principle';\n\n` +
    `/**\n * Draft principles extracted from sources via \`npm run sources:build\`.\n` +
    ` * status: 'draft' — hidden from the app until Good/Bad examples exist and the\n` +
    ` * entry is promoted into its category module. Do not hand-edit ids here.\n */\n` +
    `export const draftPrinciples: Principle[] = ${drafts.length === 0 ? '[]' : '[\n' + drafts.map(serializeDraft).join(',\n') + ',\n]'};\n`;
  writeFileSync(draftsPath, body);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
