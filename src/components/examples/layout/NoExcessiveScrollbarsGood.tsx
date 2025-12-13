export function NoExcessiveScrollbarsGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-auto" style={{ maxHeight: '200px' }}>
        <h3 className="text-lg font-semibold mb-2 break-words">
          This is a very long title that extends beyond the container
        </h3>
        <p className="text-sm text-gray-600">
          Content that wraps properly and respects container bounds.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Additional content to demonstrate vertical scrolling when needed.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          More content here to show how the container handles overflow correctly.
        </p>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Content wraps properly, only vertical scroll when needed
      </p>
    </div>
  );
}
