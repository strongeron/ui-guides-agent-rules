import { useState } from 'react';
import { ChevronDown, CornerDownLeft, RotateCw, AlertTriangle } from 'lucide-react';

type FocusTarget = 'trigger' | 'dialog' | 'menu' | 'lost';

const focusLabel: Record<FocusTarget, string> = {
  trigger: 'Actions trigger',
  dialog: 'Dialog',
  menu: 'Menu',
  lost: 'lost (body)',
};

export function IbelickNoPrimitiveMixingBad() {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const [focus, setFocus] = useState<FocusTarget>('menu');
  const [note, setNote] = useState('Two systems both listen for Esc on one surface — press Esc.');

  const esc = () => {
    // Both Radix and Headless UI have registered an Escape handler on the same
    // surface, so a single Esc fires both: the menu AND the dialog close.
    setMenuOpen(false);
    setDialogOpen(false);
    setFocus('lost');
    setNote('One Esc, two listeners: the menu AND the dialog closed, and focus fell back to the body.');
  };

  const reset = () => {
    setDialogOpen(true);
    setMenuOpen(true);
    setFocus('menu');
    setNote('Two systems both listen for Esc on one surface — press Esc.');
  };

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="relative flex h-40 items-center justify-center rounded-md bg-muted/50 p-3">
          {dialogOpen ? (
            <div className="w-full rounded-lg border border-destructive/50 bg-card p-3 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Dialog</span>
                <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-medium text-destructive">
                  Radix · owns Esc
                </span>
              </div>
              <div className="relative">
                <button className="flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs">
                  Actions
                  <ChevronDown className="h-3 w-3" />
                </button>
                {menuOpen && (
                  <div className="mt-2 rounded-md border border-destructive/40 bg-card p-1.5 shadow-md">
                    <div className="mb-1 flex items-center justify-between px-1">
                      <span className="text-[11px] text-muted-foreground">Menu</span>
                      <span className="rounded-full bg-destructive/15 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
                        Headless UI · also owns Esc
                      </span>
                    </div>
                    {['Rename', 'Duplicate', 'Delete'].map((item) => (
                      <div key={item} className="rounded px-2 py-1 text-xs hover:bg-muted">
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Both layers gone, focus lost.
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={esc}
              disabled={!dialogOpen && !menuOpen}
              className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs transition-colors hover:bg-muted disabled:opacity-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              <CornerDownLeft className="h-3 w-3 rotate-90" />
              Press Esc
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              <RotateCw className="h-3 w-3" />
              Reset
            </button>
          </div>
          <span className="text-xs text-muted-foreground">
            Focus: <span className="font-medium text-foreground">{focusLabel[focus]}</span>
          </span>
        </div>
      </div>

      <p className="text-xs text-destructive">{note}</p>
    </div>
  );
}
