export function RamsColorContrastBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Poor UI Contrast</h4>
        <div className="space-y-3 p-4 bg-background rounded-lg">
          <input
            type="text"
            placeholder="Hard to see border"
            className="w-full px-3 py-2 border border-gray-200 rounded-md bg-background text-sm"
          />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-200 text-gray-400 rounded-md text-sm">
              Primary
            </button>
            <button className="px-4 py-2 border border-gray-200 text-gray-400 rounded-md text-sm">
              Secondary
            </button>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">border-gray-200 (~1.5:1 contrast)</code>
        </div>
      </div>
      <p className="text-xs text-error">
        UI elements nearly invisible - where are the boundaries?
      </p>
    </div>
  );
}
