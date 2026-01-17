import { Edit, Trash2, Share2 } from 'lucide-react';

export function IconsHaveLabelsGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-2">
        <button
          className="p-2 bg-muted rounded hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Edit item"
        >
          <Edit className="w-5 h-5 text-foreground" />
        </button>
        <button
          className="p-2 bg-muted rounded hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Delete item"
        >
          <Trash2 className="w-5 h-5 text-foreground" />
        </button>
        <button
          className="p-2 bg-muted rounded hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Share item"
        >
          <Share2 className="w-5 h-5 text-foreground" />
        </button>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Descriptive aria-labels for screen readers
      </p>
    </div>
  );
}
