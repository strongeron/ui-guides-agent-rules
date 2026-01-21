export function IbelickViewportHeightGood() {
  return (
    <div className="space-y-4">
      <div className="relative border rounded-lg overflow-hidden" style={{ height: '200px' }}>
        {/* Simulated mobile browser */}
        <div className="absolute inset-x-0 top-0 h-6 bg-muted flex items-center px-2 text-xs">
          <span className="text-muted-foreground">Browser Chrome</span>
        </div>
        <div
          className="bg-primary/10 flex items-center justify-center"
          style={{ height: 'calc(100% - 44px)', marginTop: '24px' }}
        >
          <div className="text-center">
            <code className="text-xs bg-muted px-2 py-1 rounded">h-dvh</code>
            <p className="text-xs text-muted-foreground mt-2">Adjusts to visible area</p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-5 bg-muted flex items-center justify-center">
          <div className="w-24 h-1 bg-muted-foreground/30 rounded-full" />
        </div>
      </div>
      <p className="text-xs text-success">
        dvh (dynamic viewport height) adjusts as browser chrome shows/hides
      </p>
    </div>
  );
}
