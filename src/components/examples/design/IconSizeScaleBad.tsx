/**
 * Bad: a toolbar assembled one icon at a time. Five glyphs at w-4, w-5, size-[18px],
 * h-6 and w-5, with stroke widths drifting between 1.5 and 2.5. Every button is
 * centered and every box aligns — and the row still reads as ragged, because the eye
 * compares the drawn marks, not the boxes around them.
 */
type Glyph = { label: string; box: string; stroke: number; d: string };

const TOOLS: Glyph[] = [
  { label: 'Bold', box: 'w-4 h-4', stroke: 2.5, d: 'M6 4h6a4 4 0 0 1 0 8H6zM6 12h7a4 4 0 0 1 0 8H6z' },
  { label: 'Link', box: 'w-5 h-5', stroke: 1.5, d: 'M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1' },
  { label: 'Quote', box: 'w-[18px] h-[18px]', stroke: 2, d: 'M7 6H4v6h5V6H7zm10 0h-3v6h5V6h-2z' },
  { label: 'List', box: 'w-6 h-6', stroke: 1.5, d: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01' },
  { label: 'Code', box: 'w-5 h-5', stroke: 2.25, d: 'M8 18l-6-6 6-6M16 6l6 6-6 6' },
];

export function IconSizeScaleBad() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <p className="text-xs text-muted-foreground">Editor toolbar &middot; each icon sized by eye</p>

      <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-2">
        {TOOLS.map((tool) => (
          <button
            key={tool.label}
            type="button"
            aria-label={tool.label}
            className="flex size-9 items-center justify-center rounded-md text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={tool.stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={tool.box}
            >
              <path d={tool.d} />
            </svg>
          </button>
        ))}
      </div>

      <div className="space-y-1 rounded bg-muted p-2 font-mono text-xs">
        <code className="block text-error">sizes: w-4, w-5, w-[18px], w-6, w-5</code>
        <code className="block text-error">strokes: 2.5, 1.5, 2, 1.5, 2.25</code>
      </div>

      <p className="text-xs text-error">
        Optically ragged even though every glyph is perfectly centered in a 36px button. The
        sizes come from four different decisions and the strokes from five, so Bold looks heavy,
        Link looks faint, and nothing in the row belongs to anything else. The lone{' '}
        <code className="font-mono">w-[18px]</code> is a magic number the next person will guess wrong.
      </p>
    </div>
  );
}
