export function ClearFocusBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <style>{`
        .no-focus-ring:focus {
          outline: none;
        }
      `}</style>
      <button className="no-focus-ring px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Button 1
      </button>
      <button className="no-focus-ring px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Button 2
      </button>
      <button className="no-focus-ring px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Button 3
      </button>
      <p className="text-xs text-gray-500 mt-4">
        Try tabbing through - no visible focus indicator
      </p>
    </div>
  );
}
