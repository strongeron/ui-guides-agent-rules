import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle01Icon, Cancel01Icon, AlertCircleIcon } from '@hugeicons/core-free-icons';

export function RamsColorOnlyGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Color + Additional Cues</h4>
        <div className="space-y-3 p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} className="text-success" />
            <span>Payment successful</span>
          </div>
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={Cancel01Icon} size={18} className="text-destructive" />
            <span>Connection failed</span>
          </div>
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={AlertCircleIcon} size={18} className="text-warning" />
            <span>Low disk space warning</span>
          </div>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>Icon + text label, not color alone</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Icons and labels convey meaning even without color
      </p>
    </div>
  );
}
