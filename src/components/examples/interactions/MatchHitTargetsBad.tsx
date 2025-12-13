import { X } from 'lucide-react';

export function MatchHitTargetsBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
        <span className="text-sm">Notification message</span>
        <button
          onClick={() => alert('Dismissed')}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-red-700 mt-4">
        16px icon is hard to click. Hit target is too small.
      </p>
    </div>
  );
}
