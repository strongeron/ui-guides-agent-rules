import { useState } from 'react';

const INITIAL = ['Design review', 'Ship changelog', 'Fix flaky test', 'Update docs'];

export function DragAlternativeBad() {
  const [items, setItems] = useState(INITIAL);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const move = (from: number, to: number) => {
    setItems((prev) => {
      const next = [...prev];
      const [row] = next.splice(from, 1);
      next.splice(to, 0, row);
      return next;
    });
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
            className={`flex cursor-grab items-center gap-3 rounded border border-border bg-muted px-3 py-2 ${
              draggedIndex === index ? 'opacity-50' : ''
            }`}
          >
            {/* The grip is the ONLY affordance. It is a <span>: not focusable,
                no keyboard handler, no click alternative. Reordering exists
                exclusively as a dragging movement. */}
            <span aria-hidden="true" className="select-none text-muted-foreground">
              ⠿
            </span>
            <span className="text-sm text-foreground">{item}</span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-muted-foreground">
        Drag a row with the mouse — it reorders. Now try to reorder it any other way:
        press Tab (nothing in the list is focusable), or try a single tap. There is no
        path. A user with a tremor, an eye-tracker, or a head-pointer cannot complete
        this task at all.
      </p>

      <p className="mt-2 text-xs text-destructive">
        Reordering is drag-only, and reordering is not essential — WCAG 2.5.7 failure
      </p>
    </div>
  );
}
