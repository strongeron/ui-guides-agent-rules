export function GpuAnimationsGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex gap-4 justify-center">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:-translate-y-1 hover:shadow-lg transition-transform duration-200">
          Hover me
        </button>
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:scale-105 transition-transform duration-200">
          Scale up
        </button>
      </div>
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-2">GPU-Accelerated Properties</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><code className="text-xs bg-muted px-1 rounded">translate-y</code> - vertical movement</li>
          <li><code className="text-xs bg-muted px-1 rounded">scale</code> - size changes</li>
          <li><code className="text-xs bg-muted px-1 rounded">rotate</code> - rotation</li>
          <li><code className="text-xs bg-muted px-1 rounded">opacity</code> - fading</li>
        </ul>
      </div>
      <p className="text-xs text-success">
        Transform animations run at 60fps on the GPU compositor thread
      </p>
    </div>
  );
}
