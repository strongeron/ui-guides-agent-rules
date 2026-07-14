interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function ConcatInput({ className, ...props }: InputProps) {
  const baseClasses = 'w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-hidden focus:ring-2 focus:ring-ring';

  return (
    <input
      className={`${baseClasses} ${className || ''}`}
      {...props}
    />
  );
}

export function TailwindMergeBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Without tailwind-merge</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground">Default</label>
            <ConcatInput placeholder="Default padding" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Custom padding (broken)</label>
            <ConcatInput className="px-6 py-4" placeholder="Both p-3 and p-6 exist" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Custom border (broken)</label>
            <ConcatInput className="border-2 border-primary" placeholder="Border conflict" />
          </div>
        </div>
        <div className="mt-4 bg-muted rounded p-3 font-mono text-xs">
          <code className="text-error">{`\`\${base} \${className}\``}</code>
          <p className="text-error mt-1">px-3 and px-6 both exist!</p>
        </div>
      </div>
      <p className="text-xs text-error">
        Conflicting classes create unpredictable results
      </p>
    </div>
  );
}
