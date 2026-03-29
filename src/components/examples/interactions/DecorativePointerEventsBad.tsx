export function DecorativePointerEventsBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="relative bg-card border border-border rounded-lg p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg" />
        <h3 className="text-sm font-medium text-foreground mb-2">Interactive Card</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Try to click the button below.
        </p>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
          onClick={() => alert('Clicked!')}
        >
          Click Me
        </button>
      </div>
      <p className="text-xs text-error">
        Gradient overlay steals clicks from the button underneath
      </p>
    </div>
  );
}
