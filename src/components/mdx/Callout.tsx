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
    container: 'bg-blue-50 border-l-4 border-blue-600',
    icon: InformationCircleIcon,
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-900',
  },
  warning: {
    container: 'bg-amber-50 border-l-4 border-amber-500',
    icon: AlertCircleIcon,
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-900',
  },
  tip: {
    container: 'bg-green-50 border-l-4 border-green-600',
    icon: BulbIcon,
    iconColor: 'text-green-600',
    titleColor: 'text-green-900',
  },
  quote: {
    container: 'bg-gray-50 border-l-4 border-gray-400',
    icon: QuoteDownIcon,
    iconColor: 'text-gray-500',
    titleColor: 'text-gray-900',
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
            className={`text-sm leading-relaxed ${
              type === 'quote' ? 'italic text-gray-700' : 'text-gray-700'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
