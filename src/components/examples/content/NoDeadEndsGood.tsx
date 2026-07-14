import { Search } from 'lucide-react';

export function NoDeadEndsGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="text-center py-12 bg-muted rounded-lg">
        <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <h3 className="font-medium text-foreground mb-1">No results found</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Try adjusting your search or browse our categories
        </p>
        <div className="flex gap-2 justify-center">
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
            Clear Search
          </button>
          <button className="px-4 py-2 bg-muted text-foreground text-sm rounded-lg hover:bg-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
            Browse All
          </button>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Clear next actions help users continue
      </p>
    </div>
  );
}
