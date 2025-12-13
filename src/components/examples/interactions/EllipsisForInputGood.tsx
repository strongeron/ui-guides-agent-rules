export function EllipsisForInputGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-2 bg-gray-100 rounded-lg p-4">
        <button className="w-full text-left px-3 py-2 bg-white rounded hover:bg-gray-50 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          Open
        </button>
        <button className="w-full text-left px-3 py-2 bg-white rounded hover:bg-gray-50 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          Save
        </button>
        <button className="w-full text-left px-3 py-2 bg-white rounded hover:bg-gray-50 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          Rename…
        </button>
        <button className="w-full text-left px-3 py-2 bg-white rounded hover:bg-gray-50 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          Delete…
        </button>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Ellipsis signals actions that open dialogs for further input
      </p>
    </div>
  );
}
