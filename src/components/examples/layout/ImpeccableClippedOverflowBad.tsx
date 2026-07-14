import { useState } from 'react';

/**
 * Bad: `overflow-hidden` was added to the card so the header strip would clip
 * to the rounded corner. It also silently traps every absolutely-positioned
 * layer inside the card — including this row's actions menu, which is sliced
 * off at the card's bottom edge.
 */
export function ImpeccableClippedOverflowBad() {
  const [open, setOpen] = useState(true);

  const rows = [
    { name: 'invoice-2026-04.pdf', size: '182 KB' },
    { name: 'contract-signed.pdf', size: '1.1 MB' },
  ];

  return (
    <div className="w-full max-w-sm space-y-4">
      {/* overflow-hidden: added for the rounded corner, kept forever */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-md">
        <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">
          Documents &mdash; <code>overflow-hidden</code>
        </div>

        {rows.map((row, i) => (
          <div
            key={row.name}
            className="flex items-center justify-between border-b border-border px-4 py-3 last:border-b-0"
          >
            <div className="min-w-0">
              <p className="truncate text-sm text-foreground">{row.name}</p>
              <p className="text-xs text-muted-foreground">{row.size}</p>
            </div>

            <div className="relative">
              <button
                type="button"
                aria-expanded={i === rows.length - 1 ? open : false}
                onClick={() => i === rows.length - 1 && setOpen((v) => !v)}
                className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                &hellip;
              </button>

              {/* The menu is absolutely positioned inside the clipping ancestor */}
              {i === rows.length - 1 && open && (
                <div className="absolute right-0 top-full z-10 mt-1 w-36 rounded-lg border border-border bg-card py-1 shadow-lg">
                  <div className="px-3 py-1.5 text-sm text-foreground">Rename</div>
                  <div className="px-3 py-1.5 text-sm text-foreground">Duplicate</div>
                  <div className="px-3 py-1.5 text-sm text-foreground">Download</div>
                  <div className="px-3 py-1.5 text-sm text-error">Delete</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-error">
        The menu is cut off at the card edge. <code>z-index</code> cannot save it &mdash; a
        clipping ancestor removes the pixels before stacking is ever considered.
      </p>
    </div>
  );
}
