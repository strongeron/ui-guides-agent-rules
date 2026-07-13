export function SelectionStylingGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-2">
        {/* The theme tokens are oklch values, so they are used directly. Wrapping them
            in hsl() would be invalid CSS and the declaration would be dropped. */}
        <style>{`
          .custom-selection ::selection {
            background: color-mix(in oklch, var(--primary) 35%, transparent);
            color: var(--foreground);
          }
        `}</style>
        <div className="custom-selection">
          <h3 className="text-sm font-medium text-foreground">About our platform</h3>
          <p className="text-sm text-muted-foreground">
            Select this text to see the branded highlight. It is tinted with the primary token, so it feels
            intentional rather than borrowed from the OS.
          </p>
          <p className="text-sm text-muted-foreground">
            Styling ::selection is a small detail that lifts the polish of the whole interface.
          </p>
        </div>
      </div>
      <p className="text-xs text-success">
        A custom <code>::selection</code> tinted from the primary token, matching the brand
      </p>
    </div>
  );
}
