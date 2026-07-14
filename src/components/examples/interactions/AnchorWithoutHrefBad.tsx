import { useState } from 'react';

/**
 * Bad: an `<a>` with no `href`, activated only by onClick.
 *
 * Without `href` the element has no link role, is not focusable, is not in the
 * tab order, and never appears in a screen reader's list of links. The DOM calls
 * it a `generic`. It looks like correct semantic HTML — which is exactly why it
 * survives review.
 *
 * The strip below is live: only elements the browser actually gives focus to can
 * light up. Tab through the row and watch focus jump straight from Home to
 * Settings, right over "View profile".
 */
export function AnchorWithoutHrefBad() {
  const [focused, setFocused] = useState<string | null>(null);
  const [clicked, setClicked] = useState(false);

  return (
    <div className="w-full space-y-4">
      <nav
        aria-label="Account (broken)"
        className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
      >
        <button
          onFocus={() => setFocused('home')}
          onBlur={() => setFocused(null)}
          className="rounded-md px-2 py-1 text-sm text-foreground underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Home
        </button>

        {/* No href. Mouse-clickable, invisible to Tab, announced as plain text. */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          onClick={() => setClicked(true)}
          className="cursor-pointer px-2 py-1 text-sm text-foreground underline"
        >
          View profile
        </a>

        <button
          onFocus={() => setFocused('settings')}
          onBlur={() => setFocused(null)}
          className="rounded-md px-2 py-1 text-sm text-foreground underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Settings
        </button>
      </nav>

      {/* Live tab-order strip */}
      <div className="rounded-lg border border-border bg-muted p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Tab order
        </p>
        <ol className="flex flex-wrap items-center gap-2 text-xs">
          <li
            className={`rounded-md border px-2 py-1 ${
              focused === 'home'
                ? 'border-ring bg-card font-semibold text-foreground'
                : 'border-border text-muted-foreground'
            }`}
          >
            1. Home
          </li>
          <li className="rounded-md border border-dashed border-border px-2 py-1 text-muted-foreground line-through">
            View profile
          </li>
          <li
            className={`rounded-md border px-2 py-1 ${
              focused === 'settings'
                ? 'border-ring bg-card font-semibold text-foreground'
                : 'border-border text-muted-foreground'
            }`}
          >
            2. Settings
          </li>
        </ol>
      </div>

      <p className="text-xs text-error">
        Two tab stops, three controls. &ldquo;View profile&rdquo; can never light up above, because
        an <code>&lt;a&gt;</code> without <code>href</code> is not focusable and never enters the
        tab order &mdash; the browser exposes it as a <code>generic</code>, not a link. It works for
        a mouse{clicked ? ' (you just clicked it)' : ''} and for nobody else.
      </p>
    </div>
  );
}
