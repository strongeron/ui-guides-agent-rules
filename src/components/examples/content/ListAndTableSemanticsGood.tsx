/**
 * GOOD: the same two blocks, with the structure the browser can actually expose.
 * `ul`/`li` gives "list, 5 items" and list navigation. `th scope` associates every cell
 * with its row and column, so a cell in the middle of the grid reads as
 * "Revenue, Q3, 42" instead of a naked number.
 * Identical pixels — `list-none` removes the marker, not the semantics.
 */
export function ListAndTableSemanticsGood() {
  return (
    <div className="space-y-4">
      <div>
        <p id="deploy-steps-label" className="mb-2 text-sm font-medium text-foreground">
          Deploy steps
        </p>
        <ul aria-labelledby="deploy-steps-label" className="list-none space-y-2">
          {['Install dependencies', 'Run tests', 'Build bundle', 'Upload artifact', 'Invalidate cache'].map(
            (step) => (
              <li key={step} className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground">
                {step}
              </li>
            )
          )}
        </ul>
      </div>

      <table className="w-full table-fixed border-collapse overflow-hidden rounded-md border border-border">
        <caption className="mb-2 text-left text-sm font-medium text-foreground">Revenue</caption>
        <thead>
          <tr className="border-b border-border bg-muted">
            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-foreground">
              Region
            </th>
            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-foreground">
              Q2
            </th>
            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-foreground">
              Q3
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            ['EMEA', '38', '42'],
            ['AMER', '51', '55'],
          ].map(([region, q2, q3]) => (
            <tr key={region} className="border-b border-border last:border-b-0">
              <th scope="row" className="px-3 py-2 text-left text-sm font-normal text-foreground">
                {region}
              </th>
              <td className="px-3 py-2 text-sm text-foreground">{q2}</td>
              <td className="px-3 py-2 text-sm text-foreground">{q3}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-success">
        Announced for the same cell: <span className="font-mono">&ldquo;Revenue, EMEA, Q3, 42&rdquo;</span> —
        caption, row header, column header, value. And the list announces &ldquo;list, 5 items&rdquo;.
      </p>
    </div>
  );
}
