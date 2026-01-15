import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { PatternSource, PatternSourceInfo } from '@/types/principle';

// Source registry with badge styling
export const sourceRegistry: Record<PatternSource, PatternSourceInfo> = {
  vercel: {
    id: 'vercel',
    name: 'Vercel',
    description: 'Web Interface Guidelines from Vercel',
    url: 'https://vercel.com/design',
    color: 'bg-stone-900 text-white border-stone-900',
  },
  wcag: {
    id: 'wcag',
    name: 'WCAG',
    description: 'Web Content Accessibility Guidelines',
    url: 'https://www.w3.org/WAI/WCAG21/quickref/',
    color: 'bg-blue-600 text-white border-blue-600',
  },
  aria: {
    id: 'aria',
    name: 'ARIA',
    description: 'WAI-ARIA Authoring Practices',
    url: 'https://www.w3.org/WAI/ARIA/apg/',
    color: 'bg-purple-600 text-white border-purple-600',
  },
  'design-system': {
    id: 'design-system',
    name: 'Design System',
    description: 'Component and pattern library',
    color: 'bg-lime-600 text-white border-lime-600',
  },
  custom: {
    id: 'custom',
    name: 'Custom',
    description: 'Internal patterns and guidelines',
    color: 'bg-stone-500 text-white border-stone-500',
  },
};

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

// Export registry for use elsewhere
export { sourceRegistry as patternSources };
