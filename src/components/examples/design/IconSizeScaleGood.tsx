/**
 * Good: two decisions instead of ten. ONE stroke width across the whole set, and ONE
 * size scale (16 / 20 / 24 → size-4 / size-5 / size-6) bound to the type scale, so an
 * icon is sized by the text it sits beside rather than by eye.
 */
const STROKE = 1.75;

type Glyph = { label: string; d: string };

const TOOLS: Glyph[] = [
  { label: 'Bold', d: 'M6 4h6a4 4 0 0 1 0 8H6zM6 12h7a4 4 0 0 1 0 8H6z' },
  { label: 'Link', d: 'M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1' },
  { label: 'Quote', d: 'M7 6H4v6h5V6H7zm10 0h-3v6h5V6h-2z' },
  { label: 'List', d: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01' },
  { label: 'Code', d: 'M8 18l-6-6 6-6M16 6l6 6-6 6' },
];

function Icon({ d, className }: { d: string; className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={d} />
    </svg>
  );
}

export function IconSizeScaleGood() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <p className="text-xs text-muted-foreground">Editor toolbar &middot; one scale, one stroke</p>

      <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-2">
        {TOOLS.map((tool) => (
          <button
            key={tool.label}
            type="button"
            aria-label={tool.label}
            className="flex size-9 items-center justify-center rounded-md text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {/* Toolbar controls all take the same step of the scale */}
            <Icon d={tool.d} className="size-5" />
          </button>
        ))}
      </div>

      {/* Icons sized to the text they sit beside: size-4 next to text-sm, size-6 next to text-lg */}
      <div className="space-y-2 rounded-lg border border-border bg-card p-3">
        <p className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Icon d={TOOLS[4].d} className="size-6 shrink-0" />
          Snippets
        </p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon d={TOOLS[3].d} className="size-4 shrink-0" />
          Four items in this collection
        </p>
      </div>

      <div className="space-y-1 rounded bg-muted p-2 font-mono text-xs">
        <code className="block">scale: size-4 (16) / size-5 (20) / size-6 (24)</code>
        <code className="block">stroke: {STROKE} everywhere</code>
      </div>

      <p className="text-xs text-success">
        One stroke width means every glyph carries the same apparent weight, so nothing looks
        bolder than its neighbour by accident. One size scale, bound to the type scale, means the
        icon size is derived rather than chosen &mdash; there is no 18px to guess at.
      </p>
    </div>
  );
}
