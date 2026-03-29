export function GradientTextSelectionBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h2
          className="text-2xl font-bold mb-2"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--destructive)))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Select this gradient text
        </h2>
        <p className="text-sm text-muted-foreground">Try selecting the heading — the gradient persists on selection, making it hard to read.</p>
      </div>
      <p className="text-xs text-error">Gradient not unset on ::selection — unreadable when selected</p>
    </div>
  );
}
