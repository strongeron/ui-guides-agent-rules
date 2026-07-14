import { useState } from 'react';

export function CleanDragBad() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  // Commit the move once, on drop. Reordering on every dragover would remount the
  // node being dragged and abort the drag.
  const commit = () => {
    if (dragIndex !== null && overIndex !== null && dragIndex !== overIndex) {
      const next = [...items];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(overIndex, 0, moved);
      setItems(next);
    }
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div className="w-full max-w-sm space-y-3">
      <p className="text-xs text-muted-foreground">
        Drag an item. Try to select its text, and drag over the toolbar.
      </p>

      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={item}
            draggable
            onDragStart={(e) => {
              setDragIndex(i);
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', item);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setOverIndex(i);
            }}
            onDrop={(e) => {
              e.preventDefault();
              commit();
            }}
            onDragEnd={commit}
            className={`p-3 bg-muted border rounded-lg cursor-grab ${
              dragIndex === i ? 'opacity-50' : ''
            } ${overIndex === i && dragIndex !== i ? 'border-primary' : 'border-border'}`}
          >
            {item} (try selecting this text mid-drag)
          </div>
        ))}
      </div>

      {/* The rest of the UI stays fully live during the drag. */}
      <div className="flex gap-2">
        {['Edit', 'Share', 'Delete'].map((b) => (
          <button
            key={b}
            className="px-3 py-1.5 rounded-md bg-muted text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {b}
          </button>
        ))}
      </div>

      <p className="text-xs text-destructive">
        The text selects as you drag, and the toolbar still lights up under the cursor, so the page looks dragged,
        selected and hovered all at once
      </p>
    </div>
  );
}
