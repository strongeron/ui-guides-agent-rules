import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function IbelickAccessiblePrimitivesGood() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Open it, then press Escape, Tab, or click outside. It all works, and none of it is hand-written.
      </p>
      {/* A real Radix primitive: focus management, Escape, click-outside and ARIA come with it. */}
      <Popover>
        <PopoverTrigger className="px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-colors duration-150 ease-out hover:bg-primary/90">
          Open menu
        </PopoverTrigger>
        <PopoverContent align="start" className="w-48 p-2">
          <button className="w-full text-left px-3 py-2 rounded text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Rename
          </button>
          <button className="w-full text-left px-3 py-2 rounded text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Duplicate
          </button>
          <button className="w-full text-left px-3 py-2 rounded text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Delete
          </button>
        </PopoverContent>
      </Popover>
      <p className="text-xs text-success">
        A real Radix primitive gives focus management, Escape to close, click-outside dismissal and the right ARIA for free
      </p>
    </div>
  );
}
