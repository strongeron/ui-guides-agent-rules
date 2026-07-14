export function NumeralsForCountsBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h4 className="font-medium text-foreground">Project Overview</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>eight deployments this week</li>
          <li>twelve team members</li>
          <li>one hundred and forty-two build minutes remaining</li>
        </ul>
      </div>
      <p className="text-xs text-error">
        Spelled-out counts can't be scanned, sorted, or compared — the eye has
        to read every word to learn the number
      </p>
    </div>
  );
}
