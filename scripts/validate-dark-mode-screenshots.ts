#!/usr/bin/env npx tsx
/**
 * Dark Mode Visual Validation Script
 *
 * Takes screenshots of examples in both light and dark modes
 * to visually verify theme support works correctly.
 *
 * Usage:
 *   npx tsx scripts/validate-dark-mode-screenshots.ts [--all | --sample | --principle <id>]
 *
 * Options:
 *   --all        Capture all principles (slow)
 *   --sample     Capture a sample of 10 principles from each category (default)
 *   --principle  Capture a specific principle by ID
 */

import { chromium, Browser, Page } from 'playwright';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const outputDir = join(rootDir, '.playwright-mcp', 'dark-mode-validation');

interface ScreenshotResult {
  principleId: string;
  lightPath: string;
  darkPath: string;
  timestamp: string;
  success: boolean;
  error?: string;
}

interface ValidationReport {
  timestamp: string;
  baseUrl: string;
  totalPrinciples: number;
  captured: number;
  failed: number;
  results: ScreenshotResult[];
}

// Get principle IDs from the data file
function getPrincipleIds(): string[] {
  const principlesPath = join(rootDir, 'src/data/principles.ts');
  const content = readFileSync(principlesPath, 'utf-8');
  const idMatches = content.matchAll(/id:\s*['"]([^'"]+)['"]/g);
  return Array.from(idMatches, m => m[1]);
}

// Sample principles evenly from each category
function samplePrinciples(ids: string[], sampleSize: number = 10): string[] {
  const categories = new Map<string, string[]>();

  for (const id of ids) {
    const category = id.split('-')[0];
    if (!categories.has(category)) {
      categories.set(category, []);
    }
    categories.get(category)!.push(id);
  }

  const sampled: string[] = [];
  const perCategory = Math.ceil(sampleSize / categories.size);

  for (const [, categoryIds] of categories) {
    const shuffled = categoryIds.sort(() => Math.random() - 0.5);
    sampled.push(...shuffled.slice(0, perCategory));
  }

  return sampled.slice(0, sampleSize);
}

async function capturePrinciple(
  page: Page,
  principleId: string,
  baseUrl: string
): Promise<ScreenshotResult> {
  const timestamp = new Date().toISOString();
  const lightPath = join(outputDir, `${principleId}-light.png`);
  const darkPath = join(outputDir, `${principleId}-dark.png`);

  try {
    // Navigate to principle
    await page.goto(`${baseUrl}/#${principleId}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500); // Wait for animations

    // Capture in current mode (detect which mode we're in)
    const darkModeSwitch = page.locator('[aria-label*="Switch to"]');
    const switchLabel = await darkModeSwitch.getAttribute('aria-label') || '';
    const isCurrentlyDark = switchLabel.includes('light');

    // Capture dark mode
    if (!isCurrentlyDark) {
      await darkModeSwitch.click();
      await page.waitForTimeout(300);
    }
    await page.screenshot({ path: darkPath, fullPage: false });

    // Capture light mode
    const lightSwitch = page.locator('[aria-label*="Switch to"]');
    await lightSwitch.click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: lightPath, fullPage: false });

    // Return to dark mode (preserve state)
    await page.locator('[aria-label*="Switch to"]').click();

    return {
      principleId,
      lightPath,
      darkPath,
      timestamp,
      success: true,
    };
  } catch (error) {
    return {
      principleId,
      lightPath,
      darkPath,
      timestamp,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || '--sample';
  const specificPrinciple = mode === '--principle' ? args[1] : null;

  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const allIds = getPrincipleIds();
  let targetIds: string[];

  if (specificPrinciple) {
    if (!allIds.includes(specificPrinciple)) {
      console.error(`Principle "${specificPrinciple}" not found`);
      process.exit(1);
    }
    targetIds = [specificPrinciple];
  } else if (mode === '--all') {
    targetIds = allIds;
  } else {
    targetIds = samplePrinciples(allIds, 20);
  }

  console.log(`🎨 Dark Mode Visual Validation`);
  console.log(`   Capturing ${targetIds.length} principles in light and dark modes\n`);

  const baseUrl = process.env.BASE_URL || 'http://localhost:5173';

  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const page = await context.newPage();

    const results: ScreenshotResult[] = [];
    let captured = 0;
    let failed = 0;

    for (let i = 0; i < targetIds.length; i++) {
      const id = targetIds[i];
      process.stdout.write(`[${i + 1}/${targetIds.length}] ${id}... `);

      const result = await capturePrinciple(page, id, baseUrl);
      results.push(result);

      if (result.success) {
        captured++;
        console.log('✓');
      } else {
        failed++;
        console.log(`✗ ${result.error}`);
      }
    }

    // Generate report
    const report: ValidationReport = {
      timestamp: new Date().toISOString(),
      baseUrl,
      totalPrinciples: targetIds.length,
      captured,
      failed,
      results,
    };

    const reportPath = join(outputDir, 'validation-report.json');
    writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📊 Summary`);
    console.log(`   ✓ Captured: ${captured}`);
    console.log(`   ✗ Failed: ${failed}`);
    console.log(`   📁 Screenshots: ${outputDir}`);
    console.log(`   📄 Report: ${reportPath}`);

    if (failed > 0) {
      process.exit(1);
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

main().catch(console.error);
