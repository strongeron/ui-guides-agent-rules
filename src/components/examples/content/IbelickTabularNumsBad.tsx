export function IbelickTabularNumsBad() {
  const data = [
    { name: 'Product A', price: 1.99, qty: 111 },
    { name: 'Product B', price: 24.50, qty: 8 },
    { name: 'Product C', price: 199.00, qty: 42 },
  ];

  return (
    <div className="space-y-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Product</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Qty</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name} className="border-b">
              <td className="py-2">{row.name}</td>
              <td className="text-right py-2">${row.price.toFixed(2)}</td>
              <td className="text-right py-2">{row.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-destructive">
        Proportional numbers - columns don't align properly
      </p>
    </div>
  );
}
