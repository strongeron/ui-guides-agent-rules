export function MobileInputSizeBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          placeholder="name@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ fontSize: '14px' }}
        />
        <p className="mt-2 text-xs text-gray-500">
          On iOS Safari, tapping this input causes the page to zoom in because the font size is below 16px.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        14px font size causes iOS Safari to auto-zoom on focus
      </p>
    </div>
  );
}
