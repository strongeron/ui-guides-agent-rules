export function IbelickTwAnimateGood() {
  return (
    <div className="space-y-4">
      {/* Using tw-animate-css utilities (simulated with Tailwind animate-in) */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 p-4 bg-muted rounded-lg">
        Animated with tw-animate-css utilities
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100 p-4 bg-muted rounded-lg">
        Staggered with delay utilities
      </div>
      <p className="text-xs text-success mt-4">
        tw-animate-css provides consistent, composable animation utilities
      </p>
    </div>
  );
}
