import { useRef, useState } from 'react';

const SLIDES = ['Overview', 'Pricing', 'Changelog', 'Support'];

export function GestureAlternativeBad() {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  return (
    <div className="w-full max-w-sm">
      {/* The ONLY way to change slides is a path-based gesture: press, travel at
          least 40px horizontally, release. No buttons, no keyboard, nothing
          focusable. A tap does nothing. */}
      <div
        onPointerDown={(e) => {
          startX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) < 40) return; // a tap is not a swipe
          setIndex((i) =>
            dx < 0 ? Math.min(i + 1, SLIDES.length - 1) : Math.max(i - 1, 0)
          );
        }}
        className="flex h-32 touch-pan-y select-none items-center justify-center rounded-lg border border-border bg-card text-lg font-medium text-foreground"
      >
        {SLIDES[index]}
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {SLIDES.map((slide, i) => (
          <span
            key={slide}
            aria-hidden="true"
            className={`size-2 rounded-full ${i === index ? 'bg-primary' : 'bg-muted'}`}
          />
        ))}
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Press inside the card and drag sideways — it advances. Now try anything else:
        a single click does nothing, Tab never reaches the carousel, arrow keys do
        nothing. The dots are decoration, not controls. The only route through this
        content is a horizontal path traced with a pointer.
      </p>

      <p className="mt-2 text-xs text-destructive">
        Path-based gesture is the sole operation — WCAG 2.5.1 failure
      </p>
    </div>
  );
}
