import { useState, useCallback } from 'react';

export function ViewTransitionsGood() {
  const [activeTab, setActiveTab] = useState<'list' | 'grid'>('list');

  // GOOD: Use View Transitions API for smooth state changes
  const handleTabChange = useCallback((newTab: 'list' | 'grid') => {
    // Check if View Transitions API is supported
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setActiveTab(newTab);
      });
    } else {
      // Fallback for unsupported browsers
      setActiveTab(newTab);
    }
  }, []);

  return (
    <div className="space-y-4">
      <style>{`
        ::view-transition-old(content),
        ::view-transition-new(content) {
          animation-duration: 200ms;
        }
      `}</style>

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

      {/* GOOD: view-transition-name enables morphing */}
      <div
        className="min-h-[80px] bg-muted rounded-lg p-3"
        style={{ viewTransitionName: 'content' }}
      >
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

      <p className="text-xs text-success">
        ✓ View Transitions API creates smooth crossfade between states
      </p>
    </div>
  );
}
