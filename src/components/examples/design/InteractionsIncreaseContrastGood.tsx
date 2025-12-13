export function InteractionsIncreaseContrastGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-2">
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm">
          Hover Me (darkens)
        </button>
        <a href="#" className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded text-sm">
          Link darkens on hover
        </a>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Clear visual feedback with increased contrast
      </p>
    </div>
  );
}
