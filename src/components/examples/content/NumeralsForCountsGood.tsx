export function NumeralsForCountsGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h4 className="font-medium text-foreground">Project Overview</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <span className="font-medium text-foreground tabular-nums">8</span>{' '}
            deployments this week
          </li>
          <li>
            <span className="font-medium text-foreground tabular-nums">12</span>{' '}
            team members
          </li>
          <li>
            <span className="font-medium text-foreground tabular-nums">142</span>{' '}
            build minutes remaining
          </li>
        </ul>
      </div>
      <p className="text-xs text-success">
        Numerals stand out from the words around them, so counts are scannable
        at a glance
      </p>
    </div>
  );
}
