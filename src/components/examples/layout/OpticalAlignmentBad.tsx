import { Play } from 'lucide-react';

export function OpticalAlignmentBad() {
  return (
    <div className="w-full max-w-sm">
      <button className="flex items-center justify-center gap-2 w-48 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        <Play className="w-5 h-5 fill-current" />
        <span className="font-medium">Play Video</span>
      </button>
      <p className="text-xs text-red-700 mt-4">
        Play icon mathematically centered but looks off-balance
      </p>
    </div>
  );
}
