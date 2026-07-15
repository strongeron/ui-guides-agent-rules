import type { Principle } from '@/types/principle';

/**
 * Cross-cutting filter tags — deliberately NOT a mirror of `category`.
 *
 * The sidebar already groups by category, so a tag like "forms" or "layout" would
 * just duplicate the nav. These tags exist only to expose slices that *span*
 * categories: accessibility lives in interactions/content/design/forms, motion in
 * animations/interactions/performance, colour in design/content, typography in
 * content/design/aesthetics, 3D in content/animations/performance, sound in
 * interactions. Whatever the source, the vocabulary stays purely cross-cutting.
 *
 * Explicit `tags` on a principle are kept — EXCEPT any that merely restate a
 * category (see CATEGORY_TAGS), which are stripped so the filter never duplicates
 * the section list.
 */
const CROSS_CUTTING_TAGS: Array<[string, string[]]> = [
  [
    'a11y',
    ['aria', 'contrast', 'keyboard', 'screen reader', 'focus', 'wcag', 'accessible', 'accessibility', 'alt text', 'tabindex', 'reduced motion', 'prefers-reduced-motion'],
  ],
  ['motion', ['animation', 'animate', 'transition', 'motion', 'spring', 'easing', 'keyframe', 'stagger']],
  ['color', ['color', 'colour', 'contrast', 'palette', 'gradient', 'theme', 'token', 'dark mode']],
  [
    'typography',
    ['typograph', 'font', 'letter-spacing', 'tracking', 'leading', 'line-height', 'line height', 'kerning', 'ligature', 'italic', 'uppercase', 'measure', 'line length', 'dash', 'glyph', 'ellipsis', 'curly quote', 'type scale', 'optical sizing', 'tabular', 'numerals'],
  ],
  ['3d', ['3d', 'webgl', 'canvas', 'three.js', 'r3f', 'devicepixelratio', 'gpu']],
  ['sound', ['sound', 'audio', 'haptic', 'volume', 'mute', 'sonic']],
];

/**
 * Tags that would just duplicate a filter the sidebar already provides — so they are
 * stripped from the derived set. Two kinds: every `category` value (the nav groups by
 * category) and every `PatternSource` slug (the Source filter groups by source). Keeping
 * either would put the same slice behind two controls. The singular spellings are the
 * ones that crept in as explicit `tags` (e.g. 'interaction', 'form').
 */
const DUPLICATE_TAGS = new Set<string>([
  // categories
  'interactions', 'interaction', 'animations', 'animation', 'layout', 'content',
  'forms', 'form', 'performance', 'design', 'aesthetics', 'vercel-specific',
  // sources (mirror the Source filter)
  'vercel', 'wcag', 'aria', 'design-system', 'tailwind', 'rams', 'ibelick',
  'web-platform', 'anthropic', 'rauno', 'emilkowalski', 'impeccable',
  'interface-design', 'lottiefiles', 'jakubkrehel', 'custom',
]);

export function deriveTags(p: Principle): string[] {
  const tags = new Set<string>(p.tags ?? []);
  const hay = `${p.title} ${p.description} ${p.sourceQuote}`.toLowerCase();
  for (const [tag, keywords] of CROSS_CUTTING_TAGS) {
    if (keywords.some((k) => hay.includes(k))) tags.add(tag);
  }
  for (const c of DUPLICATE_TAGS) tags.delete(c);
  return [...tags].sort();
}

/** Return a new array with `tags` populated on every principle. */
export function withTags(list: Principle[]): Principle[] {
  return list.map((p) => ({ ...p, tags: deriveTags(p) }));
}
