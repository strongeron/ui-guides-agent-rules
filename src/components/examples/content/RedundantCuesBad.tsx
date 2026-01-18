export function RedundantCuesBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Order Status</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm">Order #1234</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-sm">Order #1235</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-error" />
            <span className="text-sm">Order #1236</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Status is only indicated by color. Color blind users can't distinguish between states.
        </p>
      </div>
      <p className="text-xs text-error mt-4">
        Color alone - inaccessible to color blind users
      </p>
    </div>
  );
}
