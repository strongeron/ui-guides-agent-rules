export function DeviceMatrixBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Testing Checklist</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-success rounded-sm flex items-center justify-center">
              <svg className="w-3 h-3 text-success-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm">Chrome Desktop</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-border rounded-sm" />
            <span className="text-sm text-muted-foreground">Firefox</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-border rounded-sm" />
            <span className="text-sm text-muted-foreground">Safari</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-border rounded-sm" />
            <span className="text-sm text-muted-foreground">iOS Low Power Mode</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-border rounded-sm" />
            <span className="text-sm text-muted-foreground">Android</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Only tested on Chrome. Other browsers and devices may have different behavior.
        </p>
      </div>
      <p className="text-xs text-error mt-4">
        Chrome-only testing misses Safari and mobile issues
      </p>
    </div>
  );
}
