import { Play } from 'lucide-react';

export function OpticalAlignmentGood() {
  return (
    <div className="w-full max-w-sm">
      <button className="flex items-center justify-center gap-2 w-48 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
        <Play className="w-5 h-5 fill-current" style={{ marginLeft: '2px' }} />
        <span className="font-medium">Play Video</span>
      </button>
      <p className="text-xs text-success mt-4">
        Icon shifted 2px right for optical balance
      </p>
    </div>
  );
}
