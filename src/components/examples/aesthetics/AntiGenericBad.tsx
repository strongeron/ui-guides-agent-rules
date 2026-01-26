export function AntiGenericBad() {
  return (
    <div className="w-full max-w-md">
      {/* Intentionally styled card demonstrating generic SaaS aesthetics */}
      <div
        className="p-6 rounded-3xl bg-[image:var(--ex-anti-generic-bg)]"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[var(--ex-anti-generic-icon-bg)] flex items-center justify-center mb-4">
            <span className="text-2xl">✨</span>
          </div>
          <h3 className="text-xl font-semibold text-[var(--ex-anti-generic-title)] mb-2">
            AI-Powered Solution
          </h3>
          <p className="text-sm text-[var(--ex-anti-generic-body)] mb-4">
            Supercharge your workflow with our next-generation platform.
            Unlock your potential today!
          </p>
          <button
            className="px-6 py-2.5 rounded-full text-sm font-medium bg-[var(--ex-anti-generic-button-bg)] text-[var(--ex-anti-generic-button-text)] backdrop-blur"
          >
            Get Started Free
          </button>
        </div>
      </div>
      <p className="text-xs text-destructive mt-4">
        Generic Inter font, purple gradient, centered layout, excessive rounding, sparkle emoji
      </p>
    </div>
  );
}
