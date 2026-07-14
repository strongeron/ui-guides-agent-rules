import { useState } from 'react';

const ROWS = [
  { id: 1, name: 'invoice-2026-01.pdf', size: '248 KB' },
  { id: 2, name: 'contract-draft.docx', size: '84 KB' },
  { id: 3, name: 'q3-report.xlsx', size: '1.2 MB' },
];

/**
 * BAD: the row actions exist only on hover.
 * `opacity-0 group-hover:opacity-100` is a pointer-only state. The Delete button is
 * still in the tab order, so a keyboard user CAN focus it — they just cannot see it,
 * or its focus ring. Focus appears to vanish into the row, and the action is undiscoverable.
 */
export function HoverRevealedActionsBad() {
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
              // Revealed by hover and nothing else.
              className="rounded-md border border-border px-2 py-1 text-xs text-destructive opacity-0 transition-opacity group-hover:opacity-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <p className="text-xs text-destructive">
        Tab through the rows: focus lands on invisible Delete buttons. There is no ring to follow and no
        label to read — a keyboard user cannot aim, confirm, or even discover the action.
      </p>
    </div>
  );
}
