import { useEffect, useState } from 'react';

const ROWS = ['Latency', 'Errors', 'Throughput'];

/**
 * Bad: the sequence is encoded in three independent booleans and a scatter of magic
 * numbers — 300 / 900 / 1500 in the timeouts, 0.26s / 0.2s inline in the JSX. Nobody
 * can read the choreography out of this file, and retuning it means hunting.
 *
 * The tempo control shows the actual cost. Someone re-tuned the sequence and missed
 * one call site (the heading timeout below). At 0.5× the heading now arrives AFTER
 * the rows it is supposed to introduce — a bug that is invisible in code review
 * precisely because the numbers are not named.
 */
export function NamedTimingConstantsBad() {
  const [run, setRun] = useState(0);
  const [tempo, setTempo] = useState(1);

  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [areRowsVisible, setAreRowsVisible] = useState(false);

  useEffect(() => {
    setIsCardVisible(false);
    setIsHeadingVisible(false);
    setAreRowsVisible(false);

    const t1 = setTimeout(() => setIsCardVisible(true), 300 * tempo);
    const t2 = setTimeout(() => setIsHeadingVisible(true), 900); // the retune missed this one
    const t3 = setTimeout(() => setAreRowsVisible(true), 1500 * tempo);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [run, tempo]);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setRun((r) => r + 1)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Replay sequence
        </button>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          Tempo
          <select
            value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
            className="rounded-md border border-border bg-card px-2 py-1 text-xs text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value={1}>1×</option>
            <option value={0.5}>0.5×</option>
          </select>
        </label>
        <span className="text-xs text-muted-foreground">
          flags: card={String(isCardVisible)} heading={String(isHeadingVisible)} rows={String(areRowsVisible)}
        </span>
      </div>

      <div className="h-44 rounded-lg border border-border bg-muted/40 p-4">
        <div
          className="rounded-lg border border-border bg-card p-4"
          style={{
            transition: 'transform 0.26s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.26s cubic-bezier(0.23, 1, 0.32, 1)',
            transform: isCardVisible ? 'translateY(0)' : 'translateY(12px)',
            opacity: isCardVisible ? 1 : 0,
          }}
        >
          <p
            className="text-sm font-medium text-card-foreground"
            style={{
              transition: 'opacity 0.24s ease-out',
              opacity: isHeadingVisible ? 1 : 0,
            }}
          >
            Service health
          </p>
          <ul className="mt-3 space-y-1.5">
            {ROWS.map((row, i) => (
              <li
                key={row}
                className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                style={{
                  transition: 'opacity 0.24s ease-out',
                  transitionDelay: `${i * 0.2}s`,
                  opacity: areRowsVisible ? 1 : 0,
                }}
              >
                {row}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-xs text-destructive">
        Three booleans and five magic numbers spread across the file. Switch tempo to 0.5× and the rows appear before
        the heading that introduces them — the retune updated two of the three call sites, and nothing in the code
        made that omission visible.
      </p>
    </div>
  );
}
