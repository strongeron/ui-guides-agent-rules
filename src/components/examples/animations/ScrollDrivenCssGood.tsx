/**
 * GOOD: the same reveal on a view timeline.
 * Progress is bound to the card's position in the scrollport, not to a clock — so it
 * scrubs in both directions, tracks the scrollbar exactly, and needs no JS at all.
 */
export function ScrollDrivenCssGood() {
  return (
    <div className="space-y-3">
      <style>{`
        @keyframes sdc-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: none; }
        }
        .sdc-card {
          animation: sdc-fade-up linear both;
          animation-timeline: view();
          animation-range: entry 0% cover 40%;
        }
        @supports not (animation-timeline: view()) {
          /* No timeline support: show the content, do not hide it behind an animation. */
          .sdc-card { animation: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sdc-card { animation: none; }
        }
      `}</style>

      <div className="h-48 overflow-y-auto rounded-lg border border-border bg-muted p-4">
        <p className="pb-40 text-xs text-muted-foreground">Scroll down, then back up.</p>
        <ul className="space-y-6 pb-8">
          {[0, 1, 2, 3].map((i) => (
            <li
              key={i}
              className="sdc-card rounded-md border border-border bg-card p-3 text-sm text-foreground"
            >
              Card {i + 1}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-success">
        Each card is scrubbed by its own entry into view: halfway there is a real halfway state, and scrolling
        back up reverses it. Unsupported browsers fall back to the plain, fully visible layout via @supports.
      </p>
    </div>
  );
}
