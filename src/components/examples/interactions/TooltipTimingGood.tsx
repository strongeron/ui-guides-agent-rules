import { useState, useRef, useEffect } from 'react';

export function TooltipTimingGood() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [hasShownTooltip, setHasShownTooltip] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const buttons = [
    { id: 'bold', icon: 'B', label: 'Bold' },
    { id: 'italic', icon: 'I', label: 'Italic' },
    { id: 'underline', icon: 'U', label: 'Underline' },
  ];

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // First tooltip has delay, subsequent are instant
    const delay = hasShownTooltip ? 0 : 500;

    timeoutRef.current = setTimeout(() => {
      setActiveTooltip(id);
      setHasShownTooltip(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveTooltip(null);
      // Reset after leaving the group for a while
      timeoutRef.current = setTimeout(() => {
        setHasShownTooltip(false);
      }, 300);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex gap-1 mb-4">
          {buttons.map((btn) => (
            <div key={btn.id} className="relative">
              <button
                onMouseEnter={() => handleMouseEnter(btn.id)}
                onMouseLeave={handleMouseLeave}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 font-medium"
              >
                {btn.icon}
              </button>
              {activeTooltip === btn.id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                  {btn.label}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          First tooltip has 500ms delay. After that, moving between peers shows tooltips instantly.
        </p>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Initial delay prevents accidental triggers, instant switching after
      </p>
    </div>
  );
}
