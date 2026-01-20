export function IbelickNoGlowGood() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm shadow-sm hover:bg-primary/90 transition-colors">
          Primary Action
        </button>
        <button className="px-4 py-2 rounded-lg bg-muted text-sm border hover:bg-muted/80 transition-colors">
          Secondary
        </button>
      </div>
      <p className="text-xs text-success">
        Clear hierarchy through color and contrast, not glow effects
      </p>
    </div>
  );
}
