import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function MergedInput({ className, ...props }: InputProps) {
  return (
    <input
      className={twMerge(
        'w-full px-3 py-2 border border-border rounded-md bg-background',
        'focus:outline-hidden focus:ring-2 focus:ring-ring',
        className
      )}
      {...props}
    />
  );
}

export function TailwindMergeGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">With tailwind-merge</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground">Default</label>
            <MergedInput placeholder="Default padding" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Custom padding</label>
            <MergedInput className="px-6 py-4" placeholder="Larger padding" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Custom border</label>
            <MergedInput className="border-2 border-primary" placeholder="Thicker border" />
          </div>
        </div>
        <div className="mt-4 bg-muted rounded p-3 font-mono text-xs">
          <code>twMerge(baseClasses, className)</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Custom classes properly override base styles
      </p>
    </div>
  );
}
