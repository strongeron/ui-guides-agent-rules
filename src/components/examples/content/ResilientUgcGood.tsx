export function ResilientUgcGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">User Comments</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">VeryyyyyyyyLongUsernameWithoutAnySpacesThatBreaksTheLayoutCompletely</p>
              <p className="text-sm text-muted-foreground break-words overflow-wrap-anywhere">
                ThisIsAVeryLongWordWithoutSpacesThatWillOverflowTheContainerAndBreakTheLayout
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-2">
          <code className="text-xs text-green-800 font-mono block">
            truncate / break-words / overflow-wrap
          </code>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Text truncated or wrapped - layout stays intact
      </p>
    </div>
  );
}
