export function AccessibleChartsBad() {
  const data = [
    { label: 'Active', value: 45, color: 'bg-green-500' },
    { label: 'Pending', value: 30, color: 'bg-red-500' },
    { label: 'Inactive', value: 25, color: 'bg-yellow-500' },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">User Status</h3>
        <div className="flex h-4 rounded-full overflow-hidden mb-4">
          {data.map((item) => (
            <div
              key={item.label}
              className={`${item.color}`}
              style={{ width: `${item.value}%` }}
            />
          ))}
        </div>
        <div className="flex gap-4">
          {data.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm ${item.color}`} />
              <span className="text-xs">{item.value}%</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Red/green color scheme is indistinguishable for color blind users (~8% of men).
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Red/green colors - invisible to color blind users
      </p>
    </div>
  );
}
