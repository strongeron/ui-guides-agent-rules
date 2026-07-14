#!/usr/bin/env npx tsx
/**
 * Agent Rules Alignment Validator
 *
 * Checks that a principle's Good/Bad examples actually demonstrate its agent rule.
 *
 * Design note — why this only checks a declared subset:
 * The previous version inferred expectations by scanning the rule's *prose* for
 * keywords ("focus", "label", "transition") and then requiring the matching code
 * patterns to appear in the example. Nobody declared those expectations, so it
 * invented them, and it compared with naive substring matching — `disabled`
 * matched `aria-disabled`, `transform` matched `transition-transform`. The result
 * was confident, wrong findings: a correct example that merely *names* the thing
 * it avoids got flagged critical.
 *
 * An automated checker cannot read intent. So it now checks only what a human has
 * explicitly declared in RULE_CHECKS, and reports the rest as `unchecked` instead
 * of guessing. A smaller honest gate beats a large lying one.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { agentRules } from '../src/data/agentRules';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

interface AgentRule {
  priority: 'MUST' | 'SHOULD' | 'NEVER';
  rule: string;
  codeExample?: string;
}

/** What an example must / must not contain. Regexes, so tokens can be anchored. */
interface ExampleSpec {
  must?: RegExp[];
  mustNot?: RegExp[];
}

interface RuleCheck {
  good?: ExampleSpec;
  bad?: ExampleSpec;
}

interface AlignmentIssue {
  principleId: string;
  priority: string;
  rule: string;
  issue: string;
  severity: 'high' | 'medium';
  exampleType: 'good' | 'bad';
  examplePath: string;
}

interface AlignmentReport {
  timestamp: string;
  summary: {
    totalRules: number;
    checked: number;
    unchecked: number;
    missingExamples: number;
    passed: number;
    failed: number;
  };
  /** Rules with no declared check — candidates for a spec, NOT failures. */
  unchecked: string[];
  issues: AlignmentIssue[];
}

/**
 * Declared checks. Only add one when the rule maps to an unambiguous code token —
 * if a correct example could plausibly omit the token, or an incorrect one could
 * contain it, leave the rule unchecked rather than encoding a guess.
 */
