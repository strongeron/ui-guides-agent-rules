export function DisabledNoTooltipsGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div>
          <button
            aria-disabled="true"
            className="px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={(e) => e.preventDefault()}
          >
            Delete Project
          </button>
          <p className="text-xs text-muted-foreground mt-2">
            You need admin access to delete this project.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">The reason is always visible — no tooltip needed.</p>
      </div>
      <p className="text-xs text-success">aria-disabled + visible explanation — accessible to everyone</p>
    </div>
  );
}
