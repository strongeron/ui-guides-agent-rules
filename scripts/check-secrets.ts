#!/usr/bin/env npx tsx
/**
 * Secret Scanner — a fork-safety backstop for a PUBLIC repo.
 *
 * The source-sync scripts read a GitHub token from the environment (GITHUB_TOKEN)
 * and never write it to disk — but a contributor could still paste a key into a file
 * or commit a stray .env. This scans git-tracked files for common secret shapes and
 * exits non-zero if any are found, so it can gate CI or a pre-commit hook.
 *
 *   npm run check:secrets            # scan all tracked files
 *   npm run check:secrets -- --staged  # scan only staged changes (pre-commit)
 *
 * Read-only. No network, no dependencies.
 */
import { execFileSync } from 'child_process';
import { readFileSync, statSync } from 'fs';

interface Rule {
  name: string;
  re: RegExp;
}

// High-signal patterns only — tuned to avoid firing on ordinary code/docs.
const RULES: Rule[] = [
  { name: 'GitHub token', re: /\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36}\b/ },
  { name: 'GitHub fine-grained PAT', re: /\bgithub_pat_[A-Za-z0-9_]{60,}\b/ },
  { name: 'AWS access key id', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: 'Slack token', re: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/ },
  { name: 'OpenAI/Anthropic key', re: /\b(sk|sk-ant)-[A-Za-z0-9_-]{20,}\b/ },
  { name: 'Google API key', re: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  { name: 'Private key block', re: /-----BEGIN (RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----/ },
  // Assigned secret. Bare `token` is excluded — it collides with CSS/design tokens,
  // which dominate this repo. The value must not start with `--` (a CSS custom property).
  {
    name: 'Generic assigned secret',
    re: /(?:api[_-]?key|apikey|secret|password|passwd|access[_-]?token|auth[_-]?token|client[_-]?secret|private[_-]?key)['"]?\s*[:=]\s*['"](?!--)[A-Za-z0-9+/_-]{16,}['"]/i,
  },
];

// This file itself contains the patterns above — never scan it.
const SELF = 'scripts/check-secrets.ts';
// Binary / lockfile / vendored noise where matches would be false positives.
const SKIP = /(^|\/)(package-lock\.json|node_modules\/|dist\/|\.git\/)|\.(png|jpg|jpeg|gif|webp|avif|ico|woff2?|ttf|otf|mp4|webm|pdf|snap)$/i;
const MAX_BYTES = 1_000_000;

function trackedFiles(stagedOnly: boolean): string[] {
  const args = stagedOnly
    ? ['diff', '--cached', '--name-only', '--diff-filter=ACM']
    : ['ls-files'];
  return execFileSync('git', args, { encoding: 'utf-8' })
    .split('\n')
    .map((f) => f.trim())
    .filter(Boolean);
}

function main() {
  const stagedOnly = process.argv.includes('--staged');
  const files = trackedFiles(stagedOnly).filter((f) => f !== SELF && !SKIP.test(f));

  const findings: { file: string; line: number; rule: string; snippet: string }[] = [];
  for (const file of files) {
    let size = 0;
    try {
      size = statSync(file).size;
    } catch {
      continue; // staged-deleted or unreadable
    }
    if (size > MAX_BYTES) continue;
    let content: string;
    try {
      content = readFileSync(file, 'utf-8');
    } catch {
      continue;
    }
    content.split('\n').forEach((line, i) => {
      for (const rule of RULES) {
        if (rule.re.test(line)) {
          findings.push({ file, line: i + 1, rule: rule.name, snippet: line.trim().slice(0, 80) });
        }
      }
    });
  }

  const scope = stagedOnly ? 'staged' : 'tracked';
  if (findings.length === 0) {
    console.log(`\n🔐 check:secrets — no secrets in ${files.length} ${scope} file(s). ✅\n`);
    return;
  }
  console.error(`\n🚨 check:secrets — ${findings.length} potential secret(s) in ${scope} files:\n`);
  for (const f of findings) {
    console.error(`  ${f.file}:${f.line}  [${f.rule}]`);
    console.error(`     ${f.snippet}`);
  }
  console.error('\n  If a match is a false positive, refine the pattern in scripts/check-secrets.ts.');
  console.error('  Otherwise: remove the secret, rotate it, and scrub it from git history.\n');
  process.exit(1);
}

main();
