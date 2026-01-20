import { useState, useRef, useEffect } from 'react';

export function IbelickMotionLibraryBad() {
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Manual animation implementation - prone to bugs
  useEffect(() => {
    if (!boxRef.current) return;
    const box = boxRef.current;

    if (isVisible) {
      box.style.opacity = '0';
      box.style.transform = 'translateY(20px)';
      // Force reflow
      void box.offsetHeight;
      box.style.transition = 'opacity 0.3s, transform 0.3s';
      box.style.opacity = '1';
      box.style.transform = 'translateY(0)';
    } else {
      box.style.opacity = '0';
      box.style.transform = 'translateY(20px)';
    }
  }, [isVisible]);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
      >
        Toggle Box
      </button>
      <div
        ref={boxRef}
        className="p-4 bg-muted rounded-lg opacity-0"
        style={{ transform: 'translateY(20px)' }}
      >
        Animated with manual DOM manipulation
      </div>
      <p className="text-xs text-destructive mt-4">
        Manual animation code is error-prone and hard to maintain
      </p>
    </div>
  );
}
