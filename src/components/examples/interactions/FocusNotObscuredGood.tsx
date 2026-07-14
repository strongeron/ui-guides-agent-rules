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

export function FocusNotObscuredGood() {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div className="w-full max-w-sm">
      {/* scroll-py-12 sets scroll-padding-block on the scrollport. Every scroll that
          the browser performs to bring the focused row into view — including the
          implicit one from sequential focus navigation — now stops 3rem short of
          each edge, which is where the sticky chrome ends. */}
      <div className="h-48 scroll-py-12 overflow-y-auto rounded-lg border border-border bg-card">
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
        Click <em>Inbox</em>, then hold Tab. The row the readout names is always the
        row you can see: focus lands clear of the header on the way down and clear of
        the footer on the way back up. Per-row <code>scroll-margin-block</code> works
        just as well when you cannot reach the scroller.
      </p>

      <p className="mt-2 text-xs text-success">
        The focused component is never entirely hidden — its ring is always on screen
      </p>
    </div>
  );
}
