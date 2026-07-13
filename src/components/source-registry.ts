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
  'claude-code': {
    id: 'claude-code',
    name: 'Claude Code',
    description: 'Rules from Claude Code research on animation, performance & accessibility',
    url: 'https://claude.ai/code',
    color: 'bg-[#c2410c] text-white border-[#c2410c]',
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
  custom: {
    id: 'custom',
    name: 'Custom',
    description: 'Internal patterns and guidelines',
    color: 'bg-muted-foreground text-background border-muted-foreground',
  },
};

// Alias for backward compatibility
export const patternSources = sourceRegistry;
