/**
 * Bad: the classic generated "dashboard" — a data table centred on a blank canvas.
 * The widget was generated; the application around it was forgotten. There is no
 * navigation, no indication of where this screen sits, and no account context.
 */
const ROWS = [
  { id: 'INV-2041', customer: 'Northwind', amount: '$1,240', status: 'Paid' },
  { id: 'INV-2042', customer: 'Acme Corp', amount: '$860', status: 'Pending' },
  { id: 'INV-2043', customer: 'Globex', amount: '$3,120', status: 'Paid' },
];

export function InterfaceScreenGroundingBad() {
  return (
    <div className="w-full space-y-3">
      {/* The whole "screen": one table, floating, centred, on nothing */}
      <div className="flex min-h-64 items-center justify-center rounded-lg border border-border bg-background p-6">
        <table className="w-full max-w-md border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-2 text-xs font-medium text-muted-foreground">Invoice</th>
              <th className="pb-2 text-xs font-medium text-muted-foreground">Customer</th>
              <th className="pb-2 text-xs font-medium text-muted-foreground">Amount</th>
              <th className="pb-2 text-xs font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="py-2 font-mono text-xs text-foreground">{row.id}</td>
                <td className="py-2 text-sm text-foreground">{row.customer}</td>
                <td className="py-2 text-sm text-foreground">{row.amount}</td>
                <td className="py-2 text-sm text-muted-foreground">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-error">
        Where am I? Where can I go? Who am I signed in as? A screen with no navigation, no location
        indicator, and no user context is a component demo, not a product &mdash; and it is exactly
        what you get when the model renders the widget it was asked for and stops.
      </p>
    </div>
  );
}
