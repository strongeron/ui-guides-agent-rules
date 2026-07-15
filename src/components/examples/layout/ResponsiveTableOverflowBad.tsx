const ROWS = [
  ['#1042', 'Alicia Moreno', 'alicia@example.com', 'Pro', '2026-03-14', '$1,240.00'],
  ['#1043', 'Ben Ndlovu', 'ben@example.com', 'Team', '2026-03-15', '$4,900.00'],
];

export function ResponsiveTableOverflowBad() {
  return (
    <div className="w-full max-w-sm">
      {/* No wrapper: the wide table stretches its container and breaks the layout */}
      <div className="rounded-lg border border-border bg-card p-3">
        <table className="w-max text-left text-xs">
          <thead className="text-muted-foreground">
            <tr>
              {['Order', 'Customer', 'Email', 'Plan', 'Date', 'Total'].map((h) => (
                <th key={h} className="whitespace-nowrap px-3 py-1.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-foreground">
            {ROWS.map((r) => (
              <tr key={r[0]} className="border-t border-border">
                {r.map((c, i) => (
                  <td key={i} className="whitespace-nowrap px-3 py-1.5">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-destructive">
        With no wrapper the table pushes past its card — on a phone this widens the whole page.
      </p>
    </div>
  );
}
