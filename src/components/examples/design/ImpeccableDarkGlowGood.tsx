const CARDS = [
  { title: 'Latency', value: '128 ms', surface: 'bg-zinc-900' },
  { title: 'Throughput', value: '4.2k/s', surface: 'bg-zinc-800' },
  { title: 'Error rate', value: '0.03%', surface: 'bg-zinc-700' },
];

export function ImpeccableDarkGlowGood() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Metrics panel (dark surface)</p>

      <div className="rounded-lg bg-zinc-950 p-4">
        <div className="grid grid-cols-3 gap-3">
          {CARDS.map((c) => (
            <div key={c.title} className={`rounded-lg ${c.surface} p-3`}>
              <p className="text-xs font-medium text-zinc-400">{c.title}</p>
              <p className="mt-1 text-lg font-bold text-white">{c.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-zinc-400">
          Elevation comes from lightness: 15% / 20% / 25% surfaces on a near-black base.
        </p>
      </div>

      <p className="text-xs text-success">
        Depth on dark comes from a surface lightness scale, not from light spilling out of an element.
        No shadows, no chroma in the elevation — background luminance stays low without any glow.
      </p>
    </div>
  );
}
