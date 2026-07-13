const rows = Array.from({ length: 20 }, (_, i) => i);

export function GpuTranslateZBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <style>{`
        /* Every descendant gets promoted, whether it moves or not. */
        .force-gpu-all * { transform: translateZ(0); will-change: transform; }
        @keyframes gpuSlide { from { transform: translateX(0); } to { transform: translateX(140px); } }
      `}</style>

      <div className="force-gpu-all bg-card border border-border rounded-lg p-3">
        <div className="relative h-8 mb-2 rounded bg-muted/50 overflow-hidden">
          <div
            className="absolute top-1 size-6 rounded bg-primary"
            style={{ animation: 'gpuSlide 1.4s ease-in-out infinite alternate' }}
          />
        </div>
        <div className="max-h-28 overflow-y-auto space-y-1 pr-1">
          {rows.map((i) => (
            <div key={i} className="p-1.5 bg-muted rounded text-xs">
              Static row {i + 1}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-destructive">
        Only the blue square moves, but <code>* &#123; translateZ(0) &#125;</code> promotes all 20 static rows to their
        own GPU layers too, burning memory for nothing
      </p>
    </div>
  );
}
