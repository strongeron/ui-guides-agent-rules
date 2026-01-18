import { X } from 'lucide-react';

export function MatchHitTargetsGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <span className="text-sm">Notification message</span>
        <button
          onClick={() => alert('Dismissed')}
          className="p-2 -m-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-success mt-4">
        Padding expands hit target to 24px+ while keeping icon small
      </p>
    </div>
  );
}
