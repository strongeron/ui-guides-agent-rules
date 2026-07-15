export function LeadingTracksSizeGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-5">
        {/* Tight ratio on the large heading, roomy ratio on body */}
        <h4 className="max-w-[15rem] font-semibold text-foreground" style={{ fontSize: '28px', lineHeight: 1.1 }}>
          Design that works while you sleep
        </h4>
        <p className="mt-2 text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>
          Set up once and let the automations run. Your workspace stays tidy without a nightly babysitter.
        </p>
      </div>
      <p className="mt-4 text-xs text-success">
        Line-height scaled per size — ~1.1 on the heading holds it together, 1.6 keeps the body breathable.
      </p>
    </div>
  );
}
