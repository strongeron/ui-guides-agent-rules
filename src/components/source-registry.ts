import type { PatternSource, PatternSourceInfo } from '@/types/principle';

// Source registry with badge styling
export const sourceRegistry: Record<PatternSource, PatternSourceInfo> = {
  vercel: {
    id: 'vercel',
    name: 'Vercel',
    description: 'Web Interface Guidelines from Vercel',
    url: 'https://vercel.com/design',
    color: 'bg-stone-900 text-white border-stone-900',
  },
  wcag: {
    id: 'wcag',
    name: 'WCAG',
    description: 'Web Content Accessibility Guidelines',
    url: 'https://www.w3.org/WAI/WCAG21/quickref/',
    color: 'bg-blue-600 text-white border-blue-600',
  },
  aria: {
    id: 'aria',
    name: 'ARIA',
    description: 'WAI-ARIA Authoring Practices',
    url: 'https://www.w3.org/WAI/ARIA/apg/',
    color: 'bg-purple-600 text-white border-purple-600',
  },
  'design-system': {
    id: 'design-system',
    name: 'Design System',
    description: 'Component and pattern library',
    color: 'bg-lime-600 text-white border-lime-600',
  },
  custom: {
    id: 'custom',
    name: 'Custom',
    description: 'Internal patterns and guidelines',
    color: 'bg-stone-500 text-white border-stone-500',
  },
};

// Alias for backward compatibility
export const patternSources = sourceRegistry;
