import { useEffect, useRef, useState } from 'react';

export function ScrollInteractionsGood() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [resetKey, setResetKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    {
      title: 'Lightning Fast',
      description: 'Built for speed with optimized performance',
      icon: '⚡',
    },
    {
      title: 'Secure by Default',
      description: 'Enterprise-grade security out of the box',
      icon: '🔒',
    },
    {
      title: 'Scale Infinitely',
      description: 'Grow without limits or constraints',
      icon: '📈',
    },
    {
      title: 'Always Available',
      description: '99.99% uptime guaranteed worldwide',
      icon: '🌍',
    },
  ];

  useEffect(() => {
    setVisibleItems(new Set());

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.3,
        rootMargin: '0px',
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [resetKey]);

  const handleReset = () => {
    setVisibleItems(new Set());
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Features</h3>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm"
        >
          Reset & Scroll
        </button>
      </div>

      <div
        ref={containerRef}
        className="space-y-3 max-h-64 overflow-y-auto pr-2"
      >
        {features.map((feature, index) => (
          <div
            key={`${feature.title}-${resetKey}`}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            data-index={index}
            className="p-4 bg-muted rounded-lg border border-border motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out"
            style={{
              opacity: visibleItems.has(index) ? 1 : 0,
              transform: visibleItems.has(index)
                ? 'translateY(0)'
                : 'translateY(20px)',
              transitionDelay: `${(index % 2) * 100}ms`,
            }}
          >
            <div className="flex items-start gap-3">
              <span
                className="text-2xl motion-safe:transition-transform motion-safe:duration-300 hover:scale-110"
                role="img"
                aria-hidden="true"
              >
                {feature.icon}
              </span>
              <div>
                <h4 className="font-medium text-foreground">{feature.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-success mt-4">
        Cards reveal with staggered fade as you scroll - creates anticipation and delight
      </p>
    </div>
  );
}
