import { useEffect, useRef } from 'react';
import { blockMainThread } from '@/lib/demo';

export function ImplementationPreferenceBad() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let start = 0;
    const period = 1600;
    const loop = (t: number) => {
      if (!start) start = t;
      const p = ((t - start) % period) / period;
      const tri = p < 0.5 ? p * 2 : 2 - p * 2; // 0→1→0 triangle wave
      if (boxRef.current) boxRef.current.style.transform = `translateX(${tri * 160}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Click "Run heavy task" and watch the box.</p>
      <div className="relative h-12 rounded-lg bg-muted/50 overflow-hidden">
        <div ref={boxRef} className="absolute top-2 left-0 size-8 rounded-md bg-primary" />
      </div>
      <button
        onClick={() => blockMainThread(800)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Run heavy task (0.8s)
      </button>
      <p className="text-xs text-destructive">
        JavaScript drives the transform via <code>requestAnimationFrame</code> on the main thread — it freezes while the thread is busy
      </p>
    </div>
  );
}
