import { useState } from 'react';
import { motion } from 'motion/react';

export function MotionTailwindConflictBad() {
  const [on, setOn] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setOn((v) => !v)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        Toggle (spam me)
      </button>
      <div className="h-20 flex items-center">
        <motion.div
          animate={{ x: on ? 160 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          // BAD: a Tailwind transition on the very transform Motion is animating
          className="size-14 rounded-xl bg-primary transition-transform duration-300"
        />
      </div>
      <p className="text-xs text-destructive">
        A Tailwind <code>transition-transform</code> on a Motion element — CSS and Motion both write <code>transform</code>, so rapid toggles stutter and fight
      </p>
    </div>
  );
}
