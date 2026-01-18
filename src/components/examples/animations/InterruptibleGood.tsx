import { useState } from 'react';

export function InterruptibleGood() {
  const [position, setPosition] = useState<'start' | 'end'>('start');
  const [isMoving, setIsMoving] = useState(false);

  const moveBox = () => {
    setIsMoving(true);
    setPosition(position === 'start' ? 'end' : 'start');
    setTimeout(() => setIsMoving(false), 500);
  };

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={moveBox}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {isMoving ? 'Moving…' : 'Move Box'}
      </button>
      <div className="mt-4 h-16 bg-muted rounded-lg relative overflow-hidden">
        <div
          className={`absolute top-4 w-12 h-8 bg-primary rounded transition-transform duration-500 ease-in-out ${
            position === 'end' ? 'translate-x-[300px]' : 'translate-x-0'
          }`}
        />
      </div>
      <p className="text-xs text-success mt-4">
        Clicking again interrupts and reverses the animation
      </p>
    </div>
  );
}
