export function TrackingIsSizeSpecificBad() {
  return (
    <div className="w-full max-w-sm">
      {/* One tracking value (0) applied across every size */}
      <div className="rounded-lg border border-border bg-card p-5" style={{ letterSpacing: '0' }}>
        <p className="text-foreground" style={{ fontSize: '40px', lineHeight: 1.05, fontWeight: 700 }}>
          Ship faster
        </p>
        <p className="mt-3 text-muted-foreground uppercase" style={{ fontSize: '11px', fontWeight: 600 }}>
          Updated 3 minutes ago
        </p>
      </div>
      <p className="mt-4 text-xs text-destructive">
        One tracking value for all sizes: the display line reads loose and airy, the tiny caps read cramped.
      </p>
    </div>
  );
}
