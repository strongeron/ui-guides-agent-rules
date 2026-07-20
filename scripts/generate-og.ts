#!/usr/bin/env npx tsx
/**
 * Generate public/og-image.png from the principle data.
 *
 * The card used to be a hand-made asset, so it drifted: it advertised "200
 * principles" against a corpus of 400+, and a domain the site does not live
 * on. Everything factual here is now derived from the same modules that feed
 * generate-llms.ts, so the number cannot go stale again.
 *
 * Renders at 1200x630 CSS px with deviceScaleFactor 2 -> 2400x1260, matching
 * the dimensions declared in index.html's og:image:width/height.
 */

import { mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';
import { principles } from '../src/data/principles';
import { sourceRegistry } from '../src/components/source-registry';

const PUBLIC_DIR = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'public');

const published = principles.filter((p) => p.status !== 'draft');

// Upstream sources only — 'custom' is our own phrasing, not a source to credit.
const counts = new Map<string, number>();
for (const p of published) {
  if (!p.source || p.source === 'custom') continue;
  counts.set(p.source, (counts.get(p.source) ?? 0) + 1);
}

const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);

// Show the names a reader recognizes at a glance, in corpus order; the rest
// become a truthful "+N more" so the card never overstates its coverage.
const SHOWN = 5;
const chips = ranked.slice(0, SHOWN).map(([id]) => {
  const info = sourceRegistry[id as keyof typeof sourceRegistry];
  return info?.name ?? id;
});
const remaining = ranked.length - chips.length;

const html = `
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    font-family: Inter, -apple-system, system-ui, sans-serif;
    background: #0f1115; color: #f3f4f6;
    -webkit-font-smoothing: antialiased;
  }
  .card {
    position: relative; width: 100%; height: 100%;
    padding: 68px 72px; display: flex; flex-direction: column;
    background:
      radial-gradient(900px 460px at 88% -12%, rgba(74,222,128,0.16), transparent 62%),
      linear-gradient(160deg, #12151a 0%, #0f1115 55%, #0c0e12 100%);
  }
  /* faint grid, fading out toward the bottom-left so it never fights the text */
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px);
    background-size: 64px 64px;
    -webkit-mask-image: radial-gradient(1100px 700px at 82% 0%, #000 10%, transparent 78%);
            mask-image: radial-gradient(1100px 700px at 82% 0%, #000 10%, transparent 78%);
  }
  .inner { position: relative; display: flex; flex-direction: column; height: 100%; }

  .brand { display: flex; align-items: center; gap: 16px; margin-bottom: 44px; }
  .mark {
    width: 46px; height: 46px; border-radius: 13px;
    border: 2.5px solid #4ade80; display: flex; align-items: center; justify-content: center;
  }
  .brand-name { font-size: 25px; font-weight: 700; letter-spacing: -0.015em; }

  h1 {
    font-size: 74px; line-height: 1.06; font-weight: 800;
    letter-spacing: -0.033em; margin-bottom: 26px;
  }
  h1 .accent { color: #4ade80; }

  .sub {
    font-size: 25px; line-height: 1.45; color: #a8b0bd;
    font-weight: 400; max-width: 880px;
  }
  .sub strong { color: #e8eaee; font-weight: 600; }

  .spacer { flex: 1; }

  .pills { display: flex; gap: 14px; margin-bottom: 30px; }
  .pill {
    display: flex; align-items: center; gap: 9px;
    padding: 11px 20px; border-radius: 11px;
    font-size: 20px; font-weight: 600;
  }
  .pill.bad  { color: #f87171; background: rgba(248,113,113,0.10); border: 1.5px solid rgba(248,113,113,0.34); }
  .pill.good { color: #4ade80; background: rgba(74,222,128,0.10);  border: 1.5px solid rgba(74,222,128,0.34); }

  .chips { display: flex; align-items: center; gap: 11px; flex-wrap: wrap; }
  .chip {
    padding: 9px 18px; border-radius: 999px;
    font-size: 18px; font-weight: 500; color: #cdd3dc;
    background: rgba(255,255,255,0.045); border: 1px solid rgba(255,255,255,0.11);
  }
  .chip.more { color: #7f8896; background: none; border-color: rgba(255,255,255,0.08); }
</style>

<div class="card">
  <div class="grid"></div>
  <div class="inner">
    <div class="brand">
      <div class="mark">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="#4ade80" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="4,12.5 9.5,18 20,6.5" />
        </svg>
      </div>
      <div class="brand-name">UI Guides &amp; Agent Rules</div>
    </div>

    <h1>Web interface guidelines,<br /><span class="accent">made interactive.</span></h1>

    <div class="sub">
      Every rule paired with a <strong>good</strong> and <strong>bad</strong> example you can tab through.<br />
      <strong>${published.length} principles</strong>, agent-ready.
    </div>

    <div class="spacer"></div>

    <div class="pills">
      <div class="pill bad">&#9888; Bad example</div>
      <div class="pill good">&#10003; Good example</div>
    </div>

    <div class="chips">
      ${chips.map((c) => `<div class="chip">${c}</div>`).join('\n      ')}
      ${remaining > 0 ? `<div class="chip more">+${remaining} more sources</div>` : ''}
    </div>
  </div>
</div>
`;

mkdirSync(PUBLIC_DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
await page.setContent(html);
// Inter is a local system font; without this the shot can land mid-swap.
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(PUBLIC_DIR, 'og-image.png') });
await browser.close();

console.log(
  `og-image.png — ${published.length} principles, ${ranked.length} upstream sources ` +
    `(showing ${chips.join(', ')}${remaining > 0 ? `, +${remaining}` : ''})`
);
