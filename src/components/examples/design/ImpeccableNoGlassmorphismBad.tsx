const BANDS = [
  'bg-white',
  'bg-amber-200',
  'bg-slate-900',
  'bg-white',
  'bg-violet-900',
  'bg-amber-100',
];

export function ImpeccableNoGlassmorphismBad() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Scroll inside the panel — watch the glass cards.</p>

      <div className="relative h-56 overflow-hidden rounded-lg bg-gradient-to-br from-fuchsia-600 via-violet-500 to-amber-300">
        <div className="absolute inset-0 overflow-y-auto">
          {BANDS.map((band, i) => (
            <div key={i} className={`h-24 ${band} opacity-80`} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-4 top-4 space-y-2">
          {['Revenue', 'Active seats', 'Churn'].map((label) => (
            <div
              key={label}
              className="rounded-lg border border-white/25 bg-white/10 px-3 py-2 backdrop-blur-lg"
            >
              <p className="text-xs font-semibold text-white">{label}</p>
              <p className="text-xs text-white/70">Updated 2 minutes ago</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-error">
        Every card is glass by default. `backdrop-filter: blur()` costs paint time on each scroll frame,
        and the effective contrast of the label depends on whatever happens to be behind it — legible over
        the dark band, unreadable over the white one. Nothing is measurable.
      </p>
    </div>
  );
}
