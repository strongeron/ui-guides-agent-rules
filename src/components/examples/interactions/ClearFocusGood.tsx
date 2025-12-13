export function ClearFocusGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors">
        Button 1
      </button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors">
        Button 2
      </button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors">
        Button 3
      </button>
      <p className="text-xs text-green-700 mt-4">
        Tab through to see clear focus rings (keyboard only)
      </p>
    </div>
  );
}
