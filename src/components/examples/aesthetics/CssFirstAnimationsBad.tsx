import { useState } from 'react';

export function CssFirstAnimationsBad() {
  const [isHovered, setIsHovered] = useState(false);

  // JavaScript-driven hover effect - overly complex for a simple interaction
  const buttonStyle = {
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    backgroundColor: isHovered ? '#6366f1' : '#4f46e5',
    color: '#ffffff',
    boxShadow: isHovered
      ? '0 10px 15px -3px rgba(99, 102, 241, 0.4)'
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'all 200ms ease-out',
  };

  return (
    <div className="w-full max-w-sm flex flex-col items-center py-8">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={buttonStyle}
        className="px-6 py-3 rounded-lg font-medium"
      >
        Hover Me
      </button>

      <div className="mt-6 p-4 bg-muted rounded-lg text-sm font-mono text-muted-foreground">
        <p className="mb-2">useState + onMouseEnter/Leave</p>
        <p>+ inline styles for simple hover</p>
      </div>

      <p className="text-xs text-destructive mt-4 text-center max-w-xs">
        JavaScript state management for a simple hover effect adds unnecessary complexity and main thread work
      </p>
    </div>
  );
}
