import { useState } from 'react';

/**
 * Good: same column width, same truncation — but the value stays reachable.
 *
 * 1. Middle-truncate instead of tail-truncate. The head goes under the ellipsis and
 *    the discriminating tail (`…-final-v2.pdf`) survives, so the rows stay tellable
 *    apart at a glance.
 * 2. Keep the full string retrievable anyway: `title` gives it on hover and to the
 *    accessible name, and the toggle expands the column for keyboard and touch users,
 *    who never get a hover tooltip.
 */

const FILES = [
  { name: 'invoice-2026-q3-acme-holdings-final-v2.pdf', size: '184 KB', date: 'Jul 2' },
  { name: 'invoice-2026-q3-acme-holdings-draft.pdf', size: '181 KB', date: 'Jun 28' },
  { name: 'invoice-2026-q3-acme-logistics-final.pdf', size: '203 KB', date: 'Jun 24' },
];

const TAIL_LENGTH = 16;

export function TruncationKeepsValueGood() {
  const [expanded, setExpanded] = useState(false);

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
            {FILES.map((file) => {
              const head = file.name.slice(0, -TAIL_LENGTH);
              const tail = file.name.slice(-TAIL_LENGTH);

              return (
                <tr key={file.name} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 text-foreground">
                    {expanded ? (
                      <span className="break-all">{file.name}</span>
                    ) : (
                      /* Middle truncation: the head collapses under the ellipsis,
                         the tail is pinned and never clipped. */
                      <span title={file.name} className="flex min-w-0">
                        <span className="truncate">{head}</span>
                        <span className="shrink-0">{tail}</span>
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 tabular-nums text-muted-foreground">{file.size}</td>
                  <td className="px-3 py-2 text-muted-foreground">{file.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-pressed={expanded}
        className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        {expanded ? 'Truncate names' : 'Show full names'}
      </button>

      <p className="text-xs text-success">
        <code>…-holdings-final-v2.pdf</code> and <code>…-holdings-draft.pdf</code> are now two
        different rows. Truncation is a display choice; the value it hides has to stay retrievable —
        by tooltip, by accessible name, or by an expanded view.
      </p>
    </div>
  );
}
