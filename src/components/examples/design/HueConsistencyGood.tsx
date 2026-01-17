export function HueConsistencyGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-blue-600 rounded-lg p-4">
        <div
          className="bg-card rounded-lg p-4"
          style={{
            boxShadow: '0 4px 12px rgba(30, 64, 175, 0.35)',
            border: '1px solid rgba(30, 64, 175, 0.15)',
          }}
        >
          <h3 className="font-semibold text-foreground mb-2">Card Title</h3>
          <p className="text-sm text-muted-foreground">
            The blue-tinted shadow and border harmonize with the background.
          </p>
        </div>
        <p className="text-xs text-blue-100 mt-4">
          Blue-tinted shadows blend naturally
        </p>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Shadows tinted toward background hue - cohesive look
      </p>
    </div>
  );
}
