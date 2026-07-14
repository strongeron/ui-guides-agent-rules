import { useState, useEffect } from 'react';

export function PauseStopHideGood() {
  const [isPaused, setIsPaused] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 2000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div className="space-y-4">
      <div className="relative h-32 bg-muted rounded-lg overflow-hidden">
        {/* Carousel with pause control */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
          style={{
            transform: `translateX(-${currentSlide * 128}px)`,
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

        {/* Pause/Play control */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute bottom-2 right-2 px-2 py-1 bg-background/90 rounded text-xs font-medium hover:bg-background focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
        >
          {isPaused ? '▶ Play' : '⏸ Pause'}
        </button>
      </div>
      <p className="text-xs text-success">
        ✓ Carousel has pause/play control - meets WCAG 2.2.2 Pause, Stop, Hide
      </p>
    </div>
  );
}
