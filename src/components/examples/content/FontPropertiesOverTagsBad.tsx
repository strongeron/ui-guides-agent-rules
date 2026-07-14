import { useEffect, useState } from 'react';

/**
 * Bad: the low-level tags are used where a real CSS property exists.
 *
 * 1. The heading sets `font-variation-settings: "wght" 650`. The variable file
 *    failed to load, so the static fallback stack renders — and on a static font
 *    the `wght` axis does not exist. The declaration is not overridden, it is
 *    simply inert: the heading collapses to 400 and no one gets an error.
 * 2. The ticker asked for tabular figures with `font-feature-settings: "tnum" 1`,
 *    then a later commit added a stylistic set the same way. `font-feature-settings`
 *    is ONE property, not a list of independent switches, so `"ss01" 1` replaced
 *    `"tnum" 1` wholesale. The digits went proportional again and the "USD" after
 *    them jitters on every tick.
 */

const PRICES = ['1,118.40', '911.05', '1,041.11', '888.19', '1,180.00', '999.71'];

export function FontPropertiesOverTagsBad() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % PRICES.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full space-y-4">
      <div className="rounded-lg border border-destructive/40 bg-card p-3">
        <p className="mb-2 text-xs font-medium text-destructive">
          Heading — weight via the raw axis tag, on a non-variable fallback
        </p>
        {/* The variable file never loaded; Georgia has no wght axis, so this does nothing. */}
        <p
          className="text-2xl text-foreground"
          style={{
            fontFamily: '"AcmeSans Variable", Georgia, serif',
            fontVariationSettings: '"wght" 650',
          }}
        >
          Quarterly revenue
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          It renders at 400. <code>font-variation-settings</code> silently does nothing on the
          fallback — the semibold heading you designed is now indistinguishable from body copy.
        </p>
      </div>

      <div className="rounded-lg border border-destructive/40 bg-card p-3">
        <p className="mb-2 text-xs font-medium text-destructive">
          Ticker — numerics via the raw feature tag, clobbered by the next feature
        </p>
        <p
          className="text-2xl text-foreground"
          /* Was '"tnum" 1'. Someone added the stylistic set the same way, and since this
             is a single property, the tabular figures went with it. */
          style={{ fontFeatureSettings: '"ss01" 1' }}
        >
          {PRICES[i]} <span className="text-base text-muted-foreground">USD</span>
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Watch the <code>USD</code>: proportional digits have different widths, so it slides left
          and right on every tick. Both declarations are still sitting in the stylesheet, doing
          nothing anyone can see.
        </p>
      </div>
    </div>
  );
}
