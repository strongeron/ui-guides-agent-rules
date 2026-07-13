import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

export function IbelickExistingComponentsGood() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label htmlFor="notifications" className="text-sm">
          Email notifications
        </label>
        {/* The actual Switch from the design system, built on Radix. */}
        <Switch id="notifications" checked={isOn} onCheckedChange={setIsOn} />
      </div>
      <p className="text-xs text-success">
        The existing <code>Switch</code> is imported from the design system, so keyboard support, ARIA state and the
        focus ring come with it rather than being reimplemented
      </p>
    </div>
  );
}
