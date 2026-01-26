export function MemorableDifferentiationGood() {
  return (
    <div className="w-full max-w-md">
      {/* Animated gradient border wrapper */}
      <div
        className="relative rounded-xl p-[2px] motion-safe:animate-[gradient-flow_4s_ease_infinite]"
        style={{
          background: 'linear-gradient(90deg, #f97316, #ec4899, #8b5cf6, #3b82f6, #10b981, #f97316)',
          backgroundSize: '300% 100%',
        }}
      >
        {/* Inner content with solid background */}
        <div className="rounded-[10px] p-8 bg-[var(--ex-memorable-bg)]">
          <h3 className="text-xl font-semibold mb-2 text-[var(--ex-memorable-title)]">
            Start your free trial
          </h3>
          <p className="text-sm mb-6 text-[var(--ex-memorable-body)]">
            Join thousands of teams already using our platform to boost productivity.
          </p>
          <button className="w-full px-6 py-3 rounded-lg text-sm font-medium transition-transform hover:scale-[1.02] bg-[var(--ex-memorable-button-bg)] text-[var(--ex-memorable-button-text)]">
            Get Started
          </button>
          <p className="text-xs text-center mt-3 text-[var(--ex-memorable-subtext)]">
            No credit card required
          </p>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Smooth flowing gradient border creates memorable visual interest
      </p>
    </div>
  );
}
