import { useEffect, useRef, useState } from 'react';
import { Triangle, Copy, Download, BookOpen } from 'lucide-react';

export function BrandResourcesGood() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  return (
    <div className="w-full max-w-sm space-y-4">
      <nav className="relative flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
        <button
          onContextMenu={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          className="flex items-center gap-3 rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Triangle className="w-5 h-5 fill-current text-foreground" />
          <span className="text-sm font-semibold text-foreground">Acme</span>
        </button>
        <span className="ml-auto text-xs text-muted-foreground">Docs</span>

        {open && (
          <div
            ref={menuRef}
            role="menu"
            className="absolute left-4 top-full mt-1 z-10 w-52 bg-card border border-border rounded-lg shadow-md p-1"
          >
            {[
              { icon: Copy, label: 'Copy logo as SVG' },
              { icon: Download, label: 'Download brand assets' },
              { icon: BookOpen, label: 'Brand guidelines' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2 px-2 py-1.5 text-xs text-foreground rounded-md hover:bg-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <p className="text-xs text-success">
        Right-click the logo — the mark hands out its own assets, at the exact
        moment someone is trying to take it.
      </p>
    </div>
  );
}
