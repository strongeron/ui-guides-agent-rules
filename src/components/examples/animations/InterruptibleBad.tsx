import { useState } from 'react';

export function InterruptibleBad() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [position, setPosition] = useState(0);

  const startAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setPosition(0);

    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setPosition(progress * 300);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animate();
  };

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={startAnimation}
        disabled={isAnimating}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Start Animation
      </button>
      <div className="mt-4 h-16 bg-gray-100 rounded-lg relative overflow-hidden">
        <div
          className="absolute top-4 w-12 h-8 bg-blue-600 rounded"
          style={{ left: `${position}px` }}
        />
      </div>
      <p className="text-xs text-red-700 mt-4">
        Animation can't be interrupted. Button disabled during animation.
      </p>
    </div>
  );
}
