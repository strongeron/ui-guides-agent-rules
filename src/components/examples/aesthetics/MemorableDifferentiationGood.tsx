export function MemorableDifferentiationGood() {
  return (
    <div className="w-full max-w-md">
      {/* Container with animated gradient border */}
      <div
        className="relative p-8 rounded-lg overflow-hidden bg-[var(--ex-memorable-bg)]"
      >
        {/* Animated gradient border */}
        <div
          className="absolute inset-0 rounded-lg motion-safe:animate-[spin_4s_linear_infinite]"
          style={{
            backgroundImage: 'var(--ex-memorable-border-gradient)',
            padding: '2px',
            maskImage: 'var(--ex-memorable-mask)',
            maskComposite: 'exclude',
            WebkitMaskImage: 'var(--ex-memorable-mask)',
            WebkitMaskComposite: 'xor',
          }}
        />
        {/* Inner content container */}
        <div className="relative">
          <h3
            className="text-xl font-semibold mb-2 text-[var(--ex-memorable-title)]"
          >
            Start your free trial
          </h3>
          <p
            className="text-sm mb-6 text-[var(--ex-memorable-body)]"
          >
            Join thousands of teams already using our platform to boost productivity.
          </p>
          <button
            className="w-full px-6 py-3 rounded-lg text-sm font-medium transition-transform hover:scale-[1.02] bg-[var(--ex-memorable-button-bg)] text-[var(--ex-memorable-button-text)]"
          >
            Get Started
          </button>
          <p
            className="text-xs text-center mt-3 text-[var(--ex-memorable-subtext)]"
          >
            No credit card required
          </p>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        One memorable element: animated gradient border that draws the eye
      </p>
    </div>
  );
}
