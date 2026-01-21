export function IbelickSizeUtilityBad() {
  return (
    <div className="space-y-4">
      {/* Using separate w-* and h-* for square elements */}
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
          A
        </div>
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs">
          B
        </div>
        <div className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center text-white text-sm">
          C
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
          <span className="text-sm">×</span>
        </button>
        <button className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
          <span className="text-sm">+</span>
        </button>
      </div>
      <p className="text-xs text-destructive">
        w-8 h-8 is verbose and hides the "square" intent
      </p>
    </div>
  );
}
