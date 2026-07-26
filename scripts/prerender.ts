#!/usr/bin/env npx tsx
/**
 * Write a real HTML page per rule, so the corpus is 400+ indexable URLs instead of one.
 *
 * Runs after both Vite builds: the client build produces dist/index.html (the template,
 * with hashed asset tags already injected) and the SSR build produces the render
 * function. Each route is rendered into the template's #root and its <head> rewritten
 * for that rule — title, description, canonical, OG/Twitter, and per-rule JSON-LD.
 *
 * The examples are deliberately absent from this HTML: they are interactive demos, not
 * indexable prose, and making 809 of them server-safe would be open-ended work with no
 * user-visible payoff. Everything a crawler or an LLM should read — the rule, its
 * reasoning, its sources — is here.
 */

import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { pathToFileURL } from 'url';
import { SITE, published, sourceInfo } from './lib/corpus';
import { agentRules } from '../src/data/agentRules';
import type { Principle } from '../src/types/principle';
import type { Route } from '../src/lib/routes';

const ROOT = join(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');
const SSR_ENTRY = join(ROOT, 'dist-ssr', 'entry-server.js');

const { render } = (await import(pathToFileURL(SSR_ENTRY).href)) as {
  render: (route: Route) => string;
};

const template = readFileSync(join(DIST, 'index.html'), 'utf8');

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** One sentence of real description beats the generic site blurb on 404 pages. */
function metaDescription(p: Principle): string {
  const rule = agentRules[p.id];
  const lead = rule ? `${rule.priority}: ${rule.rule}` : p.title;
  const text = `${lead} — ${p.description}`.replace(/\s+/g, ' ').trim();
  return text.length > 300 ? `${text.slice(0, 297).trimEnd()}…` : text;
}

/**
 * The author is expressed as a shared @id, the same node glebstroganov.com publishes,
 * so these pages merge into one works graph rather than minting a second person.
 */
function jsonLd(p: Principle): string {
  const rule = agentRules[p.id];
  const info = sourceInfo(p.source);
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${SITE}/principles/${p.id}`,
    url: `${SITE}/principles/${p.id}`,
    headline: p.title,
    description: metaDescription(p),
    articleSection: p.category,
    keywords: p.tags?.join(', ') || undefined,
    author: { '@id': 'https://glebstroganov.com/#person' },
    isPartOf: { '@type': 'Collection', '@id': `${SITE}/#corpus`, name: 'UI Guides & Agent Rules' },
    ...(rule ? { abstract: `${rule.priority}: ${rule.rule}` } : {}),
    ...(info?.url ? { citation: { '@type': 'CreativeWork', name: info.name, url: info.url } } : {}),
    encoding: [
      { '@type': 'MediaObject', encodingFormat: 'text/markdown', contentUrl: `${SITE}/principles/${p.id}.md` },
      { '@type': 'MediaObject', encodingFormat: 'application/json', contentUrl: `${SITE}/principles/${p.id}.json` },
    ],
  });
}

/** Rewrite the shared template's head for one rule. */
function pageHtml(p: Principle, body: string): string {
  const url = `${SITE}/principles/${p.id}`;
  const title = `${p.title} — UI Guides & Agent Rules`;
  const description = metaDescription(p);

  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escape(description)}" />`,
  );
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${url}" />`,
  );
  html = html.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(
    /<meta property="og:title"[^>]*>/,
    `<meta property="og:title" content="${escape(title)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${escape(description)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${escape(title)}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${escape(description)}" />`,
  );

  // Point agents at this rule's Markdown twin from the page itself, not just from
  // robots/llms.txt — a headless fetcher that landed here should be told there is a
  // cleaner representation one hop away.
  html = html.replace(
    '</head>',
    `  <link rel="alternate" type="text/markdown" href="/principles/${p.id}.md" />\n` +
      `    <script type="application/ld+json">${jsonLd(p)}</script>\n  </head>`,
  );

  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

let written = 0;
let bytes = 0;
for (const p of published) {
  const body = render({ kind: 'principle', id: p.id });
  const html = pageHtml(p, body);
  // `<id>.html`, not `<id>/index.html`. Netlify resolves a extensionless request to
  // the sibling .html file and serves it 200; a directory would instead 301 to a
  // trailing slash, so the canonical URL emitted below would not be the URL that
  // actually answers. One redirect per rule, on every crawl, for nothing.
  const out = join(DIST, 'principles', `${p.id}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html, 'utf8');
  written++;
  bytes += Buffer.byteLength(html);
}

// The root keeps the SPA shell: it is the app's entry, not a rule, and its <head> is
// already correct for the site as a whole.
for (const [route, file] of [
  [{ kind: 'sources' } as Route, join(DIST, 'sources.html')],
  [{ kind: 'principle', id: published[0].id } as Route, join(DIST, 'index.html')],
] as const) {
  const body = render(route);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, template.replace('<div id="root"></div>', `<div id="root">${body}</div>`), 'utf8');
}

console.log(
  `  prerendered ${written} rule pages + / and /sources ` +
    `(avg ${Math.round(bytes / written / 1024)} KB, ${(bytes / 1048576).toFixed(1)} MB total)`,
);

if (written !== published.length) {
  throw new Error(`prerendered ${written} pages but ${published.length} rules are published.`);
}
