import { Edit, Trash2, Share2 } from 'lucide-react';

export function IconsHaveLabelsBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-2">
        <button className="p-2 bg-muted rounded hover:bg-muted">
          <Edit className="w-5 h-5 text-foreground" />
        </button>
        <button className="p-2 bg-muted rounded hover:bg-muted">
          <Trash2 className="w-5 h-5 text-foreground" />
        </button>
        <button className="p-2 bg-muted rounded hover:bg-muted">
          <Share2 className="w-5 h-5 text-foreground" />
        </button>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Icon-only buttons have no accessible labels
      </p>
    </div>
  );
}
