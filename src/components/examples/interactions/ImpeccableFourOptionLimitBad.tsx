/**
 * Bad: 9 top-level nav items and 6 pricing tiers.
 *
 * Working memory holds about 4 items. At 8+ the set cannot be held at all, so
 * the user stops comparing and starts skipping — and a user who cannot compare
 * picks nothing.
 */
const NAV = [
  'Products',
  'Solutions',
  'Platform',
  'Developers',
  'Resources',
  'Customers',
  'Partners',
  'Company',
  'Pricing',
];

const TIERS = [
  { name: 'Free', price: '$0' },
  { name: 'Starter', price: '$9' },
  { name: 'Basic', price: '$19' },
  { name: 'Plus', price: '$39' },
  { name: 'Pro', price: '$79' },
  { name: 'Business', price: '$149' },
];

export function ImpeccableFourOptionLimitBad() {
  return (
    <div className="w-full space-y-4">
      <nav aria-label="Main (overloaded)" className="rounded-lg border border-border bg-card p-3">
        <ul className="flex flex-wrap gap-x-3 gap-y-2">
          {NAV.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="rounded-md px-1 py-0.5 text-xs text-foreground underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-error">9 top-level items &mdash; the cap is 5.</p>
      </nav>

      <div className="grid grid-cols-3 gap-2">
        {TIERS.map((tier) => (
          <div key={tier.name} className="rounded-lg border border-border bg-card p-3">
            <p className="text-xs font-semibold text-foreground">{tier.name}</p>
            <p className="text-sm text-foreground">{tier.price}</p>
            <button className="mt-2 w-full rounded-md border border-border px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
              Choose
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs text-error">
        6 tiers, none recommended. Nine nav items and six near-identical plans both land in the 8+
        band where users skip, misclick, or abandon &mdash; there is no way to hold the set in mind
        long enough to choose.
      </p>
    </div>
  );
}
