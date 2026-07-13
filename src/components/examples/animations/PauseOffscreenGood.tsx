import { useEffect, useRef, useState } from 'react';

export function PauseOffscreenGood() {
  const rootRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    const target = targetRef.current;
    if (!root || !target) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      root,
      threshold: 0.5,
    });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Scroll inside the box — the spinner pauses when hidden.</p>
      <div ref={rootRef} className="h-32 overflow-y-auto rounded-lg border border-border p-3">
        <div className="h-28" />
        <div ref={targetRef} className="flex items-center gap-2 py-2">
          <span
            className="inline-block size-6 rounded-full border-4 border-primary border-t-transparent"
            style={{ animation: 'pauseSpin 1s linear infinite', animationPlayState: visible ? 'running' : 'paused' }}
          />
          <span className="text-xs">{visible ? 'running' : 'paused (off-screen)'}</span>
        </div>
        <div className="h-28" />
      </div>
      <style>{`@keyframes pauseSpin { to { transform: rotate(360deg); } }`}</style>
      <p className="text-xs text-success">
        An IntersectionObserver pauses the spinner (<code>animation-play-state: paused</code>) once it scrolls out of view
      </p>
    </div>
  );
}
