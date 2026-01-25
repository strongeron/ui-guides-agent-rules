#!/usr/bin/env npx tsx
/**
 * Validation Report Generator
 * Aggregates validation results into a markdown report
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

interface ValidationResults {
  timestamp: string;
  principleCount: number;
  exampleCount: number;
  summaries: CategorySummary[];
  results: ValidationResult[];
  themeAnalysis: {
    withDarkMode: number;
    withoutDarkMode: number;
  };
}

interface CategorySummary {
  category: string;
  total: number;
  valid: number;
  invalid: number;
  themeIssues: number;
  issues: { id: string; issues: string[] }[];
}

interface ValidationResult {
  id: string;
  category: string;
  title: string;
  hasSourceQuote: boolean;
  hasSourceLinks: boolean;
  hasAdditionalExplanation: boolean;
  hasBadExample: boolean;
  hasGoodExample: boolean;
  badExampleExists: boolean;
  goodExampleExists: boolean;
  sourceLinksCount: number;
  issues: string[];
}

interface SourceLinksResults {
  timestamp: string;
  totalLinks: number;
  summary: {
    ok: number;
    redirects: number;
    errors: number;
    timeouts: number;
  };
  results: LinkCheckResult[];
}

interface LinkCheckResult {
  url: string;
  text: string;
  principleId: string;
  status: 'ok' | 'error' | 'redirect' | 'timeout';
  statusCode?: number;
  redirectUrl?: string;
  error?: string;
}

function loadJson<T>(path: string): T | null {
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function generateReport(): string {
  const validationPath = join(rootDir, 'doc/validation-results.json');
  const sourceLinksPath = join(rootDir, 'doc/source-links-results.json');

  const validation = loadJson<ValidationResults>(validationPath);
  const sourceLinks = loadJson<SourceLinksResults>(sourceLinksPath);

  const lines: string[] = [];

  lines.push('# Principle Validation Report');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');

  // Overview
  lines.push('## Overview');
  lines.push('');

  if (validation) {
    lines.push(`- **Total Principles**: ${validation.principleCount}`);
    lines.push(`- **Total Examples**: ${validation.exampleCount}`);
    lines.push(`- **Dark Mode Support**: ${validation.themeAnalysis.withDarkMode} / ${validation.themeAnalysis.withDarkMode + validation.themeAnalysis.withoutDarkMode}`);
    lines.push('');
  }

  if (sourceLinks) {
    lines.push('### Source Links Status');
    lines.push('');
    lines.push(`| Status | Count |`);
    lines.push(`|--------|-------|`);
    lines.push(`| ✅ OK | ${sourceLinks.summary.ok} |`);
    lines.push(`| ↪️ Redirect | ${sourceLinks.summary.redirects} |`);
    lines.push(`| ❌ Error | ${sourceLinks.summary.errors} |`);
    lines.push(`| ⏱️ Timeout | ${sourceLinks.summary.timeouts} |`);
    lines.push('');
  }

  // Category Summary
  if (validation) {
    lines.push('## Category Summary');
    lines.push('');
    lines.push('| Category | Total | Valid | Issues | Theme Issues |');
    lines.push('|----------|-------|-------|--------|--------------|');

    for (const summary of validation.summaries) {
      const status = summary.invalid === 0 ? '✅' : '⚠️';
      lines.push(`| ${summary.category} | ${summary.total} | ${summary.valid} | ${summary.invalid} ${status} | ${summary.themeIssues} |`);
    }
    lines.push('');
  }

  // Issues by Category
  if (validation) {
    const hasIssues = validation.summaries.some(s => s.issues.length > 0);

    if (hasIssues) {
      lines.push('## Issues by Category');
      lines.push('');

      for (const summary of validation.summaries) {
        if (summary.issues.length === 0) continue;

        lines.push(`### ${summary.category}`);
        lines.push('');

        for (const issue of summary.issues) {
          lines.push(`#### ${issue.id}`);
          lines.push('');
          for (const i of issue.issues) {
            lines.push(`- ${i}`);
          }
          lines.push('');
        }
      }
    }
  }

  // Source Link Errors
  if (sourceLinks) {
    const errors = sourceLinks.results.filter(r => r.status === 'error' || r.status === 'timeout');

    if (errors.length > 0) {
      lines.push('## Broken Source Links');
      lines.push('');
      lines.push('| Principle | URL | Error |');
      lines.push('|-----------|-----|-------|');

      for (const error of errors) {
        const shortUrl = error.url.length > 50 ? error.url.slice(0, 47) + '...' : error.url;
        lines.push(`| ${error.principleId} | ${shortUrl} | ${error.error || error.status} |`);
      }
      lines.push('');
    }

    const redirects = sourceLinks.results.filter(r => r.status === 'redirect');

    if (redirects.length > 0) {
      lines.push('## Redirected Links');
      lines.push('');
      lines.push('These links redirect to a different URL and should be updated:');
      lines.push('');
      lines.push('| Principle | Original | Redirects To |');
      lines.push('|-----------|----------|--------------|');

      for (const redirect of redirects) {
        const shortOriginal = redirect.url.length > 40 ? redirect.url.slice(0, 37) + '...' : redirect.url;
        const shortRedirect = redirect.redirectUrl && redirect.redirectUrl.length > 40
          ? redirect.redirectUrl.slice(0, 37) + '...'
          : redirect.redirectUrl || 'Unknown';
        lines.push(`| ${redirect.principleId} | ${shortOriginal} | ${shortRedirect} |`);
      }
      lines.push('');
    }
  }

  // Theme Issues
  if (validation) {
    const themeIssues = validation.results.filter(r =>
      r.issues.some(i => i.includes('dark mode') || i.includes('hardcoded colors'))
    );

    if (themeIssues.length > 0) {
      lines.push('## Theme Support Issues');
      lines.push('');
      lines.push('The following examples need dark mode support:');
      lines.push('');

      for (const result of themeIssues) {
        const themeRelated = result.issues.filter(i =>
          i.includes('dark mode') || i.includes('hardcoded colors')
        );
        if (themeRelated.length > 0) {
          lines.push(`### ${result.id}`);
          for (const issue of themeRelated) {
            lines.push(`- ${issue}`);
          }
          lines.push('');
        }
      }
    }
  }

  // Action Items
  lines.push('## Action Items');
  lines.push('');

  const actionItems: string[] = [];

  if (validation) {
    const missingExamples = validation.results.filter(r => !r.badExampleExists || !r.goodExampleExists);
    if (missingExamples.length > 0) {
      actionItems.push(`- [ ] Create ${missingExamples.length} missing example components`);
    }

    const themeIssueCount = validation.summaries.reduce((acc, s) => acc + s.themeIssues, 0);
    if (themeIssueCount > 0) {
      actionItems.push(`- [ ] Add dark mode support to ${themeIssueCount} examples`);
    }
  }

  if (sourceLinks) {
    if (sourceLinks.summary.errors > 0) {
      actionItems.push(`- [ ] Fix ${sourceLinks.summary.errors} broken source links`);
    }
    if (sourceLinks.summary.redirects > 0) {
      actionItems.push(`- [ ] Update ${sourceLinks.summary.redirects} redirected links to final URLs`);
    }
  }

  if (actionItems.length > 0) {
    lines.push(...actionItems);
  } else {
    lines.push('No action items - all validations passed!');
  }

  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('*This report was automatically generated by the validation workflow.*');

  return lines.join('\n');
}

function main() {
  console.log('📝 Generating Validation Report...\n');

  const report = generateReport();
  const outputPath = join(rootDir, 'doc/validation-report.md');

  writeFileSync(outputPath, report);

  console.log(`Report saved to ${relative(rootDir, outputPath)}`);
  console.log('\nReport Preview:');
  console.log('─'.repeat(60));
  console.log(report.slice(0, 2000) + (report.length > 2000 ? '\n...[truncated]' : ''));
}

main();
