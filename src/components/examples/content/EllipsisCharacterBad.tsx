export function EllipsisCharacterBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex justify-between items-center">
            <span>Rename...</span>
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex justify-between items-center">
            <span>Save as...</span>
          </button>
          <div className="px-4 py-2 text-gray-500">
            Loading...
          </div>
        </div>
        <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs text-red-800 font-mono">
            Using three periods: ... (U+002E × 3)
          </p>
          <p className="text-xs text-red-700 mt-1">
            Wider spacing, looks unprofessional
          </p>
        </div>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Three periods (...) instead of ellipsis character
      </p>
    </div>
  );
}
