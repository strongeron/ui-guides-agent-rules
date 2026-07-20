import { HugeiconsIcon } from '@hugeicons/react';
import { Copy01Icon, Tick01Icon } from '@hugeicons/core-free-icons';
import { useState } from 'react';
import { AgentRule, AgentRulePriority } from '../types/principle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { COPY_FEEDBACK_DELAY_MS } from '@/constants/ui';

interface AgentRuleCardProps {
  rule: AgentRule;
  principleTitle?: string;
  description?: string;
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
    className: 'bg-warning/20 text-warning-foreground border-warning/30 dark:text-warning dark:bg-warning/10 dark:border-warning/20',
  },
  NEVER: {
    label: 'NEVER',
    className: 'bg-muted text-muted-foreground border-border',
  },
};

function formatRuleForCopy(
  priority: AgentRulePriority,
  rule: string,
  description?: string,
  codeExample?: string
): string {
  const prefix = priority === 'NEVER' ? 'NEVER:' : `${priority}:`;
  const lines = [`${prefix} ${rule}`];

  if (description) {
    lines.push('', description);
  }

  if (codeExample) {
    lines.push('', 'Example:', codeExample);
  }

  return lines.join('\n');
}

export function AgentRuleCard({
  rule,
  principleTitle,
  description,
  onCopy,
  className,
}: AgentRuleCardProps) {
  const [copied, setCopied] = useState(false);
  const config = priorityConfig[rule.priority];
  const formattedRule = formatRuleForCopy(rule.priority, rule.rule);
  const formattedCopy = formatRuleForCopy(
    rule.priority,
    rule.rule,
    description,
    rule.codeExample
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedCopy);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DELAY_MS);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card
      className={cn(
        'group overflow-hidden gap-0 py-5 cursor-pointer transition-colors hover:border-foreground/15 hover:bg-foreground/[0.03] dark:hover:bg-foreground/[0.06]',
        className
      )}
      onClick={handleCopy}
      title="Click to copy this rule"
    >
      <CardHeader className="pb-3 gap-0">
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
        <p className="text-sm font-semibold text-foreground leading-relaxed">
          {formattedRule}
        </p>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}

        {rule.codeExample && (
          <pre className="mt-4 p-3 bg-muted rounded-md text-xs overflow-x-auto">
            <code className="text-muted-foreground">{rule.codeExample}</code>
          </pre>
        )}
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
          className="w-full sm:w-auto transition-colors hover:bg-foreground/10 hover:text-foreground group-hover:border-foreground/25"
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
