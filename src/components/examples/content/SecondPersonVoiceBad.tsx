export function SecondPersonVoiceBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h4 className="font-medium text-foreground">Build Failed</h4>
        <p className="text-sm text-muted-foreground">
          We were unable to complete the build. I would recommend that we check
          the logs together. We have saved our progress, and we will notify our
          team if we detect the issue again.
        </p>
        <button className="px-3 py-2 bg-muted text-foreground text-sm rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
          Let Us Retry
        </button>
      </div>
      <p className="text-xs text-error">
        Six first-person pronouns, zero "you" — the copy is about the product,
        not about the person who has to fix the build
      </p>
    </div>
  );
}
