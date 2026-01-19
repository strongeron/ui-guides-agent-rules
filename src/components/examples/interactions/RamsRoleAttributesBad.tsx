import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkSquare01Icon, SquareIcon } from '@hugeicons/core-free-icons';

export function RamsRoleAttributesBad() {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(50);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Missing Required ARIA Attributes</h4>
        <div className="space-y-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-3">
            {/* Missing aria-checked! */}
            <div
              role="checkbox"
              aria-label="Enable notifications"
              tabIndex={0}
              onClick={() => setChecked(!checked)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setChecked(!checked);
                }
              }}
              className="cursor-pointer"
            >
              {checked ? (
                <HugeiconsIcon icon={CheckmarkSquare01Icon} size={24} className="text-primary" />
              ) : (
                <HugeiconsIcon icon={SquareIcon} size={24} />
              )}
            </div>
            <span className="text-sm">Enable notifications</span>
          </div>
          <div className="space-y-2">
            <span className="text-sm">Volume: {value}%</span>
            {/* Missing aria-valuenow, aria-valuemin, aria-valuemax! */}
            <input
              type="range"
              role="slider"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">role="checkbox" (no aria-checked!)</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Screen reader announces: "checkbox" but state unknown
      </p>
    </div>
  );
}
