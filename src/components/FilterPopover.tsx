import { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon, FilterIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { PatternSource } from '@/types/principle';
import { SourceBadge } from './SourceBadge';

interface FilterPopoverProps {
  selectedSources: PatternSource[];
  onSourcesChange: (sources: PatternSource[]) => void;
  availableSources: PatternSource[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags: string[];
}

/**
 * One compact control for both facets (source + tag), replacing the two stacked
 * dropdowns so the sidebar reclaims the space for the category tree. Empty selection
 * means "no filter" (everything shows); the count badge and the content-header chips
 * report what is active.
 */
export function FilterPopover({
  selectedSources,
  onSourcesChange,
  availableSources,
  selectedTags,
  onTagsChange,
  availableTags,
}: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCount = selectedSources.length + selectedTags.length;

  const toggleSource = (source: PatternSource) =>
    onSourcesChange(
      selectedSources.includes(source)
        ? selectedSources.filter((s) => s !== source)
        : [...selectedSources, source]
    );

  const toggleTag = (tag: string) =>
    onTagsChange(selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag]);

  const clearAll = () => {
    onSourcesChange([]);
    onTagsChange([]);
  };

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        aria-label="Filter rules by source and tag"
        onClick={() => setOpen(!open)}
        className="w-full justify-between"
      >
        <span className="flex items-center gap-2">
          <HugeiconsIcon icon={FilterIcon} size={16} className="text-muted-foreground" />
          Filters
          {activeCount > 0 && (
            <span className="rounded bg-primary px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-primary-foreground">
              {activeCount}
            </span>
          )}
        </span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={16}
          className={cn('text-muted-foreground transition-transform', open && 'rotate-180')}
        />
      </Button>

      {open && (
        <div
          data-slot="popover-content"
          className="absolute left-0 top-full mt-1 z-50 w-[240px] rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
        >
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground">Filters</span>
            <button
              type="button"
              onClick={clearAll}
              disabled={activeCount === 0}
              className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-40 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Clear all
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto overscroll-contain pb-1">
            <div className="px-3 pt-2 pb-1 text-xs font-medium text-muted-foreground">Source</div>
            {availableSources.map((source) => (
              <button
                key={source}
                type="button"
                onClick={() => toggleSource(source)}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted"
              >
                <Checkbox checked={selectedSources.includes(source)} className="pointer-events-none" aria-hidden="true" />
                <SourceBadge source={source} size="sm" />
              </button>
            ))}

            <div className="mt-1 border-t border-border px-3 pt-2 pb-1 text-xs font-medium text-muted-foreground">Tag</div>
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Checkbox checked={selectedTags.includes(tag)} className="pointer-events-none" aria-hidden="true" />
                <span className="capitalize">{tag}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
