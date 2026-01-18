import { Search } from 'lucide-react';

export function NoDeadEndsBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="text-center py-12 bg-muted rounded-lg">
        <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-muted-foreground">No results found</p>
      </div>
      <p className="text-xs text-error mt-4">
        No guidance on what to do next
      </p>
    </div>
  );
}
