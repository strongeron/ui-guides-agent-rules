export function DesignVarietyBad() {
  return (
    <div className="w-full max-w-lg p-4 bg-[var(--ex-variety-bad-bg)] rounded-lg">
      <div className="grid grid-cols-3 gap-4">
        {/* Project Card 1 */}
        <div
          className="p-4 rounded-lg bg-[var(--ex-variety-bad-bg)] border border-[var(--ex-variety-bad-border)]"
        >
          <div
            className="w-full h-16 rounded-md mb-3 bg-[var(--ex-variety-bad-accent)]"
          />
          <h4
            className="text-sm font-medium mb-1 text-[var(--ex-variety-bad-title)]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Analytics Pro
          </h4>
          <p
            className="text-xs text-[var(--ex-variety-bad-body)]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Dashboard tool
          </p>
        </div>

        {/* Project Card 2 */}
        <div
          className="p-4 rounded-lg bg-[var(--ex-variety-bad-bg)] border border-[var(--ex-variety-bad-border)]"
        >
          <div
            className="w-full h-16 rounded-md mb-3 bg-[var(--ex-variety-bad-accent)]"
          />
          <h4
            className="text-sm font-medium mb-1 text-[var(--ex-variety-bad-title)]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            CloudSync
          </h4>
          <p
            className="text-xs text-[var(--ex-variety-bad-body)]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Storage solution
          </p>
        </div>

        {/* Project Card 3 */}
        <div
          className="p-4 rounded-lg bg-[var(--ex-variety-bad-bg)] border border-[var(--ex-variety-bad-border)]"
        >
          <div
            className="w-full h-16 rounded-md mb-3 bg-[var(--ex-variety-bad-accent)]"
          />
          <h4
            className="text-sm font-medium mb-1 text-[var(--ex-variety-bad-title)]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            TaskFlow
          </h4>
          <p
            className="text-xs text-[var(--ex-variety-bad-body)]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Project manager
          </p>
        </div>
      </div>
      <p className="text-xs text-destructive mt-4">
        Three identical cards: same Inter font, same blue accent, same white background, same rounded corners - completely interchangeable
      </p>
    </div>
  );
}
