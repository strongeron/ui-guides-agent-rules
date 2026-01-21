import { HugeiconsIcon } from '@hugeicons/react';
import { AlertCircleIcon, CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';
import { Principle } from '../types/principle';
import { ExampleRenderer } from './ExampleRenderer';
import { agentRules } from '../data/agentRules';
import { SourceBadge } from './SourceBadge';
import { AgentRuleCard } from './AgentRuleCard';
import { PrincipleReferencesCard } from './PrincipleReferencesCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PrincipleViewProps {
  principle: Principle;
}

export function PrincipleView({ principle }: PrincipleViewProps) {
  const agentRule = agentRules[principle.id];

  return (
    <div className="pt-16 pb-24 px-4 max-w-screen-2xl mx-auto">
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge
            variant="outline"
            className="uppercase bg-card border-border text-foreground"
          >
            {principle.category}
          </Badge>
          {principle.source && <SourceBadge source={principle.source} size="sm" />}
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          {principle.title}
        </h1>
      </div>

      {agentRule && (
        <div className="mb-10">
          <AgentRuleCard
            rule={agentRule}
            description={principle.description}
            className="max-w-3xl"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card shadow-sm overflow-hidden">
          <CardHeader className="py-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-error">
              <HugeiconsIcon icon={AlertCircleIcon} size={20} aria-hidden="true" />
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
              <HugeiconsIcon icon={CheckmarkCircle01Icon} size={20} aria-hidden="true" />
              Good Example
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 min-h-[300px] flex items-center justify-center">
            <ExampleRenderer exampleKey={principle.goodExampleKey} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <PrincipleReferencesCard
          additionalExplanation={principle.additionalExplanation}
          links={principle.sourceLinks}
        />
      </div>
    </div>
  );
}
