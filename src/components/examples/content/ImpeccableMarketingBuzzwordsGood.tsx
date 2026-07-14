const BLOCKLIST = [
  'streamline your',
  'empower your',
  'supercharge your',
  'unleash the power',
  'best-in-class',
  'industry-leading',
  'world-class',
  'enterprise-grade',
  'next-generation',
  'cutting-edge',
  'transform your business',
  'revolutionize',
  'game-changer',
  'mission-critical',
  'future-proof',
  'seamless experience',
  'seamlessly integrate',
  'harness the power',
  'trusted by leading',
  'built for the modern',
];

const HEADLINE = 'Deploy a Postgres branch in 400ms.';
const SUBHEAD =
  'Every pull request gets a full copy of your database, seeded with production schema. Merge it or throw it away. You are billed for storage, not for the copy.';

const PATTERN = new RegExp(`(${BLOCKLIST.join('|')})`, 'gi');
const matches = `${HEADLINE} ${SUBHEAD}`.match(PATTERN) ?? [];

export function ImpeccableMarketingBuzzwordsGood() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-card p-5 text-center">
        <h3 className="mb-2 text-2xl font-semibold leading-tight text-foreground">{HEADLINE}</h3>
        <p className="mx-auto max-w-[46ch] text-sm leading-[1.6] text-muted-foreground">
          {SUBHEAD}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-success">
          {matches.length} blocklist hits
        </span>
        <span className="text-muted-foreground">specific verb + specific noun</span>
      </div>

      <p className="text-xs text-success">
        A concrete verb (deploy), a concrete noun (a Postgres branch), and a number you could hold
        the product to (400ms). Nothing in this copy could be pasted onto a different product, which
        is exactly the test. It also avoids the companion tell, aphoristic cadence: no manufactured
        contrasts like &ldquo;Not a feature. A platform.&rdquo; stacked three deep.
      </p>
    </div>
  );
}
