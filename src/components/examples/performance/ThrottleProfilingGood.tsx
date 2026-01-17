export function ThrottleProfilingGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Performance Testing</h3>
        <div className="space-y-3">
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-mono text-yellow-800">CPU:</span>
              <span className="text-yellow-700">4x slowdown</span>
            </div>
          </div>
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-mono text-yellow-800">Network:</span>
              <span className="text-yellow-700">Fast 3G (562 kB/s)</span>
            </div>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-800">
              <div className="font-medium">Realistic Results</div>
              <div className="text-xs mt-1">FCP: 1.8s • LCP: 3.2s • TBT: 180ms</div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Throttling reveals performance issues users on slower devices will experience.
        </p>
      </div>
      <p className="text-xs text-green-700 mt-4">
        CPU + network throttling shows realistic performance
      </p>
    </div>
  );
}
