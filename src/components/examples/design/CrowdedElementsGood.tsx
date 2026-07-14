export function CrowdedElementsGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Adequate Spacing</h4>
        <div className="p-4 bg-muted rounded-lg">
          <div className="p-4 bg-background rounded-lg border border-border">
            <h5 className="font-medium mb-2">Card Title</h5>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              This card has comfortable padding and spacing between elements for easy reading.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
                Action
              </button>
              <button className="px-4 py-2 border border-border rounded-md text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>p-4, mb-2, mb-4, gap-3</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Breathing room makes content easy to scan and interact with
      </p>
    </div>
  );
}
