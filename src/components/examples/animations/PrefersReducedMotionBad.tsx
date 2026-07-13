import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';

export function PrefersReducedMotionBad() {
  return (
    <div className="space-y-4">
      <ReducedMotionSwitch />
      <div className="h-16 flex items-center rounded-lg bg-muted/50 px-3 overflow-hidden">
        <div
          className="size-8 rounded-md bg-primary"
          style={{ animation: 'rmSlide 1.2s ease-in-out infinite alternate' }}
        />
      </div>
      <style>{`@keyframes rmSlide { from { transform: translateX(0); } to { transform: translateX(180px); } }`}</style>
      <p className="text-xs text-destructive">
        The animation runs regardless of the preference — toggling "reduce motion" changes nothing, so sensitive users get no relief
      </p>
    </div>
  );
}
