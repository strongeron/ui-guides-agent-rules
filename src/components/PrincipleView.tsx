import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon, AlertCircleIcon, CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';
import { Principle } from '../types/principle';
import { ExampleRenderer } from './ExampleRenderer';
import { agentRules } from '../data/agentRules';
import { SourceBadge } from './SourceBadge';
import { AgentRuleCard } from './AgentRuleCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PrincipleViewProps {
  principle: Principle;
}

export function PrincipleView({ principle }: PrincipleViewProps) {
  const agentRule = agentRules[principle.id];

  return (
    <div className="pt-16 pb-24 px-4 max-w-screen-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="uppercase">
            {principle.category}
          </Badge>
          {principle.source && (
            <SourceBadge source={principle.source} size="sm" />
          )}
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {principle.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-6">{principle.description}</p>

        <div className="bg-primary/10 border-l-4 border-primary p-4 mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-2">
            From the Guidelines:
          </h2>
          <blockquote className="text-sm text-muted-foreground italic">
            "{principle.sourceQuote}"
          </blockquote>
        </div>

        <div className="bg-muted rounded-lg p-4 mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-2">
            Additional Context:
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {principle.additionalExplanation}
          </p>
        </div>

        {principle.sourceLinks.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {principle.sourceLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-2 py-1"
              >
                {link.text}
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
              </a>
            ))}
          </div>
        )}

        {agentRule && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-foreground mb-3">
              Agent Rule:
            </h2>
            <AgentRuleCard rule={agentRule} className="max-w-xl" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card shadow-sm overflow-hidden">
          <CardHeader className="py-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-error">
              <HugeiconsIcon icon={AlertCircleIcon} size={20} />
              Bad Example
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 min-h-[300px] flex items-center justify-center">
            <ExampleRenderer exampleKey={principle.badExampleKey} />
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm overflow-hidden">
          <CardHeader className="py-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-success">
              <HugeiconsIcon icon={CheckmarkCircle01Icon} size={20} />
              Good Example
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 min-h-[300px] flex items-center justify-center">
            <ExampleRenderer exampleKey={principle.goodExampleKey} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
