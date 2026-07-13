export function RamsShadowConsistencyBad() {
  return (
    <div className="space-y-4">
      {/* Same light plate as the Good example, so the comparison is fair. */}
      <div className="rounded-xl bg-neutral-100 p-6">
        <div className="grid gap-5">
          <div
            className="flex items-center justify-between rounded-lg bg-white px-4 py-3"
            style={{ boxShadow: '0 0 24px rgba(37, 99, 235, 0.55)' }}
          >
            <span className="text-sm font-medium text-neutral-900">Blue glow</span>
            <code className="text-xs text-neutral-500">coloured shadow</code>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-2xl">
            <span className="text-sm font-medium text-neutral-900">Way too heavy</span>
            <code className="text-xs text-neutral-500">shadow-2xl</code>
          </div>
          <div
            className="flex items-center justify-between rounded-lg bg-white px-4 py-3"
            style={{ boxShadow: '6px 6px 0 #111827' }}
          >
            <span className="text-sm font-medium text-neutral-900">Hard offset</span>
            <code className="text-xs text-neutral-500">6px 6px 0</code>
          </div>
        </div>
      </div>
      <p className="text-xs text-destructive">
        Three unrelated shadows — different colour, blur and light direction. With no system, elevation stops meaning anything
      </p>
    </div>
  );
}
