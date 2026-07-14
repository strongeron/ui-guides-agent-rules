#!/usr/bin/env npx tsx
/**
 * Agent Rules Alignment Validator
 * Checks that examples follow their corresponding agent rules
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

interface AlignmentIssue {
  principleId: string;
  ruleId: string;
  priority: string;
  rule: string;
  issue: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  exampleType: 'good' | 'bad';
  examplePath: string;
}

interface AlignmentReport {
  timestamp: string;
  summary: {
    totalRules: number;
    aligned: number;
    misaligned: number;
    missing: number;
  };
  issues: AlignmentIssue[];
}

// Keywords that indicate specific patterns
const PATTERN_KEYWORDS: Record<string, string[]> = {
  'keyboard': ['tabIndex', 'onKeyDown', 'onKeyUp', 'role=', 'aria-'],
  'focus': ['focus', ':focus', 'focus-visible', 'focus-within', 'tabIndex'],
  'focus-visible': [':focus-visible', 'focus-visible:'],
  'autocomplete': ['autoComplete', 'autocomplete='],
  'label': ['<label', 'htmlFor', 'aria-label', 'aria-labelledby'],
  'validation': ['required', 'pattern=', 'aria-invalid', 'aria-describedby'],
  'reduced-motion': ['prefers-reduced-motion', 'motion-reduce', 'motion-safe'],
  'transition': ['transition-transform', 'transition-opacity', 'transition-colors', 'transition-shadow'],
  'transition-all': ['transition-all', 'transition: all'],
  'transform': ['transform', 'translate', 'scale(', 'rotate('],
  'layout-properties': ['width:', 'height:', 'top:', 'left:', 'margin:', 'padding:'],
  'aria': ['aria-', 'role='],
  'semantic': ['<button', '<a ', '<nav', '<main', '<header', '<footer'],
  'div-onclick': ['<div onClick', '<span onClick', 'div onClick', 'span onClick'],
  'dark-mode': ['dark:', 'dark-mode', 'color-scheme'],
  'lazy': ['lazy', 'loading="lazy"', 'Suspense'],
  'debounce': ['debounce', 'throttle', 'setTimeout'],
  'sr-only': ['sr-only', 'visually-hidden'],
  'tabular-nums': ['tabular-nums', 'font-variant-numeric'],
  'alertdialog': ['AlertDialog', 'alertdialog', 'role="alertdialog"'],
};

// Rule-specific pattern overrides (more precise than keyword matching)
const RULE_PATTERN_OVERRIDES: Record<string, { expected?: string[]; forbidden?: string[] }> = {
  'performance-no-transition-all': {
    forbidden: ['transition-all', 'transition: all'],
    expected: ['transition-transform', 'transition-opacity', 'transition-colors'],
  },
  'animations-never-transition-all': {
    forbidden: ['transition-all', 'transition: all'],
    expected: ['transition-transform', 'transition-opacity'],
  },
  'interactions-rams-semantic-handlers': {
    forbidden: ['<div onClick', '<span onClick'],
    expected: ['<button', '<a '],
  },
  'animations-ibelick-no-layout': {
    forbidden: ['width:', 'height:', 'top:', 'left:'],
    expected: ['transform', 'scale(', 'translate('],
  },
  'interactions-ibelick-manual-behavior': {
    forbidden: ['onKeyDown', 'onKeyUp', 'handleKeyDown'],
    expected: ['Tabs', 'Dialog', 'Popover', 'Menu', 'Radix', 'Base UI', 'React Aria'],
  },
  'interactions-sr-only': {
    expected: ['sr-only', 'visually-hidden'],
  },
  'content-ibelick-tabular-nums': {
    expected: ['tabular-nums', 'font-variant-numeric'],
  },
  'interactions-ibelick-alert-dialog': {
    expected: ['AlertDialog', 'alertdialog'],
  },
};

/**
 * Import the rules rather than regex-scraping agentRules.ts. The previous regex
 * terminated its capture at the first backtick, so every rule that quotes a CSS
 * property or attribute — the house style — was truncated or dropped entirely,
 * silently exempting ~22 rules from validation.
 */
function parseAgentRules(): Map<string, AgentRule> {
  return new Map(Object.entries(agentRules) as [string, AgentRule][]);
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

  return {
    good: result.goodExampleAnalysis?.path,
    bad: result.badExampleAnalysis?.path,
  };
}

