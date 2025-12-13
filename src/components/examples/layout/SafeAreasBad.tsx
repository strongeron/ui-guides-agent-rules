export function SafeAreasBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="relative">
          {/* Phone frame with notch */}
          <div className="bg-gray-900 text-white px-4 py-2 flex justify-center">
            <div className="w-20 h-5 bg-black rounded-b-xl" />
          </div>
          <div className="bg-blue-600 text-white px-4 py-3">
            <h3 className="font-semibold">App Header</h3>
          </div>
          <div className="p-4 min-h-[100px]">
            <p className="text-sm text-gray-600">Content area</p>
          </div>
          {/* Bottom nav without safe area */}
          <div className="bg-gray-100 px-4 py-3 flex justify-around">
            <span className="text-xs">Home</span>
            <span className="text-xs">Search</span>
            <span className="text-xs">Profile</span>
          </div>
          <div className="h-6 bg-gray-900" /> {/* Home indicator area */}
        </div>
        <div className="p-3 bg-red-50 border-t border-red-200">
          <p className="text-xs text-red-800">
            Nav buttons overlap home indicator area
          </p>
        </div>
      </div>
      <p className="text-xs text-red-700 mt-4">
        No safe-area-inset-bottom - UI hidden by home bar
      </p>
    </div>
  );
}
