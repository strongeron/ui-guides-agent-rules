import { useState } from 'react';

/**
 * Good: never render an `<img>` you cannot vouch for.
 *
 * 1. Guard the render — no src, no `<img>`. Ship a real fallback instead (an
 *    initials avatar), so the layout is intact and the identity still reads.
 * 2. Guard the network — a src can be present and still 404, so `onError` swaps
 *    in the fallback the moment the browser gives up. The cover below points at
 *    a URL that does not exist; you are seeing the fallback, not a broken box.
 */

const user: { name: string; avatar?: string } = { name: 'Ada Lovelace' };
const post = { title: 'Shipping on Fridays', cover: '/uploads/cover-9f3c-missing.png' };

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

export function ImpeccableBrokenImageGood() {
  const [coverFailed, setCoverFailed] = useState(false);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
        {/* Guarded render: only emit <img> when there is something to load */}
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            width={40}
            height={40}
            className="size-10 rounded-full border border-border"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold text-muted-foreground"
          >
            {initials(user.name)}
          </span>
        )}
        <div>
          <p className="text-sm text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground">
            No avatar URL, so no <code>&lt;img&gt;</code> — an initials fallback instead.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-3">
        {/* Guarded network: onError swaps in the fallback when the URL 404s */}
        {coverFailed ? (
          <div className="flex h-[90px] w-40 items-center justify-center rounded-md border border-border bg-muted text-xs text-muted-foreground">
            No cover image
          </div>
        ) : (
          <img
            src={post.cover}
            alt={post.title}
            width={160}
            height={90}
            onError={() => setCoverFailed(true)}
            className="h-[90px] w-40 rounded-md border border-border object-cover"
          />
        )}
        <p className="mt-2 text-sm text-foreground">{post.title}</p>
        <p className="text-xs text-muted-foreground">
          <code>{post.cover}</code> 404s — <code>onError</code> already swapped it out.
        </p>
      </div>

      <p className="text-xs text-success">
        Two guards, because there are two failure modes: a missing URL (guard the render) and a URL
        that fails to load (guard with <code>onError</code>). Both reserve the same box, so nothing
        shifts when the fallback takes over.
      </p>
    </div>
  );
}
