import { HugeiconsIcon } from '@hugeicons/react';
import { Copy01Icon, Tick01Icon } from '@hugeicons/core-free-icons';
import { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { COPY_FEEDBACK_DELAY_MS } from '@/constants/ui';

interface CodeBlockProps {
  title?: string;
  children: ReactNode;
}

export function CodeBlock({ title, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Extract text content from children (handles pre > code structure from MDX)
    const codeElement = document.querySelector('[data-code-block-content]');
    const text = codeElement?.textContent || '';

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DELAY_MS);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-border bg-muted dark:bg-card">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-secondary dark:bg-muted border-b border-border">
          <span className="text-sm font-medium text-foreground">{title}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-muted"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <HugeiconsIcon icon={Tick01Icon} size={14} className="text-success" />
                <span className="text-xs text-success ml-1">Copied!</span>
              </>
            ) : (
              <>
                <HugeiconsIcon icon={Copy01Icon} size={14} />
                <span className="text-xs ml-1">Copy</span>
              </>
            )}
          </Button>
        </div>
      )}
      <div
        data-code-block-content
        className="overflow-x-auto p-4 text-sm leading-relaxed [&_pre]:m-0 [&_pre]:p-0 [&_pre]:bg-transparent [&_code]:text-foreground [&_code]:font-mono"
      >
        {children}
      </div>
    </div>
  );
}
