export function TabularNumbersBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2">Item</th>
              <th className="text-right py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-2">Product A</td>
              <td className="text-right py-2">$1,234.56</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2">Product B</td>
              <td className="text-right py-2">$987.00</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2">Product C</td>
              <td className="text-right py-2">$12.99</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Proportional numbers don't align vertically
      </p>
    </div>
  );
}
