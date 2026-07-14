import { useState } from 'react';

export function TextBoxTrimBad() {
  const [guides, setGuides] = useState(true);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Symmetric padding (py-2), no trim</p>
        <button
          type="button"
          onClick={() => setGuides((v) => !v)}
          aria-pressed={guides}
          className="rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Guides: {guides ? 'on' : 'off'}
        </button>
      </div>

      <div className="flex flex-wrap items-start gap-4 rounded-lg border border-border bg-card p-6">
        <div className="relative">
          <span className="inline-flex rounded-md bg-primary px-3 py-2 text-2xl font-semibold leading-none text-primary-foreground">
            Beta
          </span>
          {guides && (
            <>
              {/* Geometric centre of the padding box. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[-14px] top-1/2 h-px bg-destructive"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 top-1/2 translate-x-full -translate-y-1/2 whitespace-nowrap text-[10px] text-destructive"
              >
                box centre
              </span>
            </>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            className="rounded-md border border-border bg-muted px-4 py-2 text-2xl font-semibold leading-none text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Deploy
          </button>
          {guides && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[-14px] top-1/2 h-px bg-destructive"
            />
          )}
        </div>
      </div>

      <p className="text-xs text-destructive">
        Padding is symmetric, so the box is centred — but the text is not. The font reserves space above
        the cap height and below the baseline for accents and descenders, and that reservation is not
        symmetric, so the glyphs land visibly below the box centre. Every badge, chip and short button in
        the product carries the same small wrongness, and the usual fix (hand-tuning{' '}
        <code>pt-1.5 pb-2</code> per component) is invalidated the moment the typeface changes.
      </p>
    </div>
  );
}
