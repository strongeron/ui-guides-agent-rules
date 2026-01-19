import { useState } from 'react';

interface ButtonProps {
  variant?: 'default' | 'destructive';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

function TernaryButton({ variant = 'default', disabled, className, children }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        variant === 'default'
          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
          : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className || ''}`}
    >
      {children}
    </button>
  );
}

export function CnUtilityBad() {
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Template Literal Ternaries</h4>
        <div className="space-y-3">
          <div className="flex gap-2">
            <TernaryButton>Default</TernaryButton>
            <TernaryButton variant="destructive">Delete</TernaryButton>
          </div>
          <div className="flex gap-2 items-center">
            <TernaryButton disabled={disabled}>
              {disabled ? 'Disabled' : 'Click to disable'}
            </TernaryButton>
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
        <div className="mt-4 bg-muted rounded p-3 font-mono text-xs overflow-x-auto">
          <code className="text-error whitespace-nowrap">{`\`\${base} \${v === 'x' ? a : b} \${d ? c : ''}\``}</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Ternary chains are hard to read and don't handle conflicts
      </p>
    </div>
  );
}
