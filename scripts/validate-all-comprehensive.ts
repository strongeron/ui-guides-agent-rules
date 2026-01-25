#!/usr/bin/env npx tsx
/**
 * Comprehensive Validation Runner
 * Combines all validation scripts into a single workflow
 */

import { spawnSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

interface ValidationPhase {
  name: string;
  script: string;
  description: string;
  required: boolean;
}

interface ComprehensiveReport {
  timestamp: string;
  duration: number;
  phases: {
    name: string;
    status: 'passed' | 'failed' | 'skipped';
    duration: number;
    output?: string;
  }[];
  summary: {
    principles: number;
    examples: number;
    issues: {
      total: number;
      critical: number;
      high: number;
      medium: number;
      low: number;
      fixed: number;
    };
    links: {
      total: number;
      ok: number;
      broken: number;
      redirected: number;
    };
    theme: {
      withDarkMode: number;
      withoutDarkMode: number;
    };
    agentRules: {
      total: number;
      aligned: number;
      misaligned: number;
    };
  };
  recommendations: string[];
}

const PHASES: ValidationPhase[] = [
  {
    name: 'Field Completeness',
    script: 'validate-principles.ts',
    description: 'Check all principles have required fields and examples',
    required: true,
  },
  {
    name: 'Source Links',
    script: 'check-source-links.ts',
    description: 'Validate all source URLs are accessible',
    required: false,
  },
  {
    name: 'Agent Rules Alignment',
    script: 'validate-agent-rules.ts',
    description: 'Check examples follow their agent rules',
    required: true,
  },
];

function runPhase(phase: ValidationPhase): { status: 'passed' | 'failed' | 'skipped'; duration: number; output: string } {
  const scriptPath = join(__dirname, phase.script);

  if (!existsSync(scriptPath)) {
    return { status: 'skipped', duration: 0, output: `Script not found: ${phase.script}` };
  }

  const start = Date.now();
  const result = spawnSync('npx', ['tsx', scriptPath], {
    cwd: rootDir,
    encoding: 'utf-8',
    timeout: 300000, // 5 minute timeout
  });
  const duration = Date.now() - start;

  const output = (result.stdout || '') + (result.stderr || '');
  const status = result.status === 0 ? 'passed' : 'failed';

  return { status, duration, output };
}

function loadResults(): Partial<ComprehensiveReport['summary']> {
  const summary: Partial<ComprehensiveReport['summary']> = {};

  // Load validation results
  const validationPath = join(rootDir, 'doc/validation-results.json');
  if (existsSync(validationPath)) {
    const data = JSON.parse(readFileSync(validationPath, 'utf-8'));
    summary.principles = data.principleCount;
    summary.examples = data.exampleCount;
    summary.theme = data.themeAnalysis;

    // Count issues from summaries
    let total = 0, critical = 0, high = 0, medium = 0, low = 0;
    for (const s of data.summaries) {
      total += s.invalid;
      medium += s.themeIssues; // Theme issues are medium
    }
    summary.issues = { total, critical, high, medium, low, fixed: 0 };
  }

  // Load source links results
  const linksPath = join(rootDir, 'doc/source-links-results.json');
  if (existsSync(linksPath)) {
    const data = JSON.parse(readFileSync(linksPath, 'utf-8'));
    summary.links = {
      total: data.totalLinks,
      ok: data.summary.ok,
      broken: data.summary.errors + data.summary.timeouts,
      redirected: data.summary.redirects,
    };
  }

  // Load agent rules results
  const rulesPath = join(rootDir, 'doc/agent-rules-alignment.json');
  if (existsSync(rulesPath)) {
    const data = JSON.parse(readFileSync(rulesPath, 'utf-8'));
    summary.agentRules = {
      total: data.summary.totalRules,
      aligned: data.summary.aligned,
      misaligned: data.summary.misaligned,
    };
  }

  return summary;
}

function generateRecommendations(summary: ComprehensiveReport['summary']): string[] {
  const recommendations: string[] = [];

  if (summary.links?.broken > 0) {
    recommendations.push(`Fix ${summary.links.broken} broken source links (P2)`);
  }

  if (summary.links?.redirected > 10) {
    recommendations.push(`Update ${summary.links.redirected} redirected links to final URLs (P3)`);
  }

  if (summary.theme?.withoutDarkMode > 50) {
    recommendations.push(`Add dark mode support to ${summary.theme.withoutDarkMode} examples (P2)`);
  }

  if (summary.agentRules?.misaligned > 0) {
    recommendations.push(`Review ${summary.agentRules.misaligned} examples that don't align with agent rules (P2)`);
  }

  if (summary.issues?.critical > 0) {
    recommendations.push(`Address ${summary.issues.critical} critical issues immediately (P1)`);
  }

  return recommendations;
}

function generateMarkdownReport(report: ComprehensiveReport): string {
  const lines: string[] = [];

  lines.push('# Comprehensive Validation Report');
  lines.push('');
  lines.push(`**Generated**: ${report.timestamp}`);
  lines.push(`**Duration**: ${(report.duration / 1000).toFixed(1)}s`);
  lines.push('');

  // Phase Status
  lines.push('## Validation Phases');
  lines.push('');
  lines.push('| Phase | Status | Duration |');
  lines.push('|-------|--------|----------|');
  for (const phase of report.phases) {
    const emoji = phase.status === 'passed' ? '✅' : phase.status === 'failed' ? '❌' : '⏭️';
    lines.push(`| ${phase.name} | ${emoji} ${phase.status} | ${(phase.duration / 1000).toFixed(1)}s |`);
  }
  lines.push('');

  // Summary Stats
  lines.push('## Summary');
  lines.push('');

  if (report.summary.principles) {
    lines.push('### Content');
    lines.push(`- **Principles**: ${report.summary.principles}`);
    lines.push(`- **Examples**: ${report.summary.examples}`);
    lines.push('');
  }

  if (report.summary.issues) {
    lines.push('### Issues');
    lines.push(`| Severity | Count |`);
    lines.push(`|----------|-------|`);
    lines.push(`| 🔴 Critical | ${report.summary.issues.critical} |`);
    lines.push(`| 🟠 High | ${report.summary.issues.high} |`);
    lines.push(`| 🟡 Medium | ${report.summary.issues.medium} |`);
    lines.push(`| 🟢 Low | ${report.summary.issues.low} |`);
    lines.push(`| **Total Open** | ${report.summary.issues.total} |`);
    lines.push('');
  }

  if (report.summary.links) {
    lines.push('### Source Links');
    lines.push(`- ✅ OK: ${report.summary.links.ok}`);
    lines.push(`- ↪️ Redirected: ${report.summary.links.redirected}`);
    lines.push(`- ❌ Broken: ${report.summary.links.broken}`);
    lines.push('');
  }

  if (report.summary.theme) {
    lines.push('### Theme Support');
    const total = report.summary.theme.withDarkMode + report.summary.theme.withoutDarkMode;
    const percent = total > 0 ? ((report.summary.theme.withDarkMode / total) * 100).toFixed(0) : 0;
    lines.push(`- With dark mode: ${report.summary.theme.withDarkMode} (${percent}%)`);
    lines.push(`- Without dark mode: ${report.summary.theme.withoutDarkMode}`);
    lines.push('');
  }

  if (report.summary.agentRules) {
    lines.push('### Agent Rules Alignment');
    lines.push(`- ✅ Aligned: ${report.summary.agentRules.aligned}`);
    lines.push(`- ⚠️ Misaligned: ${report.summary.agentRules.misaligned}`);
    lines.push('');
  }

  // Recommendations
  if (report.recommendations.length > 0) {
    lines.push('## Recommendations');
    lines.push('');
    for (const rec of report.recommendations) {
      lines.push(`- [ ] ${rec}`);
    }
    lines.push('');
  }

  // Beads Tasks
  lines.push('## Beads Tasks');
  lines.push('');
  lines.push('```bash');
  lines.push('# Check current tasks');
  lines.push('bd list --labels=validation');
  lines.push('');
  lines.push('# Start work');
  lines.push('bd ready');
  lines.push('```');
  lines.push('');

  lines.push('---');
  lines.push('*Generated by validate-all-comprehensive.ts*');

  return lines.join('\n');
}

async function main() {
  const startTime = Date.now();
  console.log('🚀 Running Comprehensive Validation...\n');

  // Ensure doc directory exists
  const docDir = join(rootDir, 'doc');
  if (!existsSync(docDir)) {
    mkdirSync(docDir, { recursive: true });
  }

  const phaseResults: ComprehensiveReport['phases'] = [];

  // Run each phase
  for (const phase of PHASES) {
    console.log(`\n📋 ${phase.name}...`);
    console.log(`   ${phase.description}`);

    const result = runPhase(phase);
    phaseResults.push({
      name: phase.name,
      status: result.status,
      duration: result.duration,
      output: result.output.slice(0, 500), // Truncate output
    });

    const emoji = result.status === 'passed' ? '✅' : result.status === 'failed' ? '❌' : '⏭️';
    console.log(`   ${emoji} ${result.status} (${(result.duration / 1000).toFixed(1)}s)`);
  }

  // Load and aggregate results
  const summary = loadResults() as ComprehensiveReport['summary'];
  const recommendations = generateRecommendations(summary);

  const report: ComprehensiveReport = {
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime,
    phases: phaseResults,
    summary,
    recommendations,
  };

  // Save JSON report
  const jsonPath = join(rootDir, 'doc/comprehensive-validation.json');
  writeFileSync(jsonPath, JSON.stringify(report, null, 2));

  // Save Markdown report
  const mdPath = join(rootDir, 'doc/comprehensive-validation.md');
  writeFileSync(mdPath, generateMarkdownReport(report));

  // Print summary
  console.log('\n\n📊 VALIDATION COMPLETE\n');
  console.log(`Duration: ${(report.duration / 1000).toFixed(1)}s`);
  console.log(`Phases: ${phaseResults.filter(p => p.status === 'passed').length}/${phaseResults.length} passed`);

  if (recommendations.length > 0) {
    console.log('\n📋 Top Recommendations:');
    for (const rec of recommendations.slice(0, 5)) {
      console.log(`   • ${rec}`);
    }
  }

  console.log(`\n📁 Reports saved to:`);
  console.log(`   ${relative(rootDir, jsonPath)}`);
  console.log(`   ${relative(rootDir, mdPath)}`);

  // Exit with error if critical issues
  const hasBlockers = phaseResults.some(p => p.status === 'failed') ||
    (summary.issues?.critical ?? 0) > 0;
  process.exit(hasBlockers ? 1 : 0);
}

main();
