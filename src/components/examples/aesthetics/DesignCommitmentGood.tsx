export function DesignCommitmentGood() {
  return (
    <div className="w-full max-w-md p-4 bg-[var(--ex-commitment-bg)] rounded-lg">
      {/* Intentionally dark background to show bold, committed design */}
      <div className="p-8 bg-[var(--ex-commitment-bg)] border border-[var(--ex-commitment-border)] rounded-lg">
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ex-commitment-accent)]">
            Launch Ready
          </span>
          <h2 className="text-2xl font-bold mt-2 mb-3 text-[var(--ex-commitment-title)] tracking-tight">
            Build Something Bold
          </h2>
          <p className="text-sm mb-6 text-[var(--ex-commitment-body)] leading-relaxed">
            No half-measures. Commit to your vision and execute with precision.
            Your product deserves an interface as confident as your ambition.
          </p>
          <button className="px-6 py-2.5 text-sm font-semibold bg-[var(--ex-commitment-button-bg)] text-[var(--ex-commitment-button-text)] rounded">
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
