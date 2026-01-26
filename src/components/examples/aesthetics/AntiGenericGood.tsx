export function AntiGenericGood() {
  return (
    <div className="w-full max-w-md">
      {/* Intentionally dark-themed card demonstrating distinctive brand aesthetics */}
      <div
        className="p-6 bg-[var(--ex-anti-good-bg)] border border-[var(--ex-anti-good-border)]"
      >
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[var(--ex-anti-good-accent)]"
          >
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <div className="text-left">
            <h3
              className="text-xl font-bold mb-1 text-[var(--ex-anti-good-title)]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                letterSpacing: '-0.01em',
              }}
            >
              Workflow Engine
            </h3>
            <p
              className="text-sm mb-4 text-[var(--ex-anti-good-body)]"
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                lineHeight: '1.6',
              }}
            >
              Structured automation for teams who value precision over hype.
            </p>
            <button
              className="px-4 py-2 text-sm font-medium bg-[var(--ex-anti-good-button-bg)] text-[var(--ex-anti-good-button-text)]"
            >
              Start Building
            </button>
          </div>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Distinctive serif typography, bold single accent color, asymmetric layout, crisp edges
      </p>
    </div>
  );
}
