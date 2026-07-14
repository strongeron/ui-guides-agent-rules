import { useEffect, useRef, useState } from 'react';

const features = [
  { title: 'Lightning Fast', description: 'Built for speed with optimized performance' },
  { title: 'Secure by Default', description: 'Enterprise-grade security out of the box' },
  { title: 'Scale Infinitely', description: 'Grow without limits or constraints' },
  { title: 'Always Available', description: 'Uptime you can plan a business around' },
];

export function ScrollInteractionsBad() {
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const [resetKey, setResetKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setVisible(new Set());

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisible((prev) => new Set([...prev, index]));
          }
        });
      },
      { root: containerRef.current, threshold: 0.3 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [resetKey]);

  const handleReset = () => {
    setVisible(new Set());
    if (containerRef.current) containerRef.current.scrollTop = 0;
    setResetKey((key) => key + 1);
  };

  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      <div className="flex items-center justify-between mb-4">
        {/* Even the heading refuses to just sit there */}
        <h3 className="text-lg font-semibold motion-safe:animate-pulse">Features</h3>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm motion-safe:transition-transform motion-safe:hover:scale-110"
        >
          Reset &amp; scroll
        </button>
      </div>

      <div ref={containerRef} className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {features.map((feature, index) => (
          <div
            key={`${feature.title}-${resetKey}`}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            data-index={index}
            // Every card fades up, slides, scales, AND lifts on hover
            className="p-4 bg-muted rounded-lg border border-border motion-safe:transition-all motion-safe:duration-700 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.03] motion-safe:hover:shadow-lg"
            style={{
              opacity: visible.has(index) ? 1 : 0,
              transform: visible.has(index)
                ? 'translateY(0) scale(1)'
                : 'translateY(28px) scale(0.94)',
              transitionDelay: `${index * 180}ms`,
            }}
          >
            <h4 className="font-medium text-foreground motion-safe:transition-colors hover:text-primary">
              {feature.title}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
            {/* A bar that animates itself in, meaning nothing */}
            <span
              className="mt-3 block h-1 rounded bg-primary motion-safe:transition-all motion-safe:duration-1000"
              style={{ width: visible.has(index) ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>

      <p className="text-xs text-error mt-4">
        Every section fades up, every card lifts, the heading pulses, the bars fill. Nothing here is
        a sequence, so none of the motion means anything &mdash; and the reader has to wait for a
        feature list to finish performing. Extra animation is the tell.
      </p>
    </div>
  );
}
