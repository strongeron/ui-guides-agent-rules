import { useState, useEffect, useRef } from 'react';

// Simple spring physics implementation
function useSpring(target: number, config = { tension: 170, friction: 26 }) {
  const [value, setValue] = useState(target);
  const velocityRef = useRef(0);
  const targetRef = useRef(target);

  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      const current = value;
      const target = targetRef.current;

      // Spring physics calculation
      const force = (target - current) * (config.tension / 1000);
      velocityRef.current += force;
      velocityRef.current *= 1 - config.friction / 100;

      const newValue = current + velocityRef.current;

      // Stop when close enough and velocity is low
      if (Math.abs(target - newValue) < 0.01 && Math.abs(velocityRef.current) < 0.01) {
        setValue(target);
        return;
      }

      setValue(newValue);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [value, config.tension, config.friction]);

  return value;
}

export function SpringPhysicsGood() {
  const [isOpen, setIsOpen] = useState(false);

  // GOOD: Spring-based animation
  const scale = useSpring(isOpen ? 1 : 0.9);
  const opacity = useSpring(isOpen ? 1 : 0);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
      >
        Toggle Modal
      </button>

      {/* GOOD: Spring physics feels natural, interruptible */}
      <div
        className="p-4 bg-muted rounded-lg overflow-hidden"
        style={{
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <h4 className="font-medium text-sm mb-2">Modal Content</h4>
        <p className="text-xs text-muted-foreground">
          Spring physics (tension: 170, friction: 26)
        </p>
      </div>

      <p className="text-xs text-success">
        ✓ Spring physics feels natural - interruptible, responds to velocity
      </p>
    </div>
  );
}
