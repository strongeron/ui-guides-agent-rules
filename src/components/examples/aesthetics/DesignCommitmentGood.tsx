export function DesignCommitmentGood() {
  return (
    <div className="w-full max-w-md p-4 bg-neutral-950 rounded-lg">
      {/* Intentionally dark background to show bold, committed design */}
      <div className="p-8 bg-neutral-950 border border-neutral-800 rounded-lg">
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-green-500">
            Launch Ready
          </span>
          <h2 className="text-2xl font-bold mt-2 mb-3 text-neutral-50 tracking-tight">
            Build Something Bold
          </h2>
          <p className="text-sm mb-6 text-neutral-400 leading-relaxed">
            No half-measures. Commit to your vision and execute with precision.
            Your product deserves an interface as confident as your ambition.
          </p>
          <button className="px-6 py-2.5 text-sm font-semibold bg-green-500 text-neutral-950 rounded">
            Start Building
          </button>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Deep black dominant, vibrant green accent, strong typography - fully committed
      </p>
    </div>
  );
}
