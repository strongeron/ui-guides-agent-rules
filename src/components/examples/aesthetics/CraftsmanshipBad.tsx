export function CraftsmanshipBad() {
  return (
    <div className="w-full max-w-sm">
      {/* Pricing card with inconsistent, sloppy styling */}
      <div
        className="bg-card"
        style={{
          padding: '12px 8px 18px 14px', // Inconsistent padding on all sides
          borderRadius: '6px',
          border: '1px solid var(--border)',
        }}
      >
        {/* Header with misalignment */}
        <div className="flex items-center justify-between" style={{ marginBottom: '11px' }}>
          <span
            className="font-medium text-foreground"
            style={{ fontSize: '17px' }} // Arbitrary, not on type scale
          >
            Pro Plan
          </span>
          <span
            className="text-xs text-muted-foreground px-2 py-0.5"
            style={{
              backgroundColor: 'var(--muted)',
              borderRadius: '12px', // Different radius than card
            }}
          >
            Popular
          </span>
        </div>

        {/* Price with inconsistent spacing */}
        <div style={{ marginBottom: '14px' }}>
          <span
            className="font-bold text-foreground"
            style={{ fontSize: '31px' }} // Arbitrary size
          >
            $29
          </span>
          <span
            className="text-muted-foreground"
            style={{ fontSize: '13px', marginLeft: '3px' }} // Arbitrary margin
          >
            /month
          </span>
        </div>

        {/* Feature list with inconsistent spacing */}
        <ul style={{ marginBottom: '15px' }}>
          <li
            className="text-sm text-foreground flex items-center gap-2"
            style={{ marginBottom: '9px' }}
          >
            <span style={{ color: 'var(--success)', fontSize: '14px' }}>&#10003;</span>
            Unlimited projects
          </li>
          <li
            className="text-sm text-foreground flex items-center gap-2"
            style={{ marginBottom: '7px' }} // Different than above
          >
            <span style={{ color: 'var(--success)', fontSize: '12px' }}>&#10003;</span> {/* Different size */}
            Priority support
          </li>
          <li
            className="text-sm text-foreground flex items-center"
            style={{ gap: '10px' }} // Different gap
          >
            <span style={{ color: 'var(--success)', fontSize: '14px' }}>&#10003;</span>
            Advanced analytics
          </li>
        </ul>

        {/* CTA button */}
        <button
          className="w-full bg-primary text-primary-foreground font-medium"
          style={{
            padding: '10px 16px',
            borderRadius: '8px', // Yet another radius value
            fontSize: '14px',
          }}
        >
          Get Started
        </button>
      </div>

      <p className="text-xs text-destructive mt-4">
        Inconsistent padding (8/12/14/18px), arbitrary type sizes (13/14/17/31px), misaligned checkmarks, varied spacing
      </p>
    </div>
  );
}
