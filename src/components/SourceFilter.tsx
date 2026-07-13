import { useState, useRef, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon, FilterIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { PatternSource } from '@/types/principle';
import { SourceBadge } from './SourceBadge';

interface SourceFilterProps {
  selectedSources: PatternSource[];
  onSourcesChange: (sources: PatternSource[]) => void;
  availableSources: PatternSource[];
  className?: string;
}

export function SourceFilter({
  selectedSources,
  onSourcesChange,
  availableSources,
  className,
}: SourceFilterProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleSource = (source: PatternSource) => {
    if (selectedSources.includes(source)) {
      onSourcesChange(selectedSources.filter((s) => s !== source));
    } else {
      onSourcesChange([...selectedSources, source]);
    }
  };

  const selectAll = () => {
    onSourcesChange([...availableSources]);
  };

  const clearAll = () => {
    onSourcesChange([]);
  };

  /** Show the real source badges once a subset is selected, so the trigger matches the list. */
  const renderButtonLabel = () => {
    if (selectedSources.length === 0 || selectedSources.length === availableSources.length) {
      return <span className="text-sm">All sources</span>;
    }
    const shown = selectedSources.slice(0, 2);
    const rest = selectedSources.length - shown.length;
    return (
      <span className="flex items-center gap-1 min-w-0">
        {shown.map((s) => (
          <SourceBadge key={s} source={s} size="sm" />
        ))}
        {rest > 0 && <span className="text-xs text-muted-foreground">+{rest}</span>}
      </span>
    );
  };

  const isAllSelected = selectedSources.length === availableSources.length;
  const isNoneSelected = selectedSources.length === 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        aria-label="Filter by source"
        onClick={() => setOpen(!open)}
        className={cn('w-full justify-between', className)}
      >
        <span className="flex items-center gap-2 min-w-0">
          <HugeiconsIcon icon={FilterIcon} size={16} className="text-muted-foreground shrink-0" />
          {renderButtonLabel()}
        </span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={16}
          className={cn(
            'text-muted-foreground transition-transform',
            open && 'rotate-180'
          )}
        />
      </Button>

      {open && (
        <div
          data-slot="popover-content"
          className="absolute left-0 top-full mt-1 z-50 w-[200px] rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
        >
          {/* Select All / Clear All */}
          <button
            type="button"
            onClick={isAllSelected || isNoneSelected ? selectAll : clearAll}
            className="w-full px-3 py-2 text-left text-xs text-muted-foreground hover:bg-muted hover:text-foreground rounded-t-md"
          >
            {isAllSelected || isNoneSelected ? 'Select all' : 'Clear all'}
          </button>

          <div className="border-t border-border">
            <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
              Sources
            </div>
            {availableSources.map((source) => {
              const isSelected = selectedSources.includes(source);

              return (
                <button
                  key={source}
                  type="button"
                  onClick={() => toggleSource(source)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted"
                >
                  <Checkbox
                    checked={isSelected || isNoneSelected}
                    className="pointer-events-none"
                    aria-hidden="true"
                  />
                  <SourceBadge source={source} size="sm" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
