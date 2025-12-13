export function TouchActionGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex gap-2 mb-4">
          <button className="touch-manipulation px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Button 1
          </button>
          <button className="touch-manipulation px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Button 2
          </button>
        </div>
        <p className="text-sm text-gray-600">
          touch-action: manipulation removes the double-tap zoom delay. Taps register instantly on mobile.
        </p>
        <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-2">
          <code className="text-xs text-green-800 font-mono">
            touch-action: manipulation
          </code>
        </div>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Instant tap response with touch-action: manipulation
      </p>
    </div>
  );
}
