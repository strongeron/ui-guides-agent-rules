export function TabularNumbersGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2">Item</th>
              <th className="text-right py-2" style={{ fontVariantNumeric: 'tabular-nums' }}>Price</th>
            </tr>
          </thead>
          <tbody style={{ fontVariantNumeric: 'tabular-nums' }}>
            <tr className="border-b border-border">
              <td className="py-2">Product A</td>
              <td className="text-right py-2">$1,234.56</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2">Product B</td>
              <td className="text-right py-2">$987.00</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2">Product C</td>
              <td className="text-right py-2">$12.99</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Tabular numbers align perfectly for easy comparison
      </p>
    </div>
  );
}
