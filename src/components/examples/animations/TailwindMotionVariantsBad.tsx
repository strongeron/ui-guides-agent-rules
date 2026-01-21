export function TailwindMotionVariantsBad() {
  return (
    <div className="space-y-4">
      {/* BAD: Animation runs regardless of user motion preference */}
      <div className="flex gap-3">
        <div
          className="size-12 bg-primary rounded-lg animate-bounce"
          // animate-bounce runs even if user prefers reduced motion
        />
        <div
          className="size-12 bg-primary rounded-lg animate-pulse"
          // animate-pulse runs even if user prefers reduced motion
        />
        <div
          className="size-12 bg-primary rounded-lg animate-spin"
          // animate-spin runs even if user prefers reduced motion
        />
      </div>

      <p className="text-xs text-destructive">
        ✗ Animations always run - ignores prefers-reduced-motion setting
      </p>
      <p className="text-xs text-muted-foreground">
        Try enabling "Reduce motion" in your OS accessibility settings
      </p>
    </div>
  );
}
