import { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const items = Array.from({ length: 20 }, (_, i) => `Report #${i + 1}`);

export function ScrollPersistenceBad() {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selected, setSelected] = useState<string | null>(null);

  const openItem = (item: string) => {
    // No scroll position saved before leaving the list.
    setSelected(item);
    setView('detail');
  };

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="h-64 overflow-hidden rounded-lg border border-border bg-card">
        {view === 'list' ? (
          <div key="list" className="flex h-full flex-col">
            <div className="shrink-0 border-b border-border px-4 py-2 text-xs text-muted-foreground">
              Scroll down, open a report, then press Back
            </div>
            {/* Distinct key means this remounts at scrollTop 0 — nothing restores it */}
            <div className="flex-1 overflow-y-auto">
              {items.map((item) => (
                <button
                  key={item}
                  onClick={() => openItem(item)}
                  className="flex w-full items-center justify-between border-b border-border px-4 py-2.5 text-left text-sm hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  {item}
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div key="detail" className="flex h-full flex-col">
            <div className="shrink-0 border-b border-border px-4 py-2">
              <button
                onClick={() => setView('list')}
                className="flex items-center gap-1 rounded text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ArrowLeft className="h-3 w-3" />
                Back
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-1 p-6 text-center">
              <p className="text-sm font-medium">{selected}</p>
              <p className="text-xs text-muted-foreground">
                Detail view — press Back to return to the list.
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-error">
        Back drops you at the top of the list — whatever you'd scrolled past is lost.
      </p>
    </div>
  );
}
