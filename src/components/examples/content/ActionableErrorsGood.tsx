export function ActionableErrorsGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <label htmlFor="err-key-good" className="text-sm font-medium text-foreground">
          API Key
        </label>
        <input
          id="err-key-good"
          defaultValue="pk_live_8fj2..."
          aria-invalid="true"
          aria-describedby="err-key-good-msg"
          className="w-full px-3 py-2 text-sm bg-background border border-error rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <p id="err-key-good-msg" className="text-sm text-error">
          This is a publishable key. Secret keys start with{' '}
          <code className="px-1 bg-muted rounded">sk_live_</code> — copy one
          from the dashboard.
        </p>
        <button className="px-3 py-2 bg-primary text-primary-foreground text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Open Key Dashboard
        </button>
      </div>
      <p className="text-xs text-success">
        Says what's wrong, what correct looks like, and gives the user the next
        step as a control
      </p>
    </div>
  );
}
