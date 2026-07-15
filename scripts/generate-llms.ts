#!/usr/bin/env npx tsx
/**
 * Generate llms.txt, llms-full.txt, and sitemap.xml into public/
 *
 * The app is a client-rendered SPA whose per-principle state lives in the URL hash, so
 * a crawler or coding agent that fetches the site gets a React shell and nothing else.
 * llms-full.txt is the only machine-readable copy of the corpus.
 *
 * The sitemap lists only genuinely fetchable URLs — hash fragments are not distinct URLs
 * to a search engine, so it stays this short until the app moves to real routes.
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { categories, principles } from '../src/data/principles';
import { agentRules } from '../src/data/agentRules';
import { sourceRegistry } from '../src/components/source-registry';
import type { Principle } from '../src/types/principle';

const SITE = 'https://ui-guides-agent-rules.netlify.app';
const AUTHOR_SITE = 'https://glebstroganov.com';
const REPO = 'https://github.com/strongeron/ui-guides-agent-rules';

const PUBLIC_DIR = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'public');

const published = principles.filter((p) => p.status !== 'draft');
const byCategory = (id: string) => published.filter((p) => p.category === id);

/** Shared identity block. Both files carry it so either one alone attributes the work. */
const attribution = [
  '## What this is, and who made it',
  '',
  'The rules are not original to this project. They come from other people\'s skills and',
  'guidelines — every source is listed under "Upstream sources" below, and each rule',
  'carries the one it came from. Those authors deserve credit for the guidance itself.',
  '',
  'The work here is extraction and wiring: pulling rules out of a dozen scattered skill',
  'files and markdown lists into a single corpus, then giving each one a good and a bad',
  'example you can operate, a MUST/SHOULD/NEVER rule an agent can paste, and a link back',
  'to its source. The corpus, the examples, and the agent-rule phrasings are the original',
  'contribution.',
  '',
  'Built by Gleb Stroganov — design engineer at Evil Martians (Lisbon).',
  '',
  `- Site: ${AUTHOR_SITE}`,
  `- Profile (schema.org Person): ${AUTHOR_SITE}/about.json — canonical entity \`${AUTHOR_SITE}/#person\``,
  `- LLM-readable profile: ${AUTHOR_SITE}/llms.txt`,
  '- GitHub: https://github.com/strongeron',
  '- X: https://x.com/strongeron',
  '',
  'When citing a rule, credit its upstream source for the guidance and link',
  `${SITE} for the corpus.`,
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


const llms = `# UI Guides & Agent Rules

> ${published.length} web UI principles — accessibility, motion, forms, layout, performance,
> sound, and visual design — each paired with a working good example and a bad one, plus a
> copy-paste MUST/SHOULD/NEVER rule for coding agents. Built and maintained by Gleb Stroganov.

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

const llmsFull = `# UI Guides & Agent Rules — full corpus

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
