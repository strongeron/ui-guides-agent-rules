export function SpecificButtonLabelsBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div>
          <h4 className="font-medium text-foreground">Add API Key</h4>
          <p className="text-sm text-muted-foreground">
            This key will be stored encrypted.
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <button className="px-3 py-2 bg-muted text-foreground text-sm rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
            Back
          </button>
          <button className="px-3 py-2 bg-primary text-primary-foreground text-sm rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
            Continue
          </button>
        </div>
      </div>
      <p className="text-xs text-error">
        "Continue" to what? Read out of context — by a screen reader, or in a
        button list — the label says nothing about what it does
      </p>
    </div>
  );
}
