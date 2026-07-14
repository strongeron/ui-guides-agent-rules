import type { CSSProperties } from 'react';

/**
 * Each dark surface holds its subject's own hue angle and drops chroma to a tinted
 * neutral; each accent is pulled from that subject's material world, not from a neon
 * swatch. Same darkness, three unmistakable products.
 */
const products = [
  {
    name: 'Ledgerline',
    kind: 'fintech dashboard',
    stat: 'Runway',
    value: '14 mo',
    note: 'ink-blue surface, brass accent — ledger paper and stamped foil',
    vars: {
      '--surface': 'oklch(0.19 0.02 255)',
      '--edge': 'oklch(0.30 0.02 255)',
      '--ink': 'oklch(0.94 0.01 255)',
      '--dim': 'oklch(0.70 0.02 255)',
      '--accent': 'oklch(0.78 0.11 85)',
    } as CSSProperties,
  },
  {
    name: 'Stillwater',
    kind: 'wellness app',
    stat: 'Streak',
    value: '14 d',
    note: 'moss surface, clay accent — riverbed, not neon',
    vars: {
      '--surface': 'oklch(0.20 0.02 150)',
      '--edge': 'oklch(0.31 0.02 150)',
      '--ink': 'oklch(0.94 0.01 150)',
      '--dim': 'oklch(0.70 0.02 150)',
      '--accent': 'oklch(0.72 0.10 40)',
    } as CSSProperties,
  },
  {
    name: 'Forkbomb',
    kind: 'dev tool',
    stat: 'Builds',
    value: '14 k',
    note: 'warm graphite surface, phosphor-amber accent — the terminal it replaces',
    vars: {
      '--surface': 'oklch(0.19 0.01 60)',
      '--edge': 'oklch(0.30 0.01 60)',
      '--ink': 'oklch(0.94 0.01 60)',
      '--dim': 'oklch(0.70 0.01 60)',
      '--accent': 'oklch(0.80 0.14 70)',
    } as CSSProperties,
  },
];

export function DarkAcidDefaultGood() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-3">
        {products.map((p) => (
          <div
            key={p.name}
            style={p.vars}
            className="rounded-md border border-[var(--edge)] bg-[var(--surface)] p-3"
          >
            <p className="text-[10px] uppercase tracking-widest text-[var(--accent)]">{p.kind}</p>
            <p className="text-sm font-semibold text-[var(--ink)] mt-1 truncate">{p.name}</p>
            <p className="text-[10px] text-[var(--dim)] mt-3">{p.stat}</p>
            <p className="text-lg font-semibold text-[var(--ink)] tabular-nums">{p.value}</p>
            <span className="mt-3 block h-6 rounded bg-[var(--accent)]" />
            <p className="text-[10px] text-[var(--dim)] mt-2 leading-snug">{p.note}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-success mt-4">
        Still dark, still disciplined, but the surface holds each subject&rsquo;s hue at near-zero
        chroma and the accent comes from its material world. Swap the three and the mismatch is
        immediate &mdash; which is the proof the palette was derived, not defaulted.
      </p>
    </div>
  );
}
