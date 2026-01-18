export function DeliberateAlignmentBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2" style={{ marginLeft: '3px' }}>
          Card Title
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          This is some content text that appears in the card.
        </p>
        <div className="flex gap-2" style={{ marginLeft: '5px' }}>
          <button className="px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded">
            Action
          </button>
          <button className="px-3 py-1.5 bg-muted text-foreground text-sm rounded">
            Cancel
          </button>
        </div>
      </div>
      <p className="text-xs text-error mt-4">
        Random offsets create visual chaos
      </p>
    </div>
  );
}
