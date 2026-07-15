import { useEffect, useRef } from 'react';

const DATA = [
  { label: 'Q1', value: 12 },
  { label: 'Q2', value: 18 },
  { label: 'Q3', value: 15 },
  { label: 'Q4', value: 24 },
];

/**
 * A bar chart painted straight onto a bare <canvas>. To a screen reader it is one
 * empty graphic: no name, no fallback, no data. The numbers are trapped in pixels.
 */
export function CanvasAccessibleFallbackBad() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const color = getComputedStyle(canvas).color;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const max = Math.max(...DATA.map((d) => d.value));
    const bw = canvas.width / DATA.length;
    DATA.forEach((d, i) => {
      const h = (d.value / max) * (canvas.height - 12);
      ctx.fillStyle = color;
      ctx.fillRect(i * bw + 8, canvas.height - h, bw - 16, h);
    });
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-4 text-primary">
        {/* No role, no aria-label, no fallback children, no data alternative */}
        <canvas ref={ref} width={280} height={120} className="w-full" />
      </div>
      <p className="mt-4 text-xs text-destructive">
        Screen readers announce nothing — an unnamed graphic with the data locked inside the bitmap.
      </p>
    </div>
  );
}
