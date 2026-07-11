#!/usr/bin/env npx tsx
/**
 * Visual Validation Script
 * Captures screenshots of examples in light/dark mode
 * Documents issues found with before/after comparisons
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

interface ValidationIssue {
  principleId: string;
  category: string;
  title: string;
  issue: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  screenshotBefore?: {
    light: string;
    dark: string;
  };
  screenshotAfter?: {
    light: string;
    dark: string;
  };
  fix?: string;
  status: 'open' | 'fixed' | 'wont-fix';
}

interface VisualReport {
  timestamp: string;
  summary: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    fixed: number;
  };
  issues: ValidationIssue[];
}

// Generate markdown report with screenshots
function generateVisualReport(report: VisualReport): string {
  const lines: string[] = [];

  lines.push('# Visual Validation Report');
  lines.push('');
  lines.push(`Generated: ${report.timestamp}`);
  lines.push('');

  // Summary
  lines.push('## Summary');
  lines.push('');
  lines.push('| Severity | Count |');
  lines.push('|----------|-------|');
  lines.push(`| 🔴 Critical | ${report.summary.critical} |`);
  lines.push(`| 🟠 High | ${report.summary.high} |`);
  lines.push(`| 🟡 Medium | ${report.summary.medium} |`);
  lines.push(`| 🟢 Low | ${report.summary.low} |`);
  lines.push(`| ✅ Fixed | ${report.summary.fixed} |`);
  lines.push('');

  // Issues by severity
  const severityOrder = ['critical', 'high', 'medium', 'low'];

  for (const severity of severityOrder) {
    const issues = report.issues.filter(i => i.severity === severity && i.status !== 'fixed');

    if (issues.length === 0) continue;

    const emoji = severity === 'critical' ? '🔴' : severity === 'high' ? '🟠' : severity === 'medium' ? '🟡' : '🟢';
    lines.push(`## ${emoji} ${severity.charAt(0).toUpperCase() + severity.slice(1)} Issues`);
    lines.push('');

    for (const issue of issues) {
      lines.push(`### ${issue.principleId}`);
      lines.push('');
      lines.push(`**Category**: ${issue.category}`);
      lines.push(`**Issue**: ${issue.issue}`);
      lines.push('');

      if (issue.screenshotBefore) {
        lines.push('#### Before (Problem)');
        lines.push('');
        lines.push('| Light Mode | Dark Mode |');
        lines.push('|------------|-----------|');
        lines.push(`| ![Light](${issue.screenshotBefore.light}) | ![Dark](${issue.screenshotBefore.dark}) |`);
        lines.push('');
      }

      if (issue.screenshotAfter) {
        lines.push('#### After (Fixed)');
        lines.push('');
        lines.push('| Light Mode | Dark Mode |');
        lines.push('|------------|-----------|');
        lines.push(`| ![Light](${issue.screenshotAfter.light}) | ![Dark](${issue.screenshotAfter.dark}) |`);
        lines.push('');
      }

      if (issue.fix) {
        lines.push('#### Fix Applied');
        lines.push('');
        lines.push('```diff');
        lines.push(issue.fix);
        lines.push('```');
        lines.push('');
      }

      lines.push('---');
      lines.push('');
    }
  }

  // Fixed issues
  const fixedIssues = report.issues.filter(i => i.status === 'fixed');
  if (fixedIssues.length > 0) {
    lines.push('## ✅ Fixed Issues');
    lines.push('');

    for (const issue of fixedIssues) {
      lines.push(`### ${issue.principleId}`);
      lines.push('');
      lines.push(`**Issue**: ${issue.issue}`);
      lines.push('');

      if (issue.screenshotBefore && issue.screenshotAfter) {
        lines.push('| Before | After |');
        lines.push('|--------|-------|');
        lines.push(`| ![Before Light](${issue.screenshotBefore.light}) | ![After Light](${issue.screenshotAfter.light}) |`);
        lines.push(`| ![Before Dark](${issue.screenshotBefore.dark}) | ![After Dark](${issue.screenshotAfter.dark}) |`);
        lines.push('');
      }

      if (issue.fix) {
        lines.push('**Fix**:');
        lines.push('```diff');
        lines.push(issue.fix);
        lines.push('```');
        lines.push('');
      }

      lines.push('---');
      lines.push('');
    }
  }

  return lines.join('\n');
}

// Initialize empty report or load existing
function loadOrCreateReport(): VisualReport {
  const reportPath = join(rootDir, 'doc/visual-validation-data.json');

  if (existsSync(reportPath)) {
    return JSON.parse(readFileSync(reportPath, 'utf-8'));
  }

  return {
    timestamp: new Date().toISOString(),
    summary: {
      total: 0,
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      fixed: 0,
    },
    issues: [],
  };
}

// Save report
function saveReport(report: VisualReport) {
  const dataPath = join(rootDir, 'doc/visual-validation-data.json');
  const mdPath = join(rootDir, 'doc/visual-validation-report.md');

  // Update summary counts
  report.summary.total = report.issues.length;
  report.summary.critical = report.issues.filter(i => i.severity === 'critical' && i.status !== 'fixed').length;
  report.summary.high = report.issues.filter(i => i.severity === 'high' && i.status !== 'fixed').length;
  report.summary.medium = report.issues.filter(i => i.severity === 'medium' && i.status !== 'fixed').length;
  report.summary.low = report.issues.filter(i => i.severity === 'low' && i.status !== 'fixed').length;
  report.summary.fixed = report.issues.filter(i => i.status === 'fixed').length;
  report.timestamp = new Date().toISOString();

  writeFileSync(dataPath, JSON.stringify(report, null, 2));
  writeFileSync(mdPath, generateVisualReport(report));

  console.log(`Saved to ${relative(rootDir, dataPath)}`);
  console.log(`Report: ${relative(rootDir, mdPath)}`);
}

// Add an issue to the report
function addIssue(
  report: VisualReport,
  principleId: string,
  category: string,
  title: string,
  issue: string,
  severity: 'critical' | 'high' | 'medium' | 'low'
): ValidationIssue {
  const existing = report.issues.find(i => i.principleId === principleId && i.issue === issue);
  if (existing) {
    return existing;
  }

  const newIssue: ValidationIssue = {
    principleId,
    category,
    title,
    issue,
    severity,
    status: 'open',
  };

  report.issues.push(newIssue);
  return newIssue;
}

// Mark issue as fixed with before/after screenshots
function markFixed(
  report: VisualReport,
  principleId: string,
  fix: string,
  beforeLight: string,
  beforeDark: string,
  afterLight: string,
  afterDark: string
) {
  const issue = report.issues.find(i => i.principleId === principleId && i.status === 'open');
  if (issue) {
    issue.status = 'fixed';
    issue.fix = fix;
    issue.screenshotBefore = { light: beforeLight, dark: beforeDark };
    issue.screenshotAfter = { light: afterLight, dark: afterDark };
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  // Ensure screenshots directory exists
  const screenshotsDir = join(rootDir, 'doc/screenshots');
  if (!existsSync(screenshotsDir)) {
    mkdirSync(screenshotsDir, { recursive: true });
  }

  const report = loadOrCreateReport();

  switch (command) {
    case 'add': {
      // Add a new issue
      // Usage: visual-validation.ts add <principleId> <category> <title> <issue> <severity>
      const [, principleId, category, title, issue, severity] = args;
      if (!principleId || !category || !issue || !severity) {
        console.error('Usage: add <principleId> <category> <title> <issue> <severity>');
        process.exit(1);
      }
      addIssue(report, principleId, category, title, issue, severity as 'critical' | 'high' | 'medium' | 'low');
      saveReport(report);
      console.log(`Added issue for ${principleId}`);
      break;
    }

    case 'fix': {
      // Mark an issue as fixed
      // Usage: visual-validation.ts fix <principleId> <fix> <beforeLight> <beforeDark> <afterLight> <afterDark>
      const [, principleId, fix, beforeLight, beforeDark, afterLight, afterDark] = args;
      if (!principleId || !fix) {
        console.error('Usage: fix <principleId> <fix> [screenshots...]');
        process.exit(1);
      }
      markFixed(report, principleId, fix, beforeLight || '', beforeDark || '', afterLight || '', afterDark || '');
      saveReport(report);
      console.log(`Marked ${principleId} as fixed`);
      break;
    }

    case 'report': {
      // Generate report
      saveReport(report);
      break;
    }

    case 'list': {
      // List open issues
      const openIssues = report.issues.filter(i => i.status === 'open');
      console.log(`\nOpen Issues: ${openIssues.length}\n`);
      for (const issue of openIssues) {
        const emoji = issue.severity === 'critical' ? '🔴' : issue.severity === 'high' ? '🟠' : issue.severity === 'medium' ? '🟡' : '🟢';
        console.log(`${emoji} ${issue.principleId}: ${issue.issue}`);
      }
      break;
    }

    case 'init': {
      // Initialize with known issues from validation results
      const validationPath = join(rootDir, 'doc/validation-results.json');
      if (existsSync(validationPath)) {
        const validation = JSON.parse(readFileSync(validationPath, 'utf-8'));
        for (const result of validation.results) {
          if (result.issues.length > 0) {
            for (const issue of result.issues) {
              const severity = issue.includes('dark mode') ? 'medium' :
                             issue.includes('hardcoded') ? 'medium' :
                             issue.includes('not found') ? 'high' : 'low';
              addIssue(report, result.id, result.category, result.title, issue, severity);
            }
          }
        }
        saveReport(report);
        console.log(`Initialized with ${report.issues.length} issues from validation results`);
      }
      break;
    }

    default:
      console.log(`
Visual Validation Tool

Commands:
  init                    Initialize from validation results
  add <id> <cat> <title> <issue> <sev>  Add a new issue
  fix <id> <fix> [screenshots...]       Mark issue as fixed
  list                    List open issues
  report                  Generate markdown report

Screenshots should be placed in doc/screenshots/ with naming:
  <principleId>-before-light.png
  <principleId>-before-dark.png
  <principleId>-after-light.png
  <principleId>-after-dark.png
`);
  }
}

main();
