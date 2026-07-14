import { useEffect, useRef, useState } from 'react';

/**
 * BAD: reveal-on-scroll via IntersectionObserver + a class toggle.
 * It is a one-shot trigger pretending to be a scroll-linked animation: it cannot
 * scrub, it plays at its own fixed duration however fast you scrolled, and on the
 * way back up it either snaps or does nothing.
 */
export function ScrollDrivenCssBad() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index);
          // Fires once, at one threshold. There is no "40% through" here.
          setRevealed((prev) => new Set(prev).add(index));
        }
      },
      { threshold: 0.5 }
    );
    for (const node of refs.current) if (node) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-3">
      <div className="h-48 overflow-y-auto rounded-lg border border-border bg-muted p-4">
        <p className="pb-40 text-xs text-muted-foreground">Scroll down, then back up.</p>
        <ul className="space-y-6 pb-8">
          {[0, 1, 2, 3].map((i) => (
            <li
              key={i}
              data-index={i}
              ref={(node) => {
                refs.current[i] = node;
              }}
              className="rounded-md border border-border bg-card p-3 text-sm text-foreground transition-[opacity,transform] duration-500"
              style={{
                opacity: revealed.has(i) ? 1 : 0,
                transform: revealed.has(i) ? 'none' : 'translateY(16px)',
              }}
            >
              Card {i + 1}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-destructive">
        Scroll fast and the cards still fade at their own 500ms pace, arriving late. Scroll back up and they
        stay stuck on — the effect has no reverse, because a class toggle has no timeline.
      </p>
    </div>
  );
}
