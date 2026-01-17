export function SafeAreasGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="relative">
          {/* Phone frame with notch */}
          <div className="bg-gray-900 text-white px-4 py-2 flex justify-center">
            <div className="w-20 h-5 bg-black rounded-b-xl" />
          </div>
          <div className="bg-blue-600 text-white px-4 py-3">
            <h3 className="font-semibold">App Header</h3>
          </div>
          <div className="p-4 min-h-[100px]">
            <p className="text-sm text-muted-foreground">Content area</p>
          </div>
          {/* Bottom nav with safe area padding */}
          <div className="bg-muted px-4 pt-3 pb-8 flex justify-around">
            <span className="text-xs">Home</span>
            <span className="text-xs">Search</span>
            <span className="text-xs">Profile</span>
          </div>
          <div className="h-6 bg-gray-900 absolute bottom-0 left-0 right-0" />
        </div>
        <div className="p-3 bg-green-50 border-t border-green-200">
          <code className="text-xs text-green-800 font-mono">
            padding-bottom: env(safe-area-inset-bottom)
          </code>
        </div>
      </div>
      <p className="text-xs text-green-700 mt-4">
        safe-area-inset keeps UI above home bar
      </p>
    </div>
  );
}
