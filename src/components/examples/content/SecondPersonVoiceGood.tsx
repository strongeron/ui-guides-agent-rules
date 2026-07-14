export function SecondPersonVoiceGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h4 className="font-medium text-foreground">Build Failed</h4>
        <p className="text-sm text-muted-foreground">
          Your build stopped at the install step. Check the logs to see which
          package failed, then retry. Your changes are saved.
        </p>
        <button className="px-3 py-2 bg-primary text-primary-foreground text-sm rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
          View Build Logs
        </button>
      </div>
      <p className="text-xs text-success">
        Second person keeps the subject on the reader: your build, your logs,
        your next move
      </p>
    </div>
  );
}
