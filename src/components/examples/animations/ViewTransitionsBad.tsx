import { useState } from 'react';

export function ViewTransitionsBad() {
  const [activeTab, setActiveTab] = useState<'list' | 'grid'>('list');

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 text-sm rounded ${
            activeTab === 'list'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
          onClick={() => setActiveTab('list')}
        >
          List View
        </button>
        <button
          className={`px-3 py-1 text-sm rounded ${
            activeTab === 'grid'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
          onClick={() => setActiveTab('grid')}
        >
          Grid View
        </button>
      </div>

      {/* BAD: Abrupt state change with no transition */}
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

      <p className="text-xs text-destructive">
        ✗ Instant state change - no transition animation between views
      </p>
    </div>
  );
}
