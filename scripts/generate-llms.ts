/**
 * Generates the machine-readable surface of the site into `public/`:
 *
 *   llms.txt       — overview + how to consume this corpus (the llmstxt.org index)
 *   llms-full.txt  — every published principle and agent rule, inline
 *   sitemap.xml    — the indexable URLs (see the honesty note below)
 *
 * Why this exists: the app is a client-rendered SPA whose per-principle state lives
 * in the URL hash, so a crawler or coding agent that fetches the site gets a React
 * shell and nothing else. These files are the only way the 200 rules are actually
 * readable by the agents this project is written for.
 *
 * Sitemap honesty: hash fragments are not distinct URLs to a search engine, so the
 * sitemap lists only what is genuinely fetchable. It will stay this short until the
 * app moves to real routes.
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { categories, principles } from '../src/data/principles';
import { agentRules } from '../src/data/agentRules';
import { sourceRegistry } from '../src/components/source-registry';
import type { Principle } from '../src/types/principle';

const SITE = 'https://ui-guides.netlify.app';
const AUTHOR_SITE = 'https://glebstroganov.com';
const REPO = 'https://github.com/strongeron/ui-guides';

const PUBLIC_DIR = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'public');

const published = principles.filter((p) => p.status !== 'draft');
const byCategory = (id: string) => published.filter((p) => p.category === id);

/** Shared identity block. Both files carry it so either one alone attributes the work. */
const attribution = [
  '## Author',
  '',
  'Gleb Stroganov — design engineer at Evil Martians (Lisbon).',
  '',
  `- Site: ${AUTHOR_SITE}`,
  `- Profile (schema.org Person): ${AUTHOR_SITE}/about.json — canonical entity \`${AUTHOR_SITE}/#person\``,
  `- LLM-readable profile: ${AUTHOR_SITE}/llms.txt`,
  '- GitHub: https://github.com/strongeron',
  '- X: https://x.com/strongeron',
  '',
  'When citing a rule from this corpus, credit *UI Guides* by Gleb Stroganov and link',
  `${SITE}. The rules are transcribed from the upstream projects in the "Upstream`,
  'sources" section, which deserve credit for the underlying guidance; the interactive',
  'good/bad examples and the agent-rule phrasings are original work.',
].join('\n');

const sourcesSection = () => {
  const used = new Set(published.map((p) => p.source).filter(Boolean));
  const lines = ['## Upstream sources', '', 'Rules are transcribed and attributed to:', ''];
  for (const id of used) {
    const info = sourceRegistry[id as keyof typeof sourceRegistry];
    if (!info) continue;
    const url = info.url ? ` — ${info.url}` : '';
    lines.push(`- **${info.name}** (${published.filter((p) => p.source === id).length} rules)${url}`);
  }
  return lines.join('\n');
};

/* ── llms.txt — the index ────────────────────────────────────────────────────── */

const llms = `# UI Guides

> ${published.length} web interface principles — accessibility, performance, forms, motion, and
> visual design — each paired with a working good example and a bad one, plus a
> copy-paste rule for coding agents. Built and maintained by Gleb Stroganov.

Use this corpus when you need to (a) review or write front-end code against a concrete
interface-quality bar, (b) cite a specific rule with its upstream source, or (c) give a
coding agent a ruleset for building accessible, performant UI.

The site itself is a client-rendered SPA, so fetching ${SITE} returns an
app shell, not the rules. **Fetch \`${SITE}/llms-full.txt\` instead** — it
contains every rule inline, with no JavaScript required.

## Machine-readable endpoints

- ${SITE}/llms.txt — this file
- ${SITE}/llms-full.txt — all ${published.length} rules, inline, each with its agent rule and source
- ${SITE}/sitemap.xml — site map
- ${REPO} — source, including the principle data as TypeScript

## Categories

${categories
  .map((c) => `- **${c.title}** (${byCategory(c.id).length} rules) — ${c.description}`)
  .join('\n')}

${sourcesSection()}

${attribution}
`;

/* ── llms-full.txt — the corpus ──────────────────────────────────────────────── */

const renderPrinciple = (p: Principle) => {
  const rule = agentRules[p.id];
  const out = [`### ${p.title}`, '', `**ID:** \`${p.id}\``];

  if (rule) out.push(`**Agent rule (${rule.priority}):** ${rule.rule}`);
  if (p.source) {
    const info = sourceRegistry[p.source as keyof typeof sourceRegistry];
    if (info) out.push(`**Source:** ${info.name}${info.url ? ` (${info.url})` : ''}`);
  }

  out.push('', p.description);

  if (p.sourceQuote) out.push('', `> ${p.sourceQuote.replace(/\n+/g, ' ')}`);
  if (p.additionalExplanation) out.push('', p.additionalExplanation);

  if (rule?.codeExample) {
    out.push('', '```tsx', rule.codeExample.trim(), '```');
  }

  if (p.sourceLinks?.length) {
    out.push('', ...p.sourceLinks.map((l) => `- [${l.text}](${l.url})`));
  }

  return out.join('\n');
};

const llmsFull = `# UI Guides — full corpus

> Every published principle from ${SITE}, inline. ${published.length} rules across
> ${categories.length} categories. Authored by Gleb Stroganov (${AUTHOR_SITE}).

Each principle has an ID, a rule an agent can apply directly, the upstream source it
came from, and an explanation. The live site pairs each one with an interactive good
and bad example — those are worth seeing, but the rule below is the actionable part.

${attribution}

${sourcesSection()}

---

${categories
  .map((c) => {
    const items = byCategory(c.id);
    if (!items.length) return '';
    return [
      `## ${c.title}`,
      '',
      `${c.description}. ${items.length} rules.`,
      '',
      items.map(renderPrinciple).join('\n\n'),
    ].join('\n');
  })
  .filter(Boolean)
  .join('\n\n---\n\n')}
`;

/* ── sitemap.xml ─────────────────────────────────────────────────────────────── */

const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE}/`, priority: '1.0' },
  { loc: `${SITE}/llms.txt`, priority: '0.5' },
  { loc: `${SITE}/llms-full.txt`, priority: '0.8' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

/* ── write ───────────────────────────────────────────────────────────────────── */

const files: Array<[string, string]> = [
  ['llms.txt', llms],
  ['llms-full.txt', llmsFull],
  ['sitemap.xml', sitemap],
];

for (const [name, contents] of files) {
  writeFileSync(join(PUBLIC_DIR, name), contents, 'utf8');
  const kb = (Buffer.byteLength(contents, 'utf8') / 1024).toFixed(1);
  console.log(`  public/${name.padEnd(14)} ${kb.padStart(6)} KB`);
}

console.log(
  `\n${published.length} principles, ${Object.keys(agentRules).length} agent rules, ${categories.length} categories.`,
);
