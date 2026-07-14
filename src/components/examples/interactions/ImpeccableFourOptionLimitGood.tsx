import { useState } from 'react';

/**
 * Good: 4 visible nav items with the remainder grouped under one, and 3 pricing
 * tiers with a recommendation.
 *
 * Grouping does not delete the options — it removes them from the decision. The
 * user holds four things, not nine, and the highlighted tier collapses the
 * pricing decision from "compare three" to "accept one or look at two".
 */
const GROUPED = ['Customers', 'Partners', 'Company', 'Careers', 'Blog'];

const TIERS = [
  { name: 'Starter', price: '$9', blurb: 'Solo projects', recommended: false },
  { name: 'Pro', price: '$39', blurb: 'Growing teams', recommended: true },
  { name: 'Business', price: '$149', blurb: 'Org-wide', recommended: false },
];

export function ImpeccableFourOptionLimitGood() {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="w-full space-y-4">
      <nav aria-label="Main" className="rounded-lg border border-border bg-card p-3">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {['Product', 'Developers', 'Pricing', 'Docs'].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="rounded-md px-1 py-0.5 text-xs text-foreground underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item}
              </a>
            </li>
          ))}
          <li className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              className="rounded-md border border-border px-2 py-0.5 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              More
            </button>
            {moreOpen && (
              <ul className="mt-2 space-y-1 rounded-md border border-border bg-muted p-2">
                {GROUPED.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="rounded-md px-1 py-0.5 text-xs text-muted-foreground underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
        <p className="mt-2 text-xs text-muted-foreground">
          4 items plus one group &mdash; comfortably under the 5-item cap.
        </p>
      </nav>

      <div className="grid grid-cols-3 gap-2">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-lg border bg-card p-3 ${
              tier.recommended ? 'border-primary' : 'border-border'
            }`}
          >
            {tier.recommended && (
              <p className="mb-1 text-[0.625rem] font-semibold uppercase tracking-wide text-primary">
                Recommended
              </p>
            )}
            <p className="text-xs font-semibold text-foreground">{tier.name}</p>
            <p className="text-sm text-foreground">{tier.price}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{tier.blurb}</p>
            <button
              className={`mt-2 w-full rounded-md px-2 py-1 text-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${
                tier.recommended
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-foreground'
              }`}
            >
              Choose
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs text-success">
        3 tiers, one recommended. Both decision points now sit inside the &le;4 working-memory band,
        and the nine nav destinations still exist &mdash; they just are not competing for attention
        at the moment of choice.
      </p>
    </div>
  );
}
