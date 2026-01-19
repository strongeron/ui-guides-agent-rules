import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon, FilterIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { PatternSource } from '@/types/principle';
import { sourceRegistry } from './source-registry';

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

  const getButtonLabel = () => {
    if (selectedSources.length === 0 || selectedSources.length === availableSources.length) {
      return 'All sources';
    }
    if (selectedSources.length === 1) {
      return sourceRegistry[selectedSources[0]].name;
    }
    return `${selectedSources.length} sources`;
  };

  const isAllSelected = selectedSources.length === availableSources.length;
  const isNoneSelected = selectedSources.length === 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Filter by source"
          className={cn('w-full justify-between', className)}
        >
          <span className="flex items-center gap-2">
            <HugeiconsIcon icon={FilterIcon} size={16} className="text-muted-foreground" />
            {getButtonLabel()}
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
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start" sideOffset={4} avoidCollisions={false}>
        <Command shouldFilter={false}>
          <CommandList>
            <CommandGroup>
              {/* Select All / Clear All */}
              <CommandItem
                onSelect={isAllSelected || isNoneSelected ? selectAll : clearAll}
                className="justify-between text-xs text-muted-foreground"
              >
                {isAllSelected || isNoneSelected ? 'Select all' : 'Clear all'}
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Sources">
              {availableSources.map((source) => {
                const info = sourceRegistry[source];
                const isSelected = selectedSources.includes(source);

                return (
                  <CommandItem
                    key={source}
                    value={source}
                    onSelect={(value) => {
                      // cmdk lowercases values, find the original source
                      const originalSource = availableSources.find(
                        (s) => s.toLowerCase() === value.toLowerCase()
                      );
                      if (originalSource) {
                        toggleSource(originalSource);
                      }
                    }}
                    className="gap-2"
                  >
                    <Checkbox
                      checked={isSelected || isNoneSelected}
                      className="pointer-events-none"
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        'size-2 rounded-full',
                        info.color.split(' ')[0] // Get just the bg color
                      )}
                      aria-hidden="true"
                    />
                    <span>{info.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
