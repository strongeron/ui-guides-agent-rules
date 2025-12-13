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
          <div key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
            <span className="text-sm">{item}</span>
            <button
              onClick={() => handleDelete(index)}
              className="p-1 text-red-600 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs text-red-700 mt-4">
        Immediate deletion with no confirmation or undo
      </p>
    </div>
  );
}
