import { useState } from 'react';

/**
 * Good: two branches, because the fix depends on intent.
 *
 * 1. Navigation — it goes somewhere, so give it a real `href`. The browser then
 *    supplies focus, the link role, Enter activation, middle-click and Cmd-click
 *    to open in a new tab, and "Copy link address" for free.
 * 2. Action — it does not go anywhere, so it was never a link. Use `<button>`.
 *
 * `href` is not decoration. It is what makes the element a link.
 */
export function AnchorWithoutHrefGood() {
  const [focused, setFocused] = useState<string | null>(null);
  const [signedOut, setSignedOut] = useState(false);

  return (
    <div className="w-full space-y-4">
      <nav
        aria-label="Account"
        className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
      >
        <a
          href="#"
          onFocus={() => setFocused('home')}
          onBlur={() => setFocused(null)}
          className="rounded-md px-2 py-1 text-sm text-foreground underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Home
        </a>

        {/* Navigation → a real href. Focusable, middle-clickable, copyable. */}
        <a
          href="#"
          onFocus={() => setFocused('profile')}
          onBlur={() => setFocused(null)}
          className="rounded-md px-2 py-1 text-sm text-foreground underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          View profile
        </a>

        {/* Action → it was never a link. A button. */}
        <button
          onClick={() => setSignedOut(true)}
          onFocus={() => setFocused('signout')}
          onBlur={() => setFocused(null)}
          className="rounded-md border border-border px-2 py-1 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Sign out
        </button>
      </nav>

      {/* Live tab-order strip */}
      <div className="rounded-lg border border-border bg-muted p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Tab order
        </p>
        <ol className="flex flex-wrap items-center gap-2 text-xs">
          {[
            { id: 'home', label: '1. Home (link)' },
            { id: 'profile', label: '2. View profile (link)' },
            { id: 'signout', label: '3. Sign out (button)' },
          ].map((stop) => (
            <li
              key={stop.id}
              className={`rounded-md border px-2 py-1 ${
                focused === stop.id
                  ? 'border-ring bg-card font-semibold text-foreground'
                  : 'border-border text-muted-foreground'
              }`}
            >
              {stop.label}
            </li>
          ))}
        </ol>
      </div>

      <p className="text-xs text-success">
        Three controls, three tab stops. &ldquo;View profile&rdquo; navigates, so it carries an{' '}
        <code>href</code> and is announced as a link. &ldquo;Sign out&rdquo; performs an action, so
        it is a <code>&lt;button&gt;</code> and is announced as a button.
        {signedOut ? ' Signed out.' : ''}
      </p>
    </div>
  );
}
