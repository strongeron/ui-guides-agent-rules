import { useState } from 'react';

export function ViewTransitionsBad() {
  const [activeTab, setActiveTab] = useState<'list' | 'grid'>('list');
  const [page, setPage] = useState(1);

  // BAD: Direct state change without View Transitions API
  // Content just "pops" in/out with no visual continuity
  const handleTabChange = (newTab: 'list' | 'grid') => {
    setActiveTab(newTab);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 text-sm rounded ${
            activeTab === 'list'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
          onClick={() => handleTabChange('list')}
        >
          List View
        </button>
        <button
          className={`px-3 py-1 text-sm rounded ${
            activeTab === 'grid'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
          onClick={() => handleTabChange('grid')}
        >
          Grid View
        </button>
      </div>

      {/* BAD: No viewTransitionName, no startViewTransition() */}
      <div className="min-h-[80px] bg-muted rounded-lg p-3">
        {activeTab === 'list' ? (
          <div className="space-y-1">
            <div className="h-6 bg-primary/20 rounded" />
            <div className="h-6 bg-primary/20 rounded" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <div className="h-8 bg-primary/20 rounded" />
            <div className="h-8 bg-primary/20 rounded" />
          </div>
        )}
      </div>

      {/* BAD: Pagination without transition - jarring page jumps */}
      <div className="flex items-center justify-between text-sm">
        <span>Page {page} of 3</span>
        <div className="flex gap-1">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`w-8 h-8 rounded ${
                page === p ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-destructive">
        Hard state changes - no View Transitions API, content just pops in/out
      </p>
    </div>
  );
}
