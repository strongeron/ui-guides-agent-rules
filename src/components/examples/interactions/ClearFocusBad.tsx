export function ClearFocusBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <style>{`
        .no-focus-ring:focus,
        .no-focus-ring:focus-visible {
          outline: none;
          box-shadow: none;
        }
      `}</style>
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <h3 className="text-sm font-medium">Unsaved changes</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Your edits haven't been saved yet.
        </p>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button className="no-focus-ring rounded-md px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            Cancel
          </button>
          <button className="no-focus-ring rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
            Discard
          </button>
          <button className="no-focus-ring rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Save changes
          </button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Try tabbing through — no visible focus indicator
      </p>
    </div>
  );
}
