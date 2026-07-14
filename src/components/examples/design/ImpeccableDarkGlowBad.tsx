const GLOW = 'shadow-[0_0_24px_rgba(139,92,246,0.55)]';

const CARDS = [
  { title: 'Latency', value: '128 ms' },
  { title: 'Throughput', value: '4.2k/s' },
  { title: 'Error rate', value: '0.03%' },
];

export function ImpeccableDarkGlowBad() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Metrics panel (dark surface)</p>

      <div className="rounded-lg bg-zinc-950 p-4">
        <div className="grid grid-cols-3 gap-3">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className={`rounded-lg bg-zinc-950 p-3 ring-1 ring-violet-500 ${GLOW}`}
            >
              <p className="text-xs font-semibold text-violet-400">{c.title}</p>
              <p className="mt-1 text-lg font-bold text-white">{c.value}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-error">
        Near-black surface plus a saturated 24px box-shadow bloom. Detector: background luminance below
        0.1 together with a box-shadow whose chroma is {'≥'} 30 and blur {'>'} 4px. The glow separates
        nothing — every card carries it, so it reads as decoration, not hierarchy.
      </p>
    </div>
  );
}
