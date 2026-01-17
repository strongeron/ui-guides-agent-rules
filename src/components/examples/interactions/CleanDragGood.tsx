import { useState } from 'react';

export function CleanDragGood() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, removed);
    setItems(newItems);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">
          Drag items to reorder. Clean drag - no text selection:
        </p>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={item}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`p-3 bg-muted border border-border rounded-lg cursor-grab select-none ${
                draggedIndex === index ? 'opacity-50' : ''
              } ${draggedIndex !== null && draggedIndex !== index ? 'pointer-events-none' : ''}`}
            >
              {item} - Text won't select during drag
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-green-700 mt-4">
        select-none and pointer-events-none during drag
      </p>
    </div>
  );
}
