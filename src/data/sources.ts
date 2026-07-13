import type { PatternSource } from '@/types/principle';

/**
 * Source catalog — the provenance index for every rule source, mirroring
 * `UI · Animation · Design Skills — Source Directory 2026`. This is the authority
 * for the sync system (freshness + rule extraction) and the /#sources page.
 * Decoupled from the app's `PatternSource`: a source can be catalogued (for the
 * reference page + coverage checking) before any of its rules are onboarded.
 *
 * - `check.mode: 'github'` — rules live as raw markdown bullet/numbered lists we
 *   can fetch + diff. Only set this once `rawUrls` are verified to 200.
 * - `check.mode: 'manual'` — no diffable rule file; remind to review on a cadence.
 */
export type SourceOriginKind = 'github' | 'install-endpoint' | 'landing' | 'plugin';

export interface CatalogSource {
  id: string;
  name: string;
  author?: string;
  homepage?: string;
  /** Upstream repo in `owner/name` form, when GitHub-hosted. */
  repo?: string;
  originKind: SourceOriginKind;
  installCmd?: string;
  /** Badge color classes (accessible: dark bg + white/dark text ≥ 4.5:1). */
  color: string;
  /** Suggested tags applied to rules extracted from this source. */
  defaultTags?: string[];
  /** App source this catalog entry maps to, once its rules are onboarded. */
  patternSource?: PatternSource;
  check:
    | { mode: 'github'; rawUrls: string[] }
    | { mode: 'manual'; reviewEveryDays: number };
}

