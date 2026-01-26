export function IbelickMinimizePaintBad() {
  return (
    <div className="space-y-4">
      <button
        className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 bg-[image:var(--ex-min-paint-bad-gradient)] shadow-[var(--ex-min-paint-bad-shadow)] hover:bg-[image:var(--ex-min-paint-bad-gradient-hover)] hover:shadow-[var(--ex-min-paint-bad-shadow-hover)]"
      >
        Hover Me
      </button>
      <p className="text-xs text-destructive">
        Animating gradients and box-shadows triggers expensive paint operations
      </p>
    </div>
  );
}
