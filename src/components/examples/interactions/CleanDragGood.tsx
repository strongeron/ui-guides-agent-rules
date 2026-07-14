import { useState } from 'react';

export function CleanDragGood() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const isDragging = dragIndex !== null;

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
        Drag an item. The text will not select, and the toolbar stops reacting.
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
            // select-none kills the text selection that a drag would otherwise start.
            // The items stay interactive: they are the drop targets.
            className={`select-none p-3 bg-muted border rounded-lg cursor-grab ${
              dragIndex === i ? 'opacity-50' : ''
            } ${overIndex === i && dragIndex !== i ? 'border-primary' : 'border-border'}`}
          >
            {item} (text will not select)
          </div>
        ))}
      </div>

      {/* inert takes the rest of the UI out of hover, pointer and focus handling
          for as long as the drag is in flight. */}
      <div
        inert={isDragging ? '' : undefined}
        className={`flex gap-2 transition-opacity ${isDragging ? 'opacity-40' : ''}`}
      >
        {['Edit', 'Share', 'Delete'].map((b) => (
          <button
            key={b}
            className="px-3 py-1.5 rounded-md bg-muted text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {b}
          </button>
        ))}
      </div>

      <p className="text-xs text-success">
        <code>select-none</code> stops the text selecting, and <code>inert</code> on the surrounding UI stops it
        hovering or reacting mid-drag. The list itself stays droppable
      </p>
    </div>
  );
}
