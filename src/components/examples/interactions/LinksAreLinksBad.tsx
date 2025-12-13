export function LinksAreLinksBad() {
  const handleClick = () => {
    alert('Navigating to dashboard...');
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Your Projects</h3>
        <button
          onClick={handleClick}
          className="text-blue-600 hover:text-blue-700 hover:underline"
        >
          View Dashboard
        </button>
      </div>
      <p className="text-xs text-gray-500">
        Try right-clicking or Cmd+clicking - no context menu, can't open in new tab
      </p>
    </div>
  );
}
