export function RamsFocusOutlineBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Hidden Focus Indicators</h4>
        <div className="space-y-3">
          <div className="flex gap-2 p-3 bg-muted rounded-lg">
            <button
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md focus:outline-none"
              style={{ outline: 'none' }}
            >
              Button 1
            </button>
            <button
              className="px-4 py-2 border border-border rounded-md focus:outline-none"
              style={{ outline: 'none' }}
            >
              Button 2
            </button>
          </div>
          <div className="bg-muted rounded p-2 font-mono text-xs">
            <code className="text-error">{'outline: none; /* no replacement */'}</code>
          </div>
          <p className="text-sm text-muted-foreground">
            Press Tab - where is the focus? Impossible to tell
          </p>
        </div>
      </div>
      <p className="text-xs text-error">
        Keyboard users cannot see which element is focused
      </p>
    </div>
  );
}
