import { useRef, useState } from 'react';

const INITIAL = ['Design review', 'Ship changelog', 'Fix flaky test', 'Update docs'];

export function DragAlternativeGood() {
  const [items, setItems] = useState(INITIAL);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const gripRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      const [row] = next.splice(from, 1);
      next.splice(to, 0, row);
      return next;
    });
  };

  // Single-pointer path (buttons) and keyboard path (arrows) both land here.
  const moveAndKeepFocus = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    move(from, to);
    requestAnimationFrame(() => gripRefs.current[to]?.focus());
  };

  return (
    <div className="w-full max-w-sm">
      <ul className="space-y-2 rounded-lg border border-border bg-card p-3">
        {items.map((item, index) => (
          <li
            key={item}
            draggable
            onDragStart={() => setDraggedIndex(index)}
            onDragEnd={() => setDraggedIndex(null)}
            onDragOver={(e) => {
              e.preventDefault();
              if (draggedIndex !== null && draggedIndex !== index) {
                move(draggedIndex, index);
                setDraggedIndex(index);
              }
            }}
            className={`flex items-center gap-2 rounded border border-border bg-muted px-2 py-1.5 ${
              draggedIndex === index ? 'opacity-50' : ''
            }`}
          >
            {/* Dragging still works. It is now one of three paths, not the only one. */}
            <button
              type="button"
              ref={(el) => {
                gripRefs.current[index] = el;
              }}
              aria-label={`Reorder ${item}. Use arrow up and arrow down keys.`}
              onKeyDown={(e) => {
                if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
                e.preventDefault();
                e.stopPropagation();
                moveAndKeepFocus(index, index + (e.key === 'ArrowDown' ? 1 : -1));
              }}
              className="flex size-6 cursor-grab items-center justify-center rounded text-muted-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span aria-hidden="true">⠿</span>
            </button>

            <span className="flex-1 text-sm text-foreground">{item}</span>

            {/* Single-pointer alternative: one tap, no path, no dragging. */}
            <button
              type="button"
              aria-label={`Move ${item} up`}
              disabled={index === 0}
              onClick={() => moveAndKeepFocus(index, index - 1)}
              className="flex size-6 items-center justify-center rounded text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30"
            >
              <span aria-hidden="true">↑</span>
            </button>
            <button
              type="button"
              aria-label={`Move ${item} down`}
              disabled={index === items.length - 1}
              onClick={() => moveAndKeepFocus(index, index + 1)}
              className="flex size-6 items-center justify-center rounded text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30"
            >
              <span aria-hidden="true">↓</span>
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-muted-foreground">
        Three ways to reorder, all real: drag a row with the mouse; tap ↑ / ↓ (a single
        pointer down-up on one target, no path); or focus a grip with Tab and press the
        arrow keys. Focus follows the row it moved, so you can keep going.
      </p>

      <p className="mt-2 text-xs text-success">
        Drag is retained as an accelerator, but never the only path to the outcome
      </p>
    </div>
  );
}
