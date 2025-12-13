export function KeyboardEverywhereBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="font-medium mb-2">Menu</h3>
        <div className="space-y-2">
          <div
            onClick={() => alert('Edit clicked')}
            className="px-3 py-2 bg-white rounded cursor-pointer hover:bg-gray-50"
          >
            Edit
          </div>
          <div
            onClick={() => alert('Delete clicked')}
            className="px-3 py-2 bg-white rounded cursor-pointer hover:bg-gray-50"
          >
            Delete
          </div>
          <div
            onClick={() => alert('Share clicked')}
            className="px-3 py-2 bg-white rounded cursor-pointer hover:bg-gray-50"
          >
            Share
          </div>
        </div>
      </div>
      <p className="text-xs text-red-700">
        Div elements can't be reached or activated via keyboard
      </p>
    </div>
  );
}
