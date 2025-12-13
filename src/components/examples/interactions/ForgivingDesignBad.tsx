export function ForgivingDesignBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-700">Volume:</span>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-32 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{ accentColor: '#2563eb' }}
          />
        </div>
        <div className="flex items-center gap-4 mb-4">
          <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3z" />
            </svg>
          </button>
          <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 17a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 17z" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Small hit targets (24px) are hard to tap on mobile. Slider track is thin and difficult to grab.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Tiny hit targets require precise tapping
      </p>
    </div>
  );
}