const RULE_CHECKS: Record<string, RuleCheck> = {
  'performance-no-transition-all': {
    good: { mustNot: [/transition-all\b/, /transition:\s*all\b/] },
    bad: { must: [/transition-all\b/, /transition:\s*all\b/] },
  },
  'animations-never-transition-all': {
    good: { mustNot: [/transition-all\b/, /transition:\s*all\b/] },
    bad: { must: [/transition-all\b/, /transition:\s*all\b/] },
  },
  'interactions-rams-semantic-handlers': {
    good: { must: [/<button\b/, /<a\s/] },
    bad: { must: [/<(div|span)[^>]*onClick/] },
  },
  'animations-ibelick-no-layout': {
    good: { must: [/transform|translate|scale\(/] },
  },
  'interactions-sr-only': {
    good: { must: [/sr-only|visually-hidden/] },
  },
  'content-ibelick-tabular-nums': {
    good: { must: [/tabular-nums|font-variant-numeric/] },
  },
  'interactions-ibelick-alert-dialog': {
    good: { must: [/AlertDialog|role=["']alertdialog["']/] },
  },
  'animations-prefers-reduced-motion': {
    // `useSimulatedReducedMotion` is the project idiom: it ORs the real
    // `prefers-reduced-motion` media query with the demo toggle, so delegating to it
    // is a correct implementation, not an omission.
    good: { must: [/prefers-reduced-motion|motion-safe:|motion-reduce:|useSimulatedReducedMotion/] },
  },
  'layout-min-width-truncation': {
    // Anchored to className: every example *names* `min-w-0` in its caption prose,
    // so an unanchored token would match the text that explains the bug.
    good: { must: [/className=["'][^"']*\bmin-w-0\b/, /min-width:\s*0/] },
    bad: { mustNot: [/className=["'][^"']*\bmin-w-0\b/] },
  },
  'content-translate-no': {
    good: { must: [/translate=["']no["']/] },
  },
  'animations-svg-transform-box': {
    good: { must: [/transform-box/] },
  },
  'interactions-focus-within-group': {
    good: { must: [/focus-within/] },
  },
  'performance-lazy-load-below-fold': {
    good: { must: [/loading=["']lazy["']/] },
  },
  'animations-emil-starting-style': {
    good: { must: [/@starting-style/] },
  },
  'content-impeccable-justified-text': {
    good: { must: [/hyphens/] },
    bad: { must: [/justify/] },
  },
  'design-color-scheme': {
    good: { must: [/colorScheme|color-scheme/] },
  },
  'content-non-breaking-spaces': {
    good: { must: [/&nbsp;|\u00a0/] },
  },
};

/**
 * Strip comments before matching. Examples deliberately *name* the anti-pattern in
 * their comments ("overflow-hidden: added for the rounded corner, kept forever"),
 * and matching against that prose is how the old version produced false positives.
 */
function stripComments(src: string): string {
  return src
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '') // {/* jsx */}
    .replace(/\/\*[\s\S]*?\*\//g, '') // /* block */
    .replace(/^[^\n]*?\/\/.*$/gm, (line) => (/https?:\/\//.test(line) ? line : line.replace(/\/\/.*$/, '')));
}

function getExamplePaths(principleId: string): { good?: string; bad?: string } {
  const validationPath = join(rootDir, 'doc/validation-results.json');
  if (!existsSync(validationPath)) return {};

  const validation = JSON.parse(readFileSync(validationPath, 'utf-8'));
  const result = validation.results.find(
    (r: { id: string; goodExampleAnalysis?: { path?: string }; badExampleAnalysis?: { path?: string } }) =>
      r.id === principleId
  );
  if (!result) return {};

  return { good: result.goodExampleAnalysis?.path, bad: result.badExampleAnalysis?.path };
}

function checkExample(
  principleId: string,
  rule: AgentRule,
  spec: ExampleSpec | undefined,
  source: string,
  exampleType: 'good' | 'bad',
  examplePath: string
): AlignmentIssue[] {
  if (!spec) return [];
  const code = stripComments(source);
  const issues: AlignmentIssue[] = [];

  // `must` is satisfied by ANY listed pattern — the list is alternatives, not a conjunction.
  if (spec.must?.length && !spec.must.some((re) => re.test(code))) {
    issues.push({
      principleId,
      priority: rule.priority,
      rule: rule.rule,
      issue:
        exampleType === 'good'
          ? `Good example does not use the pattern the rule requires (${spec.must.map(String).join(' | ')})`
          : `Bad example does not demonstrate the anti-pattern (${spec.must.map(String).join(' | ')})`,
      severity: exampleType === 'good' ? 'high' : 'medium',
      exampleType,
      examplePath,
    });
  }

  for (const re of spec.mustNot ?? []) {
    if (re.test(code)) {
      issues.push({
        principleId,
        priority: rule.priority,
        rule: rule.rule,
        issue:
          exampleType === 'good'
            ? `Good example contains the pattern the rule forbids (${re})`
            : `Bad example avoids the anti-pattern it is supposed to show (${re})`,
        severity: exampleType === 'good' ? 'high' : 'medium',
        exampleType,
        examplePath,
      });
    }
  }

  return issues;
}

function main() {
  console.log('🔍 Validating Agent Rules Alignment...\n');

  const rules = new Map(Object.entries(agentRules) as [string, AgentRule][]);
  const issues: AlignmentIssue[] = [];
  const unchecked: string[] = [];
  let checked = 0;
  let missingExamples = 0;
  let failed = 0;

  for (const [principleId, rule] of rules) {
    const check = RULE_CHECKS[principleId];
    if (!check) {
      unchecked.push(principleId);
      continue;
    }

    const paths = getExamplePaths(principleId);
    if (!paths.good && !paths.bad) {
      missingExamples++;
      continue;
    }

    checked++;
    const before = issues.length;

    if (paths.good && existsSync(paths.good)) {
      issues.push(
        ...checkExample(principleId, rule, check.good, readFileSync(paths.good, 'utf-8'), 'good', paths.good)
      );
    }
    if (paths.bad && existsSync(paths.bad)) {
      issues.push(
        ...checkExample(principleId, rule, check.bad, readFileSync(paths.bad, 'utf-8'), 'bad', paths.bad)
      );
    }

    if (issues.length > before) failed++;
  }

  console.log('📊 Summary\n');
  console.log(`Total rules       : ${rules.size}`);
  console.log(`Checked           : ${checked}  (rules with a declared spec in RULE_CHECKS)`);
  console.log(`Unchecked         : ${unchecked.length}  (no spec — not a failure, see report)`);
  console.log(`Missing examples  : ${missingExamples}`);
  console.log(`✅ Passed         : ${checked - failed}`);
  console.log(`❌ Failed         : ${failed}`);

  if (issues.length > 0) {
    console.log('\n\n⚠️  Alignment Issues\n');
    for (const sev of ['high', 'medium'] as const) {
      const group = issues.filter((i) => i.severity === sev);
      if (!group.length) continue;
      console.log(`### ${sev === 'high' ? '🟠 High' : '🟡 Medium'} (${group.length})\n`);
      for (const i of group) {
        console.log(`**${i.principleId}** (${i.exampleType}) — ${relative(rootDir, i.examplePath)}`);
        console.log(`  Rule : ${i.rule}`);
        console.log(`  Issue: ${i.issue}\n`);
      }
    }
  } else {
    console.log('\n✅ Every declared check passed.');
  }

  const report: AlignmentReport = {
    timestamp: new Date().toISOString(),
    summary: {
      totalRules: rules.size,
      checked,
      unchecked: unchecked.length,
      missingExamples,
      passed: checked - failed,
      failed,
    },
    unchecked,
    issues,
  };

  const outputPath = join(rootDir, 'doc/agent-rules-alignment.json');
  writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`📁 Report saved to ${relative(rootDir, outputPath)}`);

  // Only a declared, verified violation fails the build.
  process.exit(issues.some((i) => i.severity === 'high') ? 1 : 0);
}

main();
