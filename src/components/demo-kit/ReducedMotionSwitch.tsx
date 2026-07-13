import { useSimulatedReducedMotion, setSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

export function ReducedMotionSwitch() {
  const on = useSimulatedReducedMotion();
  return (
    <label className="inline-flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
      <input
        type="checkbox"
        checked={on}
        onChange={(e) => setSimulatedReducedMotion(e.target.checked)}
        className="size-3.5 accent-primary"
      />
      Simulate reduce motion
    </label>
  );
}
