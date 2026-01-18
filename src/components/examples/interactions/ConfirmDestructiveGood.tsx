import { useState } from 'react';
import { Trash2, Undo } from 'lucide-react';

export function ConfirmDestructiveGood() {
  const [items, setItems] = useState(['Document 1', 'Document 2', 'Document 3']);
  const [deletedItem, setDeletedItem] = useState<{ item: string; index: number } | null>(null);

  const handleDelete = (index: number) => {
    const item = items[index];
    setDeletedItem({ item, index });
    setItems(items.filter((_, i) => i !== index));

    setTimeout(() => {
      setDeletedItem(null);
    }, 5000);
  };

  const handleUndo = () => {
    if (deletedItem) {
      const newItems = [...items];
      newItems.splice(deletedItem.index, 0, deletedItem.item);
      setItems(newItems);
      setDeletedItem(null);
    }
  };

  return (
    <div className="w-full max-w-sm">
      {deletedItem && (
        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
          <span className="text-sm text-blue-900">Deleted "{deletedItem.item}"</span>
          <button
            onClick={handleUndo}
            className="flex items-center gap-1 text-sm text-blue-700 hover:text-blue-800 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1"
          >
            <Undo className="w-3 h-3" />
            Undo
          </button>
        </div>
      )}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
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
      <p className="text-xs text-success mt-4">
        Provides undo option for 5 seconds after deletion
      </p>
    </div>
  );
}
