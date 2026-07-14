/**
 * Bad: `<img>` tags whose src never resolves.
 *
 * Both boxes below are real, not mock-ups — the browser is rendering its own
 * broken-image chrome.
 *
 * 1. `user.avatar` came back `undefined` from the CMS, so React omits the
 *    attribute entirely and ships an `<img>` with no src.
 * 2. `post.cover` is a path that 404s. Nobody checked, because it resolved in
 *    staging.
 *
 * The third variant — a literal `<img src="" />` — fails the same way.
 */

// What the CMS actually returned
const user: { name: string; avatar?: string } = { name: 'Ada Lovelace' };
const post = { title: 'Shipping on Fridays', cover: '/uploads/cover-9f3c-missing.png' };

export function ImpeccableBrokenImageBad() {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
        {/* user.avatar is undefined → React omits src → <img> with no src */}
        <img
          src={user.avatar}
          alt={user.name}
          width={40}
          height={40}
          className="size-10 rounded-full border border-border"
        />
        <div>
          <p className="text-sm text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground">
            <code>&lt;img src={'{user.avatar}'} /&gt;</code> — avatar is undefined
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-3">
        {/* A real 404 → the browser draws its broken-image box */}
        <img
          src={post.cover}
          alt={post.title}
          width={160}
          height={90}
          className="h-[90px] w-40 rounded-md border border-border object-cover"
        />
        <p className="mt-2 text-sm text-foreground">{post.title}</p>
        <p className="text-xs text-muted-foreground">
          <code>{post.cover}</code> — 404s in production
        </p>
      </div>

      <p className="text-xs text-error">
        An <code>&lt;img&gt;</code> with an empty, missing, or placeholder src ships as a
        broken-image box. It is the most trivial bug in this corpus and it reaches production
        constantly, because a null image URL from a CMS is invisible until it renders.
      </p>
    </div>
  );
}
