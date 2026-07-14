import { useEffect, useRef, useState } from 'react';

const rows = Array.from({ length: 20 }, (_, i) => i);

/** Count how many elements the CSS has actually promoted to their own layer. */
function usePromotedCount(ref: React.RefObject<HTMLDivElement | null>) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const all = [root, ...Array.from(root.querySelectorAll('*'))];
    setCount(all.filter((el) => getComputedStyle(el).willChange.includes('transform')).length);
  }, [ref]);
  return count;
}

export function GpuTranslateZGood() {
  const ref = useRef<HTMLDivElement>(null);
  const promoted = usePromotedCount(ref);

  return (
    <div className="w-full max-w-sm space-y-3">
      <style>{`@keyframes gpuSlide { from { transform: translateX(0); } to { transform: translateX(140px); } }`}</style>

      <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium tabular-nums text-success">
        promoted layers: {promoted}
      </span>

      <div ref={ref} className="bg-card border border-border rounded-lg p-3">
        <div className="relative h-8 mb-2 rounded bg-muted/50 overflow-hidden">
          {/* Only the element that actually moves is promoted. */}
          <div
            className="absolute top-1 size-6 rounded bg-primary"
            style={{ animation: 'gpuSlide 1.4s ease-in-out infinite alternate', willChange: 'transform' }}
          />
        </div>
        <div className="max-h-28 overflow-y-auto space-y-1 pr-1">
          {rows.map((i) => (
            <div key={i} className="p-1.5 bg-muted rounded text-xs">
              Static row {i + 1}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-success">
        The same motion, promoting exactly one element: the one that moves. Everything else stays on the normal paint
        path and costs no GPU memory
      </p>
    </div>
  );
}
