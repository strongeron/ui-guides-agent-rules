import { useState, useEffect, useRef } from 'react';

export function CssFirstAnimationsBad() {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // BAD: JavaScript-driven animations for simple hover effect
  // This could be done with pure CSS hover: classes
  useEffect(() => {
    if (!isHovered || !buttonRef.current) return;

    // BAD: requestAnimationFrame for a simple hover - overkill
    let animationId: number;
    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (Math.random() - 0.5) * 0.5,
        y: prev.y + (Math.random() - 0.5) * 0.5,
      }));
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  // BAD: Complex inline styles instead of Tailwind hover: variants
  const buttonStyle = {
    transform: isHovered
      ? `scale(1.05) translate(${position.x}px, ${position.y}px)`
      : 'scale(1)',
    backgroundColor: isHovered ? '#6366f1' : '#4f46e5',
    color: '#ffffff',
    boxShadow: isHovered
      ? '0 10px 15px -3px rgba(99, 102, 241, 0.4)'
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'all 200ms ease-out', // BAD: transition: all
  };

  return (
    <div className="w-full max-w-sm flex flex-col items-center py-8">
      <button
        ref={buttonRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setPosition({ x: 0, y: 0 });
        }}
        style={buttonStyle}
        className="px-6 py-3 rounded-lg font-medium"
      >
        Hover Me
      </button>

      <div className="mt-6 p-4 bg-muted rounded-lg text-sm font-mono text-muted-foreground">
        <p className="mb-2 text-error">useState + useEffect + rAF</p>
        <p className="text-error">for a simple hover effect!</p>
      </div>

      <p className="text-xs text-destructive mt-4 text-center max-w-xs">
        JavaScript state + requestAnimationFrame for hover is overkill - use CSS hover: variants instead
      </p>
    </div>
  );
}
