export function AccessibleChartsGood() {
  const data = [
    { label: 'Active', value: 45, swatch: 'bg-primary', pattern: '' },
    { label: 'Pending', value: 30, swatch: 'bg-warning', pattern: 'bg-stripes' },
    { label: 'Inactive', value: 25, swatch: 'bg-muted-foreground', pattern: 'bg-dots' },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">User Status</h3>
        <div className="flex h-4 rounded-full overflow-hidden mb-4">
          {data.map((item) => (
            <div
              key={item.label}
              className={`${item.swatch} relative`}
              style={{ width: `${item.value}%` }}
            />
          ))}
        </div>
        <div className="flex gap-4">
          {data.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm ${item.swatch}`} />
              <span className="text-xs">{item.label} {item.value}%</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Blue/amber/gray palette is distinguishable. Labels included for clarity.
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        Color-blind safe palette + text labels for all users
      </p>
    </div>
  );
}
