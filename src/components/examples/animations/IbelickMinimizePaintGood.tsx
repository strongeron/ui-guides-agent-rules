export function IbelickMinimizePaintGood() {
  return (
    <div className="space-y-4">
      <button className="group relative px-6 py-3 rounded-lg font-medium overflow-hidden">
        {/* Base layer */}
        <span
          className="absolute inset-0 bg-primary"
          style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
        />
        {/* Hover layer - uses opacity transition */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(90deg, #8b5cf6, #ec4899)' }}
        />
        <span className="relative text-white">Hover Me</span>
      </button>
      <p className="text-xs text-success">
        Using opacity transition on layered elements instead of animating the gradient
      </p>
    </div>
  );
}
