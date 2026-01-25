export function CraftsmanshipGood() {
  return (
    <div className="w-full max-w-sm">
      {/* Pricing card with consistent, refined styling */}
      <div className="bg-card p-6 rounded-xl border border-border">
        {/* Header with consistent alignment */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-foreground">Pro Plan</span>
          <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            Popular
          </span>
        </div>

        {/* Price with harmonious proportions */}
        <div className="mb-6">
          <span className="text-4xl font-bold tracking-tight text-foreground">$29</span>
          <span className="text-sm text-muted-foreground ml-1">/month</span>
        </div>

        {/* Feature list with consistent 12px gap */}
        <ul className="space-y-3 mb-6">
          <li className="text-sm text-foreground flex items-center gap-2.5">
            <span className="text-success text-base leading-none">&#10003;</span>
            Unlimited projects
          </li>
          <li className="text-sm text-foreground flex items-center gap-2.5">
            <span className="text-success text-base leading-none">&#10003;</span>
            Priority support
          </li>
          <li className="text-sm text-foreground flex items-center gap-2.5">
            <span className="text-success text-base leading-none">&#10003;</span>
            Advanced analytics
          </li>
        </ul>

        {/* CTA button with matching border-radius */}
        <button className="w-full bg-primary text-primary-foreground font-medium py-2.5 px-4 rounded-lg text-sm">
          Get Started
        </button>
      </div>

      <p className="text-xs text-success mt-4">
        Consistent 24px padding, Tailwind type scale, uniform spacing (12px/16px/24px), harmonious radii
      </p>
    </div>
  );
}
