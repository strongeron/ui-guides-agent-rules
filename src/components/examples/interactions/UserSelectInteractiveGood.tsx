export function UserSelectInteractiveGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium select-none">
          📋 Copy to Clipboard
        </button>
        <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium select-none">
          ⬇️ Download File
        </button>
        <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium select-none">
          🔗 Share Link
        </button>
      </div>
      <p className="text-xs text-success">
        user-select: none prevents accidental text selection
      </p>
    </div>
  );
}
