import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';
import type { PatternSource } from '@/types/principle';
import { SourceBadge } from './SourceBadge';

interface ActiveFilterChipsProps {
  selectedSources: PatternSource[];
  onSourcesChange: (sources: PatternSource[]) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

/**
 * Shows the active filter scope as removable chips at the top of the content — where the
 * results are, and visible even on mobile where the sidebar (and its Filters popover) is a
 * closed drawer. Renders nothing when no filter is active.
 */
export function ActiveFilterChips({
  selectedSources,
  onSourcesChange,
  selectedTags,
  onTagsChange,
}: ActiveFilterChipsProps) {
  const total = selectedSources.length + selectedTags.length;
  if (total === 0) return null;

  const chipClass =
    'group inline-flex items-center gap-1 rounded-full border border-border bg-card py-0.5 text-xs hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring';

  return (
    <div
      className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3 sm:px-6 lg:px-8"
      role="region"
      aria-label="Active filters"
    >
      <span className="text-xs text-muted-foreground">Filtering:</span>

      {selectedSources.map((source) => (
        <button
          key={source}
          type="button"
          onClick={() => onSourcesChange(selectedSources.filter((s) => s !== source))}
          className={`${chipClass} pl-1 pr-1.5`}
          aria-label={`Remove source filter: ${source}`}
        >
          <SourceBadge source={source} size="sm" />
          <HugeiconsIcon icon={Cancel01Icon} size={12} className="text-muted-foreground group-hover:text-foreground" />
        </button>
      ))}

      {selectedTags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onTagsChange(selectedTags.filter((t) => t !== tag))}
          className={`${chipClass} px-2 capitalize`}
          aria-label={`Remove tag filter: ${tag}`}
        >
          {tag}
          <HugeiconsIcon icon={Cancel01Icon} size={12} className="text-muted-foreground group-hover:text-foreground" />
        </button>
      ))}

      {total > 1 && (
        <button
          type="button"
          onClick={() => {
            onSourcesChange([]);
            onTagsChange([]);
          }}
          className="ml-1 rounded text-xs text-muted-foreground underline hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
