/**
 * Bad: the column truncates cleanly — and every row truncates to the same string.
 *
 * `truncate` did its job: nothing overflows, the grid holds. But the part of the
 * name that told the rows apart lived in the tail, and the tail is gone. The user
 * cannot pick the right invoice, cannot tell the draft from the final, and has no
 * way to recover the value: no tooltip, no expanded view, no full name anywhere.
 */

const FILES = [
  { name: 'invoice-2026-q3-acme-holdings-final-v2.pdf', size: '184 KB', date: 'Jul 2' },
  { name: 'invoice-2026-q3-acme-holdings-draft.pdf', size: '181 KB', date: 'Jun 28' },
  { name: 'invoice-2026-q3-acme-logistics-final.pdf', size: '203 KB', date: 'Jun 24' },
];

export function TruncationKeepsValueBad() {
  return (
    <div className="w-full space-y-3">
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th scope="col" className="w-1/2 px-3 py-2 font-medium">
                Name
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                Size
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                Modified
              </th>
            </tr>
          </thead>
          <tbody>
            {FILES.map((file) => (
              <tr key={file.name} className="border-b border-border last:border-0">
                {/* No title, no tooltip, no expanded view — the tail is simply unreachable */}
                <td className="truncate px-3 py-2 text-foreground">{file.name}</td>
                <td className="px-3 py-2 tabular-nums text-muted-foreground">{file.size}</td>
                <td className="px-3 py-2 text-muted-foreground">{file.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-destructive">
        Three different files, one visible name: <code>invoice-2026-q3-a…</code>. The only thing
        left to choose by is the file size. Truncation that hides the discriminating part of a value
        and offers no way back to it has not shortened the content — it has deleted it.
      </p>
    </div>
  );
}
