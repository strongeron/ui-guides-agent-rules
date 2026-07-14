/**
 * Shared rule-extraction utilities for the source sync system.
 * Used by scripts/check-source-freshness.ts and scripts/build-source-rules.ts.
 */
import type { PrincipleCategory } from '../../src/types/principle';

const STOPWORDS = new Set([
  'the', 'a', 'an', 'to', 'of', 'and', 'or', 'for', 'in', 'on', 'with', 'is', 'are',
  'be', 'use', 'using', 'via', 'not', 'no', 'should', 'must', 'their', 'they', 'your',
  'you', 'it', 'its', 'that', 'this', 'when', 'from', 'as', 'at', 'by', 'if',
]);

export function tokenize(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/`[^`]*`/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[^a-z0-9]+/g, ' ')
      .split(' ')
      .filter((w) => w.length > 2 && !STOPWORDS.has(w))
  );
}

/** Fraction of `candidate` tokens covered by `target` (0..1). */
export function coverage(candidate: Set<string>, target: Set<string>): number {
  if (candidate.size === 0) return 0;
  let hit = 0;
  for (const w of candidate) if (target.has(w)) hit++;
  return hit / candidate.size;
}

export function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/`[^`]*`/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-')
    .slice(0, 6)
    .join('-');
}

/** Extract candidate rule strings (bullet / numbered list items) from markdown. */
function stripInline(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\s*\[\^\d+\]/g, '') // footnote refs
    .trim();
}

function extractBulletRules(md: string): string[] {
  const rules: string[] = [];
  let inFence = false;
  for (const raw of md.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^(?:[-*+]|\d+\.)\s+(.*)$/);
    if (!m) continue;
    let text = stripInline(m[1]);
    if (text.startsWith('[ ]') || text.startsWith('[x]')) text = text.slice(3).trim();
    if (text.length < 12) continue;
    if (/^https?:\/\//.test(text)) continue;
    rules.push(text);
  }
  return rules;
}

/**
 * Some rule docs are written as prose lines rather than bullets — one rule per line,
 * "Title. Explanation." That is the shape of `doc/vercel-web-guides.md`, whose rules
 * were invisible to the sync because they carry no list marker.
 *
 * Requiring a sentence period keeps bare section headings ("Forms", "Performance") out.
 */
function extractProseRules(md: string): string[] {
  const rules: string[] = [];
  let inFence = false;
  for (const raw of md.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence || !line) continue;
    if (line.startsWith('#') || line.startsWith('>') || line.startsWith('|')) continue;
    const text = stripInline(line);
    if (text.length < 20) continue;
    if (!text.includes('.')) continue; // a heading has no sentence period
    if (/^https?:\/\//.test(text)) continue;
    rules.push(text);
  }
  return rules;
}

/**
 * Bullets are the norm. The prose fallback only engages for documents that yield no
 * bullets at all, so a normal bullet doc can never pick up stray paragraph noise.
 */
export function extractRules(md: string): string[] {
  const bullets = extractBulletRules(md);
  const rules = bullets.length > 0 ? bullets : extractProseRules(md);
  return [...new Set(rules)];
}

/** Short Title Case title from the first clause of a rule line. */
export function deriveTitle(rule: string): string {
  // Split on sentence/clause terminators — but NOT hyphens (keeps "Sub-300ms",
  // "Frequency-appropriate", "GPU-only" intact).
  const first = rule.split(/[.:—–]| - /)[0].replace(/`[^`]*`/g, '').trim();
  const words = first.split(/\s+/).slice(0, 6);
  return words
    .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ')
    .trim();
}

/**
 * Fetch a rule source. A non-http entry is treated as a repo-relative path.
 *
 * Some sources have no diffable upstream URL — `doc/vercel-web-guides.md` is a
 * hand transcription of the full Vercel guidelines and is a strict superset of the
 * `command.md` we fetch. Because it was not listed as a source, nine genuinely
 * missing rules sat in it invisibly: check:sources could never see them.
 */
export async function fetchText(url: string): Promise<string> {
  if (!/^https?:\/\//.test(url)) {
    const { readFile } = await import('node:fs/promises');
    const { join } = await import('node:path');
    return readFile(join(process.cwd(), url), 'utf-8');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { 'User-Agent': 'ui-guides-sync/1.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

// ── keyword → category classifier ────────────────────────────────────────────
const CATEGORY_KEYWORDS: Array<[PrincipleCategory, string[]]> = [
  ['animations', ['animation', 'animate', 'motion', 'transition', 'spring', 'easing', 'ease', 'duration', 'keyframe', 'interruptible', 'transform-origin', 'reduced-motion', 'fps']],
  ['forms', ['form', 'input', 'label', 'submit', 'validation', 'validate', 'autocomplete', 'placeholder', 'checkbox', 'radio', 'select', 'textarea', 'password', 'spellcheck']],
  ['performance', ['performance', 'render', 're-render', 'virtualiz', 'lazy', 'memo', 'bundle', 'lcp', 'cls', 'paint', 'will-change', 'blur', 'gpu', 'latency', 'preload']],
  ['content', ['font', 'type', 'text', 'heading', 'typograph', 'numeral', 'tabular', 'letter-spacing', 'quote', 'ellipsis', 'alt', 'copy', 'locale', 'wrap', 'balance']],
  ['interactions', ['keyboard', 'focus', 'aria', 'screen reader', 'tab', 'hover', 'tooltip', 'menu', 'dropdown', 'click', 'tap', 'touch', 'scroll', 'drag', 'zoom', 'shortcut', 'pointer', 'interactive']],
  ['layout', ['layout', 'grid', 'flex', 'spacing', 'align', 'safe area', 'safe-area', 'responsive', 'z-index', 'scrollbar', 'overflow', 'breakpoint', 'dvh', 'container']],
  ['aesthetics', ['aesthetic', 'craft', 'distinctive', 'delight', 'atmosphere', 'negative space', 'memorable', 'personality', 'polish', 'beautiful']],
  ['design', ['color', 'contrast', 'shadow', 'border', 'radius', 'theme', 'token', 'palette', 'dark mode', 'gradient', 'visual', 'design']],
];

/** Best-guess category for a rule via keyword hits; falls back to 'design'. */
export function classifyCategory(rule: string): PrincipleCategory {
  const t = rule.toLowerCase();
  let best: PrincipleCategory = 'design';
  let bestScore = 0;
  for (const [cat, kws] of CATEGORY_KEYWORDS) {
    let score = 0;
    for (const kw of kws) if (t.includes(kw)) score++;
    if (score > bestScore) {
      bestScore = score;
      best = cat;
    }
  }
  return best;
}
