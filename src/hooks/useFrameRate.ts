import { useEffect, useRef, useState } from 'react';

/**
 * Live frames-per-second, sampled ~4x/second while `active`. Because it is
 * driven by requestAnimationFrame on the main thread, it drops whenever the
 * main thread is busy — which is exactly what the performance demos want to show.
 */
export function useFrameRate(active: boolean): number {
  const [fps, setFps] = useState(60);
  const frames = useRef(0);
  const last = useRef(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let mounted = true;
    frames.current = 0;
    last.current = 0;

    const loop = (t: number) => {
      if (!mounted) return;
      if (!last.current) last.current = t;
      frames.current += 1;
      const elapsed = t - last.current;
      if (elapsed >= 250) {
        setFps(Math.round((frames.current * 1000) / elapsed));
        frames.current = 0;
        last.current = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
    };
  }, [active]);

  return fps;
}
