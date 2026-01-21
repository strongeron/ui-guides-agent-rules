import { useState } from 'react';
import { motion } from 'motion/react';

export function IbelickMotionLibraryGood() {
  const [isActive, setIsActive] = useState(false);
  const [targetX, setTargetX] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => {
            setIsActive((prev) => {
              const nextActive = !prev;
              setTargetX(nextActive ? 150 : 0);
              return nextActive;
            });
          }}
          aria-pressed={isActive}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Toggle Spring
        </button>
        <button
          onClick={() => setTargetX(Math.random() * 150)}
          className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-sm"
        >
          Random (interrupt!)
        </button>
      </div>
      <div className="h-16 bg-muted/50 rounded-lg relative overflow-hidden">
        <motion.div
          className="absolute top-2 size-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs font-medium"
          animate={{ x: targetX }}
          transition={{ type: 'spring', stiffness: 180, damping: 15 }}
        >
          Spring
        </motion.div>
      </div>
      <p className="text-xs text-success">
        Click "Random" rapidly - spring smoothly redirects mid-animation (interruptible)
      </p>
    </div>
  );
}
