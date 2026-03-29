import { useState } from 'react';

export function MousedownDropdownBad() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
          >
            Options ▾
          </button>
          {open && (
            <div className="absolute top-full mt-1 left-0 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[160px] z-10">
              <button className="w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-muted" onClick={() => setOpen(false)}>Edit</button>
              <button className="w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-muted" onClick={() => setOpen(false)}>Duplicate</button>
              <button className="w-full text-left px-3 py-1.5 text-sm text-destructive hover:bg-muted" onClick={() => setOpen(false)}>Delete</button>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Opens on click (mouseup) — slight perceived delay</p>
      </div>
      <p className="text-xs text-error">onClick triggers on mouseup — feels sluggish for menus</p>
    </div>
  );
}
