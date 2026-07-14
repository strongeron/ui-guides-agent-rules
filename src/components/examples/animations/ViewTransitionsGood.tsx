import { useState } from 'react';

export function ViewTransitionsGood() {
  const [tab, setTab] = useState<'list' | 'grid'>('list');
  const [page, setPage] = useState(1);

  // Navigation-level change: a view transition is a good fit.
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
        @media (prefers-reduced-motion: reduce) {
          ::view-transition-old(vt-content),
          ::view-transition-new(vt-content) { animation: none; }
        }
      `}</style>

      <div className="flex gap-2">
        {(['list', 'grid'] as const).map((t) => (
          <button
            key={t}
            // Rapid toggle: NOT wrapped. A view transition cannot be interrupted,
            // so spamming this would queue crossfades behind the user's clicks.
            onClick={() => setTab(t)}
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
        Page changes run through <code>startViewTransition</code> — a navigation-level change, so the content crossfades
        instead of popping. The list/grid toggle deliberately does not: a view transition cannot be interrupted, so rapid
        toggles and drag gestures must stay out of it.
      </p>
      <p className="text-xs text-muted-foreground">
        Feature-detected, so it degrades to an instant change. Cross-document transitions
        (<code>@view-transition {'{'} navigation: auto; {'}'}</code>) are still limited availability — not Baseline — so treat
        them as enhancement, never as the thing that makes navigation work.
      </p>
    </div>
  );
}
