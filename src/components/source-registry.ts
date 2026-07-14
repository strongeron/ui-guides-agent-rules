import type { PatternSource, PatternSourceInfo } from '@/types/principle';

// Source registry with badge styling using semantic tokens
export const sourceRegistry: Record<PatternSource, PatternSourceInfo> = {
  vercel: {
    id: 'vercel',
    name: 'Vercel',
    description: 'Web Interface Guidelines from Vercel',
    url: 'https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md',
    rulesUrl: 'https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md',
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
    url: 'https://www.rams.ai/',
    color: 'bg-purple-500 text-white border-purple-500',
  },
  ibelick: {
    id: 'ibelick',
    name: '@Ibelick',
    description: 'UI Skills - opinionated constraints for better interfaces',
    url: 'https://www.ui-skills.com/',
    color: 'bg-amber-700 text-white border-amber-700',
  },
  'web-platform': {
    id: 'web-platform',
    name: 'Web Platform',
    description: 'Guidance from web.dev and MDN (Google / Mozilla)',
    url: 'https://web.dev/',
    color: 'bg-sky-800 text-white border-sky-800',
  },
  anthropic: {
    id: 'anthropic',
    name: 'Skills',
    description: 'Anthropic skills from skills.sh',
    url: 'https://skills.sh/',
    color: 'bg-[#cc785c] text-white border-[#cc785c]',
  },
  rauno: {
    id: 'rauno',
    name: 'Rauno',
    description: 'Interface details from interfaces.rauno.me by Rauno Freiberg',
    url: 'https://interfaces.rauno.me/',
    color: 'bg-emerald-600 text-white border-emerald-600',
  },
  emilkowalski: {
    id: 'emilkowalski',
    name: 'Emil Kowalski',
    description: 'Animation and motion standards from Emil Kowalski',
    url: 'https://emilkowalski.com/',
    color: 'bg-violet-700 text-white border-violet-700',
  },
  impeccable: {
    id: 'impeccable',
    name: 'impeccable',
    description: 'The design language for AI harnesses, by Paul Bakaus',
    url: 'https://impeccable.style/',
    color: 'bg-stone-700 text-white border-stone-700',
  },
  'interface-design': {
    id: 'interface-design',
    name: 'interface-design',
    description: 'Interface craft principles by Damola Akinleye',
    url: 'https://github.com/Dammyjay93/interface-design',
    color: 'bg-rose-700 text-white border-rose-700',
  },
  lottiefiles: {
    id: 'lottiefiles',
    name: 'LottieFiles',
    description: 'Runtime-agnostic motion direction from the LottieFiles motion-design skill',
    url: 'https://github.com/lottiefiles/motion-design-skill',
    color: 'bg-green-700 text-white border-green-700',
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
