import { useState } from 'react';
import { Globe, RotateCw } from 'lucide-react';

const tabs = ['overview', 'analytics', 'settings'] as const;
const filters = ['all', 'active', 'archived'] as const;
type Tab = (typeof tabs)[number];
type Filter = (typeof filters)[number];

export function UrlStateGood() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [filter, setFilter] = useState<Filter>('all');
  const [flash, setFlash] = useState(false);

  // In a real app this is the browser's address bar (use nuqs or
  // URLSearchParams). Here we derive it from state so both halves of the
  // demo stay self-contained.
  const query = `?tab=${activeTab}&filter=${filter}`;

  const reload = () => {
    // A real reload keeps the URL and rebuilds state from it — so the view
    // lands right back where it was.
    const params = new URLSearchParams(query);
    const tab = params.get('tab');
    const f = params.get('filter');
    setActiveTab((tabs as readonly string[]).includes(tab ?? '') ? (tab as Tab) : 'overview');
    setFilter((filters as readonly string[]).includes(f ?? '') ? (f as Filter) : 'all');
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
  };

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex gap-1 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-sm capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-xs capitalize ${
                filter === f
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated address bar — updates on every interaction */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Address bar</span>
          <button
            onClick={reload}
            className="flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCw className="h-3 w-3" />
            Reload
          </button>
        </div>
        <div
          className={`flex items-center gap-2 rounded-md border px-3 py-2 font-mono text-xs transition-colors duration-300 ${
            flash ? 'border-success bg-success/10' : 'border-border bg-muted'
          }`}
        >
          <Globe className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate">
            <span className="text-muted-foreground">app.example.com/dashboard</span>
            <span className="text-foreground">{query}</span>
          </span>
        </div>
      </div>

      <p className="text-xs text-success">
        State lives in the URL. Reload restores it, and the link is shareable — Back/Forward work too.
      </p>
    </div>
  );
}
