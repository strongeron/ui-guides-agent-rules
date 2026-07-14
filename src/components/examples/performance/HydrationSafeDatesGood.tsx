import { useEffect, useState } from 'react';

const TIMESTAMP = Date.UTC(2026, 0, 15, 23, 30);
const ISO = new Date(TIMESTAMP).toISOString();

/** Deterministic: same string on the server and on the client's first paint. */
const serverHtml = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC',
}).format(TIMESTAMP);

function SafeDate() {
  // First paint renders exactly what the server sent...
  const [label, setLabel] = useState(serverHtml);
  const [localized, setLocalized] = useState(false);

  // ...then, after hydration is done, upgrade to the visitor's locale and zone.
  useEffect(() => {
    setLabel(new Date(TIMESTAMP).toLocaleString());
    setLocalized(true);
  }, []);

  return (
    <>
      <div className="space-y-1">
        <div className="text-xs text-muted-foreground">Server HTML (UTC, en-US)</div>
        <div className="rounded bg-muted px-2 py-1 font-mono text-xs text-foreground">
          {serverHtml}
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-xs text-muted-foreground">
          Client first paint {localized ? '→ upgraded after mount' : ''}
        </div>
        <time
          dateTime={ISO}
          className="block rounded bg-muted px-2 py-1 font-mono text-xs text-foreground"
        >
          {label}
        </time>
      </div>
      <div className="rounded-md border border-success/40 bg-success/10 px-2 py-1.5 text-xs text-success">
        Markup matched on hydration. The localized string is applied in an effect, so React never has
        to discard the server render.
      </div>
    </>
  );
}

export function HydrationSafeDatesGood() {
  const [nonce, setNonce] = useState(0);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <SafeDate key={nonce} />
        <button
          type="button"
          onClick={() => setNonce((n) => n + 1)}
          className="rounded-lg bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Replay hydration
        </button>
      </div>
      <p className="text-xs text-success">
        Render a deterministic string (fixed zone/locale, wrapped in <code>&lt;time
        dateTime&gt;</code>), then localize in <code>useEffect</code>. Hydration matches for every
        visitor, whatever their time zone.
      </p>
    </div>
  );
}
