export function LocaleFormatsBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Transaction Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Date</span>
            <span className="text-sm font-medium">12/25/2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Amount</span>
            <span className="text-sm font-medium">$1,234.56</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Items</span>
            <span className="text-sm font-medium">1,000</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Hardcoded US format. A German user would expect 25.12.2024 for date and 1.234,56 € for currency.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Hardcoded format - confusing for international users
      </p>
    </div>
  );
}
