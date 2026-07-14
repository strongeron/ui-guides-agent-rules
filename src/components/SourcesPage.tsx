import { useMemo } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { sourceCatalog, type CatalogSource } from '@/data/sources';
import { principles } from '@/data/principles';
import { cn } from '@/lib/utils';

/** Strip protocol, www, and trailing slash so a URL reads like the repo path does. */
function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
}

/** Website is redundant when it just points at the same GitHub repo the Repo column shows. */
function websiteHref(s: CatalogSource): string | null {
  if (!s.homepage) return null;
  if (s.repo && s.homepage.includes(`github.com/${s.repo}`)) return null;
  return s.homepage;
}

const linkClass =
  'inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm';

export function SourcesPage() {
  /** Live count per source, so the page can never claim coverage the corpus doesn't have. */
  const ruleCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of principles) {
      if (p.source) counts.set(p.source, (counts.get(p.source) ?? 0) + 1);
    }
    return counts;
  }, []);

  const countFor = (s: CatalogSource) => (s.patternSource ? ruleCounts.get(s.patternSource) ?? 0 : 0);
  const onboarded = sourceCatalog.filter((s) => countFor(s) > 0);
  const reference = sourceCatalog.filter((s) => countFor(s) === 0);
  const total = onboarded.reduce((n, s) => n + countFor(s), 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sources</h1>
        <p className="mt-3 max-w-[60ch] text-muted-foreground leading-relaxed">
          Every rule in UI Guides is transcribed from the people and projects below, credited back
          to the original. Visit them; they wrote the hard parts.
        </p>
        <p className="mt-3 max-w-[60ch] text-sm text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">{total} rules</span> from{' '}
          <span className="font-medium text-foreground">{onboarded.length} sources</span>. The{' '}
          {reference.length} below them did contribute — their rules ship under another source&apos;s
          badge, so they carry no count of their own.
        </p>
      </header>

      <SourceTable
        caption="Sources we onboarded"
        sources={onboarded}
        countFor={countFor}
        showCount
      />

      <SourceTable
        caption="Credited under another badge"
        sources={reference}
        countFor={countFor}
        showCount
        className="mt-12"
      />

      <footer className="mt-10 border-t border-border pt-6">
        <a href="https://skills.sh/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Browse more agent skills on skills.sh
          <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}

interface SourceTableProps {
  caption: string;
  sources: CatalogSource[];
  countFor: (s: CatalogSource) => number;
  showCount: boolean;
  className?: string;
}

function SourceTable({ caption, sources, countFor, showCount, className }: SourceTableProps) {
  if (sources.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="mb-3 text-sm font-medium text-foreground">{caption}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              <th scope="col" className="py-2 pr-4 font-medium">Source</th>
              {showCount && (
                <th scope="col" className="py-2 pr-4 text-right font-medium">Rules</th>
              )}
              <th scope="col" className="py-2 pr-4 font-medium">Author</th>
              <th scope="col" className="py-2 pr-4 font-medium">Website</th>
              <th scope="col" className="py-2 font-medium">Repository</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((s) => {
              const website = websiteHref(s);
              return (
                <tr key={s.id} className="border-b border-border/60 last:border-b-0">
                  <td className="py-3 pr-4 align-middle">
                    <span
                      className={cn(
                        'inline-flex items-center whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium',
                        s.color
                      )}
                    >
                      {s.name}
                    </span>
                  </td>
                  {showCount && (
                    <td className="py-3 pr-4 text-right align-middle font-mono text-xs tabular-nums">
                      {s.creditedUnder ? (
                        <span className="whitespace-nowrap text-muted-foreground">
                          → {s.creditedUnder}
                        </span>
                      ) : (
                        <span className="text-foreground">{countFor(s)}</span>
                      )}
                    </td>
                  )}
                  <td className="py-3 pr-4 align-middle text-muted-foreground">
                    {s.author && s.author !== s.name ? s.author : ''}
                  </td>
                  <td className="py-3 pr-4 align-middle">
                    {website && (
                      <a href={website} target="_blank" rel="noopener noreferrer" className={cn(linkClass, 'whitespace-nowrap font-mono text-xs')}>
                        {prettyUrl(website)}
                      </a>
                    )}
                  </td>
                  <td className="py-3 align-middle">
                    {s.repo && (
                      <a
                        href={`https://github.com/${s.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(linkClass, 'whitespace-nowrap font-mono text-xs')}
                      >
                        {s.repo}
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

