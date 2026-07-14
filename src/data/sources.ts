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
  /**
   * Set when a source contributed rules that ship under ANOTHER source's badge — so the
   * /#sources page can credit it instead of showing a misleading rule count of zero.
   * `clarify` is a sub-command of impeccable; Interface Craft yielded two rules not
   * numerous enough to earn their own badge.
   */
  creditedUnder?: PatternSource;
  check:
    | { mode: 'github'; rawUrls: string[] }
    | { mode: 'manual'; reviewEveryDays: number };
}

/**
 * Reviewed and DECLINED — deliberately not in the catalog. Recorded so the decision is
 * not re-litigated, and so nobody re-adds them assuming they were merely overlooked.
 *
 * - heygen-com/hyperframes  — a video-composition framework. Its "css-animations" file is
 *   about making keyframes deterministically seekable by a renderer, which is the inverse
 *   of interface motion. The generic residue duplicated the corpus.
 * - remotion-dev/skills     — React-video framework API (interpolate, Sequence, ffmpeg).
 * - cloudai-x/threejs-skills— WebGL library API. Orthogonal, not additive.
 * - ihlamury/design-skills  — auto-scraped per-brand hex/font dumps. Not portable, and the
 *   scrape is wrong: one skill asserts a 4.5:1 contrast floor and then specifies ~2.6:1.
 * - mattpocock/skills       — "design-an-interface" is about SOFTWARE MODULE interfaces
 *   (A Philosophy of Software Design), not UI. Also deprecated upstream. Name collision only.
 * - wshobson/agents         — generic textbook primers; ~95% already covered.
 * - arvindrk/extract-design-system — a tool driver. Contains zero rules.
 */
export const declinedSources = [
  'heygen-com/hyperframes',
  'remotion-dev/skills',
  'cloudai-x/threejs-skills',
  'ihlamury/design-skills',
  'mattpocock/skills',
  'wshobson/agents',
  'arvindrk/extract-design-system',
] as const;

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
    // Two rules onboarded (`content-progress-as-milestones`, `animations-named-timing-constants`).
    // Two rules do not earn a badge, so they ship under `custom` and are credited here.
    id: 'interface-craft',
    name: 'Interface Craft',
    author: 'Josh Puckett',
    homepage: 'https://interfacecraft.dev/',
    originKind: 'install-endpoint',
    installCmd: 'curl -sL interfacecraft.dev/api/install-skills | bash',
    color: 'bg-fuchsia-800 text-white border-fuchsia-800',
    creditedUnder: 'custom',
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
    // `clarify` is one of impeccable's sub-commands, not a standalone skill, so its rule
    // (`content-impeccable-loading-copy-expectation`) ships under the impeccable badge.
    id: 'clarify',
    name: 'clarify',
    author: 'Paul Bakaus',
    homepage: 'https://impeccable.style/',
    repo: 'pbakaus/impeccable',
    originKind: 'github',
    color: 'bg-cyan-800 text-white border-cyan-800',
    creditedUnder: 'impeccable',
    defaultTags: ['typography'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
  {
    // Rules with no single upstream to cite: derived from several sources, or from a source
    // that yielded too few rules to earn a badge (Interface Craft). Listed so the page's rule
    // count reconciles with the corpus instead of silently undercounting.
    id: 'custom',
    name: 'Custom',
    originKind: 'landing',
    color: 'bg-muted-foreground text-background border-muted-foreground',
    patternSource: 'custom',
    check: { mode: 'manual', reviewEveryDays: 180 },
  },
  {
    // Its card-necessity test ("if removing the card styling would not hurt comprehension,
    // it should not be a card") is folded into `layout-impeccable-nested-cards`.
    id: 'ce-frontend-design',
    name: 'ce-frontend-design',
    author: 'Every Inc',
    repo: 'EveryInc/compound-engineering-plugin',
    originKind: 'plugin',
    color: 'bg-slate-700 text-white border-slate-700',
    creditedUnder: 'impeccable',
    defaultTags: ['design'],
    check: { mode: 'manual', reviewEveryDays: 60 },
  },
];

export const catalogById = new Map(sourceCatalog.map((s) => [s.id, s]));
