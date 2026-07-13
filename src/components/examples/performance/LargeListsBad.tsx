import { useFrameRate } from '@/hooks/useFrameRate';
import { FpsMeter } from '@/components/demo-kit/FpsMeter';

const items = Array.from({ length: 1000 }, (_, i) => i);

export function LargeListsBad() {
  const fps = useFrameRate(true);

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Scroll fast</span>
        <FpsMeter fps={fps} />
      </div>
      <div className="h-64 overflow-auto overscroll-contain bg-card border border-border rounded-lg">
        {items.map((i) => (
          <div key={i} className="p-3 border-b border-border">
            <div className="font-medium text-sm">Item {i + 1}</div>
            <div className="text-xs text-muted-foreground">This is the description for item {i + 1}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-destructive">
        All 1000 rows are laid out and painted, including the ones far outside the viewport. Scrolling has to do the
        work every frame
      </p>
    </div>
  );
}
