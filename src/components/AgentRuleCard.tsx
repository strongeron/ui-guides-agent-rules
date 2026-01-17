import { HugeiconsIcon } from '@hugeicons/react';
import { Copy01Icon, Tick01Icon } from '@hugeicons/core-free-icons';
import { useState } from 'react';
import { AgentRule, AgentRulePriority } from '../types/principle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AgentRuleCardProps {
  rule: AgentRule;
  principleTitle?: string;
  onCopy?: () => void;
  className?: string;
}

const priorityConfig: Record<AgentRulePriority, { label: string; className: string }> = {
  MUST: {
    label: 'MUST',
    className: 'bg-error/20 text-error border-error/30 dark:bg-error/10 dark:border-error/20',
  },
  SHOULD: {
    label: 'SHOULD',
    className: 'bg-amber-500/20 text-amber-700 border-amber-500/30 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20',
  },
  NEVER: {
    label: 'NEVER',
    className: 'bg-muted text-muted-foreground border-border',
  },
};

function formatRuleForCopy(priority: AgentRulePriority, rule: string): string {
  const prefix = priority === 'NEVER' ? 'NEVER:' : `${priority}:`;
  return `${prefix} ${rule}`;
}

export function AgentRuleCard({ rule, principleTitle, onCopy, className }: AgentRuleCardProps) {
  const [copied, setCopied] = useState(false);
  const config = priorityConfig[rule.priority];

  const handleCopy = async () => {
    const formattedRule = formatRuleForCopy(rule.priority, rule.rule);
    try {
      await navigator.clipboard.writeText(formattedRule);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn('font-semibold', config.className)}>
              {config.label}
            </Badge>
            {principleTitle && (
              <CardTitle className="text-sm text-muted-foreground">
                {principleTitle}
              </CardTitle>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-foreground leading-relaxed">
          {rule.rule}
        </p>

        {rule.codeExample && (
          <pre className="mt-4 p-3 bg-muted rounded-md text-xs overflow-x-auto">
            <code className="text-muted-foreground">{rule.codeExample}</code>
          </pre>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          aria-label="Copy agent rule"
          className="w-full sm:w-auto"
        >
          {copied ? (
            <>
              <HugeiconsIcon icon={Tick01Icon} size={16} className="text-success" />
              <span className="text-success">Copied!</span>
            </>
          ) : (
            <>
              <HugeiconsIcon icon={Copy01Icon} size={16} />
              <span>Copy Rule</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function PriorityBadge({ priority }: { priority: AgentRulePriority }) {
  const config = priorityConfig[priority];
  return (
    <Badge variant="outline" className={cn('font-semibold', config.className)}>
      {config.label}
    </Badge>
  );
}
