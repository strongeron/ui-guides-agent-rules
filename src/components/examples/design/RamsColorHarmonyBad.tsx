export function RamsColorHarmonyBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Clashing Colors</h4>
        <div className="space-y-3 p-4 bg-muted rounded-lg">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-[var(--ex-clash-orange)] text-white rounded-md text-sm">
              Action
            </button>
            <button className="px-3 py-1.5 bg-[var(--ex-clash-purple)] text-white rounded-md text-sm">
              Another
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="text-[var(--ex-clash-green)]">Success: But wrong green</div>
            <div className="text-[var(--ex-clash-pink)]">Error: Hot pink instead of red</div>
            <div className="text-[var(--ex-clash-cyan)]">Warning: Cyan warning?</div>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">Random hex values that clash</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Colors from different palettes - visual chaos
      </p>
    </div>
  );
}
