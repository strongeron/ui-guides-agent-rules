export function ThrottleProfilingBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Performance Testing</h3>
        <div className="space-y-3">
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-mono">CPU:</span>
              <span className="text-muted-foreground">No throttling</span>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-mono">Network:</span>
              <span className="text-muted-foreground">No throttling</span>
            </div>
          </div>
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-sm text-green-800">
              <div className="font-medium">Results</div>
              <div className="text-xs mt-1">FCP: 0.3s • LCP: 0.8s • TBT: 10ms</div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Testing on a fast dev machine doesn't reflect real user experience on slower devices.
        </p>
      </div>
      <p className="text-xs text-error mt-4">
        No throttling - results don't reflect real users
      </p>
    </div>
  );
}
