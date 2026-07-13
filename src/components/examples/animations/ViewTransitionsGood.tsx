import { useState } from 'react';

export function ViewTransitionsGood() {
  const [tab, setTab] = useState<'list' | 'grid'>('list');
  const [page, setPage] = useState(1);

  const withTransition = (fn: () => void) => {
    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(fn);
    } else {
      fn();
    }
  };

  return (
    <div className="space-y-4">
      <style>{`
        ::view-transition-old(vt-content),
        ::view-transition-new(vt-content) { animation-duration: 260ms; }
      `}</style>
      <div className="flex gap-2">
        {(['list', 'grid'] as const).map((t) => (
          <button
            key={t}
            onClick={() => withTransition(() => setTab(t))}
            className={`px-3 py-1 text-sm rounded ${tab === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          >
            {t === 'list' ? 'List' : 'Grid'} view
          </button>
        ))}
      </div>
      <div className="min-h-[96px] bg-muted rounded-lg p-3" style={{ viewTransitionName: 'vt-content' }}>
        <div className="text-xs text-muted-foreground mb-2">Page {page}</div>
        {tab === 'list' ? (
          <div className="space-y-1">
            <div className="h-6 rounded bg-primary/20" />
            <div className="h-6 rounded bg-primary/20" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <div className="h-8 rounded bg-primary/20" />
            <div className="h-8 rounded bg-primary/20" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Page {page} of 3</span>
        <div className="flex gap-1">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              onClick={() => withTransition(() => setPage(p))}
              className={`size-8 rounded ${page === p ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <p className="text-xs text-success">
        Both the view switch and page changes run through <code>startViewTransition</code> — the content crossfades instead of popping
      </p>
    </div>
  );
}
