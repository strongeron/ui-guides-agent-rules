export function ClearFocusGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <h3 className="text-sm font-medium">Unsaved changes</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Your edits haven't been saved yet.
        </p>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button className="rounded-md px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card transition-colors">
            Cancel
          </button>
          <button className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card transition-colors">
            Discard
          </button>
          <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card transition-colors">
            Save changes
          </button>
        </div>
      </div>
      <p className="text-xs text-success">
        Tab through to see clear focus rings (keyboard only)
      </p>
    </div>
  );
}
