export function SelectionStylingGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-2">
        <style>{`
          .custom-selection ::selection {
            background: hsl(var(--primary) / 0.3);
            color: hsl(var(--foreground));
          }
        `}</style>
        <div className="custom-selection">
          <h3 className="text-sm font-medium text-foreground">About Our Platform</h3>
          <p className="text-sm text-muted-foreground">
            Select this text to see the branded highlight color — it matches our primary palette and feels intentional.
          </p>
          <p className="text-sm text-muted-foreground">
            Styling ::selection is a small detail that elevates the overall polish of the interface.
          </p>
        </div>
      </div>
      <p className="text-xs text-success">Custom ::selection matches the brand — polished feel</p>
    </div>
  );
}
