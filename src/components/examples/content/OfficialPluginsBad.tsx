export function OfficialPluginsBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Manual Styling</h4>
        <div className="space-y-4">
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">Custom Prose Styles</h5>
            <div className="text-sm space-y-2 text-muted-foreground">
              <p>Manually styling every text element...</p>
            </div>
            <div className="mt-2 text-xs text-error font-mono overflow-x-auto">
              <code>[&_p]:mb-4 [&_h2]:text-xl [&_h2]:font-bold...</code>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">Custom Form Reset</h5>
            <input
              type="text"
              placeholder="Manual normalization"
              className="w-full px-3 py-2 border border-border rounded text-sm bg-background"
            />
            <div className="mt-2 text-xs text-error font-mono">
              <code>appearance-none border rounded...</code>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">JS-based Container Queries</h5>
            <div className="text-xs text-error">
              ResizeObserver + manual breakpoint logic
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-error">
        Reinventing what official plugins already solve well
      </p>
    </div>
  );
}
