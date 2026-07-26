/**
 * Shared corpus access for the build-time generators.
 *
 * `generate-llms.ts` (the three discovery files) and `generate-agent-layers.ts`
 * (the sliceable per-rule payloads) both derive everything from the same data.
 * The constants and the example loader live here so the two cannot disagree about
 * what the site URL is or which file backs a given example key.
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { principles } from '../../src/data/principles';
import { sourceRegistry } from '../../src/components/source-registry';
import { pathToKey } from '../../src/utils/exampleKeys';

export const SITE = 'https://ui-guides-agent-rules.netlify.app';
export const AUTHOR_SITE = 'https://glebstroganov.com';
export const REPO = 'https://github.com/strongeron/ui-guides-agent-rules';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..', '..');
export const PUBLIC_DIR = join(ROOT, 'public');
const EXAMPLES_DIR = join(ROOT, 'src', 'components', 'examples');

/** Drafts are not in the app, so they are not in any published artifact either. */
export const published = principles.filter((p) => p.status !== 'draft');

export const sourceInfo = (id: string | undefined) =>
  id ? sourceRegistry[id as keyof typeof sourceRegistry] : undefined;

/**
 * Map example key → component source, keyed the same way ExampleRenderer resolves
 * them at runtime. Built by walking the directory and re-deriving each key through
 * `pathToKey`, rather than reconstructing filenames from ids — acronym casing makes
 * that lossy in the other direction (`ZIndex` → `zindex`, not `z-index`).
 */
export function loadExampleSources(): Map<string, string> {
  const sources = new Map<string, string>();

  for (const category of readdirSync(EXAMPLES_DIR, { withFileTypes: true })) {
    if (!category.isDirectory()) continue;
    const dir = join(EXAMPLES_DIR, category.name);

    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.tsx')) continue;
      const key = pathToKey(`./examples/${category.name}/${file}`);
      if (key) sources.set(key, readFileSync(join(dir, file), 'utf8'));
    }
  }

  return sources;
}
