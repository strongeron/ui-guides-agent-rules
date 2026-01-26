export function MemorableDifferentiationBad() {
  return (
    <div className="w-full max-w-md">
      <div
        className="p-8 rounded-lg bg-[var(--ex-memorable-bg)] border border-[var(--ex-memorable-border)]"
      >
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
          className="w-full px-6 py-3 rounded-lg text-sm font-medium bg-[var(--ex-memorable-button-bg)] text-[var(--ex-memorable-button-text)]"
        >
          Get Started
        </button>
        <p
          className="text-xs text-center mt-3 text-[var(--ex-memorable-subtext)]"
        >
          No credit card required
        </p>
      </div>
      <p className="text-xs text-destructive mt-4">
        Generic CTA: nothing memorable, looks like every other SaaS landing page
      </p>
    </div>
  );
}
