import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkSquare01Icon, SquareIcon } from '@hugeicons/core-free-icons';

export function RamsRoleAttributesGood() {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(50);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Complete ARIA Attributes</h4>
        <div className="space-y-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-3">
            <div
              role="checkbox"
              aria-checked={checked}
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
            <label className="text-sm" id="volume-label">Volume: {value}%</label>
            <input
              type="range"
              role="slider"
              aria-valuenow={value}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-labelledby="volume-label"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>role="checkbox" aria-checked=&#123;checked&#125;</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Screen reader announces: "Enable notifications, checkbox, checked"
      </p>
    </div>
  );
}
