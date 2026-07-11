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

interface PrincipleInfo {
  id: string;
  title: string;
}

// Get principle IDs and titles from the data file
function getPrinciples(): PrincipleInfo[] {
  const principlesPath = join(rootDir, 'src/data/principles.ts');
  const content = readFileSync(principlesPath, 'utf-8');

  const principles: PrincipleInfo[] = [];

  const principlesMatch = content.match(/export const principles: Principle\[\] = \[([\s\S]*?)\];/);
  if (!principlesMatch) {
    throw new Error('Could not parse principles array');
  }

  const principlesText = principlesMatch[1];
  const principleBlocks = principlesText.split(/\n {2}},\n {2}{/).map((block, i, arr) => {
    if (i === 0) return block.replace(/^\s*{/, '');
    if (i === arr.length - 1) return block.replace(/}\s*$/, '');
    return block;
  });

  const unescapeValue = (value: string) =>
    value.replace(/\\\\/g, '\\').replace(/\\'/g, "'").replace(/\\"/g, '"');

  for (const block of principleBlocks) {
    if (!block.trim()) continue;

    const idMatch = block.match(/id:\s*['"]([^'"]+)['"]/);
    const titleMatch =
      block.match(/title:\s*'((?:\\'|[^'])*)'/) ??
      block.match(/title:\s*"((?:\\"|[^"])*)"/);
    if (idMatch && titleMatch) {
      principles.push({
        id: idMatch[1],
        title: unescapeValue(titleMatch[1]),
      });
    }
  }

  return principles;
}

async function capturePrinciple(
  page: Page,
  principleId: string,
  principleTitle: string,
  baseUrl: string,
  isFirstPrinciple: boolean
): Promise<ScreenshotResult> {
  const timestamp = new Date().toISOString();
  const lightPath = join(outputDir, `${principleId}-light.png`);
  const darkPath = join(outputDir, `${principleId}-dark.png`);

  try {
    // On first principle, navigate to base URL
    if (isFirstPrinciple) {
      await page.goto(baseUrl, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
    }

    // Click on the sidebar button with the matching title
    // The sidebar uses button elements with the principle title as text
    const sidebarButton = page.locator('aside button', { hasText: principleTitle }).first();

    // Scroll the button into view and click it
    await sidebarButton.scrollIntoViewIfNeeded();
    await sidebarButton.click();

    // Wait for the content to update
    await page.waitForTimeout(500);

    // Verify navigation worked by checking the heading matches the title
    const heading = page.locator('main h1');
    await heading.waitFor({ state: 'visible', timeout: 5000 });
    const headingText = await heading.textContent();
    if (!headingText?.includes(principleTitle.split(' ')[0])) {
      throw new Error(`Navigation failed - heading shows "${headingText}" instead of "${principleTitle}"`);
    }

    const comparison = page.locator('[data-testid="example-comparison"]');
    await comparison.waitFor({ state: 'visible', timeout: 5000 });

    // Use JavaScript to control theme directly (more reliable than clicking)
    // Set to LIGHT mode first
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme-preference', 'light');
    });
    await page.waitForTimeout(500);
    await comparison.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await comparison.screenshot({ path: lightPath });

    // Set to DARK mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme-preference', 'dark');
    });
    await page.waitForTimeout(500);
    await comparison.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await comparison.screenshot({ path: darkPath });

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
  const specificPrincipleId = mode === '--principle' ? args[1] : null;

  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const allPrinciples = getPrinciples();
  let targetPrinciples: PrincipleInfo[];

  if (specificPrincipleId) {
    const found = allPrinciples.find(p => p.id === specificPrincipleId);
    if (!found) {
      console.error(`Principle "${specificPrincipleId}" not found`);
      process.exit(1);
    }
    targetPrinciples = [found];
  } else if (mode === '--all') {
    targetPrinciples = allPrinciples;
  } else {
    // Sample principles evenly from each category
    const sampleSize = 20;
    const categories = new Map<string, PrincipleInfo[]>();
    for (const p of allPrinciples) {
      const category = p.id.split('-')[0];
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category)!.push(p);
    }
    const sampled: PrincipleInfo[] = [];
    const perCategory = Math.ceil(sampleSize / categories.size);
    for (const [, categoryPrinciples] of categories) {
      const shuffled = categoryPrinciples.sort(() => Math.random() - 0.5);
      sampled.push(...shuffled.slice(0, perCategory));
    }
    targetPrinciples = sampled.slice(0, sampleSize);
  }

  console.log(`🎨 Dark Mode Visual Validation`);
  console.log(`   Capturing ${targetPrinciples.length} principles in light and dark modes\n`);

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

    for (let i = 0; i < targetPrinciples.length; i++) {
      const principle = targetPrinciples[i];
      process.stdout.write(`[${i + 1}/${targetPrinciples.length}] ${principle.id}... `);

      const result = await capturePrinciple(page, principle.id, principle.title, baseUrl, i === 0);
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
      totalPrinciples: targetPrinciples.length,
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
