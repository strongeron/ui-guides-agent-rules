export function UserSelectInteractiveBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
          📋 Copy to Clipboard
        </button>
        <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
          ⬇️ Download File
        </button>
        <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
          🔗 Share Link
        </button>
      </div>
      <p className="text-xs text-error">
        Try clicking and dragging — text inside buttons gets selected
      </p>
    </div>
  );
}
