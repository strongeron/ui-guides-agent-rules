export function NoDeadZonesBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
              A
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Project Alpha</h3>
              <p className="text-sm text-gray-500">Updated 2 hours ago</p>
            </div>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Open
            </button>
          </div>
        </div>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Only the button is clickable - large card area is dead zone
      </p>
    </div>
  );
}
