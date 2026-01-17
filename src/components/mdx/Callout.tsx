import { HugeiconsIcon } from '@hugeicons/react';
import {
  InformationCircleIcon,
  AlertCircleIcon,
  BulbIcon,
  QuoteDownIcon,
} from '@hugeicons/core-free-icons';
import { ReactNode } from 'react';

type CalloutType = 'info' | 'warning' | 'tip' | 'quote';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutStyles: Record<
  CalloutType,
  {
    container: string;
    icon: typeof InformationCircleIcon;
    iconColor: string;
    titleColor: string;
  }
> = {
  info: {
    container: 'bg-blue-50 dark:bg-blue-950/50 border-l-4 border-blue-600 dark:border-blue-400',
    icon: InformationCircleIcon,
    iconColor: 'text-blue-600 dark:text-blue-400',
    titleColor: 'text-blue-900 dark:text-blue-100',
  },
  warning: {
    container: 'bg-amber-50 dark:bg-amber-950/50 border-l-4 border-amber-500 dark:border-amber-400',
    icon: AlertCircleIcon,
    iconColor: 'text-amber-600 dark:text-amber-400',
    titleColor: 'text-amber-900 dark:text-amber-100',
  },
  tip: {
    container: 'bg-green-50 dark:bg-green-950/50 border-l-4 border-green-600 dark:border-green-400',
    icon: BulbIcon,
    iconColor: 'text-green-600 dark:text-green-400',
    titleColor: 'text-green-900 dark:text-green-100',
  },
  quote: {
    container: 'bg-muted border-l-4 border-muted-foreground/40',
    icon: QuoteDownIcon,
    iconColor: 'text-muted-foreground',
    titleColor: 'text-foreground',
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = calloutStyles[type];

  return (
    <div className={`${styles.container} p-4 my-6 rounded-r-lg`}>
      <div className="flex items-start gap-3">
        <HugeiconsIcon
          icon={styles.icon}
          size={20}
          className={`${styles.iconColor} flex-shrink-0 mt-0.5`}
        />
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`${styles.titleColor} font-semibold text-sm mb-1`}>
              {title}
            </h4>
          )}
          <div
            className={`text-sm leading-relaxed text-muted-foreground ${
              type === 'quote' ? 'italic' : ''
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
