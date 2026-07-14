import { useState } from 'react';

const MAILBOXES = [
  'Inbox',
  'Drafts',
  'Sent',
  'Spam',
  'Archive',
  'Snoozed',
  'Starred',
  'Important',
  'Scheduled',
  'Trash',
];

export function FocusNotObscuredBad() {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div className="w-full max-w-sm">
      {/* The scroller has a sticky header AND a sticky footer, but no scroll-padding.
          Sequential focus navigation scrolls the focused row flush against the edge
          of the scrollport — which is exactly where the sticky chrome sits. */}
      <div className="h-48 overflow-y-auto rounded-lg border border-border bg-card">
        <div className="sticky top-0 z-10 border-b border-border bg-card px-3 py-2 text-sm font-medium text-foreground">
          Mailboxes
        </div>

        <ul className="p-2">
          {MAILBOXES.map((name) => (
            <li key={name}>
              <button
                type="button"
                onFocus={() => setFocused(name)}
                onBlur={() => setFocused(null)}
                className="w-full rounded px-3 py-2 text-left text-sm text-foreground hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                {name}
              </button>
            </li>
          ))}
        </ul>

        <div className="sticky bottom-0 z-10 border-t border-border bg-card px-3 py-2 text-xs text-muted-foreground">
          10 mailboxes
        </div>
      </div>

      <p className="mt-3 rounded border border-border bg-muted px-3 py-2 text-xs text-foreground">
        Keyboard focus is on:{' '}
        <span className="font-medium">{focused ?? 'nothing in the list'}</span>
      </p>

      <p className="mt-3 text-xs text-muted-foreground">
        Click <em>Inbox</em>, then hold Tab. The readout keeps naming rows you cannot
        see: each newly focused row is scrolled flush to the scrollport edge, which
        is underneath the sticky header or the sticky footer. The ring is rendered —
        it is just behind opaque, author-created content.
      </p>

      <p className="mt-2 text-xs text-destructive">
        A focused component is entirely hidden by sticky chrome — WCAG 2.4.11 failure
      </p>
    </div>
  );
}
