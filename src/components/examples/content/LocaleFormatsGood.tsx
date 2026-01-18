export function LocaleFormatsGood() {
  const date = new Date(2024, 11, 25);
  const amount = 1234.56;
  const items = 1000;

  // Using Intl API for locale-aware formatting
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  });
  const numberFormatter = new Intl.NumberFormat(undefined);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Transaction Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Date</span>
            <span className="text-sm font-medium">{dateFormatter.format(date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Amount</span>
            <span className="text-sm font-medium">{currencyFormatter.format(amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Items</span>
            <span className="text-sm font-medium">{numberFormatter.format(items)}</span>
          </div>
        </div>
        <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-2">
          <code className="text-xs text-green-800 font-mono">
            Intl.DateTimeFormat / Intl.NumberFormat
          </code>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Intl API formats for user's locale automatically
      </p>
    </div>
  );
}
