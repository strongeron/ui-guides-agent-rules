import { useRef, type UIEvent } from 'react';

/**
 * BAD: the parallax hero is driven by a scroll listener.
 * The handler runs AFTER the browser has already painted that scroll offset,
 * so the effect is permanently one frame late — and it dies entirely whenever
 * the main thread is busy.
 */
export function NoScrollEventAnimationBad() {
  const heroRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const top = event.currentTarget.scrollTop; // layout read, every single tick
    const hero = heroRef.current;
    if (!hero) return;
    // Style writes on the main thread, after paint
    hero.style.transform = `translateY(${top * 0.35}px)`;
    hero.style.opacity = String(Math.max(0, 1 - top / 220));
  };

  const blockMainThread = () => {
    const end = performance.now() + 500;
    while (performance.now() < end) {
      // Simulates a long task: hydration, a big JSON parse, a third-party script
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={blockMainThread}
        className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Block the main thread for 500ms
      </button>

      <div
        onScroll={handleScroll}
        className="h-48 overflow-y-auto rounded-lg border border-border bg-muted"
      >
        <div className="sticky top-0 h-24 overflow-hidden bg-card">
          <div ref={heroRef} className="p-4">
            <p className="text-sm font-semibold text-foreground">Parallax hero</p>
            <p className="text-xs text-muted-foreground">position written by a scroll handler</p>
          </div>
        </div>
        <div className="h-96 p-4 text-xs text-muted-foreground">Scroll me, then hit the button while scrolling.</div>
      </div>

      <p className="text-xs text-destructive">
        Scroll and it already lags a frame behind. Scroll while the main thread is blocked and the hero
        freezes solid while the content keeps moving underneath it.
      </p>
    </div>
  );
}
