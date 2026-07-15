export function LeadingTracksSizeBad() {
  return (
    <div className="w-full max-w-sm">
      {/* One line-height (1.6) inherited by every size */}
      <div className="rounded-lg border border-border bg-card p-5" style={{ lineHeight: 1.6 }}>
        <h4 className="max-w-[15rem] font-semibold text-foreground" style={{ fontSize: '28px' }}>
          Design that works while you sleep
        </h4>
        <p className="mt-2 text-sm text-muted-foreground">
          Set up once and let the automations run. Your workspace stays tidy without a nightly babysitter.
        </p>
      </div>
      <p className="mt-4 text-xs text-destructive">
        1.6 everywhere: the heading’s two lines drift apart and stop reading as one title.
      </p>
    </div>
  );
}
