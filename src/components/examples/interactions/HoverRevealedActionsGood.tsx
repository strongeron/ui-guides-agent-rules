import { useState } from 'react';

const ROWS = [
  { id: 1, name: 'invoice-2026-01.pdf', size: '248 KB' },
  { id: 2, name: 'contract-draft.docx', size: '84 KB' },
  { id: 3, name: 'q3-report.xlsx', size: '1.2 MB' },
];

/**
 * GOOD: focus parity with hover.
 * `group-focus-within:opacity-100` gives keyboard focus exactly the same reveal that
 * hover gives the pointer, and the button keeps its place in the tab order. One extra
 * utility, and the action becomes reachable for everyone.
 */
export function HoverRevealedActionsGood() {
  const [rows, setRows] = useState(ROWS);

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Try it with Tab only — no mouse.</p>

      <ul className="divide-y divide-border rounded-lg border border-border">
        {rows.map((row) => (
          <li key={row.id} className="group flex items-center justify-between gap-4 p-3">
            <div>
              <p className="text-sm text-foreground">{row.name}</p>
              <p className="text-xs text-muted-foreground">{row.size}</p>
            </div>
            <button
              type="button"
              onClick={() => setRows((prev) => prev.filter((r) => r.id !== row.id))}
              aria-label={`Delete ${row.name}`}
              // Hover reveals it for pointers; focus-within reveals it for keyboards.
              className="rounded-md border border-border px-2 py-1 text-xs text-destructive opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <p className="text-xs text-success">
        Tab into a row and its Delete button appears with a visible focus ring, announced as
        &ldquo;Delete invoice-2026-01.pdf&rdquo;. The row still stays quiet until you point at it or focus it.
      </p>
    </div>
  );
}
