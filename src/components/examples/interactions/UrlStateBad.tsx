import { useState } from 'react';

export function UrlStateBad() {
  const [activeTab, setActiveTab] = useState('overview');
  const [filter, setFilter] = useState('all');

  const tabs = ['overview', 'analytics', 'settings'];
  const filters = ['all', 'active', 'archived'];

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex gap-1 mb-4 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-sm capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mb-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs rounded-full capitalize ${
                filter === f
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-muted text-muted-foreground hover:bg-muted'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          State is only in React. Refresh page or share URL - state is lost.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        State not in URL - can't share, refresh loses state
      </p>
    </div>
  );
}
