import { useState } from 'react';

export function NeverTransitionAllBad() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`transition-all-bad p-4 bg-white border border-gray-200 rounded-lg cursor-pointer ${
          isHovered ? 'scale-105 shadow-xl' : 'scale-100 shadow-sm'
        }`}
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
