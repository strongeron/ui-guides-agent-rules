const week = [
  { day: 'Mon', runs: 62 },
  { day: 'Tue', runs: 81 },
  { day: 'Wed', runs: 74 },
  { day: 'Thu', runs: 96 },
  { day: 'Fri', runs: 100 },
];

export function HeroMetricTemplateGood() {
  return (
    <div className="w-full">
      <div className="rounded-lg border border-border bg-card p-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Ship with confidence</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-prose">
          The workflow platform for modern teams.
        </p>

        {/* One metric, and it is real: this account's own data, sourced and timestamped */}
        <div className="mt-6 rounded-md border border-border p-4">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-semibold tabular-nums text-foreground">2,847</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                deploys your team shipped this week
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
              live · updated 2 min ago
            </span>
          </div>

          <div className="flex items-end gap-1.5 h-12 mt-4" role="img" aria-label="Deploys per day, Monday through Friday">
            {week.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-sm bg-muted-foreground/30" style={{ height: `${d.runs}%` }} />
                <span className="text-[9px] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        One prominent number, and it is the user&rsquo;s own: a real count, from live data, with a
        timestamp and the series behind it. A metric earns hero placement when it is evidence; when
        it cannot be sourced, cut it and show the product instead.
      </p>
    </div>
  );
}
