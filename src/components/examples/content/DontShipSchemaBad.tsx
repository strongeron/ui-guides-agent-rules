import { Search, Star, Trash2 } from 'lucide-react';
import { ScreenReaderView } from '@/components/demo-kit/ScreenReaderView';

export function DontShipSchemaBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <ScreenReaderView>
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          {/* The visual design is fine. Nothing carries an accessible name. */}
          <div className="flex items-center gap-2">
            <input
              placeholder="Search projects"
              className="flex-1 min-w-0 px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button className="p-2 bg-muted rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
              <Search className="w-4 h-4 text-foreground" />
            </button>
            <button className="p-2 bg-muted rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
              <Star className="w-4 h-4 text-foreground" />
            </button>
            <button className="p-2 bg-muted rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
              <Trash2 className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>
      </ScreenReaderView>

      <p className="text-xs text-error">
        Turn on the emulation: the field and all three buttons announce with no name — one of them deletes, and a
        screen reader user hears “button, button, button” and has to guess which.
      </p>
    </div>
  );
}
