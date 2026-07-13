const rows = Array.from({ length: 20 }, (_, i) => i);

export function GpuTranslateZGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <style>{`
        @keyframes gpuSlide { from { transform: translateX(0); } to { transform: translateX(140px); } }
      `}</style>

      <div className="bg-card border border-border rounded-lg p-3">
        <div className="relative h-8 mb-2 rounded bg-muted/50 overflow-hidden">
          {/* Only the element that actually animates is promoted. */}
          <div
            className="absolute top-1 size-6 rounded bg-primary"
            style={{ animation: 'gpuSlide 1.4s ease-in-out infinite alternate', willChange: 'transform' }}
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

      <p className="text-xs text-success">
        The same motion, but only the moving square is promoted. The 20 static rows stay on the normal paint path and
        cost no GPU memory
      </p>
    </div>
  );
}
