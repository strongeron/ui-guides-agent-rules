import { useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';

export function TailwindMotionVariantsBad() {
  const [replay, setReplay] = useState(0);

  return (
    <div className="space-y-4">
      <ReducedMotionSwitch />
      <button
        onClick={() => setReplay((v) => v + 1)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Replay
      </button>
      <div key={replay} className="rounded-lg bg-muted p-3 text-sm" style={{ animation: 'tmSlide 400ms ease-out' }}>
        Always slides in (no variant)
      </div>
      <style>{`@keyframes tmSlide { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <p className="text-xs text-destructive">
        A raw animation with no <code>motion-reduce:</code> variant — it slides in even when the user asked for less motion
      </p>
    </div>
  );
}
