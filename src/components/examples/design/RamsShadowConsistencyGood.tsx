const levels = [
  { name: 'Card', token: 'shadow-sm', cls: 'shadow-sm' },
  { name: 'Dropdown', token: 'shadow-md', cls: 'shadow-md' },
  { name: 'Modal', token: 'shadow-lg', cls: 'shadow-lg' },
];

export function RamsShadowConsistencyGood() {
  return (
    <div className="space-y-4">
      {/* A light plate, so the elevation ramp is actually legible in either theme. */}
      <div className="rounded-xl bg-neutral-100 p-6">
        <div className="grid gap-5">
          {levels.map((l) => (
            <div
              key={l.token}
              className={`flex items-center justify-between rounded-lg bg-white px-4 py-3 ${l.cls}`}
            >
              <span className="text-sm font-medium text-neutral-900">{l.name}</span>
              <code className="text-xs text-neutral-500">{l.token}</code>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-success">
        One shadow scale, one light source — elevation reads as a clear ramp: card → dropdown → modal
      </p>
    </div>
  );
}
