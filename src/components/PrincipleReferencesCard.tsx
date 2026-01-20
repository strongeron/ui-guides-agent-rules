import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReferenceLink {
  text: string;
  url: string;
}

interface PrincipleReferencesCardProps {
  sourceQuote: string;
  additionalExplanation: string;
  links: ReferenceLink[];
}

export function PrincipleReferencesCard({
  sourceQuote,
  additionalExplanation,
  links,
}: PrincipleReferencesCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">References</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            From the Guidelines:
          </p>
          <p className="text-sm text-muted-foreground italic">
            "{sourceQuote}"
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Additional Context:
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {additionalExplanation}
          </p>
        </div>
        {links.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-2 py-1"
              >
                {link.text}
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No references yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
