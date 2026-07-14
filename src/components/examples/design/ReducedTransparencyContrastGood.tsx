import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

type Sim = 'none' | 'transparency' | 'contrast';

const LABELS: Record<Sim, string> = {
  none: 'no preference',
  transparency: 'reduced-transparency',
  contrast: 'contrast: more',
};

export function ReducedTransparencyContrastGood() {
  const [sim, setSim] = useState<Sim>('none');
  const [osPref, setOsPref] = useState<string | null>(null);

  // Both queries are readable from JS too, if the UI needs to reflect the state.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const active = [
      window.matchMedia('(prefers-reduced-transparency: reduce)').matches && 'reduced-transparency',
      window.matchMedia('(prefers-contrast: more)').matches && 'contrast: more',
    ].filter(Boolean);
    setOsPref(active.length ? active.join(' + ') : 'no preference set');
  }, []);

  return (
    <div className="space-y-3">
      <style>{`
        .rtcg-bar {
          --bar-bg: var(--glass);
          --bar-blur: blur(12px) saturate(180%);
          --bar-ring: transparent;

          background: var(--bar-bg);
          backdrop-filter: var(--bar-blur);
          -webkit-backdrop-filter: var(--bar-blur);
          border-bottom: 1px solid var(--bar-ring);
        }

        /* The user asked for less translucency: raise the opacity, drop the blur. */
        @media (prefers-reduced-transparency: reduce) {
          .rtcg-bar { --bar-bg: var(--solid); --bar-blur: none; }
        }

        /* The user asked for more contrast: near-solid, plus a defined, contrasting border. */
        @media (prefers-contrast: more) {
          .rtcg-bar {
            --bar-bg: var(--solid);
            --bar-blur: none;
            --bar-ring: var(--ink);
          }
        }

        /* Simulation only, so the state is visible without changing OS settings.
           Each block mirrors exactly the media query above it. */
        [data-sim='transparency'] .rtcg-bar { --bar-bg: var(--solid); --bar-blur: none; }
        [data-sim='contrast'] .rtcg-bar {
          --bar-bg: var(--solid);
          --bar-blur: none;
          --bar-ring: var(--ink);
        }
      `}</style>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="me-1 text-xs text-muted-foreground">Simulate:</span>
        {(Object.keys(LABELS) as Sim[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSim(s)}
            aria-pressed={sim === s}
            className={`rounded-md border px-2.5 py-1 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
              sim === s
                ? 'border-foreground bg-foreground text-background'
                : 'border-border bg-muted text-foreground'
            }`}
          >
            {LABELS[s]}
          </button>
        ))}
      </div>

      <div
        data-sim={sim}
        className="relative h-56 overflow-hidden rounded-lg border border-border"
        style={
          {
            '--glass': 'oklch(1 0 0 / 0.4)',
            '--solid': 'oklch(0.99 0.01 265 / 0.97)',
            '--ink': 'oklch(0.2 0.02 265)',
          } as CSSProperties
        }
      >
        {/* Deliberately a pinned light surface: the point is that the toolbar's contrast
            depends on this backdrop, not on any token. */}
        <div className="h-full overflow-y-auto bg-white bg-gradient-to-br from-sky-200 via-fuchsia-300 to-amber-200 p-4 pt-16">
          {Array.from({ length: 8 }).map((_, i) => (
            <p key={i} className="mb-3 text-sm font-medium text-slate-900">
              Row {i + 1} — under either preference the toolbar stops sampling this and becomes a surface
              with a contrast ratio you can actually test.
            </p>
          ))}
        </div>

        <div className="rtcg-bar absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold text-slate-900">Library</span>
          <span className="text-xs text-slate-700">248 items</span>
        </div>
      </div>

      <p className="text-xs text-success">
        Glass stays the default; the two OS preferences override it.{' '}
        <code>prefers-reduced-transparency: reduce</code> raises the background to a solid token and drops{' '}
        <code>backdrop-filter</code> to <code>none</code>; <code>prefers-contrast: more</code> does the
        same and adds the defined, contrasting border that now has to do the layering job the blur used to
        do. The buttons only simulate it — the real rules are the media queries, and your OS currently
        reports: <strong>{osPref ?? 'checking…'}</strong>.
      </p>
    </div>
  );
}
