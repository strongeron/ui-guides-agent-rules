import { useState } from 'react';

export function NeverTransitionAllGood() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <style>{`
        .transition-specific {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
      `}</style>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="transition-specific p-4 bg-white border border-gray-200 rounded-lg cursor-pointer"
        style={{
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <h3 className="font-semibold text-gray-900">Hover Me</h3>
        <p className="text-sm text-gray-600 mt-1">
          Only specified properties animate
        </p>
      </div>

      <p className="text-xs text-green-700 mt-4">
        Explicit transitions: transform, box-shadow
      </p>
    </div>
  );
}
