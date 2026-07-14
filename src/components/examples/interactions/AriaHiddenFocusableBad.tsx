import { useState } from 'react';

const ITEMS = ['Profile', 'Billing', 'Sign out'];

export function AriaHiddenFocusableBad() {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState('nothing');
  const [focusIsVisible, setFocusIsVisible] = useState(true);

  const trackFocus = (label: string, visible: boolean) => () => {
    setFocused(label);
    setFocusIsVisible(visible);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="relative overflow-hidden rounded-lg border border-border bg-card p-3">
        <div className="flex gap-2">
          <button
            type="button"
            onFocus={trackFocus('“Before” button', true)}
            className="rounded border border-border px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            Before
          </button>
          <button
            type="button"
            onFocus={trackFocus('“Toggle menu” button', true)}
            onClick={() => setOpen((v) => !v)}
            className="rounded border border-border px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            {open ? 'Close menu' : 'Toggle menu'}
          </button>
          <button
            type="button"
            onFocus={trackFocus('“After” button', true)}
            className="rounded border border-border px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            After
          </button>
        </div>

        {/* aria-hidden + opacity-0 + translate hides the menu from EYES and from the
            accessibility tree — but not from the tab sequence. The buttons inside are
            still focusable, so keyboard focus walks into content that is announced as
            nothing and rendered as nothing. */}
        <div
          aria-hidden={!open}
          className={`mt-3 rounded border border-border bg-muted p-2 transition-transform duration-200 ${
            open ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          <ul className="space-y-1">
            {ITEMS.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onFocus={trackFocus(`“${item}” (inside the aria-hidden menu)`, open)}
                  className="w-full rounded px-2 py-1 text-left text-xs text-foreground hover:bg-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-3 rounded border border-border bg-muted px-3 py-2 text-xs text-foreground">
        <span className="text-muted-foreground">Focus is on:</span>{' '}
        <span className="font-medium">{focused}</span>
        <br />
        <span className="text-muted-foreground">Can you see it?</span>{' '}
        <span className={`font-medium ${focusIsVisible ? '' : 'text-destructive'}`}>
          {focusIsVisible ? 'yes' : 'NO — focus is on an invisible element'}
        </span>
      </p>

      <p className="mt-3 text-xs text-muted-foreground">
        Leave the menu closed. Click <em>Before</em>, then press Tab four times. Presses
        3, 4 and 5 land inside the closed menu: the focus ring vanishes, the readout
        names an element you cannot see, and a screen reader announces nothing at all,
        because <code>aria-hidden</code> removed it from the accessibility tree while
        leaving it in the tab order.
      </p>

      <p className="mt-2 text-xs text-destructive">
        aria-hidden=&quot;true&quot; on a parent of focusable children — a Rules of ARIA violation
      </p>
    </div>
  );
}
