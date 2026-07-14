/**
 * Bad: a card inside a card. Each plan row repeats the parent's chrome —
 * border + radius + shadow + background — so the detector's card test
 * ((shadow OR border) AND (radius OR background)) fires on the inner boxes.
 * Two elevation levels that mean nothing relative to each other.
 */
export function ImpeccableNestedCardsBad() {
  const plans = [
    { name: 'Hobby', price: '$0', note: 'Personal projects' },
    { name: 'Pro', price: '$20', note: 'Up to 10 seats' },
    { name: 'Enterprise', price: 'Custom', note: 'SSO and audit logs' },
  ];

  return (
    <div className="w-full max-w-sm space-y-4">
      {/* Outer card */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-md">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Billing</h3>

        <div className="space-y-3">
          {plans.map((plan) => (
            /* Inner card: border + radius + background + shadow, all over again */
            <div
              key={plan.name}
              className="rounded-lg border border-border bg-card p-3 shadow-sm"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-foreground">{plan.name}</span>
                <span className="text-sm text-foreground">{plan.price}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{plan.note}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-error">
        Cards inside a card: three extra borders, three extra shadows, three extra radii. The
        border/shadow noise doubles and the depth hierarchy is destroyed &mdash; the inner boxes
        are not &ldquo;closer&rdquo; than the card, just louder.
      </p>
    </div>
  );
}
