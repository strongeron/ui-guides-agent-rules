export function PauseStopHideBad() {
  return (
    <div className="space-y-4">
      <div className="relative h-32 bg-muted rounded-lg overflow-hidden">
        {/* Auto-playing carousel with no pause controls */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            animation: 'slideCarousel 6s linear infinite',
          }}
        >
          <div className="flex gap-4">
            <div className="w-24 h-20 bg-primary rounded-md flex items-center justify-center text-primary-foreground text-xs">
              Slide 1
            </div>
            <div className="w-24 h-20 bg-primary rounded-md flex items-center justify-center text-primary-foreground text-xs">
              Slide 2
            </div>
            <div className="w-24 h-20 bg-primary rounded-md flex items-center justify-center text-primary-foreground text-xs">
              Slide 3
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideCarousel {
          0%, 30% { transform: translateX(0); }
          33%, 63% { transform: translateX(-128px); }
          66%, 96% { transform: translateX(-256px); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <p className="text-xs text-destructive">
        ✗ Carousel auto-plays forever with no pause/stop controls (WCAG 2.2.2 violation)
      </p>
    </div>
  );
}
