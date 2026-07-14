import { useState } from 'react';

// The price is now formatted from one authoritative locale on both sides, so it matches.
const SERVER_HTML = { price: '1 234,50 €', renderedAt: '10:04:07' };
const CLIENT_RENDER = { price: '1 234,50 €', renderedAt: '13:22:41' };

export function HydrationWarningGood() {
  const [hydrated, setHydrated] = useState(false);

  // Deterministic fields hydrate normally: if they ever drift, React will tell us.
  const price = hydrated ? CLIENT_RENDER.price : SERVER_HTML.price;
  // The clock genuinely cannot match — it is a different moment. This is the one
  // place suppressHydrationWarning belongs, so the honest mismatch stays quiet.
  const renderedAt = hydrated ? CLIENT_RENDER.renderedAt : SERVER_HTML.renderedAt;

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">
          Only the clock is suppressed. The price is formatted the same way on both sides, so it hydrates under
          React&apos;s watch.
        </p>

        <div className="rounded-md border border-border bg-muted p-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total</span>
            {/* No suppression: a drift here would surface as a warning, as it should. */}
            <span className="font-mono text-foreground">{price}</span>
          </div>
          <div className="mt-1 flex justify-between">
            <span className="text-muted-foreground">Rendered at</span>
            <span suppressHydrationWarning className="font-mono text-foreground">
              {renderedAt}
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
              Suppressed fields: <strong className="text-foreground">1</strong> (the clock — genuinely unstable)
            </p>
            <p className="text-muted-foreground">
              Silently wrong on screen: <strong className="text-foreground">0</strong>
            </p>
            <p className="text-muted-foreground">
              The clock ticked forward. The total is the same €1 234,50 the user was quoted.
            </p>
          </div>
        )}
      </div>
      <p className="text-xs text-success mt-4">
        Suppression is scoped to the one value that cannot match — every other mismatch would still be reported
      </p>
    </div>
  );
}
