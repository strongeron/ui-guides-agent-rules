const stats = [
  { value: '10x', label: 'Faster deploys' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '500M+', label: 'Events processed' },
];

export function HeroMetricTemplateBad() {
  return (
    <div className="w-full">
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Ship with confidence</h1>
        <p className="text-sm text-muted-foreground mt-2">The workflow platform for modern teams.</p>

        {/* Big number, small label, gradient accent, three across. The template. */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-gradient-to-b from-violet-500/10 to-transparent p-4">
              <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-2xl font-bold text-transparent">
                {s.value}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-error mt-4">
        Three identical gradient-accented stat blocks, and not one of them is measured. 10x faster
        than what? Whose uptime, over which window? These are round, unsourced numbers doing the
        job of visual furniture — the hero-metric template, decoration wearing the costume of proof.
      </p>
    </div>
  );
}
