export function ResilientUgcBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold mb-3">User Comments</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">VeryyyyyyyyLongUsernameWithoutAnySpacesThatBreaksTheLayoutCompletely</p>
              <p className="text-sm text-gray-600">
                ThisIsAVeryLongWordWithoutSpacesThatWillOverflowTheContainerAndBreakTheLayout
              </p>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Long text without spaces overflows the container, breaking the layout.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        No overflow handling - long content breaks layout
      </p>
    </div>
  );
}
