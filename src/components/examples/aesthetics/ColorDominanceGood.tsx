export function ColorDominanceGood() {
  return (
    <div className="w-full max-w-md p-6 rounded-lg bg-background">
      <div className="flex gap-2 mb-4">
        <div className="w-12 h-8 rounded bg-background border border-border" title="Dominant" />
        <div className="w-8 h-8 rounded bg-muted" title="Surface" />
        <div className="w-6 h-8 rounded bg-primary" title="Accent" />
      </div>
      <div className="space-y-2">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium">
          Primary Action
        </button>
        <button className="px-4 py-2 bg-muted text-muted-foreground rounded text-sm ml-2">
          Secondary
        </button>
      </div>
      <p className="text-xs text-success mt-4">
        Bold dominant color with sharp accent creates clear hierarchy
      </p>
    </div>
  );
}
