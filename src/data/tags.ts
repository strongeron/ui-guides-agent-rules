import type { Principle } from '@/types/principle';

/**
 * Cross-cutting filter tags — deliberately NOT a mirror of `category`.
 *
 * The sidebar already groups by category, so a tag like "forms" or "layout" would
 * just duplicate the nav. These tags exist only to expose slices that *span*
 * categories: accessibility rules live in interactions/content/design, motion
 * rules live in animations/performance/aesthetics, colour rules in design/content.
 *
 * Explicit `tags` on a principle are always kept.
 */
const CROSS_CUTTING_TAGS: Array<[string, string[]]> = [
  [
    'a11y',
    ['aria', 'contrast', 'keyboard', 'screen reader', 'focus', 'wcag', 'accessible', 'accessibility', 'alt text', 'tabindex', 'reduced motion', 'prefers-reduced-motion'],
  ],
  ['motion', ['animation', 'animate', 'transition', 'motion', 'spring', 'easing', 'keyframe', 'stagger']],
  ['color', ['color', 'colour', 'contrast', 'palette', 'gradient', 'theme', 'token', 'dark mode']],
];

export function deriveTags(p: Principle): string[] {
  const tags = new Set<string>(p.tags ?? []);
  const hay = `${p.title} ${p.description} ${p.sourceQuote}`.toLowerCase();
  for (const [tag, keywords] of CROSS_CUTTING_TAGS) {
    if (keywords.some((k) => hay.includes(k))) tags.add(tag);
  }
  return [...tags].sort();
}

/** Return a new array with `tags` populated on every principle. */
export function withTags(list: Principle[]): Principle[] {
  return list.map((p) => ({ ...p, tags: deriveTags(p) }));
}
