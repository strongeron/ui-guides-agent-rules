import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { PatternSource } from '@/types/principle';
import { sourceRegistry } from './source-registry';

interface SourceBadgeProps {
  source: PatternSource;
  size?: 'sm' | 'md' | 'lg';
  showUrl?: boolean;
  className?: string;
}

export function SourceBadge({
  source,
  size = 'md',
  showUrl = false,
  className,
}: SourceBadgeProps) {
  const info = sourceRegistry[source];

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0',
    md: 'text-xs px-2 py-0.5',
    lg: 'text-sm px-3 py-1',
  };

  const badge = (
    <Badge
      variant="default"
      className={cn(info.color, sizeClasses[size], className)}
    >
      {info.name}
    </Badge>
  );

  if (showUrl && info.url) {
    return (
      <a
        href={info.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex hover:opacity-90 transition-opacity"
      >
        {badge}
      </a>
    );
  }

  return badge;
}
