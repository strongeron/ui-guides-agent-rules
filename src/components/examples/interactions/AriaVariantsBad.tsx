import { useState } from 'react';

export function AriaVariantsBad() {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ['Account', 'Security', 'Billing'];

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Manual State Styling</h4>
        <div role="tablist" className="flex gap-1 bg-muted p-1 rounded-lg">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              role="tab"
              aria-selected={selectedTab === i}
              onClick={() => setSelectedTab(i)}
              className={`flex-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
                selectedTab === i
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-4 p-3 bg-muted rounded text-sm">
          Content for {tabs[selectedTab]} tab
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">{`selectedTab === i ? '...' : '...'`}</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Visual state managed separately from ARIA - can get out of sync
      </p>
    </div>
  );
}
