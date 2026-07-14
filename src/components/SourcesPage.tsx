import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { sourceCatalog, type CatalogSource } from '@/data/sources';
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
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sources</h1>
        <p className="mt-3 max-w-[60ch] text-muted-foreground leading-relaxed">
          Every rule in UI Guides is transcribed from the people and projects below, credited back
          to the original. Visit them; they wrote the hard parts.
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              <th scope="col" className="py-2 pr-4 font-medium">Source</th>
              <th scope="col" className="py-2 pr-4 font-medium">Author</th>
              <th scope="col" className="py-2 pr-4 font-medium">Website</th>
              <th scope="col" className="py-2 font-medium">Repository</th>
            </tr>
          </thead>
          <tbody>
            {sourceCatalog.map((s) => {
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

      <footer className="mt-10 border-t border-border pt-6">
        <a href="https://skills.sh/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Browse more agent skills on skills.sh
          <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}
