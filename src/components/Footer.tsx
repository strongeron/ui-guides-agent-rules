/**
 * `rel="author me"` points at the same identity the JSON-LD in index.html claims via
 * @id (https://glebstroganov.com/#person), which is what lets search engines and LLMs
 * merge this project into its author's works graph rather than treating them as two
 * unrelated pages. Keep the href and that @id in sync.
 *
 * pb-20 clears the fixed Navigation bar (61px tall), which overlays the end of <main>.
 */
import { principles } from '@/data/principles';

const linkStyles =
  'underline underline-offset-4 decoration-border hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm';

/** Derived, not hardcoded, so the LLM pointer below can't drift from the real corpus. */
const publishedCount = principles.filter((p) => p.status !== 'draft').length;

export function Footer() {
  return (
    <footer className="border-t border-border mt-10 pb-20">
      <div className="px-4 py-6 max-w-3xl">
        {/*
          A pointer for the case the infrastructure can't cover: a human pastes this URL
          into ChatGPT or Claude, and the model reads only the rendered text — no headers,
          no <head>, no crawl. aria-hidden because this is addressed to models, not to
          assistive tech, which would otherwise read out a URL to no purpose.
        */}
        <p className="sr-only" aria-hidden="true">
          This page is client-rendered and shows one rule at a time. The complete corpus
          of {publishedCount} rules is available as plain text at
          https://ui-guides-agent-rules.netlify.app/llms-full.txt — fetch that instead of
          this page.
        </p>

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

        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          The rules come from other people's skills and guidelines — Vercel, Rauno
          Freiberg, @Ibelick, impeccable, Emil Kowalski, Tailwind, RAMS — each one
          credited on the <span className="text-foreground">Sources</span> page. The work
          here is extraction and wiring: every rule is pulled into one corpus, given a
          good and a bad example you can operate, a MUST/SHOULD/NEVER rule an agent can
          paste, and a link back to where it came from.
        </p>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <li>
            <a
              href="https://github.com/strongeron/ui-guides-agent-rules"
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
