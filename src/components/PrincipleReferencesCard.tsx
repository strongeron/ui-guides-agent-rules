import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReferenceLink {
  text: string;
  url: string;
}

interface PrincipleReferencesCardProps {
  additionalExplanation: string;
  links: ReferenceLink[];
}

export function PrincipleReferencesCard({
  additionalExplanation,
  links,
}: PrincipleReferencesCardProps) {
  return (
    <Card className="h-full gap-0 py-0">
      <CardHeader className="px-6 pt-3 !pb-3 gap-0 border-b border-border">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Lightbulb className="size-4 text-foreground" aria-hidden="true" />
          Why it matters
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-5 pb-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-10">
          <p className="max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
            {additionalExplanation}
          </p>
          {links.length > 0 && (
            <div className="flex flex-col gap-3 lg:border-l lg:border-border lg:pl-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                References
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                    >
                      {link.text}
                      <HugeiconsIcon
                        icon={ArrowUpRight01Icon}
                        size={13}
                        className="ml-0.5 inline align-[-0.15em] text-primary/70"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
