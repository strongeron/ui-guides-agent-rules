export function CompleteThemeBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Incomplete Token Set</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-blue-600 text-white rounded">
            <span className="text-sm">primary</span>
            <span className="text-xs text-blue-200">hardcoded white</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-200 text-gray-800 rounded">
            <span className="text-sm">secondary</span>
            <span className="text-xs text-gray-500">hardcoded gray-800</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-100 text-gray-600 rounded">
            <span className="text-sm">muted</span>
            <span className="text-xs text-gray-400">no foreground token</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-red-600 text-white rounded">
            <span className="text-sm">destructive</span>
            <span className="text-xs text-red-200">hardcoded white</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border">
          <input
            type="text"
            placeholder="No ring color defined"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <p className="text-xs text-error">
        Missing foreground tokens; hardcoded colors everywhere
      </p>
    </div>
  );
}
