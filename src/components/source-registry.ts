import type { PatternSource, PatternSourceInfo } from '@/types/principle';

// Source registry with badge styling using semantic tokens
export const sourceRegistry: Record<PatternSource, PatternSourceInfo> = {
  vercel: {
    id: 'vercel',
    name: 'Vercel',
    description: 'Web Interface Guidelines from Vercel',
    url: 'https://vercel.com/design',
    color: 'bg-foreground text-background border-foreground',
  },
  wcag: {
    id: 'wcag',
    name: 'WCAG',
    description: 'Web Content Accessibility Guidelines',
    url: 'https://www.w3.org/WAI/WCAG21/quickref/',
    color: 'bg-info text-info-foreground dark:text-background border-info',
  },
  aria: {
    id: 'aria',
    name: 'ARIA',
    description: 'WAI-ARIA Authoring Practices',
    url: 'https://www.w3.org/WAI/ARIA/apg/',
    color: 'bg-destructive text-background border-destructive',
  },
  'design-system': {
    id: 'design-system',
    name: 'Design System',
    description: 'Component and pattern library',
    color: 'bg-primary text-primary-foreground border-primary',
  },
  tailwind: {
    id: 'tailwind',
    name: 'Tailwind',
    description: 'Tailwind CSS golden rules and best practices',
    url: 'https://tailwindcss.com/docs',
    color: 'bg-[#38bdf8] text-slate-900 border-[#38bdf8]',
  },
  rams: {
    id: 'rams',
    name: 'RAMS',
    description: 'Accessibility and visual design review rules',
    url: 'https://github.com/anthropics/rams',
    color: 'bg-purple-500 text-white border-purple-500',
  },
  ibelick: {
    id: 'ibelick',
    name: '@Ibelick',
    description: 'UI Skills - opinionated constraints for better interfaces',
    url: 'https://www.ui-skills.com/',
    color: 'bg-amber-500 text-white border-amber-500',
  },
  custom: {
    id: 'custom',
    name: 'Custom',
    description: 'Internal patterns and guidelines',
    color: 'bg-muted-foreground text-background border-muted-foreground',
  },
};

// Alias for backward compatibility
export const patternSources = sourceRegistry;
