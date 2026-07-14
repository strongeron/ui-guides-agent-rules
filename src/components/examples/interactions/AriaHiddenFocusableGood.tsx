import { useState } from 'react';

const ITEMS = ['Profile', 'Billing', 'Sign out'];

export function AriaHiddenFocusableGood() {
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
            className="rounded border border-border px-2 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Before
          </button>
          <button
            type="button"
            onFocus={trackFocus('“Toggle menu” button', true)}
            onClick={() => setOpen((v) => !v)}
            className="rounded border border-border px-2 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {open ? 'Close menu' : 'Toggle menu'}
          </button>
          <button
            type="button"
            onFocus={trackFocus('“After” button', true)}
            className="rounded border border-border px-2 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            After
          </button>
        </div>

        {/* One attribute, both effects: `inert` removes the subtree from the tab
            order AND from the accessibility tree, and blocks pointer events too.
            No aria-hidden, so the two never disagree. Unmounting the panel is the
            other correct answer. */}
        <div
          inert={open ? undefined : ''}
          className={`mt-3 rounded border border-border bg-muted p-2 transition-transform duration-200 ${
            open ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          <ul className="space-y-1">
            {ITEMS.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onFocus={trackFocus(`“${item}” (in the open menu)`, true)}
                  className="w-full rounded px-2 py-1 text-left text-xs text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
        <span className={`font-medium ${focusIsVisible ? 'text-success' : ''}`}>
          {focusIsVisible ? 'yes — focus is always on something visible' : 'no'}
        </span>
      </p>

      <p className="mt-3 text-xs text-muted-foreground">
        Leave the menu closed and Tab from <em>Before</em>: the third press lands on{' '}
        <em>After</em>. The hidden items are simply not in the sequence. Open the menu
        and Tab again — now they are, and they announce normally. This is the same{' '}
        <code>inert</code> used to freeze the page during a drag, applied to the case it
        was really designed for.
      </p>

      <p className="mt-2 text-xs text-success">
        inert takes the subtree out of the tab order and the accessibility tree together
      </p>
    </div>
  );
}
