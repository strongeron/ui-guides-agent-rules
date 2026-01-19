export function NoTransitionAllBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex gap-4 justify-center">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:scale-105 hover:bg-primary/90 transition-all duration-200">
          transition-all
        </button>
        <button className="px-4 py-2 border-2 border-primary text-primary rounded-lg hover:border-secondary hover:text-secondary transition-all duration-200">
          transition-all
        </button>
      </div>
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-2">Problems with transition-all</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-error" />
            Animates unintended properties
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-error" />
            May animate layout properties
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-error" />
            Unpredictable visual results
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-error" />
            Harder to debug transitions
          </li>
        </ul>
      </div>
      <p className="text-xs text-error">
        transition-all causes unexpected animations and performance issues
      </p>
    </div>
  );
}
