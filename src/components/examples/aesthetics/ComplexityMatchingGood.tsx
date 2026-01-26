export function ComplexityMatchingGood() {
  return (
    <div className="w-full max-w-md">
      {/* Intentionally light-themed card demonstrating minimal aesthetics */}
      <div
        className="p-6 rounded-lg bg-[var(--ex-complex-good-bg)] border border-[var(--ex-complex-good-border)] shadow-[var(--ex-complex-good-shadow)]"
      >
        <span
          className="inline-block text-xs font-medium tracking-wider uppercase mb-3 text-[var(--ex-complex-good-tag)]"
        >
          Simple Note
        </span>
        <h3
          className="text-lg font-medium mb-2 text-[var(--ex-complex-good-title)]"
        >
          Meeting reminder
        </h3>
        <p
          className="text-sm mb-4 text-[var(--ex-complex-good-body)]"
          style={{ lineHeight: '1.5' }}
        >
          Team standup at 10:00 AM
        </p>
        <button
          className="px-4 py-2 text-sm font-medium rounded-md bg-[var(--ex-complex-good-button-bg)] text-[var(--ex-complex-good-button-text)]"
        >
          Dismiss
        </button>
      </div>
      <p className="text-xs text-success mt-4">
        Minimal content, minimal styling: clean border, single subtle shadow, restrained typography
      </p>
    </div>
  );
}
