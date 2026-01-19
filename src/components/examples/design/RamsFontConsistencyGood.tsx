export function RamsFontConsistencyGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Consistent Typography</h4>
        <div className="space-y-3 p-4 bg-muted rounded-lg font-sans">
          <h5 className="text-lg font-semibold">Section Title</h5>
          <p className="text-sm font-normal">
            Body text uses the same font family with regular weight for easy reading.
          </p>
          <p className="text-sm">
            <span className="font-medium">Labels</span> use medium weight for subtle emphasis without changing families.
          </p>
          <code className="text-xs font-mono bg-background p-1 rounded">
            Only code uses monospace
          </code>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>font-sans throughout, weight for hierarchy</code>
        </div>
      </div>
      <p className="text-xs text-success">
        One font family with weight variations - clean and professional
      </p>
    </div>
  );
}
