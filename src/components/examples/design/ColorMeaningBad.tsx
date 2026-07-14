export function ColorMeaningBad() {
  // BAD: Colors used inconsistently, contradicting universal expectations
  // Red typically means danger/stop, green means success/go
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Inverted Color Meanings</h4>
        <div className="space-y-4 p-4 bg-muted rounded-lg">
          {/* BAD: Status badges with wrong colors */}
          <div className="flex flex-wrap gap-2">
            {/* BAD: Red for positive state */}
            <span className="px-2 py-1 text-xs rounded-full bg-destructive/20 text-destructive">
              Active
            </span>
            {/* BAD: Green for negative state */}
            <span className="px-2 py-1 text-xs rounded-full bg-success/20 text-success">
              Inactive
            </span>
            {/* BAD: Blue for warning */}
            <span className="px-2 py-1 text-xs rounded-full bg-info/20 text-info">
              Error
            </span>
          </div>

          {/* BAD: Action buttons with inverted semantics */}
          <div className="flex gap-2">
            {/* BAD: Red "Save" button - looks dangerous */}
            <button className="px-3 py-1.5 bg-destructive text-destructive-foreground rounded-md text-sm">
              Save Changes
            </button>
            {/* BAD: Green "Delete" button - looks safe */}
            <button className="px-3 py-1.5 bg-success text-success-foreground rounded-md text-sm">
              Delete All
            </button>
          </div>

          {/* BAD: Form validation with wrong colors */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive" />
              <span className="text-sm text-destructive">Payment successful!</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              <span className="text-sm text-success">Card declined</span>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">Red=Success? Green=Error? Users will misread!</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Inverted color semantics cause confusion and dangerous mistakes
      </p>
    </div>
  );
}
