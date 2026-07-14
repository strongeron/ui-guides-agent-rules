import { useRef, useState } from 'react';

const SLIDES = ['Overview', 'Pricing', 'Changelog', 'Support'];

export function GestureAlternativeGood() {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  const go = (next: number) =>
    setIndex(Math.min(Math.max(next, 0), SLIDES.length - 1));

  return (
    <div className="w-full max-w-sm">
      {/* Swipe is kept — it is just no longer load-bearing. The same region is a
          single tab stop that answers ArrowLeft / ArrowRight. */}
      <div
        role="group"
        aria-label="Slides"
        tabIndex={0}
        onPointerDown={(e) => {
          startX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) < 40) return;
          go(index + (dx < 0 ? 1 : -1));
        }}
        onKeyDown={(e) => {
          if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
          e.preventDefault();
          e.stopPropagation();
          go(index + (e.key === 'ArrowRight' ? 1 : -1));
        }}
        className="flex h-32 touch-pan-y select-none items-center justify-center rounded-lg border border-border bg-card text-lg font-medium text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        {SLIDES[index]}
      </div>

      <div className="mt-3 flex items-center justify-center gap-3">
        {/* Single-pointer alternative: a discrete tap on a discrete target. */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="flex size-8 items-center justify-center rounded border border-border text-foreground hover:bg-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30"
        >
          <span aria-hidden="true">←</span>
          <span className="sr-only">Previous slide</span>
        </button>

        <div className="flex gap-1.5">
          {SLIDES.map((slide, i) => (
            <button
              key={slide}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to ${slide}`}
              aria-current={i === index ? 'true' : undefined}
              className="flex size-6 items-center justify-center rounded-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                aria-hidden="true"
                className={`size-2 rounded-full ${i === index ? 'bg-primary' : 'bg-muted'}`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === SLIDES.length - 1}
          className="flex size-8 items-center justify-center rounded border border-border text-foreground hover:bg-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30"
        >
          <span aria-hidden="true">→</span>
          <span className="sr-only">Next slide</span>
        </button>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Swipe still works. So does clicking ← / → , clicking a dot (each is a real
        button with a ≥24px hit target), and pressing the arrow keys once the card
        itself is focused. Every operation is reachable with one pointer, no path.
      </p>

      <p className="mt-2 text-xs text-success">
        The gesture is an accelerator layered over single-pointer controls
      </p>
    </div>
  );
}
