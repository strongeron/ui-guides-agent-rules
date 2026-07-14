import { Search, Star, Trash2 } from 'lucide-react';

export function DontShipSchemaGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        {/* Identical visual design — the labels exist, they are just not painted. */}
        <div className="flex items-center gap-2">
          <label htmlFor="q" className="sr-only">
            Search projects
          </label>
          <input
            id="q"
            placeholder="Search projects"
            className="flex-1 min-w-0 px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            aria-label="Search"
            className="p-2 bg-muted rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Search className="w-4 h-4 text-foreground" aria-hidden="true" />
          </button>
          <button
            aria-label="Add to favorites"
            className="p-2 bg-muted rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Star className="w-4 h-4 text-foreground" aria-hidden="true" />
          </button>
          <button
            aria-label="Delete project"
            className="p-2 bg-muted rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Trash2 className="w-4 h-4 text-foreground" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="bg-muted border border-border rounded-lg p-3">
        <p className="text-xs font-medium text-foreground mb-2">Accessibility tree</p>
        <ul className="space-y-1 font-mono text-xs text-muted-foreground">
          <li>textbox &quot;Search projects&quot;</li>
          <li>button &quot;Search&quot;</li>
          <li>button &quot;Add to favorites&quot;</li>
          <li>button &quot;Delete project&quot;</li>
        </ul>
      </div>

      <p className="text-xs text-success">
        Same pixels, complete schema — the names ship even though the labels
        aren&apos;t drawn.
      </p>
    </div>
  );
}
