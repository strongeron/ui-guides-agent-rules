export function TailwindMotionVariantsGood() {
  return (
    <div className="space-y-4">
      {/* GOOD: motion-safe: applies animations only when user allows motion */}
      <div className="flex gap-3">
        <div
          className="size-12 bg-primary rounded-lg motion-safe:animate-bounce motion-reduce:opacity-80"
          // Only bounces if motion is allowed
        />
        <div
          className="size-12 bg-primary rounded-lg motion-safe:animate-pulse motion-reduce:opacity-80"
          // Only pulses if motion is allowed
        />
        <div
          className="size-12 bg-primary rounded-lg motion-safe:animate-spin motion-reduce:opacity-80"
          // Only spins if motion is allowed
        />
      </div>

      <p className="text-xs text-success">
        ✓ motion-safe:animate-* respects prefers-reduced-motion
      </p>
      <p className="text-xs text-muted-foreground">
        motion-reduce: provides alternative styling for reduced motion preference
      </p>
    </div>
  );
}
