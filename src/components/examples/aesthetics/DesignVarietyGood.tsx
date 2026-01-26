export function DesignVarietyGood() {
  return (
    <div className="w-full max-w-lg">
      <div className="grid grid-cols-3 gap-4">
        {/* Project Card 1 - Dark & Bold */}
        <div
          className="p-4 bg-[var(--ex-variety-good-1-bg)] border border-[var(--ex-variety-good-1-border)]"
        >
          <div
            className="w-full h-16 mb-3 flex items-center justify-center bg-[image:var(--ex-variety-good-1-accent)]"
          >
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <h4
            className="text-sm font-bold mb-1 text-[var(--ex-variety-good-1-title)]"
            style={{
              fontFamily: "'Space Mono', monospace",
              letterSpacing: '-0.02em',
            }}
          >
            Analytics Pro
          </h4>
          <p
            className="text-xs text-[var(--ex-variety-good-1-body)]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Raw data power
          </p>
        </div>

        {/* Project Card 2 - Light & Elegant */}
        <div
          className="p-4 rounded-2xl bg-[var(--ex-variety-good-2-bg)] border border-[var(--ex-variety-good-2-border)]"
        >
          <div
            className="w-full h-16 rounded-xl mb-3 flex items-center justify-center bg-[var(--ex-variety-good-2-accent-bg)] border border-[var(--ex-variety-good-2-border)]"
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '24px',
              }}
              className="text-[var(--ex-variety-good-2-letter)]"
            >
              C
            </span>
          </div>
          <h4
            className="text-sm mb-1 text-[var(--ex-variety-good-2-title)]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 500,
            }}
          >
            CloudSync
          </h4>
          <p
            className="text-xs italic text-[var(--ex-variety-good-2-body)]"
            style={{ fontFamily: "'Source Serif 4', serif" }}
          >
            Refined storage
          </p>
        </div>

        {/* Project Card 3 - Colorful & Playful */}
        <div
          className="p-4 rounded-3xl bg-[image:var(--ex-variety-good-3-bg)] border-2 border-[var(--ex-variety-good-3-border)]"
        >
          <div
            className="w-full h-16 rounded-2xl mb-3 flex items-center justify-center bg-[var(--ex-variety-good-3-accent-bg)] shadow-[var(--ex-variety-good-3-accent-shadow)]"
          >
            <span
              style={{
                fontSize: '24px',
                fontWeight: 800,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              className="bg-clip-text text-transparent bg-[image:var(--ex-variety-good-3-letter)]"
            >
              T
            </span>
          </div>
          <h4
            className="text-sm font-extrabold mb-1 text-[var(--ex-variety-good-3-title)]"
            style={{
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            TaskFlow
          </h4>
          <p
            className="text-xs font-medium text-[var(--ex-variety-good-3-body)]"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Joyful productivity
          </p>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Three distinct personalities: dark/bold, light/elegant, colorful/playful - each memorable and differentiated
      </p>
    </div>
  );
}
