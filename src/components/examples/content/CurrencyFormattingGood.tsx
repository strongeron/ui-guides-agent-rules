const ROWS = [
  { item: 'Pro seats (3)', cents: 6000 },
  { item: 'Bandwidth overage', cents: 850 },
  { item: 'Edge function invocations', cents: 120400 },
  { item: 'Image optimization', cents: 9900 },
  { item: 'Support add-on', cents: 1200 },
];

// One context, one precision: an invoice needs cents, so every row gets cents.
const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const total = ROWS.reduce((sum, row) => sum + row.cents, 0);

export function CurrencyFormattingGood() {
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="mb-3 font-medium text-foreground">Invoice · June</h4>
        <table className="w-full text-sm">
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.item} className="border-b border-border last:border-0">
                <td className="py-2 text-muted-foreground">{row.item}</td>
                <td className="py-2 text-right font-medium tabular-nums text-foreground">
                  {usd.format(row.cents / 100)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="pt-3 font-medium text-foreground">Total</td>
              <td className="pt-3 text-right font-medium tabular-nums text-foreground">
                {usd.format(total / 100)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-success">
          decimal places used: 2 · everywhere
        </span>
        <span className="text-muted-foreground">tabular-nums + right aligned</span>
      </div>

      <p className="text-xs text-success">
        One precision for the whole context, including the round amounts. With tabular figures the
        decimal separators stack into a single vertical line, so magnitudes read off the column.
      </p>
    </div>
  );
}
