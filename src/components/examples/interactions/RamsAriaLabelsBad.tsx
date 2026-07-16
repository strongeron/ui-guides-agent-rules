import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon, PencilEdit02Icon, Delete02Icon } from '@hugeicons/core-free-icons';
import { ScreenReaderSim } from '@/components/ScreenReaderSim';

export function RamsAriaLabelsBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Icon Buttons Missing Labels</h4>
        <ScreenReaderSim>
          <div className="space-y-3">
            <div className="flex gap-2 p-3 bg-muted rounded-lg">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button className="p-2 hover:bg-background rounded-md transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
                <HugeiconsIcon icon={PencilEdit02Icon} size={20} />
              </button>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button className="p-2 hover:bg-background rounded-md transition-colors text-destructive focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
                <HugeiconsIcon icon={Delete02Icon} size={20} />
              </button>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button className="p-2 hover:bg-background rounded-md transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
            </div>
            <div className="bg-muted rounded p-2 font-mono text-xs">
              <code className="text-error">{'<button><Icon /></button>'}</code>
            </div>
          </div>
        </ScreenReaderSim>
      </div>
      <p className="text-xs text-error">
        No label and no text, so each button is announced only as “button”.
      </p>
    </div>
  );
}
