#!/usr/bin/env npx tsx
/**
 * Screenshot Capture Script
 * Uses Playwright to capture screenshots of examples in light/dark mode
 */

import { chromium } from '@playwright/test';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const BASE_URL = 'http://localhost:5173';
const SCREENSHOTS_DIR = join(rootDir, 'doc/screenshots');

interface ValidationResultRow {
  id: string;
  category: string;
  issues: unknown[];
}

interface CaptureOptions {
  principleId: string;
  prefix: 'before' | 'after';
  waitForSelector?: string;
}

async function captureScreenshots(options: CaptureOptions): Promise<{ light: string; dark: string }> {
  const { principleId, prefix } = options;

  // Ensure screenshots directory exists
  if (!existsSync(SCREENSHOTS_DIR)) {
    mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  const lightPath = join(SCREENSHOTS_DIR, `${principleId}-${prefix}-light.png`);
  const darkPath = join(SCREENSHOTS_DIR, `${principleId}-${prefix}-dark.png`);

  try {
    // Navigate to the principle
    await page.goto(`${BASE_URL}/#${principleId}`);
    await page.waitForLoadState('networkidle');

    // Wait for examples to render
    await page.waitForSelector('[data-testid="example-comparison"]', { timeout: 5000 }).catch(() => {
      // Fallback: wait for any content
      return page.waitForSelector('.prose', { timeout: 5000 });
    });

    // Give animations time to complete
    await page.waitForTimeout(500);

    // Capture light mode
    await page.screenshot({
      path: lightPath,
      fullPage: false,
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });
    console.log(`Captured: ${relative(rootDir, lightPath)}`);

    // Toggle to dark mode
    const themeToggle = await page.$('[data-testid="theme-toggle"]');
    if (themeToggle) {
      await themeToggle.click();
      await page.waitForTimeout(300); // Wait for theme transition
    } else {
      // Fallback: use media query emulation
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.waitForTimeout(300);
    }

    // Capture dark mode
    await page.screenshot({
      path: darkPath,
      fullPage: false,
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });
    console.log(`Captured: ${relative(rootDir, darkPath)}`);

    return {
      light: `screenshots/${principleId}-${prefix}-light.png`,
      dark: `screenshots/${principleId}-${prefix}-dark.png`,
    };
  } finally {
    await browser.close();
  }
}

async function captureBatchScreenshots(principleIds: string[], prefix: 'before' | 'after') {
  const browser = await chromium.launch();
  const results: Map<string, { light: string; dark: string }> = new Map();

  try {
    for (const principleId of principleIds) {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
      });
      const page = await context.newPage();

      const lightPath = join(SCREENSHOTS_DIR, `${principleId}-${prefix}-light.png`);
      const darkPath = join(SCREENSHOTS_DIR, `${principleId}-${prefix}-dark.png`);

      try {
        await page.goto(`${BASE_URL}/#${principleId}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);

        // Light mode
        await page.screenshot({ path: lightPath });

        // Dark mode
        await page.emulateMedia({ colorScheme: 'dark' });
        await page.waitForTimeout(300);
        await page.screenshot({ path: darkPath });

        results.set(principleId, {
          light: `screenshots/${principleId}-${prefix}-light.png`,
          dark: `screenshots/${principleId}-${prefix}-dark.png`,
        });

        console.log(`✓ ${principleId}`);
      } catch (error) {
        console.error(`✗ ${principleId}: ${(error as Error).message}`);
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }

  return results;
}

// Capture comparison screenshots (Good vs Bad side by side)
async function captureComparison(principleId: string, prefix: 'before' | 'after'): Promise<{ light: string; dark: string }> {
  if (!existsSync(SCREENSHOTS_DIR)) {
    mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
  });
  const page = await context.newPage();

  const lightPath = join(SCREENSHOTS_DIR, `${principleId}-${prefix}-comparison-light.png`);
  const darkPath = join(SCREENSHOTS_DIR, `${principleId}-${prefix}-comparison-dark.png`);

  try {
    await page.goto(`${BASE_URL}/#${principleId}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(800);

    // Find the example comparison container
    const comparisonEl = await page.$('[data-testid="example-comparison"], .grid');

    if (comparisonEl) {
      // Light mode
      await comparisonEl.screenshot({ path: lightPath });
      console.log(`Captured: ${relative(rootDir, lightPath)}`);

      // Dark mode
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.waitForTimeout(300);
      await comparisonEl.screenshot({ path: darkPath });
      console.log(`Captured: ${relative(rootDir, darkPath)}`);
    } else {
      // Fallback to full page
      await page.screenshot({ path: lightPath, fullPage: false });
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.waitForTimeout(300);
      await page.screenshot({ path: darkPath, fullPage: false });
    }

    return {
      light: `screenshots/${principleId}-${prefix}-comparison-light.png`,
      dark: `screenshots/${principleId}-${prefix}-comparison-dark.png`,
    };
  } finally {
    await browser.close();
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'single': {
      // Capture single principle
      const principleId = args[1];
      const prefix = (args[2] || 'before') as 'before' | 'after';
      if (!principleId) {
        console.error('Usage: capture-screenshots single <principleId> [before|after]');
        process.exit(1);
      }
      await captureScreenshots({ principleId, prefix });
      break;
    }

    case 'comparison': {
      // Capture comparison view
      const principleId = args[1];
      const prefix = (args[2] || 'before') as 'before' | 'after';
      if (!principleId) {
        console.error('Usage: capture-screenshots comparison <principleId> [before|after]');
        process.exit(1);
      }
      await captureComparison(principleId, prefix);
      break;
    }

    case 'batch': {
      // Capture batch from validation results
      const prefix = (args[1] || 'before') as 'before' | 'after';
      const category = args[2]; // Optional category filter

      const validationPath = join(rootDir, 'doc/validation-results.json');
      if (!existsSync(validationPath)) {
        console.error('Run npm run validate first to generate validation-results.json');
        process.exit(1);
      }

      const validation = JSON.parse(readFileSync(validationPath, 'utf-8'));
      let principles = (validation.results as ValidationResultRow[]).filter((r) => r.issues.length > 0);

      if (category) {
        principles = principles.filter((r) => r.category === category);
      }

      const ids = principles.map((r) => r.id).slice(0, 20); // Limit to 20 at a time
      console.log(`Capturing ${ids.length} principles...`);
      await captureBatchScreenshots(ids, prefix);
      break;
    }

    case 'category': {
      // Capture all principles in a category
      const categoryName = args[1];
      const prefix = (args[2] || 'before') as 'before' | 'after';

      if (!categoryName) {
        console.error('Usage: capture-screenshots category <categoryName> [before|after]');
        process.exit(1);
      }

      const validationPath = join(rootDir, 'doc/validation-results.json');
      const validation = JSON.parse(readFileSync(validationPath, 'utf-8'));
      const principles = (validation.results as ValidationResultRow[]).filter((r) => r.category === categoryName);

      console.log(`Capturing ${principles.length} principles in ${categoryName}...`);
      const ids = principles.map((r) => r.id);
      await captureBatchScreenshots(ids, prefix);
      break;
    }

    default:
      console.log(`
Screenshot Capture Tool

Commands:
  single <principleId> [before|after]     Capture single principle
  comparison <principleId> [before|after] Capture Good/Bad comparison
  batch [before|after] [category]         Capture principles with issues
  category <name> [before|after]          Capture all in category

Examples:
  npx tsx scripts/capture-screenshots.ts single interactions-clear-focus before
  npx tsx scripts/capture-screenshots.ts batch before interactions
  npx tsx scripts/capture-screenshots.ts category forms

Note: Dev server must be running (npm run dev)
`);
  }
}

main().catch(console.error);
