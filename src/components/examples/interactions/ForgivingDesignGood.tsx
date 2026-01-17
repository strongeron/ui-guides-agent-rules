export function ForgivingDesignGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-foreground">Volume:</span>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-32 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            style={{ accentColor: '#2563eb' }}
          />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <button className="w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3z" />
            </svg>
          </button>
          <button className="w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 17a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 17z" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          44px hit targets are easy to tap. Generous padding and clear hover states provide feedback.
        </p>
      </div>
      <p className="text-xs text-green-700 mt-4">
        44px+ hit targets with clear affordances
      </p>
    </div>
  );
}
