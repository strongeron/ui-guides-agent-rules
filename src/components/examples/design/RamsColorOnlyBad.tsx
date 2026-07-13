const rows = [
  { name: 'Payment', tone: 'bg-success' },
  { name: 'Connection', tone: 'bg-destructive' },
  { name: 'Disk space', tone: 'bg-warning' },
];

export function RamsColorOnlyBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Status</h4>
        <ul className="space-y-3 p-3 bg-muted rounded-lg">
          {rows.map((r) => (
            <li key={r.name} className="flex items-center justify-between text-sm">
              <span>{r.name}</span>
              <span className={`size-3 rounded-full ${r.tone}`} />
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-destructive">
        The status is carried by the dot colour alone. In greyscale, or to a colourblind user, all three rows look
        identical
      </p>
    </div>
  );
}
