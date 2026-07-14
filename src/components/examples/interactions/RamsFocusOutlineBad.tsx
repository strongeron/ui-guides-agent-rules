export function RamsFocusOutlineBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Hidden Focus Indicators</h4>
        <div className="space-y-3">
          {/* BAD: outline-hidden with NO replacement focus indicator */}
          {/* Keyboard users cannot see what's focused */}
          <div className="flex gap-2 p-3 bg-muted rounded-lg">
            <button
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md outline-hidden focus:outline-hidden"
              style={{ outline: 'none' }}
              // BAD: No focus-visible:ring-* replacement!
            >
              Button 1
            </button>
            <button
              className="px-4 py-2 border border-border rounded-md outline-hidden focus:outline-hidden"
              style={{ outline: 'none' }}
              // BAD: No focus-visible:ring-* replacement!
            >
              Button 2
            </button>
          </div>
          <input
            type="text"
            placeholder="Try tabbing here..."
            className="w-full px-3 py-2 border border-border rounded-md outline-hidden focus:outline-hidden"
            style={{ outline: 'none' }}
            // BAD: Input with no focus indicator - where's the cursor?
          />
          <div className="bg-muted rounded p-2 font-mono text-xs">
            <code className="text-error">{'outline: none; /* WCAG Failure */'}</code>
          </div>
          <p className="text-sm text-muted-foreground">
            Tab through elements - impossible to see focus location
          </p>
        </div>
      </div>
      <p className="text-xs text-error">
        Keyboard users cannot see which element is focused - WCAG 2.4.7 failure
      </p>
    </div>
  );
}
