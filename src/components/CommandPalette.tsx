import { useState, useEffect, type ReactNode } from 'react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { principles, categories } from '../data/principles';
import { SourceBadge } from './SourceBadge';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (principleId: string) => void;
}

/** Wrap each occurrence of any query token in the text with a highlight mark. */
function highlightMatch(text: string, query: string): ReactNode {
  const tokens = query.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return text;

  const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const matcher = new RegExp(`(${escaped.join('|')})`, 'gi');
  const wanted = new Set(tokens.map((t) => t.toLowerCase()));

  return text.split(matcher).map((part, i) =>
    part && wanted.has(part.toLowerCase()) ? (
      <mark
        key={i}
        className="rounded-[3px] bg-primary/15 px-0.5 -mx-0.5 font-medium text-primary"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

/**
 * ⌘K / Ctrl+K command palette. Fuzzy-searches every rule (via cmdk), grouped by
 * category, and highlights the matched text in each result as you type.
 */
export function CommandPalette({ open, onOpenChange, onSelect }: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  // Clear the search each time the palette closes, so it opens fresh
  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const handleSelect = (principleId: string) => {
    onSelect(principleId);
    onOpenChange(false);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search rules"
      description="Search all UI Guides rules by name, category, or source"
      className="max-w-xl"
    >
      <CommandInput
        placeholder="Search rules, categories, sources…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[min(60vh,420px)]">
        <CommandEmpty>No rules found.</CommandEmpty>
        {categories.map((category) => {
          const items = principles.filter((p) => p.category === category.id);
          if (items.length === 0) return null;

          return (
            <CommandGroup key={category.id} heading={category.title}>
              {items.map((principle) => (
                <CommandItem
                  key={principle.id}
                  value={principle.title}
                  keywords={[category.title, principle.source ?? '', principle.description]}
                  onSelect={() => handleSelect(principle.id)}
                  className="gap-3"
                >
                  <span className="truncate">{highlightMatch(principle.title, query)}</span>
                  {principle.source && (
                    <SourceBadge source={principle.source} size="sm" className="ml-auto shrink-0" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}
