import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle01Icon, Cancel01Icon, AlertCircleIcon } from '@hugeicons/core-free-icons';

const rows = [
  { name: 'Payment', icon: CheckmarkCircle01Icon, tone: 'text-success', status: 'Successful' },
  { name: 'Connection', icon: Cancel01Icon, tone: 'text-destructive', status: 'Failed' },
  { name: 'Disk space', icon: AlertCircleIcon, tone: 'text-warning', status: 'Low' },
];

export function RamsColorOnlyGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Status</h4>
        <ul className="space-y-3 p-3 bg-muted rounded-lg">
          {rows.map((r) => (
            <li key={r.name} className="flex items-center justify-between text-sm">
              <span>{r.name}</span>
              <span className={`inline-flex items-center gap-1.5 ${r.tone}`}>
                <HugeiconsIcon icon={r.icon} size={16} aria-hidden="true" />
                <span>{r.status}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-success">
        Colour is reinforced by a distinct icon shape and a text label, so the status survives greyscale and colour
        blindness
      </p>
    </div>
  );
}
