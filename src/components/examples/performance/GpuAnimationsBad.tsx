export function GpuAnimationsBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex gap-4 justify-center">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:mt-[-4px] hover:mb-[4px] transition-all duration-200">
          Hover me
        </button>
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:w-[120px] transition-all duration-200">
          Expand
        </button>
      </div>
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-2">Layout-Triggering Properties</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><code className="text-xs bg-muted px-1 rounded">margin</code> - triggers layout</li>
          <li><code className="text-xs bg-muted px-1 rounded">width/height</code> - triggers layout</li>
          <li><code className="text-xs bg-muted px-1 rounded">top/left</code> - triggers layout</li>
          <li><code className="text-xs bg-muted px-1 rounded">padding</code> - triggers layout</li>
        </ul>
      </div>
      <p className="text-xs text-error">
        Layout properties cause expensive recalculations, dropping below 60fps
      </p>
    </div>
  );
}
