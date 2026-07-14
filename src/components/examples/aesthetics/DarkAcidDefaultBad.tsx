import type { CSSProperties } from 'react';

// The offending color IS the anti-pattern, so it is pinned literally and confined to this pane.
const acid = { '--acid': '#c6f600' } as CSSProperties;

const products = [
  { name: 'Ledgerline', kind: 'fintech dashboard', stat: 'Runway', value: '14 mo' },
  { name: 'Stillwater', kind: 'wellness app', stat: 'Streak', value: '14 d' },
  { name: 'Forkbomb', kind: 'dev tool', stat: 'Builds', value: '14 k' },
];

export function DarkAcidDefaultBad() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-3">
        {products.map((p) => (
          <div
            key={p.name}
            style={acid}
            className="rounded-md border border-neutral-800 bg-neutral-950 p-3"
          >
            <p className="text-[10px] uppercase tracking-widest text-[var(--acid)]">{p.kind}</p>
            <p className="text-sm font-semibold text-neutral-100 mt-1 truncate">{p.name}</p>
            <p className="text-[10px] text-neutral-400 mt-3">{p.stat}</p>
            <p className="text-lg font-semibold text-neutral-100 tabular-nums">{p.value}</p>
            <span className="mt-3 block h-6 rounded bg-[var(--acid)]" />
          </div>
        ))}
      </div>

      <p className="text-xs text-error mt-4">
        A fintech dashboard, a wellness app and a dev tool, and you cannot tell which is which. The
        near-black canvas with one bright acid accent is reflexive AI look #2: it fits every subject
        because it was derived from none of them.
      </p>
    </div>
  );
}
