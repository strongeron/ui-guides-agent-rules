import { useState, useEffect } from 'react';

const tabs = ['overview', 'analytics', 'settings'] as const;
const filters = ['all', 'active', 'archived'] as const;

export function UrlStateGood() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('overview');
  const [filter, setFilter] = useState<typeof filters[number]>('all');

  // Sync state with URL (simplified demo - in real app use nuqs or similar)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    const f = params.get('filter');
    if (tab && (tabs as readonly string[]).includes(tab)) {
      setActiveTab(tab as typeof tabs[number]);
    }
    if (f && (filters as readonly string[]).includes(f)) {
      setFilter(f as typeof filters[number]);
    }
  }, []);

  const updateUrl = (tab: typeof tabs[number], f: typeof filters[number]) => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    url.searchParams.set('filter', f);
    window.history.replaceState({}, '', url.toString());
  };

  const handleTabChange = (tab: typeof tabs[number]) => {
    setActiveTab(tab);
    updateUrl(tab, filter);
  };

  const handleFilterChange = (f: typeof filters[number]) => {
    setFilter(f);
    updateUrl(activeTab, f);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex gap-1 mb-4 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-3 py-2 text-sm capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
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
              onClick={() => handleFilterChange(f)}
              className={`px-3 py-1 text-xs rounded-full capitalize ${
                filter === f
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          State synced to URL. Share link or refresh - state persists!
        </p>
      </div>
      <p className="text-xs text-green-700 mt-4">
        State in URL - shareable, refresh-safe, Back/Forward works
      </p>
    </div>
  );
}
