export function LayeredShadowsGood() {
  return (
    <div className="space-y-4">
      {/* Same light plate as the Bad example, so the comparison is fair. */}
      <div className="rounded-xl bg-neutral-100 p-8 flex justify-center">
        <div
          className="w-48 h-28 bg-white rounded-lg flex items-center justify-center"
          style={{
            boxShadow:
              '0 1px 2px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.06), 0 12px 24px rgba(0,0,0,0.05)',
          }}
        >
          <p className="text-sm text-neutral-700 text-center px-4">Layered shadow</p>
        </div>
      </div>
      <p className="text-xs text-success">
        Several shadows stacked, each larger and softer than the last. Light falls off gradually, the way it does in
        the real world
      </p>
    </div>
  );
}
