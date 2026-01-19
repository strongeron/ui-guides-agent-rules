export function RamsFontConsistencyBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Inconsistent Typography</h4>
        <div className="space-y-3 p-4 bg-muted rounded-lg">
          <h5 className="text-lg font-serif italic">Section Title</h5>
          <p className="text-sm font-sans">
            Body text in sans-serif, but the heading uses serif italic - jarring transition.
          </p>
          <p className="text-sm font-mono">
            This paragraph randomly uses monospace for no reason.
          </p>
          <p className="text-xs" style={{ fontFamily: 'cursive' }}>
            And this uses yet another font family!
          </p>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">serif, sans-serif, mono, cursive - chaos</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Multiple font families create visual chaos
      </p>
    </div>
  );
}
