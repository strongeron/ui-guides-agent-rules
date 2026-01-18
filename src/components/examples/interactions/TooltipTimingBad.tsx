import { useState } from 'react';

export function TooltipTimingBad() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const buttons = [
    { id: 'bold', icon: 'B', label: 'Bold' },
    { id: 'italic', icon: 'I', label: 'Italic' },
    { id: 'underline', icon: 'U', label: 'Underline' },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex gap-1 mb-4">
          {buttons.map((btn) => (
            <div key={btn.id} className="relative">
              <button
                onMouseEnter={() => setActiveTooltip(btn.id)}
                onMouseLeave={() => setActiveTooltip(null)}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-muted font-medium"
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
        <p className="text-xs text-muted-foreground">
          Tooltips appear instantly. Moving between buttons shows/hides rapidly, causing flicker.
        </p>
      </div>
      <p className="text-xs text-error mt-4">
        No delay - accidental hovers trigger tooltips
      </p>
    </div>
  );
}
