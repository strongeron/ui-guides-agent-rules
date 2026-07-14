import { useState } from 'react';
import type { CSSProperties } from 'react';

const BRAND_HUE = 195;

// Chroma falls toward zero as lightness approaches 0 or 100, so the extremes stay believable.
const neutrals = (tinted: boolean): CSSProperties =>
  ({
    '--paper': tinted ? `oklch(0.99 0.006 ${BRAND_HUE})` : 'oklch(0.99 0 0)',
    '--ink': tinted ? `oklch(0.20 0.012 ${BRAND_HUE})` : 'oklch(0.20 0 0)',
    '--muted-ink': tinted ? `oklch(0.55 0.015 ${BRAND_HUE})` : 'oklch(0.55 0 0)',
    '--line': tinted ? `oklch(0.87 0.010 ${BRAND_HUE})` : 'oklch(0.87 0 0)',
    '--brand': `oklch(0.72 0.13 ${BRAND_HUE})`,
  }) as CSSProperties;

export function ImpeccableTintedNeutralsGood() {
  const [tinted, setTinted] = useState(true);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Brand color + neutrals</p>
        <button
          type="button"
          onClick={() => setTinted((v) => !v)}
          aria-pressed={tinted}
          className="rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Tint: {tinted ? 'on (chroma 0.006–0.015)' : 'off (chroma 0)'}
        </button>
      </div>

      <div className="flex items-stretch gap-3" style={neutrals(tinted)}>
        <div className="w-16 shrink-0 rounded-lg bg-[var(--brand)]" aria-hidden="true" />

        <div className="flex-1 rounded-lg border border-[var(--line)] bg-[var(--paper)] p-4">
          <p className="text-sm font-semibold text-[var(--ink)]">Invoice INV-1284</p>
          <p className="mt-1 text-sm text-[var(--muted-ink)]">
            Neutrals sit at hue {BRAND_HUE}, carrying just enough chroma to belong to the brand.
          </p>
        </div>
      </div>

      <p className="text-xs text-success">
        Flip the toggle: nobody can name the difference, but with the tint on, card and brand swatch read
        as one system. Never #000 or #fff — carry the brand hue at chroma 0.005–0.015, and resist the two
        lazy reflexes of tinting everything warm-orange or cool-blue regardless of the brand.
      </p>
    </div>
  );
}
