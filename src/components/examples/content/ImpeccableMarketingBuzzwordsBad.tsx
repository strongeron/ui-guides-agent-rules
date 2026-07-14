// A slice of impeccable's ~30-phrase blocklist. The detector fires on ANY single hit.
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

const HEADLINE = 'Supercharge your workflow';
const SUBHEAD =
  'A best-in-class, enterprise-grade platform that lets your team seamlessly integrate cutting-edge tooling and transform your business.';

const PATTERN = new RegExp(`(${BLOCKLIST.join('|')})`, 'gi');
const matches = `${HEADLINE} ${SUBHEAD}`.match(PATTERN) ?? [];

function Highlighted({ text, className }: { text: string; className: string }) {
  // String.split with a capture group yields [text, match, text, match, ...]:
  // every odd index is a blocklist hit.
  const parts = text.split(PATTERN);
  return (
    <p className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-error/15 px-1 text-error">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  );
}

export function ImpeccableMarketingBuzzwordsBad() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-card p-5 text-center">
        <Highlighted
          text={HEADLINE}
          className="mb-2 text-2xl font-semibold leading-tight text-foreground"
        />
        <Highlighted
          text={SUBHEAD}
          className="mx-auto max-w-[46ch] text-sm leading-[1.6] text-muted-foreground"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-error">
          {matches.length} blocklist hits
        </span>
        <span className="text-muted-foreground">detector fires on any single hit</span>
      </div>

      <p className="text-xs text-error">
        Read the hero and try to say what the product does. You cannot, because none of these words
        name a verb or a noun from the actual domain: they would fit a CRM, a CDN, or a coffee
        machine equally well. That interchangeability is the AI tell.
      </p>
    </div>
  );
}
