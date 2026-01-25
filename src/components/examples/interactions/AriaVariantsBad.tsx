import { useState } from 'react';

export function AriaVariantsBad() {
  const [selectedTab, setSelectedTab] = useState(0);
  // BAD: Separate state for visual styling, not using aria-* CSS variants
  const [activeStyles, setActiveStyles] = useState([true, false, false]);
  const tabs = ['Account', 'Security', 'Billing'];

  const handleClick = (index: number) => {
    setSelectedTab(index);
    // BAD: Manually syncing visual state - can drift from ARIA state
    setActiveStyles(tabs.map((_, i) => i === index));
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Manual Class Toggling</h4>
        {/* BAD: Using JS state for styling instead of aria-selected: CSS variants */}
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => handleClick(i)}
              className={`flex-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeStyles[i]
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
          <code className="text-error">{`activeStyles[i] ? '...' : '...'`}</code>
          <p className="mt-1 text-error">No aria-selected, no role="tab"</p>
        </div>
      </div>
      <p className="text-xs text-error">
        Manual class toggling instead of using aria-selected: CSS variants
      </p>
    </div>
  );
}
