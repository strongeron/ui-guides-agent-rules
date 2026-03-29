export function GradientTextSelectionGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <style>{`
          .gradient-text-good::selection {
            -webkit-text-fill-color: var(--primary-foreground);
            background: hsl(var(--primary));
          }
        `}</style>
        <h2
          className="gradient-text-good text-2xl font-bold mb-2"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--destructive)))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Select this gradient text
        </h2>
        <p className="text-sm text-muted-foreground">Try selecting the heading — gradient resets to solid on selection.</p>
      </div>
      <p className="text-xs text-success">Gradient unset on ::selection — readable when selected</p>
    </div>
  );
}
