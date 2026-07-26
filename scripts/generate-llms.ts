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
import { categories } from '../src/data/principles';
import { agentRules } from '../src/data/agentRules';
import { sourceRegistry } from '../src/components/source-registry';
import { AUTHOR_SITE, PUBLIC_DIR, REPO, SITE, published } from './lib/corpus';
import type { Principle } from '../src/types/principle';

const byCategory = (id: string) => published.filter((p) => p.category === id);

/**
 * llmstxt.org wants every section to be a list of annotated Markdown links —
 * `- [Name](url): notes`. Bare URLs read fine to a human but validators (and the
 * reference parser) see a file with no links at all and reject it, so every list
 * below is built through this helper rather than by interpolating a URL inline.
 */
const link = (text: string, url: string, notes?: string) =>
  `- [${text}](${url})${notes ? `: ${notes}` : ''}`;

/** Shared identity block. Both files carry it so either one alone attributes the work. */
const attribution = [
  '## What this is, and who made it',
  '',
  "The rules are not original to this project. They come from other people's skills and",
  'guidelines — every source is listed under "Upstream sources", and each rule carries',
  'the one it came from. Those authors deserve credit for the guidance itself.',
  '',
  'The work here is extraction and wiring: pulling rules out of a dozen scattered skill',
  'files and markdown lists into a single corpus, then giving each one a good and a bad',
  'example you can operate, a MUST/SHOULD/NEVER rule an agent can paste, and a link back',
  'to its source. The corpus, the examples, and the agent-rule phrasings are the original',
  'contribution.',
  '',
  'When citing a rule, credit its upstream source for the guidance and link',
  `[the corpus](${SITE}) for the collection.`,
  '',
  '## Author',
  '',
  'Built by Gleb Stroganov — design engineer at Evil Martians (Lisbon).',
  '',
  link('Gleb Stroganov', AUTHOR_SITE, 'personal site and portfolio'),
  link(
    'schema.org Person profile',
    `${AUTHOR_SITE}/about.json`,
    `canonical entity \`${AUTHOR_SITE}/#person\`, the same @id this site's JSON-LD claims`,
  ),
  link('Author llms.txt', `${AUTHOR_SITE}/llms.txt`, 'LLM-readable profile'),
  link('GitHub', 'https://github.com/strongeron', 'source for this and other projects'),
  link('X', 'https://x.com/strongeron', 'updates and new rules'),
].join('\n');

const sourcesSection = () => {
  const used = new Set(published.map((p) => p.source).filter(Boolean));
  const lines = ['## Upstream sources', '', 'Rules are transcribed and attributed to:', ''];
  for (const id of used) {
    const info = sourceRegistry[id as keyof typeof sourceRegistry];
    if (!info) continue;
    const count = published.filter((p) => p.source === id).length;
    // Sources with no upstream URL (e.g. rules original to this corpus) still need a
    // link target, or the section degrades into the bare-text list validators reject.
    // The Sources page is the honest destination — it is where their provenance lives.
    lines.push(link(info.name, info.url || `${SITE}/#sources`, `${count} rules`));
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

${[
  link(
    'Rule index',
    `${SITE}/principles/index.md`,
    'START HERE. Every rule id and title, tagged with the surface it applies to (form-input, dialog-overlay, focus-keyboard...) and the symbols its examples use. Search it for what you are building, then fetch only what matched',
  ),
  link(
    'One rule + both examples',
    `${SITE}/principles/<id>.md`,
    'per-rule payload, ~1.4k tokens, carrying the good AND bad component source — the code no other endpoint exposes. Also as .json',
  ),
  link(
    'One category',
    `${SITE}/categories/<category>.md`,
    'rules and reasoning for one category, 6k-26k tokens, no example code',
  ),
  link(
    'MUST rules',
    `${SITE}/principles/must.md`,
    `broad sweep when the index does not narrow it: all ${published.filter((p) => agentRules[p.id]?.priority === 'MUST').length} MUST rules, ~11k tokens`,
  ),
  link('This index (llms.txt)', `${SITE}/llms.txt`, 'the file you are reading'),
  link(
    'Full corpus (llms-full.txt)',
    `${SITE}/llms-full.txt`,
    'every rule inline, ~166k tokens — almost never the right fetch; use the index and per-rule payloads instead',
  ),
  link('Sitemap', `${SITE}/sitemap.xml`, 'fetchable URLs only — the per-rule views are hash fragments'),
  link('Sources page', `${SITE}/#sources`, 'every upstream skill and guideline, with its licence and coverage'),
  link('Source repository', REPO, 'the principle data as TypeScript, plus every example component'),
].join('\n')}

## Categories

Each link opens the first rule in that category; the rest are reachable from the
in-app sidebar, or in full from llms-full.txt.

${categories
  .map((c) => {
    const items = byCategory(c.id);
    const first = items[0];
    return link(
      c.title,
      first ? `${SITE}/#${first.id}` : `${SITE}/llms-full.txt`,
      `${items.length} rules — ${c.description}`,
    );
  })
  .join('\n')}

${sourcesSection()}

${attribution}
`;


const renderPrinciple = (p: Principle) => {
  const rule = agentRules[p.id];
  const out = [
    `### ${p.title}`,
    '',
    `**ID:** \`${p.id}\` · **Permalink:** [${SITE}/#${p.id}](${SITE}/#${p.id})`,
  ];

  if (rule) out.push(`**Agent rule (${rule.priority}):** ${rule.rule}`);
  if (p.source) {
    const info = sourceRegistry[p.source as keyof typeof sourceRegistry];
    if (info) {
      out.push(
        `**Source:** ${info.url ? `[${info.name}](${info.url})` : info.name}`,
      );
    }
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

/**
 * Guard the two things llms.txt validators actually check, because both are easy to
 * lose by rewording a section: an H1, and Markdown links. A file of bare URLs reads
 * fine to a human and is rejected as "does not appear to contain any links".
 * This runs inside `prebuild`, so a regression fails the build rather than shipping.
 */
const mdLinks = llms.match(/\[[^\]]+\]\(https?:\/\/[^)]+\)/g) ?? [];
if (!/^# .+/m.test(llms)) {
  throw new Error('llms.txt is missing an H1 heading (required by llmstxt.org).');
}
if (mdLinks.length < categories.length) {
  throw new Error(
    `llms.txt has only ${mdLinks.length} Markdown links; sections must be annotated link lists, not bare URLs.`,
  );
}
console.log(`llms.txt: H1 present, ${mdLinks.length} Markdown links.`);