function checkAlignment(
  principleId: string,
  rule: AgentRule,
  exampleContent: string,
  exampleType: 'good' | 'bad',
  examplePath: string
): AlignmentIssue | null {
  const ruleLower = rule.rule.toLowerCase();
  let expectedPatterns: string[] = [];
  let forbiddenPatterns: string[] = [];

  // Check for rule-specific overrides first (more precise)
  const override = RULE_PATTERN_OVERRIDES[principleId];
  if (override) {
    if (override.expected) expectedPatterns = override.expected;
    if (override.forbidden) forbiddenPatterns = override.forbidden;
  } else {
    // Fall back to keyword-based matching
    for (const [keyword, patterns] of Object.entries(PATTERN_KEYWORDS)) {
      if (ruleLower.includes(keyword)) {
        if (rule.priority === 'NEVER') {
          forbiddenPatterns.push(...patterns);
        } else {
          expectedPatterns.push(...patterns);
        }
      }
    }
  }

  if (exampleType === 'good') {
    // For NEVER rules, check that good example doesn't have forbidden patterns
    if (rule.priority === 'NEVER' && forbiddenPatterns.length > 0) {
      const hasForbidden = forbiddenPatterns.some(p => exampleContent.includes(p));
      if (hasForbidden) {
        return {
          principleId, ruleId: principleId, priority: rule.priority, rule: rule.rule,
          issue: `Good example contains forbidden pattern for NEVER rule`,
          severity: 'critical', exampleType, examplePath,
        };
      }
    }
    // For MUST/SHOULD rules, check that good example has expected patterns
    if (rule.priority !== 'NEVER' && expectedPatterns.length > 0) {
      const hasExpected = expectedPatterns.some(p =>
        exampleContent.includes(p) || exampleContent.toLowerCase().includes(p.toLowerCase())
      );
      if (!hasExpected) {
        return {
          principleId, ruleId: principleId, priority: rule.priority, rule: rule.rule,
          issue: `Good example missing expected patterns for ${rule.priority} rule`,
          severity: rule.priority === 'MUST' ? 'high' : 'medium',
          exampleType, examplePath,
        };
      }
    }
  }

  if (exampleType === 'bad') {
    // For MUST/SHOULD rules, bad examples should NOT have the expected patterns
    if (rule.priority !== 'NEVER' && expectedPatterns.length > 0) {
      const hasExpected = expectedPatterns.some(p =>
        exampleContent.includes(p) || exampleContent.toLowerCase().includes(p.toLowerCase())
      );
      if (hasExpected) {
        return {
          principleId, ruleId: principleId, priority: rule.priority, rule: rule.rule,
          issue: `Bad example has correct patterns - not demonstrating anti-pattern`,
          severity: 'medium', exampleType, examplePath,
        };
      }
    }
  }

  return null;
}

function main() {
  console.log('🔍 Validating Agent Rules Alignment...\n');

  const rules = parseAgentRules();
  console.log(`Found ${rules.size} agent rules\n`);

  const issues: AlignmentIssue[] = [];
  let aligned = 0;
  let misaligned = 0;
  let missing = 0;

  for (const [principleId, rule] of rules) {
    const paths = getExamplePaths(principleId);
    if (!paths.good && !paths.bad) { missing++; continue; }

    let hasIssue = false;

    if (paths.good && existsSync(paths.good)) {
      const content = readFileSync(paths.good, 'utf-8');
      const issue = checkAlignment(principleId, rule, content, 'good', paths.good);
      if (issue) { issues.push(issue); hasIssue = true; }
    }

    if (paths.bad && existsSync(paths.bad)) {
      const content = readFileSync(paths.bad, 'utf-8');
      const issue = checkAlignment(principleId, rule, content, 'bad', paths.bad);
      if (issue) { issues.push(issue); hasIssue = true; }
    }

    if (hasIssue) misaligned++; else aligned++;
  }

  console.log('📊 Summary\n');
  console.log(`Total Rules: ${rules.size}`);
  console.log(`✅ Aligned: ${aligned}`);
  console.log(`⚠️ Misaligned: ${misaligned}`);
  console.log(`❓ Missing Examples: ${missing}`);

  if (issues.length > 0) {
    console.log('\n\n⚠️ Alignment Issues\n');
    const critical = issues.filter(i => i.severity === 'critical');
    const high = issues.filter(i => i.severity === 'high');

    if (critical.length > 0) {
      console.log('### 🔴 Critical\n');
      for (const issue of critical) {
        console.log(`**${issue.principleId}** (${issue.exampleType})`);
        console.log(`  Rule: ${issue.rule}`);
        console.log(`  Issue: ${issue.issue}\n`);
      }
    }

    if (high.length > 0) {
      console.log('### 🟠 High\n');
      for (const issue of high) {
        console.log(`**${issue.principleId}** (${issue.exampleType})`);
        console.log(`  Rule: ${issue.rule}`);
        console.log(`  Issue: ${issue.issue}\n`);
      }
    }

    console.log(`### 🟡 Medium: ${issues.filter(i => i.severity === 'medium').length} issues`);
    console.log(`### 🟢 Low: ${issues.filter(i => i.severity === 'low').length} issues`);
  }

  const report: AlignmentReport = {
    timestamp: new Date().toISOString(),
    summary: { totalRules: rules.size, aligned, misaligned, missing },
    issues,
  };

  const outputPath = join(rootDir, 'doc/agent-rules-alignment.json');
  writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`\n📁 Report saved to ${relative(rootDir, outputPath)}`);

  process.exit(issues.filter(i => i.severity === 'critical' || i.severity === 'high').length > 0 ? 1 : 0);
}

main();
