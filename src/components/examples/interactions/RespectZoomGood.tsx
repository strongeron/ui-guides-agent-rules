export function RespectZoomGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="bg-success/10 border border-success/20 rounded-lg p-3 mb-4">
          <code className="text-xs text-success-foreground font-mono block">
            {'<meta name="viewport" content="width=device-width, initial-scale=1" />'}
          </code>
        </div>
        <p className="text-sm text-muted-foreground">
          This viewport meta tag allows users to zoom freely. Users can pinch-to-zoom or use browser zoom controls as needed.
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        Users can zoom freely for accessibility needs
      </p>
    </div>
  );
}
