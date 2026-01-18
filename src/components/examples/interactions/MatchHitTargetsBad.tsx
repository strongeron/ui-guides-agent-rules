import { X } from 'lucide-react';

export function MatchHitTargetsBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <span className="text-sm">Notification message</span>
        <button
          onClick={() => alert('Dismissed')}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-error mt-4">
        16px icon is hard to click. Hit target is too small.
      </p>
    </div>
  );
}
