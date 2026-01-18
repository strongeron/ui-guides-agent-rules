export function HueConsistencyBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-primary rounded-lg p-4">
        <div
          className="bg-card rounded-lg p-4"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 className="font-semibold text-foreground mb-2">Card Title</h3>
          <p className="text-sm text-muted-foreground">
            The gray/black shadow and border look harsh against the blue background.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/70 mt-4">
          Pure gray shadows clash with colored background
        </p>
      </div>
      <p className="text-xs text-error mt-4">
        Neutral shadows on colored background look harsh
      </p>
    </div>
  );
}
