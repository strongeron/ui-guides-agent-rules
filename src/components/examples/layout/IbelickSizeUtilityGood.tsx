export function IbelickSizeUtilityGood() {
  return (
    <div className="space-y-4">
      {/* Using size-* for square elements - clearer intent */}
      <div className="flex items-center gap-4">
        <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
          A
        </div>
        <div className="size-10 rounded-full bg-muted flex items-center justify-center text-xs">
          B
        </div>
        <div className="size-12 rounded-full bg-destructive flex items-center justify-center text-white text-sm">
          C
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="size-8 rounded-md bg-muted flex items-center justify-center">
          <span className="text-sm">×</span>
        </button>
        <button className="size-10 rounded-md bg-muted flex items-center justify-center">
          <span className="text-sm">+</span>
        </button>
      </div>
      <p className="text-xs text-success">
        size-8 is concise and clearly shows square intent
      </p>
    </div>
  );
}
