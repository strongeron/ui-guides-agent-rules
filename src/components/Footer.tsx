/**
 * `rel="author me"` points at the same identity the JSON-LD in index.html claims via
 * @id (https://glebstroganov.com/#person), which is what lets search engines and LLMs
 * merge this project into its author's works graph rather than treating them as two
 * unrelated pages. Keep the href and that @id in sync.
 *
 * pb-24 clears the fixed Navigation bar, which overlays the end of <main>.
 */
const linkStyles =
  'underline underline-offset-4 decoration-border hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm';

export function Footer() {
  return (
    <footer className="border-t border-border mt-16 pb-24">
      <div className="px-6 py-8 max-w-3xl">
        <p className="text-sm text-muted-foreground">
          Built by{' '}
          <a
            href="https://glebstroganov.com"
            rel="author me noopener"
            className={`font-medium text-foreground ${linkStyles}`}
          >
            Gleb Stroganov
          </a>
          , design engineer at{' '}
          <a
            href="https://evilmartians.com/martians/gleb-stroganov"
            rel="noopener"
            className={linkStyles}
          >
            Evil Martians
          </a>
          .
        </p>

        <p className="mt-3 text-sm text-muted-foreground">
          The rules come from other people's skills and guidelines — Vercel, Rauno
          Freiberg, @Ibelick, impeccable, Emil Kowalski, Tailwind, RAMS — each one
          credited on the <span className="text-foreground">Sources</span> page. The work
          here is extraction and wiring: every rule is pulled into one corpus, given a
          good and a bad example you can operate, a MUST/SHOULD/NEVER rule an agent can
          paste, and a link back to where it came from.
        </p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <li>
            <a
              href="https://github.com/strongeron/ui-guides"
              rel="noopener"
              className={`hover:text-foreground ${linkStyles}`}
            >
              Source on GitHub
            </a>
          </li>
          <li>
            <a href="/llms-full.txt" className={`hover:text-foreground ${linkStyles}`}>
              llms-full.txt
            </a>
          </li>
          <li>
            <a
              href="https://glebstroganov.com"
              rel="noopener"
              className={`hover:text-foreground ${linkStyles}`}
            >
              glebstroganov.com
            </a>
          </li>
          <li>
            <a
              href="https://x.com/strongeron"
              rel="noopener"
              className={`hover:text-foreground ${linkStyles}`}
            >
              X
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
