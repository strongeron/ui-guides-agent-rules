export function TrackingIsSizeSpecificGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-5">
        {/* Display: tightened. Caption: loosened. Each size spaced for itself. */}
        <p
          className="text-foreground"
          style={{ fontSize: '40px', lineHeight: 1.05, fontWeight: 700, letterSpacing: '-0.02em' }}
        >
          Ship faster
        </p>
        <p
          className="mt-3 text-muted-foreground uppercase"
          style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}
        >
          Updated 3 minutes ago
        </p>
      </div>
      <p className="mt-4 text-xs text-success">
        Negative tracking on the display size, a positive nudge on the caption — best done via a variable font’s
        optical-sizing axis.
      </p>
    </div>
  );
}
