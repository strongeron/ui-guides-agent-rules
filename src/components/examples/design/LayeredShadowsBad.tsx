export function LayeredShadowsBad() {
  return (
    <div className="space-y-4">
      {/* Light plate: black-based shadows are unreadable on the dark theme. */}
      <div className="rounded-xl bg-neutral-100 p-8 flex justify-center">
        <div
          className="w-48 h-28 bg-white rounded-lg flex items-center justify-center"
          style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}
        >
          <p className="text-sm text-neutral-700 text-center px-4">Single flat shadow</p>
        </div>
      </div>
      <p className="text-xs text-destructive">
        One hard shadow at a single offset. The edge is abrupt and the card looks stuck to the page rather than lifted
      </p>
    </div>
  );
}
