/**
 * Good: the same table, grounded. Three things anchor it — navigation (with an active
 * state, so you know where you are), a location indicator (breadcrumb + page title),
 * and user context (the workspace/account chip). The sidebar shares the canvas
 * background and is separated by a border, not a different colour.
 */
const ROWS = [
  { id: 'INV-2041', customer: 'Northwind', amount: '$1,240', status: 'Paid' },
  { id: 'INV-2042', customer: 'Acme Corp', amount: '$860', status: 'Pending' },
  { id: 'INV-2043', customer: 'Globex', amount: '$3,120', status: 'Paid' },
];

const NAV = [
  { label: 'Overview', active: false },
  { label: 'Invoices', active: true },
  { label: 'Customers', active: false },
  { label: 'Settings', active: false },
];

export function InterfaceScreenGroundingGood() {
  return (
    <div className="w-full space-y-3">
      <div className="flex min-h-64 overflow-hidden rounded-lg border border-border bg-background">
        {/* 1. Navigation — same background as the canvas, separated by a border */}
        <nav aria-label="Main" className="w-36 shrink-0 border-r border-border p-3">
          <p className="mb-3 px-2 text-xs font-semibold text-foreground">Ledger</p>
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href="#screen-grounding"
                  aria-current={item.active ? 'page' : undefined}
                  className={`block rounded-md px-2 py-1.5 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                    item.active
                      ? 'bg-muted font-medium text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 flex-1">
          {/* 2. Location indicator + 3. user context */}
          <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div className="min-w-0">
              <nav aria-label="Breadcrumb">
                <ol className="flex gap-1 text-xs text-muted-foreground">
                  <li>Billing</li>
                  <li aria-hidden="true">/</li>
                  <li className="text-foreground">Invoices</li>
                </ol>
              </nav>
              <h2 className="mt-0.5 truncate text-sm font-semibold text-foreground">Invoices</h2>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-full border border-border px-2 py-1">
              <span
                aria-hidden="true"
                className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground"
              >
                A
              </span>
              <span className="text-xs text-muted-foreground">Acme &middot; Ada</span>
            </div>
          </header>

          <div className="p-4">
            <table className="w-full border-collapse text-left">
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
        </div>
      </div>

      <p className="text-xs text-success">
        Same table. Now the sidebar says where you can go, the active nav item plus the breadcrumb
        and title say where you are, and the chip says who you are &mdash; so it reads as a screen
        inside an app.
      </p>
    </div>
  );
}
