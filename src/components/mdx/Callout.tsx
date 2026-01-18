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
    container: 'bg-info/10 border-l-4 border-info',
    icon: InformationCircleIcon,
    iconColor: 'text-info',
    titleColor: 'text-info-foreground dark:text-info',
  },
  warning: {
    container: 'bg-warning/10 border-l-4 border-warning',
    icon: AlertCircleIcon,
    iconColor: 'text-warning',
    titleColor: 'text-warning-foreground dark:text-warning',
  },
  tip: {
    container: 'bg-success/10 border-l-4 border-success',
    icon: BulbIcon,
    iconColor: 'text-success',
    titleColor: 'text-success-foreground dark:text-success',
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
