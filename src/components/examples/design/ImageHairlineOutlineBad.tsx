import { useState } from 'react';
import type { CSSProperties } from 'react';

type Surface = 'cream' | 'white' | 'near-black';

// The card the photos sit on. Cream is the interesting one: it is exactly the kind of
// warm, tinted surface a brand palette produces, and exactly where a slate hairline dies.
const SURFACES: Record<Surface, string> = {
  cream: 'oklch(0.96 0.03 85)',
  white: 'oklch(1 0 0)',
  'near-black': 'oklch(0.18 0.01 265)',
};

const PHOTOS = [
  { label: 'Sunset over the harbour', className: 'bg-gradient-to-br from-amber-200 via-orange-300 to-rose-400' },
  { label: 'Desert road at noon', className: 'bg-gradient-to-br from-yellow-100 via-amber-200 to-stone-300' },
  { label: 'Fog on the ridge', className: 'bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400' },
];

export function ImageHairlineOutlineBad() {
  const [surface, setSurface] = useState<Surface>('cream');

  return (
    <div className="space-y-3">
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
        style={{ '--surface': SURFACES[surface] } as CSSProperties}
      >
        <div className="grid grid-cols-3 gap-3">
          {PHOTOS.map((p) => (
            <div key={p.label} className="space-y-1.5">
              {/* A near-black from the project palette, as a border. Two mistakes in one line. */}
              <div
                role="img"
                aria-label={p.label}
                className={`aspect-square rounded-md border border-slate-800/10 ${p.className}`}
              />
              <p className="truncate text-[10px] text-slate-500">{p.label}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-destructive">
        Cycle the surface. <code>border-slate-800/10</code> is not neutral — it carries slate&apos;s cool
        hue, so against the warm cream card (and against the warm photos) it turns muddy green and reads
        as dirt on the image edge rather than as a separator; on the near-black card the same token
        simply vanishes, because it was only ever a light-mode value. And because it is a{' '}
        <code>border</code>, it is part of the box: it eats a pixel off each edge of the image, so these
        tiles are not the size the grid thinks they are.
      </p>
    </div>
  );
}
