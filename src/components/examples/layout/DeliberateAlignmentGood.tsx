export function DeliberateAlignmentGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">
          Card Title
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          This is some content text that appears in the card.
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            Action
          </button>
          <button className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500">
            Cancel
          </button>
        </div>
      </div>
      <p className="text-xs text-green-700 mt-4">
        All elements align to a consistent grid
      </p>
    </div>
  );
}
