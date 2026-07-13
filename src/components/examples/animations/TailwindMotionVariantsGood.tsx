import { useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

export function TailwindMotionVariantsGood() {
  const reduced = useSimulatedReducedMotion();
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
      <div
        key={replay}
        className="rounded-lg bg-muted p-3 text-sm"
        style={{ animation: reduced ? 'tmFade 200ms ease-out' : 'tmSlide 400ms ease-out' }}
      >
        {reduced ? 'Fades in (motion-reduce)' : 'Slides in (motion-safe)'}
      </div>
      <style>{`
        @keyframes tmSlide { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes tmFade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
      <p className="text-xs text-success">
        <code>motion-safe:</code> slides, <code>motion-reduce:</code> just fades — toggle to see it swap (this simulates the OS setting)
      </p>
    </div>
  );
}