export const sourceCatalog: CatalogSource[] = [
  {
    id: 'vercel',
    name: 'Vercel',
    homepage: 'https://github.com/vercel-labs/web-interface-guidelines',
    repo: 'vercel-labs/web-interface-guidelines',
    originKind: 'github',
    color: 'bg-foreground text-background border-foreground',
    patternSource: 'vercel',
    defaultTags: ['a11y', 'forms', 'performance'],
    check: {
      mode: 'github',
      rawUrls: ['https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md'],
    },
  },
  {
    id: 'rauno',
    name: 'Rauno',
    author: 'Rauno Freiberg',
    homepage: 'https://interfaces.rauno.me/',
    repo: 'raunofreiberg/interfaces',
    originKind: 'github',
    color: 'bg-emerald-600 text-white border-emerald-600',
    patternSource: 'rauno',
    defaultTags: ['interaction', 'motion'],
    check: {
      mode: 'github',
      rawUrls: ['https://raw.githubusercontent.com/raunofreiberg/interfaces/main/README.md'],
    },
  },
  {
    id: 'emilkowalski',
    name: 'Emil Kowalski',
    author: 'Emil Kowalski',
    homepage: 'https://emilkowalski.com/',
    repo: 'emilkowalski/skills',
    originKind: 'github',
    installCmd: 'npx skills add emilkowalski/skills@review-animations -g -y',
    color: 'bg-violet-700 text-white border-violet-700',
    patternSource: 'emilkowalski',
    defaultTags: ['motion'],
    check: {
      mode: 'github',
      rawUrls: ['https://raw.githubusercontent.com/emilkowalski/skills/main/skills/review-animations/SKILL.md'],
    },
  },
  {
    id: 'ui-skills',
    name: '@Ibelick',
    author: 'ibelick',
    homepage: 'https://www.ui-skills.com/',
    repo: 'strongeron/agent-skills',
    originKind: 'github',
    color: 'bg-amber-700 text-white border-amber-700',
    patternSource: 'ibelick',
    defaultTags: ['interaction'],
    check: { mode: 'manual', reviewEveryDays: 30 },
  },
  {
    id: 'tailwind',
    name: 'Tailwind',
    homepage: 'https://tailwindcss.com/docs',
    originKind: 'landing',
    color: 'bg-[#38bdf8] text-slate-900 border-[#38bdf8]',
    patternSource: 'tailwind',
    defaultTags: ['tailwind'],
    check: { mode: 'manual', reviewEveryDays: 30 },
  },
  {
    id: 'rams',
    name: 'RAMS',
    homepage: 'https://www.rams.ai/',
    originKind: 'landing',
    color: 'bg-purple-500 text-white border-purple-500',
    patternSource: 'rams',
    defaultTags: ['a11y', 'design'],
    check: { mode: 'manual', reviewEveryDays: 30 },
  },
  {
    id: 'anthropic',
    name: 'Anthropic Skills',
    author: 'Anthropic',
    homepage: 'https://skills.sh/',
    repo: 'anthropics/skills',
    originKind: 'github',
    color: 'bg-[#cc785c] text-white border-[#cc785c]',
    patternSource: 'anthropic',
    defaultTags: ['design'],
    check: { mode: 'manual', reviewEveryDays: 90 },
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    author: 'Anthropic',
    homepage: 'https://claude.ai/code',
    originKind: 'landing',
    color: 'bg-[#c2410c] text-white border-[#c2410c]',
    patternSource: 'claude-code',
    defaultTags: ['performance', 'a11y'],
    check: { mode: 'manual', reviewEveryDays: 90 },
  },
  {
    id: 'wcag',
    name: 'WCAG',
    author: 'W3C',
    homepage: 'https://www.w3.org/WAI/WCAG21/quickref/',
    originKind: 'landing',
    color: 'bg-info text-info-foreground dark:text-background border-info',
    patternSource: 'wcag',
    defaultTags: ['a11y'],
    check: { mode: 'manual', reviewEveryDays: 90 },
  },
  {
    id: 'aria',
    name: 'ARIA',
    author: 'W3C',
    homepage: 'https://www.w3.org/WAI/ARIA/apg/',
    originKind: 'landing',
    color: 'bg-destructive text-background border-destructive',
    patternSource: 'aria',
    defaultTags: ['a11y'],
    check: { mode: 'manual', reviewEveryDays: 90 },
  },
  {
    id: 'heygen-hyperframes',
    name: 'HeyGen Hyperframes',
    author: 'HeyGen',
    repo: 'heygen-com/hyperframes',
    originKind: 'github',
    installCmd: 'npx skills add heygen-com/hyperframes@css-animations -g -y',
    color: 'bg-teal-700 text-white border-teal-700',
    defaultTags: ['motion'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
  {
    id: 'lottiefiles',
    name: 'LottieFiles',
    repo: 'lottiefiles/motion-design-skill',
    originKind: 'github',
    installCmd: 'npx skills add lottiefiles/motion-design-skill@motion-design -g -y',
    color: 'bg-green-700 text-white border-green-700',
    defaultTags: ['motion'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
  {
    id: 'remotion',
    name: 'Remotion',
    repo: 'remotion-dev/skills',
    originKind: 'github',
    installCmd: 'npx skills add remotion-dev/skills@remotion-best-practices -g -y',
    color: 'bg-blue-700 text-white border-blue-700',
    defaultTags: ['motion', 'video'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
  {
    id: 'threejs',
    name: 'Three.js',
    author: 'cloudai-x',
    repo: 'cloudai-x/threejs-skills',
    originKind: 'github',
    color: 'bg-zinc-700 text-white border-zinc-700',
    defaultTags: ['3d', 'motion'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
  {
    id: 'ihlamury-design-skills',
    name: 'Design Skills',
    author: 'ihlamury',
    repo: 'ihlamury/design-skills',
    originKind: 'github',
    color: 'bg-pink-700 text-white border-pink-700',
    defaultTags: ['design-system'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
  {
    id: 'mattpocock',
    name: 'design-an-interface',
    author: 'Matt Pocock',
    repo: 'mattpocock/skills',
    originKind: 'github',
    color: 'bg-sky-800 text-white border-sky-800',
    defaultTags: ['design'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
  {
    id: 'wshobson',
    name: 'Agents',
    author: 'wshobson',
    repo: 'wshobson/agents',
    originKind: 'github',
    color: 'bg-indigo-700 text-white border-indigo-700',
    defaultTags: ['design-system'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
  {
    id: 'extract-design-system',
    name: 'extract-design-system',
    author: 'arvindrk',
    repo: 'arvindrk/extract-design-system',
    originKind: 'github',
    color: 'bg-orange-800 text-white border-orange-800',
    defaultTags: ['design-system'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
  {
    id: 'interface-design',
    name: 'interface-design',
    author: 'Damola Akinleye',
    homepage: 'https://www.ui-skills.com/',
    repo: 'Dammyjay93/interface-design',
    originKind: 'plugin',
    color: 'bg-rose-700 text-white border-rose-700',
    defaultTags: ['interface'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
  {
    id: 'interface-craft',
    name: 'Interface Craft',
    author: 'Josh Puckett',
    homepage: 'https://interfacecraft.dev/',
    originKind: 'install-endpoint',
    installCmd: 'curl -sL interfacecraft.dev/api/install-skills | bash',
    color: 'bg-fuchsia-800 text-white border-fuchsia-800',
    defaultTags: ['motion', 'craft'],
    check: { mode: 'manual', reviewEveryDays: 90 },
  },
  {
    id: 'impeccable',
    name: 'impeccable',
    author: 'strongeron',
    repo: 'strongeron/agent-skills',
    originKind: 'github',
    color: 'bg-stone-700 text-white border-stone-700',
    defaultTags: ['craft'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
  {
    id: 'clarify',
    name: 'clarify',
    author: 'strongeron',
    repo: 'strongeron/agent-skills',
    originKind: 'github',
    color: 'bg-cyan-800 text-white border-cyan-800',
    defaultTags: ['typography'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
  {
    id: 'react-tailwind',
    name: 'react-tailwind',
    author: 'strongeron',
    repo: 'strongeron/agent-skills',
    originKind: 'github',
    color: 'bg-sky-700 text-white border-sky-700',
    defaultTags: ['tailwind'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
  {
    id: 'ce-frontend-design',
    name: 'ce-frontend-design',
    author: 'Every Inc',
    repo: 'EveryInc/compound-engineering-plugin',
    originKind: 'plugin',
    color: 'bg-slate-700 text-white border-slate-700',
    defaultTags: ['design'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
];

export const catalogById = new Map(sourceCatalog.map((s) => [s.id, s]));
