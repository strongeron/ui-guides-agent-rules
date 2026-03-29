import { useState, useEffect, useRef } from 'react';

export function MousedownDropdownGood() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="relative" ref={ref}>
          <button
            onMouseDown={() => setOpen(!open)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
          >
            Options ▾
          </button>
          {open && (
            <div className="absolute top-full mt-1 left-0 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[160px] z-10">
              <button className="w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-muted" onMouseDown={() => setOpen(false)}>Edit</button>
              <button className="w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-muted" onMouseDown={() => setOpen(false)}>Duplicate</button>
              <button className="w-full text-left px-3 py-1.5 text-sm text-destructive hover:bg-muted" onMouseDown={() => setOpen(false)}>Delete</button>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Opens on mousedown — feels instant</p>
      </div>
      <p className="text-xs text-success">onMouseDown opens immediately — snappier interaction</p>
    </div>
  );
}
