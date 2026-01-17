export function NoExcessiveScrollbarsBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4 overflow-auto" style={{ maxHeight: '200px' }}>
        <h3 className="text-lg font-semibold mb-2" style={{ width: '350px' }}>
          This is a very long title that extends beyond the container
        </h3>
        <p className="text-sm text-muted-foreground">
          Content with proper width that doesn't cause issues.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Unwanted horizontal scrollbar from overflow
      </p>
    </div>
  );
}
