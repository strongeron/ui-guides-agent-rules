import { useState } from 'react';
import { Trash2 } from 'lucide-react';

export function ConfirmDestructiveBad() {
  const [items, setItems] = useState(['Document 1', 'Document 2', 'Document 3']);

  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-sm">
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm">{item}</span>
            <button
              onClick={() => handleDelete(index)}
              className="p-1 text-destructive hover:text-destructive/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive rounded"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs text-error mt-4">
        Immediate deletion with no confirmation or undo
      </p>
    </div>
  );
}
