export function SelectionStylingBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-2">
        <h3 className="text-sm font-medium text-foreground">About Our Platform</h3>
        <p className="text-sm text-muted-foreground">
          Select this text to see the default browser highlight color — the generic blue doesn't match our brand palette and looks out of place.
        </p>
        <p className="text-sm text-muted-foreground">
          Every detail matters in crafting a polished interface. Even text selection contributes to the overall visual coherence.
        </p>
      </div>
      <p className="text-xs text-error">Default ::selection — generic blue doesn't match the brand</p>
    </div>
  );
}
