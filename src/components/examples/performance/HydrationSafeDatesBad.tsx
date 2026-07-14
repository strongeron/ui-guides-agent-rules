import { useState } from 'react';

const TIMESTAMP = Date.UTC(2026, 0, 15, 23, 30);

/** What a server running in UTC / en-US would have put in the HTML. */
const serverHtml = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC',
}).format(TIMESTAMP);

export function HydrationSafeDatesBad() {
  const [nonce, setNonce] = useState(0);

  // Formats with the *browser's* locale and time zone — a different string than the server sent.
  const clientRender = new Date(TIMESTAMP).toLocaleString();
  const mismatch = clientRender !== serverHtml;

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4" key={nonce}>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Server HTML (UTC, en-US)</div>
          <div className="rounded bg-muted px-2 py-1 font-mono text-xs text-foreground">
            {serverHtml}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Client render (your locale + zone)</div>
          <div className="rounded bg-muted px-2 py-1 font-mono text-xs text-foreground">
            {clientRender}
          </div>
        </div>

        {mismatch ? (
          <div className="rounded-md border border-error/40 bg-error/10 px-2 py-1.5 text-xs text-error">
            Hydration mismatch: text content did not match. React throws away the server HTML and
            re-renders the whole subtree on the client.
          </div>
        ) : (
          <div className="text-xs text-muted-foreground">
            Your browser happens to be in UTC/en-US, so the strings agree here — they would not for
            most of your users.
          </div>
        )}

        <button
          type="button"
          onClick={() => setNonce((n) => n + 1)}
          className="rounded-lg bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Replay hydration
        </button>
      </div>
      <p className="text-xs text-error">
        <code>toLocaleString()</code> during render produces one string on the server and a different
        one in the browser. Every visitor outside the server&apos;s time zone pays for a discarded
        server render.
      </p>
    </div>
  );
}
