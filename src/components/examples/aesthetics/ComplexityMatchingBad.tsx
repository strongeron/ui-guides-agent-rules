export function ComplexityMatchingBad() {
  return (
    <div className="w-full max-w-md">
      {/* Intentionally light-themed card demonstrating over-designed aesthetics */}
      <div
        className="p-6 rounded-xl relative overflow-hidden bg-[image:var(--ex-complex-bad-bg)] border border-[var(--ex-complex-bad-border)] shadow-[var(--ex-complex-bad-shadow)]"
      >
        {/* Excessive blur effect */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[image:var(--ex-complex-bad-blob-1)] blur-[30px]"
        />
        <div
          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[image:var(--ex-complex-bad-blob-2)] blur-[25px]"
        />

        <div className="relative z-10">
          <span
            className="inline-block text-xs font-medium tracking-wider uppercase mb-3 px-2 py-1 rounded-full bg-[image:var(--ex-complex-bad-tag-bg)] text-[var(--ex-complex-bad-tag-text)]"
          >
            Simple Note
          </span>
          <h3
            className="text-lg font-medium mb-2 text-[var(--ex-complex-bad-title)]"
            style={{ textShadow: 'var(--ex-complex-bad-title-shadow)' }}
          >
            Meeting reminder
          </h3>
          <p
            className="text-sm mb-4 text-[var(--ex-complex-bad-body)]"
            style={{ lineHeight: '1.6' }}
          >
            Team standup at 10:00 AM
          </p>
          <button
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 bg-[image:var(--ex-complex-bad-button-bg)] text-[var(--ex-complex-bad-button-text)] shadow-[var(--ex-complex-bad-button-shadow)]"
          >
            Dismiss
          </button>
        </div>
      </div>
      <p className="text-xs text-destructive mt-4">
        Minimalist content with maximalist styling: layered shadows, gradients, blurs, and glows overwhelm a simple note
      </p>
    </div>
  );
}
