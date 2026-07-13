import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

export function PrefersReducedMotionGood() {
  const reduced = useSimulatedReducedMotion();

  return (
    <div className="space-y-4">
      <ReducedMotionSwitch />
      <div className="h-16 flex items-center rounded-lg bg-muted/50 px-3 overflow-hidden">
        <div
          className="size-8 rounded-md bg-primary"
          style={{
            animation: reduced ? 'none' : 'rmSlide 1.2s ease-in-out infinite alternate',
            transform: reduced ? 'translateX(86px)' : undefined,
          }}
        />
      </div>
      <style>{`@keyframes rmSlide { from { transform: translateX(0); } to { transform: translateX(180px); } }`}</style>
      <p className="text-xs text-success">
        Toggle "reduce motion" on and the movement stops — the box simply rests. The content stays, just calm
      </p>
    </div>
  );
}
