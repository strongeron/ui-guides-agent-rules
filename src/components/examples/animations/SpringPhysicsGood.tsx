import { useState } from 'react';
import { motion } from 'motion/react';

export function SpringPhysicsGood() {
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
          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          className="size-14 rounded-xl bg-primary"
        />
      </div>
      <p className="text-xs text-success">
        A spring with a little overshoot — spam-clicking redirects smoothly from the current velocity, never restarts
      </p>
    </div>
  );
}
