export function RespectZoomBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="bg-error/10 border border-error/20 rounded-lg p-3 mb-4">
          <code className="text-xs text-error-foreground font-mono block">
            {'<meta name="viewport" content="'}
            <span className="bg-error/30">maximum-scale=1, user-scalable=no</span>
            {'" />'}
          </code>
        </div>
        <p className="text-sm text-muted-foreground">
          This viewport meta tag prevents users from zooming. This is harmful for users with low vision who need to zoom to read content.
        </p>
      </div>
      <p className="text-xs text-error mt-4">
        Disabling zoom removes an important accessibility feature
      </p>
    </div>
  );
}
