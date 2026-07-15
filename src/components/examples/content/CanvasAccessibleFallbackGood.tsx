import { useEffect, useRef } from 'react';

const DATA = [
  { label: 'Q1', value: 12 },
  { label: 'Q2', value: 18 },
  { label: 'Q3', value: 15 },
  { label: 'Q4', value: 24 },
];

const SUMMARY = `Revenue by quarter: ${DATA.map((d) => `${d.label} $${d.value}k`).join(', ')}.`;

/**
 * The same chart, made reachable three ways: role="img" plus an aria-label that states
 * the data, a visually-hidden data table as the non-canvas alternative, and a visible
 * caption. Turn the pixels off and the information survives.
 */
export function CanvasAccessibleFallbackGood() {
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
      <figure className="rounded-lg border border-border bg-card p-4 text-primary">
        <canvas ref={ref} role="img" aria-label={SUMMARY} width={280} height={120} className="w-full" />
        <figcaption className="mt-2 text-xs text-muted-foreground">Revenue by quarter (thousands)</figcaption>
        {/* Non-canvas alternative — read by AT, and the fallback if canvas is unsupported */}
        <table className="sr-only">
          <caption>{SUMMARY}</caption>
          <thead>
            <tr>
              <th scope="col">Quarter</th>
              <th scope="col">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {DATA.map((d) => (
              <tr key={d.label}>
                <th scope="row">{d.label}</th>
                <td>${d.value}k</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
      <p className="mt-4 text-xs text-success">
        Named with role=&quot;img&quot; + aria-label, and backed by a hidden data table — the numbers survive without the pixels.
      </p>
    </div>
  );
}
