import { useEffect, useState } from 'react';

/**
 * Good: use the CSS property whenever one exists.
 *
 * 1. `font-weight: 650` on the heading. The variable file still failed to load and
 *    the static fallback still renders — but `font-weight` is a real property, so
 *    the browser picks the closest available face and the heading stays heavy.
 * 2. `font-variant-numeric: tabular-nums` on the ticker. It is its own property, so
 *    adding the stylistic set with `font-feature-settings: "ss01" 1` cannot clobber
 *    it — the two coexist.
 *
 * Raw tags are not banned; they are the escape hatch for things with no property of
 * their own: custom axes like `"GRAD" 80`, and niche features like `"ss01" 1`.
 */

const PRICES = ['1,118.40', '911.05', '1,041.11', '888.19', '1,180.00', '999.71'];

export function FontPropertiesOverTagsGood() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % PRICES.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full space-y-4">
      <div className="rounded-lg border border-border bg-card p-3">
        <p className="mb-2 text-xs font-medium text-success">
          Heading — weight via the property, surviving the same fallback
        </p>
        <p
          className="text-2xl text-foreground"
          style={{ fontFamily: '"AcmeSans Variable", Georgia, serif', fontWeight: 650 }}
        >
          Quarterly revenue
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Same broken font load, same fallback stack. <code>font-weight: 650</code> still resolves —
          the fallback&apos;s bold face renders instead of nothing.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-3">
        <p className="mb-2 text-xs font-medium text-success">
          Ticker — <code>tabular-nums</code> as a property, plus a stylistic set alongside it
        </p>
        <p
          className="text-2xl tabular-nums text-foreground"
          /* Legitimate escape hatch: "ss01" has no property of its own. It sits on a
             different property from the numerics, so nothing gets overwritten. */
          style={{ fontFeatureSettings: '"ss01" 1' }}
        >
          {PRICES[i]} <span className="text-base text-muted-foreground">USD</span>
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Every digit shares one advance width, so <code>USD</code> never moves. The rule of thumb:
          property first, raw tag only when there is no property to reach for.
        </p>
      </div>
    </div>
  );
}
