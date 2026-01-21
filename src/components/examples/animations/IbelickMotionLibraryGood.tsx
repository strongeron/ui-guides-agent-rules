import { useState } from 'react';

export function IbelickMotionLibraryGood() {
  const [isVisible, setIsVisible] = useState(false);

  // Note: In a real app, use motion/react (Framer Motion)
  // import { motion, AnimatePresence } from 'motion/react';
  // <AnimatePresence>
  //   {isVisible && (
  //     <motion.div
  //       initial={{ opacity: 0, y: 20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       exit={{ opacity: 0, y: 20 }}
  //     />
  //   )}
  // </AnimatePresence>

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        Toggle Box
      </button>
      {isVisible && (
        <div className="p-4 bg-muted rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
          Animated with motion/react (simulated with CSS)
        </div>
      )}
      <p className="text-xs text-success mt-4">
        motion/react handles interruption, springs, and gestures correctly
      </p>
    </div>
  );
}
