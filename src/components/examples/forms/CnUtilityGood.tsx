import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'default' | 'destructive';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

function CnButton({ variant = 'default', disabled, className, children }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-colors',
        variant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
        variant === 'destructive' && 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
}

export function CnUtilityGood() {
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Using cn() Utility</h4>
        <div className="space-y-3">
          <div className="flex gap-2">
            <CnButton>Default</CnButton>
            <CnButton variant="destructive">Delete</CnButton>
          </div>
          <div className="flex gap-2 items-center">
            <CnButton disabled={disabled}>
              {disabled ? 'Disabled' : 'Click to disable'}
            </CnButton>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
                className="rounded"
              />
              Disabled
            </label>
          </div>
        </div>
        <div className="mt-4 bg-muted rounded p-3 font-mono text-xs">
          <code>cn(base, variant && styles, disabled && styles)</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Clean conditional classes with proper conflict resolution
      </p>
    </div>
  );
}
