/**
 * Good: one card, one elevation. Internal hierarchy comes from padding,
 * a single hairline divider between rows, and type weight — no second
 * chrome layer, so nothing satisfies the card test inside the card.
 */
export function ImpeccableNestedCardsGood() {
  const plans = [
    { name: 'Hobby', price: '$0', note: 'Personal projects' },
    { name: 'Pro', price: '$20', note: 'Up to 10 seats' },
    { name: 'Enterprise', price: 'Custom', note: 'SSO and audit logs' },
  ];

  return (
    <div className="w-full max-w-sm space-y-4">
      {/* The only card on screen */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-md">
        <h3 className="mb-1 text-sm font-semibold text-foreground">Billing</h3>

        {/* Flat rows, separated by a 1px divider — no border, radius, or shadow of their own */}
        <div className="divide-y divide-border">
          {plans.map((plan) => (
            <div key={plan.name} className="py-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-foreground">{plan.name}</span>
                <span className="text-sm text-foreground">{plan.price}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{plan.note}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-success">
        One card, one elevation. Padding, a hairline divider, and type weight carry the internal
        hierarchy &mdash; so the depth that is left actually means something.
      </p>
    </div>
  );
}
