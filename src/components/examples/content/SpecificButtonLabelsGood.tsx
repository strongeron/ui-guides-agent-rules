export function SpecificButtonLabelsGood() {
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
          <button className="px-3 py-2 bg-muted text-foreground text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Cancel
          </button>
          <button className="px-3 py-2 bg-primary text-primary-foreground text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Save API Key
          </button>
        </div>
      </div>
      <p className="text-xs text-success">
        The label names its own action, so it survives being read alone —
        verb + object, no context required
      </p>
    </div>
  );
}
