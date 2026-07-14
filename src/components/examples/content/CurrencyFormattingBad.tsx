const ROWS = [
  { item: 'Pro seats (3)', amount: '$60' },
  { item: 'Bandwidth overage', amount: '$8.50' },
  { item: 'Edge function invocations', amount: '$1,204' },
  { item: 'Image optimization', amount: '$99.00' },
  { item: 'Support add-on', amount: '$12' },
];

const decimalsUsed = new Set(
  ROWS.map((row) => {
    const fraction = row.amount.split('.')[1];
    return fraction ? fraction.length : 0;
  }),
);

export function CurrencyFormattingBad() {
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="mb-3 font-medium text-foreground">Invoice · June</h4>
        <table className="w-full text-sm">
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.item} className="border-b border-border last:border-0">
                <td className="py-2 text-muted-foreground">{row.item}</td>
                <td className="py-2 text-right">
                  <mark className="rounded bg-error/15 px-1 font-semibold text-error">
                    {row.amount}
                  </mark>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-error">
          decimal places used: {[...decimalsUsed].sort().join(' and ')}
        </span>
        <span className="text-muted-foreground">in one table</span>
      </div>

      <p className="text-xs text-error">
        $60, $8.50, $1,204, $99.00 — the decimal point lands in a different column on every row, so
        the digits never line up and no two amounts can be compared at a glance.
      </p>
    </div>
  );
}
