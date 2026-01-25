import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkSquare01Icon, SquareIcon } from '@hugeicons/core-free-icons';

export function RamsRoleAttributesBad() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Div Pretending to be Button</h4>
        <div className="space-y-4 p-3 bg-muted rounded-lg">
          {/* BAD: Using div with role="button" but NO keyboard handlers */}
          {/* Keyboard users cannot activate this! */}
          <div
            role="button"
            onClick={() => alert('Clicked!')}
            // BAD: Missing onKeyDown for Enter/Space!
            // BAD: Missing tabIndex for focus!
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer inline-block"
          >
            Click Me (div)
          </div>

          <div className="flex items-center gap-3">
            {/* BAD: role="checkbox" without aria-checked AND without keyboard handler */}
            <div
              role="checkbox"
              // BAD: Missing aria-checked={checked}!
              // BAD: Missing onKeyDown for Space!
              onClick={() => setChecked(!checked)}
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

          {/* BAD: Clickable div with no semantic meaning */}
          <div
            onClick={() => alert('Link clicked')}
            className="text-primary underline cursor-pointer"
            // BAD: Should be <a> or <button>, not div
            // BAD: No role, no tabIndex, no keyboard handler
          >
            Click this link (it's a div)
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">{'<div role="button" onClick={...}>'}</code>
          <p className="mt-1 text-error">No keyboard support!</p>
        </div>
      </div>
      <p className="text-xs text-error">
        Screen reader says "button" but keyboard can't activate it
      </p>
    </div>
  );
}
