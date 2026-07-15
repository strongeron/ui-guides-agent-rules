const ROWS = [
  ['#1042', 'Alicia Moreno', 'alicia@example.com', 'Pro', '2026-03-14', '$1,240.00'],
  ['#1043', 'Ben Ndlovu', 'ben@example.com', 'Team', '2026-03-15', '$4,900.00'],
];

export function ResponsiveTableOverflowGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-3">
        {/* Only the table scrolls; the page stays put */}
        <div className="overflow-x-auto">
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
      </div>
      <p className="mt-4 text-xs text-success">
        An overflow-x-auto wrapper contains the scroll to the table — the surrounding page never widens.
      </p>
    </div>
  );
}
