/**
 * GOOD: the same parallax hero on a CSS view timeline.
 * The compositor advances the animation, so it stays locked to the scroll position
 * even while the main thread is blocked. No JS runs during the scroll at all.
 */
export function NoScrollEventAnimationGood() {
  const blockMainThread = () => {
    const end = performance.now() + 500;
    while (performance.now() < end) {
      // Same 500ms long task — the animation does not care
    }
  };

  return (
    <div className="space-y-3">
      <style>{`
        @keyframes hero-parallax {
          to { transform: translateY(70px); opacity: 0; }
        }
        .sdt-scroller { scroll-timeline: --hero block; }
        .sdt-hero {
          animation: hero-parallax linear both;
          animation-timeline: --hero;
          animation-range: 0 220px;
        }
        @media (prefers-reduced-motion: reduce) {
          .sdt-hero { animation: none; }
        }
      `}</style>

      <button
        type="button"
        onClick={blockMainThread}
        className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Block the main thread for 500ms
      </button>

      <div className="sdt-scroller h-48 overflow-y-auto rounded-lg border border-border bg-muted">
        <div className="sticky top-0 h-24 overflow-hidden bg-card">
          <div className="sdt-hero p-4">
            <p className="text-sm font-semibold text-foreground">Parallax hero</p>
            <p className="text-xs text-muted-foreground">driven by scroll-timeline, zero JS</p>
          </div>
        </div>
        <div className="h-96 p-4 text-xs text-muted-foreground">Scroll me, then hit the button while scrolling.</div>
      </div>

      <p className="text-xs text-success">
        The timeline lives on the compositor: the hero tracks the scrollbar exactly, and the 500ms block
        does not stutter it. Where scroll timelines are unsupported the layout is simply static — still readable.
      </p>
    </div>
  );
}
