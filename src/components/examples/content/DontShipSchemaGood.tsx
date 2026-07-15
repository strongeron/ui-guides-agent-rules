import { Search, Star, Trash2 } from 'lucide-react';
import { ScreenReaderView } from '@/components/demo-kit/ScreenReaderView';

export function DontShipSchemaGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <ScreenReaderView>
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          {/* Identical visual design — the labels exist, they are just not painted. */}
          <div className="flex items-center gap-2">
            <label htmlFor="q" className="sr-only">
              Search projects
            </label>
            <input
              id="q"
              placeholder="Search projects"
              className="flex-1 min-w-0 px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              aria-label="Search"
              className="p-2 bg-muted rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Search className="w-4 h-4 text-foreground" aria-hidden="true" />
            </button>
            <button
              aria-label="Add to favorites"
              className="p-2 bg-muted rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Star className="w-4 h-4 text-foreground" aria-hidden="true" />
            </button>
            <button
              aria-label="Delete project"
              className="p-2 bg-muted rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Trash2 className="w-4 h-4 text-foreground" aria-hidden="true" />
            </button>
          </div>
        </div>
      </ScreenReaderView>

      <p className="text-xs text-success">
        Same pixels, complete schema — turn on the emulation and every control announces its name, even though the
        labels aren’t drawn.
      </p>
    </div>
  );
}
