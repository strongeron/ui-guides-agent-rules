import { useEffect, useRef, useState } from 'react';
import { useFrameRate } from '@/hooks/useFrameRate';
import { FpsMeter } from '@/components/demo-kit/FpsMeter';
import { blockMainThread } from '@/lib/demo';

export function FrameBudgetBad() {
  const [running, setRunning] = useState(false);
  const fps = useFrameRate(running);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let x = 0;
    let dir = 1;
    const loop = () => {
      x += dir * 3;
      if (x > 160 || x < 0) dir *= -1;
      // BAD: ~20ms of synchronous work every frame — blows the 16ms budget.
      blockMainThread(20);
      if (boxRef.current) boxRef.current.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setRunning((v) => !v)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-colors duration-150 ease-out hover:bg-primary/90"
        >
          {running ? 'Stop' : 'Start'}
        </button>
        <FpsMeter fps={running ? fps : 60} />
      </div>
      <div className="relative h-12 rounded-lg bg-muted/50 overflow-hidden">
        <div ref={boxRef} className="absolute top-2 left-0 size-8 rounded-md bg-primary" />
      </div>
      <p className="text-xs text-destructive">
        ~20ms of JS work every frame blows the 16ms budget — the counter drops well below 60fps and the box stutters
      </p>
    </div>
  );
}
