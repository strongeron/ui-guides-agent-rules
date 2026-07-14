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
      rawUrls: [
        'https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md',
        // Repo-relative. Our transcription of the full guidelines is a strict superset
        // of command.md (~125 rules vs 93) — it carries the Vercel-specific copywriting
        // section, loading-state timing, Web Workers and more. Nine genuinely missing
        // rules hid here because the sync only ever diffed command.md.
        'doc/vercel-web-guides.md',
      ],
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
      rawUrls: [
        'https://raw.githubusercontent.com/emilkowalski/skills/main/skills/review-animations/SKILL.md',
        // STANDARDS.md holds the precise rules (duration budgets, spring config, gesture
        // physics). Without it the freshness check is blind to most of Emil's substance.
        'https://raw.githubusercontent.com/emilkowalski/skills/main/skills/review-animations/STANDARDS.md',
      ],
    },
  },
  {
    id: 'ui-skills',
    name: '@Ibelick',
    author: 'ibelick',
    homepage: 'https://www.ui-skills.com/',
    repo: 'ibelick/ui-skills',
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
    id: 'web-platform',
    name: 'Web Platform',
    author: 'Google / Mozilla',
    homepage: 'https://web.dev/',
    originKind: 'landing',
    color: 'bg-sky-800 text-white border-sky-800',
    patternSource: 'web-platform',
    defaultTags: ['performance'],
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
    patternSource: 'lottiefiles',
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
    homepage: 'https://github.com/Dammyjay93/interface-design',
    repo: 'Dammyjay93/interface-design',
    originKind: 'plugin',
    color: 'bg-rose-700 text-white border-rose-700',
    patternSource: 'interface-design',
    defaultTags: ['interface'],
    // NOTE: this source also contains "never use native form elements for styled UI"
    // (rebuild <select>/<input type=date> as divs). That rule is deliberately NOT
    // onboarded — it breaks keyboard and screen-reader support and contradicts
    // `content-semantics-first` and the whole forms category. Do not let
    // `sources:build` pull it in unsupervised.
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
    author: 'Paul Bakaus',
    homepage: 'https://impeccable.style/',
    repo: 'pbakaus/impeccable',
    originKind: 'github',
    installCmd: 'npx impeccable install',
    color: 'bg-stone-700 text-white border-stone-700',
    patternSource: 'impeccable',
    defaultTags: ['craft'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
  {
    // `clarify` is one of impeccable's sub-commands, not a standalone skill.
    id: 'clarify',
    name: 'clarify',
    author: 'Paul Bakaus',
    homepage: 'https://impeccable.style/',
    repo: 'pbakaus/impeccable',
    originKind: 'github',
    color: 'bg-cyan-800 text-white border-cyan-800',
    defaultTags: ['typography'],
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
