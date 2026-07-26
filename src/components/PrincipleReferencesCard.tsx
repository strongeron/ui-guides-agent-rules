import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { splitIntoParagraphs } from '@/lib/prose';

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
  // Explanations are authored as one unbroken string — see lib/prose.ts.
  const paragraphs = splitIntoParagraphs(additionalExplanation);
  const isLongRead = paragraphs.length > 1;

  return (
    <Card className="h-full gap-0 py-0">
      <CardHeader className="px-5 pt-3 !pb-3 gap-0 border-b border-border">
        <CardTitle asChild>
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Lightbulb className="size-4 text-foreground" aria-hidden="true" />
            Why it matters
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pt-4 pb-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-8">
          <div className="max-w-[68ch] space-y-3.5">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                // The opening paragraph carries the claim, so it gets more contrast —
                // a long block set uniformly grey reads as unskimmable.
                className={
                  isLongRead && i === 0
                    ? 'text-[0.9375rem] leading-relaxed text-foreground/90'
                    : 'text-sm leading-relaxed text-muted-foreground'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
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
