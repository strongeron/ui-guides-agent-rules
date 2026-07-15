import { Edit, Trash2, Share2 } from 'lucide-react';
import { ScreenReaderView } from '@/components/demo-kit/ScreenReaderView';

export function IconsHaveLabelsGood() {
  return (
    <div className="w-full max-w-sm">
      <ScreenReaderView>
      <div className="flex gap-2">
        <button
          className="p-2 bg-muted rounded hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Edit item"
        >
          <Edit className="w-5 h-5 text-foreground" />
        </button>
        <button
          className="p-2 bg-muted rounded hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Delete item"
        >
          <Trash2 className="w-5 h-5 text-foreground" />
        </button>
        <button
          className="p-2 bg-muted rounded hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Share item"
        >
          <Share2 className="w-5 h-5 text-foreground" />
        </button>
      </div>
      </ScreenReaderView>
      <p className="text-xs text-success mt-4">
        Descriptive aria-labels for screen readers
      </p>
    </div>
  );
}
