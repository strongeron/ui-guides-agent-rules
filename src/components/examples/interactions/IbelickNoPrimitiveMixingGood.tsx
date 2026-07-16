import { useState } from 'react';
import { ChevronDown, CornerDownLeft, RotateCw } from 'lucide-react';

type FocusTarget = 'trigger' | 'dialog' | 'menu' | 'lost';

const focusLabel: Record<FocusTarget, string> = {
  trigger: 'Actions trigger',
  dialog: 'Dialog',
  menu: 'Menu',
  lost: 'lost (body)',
};

export function IbelickNoPrimitiveMixingGood() {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const [focus, setFocus] = useState<FocusTarget>('menu');
  const [note, setNote] = useState('One owner per layer — press Esc to peel them back.');

  const esc = () => {
    if (menuOpen) {
      setMenuOpen(false);
      setFocus('dialog');
      setNote('Esc closed the menu (top layer). The dialog stays open.');
    } else if (dialogOpen) {
      setDialogOpen(false);
      setFocus('trigger');
      setNote('Esc closed the dialog. Focus returned to the Actions trigger.');
    }
  };

  const reset = () => {
    setDialogOpen(true);
    setMenuOpen(true);
    setFocus('menu');
    setNote('One owner per layer — press Esc to peel them back.');
  };

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="relative flex h-40 items-center justify-center rounded-md bg-muted/50 p-3">
          {dialogOpen ? (
            <div className="w-full rounded-lg border border-primary/60 bg-card p-3 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Dialog</span>
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">
                  Radix · owns focus + Esc
                </span>
              </div>
              <div className="relative">
                <button className="flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs">
                  Actions
                  <ChevronDown className="h-3 w-3" />
                </button>
                {menuOpen && (
                  <div className="mt-2 rounded-md border border-primary/40 bg-card p-1.5 shadow-md">
                    <div className="mb-1 flex items-center justify-between px-1">
                      <span className="text-[11px] text-muted-foreground">Menu</span>
                      <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                        nested layer
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
            <button
              onClick={reset}
              className="flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs"
            >
              Actions
              <ChevronDown className="h-3 w-3" />
            </button>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={esc}
              disabled={!dialogOpen}
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

      <p className="text-xs text-success">{note}</p>
    </div>
  );
}
