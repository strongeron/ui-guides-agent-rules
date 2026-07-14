import { useEffect, useRef, useState } from 'react';

const TRAVEL = 200;

/**
 * Bad: the knob is driven by keyframes. Every retrigger restarts the animation
 * from its declared `from` value, so an interrupted toggle snaps back to the
 * far end before it starts moving again.
 */
export function EmilTransitionsOverKeyframesBad() {
  const knobRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef<Animation | null>(null);
  const firstRender = useRef(true);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = knobRef.current;
    if (!el) return;

    // Keyframes are absolute: they always play from `from` to `to`,
    // regardless of where the element currently is.
    runningRef.current?.cancel();
    runningRef.current = el.animate(
      [
        { transform: `translateX(${on ? 0 : TRAVEL}px)` },
        { transform: `translateX(${on ? TRAVEL : 0}px)` },
      ],
      { duration: 600, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' }
    );
  }, [on]);

  return (
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={() => setOn((v) => !v)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Toggle — now spam-click it
      </button>

      <div className="relative h-16 rounded-full bg-muted p-2 overflow-hidden">
        <div ref={knobRef} className="h-12 w-12 rounded-full bg-primary" />
      </div>

      <p className="text-xs text-error">
        Spam-click mid-motion: the knob teleports back to the start of the keyframe before moving
      </p>
    </div>
  );
}
