import { useEffect, useRef, useState } from 'react';
import { GripVertical } from 'lucide-react';

export function CleanDragBad() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [dragKey, setDragKey] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Same pointer-driven reorder as the good example…
  useEffect(() => {
    if (dragKey === null) return;

    const onMove = (e: PointerEvent) => {
      const ul = listRef.current;
      if (!ul) return;
      const lis = [...ul.querySelectorAll('li')];
      let target = lis.findIndex((li) => {
        const r = li.getBoundingClientRect();
        return e.clientY < r.top + r.height / 2;
      });
      if (target === -1) target = lis.length - 1;
      setItems((cur) => {
        const from = cur.indexOf(dragKey);
        if (from === -1 || from === target) return cur;
        const next = [...cur];
        const [moved] = next.splice(from, 1);
        next.splice(target, 0, moved);
        return next;
      });
    };
    const onUp = () => setDragKey(null);

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [dragKey]);

  return (
    // …but nothing disables user-select, so the browser starts selecting text
    // the moment the pointer moves.
    <div className="w-full max-w-sm space-y-3">
      <p className="text-xs text-muted-foreground">
        Grab a handle and drag to reorder. Watch the text select and the toolbar light up.
      </p>

      <ul ref={listRef} className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            onPointerDown={() => setDragKey(item)}
            className={`flex items-center gap-2 rounded-lg border p-3 text-sm transition-shadow ${
              dragKey === item
                ? 'border-primary bg-card opacity-80 shadow-md'
                : 'border-border bg-muted'
            } cursor-grab active:cursor-grabbing`}
          >
            <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
            {item}
          </li>
        ))}
      </ul>

      {/* The toolbar stays fully live during the drag. */}
      <div className="flex gap-2">
        {['Edit', 'Share', 'Delete'].map((b) => (
          <button
            key={b}
            className="rounded-md bg-muted px-3 py-1.5 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {b}
          </button>
        ))}
      </div>

      <p className="text-xs text-destructive">
        The text selects as you drag and the toolbar still lights up under the cursor, so the page looks
        dragged, selected, and hovered all at once.
      </p>
    </div>
  );
}
