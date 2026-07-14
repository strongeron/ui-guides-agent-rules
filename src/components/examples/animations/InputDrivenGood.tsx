import { useEffect, useRef, useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

/**
 * Good: exactly the same two movements — the badge lifts, the arrow slides —
 * but each one now answers an input. The badge reacts to the section scrolling
 * into view (once), the arrow reacts to hover/focus on the link. Nothing loops,
 * nothing plays unprompted.
 */
export function InputDrivenGood() {
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reduced = useSimulatedReducedMotion();

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const badgeMotion = reduced
    ? { transition: 'opacity 150ms linear', transform: 'none' }
    : {
        transition: 'transform 260ms cubic-bezier(0.23, 1, 0.32, 1), opacity 260ms cubic-bezier(0.23, 1, 0.32, 1)',
        transform: inView ? 'translateY(0)' : 'translateY(-5px)',
      };

  const arrowMotion = reduced
    ? { transform: 'none' }
    : {
        transition: 'transform 160ms cubic-bezier(0.23, 1, 0.32, 1)',
        transform: hovered ? 'translateX(6px)' : 'translateX(0)',
      };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setInView(false)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Reset scroll reveal
        </button>
        <ReducedMotionSwitch />
      </div>

      <div ref={sectionRef} className="rounded-lg border border-border bg-card p-5 text-center">
        <span
          className="inline-block rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
          style={{ ...badgeMotion, opacity: inView ? 1 : 0 }}
        >
          New
        </span>
        <p className="mt-3 text-sm font-medium text-card-foreground">Ship in one command</p>
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          className="mt-3 inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Get started
          <span aria-hidden="true" className="inline-block" style={arrowMotion}>
            →
          </span>
        </button>
      </div>

      <p className="text-xs text-success">
        Same motion, now earned: the badge plays once when the section is scrolled into view, the arrow answers
        hover/focus. Idle means idle. Reduced motion keeps the states and drops the movement.
      </p>
    </div>
  );
}
