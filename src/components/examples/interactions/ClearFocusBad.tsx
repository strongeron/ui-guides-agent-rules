export function ClearFocusBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <style>{`
        .no-focus-ring:focus {
          outline: none;
        }
      `}</style>
      <button className="no-focus-ring px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
        Button 1
      </button>
      <button className="no-focus-ring px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
        Button 2
      </button>
      <button className="no-focus-ring px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
        Button 3
      </button>
      <p className="text-xs text-muted-foreground mt-4">
        Try tabbing through - no visible focus indicator
      </p>
    </div>
  );
}
