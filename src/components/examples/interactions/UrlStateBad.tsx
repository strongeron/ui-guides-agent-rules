import { useState } from 'react';

export function UrlStateBad() {
  const [activeTab, setActiveTab] = useState('overview');
  const [filter, setFilter] = useState('all');

  const tabs = ['overview', 'analytics', 'settings'];
  const filters = ['all', 'active', 'archived'];

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex gap-1 mb-4 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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
              onClick={() => setFilter(f)}
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
          State is only in React. Refresh page or share URL - state is lost.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        State not in URL - can't share, refresh loses state
      </p>
    </div>
  );
}
