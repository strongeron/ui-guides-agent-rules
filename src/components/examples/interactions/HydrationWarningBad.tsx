import { useState } from 'react';

// What the server emitted into the HTML, in the server's own locale.
const SERVER_HTML = { price: '$1,234.50', renderedAt: '10:04:07' };
// What this client would render for the same data.
const CLIENT_RENDER = { price: '1 234,50 €', renderedAt: '13:22:41' };

export function HydrationWarningBad() {
  const [hydrated, setHydrated] = useState(false);

  // suppressHydrationWarning tells React: keep the server text, say nothing. It is on both
  // fields, so the currency bug is silenced along with the clock and the server text survives.
  const shown = SERVER_HTML;
  // The clock is allowed to differ. The price is not — it is deterministic data, so a
  // difference there is a bug, and suppression is the reason nobody hears about it.
  const deterministic = ['price'] as const;
  const silentlyWrong = hydrated
    ? deterministic.filter((k) => SERVER_HTML[k] !== CLIENT_RENDER[k])
    : [];

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">
          Both fields carry <code>suppressHydrationWarning</code>. Press Hydrate and watch what the user is left
          looking at.
        </p>

        <div className="rounded-md border border-border bg-muted p-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total</span>
            <span suppressHydrationWarning className="font-mono text-foreground">
              {shown.price}
            </span>
          </div>
          <div className="mt-1 flex justify-between">
            <span className="text-muted-foreground">Rendered at</span>
            <span suppressHydrationWarning className="font-mono text-foreground">
              {shown.renderedAt}
            </span>
          </div>
        </div>

        <button
          onClick={() => setHydrated(true)}
          disabled={hydrated}
          className="mt-3 w-full rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground disabled:opacity-50"
        >
          {hydrated ? 'Hydrated' : 'Hydrate'}
        </button>

        {hydrated && (
          <div className="mt-3 space-y-1 text-xs">
            <p className="text-muted-foreground">
              Console warnings: <strong className="text-foreground">0</strong> — all suppressed
            </p>
            <p className="text-muted-foreground">
              Silently wrong on screen: <strong className="text-foreground">{silentlyWrong.length}</strong> field
              (Total)
            </p>
            <p className="text-muted-foreground">
              This client would have rendered <code>{CLIENT_RENDER.price}</code>, but the euro price is stuck as the
              server&apos;s dollars.
            </p>
          </div>
        )}
      </div>
      <p className="text-xs text-error mt-4">
        Blanket <code>suppressHydrationWarning</code> hid a real currency bug — the user sees the wrong total, and
        nothing warned anyone
      </p>
    </div>
  );
}
