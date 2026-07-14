export function ActionableErrorsBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <label htmlFor="err-key-bad" className="text-sm font-medium text-foreground">
          API Key
        </label>
        <input
          id="err-key-bad"
          defaultValue="pk_live_8fj2..."
          aria-invalid="true"
          className="w-full px-3 py-2 text-sm bg-background border border-error rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        />
        <p className="text-sm text-error">Error: invalid input.</p>
      </div>
      <p className="text-xs text-error">
        Names the problem and stops. The user is left guessing what "invalid"
        means, and there is nothing to click
      </p>
    </div>
  );
}
