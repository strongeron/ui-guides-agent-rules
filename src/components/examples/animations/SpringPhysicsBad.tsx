import { useState } from 'react';

export function SpringPhysicsBad() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
      >
        Toggle Modal
      </button>

      {/* BAD: Linear/ease animation feels mechanical */}
      <div
        className="p-4 bg-muted rounded-lg overflow-hidden"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1)' : 'scale(0.9)',
          // BAD: Duration-based CSS transition
          transition: 'all 300ms ease',
        }}
      >
        <h4 className="font-medium text-sm mb-2">Modal Content</h4>
        <p className="text-xs text-muted-foreground">
          This uses CSS ease timing which feels robotic
        </p>
      </div>

      <p className="text-xs text-destructive">
        ✗ CSS ease timing feels mechanical - not interruptible, ignores velocity
      </p>
    </div>
  );
}
