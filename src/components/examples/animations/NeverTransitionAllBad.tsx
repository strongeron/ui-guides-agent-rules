import { useState } from 'react';

export function NeverTransitionAllBad() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <style>{`
        .transition-all-bad {
          transition: all 0.3s ease;
        }
      `}</style>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="transition-all-bad p-4 bg-white border border-gray-200 rounded-lg cursor-pointer"
        style={{
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <h3 className="font-semibold text-gray-900">Hover Me</h3>
        <p className="text-sm text-gray-600 mt-1">
          Using transition: all can cause jank
        </p>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        transition: all animates unintended properties
      </p>
    </div>
  );
}
