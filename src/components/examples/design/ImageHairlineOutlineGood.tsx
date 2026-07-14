import { useState } from 'react';
import type { CSSProperties } from 'react';

type Surface = 'cream' | 'white' | 'near-black';

const SURFACES: Record<Surface, { bg: string; dark: boolean }> = {
  cream: { bg: 'oklch(0.96 0.03 85)', dark: false },
  white: { bg: 'oklch(1 0 0)', dark: false },
  'near-black': { bg: 'oklch(0.18 0.01 265)', dark: true },
};

// The only two values allowed. Pure black and pure white have no hue to shift, so they
// cannot pick up the backdrop and read as grime. This is the one neutral you must NOT tint
// (cf. design-impeccable-tinted-neutrals, which is right about every surface you control).
const HAIRLINE_LIGHT = 'oklch(0 0 0 / 0.1)';
const HAIRLINE_DARK = 'oklch(1 0 0 / 0.1)';

const PHOTOS = [
  { label: 'Sunset over the harbour', className: 'bg-gradient-to-br from-amber-200 via-orange-300 to-rose-400' },
  { label: 'Desert road at noon', className: 'bg-gradient-to-br from-yellow-100 via-amber-200 to-stone-300' },
  { label: 'Fog on the ridge', className: 'bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400' },
];

export function ImageHairlineOutlineGood() {
  const [surface, setSurface] = useState<Surface>('cream');
  const { bg, dark } = SURFACES[surface];

  return (
    <div className="space-y-3">
      <style>{`
        /* outline, not border: painted outside the layout algorithm, and the negative
           offset pulls it inside so the image keeps its intended size. */
        .iho-tile {
          outline: 1px solid var(--hairline);
          outline-offset: -1px;
        }
      `}</style>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="me-1 text-xs text-muted-foreground">Card surface:</span>
        {(Object.keys(SURFACES) as Surface[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSurface(s)}
            aria-pressed={surface === s}
            className={`rounded-md border px-2.5 py-1 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
              surface === s
                ? 'border-foreground bg-foreground text-background'
                : 'border-border bg-muted text-foreground'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div
        className="rounded-lg bg-[var(--surface)] p-5"
        style={
          {
            '--surface': bg,
            '--hairline': dark ? HAIRLINE_DARK : HAIRLINE_LIGHT,
          } as CSSProperties
        }
      >
        <div className="grid grid-cols-3 gap-3">
          {PHOTOS.map((p) => (
            <div key={p.label} className="space-y-1.5">
              <div
                role="img"
                aria-label={p.label}
                className={`iho-tile aspect-square rounded-md ${p.className}`}
              />
              <p className={`truncate text-[10px] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                {p.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-success">
        Cycle the surface: the hairline holds. Pure black at 10% alpha on light surfaces, pure white at
        10% on dark ones — no hue to pick up the backdrop, so it reads as the shadow of the edge rather
        than as dirt on it. In a real component the whole rule is one class list:{' '}
        <code>outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10</code>. Use{' '}
        <code>outline</code> and not <code>border</code>: an outline does not participate in layout, and{' '}
        <code>-outline-offset-1</code> insets it, so the image stays exactly the size the grid expects.
      </p>
    </div>
  );
}
