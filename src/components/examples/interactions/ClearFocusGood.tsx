export function ClearFocusGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors">
        Button 1
      </button>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors">
        Button 2
      </button>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors">
        Button 3
      </button>
      <p className="text-xs text-success mt-4">
        Tab through to see clear focus rings (keyboard only)
      </p>
    </div>
  );
}
