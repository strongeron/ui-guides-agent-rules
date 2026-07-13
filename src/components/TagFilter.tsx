import { useState, useRef, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon, TagsIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags: string[];
  className?: string;
}

export function TagFilter({ selectedTags, onTagsChange, availableTags, className }: TagFilterProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const isAllSelected = selectedTags.length === availableTags.length;
  const isNoneSelected = selectedTags.length === 0;

  const label =
    isNoneSelected || isAllSelected
      ? 'All tags'
      : selectedTags.length === 1
        ? selectedTags[0]
        : `${selectedTags.length} tags`;

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
        aria-label="Filter by tag"
        onClick={() => setOpen(!open)}
        className={cn('w-full justify-between', className)}
      >
        <span className="flex items-center gap-2">
          <HugeiconsIcon icon={TagsIcon} size={16} className="text-muted-foreground" />
          {label}
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
          className="absolute left-0 top-full mt-1 z-50 w-[200px] rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
        >
          <button
            type="button"
            onClick={() => onTagsChange(isAllSelected || isNoneSelected ? [...availableTags] : [])}
            className="w-full px-3 py-2 text-left text-xs text-muted-foreground hover:bg-muted hover:text-foreground rounded-t-md"
          >
            {isAllSelected || isNoneSelected ? 'Select all' : 'Clear all'}
          </button>

          <div className="border-t border-border max-h-64 overflow-y-auto overscroll-contain">
            <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">Tags</div>
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Checkbox
                  checked={isNoneSelected || selectedTags.includes(tag)}
                  className="pointer-events-none"
                  aria-hidden="true"
                />
                <span className="capitalize">{tag}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
