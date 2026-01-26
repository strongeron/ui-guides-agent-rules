export function IbelickMinimizePaintGood() {
  return (
    <div className="space-y-4">
      <button className="group relative px-6 py-3 rounded-lg font-medium overflow-hidden">
        {/* Base layer */}
        <span className="absolute inset-0 bg-[image:var(--ex-min-paint-good-base)]" />
        {/* Hover layer - uses opacity transition */}
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[image:var(--ex-min-paint-good-hover)]" />
        <span className="relative text-white">Hover Me</span>
      </button>
      <p className="text-xs text-success">
        Using opacity transition on layered elements instead of animating the gradient
      </p>
    </div>
  );
}
