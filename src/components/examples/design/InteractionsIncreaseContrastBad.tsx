export function InteractionsIncreaseContrastBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-2">
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors text-sm">
          Hover Me (same color)
        </button>
        <a href="#" className="block text-blue-600 hover:text-blue-600 text-sm">
          Link with no hover change
        </a>
      </div>
      <p className="text-xs text-error mt-4">
        No visual feedback on interaction states
      </p>
    </div>
  );
}
