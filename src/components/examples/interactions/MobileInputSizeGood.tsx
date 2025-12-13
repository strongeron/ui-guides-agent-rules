export function MobileInputSizeGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          placeholder="name@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-2 text-xs text-gray-500">
          Font size is 16px (text-base), so iOS Safari won't auto-zoom when this input is focused.
        </p>
      </div>
      <p className="text-xs text-green-700 mt-4">
        16px font size prevents iOS Safari auto-zoom on focus
      </p>
    </div>
  );
}
