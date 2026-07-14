import { useEffect, useState } from 'react';

export function TextBoxTrimGood() {
  const [guides, setGuides] = useState(true);
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(
      typeof CSS !== 'undefined' && CSS.supports('text-box', 'trim-both cap alphabetic')
    );
  }, []);

  return (
    <div className="space-y-3">
      <style>{`
        /* Base: pre-tuned asymmetric padding, so the layout is already correct
           in every browser that has never heard of text-box. */
        .tbt-chip {
          padding-block: 0.42rem 0.58rem;
        }

        /* Enhancement: trim the reserved space, then let padding go symmetric. */
        @supports (text-box: trim-both cap alphabetic) {
          .tbt-chip {
            text-box: trim-both cap alphabetic;
            padding-block: 0.5rem;
          }
        }
      `}</style>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          text-box: trim-both cap alphabetic{' '}
          {supported === null ? '' : supported ? '— supported here' : '— not supported here, base padding is doing the work'}
        </p>
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
          <span className="tbt-chip inline-flex rounded-md bg-primary px-3 text-2xl font-semibold leading-none text-primary-foreground">
            Beta
          </span>
          {guides && (
            <>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[-14px] top-1/2 h-px bg-success"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 top-1/2 translate-x-full -translate-y-1/2 whitespace-nowrap text-[10px] text-success"
              >
                box centre
              </span>
            </>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            className="tbt-chip rounded-md border border-border bg-muted px-4 text-2xl font-semibold leading-none text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Deploy
          </button>
          {guides && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[-14px] top-1/2 h-px bg-success"
            />
          )}
        </div>
      </div>

      <p className="text-xs text-success">
        The cap-to-baseline band now straddles the box centre, because the browser measures the box from
        the cap height (<code>cap</code>) to the baseline (<code>alphabetic</code>) and discards the
        reserved space outside it — so symmetric padding becomes optically symmetric.{' '}
        <strong>Support is still limited</strong>, so this is genuine progressive enhancement: the
        pre-tuned padding ships as the base and the <code>@supports</code> block resets it to symmetric
        only where the trim actually lands. The layout must be correct without it.
      </p>
    </div>
  );
}
