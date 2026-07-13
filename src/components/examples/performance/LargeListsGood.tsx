import { useFrameRate } from '@/hooks/useFrameRate';
import { FpsMeter } from '@/components/demo-kit/FpsMeter';

// Same 1000 items as the Bad example, so the comparison is honest.
const items = Array.from({ length: 1000 }, (_, i) => i);

export function LargeListsGood() {
  const fps = useFrameRate(true);

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Scroll fast</span>
        <FpsMeter fps={fps} />
      </div>
      <div className="h-64 overflow-auto overscroll-contain bg-card border border-border rounded-lg">
        {items.map((i) => (
          <div
            key={i}
            className="p-3 border-b border-border [content-visibility:auto] [contain-intrinsic-size:auto_66px]"
          >
            <div className="font-medium text-sm">Item {i + 1}</div>
            <div className="text-xs text-muted-foreground">This is the description for item {i + 1}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-success">
        The same 1000 rows, but <code>content-visibility: auto</code> skips rendering the ones off screen, and
        <code> contain-intrinsic-size</code> reserves their height so the scrollbar stays stable
      </p>
    </div>
  );
}
