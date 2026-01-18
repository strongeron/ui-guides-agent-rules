export function TouchActionBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex gap-2 mb-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Button 1
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Button 2
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          On mobile, rapidly tapping these buttons triggers double-tap zoom instead of the click. There's a ~300ms delay on each tap.
        </p>
        <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-2">
          <code className="text-xs text-red-800 font-mono">
            No touch-action set
          </code>
        </div>
      </div>
      <p className="text-xs text-error mt-4">
        300ms tap delay on mobile due to double-tap zoom detection
      </p>
    </div>
  );
}
