export function DesignCommitmentGood() {
  return (
    <div className="w-full max-w-md">
      <div
        className="p-8"
        style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid #1a1a1a',
        }}
      >
        <div>
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: '#22c55e' }}
          >
            Launch Ready
          </span>
          <h2
            className="text-2xl font-bold mt-2 mb-3"
            style={{
              color: '#fafafa',
              letterSpacing: '-0.025em',
            }}
          >
            Build Something Bold
          </h2>
          <p
            className="text-sm mb-6"
            style={{
              color: '#a1a1aa',
              lineHeight: '1.6',
            }}
          >
            No half-measures. Commit to your vision and execute with precision.
            Your product deserves an interface as confident as your ambition.
          </p>
          <button
            className="px-6 py-2.5 text-sm font-semibold"
            style={{
              backgroundColor: '#22c55e',
              color: '#0a0a0a',
              border: 'none',
            }}
          >
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
